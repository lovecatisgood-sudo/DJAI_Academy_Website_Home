import { requireEnv } from "./env";
import { normalizeConversationAnalysis, type ConversationAnalysisResult } from "./conversation-analysis-schema";
import type { TranscriptItem } from "./types";

export type ExistingLeadForAnalysis = {
  name: string | null;
  contact: string | null;
  contact_type: string | null;
  need: string | null;
  preferred_time: string | null;
};

type AnalyzeConversationInput = {
  modelId: string;
  conversationId: string;
  pageUrl: string | null;
  language: string | null;
  transcript: TranscriptItem[];
  existingLeads: ExistingLeadForAnalysis[];
};

function compactTranscript(transcript: TranscriptItem[]) {
  return transcript
    .slice(-220)
    .map((item) => `${item.role}: ${item.text}`)
    .join("\n")
    .slice(0, 50000);
}

function analysisPrompt(input: AnalyzeConversationInput) {
  return [
    "You analyze DJ AI Academy voice sales conversations after the call.",
    "Your job is to extract only facts that are present in the transcript or existing lead tool data.",
    "Do not invent contact details, names, business details, objections, or next actions.",
    "If a field is unclear or not present, return an empty string.",
    "Set has_lead to true only when there is a usable phone, email, LINE, WhatsApp, or other contact method.",
    "Interest level must be one of: low, medium, high, unknown.",
    "Return JSON only. No markdown.",
    "",
    "JSON shape:",
    JSON.stringify({
      has_lead: true,
      client: {
        client_name: "",
        company_name: "",
        phone: "",
        email: "",
        line_id: "",
        whatsapp: "",
        other_contact: "",
        preferred_contact_method: "",
        preferred_meeting_day: "",
        preferred_meeting_time: "",
      },
      conversation: {
        summary: "",
        business_type: "",
        main_problem: "",
        business_goal: "",
        interest_level: "low|medium|high|unknown",
        concern_or_objection: "",
        recommended_service: "",
        next_action: "",
      },
    }),
    "",
    `Conversation ID: ${input.conversationId}`,
    `Page URL: ${input.pageUrl || "unknown"}`,
    `Language: ${input.language || "unknown"}`,
    "",
    "Existing lead tool data:",
    JSON.stringify(input.existingLeads),
    "",
    "Transcript:",
    compactTranscript(input.transcript),
  ].join("\n");
}

function extractJsonObject(value: string) {
  const trimmed = value.trim();
  if (trimmed.startsWith("{") && trimmed.endsWith("}")) return trimmed;
  const start = trimmed.indexOf("{");
  const end = trimmed.lastIndexOf("}");
  if (start !== -1 && end > start) return trimmed.slice(start, end + 1);
  return trimmed;
}

export async function analyzeConversation(input: AnalyzeConversationInput): Promise<ConversationAnalysisResult> {
  if (!input.transcript.length) {
    throw new Error("Transcript is empty.");
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${requireEnv("OPENAI_API_KEY")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: input.modelId || "gpt-4o-mini",
      temperature: 0.1,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "You are a careful post-call sales operations analyst. Extract structured JSON only from the provided transcript and lead tool data.",
        },
        {
          role: "user",
          content: analysisPrompt(input),
        },
      ],
    }),
    signal: AbortSignal.timeout(15000),
  });

  const data = await response.json().catch(() => null) as
    | { choices?: { message?: { content?: string } }[]; error?: { message?: string } }
    | null;

  if (!response.ok) {
    throw new Error(data?.error?.message || `Analysis request failed with status ${response.status}.`);
  }

  const content = data?.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("Analysis response was empty.");
  }

  return normalizeConversationAnalysis(JSON.parse(extractJsonObject(content)));
}

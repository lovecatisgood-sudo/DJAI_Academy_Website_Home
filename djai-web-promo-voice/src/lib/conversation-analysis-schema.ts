import type { InterestLevel } from "./types";

export type AnalysisClient = {
  client_name: string;
  company_name: string;
  phone: string;
  email: string;
  line_id: string;
  whatsapp: string;
  other_contact: string;
  preferred_contact_method: string;
  preferred_meeting_day: string;
  preferred_meeting_time: string;
};

export type AnalysisConversation = {
  summary: string;
  business_type: string;
  main_problem: string;
  business_goal: string;
  interest_level: InterestLevel;
  concern_or_objection: string;
  recommended_service: string;
  next_action: string;
};

export type ConversationAnalysisResult = {
  has_lead: boolean;
  client: AnalysisClient;
  conversation: AnalysisConversation;
};

const interestLevels = new Set(["low", "medium", "high", "unknown"]);

function cleanString(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
  return value.trim().replace(/\s+/g, " ").slice(0, maxLength);
}

function cleanMultiline(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
  return value.trim().replace(/\n{3,}/g, "\n\n").slice(0, maxLength);
}

function cleanInterestLevel(value: unknown): InterestLevel {
  const clean = cleanString(value, 20).toLowerCase();
  return interestLevels.has(clean) ? (clean as InterestLevel) : "unknown";
}

export function normalizeConversationAnalysis(input: unknown): ConversationAnalysisResult {
  const root = input && typeof input === "object" ? (input as Record<string, unknown>) : {};
  const client = root.client && typeof root.client === "object" ? (root.client as Record<string, unknown>) : {};
  const conversation = root.conversation && typeof root.conversation === "object"
    ? (root.conversation as Record<string, unknown>)
    : {};
  const normalizedClient: AnalysisClient = {
    client_name: cleanString(client.client_name, 160),
    company_name: cleanString(client.company_name, 200),
    phone: cleanString(client.phone, 80),
    email: cleanString(client.email, 160),
    line_id: cleanString(client.line_id, 120),
    whatsapp: cleanString(client.whatsapp, 120),
    other_contact: cleanString(client.other_contact, 240),
    preferred_contact_method: cleanString(client.preferred_contact_method, 80),
    preferred_meeting_day: cleanString(client.preferred_meeting_day, 120),
    preferred_meeting_time: cleanString(client.preferred_meeting_time, 120),
  };
  const hasContact = Boolean(
    normalizedClient.phone ||
      normalizedClient.email ||
      normalizedClient.line_id ||
      normalizedClient.whatsapp ||
      normalizedClient.other_contact,
  );

  return {
    has_lead: Boolean(root.has_lead) && hasContact,
    client: normalizedClient,
    conversation: {
      summary: cleanMultiline(conversation.summary, 1600),
      business_type: cleanString(conversation.business_type, 200),
      main_problem: cleanString(conversation.main_problem, 500),
      business_goal: cleanString(conversation.business_goal, 500),
      interest_level: cleanInterestLevel(conversation.interest_level),
      concern_or_objection: cleanString(conversation.concern_or_objection, 600),
      recommended_service: cleanString(conversation.recommended_service, 300),
      next_action: cleanString(conversation.next_action, 500),
    },
  };
}

export function firstUsableContact(client: AnalysisClient) {
  if (client.phone) return { contact: client.phone, contact_type: "phone" as const };
  if (client.email) return { contact: client.email, contact_type: "email" as const };
  if (client.line_id) return { contact: client.line_id, contact_type: "line" as const };
  if (client.whatsapp) return { contact: client.whatsapp, contact_type: "other" as const };
  if (client.other_contact) return { contact: client.other_contact, contact_type: "other" as const };
  return null;
}

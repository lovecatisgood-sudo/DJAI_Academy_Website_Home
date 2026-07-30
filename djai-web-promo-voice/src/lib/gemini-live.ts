import {
  ActivityHandling,
  EndSensitivity,
  GoogleGenAI,
  Modality,
  StartSensitivity,
  ThinkingLevel,
  TurnCoverage,
} from "@google/genai";
import { requireEnv } from "./env";
import type { Settings } from "./types";

const geminiWebSocketUrl =
  "wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContentConstrained";

const openAiToGeminiVoice: Record<string, string> = {
  marin: "Puck",
};

function geminiVoiceName(voice: string) {
  return openAiToGeminiVoice[voice] || voice || "Puck";
}

export function geminiCaptureLeadTool() {
  return {
    functionDeclarations: [
      {
        name: "capture_lead",
        description:
          "Capture a qualified DJAI consultation lead only after confirming name, contact, project/business need, and preferred callback or meeting time with the visitor.",
        parametersJsonSchema: {
          type: "object",
          additionalProperties: false,
          properties: {
            name: {
              type: "string",
              description: "Visitor's confirmed name.",
            },
            contact: {
              type: "string",
              description:
                "Confirmed phone, LINE ID, email, or other usable contact. Include multiple contact methods if the visitor gave them.",
            },
            contact_type: {
              type: "string",
              enum: ["phone", "line", "email", "other"],
            },
            need: {
              type: "string",
              description:
                "Short summary of the visitor's company/business, pain point, business goal, and relevant DJAI service interest.",
            },
            preferred_time: {
              type: "string",
              description: "Visitor's confirmed preferred callback or consultation day/time.",
            },
          },
          required: ["name", "contact", "contact_type", "need", "preferred_time"],
        },
      },
    ],
  };
}

export async function mintGeminiLiveToken(settings: Settings, prompt: string) {
  const apiKey = requireEnv("GEMINI_API_KEY");
  const ai = new GoogleGenAI({
    apiKey,
    httpOptions: { apiVersion: "v1alpha" },
  });
  const expireMs = Math.min(30 * 60 * 1000, (settings.max_call_seconds + 900) * 1000);
  const token = await ai.authTokens.create({
    config: {
      uses: 1,
      expireTime: new Date(Date.now() + expireMs).toISOString(),
      newSessionExpireTime: new Date(Date.now() + 60 * 1000).toISOString(),
      liveConnectConstraints: {
        model: settings.model_id,
        config: {
          responseModalities: [Modality.AUDIO],
          maxOutputTokens: 4096,
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: {
                voiceName: geminiVoiceName(settings.voice),
              },
            },
          },
          thinkingConfig: {
            thinkingLevel: ThinkingLevel.LOW,
          },
          systemInstruction: prompt,
          tools: [geminiCaptureLeadTool()],
          inputAudioTranscription: {},
          outputAudioTranscription: {},
          realtimeInputConfig: {
            activityHandling: ActivityHandling.NO_INTERRUPTION,
            turnCoverage: TurnCoverage.TURN_INCLUDES_ONLY_ACTIVITY,
            automaticActivityDetection: {
              disabled: false,
              startOfSpeechSensitivity: StartSensitivity.START_SENSITIVITY_LOW,
              endOfSpeechSensitivity: EndSensitivity.END_SENSITIVITY_LOW,
              prefixPaddingMs: 300,
              silenceDurationMs: 900,
            },
          },
        },
      },
    },
  });

  if (!token.name) {
    throw new Error("Gemini auth token response did not include a token name.");
  }

  return {
    token: token.name,
    websocketUrl: `${geminiWebSocketUrl}?access_token=${encodeURIComponent(token.name)}`,
  };
}

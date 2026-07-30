export type SettingsInput = {
  agent_enabled?: unknown;
  greeting?: unknown;
  voice?: unknown;
  voice_provider?: unknown;
  language_mode?: unknown;
  knowledge_md?: unknown;
  max_call_seconds?: unknown;
  daily_session_cap?: unknown;
  model_id?: unknown;
  transcription_model?: unknown;
  analysis_enabled?: unknown;
  analysis_model_id?: unknown;
};

export type NormalizedSettings = {
  agent_enabled?: boolean;
  greeting?: string;
  voice?: string;
  voice_provider?: "openai" | "gemini";
  language_mode?: string;
  knowledge_md?: string;
  max_call_seconds?: number;
  daily_session_cap?: number;
  model_id?: string;
  transcription_model?: string;
  analysis_enabled?: boolean;
  analysis_model_id?: string;
};

function cleanString(value: unknown, maxLength: number) {
  if (typeof value !== "string") return undefined;
  return value.trim().slice(0, maxLength);
}

function requiredIdentifier(value: unknown, label: string) {
  const clean = cleanString(value, 96);

  if (!clean || !/^[A-Za-z0-9._:-]+$/.test(clean)) {
    throw new Error(`${label} is invalid.`);
  }

  return clean;
}

function clampNumber(value: unknown, min: number, max: number, fallback?: number) {
  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    return fallback;
  }

  return Math.min(max, Math.max(min, Math.round(parsed)));
}

export function normalizeSettingsInput(input: SettingsInput, mode: "form" | "patch"): NormalizedSettings {
  const output: NormalizedSettings = {};

  if (typeof input.agent_enabled === "boolean") {
    output.agent_enabled = input.agent_enabled;
  }

  if (mode === "form") {
    output.agent_enabled = input.agent_enabled === "on";
  }

  if (typeof input.analysis_enabled === "boolean") {
    output.analysis_enabled = input.analysis_enabled;
  }

  if (mode === "form" && input.analysis_enabled !== undefined) {
    output.analysis_enabled = input.analysis_enabled === "on";
  }

  const greeting = cleanString(input.greeting, 4000);
  if (greeting !== undefined) output.greeting = greeting;

  const languageMode = cleanString(input.language_mode, 64);
  if (languageMode !== undefined) {
    if (!languageMode || !/^[A-Za-z0-9._:-]+$/.test(languageMode)) {
      throw new Error("Language mode is invalid.");
    }
    output.language_mode = languageMode;
  }

  const knowledge = cleanString(input.knowledge_md, 60000);
  if (knowledge !== undefined) output.knowledge_md = knowledge;

  if (input.max_call_seconds !== undefined) {
    const maxCallSeconds = clampNumber(input.max_call_seconds, 60, 3600);
    if (!maxCallSeconds) throw new Error("Max call length is invalid.");
    output.max_call_seconds = maxCallSeconds;
  }

  if (input.daily_session_cap !== undefined) {
    const dailySessionCap = clampNumber(input.daily_session_cap, 1, 1000);
    if (!dailySessionCap) throw new Error("Daily session cap is invalid.");
    output.daily_session_cap = dailySessionCap;
  }

  if (input.voice !== undefined) {
    output.voice = requiredIdentifier(input.voice, "Voice");
  }

  if (input.voice_provider !== undefined) {
    const provider = cleanString(input.voice_provider, 20);

    if (provider !== "openai" && provider !== "gemini") {
      throw new Error("Voice provider is invalid.");
    }

    output.voice_provider = provider;
  }

  if (input.model_id !== undefined) {
    output.model_id = requiredIdentifier(input.model_id, "Model ID");
  }

  if (input.transcription_model !== undefined) {
    output.transcription_model = requiredIdentifier(input.transcription_model, "Transcription model");
  }

  if (input.analysis_model_id !== undefined) {
    output.analysis_model_id = requiredIdentifier(input.analysis_model_id, "Analysis model ID");
  }

  return output;
}

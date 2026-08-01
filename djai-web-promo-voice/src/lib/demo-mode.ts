import { optionalEnv } from "./env";
import { initialKnowledgeMarkdown } from "./knowledge-seed";
import type { Settings, VoiceProvider } from "./types";

/**
 * Demo mode runs the public voice agent with no database.
 *
 * Settings come from the same defaults the migration seeds, and every write is
 * skipped. Nothing is persisted: conversations, transcripts, and captured leads
 * exist only in the application log. It is intended for showing the agent
 * before a database is provisioned, not for taking real enquiries.
 */
export function isDemoMode(): boolean {
  const value = optionalEnv("DJAI_VOICE_DEMO_MODE").toLowerCase();
  return value === "1" || value === "true" || value === "on";
}

/**
 * Mirrors the settings row seeded by scripts/migrate.mjs, with two exceptions:
 * post-call analysis is forced off because it writes to the database, and the
 * model and voice can be overridden from the environment. Admin Settings needs
 * the database, so the environment is the only way to change them here.
 */
export function demoSettings(): Settings {
  const provider = optionalEnv("DJAI_VOICE_DEMO_PROVIDER").toLowerCase();

  return {
    id: 1,
    agent_enabled: true,
    greeting:
      "Hi, this is DJAI Academy. Tell me what you want to build, and I will help you choose the right next step.",
    voice: optionalEnv("DJAI_VOICE_DEMO_VOICE") || "marin",
    voice_provider: (provider === "gemini" ? "gemini" : "openai") as VoiceProvider,
    language_mode: "auto_th_en",
    knowledge_md: initialKnowledgeMarkdown,
    knowledge_version: 1,
    max_call_seconds: 600,
    daily_session_cap: 100,
    model_id: optionalEnv("DJAI_VOICE_DEMO_MODEL_ID") || "gpt-realtime-2.1",
    transcription_model: optionalEnv("DJAI_VOICE_DEMO_TRANSCRIPTION_MODEL") || "gpt-realtime-whisper",
    // Post-call analysis reads and writes conversation rows.
    analysis_enabled: false,
    analysis_model_id: "gpt-4o-mini",
    updated_at: new Date().toISOString(),
  };
}

/**
 * Records data that would have been persisted, so a lead captured during a
 * demo can still be recovered from the application log.
 */
export function logSkippedWrite(kind: string, detail: Record<string, unknown>) {
  console.warn(`[demo-mode] ${kind} was NOT saved (no database configured):`, JSON.stringify(detail));
}

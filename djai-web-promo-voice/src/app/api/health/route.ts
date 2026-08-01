import { NextResponse } from "next/server";
import { buildVersion } from "@/lib/build-info";
import { getSql } from "@/lib/db";
import { describeEnv } from "@/lib/env-diagnostics";
import { isDemoMode } from "@/lib/demo-mode";
import { getCachedSettings } from "@/lib/settings-cache";
import { optionalEnv } from "@/lib/env";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const demoMode = isDemoMode();
  const env = describeEnv();
  const checks = {
    database: false,
    settings: false,
    env: env.ok,
  };
  let status = 200;

  if (demoMode) {
    // Demo mode deliberately runs with no database, using seeded settings.
    checks.database = true;
    checks.settings = true;
  } else {
    try {
      const sql = getSql();
      const rows = (await sql`
        select id
        from settings
        where id = 1
        limit 1
      `) as { id: number }[];

      checks.database = true;
      checks.settings = Boolean(rows[0]);
    } catch (error) {
      console.error("Health check failed", error);
      status = 503;
    }
  }

  const ok = checks.database && checks.settings && checks.env;

  if (!ok) {
    status = 503;
  }

  // Resolving settings must never turn a health probe into a 500, so fall back
  // to reporting only what the environment says.
  let voiceConfig: Record<string, unknown> = {
    openaiKeyPresent: Boolean(optionalEnv("OPENAI_API_KEY")),
    geminiKeyPresent: Boolean(optionalEnv("GEMINI_API_KEY")),
  };

  try {
    const settings = await getCachedSettings();
    voiceConfig = {
      ...voiceConfig,
      agentEnabled: settings.agent_enabled,
      provider: settings.voice_provider,
      modelId: settings.model_id,
      transcriptionModel: settings.transcription_model,
      voiceName: settings.voice,
    };
  } catch {
    voiceConfig = { ...voiceConfig, settingsError: true };
  }

  return NextResponse.json(
    {
      ok,
      service: "djai-voice-sales-agent",
      buildVersion,
      demoMode,
      // What /api/session will actually try to use. Presence only, no values.
      voice: voiceConfig,
      ...(demoMode
        ? { warning: "Demo mode: no database. Conversations and leads are not being saved." }
        : {}),
      checks,
      // Names only. Values are never included in this response.
      envMissing: env.missing,
      envWarnings: env.warnings,
      time: new Date().toISOString(),
    },
    {
      status,
      headers: {
        "X-DJAI-Build": buildVersion,
      },
    },
  );
}

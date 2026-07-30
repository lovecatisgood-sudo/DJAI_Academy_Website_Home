import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { getSql } from "@/lib/db";
import { invalidateSettingsCache } from "@/lib/settings-cache";
import { readJsonBody } from "@/lib/http-guards";
import { normalizeSettingsInput } from "@/lib/settings-validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  await requireAdmin();
  const sql = getSql();
  const rows = (await sql`select * from settings where id = 1 limit 1`) as Record<string, unknown>[];
  return NextResponse.json(rows[0] || null);
}

export async function PATCH(request: Request) {
  await requireAdmin();
  const body = (await readJsonBody(request, 70000)) as Record<string, unknown>;
  const settings = normalizeSettingsInput(body, "patch");
  const sql = getSql();

  await sql`
    update settings set
      agent_enabled = coalesce(${settings.agent_enabled ?? null}, agent_enabled),
      greeting = coalesce(${settings.greeting ?? null}, greeting),
      voice = coalesce(${settings.voice ?? null}, voice),
      voice_provider = coalesce(${settings.voice_provider ?? null}, voice_provider),
      language_mode = coalesce(${settings.language_mode ?? null}, language_mode),
      knowledge_md = coalesce(${settings.knowledge_md ?? null}, knowledge_md),
      max_call_seconds = coalesce(${settings.max_call_seconds ?? null}, max_call_seconds),
      daily_session_cap = coalesce(${settings.daily_session_cap ?? null}, daily_session_cap),
      model_id = coalesce(${settings.model_id ?? null}, model_id),
      transcription_model = coalesce(${settings.transcription_model ?? null}, transcription_model),
      analysis_enabled = coalesce(${settings.analysis_enabled ?? null}, analysis_enabled),
      analysis_model_id = coalesce(${settings.analysis_model_id ?? null}, analysis_model_id),
      knowledge_version = knowledge_version + 1,
      updated_at = now()
    where id = 1
  `;

  invalidateSettingsCache();
  return NextResponse.json({ ok: true });
}

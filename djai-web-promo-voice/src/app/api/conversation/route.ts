import { getSql } from "@/lib/db";
import { verifySessionContext } from "@/lib/session-context";
import type { ConversationLanguage, TranscriptItem } from "@/lib/types";
import { corsJson, corsNoContent } from "@/lib/cors";
import { readJsonBody } from "@/lib/http-guards";
import { checkRateLimit } from "@/lib/rate-limit";
import { getCachedSettings } from "@/lib/settings-cache";
import { analyzeAndPersistConversation } from "@/lib/conversation-post-analysis";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function OPTIONS(request: Request) {
  return corsNoContent(request);
}

const transcriptRoles = new Set(["user", "assistant", "tool", "system"]);

function parseTranscript(value: unknown): TranscriptItem[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((item): item is TranscriptItem => {
      if (!item || typeof item !== "object") {
        return false;
      }
      const row = item as Record<string, unknown>;
      return typeof row.role === "string" && transcriptRoles.has(row.role) && typeof row.text === "string";
    })
    .slice(0, 500)
    .map((item) => ({
      role: item.role,
      text: item.text.slice(0, 4000),
      t: typeof item.t === "number" ? item.t : Date.now(),
    }));
}

function parseLanguage(value: unknown): ConversationLanguage {
  return value === "th" || value === "en" || value === "vi" || value === "mixed" ? value : "mixed";
}

export async function POST(request: Request) {
  try {
    const body = (await readJsonBody(request, 250000)) as {
      sessionContext?: unknown;
      duration_seconds?: unknown;
      language?: unknown;
      page_url?: unknown;
      transcript?: unknown;
    };
    const session = verifySessionContext(body.sessionContext);
    const rateLimit = checkRateLimit(`conversation:${session.conversationId}`, 20, 60 * 60 * 1000);

    if (!rateLimit.allowed) {
      return corsJson(
        request,
        { error: "Too many conversation save attempts for this session." },
        { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds) } },
      );
    }

    const transcript = parseTranscript(body.transcript);
    const maxDuration = session.maxCallSeconds + 60;
    const duration = typeof body.duration_seconds === "number"
      ? Math.min(maxDuration, Math.max(0, Math.round(body.duration_seconds)))
      : null;
    const pageUrl = typeof body.page_url === "string" ? body.page_url.slice(0, 1000) : null;
    const language = parseLanguage(body.language);
    const sql = getSql();
    const settings = await getCachedSettings();

    await sql`
      insert into conversations (
        id,
        started_at,
        ended_at,
        duration_seconds,
        language,
        page_url,
        transcript,
        had_lead,
        analysis_status
      )
      values (
        ${session.conversationId},
        now() - (${duration ?? 0} * interval '1 second'),
        now(),
        ${duration},
        ${language},
        ${pageUrl},
        ${JSON.stringify(transcript)},
        exists(select 1 from leads where conversation_id = ${session.conversationId}),
        ${settings.analysis_enabled && transcript.length ? "pending" : "skipped"}
      )
      on conflict (id) do update set
        ended_at = excluded.ended_at,
        duration_seconds = excluded.duration_seconds,
        language = excluded.language,
        page_url = excluded.page_url,
        transcript = excluded.transcript,
        had_lead = conversations.had_lead or excluded.had_lead,
        analysis_status = excluded.analysis_status,
        analysis_error = null
    `;

    if (!settings.analysis_enabled || !transcript.length) {
      return corsJson(request, { ok: true, analysis: "skipped" });
    }

    const analysis = await analyzeAndPersistConversation(session.conversationId, { settings });
    return corsJson(request, { ok: true, analysis });
  } catch (error) {
    console.error(error);
    return corsJson(request, { error: error instanceof Error ? error.message : "Conversation save failed." }, { status: 400 });
  }
}

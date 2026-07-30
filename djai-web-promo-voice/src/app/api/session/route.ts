import { getSql } from "@/lib/db";
import { getCachedSettings } from "@/lib/settings-cache";
import { requireEnv } from "@/lib/env";
import { buildVoiceAgentSystemPrompt, captureLeadTool } from "@/lib/prompt";
import { createSessionContext } from "@/lib/session-context";
import { corsJson, corsNoContent } from "@/lib/cors";
import { checkRateLimit } from "@/lib/rate-limit";
import { buildVersion } from "@/lib/build-info";
import { readJsonBody } from "@/lib/http-guards";
import { mintGeminiLiveToken } from "@/lib/gemini-live";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getSafetyIdentifier(request: Request) {
  const realIp = request.headers.get("x-real-ip")?.trim();
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const candidate = realIp || forwardedFor || "unknown";
  return /^[A-Za-z0-9.:_-]{1,80}$/.test(candidate) ? candidate : "unknown";
}

function extractClientSecret(data: unknown) {
  const payload = data && typeof data === "object" ? (data as Record<string, unknown>) : {};
  const nested = payload.client_secret && typeof payload.client_secret === "object"
    ? (payload.client_secret as Record<string, unknown>)
    : null;
  const value = typeof payload.value === "string"
    ? payload.value
    : typeof nested?.value === "string"
      ? nested.value
      : "";
  const expiresAt = typeof payload.expires_at === "number"
    ? payload.expires_at
    : typeof nested?.expires_at === "number"
      ? nested.expires_at
      : null;

  return value ? { value, expires_at: expiresAt } : null;
}

export function OPTIONS(request: Request) {
  return corsNoContent(request);
}

export async function GET(request: Request) {
  try {
    const settings = await getCachedSettings();
    return corsJson(
      request,
      {
        agentEnabled: settings.agent_enabled,
        maxCallSeconds: settings.max_call_seconds,
        voiceProvider: settings.voice_provider,
        buildVersion,
      },
      {
        headers: {
          "X-DJAI-Build": buildVersion,
        },
      },
    );
  } catch (error) {
    console.error(error);
    return corsJson(
      request,
      { agentEnabled: false, buildVersion },
      {
        status: 200,
        headers: {
          "X-DJAI-Build": buildVersion,
        },
      },
    );
  }
}

function sanitizePageUrl(value: unknown) {
  if (typeof value !== "string") return "";

  try {
    const parsed = new URL(value);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return "";
    return `${parsed.origin}${parsed.pathname}`.slice(0, 1000);
  } catch {
    return "";
  }
}

async function reserveConversation(conversationId: string, pageUrl: string, dailySessionCap: number) {
  const sql = getSql();
  const rows = (await sql`
    with locked as (
      select pg_advisory_xact_lock(514124712)
    ),
    quota as (
      select count(*)::int as count
      from conversations, locked
      where started_at >= date_trunc('day', now() at time zone 'Asia/Bangkok') at time zone 'Asia/Bangkok'
    ),
    inserted as (
      insert into conversations (id, started_at, page_url, transcript, had_lead)
      select ${conversationId}, now(), ${pageUrl || null}, '[]'::jsonb, false
      from quota
      where count < ${dailySessionCap}
      on conflict (id) do nothing
      returning id
    )
    select id::text as id from inserted
  `) as { id: string }[];

  return Boolean(rows[0]?.id);
}

async function cleanupReservedConversation(conversationId: string) {
  const sql = getSql();
  await sql`
    delete from conversations
    where id = ${conversationId}
      and ended_at is null
      and had_lead = false
      and transcript = '[]'::jsonb
  `;
}

export async function POST(request: Request) {
  let reservedConversationId: string | null = null;

  try {
    let body: { pageUrl?: string; preferredLanguage?: string };

    try {
      body = (await readJsonBody(request, 4096)) as { pageUrl?: string; preferredLanguage?: string };
    } catch {
      return corsJson(request, { error: "Invalid session request." }, { status: 400 });
    }

    const settings = await getCachedSettings();
    const rateLimit = checkRateLimit(getSafetyIdentifier(request), 12, 60 * 60 * 1000);

    if (!rateLimit.allowed) {
      return corsJson(
        request,
        { error: "Too many voice session attempts. Try again later." },
        {
          status: 429,
          headers: { "Retry-After": String(rateLimit.retryAfterSeconds) },
        },
      );
    }

    if (!settings.agent_enabled) {
      return corsJson(request, { error: "Voice agent is currently offline." }, { status: 403 });
    }

    const pageUrl = sanitizePageUrl(body.pageUrl);
    const preferredLanguage = body.preferredLanguage === "th" || body.preferredLanguage === "en"
      ? body.preferredLanguage
      : "auto";
    const prompt = buildVoiceAgentSystemPrompt({
      settings,
      pageUrl,
      preferredLanguage,
      provider: settings.voice_provider,
      now: new Date(),
    });
    const sessionContext = createSessionContext(settings.max_call_seconds + 900, settings.max_call_seconds);
    reservedConversationId = sessionContext.conversationId;

    if (!(await reserveConversation(sessionContext.conversationId, pageUrl, settings.daily_session_cap))) {
      reservedConversationId = null;
      return corsJson(request, { error: "Daily voice session cap reached." }, { status: 429 });
    }

    if (process.env.NODE_ENV !== "production") {
      console.info("\n--- DJAI VOICE AGENT SYSTEM PROMPT ---\n%s\n--- END PROMPT ---\n", prompt);
    }

    if (settings.voice_provider === "gemini") {
      try {
        const gemini = await mintGeminiLiveToken(settings, prompt);

        return corsJson(request, {
          provider: "gemini",
          gemini,
          sessionContext,
          conversationId: sessionContext.conversationId,
          maxCallSeconds: settings.max_call_seconds,
          greeting: settings.greeting,
          modelId: settings.model_id,
          buildVersion,
        }, { headers: { "X-DJAI-Build": buildVersion } });
      } catch (error) {
        console.error("Gemini Live token error", error);
        await cleanupReservedConversation(sessionContext.conversationId);
        reservedConversationId = null;

        return corsJson(
          request,
          {
            error: "Voice agent is unavailable. Please try again shortly.",
            code: "gemini_live_token_failed",
            buildVersion,
          },
          { status: 502, headers: { "X-DJAI-Build": buildVersion } },
        );
      }
    }

    const response = await fetch("https://api.openai.com/v1/realtime/client_secrets", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${requireEnv("OPENAI_API_KEY")}`,
        "Content-Type": "application/json",
        "OpenAI-Safety-Identifier": getSafetyIdentifier(request),
      },
      body: JSON.stringify({
        session: {
          type: "realtime",
          model: settings.model_id,
          instructions: prompt,
          audio: {
            input: {
              format: {
                type: "audio/pcm",
                rate: 24000,
              },
              transcription: {
                model: settings.transcription_model,
              },
              noise_reduction: {
                type: "far_field",
              },
              turn_detection: {
                type: "server_vad",
                threshold: 0.65,
                prefix_padding_ms: 300,
                silence_duration_ms: 700,
                idle_timeout_ms: 30000,
                create_response: true,
                interrupt_response: false,
              },
            },
            output: {
              format: {
                type: "audio/pcm",
                rate: 24000,
              },
              voice: settings.voice,
            },
          },
          output_modalities: ["audio"],
          tools: [captureLeadTool],
          tool_choice: "auto",
          max_output_tokens: 4096,
          reasoning: {
            effort: "low",
          },
        },
      }),
      signal: AbortSignal.timeout(15000),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      console.error("OpenAI client secret error", {
        status: response.status,
        requestId: response.headers.get("x-request-id"),
        data,
      });
      await cleanupReservedConversation(sessionContext.conversationId);
      reservedConversationId = null;
      return corsJson(
        request,
        {
          error: "Voice agent is unavailable. Please try again shortly.",
          code: "openai_client_secret_failed",
          upstreamStatus: response.status,
          requestId: response.headers.get("x-request-id"),
          buildVersion,
        },
        { status: 502, headers: { "X-DJAI-Build": buildVersion } },
      );
    }

    const clientSecret = extractClientSecret(data);

    if (!clientSecret) {
      console.error("OpenAI client secret response was missing a usable value.", {
        requestId: response.headers.get("x-request-id"),
      });
      await cleanupReservedConversation(sessionContext.conversationId);
      reservedConversationId = null;
      return corsJson(
        request,
        {
          error: "Voice agent is unavailable. Please try again shortly.",
          code: "openai_client_secret_missing",
          requestId: response.headers.get("x-request-id"),
          buildVersion,
        },
        { status: 502, headers: { "X-DJAI-Build": buildVersion } },
      );
    }

    return corsJson(request, {
      provider: "openai",
      clientSecret,
      sessionContext,
      conversationId: sessionContext.conversationId,
      maxCallSeconds: settings.max_call_seconds,
      greeting: settings.greeting,
      modelId: settings.model_id,
      buildVersion,
    }, { headers: { "X-DJAI-Build": buildVersion } });
  } catch (error) {
    if (reservedConversationId) {
      await cleanupReservedConversation(reservedConversationId).catch((cleanupError) => {
        console.error("Failed to clean up reserved conversation", cleanupError);
      });
    }

    console.error(error);
    return corsJson(
      request,
      {
        error: "Voice agent is unavailable. Please try again shortly.",
        code: "session_failed",
        buildVersion,
      },
      { status: 500, headers: { "X-DJAI-Build": buildVersion } },
    );
  }
}

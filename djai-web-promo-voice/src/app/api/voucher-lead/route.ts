import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getSql } from "@/lib/db";
import { optionalEnv } from "@/lib/env";
import { readJsonBody } from "@/lib/http-guards";
import { checkRateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function cleanString(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().replace(/\s+/g, " ").slice(0, maxLength) : "";
}

function clientIdentifier(request: Request) {
  const value =
    request.headers.get("x-real-ip")?.trim() ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown";
  return /^[A-Za-z0-9.:_-]{1,80}$/.test(value) ? value : "unknown";
}

function assertSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return;

  const forwardedHost = request.headers.get("x-forwarded-host") || request.headers.get("host");
  const forwardedProto = request.headers.get("x-forwarded-proto") || new URL(request.url).protocol.replace(":", "");
  const allowedOrigins = new Set([new URL(request.url).origin]);
  if (forwardedHost) allowedOrigins.add(`${forwardedProto}://${forwardedHost}`);

  if (!allowedOrigins.has(origin)) {
    throw new Error("This request must come from the DJAI website.");
  }
}

async function sendLeadNotification(input: {
  email: string;
  language: string;
  deadline: number;
  leadId: string | null;
}) {
  const host = optionalEnv("SMTP_HOST") || "smtp.hostinger.com";
  const portValue = Number(optionalEnv("SMTP_PORT") || "465");
  const port = Number.isInteger(portValue) && portValue > 0 && portValue <= 65535 ? portValue : 465;
  const secureSetting = optionalEnv("SMTP_SECURE").toLowerCase();
  const secure = secureSetting ? secureSetting === "true" : port === 465;
  const user = optionalEnv("SMTP_USER");
  const password = optionalEnv("SMTP_PASSWORD");
  const to = optionalEnv("LEAD_NOTIFICATION_EMAIL");
  const fromName = optionalEnv("SMTP_FROM_NAME") || "DJAI Academy Leads";

  if (!user || !password || !to) return false;

  const transport = nodemailer.createTransport({
    host,
    port,
    secure,
    requireTLS: !secure,
    auth: {
      user,
      pass: password,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });

  await transport.sendMail({
    from: { name: fromName, address: user },
    to,
    replyTo: input.email,
    subject: "New DJAI ฿10,000 web voucher lead",
    text: [
      "A visitor reserved the DJAI web-development voucher.",
      `Email: ${input.email}`,
      `Language: ${input.language}`,
      `Reservation deadline: ${new Date(input.deadline).toISOString()}`,
      `Lead ID: ${input.leadId || "not returned"}`,
      "View the lead in /voice_admin/.",
    ].join("\n"),
  });

  return true;
}

export async function POST(request: Request) {
  try {
    assertSameOrigin(request);
    const rateLimit = checkRateLimit(`voucher:${clientIdentifier(request)}`, 5, 60 * 60 * 1000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Too many voucher requests. Please try again later." },
        { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds) } },
      );
    }

    const body = (await readJsonBody(request, 8000)) as Record<string, unknown>;
    if (cleanString(body.website, 200)) {
      return NextResponse.json({ ok: true, leadId: null });
    }

    const email = cleanString(body.email, 254).toLowerCase();
    const language = body.language === "en" || body.language === "vi" ? body.language : "th";
    const deadline = typeof body.deadline === "number" ? Math.round(body.deadline) : 0;
    const pageUrl = cleanString(body.pageUrl, 1000);
    const now = Date.now();

    if (!emailPattern.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }
    if (body.consent !== true) {
      return NextResponse.json({ error: "Consent is required before we can contact you." }, { status: 400 });
    }
    if (deadline <= now || deadline > now + 4 * 60 * 60 * 1000 + 15 * 60 * 1000) {
      return NextResponse.json({ error: "This voucher reservation window has expired." }, { status: 400 });
    }

    const sql = getSql();
    const need =
      "[WEB_VOUCHER_10000] Guaranteed 10,000 THB voucher: full value for the 20,000 THB Complete Website package; other packages capped at 50% of standard price.";
    const rows = (await sql`
      with conversation_row as (
        insert into conversations (
          started_at,
          ended_at,
          language,
          page_url,
          had_lead,
          summary,
          business_type,
          main_problem,
          business_goal,
          interest_level,
          recommended_service,
          next_action,
          analysis_status
        ) values (
          now(),
          now(),
          ${language},
          ${pageUrl || "https://www.djai.academy/web_promo/"},
          true,
          ${`Voucher lead reserved by ${email}`},
          'Website development prospect',
          'Interested in the DJAI web-development discount',
          'Reserve a website package within the four-hour voucher window',
          'high',
          'Complete Website or eligible package at up to 50% off',
          'Follow up by email about project requirements',
          'skipped'
        )
        returning id
      ),
      lead_row as (
        insert into leads (
          conversation_id,
          name,
          contact,
          contact_type,
          need,
          preferred_time,
          status,
          client_name,
          email,
          preferred_contact_method,
          preferred_meeting_time,
          updated_at
        )
        select
          id,
          'Web voucher lead',
          ${email},
          'email',
          ${need},
          'Within the four-hour voucher window',
          'pending_follow_up',
          'Web voucher lead',
          ${email},
          'email',
          'Within the four-hour voucher window',
          now()
        from conversation_row
        returning id
      )
      select id from lead_row
    `) as { id: string }[];

    const leadId = rows[0]?.id ?? null;
    let notificationSent = false;
    try {
      notificationSent = await sendLeadNotification({ email, language, deadline, leadId });
    } catch (notificationError) {
      console.error("Voucher lead was saved, but email notification failed.", notificationError);
    }

    return NextResponse.json({ ok: true, leadId, notificationSent });
  } catch (error) {
    console.error("Voucher lead capture failed.", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Voucher lead capture failed." },
      { status: 400 },
    );
  }
}

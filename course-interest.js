const crypto = require("node:crypto");

const COURSE_INTEREST_PATH = "/api/course-interest";
const COURSE_INTEREST_RECIPIENT = "app@school.djai.academy";
const MAX_BODY_BYTES = 16 * 1024;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const allowedFormats = new Set(["public-online", "private-online", "in-person", "team"]);

function json(res, statusCode, payload, extraHeaders = {}) {
  const body = JSON.stringify(payload);
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(body),
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
    ...extraHeaders
  });
  res.end(body);
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}

function cleanText(value, maximum) {
  if (typeof value !== "string") return "";
  return value.trim().replace(/\r\n?/g, "\n").slice(0, maximum);
}

function validateCourseInterest(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const name = cleanText(value.name, 100);
  const email = cleanText(value.email, 254).toLowerCase();
  const phone = cleanText(value.phone, 40);
  const courseFormat = cleanText(value.courseFormat, 40);
  const schedule = cleanText(value.schedule, 200);
  const goals = cleanText(value.goals, 2000);
  const locale = value.locale === "th" ? "th" : value.locale === "en" ? "en" : "";
  const company = cleanText(value.company, 200);

  if (name.length < 2 || !/^[^\r\n]+$/u.test(name)) return null;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/u.test(email)) return null;
  if (phone && !/^[+()\-\s.0-9]{6,40}$/u.test(phone)) return null;
  if (!allowedFormats.has(courseFormat)) return null;
  if (goals.length < 10) return null;
  if (!locale || value.consent !== true) return null;

  return { name, email, phone, courseFormat, schedule, goals, locale, company };
}

function requestOrigin(req) {
  const forwardedProtocol = cleanText(req.headers["x-forwarded-proto"], 20).split(",")[0];
  const protocol = forwardedProtocol || (req.socket?.encrypted ? "https" : "http");
  const host = cleanText(req.headers["x-forwarded-host"] || req.headers.host, 255).split(",")[0];
  return host ? `${protocol}://${host}` : "";
}

function isSameOrigin(req) {
  if (String(req.headers["sec-fetch-site"] || "").toLowerCase() === "cross-site") return false;
  const origin = cleanText(req.headers.origin, 500).replace(/\/$/, "");
  return Boolean(origin && origin === requestOrigin(req));
}

function clientIp(req) {
  return cleanText(req.headers["x-forwarded-for"], 500).split(",")[0]
    || cleanText(req.headers["x-real-ip"], 100)
    || req.socket?.remoteAddress
    || "unknown";
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > MAX_BODY_BYTES) {
        reject(Object.assign(new Error("Request body too large"), { statusCode: 413 }));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => {
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString("utf8")));
      } catch {
        reject(Object.assign(new Error("Invalid JSON"), { statusCode: 400 }));
      }
    });
    req.on("error", reject);
  });
}

function formatLabel(format) {
  return ({
    "public-online": "Next public online course",
    "private-online": "Private online course",
    "in-person": "In-person course",
    team: "Team or company course"
  })[format];
}

function notificationHtml(input) {
  const row = (label, value) => value
    ? `<tr><th align="left" style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#475569;vertical-align:top">${label}</th><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#111827;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`
    : "";
  return `<!doctype html><html><body style="font-family:Arial,sans-serif;color:#111827"><h1 style="font-size:22px">New Siamese Cat Dev course interest</h1><table style="border-collapse:collapse;width:100%;max-width:680px">${row("Name", input.name)}${row("Email", input.email)}${row("Phone / WhatsApp", input.phone)}${row("Course format", formatLabel(input.courseFormat))}${row("Preferred schedule", input.schedule)}${row("Goals or project", input.goals)}${row("Page language", input.locale.toUpperCase())}</table><p style="color:#64748b;font-size:12px">Submitted from the course interest form on www.djai.academy. Reply directly to this email to contact the learner.</p></body></html>`;
}

async function sendNotification(input, { fetchImpl, env }) {
  const apiKey = cleanText(env.COURSE_INTEREST_RESEND_API_KEY || env.RESEND_API_KEY, 500);
  const sender = cleanText(env.COURSE_INTEREST_EMAIL_FROM || env.EMAIL_FROM, 254);
  if (!apiKey || !sender) {
    console.error("Course interest email is not configured.");
    return false;
  }

  const idempotencyKey = crypto.createHash("sha256")
    .update(`${input.email}\n${input.courseFormat}\n${input.goals}`)
    .digest("hex");
  const response = await fetchImpl("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": `course-interest-${idempotencyKey}`,
      "User-Agent": "djai-academy-website/1.0"
    },
    body: JSON.stringify({
      from: `Siamese Cat Dev Course <${sender}>`,
      to: [COURSE_INTEREST_RECIPIENT],
      reply_to: input.email,
      subject: `Course booking interest — ${input.name}`,
      html: notificationHtml(input)
    }),
    signal: AbortSignal.timeout(10_000)
  });
  if (!response.ok) {
    console.error(`Course interest email provider returned ${response.status}.`);
    return false;
  }
  return true;
}

function createCourseInterestHandler(options = {}) {
  const fetchImpl = options.fetchImpl || globalThis.fetch;
  const env = options.env || process.env;
  const now = options.now || Date.now;
  const rateLimitStore = options.rateLimitStore || new Map();

  return async function handleCourseInterest(req, res) {
    if (req.method !== "POST") {
      json(res, 405, { ok: false, error: "Method not allowed" }, { Allow: "POST" });
      return;
    }
    if (!isSameOrigin(req)) {
      json(res, 403, { ok: false, error: "Invalid request origin" });
      return;
    }
    if (!String(req.headers["content-type"] || "").toLowerCase().startsWith("application/json")) {
      json(res, 415, { ok: false, error: "JSON request required" });
      return;
    }

    const timestamp = now();
    const ip = clientIp(req);
    const recent = (rateLimitStore.get(ip) || []).filter((entry) => timestamp - entry < RATE_LIMIT_WINDOW_MS);
    if (recent.length >= RATE_LIMIT_MAX) {
      rateLimitStore.set(ip, recent);
      json(res, 429, { ok: false, error: "Too many requests" }, { "Retry-After": "900" });
      return;
    }
    recent.push(timestamp);
    rateLimitStore.set(ip, recent);

    let input;
    try {
      input = validateCourseInterest(await readJson(req));
    } catch (error) {
      json(res, error.statusCode || 400, { ok: false, error: "Invalid request" });
      return;
    }
    if (!input) {
      json(res, 400, { ok: false, error: "Please check the form fields" });
      return;
    }
    if (input.company) {
      json(res, 200, { ok: true });
      return;
    }

    try {
      const delivered = await sendNotification(input, { fetchImpl, env });
      if (!delivered) {
        json(res, 502, { ok: false, error: "Notification delivery failed" });
        return;
      }
      json(res, 200, { ok: true });
    } catch (error) {
      console.error("Course interest notification failed.", error instanceof Error ? error.message : error);
      json(res, 502, { ok: false, error: "Notification delivery failed" });
    }
  };
}

module.exports = {
  COURSE_INTEREST_PATH,
  COURSE_INTEREST_RECIPIENT,
  createCourseInterestHandler,
  escapeHtml,
  notificationHtml,
  validateCourseInterest
};

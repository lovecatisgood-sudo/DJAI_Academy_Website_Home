// Runtime diagnosis for a deployed voice agent.
//
// Run this from the Hostinger shell (or locally) when the widget stops working
// after an environment-variable change. It never prints secret values: only
// presence, length, and a verdict per variable.
//
//   node scripts/diagnose-voice-agent.mjs
//   node scripts/diagnose-voice-agent.mjs --skip-network
import { loadNeon } from "./neon-client.mjs";
import { loadLocalEnv } from "./local-env.mjs";
import { readEnv, redactError, requireDatabaseUrl } from "./env-utils.mjs";

loadLocalEnv();

const skipNetwork = process.argv.includes("--skip-network");
const problems = [];
const warnings = [];

function fail(message, fix) {
  problems.push({ message, fix });
  console.log(`  FAIL  ${message}`);
  if (fix) console.log(`        fix: ${fix}`);
}

function warn(message, fix) {
  warnings.push({ message, fix });
  console.log(`  WARN  ${message}`);
  if (fix) console.log(`        fix: ${fix}`);
}

function pass(message) {
  console.log(`  ok    ${message}`);
}

function section(title) {
  console.log(`\n${title}`);
}

// ---------------------------------------------------------------------------
// 1. Environment variables
// ---------------------------------------------------------------------------
section("1. Environment variables");

const required = [
  "DATABASE_URL",
  "OPENAI_API_KEY",
  "ADMIN_USERNAME",
  "ADMIN_PASSWORD",
  "SESSION_PASSWORD",
  "SESSION_SIGNING_SECRET",
  "WIDGET_ALLOWED_ORIGINS",
];

for (const name of required) {
  const raw = process.env[name];
  const value = readEnv(name);

  if (!value) {
    fail(
      `${name} is missing or empty.`,
      "Add it in hPanel > Node.js app > Environment variables, then restart the app.",
    );
    continue;
  }

  if (raw !== value) {
    warn(
      `${name} had surrounding quotes or whitespace that had to be stripped.`,
      "In hPanel paste only the value itself, with no quotes and no NAME= prefix.",
    );
  }

  if (value.startsWith(`${name}=`)) {
    fail(
      `${name} still contains the "${name}=" prefix in its value.`,
      "Paste only the value into the hPanel value box, not the whole NAME=value line.",
    );
    continue;
  }

  pass(`${name} present (${value.length} chars)`);
}

// Secret strength. Nothing in the running app enforces these lengths, so a
// short secret deploys cleanly and only weakens signing.
for (const name of ["SESSION_PASSWORD", "SESSION_SIGNING_SECRET"]) {
  const value = readEnv(name);
  if (value && value.length < 32) {
    fail(
      `${name} is ${value.length} characters; at least 32 are required.`,
      "Generate a new one with: node -e \"console.log(require('crypto').randomBytes(32).toString('base64url'))\"",
    );
  }
}

const sessionPassword = readEnv("SESSION_PASSWORD");
const signingSecret = readEnv("SESSION_SIGNING_SECRET");

if (sessionPassword && signingSecret && sessionPassword === signingSecret) {
  warn(
    "SESSION_PASSWORD and SESSION_SIGNING_SECRET are identical.",
    "Use two different random secrets so admin cookies and call tokens are signed independently.",
  );
}

if (sessionPassword) {
  console.log(
    "        note: changing SESSION_PASSWORD invalidates every existing /voice_admin\n" +
      "              login cookie. Signing out and back in is expected, not a bug.",
  );
}

if (!signingSecret && sessionPassword) {
  warn(
    "SESSION_SIGNING_SECRET is unset, so call tokens fall back to SESSION_PASSWORD.",
    "Set SESSION_SIGNING_SECRET so rotating the admin password cannot drop live calls.",
  );
}

const openaiKey = readEnv("OPENAI_API_KEY");

if (openaiKey && !openaiKey.startsWith("sk-")) {
  fail(
    "OPENAI_API_KEY does not start with sk- and is not a server API key.",
    "Copy a secret key from platform.openai.com/api-keys (not a project id or org id).",
  );
}

const allowedOrigins = readEnv("WIDGET_ALLOWED_ORIGINS")
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean);

for (const origin of allowedOrigins) {
  try {
    const parsed = new URL(origin);
    if (!["http:", "https:"].includes(parsed.protocol) || parsed.origin !== origin) {
      throw new Error();
    }
  } catch {
    fail(
      `WIDGET_ALLOWED_ORIGINS contains an invalid origin: ${origin}`,
      "Use bare origins such as https://www.djai.academy, with no path and no trailing slash.",
    );
  }
}

if (allowedOrigins.length && !problems.length) {
  pass(`WIDGET_ALLOWED_ORIGINS lists ${allowedOrigins.length} origin(s)`);
}

// ---------------------------------------------------------------------------
// 2. Database and live settings
// ---------------------------------------------------------------------------
section("2. Database and live settings");

let settings = null;

if (!readEnv("DATABASE_URL")) {
  fail("Skipping database checks because DATABASE_URL is unset.");
} else if (skipNetwork) {
  console.log("  skip  --skip-network was passed.");
} else {
  try {
    const sql = (await loadNeon())(requireDatabaseUrl());
    const rows = await sql`select * from settings where id = 1 limit 1`;
    settings = rows[0] || null;

    if (!settings) {
      fail(
        "The settings row (id = 1) is missing.",
        "Run: npm run migrate  from djai-web-promo-voice with DATABASE_URL set.",
      );
    } else {
      pass("Connected to Neon and read the settings row");
      console.log(`        agent_enabled       ${settings.agent_enabled}`);
      console.log(`        voice_provider      ${settings.voice_provider}`);
      console.log(`        model_id            ${settings.model_id}`);
      console.log(`        transcription_model ${settings.transcription_model}`);
      console.log(`        voice               ${settings.voice}`);
      console.log(`        max_call_seconds    ${settings.max_call_seconds}`);
      console.log(`        daily_session_cap   ${settings.daily_session_cap}`);

      if (!settings.agent_enabled) {
        fail(
          "agent_enabled is false, so /api/session rejects every call with HTTP 403.",
          "Turn the agent back on in /voice_admin > Settings.",
        );
      }

      const [usage] = await sql`
        select count(*)::int as count
        from conversations
        where started_at >= date_trunc('day', now() at time zone 'Asia/Bangkok') at time zone 'Asia/Bangkok'
      `;

      console.log(`        sessions today      ${usage.count} / ${settings.daily_session_cap}`);

      if (usage.count >= settings.daily_session_cap) {
        fail(
          "The daily session cap is already reached, so /api/session returns HTTP 429.",
          "Raise daily_session_cap in /voice_admin > Settings, or wait for the Asia/Bangkok day to roll over.",
        );
      }

      if (settings.voice_provider === "gemini" && !readEnv("GEMINI_API_KEY")) {
        fail(
          "voice_provider is gemini but GEMINI_API_KEY is unset.",
          "Set GEMINI_API_KEY, or switch the provider back to OpenAI in /voice_admin > Settings.",
        );
      }
    }
  } catch (error) {
    const message = redactError(error);

    // loadNeon() already explains itself; a generic connection hint would only
    // point somewhere unrelated.
    if (message.includes("Cannot find @neondatabase/serverless")) {
      fail(message);
    } else if (/relation .* does not exist|does not exist/i.test(message)) {
      // A brand-new Neon project or branch has no schema at all, which is the
      // usual state right after DATABASE_URL is repointed.
      fail(
        `The database has no voice-agent schema yet: ${message}`,
        'This database has never been migrated. Run "npm run migrate" against it from a machine with dependencies installed.',
      );
    } else if (/password authentication|authentication failed/i.test(message)) {
      fail(
        `Neon rejected the credentials: ${message}`,
        "Copy the connection string again from the Neon dashboard, and URL-encode any reserved characters in a hand-typed password.",
      );
    } else {
      fail(
        `Database check failed: ${message}`,
        "Confirm DATABASE_URL is the current Neon connection string and the project is not suspended.",
      );
    }
  }
}

// ---------------------------------------------------------------------------
// 3. OpenAI credential
// ---------------------------------------------------------------------------
section("3. OpenAI credential");

if (!openaiKey) {
  fail("Skipping OpenAI checks because OPENAI_API_KEY is unset.");
} else if (skipNetwork) {
  console.log("  skip  --skip-network was passed.");
} else if (settings && settings.voice_provider === "gemini") {
  console.log("  skip  voice_provider is gemini, so OPENAI_API_KEY is not used for minting.");
} else {
  const modelId = settings?.model_id || "gpt-realtime-2.1";

  try {
    const response = await fetch(`https://api.openai.com/v1/models/${encodeURIComponent(modelId)}`, {
      headers: { Authorization: `Bearer ${openaiKey}` },
      signal: AbortSignal.timeout(15000),
    });
    const body = await response.json().catch(() => null);
    const requestId = response.headers.get("x-request-id") || "none";

    // Every genuine OpenAI response carries x-request-id. A non-2xx without it
    // came from something in between, such as a proxy or egress firewall.
    if (!response.ok && requestId === "none") {
      fail(
        `Got HTTP ${response.status} from api.openai.com with no OpenAI request id.`,
        "A proxy or firewall is intercepting the call, so this says nothing about the key itself. Re-run from the Hostinger shell.",
      );
    } else if (response.ok) {
      pass(`OPENAI_API_KEY is valid and can see model ${modelId}`);
    } else if (response.status === 401) {
      fail(
        `OpenAI rejected the key with HTTP 401 (request id ${requestId}).`,
        "The key is revoked, mistyped, or truncated. Create a fresh key and paste the whole value.",
      );
    } else if (response.status === 403) {
      fail(
        `OpenAI returned HTTP 403 for model ${modelId} (request id ${requestId}).`,
        "The key is restricted or belongs to a project without Realtime access. Grant it write access to the Realtime API.",
      );
    } else if (response.status === 404) {
      fail(
        `Model ${modelId} is not available to this key (HTTP 404, request id ${requestId}).`,
        "The new key likely belongs to a different OpenAI project. Point model_id in /voice_admin > Settings at a Realtime model this project can use.",
      );
    } else if (response.status === 429) {
      fail(
        `OpenAI returned HTTP 429 (request id ${requestId}).`,
        "The project is out of quota or credit. Check billing at platform.openai.com/settings/organization/billing.",
      );
    } else {
      fail(
        `OpenAI returned HTTP ${response.status} (request id ${requestId}): ${body?.error?.message || "no message"}`,
      );
    }
  } catch (error) {
    fail(
      `Could not reach api.openai.com: ${redactError(error)}`,
      "Check outbound network access from the Hostinger container.",
    );
  }
}

// ---------------------------------------------------------------------------
// Summary
// ---------------------------------------------------------------------------
section("Summary");

if (!problems.length && !warnings.length) {
  console.log("  No configuration problems found.");
} else {
  console.log(`  ${problems.length} blocking problem(s), ${warnings.length} warning(s).`);
}

if (problems.length) {
  console.log("\n  Blocking:");
  for (const problem of problems) {
    console.log(`   - ${problem.message}`);
  }
}

process.exit(problems.length ? 1 : 0);

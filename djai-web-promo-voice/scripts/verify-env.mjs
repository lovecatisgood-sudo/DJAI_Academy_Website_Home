import { neon } from "@neondatabase/serverless";
import { loadLocalEnv } from "./local-env.mjs";
import { readEnv, requireDatabaseUrl } from "./env-utils.mjs";

loadLocalEnv();

const required = [
  "DATABASE_URL",
  "OPENAI_API_KEY",
  "ADMIN_USERNAME",
  "ADMIN_PASSWORD",
  "SESSION_PASSWORD",
  "SESSION_SIGNING_SECRET",
  "WIDGET_ALLOWED_ORIGINS",
];

const missing = required.filter((name) => !readEnv(name));

if (missing.length) {
  console.error(`Missing required environment variables: ${missing.join(", ")}`);
  process.exit(1);
}

try {
  neon(requireDatabaseUrl());
} catch (error) {
  console.error(
    error instanceof Error && !error.message.includes("Connection string:")
      ? error.message
      : "DATABASE_URL is not accepted by the Neon driver. Remove surrounding quotes and copy it again from Neon.",
  );
  process.exit(1);
}

if (!readEnv("OPENAI_API_KEY").startsWith("sk-")) {
  console.error("OPENAI_API_KEY does not look like an OpenAI server API key.");
  process.exit(1);
}

if (readEnv("GEMINI_API_KEY") && !readEnv("GEMINI_API_KEY").startsWith("AIza")) {
  console.warn("GEMINI_API_KEY is set but does not look like a standard Gemini API key.");
}

if (readEnv("SESSION_PASSWORD").length < 32) {
  console.error("SESSION_PASSWORD must be at least 32 characters.");
  process.exit(1);
}

if (readEnv("SESSION_SIGNING_SECRET").length < 32) {
  console.error("SESSION_SIGNING_SECRET must be at least 32 characters.");
  process.exit(1);
}

const allowedOrigins = readEnv("WIDGET_ALLOWED_ORIGINS");

for (const origin of allowedOrigins.split(",").map((value) => value.trim())) {
  try {
    const parsed = new URL(origin);

    if (!["http:", "https:"].includes(parsed.protocol) || parsed.origin !== origin) {
      throw new Error();
    }
  } catch {
    console.error(
      `WIDGET_ALLOWED_ORIGINS contains an invalid origin. Use origins such as https://djai.academy without paths or trailing slashes.`,
    );
    process.exit(1);
  }
}

console.log("Environment variables look ready for deployment.");

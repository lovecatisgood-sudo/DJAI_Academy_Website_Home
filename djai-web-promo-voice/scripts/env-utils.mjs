export function normalizeEnvValue(value) {
  if (typeof value !== "string") {
    return "";
  }

  let normalized = value.trim();
  const first = normalized[0];
  const last = normalized.at(-1);

  if (normalized.length >= 2 && ((first === '"' && last === '"') || (first === "'" && last === "'"))) {
    normalized = normalized.slice(1, -1).trim();
  }

  return normalized;
}

export function readEnv(name) {
  const value = normalizeEnvValue(process.env[name]);

  if (value) {
    process.env[name] = value;
  }

  return value;
}

export function requireEnv(name) {
  const value = readEnv(name);

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export function requireDatabaseUrl() {
  const value = requireEnv("DATABASE_URL");
  let parsed;

  try {
    parsed = new URL(value);
  } catch {
    throw new Error(
      "DATABASE_URL is not a valid URL. Paste the Neon connection string without surrounding quotes or spaces.",
    );
  }

  if (
    !["postgres:", "postgresql:"].includes(parsed.protocol) ||
    !parsed.username ||
    !parsed.hostname ||
    !parsed.pathname ||
    parsed.pathname === "/"
  ) {
    throw new Error(
      "DATABASE_URL must use postgresql://USER:PASSWORD@HOST/DATABASE with a database name.",
    );
  }

  return value;
}

export function redactError(error) {
  const message = error instanceof Error ? error.message : String(error);
  return message.replace(/postgres(?:ql)?:\/\/[^\s"']+/gi, "[redacted DATABASE_URL]");
}

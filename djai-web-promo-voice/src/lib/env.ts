import { existsSync, readFileSync } from "node:fs";

function loadLocalEnvFallback(name: string) {
  if (process.env.NODE_ENV === "production" || !existsSync(".env.local")) {
    return "";
  }

  const line = readFileSync(".env.local", "utf8")
    .split(/\r?\n/)
    .find((candidate) => candidate.match(new RegExp(`^\\s*${name}\\s*=`)));

  if (!line) {
    return "";
  }

  const match = line.match(/^\s*[A-Za-z_][A-Za-z0-9_]*\s*=\s*(.*)\s*$/);
  let value = match?.[1]?.trim() || "";

  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    value = value.slice(1, -1);
  }

  return value;
}

export function requireEnv(name: string): string {
  const value = optionalEnv(name);

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export function optionalEnv(name: string): string {
  let value = (process.env[name] || loadLocalEnvFallback(name)).trim();
  const first = value[0];
  const last = value.at(-1);

  if (value.length >= 2 && ((first === '"' && last === '"') || (first === "'" && last === "'"))) {
    value = value.slice(1, -1).trim();
  }

  return value;
}

export function requireDatabaseUrl(): string {
  const value = requireEnv("DATABASE_URL");
  let parsed: URL;

  try {
    parsed = new URL(value);
  } catch {
    throw new Error("DATABASE_URL is not a valid PostgreSQL connection URL.");
  }

  if (
    !["postgres:", "postgresql:"].includes(parsed.protocol) ||
    !parsed.username ||
    !parsed.hostname ||
    !parsed.pathname ||
    parsed.pathname === "/"
  ) {
    throw new Error("DATABASE_URL is not a complete PostgreSQL connection URL.");
  }

  return value;
}

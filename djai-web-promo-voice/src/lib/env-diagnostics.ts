import { optionalEnv } from "./env";
import { isDemoMode } from "./demo-mode";

export type EnvDiagnostics = {
  ok: boolean;
  missing: string[];
  warnings: string[];
};

const requiredNames = [
  "DATABASE_URL",
  "OPENAI_API_KEY",
  "ADMIN_USERNAME",
  "ADMIN_PASSWORD",
  "SESSION_PASSWORD",
  "SESSION_SIGNING_SECRET",
  "WIDGET_ALLOWED_ORIGINS",
] as const;

/**
 * Reports configuration health without ever exposing a secret value. Only
 * variable names, and shape problems that would break the agent at runtime,
 * leave this function.
 */
export function describeEnv(): EnvDiagnostics {
  const demoMode = isDemoMode();
  const missing = requiredNames.filter((name) => {
    // Demo mode runs with no database and no admin dashboard, so those
    // variables are genuinely optional while it is on.
    if (demoMode && ["DATABASE_URL", "ADMIN_USERNAME", "ADMIN_PASSWORD"].includes(name)) {
      return false;
    }

    return !optionalEnv(name);
  });
  const warnings: string[] = [];

  if (demoMode) {
    warnings.push("DEMO_MODE_no_data_is_saved");
  }

  for (const name of ["SESSION_PASSWORD", "SESSION_SIGNING_SECRET"] as const) {
    const value = optionalEnv(name);

    if (value && value.length < 32) {
      warnings.push(`${name}_too_short`);
    }
  }

  const openaiKey = optionalEnv("OPENAI_API_KEY");

  if (openaiKey && !openaiKey.startsWith("sk-")) {
    warnings.push("OPENAI_API_KEY_malformed");
  }

  for (const name of requiredNames) {
    if (optionalEnv(name).startsWith(`${name}=`)) {
      warnings.push(`${name}_includes_name_prefix`);
    }
  }

  const origins = optionalEnv("WIDGET_ALLOWED_ORIGINS")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  for (const origin of origins) {
    try {
      const parsed = new URL(origin);

      if (!["http:", "https:"].includes(parsed.protocol) || parsed.origin !== origin) {
        throw new Error();
      }
    } catch {
      warnings.push("WIDGET_ALLOWED_ORIGINS_invalid");
      break;
    }
  }

  return { ok: missing.length === 0, missing, warnings };
}

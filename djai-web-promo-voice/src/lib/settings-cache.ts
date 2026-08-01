import { getSql } from "./db";
import { demoSettings, isDemoMode } from "./demo-mode";
import type { Settings } from "./types";

let settingsCache: Settings | null = null;

export async function getCachedSettings(): Promise<Settings> {
  if (settingsCache) {
    return settingsCache;
  }

  if (isDemoMode()) {
    settingsCache = demoSettings();
    return settingsCache;
  }

  const sql = getSql();
  const rows = (await sql`select * from settings where id = 1 limit 1`) as Settings[];

  if (!rows[0]) {
    throw new Error("Settings row is missing. Run pnpm migrate first.");
  }

  settingsCache = rows[0];
  return settingsCache;
}

export function invalidateSettingsCache() {
  settingsCache = null;
}

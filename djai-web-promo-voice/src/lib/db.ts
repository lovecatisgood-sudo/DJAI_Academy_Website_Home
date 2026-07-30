import { neon } from "@neondatabase/serverless";
import { requireDatabaseUrl } from "./env";

let cachedSql: ReturnType<typeof neon> | null = null;

export function getSql() {
  if (!cachedSql) {
    cachedSql = neon(requireDatabaseUrl());
  }

  return cachedSql;
}

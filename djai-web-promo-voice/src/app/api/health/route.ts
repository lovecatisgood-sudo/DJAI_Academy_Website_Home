import { NextResponse } from "next/server";
import { buildVersion } from "@/lib/build-info";
import { getSql } from "@/lib/db";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const checks = {
    database: false,
    settings: false,
  };
  let status = 200;

  try {
    const sql = getSql();
    const rows = (await sql`
      select id
      from settings
      where id = 1
      limit 1
    `) as { id: number }[];

    checks.database = true;
    checks.settings = Boolean(rows[0]);
  } catch (error) {
    console.error("Health check failed", error);
    status = 503;
  }

  const ok = checks.database && checks.settings;

  if (!ok) {
    status = 503;
  }

  return NextResponse.json(
    {
      ok,
      service: "djai-voice-sales-agent",
      buildVersion,
      checks,
      time: new Date().toISOString(),
    },
    {
      status,
      headers: {
        "X-DJAI-Build": buildVersion,
      },
    },
  );
}

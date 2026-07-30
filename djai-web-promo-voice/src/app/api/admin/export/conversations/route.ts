import { requireAdmin } from "@/lib/admin-auth";
import { toCsv } from "@/lib/csv";
import { getSql } from "@/lib/db";

export const dynamic = "force-dynamic";

function filterValue(value: string | null) {
  return value === "leads" || value === "no_leads" || value === "starred" || value === "failed" ? value : "all";
}

export async function GET(request: Request) {
  await requireAdmin();
  const params = new URL(request.url).searchParams;
  const filter = filterValue(params.get("filter"));
  const q = (params.get("q") || "").trim().slice(0, 120);
  const search = `%${q}%`;
  const includeDeleted = params.get("includeDeleted") === "1";
  const sql = getSql();
  const rows = (await sql`
    select
      id,
      started_at,
      ended_at,
      duration_seconds,
      language,
      page_url,
      had_lead,
      starred,
      analysis_status,
      interest_level,
      business_type,
      main_problem,
      business_goal,
      concern_or_objection,
      recommended_service,
      next_action,
      summary
    from conversations
    where (${includeDeleted} or deleted_at is null)
      and (
        ${filter} = 'all'
        or (${filter} = 'leads' and had_lead)
        or (${filter} = 'no_leads' and not had_lead)
        or (${filter} = 'starred' and starred)
        or (${filter} = 'failed' and analysis_status = 'failed')
      )
      and (
        ${q} = ''
        or coalesce(page_url, '') ilike ${search}
        or coalesce(summary, '') ilike ${search}
        or coalesce(main_problem, '') ilike ${search}
        or coalesce(recommended_service, '') ilike ${search}
      )
    order by started_at desc
  `) as Record<string, unknown>[];
  const csv = toCsv(rows, [
    "id",
    "started_at",
    "ended_at",
    "duration_seconds",
    "language",
    "page_url",
    "had_lead",
    "starred",
    "analysis_status",
    "interest_level",
    "business_type",
    "main_problem",
    "business_goal",
    "concern_or_objection",
    "recommended_service",
    "next_action",
    "summary",
  ]);

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="djai-conversations-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}

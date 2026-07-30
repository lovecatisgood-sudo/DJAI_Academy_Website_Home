import { requireAdmin } from "@/lib/admin-auth";
import { toCsv } from "@/lib/csv";
import { getSql } from "@/lib/db";

export const dynamic = "force-dynamic";

function statusValue(value: string | null) {
  return value === "pending_follow_up" ||
    value === "appointment_set" ||
    value === "follow_up_later" ||
    value === "deal_closed" ||
    value === "no_deal"
    ? value
    : "all";
}

export async function GET(request: Request) {
  await requireAdmin();
  const params = new URL(request.url).searchParams;
  const status = statusValue(params.get("status"));
  const q = (params.get("q") || "").trim().slice(0, 120);
  const search = `%${q}%`;
  const includeDeleted = params.get("includeDeleted") === "1";
  const sql = getSql();
  const rows = (await sql`
    select
      leads.id,
      leads.created_at,
      leads.updated_at,
      leads.status,
      leads.client_name,
      leads.company_name,
      leads.phone,
      leads.email,
      leads.line_id,
      leads.whatsapp,
      leads.other_contact,
      leads.preferred_contact_method,
      leads.preferred_meeting_day,
      leads.preferred_meeting_time,
      leads.admin_notes,
      leads.need,
      conversations.id as conversation_id,
      conversations.interest_level,
      conversations.main_problem,
      conversations.concern_or_objection,
      conversations.recommended_service,
      conversations.next_action
    from leads
    left join conversations on conversations.id = leads.conversation_id
    where (${status} = 'all' or leads.status = ${status})
      and (${includeDeleted} or conversations.deleted_at is null or conversations.id is null)
      and (
        ${q} = ''
        or coalesce(leads.client_name, leads.name, '') ilike ${search}
        or coalesce(leads.company_name, '') ilike ${search}
        or coalesce(leads.phone, leads.email, leads.line_id, leads.whatsapp, leads.other_contact, leads.contact, '') ilike ${search}
        or coalesce(conversations.main_problem, '') ilike ${search}
        or coalesce(conversations.recommended_service, '') ilike ${search}
      )
    order by leads.updated_at desc nulls last, leads.created_at desc
  `) as Record<string, unknown>[];
  const csv = toCsv(rows, [
    "id",
    "created_at",
    "updated_at",
    "status",
    "client_name",
    "company_name",
    "phone",
    "email",
    "line_id",
    "whatsapp",
    "other_contact",
    "preferred_contact_method",
    "preferred_meeting_day",
    "preferred_meeting_time",
    "admin_notes",
    "need",
    "conversation_id",
    "interest_level",
    "main_problem",
    "concern_or_objection",
    "recommended_service",
    "next_action",
  ]);

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="djai-leads-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}

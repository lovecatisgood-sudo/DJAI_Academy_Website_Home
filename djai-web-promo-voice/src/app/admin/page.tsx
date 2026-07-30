import Link from "next/link";
import { AdminShell } from "./AdminShell";
import { requireAdmin } from "@/lib/admin-auth";
import { getSql } from "@/lib/db";

export const dynamic = "force-dynamic";

type Period = "today" | "7d" | "30d";

function periodSql(period: Period) {
  if (period === "today") return "1 day";
  if (period === "7d") return "7 days";
  return "30 days";
}

export default async function AdminOverview({
  searchParams,
}: {
  searchParams: Promise<{ period?: Period }>;
}) {
  await requireAdmin();
  const params = await searchParams;
  const period = params.period === "today" || params.period === "7d" || params.period === "30d" ? params.period : "7d";
  const sql = getSql();
  const interval = periodSql(period);
  const [stats] = (await sql`
    select
      count(*)::text as conversations,
      count(*) filter (where had_lead)::text as leads,
      count(*) filter (where exists (
        select 1 from leads
        where leads.conversation_id = conversations.id
          and leads.status = 'pending_follow_up'
      ))::text as pending_follow_up,
      count(*) filter (where interest_level = 'high')::text as high_interest,
      count(*) filter (where exists (
        select 1 from leads
        where leads.conversation_id = conversations.id
          and leads.status = 'appointment_set'
      ))::text as appointment_set,
      round(avg(duration_seconds)) as avg_duration,
      case when count(*) = 0 then 0 else round((count(*) filter (where had_lead)::numeric / count(*)::numeric) * 100) end as capture_rate
    from conversations
    where started_at >= now() - ${interval}::interval
      and deleted_at is null
  `) as
    {
      conversations: string;
      leads: string;
      pending_follow_up: string;
      high_interest: string;
      appointment_set: string;
      avg_duration: number | null;
      capture_rate: number | null;
    }[];
  const pendingLeads = (await sql`
    select
      leads.id,
      leads.conversation_id,
      leads.client_name,
      leads.company_name,
      leads.phone,
      leads.email,
      leads.line_id,
      leads.whatsapp,
      leads.other_contact,
      conversations.interest_level,
      conversations.main_problem,
      conversations.next_action
    from leads
    left join conversations on conversations.id = leads.conversation_id
    where leads.status = 'pending_follow_up'
      and (conversations.deleted_at is null or conversations.id is null)
    order by leads.updated_at desc nulls last, leads.created_at desc
    limit 8
  `) as
    {
      id: string;
      conversation_id: string | null;
      client_name: string | null;
      company_name: string | null;
      phone: string | null;
      email: string | null;
      line_id: string | null;
      whatsapp: string | null;
      other_contact: string | null;
      interest_level: string | null;
      main_problem: string | null;
      next_action: string | null;
    }[];
  const recent = (await sql`
    select id, started_at, duration_seconds, language, had_lead, page_url, summary, main_problem
    from conversations
    where deleted_at is null
    order by started_at desc
    limit 8
  `) as
    {
      id: string;
      started_at: string;
      duration_seconds: number | null;
      language: string | null;
      had_lead: boolean;
      page_url: string | null;
      summary: string | null;
      main_problem: string | null;
    }[];

  return (
    <AdminShell>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2">
          {(["today", "7d", "30d"] as Period[]).map((item) => (
            <Link
              key={item}
              href={`/voice_admin?period=${item}`}
              className={`rounded-md border px-3 py-2 text-sm ${
                item === period ? "border-cyan-300/60 bg-cyan-300/15 text-cyan-100" : "border-white/10 bg-white/[0.04]"
              }`}
            >
              {item}
            </Link>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <a href="/voice_admin/api/admin/export/leads.csv" className="rounded-md border border-cyan-300/30 bg-cyan-300/10 px-3 py-2 text-sm text-cyan-100">
            Export leads
          </a>
          <a href="/voice_admin/api/admin/export/conversations.csv" className="rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-slate-100">
            Export conversations
          </a>
        </div>
      </div>
      <section className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
        {[
          ["Conversations", stats?.conversations ?? "0"],
          ["Leads captured", stats?.leads ?? "0"],
          ["Pending follow-up", stats?.pending_follow_up ?? "0"],
          ["High interest", stats?.high_interest ?? "0"],
          ["Appointment set", stats?.appointment_set ?? "0"],
          ["Avg duration", `${stats?.avg_duration ?? 0}s`],
          ["Capture rate", `${stats?.capture_rate ?? 0}%`],
        ].map(([label, value]) => (
          <div key={label} className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
            <div className="text-sm text-slate-400">{label}</div>
            <div className="mt-2 text-3xl font-semibold text-white">{value}</div>
          </div>
        ))}
      </section>
      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_1fr]">
        <section className="rounded-lg border border-white/10 bg-white/[0.04]">
          <div className="border-b border-white/10 px-5 py-4 text-sm font-semibold text-slate-200">Needs follow-up</div>
          <div className="divide-y divide-white/10">
            {pendingLeads.map((lead) => (
              <Link
                key={lead.id}
                href={lead.conversation_id ? `/voice_admin/conversations/${lead.conversation_id}` : "/voice_admin/leads"}
                className="block px-5 py-4 text-sm hover:bg-white/[0.03]"
              >
                <div className="font-semibold text-white">
                  {lead.client_name || lead.company_name || "Unnamed lead"}
                </div>
                <div className="mt-1 text-slate-300">
                  {[lead.phone, lead.email, lead.line_id, lead.whatsapp, lead.other_contact].filter(Boolean).join(" · ") || "No contact"}
                </div>
                <div className="mt-2 text-slate-400">{lead.main_problem || "No problem summary yet."}</div>
                <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-500">
                  <span>{lead.interest_level || "unknown"} interest</span>
                  <span>{lead.next_action || "No next action"}</span>
                </div>
              </Link>
            ))}
            {pendingLeads.length === 0 ? <div className="px-5 py-6 text-sm text-slate-400">No pending follow-up leads.</div> : null}
          </div>
        </section>
        <section className="rounded-lg border border-white/10 bg-white/[0.04]">
          <div className="border-b border-white/10 px-5 py-4 text-sm font-semibold text-slate-200">Recent conversations</div>
          <div className="divide-y divide-white/10">
            {recent.map((conversation) => (
              <Link
                key={conversation.id}
                href={`/voice_admin/conversations/${conversation.id}`}
                className="grid gap-2 px-5 py-4 text-sm hover:bg-white/[0.03] sm:grid-cols-[1fr_auto_auto]"
              >
                <span className="truncate text-slate-200">
                  {conversation.summary || conversation.main_problem || conversation.page_url || conversation.id}
                </span>
                <span className="text-slate-400">{conversation.language || "unknown"} · {conversation.duration_seconds ?? 0}s</span>
                {conversation.had_lead ? (
                  <span className="rounded-full bg-cyan-300/15 px-2 py-1 text-xs font-semibold text-cyan-100">Lead</span>
                ) : (
                  <span className="text-slate-500">No lead</span>
                )}
              </Link>
            ))}
            {recent.length === 0 ? <div className="px-5 py-6 text-sm text-slate-400">No conversations yet.</div> : null}
          </div>
        </section>
      </div>
    </AdminShell>
  );
}

import Link from "next/link";
import { AdminShell } from "../AdminShell";
import { deleteConversationAction, toggleConversationStarAction } from "../actions";
import { ConfirmSubmitButton } from "../ConfirmSubmitButton";
import { requireAdmin } from "@/lib/admin-auth";
import { getSql } from "@/lib/db";

export const dynamic = "force-dynamic";

type ConversationFilter = "all" | "leads" | "no_leads" | "starred" | "failed";

const filters: { key: ConversationFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "leads", label: "Leads" },
  { key: "no_leads", label: "No leads" },
  { key: "starred", label: "Starred" },
  { key: "failed", label: "Analysis failed" },
];

function filterValue(value: unknown): ConversationFilter {
  return value === "leads" || value === "no_leads" || value === "starred" || value === "failed" ? value : "all";
}

function statusClass(status: string | null) {
  if (status === "completed") return "border-cyan-300/30 bg-cyan-300/10 text-cyan-100";
  if (status === "failed") return "border-red-300/30 bg-red-400/10 text-red-100";
  if (status === "pending") return "border-amber-300/30 bg-amber-300/10 text-amber-100";
  return "border-white/10 bg-white/[0.04] text-slate-300";
}

export default async function ConversationsPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: ConversationFilter; q?: string; deleted?: string }>;
}) {
  await requireAdmin();
  const params = await searchParams;
  const filter = filterValue(params.filter);
  const q = typeof params.q === "string" ? params.q.trim().slice(0, 120) : "";
  const search = `%${q}%`;
  const sql = getSql();
  const conversations = (await sql`
    select
      id,
      started_at,
      ended_at,
      duration_seconds,
      language,
      page_url,
      had_lead,
      starred,
      summary,
      main_problem,
      recommended_service,
      next_action,
      interest_level,
      analysis_status,
      lead.client_name as lead_client_name,
      lead.company_name as lead_company_name,
      lead.status as lead_status
    from conversations
    left join lateral (
      select client_name, company_name, status
      from leads
      where leads.conversation_id = conversations.id
      order by leads.updated_at desc nulls last, leads.created_at desc
      limit 1
    ) lead on true
    where deleted_at is null
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
    limit 100
  `) as
    {
      id: string;
      started_at: string;
      ended_at: string | null;
      duration_seconds: number | null;
      language: string | null;
      page_url: string | null;
      had_lead: boolean;
      starred: boolean;
      summary: string | null;
      main_problem: string | null;
      recommended_service: string | null;
      next_action: string | null;
      interest_level: string | null;
      analysis_status: string | null;
      lead_client_name: string | null;
      lead_company_name: string | null;
      lead_status: string | null;
    }[];
  const exportHref = `/voice_admin/api/admin/export/conversations.csv?filter=${filter}${q ? `&q=${encodeURIComponent(q)}` : ""}`;

  return (
    <AdminShell>
      {params.deleted ? (
        <div className="mb-5 rounded-md border border-red-300/20 bg-red-400/10 px-4 py-3 text-sm text-red-100">
          Conversation deleted.
        </div>
      ) : null}
      <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {filters.map((item) => (
            <Link
              key={item.key}
              href={`/voice_admin/conversations?filter=${item.key}${q ? `&q=${encodeURIComponent(q)}` : ""}`}
              className={`rounded-md border px-3 py-2 text-sm ${
                item.key === filter ? "border-cyan-300/60 bg-cyan-300/15 text-cyan-100" : "border-white/10 bg-white/[0.04]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <form className="flex gap-2">
            <input type="hidden" name="filter" value={filter} />
            <input
              name="q"
              defaultValue={q}
              placeholder="Search conversations"
              className="w-64 rounded-md border border-white/10 bg-[#0a1128] px-3 py-2 text-sm text-white"
            />
            <button className="rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-slate-100">Search</button>
          </form>
          <a
            href={exportHref}
            className="rounded-md border border-cyan-300/30 bg-cyan-300/10 px-3 py-2 text-sm text-cyan-100"
          >
            Export CSV
          </a>
        </div>
      </div>
      <section className="rounded-lg border border-white/10 bg-white/[0.04]">
        <div className="border-b border-white/10 px-5 py-4 text-sm font-semibold text-slate-200">
          Conversations
        </div>
        <div className="divide-y divide-white/10">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className="grid gap-4 px-5 py-4 text-sm hover:bg-white/[0.03] lg:grid-cols-[1fr_220px_150px]"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  {conversation.starred ? <span className="text-cyan-200">Starred</span> : null}
                  <Link href={`/voice_admin/conversations/${conversation.id}`} className="font-semibold text-white hover:text-cyan-100">
                    {conversation.lead_client_name || conversation.lead_company_name || conversation.summary || conversation.main_problem || conversation.page_url || conversation.id}
                  </Link>
                  {conversation.lead_status ? (
                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-1 text-xs text-slate-300">
                      {conversation.lead_status.replaceAll("_", " ")}
                    </span>
                  ) : null}
                </div>
                <div className="mt-2 text-slate-300">
                  {conversation.main_problem || "No problem summary yet."}
                </div>
                <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-500">
                  <span>{conversation.page_url || "unknown page"}</span>
                  <span>{conversation.language || "unknown"}</span>
                  <span>{conversation.duration_seconds ?? 0}s</span>
                  {conversation.recommended_service ? <span>{conversation.recommended_service}</span> : null}
                </div>
              </div>
              <div className="space-y-2 text-slate-300">
                <div>{new Date(conversation.started_at).toLocaleString()}</div>
                <div className={conversation.had_lead ? "text-cyan-200" : "text-slate-500"}>
                  {conversation.had_lead ? "Lead captured" : "No lead"}
                </div>
                <div>Interest: {conversation.interest_level || "unknown"}</div>
              </div>
              <div className="flex flex-wrap items-start gap-2 lg:justify-end">
                <span className={`rounded-full border px-2 py-1 text-xs ${statusClass(conversation.analysis_status)}`}>
                  {conversation.analysis_status || "pending"}
                </span>
                <form action={toggleConversationStarAction}>
                  <input type="hidden" name="id" value={conversation.id} />
                  <input type="hidden" name="redirect_to" value={`/voice_admin/conversations?filter=${filter}${q ? `&q=${encodeURIComponent(q)}` : ""}`} />
                  <button className="rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-slate-100">
                    {conversation.starred ? "Unstar" : "Star"}
                  </button>
                </form>
                <form action={deleteConversationAction}>
                  <input type="hidden" name="id" value={conversation.id} />
                  <ConfirmSubmitButton
                    message="Delete this conversation? This hides it from normal admin lists."
                    className="rounded-md border border-red-300/20 bg-red-400/10 px-3 py-2 text-xs text-red-100"
                  >
                    Delete
                  </ConfirmSubmitButton>
                </form>
              </div>
            </div>
          ))}
          {conversations.length === 0 ? <div className="px-5 py-6 text-sm text-slate-400">No conversations yet.</div> : null}
        </div>
      </section>
    </AdminShell>
  );
}

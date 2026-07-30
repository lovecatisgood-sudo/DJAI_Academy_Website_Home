import Link from "next/link";
import { AdminShell } from "../AdminShell";
import { updateLeadAction } from "../actions";
import { requireAdmin } from "@/lib/admin-auth";
import { getSql } from "@/lib/db";
import type { LeadStatus } from "@/lib/types";

export const dynamic = "force-dynamic";

type StatusFilter = "all" | LeadStatus;

const statuses: { key: StatusFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "pending_follow_up", label: "Pending follow up" },
  { key: "appointment_set", label: "Appointment set" },
  { key: "follow_up_later", label: "Follow up later" },
  { key: "deal_closed", label: "Deal closed" },
  { key: "no_deal", label: "No deal" },
];

function statusValue(value: unknown): StatusFilter {
  return value === "pending_follow_up" ||
    value === "appointment_set" ||
    value === "follow_up_later" ||
    value === "deal_closed" ||
    value === "no_deal"
    ? value
    : "all";
}

function contactLine(lead: {
  phone: string | null;
  email: string | null;
  line_id: string | null;
  whatsapp: string | null;
  other_contact: string | null;
  contact: string | null;
}) {
  return [
    lead.phone ? `Phone: ${lead.phone}` : "",
    lead.email ? `Email: ${lead.email}` : "",
    lead.line_id ? `LINE: ${lead.line_id}` : "",
    lead.whatsapp ? `WhatsApp: ${lead.whatsapp}` : "",
    lead.other_contact ? `Other: ${lead.other_contact}` : "",
  ].filter(Boolean).join(" · ") || lead.contact || "No contact";
}

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: StatusFilter; q?: string }>;
}) {
  await requireAdmin();
  const params = await searchParams;
  const status = statusValue(params.status);
  const q = typeof params.q === "string" ? params.q.trim().slice(0, 120) : "";
  const search = `%${q}%`;
  const sql = getSql();
  const leads = (await sql`
    select
      leads.*,
      conversations.summary,
      conversations.main_problem,
      conversations.interest_level,
      conversations.concern_or_objection,
      conversations.recommended_service,
      conversations.next_action,
      conversations.started_at as conversation_started_at
    from leads
    left join conversations on conversations.id = leads.conversation_id
    where (${status} = 'all' or leads.status = ${status})
      and (conversations.deleted_at is null or conversations.id is null)
      and (
        ${q} = ''
        or coalesce(leads.client_name, leads.name, '') ilike ${search}
        or coalesce(leads.company_name, '') ilike ${search}
        or coalesce(leads.phone, leads.email, leads.line_id, leads.whatsapp, leads.other_contact, leads.contact, '') ilike ${search}
        or coalesce(conversations.main_problem, '') ilike ${search}
        or coalesce(conversations.recommended_service, '') ilike ${search}
      )
    order by leads.updated_at desc nulls last, leads.created_at desc
    limit 200
  `) as
    {
      id: string;
      conversation_id: string | null;
      created_at: string;
      updated_at: string | null;
      name: string | null;
      contact: string | null;
      need: string | null;
      preferred_time: string | null;
      status: LeadStatus;
      client_name: string | null;
      company_name: string | null;
      phone: string | null;
      email: string | null;
      line_id: string | null;
      whatsapp: string | null;
      other_contact: string | null;
      preferred_contact_method: string | null;
      preferred_meeting_day: string | null;
      preferred_meeting_time: string | null;
      admin_notes: string | null;
      summary: string | null;
      main_problem: string | null;
      interest_level: string | null;
      concern_or_objection: string | null;
      recommended_service: string | null;
      next_action: string | null;
      conversation_started_at: string | null;
    }[];
  const exportHref = `/voice_admin/api/admin/export/leads.csv?status=${status}${q ? `&q=${encodeURIComponent(q)}` : ""}`;

  return (
    <AdminShell>
      <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {statuses.map((item) => (
            <Link
              key={item.key}
              href={`/voice_admin/leads?status=${item.key}${q ? `&q=${encodeURIComponent(q)}` : ""}`}
              className={`rounded-md border px-3 py-2 text-sm ${
                item.key === status ? "border-cyan-300/60 bg-cyan-300/15 text-cyan-100" : "border-white/10 bg-white/[0.04]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <form className="flex gap-2">
            <input type="hidden" name="status" value={status} />
            <input
              name="q"
              defaultValue={q}
              placeholder="Search leads"
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
        <div className="border-b border-white/10 px-5 py-4 text-sm font-semibold text-slate-200">Leads</div>
        <div className="divide-y divide-white/10">
          {leads.map((lead) => (
            <div key={lead.id} className="grid gap-5 px-5 py-4 text-sm xl:grid-cols-[1fr_320px]">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="font-semibold text-white">
                    {lead.client_name || lead.name || "Unnamed"}{lead.company_name ? ` · ${lead.company_name}` : ""}
                  </div>
                  <span className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-2 py-1 text-xs text-cyan-100">
                    {lead.interest_level || "unknown"} interest
                  </span>
                </div>
                <div className="mt-2 text-slate-200">{contactLine(lead)}</div>
                <div className="mt-2 text-slate-300">{lead.main_problem || lead.need || lead.summary || "No summary yet."}</div>
                <div className="mt-2 grid gap-2 text-xs text-slate-500 md:grid-cols-2">
                  <div>Service: {lead.recommended_service || "Not captured"}</div>
                  <div>Next: {lead.next_action || "Not captured"}</div>
                  <div>Concern: {lead.concern_or_objection || "Not captured"}</div>
                  <div>
                    Meeting: {[lead.preferred_meeting_day, lead.preferred_meeting_time || lead.preferred_time].filter(Boolean).join(" ") || "Not captured"}
                  </div>
                </div>
                {lead.admin_notes ? (
                  <div className="mt-2 rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-slate-300">
                    Notes: {lead.admin_notes}
                  </div>
                ) : null}
                <div className="mt-3 flex flex-wrap gap-3 text-xs">
                  {lead.conversation_id ? (
                    <Link className="text-cyan-200" href={`/voice_admin/conversations/${lead.conversation_id}`}>
                      View conversation
                    </Link>
                  ) : null}
                  <span className="text-slate-500">
                    Updated {lead.updated_at ? new Date(lead.updated_at).toLocaleString() : new Date(lead.created_at).toLocaleString()}
                  </span>
                </div>
              </div>

              <form action={updateLeadAction} className="grid gap-3 rounded-lg border border-white/10 bg-[#071026] p-4">
                <input type="hidden" name="id" value={lead.id} />
                <input type="hidden" name="redirect_to" value={`/voice_admin/leads?status=${status}${q ? `&q=${encodeURIComponent(q)}` : ""}`} />
                <select name="status" defaultValue={lead.status} className="rounded-md border border-white/10 bg-[#0a1128] px-3 py-2 text-white">
                  {statuses.filter((item) => item.key !== "all").map((item) => (
                    <option key={item.key} value={item.key}>{item.label}</option>
                  ))}
                </select>
                <input name="client_name" defaultValue={lead.client_name || lead.name || ""} placeholder="Client name" className="rounded-md border border-white/10 bg-[#0a1128] px-3 py-2 text-white" />
                <input name="company_name" defaultValue={lead.company_name || ""} placeholder="Company" className="rounded-md border border-white/10 bg-[#0a1128] px-3 py-2 text-white" />
                <div className="grid gap-3 sm:grid-cols-2">
                  <input name="phone" defaultValue={lead.phone || ""} placeholder="Phone" className="rounded-md border border-white/10 bg-[#0a1128] px-3 py-2 text-white" />
                  <input name="email" defaultValue={lead.email || ""} placeholder="Email" className="rounded-md border border-white/10 bg-[#0a1128] px-3 py-2 text-white" />
                  <input name="line_id" defaultValue={lead.line_id || ""} placeholder="LINE" className="rounded-md border border-white/10 bg-[#0a1128] px-3 py-2 text-white" />
                  <input name="whatsapp" defaultValue={lead.whatsapp || ""} placeholder="WhatsApp" className="rounded-md border border-white/10 bg-[#0a1128] px-3 py-2 text-white" />
                </div>
                <input name="other_contact" defaultValue={lead.other_contact || ""} placeholder="Other contact" className="rounded-md border border-white/10 bg-[#0a1128] px-3 py-2 text-white" />
                <div className="grid gap-3 sm:grid-cols-3">
                  <input name="preferred_contact_method" defaultValue={lead.preferred_contact_method || ""} placeholder="Preferred contact" className="rounded-md border border-white/10 bg-[#0a1128] px-3 py-2 text-white" />
                  <input name="preferred_meeting_day" defaultValue={lead.preferred_meeting_day || ""} placeholder="Meeting day" className="rounded-md border border-white/10 bg-[#0a1128] px-3 py-2 text-white" />
                  <input name="preferred_meeting_time" defaultValue={lead.preferred_meeting_time || lead.preferred_time || ""} placeholder="Meeting time" className="rounded-md border border-white/10 bg-[#0a1128] px-3 py-2 text-white" />
                </div>
                <textarea name="admin_notes" rows={3} defaultValue={lead.admin_notes || ""} placeholder="Admin notes" className="rounded-md border border-white/10 bg-[#0a1128] px-3 py-2 text-white" />
                <button className="rounded-md bg-gradient-to-r from-cyan-400 to-blue-600 px-4 py-2 font-semibold text-white">
                  Save lead
                </button>
              </form>
            </div>
          ))}
          {leads.length === 0 ? <div className="px-5 py-6 text-sm text-slate-400">No leads in this view.</div> : null}
        </div>
      </section>
    </AdminShell>
  );
}

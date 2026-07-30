import { notFound } from "next/navigation";
import { AdminShell } from "../../AdminShell";
import {
  deleteConversationAction,
  regenerateConversationAnalysisAction,
  toggleConversationStarAction,
  updateConversationIntelligenceAction,
  updateLeadAction,
} from "../../actions";
import { ConfirmSubmitButton } from "../../ConfirmSubmitButton";
import { requireAdmin } from "@/lib/admin-auth";
import { getSql } from "@/lib/db";
import type { TranscriptItem } from "@/lib/types";

export const dynamic = "force-dynamic";

const leadStatuses = [
  ["pending_follow_up", "Pending follow up"],
  ["appointment_set", "Appointment set"],
  ["follow_up_later", "Follow up later"],
  ["deal_closed", "Deal closed"],
  ["no_deal", "No deal"],
];

function empty(value: string | null | undefined) {
  return value || "Not captured";
}

export default async function ConversationDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ analysis?: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  const query = await searchParams;
  const sql = getSql();
  const conversations = (await sql`select * from conversations where id = ${id} and deleted_at is null limit 1`) as
    {
      id: string;
      started_at: string;
      duration_seconds: number | null;
      language: string | null;
      page_url: string | null;
      transcript: TranscriptItem[] | null;
      had_lead: boolean;
      summary: string | null;
      business_type: string | null;
      main_problem: string | null;
      business_goal: string | null;
      interest_level: string | null;
      concern_or_objection: string | null;
      recommended_service: string | null;
      next_action: string | null;
      analysis_status: string | null;
      analysis_error: string | null;
      analysis_model_id: string | null;
      analysis_updated_at: string | null;
      starred: boolean;
    }[];
  const conversation = conversations[0];
  if (!conversation) notFound();

  const leads = (await sql`select * from leads where conversation_id = ${id} order by created_at desc`) as
    {
      id: string;
      name: string | null;
      contact: string | null;
      contact_type: string | null;
      need: string | null;
      preferred_time: string | null;
      status: string;
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
    }[];

  return (
    <AdminShell>
      {query.analysis ? (
        <div className="mb-5 rounded-md border border-cyan-300/30 bg-cyan-300/10 px-4 py-3 text-sm text-cyan-100">
          Conversation analysis refreshed.
        </div>
      ) : null}

      <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Conversation detail</h2>
          <p className="mt-1 text-sm text-slate-400">
            {conversation.language || "unknown"} · {conversation.duration_seconds ?? 0}s · {conversation.page_url || "unknown page"}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Started {new Date(conversation.started_at).toLocaleString()}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <form action={toggleConversationStarAction}>
            <input type="hidden" name="id" value={conversation.id} />
            <input type="hidden" name="redirect_to" value={`/voice_admin/conversations/${conversation.id}`} />
            <button className="rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-slate-100">
              {conversation.starred ? "Unstar" : "Star"}
            </button>
          </form>
          <form action={regenerateConversationAnalysisAction}>
            <input type="hidden" name="id" value={conversation.id} />
            <input type="hidden" name="redirect_to" value={`/voice_admin/conversations/${conversation.id}?analysis=updated`} />
            <button className="rounded-md border border-cyan-300/30 bg-cyan-300/10 px-3 py-2 text-sm text-cyan-100">
              Reanalyse
            </button>
          </form>
          <form action={deleteConversationAction}>
            <input type="hidden" name="id" value={conversation.id} />
            <ConfirmSubmitButton
              message="Delete this conversation? This hides it from normal admin lists."
              className="rounded-md border border-red-300/20 bg-red-400/10 px-3 py-2 text-sm text-red-100"
            >
              Delete
            </ConfirmSubmitButton>
          </form>
        </div>
      </div>

      <form action={updateConversationIntelligenceAction} className="mb-5 rounded-lg border border-white/10 bg-white/[0.04] p-5">
        <input type="hidden" name="id" value={conversation.id} />
        <input type="hidden" name="redirect_to" value={`/voice_admin/conversations/${conversation.id}`} />
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-sm font-semibold text-slate-200">Post-call analysis</h3>
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-1 text-xs text-slate-300">
            {conversation.analysis_status || "pending"} · {conversation.analysis_model_id || "no model"}
          </span>
        </div>
        {conversation.analysis_error ? (
          <div className="mb-4 rounded-md border border-red-300/20 bg-red-400/10 px-3 py-2 text-sm text-red-100">
            {conversation.analysis_error}
          </div>
        ) : null}
        <div className="grid gap-4 text-sm md:grid-cols-2">
          <label className="block text-slate-300 md:col-span-2">
            Summary
            <textarea name="summary" rows={4} defaultValue={conversation.summary || ""} className="mt-2 w-full rounded-md border border-white/10 bg-[#0a1128] px-3 py-2 text-white" />
          </label>
          <label className="block text-slate-300">
            Business type
            <input name="business_type" defaultValue={conversation.business_type || ""} className="mt-2 w-full rounded-md border border-white/10 bg-[#0a1128] px-3 py-2 text-white" />
          </label>
          <label className="block text-slate-300">
            Business goal
            <input name="business_goal" defaultValue={conversation.business_goal || ""} className="mt-2 w-full rounded-md border border-white/10 bg-[#0a1128] px-3 py-2 text-white" />
          </label>
          <label className="block text-slate-300">
            Interest level
            <select name="interest_level" defaultValue={conversation.interest_level || "unknown"} className="mt-2 w-full rounded-md border border-white/10 bg-[#0a1128] px-3 py-2 text-white">
              <option value="unknown">Unknown</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </label>
          <label className="block text-slate-300">
            Recommended service
            <input name="recommended_service" defaultValue={conversation.recommended_service || ""} className="mt-2 w-full rounded-md border border-white/10 bg-[#0a1128] px-3 py-2 text-white" />
          </label>
          <label className="block text-slate-300">
            Main problem
            <textarea name="main_problem" rows={3} defaultValue={conversation.main_problem || ""} className="mt-2 w-full rounded-md border border-white/10 bg-[#0a1128] px-3 py-2 text-white" />
          </label>
          <label className="block text-slate-300">
            Concern or objection
            <textarea name="concern_or_objection" rows={3} defaultValue={conversation.concern_or_objection || ""} className="mt-2 w-full rounded-md border border-white/10 bg-[#0a1128] px-3 py-2 text-white" />
          </label>
          <label className="block text-slate-300 md:col-span-2">
            Next action
            <input name="next_action" defaultValue={conversation.next_action || ""} className="mt-2 w-full rounded-md border border-white/10 bg-[#0a1128] px-3 py-2 text-white" />
          </label>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-slate-400">
            Last analysis: {conversation.analysis_updated_at ? new Date(conversation.analysis_updated_at).toLocaleString() : "Not yet analysed"}
          </p>
          <button className="rounded-md border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-100">
            Save analysis fields
          </button>
        </div>
      </form>

      {leads.length ? (
        <section className="mb-5 rounded-lg border border-cyan-300/20 bg-cyan-300/10 p-5">
          <div className="mb-4 text-sm font-semibold text-cyan-100">Captured lead</div>
          {leads.map((lead) => (
            <form key={lead.id} action={updateLeadAction} className="grid gap-4 text-sm md:grid-cols-2">
              <input type="hidden" name="id" value={lead.id} />
              <input type="hidden" name="redirect_to" value={`/voice_admin/conversations/${conversation.id}`} />
              <label className="block text-slate-300">
                Status
                <select name="status" defaultValue={lead.status} className="mt-2 w-full rounded-md border border-white/10 bg-[#0a1128] px-3 py-2 text-white">
                  {leadStatuses.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                </select>
              </label>
              <label className="block text-slate-300">
                Client name
                <input name="client_name" defaultValue={lead.client_name || lead.name || ""} className="mt-2 w-full rounded-md border border-white/10 bg-[#0a1128] px-3 py-2 text-white" />
              </label>
              <label className="block text-slate-300">
                Company
                <input name="company_name" defaultValue={lead.company_name || ""} className="mt-2 w-full rounded-md border border-white/10 bg-[#0a1128] px-3 py-2 text-white" />
              </label>
              <label className="block text-slate-300">
                Phone
                <input name="phone" defaultValue={lead.phone || (lead.contact_type === "phone" ? lead.contact || "" : "")} className="mt-2 w-full rounded-md border border-white/10 bg-[#0a1128] px-3 py-2 text-white" />
              </label>
              <label className="block text-slate-300">
                Email
                <input name="email" defaultValue={lead.email || (lead.contact_type === "email" ? lead.contact || "" : "")} className="mt-2 w-full rounded-md border border-white/10 bg-[#0a1128] px-3 py-2 text-white" />
              </label>
              <label className="block text-slate-300">
                LINE
                <input name="line_id" defaultValue={lead.line_id || (lead.contact_type === "line" ? lead.contact || "" : "")} className="mt-2 w-full rounded-md border border-white/10 bg-[#0a1128] px-3 py-2 text-white" />
              </label>
              <label className="block text-slate-300">
                WhatsApp
                <input name="whatsapp" defaultValue={lead.whatsapp || ""} className="mt-2 w-full rounded-md border border-white/10 bg-[#0a1128] px-3 py-2 text-white" />
              </label>
              <label className="block text-slate-300">
                Other contact
                <input name="other_contact" defaultValue={lead.other_contact || (lead.contact_type === "other" ? lead.contact || "" : "")} className="mt-2 w-full rounded-md border border-white/10 bg-[#0a1128] px-3 py-2 text-white" />
              </label>
              <label className="block text-slate-300">
                Preferred contact
                <input name="preferred_contact_method" defaultValue={lead.preferred_contact_method || ""} className="mt-2 w-full rounded-md border border-white/10 bg-[#0a1128] px-3 py-2 text-white" />
              </label>
              <label className="block text-slate-300">
                Meeting day
                <input name="preferred_meeting_day" defaultValue={lead.preferred_meeting_day || ""} className="mt-2 w-full rounded-md border border-white/10 bg-[#0a1128] px-3 py-2 text-white" />
              </label>
              <label className="block text-slate-300">
                Meeting time
                <input name="preferred_meeting_time" defaultValue={lead.preferred_meeting_time || lead.preferred_time || ""} className="mt-2 w-full rounded-md border border-white/10 bg-[#0a1128] px-3 py-2 text-white" />
              </label>
              <label className="block text-slate-300 md:col-span-2">
                Admin notes
                <textarea name="admin_notes" rows={4} defaultValue={lead.admin_notes || ""} className="mt-2 w-full rounded-md border border-white/10 bg-[#0a1128] px-3 py-2 text-white" />
              </label>
              <div className="md:col-span-2">
                <button className="rounded-md bg-gradient-to-r from-cyan-400 to-blue-600 px-4 py-2 font-semibold text-white">
                  Save lead
                </button>
              </div>
            </form>
          ))}
        </section>
      ) : (
        <section className="mb-5 rounded-lg border border-white/10 bg-white/[0.04] p-5">
          <div className="text-sm font-semibold text-slate-200">No lead captured</div>
          <p className="mt-2 text-sm text-slate-400">
            This conversation stays in the no-lead view unless a usable contact is found by analysis.
          </p>
        </section>
      )}

      <details className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
        <summary className="cursor-pointer text-sm font-semibold text-slate-200">Full transcript</summary>
        <div className="mt-4 space-y-3">
          {(conversation.transcript || []).map((item, index) => (
            <div
              key={`${item.t}-${index}`}
              className={`max-w-3xl rounded-lg px-4 py-3 text-sm ${
                item.role === "assistant"
                  ? "bg-blue-400/12 text-blue-50"
                  : item.role === "tool"
                    ? "bg-cyan-300/12 text-cyan-50"
                    : "bg-white/[0.06] text-slate-100"
              }`}
            >
              <div className="mb-1 text-xs uppercase tracking-wide text-slate-400">{item.role}</div>
              {item.text}
            </div>
          ))}
          {!(conversation.transcript || []).length ? (
            <div className="text-sm text-slate-400">No transcript saved.</div>
          ) : null}
        </div>
      </details>
    </AdminShell>
  );
}

import { AdminShell } from "../AdminShell";
import { saveSettingsAction } from "../actions";
import { requireAdmin } from "@/lib/admin-auth";
import { getSql } from "@/lib/db";
import type { Settings } from "@/lib/types";

export const dynamic = "force-dynamic";

const inputClass = "mt-2 w-full rounded-md border border-white/10 bg-[#0a1128] px-3 py-2 text-white";
const textAreaClass = "mt-2 w-full rounded-md border border-white/10 bg-[#0a1128] px-3 py-2 text-white";

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  await requireAdmin();
  const params = await searchParams;
  const sql = getSql();
  const rows = (await sql`select * from settings where id = 1 limit 1`) as Settings[];
  const settings = rows[0];

  return (
    <AdminShell>
      {params.saved ? (
        <div className="mb-5 rounded-md border border-cyan-300/30 bg-cyan-300/10 px-4 py-3 text-sm text-cyan-100">
          Settings saved. Knowledge version {settings.knowledge_version} applies to new sessions immediately.
        </div>
      ) : null}

      <form action={saveSettingsAction} className="space-y-5">
        <section className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-white">Voice agent</h2>
              <p className="mt-1 text-sm text-slate-400">Live-call availability, greeting, language, and call limits.</p>
            </div>
            <label className="flex items-center gap-3 rounded-md border border-white/10 bg-[#071026] px-3 py-2 text-sm text-slate-200">
              <input name="agent_enabled" type="checkbox" defaultChecked={settings.agent_enabled} />
              Agent enabled
            </label>
          </div>
          <label className="block text-sm text-slate-300">
            Greeting
            <textarea name="greeting" rows={3} className={textAreaClass} defaultValue={settings.greeting || ""} />
          </label>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <label className="block text-sm text-slate-300">
              Language mode
              <input name="language_mode" className={inputClass} defaultValue={settings.language_mode} />
            </label>
            <label className="block text-sm text-slate-300">
              Max call seconds
              <input name="max_call_seconds" type="number" min={60} className={inputClass} defaultValue={settings.max_call_seconds} />
            </label>
            <label className="block text-sm text-slate-300">
              Daily session cap
              <input name="daily_session_cap" type="number" min={1} className={inputClass} defaultValue={settings.daily_session_cap} />
            </label>
          </div>
        </section>

        <section className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-white">Post-call analysis</h2>
              <p className="mt-1 text-sm text-slate-400">Summary, lead extraction, interest level, objections, and next action.</p>
            </div>
            <label className="flex items-center gap-3 rounded-md border border-white/10 bg-[#071026] px-3 py-2 text-sm text-slate-200">
              <input name="analysis_enabled" type="checkbox" defaultChecked={settings.analysis_enabled} />
              Analysis enabled
            </label>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block text-sm text-slate-300">
              Analysis model
              <input name="analysis_model_id" className={inputClass} defaultValue={settings.analysis_model_id || "gpt-4o-mini"} />
              <span className="mt-2 block text-xs text-slate-500">
                This is for text analysis after the call. It does not affect the live voice model.
              </span>
            </label>
            <div className="rounded-md border border-white/10 bg-[#071026] p-4 text-sm text-slate-300">
              Conversations with usable contact details become leads automatically. Admin edits to lead status and notes are kept separate from the voice model.
            </div>
          </div>
        </section>

        <section className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-white">Knowledge document</h2>
              <p className="mt-1 text-sm text-slate-400">The voice agent may only state facts that appear here.</p>
            </div>
            <span className="text-sm text-slate-400">Version {settings.knowledge_version}</span>
          </div>
          <textarea
            name="knowledge_md"
            rows={28}
            className="mt-5 w-full rounded-md border border-white/10 bg-[#0a1128] px-3 py-2 font-mono text-sm leading-6 text-slate-100"
            defaultValue={settings.knowledge_md || ""}
          />
        </section>

        <section className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
          <h2 className="text-lg font-semibold text-white">Advanced voice provider</h2>
          <p className="mt-1 text-sm text-slate-400">Switch between OpenAI Realtime and Gemini Live without redeploying.</p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <label className="block text-sm text-slate-300">
              Voice provider
              <select name="voice_provider" className={inputClass} defaultValue={settings.voice_provider || "openai"}>
                <option value="openai">OpenAI Realtime</option>
                <option value="gemini">Gemini Live Preview</option>
              </select>
            </label>
            <label className="block text-sm text-slate-300">
              Voice
              <input name="voice" className={inputClass} defaultValue={settings.voice} />
            </label>
            <label className="block text-sm text-slate-300">
              Live model ID
              <input name="model_id" className={inputClass} defaultValue={settings.model_id} />
              <span className="mt-2 block text-xs text-slate-500">
                OpenAI: gpt-realtime-2.1. Gemini: gemini-3.1-flash-live-preview.
              </span>
            </label>
            <label className="block text-sm text-slate-300">
              Transcription model
              <input name="transcription_model" className={inputClass} defaultValue={settings.transcription_model} />
            </label>
          </div>
        </section>

        <div className="sticky bottom-4 flex justify-end">
          <button className="rounded-md bg-gradient-to-r from-cyan-400 to-blue-600 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-950/40">
            Save settings
          </button>
        </div>
      </form>
    </AdminShell>
  );
}

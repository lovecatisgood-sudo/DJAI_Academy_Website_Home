# DJAI Voice Agent Current State

Last updated: 2026-07-13

## Runtime Status

- Deployed app: `https://voice.djai.academy`
- Current local source build marker: `admin-v15-workflow-2026-07-13`
- Production should be redeployed from the latest ZIP before running live acceptance against the new admin workflow.

## Current Source State

- Public landing page is Thai by default.
- Top language switch supports `TH` and `EN`.
- `?lang=en` renders the English landing page.
- Public admin link is not displayed on the landing page.
- `/widget-demo` was removed; the voice agent is embedded as a production section, not a demo page.
- Admin exists at `/admin` with Overview, Conversations, Leads, and Settings.
- Admin V1.5 workflow is implemented locally:
  - Summary-first conversations list.
  - Conversation filters for leads, no leads, starred, and failed analysis.
  - Conversation detail shows analysis first and keeps transcript collapsed by default.
  - Lead detail editing supports status, contact fields, meeting preference, and admin notes.
  - Conversation intelligence fields are editable by admin after AI analysis.
  - Leads page supports V1.5 statuses, structured contact fields, notes preview, search, and filtered CSV export.
  - Conversation starring, soft delete with confirmation, reanalysis, and filtered CSV export are available.
  - Overview includes pending follow-up, high-interest, appointment-set metrics, export buttons, and a follow-up queue.
  - Admin nav shows active state.
  - Settings are grouped into Voice Agent, Post-call Analysis, Knowledge Document, and Advanced Voice Provider.
- Voice provider is configurable: `openai` or `gemini`.
- OpenAI remains the main recommended production provider.
- Gemini Live is available as an optional test provider using `gemini-3.1-flash-live-preview`.

## Current Voice Behavior State

- The base behavioral prompt has been restored to the user's original sales prompt wording and structure.
- Do not rewrite or "improve" the behavioral prompt without explicit user approval.
- The prompt module appends only technical plumbing after the restored behavior prompt:
  - Gemini-only turn-taking notes.
  - Knowledge grounding rules.
  - `capture_lead` tool-use instruction.
  - Support triage.
  - Injection resistance.
  - Configured greeting.
  - Knowledge document.
  - Dynamic session context.
- OpenAI realtime VAD was changed to reduce unwanted interruptions:
  - `threshold: 0.65`
  - `silence_duration_ms: 700`
  - `create_response: true`
  - `interrupt_response: false`
- Gemini realtime config keeps Gemini-specific interruption/backchannel controls.

## V1.5 Admin Workflow State

Planning docs were added and the admin V1.5 workflow has now been implemented locally:

- `DJAI_Voice_Admin_V1_5_PRD.md`
- `DJAI_Voice_Admin_V1_5_Architecture.md`
- `DJAI_Voice_Admin_V1_5_UIUX_Design.md`

Implemented V1.5 direction:

- Post-call analysis with `gpt-4o-mini`.
- Voice agent sells live; text model summarizes after the call.
- Summary-first admin review, transcript collapsed by default.
- Structured client details: name, company, phone, email, LINE, WhatsApp, preferred contact/time.
- Lead statuses: `pending_follow_up`, `appointment_set`, `follow_up_later`, `deal_closed`, `no_deal`.
- Admin notes, starred conversations, soft delete, CSV export.
- Manual edit of conversation intelligence fields after AI extraction.
- Safer Settings sections: Voice Agent, Post-call Analysis, Knowledge Document, Advanced.

## Acceptance Gate Before Deployment

Before deploying or after deploying V1.5, run a fresh acceptance pass and confirm:

- OpenAI provider works end-to-end with `gpt-realtime-2.1`, `marin`, and `gpt-realtime-whisper`.
- Gemini remains optional/switchable and does not affect OpenAI behavior.
- Transcript saves on normal call end and tab close.
- Lead capture writes to Neon and appears in Admin with structured contact fields.
- Post-call analysis writes summary, problem, interest level, concern, recommendation, and next action.
- Conversations with contacts appear in Leads; conversations without contacts remain in No leads.
- Admin can update lead status, edit contact fields, add notes, star, soft-delete, reanalyse, and export CSV.
- Knowledge edits apply to new calls without redeploy.
- Kill switch blocks new sessions immediately.
- Daily cap and rate limits still work.
- Thai and English golden-call scenarios pass with the restored original behavior prompt.
- If "kill switch hides widget immediately" is required for already-open pages, add lightweight widget polling or a clearer offline state.

## Verification Already Run After Latest Local Changes

- `npm run verify:source`
- `npm run typecheck`
- `npm run hostinger:build`
- `npm run package:source`
- `npm run verify:archive`
- Standalone server started locally on `127.0.0.1:3022`.
- `BASE_URL=http://127.0.0.1:3022 npm run smoke:public`
- Authenticated local standalone admin smoke passed for `/admin`, `/admin/conversations`, `/admin/leads`, `/admin/settings`, `/api/admin/export/conversations.csv`, and `/api/admin/export/leads.csv`.

Note: `smoke:no-secrets` was not applicable against the local standalone run because `.env.local` was intentionally loaded, so `/api/session` correctly returned 200 instead of the missing-env failure the script expects.

## Deployment Artifact

Current source ZIP:

```text
/home/siamesedev/Documents/codex/DJAI_WebDev_Landing_Page/djai-voice-agent-v1-source.zip
```

The ZIP has been rebuilt after the restored prompt, OpenAI VAD changes, and admin V1.5 workflow implementation.

## Current Uncommitted Changes

As of this state update, these local changes are not committed:

- Restored original behavior prompt in `src/lib/prompt.ts`.
- OpenAI VAD interruption fix in `src/app/api/session/route.ts`.
- Updated prompt source verifier in `scripts/verify-source.mjs`.
- Added V1.5 PRD/architecture/UIUX documents.
- Added post-call analysis pipeline and structured analysis persistence.
- Added V1.5 admin workflow UI/actions/export endpoints.
- Added completion-audit fixes for overview metrics, active nav, delete confirmation, editable intelligence fields, filtered exports, and `.csv` export aliases.
- Added schema migrations and live-schema verifier coverage for V1.5 fields.
- Updated README and acceptance docs for V1.5 planning and V1 gate.

Commit before handoff/deployment if this state is approved.

## Hostinger Env Notes

Runtime env must include:

- `OPENAI_API_KEY` with the raw OpenAI key only, no quotes and no `OPENAI_API_KEY=` prefix.
- `GEMINI_API_KEY` only if testing Gemini provider.
- `DATABASE_URL`
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- `SESSION_PASSWORD`
- `SESSION_SIGNING_SECRET`
- `WIDGET_ALLOWED_ORIGINS=https://djai.academy,https://www.djai.academy,https://voice.djai.academy,https://dev.djai.academy`

If `POST /api/session` returns OpenAI `upstreamStatus:401`, Hostinger is using an invalid or unapplied OpenAI key.

## GitHub Note

Last known commit:

```text
71cf86c Add Gemini Live voice provider and deployment hardening
```

Local `git push` previously failed because the shell had no GitHub credentials. If Hostinger deploys from GitHub, push from an authenticated terminal or deploy the ZIP directly.

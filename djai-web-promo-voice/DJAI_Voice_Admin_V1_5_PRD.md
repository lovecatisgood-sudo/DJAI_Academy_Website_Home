# DJAI Voice Admin V1.5 PRD

**Project:** DJAI Voice Sales Agent Admin Upgrade
**Version:** 1.5 draft
**Date:** 13 July 2026
**Owner:** DJAI Academy
**Status:** Product/design plan for review before implementation

---

## 1. Product Goal

Upgrade the current minimal voice-agent admin from a transcript storage panel into a sales follow-up workspace.

The voice agent's job remains live selling: diagnose, recommend, handle objections, and capture a lead. The admin's job is post-call operations: understand what happened, identify the lead quality, organize follow-up, update client details, and help DJAI close business.

V1.5 must keep the live call simple and reliable. Post-call summary, lead cleanup, contact extraction, status management, notes, starring, deletion, and export happen after the call.

---

## 2. Problems To Solve

The current admin has these gaps:

- Full transcripts are shown too directly; admins need a summary first.
- Lead contact details are stored as one generic `contact` field instead of structured client fields.
- There is no post-call intelligence: no business type, problem, concern, interest level, recommended service, or next action.
- Lead workflow is too basic: `new`, `contacted`, `closed` is not enough for real follow-up.
- Conversations cannot be starred, deleted, searched, or exported.
- Admin notes do not exist.
- Settings expose technical fields too raw, making it easy to break model/provider setup.

---

## 3. Product Principles

1. **Do not change live sales behavior without approval.** The user's behavioral prompt is product logic and must not be rewritten casually.
2. **Voice sells; text model summarizes.** The realtime voice model should not spend call time summarizing or evaluating itself.
3. **Raw transcript is secondary.** The admin should first see the useful sales summary, then expand the full transcript only when needed.
4. **Structured client details are first-class.** Name, company, phone, email, LINE, WhatsApp, and preferred time must be editable fields.
5. **Admin is the final authority.** AI fills suggestions; admin can edit status, notes, contact fields, and summary-related fields.
6. **No V2 infrastructure creep.** No queue, Redis, workers, RAG, calendar tools, notifications, or multi-user roles in this phase.

---

## 4. In Scope

### Post-Call Analysis

After a conversation is saved, the backend runs a cheaper text model to analyze the transcript and tool-captured lead data.

Default analyzer:

- Provider: OpenAI
- Model: `gpt-4o-mini`

Reasons:

- OpenAI API key is already required.
- Strong enough for JSON extraction and summarization.
- Cheaper than realtime voice model usage.
- Less integration risk than adding a second text provider immediately.

Future option:

- Add Gemini text model switching later if cost/quality testing justifies it.

### Extracted Conversation Intelligence

The analyzer should produce:

- Short summary
- Business type
- Main problem
- Business goal
- Interest level: `low`, `medium`, `high`, `unknown`
- Concern or objection
- Recommended DJAI service
- Suggested next action
- Whether the conversation has usable lead contact details

### Extracted Client Details

The analyzer should fill these fields when present:

- Client name
- Company name
- Phone number
- Email
- LINE ID
- WhatsApp
- Other contact
- Preferred contact method
- Preferred meeting day
- Preferred meeting time

Extraction rules:

- Extract only details present in transcript or tool call data.
- Do not invent missing contact details.
- If uncertain, leave blank or mark as unclear in summary/notes.
- Any conversation with a usable contact method is considered a lead.

### Lead Workflow

Lead statuses:

- `pending_follow_up`
- `appointment_set`
- `follow_up_later`
- `deal_closed`
- `no_deal`

Admin can move a lead between statuses anytime.

### Conversation Organization

Admin can:

- Filter conversations by all, leads, no leads, starred.
- Star/unstar conversations.
- Delete conversations.
- View full transcript only after opening or expanding it.
- Export conversations/leads to CSV.

### Admin Notes

Admin can save notes on leads/client records.

Notes are manual and never overwritten by AI regeneration.

---

## 5. Out Of Scope For V1.5

- CRM owners/users/roles.
- Calendar booking tools.
- LINE/email notifications.
- Audio recording/playback.
- RAG/vector search.
- Job queue, Redis, workers.
- Multi-tenant admin.
- Automatic lead scoring beyond a simple interest level.
- AI-generated outbound messages.
- File uploads.

---

## 6. V1 Completion Gate Before V1.5 Build

Before implementing V1.5, confirm the current V1 launch baseline still passes after recent provider, prompt, and VAD changes.

Required checks:

- OpenAI provider works on production with `gpt-realtime-2.1`, `marin`, and `gpt-realtime-whisper`.
- Gemini provider remains optional and switchable, not a replacement for OpenAI.
- Voice widget starts from the production landing section and from the embeddable script.
- Browser never receives `OPENAI_API_KEY` or `GEMINI_API_KEY`.
- OpenAI audio path remains browser-to-OpenAI WebRTC; audio does not pass through DJAI server.
- Settings/knowledge save invalidates the in-process cache and affects new calls without redeploy.
- Knowledge document is injected once at session creation.
- Agent only states prices/facts from the knowledge document.
- Lead tool call writes to Neon and appears in Admin.
- Conversation transcript saves on normal end and tab close.
- Kill switch blocks new sessions immediately; UI should clearly show the agent is offline.
- Daily cap and per-IP rate limits still work.
- Thai and English golden-call scenarios pass with the restored original behavioral prompt.
- `buildVersion` should be updated before deployment so production errors can be traced to the right build.

Known V1 items to verify carefully:

- The current widget checks offline status on mount and blocks `/api/session`, but it does not continuously poll. If "kill switch hides widget immediately" is interpreted literally, add lightweight polling or hide/disable on failed start before calling V1 complete.
- The admin works for V1 storage, but it is intentionally minimal. V1.5 should not be started until V1 lead capture, transcript saving, provider switching, and knowledge updates are stable.

---

## 7. User Roles

### Admin

Single DJAI operator using `/admin`.

Needs to:

- See what calls happened.
- Understand which conversations matter.
- Follow up with leads.
- Track status.
- Add notes.
- Export records.
- Edit settings safely.

### Visitor

No admin interaction. Visitor only talks to the voice agent.

---

## 8. Primary User Flows

### Flow A: New Lead Captured

1. Visitor talks to voice agent.
2. Voice agent collects contact details.
3. Voice agent calls `capture_lead`.
4. Browser saves transcript at call end.
5. Backend stores conversation.
6. Backend runs post-call analyzer.
7. Analyzer fills summary, interest level, problem, concern, recommended service, and client details.
8. Admin sees lead under `Pending follow up`.
9. Admin opens lead, reviews summary, expands transcript if needed, adds notes, and updates status.

### Flow B: Conversation With No Lead

1. Visitor talks but does not provide usable contact.
2. Conversation saves transcript.
3. Analyzer summarizes conversation and marks `has_lead=false`.
4. Admin sees it under `No leads`.
5. Admin can star it, delete it, or review transcript.

### Flow C: Manual Lead Cleanup

1. Admin opens lead detail.
2. Admin edits name/company/contact fields.
3. Admin updates lead status.
4. Admin adds internal notes.
5. Changes save without regenerating AI summary.

### Flow D: Regenerate Summary

1. Admin opens conversation detail.
2. Admin clicks `Regenerate summary`.
3. Backend re-runs analyzer using the saved transcript and existing tool data.
4. AI fields are updated.
5. Admin notes and manually edited status are preserved.

### Flow E: Export

1. Admin clicks export.
2. System returns CSV of filtered conversations/leads.
3. CSV includes summaries, client details, status, notes, and timestamps.

---

## 9. Functional Requirements

### Conversation List

Must show:

- Date/time
- Lead/no lead badge
- Star state
- Client/company if known
- Interest level
- Main problem
- Recommended service
- Next action
- Status when lead exists

Must not show full transcript by default.

### Conversation Detail

Must show:

- Summary card
- Client details card
- Lead status controls when contact exists
- Admin notes
- Star/unstar
- Delete
- Regenerate summary
- Expandable full transcript

### Leads List

Must show:

- Lead status filters
- Client name/company
- Phone/email/LINE/WhatsApp
- Interest level
- Main problem
- Concern/objection
- Recommended service
- Next action
- Last updated/created time
- Notes preview

### Lead Detail/Edit

V1.5 can implement lead editing inside conversation detail first. A separate lead detail page is optional if list complexity grows.

Editable fields:

- Client name
- Company name
- Phone
- Email
- LINE
- WhatsApp
- Other contact
- Preferred contact method
- Preferred meeting day/time
- Lead status
- Admin notes

### Settings

Add a Post-Call Analysis section:

- Enable/disable analysis.
- Analysis model ID, default `gpt-4o-mini`.
- Regenerate missing/failed summaries manually.

Voice provider settings remain separate from text analysis settings.

---

## 10. Success Criteria

V1.5 is successful when:

- Admin can understand a call without reading the full transcript.
- Leads with contact details appear automatically in the Leads workflow.
- Admin can edit client details and status.
- Admin can add notes.
- Admin can star important conversations.
- Admin can delete conversations.
- Admin can export conversations/leads to CSV.
- Post-call analysis failure never prevents transcript saving.
- The live voice agent behavior is not changed by analysis features.

# DJAI Voice Admin V1.5 Architecture

**Project:** Post-call intelligence and admin workflow upgrade
**Version:** 1.5 draft
**Date:** 13 July 2026
**Status:** Architecture plan for review before implementation

---

## 1. Architecture Summary

V1.5 adds post-call text analysis and a richer admin workflow while keeping the existing voice-call architecture intact.

The live call path remains:

```text
Browser widget -> /api/session -> OpenAI/Gemini Live -> /api/lead -> /api/conversation
```

The new post-call path starts only after `/api/conversation` receives a transcript:

```text
/api/conversation
  -> save transcript
  -> run analyzer with gpt-4o-mini
  -> store conversation summary + client fields
  -> update/create lead when contact exists
```

No audio passes through our server. No database reads occur during the live call except the existing cached settings read at session creation.

---

## 2. V1 Baseline Requirements Before Expansion

V1.5 must not mask or destabilize the V1 voice-agent launch path.

Before implementation, verify:

- `/api/session` returns valid OpenAI and Gemini session payloads when each provider is selected.
- OpenAI payload is accepted by the upstream Realtime API with the configured VAD fields.
- Browser OpenAI path uses WebRTC directly to OpenAI.
- Browser Gemini path uses the constrained Live WebSocket endpoint with a short-lived token.
- `/api/lead` validates signed session context and writes only server-validated lead payloads.
- `/api/conversation` accepts `sendBeacon` text/plain JSON and normal JSON fetch.
- Settings save invalidates cache.
- Conversation reservation and daily cap are idempotent and do not create duplicate lead/conversation rows.
- Production `buildVersion` is updated whenever a deployment contains behavior or provider changes.

If any V1 acceptance check fails, fix V1 first before adding analyzer/admin workflow code.

---

## 3. Model Responsibilities

### Realtime Voice Model

Responsible for:

- Live conversation.
- Discovery.
- Benefit selling.
- Objection handling.
- Contact collection.
- Calling `capture_lead`.

Not responsible for:

- Final post-call summary.
- Lead scoring.
- Transcript analysis.
- Admin notes.

### Text Analyzer Model

Default:

- `gpt-4o-mini`

Responsible for:

- Transcript summarization.
- Structured extraction.
- Contact cleanup.
- Interest level.
- Concern/objection detection.
- Suggested next action.

The analyzer must output strict JSON. The server validates and stores only accepted fields.

---

## 4. Database Changes

### `settings`

Add:

```sql
analysis_enabled boolean default true,
analysis_model_id text default 'gpt-4o-mini'
```

Optional later:

```sql
analysis_provider text default 'openai'
```

Recommendation for V1.5: keep provider implicit as OpenAI to reduce UI and deployment risk.

### `conversations`

Add:

```sql
summary text,
business_type text,
main_problem text,
business_goal text,
interest_level text default 'unknown',
concern_or_objection text,
recommended_service text,
next_action text,
analysis_status text default 'pending',
analysis_error text,
analysis_model_id text,
analysis_updated_at timestamptz,
starred boolean default false,
deleted_at timestamptz
```

Accepted `interest_level` values:

```text
low
medium
high
unknown
```

Accepted `analysis_status` values:

```text
pending
completed
failed
skipped
```

### `leads`

Add:

```sql
client_name text,
company_name text,
phone text,
email text,
line_id text,
whatsapp text,
other_contact text,
preferred_contact_method text,
preferred_meeting_day text,
preferred_meeting_time text,
admin_notes text,
updated_at timestamptz default now()
```

Update accepted `status` values:

```text
pending_follow_up
appointment_set
follow_up_later
deal_closed
no_deal
```

Compatibility:

- Existing `name`, `contact`, `contact_type`, `need`, and `preferred_time` should remain for backward compatibility during migration.
- New UI should prefer structured fields.
- Existing leads with `new` should migrate to `pending_follow_up`.
- Existing `contacted` can migrate to `follow_up_later` unless user prefers `appointment_set`.
- Existing `closed` can migrate to `deal_closed`.

---

## 5. Analyzer Contract

### Input

The analyzer receives:

```json
{
  "conversation_id": "uuid",
  "page_url": "string",
  "language": "th|en|mixed|unknown",
  "transcript": [
    { "role": "user|assistant|tool|system", "text": "string", "t": 123 }
  ],
  "existing_leads": [
    {
      "name": "string",
      "contact": "string",
      "contact_type": "phone|line|email|other",
      "need": "string",
      "preferred_time": "string"
    }
  ],
  "knowledge_excerpt": "optional short context if needed"
}
```

Do not send the full system prompt to the analyzer. It only needs the transcript and lead data.

### Output

The analyzer must return strict JSON:

```json
{
  "has_lead": true,
  "client": {
    "client_name": "",
    "company_name": "",
    "phone": "",
    "email": "",
    "line_id": "",
    "whatsapp": "",
    "other_contact": "",
    "preferred_contact_method": "",
    "preferred_meeting_day": "",
    "preferred_meeting_time": ""
  },
  "conversation": {
    "summary": "",
    "business_type": "",
    "main_problem": "",
    "business_goal": "",
    "interest_level": "low|medium|high|unknown",
    "concern_or_objection": "",
    "recommended_service": "",
    "next_action": ""
  }
}
```

### Analyzer Rules

- Use only transcript/tool data.
- Do not invent contact details.
- If phone/email/LINE/WhatsApp/other usable contact exists, `has_lead=true`.
- If the visitor gives fake/example details, mention uncertainty in summary and leave questionable fields blank where possible.
- Keep summary concise.
- Extract business signals even when no lead exists.
- Admin notes are never generated or overwritten by the analyzer.

---

## 6. Backend Modules

Add:

```text
src/lib/conversation-analysis.ts
src/lib/conversation-analysis-schema.ts
src/lib/admin-export.ts
```

### `conversation-analysis.ts`

Responsibilities:

- Build analyzer prompt.
- Call OpenAI text model.
- Parse JSON.
- Validate fields.
- Return normalized analysis result.

### `conversation-analysis-schema.ts`

Responsibilities:

- Runtime validation without adding a new dependency.
- Normalize strings and enums.
- Clamp field lengths.

### `admin-export.ts`

Responsibilities:

- Convert filtered conversations/leads into CSV.
- Escape values correctly.

---

## 7. API And Actions

### Existing Public APIs

`POST /api/conversation`

Update behavior:

1. Validate session context.
2. Save transcript.
3. Set `analysis_status='pending'` if analysis enabled.
4. Attempt analysis synchronously after saving.
5. On success, update conversation and lead/client fields.
6. On failure, set `analysis_status='failed'` and store safe error message.

Important:

- Transcript saving must succeed even if analysis fails.
- Analysis should have a timeout.
- Analysis should not be retried automatically in a loop.

### New Admin APIs / Server Actions

Recommended server actions first, API routes only where needed.

Add actions:

```text
updateConversationAction
deleteConversationAction
toggleConversationStarAction
regenerateConversationAnalysisAction
updateLeadAction
```

Add CSV route:

```text
GET /api/admin/export/conversations.csv
GET /api/admin/export/leads.csv
```

Optional API routes if client-side forms require them:

```text
PATCH /api/admin/conversations/[id]
DELETE /api/admin/conversations/[id]
POST /api/admin/conversations/[id]/analyze
PATCH /api/admin/leads/[id]
```

---

## 8. Data Flow Details

### Lead Creation And Cleanup

Current voice tool call can create a lead during the call.

After transcript analysis:

- If a lead already exists, update missing structured fields.
- If no lead exists but analyzer finds usable contact details, create one.
- If no usable contact exists, set `had_lead=false`.
- If a lead exists, set `had_lead=true`.

Do not overwrite admin-edited fields blindly.

Recommended strategy:

- Analyzer may fill blank fields.
- Admin edits should take priority.
- Add `updated_at` to leads.
- Later, add per-field source tracking if needed. Not required for V1.5.

### Soft Delete

Use `deleted_at` instead of hard delete.

Default admin lists exclude deleted conversations.

CSV export should exclude deleted by default, with optional `includeDeleted=1`.

### Starred

Store on `conversations.starred`.

Starred is independent from lead status.

---

## 9. Performance And Reliability

### Timeout

Post-call analysis should use a short timeout, e.g. 15 seconds.

If it times out:

- Save transcript.
- Mark analysis failed.
- Show `Regenerate summary` in admin.

### Cost Control

- Use `gpt-4o-mini`.
- Send transcript and lead data only.
- Do not send full knowledge document unless needed.
- Cap transcript text length for analysis if extremely long.
- Keep output JSON concise.

### Security

- Admin APIs require admin cookie.
- Public analysis cannot be triggered directly by visitors except through signed conversation save.
- Export routes require admin.
- CSV must escape formula-like values that start with `=`, `+`, `-`, or `@`.

---

## 10. Migration Plan

1. Add nullable columns first.
2. Migrate existing lead statuses:
   - `new` -> `pending_follow_up`
   - `contacted` -> `follow_up_later`
   - `closed` -> `deal_closed`
3. Backfill structured lead fields conservatively from old `name/contact/contact_type/preferred_time`.
4. Do not auto-analyze all old transcripts during migration.
5. Admin can regenerate summaries per conversation.

---

## 11. Verification Plan

Local checks:

- `npm run verify:source`
- `npm run typecheck`
- `npm run hostinger:build`
- Manual admin smoke test.

Functional checks:

- Conversation with contact creates/updates lead.
- Conversation without contact appears under No leads.
- Analyzer failure does not block transcript save.
- Admin can edit lead details.
- Admin notes persist after regenerate.
- Star/unstar works.
- Soft delete hides conversation from normal lists.
- CSV export opens and contains expected escaped fields.

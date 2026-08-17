# DJAI Voice Admin V1.5 UI/UX Design

**Project:** DJAI Voice Sales Agent Admin
**Version:** 1.5 draft
**Date:** 13 July 2026
**Status:** UI/UX plan for review before implementation

---

## 1. Design Goal

Make the admin feel like a calm sales command center, not a database table.

The admin should let DJAI quickly answer:

- Who talked to the agent?
- Did we get contact details?
- What does the client want?
- How interested are they?
- What problem are they trying to solve?
- What should we do next?
- Which leads need follow-up now?

Full transcript should be available, but not the first thing shown.

---

## 2. Visual Direction

Use the existing DJAI brand:

- Deep navy background.
- Cyan to blue accent.
- White/silver text.
- Dense but readable layouts.
- Minimal decoration.
- Clear cards, tables, filters, and actions.

Avoid:

- Marketing-style hero sections inside admin.
- Oversized cards with little data.
- Hidden critical actions.
- Raw technical fields in primary workflows.

Cards should be useful, not decorative.

---

## 3. Global Admin Shell

### Header Layout

Top left:

- DJAI Academy
- Voice Sales Agent Admin
- Small build/version indicator optional.

Top right:

- Nav tabs:
  - Overview
  - Conversations
  - Leads
  - Settings
- Logout button.

Nav should show active state.

### Page Width

Use a max width around `1280px` or `1440px`.

Dense pages like Leads and Conversations may use full available width with constrained inner spacing.

### Shared UI Components

Reusable components:

- Status pill
- Interest pill
- Lead/no lead badge
- Star button
- Delete button
- Filter bar
- Summary card
- Client details form
- Transcript drawer/accordion
- Empty state
- Loading/error state

---

## 4. Overview Page

### Purpose

Give a fast operational snapshot.

### Layout

Top row:

- Period selector: Today / 7 days / 30 days.
- Export button group on right:
  - Export leads
  - Export conversations

Metric cards:

1. Conversations
2. Leads captured
3. Pending follow-up
4. High-interest leads
5. Appointment set
6. Capture rate

Use a 3-column or 6-column responsive grid depending on viewport.

### Main Content

Two-column layout on desktop:

Left: `Needs follow-up`

- Shows pending follow-up leads.
- Each item:
  - Client/company
  - Contact method
  - Interest level
  - Main problem
  - Next action
  - Open button

Right: `Recent conversations`

- Shows recent summaries.
- Each item:
  - Lead/no lead
  - Star
  - Summary one-liner
  - Time

Bottom optional:

- `Starred conversations`
- Useful for conversations the admin wants to revisit.

### Empty State

If no conversations:

- Message: No conversations yet.
- Secondary hint: New calls will appear here after visitors finish a voice session.

No tutorial-heavy copy.

---

## 5. Conversations Page

### Purpose

Review all calls without being forced to read transcripts.

### Top Bar

Left:

- Page title: Conversations
- Count of current filter results.

Right:

- Search input.
- Export conversations button.

### Filters

Filter chips:

- All
- Leads
- No leads
- Starred

Optional secondary filters:

- Interest: High / Medium / Low
- Analysis: Completed / Failed / Pending

### List Layout

Use compact cards or a table-card hybrid.

Each conversation row/card:

Left area:

- Star icon.
- Lead/no lead badge.
- Client/company if known, otherwise page URL or conversation id.
- Date/time.

Middle area:

- Summary, one or two lines.
- Main problem.
- Concern/objection if present.

Right area:

- Interest level pill.
- Recommended service.
- Next action.
- Status if lead exists.

Actions:

- Open
- Delete

Do not show transcript in list.

### Row Behavior

Click row opens conversation detail.

Star button should not open row.

Delete should require confirmation.

### No Leads Filter

This view should show conversations where no usable contact details were collected.

Useful fields:

- Summary
- Why no lead if detectable
- Visitor interest if any
- Suggested learning for offer/prompt if visible

---

## 6. Conversation Detail Page

### Purpose

Let admin understand, edit, and act on a single conversation.

### Header

Left:

- Client/company or fallback: Conversation detail
- Lead/no lead badge
- Interest level
- Conversation time and duration

Right:

- Star/unstar
- Regenerate summary
- Delete

### Layout

Desktop: two-column layout.

Main column:

1. AI Summary
2. Sales intelligence
3. Full transcript collapsed by default

Side column:

1. Client details
2. Lead status
3. Admin notes

Mobile: single column in same order:

1. Summary
2. Client details
3. Status/notes
4. Transcript

### AI Summary Card

Fields:

- Summary
- Business type
- Main problem
- Business goal
- Interest level
- Concern/objection
- Recommended service
- Next action
- Analysis status

If analysis failed:

- Show failed state.
- Button: Regenerate summary.

If pending:

- Show pending state.
- Do not block transcript access.

### Client Details Card

Editable fields:

- Client name
- Company name
- Phone
- Email
- LINE
- WhatsApp
- Other contact
- Preferred contact method
- Preferred meeting day
- Preferred meeting time

UI details:

- Group contact fields together.
- Show small copy buttons for phone/email/LINE/WhatsApp.
- Save button fixed at bottom of card or clearly visible.

### Lead Status

If contact exists:

- Status select:
  - Pending follow-up
  - Appointment set
  - Follow up later
  - Deal closed
  - No deal

If no contact exists:

- Show `No lead captured`.
- Do not show lead status selector unless admin manually creates a lead later.

### Admin Notes

Textarea:

- Internal notes only.
- Never overwritten by AI.
- Save button.

The note field should be near status because both are part of follow-up workflow.

### Transcript Section

Collapsed by default.

Button:

- View full conversation
- Hide full conversation

When expanded:

- Chat-style transcript.
- Assistant/user/tool/system roles visually distinct.
- Tool call rows should be compact and clearly labeled.

Add copy transcript button later if needed.

---

## 7. Leads Page

### Purpose

Daily follow-up queue.

### Top Bar

Left:

- Page title: Leads
- Count.

Right:

- Search.
- Export leads.

### Filters

Primary status tabs:

- Pending follow-up
- Appointment set
- Follow up later
- Deal closed
- No deal

Optional:

- All
- High interest
- Starred

### Lead Row/Card

Each lead should show:

Top line:

- Client name
- Company
- Status pill
- Interest level pill

Contact row:

- Phone
- Email
- LINE
- WhatsApp
- Preferred contact method

Sales summary:

- Main problem
- Concern/objection
- Recommended service
- Next action

Footer:

- Created time
- Last updated time
- Notes preview
- Open conversation

Actions:

- Status dropdown
- Edit details
- Open

### Lead Detail

For V1.5, conversation detail can also serve as lead detail.

Later, add `/admin/leads/[id]` if lead workflow becomes more complex.

---

## 8. Settings Page

### Purpose

Configure the agent safely without breaking production.

### Recommended Layout

Use sections/tabs:

1. Voice Agent
2. Post-call Analysis
3. Knowledge Document
4. Advanced

### Voice Agent Section

Fields:

- Agent enabled
- Greeting
- Voice provider
- Provider preset

Provider preset examples:

OpenAI recommended:

- Provider: OpenAI
- Model: `gpt-realtime-2.1`
- Voice: `marin`
- Transcription: `gpt-realtime-whisper`

Gemini test:

- Provider: Gemini
- Model: `gemini-3.1-flash-live-preview`

Raw model fields should be under Advanced.

### Post-Call Analysis Section

Fields:

- Enable post-call analysis
- Analysis model: `gpt-4o-mini`

Actions:

- Regenerate failed summaries
- Regenerate missing summaries

These bulk actions can be deferred if too risky for V1.5.

### Knowledge Document Section

Large markdown editor.

Header should show:

- Knowledge version
- Last updated
- Save status

Important:

- This is factual knowledge, not behavior prompt.
- Add a short label:
  - "Services, prices, package details, promotion terms, course info."

Do not let this area imply the admin should rewrite the sales personality unless a separate behavior prompt editor is intentionally added later.

### Advanced Section

Fields:

- Max call seconds
- Daily session cap
- Raw model ID
- Raw voice
- Raw transcription model
- Language mode

Advanced fields should be visibly separated from normal settings.

---

## 9. Delete UX

Use soft delete.

Delete confirmation:

- Title: Delete conversation?
- Body: This hides the conversation and any linked lead from normal admin lists. Export can include deleted records only if selected.
- Buttons:
  - Cancel
  - Delete

Do not hard-delete in V1.5 unless explicitly requested.

---

## 10. Export UX

Export buttons:

- Overview: top-right.
- Conversations: top-right.
- Leads: top-right.

CSV fields for conversations:

- conversation_id
- started_at
- duration_seconds
- language
- page_url
- had_lead
- starred
- summary
- business_type
- main_problem
- business_goal
- interest_level
- concern_or_objection
- recommended_service
- next_action
- analysis_status

CSV fields for leads:

- lead_id
- conversation_id
- status
- client_name
- company_name
- phone
- email
- line_id
- whatsapp
- other_contact
- preferred_contact_method
- preferred_meeting_day
- preferred_meeting_time
- interest_level
- main_problem
- concern_or_objection
- recommended_service
- next_action
- admin_notes
- created_at
- updated_at

---

## 11. Responsive Behavior

Desktop:

- Dense two-column detail pages.
- Tables/cards with multiple fields.

Tablet:

- Cards stack.
- Filters wrap.

Mobile:

- Single-column cards.
- Important actions remain visible.
- Transcript remains collapsed by default.
- Settings should avoid tiny side-by-side form fields.

---

## 12. Implementation Priority

### Phase 1: Data + Analyzer

- Schema columns.
- Analyzer module.
- Conversation save triggers analysis.
- Store summary/client fields.

### Phase 2: Conversation UX

- Summary-first conversation list.
- Conversation detail with summary, client fields, notes, status, star, delete.
- Transcript collapsed.

### Phase 3: Leads UX

- Structured lead fields.
- New statuses.
- Notes.
- Lead filters.

### Phase 4: Export + Settings Polish

- CSV export.
- Settings sections.
- Provider presets.
- Active nav state and UI polish.

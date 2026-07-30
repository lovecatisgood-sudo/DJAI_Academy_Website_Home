import { readFileSync } from "node:fs";

const migration = readFileSync("scripts/migrate.mjs", "utf8");

function assertIncludes(value, message) {
  if (!migration.includes(value)) {
    console.error(message);
    process.exitCode = 1;
  }
}

const requiredTables = ["settings", "conversations", "leads"];
const requiredSettingsColumns = [
  "agent_enabled boolean",
  "greeting text",
  "voice text",
  "voice_provider text",
  "language_mode text",
  "knowledge_md text",
  "knowledge_version int",
  "max_call_seconds int",
  "daily_session_cap int",
  "model_id text",
  "transcription_model text",
  "analysis_enabled boolean",
  "analysis_model_id text",
];
const requiredConversationColumns = [
  "started_at timestamptz",
  "ended_at timestamptz",
  "duration_seconds int",
  "language text",
  "page_url text",
  "transcript jsonb",
  "had_lead boolean",
  "summary text",
  "business_type text",
  "main_problem text",
  "business_goal text",
  "interest_level text",
  "concern_or_objection text",
  "recommended_service text",
  "next_action text",
  "analysis_status text",
  "analysis_error text",
  "analysis_model_id text",
  "analysis_updated_at timestamptz",
  "starred boolean",
  "deleted_at timestamptz",
];
const requiredLeadColumns = [
  "conversation_id uuid references conversations(id)",
  "name text",
  "contact text",
  "contact_type text",
  "need text",
  "preferred_time text",
  "status text",
  "client_name text",
  "company_name text",
  "phone text",
  "email text",
  "line_id text",
  "whatsapp text",
  "other_contact text",
  "preferred_contact_method text",
  "preferred_meeting_day text",
  "preferred_meeting_time text",
  "admin_notes text",
  "updated_at timestamptz",
];
const requiredIndexes = [
  "leads_conversation_contact_unique",
  "conversations_started_at_idx",
  "conversations_had_lead_idx",
  "leads_created_at_idx",
  "leads_status_idx",
  "conversations_starred_idx",
  "conversations_deleted_at_idx",
  "conversations_analysis_status_idx",
  "leads_updated_at_idx",
];

for (const table of requiredTables) {
  assertIncludes(`create table if not exists ${table}`, `Missing table migration for ${table}.`);
}

for (const column of [
  ...requiredSettingsColumns,
  ...requiredConversationColumns,
  ...requiredLeadColumns,
]) {
  assertIncludes(column, `Missing required schema column: ${column}`);
}

for (const index of requiredIndexes) {
  assertIncludes(index, `Missing required index: ${index}`);
}

assertIncludes("insert into settings", "Migration must seed the settings row.");
assertIncludes("on conflict (id) do nothing", "Settings seed must be idempotent.");

if (!process.exitCode) {
  console.log("Schema invariants verified.");
}

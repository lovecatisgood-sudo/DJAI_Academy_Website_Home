import { loadNeon } from "./neon-client.mjs";
import { loadLocalEnv } from "./local-env.mjs";
import { redactError, requireDatabaseUrl } from "./env-utils.mjs";

loadLocalEnv();

const requiredColumns = {
  settings: [
    "agent_enabled",
    "greeting",
    "voice",
    "voice_provider",
    "language_mode",
    "knowledge_md",
    "knowledge_version",
    "max_call_seconds",
    "daily_session_cap",
    "model_id",
    "transcription_model",
    "analysis_enabled",
    "analysis_model_id",
    "updated_at",
  ],
  conversations: [
    "started_at",
    "ended_at",
    "duration_seconds",
    "language",
    "page_url",
    "transcript",
    "had_lead",
    "summary",
    "business_type",
    "main_problem",
    "business_goal",
    "interest_level",
    "concern_or_objection",
    "recommended_service",
    "next_action",
    "analysis_status",
    "analysis_error",
    "analysis_model_id",
    "analysis_updated_at",
    "starred",
    "deleted_at",
  ],
  leads: [
    "conversation_id",
    "created_at",
    "name",
    "contact",
    "contact_type",
    "need",
    "preferred_time",
    "status",
    "client_name",
    "company_name",
    "phone",
    "email",
    "line_id",
    "whatsapp",
    "other_contact",
    "preferred_contact_method",
    "preferred_meeting_day",
    "preferred_meeting_time",
    "admin_notes",
    "updated_at",
  ],
};

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

function fail(message) {
  console.error(message);
  process.exitCode = 1;
}

async function main() {
  const sql = (await loadNeon())(requireDatabaseUrl());
  const columnRows = await sql`
    select table_name, column_name
    from information_schema.columns
    where table_schema = 'public'
      and table_name in ('settings', 'conversations', 'leads')
  `;
  const actualColumns = new Set(columnRows.map((row) => `${row.table_name}.${row.column_name}`));

  for (const [table, columns] of Object.entries(requiredColumns)) {
    for (const column of columns) {
      if (!actualColumns.has(`${table}.${column}`)) {
        fail(`Live schema is missing ${table}.${column}.`);
      }
    }
  }

  const indexRows = await sql`
    select indexname
    from pg_indexes
    where schemaname = 'public'
      and indexname in (
        'leads_conversation_contact_unique',
        'conversations_started_at_idx',
        'conversations_had_lead_idx',
        'leads_created_at_idx',
        'leads_status_idx',
        'conversations_starred_idx',
        'conversations_deleted_at_idx',
        'conversations_analysis_status_idx',
        'leads_updated_at_idx'
      )
  `;
  const actualIndexes = new Set(indexRows.map((row) => row.indexname));

  for (const index of requiredIndexes) {
    if (!actualIndexes.has(index)) {
      fail(`Live schema is missing index ${index}.`);
    }
  }

  const settingsRows = await sql`select id from settings where id = 1 limit 1`;

  if (!settingsRows[0]) {
    fail("Live schema is missing settings row id=1.");
  }

  if (!process.exitCode) {
    console.log("Live schema verified.");
  }
}

main().catch((error) => {
  console.error(`Live schema verification failed: ${redactError(error)}`);
  process.exit(1);
});

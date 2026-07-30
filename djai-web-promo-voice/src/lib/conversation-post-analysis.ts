import { analyzeConversation, type ExistingLeadForAnalysis } from "./conversation-analysis";
import { firstUsableContact } from "./conversation-analysis-schema";
import { getSql } from "./db";
import { getCachedSettings } from "./settings-cache";
import type { Settings, TranscriptItem } from "./types";

type AnalyzeAndPersistOptions = {
  force?: boolean;
  settings?: Settings;
};

type ConversationForAnalysis = {
  id: string;
  page_url: string | null;
  language: string | null;
  transcript: TranscriptItem[] | null;
};

function errorMessage(error: unknown) {
  return (error instanceof Error ? error.message : "Conversation analysis failed.").slice(0, 1000);
}

function safeTranscript(value: TranscriptItem[] | null): TranscriptItem[] {
  return Array.isArray(value) ? value : [];
}

export async function analyzeAndPersistConversation(conversationId: string, options: AnalyzeAndPersistOptions = {}) {
  const sql = getSql();
  const settings = options.settings ?? await getCachedSettings();

  if (!options.force && !settings.analysis_enabled) {
    await sql`
      update conversations set
        analysis_status = 'skipped',
        analysis_error = null,
        analysis_model_id = ${settings.analysis_model_id},
        analysis_updated_at = now()
      where id = ${conversationId}
    `;
    return "skipped" as const;
  }

  const conversations = (await sql`
    select id, page_url, language, transcript
    from conversations
    where id = ${conversationId} and deleted_at is null
    limit 1
  `) as ConversationForAnalysis[];
  const conversation = conversations[0];

  if (!conversation) {
    throw new Error("Conversation not found.");
  }

  const transcript = safeTranscript(conversation.transcript);
  if (!transcript.length) {
    await sql`
      update conversations set
        analysis_status = 'skipped',
        analysis_error = null,
        analysis_model_id = ${settings.analysis_model_id},
        analysis_updated_at = now()
      where id = ${conversationId}
    `;
    return "skipped" as const;
  }

  await sql`
    update conversations set
      analysis_status = 'pending',
      analysis_error = null,
      analysis_model_id = ${settings.analysis_model_id},
      analysis_updated_at = now()
    where id = ${conversationId}
  `;

  try {
    const existingLeads = (await sql`
      select name, contact, contact_type, need, preferred_time
      from leads
      where conversation_id = ${conversationId}
      order by created_at desc
    `) as ExistingLeadForAnalysis[];
    const analysis = await analyzeConversation({
      modelId: settings.analysis_model_id,
      conversationId,
      pageUrl: conversation.page_url,
      language: conversation.language,
      transcript,
      existingLeads,
    });
    const contact = firstUsableContact(analysis.client);
    const preferredTime = [analysis.client.preferred_meeting_day, analysis.client.preferred_meeting_time]
      .filter(Boolean)
      .join(" ")
      .trim();
    const hasLead = Boolean(analysis.has_lead && contact);

    await sql`
      update conversations set
        summary = ${analysis.conversation.summary || null},
        business_type = ${analysis.conversation.business_type || null},
        main_problem = ${analysis.conversation.main_problem || null},
        business_goal = ${analysis.conversation.business_goal || null},
        interest_level = ${analysis.conversation.interest_level},
        concern_or_objection = ${analysis.conversation.concern_or_objection || null},
        recommended_service = ${analysis.conversation.recommended_service || null},
        next_action = ${analysis.conversation.next_action || null},
        analysis_status = 'completed',
        analysis_error = null,
        analysis_model_id = ${settings.analysis_model_id},
        analysis_updated_at = now(),
        had_lead = conversations.had_lead or ${hasLead}
      where id = ${conversationId}
    `;

    if (hasLead && contact) {
      await sql`
        insert into leads (
          conversation_id,
          name,
          contact,
          contact_type,
          need,
          preferred_time,
          status,
          client_name,
          company_name,
          phone,
          email,
          line_id,
          whatsapp,
          other_contact,
          preferred_contact_method,
          preferred_meeting_day,
          preferred_meeting_time,
          updated_at
        )
        values (
          ${conversationId},
          ${analysis.client.client_name || null},
          ${contact.contact},
          ${contact.contact_type},
          ${analysis.conversation.main_problem || analysis.conversation.summary || null},
          ${preferredTime || null},
          'pending_follow_up',
          ${analysis.client.client_name || null},
          ${analysis.client.company_name || null},
          ${analysis.client.phone || null},
          ${analysis.client.email || null},
          ${analysis.client.line_id || null},
          ${analysis.client.whatsapp || null},
          ${analysis.client.other_contact || null},
          ${analysis.client.preferred_contact_method || null},
          ${analysis.client.preferred_meeting_day || null},
          ${analysis.client.preferred_meeting_time || null},
          now()
        )
        on conflict (conversation_id, contact) do update set
          name = coalesce(nullif(leads.name, ''), excluded.name),
          need = coalesce(excluded.need, leads.need),
          preferred_time = coalesce(excluded.preferred_time, leads.preferred_time),
          client_name = coalesce(nullif(leads.client_name, ''), excluded.client_name),
          company_name = coalesce(nullif(leads.company_name, ''), excluded.company_name),
          phone = coalesce(nullif(leads.phone, ''), excluded.phone),
          email = coalesce(nullif(leads.email, ''), excluded.email),
          line_id = coalesce(nullif(leads.line_id, ''), excluded.line_id),
          whatsapp = coalesce(nullif(leads.whatsapp, ''), excluded.whatsapp),
          other_contact = coalesce(nullif(leads.other_contact, ''), excluded.other_contact),
          preferred_contact_method = coalesce(nullif(leads.preferred_contact_method, ''), excluded.preferred_contact_method),
          preferred_meeting_day = coalesce(nullif(leads.preferred_meeting_day, ''), excluded.preferred_meeting_day),
          preferred_meeting_time = coalesce(nullif(leads.preferred_meeting_time, ''), excluded.preferred_meeting_time),
          updated_at = now()
      `;
    }

    return "completed" as const;
  } catch (error) {
    console.error("Conversation analysis failed", error);
    await sql`
      update conversations set
        analysis_status = 'failed',
        analysis_error = ${errorMessage(error)},
        analysis_model_id = ${settings.analysis_model_id},
        analysis_updated_at = now()
      where id = ${conversationId}
    `;
    return "failed" as const;
  }
}

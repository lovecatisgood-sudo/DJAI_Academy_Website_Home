export type ContactType = "phone" | "line" | "email" | "other";
export type LeadStatus = "pending_follow_up" | "appointment_set" | "follow_up_later" | "deal_closed" | "no_deal";
export type ConversationLanguage = "th" | "en" | "mixed";
export type VoiceProvider = "openai" | "gemini";
export type InterestLevel = "low" | "medium" | "high" | "unknown";
export type AnalysisStatus = "pending" | "completed" | "failed" | "skipped";

export type Settings = {
  id: number;
  agent_enabled: boolean;
  greeting: string | null;
  voice: string;
  voice_provider: VoiceProvider;
  language_mode: string;
  knowledge_md: string | null;
  knowledge_version: number;
  max_call_seconds: number;
  daily_session_cap: number;
  model_id: string;
  transcription_model: string;
  analysis_enabled: boolean;
  analysis_model_id: string;
  updated_at: string;
};

export type TranscriptItem = {
  role: "user" | "assistant" | "tool" | "system";
  text: string;
  t: number;
};

export type LeadPayload = {
  name: string;
  contact: string;
  contact_type: ContactType;
  need: string;
  preferred_time: string;
};

export type ConversationSummaryFields = {
  summary: string | null;
  business_type: string | null;
  main_problem: string | null;
  business_goal: string | null;
  interest_level: InterestLevel;
  concern_or_objection: string | null;
  recommended_service: string | null;
  next_action: string | null;
  analysis_status: AnalysisStatus;
  analysis_error: string | null;
  analysis_model_id: string | null;
  analysis_updated_at: string | null;
  starred: boolean;
  deleted_at: string | null;
};

export type LeadClientFields = {
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
  updated_at: string | null;
};

"use server";

import { redirect } from "next/navigation";
import { clearAdminCookie, requireAdmin, setAdminCookie, validateAdminCredentials } from "@/lib/admin-auth";
import { getSql } from "@/lib/db";
import { invalidateSettingsCache } from "@/lib/settings-cache";
import { checkRateLimit } from "@/lib/rate-limit";
import { normalizeSettingsInput } from "@/lib/settings-validation";
import { analyzeAndPersistConversation } from "@/lib/conversation-post-analysis";
import type { LeadStatus } from "@/lib/types";
import { headers } from "next/headers";

function text(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function numberValue(formData: FormData, key: string, fallback: number) {
  const value = Number(text(formData, key));
  return Number.isFinite(value) ? value : fallback;
}

function nullableText(formData: FormData, key: string) {
  const value = text(formData, key);
  return value || null;
}

function redirectTo(formData: FormData, fallback: string) {
  const value = text(formData, "redirect_to");
  return value.startsWith("/voice_admin") ? value : fallback;
}

const leadStatuses = new Set<LeadStatus>([
  "pending_follow_up",
  "appointment_set",
  "follow_up_later",
  "deal_closed",
  "no_deal",
]);

function leadStatusValue(value: string): LeadStatus {
  return leadStatuses.has(value as LeadStatus) ? (value as LeadStatus) : "pending_follow_up";
}

async function adminLoginKeys(username: string) {
  const headerStore = await headers();
  const realIp = headerStore.get("x-real-ip")?.trim();
  const forwardedFor = headerStore.get("x-forwarded-for")?.split(",")[0]?.trim();
  const candidate = realIp || forwardedFor || "unknown";
  const client = /^[A-Za-z0-9.:_-]{1,80}$/.test(candidate) ? candidate : "unknown";
  return [`admin-login-ip:${client}`, `admin-login-user:${client}:${username || "empty"}`];
}

export async function loginAction(formData: FormData) {
  const username = text(formData, "username");
  const password = text(formData, "password");
  const [ipKey, userKey] = await adminLoginKeys(username);
  const ipRateLimit = checkRateLimit(ipKey, 20, 15 * 60 * 1000);
  const userRateLimit = checkRateLimit(userKey, 8, 15 * 60 * 1000);

  if (!ipRateLimit.allowed || !userRateLimit.allowed) {
    redirect("/voice_admin/login?error=rate");
  }

  if (!validateAdminCredentials(username, password)) {
    redirect("/voice_admin/login?error=1");
  }

  await setAdminCookie(username);
  redirect("/voice_admin");
}

export async function logoutAction() {
  await clearAdminCookie();
  redirect("/voice_admin/login");
}

export async function saveSettingsAction(formData: FormData) {
  await requireAdmin();
  const sql = getSql();
  const settings = normalizeSettingsInput({
    agent_enabled: formData.get("agent_enabled") === "on" ? "on" : "",
    greeting: text(formData, "greeting"),
    voice: text(formData, "voice"),
    voice_provider: text(formData, "voice_provider"),
    language_mode: text(formData, "language_mode"),
    knowledge_md: text(formData, "knowledge_md"),
    max_call_seconds: numberValue(formData, "max_call_seconds", 600),
    daily_session_cap: numberValue(formData, "daily_session_cap", 100),
    model_id: text(formData, "model_id"),
    transcription_model: text(formData, "transcription_model"),
    analysis_enabled: formData.get("analysis_enabled") === "on" ? "on" : "",
    analysis_model_id: text(formData, "analysis_model_id"),
  }, "form");

  await sql`
    update settings set
      agent_enabled = ${settings.agent_enabled ?? false},
      greeting = ${settings.greeting ?? ""},
      voice = ${settings.voice ?? ""},
      voice_provider = ${settings.voice_provider ?? "openai"},
      language_mode = ${settings.language_mode ?? ""},
      knowledge_md = ${settings.knowledge_md ?? ""},
      knowledge_version = knowledge_version + 1,
      max_call_seconds = ${settings.max_call_seconds ?? 600},
      daily_session_cap = ${settings.daily_session_cap ?? 100},
      model_id = ${settings.model_id ?? ""},
      transcription_model = ${settings.transcription_model ?? ""},
      analysis_enabled = ${settings.analysis_enabled ?? true},
      analysis_model_id = ${settings.analysis_model_id ?? "gpt-4o-mini"},
      updated_at = now()
    where id = 1
  `;

  invalidateSettingsCache();
  redirect("/voice_admin/settings?saved=1");
}

export async function cycleLeadStatusAction(formData: FormData) {
  await requireAdmin();
  const id = text(formData, "id");
  const current = text(formData, "status");
  const next = current === "pending_follow_up"
    ? "appointment_set"
    : current === "appointment_set"
      ? "follow_up_later"
      : current === "follow_up_later"
        ? "deal_closed"
        : current === "deal_closed"
          ? "no_deal"
          : "pending_follow_up";
  const sql = getSql();

  await sql`update leads set status = ${next}, updated_at = now() where id = ${id}`;
  redirect("/voice_admin/leads");
}

export async function updateLeadAction(formData: FormData) {
  await requireAdmin();
  const id = text(formData, "id");
  const status = leadStatusValue(text(formData, "status"));
  const sql = getSql();

  await sql`
    update leads set
      status = ${status},
      client_name = ${nullableText(formData, "client_name")},
      company_name = ${nullableText(formData, "company_name")},
      phone = ${nullableText(formData, "phone")},
      email = ${nullableText(formData, "email")},
      line_id = ${nullableText(formData, "line_id")},
      whatsapp = ${nullableText(formData, "whatsapp")},
      other_contact = ${nullableText(formData, "other_contact")},
      preferred_contact_method = ${nullableText(formData, "preferred_contact_method")},
      preferred_meeting_day = ${nullableText(formData, "preferred_meeting_day")},
      preferred_meeting_time = ${nullableText(formData, "preferred_meeting_time")},
      admin_notes = ${nullableText(formData, "admin_notes")},
      name = coalesce(${nullableText(formData, "client_name")}, name),
      updated_at = now()
    where id = ${id}
  `;
  redirect(redirectTo(formData, "/voice_admin/leads"));
}

export async function updateConversationIntelligenceAction(formData: FormData) {
  await requireAdmin();
  const id = text(formData, "id");
  const interest = text(formData, "interest_level");
  const interestLevel = interest === "low" || interest === "medium" || interest === "high" || interest === "unknown"
    ? interest
    : "unknown";
  const sql = getSql();

  await sql`
    update conversations set
      summary = ${nullableText(formData, "summary")},
      business_type = ${nullableText(formData, "business_type")},
      main_problem = ${nullableText(formData, "main_problem")},
      business_goal = ${nullableText(formData, "business_goal")},
      interest_level = ${interestLevel},
      concern_or_objection = ${nullableText(formData, "concern_or_objection")},
      recommended_service = ${nullableText(formData, "recommended_service")},
      next_action = ${nullableText(formData, "next_action")},
      analysis_updated_at = now()
    where id = ${id} and deleted_at is null
  `;
  redirect(redirectTo(formData, `/voice_admin/conversations/${id}`));
}

export async function toggleConversationStarAction(formData: FormData) {
  await requireAdmin();
  const id = text(formData, "id");
  const sql = getSql();

  await sql`
    update conversations
    set starred = not coalesce(starred, false)
    where id = ${id}
  `;
  redirect(redirectTo(formData, "/voice_admin/conversations"));
}

export async function deleteConversationAction(formData: FormData) {
  await requireAdmin();
  const id = text(formData, "id");
  const sql = getSql();

  await sql`
    update conversations
    set deleted_at = now()
    where id = ${id}
  `;
  redirect("/voice_admin/conversations?deleted=1");
}

export async function regenerateConversationAnalysisAction(formData: FormData) {
  await requireAdmin();
  const id = text(formData, "id");
  await analyzeAndPersistConversation(id, { force: true });
  redirect(redirectTo(formData, `/voice_admin/conversations/${id}?analysis=updated`));
}

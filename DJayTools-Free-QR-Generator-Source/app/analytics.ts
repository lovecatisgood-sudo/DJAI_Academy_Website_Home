export type SeoEventName =
  | "tool_start"
  | "tool_success"
  | "tool_download"
  | "cta_click"
  | "play_store_click"
  | "enquiry_start"
  | "course_start";

const allowedEvents = new Set<SeoEventName>([
  "tool_start", "tool_success", "tool_download", "cta_click",
  "play_store_click", "enquiry_start", "course_start"
]);
const allowedParameters = new Set([
  "source_path", "locale", "cluster", "tool_slug", "destination_type",
  "destination_url", "service_category", "course_id"
]);
const forbiddenParameter = /file(name)?|payload|content|document|qr(_|)value|email|phone|query/i;

function isApprovedEvent(name: string, params: Record<string, string>) {
  if (!allowedEvents.has(name as SeoEventName) || !params || typeof params !== "object") return false;
  return Object.entries(params).every(([key, value]) =>
    allowedParameters.has(key)
    && !forbiddenParameter.test(key)
    && typeof value === "string"
  );
}

export function trackSeoEvent(name: SeoEventName, params: Record<string, string>): void {
  if (!isApprovedEvent(name, params) || typeof window === "undefined") return;
  const gtag = (window as typeof window & { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof gtag !== "function") return;
  gtag("event", name, params);
}

const allowedEvents = new Set([
  "tool_start",
  "tool_success",
  "tool_download",
  "cta_click",
  "play_store_click",
  "enquiry_start",
  "course_start"
]);

const allowedParameters = new Set([
  "source_path",
  "locale",
  "cluster",
  "tool_slug",
  "destination_type",
  "destination_url",
  "service_category",
  "course_id"
]);

const forbiddenParameter = /file(name)?|payload|content|document|qr(_|)value|email|phone|query/i;

function isApprovedEvent(name, params) {
  if (!allowedEvents.has(name) || !params || typeof params !== "object") return false;

  return Object.entries(params).every(([key, value]) =>
    allowedParameters.has(key)
    && !forbiddenParameter.test(key)
    && typeof value === "string"
  );
}

export function trackSeoEvent(name, params) {
  if (!isApprovedEvent(name, params) || typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}

import type { LeadPayload } from "./types";

const contactTypes = new Set(["phone", "line", "email", "other"]);

function cleanText(value: unknown, maxLength: number) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().replace(/\s+/g, " ").slice(0, maxLength);
}

export function parseLeadPayload(input: unknown): LeadPayload {
  const data = input && typeof input === "object" ? (input as Record<string, unknown>) : {};
  const contactType = cleanText(data.contact_type, 20);
  const payload = {
    name: cleanText(data.name, 160),
    contact: cleanText(data.contact, 240),
    contact_type: contactTypes.has(contactType) ? contactType : "other",
    need: cleanText(data.need, 1000),
    preferred_time: cleanText(data.preferred_time, 240),
  } as LeadPayload;

  if (!payload.name || !payload.contact || !payload.need || !payload.preferred_time) {
    throw new Error("Lead requires name, contact, need, and preferred_time.");
  }

  return payload;
}

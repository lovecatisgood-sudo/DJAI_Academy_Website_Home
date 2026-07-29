import type { QrMode } from "./qr-tool-data";

export type QrTaskValues = {
  url: string;
  text: string;
  ssid: string;
  wifiPassword: string;
  wifiSecurity: "WPA" | "WEP" | "nopass";
  hidden: boolean;
  name: string;
  phone: string;
  email: string;
  company: string;
  website: string;
  subject: string;
  message: string;
};

function escapeWifi(value: string) {
  return value.replace(/([\\;,:"])/g, "\\$1");
}

export function normalizeUrl(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "";
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

export function buildQrPayload(mode: QrMode, values: QrTaskValues) {
  if (mode === "url" || mode === "logo") return normalizeUrl(values.url);
  if (mode === "text") return values.text.trim();
  if (mode === "wifi") {
    if (!values.ssid.trim()) return "";
    const password = values.wifiSecurity === "nopass" ? "" : escapeWifi(values.wifiPassword);
    return `WIFI:T:${values.wifiSecurity};S:${escapeWifi(values.ssid)};P:${password};H:${values.hidden ? "true" : "false"};;`;
  }
  if (mode === "vcard") {
    if (!values.name.trim()) return "";
    return ["BEGIN:VCARD", "VERSION:3.0", `FN:${values.name.trim()}`, values.company.trim() && `ORG:${values.company.trim()}`, values.phone.trim() && `TEL:${values.phone.trim()}`, values.email.trim() && `EMAIL:${values.email.trim()}`, values.website.trim() && `URL:${normalizeUrl(values.website)}`, "END:VCARD"].filter(Boolean).join("\n");
  }
  if (mode === "email") {
    if (!values.email.trim()) return "";
    const query = new URLSearchParams();
    if (values.subject.trim()) query.set("subject", values.subject.trim());
    if (values.message.trim()) query.set("body", values.message.trim());
    return `mailto:${values.email.trim()}${query.size ? `?${query.toString()}` : ""}`;
  }
  const phone = values.phone.replace(/\D/g, "");
  if (!phone) return "";
  return `https://wa.me/${phone}${values.message.trim() ? `?text=${encodeURIComponent(values.message.trim())}` : ""}`;
}

export function validateQrTask(mode: QrMode, values: QrTaskValues) {
  if ((mode === "url" || mode === "logo") && !values.url.trim()) return "url";
  if (mode === "text" && !values.text.trim()) return "text";
  if (mode === "wifi" && !values.ssid.trim()) return "ssid";
  if (mode === "wifi" && values.wifiSecurity !== "nopass" && !values.wifiPassword) return "password";
  if (mode === "vcard" && !values.name.trim()) return "name";
  if (mode === "email" && !/^\S+@\S+\.\S+$/.test(values.email.trim())) return "email";
  if (mode === "whatsapp" && values.phone.replace(/\D/g, "").length < 8) return "phone";
  return "";
}

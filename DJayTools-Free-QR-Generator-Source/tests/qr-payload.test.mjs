import assert from "node:assert/strict";
import test from "node:test";
import { buildQrPayload, validateQrTask } from "../app/qr-payload.ts";

const values = { url: "example.com", text: "hello", ssid: "Cafe;WiFi", wifiPassword: "p;ass", wifiSecurity: "WPA", hidden: false, name: "Ada Lovelace", phone: "+66 81 234 5678", email: "ada@example.com", company: "DJAI", website: "djai.academy", subject: "Hello", message: "Start here" };

test("builds standards-based Wi-Fi and vCard payloads", () => {
  assert.equal(buildQrPayload("wifi", values), "WIFI:T:WPA;S:Cafe\\;WiFi;P:p\\;ass;H:false;;");
  assert.match(buildQrPayload("vcard", values), /BEGIN:VCARD[\s\S]*FN:Ada Lovelace[\s\S]*END:VCARD/);
});

test("builds email, WhatsApp, and normalized URL payloads", () => {
  assert.equal(buildQrPayload("url", values), "https://example.com");
  assert.match(buildQrPayload("email", values), /^mailto:ada@example\.com\?/);
  assert.equal(buildQrPayload("whatsapp", values), "https://wa.me/66812345678?text=Start%20here");
  assert.equal(validateQrTask("email", { ...values, email: "wrong" }), "email");
});

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { trackSeoEvent as trackHomepageEvent } from "../djai-academy-homepage/app/lib/seoAnalytics.js";
import { trackSeoEvent as trackPdfEvent } from "../djai-pdf-tools/app/analytics.ts";
import { trackSeoEvent as trackQrEvent } from "../DJayTools-Free-QR-Generator-Source/app/analytics.ts";

const allowedEvents = new Set([
  "tool_start", "tool_success", "tool_download", "cta_click",
  "play_store_click", "enquiry_start", "course_start"
]);
const forbiddenKeys = /file(name)?|payload|content|document|qr(_|)value|email|phone|query/i;
const helpers = [trackHomepageEvent, trackPdfEvent, trackQrEvent];

test("SEO event helpers fail silently when analytics is unavailable", () => {
  const originalWindow = globalThis.window;
  delete globalThis.window;

  try {
    for (const track of helpers) {
      assert.doesNotThrow(() => track("cta_click", {
        source_path: "/development/en/",
        locale: "en",
        cluster: "commercial",
        destination_type: "contact",
        destination_url: "/contact-us/en/"
      }));
    }
  } finally {
    if (originalWindow !== undefined) globalThis.window = originalWindow;
  }
});

test("SEO event helpers forward only approved events and parameters", () => {
  const calls = [];
  const originalWindow = globalThis.window;
  globalThis.window = { gtag: (...args) => calls.push(args) };

  try {
    for (const track of helpers) {
      track("play_store_click", {
        source_path: "/Cam_PDF_Scan_Signer_QR-Gen/",
        locale: "en",
        cluster: "cam_pdf",
        destination_type: "google_play",
        destination_url: "https://play.google.com/store/apps/details?id=com.djai.campdfscan"
      });
    }
  } finally {
    if (originalWindow === undefined) delete globalThis.window;
    else globalThis.window = originalWindow;
  }

  assert.equal(calls.length, helpers.length);
  for (const [command, name, params] of calls) {
    assert.equal(command, "event");
    assert.equal(allowedEvents.has(name), true);
    for (const key of Object.keys(params)) assert.doesNotMatch(key, forbiddenKeys);
  }
});

test("invalid event names and sensitive or unknown parameter keys are rejected", () => {
  const calls = [];
  const originalWindow = globalThis.window;
  globalThis.window = { gtag: (...args) => calls.push(args) };

  try {
    for (const track of helpers) {
      track("search_query", { source_path: "/tools/", locale: "en", cluster: "tools" });
      track("tool_success", {
        source_path: "/tools/PDFTools/merge-pdf/en/",
        locale: "en",
        cluster: "pdf",
        filename: "private.pdf"
      });
      track("tool_success", {
        source_path: "/tools/PDFTools/merge-pdf/en/",
        locale: "en",
        cluster: "pdf",
        campaign_label: "not-in-contract"
      });
    }
  } finally {
    if (originalWindow === undefined) delete globalThis.window;
    else globalThis.window = originalWindow;
  }

  assert.deepEqual(calls, []);
});

test("TrackedLink remains a normal anchor and does not add an analytics loader", () => {
  const source = readFileSync(
    new URL("../djai-academy-homepage/app/components/TrackedLink.jsx", import.meta.url),
    "utf8"
  );
  assert.match(source, /<a\b/);
  assert.match(source, /trackSeoEvent\(eventName, eventParams\)/);
  assert.doesNotMatch(source, /googletagmanager|<Script|dataLayer/);
});

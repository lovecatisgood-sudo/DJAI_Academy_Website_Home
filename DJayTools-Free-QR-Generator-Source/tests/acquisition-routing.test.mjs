import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const dataSource = await readFile(new URL("../app/qr-tool-data.ts", import.meta.url), "utf8");
const thaiSource = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
const englishSource = await readFile(new URL("../app/en/page.tsx", import.meta.url), "utf8");
const vietnameseSource = await readFile(new URL("../app/vi/page.tsx", import.meta.url), "utf8");
const successSource = await readFile(new URL("../app/QrSuccessJourney.tsx", import.meta.url), "utf8").catch(() => "");

test("the Thai URL page owns the link-to-QR query family with truthful output details", () => {
  assert.match(dataSource, /title:\s*"สร้าง QR Code จากลิงก์ฟรี"/);
  assert.match(dataSource, /description:\s*"[^"]*PNG หรือ SVG[^"]*ไม่ต้องสมัคร[^"]*"/);
  for (const query of ["ทำลิงก์เป็น QR Code", "สร้าง QR Code จาก link", "แปลง URL เป็น QR Code", "สร้าง QR Code ลิงก์ฟรี"]) {
    assert.ok(dataSource.includes(query), `missing supported variant: ${query}`);
  }
});

test("all published QR interfaces use the same stable, payload-free event contract", () => {
  for (const [locale, source] of [["th", thaiSource], ["en", englishSource], ["vi", vietnameseSource]]) {
    assert.match(source, /trackSeoEvent\("tool_start",\s*seoEventParams\)/, locale);
    assert.match(source, /trackSeoEvent\("tool_success",\s*seoEventParams\)/, locale);
    assert.match(source, /trackSeoEvent\("tool_download",\s*seoEventParams\)/, locale);
    assert.match(source, /cluster:\s*"qr"/, locale);
    assert.doesNotMatch(source, /trackSeoEvent\([^)]*(?:taskPayload|payload|url|email|phone|message)/i, locale);
  }
});

test("download success replaces random promotion rotation in every published locale", () => {
  for (const [locale, source] of [["th", thaiSource], ["en", englishSource], ["vi", vietnameseSource]]) {
    assert.match(source, /downloaded\s*&&\s*<QrSuccessJourney/, locale);
    assert.doesNotMatch(source, /shouldShowToolPromo|ToolPromoModal|promoType|setPromoType/, locale);
  }
});

test("the deterministic success journey orders a related QR task before Cam PDF", () => {
  const relatedIndex = successSource.indexOf('className="qr-success-related"');
  const camIndex = successSource.indexOf('className="qr-success-cam"');

  assert.ok(relatedIndex >= 0, "related QR action must exist");
  assert.ok(camIndex > relatedIndex, "Cam PDF must follow the related QR action");
  assert.match(successSource, /qrRelatedToolOrder\[currentTool\]\[0\]/);
  assert.match(successSource, /trackSeoEvent\("play_store_click",\s*\{/);
  assert.match(successSource, /destination_url:\s*CAM_PDF_PLAY_URL/);
});

test("each QR type has a deterministic related-task route", () => {
  for (const slug of [
    "url-qr-code-generator",
    "wifi-qr-code-generator",
    "vcard-qr-code-generator",
    "text-qr-code-generator",
    "email-qr-code-generator",
    "whatsapp-qr-code-generator",
    "qr-code-generator-with-logo"
  ]) {
    assert.match(dataSource, new RegExp(`"${slug}":\\s*\\[`));
  }
});

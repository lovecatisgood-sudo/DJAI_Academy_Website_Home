import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { runInNewContext } from "node:vm";

const read = (path) => readFile(new URL(path, import.meta.url), "utf8");
const [sitemap, viPosts, viArticle, promoThai, promoVietnamese, releaseAudit] = await Promise.all([
  read("../app/sitemap.js"),
  read("../app/lib/viBlogPosts.js"),
  read("../app/blog/vi/[slug]/page.jsx"),
  read("../../djai-web-promo-voice/src/app/layout.tsx"),
  read("../../djai-web-promo-voice/src/app/vi/page.tsx"),
  read("../../scripts/audit-hostinger.mjs")
]);

test("sitemap assigns honest route-specific dates without changing global defaults", () => {
  assert.match(sitemap, /STATIC_LAST_MODIFIED = new Date\("2026-07-30T00:00:00\.000Z"\)/);
  assert.match(sitemap, /COURSE_LAST_MODIFIED = new Date\("2026-08-23T00:00:00\.000Z"\)/);
  assert.match(sitemap, /CAM_PDF_PRIVACY_LAST_MODIFIED = new Date\("2026-09-06T00:00:00\.000Z"\)/);
  assert.match(sitemap, /CAM_PDF_PRODUCT_LAST_MODIFIED = new Date\("2026-09-06T00:00:00\.000Z"\)/);
  assert.match(sitemap, /CAM_PDF_TERMS_LAST_MODIFIED = new Date\("2026-09-06T00:00:00\.000Z"\)/);
  assert.match(sitemap, /path === "\/Cam_PDF_Scan_Signer_QR-Gen\/privacy\/"[\s\S]*CAM_PDF_PRIVACY_LAST_MODIFIED/);
  assert.match(sitemap, /path === "\/Cam_PDF_Scan_Signer_QR-Gen\/"[\s\S]*CAM_PDF_PRODUCT_LAST_MODIFIED/);
  assert.match(sitemap, /path === "\/Cam_PDF_Scan_Signer_QR-Gen\/terms\/"[\s\S]*CAM_PDF_TERMS_LAST_MODIFIED/);
  assert.match(sitemap, /path\.startsWith\("\/siamese_cat\/dev\/courses\/"\)[\s\S]*SIAMESE_COURSES_LAST_MODIFIED[\s\S]*path\.startsWith\("\/siamese_cat\/dev\/course\/"\)[\s\S]*COURSE_LAST_MODIFIED/);
});

test("intentional single-language content does not invent locale equivalents", () => {
  assert.match(viPosts, /slug: "vibe-coding-cho-nguoi-moi",[\s\S]*?alternateEn: null/);
  assert.match(viArticle, /const languages = \{ vi:/);
  assert.match(viArticle, /if \(post\.alternateEn\)/);
  assert.doesNotMatch(viArticle, /languages\.en\s*=\s*\/blog\/en\/vibe-coding-cho-nguoi-moi/);
});

test("web promotion is a Thai and Vietnamese pair without a fabricated English target", () => {
  for (const source of [promoThai, promoVietnamese]) {
    assert.match(source, /th: "\/web_promo\/"/);
    assert.match(source, /vi: "\/web_promo\/vi\/"/);
    assert.match(source, /"x-default": "\/web_promo\/"/);
    assert.doesNotMatch(source, /en: "\/web_promo\/en\/"/);
  }
});

test("release audit locks sitemap freshness and intentional locale shapes", () => {
  assert.match(releaseAudit, /invented non-equivalent English promotion alternate/);
  assert.match(releaseAudit, /invented .* alternate for a standalone Vietnamese article/);
  assert.match(releaseAudit, /2026-09-02T00:00:00\.000Z/);
  assert.match(releaseAudit, /Noindex Thai app policy must not be in the sitemap/);
});

test("only the 55 repaired suite pages receive the new help timestamp", async () => {
  const executable = sitemap.replace(/^import .*;$/gm, "").replace("export default async function sitemap", "async function sitemap").replace("export const revalidate", "const revalidate");
  const entries = await runInNewContext(executable + ";sitemap()", {
    getAllPosts: async () => [], getAllThaiPosts: async () => [], getPostsByCategory: async () => [],
    SIAMESE_CAT_DEV_CATEGORY: "Siamese Cat Dev", viBlogPosts: [], videoToolSlugs: []
  });
  const groups = {
    document: ["docx-to-pdf", "docx-to-html", "docx-to-markdown", "docx-to-text", "pdf-to-text", "pdf-to-word", "ocr"],
    ai: ["pdf-to-ai-markdown", "context-optimizer", "rag-chunk-calculator", "prompt-packager"],
    spreadsheet: ["csv-to-json", "json-to-csv", "csv-cleaner", "merge-csv", "split-csv", "csv-to-xlsx", "xlsx-to-csv"]
  };
  const expected = Object.entries(groups).flatMap(([category, slugs]) => slugs.flatMap((slug) => ["", "en/", "vi/"].map((locale) => `/tools/${category}/${slug}/${locale}`)));
  expected.push("/tools/ai/token-counter/vi/");
  const actual = entries.filter((entry) => entry.lastModified.toISOString() === "2026-10-26T00:00:00.000Z" && /^https:\/\/www\.djai\.academy\/tools\/(document|ai|spreadsheet)\//.test(entry.url)).map((entry) => new URL(entry.url).pathname);
  assert.equal(actual.length, 55); assert.deepEqual([...actual].sort(), expected.sort());
  assert.equal(entries.some((entry) => entry.url.endsWith("/Cam_PDF_Scan_Signer_QR-Gen/privacy/th/")), false);
});

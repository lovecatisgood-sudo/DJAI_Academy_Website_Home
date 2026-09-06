import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const appSource = await readFile(new URL("../app/PdfToolsApp.tsx", import.meta.url), "utf8");
const toolDataSource = await readFile(new URL("../app/tool-data.ts", import.meta.url), "utf8");
const aliasSource = await readFile(new URL("../app/seo-alias-data.ts", import.meta.url), "utf8");

test("the multi-format image-to-PDF page owns a distinct ordered-document promise", () => {
  assert.match(toolDataSource, /title:\s*"รวมรูป JPG, PNG และ WebP เป็น PDF ฟรี"/);
  assert.match(toolDataSource, /description:\s*"[^"]*จัดลำดับ[^"]*"/);
  assert.match(toolDataSource, /title:\s*"JPG, PNG & WebP to PDF"/);
});

test("JPG, PNG, WebP, and multi-format pages retain distinct routes and visible promises", () => {
  for (const [slug, fileType] of [["jpg-to-pdf", "JPG"], ["png-to-pdf", "PNG"], ["webp-to-pdf", "WebP"]]) {
    assert.match(aliasSource, new RegExp(`"${slug}":\\s*\\{`));
    assert.match(aliasSource, new RegExp(`slug:\\s*"${slug}"`));
    assert.match(aliasSource, new RegExp(`title:\\s*"Convert ${fileType} to PDF Online Free"`));
  }
  const jpgAlias = aliasSource.slice(
    aliasSource.indexOf('"jpg-to-pdf"'),
    aliasSource.indexOf('"pdf-to-jpg"')
  );
  assert.doesNotMatch(jpgAlias, /รวมรูปเป็น PDF/);
  assert.match(aliasSource, /return `\/tools\/PDFTools\/\$\{alias\.slug\}\/\$\{language === "en" \? "en\/" : ""\}`/);
});

test("PDF completion events contain only stable route and intent dimensions", () => {
  assert.match(appSource, /trackSeoEvent\("tool_start",\s*seoEventParams\)/);
  assert.match(appSource, /trackSeoEvent\("tool_success",\s*seoEventParams\)/);
  assert.match(appSource, /trackSeoEvent\("tool_download",\s*seoEventParams\)/);
  assert.match(appSource, /source_path:\s*sourcePath/);
  assert.match(appSource, /locale:\s*language/);
  assert.match(appSource, /cluster:\s*"pdf"/);
  assert.match(appSource, /tool_slug:\s*publicSlug/);
  assert.doesNotMatch(appSource, /trackSeoEvent\([^)]*(?:file|content|document|payload|email)/i);
});

test("post-success routing presents related tools before the tracked Cam PDF bridge", () => {
  const resultIndex = appSource.indexOf('<section className="result-section"');
  const relatedIndex = appSource.indexOf('<div className="continue-tools"', resultIndex);
  const camIndex = appSource.indexOf("<CamPdfAppCallout", resultIndex);

  assert.ok(resultIndex >= 0, "result section must exist");
  assert.ok(relatedIndex > resultIndex, "related tools must follow the result");
  assert.ok(camIndex > relatedIndex, "Cam PDF must follow related tools");
  assert.match(appSource, /trackSeoEvent\("play_store_click",\s*\{/);
});

test("PDF results no longer trigger random course or development promotions", async () => {
  assert.doesNotMatch(appSource, /shouldShowToolPromo|ToolPromoModal|setPromoType|promoType/);
  assert.doesNotMatch(appSource, /className="conversion-band course-band"/);
  await assert.rejects(access(new URL("../app/ToolPromoModal.tsx", import.meta.url)), { code: "ENOENT" });
});

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const root = join(import.meta.dirname, "..");
const read = (path) => readFileSync(join(root, path), "utf8");

test("the routing manifest assigns one contextual journey per tool family", () => {
  const routing = JSON.parse(read("data/seo/acquisition-routing.json")).clusters;
  assert.deepEqual(routing.document, { primary: "cam_pdf", secondary: "development", after: "related_tool" });
  assert.deepEqual(routing.ai, { primary: "development", secondary: "school", after: "related_tool" });
  assert.deepEqual(routing.spreadsheet, { primary: "development", secondary: "none", after: "related_tool" });
  assert.deepEqual(routing.seo, { primary: "development", secondary: "school", after: "related_tool" });
  assert.deepEqual(routing.image, { primary: "related_guide", secondary: "development", after: "related_tool" });
  assert.deepEqual(routing.media, { primary: "related_guide", secondary: "development", after: "related_tool" });
});

test("document tools put related tools before a category-specific acquisition bridge", () => {
  const categoryPage = read("djai-document-tools/app/category-page.tsx");
  const toolPage = read("djai-document-tools/app/tool-page.tsx");
  const workspace = read("djai-document-tools/app/ToolWorkspace.tsx");
  const bridge = read("djai-document-tools/app/AcquisitionBridge.tsx");

  assert.match(categoryPage, /import AcquisitionBridge from/);
  assert.match(bridge, /category === "document"[\s\S]*Cam PDF/);
  assert.match(bridge, /data-acquisition-primary="development"/);
  assert.match(bridge, /developmentHref = [\s\S]*\/development\//);
  assert.match(bridge, /schoolHref = [^;]*school\.djai\.academy\/th[^;]*school\.djai\.academy\/en/);
  assert.match(bridge, /category === "ai"[\s\S]*href=\{schoolHref\}/);
  assert.doesNotMatch(bridge, /\/siamese_cat\/dev\/(?:course|courses)/);
  assert.match(bridge, /category === "spreadsheet"/);
  assert.doesNotMatch(categoryPage, /<CamPdfAppCallout language=\{language\} \/>/);
  assert.ok(workspace.indexOf("className=\"result-next-tool\"") < workspace.indexOf("<AcquisitionBridge"));
  assert.match(toolPage, /tokenCounter \? <AcquisitionBridge/);
  assert.doesNotMatch(workspace, /ToolPromoModal|shouldShowToolPromo|localStorage/);
  assert.doesNotMatch(toolPage, /<CamPdfAppCallout language=\{language\} \/>/);
});

test("general image results use deterministic related-image and Development routing", () => {
  const app = read("djai-image-resizer/public/app.js");
  for (const page of ["djai-image-resizer/public/index.html", "djai-image-resizer/public/en/index.html"]) {
    const html = read(page);
    assert.match(html, /id="image-success-journey"[^>]*hidden/);
    assert.ok(html.indexOf("data-related-image-tool") < html.indexOf("data-image-development"));
    assert.doesNotMatch(html, /play\.google\.com\/store\/apps\/details\?id=com\.djai\.campdfscan/);
    assert.doesNotMatch(html, /id="tool-promo-modal"/);
  }
  assert.match(app, /imageSuccessJourney\.hidden = false/);
  assert.doesNotMatch(app, /PROMO_NEXT_TYPE_KEY|showToolPromo|copy\.promos|localStorage/);
});

test("media results reveal a related workflow before Development and never advertise Cam or a course", () => {
  const build = read("djai-media-tools/scripts/build.mjs");
  const legacyApp = read("djai-media-tools/src/app.js");
  const videoApp = read("djai-media-tools/src/video-tools.js");
  const configs = JSON.parse(read("djai-media-tools/src/video-tools-config.json"));

  assert.match(build, /data-media-success/);
  assert.match(build, /data-related-media-tool[\s\S]*data-media-development/);
  assert.doesNotMatch(build, /MOBILE DOCUMENT APP|Cam PDF|Join the Academy|practical building courses/);
  assert.match(legacyApp, /mediaSuccess\.hidden = false/);
  assert.match(videoApp, /class="success-journey"/);
  assert.match(videoApp, /relatedSlug/);
  assert.ok(configs.every((config) => typeof config.relatedSlug === "string" && config.relatedSlug !== config.slug));
});

test("no remaining tool family uses a random universal promotion", () => {
  const sources = [
    read("djai-document-tools/app/category-page.tsx"),
    read("djai-document-tools/app/tool-page.tsx"),
    read("djai-document-tools/app/ToolWorkspace.tsx"),
    read("djai-document-tools/app/AcquisitionBridge.tsx"),
    read("djai-image-resizer/public/app.js"),
    read("djai-media-tools/scripts/build.mjs"),
    read("djai-media-tools/src/app.js"),
    read("djai-media-tools/src/video-tools.js")
  ].join("\n");
  assert.doesNotMatch(sources, /Math\.random|promo-next-type|random course|random development/i);
});

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { videoToolSlugs } from "../app/lib/videoToolSlugs.js";
import { getToolDirectory } from "../app/tools/tool-directory.js";

const homepageRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const repositoryRoot = join(homepageRoot, "..");
const videoTools = JSON.parse(readFileSync(
  join(repositoryRoot, "djai-media-tools", "src", "video-tools-config.json"),
  "utf8"
));

test("tool directory exposes every bilingual video utility", () => {
  const expectedSlugs = new Set(videoTools.map((tool) => tool.slug));
  assert.equal(expectedSlugs.size, 23);
  assert.deepEqual(new Set(videoToolSlugs), expectedSlugs);

  for (const locale of ["th", "en"]) {
    const media = getToolDirectory(locale).find((category) => category.id === "media");
    assert.ok(media);
    assert.equal(media.tools.length, 28);
    assert.equal(new Set(media.tools.map((tool) => tool.href)).size, 28);
    for (const slug of expectedSlugs) {
      const suffix = locale === "en" ? "en/" : "";
      assert.ok(
        media.tools.some((tool) => tool.href === `/tools/media/${slug}/${suffix}`),
        `${locale}: missing ${slug}`
      );
    }
  }
});

test("tools hubs describe video and audio discovery in localized SEO metadata", () => {
  const pages = [
    {
      path: join(homepageRoot, "app", "tools", "page.jsx"),
      title: "เครื่องมือออนไลน์ฟรี | วิดีโอ เสียง PDF รูปภาพ และ AI | DJAI",
      description: "แปลง ตัด บีบอัด",
      twitter: "เครื่องมือออนไลน์ฟรีจาก DJAI"
    },
    {
      path: join(homepageRoot, "app", "tools", "en", "page.jsx"),
      title: "Free Online Tools | Video, Audio, PDF, Images & AI | DJAI",
      description: "convert, cut, compress",
      twitter: "Free Online Tools from DJAI"
    }
  ];

  for (const page of pages) {
    const source = readFileSync(page.path, "utf8");
    assert.match(source, new RegExp(page.title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.match(source.toLowerCase(), new RegExp(page.description.toLowerCase()));
    assert.match(source, new RegExp(page.twitter));
    assert.match(source, /summary_large_image/);
    assert.match(source, /social\/djai-academy\.webp/);
  }
});

test("Vietnamese tools hub links crawlers to the Vietnamese tool clusters", () => {
  const source = readFileSync(join(homepageRoot, "app", "tools", "vi", "page.jsx"), "utf8");
  for (const category of ["qrgen", "resizeimg", "PDFTools", "document", "ai", "spreadsheet"]) {
    assert.match(source, new RegExp(`/tools/${category}/vi/`));
  }
  for (const route of [
    "/tools/resizeimg/remove-background-image/vi/",
    "/tools/PDFTools/merge-pdf/vi/",
    "/tools/document/docx-to-pdf/vi/",
    "/tools/ai/token-counter/vi/",
    "/tools/spreadsheet/csv-to-json/vi/"
  ]) {
    assert.match(source, new RegExp(route));
  }
});

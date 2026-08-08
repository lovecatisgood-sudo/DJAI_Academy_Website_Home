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

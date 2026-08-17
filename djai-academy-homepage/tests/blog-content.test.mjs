import assert from "node:assert/strict";
import { mkdtemp, readFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { normalizeBlogHref, normalizeInternalBlogHref } from "../app/lib/blogContent.js";

test("blog content URL normalization permits useful links and rejects executable URLs", () => {
  assert.equal(normalizeBlogHref("/blog/en/next-step/"), "/blog/en/next-step/");
  assert.equal(normalizeBlogHref("https://docs.github.com/en/get-started"), "https://docs.github.com/en/get-started");
  assert.equal(normalizeBlogHref("mailto:hello@example.com"), "mailto:hello@example.com");
  assert.equal(normalizeBlogHref("javascript:alert(1)"), "");
  assert.equal(normalizeBlogHref("//attacker.example/path"), "");
  assert.equal(normalizeBlogHref("/safe path"), "");
  assert.equal(normalizeInternalBlogHref("https://example.com/path"), "");
});

test("blog store persists complete bilingual CTA metadata and alternates", async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), "djai-blog-store-"));
  const dataFile = path.join(directory, "blog-posts.json");
  process.env.DJAI_BLOG_DATA_FILE = dataFile;
  const store = await import(`../app/lib/blogStore.js?test=${Date.now()}`);

  await store.upsertPost({
    translationGroupId: "test-bilingual-journey",
    category: "Guides",
    author: "DJAI Academy",
    translations: {
      en: {
        title: "A test English guide",
        slug: "test-english-guide",
        status: "published",
        excerpt: "English excerpt",
        content: "English content",
        ctaEyebrow: "Next lesson",
        ctaTitle: "Continue with one useful result.",
        ctaLabel: "Continue learning",
        ctaHref: "/blog/en/next-guide/"
      },
      th: {
        title: "คู่มือทดสอบภาษาไทย",
        slug: "test-thai-guide",
        status: "published",
        excerpt: "คำอธิบายภาษาไทย",
        content: "เนื้อหาภาษาไทย",
        ctaEyebrow: "บทถัดไป",
        ctaTitle: "เรียนต่อด้วยผลลัพธ์ที่นำไปใช้ได้",
        ctaLabel: "เรียนต่อ",
        ctaHref: "/blog/next-guide-th/"
      }
    }
  });

  const english = await store.getPostBySlug("test-english-guide", { locale: "en" });
  const thai = await store.getPostBySlug("test-thai-guide", { locale: "th" });
  assert.equal(english.ctaHref, "/blog/en/next-guide/");
  assert.equal(thai.ctaHref, "/blog/next-guide-th/");
  assert.equal(english.alternateSlugs.th, "test-thai-guide");
  assert.equal(thai.alternateSlugs.en, "test-english-guide");

  const persisted = JSON.parse(await readFile(dataFile, "utf8"));
  const saved = persisted.posts.find((post) => post.translationGroupId === "test-bilingual-journey");
  assert.equal(saved.translations.en.ctaLabel, "Continue learning");
  assert.equal(saved.translations.th.ctaLabel, "เรียนต่อ");
});

test("blog store rejects incomplete or external article CTAs", async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), "djai-blog-store-invalid-"));
  process.env.DJAI_BLOG_DATA_FILE = path.join(directory, "blog-posts.json");
  const store = await import(`../app/lib/blogStore.js?test=${Date.now()}-invalid`);
  const base = {
    translationGroupId: "invalid-cta",
    translations: {
      en: {
        title: "Invalid CTA",
        slug: "invalid-cta",
        status: "draft",
        ctaEyebrow: "Next",
        ctaTitle: "Continue"
      }
    }
  };

  await assert.rejects(store.upsertPost(base), /CTA requires eyebrow, title, label, and href/);
  await assert.rejects(
    store.upsertPost({
      ...base,
      translations: {
        en: {
          ...base.translations.en,
          ctaLabel: "Continue",
          ctaHref: "https://example.com/redirect"
        }
      }
    }),
    /CTA href must be a root-relative internal path/
  );
});

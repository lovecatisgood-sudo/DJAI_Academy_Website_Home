import assert from "node:assert/strict";
import test from "node:test";
import blogData from "../data/blog-posts.json" with { type: "json" };
import { getBlogJourney } from "../app/lib/blogJourneys.js";

const mainBlogGroups = blogData.posts.filter((post) => post.category !== "Siamese Cat Dev");

test("every current main-blog article has an explicit intent-matched next step", () => {
  for (const group of mainBlogGroups) {
    for (const [locale, translation] of Object.entries(group.translations)) {
      if (translation.status !== "published") continue;
      const journey = getBlogJourney({
        translationGroupId: group.translationGroupId,
        slug: translation.slug
      }, locale);
      assert.equal(journey.mapped, true, `${locale}:${translation.slug} fell back to generic navigation`);
      assert.match(journey.href, /^\//, `${locale}:${translation.slug} must use an internal canonical path`);
      assert.ok(journey.title.length > 20, `${locale}:${translation.slug} needs a useful next-step promise`);
      assert.ok(journey.label.length > 3, `${locale}:${translation.slug} needs a descriptive link label`);
    }
  }
});

test("seeded Thai utility guides use the same explicit journey map", () => {
  for (const slug of [
    "how-to-create-free-qr-code",
    "how-to-convert-jpg-png-webp-free",
    "compress-image-to-100kb-500kb"
  ]) {
    const journey = getBlogJourney({ slug }, "th");
    assert.equal(journey.mapped, true, `th:${slug} fell back to generic navigation`);
  }
});

test("API-authored articles can carry an intent-matched next step without route hard-coding", () => {
  const journey = getBlogJourney({
    translationGroupId: "new-api-article",
    slug: "new-api-article",
    ctaEyebrow: "Next lesson",
    ctaTitle: "Build one small result before adding more features.",
    ctaHref: "/blog/en/build-one-small-result/",
    ctaLabel: "Build the next result"
  }, "en");

  assert.deepEqual(journey, {
    eyebrow: "Next lesson",
    title: "Build one small result before adding more features.",
    href: "/blog/en/build-one-small-result/",
    label: "Build the next result",
    mapped: true
  });
});

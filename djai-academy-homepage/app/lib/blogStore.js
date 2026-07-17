import fs from "node:fs/promises";
import path from "node:path";

export const BLOG_CATEGORIES = ["News", "Guides", "Tutorial"];
export const BLOG_CATEGORY_LABELS = {
  en: {
    News: "News",
    Guides: "Guides",
    Tutorial: "Tutorial"
  },
  th: {
    News: "ข่าวสาร",
    Guides: "คู่มือ",
    Tutorial: "บทความสอนใช้งาน"
  }
};

const LOCALES = ["en", "th"];
const THAI_CATEGORY_TO_KEY = Object.fromEntries(
  Object.entries(BLOG_CATEGORY_LABELS.th).map(([key, label]) => [label, key])
);

const DATA_FILE = path.join(process.cwd(), "data", "blog-posts.json");

export function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96);
}

async function readBlogFile() {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed.posts) ? parsed.posts : [];
  } catch (error) {
    if (error.code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

async function writeBlogFile(posts) {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(DATA_FILE, `${JSON.stringify({ posts }, null, 2)}\n`);
}

function categoryKey(value) {
  return BLOG_CATEGORIES.includes(value) ? value : THAI_CATEGORY_TO_KEY[value] || "News";
}

function categoryForLocale(category, locale = "en") {
  const key = categoryKey(category);
  return BLOG_CATEGORY_LABELS[locale]?.[key] || key;
}

function parseKeywords(value) {
  if (Array.isArray(value)) {
    return value.map((keyword) => String(keyword).trim()).filter(Boolean);
  }

  return String(value || "")
    .split(",")
    .map((keyword) => keyword.trim())
    .filter(Boolean);
}

function normalizeLegacyPost(post) {
  const now = post.updatedAt || post.publishedAt || new Date().toISOString();
  const slug = slugify(post.slug || post.title);

  return {
    id: post.id || `post-${slug}`,
    translationGroupId: slugify(post.translationGroupId || slug),
    category: categoryKey(post.category),
    author: String(post.author || "DJAI Academy").trim(),
    publishedAt: post.publishedAt || now,
    updatedAt: now,
    legacySeededThaiSlug: slug,
    translations: {
      en: {
        title: String(post.title || "").trim(),
        slug,
        status: post.status === "draft" ? "draft" : "published",
        excerpt: String(post.excerpt || "").trim(),
        seoTitle: String(post.seoTitle || post.title || "").trim(),
        seoDescription: String(post.seoDescription || post.excerpt || "").trim(),
        readingTime: String(post.readingTime || "5 min read").trim(),
        keywords: parseKeywords(post.keywords),
        content: String(post.content || "").trim(),
        publishedAt: post.publishedAt || now,
        updatedAt: now
      }
    }
  };
}

function normalizeStoredGroup(post) {
  if (!post?.translations) {
    return normalizeLegacyPost(post || {});
  }

  return {
    id: post.id || `post-${post.translationGroupId || Date.now()}`,
    translationGroupId: slugify(post.translationGroupId || post.id),
    category: categoryKey(post.category),
    author: String(post.author || "DJAI Academy").trim(),
    publishedAt: post.publishedAt || post.updatedAt || new Date().toISOString(),
    updatedAt: post.updatedAt || post.publishedAt || new Date().toISOString(),
    translations: Object.fromEntries(
      LOCALES.map((locale) => {
        const translation = post.translations?.[locale];
        if (!translation) {
          return null;
        }

        return [
          locale,
          {
            title: String(translation.title || "").trim(),
            slug: slugify(translation.slug || translation.title),
            status: translation.status === "published" ? "published" : "draft",
            excerpt: String(translation.excerpt || "").trim(),
            seoTitle: String(translation.seoTitle || translation.title || "").trim(),
            seoDescription: String(translation.seoDescription || translation.excerpt || "").trim(),
            readingTime: String(
              translation.readingTime || (locale === "th" ? "อ่าน 5 นาที" : "5 min read")
            ).trim(),
            keywords: parseKeywords(translation.keywords),
            content: String(translation.content || "").trim(),
            publishedAt: translation.publishedAt || post.publishedAt || post.updatedAt,
            updatedAt: translation.updatedAt || post.updatedAt || post.publishedAt
          }
        ];
      }).filter(Boolean)
    )
  };
}

async function readPostGroups() {
  const posts = await readBlogFile();
  return posts.map(normalizeStoredGroup);
}

function flattenPost(group, locale = "en") {
  const translation = group.translations?.[locale];

  if (!translation) {
    return null;
  }

  const alternateSlugs = Object.fromEntries(
    LOCALES.map((alternateLocale) => {
      const alternate = group.translations?.[alternateLocale];
      if (!alternate || alternate.status !== "published") {
        return null;
      }
      return [alternateLocale, alternate.slug];
    }).filter(Boolean)
  );

  if (group.legacySeededThaiSlug && locale === "en") {
    alternateSlugs.th = group.legacySeededThaiSlug;
  }

  return {
    id: `${group.id}-${locale}`,
    groupId: group.id,
    translationGroupId: group.translationGroupId,
    locale,
    title: translation.title,
    slug: translation.slug,
    categoryKey: group.category,
    category: categoryForLocale(group.category, locale),
    status: translation.status,
    excerpt: translation.excerpt,
    seoTitle: translation.seoTitle,
    seoDescription: translation.seoDescription,
    author: group.author,
    publishedAt: translation.publishedAt || group.publishedAt,
    updatedAt: translation.updatedAt || group.updatedAt,
    readingTime: translation.readingTime,
    keywords: translation.keywords,
    content: translation.content,
    alternateSlugs,
    source: "admin"
  };
}

export async function getAllPostGroups() {
  return readPostGroups();
}

export async function getAllPosts({ includeDrafts = false, locale = "en" } = {}) {
  const posts = await readPostGroups();
  return posts
    .map((post) => flattenPost(post, locale))
    .filter(Boolean)
    .filter((post) => includeDrafts || post.status === "published")
    .sort((a, b) => new Date(b.publishedAt || b.updatedAt) - new Date(a.publishedAt || a.updatedAt));
}

export async function getPostBySlug(slug, { includeDrafts = false, locale = "en" } = {}) {
  const posts = await getAllPosts({ includeDrafts, locale });
  return posts.find((post) => post.slug === slug);
}

function hasTranslationInput(input) {
  return [
    "title",
    "slug",
    "excerpt",
    "seoTitle",
    "seoDescription",
    "readingTime",
    "keywords",
    "content"
  ].some((field) => String(input?.[field] || "").trim());
}

function normalizeTranslationInput(input, { existing, locale, now }) {
  if (!hasTranslationInput(input)) {
    return null;
  }

  const title = String(input.title || "").trim();
  const slug = slugify(input.slug || title);
  const status = input.status === "published" ? "published" : "draft";
  const excerpt = String(input.excerpt || "").trim();
  const content = String(input.content || "").trim();

  if (!title) {
    throw new Error(`${locale.toUpperCase()} title is required.`);
  }

  if (!slug) {
    throw new Error(`${locale.toUpperCase()} slug is required.`);
  }

  if (status === "published" && !excerpt) {
    throw new Error(`${locale.toUpperCase()} excerpt is required before publishing.`);
  }

  if (status === "published" && !content) {
    throw new Error(`${locale.toUpperCase()} content is required before publishing.`);
  }

  return {
    title,
    slug,
    status,
    excerpt,
    seoTitle: String(input.seoTitle || title).trim(),
    seoDescription: String(input.seoDescription || excerpt).trim(),
    readingTime: String(
      input.readingTime || existing?.readingTime || (locale === "th" ? "อ่าน 5 นาที" : "5 min read")
    ).trim(),
    keywords: parseKeywords(input.keywords),
    content,
    publishedAt: status === "published" ? input.publishedAt || existing?.publishedAt || now : existing?.publishedAt || "",
    updatedAt: now
  };
}

export async function upsertPost(input = {}) {
  const now = new Date().toISOString();
  const groups = await readPostGroups();
  const translationsInput = input.translations || {
    en: input
  };
  const firstTranslation = translationsInput.en || translationsInput.th || {};
  const translationGroupId = slugify(
    input.translationGroupId ||
      input.groupSlug ||
      firstTranslation.slug ||
      firstTranslation.title ||
      input.slug ||
      input.title
  );

  if (!translationGroupId) {
    throw new Error("Translation group ID is required.");
  }

  const existingIndex = groups.findIndex((post) => post.translationGroupId === translationGroupId);
  const existing = existingIndex >= 0 ? groups[existingIndex] : null;
  const translations = {
    ...(existing?.translations || {})
  };

  for (const locale of LOCALES) {
    const translation = normalizeTranslationInput(translationsInput[locale], {
      existing: existing?.translations?.[locale],
      locale,
      now
    });

    if (translation) {
      translations[locale] = translation;
    }
  }

  if (!Object.keys(translations).length) {
    throw new Error("Add content for at least one language.");
  }

  const post = {
    id: existing?.id || `post-${Date.now()}`,
    translationGroupId,
    category: categoryKey(input.category || existing?.category),
    author: String(input.author || "DJAI Academy").trim(),
    publishedAt: existing?.publishedAt || now,
    updatedAt: now,
    translations
  };

  if (existingIndex >= 0) {
    groups[existingIndex] = post;
  } else {
    groups.push(post);
  }

  await writeBlogFile(groups);
  return post;
}

"use client";

import { useMemo, useState } from "react";

const categories = ["News", "Guides", "Tutorial"];
const locales = [
  {
    key: "en",
    label: "English",
    shortLabel: "EN",
    pathPrefix: "/blog/en/",
    readingTime: "5 min read",
    titlePlaceholder: "How to...",
    excerptPlaceholder: "Short summary shown on the English blog listing.",
    contentPlaceholder:
      "Use Markdown-style headings and links:\n\n## Heading\n\nParagraph with [link text](https://example.com/).\n\n- Bullet point"
  },
  {
    key: "th",
    label: "Thai",
    shortLabel: "TH",
    pathPrefix: "/blog/",
    readingTime: "อ่าน 5 นาที",
    titlePlaceholder: "วิธี...",
    excerptPlaceholder: "สรุปสั้นๆ ที่จะแสดงในหน้ารวมบล็อกภาษาไทย",
    contentPlaceholder:
      "ใช้รูปแบบ Markdown-style:\n\n## หัวข้อ\n\nย่อหน้าพร้อม [ข้อความลิงก์](https://example.com/)\n\n- รายการ"
  }
];

function emptyTranslation(locale) {
  return {
    title: "",
    slug: "",
    status: locale === "en" ? "published" : "draft",
    excerpt: "",
    seoTitle: "",
    seoDescription: "",
    readingTime: locales.find((item) => item.key === locale)?.readingTime || "5 min read",
    keywords: "",
    content: ""
  };
}

const emptyPost = {
  translationGroupId: "",
  category: "News",
  author: "DJAI Academy",
  translations: {
    en: emptyTranslation("en"),
    th: emptyTranslation("th")
  }
};

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function hasTranslationContent(translation) {
  return ["title", "slug", "excerpt", "seoTitle", "seoDescription", "keywords", "content"].some((field) =>
    String(translation[field] || "").trim()
  );
}

export default function AdminBlogForm() {
  const [password, setPassword] = useState("");
  const [post, setPost] = useState(emptyPost);
  const [activeLocale, setActiveLocale] = useState("en");
  const [message, setMessage] = useState("");
  const [savedLinks, setSavedLinks] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  const generatedSlugs = useMemo(
    () =>
      Object.fromEntries(
        locales.map(({ key }) => {
          const translation = post.translations[key];
          return [key, slugify(translation.slug || translation.title)];
        })
      ),
    [post.translations]
  );

  const generatedGroupId = useMemo(() => {
    return slugify(
      post.translationGroupId ||
        generatedSlugs.en ||
        generatedSlugs.th ||
        post.translations.en.title ||
        post.translations.th.title
    );
  }, [generatedSlugs.en, generatedSlugs.th, post.translationGroupId, post.translations.en.title, post.translations.th.title]);

  const activeConfig = locales.find((locale) => locale.key === activeLocale);
  const activeTranslation = post.translations[activeLocale];

  function updatePost(field, value) {
    setPost((current) => ({ ...current, [field]: value }));
  }

  function updateTranslation(locale, field, value) {
    setPost((current) => ({
      ...current,
      translations: {
        ...current.translations,
        [locale]: {
          ...current.translations[locale],
          [field]: value
        }
      }
    }));
  }

  async function submitPost(event) {
    event.preventDefault();
    setIsSaving(true);
    setMessage("");
    setSavedLinks([]);

    const translations = Object.fromEntries(
      locales
        .map(({ key }) => {
          const translation = post.translations[key];
          if (!hasTranslationContent(translation)) {
            return null;
          }

          return [
            key,
            {
              ...translation,
              slug: generatedSlugs[key]
            }
          ];
        })
        .filter(Boolean)
    );

    if (!Object.keys(translations).length) {
      setIsSaving(false);
      setMessage("Add content in at least one language tab.");
      return;
    }

    const response = await fetch("/api/admin/blog", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        password,
        post: {
          translationGroupId: generatedGroupId,
          category: post.category,
          author: post.author,
          translations
        }
      })
    });

    const payload = await response.json().catch(() => ({}));
    setIsSaving(false);

    if (!response.ok) {
      setMessage(payload.error || "Unable to save post.");
      return;
    }

    const nextLinks = Object.entries(payload.post?.translations || {}).map(([locale, translation]) => {
      const config = locales.find((item) => item.key === locale);
      return {
        locale,
        label: config?.label || locale,
        status: translation.status,
        href: `${config?.pathPrefix || "/blog/"}${translation.slug}/`
      };
    });

    setMessage("Post saved. Publish status is controlled separately for each language.");
    setSavedLinks(nextLinks);
    setPost(emptyPost);
    setActiveLocale("en");
  }

  return (
    <section className="admin-panel">
      <div className="admin-heading">
        <p className="eyebrow">Admin backend</p>
        <h1>Publish multilingual blog posts.</h1>
        <p>
          Write English and Thai separately. Each language has its own draft/published status, while
          both languages stay connected by one translation group.
        </p>
      </div>

      <form className="admin-form" onSubmit={submitPost}>
        <label>
          Admin password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Configured admin password"
            required
          />
        </label>

        <div className="admin-form-grid">
          <label>
            Translation group ID
            <input
              value={post.translationGroupId}
              onChange={(event) => updatePost("translationGroupId", event.target.value)}
              placeholder={generatedGroupId || "shared-slug-for-this-topic"}
            />
          </label>
          <label>
            Author
            <input
              value={post.author}
              onChange={(event) => updatePost("author", event.target.value)}
              placeholder="DJAI Academy"
            />
          </label>
        </div>

        <label>
          Category
          <select value={post.category} onChange={(event) => updatePost("category", event.target.value)}>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <div className="language-tabs" role="tablist" aria-label="Blog post languages">
          {locales.map((locale) => (
            <button
              className={activeLocale === locale.key ? "active" : ""}
              key={locale.key}
              type="button"
              role="tab"
              aria-selected={activeLocale === locale.key}
              onClick={() => setActiveLocale(locale.key)}
            >
              <span>{locale.shortLabel}</span>
              {locale.label}
              <small>{post.translations[locale.key].status}</small>
            </button>
          ))}
        </div>

        <div className="language-panel" role="tabpanel">
          <div className="admin-form-grid">
            <label>
              {activeConfig.label} title
              <input
                value={activeTranslation.title}
                onChange={(event) => updateTranslation(activeLocale, "title", event.target.value)}
                placeholder={activeConfig.titlePlaceholder}
              />
            </label>
            <label>
              {activeConfig.label} slug
              <input
                value={activeTranslation.slug}
                onChange={(event) => updateTranslation(activeLocale, "slug", event.target.value)}
                placeholder={generatedSlugs[activeLocale] || "auto-generated-from-title"}
              />
            </label>
          </div>

          <div className="admin-form-grid">
            <label>
              {activeConfig.label} status
              <select
                value={activeTranslation.status}
                onChange={(event) => updateTranslation(activeLocale, "status", event.target.value)}
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </label>
            <label>
              {activeConfig.label} reading time
              <input
                value={activeTranslation.readingTime}
                onChange={(event) => updateTranslation(activeLocale, "readingTime", event.target.value)}
                placeholder={activeConfig.readingTime}
              />
            </label>
          </div>

          <label>
            {activeConfig.label} excerpt
            <textarea
              rows={3}
              value={activeTranslation.excerpt}
              onChange={(event) => updateTranslation(activeLocale, "excerpt", event.target.value)}
              placeholder={activeConfig.excerptPlaceholder}
            />
          </label>

          <div className="admin-form-grid">
            <label>
              {activeConfig.label} SEO title
              <input
                value={activeTranslation.seoTitle}
                onChange={(event) => updateTranslation(activeLocale, "seoTitle", event.target.value)}
                placeholder="Optional; title is used if blank"
              />
            </label>
            <label>
              {activeConfig.label} keywords
              <input
                value={activeTranslation.keywords}
                onChange={(event) => updateTranslation(activeLocale, "keywords", event.target.value)}
                placeholder="Comma-separated keywords"
              />
            </label>
          </div>

          <label>
            {activeConfig.label} SEO description
            <textarea
              rows={2}
              value={activeTranslation.seoDescription}
              onChange={(event) => updateTranslation(activeLocale, "seoDescription", event.target.value)}
              placeholder="Search result description."
            />
          </label>

          <label>
            {activeConfig.label} content
            <textarea
              rows={18}
              value={activeTranslation.content}
              onChange={(event) => updateTranslation(activeLocale, "content", event.target.value)}
              placeholder={activeConfig.contentPlaceholder}
            />
          </label>
        </div>

        <button className="button" type="submit" disabled={isSaving}>
          {isSaving ? "Saving..." : "Save multilingual post"}
        </button>
        {message ? <p className="admin-message">{message}</p> : null}
        {savedLinks.length ? (
          <div className="admin-saved-links">
            {savedLinks.map((link) =>
              link.status === "published" ? (
                <a className="admin-post-link" href={link.href} key={link.locale}>
                  View {link.label} post
                </a>
              ) : (
                <span className="admin-draft-note" key={link.locale}>
                  {link.label} saved as draft
                </span>
              )
            )}
          </div>
        ) : null}
      </form>
    </section>
  );
}

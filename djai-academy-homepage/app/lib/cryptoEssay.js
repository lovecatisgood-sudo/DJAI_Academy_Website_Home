import translations from "../../data/why-i-left-crypto.json" with { type: "json" };

export const cryptoEssaySlug = "why-i-left-crypto";
export const cryptoEssayAuthor = "Siamese Cat Dev";
export const cryptoEssayDate = "2026-11-15"; // Refresh to the actual release date before publication.
export const cryptoEssayIndexableLocales = ["en", "th", "vi"];

export const cryptoEssayPaths = Object.fromEntries(Object.keys(translations).map((locale) => [
  locale,
  `/siamese_cat/dev/blog/${locale === "th" ? "" : `${locale.toLowerCase()}/`}${cryptoEssaySlug}/`
]));

export function getCryptoEssay(locale) {
  return translations[locale];
}

export function addCryptoEssay(posts, locale) {
  const { title, excerpt, readingTime } = getCryptoEssay(locale);
  const post = {
    id: `${cryptoEssaySlug}-${locale}`,
    slug: cryptoEssaySlug,
    title,
    excerpt,
    readingTime,
    category: cryptoEssayAuthor,
    categoryKey: cryptoEssayAuthor,
    author: cryptoEssayAuthor,
    publishedAt: cryptoEssayDate,
    updatedAt: cryptoEssayDate
  };
  const index = posts.findIndex(({ publishedAt }) => new Date(publishedAt) <= new Date(cryptoEssayDate));
  return index < 0 ? [...posts, post] : [...posts.slice(0, index), post, ...posts.slice(index)];
}

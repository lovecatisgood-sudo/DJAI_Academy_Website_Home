export const SITE_URL = "https://www.djai.academy";
export const SUPPORTED_LOCALES = ["th", "en", "vi"];
export const LOCALE_LABELS = { th: "ไทย", en: "English", vi: "Tiếng Việt" };

const paths = {
  home: {
    en: "/en/",
    th: "/",
    vi: "/vi/"
  },
  portfolio: {
    en: "/portfolio/en/",
    th: "/portfolio/",
    vi: "/portfolio/vi/"
  },
  tools: {
    en: "/tools/en/",
    th: "/tools/",
    vi: "/tools/vi/"
  },
  service: {
    en: "/service/en/",
    th: "/service/",
    vi: "/service/vi/"
  },
  development: {
    en: "/development/en/",
    th: "/development/",
    vi: "/development/vi/"
  },
  blog: {
    en: "/blog/en/",
    th: "/blog/",
    vi: "/blog/vi/"
  },
  course: {
    en: "/course/en/",
    th: "/course/",
    vi: "/course/vi/"
  },
  community: {
    en: "/academy/en/",
    th: "/academy/",
    vi: "/academy/vi/"
  },
  promo: {
    en: "/web_promo/",
    th: "/web_promo/"
  },
  siameseCatDev: {
    en: "/siamese_cat/dev/en/",
    th: "/siamese_cat/dev/"
  },
  siameseCat: {
    en: "/siamese_cat/en/",
    th: "/siamese_cat/"
  }
};

export function pathFor(route, locale = "en") {
  return paths[route]?.[locale] || paths[route]?.en || "/";
}

export function urlFor(route, locale = "en") {
  const path = pathFor(route, locale);
  return path.startsWith("http") ? path : `${SITE_URL}${path}`;
}

export function blogPostPath(slug, locale = "en") {
  if (locale === "th") return `/blog/${slug}/`;
  return `/blog/${locale}/${slug}/`;
}

export function blogPostUrl(slug, locale = "en") {
  return `${SITE_URL}${blogPostPath(slug, locale)}`;
}

export function alternateFor(route, locale = "en") {
  return {
    canonical: pathFor(route, locale),
    languages: {
      en: pathFor(route, "en"),
      th: pathFor(route, "th"),
      vi: pathFor(route, "vi"),
      "x-default": pathFor(route, "th")
    }
  };
}

export function oppositeLocale(locale = "en") {
  return locale === "th" ? "en" : "th";
}

export function localeLinksFor(route, locale, availableLocales = SUPPORTED_LOCALES) {
  return availableLocales
    .filter((candidate) => candidate !== locale && paths[route]?.[candidate])
    .map((candidate) => ({
      locale: candidate,
      label: LOCALE_LABELS[candidate],
      href: pathFor(route, candidate)
    }));
}

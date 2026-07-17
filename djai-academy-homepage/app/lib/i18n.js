export const SITE_URL = "https://www.djai.academy";

const paths = {
  home: {
    en: "/en/",
    th: "/"
  },
  portfolio: {
    en: "/portfolio/en/",
    th: "/portfolio/"
  },
  tools: {
    en: "/tools/en/",
    th: "/tools/"
  },
  service: {
    en: "/service/en/",
    th: "/service/"
  },
  development: {
    en: "/development/en/",
    th: "/development/"
  },
  blog: {
    en: "/blog/en/",
    th: "/blog/"
  },
  course: {
    en: "/course/en/",
    th: "/course/"
  },
  community: {
    en: "/course/en/#community",
    th: "/course/#community"
  },
  promo: {
    en: "/course/en/#pricing",
    th: "/course/#pricing"
  },
  siameseCatDev: {
    en: "/siamese_cat/dev/en/",
    th: "/siamese_cat/dev/"
  }
};

export function pathFor(route, locale = "en") {
  return paths[route]?.[locale] || paths[route]?.en || "/";
}

export function urlFor(route, locale = "en") {
  return `${SITE_URL}${pathFor(route, locale)}`;
}

export function blogPostPath(slug, locale = "en") {
  return locale === "th" ? `/blog/${slug}/` : `/blog/en/${slug}/`;
}

export function blogPostUrl(slug, locale = "en") {
  return `${SITE_URL}${blogPostPath(slug, locale)}`;
}

export function alternateFor(route, locale = "en") {
  return {
    canonical: pathFor(route, locale),
    languages: {
      en: pathFor(route, "en"),
      th: pathFor(route, "th")
    }
  };
}

export function oppositeLocale(locale = "en") {
  return locale === "th" ? "en" : "th";
}

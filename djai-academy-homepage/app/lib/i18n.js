export const SITE_URL = "https://djai.academy";

const paths = {
  home: {
    en: "/EN/",
    th: "/th/"
  },
  portfolio: {
    en: "/portfolio/EN/",
    th: "/portfolio/th/"
  },
  tools: {
    en: "/tools/EN/",
    th: "/tools/th/"
  },
  service: {
    en: "/service/EN/",
    th: "/service/th/"
  },
  development: {
    en: "/development/EN/",
    th: "/development/th/"
  },
  blog: {
    en: "/blog/EN/",
    th: "/blog/th/"
  },
  course: {
    en: "/course/EN/",
    th: "/course/"
  },
  community: {
    en: "/community/",
    th: "/community/"
  },
  promo: {
    en: "/promo/",
    th: "/promo/"
  },
  siameseCatDev: {
    en: "/siamese_cat/dev/EN/",
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
  return locale === "th" ? `/blog/th/${slug}/` : `/blog/EN/${slug}/`;
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

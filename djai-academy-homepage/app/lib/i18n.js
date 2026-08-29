export const SITE_URL = "https://www.djai.academy";
export const SUPPORTED_LOCALES = ["th", "en", "vi", "zh-CN", "zh-TW"];
export const LOCALE_LABELS = {
  th: "ไทย",
  en: "English",
  vi: "Tiếng Việt",
  "zh-CN": "简体中文",
  "zh-TW": "繁體中文"
};

const paths = {
  home: {
    en: "/en/",
    th: "/",
    vi: "/vi/",
    "zh-CN": "/zh-cn/",
    "zh-TW": "/zh-tw/"
  },
  portfolio: {
    en: "/portfolio/en/",
    th: "/portfolio/",
    vi: "/portfolio/vi/",
    "zh-CN": "/portfolio/zh-cn/",
    "zh-TW": "/portfolio/zh-tw/"
  },
  tools: {
    en: "/tools/en/",
    th: "/tools/",
    vi: "/tools/vi/",
    "zh-CN": "/tools/zh-cn/",
    "zh-TW": "/tools/zh-tw/"
  },
  service: {
    en: "/service/en/",
    th: "/service/",
    vi: "/service/vi/",
    "zh-CN": "/service/zh-cn/",
    "zh-TW": "/service/zh-tw/"
  },
  development: {
    en: "/development/en/",
    th: "/development/",
    vi: "/development/vi/",
    "zh-CN": "/development/zh-cn/",
    "zh-TW": "/development/zh-tw/"
  },
  blog: {
    en: "/blog/en/",
    th: "/blog/",
    vi: "/blog/vi/",
    "zh-CN": "/blog/zh-cn/",
    "zh-TW": "/blog/zh-tw/"
  },
  course: {
    en: "/course/en/",
    th: "/course/",
    vi: "/course/vi/",
    "zh-CN": "/course/zh-cn/",
    "zh-TW": "/course/zh-tw/"
  },
  community: {
    en: "/academy/en/",
    th: "/academy/",
    vi: "/academy/vi/",
    "zh-CN": "/academy/zh-cn/",
    "zh-TW": "/academy/zh-tw/"
  },
  promo: {
    en: "/web_promo/",
    th: "/web_promo/",
    vi: "/web_promo/vi/",
    "zh-CN": "/web_promo/zh-cn/",
    "zh-TW": "/web_promo/zh-tw/"
  },
  siameseCatDev: {
    en: "/siamese_cat/dev/en/",
    th: "/siamese_cat/dev/",
    "zh-CN": "/siamese_cat/dev/zh-cn/",
    "zh-TW": "/siamese_cat/dev/zh-tw/"
  },
  siameseCat: {
    en: "/siamese_cat/en/",
    th: "/siamese_cat/"
  },
  contact: {
    en: "/contact-us/en/",
    th: "/contact-us/",
    vi: "/contact-us/vi/",
    "zh-CN": "/contact-us/zh-cn/",
    "zh-TW": "/contact-us/zh-tw/"
  },
  privacy: {
    en: "/privacy/en/",
    th: "/privacy/",
    vi: "/privacy/vi/",
    "zh-CN": "/privacy/zh-cn/",
    "zh-TW": "/privacy/zh-tw/"
  },
  seoTool: {
    en: "/tools/seo-screaming-toad/en/",
    th: "/tools/seo-screaming-toad/",
    "zh-CN": "/tools/seo-screaming-toad/zh-cn/",
    "zh-TW": "/tools/seo-screaming-toad/zh-tw/"
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
  const segment = locale === "zh-CN" ? "zh-cn" : locale === "zh-TW" ? "zh-tw" : locale;
  return `/blog/${segment}/${slug}/`;
}

export function blogPostUrl(slug, locale = "en") {
  return `${SITE_URL}${blogPostPath(slug, locale)}`;
}

export function languageForPath(pathname = "/") {
  if (/(?:^|\/)zh-cn(?:\/|$)/i.test(pathname)) return "zh-CN";
  if (/(?:^|\/)zh-tw(?:\/|$)/i.test(pathname)) return "zh-TW";
  if (/(?:^|\/)vi(?:\/|$)/i.test(pathname)) return "vi";
  if (/(?:^|\/)en(?:\/|$)/i.test(pathname)) return "en";
  if (/^\/Cam_PDF_Scan_Signer_QR-Gen\/privacy\/th(?:\/|$)/i.test(pathname)) {
    return "th";
  }
  if (
    pathname === "/Cam_PDF_Scan_Signer_QR-Gen" ||
    pathname.startsWith("/Cam_PDF_Scan_Signer_QR-Gen/")
  ) {
    return "en";
  }
  return "th";
}

export function alternateFor(route, locale = "en") {
  if (locale === "zh-CN" || locale === "zh-TW") {
    return { canonical: pathFor(route, locale) };
  }

  return {
    canonical: pathFor(route, locale),
    languages: {
      en: pathFor(route, "en"),
      th: pathFor(route, "th"),
      vi: pathFor(route, "vi"),
      "zh-CN": pathFor(route, "zh-CN"),
      "zh-TW": pathFor(route, "zh-TW"),
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

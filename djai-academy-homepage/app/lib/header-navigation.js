import { localeLinksFor, LOCALE_LABELS, oppositeLocale } from "./i18n.js";

const LOCALE_CODES = {
  th: "TH",
  en: "EN",
  vi: "VI",
  "zh-CN": "简",
  "zh-TW": "繁"
};

const ACTIVE_ITEMS = {
  development: "build",
  service: "build",
  promo: "build",
  portfolio: "build",
  tools: "tools",
  camPdf: "camPdf",
  blog: "resources"
};

function localeOption(locale, href) {
  return {
    locale,
    code: LOCALE_CODES[locale] || locale.toUpperCase(),
    label: LOCALE_LABELS[locale] || locale.toUpperCase(),
    href
  };
}

export function headerStateFor({
  locale = "en",
  currentRoute = "home",
  languageHref,
  languageHrefs
} = {}) {
  const currentLocale = LOCALE_LABELS[locale] ? locale : "en";
  let languageOptions;

  if (languageHrefs) {
    languageOptions = Object.entries(languageHrefs)
      .filter(([candidate, href]) => candidate !== currentLocale && href)
      .map(([candidate, href]) => localeOption(candidate, href));
  } else if (languageHref) {
    const alternateLocale = oppositeLocale(currentLocale);
    languageOptions = [localeOption(alternateLocale, languageHref)];
  } else {
    languageOptions = localeLinksFor(currentRoute, currentLocale).map(({ locale: candidate, href }) =>
      localeOption(candidate, href)
    );
  }

  return {
    activeItem: ACTIVE_ITEMS[currentRoute] || null,
    currentLanguage: {
      code: LOCALE_CODES[currentLocale],
      label: LOCALE_LABELS[currentLocale]
    },
    languageOptions
  };
}

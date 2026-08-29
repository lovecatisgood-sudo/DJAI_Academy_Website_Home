export const CHINESE_LOCALES = Object.freeze([
  Object.freeze({
    locale: "zh-CN",
    segment: "zh-cn",
    label: "简体中文",
    market: "中国大陆"
  }),
  Object.freeze({
    locale: "zh-TW",
    segment: "zh-tw",
    label: "繁體中文",
    market: "台灣"
  })
]);

export const CHINESE_LOCALE_BY_ID = new Map(
  CHINESE_LOCALES.map((locale) => [locale.locale, locale])
);

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const manifest = JSON.parse(readFileSync(join(root, "djai-academy-homepage", "app", "lib", "public-route-manifest.json"), "utf8"));
const failures = [];

function outputPath(family, slug, locale) {
  return join(root, family.outputProject, family.outputRoot, ...(slug ? [slug] : []), ...(locale === manifest.defaultLocale ? [] : [locale]), "index.html");
}

for (const [familyName, family] of Object.entries(manifest.toolFamilies)) {
  for (const locale of manifest.locales) {
    for (const slug of [null, ...family.slugs]) {
      const path = outputPath(family, slug, locale);
      if (!existsSync(path)) {
        failures.push(`${familyName}/${slug || "hub"}/${locale}: missing ${path}`);
        continue;
      }
      const html = readFileSync(path, "utf8");
      const expectedSuffix = `${family.base}${slug ? `${slug}/` : ""}${locale === manifest.defaultLocale ? "" : `${locale}/`}`;
      const canonical = `https://www.djai.academy${expectedSuffix}`;
      if (!html.includes(`<html lang="${locale}"`)) failures.push(`${expectedSuffix}: html lang is not ${locale}`);
      if (!html.includes(`rel="canonical" href="${canonical}"`)) failures.push(`${expectedSuffix}: canonical mismatch`);
      for (const alternate of [...manifest.locales, "x-default"]) {
        const count = (html.match(new RegExp(`<link rel="alternate" (?:hrefLang|hreflang)="${alternate}"`, "gi")) || []).length;
        if (count !== 1) failures.push(`${expectedSuffix}: expected one ${alternate} alternate, found ${count}`);
      }
      if (/\/(?:vi\/en|en\/vi)\//.test(html)) failures.push(`${expectedSuffix}: invalid nested locale path`);
    }
  }
}

for (const exemption of manifest.explicitExemptions) {
  if (!exemption.owner || !exemption.reason) failures.push(`${exemption.path}: exemption requires owner and reason`);
}

if (failures.length) {
  console.error(`Locale coverage failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

const familyCount = Object.keys(manifest.toolFamilies).length;
const pageCount = Object.values(manifest.toolFamilies).reduce((sum, family) => sum + (family.slugs.length + 1) * manifest.locales.length, 0);
console.log(`Locale coverage passed for ${pageCount} pages across ${familyCount} tool families.`);

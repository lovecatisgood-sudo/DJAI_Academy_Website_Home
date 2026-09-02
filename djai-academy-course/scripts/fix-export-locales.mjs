import { readFileSync, writeFileSync } from "node:fs";

const routes = [
  ["out/index.html", "th"],
  ["out/detail/index.html", "th"],
  ["out/en/index.html", "en"],
  ["out/detail/en/index.html", "en"],
  ["out/vi/index.html", "vi"],
  ["out/detail/vi/index.html", "vi"],
  ["out/zh-cn/index.html", "zh-CN"],
  ["out/detail/zh-cn/index.html", "zh-CN"],
  ["out/zh-tw/index.html", "zh-TW"],
  ["out/detail/zh-tw/index.html", "zh-TW"]
];

for (const [relativePath, locale] of routes) {
  const url = new URL(`../${relativePath}`, import.meta.url);
  const html = readFileSync(url, "utf8");
  const updated = html.replace(/<html lang="[^"]+">/, `<html lang="${locale}">`);
  if (!updated.includes(`<html lang="${locale}">`)) {
    throw new Error(`Could not set ${locale} document language in ${relativePath}`);
  }
  writeFileSync(url, updated);
}

console.log("Course export document languages aligned.");

import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { setTimeout as delay } from "node:timers/promises";

export const PUBLIC_ORIGIN = "https://www.djai.academy";
export const PUBLISHER = "ca-pub-3624708289866566";
export const SELLER_RECORD = "google.com, pub-3624708289866566, DIRECT, f08c47fec0942fa0";
const userAgent = "DJAI-AdSense-Readiness-Audit/1.0 (+https://www.djai.academy/)";
const decode = (text) => text.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const plainText = (html) => decode(html.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, " ").replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
function attr(tag, name) {
  return decode(tag.match(new RegExp(`\\b${name}\\s*=\\s*(["'])([\\s\\S]*?)\\1`, "i"))?.[2] || "");
}

export function sitemapUrls(xml) {
  if (!/<urlset\b/i.test(xml)) throw new Error("Expected a urlset sitemap; nested sitemap indexes require explicit review.");
  const urls = [...xml.matchAll(/<loc>\s*([^<]+)\s*<\/loc>/gi)].map((m) => decode(m[1].trim()));
  if (!urls.length || urls.length > 1000) throw new Error("Expected 1–1000 public sitemap URLs.");
  for (const value of urls) {
    const url = new URL(value);
    if (url.origin !== PUBLIC_ORIGIN || url.username || url.password || url.search || url.hash) {
      throw new Error(`Out-of-scope or noncanonical sitemap URL: ${url.pathname}`);
    }
  }
  return urls;
}

export function inspectPage(html, canonical, status, contentType = "text/html") {
  const issues = [];
  const tags = (name) => [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, "gi"))].map((m) => m[0]);
  const titles = [...html.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title>/gi)].map((m) => plainText(m[1]));
  const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => plainText(m[1]));
  const descriptions = tags("meta").filter((tag) => attr(tag, "name").toLowerCase() === "description").map((tag) => attr(tag, "content"));
  const canonicals = tags("link").filter((tag) => attr(tag, "rel").toLowerCase() === "canonical").map((tag) => attr(tag, "href"));
  const publishers = tags("meta").filter((tag) => attr(tag, "name").toLowerCase() === "google-adsense-account").map((tag) => attr(tag, "content"));
  const alternates = tags("link").filter((tag) => attr(tag, "rel").toLowerCase() === "alternate" && attr(tag, "hreflang")).map((tag) => ({ language: attr(tag, "hreflang").toLowerCase(), url: attr(tag, "href") }));
  const language = attr(tags("html")[0] || "", "lang").toLowerCase();
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] || html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1] || "";
  const text = plainText(main);
  if (status !== 200) issues.push(`HTTP ${status}`);
  if (!contentType.includes("text/html")) issues.push("Non-HTML sitemap response");
  if (titles.length !== 1 || !titles[0]) issues.push("Expected one nonempty title");
  if (descriptions.length !== 1 || !descriptions[0]) issues.push("Expected one nonempty description");
  if (h1s.length !== 1 || !h1s[0]) issues.push("Expected one nonempty H1");
  if (canonicals.length !== 1 || canonicals[0] !== canonical) issues.push("Canonical does not match sitemap URL");
  if (!language) issues.push("Missing document language");
  if (!text) issues.push("No server-visible body content");
  if ((canonical === PUBLIC_ORIGIN + "/" && publishers.length !== 1) || publishers.some((publisher) => publisher !== PUBLISHER) || publishers.length > 1) issues.push("Missing or mismatched publisher ownership tag");
  if (tags("meta").some((tag) => /^(robots|googlebot)$/i.test(attr(tag, "name")) && /\bnoindex\b/i.test(attr(tag, "content")))) issues.push("Sitemap page is noindex");
  const loaders = tags("script").filter((tag) => /(?:pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js)/i.test(attr(tag, "src"))).length;
  const units = tags("ins").filter((tag) => attr(tag, "class").split(/\s+/).includes("adsbygoogle")).length;
  const anchors = [...new Set(tags("a").map((tag) => attr(tag, "href")).filter(Boolean).flatMap((href) => {
    try {
      const url = new URL(href, canonical);
      if (url.origin !== PUBLIC_ORIGIN || url.search) return [];
      url.hash = "";
      return [url.href];
    } catch { return []; }
  }))];
  for (const match of html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try { JSON.parse(match[1]); } catch { issues.push("Invalid JSON-LD"); }
  }
  return { url: canonical, status, title: titles[0], description: descriptions[0], h1: h1s[0], language, canonical: canonicals[0], publishers, alternates, loaders, units, mainTextCharacters: text.length, mainTextHash: createHash("sha256").update(text).digest("hex"), anchors, issues };
}

export async function auditSite({ origin = PUBLIC_ORIGIN, fetcher = fetch, pauseMs = 150, onProgress = () => {} } = {}) {
  const target = new URL(origin);
  if (target.origin !== PUBLIC_ORIGIN || target.pathname !== "/" || target.search || target.hash || target.username || target.password) throw new Error("This passive audit is restricted to https://www.djai.academy/.");
  async function get(path) {
    const response = await fetcher(new URL(path, target), { redirect: "manual", headers: { "User-Agent": userAgent }, signal: AbortSignal.timeout(20000) });
    if (response.status === 429 || response.status === 503) throw new Error(`Audit stopped on HTTP ${response.status}; retry later, without increasing request rate.`);
    return { status: response.status, html: await response.text(), contentType: response.headers.get("content-type") || "", location: response.headers.get("location") };
  }
  const sitemap = await get("/sitemap.xml");
  if (sitemap.status !== 200) throw new Error(`Sitemap returned HTTP ${sitemap.status}`);
  const urls = sitemapUrls(sitemap.html);
  const robots = await get("/robots.txt");
  const ads = await get("/ads.txt");
  const pages = [];
  for (const url of [...new Set(urls)]) {
    const result = await get(new URL(url).pathname);
    pages.push(inspectPage(result.html, url, result.status, result.contentType));
    if (pages.length % 25 === 0) onProgress(`${pages.length}/${new Set(urls).size} pages checked`);
    if (pauseMs) await delay(pauseMs);
  }
  const byUrl = new Map(pages.map((page) => [page.url, page]));
  const reachable = new Set();
  const queue = [PUBLIC_ORIGIN + "/"];
  while (queue.length) {
    const url = queue.shift();
    if (reachable.has(url) || !byUrl.has(url)) continue;
    reachable.add(url);
    queue.push(...byUrl.get(url).anchors.filter((href) => !reachable.has(href)));
  }
  for (const page of pages) {
    if (!reachable.has(page.url)) page.issues.push("Not reachable from homepage via canonical sitemap links");
    const langs = new Set();
    for (const alternate of page.alternates) {
      if (langs.has(alternate.language)) page.issues.push(`Duplicate hreflang ${alternate.language}`);
      langs.add(alternate.language);
      const counterpart = byUrl.get(alternate.url);
      if (!counterpart) page.issues.push(`Hreflang target absent from sitemap: ${alternate.language}`);
      else if (alternate.language !== "x-default" && !counterpart.alternates.some((item) => item.language === page.language && item.url === page.url)) page.issues.push(`Nonreciprocal hreflang: ${alternate.language}`);
    }
    if (page.alternates.length && !page.alternates.some((alternate) => alternate.language === page.language && alternate.url === page.url)) page.issues.push("Missing self hreflang");
  }
  const issues = pages.flatMap((page) => page.issues.map((issue) => ({ url: page.url, issue })));
  if (new Set(urls).size !== urls.length) issues.push({ url: PUBLIC_ORIGIN + "/sitemap.xml", issue: "Duplicate sitemap entries" });
  if (ads.status !== 200 || !ads.html.split(/\r?\n/).some((line) => line.trim() === SELLER_RECORD)) issues.push({ url: PUBLIC_ORIGIN + "/ads.txt", issue: "Authorized seller record missing" });
  if (robots.status !== 200 || !robots.html.includes(PUBLIC_ORIGIN + "/sitemap.xml")) issues.push({ url: PUBLIC_ORIGIN + "/robots.txt", issue: "Missing public sitemap declaration" });
  return {
    checkedAt: new Date().toISOString(), origin: PUBLIC_ORIGIN,
    account: { status: "unverified", issue: "unavailable", publisherMatchesSignedInAccount: "unverified", autoAds: "unverified", policyCenter: "unverified", cmp: "unverified", reviewRequested: false },
    summary: { pages: pages.length, reachable: reachable.size, technicalIssues: issues.length, pagesWithLoaders: pages.filter((p) => p.loaders).length, pagesWithUnits: pages.filter((p) => p.units).length, pagesWithOwnership: pages.filter((p) => p.publishers.includes(PUBLISHER)).length, adServingState: pages.some((p) => p.loaders || p.units) ? "serving-markup-present" : "no-serving-markup-in-initial-html" },
    limitations: ["Read-only HTTP audit; no authenticated account access or review submission.", "No JavaScript execution, visual/functional tests, ad requests, or tools submitted.", "Server-visible text size and content hashes are diagnostic values, not AdSense quality scores or minimums.", "Publisher tags match the configured website publisher; account ownership still needs dashboard confirmation.", "Google's review decision and actual ad delivery cannot be inferred from these checks."],
    resources: { robots: { status: robots.status, text: robots.html }, adsTxt: { status: ads.status, text: ads.html.trim() } }, issues, pages,
  };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const args = process.argv.slice(2);
    if (args.length > 2 || (args.length && args[0] !== "--report") || (args[0] === "--report" && !args[1])) throw new Error("Usage: node scripts/audit-adsense-readiness.mjs [--report PATH.json]");
    const report = await auditSite({ onProgress: console.log });
    if (args[1]) {
      const path = resolve(args[1]);
      await mkdir(dirname(path), { recursive: true });
      await writeFile(path, JSON.stringify(report, null, 2) + "\n", { flag: "wx" });
    }
    console.log(JSON.stringify({ ...report.summary, accountStatus: report.account.status, report: args[1] || null, issues: report.issues }, null, 2));
    if (report.issues.length) process.exitCode = 1;
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

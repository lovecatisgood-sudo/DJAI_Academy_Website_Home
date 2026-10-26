import assert from "node:assert/strict";
import test from "node:test";
import { auditSite, inspectPage, sitemapUrls, PUBLIC_ORIGIN, PUBLISHER, SELLER_RECORD } from "../scripts/audit-adsense-readiness.mjs";

const page = (path = "/", extra = "") => `<html lang="en"><head><title>Test page</title><meta name="description" content="A useful description"><meta name="google-adsense-account" content="${PUBLISHER}"><link rel="canonical" href="${PUBLIC_ORIGIN}${path}"></head><body><main><h1>Useful heading</h1><p>Original page content.</p>${extra}</main></body></html>`;

test("extracts actual HTML tags, not serialized scripts, and recognizes ad serving", () => {
  const html = page("/", `<script>const fake = 'data-ad-slot="123"';</script><script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${PUBLISHER}"></script><ins class="other adsbygoogle" data-ad-slot="123"></ins>`);
  const result = inspectPage(html, PUBLIC_ORIGIN + "/", 200);
  assert.equal(result.loaders, 1);
  assert.equal(result.units, 1);
  assert.equal(result.canonical, PUBLIC_ORIGIN + "/");
  assert.deepEqual(result.issues, []);
  assert.equal(inspectPage(page("/", `<script>const fake = 'data-ad-slot="123"';</script>`), PUBLIC_ORIGIN + "/", 200).units, 0);
});

test("detects inaccessible, noindex, miscanonicalized, and invalid structured-data pages", () => {
  const html = page("/wrong/", '<script type="application/ld+json">{broken}</script>').replace("</head>", '<meta name="robots" content="noindex,follow"></head>');
  const result = inspectPage(html, PUBLIC_ORIGIN + "/", 404);
  assert.ok(result.issues.includes("HTTP 404"));
  assert.ok(result.issues.includes("Sitemap page is noindex"));
  assert.ok(result.issues.includes("Canonical does not match sitemap URL"));
  assert.ok(result.issues.includes("Invalid JSON-LD"));
});

test("rejects noncanonical and cross-property sitemap targets before requesting them", () => {
  assert.throws(() => sitemapUrls('<urlset><url><loc>https://school.djai.academy/</loc></url></urlset>'), /Out-of-scope/);
  assert.throws(() => sitemapUrls('<urlset><url><loc>https://www.djai.academy/?token=x</loc></url></urlset>'), /Out-of-scope/);
  assert.throws(() => sitemapUrls('<sitemapindex></sitemapindex>'), /urlset/);
});

test("audit follows only public sitemap URLs, finds orphans and bad alternates, and does not claim account approval", async () => {
  const responses = {
    "/sitemap.xml": `<urlset><url><loc>${PUBLIC_ORIGIN}/</loc></url><url><loc>${PUBLIC_ORIGIN}/orphan/</loc></url></urlset>`,
    "/robots.txt": `User-agent: *\nAllow: /\nSitemap: ${PUBLIC_ORIGIN}/sitemap.xml`,
    "/ads.txt": SELLER_RECORD,
    "/": page("/", `<link rel="alternate" hreflang="vi" href="${PUBLIC_ORIGIN}/missing/"><a href="https://school.djai.academy/">School</a>`),
    "/orphan/": page("/orphan/"),
  };
  const requests = [];
  const result = await auditSite({ pauseMs: 0, fetcher: async (url, options) => {
    requests.push(url.pathname);
    assert.equal(options.redirect, "manual");
    assert.equal(url.origin, PUBLIC_ORIGIN);
    return new Response(responses[url.pathname], { headers: { "content-type": "text/html" } });
  } });
  assert.equal(requests.length, 5);
  assert.equal(result.summary.reachable, 1);
  assert.ok(result.issues.some((item) => item.issue.startsWith("Hreflang target absent")));
  assert.ok(result.issues.some((item) => item.url.endsWith("/orphan/") && item.issue.startsWith("Not reachable")));
  assert.equal(result.account.status, "unverified");
  assert.equal(result.account.reviewRequested, false);
});

test("stops immediately on service throttling", async () => {
  await assert.rejects(auditSite({ pauseMs: 0, fetcher: async () => new Response("throttled", { status: 429 }) }), /stopped on HTTP 429/);
});

test("does not require a publisher tag on every ad-free page, but flags conflicting publisher IDs", () => {
  const html = page("/privacy/").replace(`<meta name="google-adsense-account" content="${PUBLISHER}">`, "");
  assert.deepEqual(inspectPage(html, PUBLIC_ORIGIN + "/privacy/", 200).issues, []);
  assert.ok(inspectPage(page().replace(PUBLISHER, "ca-pub-9999999999999999"), PUBLIC_ORIGIN + "/", 200).issues.includes("Missing or mismatched publisher ownership tag"));
});

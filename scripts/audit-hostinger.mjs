import { spawn } from "node:child_process";
import { copyFile, mkdtemp, rm } from "node:fs/promises";
import { request } from "node:http";
import { tmpdir } from "node:os";
import { join } from "node:path";

const port = Number(process.env.DJAI_AUDIT_PORT || 3147);
const origin = `http://127.0.0.1:${port}`;
const repositoryRoot = new URL("..", import.meta.url).pathname;
const useQrCompatibilityEntry = process.env.DJAI_AUDIT_ENTRY === "qr";
const serverEntry = useQrCompatibilityEntry
  ? "scripts/start-root-hostinger.mjs"
  : "server.js";
const serverDirectory = useQrCompatibilityEntry
  ? new URL("../DJayTools-Free-QR-Generator-Source/", import.meta.url).pathname
  : repositoryRoot;
const publicRoutes = [
  "/",
  "/en/",
  "/portfolio/",
  "/portfolio/en/",
  "/development/",
  "/development/en/",
  "/web_promo/",
  "/service/",
  "/service/en/",
  "/tools/",
  "/tools/en/",
  "/tools/seo-screaming-toad/",
  "/tools/seo-screaming-toad/en/",
  "/tools/qrgen/",
  "/tools/qrgen/en/",
  ...["url-qr-code-generator", "wifi-qr-code-generator", "vcard-qr-code-generator", "text-qr-code-generator", "email-qr-code-generator", "whatsapp-qr-code-generator", "qr-code-generator-with-logo"].flatMap((tool) => [`/tools/qrgen/${tool}/`, `/tools/qrgen/${tool}/en/`]),
  "/tools/resizeimg/",
  "/tools/resizeimg/en/",
  "/tools/resizeimg/jpg-to-png/",
  "/tools/resizeimg/jpg-to-png/en/",
  "/tools/resizeimg/png-to-jpg/",
  "/tools/resizeimg/png-to-jpg/en/",
  "/tools/resizeimg/jpg-to-webp/",
  "/tools/resizeimg/jpg-to-webp/en/",
  "/tools/resizeimg/png-to-webp/",
  "/tools/resizeimg/png-to-webp/en/",
  "/tools/resizeimg/webp-to-jpg/",
  "/tools/resizeimg/webp-to-jpg/en/",
  "/tools/resizeimg/webp-to-png/",
  "/tools/resizeimg/webp-to-png/en/",
  "/tools/resizeimg/compress-image/",
  "/tools/resizeimg/compress-image/en/",
  "/tools/resizeimg/resize-image/",
  "/tools/resizeimg/resize-image/en/",
  "/tools/resizeimg/image-to-100kb/",
  "/tools/resizeimg/image-to-100kb/en/",
  "/tools/resizeimg/image-to-500kb/",
  "/tools/resizeimg/image-to-500kb/en/",
  "/tools/resizeimg/heic-to-jpg/",
  "/tools/resizeimg/heic-to-jpg/en/",
  "/tools/resizeimg/remove-image-metadata/",
  "/tools/resizeimg/remove-image-metadata/en/",
  "/tools/resizeimg/remove-background-image/",
  "/tools/resizeimg/remove-background-image/en/",
  ...["resize-image-to-200kb", "avif-to-jpg", "avif-to-png", "passport-photo-resizer"].flatMap((tool) => [`/tools/resizeimg/${tool}/`, `/tools/resizeimg/${tool}/en/`]),
  "/tools/media/",
  "/tools/media/en/",
  ...["mp3-to-wav", "wav-to-mp3", "m4a-to-mp3", "mp4-to-mp3", "extract-audio-from-video", "mp4-to-webm", "webm-to-mp4", "mov-to-mp4", "compress-video"].flatMap((tool) => [`/tools/media/${tool}/`, `/tools/media/${tool}/en/`]),
  "/tools/PDFTools/",
  "/tools/PDFTools/en/",
  "/tools/PDFTools/merge-pdf/",
  "/tools/PDFTools/merge-pdf/en/",
  "/tools/PDFTools/split-pdf/",
  "/tools/PDFTools/split-pdf/en/",
  "/tools/PDFTools/compress-pdf/",
  "/tools/PDFTools/compress-pdf/en/",
  "/tools/PDFTools/images-to-pdf/",
  "/tools/PDFTools/images-to-pdf/en/",
  "/tools/PDFTools/pdf-to-images/",
  "/tools/PDFTools/pdf-to-images/en/",
  "/tools/PDFTools/rotate-pdf/",
  "/tools/PDFTools/rotate-pdf/en/",
  "/tools/PDFTools/watermark-pdf/",
  "/tools/PDFTools/watermark-pdf/en/",
  "/tools/PDFTools/protect-pdf/",
  "/tools/PDFTools/protect-pdf/en/",
  "/tools/PDFTools/jpg-to-pdf/",
  "/tools/PDFTools/jpg-to-pdf/en/",
  "/tools/PDFTools/pdf-to-jpg/",
  "/tools/PDFTools/pdf-to-jpg/en/",
  ...["png-to-pdf", "webp-to-pdf", "pdf-to-png", "extract-pdf-pages", "delete-pages-from-pdf", "reorder-pdf-pages"].flatMap((tool) => [`/tools/PDFTools/${tool}/`, `/tools/PDFTools/${tool}/en/`]),
  "/tools/PDFTools/organize-pdf/",
  "/tools/PDFTools/organize-pdf/en/",
  "/tools/PDFTools/add-page-numbers/",
  "/tools/PDFTools/add-page-numbers/en/",
  "/tools/PDFTools/remove-pdf-metadata/",
  "/tools/PDFTools/remove-pdf-metadata/en/",
  ...[
    { category: "document", tools: ["docx-to-pdf", "docx-to-html", "docx-to-markdown", "docx-to-text", "pdf-to-text", "pdf-to-word", "ocr"] },
    { category: "ai", tools: ["token-counter", "pdf-to-ai-markdown", "context-optimizer", "rag-chunk-calculator", "prompt-packager"] },
    { category: "spreadsheet", tools: ["csv-to-json", "json-to-csv", "csv-cleaner", "merge-csv", "split-csv", "csv-to-xlsx", "xlsx-to-csv"] }
  ].flatMap(({ category, tools }) => [
    `/tools/${category}/`,
    `/tools/${category}/en/`,
    ...tools.flatMap((tool) => [`/tools/${category}/${tool}/`, `/tools/${category}/${tool}/en/`])
  ]),
  "/blog/",
  "/blog/en/",
  "/blog/how-to-create-free-qr-code/",
  "/blog/en/how-to-create-free-qr-code/",
  "/blog/how-to-convert-jpg-png-webp-free/",
  "/blog/en/how-to-convert-jpg-png-webp-free/",
  "/blog/compress-image-to-100kb-500kb/",
  "/blog/en/compress-image-to-100kb-500kb/",
  "/course/",
  "/course/en/",
  "/course/detail/",
  "/course/detail/en/",
  "/siamese_cat/",
  "/siamese_cat/en/",
  "/siamese_cat/dev/",
  "/siamese_cat/dev/en/",
  "/siamese_cat/dev/course/",
  "/siamese_cat/dev/blog/",
  "/siamese_cat/dev/blog/en/",
  "/admin/blog/",
  "/voice_admin/login",
  "/Cam_PDF_Scan_Signer_QR-Gen/",
  "/Cam_PDF_Scan_Signer_QR-Gen/privacy/",
  "/Cam_PDF_Scan_Signer_QR-Gen/terms/",
  "/Cam_PDF_Scan_Signer_QR-Gen/delete-account/",
  "/app-ads.txt",
  "/favicon.svg",
  "/robots.txt",
  "/llms.txt",
  "/sitemap.xml",
  "/healthz"
];
const redirects = [
  ["/favicon.ico", "/favicon.svg"],
  ["/voice_admin/", "/voice_admin"],
  ["/th/", "/"],
  ["/EN/", "/en/"],
  ["/tools/Resizeimg/", "/tools/resizeimg/"],
  ["/tools/docx-to-pdf/", "/tools/document/docx-to-pdf/"],
  ["/tools/word-to-pdf/", "/tools/document/docx-to-pdf/"],
  ["/tools/docx-to-pdf/en/", "/tools/document/docx-to-pdf/en/"],
  ["/tools/word-to-pdf/en/", "/tools/document/docx-to-pdf/en/"],
  ["/tools/document/word-to-pdf/", "/tools/document/docx-to-pdf/"],
  ["/tools/document/word-to-pdf/en/", "/tools/document/docx-to-pdf/en/"]
];
const accountOnboardingRedirects = ["/academy/", "/academy/en/"];
const moneyMakingProductRegistrationUrl =
  "https://school.djai.academy/signup?intent=free-course&course_id=money-making-product-2026-08-22";
const auditPassword = "djai-local-deployment-audit";
const auditApiKey = "djai-local-api-key-audit";
const auditDataDirectory = await mkdtemp(join(tmpdir(), "djai-blog-audit-"));
const auditDataFile = join(auditDataDirectory, "blog-posts.json");
await copyFile(join(repositoryRoot, "djai-academy-homepage", "data", "blog-posts.json"), auditDataFile);

const server = spawn(process.execPath, [serverEntry], {
  cwd: serverDirectory,
  env: {
    ...process.env,
    HOST: "127.0.0.1",
    NODE_ENV: "production",
    PORT: String(port),
    DJAI_BLOG_ADMIN_PASSWORD: auditPassword,
    DJAI_BLOG_API_KEY: auditApiKey,
    DJAI_BLOG_DATA_FILE: auditDataFile
  },
  stdio: ["ignore", "pipe", "pipe"]
});

let serverOutput = "";
server.stdout.on("data", (chunk) => {
  serverOutput += chunk;
});
server.stderr.on("data", (chunk) => {
  serverOutput += chunk;
});

async function waitForServer() {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      const response = await fetch(`${origin}/healthz`, { cache: "no-store" });
      if (response.ok) return;
    } catch {
      // The server is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error(`Server did not become ready.\n${serverOutput}`);
}

function requestApexRedirect() {
  return new Promise((resolve, reject) => {
    const requestHandle = request(
      {
        hostname: "127.0.0.1",
        port,
        path: "/",
        headers: { Host: "djai.academy" }
      },
      (response) => {
        response.resume();
        resolve({ status: response.statusCode, location: response.headers.location });
      }
    );
    requestHandle.on("error", reject);
    requestHandle.end();
  });
}

async function verify() {
  await waitForServer();
  const failures = [];

  for (const route of publicRoutes) {
    const response = await fetch(`${origin}${route}`, { redirect: "manual" });
    if (response.status !== 200) {
      failures.push(`${route}: expected 200, received ${response.status}`);
    }
  }

  for (const route of accountOnboardingRedirects) {
    const response = await fetch(`${origin}${route}`, { redirect: "manual" });
    if (response.status !== 308 || response.headers.get("location") !== "https://school.djai.academy/") {
      failures.push(`${route}: expected 308 to the account-authoritative School`);
    }
  }

  const campaignResponse = await fetch(`${origin}/MONEY_MAKING_PRODUCT/`, { redirect: "manual" });
  if (campaignResponse.status !== 307 || campaignResponse.headers.get("location") !== moneyMakingProductRegistrationUrl) {
    failures.push("/MONEY_MAKING_PRODUCT/: expected account-first free-course signup redirect");
  }

  const courseLandingHtml = await fetch(`${origin}/siamese_cat/dev/course/`).then((response) => response.text());
  const courseLandingChecks = [
    '<html lang="en"',
    '<link rel="canonical" href="https://www.djai.academy/siamese_cat/dev/course/"',
    '<h1>Vibe Code a Product That Can Make Money</h1>',
    'href="/MONEY_MAKING_PRODUCT/"',
    '"@type":"EducationEvent"',
    '"startDate":"2026-08-22T13:00:00+07:00"',
    '"isAccessibleForFree":true'
  ];
  for (const expected of courseLandingChecks) {
    if (!courseLandingHtml.includes(expected)) failures.push(`/siamese_cat/dev/course/: missing ${expected}`);
  }
  if (courseLandingHtml.includes("chat.whatsapp.com") || courseLandingHtml.includes("meet.google.com")) {
    failures.push("/siamese_cat/dev/course/: private participant links leaked into public HTML");
  }

  const courseRegistrationChecks = [
    { route: "/course/", accountCopy: "ต้องมีบัญชี DJAI School" },
    { route: "/course/en/", accountCopy: "A free DJAI School account" },
    { route: "/course/detail/", accountCopy: "ต้องมีบัญชี DJAI School" },
    { route: "/course/detail/en/", accountCopy: "A free DJAI School account" }
  ];
  const courseSignupHref =
    "https://school.djai.academy/signup?intent=offline-course&amp;course_id=ai-masterclass";
  const courseLoginHref =
    "https://school.djai.academy/login?intent=offline-course&amp;course_id=ai-masterclass";

  for (const check of courseRegistrationChecks) {
    const html = await fetch(`${origin}${check.route}`).then((response) => response.text());
    if (!html.includes(courseSignupHref)) failures.push(`${check.route}: missing account-first course signup URL`);
    if (!html.includes(courseLoginHref)) failures.push(`${check.route}: missing existing-account login URL`);
    if (!html.includes(check.accountCopy)) failures.push(`${check.route}: missing school-account requirement copy`);
    if (html.includes("buy.stripe.com")) failures.push(`${check.route}: still exposes direct Stripe checkout`);
  }

  const retiredOnboardingResponse = await fetch(`${origin}/api/academy-onboarding/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ locale: "en" })
  });
  if (retiredOnboardingResponse.status !== 410) {
    failures.push(`/api/academy-onboarding/: expected retired endpoint status 410, received ${retiredOnboardingResponse.status}`);
  }

  const toolDiscoveryRoutes = publicRoutes.filter(
    (route) => route.startsWith("/tools/") && route.endsWith("/")
  );
  for (const route of toolDiscoveryRoutes) {
    const html = await fetch(`${origin}${route}`).then((response) => response.text());
    if (!html.includes("data-tool-discovery")) {
      failures.push(`${route}: missing crawlable tool discovery navigation`);
    }
  }

  for (const route of ["/", "/blog/", "/course/", "/service/"]) {
    const html = await fetch(`${origin}${route}`).then((response) => response.text());
    if (html.includes("data-tool-discovery")) {
      failures.push(`${route}: tool-only discovery navigation leaked onto a non-tool page`);
    }
  }

  const toolHubFooterChecks = [
    ["/tools/", "สร้างโดยทีมที่มี product จริงและธุรกิจจริง", "SEO crawler โอเพนซอร์สพร้อมหลักฐาน Technical SEO"],
    ["/tools/en/", "Built by connected teams with real products.", "Open-source SEO crawler with technical evidence"]
  ];
  for (const [route, precedingContent, seoCardCopy] of toolHubFooterChecks) {
    const html = await fetch(`${origin}${route}`).then((response) => response.text());
    const directoryPosition = html.indexOf("data-tool-discovery");
    const precedingPosition = html.indexOf(precedingContent);
    if (directoryPosition < 0 || precedingPosition < 0 || directoryPosition < precedingPosition) {
      failures.push(`${route}: complete tool directory is not positioned as the final discovery footer`);
    }
    if (!html.includes(seoCardCopy)) failures.push(`${route}: SEO crawler footer card is incomplete`);
  }

  const promoResponse = await fetch(`${origin}/web_promo/`);
  const promoBody = await promoResponse.text();
  if (!promoBody.includes('<link rel="canonical" href="https://www.djai.academy/web_promo/"')) {
    failures.push("/web_promo/: missing the production canonical URL");
  }
  if (!promoBody.includes("บริการพัฒนาเว็บไซต์ พร้อมเปิดตัว ติดอันดับ และสร้างลูกค้า")) {
    failures.push("/web_promo/: missing crawlable server-rendered service content");
  }

  const promoScriptResponse = await fetch(`${origin}/web_promo/assets/js/promo.js`);
  const promoScriptBody = await promoScriptResponse.text();
  if (promoScriptResponse.status !== 200 || !promoScriptBody.includes("Spin to reveal your guaranteed welcome voucher")) {
    failures.push("/web_promo/assets/js/promo.js: guaranteed voucher wheel is not available");
  }
  if (!promoScriptBody.includes("/web_promo/api/voucher-lead")) {
    failures.push("/web_promo/assets/js/promo.js: voucher lead endpoint is not connected");
  }

  const filteredBlogResponse = await fetch(`${origin}/blog/en/?category=Tutorial`);
  const filteredBlogBody = await filteredBlogResponse.text();
  if (!filteredBlogBody.includes('<meta name="robots" content="noindex, follow"')) {
    failures.push("/blog/en/?category=Tutorial: missing noindex, follow directive");
  }
  if (filteredBlogBody.includes('<link rel="alternate"')) {
    failures.push("/blog/en/?category=Tutorial: noncanonical filter must not emit hreflang");
  }

  const llmsResponse = await fetch(`${origin}/llms.txt`);
  const llmsBody = await llmsResponse.text();
  if (!llmsBody.includes("https://www.djai.academy/web_promo/")) {
    failures.push("/llms.txt: missing the web development and voice-agent service");
  }
  if (!llmsBody.includes("https://www.djai.academy/tools/seo-screaming-toad/en/")) {
    failures.push("/llms.txt: missing the English SEO Screaming Toad product guide");
  }

  const screamingToadChecks = [
    {
      route: "/tools/seo-screaming-toad/",
      language: "th",
      canonical: "https://www.djai.academy/tools/seo-screaming-toad/",
      repository: "https://github.com/DJAI-Academy/-Screaming-Frog-Screaming-Toad-SEO-100M-URL"
    },
    {
      route: "/tools/seo-screaming-toad/en/",
      language: "en",
      canonical: "https://www.djai.academy/tools/seo-screaming-toad/en/",
      repository: "https://github.com/lovecatisgood-sudo/Free-Opensource-SEO-Screaming-Toad-not-Frog-tool-with-100million-url-crawl-potential"
    }
  ];
  for (const check of screamingToadChecks) {
    const html = await fetch(`${origin}${check.route}`).then((response) => response.text());
    if (!html.includes(`<html lang="${check.language}"`)) failures.push(`${check.route}: expected html lang=${check.language}`);
    if (!html.includes(`<link rel="canonical" href="${check.canonical}"`)) failures.push(`${check.route}: missing self-canonical`);
    for (const language of ["th", "en", "x-default"]) {
      if (!new RegExp(`hreflang=["']${language}["']`, "i").test(html)) failures.push(`${check.route}: missing ${language} hreflang`);
    }
    if (!html.includes(check.repository)) failures.push(`${check.route}: missing locale-specific source repository`);
    if (!html.includes('"@type":"SoftwareApplication"')) failures.push(`${check.route}: missing SoftwareApplication structured data`);
    if (!html.includes('"@type":"FAQPage"')) failures.push(`${check.route}: missing FAQ structured data`);
    if (!html.includes("SEO Screaming Toad")) failures.push(`${check.route}: missing crawlable product content`);
  }

  const sitemapBody = await fetch(`${origin}/sitemap.xml`).then((response) => response.text());
  for (const path of ["/tools/seo-screaming-toad/", "/tools/seo-screaming-toad/en/"]) {
    if (!sitemapBody.includes(`https://www.djai.academy${path}`)) failures.push(`/sitemap.xml: missing ${path}`);
  }
  if (!sitemapBody.includes("https://www.djai.academy/siamese_cat/dev/course/")) {
    failures.push("/sitemap.xml: missing the money-making product course landing page");
  }
  if (sitemapBody.includes("/MONEY_MAKING_PRODUCT/")) {
    failures.push("/sitemap.xml: redirect-only campaign URL must not be submitted");
  }

  const voiceAdminLoginResponse = await fetch(`${origin}/voice_admin/login`);
  const voiceAdminLoginBody = await voiceAdminLoginResponse.text();
  if (!String(voiceAdminLoginResponse.headers.get("x-robots-tag") || "").includes("noindex")) {
    failures.push("/voice_admin/login: missing the X-Robots-Tag noindex directive");
  }
  if (!voiceAdminLoginBody.includes('name="robots" content="noindex, nofollow')) {
    failures.push("/voice_admin/login: missing the HTML noindex directive");
  }

  const appAdsResponse = await fetch(`${origin}/app-ads.txt`);
  const appAdsBody = (await appAdsResponse.text()).trim();
  const expectedAppAds = "google.com, pub-3624708289866566, DIRECT, f08c47fec0942fa0";
  if (appAdsBody !== expectedAppAds) {
    failures.push("/app-ads.txt: publisher authorization does not match the expected AdMob record");
  }

  const camPdfChecks = [
    ["/Cam_PDF_Scan_Signer_QR-Gen/", "Cam PDF Scan Signer QR Gen"],
    ["/Cam_PDF_Scan_Signer_QR-Gen/privacy/", "Privacy Policy"],
    ["/Cam_PDF_Scan_Signer_QR-Gen/terms/", "Terms of Service"],
    ["/Cam_PDF_Scan_Signer_QR-Gen/delete-account/", "Delete your account"]
  ];
  for (const [route, heading] of camPdfChecks) {
    const html = await fetch(`${origin}${route}`).then((response) => response.text());
    if (!html.includes('<html lang="en"')) failures.push(`${route}: expected html lang=en`);
    if (!html.includes(`<link rel="canonical" href="https://www.djai.academy${route}"`)) {
      failures.push(`${route}: missing self-canonical`);
    }
    if (!html.includes(`<h1`) || !html.includes(heading)) failures.push(`${route}: missing expected H1 content`);
  }

  for (const [route, expectedLocation] of redirects) {
    const response = await fetch(`${origin}${route}`, { redirect: "manual" });
    const location = response.headers.get("location");
    const normalizedLocation = location ? new URL(location, origin).pathname : "";
    if (response.status !== 308 || normalizedLocation !== expectedLocation) {
      failures.push(
        `${route}: expected 308 to ${expectedLocation}, received ${response.status} to ${normalizedLocation || "(none)"}`
      );
    }
  }

  const unauthorizedAdminResponse = await fetch(`${origin}/api/admin/blog/`);
  if (unauthorizedAdminResponse.status !== 401) {
    failures.push(
      `/api/admin/blog/: expected 401 without credentials, received ${unauthorizedAdminResponse.status}`
    );
  }

  const authorizedAdminResponse = await fetch(`${origin}/api/admin/blog/`, {
    headers: { Authorization: `Bearer ${auditPassword}` }
  });
  if (authorizedAdminResponse.status !== 200) {
    failures.push(
      `/api/admin/blog/: expected 200 with credentials, received ${authorizedAdminResponse.status}`
    );
  } else {
    const payload = await authorizedAdminResponse.json();
    if (!Array.isArray(payload.posts) || payload.posts.length < 3) {
      failures.push("/api/admin/blog/: expected at least three seeded blog posts");
    }
  }

  const apiKeyAdminResponse = await fetch(`${origin}/api/admin/blog/`, {
    headers: { "X-DJAI-Blog-API-Key": auditApiKey }
  });
  if (apiKeyAdminResponse.status !== 200) {
    failures.push(
      `/api/admin/blog/: expected 200 with API key, received ${apiKeyAdminResponse.status}`
    );
  }

  const createDraftResponse = await fetch(`${origin}/api/admin/blog/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${auditApiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      post: {
        translationGroupId: "audit-agent-autopost",
        category: "Tutorial",
        author: "DJAI Academy",
        translations: {
          en: {
            title: "Audit Agent Autopost",
            slug: "audit-agent-autopost",
            status: "draft",
            excerpt: "Temporary audit post.",
            content: "## Audit\n\nTemporary audit content."
          },
          th: {
            title: "Audit Agent Autopost TH",
            slug: "audit-agent-autopost-th",
            status: "draft",
            excerpt: "Temporary audit post.",
            content: "## Audit\n\nTemporary audit content."
          }
        }
      }
    })
  });
  if (createDraftResponse.status !== 200) {
    failures.push(
      `/api/admin/blog/: expected API key POST to create draft, received ${createDraftResponse.status}`
    );
  } else {
    const payload = await createDraftResponse.json();
    if (
      payload.post?.translationGroupId !== "audit-agent-autopost" ||
      payload.post?.category !== "Tutorial" ||
      payload.post?.translations?.en?.status !== "draft" ||
      payload.post?.translations?.th?.status !== "draft"
    ) {
      failures.push("/api/admin/blog/: API key POST returned an invalid multilingual draft payload");
    }
  }

  const apexResponse = await requestApexRedirect();
  if (
    apexResponse.status !== 308 || apexResponse.location !== "https://www.djai.academy/"
  ) {
    failures.push("apex host: expected 308 to https://www.djai.academy/");
  }

  const imageControllerResponse = await fetch(`${origin}/tools/resizeimg/app.js`);
  const imageControllerCache = imageControllerResponse.headers.get("cache-control") || "";
  if (imageControllerCache.includes("immutable") || !imageControllerCache.includes("must-revalidate")) {
    failures.push(`/tools/resizeimg/app.js: unsafe cache policy ${imageControllerCache || "(none)"}`);
  }

  const documentHtml = await fetch(`${origin}/tools/document/docx-to-pdf/`).then((response) => response.text());
  const staticScript = documentHtml.match(/src=["']([^"']*\/tools\/_next\/static\/[^"']+[.]js)["']/)?.[1];
  if (!staticScript) {
    failures.push("document tool: expected a versioned Next.js script");
  } else {
    const staticResponse = await fetch(new URL(staticScript, origin), {
      headers: { "Accept-Encoding": "gzip" }
    });
    const cacheControl = staticResponse.headers.get("cache-control") || "";
    if (!cacheControl.includes("immutable")) {
      failures.push(`${staticScript}: expected immutable cache policy, received ${cacheControl || "(none)"}`);
    }
    if (staticResponse.headers.get("content-encoding") !== "gzip") {
      failures.push(`${staticScript}: expected gzip transfer encoding`);
    }
  }

  const partnershipChecks = [
    ["/siamese_cat/", "/siamese_cat/dev/"],
    ["/siamese_cat/en/", "/siamese_cat/dev/en/"]
  ];
  for (const [route, developerPath] of partnershipChecks) {
    const html = await fetch(`${origin}${route}`).then((response) => response.text());
    for (const expected of [developerPath, "https://siamesecat.cafe/", "https://hotel.siamesecat.cafe/", "https://creative.siamesecat.cafe/"]) {
      if (!html.includes(`href="${expected}"`)) failures.push(`${route}: missing partnership link ${expected}`);
    }
    const expectedLanguage = route.includes("/en/") ? "en" : "th";
    if (!html.includes(`<html lang="${expectedLanguage}"`)) failures.push(`${route}: expected html lang=${expectedLanguage}`);
  }

  const developerCreditChecks = [
    ["/tools/qrgen/", "/siamese_cat/dev/"],
    ["/tools/qrgen/en/", "/siamese_cat/dev/en/"],
    ["/tools/resizeimg/", "/siamese_cat/dev/"],
    ["/tools/resizeimg/jpg-to-png/en/", "/siamese_cat/dev/en/"],
    ["/tools/PDFTools/", "/siamese_cat/dev/"],
    ["/tools/PDFTools/merge-pdf/en/", "/siamese_cat/dev/en/"],
    ["/tools/document/", "/siamese_cat/dev/"],
    ["/tools/ai/token-counter/en/", "/siamese_cat/dev/en/"],
    ["/tools/spreadsheet/", "/siamese_cat/dev/"]
  ];
  for (const [route, expectedPath] of developerCreditChecks) {
    const html = await fetch(`${origin}${route}`).then((response) => response.text());
    if (!html.includes(expectedPath)) failures.push(`${route}: missing linked Siamese Cat Dev credit ${expectedPath}`);
  }

  const discoveredRoutes = new Set();
  for (const route of publicRoutes.filter((candidate) => candidate.endsWith("/"))) {
    const response = await fetch(`${origin}${route}`);
    const html = await response.text();
    const baseMatch = html.match(/<base\s+[^>]*href=["']([^"']+)["']/i);
    const documentBase = baseMatch ? new URL(baseMatch[1], `${origin}${route}`) : new URL(route, origin);
    for (const match of html.matchAll(/(?:href|src)=["']([^"']+)["']/g)) {
      try {
        const url = new URL(match[1], documentBase);
        if (url.origin === origin) {
          discoveredRoutes.add(`${url.pathname}${url.search}`);
        } else if (url.hostname === "www.djai.academy") {
          discoveredRoutes.add(`${url.pathname}${url.search}`);
        }
      } catch {
        // Ignore non-URL attributes such as data URIs.
      }
    }
  }

  for (const route of discoveredRoutes) {
    const response = await fetch(`${origin}${route}`, { redirect: "manual" });
    if (response.status >= 400) {
      failures.push(`discovered ${route}: received ${response.status}`);
    }
  }

  if (failures.length) {
    throw new Error(`Hostinger route audit failed:\n- ${failures.join("\n- ")}`);
  }

  console.log(
    `Hostinger route audit passed: ${publicRoutes.length} pages, ${redirects.length + accountOnboardingRedirects.length} redirects, ` +
      `${discoveredRoutes.size} internal links/assets, admin API auth, and canonical host.`
  );
}

try {
  await verify();
} finally {
  server.kill("SIGTERM");
  await rm(auditDataDirectory, { recursive: true, force: true });
}

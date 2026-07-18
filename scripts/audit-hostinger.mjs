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
  "/service/",
  "/service/en/",
  "/tools/",
  "/tools/en/",
  "/tools/qrgen/",
  "/tools/qrgen/en/",
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
  "/admin/blog/",
  "/favicon.svg",
  "/robots.txt",
  "/sitemap.xml",
  "/healthz"
];
const redirects = [
  ["/favicon.ico", "/favicon.svg"],
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
    `Hostinger route audit passed: ${publicRoutes.length} pages, ${redirects.length} redirects, ` +
      `${discoveredRoutes.size} internal links/assets, admin API auth, and canonical host.`
  );
}

try {
  await verify();
} finally {
  server.kill("SIGTERM");
  await rm(auditDataDirectory, { recursive: true, force: true });
}

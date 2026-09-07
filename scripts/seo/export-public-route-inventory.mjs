import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const repositoryRoot = resolve(scriptDirectory, "../..");
const outputPath = resolve(repositoryRoot, "audits/site-restructure/public-route-inventory.json");
const port = Number(process.env.DJAI_ROUTE_INVENTORY_PORT || 3161);
const origin = `http://127.0.0.1:${port}`;

function decodeHtml(value = "") {
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function attribute(html, selector, name) {
  const tag = html.match(selector)?.[0] || "";
  return tag.match(new RegExp(`\\b${name}=["']([^"']*)["']`, "i"))?.[1] || "";
}

function content(html, selector) {
  return decodeHtml(html.match(selector)?.[1] || "");
}

async function waitForServer() {
  let lastError;
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try {
      const response = await fetch(`${origin}/healthz`);
      if (response.ok) return;
    } catch (error) {
      lastError = error;
    }
    await new Promise((resolveWait) => setTimeout(resolveWait, 250));
  }
  throw lastError || new Error("DJAI route inventory server did not become ready");
}

async function inspectRoute(url) {
  const publicUrl = new URL(url);
  const response = await fetch(`${origin}${publicUrl.pathname}`);
  const html = await response.text();
  const canonical = attribute(html, /<link\b[^>]*rel=["']canonical["'][^>]*>/i, "href")
    || attribute(html, /<link\b[^>]*href=["'][^"']+["'][^>]*rel=["']canonical["'][^>]*>/i, "href");
  const description = attribute(html, /<meta\b[^>]*name=["']description["'][^>]*>/i, "content")
    || attribute(html, /<meta\b[^>]*content=["'][^"']*["'][^>]*name=["']description["'][^>]*>/i, "content");
  const renderedLanguage = attribute(html, /<html\b[^>]*>/i, "lang");
  const language = ["zh-CN", "zh-TW"].includes(renderedLanguage)
    ? renderedLanguage
    : renderedLanguage.split("-")[0].toLowerCase();
  return {
    route: publicUrl.pathname,
    status: response.status,
    language,
    title: content(html, /<title\b[^>]*>([\s\S]*?)<\/title>/i),
    h1: content(html, /<h1\b[^>]*>([\s\S]*?)<\/h1>/i),
    description: decodeHtml(description),
    canonical,
    noindex: /<meta\b[^>]*(?:name=["']robots["'][^>]*content=["'][^"']*noindex|content=["'][^"']*noindex[^>]*name=["']robots["'])/i.test(html),
  };
}

const server = spawn(process.execPath, ["server.js"], {
  cwd: repositoryRoot,
  env: {
    ...process.env,
    HOST: "127.0.0.1",
    PORT: String(port),
    NODE_ENV: "production",
  },
  stdio: ["ignore", "ignore", "pipe"],
});

let stderr = "";
server.stderr.on("data", (chunk) => {
  stderr += chunk.toString();
});

try {
  await waitForServer();
  const sitemapResponse = await fetch(`${origin}/sitemap.xml`);
  if (!sitemapResponse.ok) throw new Error(`sitemap returned ${sitemapResponse.status}`);
  const sitemap = await sitemapResponse.text();
  const urls = [...sitemap.matchAll(/<loc>(https:\/\/www\.djai\.academy[^<]+)<\/loc>/g)]
    .map((match) => match[1]);

  const routes = [];
  for (let offset = 0; offset < urls.length; offset += 12) {
    routes.push(...await Promise.all(urls.slice(offset, offset + 12).map(inspectRoute)));
  }

  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, `${JSON.stringify({
    generatedAt: "2026-09-06",
    origin: "https://www.djai.academy",
    count: routes.length,
    routes,
  }, null, 2)}\n`);
  console.log(`Exported ${routes.length} routes to ${outputPath}`);
} finally {
  server.kill("SIGTERM");
  await new Promise((resolveExit) => {
    if (server.exitCode !== null) return resolveExit();
    const timeout = setTimeout(resolveExit, 5000);
    server.once("exit", () => {
      clearTimeout(timeout);
      resolveExit();
    });
  });
  if (stderr.trim()) process.stderr.write(stderr);
}

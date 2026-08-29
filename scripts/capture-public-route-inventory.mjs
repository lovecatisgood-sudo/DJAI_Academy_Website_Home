import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const localeBySegment = new Map([
  ["th", "th"],
  ["en", "en"],
  ["vi", "vi"],
  ["zh-cn", "zh-CN"],
  ["zh-tw", "zh-TW"]
]);

const aliases = new Map([
  ["/tools/word-to-pdf/", "tools.document.docx-to-pdf"],
  ["/tools/docx-to-pdf/", "tools.document.docx-to-pdf"],
  ["/tools/document/word-to-pdf/", "tools.document.docx-to-pdf"]
]);

export function parseSitemap(xml) {
  return [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/giu)].map((match) =>
    match[1]
      .replaceAll("&amp;", "&")
      .replaceAll("&lt;", "<")
      .replaceAll("&gt;", ">")
      .trim()
  );
}

function normalizedPath(pathname) {
  const withLeadingSlash = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return withLeadingSlash.endsWith("/") ? withLeadingSlash : `${withLeadingSlash}/`;
}

function localeAndSemanticSegments(pathname, site) {
  const segments = pathname.split("/").filter(Boolean);
  let locale = "th";

  const semanticSegments = segments.filter((segment) => {
    const candidate = localeBySegment.get(segment.toLowerCase());
    if (!candidate) return true;
    locale = candidate;
    return false;
  });

  if (site === "school" && segments.length > 0 && !localeBySegment.has(segments[0].toLowerCase())) {
    locale = "th";
  }

  return { locale, semanticSegments };
}

function applicationFor(pathname, site) {
  if (site === "school") return "djai-school";
  if (pathname.startsWith("/tools/qrgen/")) return "DJayTools-Free-QR-Generator-Source";
  if (pathname.startsWith("/tools/resizeimg/")) return "djai-image-resizer";
  if (pathname.toLowerCase().startsWith("/tools/pdftools/")) return "djai-pdf-tools";
  if (pathname.startsWith("/tools/media/")) return "djai-media-tools";
  if (/^\/tools\/(document|ai|spreadsheet|brand)\//u.test(pathname)) {
    return "djai-document-tools";
  }
  if (pathname.startsWith("/course/")) return "djai-academy-course";
  if (pathname.startsWith("/web_promo/")) return "djai-web-promo-voice";
  if (pathname.startsWith("/siamese_cat/dev/") && !pathname.includes("/blog/")) {
    return "Siamese-Cat-Dev-Bio-Site";
  }
  return "djai-academy-homepage";
}

function semanticStemFor(semanticSegments, site) {
  if (semanticSegments.length === 0) return "home";

  const segments = semanticSegments.map((segment) => segment.toLowerCase());
  const isToolHub = site === "www" && segments[0] === "tools" && segments.length === 2;
  if (isToolHub) segments.push("index");

  return segments.join(".");
}

export function classifyPublicUrl(input, site = "www") {
  const url = new URL(input);
  const pathname = normalizedPath(url.pathname);
  const { locale, semanticSegments } = localeAndSemanticSegments(pathname, site);
  const semanticStem = semanticStemFor(semanticSegments, site);
  const semanticId = site === "school" ? `school.${semanticStem}` : semanticStem;
  const aliasCanonical = aliases.get(pathname.toLowerCase());

  return {
    semanticId: aliasCanonical || semanticId,
    sourceUrl: url.href,
    sourcePath: pathname,
    locale,
    family: site === "school" ? "school" : (semanticSegments[0]?.toLowerCase() || "home"),
    application: applicationFor(pathname, site),
    isAlias: Boolean(aliasCanonical),
    canonicalId: aliasCanonical || semanticId
  };
}

export function buildInventory(wwwXml, schoolXml) {
  return {
    capturedAt: new Date().toISOString(),
    sites: {
      www: parseSitemap(wwwXml).map((url) => classifyPublicUrl(url, "www")),
      school: parseSitemap(schoolXml).map((url) => classifyPublicUrl(url, "school"))
    }
  };
}

function argumentValue(args, name) {
  const index = args.indexOf(name);
  return index === -1 ? undefined : args[index + 1];
}

async function fetchText(url) {
  const response = await fetch(url, { headers: { "user-agent": "DJAI localization inventory/1.0" } });
  if (!response.ok) throw new Error(`${url} returned HTTP ${response.status}`);
  return response.text();
}

async function main() {
  const args = process.argv.slice(2);
  const wwwUrl = argumentValue(args, "--www") || "https://www.djai.academy/sitemap.xml";
  const schoolUrl = argumentValue(args, "--school") || "https://school.djai.academy/sitemap.xml";
  const output = argumentValue(args, "--output");
  const wwwFixture = argumentValue(args, "--www-fixture");
  const schoolFixture = argumentValue(args, "--school-fixture");

  if (!output || !wwwFixture || !schoolFixture) {
    throw new Error("Required arguments: --output, --www-fixture, and --school-fixture");
  }

  const [wwwXml, schoolXml] = await Promise.all([fetchText(wwwUrl), fetchText(schoolUrl)]);
  const outputPath = resolve(output);
  const wwwFixturePath = resolve(wwwFixture);
  const schoolFixturePath = resolve(schoolFixture);

  await Promise.all([
    mkdir(dirname(outputPath), { recursive: true }),
    mkdir(dirname(wwwFixturePath), { recursive: true }),
    mkdir(dirname(schoolFixturePath), { recursive: true })
  ]);
  await Promise.all([
    writeFile(outputPath, `${JSON.stringify(buildInventory(wwwXml, schoolXml), null, 2)}\n`),
    writeFile(wwwFixturePath, wwwXml),
    writeFile(schoolFixturePath, schoolXml)
  ]);
}

const invokedPath = process.argv[1] ? resolve(process.argv[1]) : "";
if (invokedPath === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  });
}

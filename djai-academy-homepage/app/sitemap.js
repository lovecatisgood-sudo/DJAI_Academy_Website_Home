import { getAllPosts } from "./lib/blogStore";
import { getAllThaiPosts } from "./lib/thBlogPosts";

export const dynamic = "force-dynamic";

const ORIGIN = "https://www.djai.academy";
const STATIC_LAST_MODIFIED = new Date("2026-07-28T00:00:00.000Z");

const corePaths = [
  "/", "/en/", "/portfolio/", "/portfolio/en/", "/development/", "/development/en/",
  "/service/", "/service/en/", "/tools/", "/tools/en/", "/tools/qrgen/", "/tools/qrgen/en/",
  "/course/", "/course/en/", "/course/detail/", "/course/detail/en/", "/siamese_cat/",
  "/siamese_cat/en/", "/siamese_cat/dev/", "/siamese_cat/dev/en/", "/blog/", "/blog/en/"
];

const imageTools = [
  "jpg-to-png", "png-to-jpg", "jpg-to-webp", "png-to-webp", "webp-to-jpg", "webp-to-png",
  "compress-image", "resize-image", "image-to-100kb", "image-to-500kb", "heic-to-jpg",
  "remove-image-metadata"
];

const pdfTools = [
  "merge-pdf", "split-pdf", "compress-pdf", "images-to-pdf", "pdf-to-images", "rotate-pdf",
  "watermark-pdf", "protect-pdf", "organize-pdf", "add-page-numbers", "remove-pdf-metadata",
  "jpg-to-pdf", "pdf-to-jpg"
];

const suiteTools = {
  document: ["docx-to-pdf", "docx-to-html", "docx-to-markdown", "docx-to-text", "pdf-to-text", "pdf-to-word", "ocr"],
  ai: ["token-counter", "pdf-to-ai-markdown", "context-optimizer", "rag-chunk-calculator", "prompt-packager"],
  spreadsheet: ["csv-to-json", "json-to-csv", "csv-cleaner", "merge-csv", "split-csv", "csv-to-xlsx", "xlsx-to-csv"]
};

function bilingual(base, slugs = []) {
  return [base, `${base}en/`, ...slugs.flatMap((slug) => [`${base}${slug}/`, `${base}${slug}/en/`])];
}

const staticPaths = [
  ...corePaths,
  ...bilingual("/tools/resizeimg/", imageTools),
  ...bilingual("/tools/PDFTools/", pdfTools),
  ...Object.entries(suiteTools).flatMap(([category, slugs]) => bilingual(`/tools/${category}/`, slugs))
];

function entry(path, lastModified, changeFrequency = "monthly", priority = 0.7) {
  return { url: `${ORIGIN}${path}`, lastModified, changeFrequency, priority };
}

export default async function sitemap() {
  const [englishPosts, thaiPosts] = await Promise.all([
    getAllPosts({ locale: "en" }),
    getAllThaiPosts()
  ]);

  const staticEntries = [...new Set(staticPaths)].map((path) => entry(
    path,
    STATIC_LAST_MODIFIED,
    path === "/" || path === "/en/" ? "weekly" : "monthly",
    path === "/" || path === "/en/" ? 1 : path.startsWith("/tools/") ? 0.8 : 0.7
  ));
  const articleEntries = [
    ...englishPosts.map((post) => entry(`/blog/en/${post.slug}/`, post.updatedAt || post.publishedAt, "monthly", 0.8)),
    ...thaiPosts.map((post) => entry(`/blog/${post.slug}/`, post.updatedAt || post.publishedAt, "monthly", 0.8))
  ];

  return [...new Map([...staticEntries, ...articleEntries].map((item) => [item.url, item])).values()];
}

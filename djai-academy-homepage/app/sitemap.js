import { SIAMESE_CAT_DEV_CATEGORY, getAllPosts, getPostsByCategory } from "./lib/blogStore";
import { getAllThaiPosts } from "./lib/thBlogPosts";
import { viBlogPosts } from "./lib/viBlogPosts";

export const revalidate = 3600;

const ORIGIN = "https://www.djai.academy";
const STATIC_LAST_MODIFIED = new Date("2026-07-30T00:00:00.000Z");
const COURSE_LAST_MODIFIED = new Date("2026-08-05T00:00:00.000Z");
const VIETNAMESE_LAST_MODIFIED = new Date("2026-08-12T00:00:00.000Z");
const BRAND_TOOLS_LAST_MODIFIED = new Date("2026-08-13T00:00:00.000Z");
const BRAND_TOOL_PATHS = new Set([
  "/tools/brand/", "/tools/brand/en/", "/tools/brand/vi/",
  "/tools/brand/favicon-generator/", "/tools/brand/favicon-generator/en/", "/tools/brand/favicon-generator/vi/"
]);
// The background-removal tool was rebuilt on its own first-party engine and
// its pages rewritten. Dated separately so the other static pages keep an
// honest lastModified rather than all claiming to have changed.
const BACKGROUND_REMOVAL_LAST_MODIFIED = new Date("2026-08-07T00:00:00.000Z");
const BACKGROUND_REMOVAL_PATHS = new Set([
  "/tools/resizeimg/remove-background-image/",
  "/tools/resizeimg/remove-background-image/en/"
]);

const corePaths = [
  "/", "/en/", "/vi/", "/portfolio/", "/portfolio/en/", "/portfolio/vi/", "/development/", "/development/en/", "/development/vi/", "/web_promo/", "/web_promo/vi/",
  "/service/", "/service/en/", "/service/vi/", "/privacy/", "/privacy/en/", "/privacy/vi/", "/tools/", "/tools/en/", "/tools/vi/", "/tools/qrgen/", "/tools/qrgen/en/",
  "/tools/seo-screaming-toad/", "/tools/seo-screaming-toad/en/",
  "/course/", "/course/en/", "/course/vi/", "/course/detail/", "/course/detail/en/", "/course/detail/vi/", "/siamese_cat/",
  "/tools/video-to-text/", "/tools/video-to-text/en/",
  "/siamese_cat/en/", "/siamese_cat/dev/", "/siamese_cat/dev/en/", "/siamese_cat/dev/course/", "/siamese_cat/dev/course/th/", "/siamese_cat/dev/blog/",
  "/siamese_cat/dev/blog/en/", "/blog/", "/blog/en/", "/blog/vi/", "/Cam_PDF_Scan_Signer_QR-Gen/",
  "/Cam_PDF_Scan_Signer_QR-Gen/privacy/", "/Cam_PDF_Scan_Signer_QR-Gen/terms/",
  "/Cam_PDF_Scan_Signer_QR-Gen/delete-account/"
];

const imageTools = [
  "jpg-to-png", "png-to-jpg", "jpg-to-webp", "png-to-webp", "webp-to-jpg", "webp-to-png",
  "compress-image", "resize-image", "image-to-100kb", "image-to-500kb", "heic-to-jpg",
  "remove-image-metadata", "remove-background-image", "resize-image-to-200kb", "avif-to-jpg",
  "avif-to-png", "passport-photo-resizer"
];

const qrTools = [
  "url-qr-code-generator", "wifi-qr-code-generator", "vcard-qr-code-generator",
  "text-qr-code-generator", "email-qr-code-generator", "whatsapp-qr-code-generator",
  "qr-code-generator-with-logo"
];

const pdfTools = [
  "merge-pdf", "split-pdf", "compress-pdf", "images-to-pdf", "pdf-to-images", "rotate-pdf",
  "watermark-pdf", "protect-pdf", "organize-pdf", "add-page-numbers", "remove-pdf-metadata",
  "jpg-to-pdf", "pdf-to-jpg", "png-to-pdf", "webp-to-pdf", "pdf-to-png",
  "extract-pdf-pages", "delete-pages-from-pdf", "reorder-pdf-pages"
];

const mediaTools = [
  "mp3-to-wav", "wav-to-mp3", "m4a-to-mp3", "mp4-to-mp3", "extract-audio-from-video",
  "mp4-to-webm", "webm-to-mp4", "mov-to-mp4", "compress-video", "video-converter",
  "mkv-to-mp4", "avi-to-mp4", "mp4-to-mov", "video-cutter", "video-cropper", "video-resizer",
  "video-merger", "compress-video-to-10mb", "compress-video-to-25mb", "compress-video-to-50mb",
  "compress-video-to-100mb", "video-to-gif", "gif-to-mp4", "remove-audio-from-video",
  "add-audio-to-video", "video-speed-changer", "extract-frames-from-video", "rotate-video"
];

const suiteTools = {
  document: ["docx-to-pdf", "docx-to-html", "docx-to-markdown", "docx-to-text", "pdf-to-text", "pdf-to-word", "ocr"],
  ai: ["token-counter", "pdf-to-ai-markdown", "context-optimizer", "rag-chunk-calculator", "prompt-packager"],
  spreadsheet: ["csv-to-json", "json-to-csv", "csv-cleaner", "merge-csv", "split-csv", "csv-to-xlsx", "xlsx-to-csv"]
};

function bilingual(base, slugs = []) {
  return [base, `${base}en/`, ...slugs.flatMap((slug) => [`${base}${slug}/`, `${base}${slug}/en/`])];
}

function trilingual(base, slugs = []) {
  return [base, `${base}en/`, `${base}vi/`, ...slugs.flatMap((slug) => [`${base}${slug}/`, `${base}${slug}/en/`, `${base}${slug}/vi/`])];
}

const staticPaths = [
  ...corePaths,
  ...trilingual("/tools/qrgen/", qrTools),
  ...trilingual("/tools/resizeimg/", imageTools),
  ...bilingual("/tools/PDFTools/", pdfTools),
  "/tools/PDFTools/vi/",
  ...pdfTools.slice(0, 11).map((slug) => `/tools/PDFTools/${slug}/vi/`),
  ...trilingual("/tools/media/", mediaTools),
  ...trilingual("/tools/brand/", ["favicon-generator"]),
  ...Object.entries(suiteTools).flatMap(([category, slugs]) => trilingual(`/tools/${category}/`, slugs))
];

function entry(path, lastModified, changeFrequency = "monthly", priority = 0.7) {
  return { url: `${ORIGIN}${path}`, lastModified, changeFrequency, priority };
}

export default async function sitemap() {
  const [englishPosts, thaiPosts, englishSiameseDevPosts, thaiSiameseDevPosts] = await Promise.all([
    getAllPosts({ locale: "en" }),
    getAllThaiPosts(),
    getPostsByCategory(SIAMESE_CAT_DEV_CATEGORY, { locale: "en" }),
    getPostsByCategory(SIAMESE_CAT_DEV_CATEGORY, { locale: "th" })
  ]);

  const staticEntries = [...new Set(staticPaths)].map((path) => entry(
    path,
    BRAND_TOOL_PATHS.has(path)
      ? BRAND_TOOLS_LAST_MODIFIED
      : BACKGROUND_REMOVAL_PATHS.has(path)
      ? BACKGROUND_REMOVAL_LAST_MODIFIED
      : path.includes("/vi/") || path === "/vi/" ? VIETNAMESE_LAST_MODIFIED : path.startsWith("/siamese_cat/dev/course/") ? COURSE_LAST_MODIFIED : STATIC_LAST_MODIFIED,
    ["/", "/en/", "/vi/"].includes(path) ? "weekly" : "monthly",
    ["/", "/en/", "/vi/"].includes(path) ? 1 : path.startsWith("/siamese_cat/dev/course/") ? 0.9 : path.startsWith("/tools/") ? 0.8 : 0.7
  ));
  const articleEntries = [
    ...englishPosts
      .filter((post) => post.categoryKey !== SIAMESE_CAT_DEV_CATEGORY)
      .map((post) => entry(`/blog/en/${post.slug}/`, post.updatedAt || post.publishedAt, "monthly", 0.8)),
    ...thaiPosts
      .filter((post) => post.categoryKey !== SIAMESE_CAT_DEV_CATEGORY)
      .map((post) => entry(`/blog/${post.slug}/`, post.updatedAt || post.publishedAt, "monthly", 0.8)),
    ...viBlogPosts.map((post) =>
      entry(`/blog/vi/${post.slug}/`, post.updatedAt || post.publishedAt, "monthly", 0.8)
    ),
    ...englishSiameseDevPosts.map((post) =>
      entry(`/siamese_cat/dev/blog/en/${post.slug}/`, post.updatedAt || post.publishedAt, "monthly", 0.8)
    ),
    ...thaiSiameseDevPosts.map((post) =>
      entry(`/siamese_cat/dev/blog/${post.slug}/`, post.updatedAt || post.publishedAt, "monthly", 0.8)
    )
  ];

  return [...new Map([...staticEntries, ...articleEntries].map((item) => [item.url, item])).values()];
}

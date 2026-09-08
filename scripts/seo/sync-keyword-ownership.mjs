import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { enrichEnglishToolKeyword } from "./enrich-english-tool-keywords.mjs";
import { enrichThaiToolKeyword } from "./enrich-thai-tool-keywords.mjs";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const repositoryRoot = resolve(scriptDirectory, "../..");
const ownershipPath = resolve(repositoryRoot, "data/seo/keyword-ownership.json");
const inventoryPath = resolve(repositoryRoot, "audits/site-restructure/public-route-inventory.json");
const writeChanges = process.argv.includes("--write");

const ownership = JSON.parse(readFileSync(ownershipPath, "utf8"));
const inventory = JSON.parse(readFileSync(inventoryPath, "utf8"));

const localeText = {
  th: {
    audience: "ผู้ใช้ที่ต้องการทำงานนี้ให้สำเร็จหรือเลือกขั้นตอนถัดไปที่เกี่ยวข้อง",
    problem: "ต้องการคำตอบหรือเครื่องมือที่ตรงกับงานโดยไม่ต้องลองหลายหน้าที่คล้ายกัน",
  },
  en: {
    audience: "Visitor who wants to complete this task or choose the relevant next step",
    problem: "Needs a page that directly resolves this job without competing DJAI destinations",
  },
  vi: {
    audience: "Người dùng muốn hoàn thành công việc này hoặc chọn bước tiếp theo phù hợp",
    problem: "Cần một trang giải quyết đúng công việc mà không bị phân tán bởi các trang DJAI khác",
  },
  "zh-CN": {
    audience: "希望完成当前文档任务并选择合适下一步的用户",
    problem: "需要直接解决当前任务的页面，而不是在多个相似页面之间寻找答案",
  },
  "zh-TW": {
    audience: "希望完成目前文件工作並選擇合適下一步的使用者",
    problem: "需要直接解決目前工作的頁面，而不是在多個相似頁面之間尋找答案",
  },
};

const camPdfGuideKeywords = {
  "/Cam_PDF_Scan_Signer_QR-Gen/guides/remove-camscanner-watermark-free/": {
    primaryQueryFamily: "how to remove CamScanner watermark for free",
    supportingQueries: [
      "remove scanned by CamScanner watermark from PDF",
      "remove CamScanner watermark without premium",
      "CamScanner alternative without watermark",
      "free scanner app without watermark",
      "CamScanner alternative Android",
      "CamScanner alternative iPhone",
    ],
  },
  "/Cam_PDF_Scan_Signer_QR-Gen/guides/th/remove-camscanner-watermark-free/": {
    primaryQueryFamily: "ลบลายน้ำ CamScanner ฟรี",
    supportingQueries: [
      "วิธีลบลายน้ำ CamScanner",
      "แอปสแกนเอกสารไม่มีลายน้ำ",
      "สแกนเอกสาร PDF ฟรีไม่มีลายน้ำ",
    ],
  },
  "/Cam_PDF_Scan_Signer_QR-Gen/guides/vi/remove-camscanner-watermark-free/": {
    primaryQueryFamily: "cách xóa watermark CamScanner miễn phí",
    supportingQueries: [
      "xóa logo CamScanner",
      "ứng dụng scan không watermark",
      "scan tài liệu miễn phí không watermark",
    ],
  },
  "/Cam_PDF_Scan_Signer_QR-Gen/guides/zh-cn/remove-camscanner-watermark-free/": {
    primaryQueryFamily: "扫描全能王去水印",
    supportingQueries: [
      "扫描全能王怎么去除水印",
      "扫描全能王免费去水印",
      "无水印扫描软件",
    ],
  },
  "/Cam_PDF_Scan_Signer_QR-Gen/guides/zh-tw/remove-camscanner-watermark-free/": {
    primaryQueryFamily: "CamScanner 去浮水印",
    supportingQueries: [
      "CamScanner 浮水印移除",
      "免費掃描 App 無浮水印",
      "文件掃描無浮水印",
    ],
  },
};

function enrichCamPdfGuideKeyword(row) {
  const keyword = camPdfGuideKeywords[row.route];
  if (!keyword) return row;

  return {
    ...row,
    ...keyword,
    evidenceStatus: "directional_external",
    evidenceSource: "localized_serp_review_2026-09-07",
    validatedAt: "2026-09-07",
  };
}

function routeLocale(route, renderedLanguage) {
  if (["th", "en", "vi", "zh-CN", "zh-TW"].includes(renderedLanguage)) return renderedLanguage;
  if (route.includes("/zh-cn/")) return "zh-CN";
  if (route.includes("/zh-tw/")) return "zh-TW";
  if (route === "/" || route.endsWith("/th/")) return "th";
  if (route === "/en/" || route.includes("/en/")) return "en";
  if (route === "/vi/" || route.includes("/vi/")) return "vi";
  return route.startsWith("/siamese_cat/dev/course") || route.startsWith("/siamese_cat/dev/courses")
    ? "en"
    : route === "/Cam_PDF_Scan_Signer_QR-Gen/" ? "en" : "th";
}

function isToolCategoryRoute(route, category) {
  return new RegExp(`^/tools/${category}/(?:en/|vi/)?$`, "i").test(route);
}

function classify(route) {
  if (route === "/" || ["/en/", "/vi/"].includes(route)) return ["brand", "brand_router", "none", "journey_selection"];
  if (route.startsWith("/development/")) return ["commercial", "commercial_landing", "none", "development_enquiry"];
  if (route.startsWith("/service/")) return ["commercial", "service_chooser", "development", "service_selection"];
  if (route.startsWith("/portfolio/")) return ["proof", "proof_hub", "development", "development_enquiry"];
  if (route === "/tools/" || route === "/tools/en/" || route === "/tools/vi/") return ["tools", "tool_hub", "tool", "tool_selection"];
  if (route.startsWith("/tools/PDFTools/")) return ["pdf", isToolCategoryRoute(route, "PDFTools") ? "tool_category" : "working_tool", "cam_pdf", "tool_success"];
  if (route.startsWith("/tools/qrgen/")) return ["qr", isToolCategoryRoute(route, "qrgen") ? "tool_category" : "working_tool", "cam_pdf", "tool_success"];
  if (route.startsWith("/tools/resizeimg/")) return ["image", isToolCategoryRoute(route, "resizeimg") ? "tool_category" : "working_tool", "development", "tool_success"];
  if (route.startsWith("/tools/media/")) return ["media", isToolCategoryRoute(route, "media") ? "tool_category" : "working_tool", "development", "tool_success"];
  if (route.startsWith("/tools/video-to-text/")) return ["media", "working_tool", "development", "tool_success"];
  if (route.startsWith("/tools/document/")) return ["document", isToolCategoryRoute(route, "document") ? "tool_category" : "working_tool", "cam_pdf", "tool_success"];
  if (route.startsWith("/tools/ai/")) return ["ai", isToolCategoryRoute(route, "ai") ? "tool_category" : "working_tool", "development", "tool_success"];
  if (route.startsWith("/tools/spreadsheet/")) return ["spreadsheet", isToolCategoryRoute(route, "spreadsheet") ? "tool_category" : "working_tool", "development", "tool_success"];
  if (route.startsWith("/tools/brand/")) return ["brand_tool", isToolCategoryRoute(route, "brand") ? "tool_category" : "working_tool", "development", "tool_success"];
  if (route.startsWith("/tools/seo-screaming-toad/")) return ["seo", "software_product", "development", "repository_visit"];
  if (route.startsWith("/course/")) return ["course", route.includes("/detail/") ? "curriculum_detail" : "course_landing", "course", "course_start"];
  if (route.startsWith("/siamese_cat/dev/course/")) return ["vibe", "free_live_course", "course", "course_start"];
  if (route.startsWith("/siamese_cat/dev/courses/")) return ["vibe", route === "/siamese_cat/dev/courses/" ? "course_catalog" : "course_outcome", "course", "course_start"];
  if (route.startsWith("/Cam_PDF_Scan_Signer_QR-Gen/")) {
    if (route.includes("/guides/")) {
      const article = route.includes("/remove-camscanner-watermark-free/");
      return ["cam_pdf", article ? "product_guide" : "product_guide_hub", "cam_pdf", "play_store_click"];
    }
    const legal = route !== "/Cam_PDF_Scan_Signer_QR-Gen/";
    return ["cam_pdf", legal ? "product_support" : "product_landing", legal ? "none" : "cam_pdf", legal ? "support_resolution" : "play_store_click"];
  }
  if (route.startsWith("/blog/") || route.startsWith("/siamese_cat/dev/blog/")) return ["resources", route.endsWith("/blog/") || /\/blog\/(?:en|vi)\/$/.test(route) ? "resource_hub" : "article", "development", "contextual_next_step"];
  if (route.startsWith("/privacy/")) return ["legal", "legal_support", "none", "support_resolution"];
  if (route.startsWith("/web_promo/")) return ["commercial", "campaign_landing", "development", "development_enquiry"];
  if (route.startsWith("/siamese_cat/")) return ["proof", "creator_profile", "development", "development_enquiry"];
  return ["support", "support_page", "none", "support_resolution"];
}

function normalizeQuery(value, route, locale) {
  const cleaned = (value || "")
    .replace(/\s*[|–—-]\s*DJAI(?: Academy)?(?: Tools)?\s*$/i, "")
    .replace(/\s+/g, " ")
    .trim();
  if (cleaned) return cleaned;
  const slug = route.split("/").filter(Boolean).findLast((segment) => !["en", "vi", "th", "zh-cn", "zh-tw"].includes(segment));
  return `${(slug || "DJAI Academy").replace(/-/g, " ")} ${locale}`;
}

const inventoryByRoute = new Map(inventory.routes.map((row) => [row.route, row]));
const existingByRoute = new Map(ownership.entries.map((row) => [row.route, row]));

const entries = inventory.routes.map((routeRecord) => {
  const existing = existingByRoute.get(routeRecord.route) || {};
  const locale = existing.locale || routeLocale(routeRecord.route, routeRecord.language);
  const [cluster, pageRole, conversionTarget, primaryConversion] = classify(routeRecord.route);
  const migrationStatus = existing.migrationStatus
    || (["course", "vibe"].includes(existing.cluster || cluster)
      ? (locale === "vi" ? "retained_until_equivalent" : "pending_school_replacement")
      : "stable");
  const renderedPromise = routeRecord.description || routeRecord.h1 || routeRecord.title;

  return enrichCamPdfGuideKeyword(enrichThaiToolKeyword(enrichEnglishToolKeyword({
    ...existing,
    supportingQueries: existing.supportingQueries || [],
    competingDjaiRoutes: existing.competingDjaiRoutes || [],
    evidenceStatus: existing.evidenceStatus || "strategy_only",
    indexable: migrationStatus === "redirect_ready_pending_school_deploy"
      ? false
      : (existing.indexable ?? true),
    property: "www",
    canonical: `https://www.djai.academy${routeRecord.route}`,
    route: routeRecord.route,
    locale,
    cluster: existing.cluster || cluster,
    pageRole,
    audience: existing.audience || localeText[locale].audience,
    visitorProblem: existing.visitorProblem || localeText[locale].problem,
    primaryQueryFamily: existing.primaryQueryFamily || normalizeQuery(routeRecord.h1 || routeRecord.title, routeRecord.route, locale),
    promise: existing.promise || renderedPromise,
    conversionTarget: existing.conversionTarget || conversionTarget,
    primaryConversion,
    evidenceSource: existing.evidenceSource || "rendered_route_inventory_2026-09-06",
    validatedAt: "2026-09-06",
    migrationStatus,
  })));
});

const plannedNonIndexable = ownership.entries
  .filter((row) => !row.indexable && !inventoryByRoute.has(row.route))
  .map((row) => ({
    ...row,
    property: row.property || "www",
    canonical: row.canonical || `https://www.djai.academy${row.route}`,
    visitorProblem: row.visitorProblem || localeText[row.locale].problem,
    primaryConversion: row.primaryConversion || (row.conversionTarget === "cam_pdf" ? "play_store_click" : "contextual_next_step"),
    evidenceSource: row.evidenceSource || "strategy_contract",
    validatedAt: "2026-09-06",
    migrationStatus: row.migrationStatus || "publication_gated",
  }));

ownership.generatedAt = "2026-09-06";
ownership.entries = [...entries, ...plannedNonIndexable];

if (!writeChanges) {
  console.log(`Would synchronize ${entries.length} sitemap owners and preserve ${plannedNonIndexable.length} gated rows.`);
  console.log("Run with --write to update data/seo/keyword-ownership.json.");
} else {
  writeFileSync(ownershipPath, `${JSON.stringify(ownership, null, 2)}\n`);
  console.log(`Synchronized ${entries.length} sitemap owners and ${plannedNonIndexable.length} gated rows.`);
}

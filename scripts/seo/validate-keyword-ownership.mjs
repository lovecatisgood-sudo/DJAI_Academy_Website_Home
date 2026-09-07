import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const repositoryRoot = resolve(scriptDirectory, "../..");
const ownershipPath = resolve(repositoryRoot, "data/seo/keyword-ownership.json");
const routingPath = resolve(repositoryRoot, "data/seo/acquisition-routing.json");

const allowedLocales = new Set(["th", "en", "vi", "zh-CN", "zh-TW"]);
const allowedConversionTargets = new Set([
  "none", "tool", "cam_pdf", "development", "course", "portfolio"
]);
const allowedEvidenceStatuses = new Set([
  "verified_gsc", "directional_external", "strategy_only"
]);
const allowedRoutingTargets = new Set([
  "none", "cam_pdf", "development", "course", "school", "related_guide"
]);
const requiredRoutingClusters = [
  "pdf", "qr", "document", "ai", "spreadsheet", "seo", "image", "media", "vibe"
];
const requiredStringFields = [
  "route", "property", "canonical", "locale", "cluster", "pageRole", "audience",
  "visitorProblem", "primaryQueryFamily", "promise", "conversionTarget",
  "primaryConversion", "evidenceStatus", "evidenceSource", "validatedAt",
  "migrationStatus"
];

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function normalizePrimaryQuery(row) {
  return `${row.locale}:${row.primaryQueryFamily.trim().toLocaleLowerCase(row.locale)}`;
}

export function validateKeywordOwnership(ownership, routing) {
  const errors = [];
  const routeOwners = new Map();
  const queryOwners = new Map();

  if (ownership.version !== 1 || !Array.isArray(ownership.entries)) {
    errors.push("keyword ownership must use version 1 and contain an entries array");
  }
  if (routing.version !== 1 || !routing.clusters || typeof routing.clusters !== "object") {
    errors.push("acquisition routing must use version 1 and contain a clusters object");
  }

  const boundaries = ownership.propertyBoundaries;
  if (boundaries?.www?.publicLearningDiscovery !== false) {
    errors.push("www must not own new public learning discovery");
  }
  if (
    boundaries?.school?.publicLearningDiscovery !== true
    || boundaries?.school?.authenticatedLearning !== true
  ) {
    errors.push("School must own public learning discovery and authenticated learning");
  }
  if (!Array.isArray(ownership.plannedSchoolLearningRoutes)) {
    errors.push("plannedSchoolLearningRoutes must be an array");
  } else {
    for (const route of ownership.plannedSchoolLearningRoutes) {
      if (!/^https:\/\/school\.djai\.academy\/(?:th|en)\/(?:courses|learn)(?:\/|$)/.test(route)) {
        errors.push(`invalid planned School learning route ${route}`);
      }
    }
  }

  for (const [index, row] of (ownership.entries || []).entries()) {
    const label = row.route || `entry ${index}`;
    for (const field of requiredStringFields) {
      if (typeof row[field] !== "string" || row[field].trim().length === 0) {
        errors.push(`${label}: ${field} must be a non-empty string`);
      }
    }
    if (typeof row.route === "string" && !row.route.startsWith("/")) {
      errors.push(`${label}: route must begin with /`);
    }
    if (row.property !== "www") {
      errors.push(`${label}: current ownership property must be www`);
    }
    if (
      typeof row.route === "string"
      && typeof row.canonical === "string"
      && row.canonical !== `https://www.djai.academy${row.route}`
    ) {
      errors.push(`${label}: canonical must equal the public route`);
    }
    if (typeof row.validatedAt === "string" && !/^\d{4}-\d{2}-\d{2}$/.test(row.validatedAt)) {
      errors.push(`${label}: validatedAt must use YYYY-MM-DD`);
    }
    if (!allowedLocales.has(row.locale)) {
      errors.push(`${label}: unsupported locale ${row.locale}`);
    }
    if (!allowedConversionTargets.has(row.conversionTarget)) {
      errors.push(`${label}: unknown conversion target ${row.conversionTarget}`);
    }
    if (!allowedEvidenceStatuses.has(row.evidenceStatus)) {
      errors.push(`${label}: unknown evidence status ${row.evidenceStatus}`);
    }
    if (!Array.isArray(row.supportingQueries)) {
      errors.push(`${label}: supportingQueries must be an array`);
    }
    if (!Array.isArray(row.competingDjaiRoutes)) {
      errors.push(`${label}: competingDjaiRoutes must be an array`);
    }
    if (typeof row.indexable !== "boolean") {
      errors.push(`${label}: indexable must be boolean`);
    }

    if (["course", "vibe"].includes(row.cluster)) {
      if (row.property !== "www") {
        errors.push(`${label}: legacy learning route must remain on www before migration`);
      }
      if (row.futureProperty !== "school") {
        errors.push(`${label}: future learning owner must be School`);
      }
      if (row.locale === "vi") {
        if (row.migrationStatus !== "retained_until_equivalent" || row.futureUrl !== null) {
          errors.push(`${label}: Vietnamese learning route must remain until an equivalent locale exists`);
        }
      } else {
        const allowedMigrationStatuses = new Set([
          "pending_school_replacement",
          "redirect_ready_pending_school_deploy"
        ]);
        if (!allowedMigrationStatuses.has(row.migrationStatus)) {
          errors.push(`${label}: unsupported learning migration status ${row.migrationStatus}`);
        }
        if (row.migrationStatus === "redirect_ready_pending_school_deploy" && row.indexable) {
          errors.push(`${label}: redirect-ready learning route must not remain indexable`);
        }
        if (
          typeof row.futureUrl !== "string"
          || !row.futureUrl.startsWith(`https://school.djai.academy/${row.locale}/${row.cluster === "vibe" ? "learn" : "courses"}`)
        ) {
          errors.push(`${label}: future learning URL must use school.djai.academy and preserve locale`);
        }
      }
    }

    const routeKey = `${row.route}|${row.locale}`;
    if (routeOwners.has(routeKey)) {
      errors.push(`duplicate route-locale owner: ${routeKey}`);
    } else {
      routeOwners.set(routeKey, index);
    }

    if (row.indexable && typeof row.primaryQueryFamily === "string" && allowedLocales.has(row.locale)) {
      const queryKey = normalizePrimaryQuery(row);
      if (queryOwners.has(queryKey)) {
        errors.push(
          `primary query collision: ${queryKey} is owned by ${queryOwners.get(queryKey)} and ${row.route}`
        );
      } else {
        queryOwners.set(queryKey, row.route);
      }
    }
  }

  for (const cluster of requiredRoutingClusters) {
    const rule = routing.clusters?.[cluster];
    if (!rule) {
      errors.push(`missing acquisition routing cluster: ${cluster}`);
      continue;
    }
    if (!allowedRoutingTargets.has(rule.primary)) {
      errors.push(`${cluster}: unknown primary routing target ${rule.primary}`);
    }
    if (!allowedRoutingTargets.has(rule.secondary)) {
      errors.push(`${cluster}: unknown secondary routing target ${rule.secondary}`);
    }
    if (!new Set(["related_tool", "related_guide"]).has(rule.after)) {
      errors.push(`${cluster}: invalid after rule ${rule.after}`);
    }
  }

  if (errors.length > 0) {
    throw new Error(errors.join("\n"));
  }

  return ownership.entries.reduce((summary, row) => {
    summary[row.locale] ||= {};
    summary[row.locale][row.cluster] = (summary[row.locale][row.cluster] || 0) + 1;
    return summary;
  }, {});
}

export function formatSummary(summary, total) {
  const lines = [`Validated ${total} ownership entries.`];
  for (const locale of Object.keys(summary).sort()) {
    const counts = Object.entries(summary[locale])
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([cluster, count]) => `${cluster}=${count}`)
      .join(", ");
    lines.push(`${locale}: ${counts}`);
  }
  return lines.join("\n");
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const ownership = readJson(ownershipPath);
    const routing = readJson(routingPath);
    const summary = validateKeywordOwnership(ownership, routing);
    console.log(formatSummary(summary, ownership.entries.length));
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  }
}

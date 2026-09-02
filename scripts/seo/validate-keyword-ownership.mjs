import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const repositoryRoot = resolve(scriptDirectory, "../..");
const ownershipPath = resolve(repositoryRoot, "data/seo/keyword-ownership.json");
const routingPath = resolve(repositoryRoot, "data/seo/acquisition-routing.json");

const allowedLocales = new Set(["th", "en", "vi"]);
const allowedConversionTargets = new Set([
  "none", "tool", "cam_pdf", "development", "course", "portfolio"
]);
const allowedEvidenceStatuses = new Set([
  "verified_gsc", "directional_external", "strategy_only"
]);
const allowedRoutingTargets = new Set([
  "none", "cam_pdf", "development", "course", "related_guide"
]);
const requiredRoutingClusters = [
  "pdf", "qr", "document", "ai", "spreadsheet", "seo", "image", "media", "vibe"
];
const requiredStringFields = [
  "route", "locale", "cluster", "pageRole", "audience", "primaryQueryFamily",
  "promise", "conversionTarget", "evidenceStatus"
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

import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const repositoryRoot = resolve(scriptDirectory, "../..");
const architecturePath = resolve(repositoryRoot, "data/seo/site-architecture.json");
const routingPath = resolve(repositoryRoot, "data/seo/acquisition-routing.json");

export function validateSiteArchitecture(architecture, routing) {
  const errors = [];
  const requiredNavigation = ["build", "tools", "cam_pdf", "school", "resources"];
  const requiredToolFamilies = ["pdf", "qr", "document", "image", "media", "ai", "spreadsheet", "seo", "brand"];

  if (architecture.version !== 1) errors.push("site architecture must use version 1");
  const navigationIds = architecture.mainNavigation?.map((item) => item.id) || [];
  if (JSON.stringify(navigationIds) !== JSON.stringify(requiredNavigation)) {
    errors.push(`main navigation must be ${requiredNavigation.join(", ")}`);
  }
  if (new Set((architecture.mainNavigation || []).map((item) => item.primaryIntent)).size !== requiredNavigation.length) {
    errors.push("main navigation destinations must have distinct primary intent");
  }
  if (architecture.primaryAction?.href !== "mailto:contact@djai.academy") {
    errors.push("primary action must use the verified project enquiry mailbox");
  }
  if (architecture.mainNavigation?.find((item) => item.id === "school")?.property !== "school") {
    errors.push("School navigation must use the School property");
  }
  if (architecture.visualPolicy !== "preserve_components_and_styling") {
    errors.push("visual policy must preserve the established components and styling");
  }

  for (const [id, family] of Object.entries(architecture.pageFamilies || {})) {
    if (!family.primaryConversion || !Array.isArray(family.allowedSecondaryConversions)) {
      errors.push(`${id}: page family must define one primary and an allowed secondary conversion list`);
    }
  }

  const toolFamilyIds = Object.keys(architecture.toolFamilies || {});
  if (JSON.stringify(toolFamilyIds) !== JSON.stringify(requiredToolFamilies)) {
    errors.push(`tool families must be ${requiredToolFamilies.join(", ")}`);
  }
  for (const id of requiredToolFamilies) {
    const sequence = architecture.toolFamilies?.[id]?.sequence;
    if (!Array.isArray(sequence) || sequence[0] !== "task_result" || sequence[1] !== "related_tool") {
      errors.push(`${id}: task result and related tool must precede acquisition`);
    }
    if (/random|rotating/i.test((sequence || []).join(" "))) {
      errors.push(`${id}: acquisition sequence must be deterministic`);
    }
  }

  const validTargets = new Set(architecture.conversionTargets || []);
  for (const [cluster, rule] of Object.entries(routing.clusters || {})) {
    if (!validTargets.has(rule.primary) || !validTargets.has(rule.secondary)) {
      errors.push(`${cluster}: acquisition target is not defined by site architecture`);
    }
  }

  if (
    architecture.migrationPolicy?.requireVerifiedTarget !== true
    || architecture.migrationPolicy?.requireOneToOneRedirect !== true
    || architecture.migrationPolicy?.allowHomepageFallback !== false
    || architecture.migrationPolicy?.minimumRedirectDays < 365
  ) {
    errors.push("migration policy must require verified one-to-one targets without homepage fallback for at least 365 days");
  }

  if (errors.length > 0) throw new Error(errors.join("\n"));
  return {
    navigationItems: navigationIds.length,
    pageFamilies: Object.keys(architecture.pageFamilies).length,
    toolFamilies: toolFamilyIds.length,
  };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const architecture = JSON.parse(readFileSync(architecturePath, "utf8"));
    const routing = JSON.parse(readFileSync(routingPath, "utf8"));
    const result = validateSiteArchitecture(architecture, routing);
    console.log(`Validated ${result.navigationItems} navigation items, ${result.pageFamilies} page families, and ${result.toolFamilies} tool families.`);
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  }
}

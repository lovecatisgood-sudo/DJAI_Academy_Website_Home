import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const requiredKeywordFields = [
  ["semanticId", "semanticId-required"],
  ["intent", "intent-required"],
  ["evidence", "evidence-required"],
  ["evidenceDate", "evidenceDate-required"]
];

export function validateKeywordRecord(record) {
  return requiredKeywordFields
    .filter(([field]) => typeof record?.[field] !== "string" || record[field].trim() === "")
    .map(([, reason]) => reason);
}

export function validateTermbase(termbase) {
  const errors = [];
  if (!["zh-CN", "zh-TW"].includes(termbase?.locale)) errors.push("locale-invalid");
  if (typeof termbase?.market !== "string" || !termbase.market.trim()) errors.push("market-required");
  if (!termbase?.terms || typeof termbase.terms !== "object") return [...errors, "terms-required"];

  for (const [key, term] of Object.entries(termbase.terms)) {
    if (typeof term?.preferred !== "string" || !term.preferred.trim()) errors.push(key + ".preferred-required");
    if (!Array.isArray(term?.allowed)) errors.push(key + ".allowed-required");
    if (!Array.isArray(term?.avoid)) errors.push(key + ".avoid-required");
    if (typeof term?.context !== "string" || !term.context.trim()) errors.push(key + ".context-required");
    if (!Object.hasOwn(term, "reviewedBy")) errors.push(key + ".reviewedBy-required");
  }
  return errors;
}

export function validateLocalizationRoot(root) {
  const readJson = (relative) => JSON.parse(readFileSync(resolve(root, relative), "utf8"));
  const zhCn = readJson("content/localization/zh-CN/termbase.json");
  const zhTw = readJson("content/localization/zh-TW/termbase.json");
  const keywordMap = readJson("content/localization/keyword-map.json");
  const errors = [
    ...validateTermbase(zhCn).map((reason) => "zh-CN:" + reason),
    ...validateTermbase(zhTw).map((reason) => "zh-TW:" + reason)
  ];

  const seen = new Set();
  for (const record of keywordMap.mappings || []) {
    errors.push(...validateKeywordRecord(record).map((reason) => (record.locale || "unknown") + ":" + reason));
    const key = record.locale + ":" + record.semanticId;
    if (seen.has(key)) errors.push(key + ":duplicate-primary-intent");
    seen.add(key);
    if (!["qualitative", "quantitative"].includes(record.evidenceKind)) errors.push(key + ":evidence-kind-invalid");
    if (record.evidenceKind === "qualitative" && Object.hasOwn(record, "monthlyVolume")) {
      errors.push(key + ":qualitative-volume-forbidden");
    }
  }

  if (JSON.stringify(zhCn.terms) === JSON.stringify(zhTw.terms)) errors.push("market-termbases-must-differ");
  return errors;
}

async function main() {
  const args = process.argv.slice(2);
  const rootIndex = args.indexOf("--root");
  const root = rootIndex === -1 ? process.cwd() : args[rootIndex + 1];
  const errors = validateLocalizationRoot(root);
  if (errors.length > 0) {
    console.error(errors.join("\n"));
    process.exitCode = 1;
    return;
  }
  console.log("Chinese localization content gates passed.");
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();

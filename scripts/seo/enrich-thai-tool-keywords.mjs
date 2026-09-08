import { THAI_TOOL_QUERY_TARGETS } from "./thai-tool-query-map.mjs";

export function enrichThaiToolKeyword(row) {
  if (row.locale !== "th" || row.pageRole !== "working_tool" || !row.indexable) return row;

  const assignment = THAI_TOOL_QUERY_TARGETS[row.route];
  if (!assignment) {
    throw new Error(`${row.route}: missing Thai working-tool query assignment`);
  }

  return {
    ...row,
    primaryQueryFamily: assignment.primary,
    supportingQueries: assignment.supportingQueries,
    evidenceStatus: "directional_external",
    evidenceSource: "feature_validation_and_live_thai_serp_review_2026-09-08",
    validatedAt: "2026-09-08",
  };
}

export function assignedThaiToolRoutes() {
  return Object.keys(THAI_TOOL_QUERY_TARGETS).sort();
}

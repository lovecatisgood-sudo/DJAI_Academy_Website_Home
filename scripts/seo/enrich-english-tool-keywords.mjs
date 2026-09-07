import { ENGLISH_TOOL_QUERY_TARGETS } from "./english-tool-query-map.mjs";

export function enrichEnglishToolKeyword(row) {
  if (row.locale !== "en" || row.pageRole !== "working_tool" || !row.indexable) return row;

  const assignment = ENGLISH_TOOL_QUERY_TARGETS[row.route];
  if (!assignment) {
    throw new Error(`${row.route}: missing English working-tool query assignment`);
  }

  return {
    ...row,
    primaryQueryFamily: assignment.primary,
    supportingQueries: assignment.supportingQueries,
    evidenceStatus: "directional_external",
    evidenceSource: "feature_validation_and_live_serp_review_2026-09-07",
    validatedAt: "2026-09-07",
  };
}

export function assignedEnglishToolRoutes() {
  return Object.keys(ENGLISH_TOOL_QUERY_TARGETS).sort();
}

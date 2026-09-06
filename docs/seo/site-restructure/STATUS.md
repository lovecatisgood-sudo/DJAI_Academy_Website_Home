# DJAI Site Restructure — Status

**Active branch:** `codex/djai-site-restructure`  
**Active worktree:** `website_DJAI_HOME/.worktrees/djai-site-restructure`  
**Current phase:** R7 release candidate verification; English free-tool SEO complete

| Work item | Status | Evidence / next action |
| --- | --- | --- |
| 1. Intent, baseline, and gates | COMPLETE | Baseline build/test/audit recorded in `BASELINE-2026-09-06.md` |
| 2. Rebase prepared implementation | COMPLETE | Rebased onto `origin/main` at `763de3f`; duplicate policy commit dropped |
| 3. Correct public-learning ownership | COMPLETE | School is the future public owner; www routes remain live until verified replacements; Vietnamese routes cannot cross-locale redirect |
| 4. Complete public route ownership | COMPLETE | 339 release-candidate sitemap owners, 6 gated guides, and 6 explicit redirect-only learning records; rendered inventory has zero 200/title/H1/description/canonical gaps and zero duplicate same-language H1 groups |
| 5. Site architecture and routing contract | COMPLETE | Five navigation destinations, ten page families, nine tool families, deterministic routing and migration safeguards validate |
| 6. Main header and footer links | COMPLETE | Original visual shells retained; five destinations, live locale-safe School links, legal/contact controls, desktop/mobile rendering, and full build/link audit verified |
| 7. Main homepage linking hierarchy | COMPLETE | Thai, English, and Vietnamese retain the original composition while using a descriptive H1, commercial primary action, and distinct Tools/Cam PDF/School journeys; English now uses the shared shell |
| 8. Development/Service/Portfolio | COMPLETE | Development owns the proposition, Service chooses categories, and Portfolio proves work then routes to Development; Cam proof now strengthens its product page; broken hotel proof link removed |
| 9. Tool hub taxonomy | COMPLETE | Nine unique task categories cover existing routes without URL changes; duplicate SEO self-link, live Favicon “coming soon” claim, legacy learning nav, broken hotel link, and missing Vietnamese media family corrected |
| 10. Tool post-success routing | COMPLETE | All five tool packages build/test green; related-tool-first routes are deterministic; utility shells preserve existing classes while routing to Development, Cam PDF, or School; sensitive event contracts carry stable dimensions only |
| 10a. English free-tool search discovery | COMPLETE_LOCAL | All 92 English working tools own one distinct long-tail primary query plus three supporting queries; 11 routes use verified Search Console evidence and 81 use directional feature/SERP evidence. Priority titles, descriptions, and hub links are improved without changing tool behavior or non-English copy. Fresh inventory has zero missing/duplicate English titles, descriptions, H1s, or canonicals and zero snippet-length outliers. |
| 11. Cam PDF product page | COMPLETE | Re-verified against the live Play listing on 2026-09-06; current version/date/access/purchase claims, privacy/terms, tracked Play journey, image weight, sitemap freshness, build, full visual review, and zero-violation desktop/mobile axe checks pass |
| 12. Cam PDF guides/locales | BLOCKED | Correctly withheld: detailed workflows still require version-identifiable end-to-end captures, failure/recovery evidence, and fluent review; reserved routes remain non-indexable and absent from the sitemap |
| 13. School source reconciliation | COMPLETE | Clean School worktree `codex/djai-school-public-course-discovery` separates public `/learn` discovery from authenticated `/courses` and `/classroom`; reconciliation is recorded in the School repository |
| 14. School public course discovery | COMPLETE_LOCAL | Thai/English hubs, live-vibe interest, and three exact-outcome routes build and return anonymous 200s with self-canonicals, reciprocal hreflang, structured data, one H1, and no private-route exposure; Chinese remains withheld for fluent review |
| 15. Learning URL migration | READY_FOR_RELEASE | Commit `a16b3a9` adds six exact permanent redirects plus direct alias handling, removes legacy URLs from the sitemap, marks them non-indexable in the ownership manifest, and preserves query strings; deploy School first |
| 16. Resource/internal-link cleanup | COMPLETE | Live internal references now use School `/learn`, Cam PDF's real product route, and the existing English media route; dead Hotel links were removed from served content while historical records remain intact |
| 17. Technical, accessibility, visual, performance QA | COMPLETE_LOCAL | Full main test/build and Hostinger audit pass; School build/typecheck/lint plus 467 relevant tests pass; mobile/desktop browser and axe samples are clean; local response and bundle evidence recorded in gates |
| 18. Independent GPT-5.6 Luna max review | BLOCKED | Current session exposes no sub-agent launcher; do not mark complete without a real independent review or explicit user waiver |
| 19. Final reconciliation and production release | READY_WITH_HOLDS | Release candidate is prepared. Hold deployment until the requested independent review can run; deploy School first, verify ten targets, then deploy www redirects and smoke-crawl both properties |

## Context recovery

1. Read `PROJECT_INTENT.md`, `STATUS.md`, and `GATES.md`.
2. Read the two 2026-09-06 parent design/plan documents.
3. Run `git status -sb` and `git log --oneline -5` in this worktree.
4. Resume only the row marked `IN_PROGRESS`.
5. Record red/green test evidence and commit SHA before advancing the row.

# DJAI Site Restructure — Status

**Active branch:** `codex/djai-site-restructure`  
**Active worktree:** `website_DJAI_HOME/.worktrees/djai-site-restructure`  
**Current phase:** R2 Development, Service, and Portfolio validation

| Work item | Status | Evidence / next action |
| --- | --- | --- |
| 1. Intent, baseline, and gates | COMPLETE | Baseline build/test/audit recorded in `BASELINE-2026-09-06.md` |
| 2. Rebase prepared implementation | COMPLETE | Rebased onto `origin/main` at `763de3f`; duplicate policy commit dropped |
| 3. Correct public-learning ownership | COMPLETE | School is the future public owner; www routes remain live until verified replacements; Vietnamese routes cannot cross-locale redirect |
| 4. Complete public route ownership | COMPLETE | 345 live sitemap owners plus 6 gated guides; rendered inventory has zero 200/title/H1/description/canonical gaps and zero duplicate same-language H1 groups |
| 5. Site architecture and routing contract | COMPLETE | Five navigation destinations, ten page families, nine tool families, deterministic routing and migration safeguards validate |
| 6. Main header and footer links | COMPLETE | Original visual shells retained; five destinations, live locale-safe School links, legal/contact controls, desktop/mobile rendering, and full build/link audit verified |
| 7. Main homepage linking hierarchy | COMPLETE | Thai, English, and Vietnamese retain the original composition while using a descriptive H1, commercial primary action, and distinct Tools/Cam PDF/School journeys; English now uses the shared shell |
| 8. Development/Service/Portfolio | IN_PROGRESS | Validate prepared proposition/chooser/proof separation and all proof links |
| 9. Tool hub taxonomy | NOT_STARTED | Group existing routes without URL migration |
| 10. Tool post-success routing | NOT_STARTED | Validate each family and sensitive-data event contract |
| 11. Cam PDF product page | NOT_STARTED | Verify app evidence and legal consistency |
| 12. Cam PDF guides/locales | NOT_STARTED | Requires first-party screenshots and fluent review |
| 13. School source reconciliation | NOT_STARTED | Live locale routes differ from current local reference |
| 14. School public course discovery | NOT_STARTED | Separate clean School worktree required |
| 15. Learning URL migration | NOT_STARTED | Requires live verified School targets and one-to-one map |
| 16. Resource/internal-link cleanup | NOT_STARTED | Run only after migration decisions stabilize |
| 17. Technical, accessibility, visual, performance QA | NOT_STARTED | Full crawl/build/browser evidence required |
| 18. Independent GPT-5.6 Luna max review | BLOCKED | Current session exposes no sub-agent launcher; do not mark complete without a real independent review or explicit user waiver |
| 19. Final reconciliation and production release | NOT_STARTED | Requires every mandatory gate and fresh post-change audit |

## Context recovery

1. Read `PROJECT_INTENT.md`, `STATUS.md`, and `GATES.md`.
2. Read the two 2026-09-06 parent design/plan documents.
3. Run `git status -sb` and `git log --oneline -5` in this worktree.
4. Resume only the row marked `IN_PROGRESS`.
5. Record red/green test evidence and commit SHA before advancing the row.

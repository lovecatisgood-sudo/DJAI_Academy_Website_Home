# DJAI Site Restructure — Gates

Each completed gate records the command or inspection result and the exact repository state it covers.

## Baseline

- [x] G01 — Isolated main-site branch based on current production main.
  - CHECK: `git rev-list --left-right --count origin/main...HEAD`
  - EVIDENCE: `0 15` after rebase; worktree clean before new implementation.
- [x] G02 — Prepared source and integration suites pass against generated output.
  - CHECK: `npm test`
  - EVIDENCE: exit 0 on 2026-09-06 after full build.
- [x] G03 — Complete Hostinger build succeeds.
  - CHECK: `npm run build`
  - EVIDENCE: exit 0; homepage, promo, course, QR, image, PDF, media, document, Siamese Cat, and AdSense build stages completed.
- [x] G04 — Production-style route audit passes.
  - CHECK: `npm run verify:hostinger`
  - EVIDENCE: 323 pages, 22 redirects, 345/345 sitemap URLs reachable, 522 internal links/assets.

## Architecture and SEO

- [ ] G05 — Every public sitemap URL has one page role and primary query-family owner.
  - CHECK: ownership validator plus build-derived route coverage test.
  - EXPECT: zero missing owners, duplicate route-locale owners, or duplicate primary query owners within a locale.
- [ ] G06 — Main navigation and footer follow the approved five-destination architecture.
  - CHECK: source contract, browser keyboard inspection, mobile screenshot comparison.
  - EXPECT: project enquiry primary; School link crawlable; no broken locale destination.
- [ ] G07 — Homepage remains visually familiar and routes four distinct journeys.
  - CHECK: before/after desktop and mobile screenshots plus content contract.
  - EXPECT: no visual redesign; one descriptive H1; Development primary; Tools, Cam PDF, and School secondary.
- [ ] G08 — Development, Service, and Portfolio have non-overlapping page roles.
  - CHECK: commercial intent test, rendered metadata comparison, internal-link audit.
  - EXPECT: proposition, chooser, and proof roles remain distinct.
- [ ] G09 — Tools remain functional and utility-first.
  - CHECK: one representative workflow per distinct tool engine, output/download checks, routing tests.
  - EXPECT: task completion unchanged; related tool precedes contextual bridge; no random promotion.
- [ ] G10 — Cam PDF acquisition claims are verified.
  - CHECK: released app behavior, first-party screenshots, policy/product diff, Play link tests.
  - EXPECT: every visible capability and privacy statement supported.

## School and migration

- [ ] G11 — School deployable source matches live locale behavior.
  - CHECK: production SHA/branch reconciliation, live/source route table, sitemap and middleware tests.
  - EXPECT: unexplained differences zero.
- [ ] G12 — Thai and English School course pages are public, equivalent, and safe.
  - CHECK: anonymous browser test, metadata/hreflang/sitemap audit, fluent-language review.
  - EXPECT: 200, self-canonical, reciprocal alternates, no private route exposure.
- [ ] G13 — Every learning redirect is one-to-one and direct.
  - CHECK: migration-map validator plus production-like HTTP test.
  - EXPECT: one permanent hop; no homepage dumping, chain, locale mismatch, or missing target.

## Quality and release

- [ ] G14 — Accessibility and minimal-UI visual review passes.
  - CHECK: axe/Playwright plus manual keyboard and before/after screenshot comparison.
  - EXPECT: no critical/serious issue introduced; headers/footers recognizable and operable.
- [ ] G15 — Loading performance has no material regression.
  - CHECK: production bundle comparison and Lighthouse/PageSpeed sampling on representative pages.
  - EXPECT: no new blocking dependency, oversized hero asset, layout shift, or material metric regression caused by this branch.
- [ ] G16 — Dependency risk is assessed rather than automatically rewritten.
  - CHECK: package-level `npm audit` review and build/runtime relevance analysis.
  - EXPECT: findings documented; no blind `--force` upgrade.
- [ ] G17 — Independent GPT-5.6 Luna max review reports no unresolved material fault.
  - CHECK: real reviewer report against base/head SHAs plus root-agent verification of every finding.
  - STATUS: BLOCKED because the sub-agent launcher is unavailable in this session.
- [ ] G18 — Fresh final reconciliation passes.
  - CHECK: original user request and `PROJECT_INTENT.md` compared directly with final repositories and live candidates.
  - EXPECT: no material mismatch or stale audit after later changes.
- [ ] G19 — Production deployment and smoke crawl pass.
  - CHECK: deployed SHA, both sitemaps, representative conversions, all mapped redirects, and rollback reference.
  - EXPECT: zero broken public route or critical conversion path.

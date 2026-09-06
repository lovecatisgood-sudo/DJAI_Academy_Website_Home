# Dependency risk assessment — 2026-09-06

This assessment records existing package findings without applying a blind `npm audit fix --force` across unrelated applications.

## Production dependency findings

| Package | Finding | Current relevance | Release treatment |
| --- | --- | --- | --- |
| Homepage and PDF bundles | Transitive `nanoid` below 3.3.18; high-severity advisory for a zero-length custom generator loop | No new dependency or call site was introduced by the SEO restructure | Track as a focused lockfile update with bundle regression tests |
| Document tools | Transitive `nanoid` plus `@xmldom/xmldom` serialization advisory | Existing conversion dependencies; no SEO-change exposure added | Upgrade the owning dependency chain separately and rerun document conversion fixtures |
| School | Prisma/deepmerge, Browserslist, AJV/fast-uri, fflate, and qs advisories | Existing application dependencies outside the public-learning implementation; several fixes cross direct or major dependency boundaries | Handle in a dedicated dependency-hardening change with database, auth, archive, and build verification |

The production audits reported no critical advisories. Findings remain real and should not be described as fixed. They do not originate in this branch, and forced package rewrites are not part of the SEO release candidate.

## Build and performance evidence

- No new third-party runtime library was added by the restructure.
- The main Hostinger build completed across homepage, voice promo, course, QR, image, PDF, media, document, and Siamese Cat bundles.
- The School browser icon was reduced from 352 KB to 51 KB by reusing an existing visually identical asset.
- Representative warm local responses returned 200 with 8–15 ms TTFB and 8–16 ms total response time. HTML sizes ranged from 33 KB to 97 KB on the sampled main pages and 57 KB to 63 KB on the sampled School pages.
- These are regression checks on a local production build, not field Core Web Vitals or a traffic forecast.

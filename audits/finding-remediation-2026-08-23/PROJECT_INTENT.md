# Project intent

## Goal

Finish the verified post-deployment technical remediation without changing public URLs, page content, layout, forms, tool behavior, or commercial meaning.

## Authoritative sources

- User request: proceed with the verified fixes without bugs, conflicts, missing content, broken pages, or layout changes.
- `website_DJAI_HOME/audits/site-course-interest-2026-08-23/POSTDEPLOY_FINDINGS_VALIDATION_AND_FIX_PLAN.md` in the shared workspace.
- Current production source at commit `4f44265`.
- DJAI content/SEO rules and the `not-dumber-please` completion contract.

## Non-negotiable invariants

- Keep the complete sitemap URL inventory and every current route.
- Do not change page components, stylesheets, visible copy, course form behavior, or privacy content.
- Do not invent locale alternates for translations that do not exist.
- Keep reciprocal validation strict for declared locale clusters.
- Do not claim the external email provider is operational without provider configuration, a live 200 submission, and inbox confirmation.

## Required outcomes

- The Siamese Cat Dev course pair reports the actual 23 August 2026 release date in the sitemap.
- The English Cam PDF policy remains at 21 August; the unchanged Thai policy remains honestly dated 20 August.
- The generic audit scanner accepts valid TH/VI and standalone-VI locale models while still rejecting genuinely non-reciprocal pairs.
- The course-interest endpoint can deliver through the existing Hostinger SMTP environment when Resend is not configured, while retaining its fixed recipient and abuse controls.
- Build, lint, route, sitemap, canonical, locale, content-preservation, and crawl-graph gates pass.

## Exclusions

- No provider credentials, dashboard access, browser automation, redesign, copy rewrite, route migration, or tool-engine change.
- Adding the already-used `nodemailer` package to the root runtime is allowed only for the verified SMTP fallback; no unrelated dependency is upgraded.

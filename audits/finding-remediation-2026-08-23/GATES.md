# Acceptance gates

- [x] G1: clean release base equals current `origin/main` (`4f44265`).
- [x] G2: only the two Siamese Cat Dev course sitemap entries change to `2026-08-23`; URL count and unrelated dates remain unchanged.
- [x] G3: standalone Vietnamese and TH/VI clusters produce no false locale issues.
- [x] G4: a real EN/TH missing-reciprocal fixture still fails.
- [x] G5: changed production files are limited to sitemap/audit/tests; no page or stylesheet changes.
- [x] G6: focused tests and lint pass with zero errors.
- [x] G7: full production build and composite route audit pass: 323 pages, 14 redirects, 345 sitemap URLs, all 345 reachable, 268 slash redirects, and 504 internal links/assets.
- [x] G8: course and privacy routes retain 200, H1, canonical, language, schema/content markers, and layout source.
- [x] G9: fresh reconciliation passes for the exact final state.
- [x] G10: Resend remains primary; SMTP fallback sends only to `app@school.djai.academy` with learner email as Reply-To.
- [x] G11: missing/failed providers return a retryable 502; origin, validation, honeypot, and rate-limit tests remain passing.
- [x] G12: the second full production build and composite 345-URL integration audit pass after the email-transport change.

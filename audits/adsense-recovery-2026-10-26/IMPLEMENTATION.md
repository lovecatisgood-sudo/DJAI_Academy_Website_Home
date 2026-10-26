# DJAI AdSense recovery repair — 26 October 2026

Base: `f4d15986dac5214796db27ba35d1ff40da443d52` (`origin/main` when work started).
Branch: `codex/adsense-recovery-20261026`.
Property: `https://www.djai.academy/`. School and Café properties are outside this repair.

## Confirmed public defects

- `/web_promo/` and `/web_promo/vi/` returned 502 during the sequential public crawl.
- `/healthz` was degraded: the voice-promotion child was not ready and had over 6,000 restarts, with exit code 0. This proves repeated child failure; hosting internals explaining the exit are not available.
- The website privacy pages described current ad requests and advertising consent, while code and public HTML showed ad serving disabled and an analytics-only choice.
- Chinese consent copy offered acceptance of all categories and described active advertising, although the component only stores analytics consent and always denies advertising.
- The promotion layout loaded Google Analytics unconditionally, unlike the main site's analytics consent behavior.
- The static English app privacy fallback had no canonical link.
- The Thai app policy already had noindex and pointed at the English policy canonical, but remained in the sitemap and advertised nonreciprocal language alternates.
- `ADSENSE_SETUP.md` instructed operators to enable Auto ads, contradicting the recovery release.

Full passive crawl: `live-before.json`. It records 364 sitemap URLs, all reachable from home, no AdSense loaders or manual units in initial HTML, and 351 publisher tags. The first parser treated a missing ownership tag on any page as an error. That overstrict check was corrected: ad-free pages do not each need an ownership tag. This diagnostic finding is not a Google violation.

## Implemented changes

1. Run both Next request handlers inside the public Node process. Retain both apps' runtime dependencies and build directories; discard build caches and redundant standalone copies. Enforce production environment semantics before loading Next. Retry preparation up to three times with fresh app instances and report actual attempts/retries. Report readiness for both in `/healthz`; return retryable 503 while preparing and contain request failures. Bound preparation to 45 seconds, close to 5 seconds and process shutdown to 10 seconds. A timed-out preparation cannot safely be canceled within Next, so it terminates the public process with exit 1 after bounded cleanup rather than retry beside a late handler. A failed or timed-out cleanup also aborts startup recovery, so another instance cannot start alongside uncleared resources.
2. Preserve routing, APIs, authentication, layouts, navigation, tools, pricing, store links and the AdSense serving pause. No advertising component or loader has been enabled.
3. Align website privacy copy in English, Thai and Vietnamese with actual disabled-ad behavior. Align Chinese privacy/consent wording without changing its existing review-gated indexing status. Preserve rights/contact and historical provider-retention statements.
4. Let promotion and all mounted tool/course/development Analytics load only after the existing, unexpired main-site analytics choice. Both tracked image hub templates and all generated translations inherit the shared gate; the promotion keeps a standalone inline equivalent. Missing, malformed, refused, expired and future-dated choices load no Analytics script; advertising consent stays denied. Visitors can manage the shared choice on the main site's privacy page.
5. Add a canonical to the static app policy fallback, preserving the policy JSON and all policy body text. Keep the existing Thai route reachable and noindex; remove it from the sitemap and remove inappropriate hreflang. Update the ownership record and validate documented noindex canonical aliases.
6. Add a passive, exact-host public audit command and tests. It makes no tool submissions, ad requests, account changes or review requests. Reports explicitly leave account status unverified.
7. Correct deployment and AdSense operating instructions.

## Verification

- Full root `npm run build`: passed for all applications; recovery verifier passed 449 static index pages.
- Promotion `npm run next:build`: passed after the consent change, including TypeScript and lint checks.
- Root `npm test`: passed. The existing app-policy test had a stale no-analytics-switch assertion; it now checks the already-published iOS build 70 disclosure and Android distinction. Product policy content was not rewritten.
- Final unsandboxed `npm test`: passed the complete regression suite, including the newly integrated audit/consent suite. The consent/readiness suite has 11 passing scenarios; lifecycle has 9.
- Promotion source/schema/type checks: passed. Its package-level `hostinger:build` also runs database migration and live-schema checks; these were not run without the production provider environment. Root Hostinger build uses the verified `next:build` path.
- In-process lifecycle tests: preparation, concurrent start, retryable unavailable responses, request errors and stop behavior passed.
- `npm run verify:hostinger`: passed 327 routes, 28 redirects, 363 sitemap URLs all reachable from home, 262 slash redirects, 562 internal links/assets and admin API authentication.
- Independent local HTTP crawl: 363 pages, zero reported technical issues. `local-after.json` includes an `ok` health response, both apps prepared in the same PID, zero restarts/retries and zero serving markup. This report uses an explicitly recorded localhost fetch adapter, not the public-only CLI. Startup was tested with `NODE_ENV=development`; the production entry point correctly enforces production behavior.
- Rendered checks: English/Thai/Vietnamese website privacy statements match disabled ads; promotion HTML has the persisted-consent gate and no unconditional Analytics loader. All 449 static tool outputs are checked for direct-loader bypasses; seven mounted app families and the shared script were also checked through HTTP.
- Body-text hash comparison against the pre-release public crawl: only the three intended website privacy pages changed among previously-200 sitemap pages. Header/footer/style sources are unchanged.
- No connected browser surface was available. Visual inspection, interactive tool completion, live Google account configuration, and external provider receipt were not verified by this repair.

## Remaining account and release work

- AdSense **Sites → djai.academy** status and exact issue are unknown. Policy center, signed-in publisher identity, Auto ads settings and CMP configuration are unverified.
- Read those values in the user's signed-in account; connect/verify the existing publisher if required. Do not invent or change IDs from an email address.
- A full quality/rejection resolution cannot be asserted from an HTTP crawl or code change. Apply any additional remediation named in Google's actual notice before requesting review.
- Request review once when the issue has been addressed. If the site is already getting ready, preserve that submission. If ready, validate consent/CMP and choose a small, deliberate ad placement rollout separately.
- Current state before integration: local changes verified; no Google account changes, no review submitted, no public release verified.

## Release and rollback checks

Use the complete root build and start commands from `HOSTINGER_DEPLOYMENT.md`.
The promotion runtime now needs its own `node_modules/next` alongside `.next`.
After release, verify `/healthz` reports both apps in-process, both promotion
locales return 200, privacy descriptions match the update, `ads.txt` is unchanged,
the English app-policy canonical exists, and the noindex Thai policy is absent
from the public sitemap. A Git push alone is not evidence of deployment.

Rollback target before this repair: `f4d15986dac5214796db27ba35d1ff40da443d52`.
Use a normal revert/redeploy if a confirmed production regression occurs; do not
reset or overwrite unrelated work. The rollback target has the observed promotion
service defect, so record that consequence when selecting recovery actions.

Independent review initially identified missing package source invariants, incomplete tool consent coverage, startup retry/isolation risk, and production environment semantics. These were addressed and regression checked; final focused re-review confirmed the cleanup-overlap defect resolved and found no remaining lifecycle blocker. A fatal failure in either in-process runtime can still terminate the public process. Hostinger process restart policy/quota and browser visual checks remain provider-side verification gaps; do not claim those are configured or tested.

Known limits: the older promotion Next runtime emits a standalone-configuration
warning when prepared as a custom handler; actual route and API/auth audits pass
with its complete build/runtime tree retained. Existing dependency audit warnings
also remain; this repair does not claim a dependency-security audit.

Official guidance checked during this repair:

- https://support.google.com/adsense/answer/12176698
- https://support.google.com/adsense/answer/12170222
- https://support.google.com/adsense/answer/10502938
- https://support.google.com/adsense/answer/12169212

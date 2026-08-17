# DJAI Voice Sales Agent V1 Code Review Findings

Review date: 2026-07-13

Scope: read-only review of the current repository against `DJAI_Voice_Agent_V1_Build_Spec.md`, `ACCEPTANCE.md`, and the production architecture described in the project documents. The review covered the session/token route, WebRTC widget, Realtime tool events, lead and transcript persistence, cache and rate limits, admin authentication/settings, migrations, deployment scripts, and the Thai/English landing-page integration.

Three independent read-only `gpt-5.6-luna` reviews were run in parallel and their findings were reconciled against the source. No application source files were edited. This file is the only requested review artifact.

## Findings

### F-01 - High: `capture_lead` can be processed more than once for one Realtime tool call

`public/djai-voice-widget.js:258-280` processes `response.function_call_arguments.done`, then also processes any `event.item` or `event.response.output` function-call item at lines 273-280. Realtime emits multiple events for one function call, including the completed arguments event and output-item/response completion events. There is no processed-call-id guard.

Impact: one model tool call can produce multiple `/api/lead` requests and multiple `response.create` events. The unique database index masks some duplicate rows, but it does not prevent duplicate UI messages, repeated writes, or invalid overlapping Realtime responses. A lead capture can therefore interrupt or confuse the conversation.

### F-02 - High: lead-tool failures can leave the Realtime response unresolved

At `public/djai-voice-widget.js:264-280`, malformed JSON causes the event handler to throw, and a rejected `postLead()` only adds a local error message. The failure path does not send a `function_call_output` event or a follow-up `response.create`.

Impact: if `/api/lead` is unreachable, the browser loses connectivity, or the model emits malformed arguments, the Realtime model can remain waiting for tool output. The visitor may hear silence and the call cannot recover without ending it.

### F-03 - High: dropped WebRTC/data-channel calls are not closed or persisted

The peer failure handler at `public/djai-voice-widget.js:359-363` only changes the visual state. Server error events at lines 284-287 do the same. There is no handling for `disconnected`/`closed`, no data-channel close handler, and no automatic `endCall()` or transcript save.

Impact: a network or OpenAI failure can leave the microphone and controls active while losing the required conversation transcript. Persistence currently occurs through `endCall()` at lines 464-492 or a later `pagehide` event, so a failed call that remains open can be lost.

### F-04 - High: the daily session cap is race-prone

`src/app/api/session/route.ts:72-80` counts today’s conversations, and lines 104-107 compare the count to the cap. The request then mints an OpenAI token at lines 118-168 and inserts the conversation stub only at lines 209-214.

Impact: concurrent requests can all observe available capacity and pass the check before any of them inserts a row. The configured `daily_session_cap` is therefore not a reliable upper bound. This also creates a window where token minting occurs before the database reservation is made.

### F-05 - High: max call length is enforced only by mutable browser JavaScript

The server returns `maxCallSeconds` at `src/app/api/session/route.ts:216-224`. The actual limit is a browser timer at `public/djai-voice-widget.js:210-224`; the API does not enforce the duration, and the signed context only expires at `src/app/api/session/route.ts:112` using `max_call_seconds + 900`.

Impact: a caller can modify or bypass the widget timer and continue a Realtime call beyond the configured maximum. This defeats an operational cost/control setting. The conversation endpoint also accepts client-provided duration without an upper bound.

### F-06 - High: public CORS fails open when the allowlist is missing

`src/lib/cors.ts:7-10` defaults `WIDGET_ALLOWED_ORIGINS` to `*`, and lines 52-54 return `Access-Control-Allow-Origin: *`. `scripts/verify-env.mjs:50-53` treats the variable as optional and only warns when it is absent.

Impact: any website can call the public session endpoint from a browser and read an ephemeral Realtime client secret. This makes OpenAI usage and cost abuse easier if the production environment is missing or mistyped. The production deployment check should fail closed rather than advertise a wildcard fallback.

### F-07 - High: IP rate limiting trusts client-supplied forwarding headers

`src/app/api/session/route.ts:13-16` uses the first `x-forwarded-for` value, then uses the same value for the in-memory rate-limit key and the OpenAI `OpenAI-Safety-Identifier` at lines 87 and 123. There is no proof that the header was written by a trusted proxy.

Impact: where the front proxy preserves caller-supplied forwarding headers, a caller can rotate the header to bypass the 12-per-hour limit and poison the safety identifier. The code needs a trusted-proxy assumption enforced by the deployment or must use a server-provided client address.

### F-08 - High: admin login has no brute-force protection

`src/app/admin/actions.ts:18-27` validates every username/password attempt directly against environment credentials and redirects on failure. The rate limiter is only used by `/api/session`; there is no login throttling, lockout, audit event, or attempt budget.

Impact: the public `/admin/login` endpoint can be attacked with unlimited password guesses. Single-admin authentication is the control protecting leads, transcripts, and the knowledge document, so this is a production security gap.

### F-09 - High, deployment-dependent: settings cache invalidation is process-local

`src/lib/settings-cache.ts:4-23` stores one module-level cache. Invalidation at `src/app/admin/actions.ts:68` and `src/app/api/admin/settings/route.ts:37` only reaches the process handling the save.

Impact: if Hostinger runs more than one worker or instance, other processes can continue serving stale knowledge, model, limits, greeting, or kill-switch state indefinitely. The implementation satisfies a single-process interpretation of the spec, but it is unsafe if the Node app is scaled or restarted behind multiple workers without a single-process guarantee.

### F-10 - Medium: the in-process rate limiter is bypassable across processes and has unbounded key retention

`src/lib/rate-limit.ts:6-28` stores counters in a process-local `Map`. Expired entries are only replaced when the same key is seen again; there is no cleanup pass or maximum map size.

Impact: limits reset on restart and are independent per worker, so they cannot protect a deployment with multiple processes. Many unique spoofed IP values can also accumulate in memory for the lifetime of the process.

### F-11 - Medium: the signed session context is a replayable bearer credential

`src/app/api/session/route.ts:216-224` returns the signed context to the browser. `src/lib/session-context.ts:34-69` validates only the HMAC and expiry; it does not track one-time use, call state, or a capture count. `/api/lead` has no route-level rate limit at `src/app/api/lead/route.ts:13-44`.

Impact: anyone who obtains a valid browser context can submit fabricated or repeated leads with different contact values until expiry. The browser must mediate the Realtime tool call, but the server currently cannot distinguish a real model-proposed call from a direct forged POST. This can pollute the lead database and create abuse costs.

### F-12 - Medium: lead and conversation state can become inconsistent

`src/app/api/lead/route.ts:20-24` sets `conversations.had_lead = true` in one database request, then inserts the lead in a second request at lines 26-42. There is no transaction around both operations.

Impact: if the lead insert fails after the conversation update succeeds, the dashboard reports a lead even though no lead row exists. The conversation detail can then show a lead badge without a captured-lead card.

### F-13 - Medium: conversation persistence accepts unbounded and largely client-controlled data

`src/app/api/conversation/route.ts:13-22` parses the complete request body before any truncation. The route has no content-length limit or request rate limit. It accepts arbitrary duration at lines 59-60, arbitrary page URL at line 61, and arbitrary role strings at lines 29-42; the stored transcript is then completely overwritten at lines 86-92.

Impact: a valid session context can be used to submit large transcript payloads, misleading durations, arbitrary roles, or repeated overwrites. This creates storage/processing abuse and corrupts reporting. Duration should be bounded and transcript roles should be allowlisted to `user`, `assistant`, `tool`, or `system`.

### F-14 - Medium: the required inline `capture_lead` marker is not stored

The widget records a generic system message at `public/djai-voice-widget.js:251-255`, but never records a transcript item with role `tool`, the function name, or the call id. The admin detail page at `src/app/admin/conversations/[id]/page.tsx:67-80` only renders what was stored.

Impact: the conversation detail cannot show where `capture_lead` fired, despite the spec requiring an inline marker. A reviewer cannot distinguish a normal system message from the actual lead event.

### F-15 - Medium: the kill switch is not immediate for an already-loaded widget

`public/djai-voice-widget.js:417-431` checks `/api/session` only once during controller construction. If disabled, it merely disables the start button at lines 424-426. Existing widgets are not hidden and active calls are not ended. New sessions are correctly rejected by `src/app/api/session/route.ts:100-102`.

Impact: the backend kill switch blocks new token minting but does not satisfy the acceptance wording that the widget hides immediately, and it does not stop an already active call. A page loaded before the admin save can continue to display and use the agent.

### F-16 - Medium: the Thai/English landing selection is not passed to the voice session

`public/assets/js/promo.js:414-424` stores the selected language, but `public/djai-voice-widget.js:326-330` sends only `pageUrl` to `/api/session`. The widget immediately requests a greeting at lines 367-370, while the seeded greeting in `scripts/migrate.mjs:209` is English.

Impact: the Thai-default landing page can start a call with an English greeting before the visitor has spoken. The prompt can auto-detect language after that, but the first-turn experience does not honor the page’s selected/default language.

### F-17 - Medium: the authenticated settings PATCH route accepts unsafe configuration values

`src/app/api/admin/settings/route.ts:21-35` accepts arbitrary voice, language, model, and transcription strings; negative/zero limits; and unbounded greeting/knowledge text. The server action clamps some values at `src/app/admin/actions.ts:43-49`, but the API route does not share that validation.

Impact: an authenticated caller using the PATCH route can disable the browser timeout with a negative max-call value, make every new session fail with an invalid model or voice, or store oversized prompt content. Validation must be identical across both settings write paths.

### F-18 - Medium: untrusted page URL text is interpolated into the system prompt

`src/app/api/session/route.ts:110-111` accepts arbitrary `pageUrl` text, and `src/lib/prompt.ts:124-126` places it directly into the prompt. The injection-resistance rule at lines 115-116 only describes visitor speech and does not identify the dynamic page URL as untrusted data.

Impact: a caller can submit instruction-like URL/query text and attempt to influence the model’s system context. The value should be parsed and reduced to a validated origin/path, or explicitly delimited as untrusted metadata.

### F-19 - Medium: health and deployment checks can report false readiness

`src/app/api/health/route.ts:6-19` always returns `ok: true` without checking Neon, the settings row, migration state, or OpenAI credentials. In addition, the GET session status route converts all settings/database errors into HTTP 200 with `agentEnabled: false` at `src/app/api/session/route.ts:41-69`. The production build script at `package.json:25` does not run `typecheck`.

Impact: monitoring can report a healthy service while voice sessions are unavailable, and deployment can complete without catching TypeScript errors. The existing public smoke test therefore provides only asset/CORS evidence, not runtime readiness.

### F-20 - Medium: every production build mutates the production database without transaction/version tracking

`package.json:25` runs `npm run migrate` as part of the build. `scripts/migrate.mjs:110-234` executes multiple schema and data changes with no transaction wrapper or migration version table.

Impact: an interrupted or partially failed build can leave production half-migrated, while a later application build may assume all changes exist. Rollback of application code does not roll back schema/data changes. This is especially risky when Hostinger automatically retries builds.

### F-21 - Medium: schema verification verifies source text, not the actual Neon schema

`scripts/verify-schema.mjs:3-71` only searches for required SQL fragments in `scripts/migrate.mjs`. The migration uses `create table if not exists` and only explicitly adds `transcription_model` to existing settings at `scripts/migrate.mjs:132-135`.

Impact: an existing database can be missing a required column, constraint, or index while the build check still passes. The first affected API request then fails at runtime. A live schema verification or versioned migration check is missing.

### F-22 - Medium, configuration-dependent: seeded model configuration diverges from the V1 spec

The spec seeds `model_id` as `gpt-realtime` and describes `gpt-realtime` as the starting model. The current migration changes the SQL default and seeded value to `gpt-realtime-2.1` and `gpt-realtime-whisper` at `scripts/migrate.mjs:126-138` and `216-217`, with an automatic upgrade of existing legacy values at lines 222-226.

Impact: a fresh or existing database will use the newer identifiers without a deployment-time availability check. If the configured identifiers are unavailable to the account or not intended for a particular environment, every session request can fail upstream. This is a source-of-truth/configuration mismatch that should be an explicit, verified decision rather than an implicit migration rewrite.

### F-23 - Medium: admin usernames containing periods cannot authenticate after cookie creation

`src/lib/admin-auth.ts:31-35` encodes the username in a dot-delimited cookie, while `src/lib/admin-auth.ts:47-59` requires exactly three dot-separated parts. A username such as `admin@example.com` produces extra parts and is rejected when the cookie is verified.

Impact: valid environment credentials can appear to log in and then immediately fail authorization if the username contains a period. The cookie payload needs structured encoding or a delimiter that cannot occur in the username.

### F-24 - Low/Medium: the repository contains two drifting landing-page entry paths

The production Next page uses `public/assets/js/promo.js` and the inline widget at `src/app/page.tsx:3-9`. The legacy `index.html:1-40` uses the separate root `assets/js/promo.js`, has English metadata/default language, and does not load the voice widget. The source archive includes `public/` but not `index.html` or root `assets/`.

Impact: the deployed Next app is currently the intended path, but a static-hosting fallback or future operator can accidentally serve an older English page without the production voice agent. The duplicate source is a deployment and maintenance hazard.

### F-25 - Low: deployment documentation and environment example retain stale model defaults

`.env.example:14-16` still documents `model_id=gpt-realtime` and `transcription_model=gpt-4o-mini-transcribe`, while the migration and current runtime default to `gpt-realtime-2.1` and `gpt-realtime-whisper`. This can cause an operator to seed or edit settings inconsistently with the reviewed build.

## Test and verification gaps

No unit, integration, database, concurrency, browser, or WebRTC test files were found. The existing checks are primarily static/source checks and public HTTP smoke checks.

The following acceptance-critical behaviors are not automated:

- Successful ephemeral-token minting with production environment values.
- Browser-to-OpenAI WebRTC setup and audio playback.
- Realtime event replay for one `capture_lead` call.
- Lead validation, idempotency, and transaction failure behavior.
- Full transcript save through both normal end and `sendBeacon` page close.
- Peer/data-channel failure persistence.
- Thai and English golden conversations, including the first greeting.
- Objection handling and grounded pricing behavior.
- Support-urgent lead capture.
- Concurrent daily-cap enforcement.
- Admin login throttling and cookie edge cases.
- Settings validation and cache behavior across workers.
- Kill-switch behavior for already-loaded widgets and active calls.
- Actual browser network verification that the server OpenAI key never appears.

## Checks run during review

The following completed successfully on the current worktree:

- `node --check public/djai-voice-widget.js`
- `node --check public/assets/js/promo.js`
- `node --check scripts/migrate.mjs`
- `node --check scripts/verify-env.mjs`
- `npm run typecheck`
- `npm run verify:source`
- `npm run verify:schema`
- `git diff --check`

These passing checks do not eliminate the runtime and acceptance issues above. No application source files were changed during this review.

## Product Decision Update

Voice quality takes priority over reducing live-response length for now. Keep the Realtime session `max_output_tokens` ceiling at `4096`; do not restrict live voice responses solely to reduce token usage. The 4096 value is an upper bound, not a requirement that every response consume 4096 tokens.

Token-cost work should therefore focus on measurement and diagnosis first: record Realtime `response.done` usage, distinguish cached input from uncached text/audio input, distinguish text output from audio output, and track input-transcription usage. Do not add a post-call summarizer or evaluator to the V1 implementation at this stage; that remains a separate future scope decision.

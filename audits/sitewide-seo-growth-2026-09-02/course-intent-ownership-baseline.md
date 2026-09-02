# Course intent ownership baseline

Date: 2026-09-02

## Public route roles

| Route | Public discovery job | Primary next step |
| --- | --- | --- |
| `/course/` and locale equivalents | Evaluate the paid, offline one-day AI Masterclass using its outcome, price, location, and qualification details | Create/sign in to a DJAI School account and reserve |
| `/course/detail/` and locale equivalents | Reassure with the full schedule, curriculum, and expected project outcome | Reserve the same Masterclass through DJAI School |
| `/siamese_cat/dev/course/` and `/th/` | Discover and express interest in the current free live vibe-coding session | Submit course interest; use School only after a place is confirmed |
| `/siamese_cat/dev/courses/` | Compare English AI/vibe-coding learning paths | Choose an exact course and check a trial slot |
| `/siamese_cat/dev/courses/{course}/` | Evaluate one exact build outcome | Check a trial slot for that course |
| `school.djai.academy` | Start or continue authenticated learning | Account, reservation, and learning-product actions |

## Guardrails verified

- Main-domain course pages retain public discovery; they were not moved to School.
- The paid landing and detail routes use different titles, H1s, opening promises, and visitor jobs.
- The free live session no longer competes with the paid offline Masterclass first screen.
- Catalog children retain distinct outcomes: a first app, a playable game, or a repeatable release plan.
- The approved paid-course date, time, price, place, and delivery language were not changed.
- Public Siamese Cat Dev course pages now explain the School boundary and link to `https://school.djai.academy/` only as the authenticated-learning handoff.

## Automated evidence

- Course ownership contract: 6 tests passed.
- Paid-course registration suite: 5 tests passed.
- Paid-course production build: 12 static routes passed.
- Siamese Cat Dev course/bio suite: 10 tests passed.
- Siamese Cat Dev production build: passed, including crawlable fallbacks for the campaign, catalog, and three course outcomes.
- Complete repository test suite: passed.
- Generated HTML inspection confirmed route-specific title/H1 and School handoff links.

## Remaining integration work

Next.js currently renders the paid-course locale pages under the root Thai document shell, and locale-specific Open Graph fields can inherit from that root. Task 10 must align rendered `html lang`, Open Graph locale fields, canonical/alternate reciprocity, sitemap inclusion, and cross-cluster internal links before G6/G7/G8 can pass.

Browser screenshots and interactive registration/trial checks remain unavailable without action-specific browser permission.

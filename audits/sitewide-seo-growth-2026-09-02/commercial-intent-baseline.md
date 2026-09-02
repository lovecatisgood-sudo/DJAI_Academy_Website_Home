# Development and Service intent baseline — 2026-09-02

Captured before Task 3 edits from commit `84b2319`.

| Locale | Development first-screen role | Service first-screen role | Main overlap |
| --- | --- | --- | --- |
| Thai | Title lists software, apps, and AI automation. H1 asks visitors to send a requirement so DJAI can turn it into a working product. Primary CTA: `เริ่มคุยโปรเจกต์` to `mailto:contact@djai.academy`. | Title and H1 advertise a full list of product/system development capabilities. Primary CTA: `ขอใบเสนอราคา` to the same email. | Both first screens sell the complete build and enumerate the same systems; Service does not begin as a chooser. |
| English | H1: `Bring us your requirement. We help turn it into a working product.` Primary CTA: `Start a Project`. | H1: `Custom development for products, automation, and business systems.` Primary CTA: `Request a Quote`. | Development and Service both lead with broad custom-development propositions and nearly identical capability lists. |
| Vietnamese | H1 starts from the business problem and deciding what to build first. Primary CTA asks the visitor to send the project requirement. | H1 starts from the problem rather than a technology list, and the catalog later asks the visitor to choose the closest group. | Vietnamese is already closer to the approved split, but category cards still end in tag lists rather than a problem, deliverable, and next action. |

## Structured-data baseline

- Thai/English Development use `ProfessionalService` with a broad capability-list description.
- Thai/English Service use `Service` with another broad capability-list description.
- The two English schema descriptions differ syntactically but communicate almost the same catalog of apps, SaaS, AI, fintech, games, Web3, and business systems.
- Vietnamese pages do not expose page-specific commercial structured data in their current source.

## Body and proof baseline

- Development contains a four-step process and portfolio links, but capability chips make the page read partly like a keyword inventory.
- Service exposes nine categories, but each card ends with `keywords`/tag chips rather than explaining the business problem, likely deliverable, and next step.
- Service already links to Development and portfolio pages; the role change can preserve those URLs.
- Canonicals and TH/EN/VI reciprocal alternates are present and must remain unchanged.

## Visual baseline limitation

The source state and successful production build are recorded. Browser/GUI access was not authorized in this conversation, so no browser screenshots were captured. Visual inspection remains a deployment gate; this implementation will use source contracts and production builds without accessing the user's browser or authenticated sessions.

## Post-change verification

- Development now opens with the requirement, user, business outcome, risk, and smallest useful launchable version. Capability chips were removed; the body explains system types as outcomes and constraints.
- Service now opens as a chooser. Each of its nine cards states a business problem, a typical deliverable, and a link to the locale-matched Development page. Keyword/tag chips were removed.
- Development and Service use different H1s, metadata promises, and English schema descriptions.
- Primary email enquiry links use the privacy-safe `enquiry_start` event contract without passing free-form requirements or personal data.
- `commercial-intent-separation.test.mjs` passed; homepage lint completed with 12 pre-existing `no-img-element` warnings and no errors; the Next production build passed for 76 routes.
- Editorial review found no invented customer result, quotation, first-person experience, performance guarantee, or keyword-stuffed section. Thai and Vietnamese copy still require fluent-human review before deployment under the program's locale gate.

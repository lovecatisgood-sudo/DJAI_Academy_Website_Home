# Tool-family acquisition routing baseline

Date: 2026-09-02

## Outcome

The free-tool families now use deterministic, task-specific acquisition paths. No tool alternates promotions randomly or uses a universal course/app promotion.

| Tool family | First post-success step | Contextual acquisition step |
| --- | --- | --- |
| PDF | Related PDF task | Cam PDF for Android when the workflow benefits from mobile capture/signing; otherwise Development |
| QR | Related QR task | Cam PDF for Android for mobile QR scanning/generation; Development remains secondary where relevant |
| Document | Related document task | Cam PDF for document capture/signing, then Development |
| AI | Related AI task | Development, then the relevant public AI/vibe-coding learning path |
| Spreadsheet | Related spreadsheet task | Development |
| Image | Related image task | Development |
| Media/video | Related media or video task | Development |

Category and hub pages keep discovery inside their own tool ecosystem before showing a category-specific bridge. Success journeys are hidden until a result exists where the tool exposes a discrete completion state.

## Guardrails verified

- Tool input, processing, export, download, and share implementations were not changed.
- Related-tool destinations are explicit and differ from the current route.
- Image and media tools no longer show unrelated Cam PDF promotions.
- Document tools no longer alternate between course and Development promotions through `localStorage`.
- Video tools no longer use a generic Academy/building-course callout.
- Cam PDF claims remain limited to verified Android capabilities and retain the Google Play destination.

## Automated evidence

- Repository test suite: passed, including the cross-family routing contract.
- Document tools: 11 tests, lint with zero errors, 123-page production build.
- Image tools: 46 tests, 85-page multilingual production build.
- Media tools: 8 tests, 116-page production build.
- Hostinger production assembly: passed and verified 449 static index pages.
- `git diff --check`: passed before the production assembly.

## Environment limitation

No browser or authenticated account surface was opened because action-specific browser permission was not granted. Runtime click-through evidence therefore remains a deployment verification item. Source contracts, generated output inspection, package builds, and the integrated production assembly provide the current evidence.

## Dependency note

Installation reported existing high-severity dependency advisories in several packages (including the homepage, voice, course, document, and bio-site packages). No automatic dependency upgrade was attempted because it is outside this routing change and may introduce breaking changes. Track remediation as a separate dependency-hardening task.

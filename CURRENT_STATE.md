# Current State — DJAI Multi-Page Deployment

Saved: 2026-07-17, Asia/Ho_Chi_Minh

Workspace sandbox:

- Root folder: `/home/siamesedev/Documents/Siamese_Cat_Dev`
- Work has been kept inside this folder, with temporary preview files under `/tmp`.

## Deployment target map

| Page | Local project | Target URL | Build output |
| --- | --- | --- | --- |
| DJAI Homepage TH | `djai-academy-homepage` | `https://djai.academy/th/` | `.next/` |
| DJAI Homepage EN | `djai-academy-homepage` | `https://djai.academy/EN/` | `.next/` |
| DJAI Portfolio TH/EN | `djai-academy-homepage` | `https://djai.academy/portfolio/th/`, `https://djai.academy/portfolio/EN/` | `.next/` |
| DJAI Development TH/EN | `djai-academy-homepage` | `https://djai.academy/development/th/`, `https://djai.academy/development/EN/` | `.next/` |
| DJAI Services TH/EN | `djai-academy-homepage` | `https://djai.academy/service/th/`, `https://djai.academy/service/EN/` | `.next/` |
| QR Generator TH/EN | `DJayTools-Free-QR-Generator-Source` | `https://djai.academy/tools/qrgen/`, `https://djai.academy/tools/qrgen/en/` | `out/` |
| Image Resizer TH/EN | `djai-image-resizer` | `https://djai.academy/tools/resizeimg/`, `https://djai.academy/tools/resizeimg/en/` | `public/` |
| Siamese Cat Dev Bio TH/EN | `Siamese-Cat-Dev-Bio-Site` | `https://djai.academy/siamese_cat/dev/`, `https://djai.academy/siamese_cat/dev/EN/` | `dist/` |
| DJAI Course TH/EN | `djai-academy-course` | `https://djai.academy/course/`, `https://djai.academy/course/EN/` | `out/` |

## Current local preview servers

- QR Generator:
  - Target URLs: `https://djai.academy/tools/qrgen/`, `https://djai.academy/tools/qrgen/en/`
  - Process: `node node_modules/.bin/next dev --hostname 127.0.0.1 --port 3000`
  - PID observed: `1434347`

- DJAI Course:
  - URL: `http://127.0.0.1:4180/course/`
  - Process: `python3 -m http.server 4180 --bind 127.0.0.1`
  - PID observed: refreshed during course update
  - Static preview folder: `/tmp/djai-course-preview/course/`

- DJAI Homepage:
  - Current bilingual preview URL: `http://127.0.0.1:4196/th/`
  - English preview URL: `http://127.0.0.1:4196/EN/`
  - Process: `npm run start -- -H 127.0.0.1 -p 4196`
  - Updated tools-hub preview also running at: `http://127.0.0.1:4192/tools/`
  - Blog/admin preview running at: `http://127.0.0.1:4194/blog/`
  - Portfolio preview running at: `http://127.0.0.1:4196/portfolio/th/`

- Image Resizer:
  - Current preview URL: `http://127.0.0.1:4197/tools/resizeimg/`
  - English preview URL: `http://127.0.0.1:4197/tools/resizeimg/en/`
  - Process: `PORT=4201 npm start`
  - PID observed: `2439564`
  - Static target URLs: `/tools/resizeimg/` and `/tools/resizeimg/en/`

- Siamese Cat Dev Bio:
  - Target URLs: `https://djai.academy/siamese_cat/dev/`, `https://djai.academy/siamese_cat/dev/EN/`
  - Process: `npm run preview -- --host 127.0.0.1 --port 5174`

## DJAI Homepage state

Path:

`/home/siamesedev/Documents/Siamese_Cat_Dev/djai-academy-homepage`

Framework/version:

- Next.js `15.5.20`

Important additions:

- Homepage repo is now present in the workspace.
- App Router homepage now redirects `/` to `/th/`.
- English homepage is available at `/EN/`.
- Thai route set:
  - `/th/`
  - `/portfolio/th/`
  - `/development/th/`
  - `/service/th/`
  - `/tools/th/`
  - `/blog/th/`
  - `/blog/th/[slug]/`
- English route set:
  - `/EN/`
  - `/portfolio/EN/`
  - `/development/EN/`
  - `/service/EN/`
  - `/tools/EN/`
  - `/blog/EN/`
  - `/blog/EN/[slug]/`
- Bare section routes redirect to Thai:
  - `/portfolio/` -> `/portfolio/th/`
  - `/development/` -> `/development/th/`
  - `/service/` -> `/service/th/`
  - `/tools/` -> `/tools/th/`
  - `/blog/` -> `/blog/th/`
- Old English article routes redirect to `/blog/EN/[slug]/`.
- SEO files:
  - `public/robots.txt`
  - `public/sitemap.xml`
- Branded assets:
  - `public/djai-logo.webp`
  - `public/founder-djai.webp`
- Homepage includes:
  - Fixed header with DJAI Academy logo.
  - Header aligned with the course page:
    - Upcoming Courses
    - Community
    - Development dropdown:
      - Services
      - Promo
      - Portfolio
    - Tools
    - Blog
    - Primary button: `Join Community`
  - First-viewport DJAI Academy hero with founder image.
  - Route cards for Learn, Join, and Build.
  - Sections for Educate/Build/Deploy, team background, vibe coding, community tools, services, courses, and final CTA.
  - Footer aligned with the course page:
    - Learn
    - Build
    - Community
    - Contact
  - Contact email: `contact@djai.academy`.
  - Course-style newsletter card and modal.
  - Copyright line.
- `/tools/th/` and `/tools/EN/` hubs include:
  - Free QR Code Generator card linking to `https://djai.academy/tools/qrgen/` and `https://djai.academy/tools/qrgen/en/`
  - Free Image Converter and Resizer card linking to `https://djai.academy/tools/resizeimg/` and `https://djai.academy/tools/resizeimg/en/`
  - CollectionPage JSON-LD with SoftwareApplication entries.
  - Contextual ecosystem links to DJAI services, Siamese Cat Dev, Siamese Cat Cafe, Siamese Cat Creative Club, and Siamese Cat Hotel.
- `/portfolio/th/` and `/portfolio/EN/` now include:
  - Shared DJAI homepage header and footer.
  - Metadata, canonical URL, Open Graph image, and CollectionPage JSON-LD with CreativeWork entries.
  - Three portfolio categories from `DJAI_Portfolio`: Websites, Games, and Web3/Crypto Apps.
  - 18 selected authorized showcase projects with cleaned descriptions, service tags, and screenshots.
  - Live website links for the website projects that have URLs in the source description file.
  - Public assets copied to `public/portfolio/websites/`, `public/portfolio/games/`, and `public/portfolio/crypto_apps/`.
  - Sitemap entries for Thai and English portfolio URLs.
- `/development/th/`, `/development/EN/`, `/service/th/`, and `/service/EN/` now include:
  - Service positioning for websites, web apps, mobile apps, SaaS, AI automation, CRM, POS, fintech/payment apps, crypto wallets, games, and Web3 products.
  - Cost-aware MVP and fast execution messaging.
  - Links to portfolio, tools, blog, and contact email.
  - Localized metadata and structured data.
- `/blog/th/` and `/blog/EN/` now include:
  - Category filters for `News`, `Guides`, and `Tutorial`.
  - Dynamic localized blog article routes at `/blog/th/[slug]/` and `/blog/EN/[slug]/`.
  - Blog schema on the listing page and Article schema on post pages.
  - Sitemap entries for the blog index and seeded tutorial posts.
- `/admin/blog/` now includes:
  - Password-protected post creation form.
  - Category, status, SEO title, SEO description, keywords, excerpt, slug, and markdown-style content fields.
  - `noindex, nofollow` metadata.
- Blog backend:
  - API route: `/api/admin/blog/`
  - Storage file: `djai-academy-homepage/data/blog-posts.json`
  - Required production environment variable: `DJAI_BLOG_ADMIN_PASSWORD`
  - Supports body password, `x-admin-password`, and `Authorization: Bearer ...`.
- Seeded Tutorial posts are available in English and Thai:
  - `/blog/EN/how-to-create-free-qr-code/`
  - `/blog/th/how-to-create-free-qr-code/`
  - `/blog/EN/how-to-convert-jpg-png-webp-free/`
  - `/blog/th/how-to-convert-jpg-png-webp-free/`
  - `/blog/EN/compress-image-to-100kb-500kb/`
  - `/blog/th/compress-image-to-100kb-500kb/`

Readiness changes applied:

- Migrated lint script from deprecated `next lint` to `eslint .`.
- Added `eslint.config.mjs` using `next/core-web-vitals`.
- Added homepage metadata base, canonical URL, and Open Graph metadata.
- Enabled `trailingSlash: true`; after bilingual migration, bare section routes redirect to Thai canonical routes such as `/tools/th/`.
- Added bilingual route metadata with canonical and `hreflang` alternates for Thai and English pages.
- Updated `public/sitemap.xml` to include the Thai and English canonical URLs instead of the old bare page URLs.

Validation completed:

- `npm ci` completed from the lockfile.
- `npm run lint` passed.
- `npm run build` passed.
- `npm run lint` passed again after SEO/tools-hub updates.
- `npm run build` passed again after SEO/tools-hub updates.
- `npm run lint` passed after blog/admin implementation.
- `npm run build` passed after blog/admin implementation.
- `npm run lint` passed after portfolio implementation.
- `npm run build` passed after portfolio implementation.
- `npm run lint` passed after bilingual Thai/English route migration.
- `npm run build` passed after bilingual Thai/English route migration.
- Production preview redirects `/` to `/th/`.
- Production preview returned `200 OK` at `/th/` and `/EN/`.
- Production preview rendered `/tools/` and screenshot was captured at `/tmp/djai-tools-hub.png`.
- After enabling trailing slashes, `/tools/` returns `200 OK` and `/tools` redirects to `/tools/`.
- Updated screenshot captured at `/tmp/djai-tools-hub-4192.png`.
- Rendered HTML contains the course-aligned header/footer labels and `mailto:contact@djai.academy`.
- Rendered HTML no longer contains `sales@djai.academy` or `Contact@djai.academy`.
- Desktop and mobile screenshots were captured under `/tmp` for visual inspection.
- Blog preview returned `200 OK` at `/blog/th/` and `/blog/EN/`.
- Blog article preview returned `200 OK` at `/blog/th/how-to-create-free-qr-code/`.
- Old English blog article URL `/blog/how-to-create-free-qr-code/` redirects to `/blog/EN/how-to-create-free-qr-code/`.
- Admin page preview returned `200 OK` at `/admin/blog/`.
- Portfolio preview returned `200 OK` at `/portfolio/th/` and `/portfolio/EN/`; `/portfolio/` redirects to `/portfolio/th/`.
- Services preview returned `200 OK` at `/service/th/`.
- Tools preview returned `200 OK` at `/tools/th/` and `/tools/EN/`; `/tools/` redirects to `/tools/th/`.
- Blog screenshots captured at:
  - `/tmp/djai-blog-page.png`
  - `/tmp/djai-blog-article.png`
  - `/tmp/djai-blog-admin.png`
- Portfolio screenshots captured at:
  - `/tmp/djai-portfolio-desktop-fixed.png`
  - `/tmp/djai-portfolio-mobile-fixed.png`
- Bilingual screenshots captured at:
  - `/tmp/djai-th-home.png`
  - `/tmp/djai-th-home-mobile.png`
  - `/tmp/djai-en-home.png`
  - `/tmp/djai-th-portfolio-delayed.png`
  - `/tmp/djai-th-service.png`
  - `/tmp/djai-th-service-mobile.png`
  - `/tmp/djai-th-blog-article.png`

Deployment note:

- The homepage currently builds as a standard Next.js app into `.next/`.
- It is not configured for static export yet.
- If the root Hostinger deployment must be static-only, add `output: "export"` and validate an `out/` upload.
- The admin blog backend requires a Node-capable deployment with write access to `data/blog-posts.json`.
- If deployed as static-only, `/blog/` can be generated from seeded data, but `/admin/blog/` and `/api/admin/blog/` cannot create posts.

## QR Generator state

Path:

`/home/siamesedev/Documents/Siamese_Cat_Dev/DJayTools-Free-QR-Generator-Source`

Framework/version:

- Next.js `16.2.6`

Important changes:

- Configured static export for `/tools/qrgen`.
- Thai default page is `/tools/qrgen/`; English page is `/tools/qrgen/en/`.
- Fixed base path and asset prefix.
- Fixed logo/image paths to work under `/tools/qrgen/`.
- Preserved old Vinext/Sites build command as `npm run build:sites`.
- Default Hostinger/static build now uses `npm run build`.
- Added production metadata:
  - canonical `https://djai.academy/tools/qrgen/` and English canonical `https://djai.academy/tools/qrgen/en/`
  - Open Graph/Twitter card metadata
  - SoftwareApplication JSON-LD with free `Offer`
- Added contextual internal links to:
  - `https://djai.academy/tools/resizeimg/`
  - `https://djai.academy/tools/th/`
  - `https://djai.academy/service/th/`
- Added footer ecosystem links to Siamese Cat Dev, Siamese Cat Creative Club, Siamese Cat Cafe, and Siamese Cat Hotel.

Validation completed:

- `npm run test:hostinger` passed.
- Static preview showed the QR UI and assets correctly.
- `npm run lint` passed with existing `<img>` performance warnings only.
- `npm run build` passed after SEO/link updates.
- Local rendered HTML contains the canonical, metadata, SoftwareApplication JSON-LD, and ecosystem links.
- Screenshot captured at `/tmp/djai-qr-tool.png`.

Hostinger upload target:

`public_html/tools/qrgen/`

Upload the contents of:

`DJayTools-Free-QR-Generator-Source/out/`

## Image Resizer state

Path:

`/home/siamesedev/Documents/Siamese_Cat_Dev/djai-image-resizer`

Framework:

- Dependency-free Node/static app.
- Browser-side image processing with Canvas and Blob APIs.

Important deployment changes:

- Target production paths: `/tools/resizeimg/` for Thai and `/tools/resizeimg/en/` for English.
- Added explicit HTML base path: `/tools/resizeimg/`.
- Confirmed server fallback supports `/tools/resizeimg/`, `/tools/resizeimg/en/`, and the old `/tools/Resizeimg/` path during transition.
- Updated README/server comments from the old `/tools/image-resizer/` wording.
- Corrected DJAI links:
  - Upcoming Courses: `https://djai.academy/course/`
  - Services: `https://djai.academy/service/`
  - Contact email: `contact@djai.academy`
  - Siamese Cat Dev credit: `https://djai.academy/siamese_cat/dev/`
- Added production SEO:
  - canonical `https://djai.academy/tools/resizeimg/` and English canonical `https://djai.academy/tools/resizeimg/en/`
  - Open Graph/Twitter metadata
  - SoftwareApplication JSON-LD with free `Offer`
- Repositioned the tool as a broader free image converter/resizer/compressor for JPG, PNG, and WebP.
- Added contextual ecosystem section with links to DJAI services, Siamese Cat Creative Club, Siamese Cat Cafe, and Siamese Cat Hotel.

Validation completed:

- Local preview returned `200 OK` at `/tools/resizeimg/`.
- Local preview returned `200 OK` at `/tools/resizeimg/en/`.
- Local preview returned `200 OK` at old `/tools/Resizeimg/` compatibility path.
- CSS, JS, and image assets returned `200 OK` under `/tools/resizeimg/`.
- Browser screenshot showed the image resizer UI and assets correctly.
- Static route strategy now targets lowercase `/tools/resizeimg/`; old `/tools/Resizeimg/` is compatibility only.
- Static Hostinger-style preview loaded CSS and JS correctly.
- `node --check public/app.js` passed.
- `node --check server.js` passed.
- Refreshed static route checks for `/tools/resizeimg/` and `/tools/resizeimg/en/`.
- Screenshot captured at `/tmp/djai-resize-tool.png`.

Hostinger upload target:

`public_html/tools/resizeimg/`

Upload the contents of:

`djai-image-resizer/public/`

## Siamese Cat Dev Bio state

Path:

`/home/siamesedev/Documents/Siamese_Cat_Dev/Siamese-Cat-Dev-Bio-Site`

Framework:

- Vite/React

Important changes:

- Configured Vite base path as `/siamese_cat/dev/`.
- Thai default page is `/siamese_cat/dev/`.
- English page is `/siamese_cat/dev/EN/`.
- Build script now copies a static English entry to `dist/EN/index.html` with English metadata.
- Fixed public image references to use the configured base URL.
- Added canonical URL, Open Graph/Twitter metadata, and Organization JSON-LD.
- Replaced public-facing Google share URLs with direct website links for:
  - `https://siamesecat.cafe/`
  - `https://creative.siamesecat.cafe/`
  - `https://hotel.siamesecat.cafe/`
- Footer now includes direct links to DJAI Academy, Free DJAI Tools, Siamese Cat Cafe, Creative Club, and Cat Hotel & Learning Center.
- Added Siamese Cat Creative Club as a third ecosystem/place card.

Validation completed:

- `npm run build` passed.
- Static preview showed the bio UI and assets correctly.
- `npm run build` passed after SEO/link updates.
- Vite build passed after Thai/English split.
- Generated `dist/index.html` has Thai metadata.
- Generated `dist/EN/index.html` has English metadata.
- Vite preview served metadata and direct ecosystem links at `/siamese_cat/dev/`.
- Headless Chrome rendered the page shell; Framer Motion keeps initial opacity in immediate headless screenshots, but the served DOM contains the expected hero/content/link markup.

## SEO and backlink strategy now applied

The implemented approach is intentionally conservative:

- Use free tools as indexable, useful content pages with clear titles, descriptions, canonical URLs, and structured data.
- Link between related tools through a `/tools/` hub instead of scattering keyword-heavy links everywhere.
- Add ecosystem links only where a visitor would reasonably expect them:
  - tools hub
  - tool footer/ecosystem sections
  - Siamese Cat Dev profile places/footer
- Keep outbound links editorial and normal; do not use paid-link patterns, automated link exchanges, or large repeated footer blocks.
- DA/DR can be tracked as third-party metrics, but the practical goal is useful indexed pages, internal discoverability, and legitimate referral paths.

Hostinger upload target:

`public_html/siamese_cat/dev/`

Upload the contents of:

`Siamese-Cat-Dev-Bio-Site/dist/`

## DJAI Course state

Path:

`/home/siamesedev/Documents/Siamese_Cat_Dev/djai-academy-course`

Framework/version:

- Next.js `15.5.20`

Important deployment changes:

- Configured static export for `/course`.
- Thai default page is `/course/`.
- English page is `/course/EN/`.
- Added `basePath: "/course"` and matching asset prefix.
- Fixed image paths to use `/course/assets/...`.
- Added `/course`-safe icon metadata.

Header/footer changes applied only to this course project:

- Header now uses the same homepage-style glass navigation pattern:
  - DJAI Academy logo link
  - Upcoming Courses
  - Community
  - Development dropdown:
    - Services
    - Promo
    - Portfolio
  - Tools
  - Blog
  - Primary button: `Join Community`
  - Mobile hamburger menu behavior via `app/SiteHeader.jsx`

- Corrected header/footer links:
  - Tools: Thai `/tools/th/`, English `/tools/EN/`
  - Services: Thai `/service/th/`, English `/service/EN/`
  - Courses: Thai `/course/`, English `/course/EN/`
  - Community: `https://djai.academy/community`
  - Portfolio: `https://djai.academy/portfolio`
  - Promo: `https://djai.academy/promo`
  - Development: `https://djai.academy/development`
  - Blog: `https://djai.academy/blog`

- Footer now uses 4 columns:
  - Learn
  - Build
  - Community
  - Contact

- Newsletter section added:
  - Text: `Subscribe to our weekly newsletter`
  - Email input
  - Subscribe button
  - Popup form

Newsletter limitation:

- The popup is frontend-only for now because no newsletter backend/form endpoint was provided.

Contact limitation:

- WhatsApp, LINE, Facebook, Instagram, TikTok, and X are labels only because exact profile/contact URLs were not provided.
- Email is linked with `mailto:contact@djai.academy`.

Latest pricing/payment update:

- Course price changed to `THB 5,999` per pax.
- Previous comparison price changed to `THB 8,999`.
- All course reservation CTAs now point to Stripe checkout:
  - `https://buy.stripe.com/dRm5kD2F2ahD1BP2ufgIo00`
- FAQ reservation answer now references secure Stripe payment instead of email reservation.

Validation completed:

- `npm run build` passed.
- `npm run build` passed again after header/footer, price, and Stripe CTA updates.
- `npm run build` passed after Thai default and `/course/EN/` implementation.
- Static preview returned `200 OK` at `/course/`.
- Exported HTML contains the requested header/footer/newsletter text.
- Exported HTML contains corrected DJAI links.
- Exported HTML has no root `/assets/...` references.
- Header screenshot check looked intact.
- Refreshed static preview folder at `/tmp/djai-course-preview/course/`.
- Static preview returned `200 OK` at `http://127.0.0.1:4180/course/`.
- Desktop screenshot captured at `/tmp/djai-course-updated-desktop.png`.
- Mobile screenshot captured at `/tmp/djai-course-updated-mobile.png`.

Hostinger upload target:

`public_html/course/`

Upload the contents of:

`djai-academy-course/out/`

## Main deployment note

The DJAI homepage repo is now present in this workspace. It currently builds as a standard Next.js app.

Production routing must serve these static folders before the homepage Next.js app catches routes:

- `/tools/qrgen/`
- `/tools/resizeimg/`
- `/siamese_cat/dev/`
- `/course/`

If Hostinger managed Node routes all traffic to the homepage app, either:

1. Configure static path exclusions for these folders, or
2. Integrate these pages into the homepage Next.js project.

If the homepage is deployed as static files instead of a managed Node app, validate a static homepage export and upload it to `public_html/` without overwriting the existing subpage folders.

## Useful build commands

Homepage:

```bash
cd /home/siamesedev/Documents/Siamese_Cat_Dev/djai-academy-homepage
npm run build
```

QR Generator:

```bash
cd /home/siamesedev/Documents/Siamese_Cat_Dev/DJayTools-Free-QR-Generator-Source
npm run build
```

Bio Site:

```bash
cd /home/siamesedev/Documents/Siamese_Cat_Dev/Siamese-Cat-Dev-Bio-Site
npm run build
```

Course Site:

```bash
cd /home/siamesedev/Documents/Siamese_Cat_Dev/djai-academy-course
npm run build
```

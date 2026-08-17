# DJAI Promotional Website Remake — PRD & Design Document

**Project:** DJAI Web Development Promotional Landing Page
**Target URL:** `https://promo.djai.academy/`
**Prepared for:** Codex implementation
**Primary Goal:** Remake the current DJAI web development promotional landing page into a premium, animated, high-level development studio website with a mobile vertical slide-show experience.

---

## 1. Product Summary

DJAI needs a promotional website for selling web development packages to small businesses, entrepreneurs, cafés, restaurants, service providers, and local business owners.

The current page communicates the offer clearly, but the redesign should make the brand feel more premium, niche, technical, and AI-powered. The new site should look like a modern AI development studio, not a basic package pricing page.

The website must clearly communicate that DJAI provides:

- Custom website design
- Mobile responsive development
- SEO foundation
- AI chatbot setup
- First-year hosting included
- Fast launch support
- Simple, transparent pricing
- Discounted promotional packages

The experience should feel especially strong on mobile. Instead of a standard long scrolling page, the mobile version should behave like a vertical slide presentation where each swipe moves to the next full-screen content section.

---

## 2. Core Business Objective

The website should convert visitors into leads for DJAI web development services.

The primary conversion action is for the visitor to contact DJAI and start a website project.

Recommended CTAs:

- **Build My Website**
- **Start My Website**
- **Get Started with DJAI**
- **Claim Promo Price**
- **Chat with DJAI**

The main message:

> DJAI builds premium AI-powered websites that help businesses launch fast, look professional, and convert visitors into customers.

---

## 3. Target Audience

The website should target:

1. Small business owners
2. New business owners launching their first website
3. Cafés, restaurants, salons, pet services, shops, and service businesses
4. Non-technical business owners who want everything handled for them
5. Founders who want a fast, professional, AI-powered website
6. Local businesses that need a website, SEO, and chatbot without hiring a full team

The tone should be:

- Premium
- Confident
- Clear
- Modern
- AI-focused
- Easy for non-technical users to understand
- Not too corporate
- Not too cute
- Not too playful

---

## 4. Brand Positioning

DJAI should be positioned as an AI-powered web studio, not only a freelancer or cheap website seller.

### Suggested Brand Statement

**DJAI Web Studio builds premium AI-powered websites for businesses that want to launch fast, look professional, and convert visitors into customers.**

### Suggested Hero Headline

**Launch a Premium AI-Powered Website for Your Business**

### Suggested Hero Subheadline

**Custom design, mobile responsive development, SEO setup, AI chatbot, and first-year hosting — all included in one simple website package.**

### Alternative Hero Headlines

1. **Your Business Website, Built with AI-Level Precision**
2. **From Idea to Live Website — Fast, Premium, and AI-Powered**
3. **A Complete Website Launch System for Modern Businesses**
4. **Not Just a Website. A Smart Digital Presence.**

---

## 5. Existing Offer Structure

The site must include three main packages in this exact order:

1. Landing Page
2. Additional Page
3. Complete Website

The pricing must show original price with strikethrough, then discounted promotional price.

### Package 1 — Landing Page

- Display first
- Original price: **10,000 THB**
- Promo price: **5,000 THB**
- Price display:
  - `~~10,000 THB~~`
  - `5,000 THB`
- Badge suggestion: **50% OFF LAUNCH PROMO**
- Positioning: Best for fast launch, promotions, menus, portfolios, simple business pages, campaigns, and single-product/service pages.

### Package 2 — Additional Page

- Display second
- Original price: **5,000 THB/page**
- Promo price: **3,000 THB/page**
- Price display:
  - `~~5,000 THB/page~~`
  - `3,000 THB/page`
- Badge suggestion: **SAVE 2,000 THB / PAGE**
- Positioning: Best for expanding an existing website with extra pages such as About, Services, Menu, Gallery, FAQ, Contact, or Portfolio.

### Package 3 — Complete Website

- Display third / last
- Original price: **20,000 THB**
- Promo price: **10,000 THB**
- Price display:
  - `~~20,000 THB~~`
  - `10,000 THB`
- Badge suggestion: **BEST VALUE** or **SAVE 10,000 THB**
- Positioning: Best for a complete business website with multiple pages and stronger brand presence.
- This should visually feel like the most recommended package.

---

## 6. Pricing Section Requirements

The pricing section must communicate the discount clearly.

### Required Pricing Card Order

| Order | Package | Original Price | Promo Price | Badge |
|---|---|---:|---:|---|
| 1 | Landing Page | 10,000 THB | 5,000 THB | 50% OFF LAUNCH PROMO |
| 2 | Additional Page | 5,000 THB/page | 3,000 THB/page | SAVE 2,000 THB / PAGE |
| 3 | Complete Website | 20,000 THB | 10,000 THB | BEST VALUE |

### Pricing Card Visual Rules

Each pricing card should include:

- Package label
- Package title
- Short description
- Old price with strikethrough
- Promo price in large gradient text
- Inclusions list
- CTA button
- Badge

### Example Price Visual

```html
<p class="old-price">10,000 THB</p>
<p class="new-price">5,000 THB</p>
```

```css
.old-price {
  text-decoration: line-through;
  color: #9BA7C0;
  font-size: 1rem;
  opacity: 0.75;
}

.new-price {
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #00D8FF, #C653FF);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

---

## 7. Required Package Content

### Landing Page — Promo 5,000 THB

Suggested content:

**Landing Page**
Perfect for a fast business launch, campaign, menu, service page, or product promotion.

Includes:

- 1 custom landing page
- Mobile responsive layout
- SEO foundation
- AI chatbot setup
- Contact CTA section
- First-year hosting included
- Basic content structure
- Fast launch support

CTA:

**Claim 5,000 THB Promo**

---

### Additional Page — Promo 3,000 THB/page

Suggested content:

**Additional Page**
Expand your website anytime with extra pages for your business content.

Includes:

- 1 extra custom page
- Design matched to existing website
- Mobile responsive layout
- SEO-friendly structure
- Suitable for About, Services, Menu, FAQ, Gallery, Portfolio, or Contact pages

CTA:

**Add More Pages**

---

### Complete Website — Promo 10,000 THB

Suggested content:

**Complete Website**
A full business website package for brands that want a stronger online presence.

Includes:

- Up to 5 custom pages
- Mobile responsive design
- SEO foundation
- AI chatbot setup
- Contact CTA structure
- First-year hosting included
- Business content layout
- Premium visual design direction
- Launch support

CTA:

**Get Complete Website**

---

## 8. Suggested Site Architecture

The new site should have the following sections.

### Desktop Structure

Desktop can use normal vertical scrolling, but each section should feel cinematic, animated, and premium.

1. Hero
2. Problem / Pain Point
3. What DJAI Builds
4. Package Pricing
5. AI Chatbot Advantage
6. Process
7. Why DJAI
8. FAQ
9. Final CTA

### Mobile Structure

Mobile should use vertical full-screen slides, not a normal long scroll.

Each slide should be approximately `100vh` and use vertical scroll snapping or Swiper vertical mode.

Mobile slide order:

1. Hero
2. Problem / Pain Point
3. What You Get
4. Landing Page Package
5. Additional Page Package
6. Complete Website Package
7. AI Chatbot Advantage
8. Launch Process
9. Why DJAI
10. Final CTA

---

## 9. Desktop Design Requirements

### Desktop Layout Direction

The desktop site should feel like a premium AI studio homepage.

Visual style:

- Dark background
- Electric cyan and neon violet gradient accents
- Glassmorphism cards
- Soft glowing borders
- Floating website mockups
- Animated background orbs
- Subtle code-line / grid-line effects
- Clean typography
- Large hero statement
- Clear CTA buttons

### Desktop Hero Layout

Suggested layout:

- Left side: headline, subheadline, CTA buttons, trust points
- Right side: animated website mockup or floating UI card stack

Hero content:

**Launch a Premium AI-Powered Website for Your Business**

**Custom design, mobile responsive development, SEO setup, AI chatbot, and first-year hosting — all included in one simple package.**

CTA buttons:

- Primary: **Build My Website**
- Secondary: **View Packages**

Trust points below CTA:

- SEO-ready
- Mobile responsive
- AI chatbot included
- First-year hosting included

---

## 10. Mobile Slide Design Requirements

The mobile version is very important.

### Mobile UX Concept

The mobile experience should feel like a vertical slideshow or app onboarding journey.

User behavior:

- User swipes upward to go to the next slide
- User swipes downward to go back to the previous slide
- Each slide occupies the full viewport height
- Each slide contains one core message only
- Slide transitions should feel smooth and premium
- Progress indicator should show where the user is in the journey

### Recommended Implementation

Start with **CSS Scroll Snap** for simplicity and reliability.

```css
.mobile-slides {
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
}

.mobile-slide {
  min-height: 100vh;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}
```

If CSS Scroll Snap does not feel premium enough, upgrade to **Swiper.js vertical mode**.

### Mobile Slide Content Rules

Each slide should include:

- 1 short eyebrow label
- 1 strong headline
- 1 short supporting paragraph
- 1 visual element or icon
- Optional CTA
- Small “Swipe” hint at the bottom

Avoid overcrowding mobile slides.

### Mobile Slide Details

#### Slide 1 — Hero

Eyebrow: **DJAI Web Studio**
Headline: **Launch a Premium AI-Powered Website**
Text: **Design, SEO, chatbot, hosting, and mobile optimization — all handled for you.**
CTA: **Start My Website**

#### Slide 2 — Problem

Headline: **Your website should not just exist. It should convert.**
Text: **Many business websites look outdated, load slowly, and fail to turn visitors into customers. DJAI builds websites with purpose.**

#### Slide 3 — What You Get

Headline: **Everything You Need to Launch**
Show 4 mini cards:

- Custom Design
- SEO Setup
- AI Chatbot
- Hosting Included

#### Slide 4 — Landing Page

Headline: **Landing Page**
Old price: `10,000 THB` with strikethrough
New price: `5,000 THB`
Badge: **50% OFF LAUNCH PROMO**
Text: **Perfect for campaigns, menus, services, portfolios, and new business launches.**
CTA: **Claim Promo**

#### Slide 5 — Additional Page

Headline: **Additional Page**
Old price: `5,000 THB/page` with strikethrough
New price: `3,000 THB/page`
Badge: **SAVE 2,000 THB / PAGE**
Text: **Add About, Services, FAQ, Gallery, Portfolio, Menu, or Contact pages anytime.**
CTA: **Add Page**

#### Slide 6 — Complete Website

Headline: **Complete Website**
Old price: `20,000 THB` with strikethrough
New price: `10,000 THB`
Badge: **BEST VALUE**
Text: **A full 5-page business website with AI chatbot, SEO setup, mobile design, and hosting included.**
CTA: **Get Complete Website**

#### Slide 7 — AI Chatbot Advantage

Headline: **Your Website Can Answer Customers 24/7**
Text: **Add an AI chatbot that can answer common questions, guide customers, and push visitors toward action.**

#### Slide 8 — Launch Process

Headline: **From Idea to Website in 4 Steps**

Steps:

1. Tell us your business
2. Choose the design direction
3. We build and set up AI
4. Your website goes live

#### Slide 9 — Why DJAI

Headline: **Not Just a Website. A Launch System.**
Text: **DJAI combines design, development, SEO, chatbot, and hosting into one simple service for modern businesses.**

#### Slide 10 — Final CTA

Headline: **Ready to Launch Your Website?**
Text: **Start with a landing page or build a complete business website today.**
CTA: **Get Started with DJAI**

---

## 11. Visual Identity

### Color Theme

The current DJAI direction uses tech blue / cyan and purple. The remake should refine this into a premium AI-style theme.

Recommended palette:

```css
:root {
  --bg-primary: #050816;
  --bg-secondary: #070B1F;
  --bg-card: rgba(255, 255, 255, 0.06);
  --bg-card-hover: rgba(255, 255, 255, 0.10);

  --text-primary: #F5F7FF;
  --text-secondary: #9BA7C0;
  --text-muted: #6F7A95;

  --accent-cyan: #00D8FF;
  --accent-blue: #2D8CFF;
  --accent-violet: #C653FF;
  --accent-gradient: linear-gradient(135deg, #00D8FF, #C653FF);

  --border-glow: rgba(0, 216, 255, 0.35);
  --violet-glow: rgba(198, 83, 255, 0.35);
}
```

### Color Usage

- Background: dark navy / black
- Main CTA: cyan-to-violet gradient
- Important price: gradient text
- Cards: translucent glass panels
- Borders: subtle cyan/violet glow
- Icons: cyan/violet gradient or alternating colors
- Warning/discount badges: gradient outline or bright cyan/violet fill

### Typography

Recommended font options:

- Headings: `Inter`, `Sora`, `Space Grotesk`, or `Plus Jakarta Sans`
- Body: `Inter` or `Plus Jakarta Sans`

Suggested typography:

```css
body {
  font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
  background: var(--bg-primary);
  color: var(--text-primary);
}

h1, h2, h3 {
  font-family: 'Sora', 'Inter', sans-serif;
  letter-spacing: -0.04em;
}
```

---

## 12. Animation Direction

The animation should feel premium, smooth, and modern.

Avoid:

- Too many bouncing effects
- Cute cartoon motion
- Overly fast transitions
- Random particles that distract from content
- Cheap template animation

Use:

- Slow moving gradient orbs
- Subtle floating UI cards
- Smooth fade-up text reveal
- Soft hover glow on cards
- Parallax background grid
- Animated chatbot bubble pulse
- Scroll-based section reveal
- Mobile slide transition with fade and upward movement

### Recommended Animation Libraries

Depending on the stack:

- Framer Motion for React / Next.js
- GSAP for advanced timeline animations
- CSS animations for lightweight effects
- Swiper.js if using mobile slide mode

### Core Animation Components

#### Animated Background Orbs

- 2–3 large blurred circles
- Cyan and violet
- Move slowly using CSS keyframes
- Opacity low enough not to hurt readability

#### Floating Website Mockup

- Right side of hero on desktop
- Center visual on mobile hero
- Slight vertical float animation

#### Card Reveal

Cards should fade in and move upward when entering viewport.

#### Price Card Hover

On desktop:

- Card border glows
- Card moves up slightly
- CTA button becomes brighter
- Background glass becomes slightly stronger

#### Mobile Slide Transition

Each slide should feel like it locks into place. Use:

- `scroll-snap-type: y mandatory`
- `scroll-snap-stop: always`
- Section content fade-up on active slide if possible

---

## 13. Component Requirements

Codex should build the site using reusable components.

Recommended components:

1. `HeroSection`
2. `ProblemSection`
3. `FeatureGrid`
4. `PricingSection`
5. `PricingCard`
6. `AIChatbotSection`
7. `ProcessSection`
8. `WhyDJAISection`
9. `FAQSection`
10. `FinalCTASection`
11. `MobileSlideDeck`
12. `MobileSlide`
13. `GradientButton`
14. `GlassCard`
15. `AnimatedBackground`
16. `ProgressDots`

---

## 14. Data Structure

Pricing should be controlled by a data object, not hard-coded into multiple places.

Example:

```ts
export const packages = [
  {
    id: 'landing-page',
    order: 1,
    label: 'Starter Package',
    title: 'Landing Page',
    oldPrice: '10,000 THB',
    promoPrice: '5,000 THB',
    badge: '50% OFF LAUNCH PROMO',
    description: 'Perfect for campaigns, menus, services, portfolios, and new business launches.',
    features: [
      '1 custom landing page',
      'Mobile responsive layout',
      'SEO foundation',
      'AI chatbot setup',
      'Contact CTA section',
      'First-year hosting included',
      'Fast launch support'
    ],
    cta: 'Claim 5,000 THB Promo'
  },
  {
    id: 'additional-page',
    order: 2,
    label: 'Growth Add-on',
    title: 'Additional Page',
    oldPrice: '5,000 THB/page',
    promoPrice: '3,000 THB/page',
    badge: 'SAVE 2,000 THB / PAGE',
    description: 'Expand your website anytime with extra pages for your business content.',
    features: [
      '1 extra custom page',
      'Design matched to existing website',
      'Mobile responsive layout',
      'SEO-friendly structure',
      'Suitable for About, Services, Menu, FAQ, Gallery, Portfolio, or Contact pages'
    ],
    cta: 'Add More Pages'
  },
  {
    id: 'complete-website',
    order: 3,
    label: 'Best Value',
    title: 'Complete Website',
    oldPrice: '20,000 THB',
    promoPrice: '10,000 THB',
    badge: 'BEST VALUE',
    description: 'A full business website package for brands that want a stronger online presence.',
    features: [
      'Up to 5 custom pages',
      'Mobile responsive design',
      'SEO foundation',
      'AI chatbot setup',
      'Contact CTA structure',
      'First-year hosting included',
      'Business content layout',
      'Premium visual design direction',
      'Launch support'
    ],
    cta: 'Get Complete Website',
    recommended: true
  }
];
```

---

## 15. CTA / Contact Behavior

The site needs a clear contact path.

Codex should check the current project setup and use the existing contact method if available.

Possible CTA destinations:

1. Contact form section
2. WhatsApp / LINE / Messenger link
3. Email link
4. Existing DJAI contact page
5. AI chatbot popup

If no contact system exists yet, implement placeholder CTA behavior using:

- `mailto:` link
- Contact form placeholder
- Button scrolls to final CTA/contact section

Recommended CTA behavior:

- Primary CTA in hero scrolls to pricing section or contact section
- Package CTA opens contact form with selected package prefilled
- Final CTA opens contact form or chatbot

Example package selection behavior:

```ts
const handlePackageClick = (packageId: string) => {
  setSelectedPackage(packageId);
  scrollToContactForm();
};
```

---

## 16. FAQ Section

Include FAQ for reducing hesitation.

Suggested FAQ:

### Is hosting included?

Yes. First-year hosting is included in the package.

### Is the website mobile-friendly?

Yes. Every package includes mobile responsive design.

### Is SEO included?

Yes. A basic SEO foundation is included so your website structure is search-friendly.

### Is the AI chatbot included?

Yes. AI chatbot setup is included in the main website packages.

### Can I add more pages later?

Yes. Additional pages are available at the promo price of 3,000 THB/page.

### What is the best package for a new business?

If you only need one strong page, choose Landing Page. If you want a full online presence, choose Complete Website.

### Are there hidden fees?

No. The offer should clearly show what is included before the project starts.

---

## 17. SEO Requirements

The site should include basic SEO metadata.

Suggested title:

**DJAI Web Studio | AI-Powered Website Design & Development**

Suggested meta description:

**Launch a premium AI-powered website with DJAI. Custom design, mobile responsive development, SEO setup, AI chatbot, and first-year hosting included. Website packages from 5,000 THB.**

Suggested keywords:

- AI website design
- website development Thailand
- landing page design
- business website package
- AI chatbot website
- DJAI web studio
- SEO website design
- mobile responsive website

Open Graph:

- `og:title`: DJAI Web Studio — AI-Powered Website Design
- `og:description`: Premium website packages with design, SEO, AI chatbot, and hosting included.
- `og:type`: website
- `og:url`: https://promo.djai.academy/
- `og:image`: use a custom DJAI promo preview image if available

---

## 18. Performance Requirements

The site should be fast and lightweight.

Requirements:

- Mobile-first performance
- Avoid heavy animation libraries unless necessary
- Use optimized images
- Use lazy loading for non-critical visuals
- Avoid excessive particles
- Keep Lighthouse performance as high as possible
- Text must remain readable while animations load
- Animation should not block rendering

Target:

- Lighthouse Performance: 85+
- Accessibility: 90+
- Best Practices: 90+
- SEO: 90+

---

## 19. Accessibility Requirements

- All text must have sufficient contrast against dark background
- Buttons must have accessible labels
- Interactive elements must be keyboard accessible
- Mobile slides must not trap users
- Users should still be able to scroll naturally
- Respect reduced motion settings

Reduced motion CSS:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 20. Responsive Rules

### Desktop

- Use full landing page scroll
- Hero can use two-column layout
- Pricing cards should display in 3 columns
- Complete Website card should be visually emphasized
- Animations can be more complex

### Tablet

- Hero may become stacked
- Pricing cards can use 2-column or stacked layout
- Keep spacing generous

### Mobile

- Use full-screen vertical slide deck
- Pricing packages should each have their own slide
- Avoid dense feature lists
- Use short copy
- Place CTA buttons near thumb-friendly area
- Add progress dots or slide numbers
- Use swipe hint

Breakpoint suggestion:

```css
@media (max-width: 768px) {
  .desktop-layout {
    display: none;
  }
  .mobile-slide-layout {
    display: block;
  }
}

@media (min-width: 769px) {
  .desktop-layout {
    display: block;
  }
  .mobile-slide-layout {
    display: none;
  }
}
```

---

## 21. Suggested Visual Copy for Sections

### Hero

**Launch a Premium AI-Powered Website for Your Business**

Custom design, mobile responsive development, SEO setup, AI chatbot, and first-year hosting — all included in one simple website package.

CTA: **Build My Website**

---

### Problem Section

**Your website should not just exist. It should convert.**

Many business websites look outdated, load slowly, and fail to guide visitors toward action. DJAI builds websites with clear structure, premium visuals, mobile-first design, and smart AI support.

---

### Feature Section

**Everything You Need to Launch Online**

- Custom Design
- Mobile Responsive Development
- SEO Foundation
- AI Chatbot Setup
- First-Year Hosting
- Clear CTA Structure

---

### AI Chatbot Section

**Turn Your Website Into a 24/7 Customer Assistant**

Your website should not only display information. With an AI chatbot, it can answer common questions, guide visitors, and help customers take action even when your team is offline.

---

### Process Section

**Simple Process. Premium Result.**

1. Tell us about your business
2. Choose your website package
3. We design, build, and set up AI
4. Your website goes live

---

### Why DJAI Section

**Not Just a Website. A Launch System.**

DJAI combines website design, development, SEO, AI chatbot setup, hosting, and launch support into one streamlined service for modern businesses.

---

### Final CTA

**Ready to Launch Your Website?**

Start with a landing page or build a complete business website with DJAI.

CTA: **Get Started with DJAI**

---

## 22. Technical Implementation Notes for Codex

Codex should inspect the existing project first and determine the stack.

Possible stacks:

- Static HTML/CSS/JS
- React
- Next.js
- Vite
- Astro
- Other existing framework

Codex must preserve the existing deployment compatibility for `promo.djai.academy`.

### Implementation Steps

1. Inspect current codebase structure
2. Identify framework and routing system
3. Locate current landing page component/file
4. Back up or preserve current content where appropriate
5. Create reusable design tokens for colors, spacing, typography, and gradients
6. Create pricing data object
7. Build desktop landing page layout
8. Build mobile slide deck layout
9. Add animation layer
10. Add responsive switching between desktop and mobile layouts
11. Add SEO metadata
12. Test desktop, tablet, and mobile
13. Test all CTA buttons
14. Optimize performance
15. Run lint/build/test commands
16. Fix errors
17. Provide final summary of changed files and behavior

---

## 23. Suggested File Structure

If React / Next.js:

```txt
src/
  components/
    promo/
      AnimatedBackground.tsx
      GradientButton.tsx
      GlassCard.tsx
      HeroSection.tsx
      ProblemSection.tsx
      FeatureGrid.tsx
      PricingSection.tsx
      PricingCard.tsx
      AIChatbotSection.tsx
      ProcessSection.tsx
      WhyDJAISection.tsx
      FAQSection.tsx
      FinalCTASection.tsx
      MobileSlideDeck.tsx
      MobileSlide.tsx
      ProgressDots.tsx
  data/
    promoPackages.ts
  styles/
    promo.css
```

If static HTML/CSS/JS:

```txt
index.html
assets/
  css/
    style.css
    promo.css
  js/
    promo.js
  images/
    djai-preview.png
```

Codex should adapt this structure to the existing app instead of forcing a new structure.

---

## 24. Acceptance Criteria

The implementation is complete when:

### Content

- The hero clearly positions DJAI as an AI-powered web studio
- The three packages appear in the correct order:
  1. Landing Page
  2. Additional Page
  3. Complete Website
- Each package shows original price with strikethrough
- Each package shows promo price clearly
- Complete Website is emphasized as best value
- AI chatbot, SEO, mobile responsive design, and hosting are clearly mentioned

### Design

- Site uses dark premium background
- Site uses cyan and violet gradient theme
- Cards use glassmorphism or premium dark card styling
- CTA buttons are visually strong
- Design feels high-level and modern
- No cheap template feeling

### Mobile

- Mobile uses vertical full-screen slide sections
- Swiping down/up moves between slides naturally
- Each mobile slide has one main message
- Pricing packages appear as individual slides
- Progress indicator or slide hint is visible
- No content is cut off on common mobile screen sizes

### Desktop

- Desktop uses cinematic scroll layout
- Pricing section works in 3-column layout
- Animations enhance but do not distract
- CTAs are visible and usable

### Technical

- Site builds successfully
- No console errors
- Responsive behavior works
- CTA buttons work
- SEO metadata exists
- Page remains performant
- Reduced motion preference is respected

---




## 25. Final Direction

The final website should make DJAI feel like a serious, premium, AI-powered development brand.

The visitor should immediately understand:

1. DJAI builds professional business websites
2. The website includes design, SEO, AI chatbot, mobile optimization, and hosting
3. There is a strong launch promotion
4. The Landing Page starts from 5,000 THB
5. The Complete Website is the best-value package at 10,000 THB
6. The mobile experience feels modern, animated, and memorable

The design should feel like a high-level development studio, not a basic pricing flyer.

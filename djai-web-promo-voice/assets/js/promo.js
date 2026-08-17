const promoData = {
  countdownEndsAt: "2026-08-31T23:59:59+07:00",
  contactUrl: "https://dev.djai.academy/contact-us/",
  urgency: {
    label: "Limited Time Only",
    offer: "Special Launch Pricing",
    dates: "July & August 2026",
  },
  header: {
    badge: "Website Packages",
    title: "Your Website, Ready to Launch",
    subtitle:
      "Professional design, built-in SEO, AI chatbot, and hosting &mdash; all included in every package.",
  },
  packages: [
    {
      title: "Landing Page",
      description: "Perfect for launching your idea with a single, high-converting page.",
      icon: "https://img.icons8.com/ios-filled/100/00d8ff/web.png",
      iconClass: "icon-cyan",
      glowClass: "card-glow-cyan",
      buttonClass: "btn-gradient",
      promoPrice: "5,000",
      originalPrice: "10,000 THB",
      originalBadge: "Save 50%",
      popularTag: "Most Popular",
      cta: "Get Started",
      renewalNote: "3,000 THB/year after 1st year",
      features: [
        "1 Page &mdash; Custom Design",
        "SEO Optimization",
        "AI Chat Bot (Auto CTA) &mdash; <span class=\"highlight-offer\">1-Month Free Trial</span>",
        "Free Hosting &mdash; 1st Year",
        "Mobile Responsive",
        "Fast Turnaround",
      ],
    },
    {
      title: "Additional Page",
      description: "Expand your existing website with extra pages, same quality &amp; design.",
      iconSvg:
        '<svg viewBox="0 0 24 24" fill="none" stroke="#2d8cff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"></path><path d="M14 3v5h5"></path><path d="M12 11v6"></path><path d="M9 14h6"></path></svg>',
      iconClass: "icon-blue",
      glowClass: "card-glow-blue",
      buttonClass: "btn-blue",
      promoPrice: "3,000",
      priceUnit: "/page",
      originalPrice: "5,000 THB /page",
      cta: "Add Page",
      renewalNote: "Covered under your maintenance plan",
      features: [
        "Add To Any Project",
        "Design Consistency",
        "SEO Optimized",
        "AI Chat Bot &mdash; <span class=\"highlight-offer\">1-Month Free Trial</span>",
        "Quick Turnaround",
        "Mobile Responsive",
      ],
    },
    {
      title: "Complete Website",
      description: "A full 5-page business website &mdash; everything you need to go online.",
      icon: "https://img.icons8.com/ios-filled/100/c653ff/domain.png",
      iconClass: "icon-purple",
      glowClass: "card-glow-purple",
      buttonClass: "btn-purple",
      featured: true,
      featuredRibbon: "Best Value",
      promoPrice: "10,000",
      originalPrice: "20,000 THB",
      originalBadge: "Save 50%",
      cta: "Build My Website",
      renewalNote: "3,000 THB/year after 1st year",
      comparison: [
        ["5 pages individually", "15,000 THB", ""],
        ["Bundle price", "10,000 THB", "comparison-save"],
        ["You save", "5,000 THB", "comparison-highlight"],
      ],
      features: [
        "5 Pages &mdash; Custom Design",
        "SEO Optimization",
        "AI Chat Bot (Auto CTA) &mdash; <span class=\"highlight-offer\">1-Month Free Trial</span>",
        "Free Hosting &mdash; 1st Year",
        "Contact Form",
        "Social Media Integration",
        "Mobile Responsive",
        "Priority Support",
      ],
    },
  ],
  chatbot: {
    iconSvg:
      '<svg viewBox="0 0 24 24" fill="none" stroke="#00d8ff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 10h10"></path><path d="M7 14h6"></path><path d="M5 19l-2 2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2z"></path></svg>',
    title: "AI Chat Bot (Auto CTA)",
    description:
      "Engage visitors &amp; capture leads 24/7 &mdash; <span>Start with a 1-Month Free Trial</span>",
    cta: "Claim Free Trial",
  },
  trustItems: ["No Hidden Fees", "Money-Back Guarantee", "Free Revisions"],
  includes: [
    {
      icon: "https://img.icons8.com/ios-filled/100/00d8ff/design.png",
      iconClass: "icon-wrap-cyan",
      title: "Custom Web Design",
      description: "Unique design tailored to your brand &mdash; never a template.",
    },
    {
      icon: "https://img.icons8.com/ios-filled/100/c653ff/google-web-search.png",
      iconClass: "icon-wrap-purple",
      title: "SEO Optimization",
      description: "Your site optimized to rank on Google from day one.",
    },
    {
      iconSvg:
        '<svg viewBox="0 0 24 24" fill="none" stroke="#2d8cff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 10h10"></path><path d="M7 14h6"></path><path d="M5 19l-2 2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2z"></path></svg>',
      iconClass: "icon-wrap-blue",
      title: "AI Chat Bot (Auto CTA)",
      description:
        "Engages visitors &amp; captures leads 24/7 &mdash; <span class=\"include-highlight\">1-Month Free Trial</span>",
    },
    {
      icon: "https://img.icons8.com/ios-filled/100/00d8ff/server.png",
      iconClass: "icon-wrap-cyan",
      title: "Free Hosting (1st Year)",
      description: "Fast &amp; secure hosting included. 3,000 THB/year after.",
    },
  ],
  aiConsultant: {
    badge: "AI Website Consultant",
    desktopTitle: "Talk to DJAI AI Consultant",
    desktopSubtitle:
      "Not sure which package fits your business? Ask our AI consultant about pricing, packages, AI chatbot integration, SEO, hosting, maintenance, or custom website requirements.",
    desktopSupport:
      "Our AI consultant can help you choose the right package, answer objections, and collect your project details for quotation.",
    mobileTitle: "Not sure which package fits your business?",
    mobileSubtitle:
      "Chat with our AI consultant to compare packages, ask questions, and request a quotation.",
    benefits: [
      "Compare packages instantly",
      "Get answers about pricing and included services",
      "Request a custom quotation",
      "Leave your contact for follow-up",
    ],
    welcome:
      "Hi, I&rsquo;m your DJAI AI Consultant. I can help you choose the right website package, explain pricing, answer questions, or prepare a custom quotation. What would you like to build?",
    initialChips: [
      ["landing", "Landing Page &mdash; 5,000 THB"],
      ["full", "Full Website &mdash; 10,000 THB"],
      ["additional", "Additional Page &mdash; 3,000 THB/page"],
      ["custom", "Custom Quotation"],
    ],
    ctaChips: [
      ["contact", "Leave my contact"],
      ["compare", "Compare packages"],
      ["custom", "Need custom quote"],
    ],
  },
};

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };

    return entities[char];
  });
}

function renderCountdownMarkup(prefix) {
  return `
    <div class="urgency-countdown">
      <div class="countdown-item">
        <span class="countdown-number" data-countdown="${prefix}:days">00</span>
        <span class="countdown-label">Days</span>
      </div>
      <span class="countdown-separator">:</span>
      <div class="countdown-item">
        <span class="countdown-number" data-countdown="${prefix}:hours">00</span>
        <span class="countdown-label">Hours</span>
      </div>
      <span class="countdown-separator">:</span>
      <div class="countdown-item">
        <span class="countdown-number" data-countdown="${prefix}:minutes">00</span>
        <span class="countdown-label">Minutes</span>
      </div>
      <span class="countdown-separator">:</span>
      <div class="countdown-item">
        <span class="countdown-number" data-countdown="${prefix}:seconds">00</span>
        <span class="countdown-label">Seconds</span>
      </div>
    </div>
  `;
}

function renderUrgency(prefix) {
  return `
    <div class="urgency-banner">
      <div class="urgency-glow"></div>
      <div class="urgency-shine"></div>
      <div class="urgency-content">
        <div class="urgency-icon-left">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            <path d="M11 1L14 8L21 11L14 14L11 21L8 14L1 11L8 8L11 1Z" fill="#FFD700" stroke="#FFA500" stroke-width="0.5"/>
          </svg>
        </div>
        <div class="urgency-text-block">
          <span class="urgency-label">${promoData.urgency.label}</span>
          <span class="urgency-divider-dot">&middot;</span>
          <span class="urgency-offer">${promoData.urgency.offer}</span>
          <span class="urgency-divider-dot">&middot;</span>
          <span class="urgency-dates">${promoData.urgency.dates}</span>
        </div>
        <div class="urgency-icon-right">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            <path d="M11 1L14 8L21 11L14 14L11 21L8 14L1 11L8 8L11 1Z" fill="#FFD700" stroke="#FFA500" stroke-width="0.5"/>
          </svg>
        </div>
      </div>
      ${renderCountdownMarkup(prefix)}
    </div>
  `;
}

function renderHeader() {
  return `
    <div class="section-header">
      <div class="header-badge">
        <span class="badge-dot"></span>
        ${promoData.header.badge}
      </div>
      <h2>${promoData.header.title}</h2>
      <p>${promoData.header.subtitle}</p>
    </div>
  `;
}

function renderPackageCard(pkg, singleSlide = false) {
  const originalPriceRow = pkg.originalPrice
    ? `
      <div class="price-discount-row">
        <span class="original-price">${pkg.originalPrice}</span>
        ${pkg.originalBadge ? `<span class="discount-badge">${pkg.originalBadge}</span>` : ""}
      </div>
    `
    : "";

  const comparison = pkg.comparison
    ? `
      <div class="price-comparison">
        ${pkg.comparison
          .map(
            ([label, value, rowClass], index) => `
              ${index === 2 ? `<div class="comparison-divider"></div>` : ""}
              <div class="comparison-row ${rowClass}">
                <span class="comparison-label">${label}</span>
                <span class="comparison-value">${value}</span>
              </div>
            `,
          )
          .join("")}
      </div>
    `
    : "";

  return `
    <div class="pricing-card ${pkg.featured ? "card-featured" : ""}">
      <div class="card-bg-glow ${pkg.glowClass}"></div>
      <div class="card-inner-border ${pkg.featured ? "featured-border" : ""}"></div>
      ${pkg.featured ? '<div class="featured-shimmer"></div>' : ""}
      ${pkg.featuredRibbon ? `<div class="best-value-ribbon">${pkg.featuredRibbon}</div>` : ""}

      <div class="card-top">
        <div class="card-icon-circle ${pkg.iconClass}">
          ${pkg.iconSvg ? `<span class="icon-svg">${pkg.iconSvg}</span>` : `<img decoding="async" src="${pkg.icon}" alt="">`}
        </div>
        ${pkg.popularTag ? `<span class="popular-tag">${pkg.popularTag}</span>` : ""}
      </div>

      <div class="card-middle">
        <h3>${pkg.title}</h3>
        <p class="card-description">${pkg.description}</p>

        <div class="price-block">
          <div class="price-main">
            <span class="price-symbol">THB</span>
            <span class="price-value">${pkg.promoPrice}</span>
            ${pkg.priceUnit ? `<span class="price-unit">${pkg.priceUnit}</span>` : ""}
          </div>
          ${originalPriceRow}
        </div>

        ${comparison}

        <div class="card-separator"></div>

        <ul class="check-list">
          ${pkg.features.map((feature) => `<li>${feature}</li>`).join("")}
        </ul>
      </div>

      <div class="card-bottom">
        <a href="${promoData.contactUrl}" class="btn-primary ${pkg.buttonClass} ${pkg.featured ? "btn-featured" : ""}">
          ${pkg.cta} <span class="btn-arrow">→</span>
          ${pkg.featured ? '<span class="btn-pulse"></span>' : ""}
        </a>
        <p class="renewal-note">
          <span class="renewal-icon">↻</span> ${pkg.renewalNote}
        </p>
      </div>
    </div>
  `;
}

function renderChatbotBanner() {
  return `
    <div class="chatbot-cta-banner">
      <div class="chatbot-cta-glow"></div>
      <div class="chatbot-cta-content">
        <div class="chatbot-cta-icon">
          <span class="icon-svg">${promoData.chatbot.iconSvg}</span>
        </div>
        <div class="chatbot-cta-text">
          <h4>${promoData.chatbot.title}</h4>
          <p>${promoData.chatbot.description}</p>
        </div>
        <a href="${promoData.contactUrl}" class="chatbot-cta-btn">
          ${promoData.chatbot.cta} <span>→</span>
        </a>
      </div>
    </div>
  `;
}

function renderTrustStrip() {
  return `
    <div class="trust-strip">
      ${promoData.trustItems
        .map(
          (item, index) => `
            <div class="trust-item">
              <span class="trust-icon">✓</span>
              <span>${item}</span>
            </div>
            ${index < promoData.trustItems.length - 1 ? '<div class="trust-divider"></div>' : ""}
          `,
        )
        .join("")}
    </div>
  `;
}

function renderIncludes() {
  return `
    <div class="includes-section">
      <div class="includes-header">
        <h4>Every Package Includes These For Free</h4>
        <p>No hidden fees. No surprises. Just everything you need to go live.</p>
      </div>
      <div class="includes-grid">
        ${promoData.includes
          .map(
            (item) => `
              <div class="include-card">
                <div class="include-glow"></div>
                <div class="include-icon-wrap ${item.iconClass}">
                  ${item.iconSvg ? `<span class="icon-svg">${item.iconSvg}</span>` : `<img decoding="async" src="${item.icon}" alt="">`}
                </div>
                <div class="include-text">
                  <strong>${item.title}</strong>
                  <span>${item.description}</span>
                </div>
              </div>
            `,
          )
          .join("")}
      </div>
    </div>
  `;
}

function renderLeadSummaryCard() {
  return `
    <div class="lead-summary-card" hidden>
      <strong>Project Request Summary</strong>
      <dl>
        <div>
          <dt>Package interest</dt>
          <dd>Landing Page</dd>
        </div>
        <div>
          <dt>Business type</dt>
          <dd>Cafe or local service</dd>
        </div>
        <div>
          <dt>Contact</dt>
          <dd>Waiting for customer details</dd>
        </div>
      </dl>
      <div class="lead-summary-actions">
        <button type="button">Submit Request</button>
        <button type="button">Edit Details</button>
      </div>
    </div>
  `;
}

function renderAiChatCard(instanceId) {
  return `
    <div class="ai-chat-card" data-ai-chatbot="${instanceId}">
      <div class="ai-chat-header">
        <div class="ai-chat-identity">
          <div class="ai-avatar" aria-hidden="true">AI</div>
          <div>
            <h3>DJAI AI Consultant</h3>
            <p><span class="ai-status-dot"></span>Online now &bull; Website package advisor</p>
          </div>
        </div>
        <button type="button" class="ai-reset-button" data-ai-reset>Reset</button>
      </div>

      <div class="ai-chat-body" data-ai-chat-body aria-live="polite">
        <div class="ai-message ai-message-bot">
          <div class="ai-message-avatar" aria-hidden="true">D</div>
          <div class="ai-message-bubble">${promoData.aiConsultant.welcome}</div>
        </div>
        ${renderLeadSummaryCard()}
      </div>

      <div class="ai-quick-chips" data-ai-chips>
        ${promoData.aiConsultant.initialChips
          .map(([action, label]) => `<button type="button" class="ai-chip" data-ai-action="${action}">${label}</button>`)
          .join("")}
      </div>

      <form class="ai-chat-input" data-ai-form>
        <input
          type="text"
          data-ai-input
          autocomplete="off"
          placeholder="Ask about packages, pricing, or your website idea..."
          aria-label="Ask about packages, pricing, or your website idea"
        />
        <button type="submit" class="ai-send-button" aria-label="Send message">
          <span>Send</span>
          <span aria-hidden="true">→</span>
        </button>
      </form>

      <p class="ai-privacy-note">Share only contact details you want DJAI to use for follow-up.</p>
    </div>
  `;
}

function renderAiChatSection(mode = "desktop") {
  const isMobile = mode === "mobile";

  return `
    <section class="ai-chat-section ${isMobile ? "ai-chat-section-mobile" : ""}" id="${isMobile ? "mobile-ai-consultant" : "ai-consultant"}">
      <div class="ai-chat-glow"></div>
      <div class="ai-chat-copy">
        <div class="ai-chat-badge">
          <span class="badge-dot"></span>
          ${promoData.aiConsultant.badge}
        </div>
        <h2>${isMobile ? promoData.aiConsultant.mobileTitle : promoData.aiConsultant.desktopTitle}</h2>
        <p>${isMobile ? promoData.aiConsultant.mobileSubtitle : promoData.aiConsultant.desktopSubtitle}</p>
        ${isMobile ? "" : `<p class="ai-chat-support">${promoData.aiConsultant.desktopSupport}</p>`}
        ${
          isMobile
            ? ""
            : `<ul class="ai-chat-benefits">${promoData.aiConsultant.benefits
                .map((benefit) => `<li>${benefit}</li>`)
                .join("")}</ul>`
        }
      </div>
      ${renderAiChatCard(mode)}
    </section>
  `;
}

function renderDesktopView() {
  return `
    <div class="desktop-view">
      <div class="section-shell">
        <section class="web-pricing-section" id="packages">
          <div class="section-bg-pattern"></div>
          ${renderUrgency("desktop")}
          ${renderHeader()}
          <div class="pricing-cards-row">
            ${promoData.packages.map((pkg) => renderPackageCard(pkg)).join("")}
          </div>
          ${renderChatbotBanner()}
          ${renderTrustStrip()}
          ${renderIncludes()}
          ${renderAiChatSection("desktop")}
        </section>
      </div>
    </div>
  `;
}

function renderMobileSlides() {
  const [landing, additional, complete] = promoData.packages;

  const slides = [
    `
      <section class="mobile-slide" id="slide-intro" data-slide-index="0">
        <div class="mobile-slide-panel">
          <div class="mobile-slide-content">
            <section class="web-pricing-section">
              <div class="section-bg-pattern"></div>
              ${renderUrgency("mobile-intro")}
              ${renderHeader()}
            </section>
          </div>
        </div>
      </section>
    `,
    `
      <section class="mobile-slide" id="slide-landing" data-slide-index="1">
        <div class="mobile-slide-panel">
          <div class="mobile-slide-content">
            <section class="web-pricing-section">
              <div class="section-bg-pattern"></div>
              <div class="pricing-cards-row">
                ${renderPackageCard(landing, true)}
              </div>
            </section>
          </div>
        </div>
      </section>
    `,
    `
      <section class="mobile-slide" id="slide-additional" data-slide-index="2">
        <div class="mobile-slide-panel">
          <div class="mobile-slide-content">
            <section class="web-pricing-section">
              <div class="section-bg-pattern"></div>
              <div class="pricing-cards-row">
                ${renderPackageCard(additional, true)}
              </div>
            </section>
          </div>
        </div>
      </section>
    `,
    `
      <section class="mobile-slide" id="slide-complete" data-slide-index="3">
        <div class="mobile-slide-panel">
          <div class="mobile-slide-content">
            <section class="web-pricing-section">
              <div class="section-bg-pattern"></div>
              <div class="pricing-cards-row">
                ${renderPackageCard(complete, true)}
              </div>
            </section>
          </div>
        </div>
      </section>
    `,
    `
      <section class="mobile-slide" id="slide-chatbot" data-slide-index="4">
        <div class="mobile-slide-panel">
          <div class="mobile-slide-content">
            <section class="web-pricing-section">
              <div class="section-bg-pattern"></div>
              ${renderChatbotBanner()}
              ${renderTrustStrip()}
            </section>
          </div>
        </div>
      </section>
    `,
    `
      <section class="mobile-slide" id="slide-includes" data-slide-index="5">
        <div class="mobile-slide-panel">
          <div class="mobile-slide-content">
            <section class="web-pricing-section" id="includes">
              <div class="section-bg-pattern"></div>
              ${renderIncludes()}
            </section>
          </div>
        </div>
      </section>
    `,
    `
      <section class="mobile-slide mobile-slide-ai-chat" id="slide-ai-consultant" data-slide-index="6">
        <div class="mobile-slide-panel">
          <div class="mobile-slide-content">
            <section class="web-pricing-section">
              <div class="section-bg-pattern"></div>
              ${renderAiChatSection("mobile")}
            </section>
          </div>
        </div>
      </section>
    `,
  ];

  return `
    <div class="mobile-view">
      <div class="mobile-progress" aria-label="Slide progress">
        ${slides
          .map(
            (_, index) =>
              `<button type="button" data-progress-index="${index}" aria-label="Go to slide ${index + 1}"></button>`,
          )
          .join("")}
      </div>
      <div class="mobile-slides" id="mobile-slides">
        ${slides.join("")}
      </div>
    </div>
  `;
}

function renderPage() {
  const app = document.querySelector("#app");

  app.innerHTML = `
    <a class="skip-link" href="#packages">Skip to packages</a>
    <div class="page-shell">
      ${renderDesktopView()}
      ${renderMobileSlides()}
    </div>
  `;
}

function updateCountdown() {
  const end = new Date(promoData.countdownEndsAt).getTime();
  const diff = Math.max(0, end - Date.now());

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  const values = {
    days,
    hours,
    minutes,
    seconds,
  };

  document.querySelectorAll("[data-countdown]").forEach((field) => {
    const [, unit] = field.dataset.countdown.split(":");
    field.textContent = String(values[unit]).padStart(2, "0");
  });
}

function bindMobileSlides() {
  const slidesRoot = document.querySelector("#mobile-slides");
  if (!slidesRoot) {
    return;
  }

  const slides = [...slidesRoot.querySelectorAll(".mobile-slide")];
  const dots = [...document.querySelectorAll("[data-progress-index]")];

  function setActive(index) {
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === index);
    });

    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === index);
      dot.setAttribute("aria-current", dotIndex === index ? "step" : "false");
    });
  }

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const index = Number(dot.dataset.progressIndex);
      slides[index].scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  if (!("IntersectionObserver" in window)) {
    setActive(0);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(slides.indexOf(entry.target));
        }
      });
    },
    { root: slidesRoot, threshold: 0.6 },
  );

  slides.forEach((slide) => observer.observe(slide));
  setActive(0);

  const hash = window.location.hash;
  if (hash) {
    const targetSlide = slides.find((slide) => `#${slide.id}` === hash);
    if (targetSlide) {
      window.requestAnimationFrame(() => {
        targetSlide.scrollIntoView({ behavior: "auto", block: "start" });
      });
    }
  }
}

function getAiResponse(action, message) {
  const normalized = `${action || ""} ${message || ""}`.toLowerCase();

  if (action === "contact" || normalized.includes("contact") || normalized.includes("whatsapp") || normalized.includes("phone")) {
    return {
      text:
        "Great. Please send your name and phone/WhatsApp/Line contact, and our team will follow up with you.",
      chips: [],
    };
  }

  if (action === "landing" || normalized.includes("landing")) {
    return {
      text:
        "The Landing Page package is currently 5,000 THB, discounted from 10,000 THB. It is best for promotions, menus, campaigns, portfolios, or a simple business launch. Would you like me to collect your contact for this package?",
      chips: promoData.aiConsultant.ctaChips,
    };
  }

  if (action === "full" || normalized.includes("full") || normalized.includes("complete") || normalized.includes("website")) {
    return {
      text:
        "The Complete Website package is currently 10,000 THB, discounted from 20,000 THB. It includes a 5-page business website with mobile responsive design, SEO setup, AI chatbot trial, and first-year hosting & maintenance. Would you like a quotation?",
      chips: promoData.aiConsultant.ctaChips,
    };
  }

  if (action === "additional" || normalized.includes("additional") || normalized.includes("extra page") || normalized.includes("page")) {
    return {
      text:
        "Additional pages are 3,000 THB/page, discounted from 5,000 THB/page. This is suitable if you already have a website and want to expand it with more pages.",
      chips: promoData.aiConsultant.ctaChips,
    };
  }

  if (action === "custom" || normalized.includes("custom") || normalized.includes("quote") || normalized.includes("quotation")) {
    return {
      text:
        "Sure. I can help collect the basic project requirements first. What type of business is this website for, and what features do you need?",
      chips: [["contact", "Leave my contact"], ["compare", "Compare packages"]],
    };
  }

  if (action === "compare" || normalized.includes("compare")) {
    return {
      text:
        "Landing Page is best for one focused offer. Additional Page is for expanding an existing site. Complete Website is best when you need a full 5-page business website with stronger structure and value.",
      chips: promoData.aiConsultant.initialChips,
    };
  }

  return {
    text:
      "Thanks. I can help with that. DJAI websites include professional design, mobile responsive layout, SEO foundation, AI chatbot option, and first-year hosting & maintenance. Could you tell me what kind of website you want to build?",
    chips: promoData.aiConsultant.ctaChips,
  };
}

function renderAiChips(chips) {
  return chips.map(([action, label]) => `<button type="button" class="ai-chip" data-ai-action="${action}">${label}</button>`).join("");
}

function bindAiChatbots() {
  document.querySelectorAll("[data-ai-chatbot]").forEach((chatbot) => {
    const body = chatbot.querySelector("[data-ai-chat-body]");
    const chips = chatbot.querySelector("[data-ai-chips]");
    const form = chatbot.querySelector("[data-ai-form]");
    const input = chatbot.querySelector("[data-ai-input]");
    const reset = chatbot.querySelector("[data-ai-reset]");
    let responseTimer;

    function scrollBody() {
      body.scrollTop = body.scrollHeight;
    }

    function addMessage(role, text) {
      const message = document.createElement("div");
      message.className = `ai-message ai-message-${role}`;
      message.innerHTML =
        role === "bot"
          ? `<div class="ai-message-avatar" aria-hidden="true">D</div><div class="ai-message-bubble">${text}</div>`
          : `<div class="ai-message-bubble">${escapeHtml(text)}</div>`;
      body.appendChild(message);
      scrollBody();
    }

    function showTyping() {
      const typing = document.createElement("div");
      typing.className = "ai-message ai-message-bot ai-typing-message";
      typing.innerHTML = `
        <div class="ai-message-avatar" aria-hidden="true">D</div>
        <div class="ai-message-bubble ai-typing" aria-label="DJAI AI Consultant is typing">
          <span></span><span></span><span></span>
        </div>
      `;
      body.appendChild(typing);
      scrollBody();
      return typing;
    }

    function sendMessage(label, action = "") {
      const cleanLabel = label.trim();
      if (!cleanLabel) {
        return;
      }

      window.clearTimeout(responseTimer);
      addMessage("user", cleanLabel);
      chips.innerHTML = "";

      const typing = showTyping();
      responseTimer = window.setTimeout(() => {
        typing.remove();
        const response = getAiResponse(action, cleanLabel);
        addMessage("bot", response.text);
        chips.innerHTML = renderAiChips(response.chips.length ? response.chips : promoData.aiConsultant.initialChips);
      }, 620);
    }

    chips.addEventListener("click", (event) => {
      const chip = event.target.closest("[data-ai-action]");
      if (!chip) {
        return;
      }

      sendMessage(chip.textContent, chip.dataset.aiAction);
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      sendMessage(input.value);
      input.value = "";
    });

    reset.addEventListener("click", () => {
      window.clearTimeout(responseTimer);
      body.innerHTML = `
        <div class="ai-message ai-message-bot">
          <div class="ai-message-avatar" aria-hidden="true">D</div>
          <div class="ai-message-bubble">${promoData.aiConsultant.welcome}</div>
        </div>
        ${renderLeadSummaryCard()}
      `;
      chips.innerHTML = renderAiChips(promoData.aiConsultant.initialChips);
      input.value = "";
      scrollBody();
    });
  });
}

renderPage();
updateCountdown();
window.setInterval(updateCountdown, 1000);
bindMobileSlides();
bindAiChatbots();

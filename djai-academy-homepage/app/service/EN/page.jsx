import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";

export const metadata = {
  title: "DJAI Services | Custom Apps, SaaS, AI Automation, Fintech and Web3",
  description:
    "DJAI provides custom software development services for websites, web apps, mobile apps, SaaS, AI automation, CRM, POS, fintech, games, and Web3 products.",
  alternates: {
    canonical: "/service/EN/",
    languages: {
      en: "/service/EN/",
      th: "/service/th/"
    }
  },
  openGraph: {
    title: "DJAI Services",
    description:
      "Custom development services covering web apps, mobile apps, SaaS, AI automation, business systems, fintech, games, and Web3.",
    url: "/service/EN/",
    siteName: "DJAI Academy",
    images: ["/portfolio/websites/Siamese_Cat_Cafe.png"],
    type: "website"
  }
};

const services = [
  {
    title: "Websites and Landing Pages",
    text: "Corporate websites, local business sites, product landing pages, ecommerce storefronts, booking pages, and SEO-ready content structures.",
    keywords: ["Corporate websites", "Ecommerce", "Landing pages", "Local business SEO"]
  },
  {
    title: "Web Apps and SaaS Platforms",
    text: "Customer portals, dashboards, subscription platforms, marketplace systems, admin panels, reporting tools, and multi-user SaaS products.",
    keywords: ["SaaS", "Dashboards", "Portals", "Marketplaces"]
  },
  {
    title: "Mobile App Development",
    text: "Consumer apps, business apps, community apps, booking apps, companion apps, and cross-platform mobile experiences.",
    keywords: ["iOS and Android", "React Native", "User accounts", "Push workflows"]
  },
  {
    title: "AI Automation and Agents",
    text: "Automated workflows, AI assistants, document processing, business process automation, chatbot systems, and voice bot experiences.",
    keywords: ["AI agents", "Chatbots", "Voice bots", "Workflow automation"]
  },
  {
    title: "RAG and Database AI Systems",
    text: "AI systems connected to company knowledge, documents, databases, policies, manuals, customer records, and internal operating data.",
    keywords: ["RAG", "Knowledge base", "Database AI", "Internal search"]
  },
  {
    title: "CRM and Corporate Systems",
    text: "CRM platforms, corporate management systems, staff workflows, approval flows, inventory tools, operations dashboards, and business reporting.",
    keywords: ["CRM", "ERP-style tools", "Operations", "Management systems"]
  },
  {
    title: "POS, Payment and Fintech Apps",
    text: "POS systems, payment applications, wallet experiences, card product workflows, transaction dashboards, and finance-adjacent product flows.",
    keywords: ["POS", "Payments", "Wallets", "Fintech"]
  },
  {
    title: "Games and Interactive Products",
    text: "Mini-games, viral marketing games, Telegram games, prediction games, gamified loyalty systems, and interactive campaign products.",
    keywords: ["Mini-games", "Telegram games", "Gamification", "Leaderboards"]
  },
  {
    title: "Crypto and Web3 Products",
    text: "Crypto wallets, NFT marketplaces, tokenized ecosystems, staking flows, on-chain games, Web3 dashboards, and RWA product planning.",
    keywords: ["Web3", "NFT marketplace", "Crypto wallet", "Token systems"]
  }
];

const engagementModels = [
  {
    title: "MVP Build",
    text: "For founders or teams that need the fastest useful version to test with real users."
  },
  {
    title: "Business Automation",
    text: "For SMEs and companies that need to reduce manual work, delays, and repeated operations."
  },
  {
    title: "Product Expansion",
    text: "For existing businesses that need new features, integrations, mobile apps, or AI layers."
  },
  {
    title: "Technical Rescue",
    text: "For projects that need cleanup, rebuild planning, performance fixes, or a clearer launch path."
  }
];

const relatedPages = [
  ["Development Approach", "https://djai.academy/development/EN/"],
  ["Portfolio", "https://djai.academy/portfolio/EN/"],
  ["Free Tools", "https://djai.academy/tools/EN/"],
  ["Build Articles", "https://djai.academy/blog/EN/"]
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "DJAI Custom Software Development Services",
  url: "https://djai.academy/service/EN/",
  provider: {
    "@type": "Organization",
    name: "DJAI Academy",
    url: "https://djai.academy/"
  },
  areaServed: ["Thailand", "Singapore", "Global"],
  serviceType: services.map((service) => service.title),
  description:
    "Custom software development services for websites, apps, SaaS, AI automation, fintech, games, Web3, CRM, POS, and business systems.",
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
    url: "https://djai.academy/service/EN/"
  }
};

export default function ServicePage() {
  return (
    <>
      <SiteHeader locale="en" currentRoute="service" />
      <main className="service-page">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <section className="service-hero">
          <p className="eyebrow">DJAI services</p>
          <h1>Custom development for products, automation, and business systems.</h1>
          <p>
            DJAI covers a full range of development work: websites, web apps, mobile apps, SaaS,
            AI automation, CRM, POS, fintech applications, games, crypto apps, and Web3 systems.
            Bring us your requirement and we will help find the most practical build path.
          </p>
          <div className="service-hero-actions">
            <a className="button primary" href="mailto:contact@djai.academy">
              Request a Quote
            </a>
            <a className="button secondary dark" href="https://djai.academy/development/EN/">
              How We Develop
            </a>
            <a className="button secondary dark" href="https://djai.academy/portfolio/EN/">
              See Portfolio
            </a>
          </div>
        </section>

        <section className="service-summary-grid" aria-label="Service summary">
          <div>
            <strong>Full Product Build</strong>
            <span>From scope to launch</span>
          </div>
          <div>
            <strong>AI + Automation</strong>
            <span>For SMEs and companies</span>
          </div>
          <div>
            <strong>Fast MVP Delivery</strong>
            <span>Cost-aware execution</span>
          </div>
        </section>

        <section className="service-catalog">
          <div className="service-section-heading">
            <p className="eyebrow">Service catalog</p>
            <h2>Choose the category closest to what you need.</h2>
            <p>
              Many projects combine several services. A payment app may need mobile development,
              dashboards, security flows, and automation. A CRM may need AI search, reporting, and
              workflow approvals. We help join the pieces into one practical plan.
            </p>
          </div>
          <div className="service-card-grid">
            {services.map((service) => (
              <article className="service-card" key={service.title}>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <div>
                  {service.keywords.map((keyword) => (
                    <span key={keyword}>{keyword}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="service-models">
          <div className="service-section-heading">
            <p className="eyebrow">Engagement models</p>
            <h2>Different starting points, same goal: ship something useful.</h2>
          </div>
          <div className="service-model-grid">
            {engagementModels.map((model) => (
              <article key={model.title}>
                <h3>{model.title}</h3>
                <p>{model.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="service-related">
          <div>
            <p className="eyebrow">Explore more</p>
            <h2>See how DJAI builds and what we have shipped.</h2>
          </div>
          <div className="service-related-links">
            {relatedPages.map(([label, href]) => (
              <a href={href} key={label}>
                {label}
              </a>
            ))}
          </div>
        </section>

        <section className="service-cta">
          <div>
            <p className="eyebrow">Start with a requirement</p>
            <h2>You do not need a perfect technical brief.</h2>
            <p>
              Send the goal, current problem, reference product, or workflow you want to automate.
              DJAI will help identify the fastest and most cost-effective route.
            </p>
          </div>
          <a className="button primary" href="mailto:contact@djai.academy">
            contact@djai.academy
          </a>
        </section>
      </main>
      <SiteFooter locale="en" />
    </>
  );
}

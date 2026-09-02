import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";
import TrackedLink from "../../components/TrackedLink";

export const metadata = {
  title: "Choose a Software Development Service | DJAI",
  description:
    "Choose a DJAI service category by the business problem, typical deliverable, and next step before shaping the requirement with Development.",
  alternates: {
    canonical: "/service/en/",
    languages: {
      en: "/service/en/",
      th: "/service/",
      vi: "/service/vi/",
      "x-default": "/service/"
    }
  },
  openGraph: {
    title: "DJAI Services",
    description:
      "Custom development services covering web apps, mobile apps, SaaS, AI automation, business systems, fintech, games, and Web3.",
    url: "/service/en/",
    siteName: "DJAI Academy",
    images: [{ url: "/social/djai-development.webp", width: 1200, height: 630 }],
    type: "website"
  }
};

const services = [
  {
    title: "Websites and Landing Pages",
    problem: "Customers cannot quickly understand the offer, trust the business, or find the next action on the current site.",
    deliverable: "A corporate site, landing page, storefront, or booking flow with a clear content and enquiry path.",
    nextAction: "Discuss a website build"
  },
  {
    title: "Web Apps and SaaS Platforms",
    problem: "The work needs accounts, multiple user roles, managed data, or a workflow a standard website cannot support.",
    deliverable: "A web app, portal, dashboard, admin system, marketplace, or SaaS product with defined roles and flows.",
    nextAction: "Discuss a web application"
  },
  {
    title: "Mobile App Development",
    problem: "People need a repeated mobile workflow, device capability, notification, or experience that the web cannot provide well.",
    deliverable: "A customer or workforce app with the accounts, data flow, and integrations required by the use case.",
    nextAction: "Discuss a mobile app"
  },
  {
    title: "AI Automation and Agents",
    problem: "A team loses time to repeated handoffs, manual processing, or the same questions across disconnected systems.",
    deliverable: "An automated workflow, assistant, chatbot, voice system, or document process with explicit human checkpoints.",
    nextAction: "Discuss AI automation"
  },
  {
    title: "RAG and Database AI Systems",
    problem: "Useful information is scattered across documents, databases, policies, manuals, or a controlled knowledge base.",
    deliverable: "Search and answer workflows with defined sources, permissions, citations, and answer boundaries.",
    nextAction: "Discuss a RAG system"
  },
  {
    title: "CRM and Corporate Systems",
    problem: "Sales, approvals, inventory, or reporting still depend on spreadsheets and repeated messages between teams.",
    deliverable: "A CRM, approval flow, operations dashboard, or management system shaped around the actual daily process.",
    nextAction: "Discuss an internal system"
  },
  {
    title: "POS, Payment and Fintech Apps",
    problem: "The business needs a controlled sales, payment, wallet, or transaction workflow with clear roles and review points.",
    deliverable: "A POS, payment flow, wallet experience, or transaction dashboard with the security scope defined before build.",
    nextAction: "Discuss a fintech workflow"
  },
  {
    title: "Games and Interactive Products",
    problem: "A campaign or community needs an interaction that gives people a reason to play, compete, or return.",
    deliverable: "A mini-game, interactive campaign, leaderboard, or loyalty mechanic tied to a defined audience goal.",
    nextAction: "Discuss an interactive product"
  },
  {
    title: "Crypto and Web3 Products",
    problem: "The product has a defensible reason to use wallets, ownership, or an on-chain transaction.",
    deliverable: "A wallet flow, marketplace, dashboard, or on-chain experience with product scope and risk review kept explicit.",
    nextAction: "Discuss a Web3 product"
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
  ["Development Approach", "/development/en/"],
  ["Portfolio", "https://www.djai.academy/portfolio/en/"],
  ["Free Tools", "https://www.djai.academy/tools/en/"],
  ["Build Articles", "https://www.djai.academy/blog/en/"]
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "DJAI Custom Software Development Services",
  url: "https://www.djai.academy/service/en/",
  provider: {
    "@type": "Organization",
    name: "DJAI Academy",
    url: "https://www.djai.academy/"
  },
  areaServed: ["Thailand", "Singapore", "Global"],
  serviceType: services.map((service) => service.title),
  description:
    "Choose a software development service category by the business problem, typical deliverable, and next action before shaping a build with DJAI Development.",
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
    url: "https://www.djai.academy/service/en/"
  }
};

export default function ServicePage() {
  const enquiryEvent = {
    source_path: "/service/en/",
    locale: "en",
    cluster: "commercial",
    service_category: "not_selected",
    destination_type: "email",
    destination_url: "mailto:contact@djai.academy"
  };

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
          <h1>Choose the service category closest to the problem you need to solve.</h1>
          <p>
            Start with the blocked workflow, the people involved, and the result you need.
            Each category below explains the problem it fits, a typical deliverable, and the path
            to shape the requirement with Development. One project can span several categories.
          </p>
          <div className="service-hero-actions">
            <a className="button primary" href="#service-categories">
              Choose a Service
            </a>
            <a className="button secondary dark" href="/development/en/">
              How We Develop
            </a>
            <a className="button secondary dark" href="https://www.djai.academy/portfolio/en/">
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

        <section className="service-catalog" id="service-categories">
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
                <p><strong>Problem:</strong> {service.problem}</p>
                <p><strong>Typical deliverable:</strong> {service.deliverable}</p>
                <a href="/development/en/">{service.nextAction}</a>
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
          <TrackedLink className="button primary" href="mailto:contact@djai.academy" eventName="enquiry_start" eventParams={enquiryEvent}>
            contact@djai.academy
          </TrackedLink>
        </section>
      </main>
      <SiteFooter locale="en" />
    </>
  );
}

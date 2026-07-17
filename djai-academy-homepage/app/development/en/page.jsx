import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";

export const metadata = {
  title: "DJAI Development | Fast Custom Software, AI Automation and Apps",
  description:
    "DJAI helps founders, SMEs, and companies build web apps, mobile apps, SaaS platforms, AI automations, games, fintech products, and Web3 applications quickly and cost-effectively.",
  alternates: {
    canonical: "/development/en/",
    languages: {
      en: "/development/en/",
      th: "/development/"
    }
  },
  openGraph: {
    title: "DJAI Development",
    description:
      "Bring DJAI your requirements. We plan, design, build, automate, and launch software products with fast, cost-aware execution.",
    url: "/development/en/",
    siteName: "DJAI Academy",
    images: ["/portfolio/games/Xana_Metaverse.webp"],
    type: "website"
  }
};

const capabilityGroups = [
  {
    title: "Product Development",
    text: "Web apps, mobile apps, SaaS platforms, ecommerce, booking flows, dashboards, portals, and internal business systems.",
    items: ["Web applications", "Mobile apps", "SaaS platforms", "MVPs and prototypes"]
  },
  {
    title: "AI and Automation",
    text: "Automated workflows, AI assistants, chatbots, voice bots, RAG systems, document intelligence, and database-connected AI tools.",
    items: ["AI workflow automation", "Chatbots and voice bots", "RAG knowledge systems", "SME process automation"]
  },
  {
    title: "Fintech and Business Systems",
    text: "Payment applications, wallet products, POS systems, CRM platforms, corporate management systems, and operational software.",
    items: ["Payment apps", "Crypto wallets", "POS systems", "CRM and management systems"]
  },
  {
    title: "Games and Web3",
    text: "Browser games, Telegram mini-games, on-chain games, NFT marketplaces, token ecosystems, and crypto product infrastructure.",
    items: ["Mini-games", "Web3 apps", "NFT marketplaces", "Tokenized ecosystems"]
  }
];

const processSteps = [
  {
    title: "Requirement Review",
    text: "You bring the problem, idea, workflow, or business goal. We clarify the use case, users, risks, and must-have features."
  },
  {
    title: "Cost-Aware Scope",
    text: "We shape the smallest useful version first, then separate what should launch now from what can wait."
  },
  {
    title: "Fast Build Cycle",
    text: "Design, development, integrations, AI tooling, and testing run in tight cycles so you can see progress quickly."
  },
  {
    title: "Launch and Improve",
    text: "We help deploy, monitor, collect feedback, and plan the next product iteration after the first release."
  }
];

const proofLinks = [
  {
    title: "Portfolio",
    text: "See selected authorized websites, games, and Web3 products DJAI has delivered.",
    href: "https://www.djai.academy/portfolio/en/"
  },
  {
    title: "Services",
    text: "Scan the exact development services and product categories we cover.",
    href: "https://www.djai.academy/service/en/"
  },
  {
    title: "Free Tools",
    text: "Try public tools that show our product thinking and browser-based utility work.",
    href: "https://www.djai.academy/tools/en/"
  }
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "DJAI Development",
  url: "https://www.djai.academy/development/en/",
  description:
    "Custom software development, AI automation, SaaS, mobile apps, fintech applications, games, Web3 products, and internal business systems.",
  email: "contact@djai.academy",
  areaServed: ["Thailand", "Singapore", "Global"],
  provider: {
    "@type": "Organization",
    name: "DJAI Academy",
    url: "https://www.djai.academy/"
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "DJAI Development Capabilities",
    itemListElement: capabilityGroups.map((group) => ({
      "@type": "OfferCatalog",
      name: group.title,
      itemListElement: group.items.map((item) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: item
        }
      }))
    }))
  }
};

export default function DevelopmentPage() {
  return (
    <>
      <SiteHeader locale="en" currentRoute="development" />
      <main className="development-page">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <section className="development-hero">
          <div>
            <p className="eyebrow">Custom software development</p>
            <h1>Bring us your requirement. We help turn it into a working product.</h1>
            <p>
              DJAI builds across web apps, mobile apps, SaaS platforms, business automation,
              fintech workflows, AI systems, games, and Web3 products. Our strength is turning
              unclear ideas into practical launch plans at competitive cost and speed.
            </p>
            <div className="development-actions">
              <a className="button primary" href="mailto:contact@djai.academy">
                Start a Project
              </a>
              <a className="button secondary dark" href="https://www.djai.academy/portfolio/en/">
                View Portfolio
              </a>
            </div>
          </div>
          <div className="development-proof-card" aria-label="Development capability summary">
            <span>From idea to launch</span>
            <strong>Web, mobile, SaaS, automation, games, fintech and Web3</strong>
            <p>
              We help customers decide what to build first, which tools to use, and how to reach
              the result with the least unnecessary complexity.
            </p>
          </div>
        </section>

        <section className="development-band">
          <p>
            You do not need to know the perfect technical solution before talking to us. Tell us
            what you want to achieve, what is slowing your business down, or what product you want
            to launch. We will help map the practical route.
          </p>
        </section>

        <section className="development-section">
          <div className="development-section-heading">
            <p className="eyebrow">What we build</p>
            <h2>Full-range product development for modern businesses.</h2>
          </div>
          <div className="development-capability-grid">
            {capabilityGroups.map((group) => (
              <article className="development-capability-card" key={group.title}>
                <h3>{group.title}</h3>
                <p>{group.text}</p>
                <div>
                  {group.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="development-process">
          <div className="development-section-heading">
            <p className="eyebrow">How we work</p>
            <h2>Fast does not mean careless. It means focused.</h2>
          </div>
          <div className="development-process-grid">
            {processSteps.map((step, index) => (
              <article key={step.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="development-proof-links" aria-label="Related DJAI pages">
          {proofLinks.map((link) => (
            <a href={link.href} key={link.title}>
              <strong>{link.title}</strong>
              <span>{link.text}</span>
            </a>
          ))}
        </section>

        <section className="development-cta">
          <div>
            <p className="eyebrow">Talk to DJAI</p>
            <h2>Send us the requirement. We will help shape the fastest practical path.</h2>
            <p>
              Whether you need a public-facing product, an internal platform, an AI workflow, or a
              complex fintech or Web3 build, DJAI can help scope and execute it.
            </p>
          </div>
          <div className="development-actions">
            <a className="button primary" href="mailto:contact@djai.academy">
              contact@djai.academy
            </a>
            <a className="button ghost light" href="https://www.djai.academy/service/en/">
              Explore Services
            </a>
          </div>
        </section>
      </main>
      <SiteFooter locale="en" />
    </>
  );
}

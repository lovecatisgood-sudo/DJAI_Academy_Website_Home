import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";
import TrackedLink from "../../components/TrackedLink";

export const metadata = {
  title: "DJAI Development | Custom Software, AI and Apps",
  description:
    "DJAI is a custom software development partner for founders, SMEs, and teams that need to turn a requirement into the smallest useful working product they can launch and improve.",
  alternates: {
    canonical: "/development/en/",
    languages: {
      en: "/development/en/",
      th: "/development/",
      vi: "/development/vi/",
      "x-default": "/development/"
    }
  },
  openGraph: {
    title: "DJAI Development",
    description:
      "Bring DJAI your requirements. We plan, design, build, automate, and launch software products with fast, cost-aware execution.",
    url: "/development/en/",
    siteName: "DJAI Academy",
    images: ["/portfolio/optimized/games/Xana_Metaverse.webp"],
    type: "website"
  }
};

const capabilityGroups = [
  {
    title: "Product Development",
    text: "Customer-facing and internal products, from web and mobile applications to SaaS platforms, portals, dashboards, and multi-role operational systems."
  },
  {
    title: "AI and Automation",
    text: "Workflows that remove repeated manual steps or make controlled information easier to use through assistants, chatbots, voice systems, document processing, or RAG."
  },
  {
    title: "Fintech and Business Systems",
    text: "Payment flows, POS, CRM, management systems, and operational dashboards shaped around permissions, daily work, and the risks that need explicit review."
  },
  {
    title: "Games and Web3",
    text: "Browser games, mini-games, and Web3 products when those mechanics serve the audience and business model—not simply because the technology is fashionable."
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
    "A custom software development partnership that turns an unclear requirement into the smallest useful working product, launch plan, and evidence for the next iteration.",
  email: "contact@djai.academy",
  areaServed: ["Thailand", "Singapore", "Global"],
  provider: {
    "@type": "Organization",
    name: "DJAI Academy",
    url: "https://www.djai.academy/"
  }
};

export default function DevelopmentPage() {
  const enquiryEvent = {
    source_path: "/development/en/",
    locale: "en",
    cluster: "commercial",
    destination_type: "email",
    destination_url: "mailto:contact@djai.academy"
  };

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
              For a founder, SME, or product team, the hard part is often deciding what must work
              first. DJAI clarifies the users, business outcome, risks, and evidence you need, then
              scopes the smallest useful version that can be launched and improved.
            </p>
            <div className="development-actions">
              <TrackedLink className="button primary" href="mailto:contact@djai.academy" eventName="enquiry_start" eventParams={enquiryEvent}>
                Start a Project
              </TrackedLink>
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
            <TrackedLink className="button primary" href="mailto:contact@djai.academy" eventName="enquiry_start" eventParams={enquiryEvent}>
              contact@djai.academy
            </TrackedLink>
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

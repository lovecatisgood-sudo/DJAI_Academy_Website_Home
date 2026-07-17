import {
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  Code2,
  Cpu,
  Laptop,
  MapPin,
  MonitorSmartphone,
  Rocket,
  Sparkles,
  Users
} from "lucide-react";
import NewsletterSignup from "../NewsletterSignup";
import SiteHeader from "../SiteHeader";

export const metadata = {
  title: "DJAI Academy | AI Masterclass",
  description:
    "A hands-on AI masterclass in Thailand for building real websites, apps, automations, and digital products without a programming background.",
  alternates: {
    canonical: "/course/en/",
    languages: {
      th: "/course/",
      en: "/course/en/",
      "x-default": "/course/"
    }
  }
};

const reserveHref =
  "https://buy.stripe.com/dRm5kD2F2ahD1BP2ufgIo00";
const mapHref =
  "https://www.google.com/maps/search/?api=1&query=House%2C%2046%2F27%20Bangna-Trad%20Road%2C%20Bang%20Kaeo%2C%20Bang%20Phli%20District%2C%20Samut%20Prakan%2010540";

const BASE_PATH = "/course";
const assetPath = (path) => `${BASE_PATH}/assets/${path}`;

const siteLinks = {
  academy: "https://www.djai.academy/en/",
  tools: "https://www.djai.academy/tools/en/",
  services: "https://www.djai.academy/service/en/",
  courses: "https://www.djai.academy/course/en/",
  community: "https://www.djai.academy/course/en/#community",
  portfolio: "https://www.djai.academy/portfolio/en/",
  promo: "https://www.djai.academy/course/en/#pricing",
  development: "https://www.djai.academy/development/en/",
  blog: "https://www.djai.academy/blog/en/"
};

const footerColumns = [
  {
    title: "Learn",
    links: [
      ["Join Offline Course", siteLinks.courses],
      ["Upcoming Courses", siteLinks.courses],
      ["Blog", siteLinks.blog]
    ]
  },
  {
    title: "Build",
    links: [
      ["Development", siteLinks.development],
      ["Services", siteLinks.services],
      ["Portfolio", siteLinks.portfolio],
      ["Current Promo", siteLinks.promo]
    ]
  },
  {
    title: "Community",
    links: [
      ["Join Online Community", siteLinks.community],
      ["Tools", siteLinks.tools],
      ["Open-source Projects", null]
    ]
  }
];

const contactChannels = [
  "WhatsApp",
  "LINE",
  "Facebook",
  "Instagram",
  "TikTok",
  "X"
];

const communityImages = [
  ["community2.webp", "Students presenting an AI build on stage"],
  ["community4.webp", "DJAI speaker teaching visual creation with AI"],
  ["community1.webp", "DJAI Academy student group workshop photo"],
  ["community8.webp", "Digital transformation training session"],
  ["community3.webp", "Students and instructor after an AI class"],
  ["community6.webp", "Corporate AI training group"],
  ["community5.webp", "DJAI Academy partner workshop group"],
  ["community7.webp", "AI transformation class presentation"]
];

const includedItems = [
  "One full hands-on workshop day",
  "8 hours of guided AI building",
  "Step-by-step product build journey",
  "A real project built with AI",
  "Templates, prompts, and workflows",
  "Beginner-friendly guidance",
  "Certificate of completion",
  "Post-workshop reference materials"
];

const curriculum = [
  {
    label: "Think",
    title: "Shape the idea",
    copy: "Choose a useful product concept, define the audience, and map the experience before touching tools.",
    icon: BrainCircuit
  },
  {
    label: "Describe",
    title: "Direct the AI",
    copy: "Turn your idea into clear prompts, product requirements, screens, workflows, and launch tasks.",
    icon: Sparkles
  },
  {
    label: "Create",
    title: "Build the product",
    copy: "Use AI tools to generate, refine, test, and improve a working website, app, or automation.",
    icon: Code2
  },
  {
    label: "Launch",
    title: "Ship it live",
    copy: "Prepare your demo, publish the result, and leave with a repeatable workflow for future projects.",
    icon: Rocket
  }
];

const faqs = [
  {
    q: "Do I need programming experience?",
    a: "No. This masterclass is designed for founders, students, creators, managers, and business owners who want to build with AI without starting from traditional coding."
  },
  {
    q: "What will I build?",
    a: "You will build a real digital product direction such as a landing page, app prototype, automation, AI workflow, or business tool, depending on your idea and workshop pace."
  },
  {
    q: "Is the workshop one day or four days?",
    a: "This page is now aligned around one intensive workshop day: 25 July, 09:30 AM to 04:00 PM, with 8 hours of hands-on learning."
  },
  {
    q: "How do I reserve a seat?",
    a: "Use the Reserve Your Seat button to complete the secure Stripe payment. Seats are limited so the class stays practical, interactive, and hands-on."
  }
];

function Eyebrow({ children }) {
  return (
    <div className="eyebrow">
      <span />
      {children}
      <span />
    </div>
  );
}

function GradientText({ children }) {
  return <span className="gradient-text">{children}</span>;
}

function GlowIcon({ children, tone = "cyan" }) {
  return <div className={`glow-icon ${tone}`}>{children}</div>;
}

export default function Home() {
  return (
    <main id="home" className="site-shell" lang="en">
      <SiteHeader locale="en" />

      <section className="hero section">
        <div className="hero-copy">
          <div className="pill">
            <span className="pulse-dot" />
            DJAI Academy | AI Masterclass
          </div>
          <h1>
            Build Real AI Apps <GradientText>Without Coding.</GradientText>
          </h1>
          <p>
            Go from idea to a working digital product using AI tools, smart
            workflows, and practical no-code systems, even if you have no
            programming background.
          </p>

          <div className="event-strip">
            <span className="pulse-dot" />
            <strong>Next Workshop:</strong>
            <span>25 July | 09:30 AM - 04:00 PM</span>
            <em>Limited Seats</em>
            <ChevronRight size={16} />
          </div>

          <div className="hero-actions">
            <a className="button" href={reserveHref}>
              Reserve Seat for 25 July <ArrowRight size={18} />
            </a>
            <a className="button button-ghost" href="#curriculum">
              Explore Course <ArrowUpRight size={18} />
            </a>
          </div>

          <div className="hero-metrics" aria-label="Workshop highlights">
            <div>
              <strong>1 Day</strong>
              <span>Build journey</span>
            </div>
            <div>
              <strong>8 Hours</strong>
              <span>Hands-on</span>
            </div>
            <div>
              <strong>1 App</strong>
              <span>Shipped live</span>
            </div>
          </div>
        </div>

        <div className="hero-visual" aria-label="DJAI Academy instructor">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <img
            className="instructor"
            src={assetPath("Instructor-DJAI.webp")}
            alt="DJAI Academy instructor"
          />
          <div className="floating-badge badge-ai">
            <span className="pulse-dot" />
            AI Tools
          </div>
          <div className="floating-badge badge-no-code">
            <span className="pulse-dot" />
            No-Code Apps
          </div>
          <div className="floating-badge badge-deploy">
            <span className="pulse-dot" />
            Deploy Live
          </div>
        </div>
      </section>

      <section className="section creator-gap">
        <Eyebrow>The Creator Gap</Eyebrow>
        <div className="section-heading centered">
          <h2>
            Most People Use AI. <br />
            Few People <GradientText>Create With It.</GradientText>
          </h2>
          <p>
            The next opportunity is not only knowing how to prompt. It is
            learning how to turn ideas into useful applications, businesses,
            and systems.
          </p>
        </div>

        <div className="stat-grid">
          <article className="glass-card">
            <GlowIcon>
              <Cpu size={28} />
            </GlowIcon>
            <div>
              <strong>Use AI</strong>
              <h3>Work faster every day</h3>
              <p>
                Search, write, plan, and generate content with modern AI tools.
              </p>
            </div>
          </article>
          <article className="glass-card violet-card">
            <GlowIcon tone="violet">
              <BrainCircuit size={28} />
            </GlowIcon>
            <div>
              <strong>Create</strong>
              <h3>Move beyond prompts</h3>
              <p>
                Turn concepts into workflows, screens, automations, and real
                product logic.
              </p>
            </div>
          </article>
          <article className="glass-card silver-card">
            <GlowIcon tone="silver">
              <Users size={28} />
            </GlowIcon>
            <div>
              <strong>Launch</strong>
              <h3>Build the opportunity</h3>
              <p>
                Learn the creator mindset that helps you ship instead of only
                watching the AI wave.
              </p>
            </div>
          </article>
        </div>

        <div className="wide-callout">
          <GlowIcon>
            <BrainCircuit size={28} />
          </GlowIcon>
          <p>
            The next generation of creators will be defined by their ability to{" "}
            <GradientText>turn imagination into reality through AI.</GradientText>
          </p>
        </div>
      </section>

      <section id="community" className="section split-section community">
        <div className="photo-grid" aria-label="DJAI Academy community photos">
          {communityImages.map(([src, alt]) => (
            <img key={src} src={assetPath(src)} alt={alt} />
          ))}
        </div>

        <div className="split-copy">
          <Eyebrow>What Is Vibe Coding?</Eyebrow>
          <h2>
            Turn Ideas Into Reality Without Becoming a{" "}
            <GradientText>Developer</GradientText>
          </h2>
          <p>
            Vibe Coding is a new way of creating where AI becomes your
            technical partner.
          </p>
          <p>
            Instead of spending years learning programming languages,
            frameworks, and complex development tools, you focus on your idea
            while AI helps build it.
          </p>
          <p>
            You describe what you want, refine it through conversation, and
            transform concepts into websites, applications, automations,
            business tools, and digital products.
          </p>

          <div className="journey-strip" aria-label="The build journey">
            <span>The Build Journey</span>
            <b>Think</b>
            <ChevronRight size={14} />
            <b>Describe</b>
            <ChevronRight size={14} />
            <b>Create</b>
            <ChevronRight size={14} />
            <b>Launch</b>
          </div>

          <blockquote>
            Vibe Coding is not about replacing creativity.{" "}
            <span>
              It is about removing technical barriers so more people can build,
              launch, and innovate.
            </span>
          </blockquote>
        </div>
      </section>

      <section className="section apps-section">
        <div className="apps-copy">
          <Eyebrow>From Idea To Live App</Eyebrow>
          <h2>
            Build Real Apps <GradientText>Without Writing Code</GradientText>
          </h2>
          <p>
            Turn ideas into real digital products with AI. Design, customize,
            test, and launch professional workflows through simple
            conversations instead of traditional coding.
          </p>
          <p>
            Launch faster, iterate quickly, and bring your vision to life with
            modern tools built for creators and innovators.
          </p>

          <div className="benefit-row">
            <div>
              <GlowIcon tone="violet">
                <Sparkles size={24} />
              </GlowIcon>
              <strong>No Code</strong>
              <span>Just your ideas</span>
            </div>
            <div>
              <GlowIcon>
                <Rocket size={24} />
              </GlowIcon>
              <strong>Ship Fast</strong>
              <span>Launch in one day</span>
            </div>
          </div>

          <div className="quote-panel">
            <span>Launch Apps Faster Than Ever</span>
            <p>
              Create useful AI-powered products without developers, delays, or
              unnecessary complexity.
            </p>
          </div>
        </div>

        <div className="phone-stage">
          <div className="phone-glow" />
          <img
            src={assetPath("719233138_122103496575327302_5083318908732239582_n.webp")}
            alt="Example mobile app interface built through AI workflows"
          />
        </div>
      </section>

      <section id="curriculum" className="section curriculum">
        <Eyebrow>Workshop Curriculum</Eyebrow>
        <div className="section-heading centered">
          <h2>
            Learn the Full <GradientText>AI Build Journey</GradientText>
          </h2>
          <p>
            A practical one-day structure that takes you from idea clarity to a
            live working product.
          </p>
        </div>

        <div className="curriculum-grid">
          {curriculum.map((item) => {
            const Icon = item.icon;
            return (
              <article className="glass-card curriculum-card" key={item.label}>
                <GlowIcon tone={item.label === "Describe" ? "violet" : "cyan"}>
                  <Icon size={26} />
                </GlowIcon>
                <span>{item.label}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section id="pricing" className="section pricing">
        <Eyebrow>Course Pricing</Eyebrow>
        <div className="section-heading centered">
          <h2>
            AI <GradientText>Masterclass</GradientText>
          </h2>
          <p>
            Join the AI Masterclass and learn how to turn ideas into websites,
            applications, automations, and digital products without a
            programming background.
          </p>
        </div>

        <div className="workshop-card">
          <div className="workshop-main">
            <span className="mini-label">Upcoming Workshop</span>
            <h3>
              Join Our Next <GradientText>AI Masterclass</GradientText>
            </h3>
            <p>
              Take your first step into the world of AI creation with our
              upcoming hands-on workshop.
            </p>

            <div className="info-grid">
              <div>
                <span>Date</span>
                <strong>25 July</strong>
              </div>
              <div>
                <span>Time</span>
                <strong>09:30 AM - 04:00 PM</strong>
              </div>
              <div>
                <span>Venue</span>
                <strong>Siamese Cat Learning Center</strong>
              </div>
              <div>
                <span>Contact</span>
                <strong>contact@djai.academy</strong>
              </div>
            </div>

            <p className="address">
              House, 46/27 Bangna-Trad Road, Bang Kaeo, Bang Phli District,
              Samut Prakan 10540
            </p>

            <div className="workshop-actions">
              <a className="button button-map" href={mapHref} target="_blank" rel="noreferrer">
                View Google Map <MapPin size={18} />
              </a>
              <a className="button" href={reserveHref}>
                Reserve Your Seat
              </a>
            </div>
          </div>

          <aside className="date-tile" aria-label="Workshop date">
            <div>
              <strong>25</strong>
              <span>July</span>
            </div>
            <p>Seats are filling fast</p>
          </aside>
        </div>

        <div className="price-grid">
          <article className="price-card">
            <span>AI Masterclass</span>
            <h3>
              <small>THB</small> 5,999 <del>8,999</del>
            </h3>
            <p>One-time payment per pax. Full workshop access included.</p>
            <a className="button" href={reserveHref}>
              Reserve Your Seat <ArrowRight size={18} />
            </a>
            <small>Secure your place in the next AI Masterclass.</small>
          </article>

          <article className="included-card">
            <h3>What&apos;s Included</h3>
            <ul>
              {includedItems.map((item) => (
                <li key={item}>
                  <CheckCircle2 size={18} />
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <article className="seat-card">
            <GlowIcon tone="violet">
              <Users size={32} />
            </GlowIcon>
            <h3>
              Limited Seats <GradientText>Available</GradientText>
            </h3>
            <p>
              To keep the workshop interactive and hands-on, seats are limited
              for each cohort.
            </p>
          </article>
        </div>

        <div className="value-strip">
          <div>
            <Code2 size={28} />
            <strong>No Coding Required</strong>
            <span>Start from the basics and build step-by-step.</span>
          </div>
          <div>
            <Laptop size={28} />
            <strong>Learn By Building</strong>
            <span>Create real projects instead of only watching lessons.</span>
          </div>
          <div>
            <Rocket size={28} />
            <strong>Launch Something Real</strong>
            <span>Walk away with a live project built using AI.</span>
          </div>
        </div>

        <div className="launch-banner">
          <MonitorSmartphone size={56} />
          <div>
            <h3>
              Learn. <GradientText>Build. Launch.</GradientText>
            </h3>
            <p>Turn your ideas into real products in just 1 day.</p>
          </div>
        </div>
      </section>

      <section id="faqs" className="section faqs">
        <Eyebrow>FAQs</Eyebrow>
        <div className="section-heading centered">
          <h2>
            Questions Before You <GradientText>Reserve?</GradientText>
          </h2>
        </div>

        <div className="faq-grid">
          {faqs.map((faq) => (
            <article className="glass-card" key={faq.q}>
              <h3>{faq.q}</h3>
              <p>{faq.a}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="footer">
        <div className="footer-grid">
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3>{column.title}</h3>
              {column.links.map(([label, href]) =>
                href ? (
                  <a key={label} href={href}>
                    {label}
                  </a>
                ) : (
                  <span className="footer-muted-link" key={label}>
                    {label}
                  </span>
                )
              )}
            </div>
          ))}

          <div className="footer-contact">
            <h3>Contact</h3>
            <div className="contact-list">
              {contactChannels.map((channel) => (
                <span key={channel}>{channel}</span>
              ))}
              <a href="mailto:contact@djai.academy">Email:contact@djai.academy</a>
            </div>
          </div>
        </div>

        <NewsletterSignup locale="en" />

        <div className="copyright">(c) 2026 DJAI Academy. All rights reserved.</div>
      </footer>

      <a className="scroll-top" href="#home" aria-label="Back to top">
        <ArrowRight size={20} />
      </a>
    </main>
  );
}

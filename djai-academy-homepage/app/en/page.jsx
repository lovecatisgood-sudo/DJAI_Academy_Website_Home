"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

const links = {
  academy: "https://www.djai.academy/en/",
  portfolio: "https://www.djai.academy/portfolio/en/",
  tools: "https://www.djai.academy/tools/en/",
  service: "https://www.djai.academy/service/en/",
  course: "https://www.djai.academy/course/en/",
  community: "https://www.djai.academy/course/en/#community",
  promo: "https://www.djai.academy/course/en/#pricing",
  development: "https://www.djai.academy/development/en/",
  blog: "https://www.djai.academy/blog/en/",
  thai: "https://www.djai.academy/"
};

const developmentLinks = [
  ["Services", links.service],
  ["Promo", links.promo],
  ["Portfolio", links.portfolio]
];

const headerLinks = [
  ["Upcoming Courses", links.course],
  ["Community", links.community],
  ["Tools", links.tools],
  ["Blog", links.blog]
];

const pillars = [
  {
    title: "Educate",
    text: "Learn AI, vibe coding, automation, and the practical thinking behind modern product building."
  },
  {
    title: "Build",
    text: "Turn concepts into MVPs, apps, websites, automations, games, internal tools, and SaaS platforms."
  },
  {
    title: "Deploy",
    text: "Move from prototype to launch with product, engineering, and business guidance from one team."
  }
];

const routes = [
  {
    eyebrow: "Learn",
    title: "Vibe Coding & AI Mastery",
    text: "Offline sessions in Bangkok and online courses for beginners, creators, founders, and developers.",
    href: links.course,
    action: "View Courses"
  },
  {
    eyebrow: "Join",
    title: "Free Builder Community",
    text: "Get access to community learning, free online course material, tools, and people who are building.",
    href: links.community,
    action: "Join Community"
  },
  {
    eyebrow: "Build",
    title: "Software Development Team",
    text: "Hire DJAI to create MVPs, websites, AI agents, automation systems, apps, and full digital platforms.",
    href: links.service,
    action: "View Services"
  }
];

const toolCards = [
  "Community tools",
  "AI workflow helpers",
  "Open-source experiments",
  "MVP prototypes"
];

const footerColumns = [
  {
    title: "Learn",
    links: [
      ["Join Offline Course", links.course],
      ["Upcoming Courses", links.course],
      ["Blog", links.blog]
    ]
  },
  {
    title: "Build",
    links: [
      ["Development", links.development],
      ["Services", links.service],
      ["Portfolio", links.portfolio],
      ["Current Promo", links.promo]
    ]
  },
  {
    title: "Community",
    links: [
      ["Join Online Community", links.community],
      ["Tools", links.tools],
      ["Open-source Projects", null]
    ]
  }
];

const contactChannels = ["WhatsApp", "LINE", "Facebook", "Instagram", "TikTok", "X"];

function DevelopmentDropdown() {
  return (
    <div className="nav-dropdown">
      <a className="nav-dropdown-trigger" href={links.development}>
        Development
      </a>
      <div className="dropdown-panel" aria-label="Development links">
        {developmentLinks.map(([label, href]) => (
          <a href={href} key={label}>
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <a className="brand" href={links.academy} aria-label="DJAI Academy">
        <Image src="/djai-logo.webp" alt="DJAI Academy" width={180} height={86} priority />
      </a>

      <button
        className="menu-button"
        aria-expanded={open}
        aria-controls="site-navigation"
        onClick={() => setOpen((value) => !value)}
      >
        <span />
        <span />
        <span />
      </button>

      <nav id="site-navigation" className={open ? "nav is-open" : "nav"} aria-label="Main navigation">
        {headerLinks.slice(0, 2).map(([label, href]) => (
          <a href={href} key={label}>
            {label}
          </a>
        ))}
        <DevelopmentDropdown />
        {headerLinks.slice(2).map(([label, href]) => (
          <a href={href} key={label}>
            {label}
          </a>
        ))}
        <a className="language-switch" href={links.thai} hrefLang="th">
          ไทย
        </a>
        <a className="nav-subscribe" href={links.community}>
          Join Community
        </a>
      </nav>
    </header>
  );
}

function SubscribeModal({ isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [sent, setSent] = useState(false);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-shell" role="dialog" aria-modal="true" aria-labelledby="subscribe-title">
      <button className="modal-backdrop" aria-label="Close subscribe form" onClick={onClose} />
      <form
        className="subscribe-modal"
        onSubmit={(event) => {
          event.preventDefault();
          if (email.trim()) {
            setSent(true);
          }
        }}
      >
        <button type="button" className="close-button" aria-label="Close" onClick={onClose}>
          x
        </button>
        <p className="eyebrow">DJAI Weekly</p>
        <h2 id="subscribe-title">Complete your subscription</h2>
        <p>
          Confirm where DJAI Academy should send weekly course, community, and tool updates.
        </p>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <label htmlFor="email">Email</label>
        <div className="email-row">
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setSent(false);
            }}
            required
          />
          <button type="submit">Subscribe</button>
        </div>
        {sent && <p className="form-note">Thanks for joining. Your newsletter request is ready.</p>}
      </form>
    </div>
  );
}

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [pointer, setPointer] = useState({ x: 52, y: 48 });

  const heroStyle = useMemo(
    () => ({
      "--mx": `${pointer.x}%`,
      "--my": `${pointer.y}%`,
      "--dx": pointer.x - 50,
      "--dy": pointer.y - 50
    }),
    [pointer]
  );

  return (
    <>
      <Header />
      <main id="top">
        <section
          className="hero"
          style={heroStyle}
          onPointerMove={(event) => {
            const rect = event.currentTarget.getBoundingClientRect();
            setPointer({
              x: Math.round(((event.clientX - rect.left) / rect.width) * 100),
              y: Math.round(((event.clientY - rect.top) / rect.height) * 100)
            });
          }}
        >
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">Bangkok based AI academy and development house</p>
              <h1>DJAI Academy</h1>
              <p className="hero-line">We educate, build, and deploy.</p>
              <p className="hero-text">
                A place to turn your idea into reality through AI-assisted coding, software
                development, community tools, and practical product guidance.
              </p>
              <div className="hero-actions">
                <a className="button primary" href={links.community}>
                  Join Free Community
                </a>
                <a className="button secondary" href={links.course}>
                  View Courses
                </a>
                <a className="button ghost" href={links.service}>
                  Build With DJAI
                </a>
              </div>
            </div>

            <div className="hero-visual" aria-label="DJAI founder and academy brand visual">
              <div className="orbit one" />
              <div className="orbit two" />
              <div className="logo-plate">
                <Image src="/djai-logo.webp" alt="DJAI Academy logo" width={520} height={250} priority />
              </div>
              <Image
                className="founder"
                src="/founder-djai.webp"
                alt="DJAI Academy founder"
                width={560}
                height={900}
                priority
              />
              <div className="signal-card">
                <span>AI + Product + Deployment</span>
                <strong>From idea to launch</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="quick-routes" aria-label="Main DJAI routes">
          {routes.map((route) => (
            <a className="route-card" href={route.href} key={route.title}>
              <span>{route.eyebrow}</span>
              <h2>{route.title}</h2>
              <p>{route.text}</p>
              <strong>{route.action}</strong>
            </a>
          ))}
        </section>

        <section className="section dark-section">
          <div className="section-heading">
            <p className="eyebrow">What DJAI does</p>
            <h2>Educate. Build. Deploy.</h2>
          </div>
          <div className="pillar-grid">
            {pillars.map((pillar) => (
              <article className="pillar-card" key={pillar.title}>
                <h3>{pillar.title}</h3>
                <p>{pillar.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section split-section">
          <div>
            <p className="eyebrow">Who we are</p>
            <h2>A team of builders for the AI era.</h2>
          </div>
          <div className="copy-block">
            <p>
              We are a group of developers, project managers, CTOs, product designers, AI
              specialists, corporate consultants, and business consultants with years of experience
              building software products across industries.
            </p>
            <p>
              We have built applications, automation systems, business tools, AI products, and
              digital platforms. Now we are here to build, inspire, and educate the next generation
              of builders.
            </p>
            <a className="button secondary dark" href={links.portfolio}>
              View Portfolio
            </a>
          </div>
        </section>

        <section className="vibe-section">
          <div className="vibe-copy">
            <p className="eyebrow">The new way to start</p>
            <h2>Vibe coding is for everyone.</h2>
            <p>
              Whether you are a developer or not, vibe coding turns ideas into working MVPs,
              prototypes, mobile apps, games, tools, and functional products faster than traditional
              development alone.
            </p>
            <p>
              It helps developers move many times faster and gives non-coders a practical starting
              point to build with AI.
            </p>
            <a className="button primary" href={links.course}>
              Learn Vibe Coding
            </a>
          </div>
          <div className="code-window" aria-hidden="true">
            <div className="window-dots">
              <span />
              <span />
              <span />
            </div>
            <pre>{`idea = "booking app"
ai.plan(idea)
prototype = build.mvp(stack="Next.js")
deploy(prototype)

// dream -> product`}</pre>
          </div>
        </section>

        <section className="section tools-section">
          <div className="section-heading">
            <p className="eyebrow">Community tools</p>
            <h2>Tools built by DJAI and our community.</h2>
            <p>
              We build useful tools for our community, and our members also release experiments,
              templates, and open-source projects for other builders to learn from.
            </p>
          </div>
          <div className="tool-grid">
            {toolCards.map((card) => (
              <div className="tool-card" key={card}>
                <span />
                <strong>{card}</strong>
              </div>
            ))}
          </div>
          <a className="button secondary dark" href={links.tools}>
            Explore Tools
          </a>
        </section>

        <section className="section service-section">
          <div className="service-panel">
            <p className="eyebrow">Development house</p>
            <h2>Looking for a team to build your product?</h2>
            <p>
              DJAI helps businesses, startups, and creators build websites, apps, AI agents,
              automation systems, SaaS platforms, and MVPs.
            </p>
            <div className="hero-actions compact">
              <a className="button primary" href={links.service}>
                View Services
              </a>
              <a className="button ghost light" href={links.portfolio}>
                View Portfolio
              </a>
            </div>
          </div>
        </section>

        <section className="section course-section">
          <div className="section-heading">
            <p className="eyebrow">Online and Bangkok sessions</p>
            <h2>Learn AI mastery, automation, and vibe coding.</h2>
            <p>
              Join offline sessions in Bangkok or study through DJAI online academy. Our courses are
              designed for beginners, business owners, creators, and developers who want to build
              faster with AI.
            </p>
          </div>
          <div className="course-actions">
            <a className="button primary" href={links.course}>
              View Upcoming Courses
            </a>
            <a className="button secondary dark" href={links.community}>
              Join Free Community
            </a>
          </div>
        </section>

        <section className="final-cta">
          <h2>Most people are still doubting. Builders are already shaping the future.</h2>
          <p>
            Stop waiting. Start building. Not knowing how to code is no longer an excuse for not
            turning your dream into something real.
          </p>
          <div className="hero-actions compact">
            <a className="button primary" href={links.community}>
              Join Community
            </a>
            <a className="button secondary" href={links.course}>
              Start Learning
            </a>
            <a className="button ghost light" href={links.development}>
              Build With DJAI
            </a>
          </div>
        </section>
      </main>

      <footer className="footer" id="contact">
        <div className="footer-grid">
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3>{column.title}</h3>
              {column.links.map(([label, href]) =>
                href ? (
                  <a href={href} key={label}>
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

        <div className="newsletter-card">
          <div>
            <span className="mini-label">Newsletter</span>
            <h3>Subscribe to our weekly newsletter</h3>
            <p>Get DJAI course updates, tools, community drops, and build notes.</p>
          </div>

          <form
            className="newsletter-inline-form"
            onSubmit={(event) => {
              event.preventDefault();
              setModalOpen(true);
            }}
          >
            <label className="sr-only" htmlFor="newsletter-email">
              Email address
            </label>
            <input id="newsletter-email" type="email" placeholder="Email address" required />
            <button className="button primary" type="submit">
              Subscribe
            </button>
          </form>
        </div>

        <div className="copyright">(c) 2026 DJAI Academy. All rights reserved.</div>
      </footer>

      <SubscribeModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}

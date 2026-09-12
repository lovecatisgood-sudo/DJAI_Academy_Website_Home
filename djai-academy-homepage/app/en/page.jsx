"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import { schoolUrlFor } from "../lib/i18n";

const links = {
  portfolio: "/portfolio/en/",
  tools: "/tools/en/",
  service: "/service/en/",
  development: "/development/en/",
  blog: "/blog/en/",
  camPdf: "/Cam_PDF_Scan_Signer_QR-Gen/",
  school: schoolUrlFor("en")
};

const pillars = [
  {
    title: "Clarify the requirement",
    text: "Define the user, the core workflow, and the evidence needed before expanding the scope."
  },
  {
    title: "Build the useful part first",
    text: "Turn the requirement into a testable MVP, website, app, automation, internal tool, or SaaS workflow."
  },
  {
    title: "Launch and improve",
    text: "Test the real workflow, deploy it, and use what people actually do to choose the next iteration."
  }
];

const routes = [
  {
    eyebrow: "Try",
    title: "Free online tools",
    text: "Use practical PDF, image, video, QR, and digital-work tools, then see the kind of product work DJAI ships.",
    href: links.tools,
    action: "Open free tools"
  },
  {
    eyebrow: "Android app",
    title: "Cam PDF Scanner: Sign & QR",
    text: "Scan documents, sign PDFs, and create QR codes on Android with an app released by DJAI.",
    href: links.camPdf,
    action: "See Cam PDF"
  },
  {
    eyebrow: "Learn",
    title: "Build practical products at DJAI School",
    text: "Continue to the DJAI learning platform for the lessons and learning paths that are currently available.",
    href: links.school,
    action: "Go to DJAI School"
  }
];

const toolCards = [
  "PDF and document workflows",
  "Image and media utilities",
  "QR and business helpers",
  "Working product experiments"
];

export default function Home() {
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
      <SiteHeader locale="en" currentRoute="home" />
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
              <p className="eyebrow">Bangkok software development and practical AI learning</p>
              <h1>
                <span className="hero-title-brand">DJAI Academy</span>
                <span className="hero-title-detail">Software development and practical AI products</span>
              </h1>
              <p className="hero-line">Take a clear requirement from idea to a working release.</p>
              <p className="hero-text">
                DJAI helps founders and businesses scope and build software. You can also use our
                free tools, get the Cam PDF Android app, or learn product-building at DJAI School.
              </p>
              <div className="hero-actions">
                <a className="button primary" href="mailto:contact@djai.academy">Discuss a software project</a>
                <a className="button secondary" href={links.development}>See our development process</a>
                <a className="button ghost" href={links.school}>Learn at DJAI School</a>
              </div>
            </div>

            <div className="hero-visual" aria-label="DJAI founder and academy brand visual">
              <div className="orbit one" />
              <div className="orbit two" />
              <div className="logo-plate">
                <Image src="/djai-logo-display.webp" alt="DJAI Academy logo" width={768} height={413} loading="eager" />
              </div>
              <img
                className="founder"
                src="/founder-djai-display.webp"
                srcSet="/founder-djai-mobile.webp 640w, /founder-djai-display.webp 912w"
                sizes="(max-width: 640px) 86vw, (max-width: 1024px) 420px, 440px"
                alt="DJAI Academy founder"
                width="912"
                height="1440"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
              <div className="signal-card">
                <span>AI + Product + Deployment</span>
                <strong>From requirement to release</strong>
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
            <p className="eyebrow">How DJAI approaches product work</p>
            <h2>Scope carefully. Build the useful part. Test the release.</h2>
          </div>
          <div className="pillar-grid">
            {pillars.map((pillar) => (
              <article className="pillar-card" key={pillar.title}><h3>{pillar.title}</h3><p>{pillar.text}</p></article>
            ))}
          </div>
        </section>

        <section className="section split-section">
          <div>
            <p className="eyebrow">Software development</p>
            <h2>Choose the smallest release that proves the requirement.</h2>
          </div>
          <div className="copy-block">
            <p>
              A useful first release does not need every possible feature. It needs a clear user,
              a complete core workflow, and enough evidence to show what should change next.
            </p>
            <p>
              DJAI can help with websites, mobile apps, AI-assisted workflows, automation, SaaS,
              games, and internal systems. The development page explains how a project moves from
              requirement and scope to build and launch.
            </p>
            <div className="hero-actions compact">
              <a className="button secondary dark" href={links.development}>See the process</a>
              <a className="button secondary dark" href={links.portfolio}>Review project types</a>
            </div>
          </div>
        </section>

        <section className="vibe-section">
          <div className="vibe-copy">
            <p className="eyebrow">Learn by making decisions</p>
            <h2>AI can accelerate a build. It cannot remove the need to verify it.</h2>
            <p>
              DJAI School focuses on using AI inside a real product workflow: state the requirement,
              inspect the output, test failure cases, and understand what will be maintained after launch.
            </p>
            <a className="button primary" href={links.school}>Learn at DJAI School</a>
          </div>
          <div className="code-window" aria-hidden="true">
            <div className="window-dots"><span /><span /><span /></div>
            <pre>{`requirement = define_user_job()
prototype = build_smallest_workflow(requirement)
verify(prototype, failures=True)
deploy_when_ready(prototype)`}</pre>
          </div>
        </section>

        <section className="section tools-section">
          <div className="section-heading">
            <p className="eyebrow">Free tools</p>
            <h2>Start with the task you need to finish now.</h2>
            <p>
              The tool library handles focused jobs across documents, images, media, QR codes, and
              common business workflows. Each tool stays utility-first and links to a relevant next step.
            </p>
          </div>
          <div className="tool-grid">
            {toolCards.map((card) => (
              <div className="tool-card" key={card}><span /><strong>{card}</strong></div>
            ))}
          </div>
          <a className="button secondary dark" href={links.tools}>Explore free tools</a>
        </section>

        <section className="section service-section">
          <div className="service-panel">
            <p className="eyebrow">Development team</p>
            <h2>Have a requirement that needs a working product?</h2>
            <p>
              Start with the development process, compare the available service paths, and review
              the kinds of projects DJAI can support before you contact the team.
            </p>
            <div className="hero-actions compact">
              <a className="button primary" href={links.development}>Plan a project</a>
              <a className="button ghost light" href={links.service}>Compare services</a>
            </div>
          </div>
        </section>

        <section className="section course-section">
          <div className="section-heading">
            <p className="eyebrow">Product learning</p>
            <h2>Use DJAI School for learning; use DJAI Academy for services and tools.</h2>
            <p>
              Keeping those roles separate helps you reach the right destination: structured learning
              belongs on School, while the main site explains development work and hosts free utilities.
            </p>
          </div>
          <div className="course-actions">
            <a className="button primary" href={links.school}>Open DJAI School</a>
            <a className="button secondary dark" href={links.blog}>Read practical guides</a>
          </div>
        </section>

        <section className="final-cta">
          <h2>Bring the requirement. We will help identify the next useful release.</h2>
          <p>
            Send the user problem, current workflow, and any deadline or technical constraint. That is
            enough to begin a focused project conversation.
          </p>
          <div className="hero-actions compact">
            <a className="button primary" href="mailto:contact@djai.academy">contact@djai.academy</a>
            <a className="button secondary" href={links.development}>Development process</a>
            <a className="button ghost light" href={links.portfolio}>Project types</a>
          </div>
        </section>
      </main>
      <SiteFooter locale="en" />
    </>
  );
}

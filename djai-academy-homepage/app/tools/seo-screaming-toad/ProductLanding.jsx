import SiteHeader from "../../components/SiteHeader";
import ShareButtons from "../../components/ShareButtons";
import ToolDirectorySection from "../ToolDirectorySection";
import { content, productUrls } from "./product-content";
import styles from "./page.module.css";

function JsonLd({ copy }) {
  const software = {
    "@type": "SoftwareApplication",
    "@id": `${productUrls[copy.locale]}#software`,
    name: "SEO Screaming Toad",
    alternateName: "DJAI Toad",
    url: productUrls[copy.locale],
    codeRepository: copy.repository,
    applicationCategory: "DeveloperApplication",
    applicationSubCategory: "Technical SEO crawler and website audit tool",
    operatingSystem: "Linux, macOS, Windows",
    isAccessibleForFree: true,
    license: "https://opensource.org/license/mit",
    inLanguage: copy.locale,
    description: copy.lead,
    featureList: copy.features.map(([title]) => title),
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    }
  };
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://www.djai.academy/#website",
        url: "https://www.djai.academy/",
        name: "DJAI Academy",
        inLanguage: ["th", "en", "vi"]
      },
      {
        "@type": "WebPage",
        "@id": `${productUrls[copy.locale]}#webpage`,
        url: productUrls[copy.locale],
        name: copy.h1,
        description: copy.lead,
        inLanguage: copy.locale,
        mainEntity: { "@id": `${productUrls[copy.locale]}#software` },
        isPartOf: { "@id": "https://www.djai.academy/#website" },
        breadcrumb: { "@id": `${productUrls[copy.locale]}#breadcrumb` }
      },
      software,
      {
        "@type": "BreadcrumbList",
        "@id": `${productUrls[copy.locale]}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "DJAI Academy",
            item: copy.locale === "th" ? "https://www.djai.academy/" : `https://www.djai.academy/${copy.locale}/`
          },
          {
            "@type": "ListItem",
            position: 2,
            name: copy.locale === "th" ? "เครื่องมือฟรี" : copy.locale === "vi" ? "Công cụ miễn phí" : "Free tools",
            item: copy.locale === "th" ? "https://www.djai.academy/tools/" : `https://www.djai.academy/tools/${copy.locale}/`
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "SEO Screaming Toad",
            item: productUrls[copy.locale]
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": `${productUrls[copy.locale]}#faq-schema`,
        inLanguage: copy.locale,
        mainEntity: copy.faqs.map(([question, answer]) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer }
        }))
      }
    ]
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

function SectionHeading({ eyebrow, title, intro, id }) {
  return (
    <div className={styles.sectionHeading}>
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      <h2 id={id}>{title}</h2>
      {intro && <p>{intro}</p>}
    </div>
  );
}

function DataTable({ headers, rows, label }) {
  return (
    <div className={styles.tableWrap}>
      <table aria-label={label}>
        <thead>
          <tr>{headers.map((header) => <th key={header}>{header}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]}>{row.map((cell, index) => index === 0 ? <th scope="row" key={`${row[0]}-${index}`}>{cell}</th> : <td key={`${row[0]}-${index}`}>{cell}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function ProductLanding({ locale }) {
  const copy = content[locale];
  const languageHref = locale === "en" ? productUrls.th : productUrls.en;
  const languageHrefLang = locale === "en" ? "th" : "en";
  const toolsHref = locale === "th" ? "https://www.djai.academy/tools/" : `https://www.djai.academy/tools/${locale}/`;
  const interfaceCopy = {
    th: { architecture: "สถาปัตยกรรมผลิตภัณฑ์ SEO Screaming Toad", toad: "คางคก", onPage: "หัวข้อในหน้านี้", evidence: "หลักฐานก่อนคำกล่าวอ้าง", regression: "เกณฑ์ regression", synthetic: "หลักฐานสังเคราะห์", oneRun: "การทดสอบสังเคราะห์หนึ่งครั้ง", theoretical: "เป็นเพียงทฤษฎี" },
    en: { architecture: "SEO Screaming Toad product architecture", toad: "Toad", onPage: "On this page", evidence: "Evidence before claims", regression: "regression gate", synthetic: "synthetic evidence", oneRun: "one synthetic run", theoretical: "theoretical only" },
    vi: { architecture: "Kiến trúc sản phẩm SEO Screaming Toad", toad: "Cóc", onPage: "Nội dung trên trang", evidence: "Bằng chứng trước tuyên bố", regression: "ngưỡng kiểm thử", synthetic: "bằng chứng tổng hợp", oneRun: "một lần chạy tổng hợp", theoretical: "chỉ là lý thuyết" }
  }[locale];

  return (
    <main className={styles.page}>
      <JsonLd copy={copy} />
      <SiteHeader locale={locale} currentRoute="tools" languageHref={languageHref} />

      <section className={styles.hero}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>{copy.eyebrow}</p>
            <h1>{copy.h1}</h1>
            <p className={styles.lead}>{copy.lead}</p>
            <div className={styles.heroActions}>
              <a className={styles.primaryButton} href={copy.repository} target="_blank" rel="noopener noreferrer">
                <span aria-hidden="true">↗</span>{copy.repositoryLabel}
              </a>
              <a className={styles.secondaryButton} href="#how-to-use">{copy.secondaryCta}</a>
            </div>
            <p className={styles.heroNote}>{copy.note}</p>
            <ShareButtons url={productUrls[locale]} title={copy.h1} locale={locale} compact />
          </div>

          <div className={styles.productVisual} aria-label={interfaceCopy.architecture}>
            <div className={styles.visualTop}>
              <span className={styles.toad} role="img" aria-label={interfaceCopy.toad}>🐸</span>
              <div><strong>SEO Screaming Toad</strong><small>DJAI Toad · local-first</small></div>
              <span className={styles.openBadge}>MIT</span>
            </div>
            <div className={styles.visualStatus}>
              <span><i className={styles.statusGreen} />Crawler</span>
              <span><i className={styles.statusCyan} />MCP</span>
              <span><i className={styles.statusOrange} />Evidence</span>
            </div>
            <div className={styles.visualRows}>
              <div><span>AUD-04</span><strong>Canonical signals</strong><b>warning</b></div>
              <div><span>AUD-09</span><strong>Hreflang reciprocity</strong><b>warning</b></div>
              <div><span>AUD-13</span><strong>Structured data</strong><b>error</b></div>
            </div>
            <div className={styles.visualTerminal}>
              <code>crawl_status → completed</code>
              <code>issue_explain → evidence</code>
              <code>crawl_compare → fixed</code>
            </div>
          </div>
        </div>

        <div className={styles.proofGrid}>
          {copy.proof.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}
        </div>
      </section>

      <nav className={styles.anchorNav} aria-label={interfaceCopy.onPage}>
        {copy.nav.map(([label, href]) => <a href={href} key={href}>{label}</a>)}
      </nav>

      <section className={styles.section} id="overview" aria-labelledby="overview-title">
        <div className={styles.overviewGrid}>
          <div>
            <SectionHeading title={copy.overviewTitle} id="overview-title" />
            <div className={styles.prose}>{copy.overviewCopy.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
          </div>
          <aside className={styles.audiencePanel} aria-labelledby="audience-title">
            <h2 id="audience-title">{copy.audienceTitle}</h2>
            {copy.audiences.map(([title, description]) => <div key={title}><strong>{title}</strong><p>{description}</p></div>)}
          </aside>
        </div>
      </section>

      <section className={`${styles.section} ${styles.featureSection}`} id="features" aria-labelledby="features-title">
        <SectionHeading eyebrow={copy.featuresEyebrow} title={copy.featuresTitle} intro={copy.featuresIntro} id="features-title" />
        <div className={styles.featureGrid}>
          {copy.features.map(([title, description], index) => (
            <article key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={`${styles.section} ${styles.coverageSection}`} aria-labelledby="coverage-title">
        <SectionHeading title={copy.coverageTitle} intro={copy.coverageIntro} id="coverage-title" />
        <DataTable headers={copy.coverageHeaders} rows={copy.coverage} label={copy.coverageTitle} />
      </section>

      <section className={styles.flowSection} aria-labelledby="flow-title">
        <div className={styles.flowInner}>
          <SectionHeading title={copy.flowTitle} id="flow-title" />
          <div className={styles.flowGrid}>
            {copy.flow.map(([number, title, description]) => (
              <article key={number}><b>{number}</b><h3>{title}</h3><p>{description}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section} id="how-to-use" aria-labelledby="how-title">
        <div className={styles.installGrid}>
          <div>
            <SectionHeading title={copy.howTitle} intro={copy.howIntro} id="how-title" />
            <p className={styles.requirements}>{copy.requirements}</p>
            <ol className={styles.stepList}>{copy.howSteps.map((step) => <li key={step}>{step}</li>)}</ol>
          </div>
          <div className={styles.codeCard}>
            <div><span /><span /><span /><strong>terminal</strong></div>
            <pre><code>{copy.installCode}</code></pre>
            <a href={copy.repository} target="_blank" rel="noopener noreferrer">{copy.repositoryLabel}<span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </section>

      <section className={styles.mcpSection} id="mcp" aria-labelledby="mcp-title">
        <div className={styles.mcpInner}>
          <SectionHeading eyebrow={copy.mcpEyebrow} title={copy.mcpTitle} intro={copy.mcpIntro} id="mcp-title" />
          <div className={styles.mcpDiagram} aria-label={copy.mcpTitle}>
            {copy.mcpDiagram.map((item, index) => (
              <div key={item}><span>{index + 1}</span><strong>{item}</strong>{index < copy.mcpDiagram.length - 1 && <b aria-hidden="true">↓</b>}</div>
            ))}
          </div>
          <div className={styles.mcpContentGrid}>
            <div className={styles.mcpConfig}>
              <h3>{copy.mcpConfigTitle}</h3>
              <pre><code>{copy.mcpConfig}</code></pre>
            </div>
            <div className={styles.toolGroups}>
              {copy.mcpGroups.map(([title, tools]) => (
                <section key={title}><h3>{title}</h3><div>{tools.map((tool) => <code key={tool}>{tool}</code>)}</div></section>
              ))}
            </div>
          </div>
          <div className={styles.agentWorkflow}>
            <h3>{copy.agentWorkflowTitle}</h3>
            <ol>{copy.agentWorkflow.map((step) => <li key={step}>{step}</li>)}</ol>
          </div>
        </div>
      </section>

      <section className={styles.section} id="ai-search" aria-labelledby="ai-search-title">
        <SectionHeading title={copy.aiSearchTitle} id="ai-search-title" />
        <div className={styles.proseWide}>{copy.aiSearchCopy.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
        <div className={styles.aiGrid}>
          {copy.aiSearchChecks.map(([title, description]) => <article key={title}><h3>{title}</h3><p>{description}</p></article>)}
        </div>
      </section>

      <section className={`${styles.section} ${styles.comparisonSection}`} aria-labelledby="comparison-title">
        <SectionHeading title={copy.comparisonTitle} intro={copy.comparisonCopy} id="comparison-title" />
        <DataTable headers={copy.comparisonHeaders} rows={copy.comparison} label={copy.comparisonTitle} />
      </section>

      <section className={styles.truthSection} aria-labelledby="scale-title">
        <div className={styles.truthInner}>
          <div><p className={styles.eyebrow}>{interfaceCopy.evidence}</p><h2 id="scale-title">{copy.scaleTitle}</h2><p>{copy.scaleCopy}</p></div>
          <div className={styles.scaleMeters}>
            <span><strong>100K</strong><small>{interfaceCopy.regression}</small></span>
            <span><strong>1M</strong><small>{interfaceCopy.synthetic}</small></span>
            <span><strong>5M</strong><small>{interfaceCopy.oneRun}</small></span>
            <span className={styles.theoretical}><strong>100M+</strong><small>{interfaceCopy.theoretical}</small></span>
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="safety-title">
        <div className={styles.safetyGrid}>
          <SectionHeading title={copy.safetyTitle} id="safety-title" />
          <ul>{copy.safety.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
      </section>

      <section className={`${styles.section} ${styles.faqSection}`} id="faq" aria-labelledby="faq-title">
        <SectionHeading title={copy.faqTitle} id="faq-title" />
        <div className={styles.faqList}>
          {copy.faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}
        </div>
      </section>

      <section className={styles.finalCta}>
        <div><p className={styles.eyebrow}>SEO SCREAMING TOAD</p><h2>{copy.finalTitle}</h2><p>{copy.finalCopy}</p></div>
        <div>
          <a className={styles.primaryButton} href={copy.repository} target="_blank" rel="noopener noreferrer">{copy.finalPrimary}<span aria-hidden="true">↗</span></a>
          <a className={styles.secondaryButton} href={toolsHref}>{copy.finalSecondary}</a>
        </div>
      </section>

      <ToolDirectorySection locale={locale} />

      <footer className={styles.legalFooter}>
        <p>{copy.legal}</p>
        <a href={languageHref} hrefLang={languageHrefLang}>{copy.languageLabel}</a>
      </footer>
    </main>
  );
}

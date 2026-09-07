import Image from "next/image";
import Link from "next/link";
import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";
import { guideSourceUrls } from "./localizedWatermarkGuideContent";
import { articleHeaderHrefs, articleLanguageHrefs, articlePaths, hubPaths } from "./guideRoutes";
import styles from "./remove-camscanner-watermark-free/page.module.css";

const APP_PATH = "/Cam_PDF_Scan_Signer_QR-Gen/";
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.djai.campdfscan";
const PUBLISHED_DATE = "2026-09-07";

const productPaths = {
  th: APP_PATH,
  vi: APP_PATH,
  "zh-CN": `${APP_PATH}zh-cn/`,
  "zh-TW": `${APP_PATH}zh-tw/`
};

const privacyPaths = {
  th: `${APP_PATH}privacy/th/`,
  vi: `${APP_PATH}privacy/`,
  "zh-CN": `${APP_PATH}zh-cn/privacy/`,
  "zh-TW": `${APP_PATH}zh-tw/privacy/`
};

const localeSegments = { th: "", vi: "vi/", "zh-CN": "zh-cn/", "zh-TW": "zh-tw/" };

function pdfToolPath(tool, locale) {
  if (tool === "reorder-pdf-pages" && locale !== "th") {
    return "/tools/PDFTools/reorder-pdf-pages/en/";
  }
  return `/tools/PDFTools/${tool}/${localeSegments[locale] || ""}`;
}

export function generateLocalizedMetadata(content, locale) {
  const path = articlePaths[locale];
  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: {
      canonical: path,
      languages: articleLanguageHrefs
    },
    openGraph: {
      title: content.title,
      description: content.ogDescription,
      url: path,
      siteName: "DJAI Academy",
      locale,
      images: [{
        url: "/apps/cam-pdf/guides/watermark-guide-hero.webp",
        width: 1672,
        height: 941,
        alt: content.heroAlt
      }],
      type: "article",
      publishedTime: PUBLISHED_DATE,
      modifiedTime: PUBLISHED_DATE,
      authors: ["DJAI Academy"]
    },
    twitter: {
      card: "summary_large_image",
      title: content.title,
      description: content.ogDescription,
      images: ["/apps/cam-pdf/guides/watermark-guide-hero.webp"]
    }
  };
}

function SourceLink({ href, children }) {
  return <a href={href} rel="noreferrer">{children}</a>;
}

export default function LocalizedWatermarkGuidePage({ content, locale }) {
  const articlePath = articlePaths[locale];
  const hubPath = hubPaths[locale];
  const productPath = productPaths[locale];
  const sourceList = [
    guideSourceUrls.camScannerAnnouncement,
    guideSourceUrls.camScannerBilling,
    guideSourceUrls.camScannerStore,
    guideSourceUrls.swiftScan,
    guideSourceUrls.tapScanner,
    guideSourceUrls.iScanner
  ];
  const ids = ["short-answer", "in-app", "existing-file", "rescan", "comparison", "cam-pdf", "faq", "sources"];
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: content.title,
        description: content.metaDescription,
        inLanguage: locale,
        image: "https://www.djai.academy/apps/cam-pdf/guides/watermark-guide-hero.webp",
        datePublished: PUBLISHED_DATE,
        dateModified: PUBLISHED_DATE,
        articleSection: content.breadcrumbGuide,
        isAccessibleForFree: true,
        author: { "@type": "Organization", name: "DJAI Academy", url: "https://www.djai.academy/" },
        publisher: {
          "@type": "Organization",
          name: "DJAI Academy",
          url: "https://www.djai.academy/",
          logo: { "@type": "ImageObject", url: "https://www.djai.academy/djai-logo-small.webp" }
        },
        mainEntityOfPage: `https://www.djai.academy${articlePath}`
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "DJAI Academy", item: "https://www.djai.academy/" },
          { "@type": "ListItem", position: 2, name: "Cam PDF", item: `https://www.djai.academy${productPath}` },
          { "@type": "ListItem", position: 3, name: content.breadcrumbGuide, item: `https://www.djai.academy${hubPath}` },
          { "@type": "ListItem", position: 4, name: content.breadcrumbCurrent, item: `https://www.djai.academy${articlePath}` }
        ]
      }
    ]
  };

  return (
    <>
      <SiteHeader locale={locale} currentRoute="camPdf" languageHrefs={articleHeaderHrefs} />
      <main className={styles.page}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <article>
          <header className={styles.articleHeader}>
            <div className={styles.headerInner}>
              <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
                <Link href={productPath}>Cam PDF</Link><span aria-hidden="true">/</span>
                <Link href={hubPath}>{content.breadcrumbGuide}</Link><span aria-hidden="true">/</span>
                <span>{content.breadcrumbCurrent}</span>
              </nav>
              <p className={styles.eyebrow}>{content.eyebrow}</p>
              <h1>{content.title}</h1>
              <p className={styles.dek}>{content.dek}</p>
              <div className={styles.byline}>
                <span>DJAI Academy</span><span>{content.published}</span><span>{content.readTime}</span>
              </div>
            </div>
            <figure className={styles.heroFigure}>
              <Image src="/apps/cam-pdf/guides/watermark-guide-hero.webp" alt={content.heroAlt} width={1672} height={941} priority />
              <figcaption>{content.heroCaption}</figcaption>
            </figure>
          </header>

          <div className={styles.articleLayout}>
            <aside className={styles.toc} aria-label={content.tocLabel}>
              <strong>{content.tocLabel}</strong>
              {content.toc.map((label, index) => <a href={`#${ids[index]}`} key={ids[index]}>{label}</a>)}
            </aside>

            <div className={styles.articleBody}>
              <section className={styles.answerBox} id="short-answer">
                <p className={styles.eyebrow}>{content.short.label}</p>
                <h2>{content.short.title}</h2>
                <ol>{content.short.steps.map((step) => <li key={step}>{step}</li>)}</ol>
                <p>{content.short.note}</p>
              </section>

              <section id="in-app">
                <p className={styles.sectionNumber}>01</p>
                <h2>{content.inApp.title}</h2>
                {content.inApp.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                <div className={styles.steps}>
                  {content.inApp.steps.map(([title, body], index) => (
                    <div key={title}><span>{index + 1}</span><h3>{title}</h3><p>{body}</p></div>
                  ))}
                </div>
                <p className={styles.sourceNote}>{content.inApp.sourceLabel}: <SourceLink href={guideSourceUrls.camScannerAnnouncement}>{content.inApp.sourceText}</SourceLink>.</p>
              </section>

              <section className={styles.costBand} aria-labelledby={`cost-title-${locale}`}>
                <div><p className={styles.eyebrow}>{content.cost.label}</p><h2 id={`cost-title-${locale}`}>{content.cost.title}</h2></div>
                <div>
                  {content.cost.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  <p className={styles.sourceNote}>{content.cost.sourcesLabel}: <SourceLink href={guideSourceUrls.camScannerStore}>{content.cost.storeText}</SourceLink> · <SourceLink href={guideSourceUrls.camScannerBilling}>{content.cost.billingText}</SourceLink>.</p>
                </div>
              </section>

              <section id="existing-file">
                <p className={styles.sectionNumber}>02</p>
                <h2>{content.existing.title}</h2>
                <p>{content.existing.intro}</p>
                <div className={styles.optionGrid}>
                  {content.existing.options.map(([label, title, body]) => (
                    <article key={title}><span className={styles.optionLabel}>{label}</span><h3>{title}</h3><p>{body}</p></article>
                  ))}
                </div>
                <h3>{content.existing.avoidTitle}</h3>
                <ul>{content.existing.avoid.map(([title, body]) => <li key={title}><strong>{title}.</strong> {body}</li>)}</ul>
                <p>{content.existing.toolBefore} <Link href={pdfToolPath("reorder-pdf-pages", locale)}>{content.existing.organizer}</Link> {content.existing.toolBetween} <Link href={pdfToolPath("compress-pdf", locale)}>{content.existing.compressor}</Link> {content.existing.toolAfter}</p>
              </section>

              <section id="rescan">
                <p className={styles.sectionNumber}>03</p>
                <h2>{content.rescan.title}</h2>
                <p>{content.rescan.intro}</p>
                <figure className={styles.bodyFigure}>
                  <Image src="/apps/cam-pdf/guides/rescan-original-document.webp" alt={content.rescan.alt} width={1672} height={941} />
                  <figcaption>{content.rescan.caption}</figcaption>
                </figure>
                <ol>{content.rescan.steps.map((step) => <li key={step}>{step}</li>)}</ol>
              </section>

              <section id="comparison">
                <p className={styles.sectionNumber}>04</p>
                <h2>{content.comparison.title}</h2>
                <p>{content.comparison.intro}</p>
                <div className={styles.tableWrap}>
                  <table>
                    <thead><tr>{content.comparison.headings.map((heading) => <th key={heading}>{heading}</th>)}</tr></thead>
                    <tbody>
                      {content.comparison.rows.map(([app, status, detail, source, href]) => (
                        <tr key={app}>
                          <th scope="row">{app}</th><td><strong>{status}</strong></td>
                          <td>{detail} <SourceLink href={href === APP_PATH ? productPath : href}>{source}</SourceLink></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className={styles.methodNote}>{content.comparison.note}</p>
              </section>

              <section className={styles.productSection} id="cam-pdf">
                <div className={styles.productCopy}>
                  <p className={styles.eyebrow}>{content.product.label}</p>
                  <h2>{content.product.title}</h2>
                  {content.product.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  <div className={styles.actions}>
                    <a className={styles.primaryButton} href={PLAY_STORE_URL}>{content.product.play}</a>
                    <Link className={styles.secondaryButton} href={productPath}>{content.product.explore}</Link>
                  </div>
                  <p className={styles.platformNote}>{content.product.platform}</p>
                </div>
                <figure className={styles.phoneFigure}>
                  <Image src="/apps/cam-pdf/export.png" alt={content.product.imageAlt} width={390} height={844} />
                  <figcaption>{content.product.imageCaption}</figcaption>
                </figure>
              </section>

              <section id="faq">
                <p className={styles.sectionNumber}>05</p><h2>{content.faqTitle}</h2>
                <div className={styles.faqList}>{content.faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
              </section>

              <section className={styles.sources} id="sources">
                <p className={styles.sectionNumber}>06</p><h2>{content.sources.title}</h2><p>{content.sources.intro}</p>
                <ul>{content.sources.labels.map((label, index) => <li key={label}><SourceLink href={sourceList[index]}>{label}</SourceLink></li>)}</ul>
                <p>{content.sources.disclaimer}</p>
              </section>

              <footer className={styles.articleFooter}>
                <div><p className={styles.eyebrow}>{content.footer.label}</p><h2>{content.footer.title}</h2></div>
                <div>
                  <Link href={hubPath}>{content.footer.hub}</Link>
                  <Link href={productPath}>{content.footer.product}</Link>
                  <Link href={privacyPaths[locale]}>{content.footer.privacy}</Link>
                  <a href="mailto:contact@djai.academy">{content.footer.contact}</a>
                </div>
              </footer>
            </div>
          </div>
        </article>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}

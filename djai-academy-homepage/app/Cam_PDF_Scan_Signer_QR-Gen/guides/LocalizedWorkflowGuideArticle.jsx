import Image from "next/image";
import Link from "next/link";
import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";
import TrackedLink from "../../components/TrackedLink";
import { playStoreEventParams } from "./CamPdfGuideArticle";
import { articlePaths, hubPaths, workflowGuideHeaderHrefs, workflowGuideLanguageHrefs, workflowGuidePaths } from "./guideRoutes";
import styles from "./remove-camscanner-watermark-free/page.module.css";

const APP_PATH = "/Cam_PDF_Scan_Signer_QR-Gen/";
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.djai.campdfscan";

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

const localeLabels = {
  th: "Cam PDF",
  vi: "Cam PDF",
  "zh-CN": "Cam PDF",
  "zh-TW": "Cam PDF"
};

export function generateLocalizedWorkflowMetadata(content, locale, key) {
  const path = workflowGuidePaths[key][locale];
  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: { canonical: path, languages: workflowGuideLanguageHrefs[key] },
    openGraph: {
      title: content.title,
      description: content.ogDescription,
      url: path,
      siteName: "DJAI Academy",
      locale,
      images: [{
        url: content.heroImage,
        width: 1672,
        height: 941,
        alt: content.heroAlt
      }],
      type: "article",
      publishedTime: "2026-09-09",
      modifiedTime: "2026-09-09",
      authors: ["DJAI Academy"]
    },
    twitter: {
      card: "summary_large_image",
      title: content.title,
      description: content.ogDescription,
      images: [content.heroImage]
    }
  };
}

function RelatedLinks({ content, locale, currentKey }) {
  const links = (content.related || []).filter((link) => link.key !== currentKey);
  return (
    <section className={styles.articleFooter} aria-labelledby={`related-${locale}-${currentKey}`}>
      <div>
        <p className={styles.eyebrow}>{content.relatedLabel}</p>
        <h2 id={`related-${locale}-${currentKey}`}>{content.relatedTitle}</h2>
      </div>
      <div>
        {links.map((link) => (
          <Link href={workflowGuidePaths[link.key][locale]} key={link.key}>{link.label}</Link>
        ))}
        <Link href={articlePaths[locale]}>{content.watermarkLink}</Link>
      </div>
    </section>
  );
}

export default function LocalizedWorkflowGuideArticle({ content, locale, guideKey }) {
  const articlePath = workflowGuidePaths[guideKey][locale];
  const hubPath = hubPaths[locale];
  const productPath = productPaths[locale];
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: content.title,
        description: content.metaDescription,
        inLanguage: locale,
        image: `https://www.djai.academy${content.heroImage}`,
        datePublished: "2026-09-09",
        dateModified: "2026-09-09",
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
          { "@type": "ListItem", position: 2, name: localeLabels[locale], item: `https://www.djai.academy${productPath}` },
          { "@type": "ListItem", position: 3, name: content.breadcrumbGuide, item: `https://www.djai.academy${hubPath}` },
          { "@type": "ListItem", position: 4, name: content.breadcrumbCurrent, item: `https://www.djai.academy${articlePath}` }
        ]
      }
    ]
  };

  return (
    <>
      <SiteHeader locale={locale} currentRoute="camPdf" languageHrefs={workflowGuideHeaderHrefs[guideKey]} />
      <main className={styles.page}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <article>
          <header className={styles.articleHeader}>
            <div className={styles.headerInner}>
              <nav className={styles.breadcrumbs} aria-label={content.breadcrumbLabel}>
                <Link href={productPath}>{localeLabels[locale]}</Link><span aria-hidden="true">/</span>
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
              <Image src={content.heroImage} alt={content.heroAlt} width={1672} height={941} priority />
              <figcaption>{content.heroCaption}</figcaption>
            </figure>
          </header>

          <div className={styles.articleLayout}>
            <aside className={styles.toc} aria-label={content.tocLabel}>
              <strong>{content.tocLabel}</strong>
              {content.toc.map((item) => <a href={`#${item.id}`} key={item.id}>{item.label}</a>)}
              <a href="#download-cam-pdf">{content.cta.tocLabel}</a>
            </aside>

            <div className={styles.articleBody}>
              <section className={styles.answerBox} id="short-answer">
                <p className={styles.eyebrow}>{content.answer.label}</p>
                <h2>{content.answer.title}</h2>
                <ol>{content.answer.steps.map((step) => <li key={step}>{step}</li>)}</ol>
                <p>{content.answer.note}</p>
              </section>

              {content.sections.map((section) => (
                <section id={section.id} key={section.id}>
                  <p className={styles.sectionNumber}>{section.number}</p>
                  <h2>{section.title}</h2>
                  {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {section.cards && (
                    <div className={styles.optionGrid}>
                      {section.cards.map((card) => (
                        <article key={card.title}>
                          <span className={styles.optionLabel}>{card.label}</span>
                          <h3>{card.title}</h3>
                          <p>{card.body}</p>
                        </article>
                      ))}
                    </div>
                  )}
                  {section.steps && <ol>{section.steps.map((step) => <li key={step}>{step}</li>)}</ol>}
                  {section.image && (
                    <figure className={styles.bodyFigure}>
                      <Image src={section.image.src} alt={section.image.alt} width={390} height={844} />
                      <figcaption>{section.image.caption}</figcaption>
                    </figure>
                  )}
                  {section.note && <p className={styles.methodNote}>{section.note}</p>}
                </section>
              ))}

              <section className={styles.productSection} id="download-cam-pdf">
                <div className={styles.productCopy}>
                  <p className={styles.eyebrow}>{content.cta.label}</p>
                  <h2>{content.cta.title}</h2>
                  {content.cta.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  <p>
                    {content.cta.access}
                  </p>
                  <div className={styles.actions}>
                    <TrackedLink
                      className={styles.primaryButton}
                      href={PLAY_STORE_URL}
                      target="_blank"
                      rel="noreferrer"
                      eventName="play_store_click"
                      eventParams={playStoreEventParams(articlePath, locale)}
                    >
                      {content.cta.play}
                    </TrackedLink>
                    <Link className={styles.secondaryButton} href={productPath}>{content.cta.explore}</Link>
                  </div>
                  <p className={styles.platformNote}>{content.cta.platform}</p>
                </div>
                <figure className={styles.phoneFigure}>
                  <Image src={content.cta.image} alt={content.cta.imageAlt} width={390} height={844} />
                  <figcaption>{content.cta.imageCaption}</figcaption>
                </figure>
              </section>

              <section id="questions">
                <p className={styles.sectionNumber}>{content.faqNumber}</p>
                <h2>{content.faqTitle}</h2>
                <div className={styles.faqList}>
                  {content.faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}
                </div>
              </section>

              <RelatedLinks content={content} locale={locale} currentKey={guideKey} />

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

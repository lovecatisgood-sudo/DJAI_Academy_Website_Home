import Image from "next/image";
import Link from "next/link";
import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";
import { articlePaths, hubHeaderHrefs, hubLanguageHrefs, hubPaths, workflowGuidePaths } from "./guideRoutes";
import { localizedWorkflowGuideContent, localizedWorkflowHubCards } from "./localizedWorkflowGuideContent";
import styles from "./page.module.css";

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

export function generateLocalizedHubMetadata(content, locale) {
  const path = hubPaths[locale];
  return {
    title: content.title,
    description: content.description,
    alternates: { canonical: path, languages: hubLanguageHrefs },
    openGraph: {
      title: content.title,
      description: content.description,
      url: path,
      siteName: "DJAI Academy",
      locale,
      images: [{
        url: "/apps/cam-pdf/guides/watermark-guide-hero.webp",
        width: 1672,
        height: 941,
        alt: content.title
      }],
      type: "website"
    }
  };
}

export default function LocalizedGuideHub({ content, locale }) {
  const productPath = productPaths[locale];
  const workflowCards = localizedWorkflowHubCards[locale];
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: content.title,
    description: content.description,
    inLanguage: locale,
    url: `https://www.djai.academy${hubPaths[locale]}`,
    isPartOf: { "@type": "WebSite", name: "DJAI Academy", url: "https://www.djai.academy/" }
  };

  return (
    <>
      <SiteHeader locale={locale} currentRoute="camPdf" languageHrefs={hubHeaderHrefs} />
      <main className={styles.page}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <section className={styles.hero}>
          <div>
            <p className={styles.eyebrow}>{content.eyebrow}</p>
            <h1>{content.title}</h1>
            <p className={styles.dek}>{content.dek}</p>
          </div>
          <Image src="/apps/cam-pdf/guides/watermark-guide-hero.webp" alt={content.title} width={1672} height={941} priority />
        </section>

        <section className={styles.featured} aria-labelledby={`featured-${locale}`}>
          <article>
            <div className={styles.cardImage}>
              <Image src="/apps/cam-pdf/guides/rescan-original-document.webp" alt="" width={1672} height={941} />
            </div>
            <div className={styles.cardCopy}>
              <span>{content.cardLabel}</span>
              <h2 id={`featured-${locale}`}>{content.cardTitle}</h2>
              <p>{content.cardBody}</p>
              <Link href={articlePaths[locale]}>{content.cardCta}</Link>
            </div>
          </article>
        </section>

        <section className={styles.guideGridSection} aria-labelledby={`workflow-guides-${locale}`}>
          <header>
            <p className={styles.eyebrow}>{workflowCards.sectionEyebrow}</p>
            <h2 id={`workflow-guides-${locale}`}>{workflowCards.sectionTitle}</h2>
            <p>{workflowCards.sectionBody}</p>
          </header>
          <div className={styles.guideGrid}>
            {Object.entries(workflowCards.cards).map(([key, card]) => (
              <article key={key}>
                <span>{card.label}</span>
                <h3>{localizedWorkflowGuideContent[locale][key].title}</h3>
                <p>{card.body}</p>
                <Link href={workflowGuidePaths[key][locale]}>{card.cta}</Link>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.more} aria-label="Cam PDF resources">
          <div className={styles.cardGrid}>
            <article>
              <span>Cam PDF</span><h3>{content.productTitle}</h3><p>{content.productBody}</p>
              <Link href={productPath}>{content.productCta}</Link>
            </article>
            <article>
              <span>Google Play</span><h3>{content.productTitle}</h3><p>{content.productBody}</p>
              <a href={PLAY_STORE_URL} rel="noreferrer">Google Play</a>
            </article>
            <article>
              <span>Privacy</span><h3>{content.trustTitle}</h3><p>{content.trustBody}</p>
              <Link href={privacyPaths[locale]}>{content.trustCta}</Link>
            </article>
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}

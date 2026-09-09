import Image from "next/image";
import Link from "next/link";
import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";
import TrackedLink from "../../components/TrackedLink";
import { hubHeaderHrefs } from "./guideRoutes";
import styles from "./remove-camscanner-watermark-free/page.module.css";

export const APP_PATH = "/Cam_PDF_Scan_Signer_QR-Gen/";
export const GUIDES_PATH = `${APP_PATH}guides/`;
export const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.djai.campdfscan";

export function SourceLink({ href, children }) {
  return <a href={href} rel="noreferrer">{children}</a>;
}

export function playStoreEventParams(articlePath, locale = "en") {
  return {
    source_path: articlePath,
    locale,
    cluster: "cam_pdf",
    destination_type: "google_play",
    destination_url: PLAY_STORE_URL
  };
}

export default function CamPdfGuideArticle({
  articlePath,
  title,
  eyebrow,
  dek,
  publishedDate,
  readTime,
  heroImage,
  heroAlt,
  heroCaption,
  heroWidth = 1672,
  heroHeight = 941,
  toc,
  children,
  ctaTitle,
  ctaText,
  ctaImage = "/apps/cam-pdf/home.png",
  ctaImageAlt = "Cam PDF document library on an Android phone",
  relatedLinks = [],
  languageHrefs = hubHeaderHrefs,
  structuredData = null
}) {
  return (
    <>
      <SiteHeader locale="en" currentRoute="camPdf" languageHrefs={languageHrefs} />
      <main className={styles.page}>
        {structuredData && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        )}
        <article>
          <header className={styles.articleHeader}>
            <div className={styles.headerInner}>
              <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
                <Link href={APP_PATH}>Cam PDF</Link>
                <span aria-hidden="true">/</span>
                <Link href={GUIDES_PATH}>Guides</Link>
                <span aria-hidden="true">/</span>
                <span>{eyebrow}</span>
              </nav>
              <p className={styles.eyebrow}>{eyebrow}</p>
              <h1>{title}</h1>
              <p className={styles.dek}>{dek}</p>
              <div className={styles.byline}>
                <span>By DJAI Academy</span>
                <span>Published {publishedDate}</span>
                <span>{readTime} min read</span>
              </div>
            </div>
            <figure className={styles.heroFigure}>
              <Image src={heroImage} alt={heroAlt} width={heroWidth} height={heroHeight} priority />
              <figcaption>{heroCaption}</figcaption>
            </figure>
          </header>

          <div className={styles.articleLayout}>
            <aside className={styles.toc} aria-label="On this page">
              <strong>On this page</strong>
              {toc.map((item) => <a href={`#${item.id}`} key={item.id}>{item.label}</a>)}
              <a href="#download-cam-pdf">Get Cam PDF</a>
            </aside>

            <div className={styles.articleBody}>
              {children}

              <section className={styles.productSection} id="download-cam-pdf">
                <div className={styles.productCopy}>
                  <p className={styles.eyebrow}>Next step</p>
                  <h2>{ctaTitle}</h2>
                  <p>{ctaText}</p>
                  <p>
                    Cam PDF exports without an added Cam PDF watermark. An account, advertising,
                    and a weekly export allowance apply; check the app&apos;s access model before you
                    start a time-sensitive document task.
                  </p>
                  <div className={styles.actions}>
                    <TrackedLink
                      className={styles.primaryButton}
                      href={PLAY_STORE_URL}
                      target="_blank"
                      rel="noreferrer"
                      eventName="play_store_click"
                      eventParams={playStoreEventParams(articlePath)}
                    >
                      Download Cam PDF on Google Play
                    </TrackedLink>
                    <Link className={styles.secondaryButton} href={APP_PATH}>
                      Explore Cam PDF features
                    </Link>
                  </div>
                  <p className={styles.platformNote}>
                    The verified download link above is for Android. The guide remains useful on
                    iPhone, but the App Store CTA will be added only when its public listing is live.
                  </p>
                </div>
                <figure className={styles.phoneFigure}>
                  <Image src={ctaImage} alt={ctaImageAlt} width={390} height={844} />
                  <figcaption>Cam PDF in the document workflow</figcaption>
                </figure>
              </section>

              <footer className={styles.articleFooter}>
                <div>
                  <p className={styles.eyebrow}>Keep exploring</p>
                  <h2>Build a cleaner mobile document workflow.</h2>
                </div>
                <div>
                  <Link href={GUIDES_PATH}>Browse Cam PDF guides</Link>
                  {relatedLinks.map((link) => <Link href={link.href} key={link.href}>{link.label}</Link>)}
                  <Link href={`${APP_PATH}privacy/`}>Review Cam PDF privacy</Link>
                </div>
              </footer>
            </div>
          </div>
        </article>
      </main>
      <SiteFooter locale="en" />
    </>
  );
}

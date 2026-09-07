import Image from "next/image";
import Link from "next/link";
import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";
import styles from "./page.module.css";

const APP_PATH = "/Cam_PDF_Scan_Signer_QR-Gen/";
const GUIDES_PATH = `${APP_PATH}guides/`;
const WATERMARK_GUIDE = "/Cam_PDF_Scan_Signer_QR-Gen/guides/remove-camscanner-watermark-free/";
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.djai.campdfscan";

export const metadata = {
  title: "Cam PDF Guides: Scanning, Signing & Clean Exports",
  description:
    "Practical Cam PDF guides for scanning, signing, organizing, compressing, and exporting clean documents on Android and iPhone.",
  alternates: { canonical: GUIDES_PATH },
  openGraph: {
    title: "Cam PDF Guides",
    description: "Practical help for cleaner mobile document workflows.",
    url: GUIDES_PATH,
    siteName: "DJAI Academy",
    images: [
      {
        url: "/apps/cam-pdf/guides/watermark-guide-hero.webp",
        width: 1672,
        height: 941,
        alt: "Phone scanning a document into a clean PDF"
      }
    ],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Cam PDF Guides",
    description: "Practical help for cleaner mobile document workflows.",
    images: ["/apps/cam-pdf/guides/watermark-guide-hero.webp"]
  }
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      name: "Cam PDF Guides",
      description: "Practical guides for mobile scanning, signing, PDF organization, and clean exports.",
      url: `https://www.djai.academy${GUIDES_PATH}`,
      isPartOf: { "@type": "WebSite", name: "DJAI Academy", url: "https://www.djai.academy/" }
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "DJAI Academy", item: "https://www.djai.academy/" },
        { "@type": "ListItem", position: 2, name: "Cam PDF", item: `https://www.djai.academy${APP_PATH}` },
        { "@type": "ListItem", position: 3, name: "Guides", item: `https://www.djai.academy${GUIDES_PATH}` }
      ]
    }
  ]
};

export default function CamPdfGuidesPage() {
  return (
    <>
      <SiteHeader locale="en" currentRoute="camPdf" />
      <main className={styles.page}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
              <Link href={APP_PATH}>Cam PDF</Link>
              <span aria-hidden="true">/</span>
              <span>Guides</span>
            </nav>
            <p className={styles.eyebrow}>Cam PDF field guide</p>
            <h1>Better scans begin with better decisions.</h1>
            <p>
              Practical, evidence-checked guidance for turning paper into readable files, fixing
              common export problems, and choosing the right mobile document workflow.
            </p>
          </div>
          <Image
            src="/apps/cam-pdf/guides/watermark-guide-hero.webp"
            alt="Document scanning workflow leading to a clean PDF export"
            width={1672}
            height={941}
            priority
          />
        </section>

        <section className={styles.featured} aria-labelledby="featured-guide">
          <div className={styles.sectionLabel}>Featured guide · 12 min read</div>
          <article>
            <div>
              <p className={styles.eyebrow}>Watermarks and clean exports</p>
              <h2 id="featured-guide">How to remove the CamScanner watermark for free</h2>
              <p>
                Start with the legitimate in-app option, learn why it is not available to every
                user, and choose a safe fallback for an existing PDF or image. The guide also
                compares current watermark policies across popular scanner apps.
              </p>
              <Link className={styles.primaryLink} href={WATERMARK_GUIDE}>
                Read the complete guide
              </Link>
            </div>
            <div className={styles.answerPreview}>
              <strong>The short answer</strong>
              <p>
                If CamScanner shows “Remove watermark,” use it before export. If it does not, there
                is no single free in-app method that works for every version, region, and plan.
              </p>
            </div>
          </article>
        </section>

        <section className={styles.more} aria-labelledby="more-resources">
          <header>
            <p className={styles.eyebrow}>Continue the workflow</p>
            <h2 id="more-resources">Product details and release notes</h2>
          </header>
          <div className={styles.cardGrid}>
            <article>
              <span>Product</span>
              <h3>Explore Cam PDF</h3>
              <p>See the scanner, PDF editor, signer, organizer, export tools, and QR studio.</p>
              <Link href={APP_PATH}>Open the product page</Link>
            </article>
            <article>
              <span>Download</span>
              <h3>Try a cleaner scanning workflow</h3>
              <p>Scan, organize, sign, and export from Cam PDF without an added Cam PDF watermark.</p>
              <a href={PLAY_STORE_URL} target="_blank" rel="noreferrer">
                Get Cam PDF on Google Play
              </a>
            </article>
            <article>
              <span>Trust</span>
              <h3>How document data is handled</h3>
              <p>Review the privacy boundaries for scans, accounts, analytics, ads, and sharing.</p>
              <Link href={`${APP_PATH}privacy/`}>Read the privacy policy</Link>
            </article>
          </div>
        </section>
      </main>
      <SiteFooter locale="en" />
    </>
  );
}

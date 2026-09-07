import Image from "next/image";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import TrackedLink from "../components/TrackedLink";
import styles from "./page.module.css";

const APP_PATH = "/Cam_PDF_Scan_Signer_QR-Gen/";
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.djai.campdfscan";
const playStoreEventParams = {
  source_path: APP_PATH,
  locale: "en",
  cluster: "cam_pdf",
  destination_type: "google_play",
  destination_url: PLAY_STORE_URL
};

export const metadata = {
  title: "PDF Scanner App for Android: Scan, Sign & Create QR Codes | Cam PDF",
  description:
    "Scan documents, sign and organize PDFs, create QR codes, and export without an added watermark with Cam PDF for Android.",
  alternates: { canonical: APP_PATH },
  openGraph: {
    title: "Cam PDF Scanner, PDF Signer & QR Generator for Android",
    description:
      "Scan documents, sign and organize PDFs, create QR codes, and control exports in one Android app by DJAI.",
    url: APP_PATH,
    siteName: "DJAI Academy",
    images: [
      {
        url: "/apps/cam-pdf/home.png",
        width: 390,
        height: 844,
        alt: "Cam PDF Scan Signer QR Gen document home screen"
      }
    ],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Cam PDF Scanner, PDF Signer & QR Generator for Android",
    description: "Scan documents, sign PDFs, create QR codes, and control exports on Android.",
    images: ["/apps/cam-pdf/home.png"]
  }
};

const features = [
  {
    number: "01",
    title: "Scan and correct",
    text: "Capture single or multi-page documents, correct edges, rotate pages, and apply readable scan filters."
  },
  {
    number: "02",
    title: "Import and organize",
    text: "Bring in PDFs, DOCX files, and images, then sort, rename, duplicate, or delete documents from one library."
  },
  {
    number: "03",
    title: "Edit and sign",
    text: "Reorder pages, erase content, add signatures, place text and dates, and prepare ID copies for printing."
  },
  {
    number: "04",
    title: "Export with control",
    text: "Choose a file name before export, set PDF page size and quality, compress for upload limits, then share or print."
  },
  {
    number: "05",
    title: "PDF essentials",
    text: "Merge, split, extract, protect, and convert PDF pages without moving between separate utilities."
  },
  {
    number: "06",
    title: "QR studio",
    text: "Scan QR codes or create codes for websites, text, Wi-Fi, contacts, and email, then save them as images."
  }
];

const screens = [
  ["home.png", "Document library", "Scan shortcuts and file management in one focused home screen."],
  ["editor.png", "Edge correction", "Adjust page boundaries before enhancement and export."],
  ["export.png", "Named exports", "Choose the output name, format, page size, and quality before creating a file."],
  ["tools.png", "Document tools", "Signing, ID copies, compression, PDF utilities, and image conversion."],
  ["qr.png", "QR Studio", "Create and save common QR types without leaving the app."]
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  name: "Cam PDF Scan Signer QR Gen",
  operatingSystem: "Android",
  applicationCategory: "UtilitiesApplication",
  softwareVersion: "2.0.1",
  description:
    "Android document scanner, PDF editor, signer, file manager, export utility, and QR code studio by DJAI.",
  url: `https://www.djai.academy${APP_PATH}`,
  installUrl: PLAY_STORE_URL,
  author: {
    "@type": "Organization",
    name: "DJAI Academy",
    url: "https://www.djai.academy/"
  },
  featureList: features.map((feature) => feature.title)
};

export default function CamPdfAppPage() {
  return (
    <>
      <SiteHeader
        locale="en"
        currentRoute="camPdf"
        languageHrefs={{
          "zh-CN": `${APP_PATH}zh-cn/`,
          "zh-TW": `${APP_PATH}zh-tw/`
        }}
      />
      <main className={styles.page}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <section className={styles.hero}>
          <div className={styles.heroScreens}>
            <Image
              className={styles.heroScreenLeft}
              src="/apps/cam-pdf/editor.png"
              alt="Cam PDF Scan Signer document edge correction screen"
              width={390}
              height={844}
              priority
            />
            <Image
              className={styles.heroScreenMain}
              src="/apps/cam-pdf/home.png"
              alt="Cam PDF Scan Signer document library home screen"
              width={390}
              height={844}
              priority
            />
            <Image
              className={styles.heroScreenRight}
              src="/apps/cam-pdf/qr.png"
              alt="Cam PDF Scan Signer QR code generator screen"
              width={390}
              height={844}
              priority
            />
          </div>
          <div className={styles.heroShade} />
          <div className={styles.heroInner}>
            <div className={styles.productLockup}>
              <Image
                src="/apps/cam-pdf/icon.webp"
                alt="Cam PDF Scan Signer QR Gen app icon"
                width={72}
                height={72}
              />
              <span>Android app by DJAI</span>
            </div>
            <h1 className={styles.heroTitle}>Scan documents, sign PDFs, and create QR codes on Android</h1>
            <p className={styles.heroCopy}>
              Cam PDF turns paper, photos, PDFs, and office documents into organized files you can
              edit, sign, compress, name, and share from one Android workspace.
            </p>
            <div className={styles.heroActions}>
              <TrackedLink
                className={styles.releaseButton}
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noreferrer"
                eventName="play_store_click"
                eventParams={playStoreEventParams}
              >
                Download on Google Play
              </TrackedLink>
              <a className={styles.secondaryButton} href="#product">
                See scanner, signer, PDF, and QR features
              </a>
            </div>
            <p className={styles.heroPromise}>
              No added watermark on exported files. Account and usage conditions apply.
            </p>
            <a
              className={styles.guideLink}
              href="/Cam_PDF_Scan_Signer_QR-Gen/guides/remove-camscanner-watermark-free/"
            >
              Read: how to remove a scanner watermark safely
            </a>
          </div>
        </section>

        <section className={styles.releaseStrip} aria-label="Product status">
          <div>
            <strong>Live on Google Play</strong>
            <span>Version 2.0.1 · Updated August 31, 2026</span>
          </div>
          <div>
            <strong>Local document workflow</strong>
            <span>Your document content is processed on your device</span>
          </div>
          <div>
            <strong>No added watermark</strong>
            <span>Export clean files within the app&apos;s usage model</span>
          </div>
        </section>

        <section className={styles.accessBand} aria-labelledby="access-model-title">
          <div>
            <p className={styles.kicker}>Before you install</p>
            <h2 id="access-model-title">Know the access model.</h2>
            <p>
              Cam PDF is designed for recurring document work, with usage controls that are
              explained before you leave this page.
            </p>
          </div>
          <ul>
            <li>An account is required to use the app.</li>
            <li>Exports use a weekly export allowance.</li>
            <li>A one-time Remove Ads purchase includes unlimited exports.</li>
            <li>Optional rewarded ads may add usage when available.</li>
            <li>The app contains ads and in-app purchases.</li>
          </ul>
        </section>

        <section className={styles.features} id="product">
          <header className={styles.sectionHeading}>
            <p className={styles.kicker}>Built around the complete document flow</p>
            <h2>From camera capture to a properly named final file.</h2>
            <p>
              Cam PDF removes the handoffs between scanner, file manager, PDF utility, signature
              tool, compressor, and QR generator.
            </p>
          </header>
          <div className={styles.featureGrid}>
            {features.map((feature) => (
              <article key={feature.number}>
                <span>{feature.number}</span>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.showcase}>
          <header className={styles.sectionHeading}>
            <p className={styles.kicker}>Product interface</p>
            <h2>A document library that stays clear as the work grows.</h2>
            <p>
              Fast access to recent files, predictable editing controls, and explicit export
              settings keep everyday scanning work easy to review.
            </p>
          </header>
          <div className={styles.screenGrid} tabIndex={0} aria-label="Cam PDF product screenshots">
            {screens.map(([image, title, text]) => (
              <figure key={image}>
                <div className={styles.screenFrame}>
                  <Image
                    src={`/apps/cam-pdf/${image}`}
                    alt={`${title} screen in Cam PDF Scan Signer QR Gen`}
                    width={390}
                    height={844}
                  />
                </div>
                <figcaption>
                  <strong>{title}</strong>
                  <span>{text}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className={styles.privacyBand}>
          <div>
            <p className={styles.kicker}>Privacy by default</p>
            <h2>Your documents are not a cloud service.</h2>
            <p>
              Scans, imported document content, signatures, and generated files stay in app-owned
              storage unless you choose to share or export them. Account, usage, consent, analytics,
              advertising, and notification metadata are described separately in the privacy policy.
            </p>
          </div>
          <div className={styles.privacyLinks}>
            <a href={`${APP_PATH}privacy/`}>Read the privacy policy</a>
            <a href={`${APP_PATH}terms/`}>Read the terms</a>
            <a href={`${APP_PATH}delete-account/`}>Delete an account</a>
            <a href="mailto:contact@djai.academy">Contact support</a>
          </div>
        </section>

        <section className={styles.details}>
          <div className={styles.detailCopy}>
            <p className={styles.kicker}>Designed for real file handling</p>
            <h2>Keep control before and after export.</h2>
            <p>
              Imported files remain visible in the document library with sorting and management
              actions. Before export, choose the final file name instead of accepting a generated
              label you have to fix later.
            </p>
          </div>
          <dl className={styles.detailList}>
            <div>
              <dt>Import</dt>
              <dd>PDF, DOCX, JPG, PNG, and common image formats</dd>
            </div>
            <div>
              <dt>Manage</dt>
              <dd>Sort, rename, duplicate, select, and delete documents</dd>
            </div>
            <div>
              <dt>Edit</dt>
              <dd>Crop, rotate, enhance, reorder, erase, annotate, and sign</dd>
            </div>
            <div>
              <dt>Deliver</dt>
              <dd>Named PDF and image exports with quality and size controls</dd>
            </div>
          </dl>
        </section>

        <section className={styles.finalCta}>
          <Image src="/apps/cam-pdf/icon.webp" alt="Cam PDF app icon" width={92} height={92} />
          <p className={styles.kicker}>Available on Google Play</p>
          <h2>Cam PDF Scan Signer QR Gen</h2>
          <p>
            Download the Android app from Google Play. An account is required, free access uses a
            weekly export allowance, and the one-time Remove Ads purchase includes unlimited
            exports. The app contains ads and in-app purchases. No added watermark is placed on
            exported files.
          </p>
          <TrackedLink
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noreferrer"
            eventName="play_store_click"
            eventParams={playStoreEventParams}
          >
            Download on Google Play
          </TrackedLink>
          <small>
            Verified against the Google Play listing and DJAI app policy on September 6, 2026.
          </small>
        </section>
      </main>
      <SiteFooter locale="en" />
    </>
  );
}

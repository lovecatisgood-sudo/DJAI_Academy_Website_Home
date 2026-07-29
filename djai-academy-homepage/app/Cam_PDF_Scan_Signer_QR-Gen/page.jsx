import Image from "next/image";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import styles from "./page.module.css";

const APP_PATH = "/Cam_PDF_Scan_Signer_QR-Gen/";

export const metadata = {
  title: "Cam PDF Scan Signer QR Gen for Android | DJAI",
  description:
    "Scan documents, organize files, edit and sign PDFs, create QR codes, and export clean files from one Android app by DJAI.",
  alternates: { canonical: APP_PATH },
  openGraph: {
    title: "Cam PDF Scan Signer QR Gen",
    description:
      "An Android document scanner, PDF editor, signer, file manager, and QR studio by DJAI.",
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
    title: "Cam PDF Scan Signer QR Gen",
    description: "Scan, edit, sign, organize, and export documents on Android.",
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
  description:
    "Android document scanner, PDF editor, signer, file manager, export utility, and QR code studio by DJAI.",
  url: `https://www.djai.academy${APP_PATH}`,
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
      <SiteHeader locale="en" currentRoute="home" languageHref={APP_PATH} />
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
                src="/apps/cam-pdf/icon.png"
                alt="Cam PDF Scan Signer QR Gen app icon"
                width={72}
                height={72}
              />
              <span>Android app by DJAI</span>
            </div>
            <h1 className={styles.heroTitle}>Cam PDF Scan Signer QR Gen</h1>
            <p className={styles.heroCopy}>
              Turn paper, photos, PDFs, and office documents into organized files you can edit,
              sign, compress, name, and share from one Android workspace.
            </p>
            <div className={styles.heroActions}>
              <span className={styles.releaseButton}>Google Play release in progress</span>
              <a className={styles.secondaryButton} href="#product">
                Explore the app
              </a>
            </div>
            <p className={styles.heroPromise}>Free document features. No watermark on exported files.</p>
          </div>
        </section>

        <section className={styles.releaseStrip} aria-label="Product status">
          <div>
            <strong>Android first</strong>
            <span>Designed for practical mobile document work</span>
          </div>
          <div>
            <strong>Local document workflow</strong>
            <span>Your document content is processed on your device</span>
          </div>
          <div>
            <strong>One workspace</strong>
            <span>Scan, manage, edit, sign, export, and create QR codes</span>
          </div>
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
          <div className={styles.screenGrid}>
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
              storage unless you choose to share or export them. Advertising, diagnostics, and
              Google Play services are described separately in the privacy policy.
            </p>
          </div>
          <div className={styles.privacyLinks}>
            <a href={`${APP_PATH}privacy/`}>Read the privacy policy</a>
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
          <p className={styles.kicker}>Launch preparation underway</p>
          <h2>Cam PDF Scan Signer QR Gen</h2>
          <p>
            The Android release is being prepared for Google Play. Product and privacy information
            on this page will stay available as the official app reference.
          </p>
          <a href="mailto:contact@djai.academy?subject=Cam%20PDF%20app">contact@djai.academy</a>
        </section>
      </main>
      <SiteFooter locale="en" />
    </>
  );
}

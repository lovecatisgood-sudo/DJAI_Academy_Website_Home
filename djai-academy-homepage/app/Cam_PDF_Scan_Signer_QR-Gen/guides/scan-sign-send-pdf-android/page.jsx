import Image from "next/image";
import Link from "next/link";
import CamPdfGuideArticle, {
  APP_PATH,
  GUIDES_PATH
} from "../CamPdfGuideArticle";
import { guideArticlePaths, workflowGuideHeaderHrefs, workflowGuideLanguageHrefs } from "../guideRoutes";
import styles from "../remove-camscanner-watermark-free/page.module.css";

const ARTICLE_PATH = guideArticlePaths.scanSign;

export const metadata = {
  title: "How to Scan, Sign, and Send a PDF on Android | Cam PDF",
  description:
    "Learn how to scan or import a PDF, add a signature, review the pages, export a clean file, and send it from your Android phone with Cam PDF.",
  alternates: { canonical: ARTICLE_PATH, languages: workflowGuideLanguageHrefs.scanSign },
  openGraph: {
    title: "How to Scan, Sign, and Send a PDF on Android",
    description:
      "A practical mobile workflow for turning a paper form or PDF into a checked, signed file ready to share.",
    url: ARTICLE_PATH,
    siteName: "DJAI Academy",
    images: [{
      url: "/apps/cam-pdf/guides/scan-sign-send-hero.png",
      width: 1672,
      height: 941,
      alt: "A phone scanning a form, adding a signature, and sending a PDF"
    }],
    type: "article",
    publishedTime: "2026-09-09",
    modifiedTime: "2026-09-09",
    authors: ["DJAI Academy"]
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Scan, Sign, and Send a PDF on Android",
    description: "Scan a form, add your signature, check the export, and send the PDF.",
    images: ["/apps/cam-pdf/guides/scan-sign-send-hero.png"]
  }
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: metadata.title,
      description: metadata.description,
      image: "https://www.djai.academy/apps/cam-pdf/guides/scan-sign-send-hero.png",
      datePublished: "2026-09-09",
      dateModified: "2026-09-09",
      articleSection: "Cam PDF Guides",
      isAccessibleForFree: true,
      author: { "@type": "Organization", name: "DJAI Academy", url: "https://www.djai.academy/" },
      publisher: {
        "@type": "Organization",
        name: "DJAI Academy",
        url: "https://www.djai.academy/",
        logo: { "@type": "ImageObject", url: "https://www.djai.academy/djai-logo-small.webp" }
      },
      mainEntityOfPage: `https://www.djai.academy${ARTICLE_PATH}`
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "DJAI Academy", item: "https://www.djai.academy/" },
        { "@type": "ListItem", position: 2, name: "Cam PDF", item: `https://www.djai.academy${APP_PATH}` },
        { "@type": "ListItem", position: 3, name: "Guides", item: `https://www.djai.academy${GUIDES_PATH}` },
        { "@type": "ListItem", position: 4, name: "Scan, sign, and send a PDF", item: `https://www.djai.academy${ARTICLE_PATH}` }
      ]
    }
  ]
};

export default function ScanSignSendGuidePage() {
  return (
    <CamPdfGuideArticle
      articlePath={ARTICLE_PATH}
      title="How to Scan, Sign, and Send a PDF on Android"
      eyebrow="Cam PDF guide · Scan, sign, and send"
      dek="When a form arrives on your phone, the useful finish line is not just a scan. It is a checked PDF with the signature in the right place, ready to share without a printer round trip."
      publishedDate="September 9, 2026"
      readTime={8}
      heroImage="/apps/cam-pdf/guides/scan-sign-send-hero.png"
      heroAlt="A phone scanning a form, adding a signature, and sending a finished PDF"
      heroCaption="Scan the page, place the signature, inspect the export, and choose where the file goes."
      toc={[
        { id: "short-answer", label: "The short answer" },
        { id: "capture", label: "Capture or import" },
        { id: "sign", label: "Place the signature" },
        { id: "review", label: "Review the export" },
        { id: "send", label: "Send the PDF" },
        { id: "questions", label: "Questions" }
      ]}
      ctaTitle="Finish the document without changing apps"
      ctaText="Cam PDF combines scanning, page editing, signatures, PDF export, compression, and sharing in one mobile workspace. Use the workflow below for a normal handwritten signature annotation, then verify the recipient’s requirements before sending."
      ctaImage="/apps/cam-pdf/export.png"
      ctaImageAlt="Cam PDF export screen with file name, PDF format, and quality controls"
      languageHrefs={workflowGuideHeaderHrefs.scanSign}
      structuredData={structuredData}
      relatedLinks={[
        { href: guideArticlePaths.multiPage, label: "Scan multiple pages into one PDF" },
        { href: guideArticlePaths.pdfQr, label: "Share a PDF with a QR code" },
        { href: guideArticlePaths.watermark, label: "Handle a scanner watermark safely" }
      ]}
    >
      <section className={styles.answerBox} id="short-answer">
        <p className={styles.eyebrow}>The short answer</p>
        <h2>Capture or import the document, sign it, then inspect the exported PDF.</h2>
        <ol>
          <li>Scan the paper or import the PDF into Cam PDF.</li>
          <li>Correct the page edges and add any needed text or date.</li>
          <li>Draw or select your signature and place it on the intended line.</li>
          <li>Export a PDF, open the finished file, and share only after the review passes.</li>
        </ol>
        <p>
          This workflow describes an in-app signature annotation. It is not a promise that every
          recipient, government office, or contract accepts it as a certificate-based electronic
          signature.
        </p>
      </section>

      <section id="capture">
        <p className={styles.sectionNumber}>01</p>
        <h2>Capture the paper or import the PDF</h2>
        <p>
          If you have paper, start with a clean camera capture. Keep the phone parallel to the form,
          include all corners, and use even lighting. If the form already arrived as a PDF, import
          it instead of taking a screenshot; that preserves the document&apos;s original page size and
          text quality.
        </p>
        <div className={styles.steps}>
          <div>
            <span>1 · Capture</span>
            <h3>Keep the page flat</h3>
            <p>Remove shadows and wait for the document edges to settle before taking the picture.</p>
          </div>
          <div>
            <span>2 · Correct</span>
            <h3>Review the crop</h3>
            <p>Make sure the signature line, dates, and small labels are still inside the page.</p>
          </div>
          <div>
            <span>3 · Organize</span>
            <h3>Name the document</h3>
            <p>Use a filename that tells you what the form is before it leaves the app.</p>
          </div>
        </div>
        <figure className={styles.bodyFigure}>
          <Image
            src="/apps/cam-pdf/editor.png"
            alt="Cam PDF document editor with page correction controls"
            width={390}
            height={844}
          />
          <figcaption>Fix the page boundary before you add a signature.</figcaption>
        </figure>
      </section>

      <section id="sign">
        <p className={styles.sectionNumber}>02</p>
        <h2>Place the signature where the recipient expects it</h2>
        <p>
          Open the signing controls, draw a signature, and place it on the correct line. Resize it
          only as much as needed. A signature that covers a printed name, date, checkbox, or witness
          field can make an otherwise complete form difficult to process.
        </p>
        <ol>
          <li>Zoom in until the signature field is easy to place accurately.</li>
          <li>Add the signature and move it without covering nearby instructions.</li>
          <li>Add a date or text only where the form asks for it.</li>
          <li>Review every page, not just the page where you signed.</li>
        </ol>
        <p className={styles.methodNote}>
          If the recipient requires a verified certificate, audit trail, witness flow, or identity
          check, use the signing service they specify. Cam PDF is a practical mobile PDF workflow,
          not a replacement for those requirements.
        </p>
      </section>

      <section id="review">
        <p className={styles.sectionNumber}>03</p>
        <h2>Review the exported file before you send it</h2>
        <p>
          The editor preview and the exported PDF are two different checkpoints. Save the file, open
          it in a PDF viewer, and confirm that the signature, page order, text, and orientation all
          survived the export.
        </p>
        <div className={styles.optionGrid}>
          <article>
            <span className={styles.optionLabel}>Content</span>
            <h3>Check every page</h3>
            <p>Make sure no page disappeared and no crop removed a field or attachment.</p>
          </article>
          <article>
            <span className={styles.optionLabel}>Signature</span>
            <h3>Confirm position and scale</h3>
            <p>Look for overlap with the printed name, date, seal, or instructions.</p>
          </article>
          <article>
            <span className={styles.optionLabel}>Output</span>
            <h3>Open the actual PDF</h3>
            <p>Do not trust a download until the file opens and looks correct outside the editor.</p>
          </article>
        </div>
      </section>

      <section id="send">
        <p className={styles.sectionNumber}>04</p>
        <h2>Send the PDF with the right privacy and size choices</h2>
        <p>
          Choose a useful filename and export quality. If an email or upload form has a size limit,
          compress the finished PDF and inspect it again. Then use the share action to send it through
          the channel the recipient requested.
        </p>
        <p>
          Do not upload a private identity, financial, medical, school, or signed document to an
          unrelated online editor just to add a signature. The safest workflow is the one that gives
          you a clear view of where the file goes and leaves the final share decision with you.
        </p>
        <p>
          Need to sign a stack of pages? First follow the <Link href={guideArticlePaths.multiPage}>multi-page PDF workflow</Link>. Need to share the finished document by scan? Use the <Link href={guideArticlePaths.pdfQr}>PDF QR-code guide</Link> and check the link permissions before printing it.
        </p>
      </section>

      <section id="questions">
        <p className={styles.sectionNumber}>05</p>
        <h2>Questions about signing PDFs on Android</h2>
        <div className={styles.faqList}>
          <details>
            <summary>Can I sign a PDF without printing it first?</summary>
            <p>For ordinary signature annotations, yes: import or scan the document, add the signature in the app, export the PDF, and review it before sharing.</p>
          </details>
          <details>
            <summary>Is a drawn signature the same as a certificate-based e-signature?</summary>
            <p>No. A drawn signature is an annotation. A certificate, identity check, audit trail, or formal signing workflow may be required for a particular recipient or agreement.</p>
          </details>
          <details>
            <summary>How do I send a signed PDF that is too large?</summary>
            <p>Export the file, use a PDF compressor, then open the compressed copy and confirm that the signature and small text remain readable.</p>
          </details>
        </div>
      </section>
    </CamPdfGuideArticle>
  );
}

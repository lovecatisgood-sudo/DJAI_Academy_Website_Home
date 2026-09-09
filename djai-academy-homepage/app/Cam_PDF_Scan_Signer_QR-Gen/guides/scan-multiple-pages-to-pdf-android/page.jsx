import Image from "next/image";
import Link from "next/link";
import CamPdfGuideArticle, {
  APP_PATH,
  GUIDES_PATH,
  SourceLink
} from "../CamPdfGuideArticle";
import { guideArticlePaths, workflowGuideHeaderHrefs, workflowGuideLanguageHrefs } from "../guideRoutes";
import styles from "../remove-camscanner-watermark-free/page.module.css";

const ARTICLE_PATH = guideArticlePaths.multiPage;
const PUBLISHED_DATE = "September 9, 2026";

export const metadata = {
  title: "How to Scan Multiple Pages into One PDF on Android | Cam PDF",
  description:
    "Learn how to scan multiple pages into one PDF on Android, correct page order, check crops, compress the file, and share it with Cam PDF.",
  alternates: { canonical: ARTICLE_PATH, languages: workflowGuideLanguageHrefs.multiPage },
  openGraph: {
    title: "How to Scan Multiple Pages into One PDF on Android",
    description:
      "A practical Android workflow for capturing a stack of pages, checking the result, and exporting one readable PDF.",
    url: ARTICLE_PATH,
    siteName: "DJAI Academy",
    images: [{
      url: "/apps/cam-pdf/guides/multi-page-scan-hero.png",
      width: 1672,
      height: 941,
      alt: "A phone capturing several pages and producing one PDF"
    }],
    type: "article",
    publishedTime: "2026-09-09",
    modifiedTime: "2026-09-09",
    authors: ["DJAI Academy"]
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Scan Multiple Pages into One PDF on Android",
    description: "Capture, reorder, check, and export a multi-page PDF from your phone.",
    images: ["/apps/cam-pdf/guides/multi-page-scan-hero.png"]
  }
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: metadata.title,
      description: metadata.description,
      image: `https://www.djai.academy/apps/cam-pdf/guides/multi-page-scan-hero.png`,
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
        { "@type": "ListItem", position: 4, name: "Scan multiple pages into one PDF", item: `https://www.djai.academy${ARTICLE_PATH}` }
      ]
    }
  ]
};

export default function ScanMultiplePagesGuidePage() {
  return (
    <CamPdfGuideArticle
      articlePath={ARTICLE_PATH}
      title="How to Scan Multiple Pages into One PDF on Android"
      eyebrow="Cam PDF guide · Multi-page scanning"
      dek="A stack of pages should become one file, not a folder full of page-one, page-two, and page-three exports. This workflow helps you capture the whole document, catch mistakes, and send a readable PDF."
      publishedDate={PUBLISHED_DATE}
      readTime={8}
      heroImage="/apps/cam-pdf/guides/multi-page-scan-hero.png"
      heroAlt="A smartphone capturing several paper pages and producing one clean PDF"
      heroCaption="Treat the stack as one capture session, then inspect the file before you share it."
      toc={[
        { id: "short-answer", label: "The short answer" },
        { id: "prepare", label: "Prepare the pages" },
        { id: "capture", label: "Capture the stack" },
        { id: "check", label: "Check the PDF" },
        { id: "export", label: "Export and share" },
        { id: "questions", label: "Questions" }
      ]}
      ctaTitle="Keep the whole document in one place"
      ctaText="Cam PDF is built for the handoff between camera capture, page correction, PDF export, and sharing. Open the product page first if you want to confirm the current access model, then install from Google Play."
      ctaImage="/apps/cam-pdf/export.png"
      ctaImageAlt="Cam PDF export screen with PDF format and quality controls"
      languageHrefs={workflowGuideHeaderHrefs.multiPage}
      structuredData={structuredData}
      relatedLinks={[
        { href: guideArticlePaths.pdfQr, label: "Share a PDF with a QR code" },
        { href: guideArticlePaths.scanSign, label: "Scan, sign, and send a PDF" },
        { href: guideArticlePaths.watermark, label: "Handle a scanner watermark safely" }
      ]}
    >
      <section className={styles.answerBox} id="short-answer">
        <p className={styles.eyebrow}>The short answer</p>
        <h2>Start one scan, keep adding pages, and save once.</h2>
        <ol>
          <li>Open Cam PDF and choose the document scan flow.</li>
          <li>Capture the first page, then use the add-page action for every following sheet.</li>
          <li>Review thumbnails, page order, corners, and readability before exporting.</li>
          <li>Save as one PDF, then compress or share the finished file if its size is a problem.</li>
        </ol>
        <p>
          The important detail is the save point. Do not export each page separately unless that is
          genuinely what the recipient needs.
        </p>
      </section>

      <section id="prepare">
        <p className={styles.sectionNumber}>01</p>
        <h2>Prepare the stack before you open the camera</h2>
        <p>
          Put the pages in order, remove clips and folded corners, and choose a surface that gives
          the camera a clear contrast around each sheet. Even light matters more than a dramatic
          filter: a shadow across a signature or small number is difficult to fix later.
        </p>
        <div className={styles.steps}>
          <div>
            <span>1 · Order</span>
            <h3>Number the pile mentally</h3>
            <p>Keep the first page visible and place the next sheets within easy reach.</p>
          </div>
          <div>
            <span>2 · Light</span>
            <h3>Remove hard shadows</h3>
            <p>Turn the page or move the light before relying on automatic enhancement.</p>
          </div>
          <div>
            <span>3 · Frame</span>
            <h3>Leave all corners visible</h3>
            <p>Edge correction can only work with enough margin around the page.</p>
          </div>
        </div>
        <figure className={styles.bodyFigure}>
          <Image
            src="/apps/cam-pdf/editor.png"
            alt="Cam PDF edge correction screen for checking page boundaries"
            width={390}
            height={844}
          />
          <figcaption>Check the crop rather than accepting the first automatic boundary.</figcaption>
        </figure>
      </section>

      <section id="capture">
        <p className={styles.sectionNumber}>02</p>
        <h2>Capture every page in the same document</h2>
        <p>
          After the first capture, keep the document open and add the next page instead of starting
          a new file. Pause briefly between pages so the camera can focus. If a page is skewed or
          blurry, retake it while the rest of the stack is still beside you.
        </p>
        <ol>
          <li>Align the phone parallel to the page and wait for the edge outline to settle.</li>
          <li>Capture the page, then check its thumbnail before moving the paper.</li>
          <li>Tap the add-page control and repeat until the last sheet is captured.</li>
          <li>Use the page editor to rotate, crop, or remove a duplicate before export.</li>
        </ol>
        <p>
          Cam PDF supports multi-page capture and page organization, but the quality of the source
          still determines whether the final file is useful. A PDF can be technically complete and
          still fail because one page is unreadable.
        </p>
      </section>

      <section id="check">
        <p className={styles.sectionNumber}>03</p>
        <h2>Check page order and legibility before saving</h2>
        <p>
          Thumbnail review is not busywork. It is where you catch a missing page, a reversed page,
          a finger over a corner, or a crop that cut off a date. Zoom into the smallest text and any
          area where a signature, seal, or account number matters.
        </p>
        <div className={styles.optionGrid}>
          <article>
            <span className={styles.optionLabel}>Order</span>
            <h3>Read the first line of each page</h3>
            <p>Use headings, dates, or page numbers to confirm that the sequence makes sense.</p>
          </article>
          <article>
            <span className={styles.optionLabel}>Edges</span>
            <h3>Inspect the four corners</h3>
            <p>Make sure borders, stamps, and handwritten notes have not been trimmed away.</p>
          </article>
          <article>
            <span className={styles.optionLabel}>Text</span>
            <h3>Zoom into the smallest detail</h3>
            <p>A readable phone preview is not enough if the exported page becomes soft.</p>
          </article>
        </div>
      </section>

      <section id="export">
        <p className={styles.sectionNumber}>04</p>
        <h2>Export one PDF, then solve the file-size problem</h2>
        <p>
          Give the file a useful name before you export it. Choose the page size and quality that fit
          the job, then open the finished PDF outside the editor and inspect it once more. If an
          upload form rejects the file, use the site&apos;s <Link href="/tools/PDFTools/compress-pdf/en/">PDF compressor</Link> rather than
          repeatedly lowering scan quality at capture time.
        </p>
        <p>
          If your source pages already have a third-party watermark, keep the original and read the
          <Link href={guideArticlePaths.watermark}> safe watermark guide</Link> before editing an official or sensitive document.
          A clean export is not worth changing the meaning of a record.
        </p>
        <p className={styles.methodNote}>
          Cam PDF&apos;s current product page describes multi-page scanning, page correction, named PDF
          exports, compression, and sharing. Usage conditions still apply, so do not promise an
          unlimited export workflow to a reader.
        </p>
      </section>

      <section id="questions">
        <p className={styles.sectionNumber}>05</p>
        <h2>Questions people ask after the first scan</h2>
        <div className={styles.faqList}>
          <details>
            <summary>Can I scan multiple pages into one PDF without a physical scanner?</summary>
            <p>Yes. A phone camera and a document-scanning app can capture each sheet, keep the pages together, and export one PDF.</p>
          </details>
          <details>
            <summary>Why is one page missing from my multi-page PDF?</summary>
            <p>Usually the page was never added to the capture session, was removed during review, or was saved as a separate file. Check the thumbnail count before exporting.</p>
          </details>
          <details>
            <summary>Should I scan the pages again if the PDF is too large?</summary>
            <p>Not immediately. Try a PDF compressor first, then recheck that small text and signatures are still readable.</p>
          </details>
        </div>
        <p className={styles.sourceNote}>
          Need a different next step? <SourceLink href="https://www.djai.academy/Cam_PDF_Scan_Signer_QR-Gen/">See the complete Cam PDF workflow</SourceLink> before choosing another app.
        </p>
      </section>
    </CamPdfGuideArticle>
  );
}

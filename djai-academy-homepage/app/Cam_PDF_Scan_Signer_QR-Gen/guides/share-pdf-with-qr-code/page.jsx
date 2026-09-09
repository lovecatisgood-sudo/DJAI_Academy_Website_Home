import Image from "next/image";
import Link from "next/link";
import CamPdfGuideArticle, {
  APP_PATH,
  GUIDES_PATH,
  SourceLink
} from "../CamPdfGuideArticle";
import { guideArticlePaths, workflowGuideHeaderHrefs, workflowGuideLanguageHrefs } from "../guideRoutes";
import styles from "../remove-camscanner-watermark-free/page.module.css";

const ARTICLE_PATH = guideArticlePaths.pdfQr;

export const metadata = {
  title: "How to Share a PDF with a QR Code from Your Phone | Cam PDF",
  description:
    "Learn how to create a QR code for a PDF from your phone: host the document at a stable link, generate a website QR code, and test it before sharing.",
  alternates: { canonical: ARTICLE_PATH, languages: workflowGuideLanguageHrefs.pdfQr },
  openGraph: {
    title: "How to Share a PDF with a QR Code from Your Phone",
    description:
      "A clear, privacy-aware workflow for turning a PDF link into a QR code with Cam PDF QR Studio.",
    url: ARTICLE_PATH,
    siteName: "DJAI Academy",
    images: [{
      url: "/apps/cam-pdf/guides/pdf-qr-code-hero.png",
      width: 1672,
      height: 941,
      alt: "A PDF link flowing into a QR code that opens on another phone"
    }],
    type: "article",
    publishedTime: "2026-09-09",
    modifiedTime: "2026-09-09",
    authors: ["DJAI Academy"]
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Share a PDF with a QR Code from Your Phone",
    description: "Create, test, and share a QR code that opens your PDF.",
    images: ["/apps/cam-pdf/guides/pdf-qr-code-hero.png"]
  }
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: metadata.title,
      description: metadata.description,
      image: "https://www.djai.academy/apps/cam-pdf/guides/pdf-qr-code-hero.png",
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
        { "@type": "ListItem", position: 4, name: "Share a PDF with a QR code", item: `https://www.djai.academy${ARTICLE_PATH}` }
      ]
    }
  ]
};

export default function SharePdfWithQrCodeGuidePage() {
  return (
    <CamPdfGuideArticle
      articlePath={ARTICLE_PATH}
      title="How to Share a PDF with a QR Code from Your Phone"
      eyebrow="Cam PDF guide · PDF sharing with QR codes"
      dek="A QR code does not need to contain the whole document. It can point to a stable PDF link, so someone can scan a printed card, menu, handout, or poster and open the document on their phone."
      publishedDate="September 9, 2026"
      readTime={7}
      heroImage="/apps/cam-pdf/guides/pdf-qr-code-hero.png"
      heroAlt="A PDF link flowing into a QR code that opens on a second phone"
      heroCaption="The code points to the document link; the PDF remains wherever you choose to host it."
      toc={[
        { id: "short-answer", label: "The short answer" },
        { id: "make-link", label: "Make a safe PDF link" },
        { id: "generate", label: "Generate the QR code" },
        { id: "test", label: "Test before printing" },
        { id: "limits", label: "Know the limits" },
        { id: "questions", label: "Questions" }
      ]}
      ctaTitle="Create the code from the phone you already use"
      ctaText="Cam PDF QR Studio can create and save a website QR code after you copy your PDF’s link. That keeps the workflow in one mobile app without pretending that the QR code itself stores the entire file."
      ctaImage="/apps/cam-pdf/qr.png"
      ctaImageAlt="Cam PDF QR Studio screen for creating a website QR code"
      languageHrefs={workflowGuideHeaderHrefs.pdfQr}
      structuredData={structuredData}
      relatedLinks={[
        { href: guideArticlePaths.multiPage, label: "Scan multiple pages into one PDF" },
        { href: guideArticlePaths.scanSign, label: "Scan, sign, and send a PDF" },
        { href: guideArticlePaths.watermark, label: "Handle a scanner watermark safely" }
      ]}
    >
      <section className={styles.answerBox} id="short-answer">
        <p className={styles.eyebrow}>The short answer</p>
        <h2>Put the PDF at a link, then turn that link into a QR code.</h2>
        <ol>
          <li>Upload or publish the PDF wherever your intended readers can open it.</li>
          <li>Copy the complete link and check its sharing permission in a private browser window.</li>
          <li>Open Cam PDF QR Studio, choose a website QR code, and paste the link.</li>
          <li>Save the QR image, scan it from another phone, and only then print or distribute it.</li>
        </ol>
        <p>
          This distinction prevents a common mistake: a QR code points to a document location; it
          does not magically host a large PDF inside the black-and-white pattern.
        </p>
      </section>

      <section id="make-link">
        <p className={styles.sectionNumber}>01</p>
        <h2>Make a PDF link that your reader can actually open</h2>
        <p>
          Choose the storage location before you design the QR code. A public menu or brochure can
          use a public URL. A private contract, identity document, or school record should not be
          placed behind a QR code that anyone can scan unless the access controls are intentional.
        </p>
        <div className={styles.optionGrid}>
          <article>
            <span className={styles.optionLabel}>Public handout</span>
            <h3>Use a stable public URL</h3>
            <p>Good for menus, event programs, product instructions, and documents meant to be shared.</p>
          </article>
          <article>
            <span className={styles.optionLabel}>Controlled access</span>
            <h3>Check the permission model</h3>
            <p>A QR image can be copied, so do not mistake an obscure link for document security.</p>
          </article>
          <article>
            <span className={styles.optionLabel}>Long-term use</span>
            <h3>Keep the destination steady</h3>
            <p>If the link changes, a static QR image will need to be generated again.</p>
          </article>
        </div>
        <p className={styles.sourceNote}>
          The same principle appears in <SourceLink href="https://www.adobe.com/uk/acrobat/resources/pdf-to-qr-code.html">Adobe&apos;s PDF-to-QR explanation</SourceLink>: the code is a convenient way to share a document link, not a replacement for hosting the document.
        </p>
      </section>

      <section id="generate">
        <p className={styles.sectionNumber}>02</p>
        <h2>Generate the website QR code in Cam PDF</h2>
        <p>
          Cam PDF&apos;s QR Studio supports website links along with text, Wi-Fi, contact, and email
          payloads. For a PDF workflow, choose the website option because the destination is the
          link you just checked.
        </p>
        <ol>
          <li>Open Cam PDF and enter QR Studio.</li>
          <li>Select the website or URL type.</li>
          <li>Paste the full PDF link, including its secure <code>https://</code> address where available.</li>
          <li>Review the preview and save the generated QR image.</li>
        </ol>
        <figure className={styles.bodyFigure}>
          <Image
            src="/apps/cam-pdf/qr.png"
            alt="Cam PDF QR Studio screen with a QR code preview"
            width={390}
            height={844}
          />
          <figcaption>Use the website payload for a PDF that is already available at a link.</figcaption>
        </figure>
      </section>

      <section id="test">
        <p className={styles.sectionNumber}>03</p>
        <h2>Test the code before you put it on a poster</h2>
        <p>
          A QR code can look perfect on your screen and still fail when printed too small, placed on
          a busy background, or scanned from a distance. Test the exact final image and the exact
          destination, not just a preview inside the generator.
        </p>
        <div className={styles.steps}>
          <div>
            <span>1 · Scan</span>
            <h3>Use a second phone</h3>
            <p>Scan the saved image from the device that will receive the PDF.</p>
          </div>
          <div>
            <span>2 · Read</span>
            <h3>Open the document</h3>
            <p>Confirm that the PDF loads without an unexpected sign-in or permission screen.</p>
          </div>
          <div>
            <span>3 · Print</span>
            <h3>Test the final size</h3>
            <p>Try the printed version before making a large batch of copies.</p>
          </div>
        </div>
      </section>

      <section id="limits">
        <p className={styles.sectionNumber}>04</p>
        <h2>Know what Cam PDF does—and what it does not do</h2>
        <p>
          Cam PDF creates the QR image on the phone. It does not host the PDF or promise that a
          destination link will remain public forever. You choose where the file lives, who can open
          it, and how long that link should remain available.
        </p>
        <p>
          For a document you revise often, keep the destination under your control and update the
          file at the same URL when that is safe and supported. If you change the URL itself, create
          and test a new QR image before replacing printed material.
        </p>
        <p>
          If you need to make the PDF first, start with the <Link href={guideArticlePaths.multiPage}>multi-page scanning guide</Link>. If the document needs a signature before it is shared, continue with <Link href={guideArticlePaths.scanSign}>the scan, sign, and send workflow</Link>.
        </p>
      </section>

      <section id="questions">
        <p className={styles.sectionNumber}>05</p>
        <h2>Questions about PDF QR codes</h2>
        <div className={styles.faqList}>
          <details>
            <summary>Can a QR code contain the entire PDF?</summary>
            <p>For normal document sharing, treat the QR code as a link to the PDF. The file remains hosted at the destination and opens when the reader scans the code.</p>
          </details>
          <details>
            <summary>Can I use a QR code for a private PDF?</summary>
            <p>You can, but a printed code can be photographed and shared. Use a destination with the access controls your document requires and test the exact reader experience.</p>
          </details>
          <details>
            <summary>What if my PDF link changes later?</summary>
            <p>A static QR image still points to the old URL. Update the file at the original link when possible, or generate and distribute a new QR image.</p>
          </details>
        </div>
      </section>
    </CamPdfGuideArticle>
  );
}

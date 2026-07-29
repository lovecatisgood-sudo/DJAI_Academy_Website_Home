import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";
import styles from "./page.module.css";

const APP_PATH = "/Cam_PDF_Scan_Signer_QR-Gen/";

export const metadata = {
  title: "Privacy Policy | Cam PDF Scan Signer QR Gen",
  description: "Privacy policy for the Cam PDF Scan Signer QR Gen Android application by DJAI.",
  alternates: { canonical: `${APP_PATH}privacy/` },
  robots: { index: true, follow: true }
};

export default function CamPdfPrivacyPage() {
  return (
    <>
      <SiteHeader locale="en" currentRoute="home" languageHref={`${APP_PATH}privacy/`} />
      <main className={styles.page}>
        <header className={styles.hero}>
          <p>Cam PDF Scan Signer QR Gen</p>
          <h1>Privacy Policy</h1>
          <span>Effective July 29, 2026</span>
        </header>

        <article className={styles.content}>
          <p className={styles.lead}>
            DJAI Academy (&quot;DJAI&quot;, &quot;we&quot;, &quot;us&quot;) provides Cam PDF Scan Signer QR Gen. This policy
            explains how the Android app handles information when you scan, import, edit, sign,
            organize, export, or share documents and QR codes.
          </p>

          <section>
            <h2>Document content</h2>
            <p>
              Scanned pages, imported files, document text, signatures, annotations, generated QR
              content, and exported files are processed in app-owned storage on your device. DJAI
              does not operate an account or document-upload service for this app. Content leaves
              the app only when you choose an Android sharing, printing, saving, or export action.
            </p>
          </section>

          <section>
            <h2>Permissions</h2>
            <p>
              The app requests camera access for scanning. It may request access to photos, media,
              or files when you choose to import or save content. Optional biometric authentication
              uses Android system services; the app receives only whether authentication succeeded.
              Permissions can be changed in Android Settings.
            </p>
          </section>

          <section>
            <h2>Advertising and consent</h2>
            <p>
              The free app may use Google Mobile Ads and Google&apos;s User Messaging Platform.
              Depending on your region and consent choices, Google and its advertising partners may
              process device identifiers, IP address, approximate location derived from IP, ad
              interactions, and diagnostics to provide, measure, secure, or personalize ads. You can
              review available privacy choices from the app settings.
            </p>
            <p>
              Learn more in Google&apos;s policies at{
              " "
              }
              <a href="https://policies.google.com/privacy">policies.google.com/privacy</a>.
            </p>
          </section>

          <section>
            <h2>Purchases</h2>
            <p>
              An optional one-time purchase can remove advertising. Google Play processes payment
              information and purchase history. The app receives purchase status and stores the
              resulting entitlement locally so it can remove ads and restore the purchase.
            </p>
          </section>

          <section>
            <h2>Diagnostics</h2>
            <p>
              The app may use Sentry to receive technical error and stability information. This may
              include app version, device and operating-system details, timestamps, stack traces,
              and technical context surrounding a failure. DJAI does not intentionally send scanned
              document pixels, document text, signatures, or QR payloads as diagnostic content.
            </p>
            <p>
              Sentry&apos;s privacy information is available at{
              " "
              }
              <a href="https://sentry.io/privacy/">sentry.io/privacy</a>.
            </p>
          </section>

          <section>
            <h2>Storage and deletion</h2>
            <p>
              Documents and app settings remain on your device until you delete them, clear the
              app&apos;s storage, or uninstall the app. Temporary render and export files may be
              removed through the storage controls or by Android. Information processed by Google,
              Sentry, or another service is retained under that provider&apos;s policies.
            </p>
          </section>

          <section>
            <h2>Security</h2>
            <p>
              The app uses Android application storage and offers privacy-screen and app-lock
              controls. No method of electronic storage is completely secure, so keep your device
              protected and review files before sharing them with another application or person.
            </p>
          </section>

          <section>
            <h2>Children</h2>
            <p>
              The app is a general document utility and is not directed to children under 13. We do
              not knowingly provide a document account service that collects children&apos;s personal
              information.
            </p>
          </section>

          <section>
            <h2>Changes to this policy</h2>
            <p>
              We may update this policy as the app, service providers, or legal requirements change.
              The effective date at the top of this page identifies the current version.
            </p>
          </section>

          <section>
            <h2>Contact</h2>
            <p>
              Questions about this policy can be sent to{
              " "
              }
              <a href="mailto:contact@djai.academy">contact@djai.academy</a>.
            </p>
          </section>

          <nav className={styles.links} aria-label="Related app links">
            <a href={APP_PATH}>Return to the app page</a>
            <a href="/app-ads.txt">View app-ads.txt</a>
          </nav>
        </article>
      </main>
      <SiteFooter locale="en" />
    </>
  );
}

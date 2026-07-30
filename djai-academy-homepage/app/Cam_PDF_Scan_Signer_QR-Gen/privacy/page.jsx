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
          <span>Effective July 30, 2026</span>
        </header>

        <article className={styles.content}>
          <p className={styles.lead}>
            DJAI Academy (&quot;DJAI&quot;, &quot;we&quot;, &quot;us&quot;) provides Cam PDF Scan Signer QR Gen. This
            policy explains what the Android app processes, why it is processed, and the choices
            available to you. Document content remains separate from the online account service.
          </p>

          <section>
            <h2>Documents stay local</h2>
            <p>
              Scanned pages, imported files, document text, signatures, annotations, QR payloads,
              video, audio, and generated files are processed in app-owned storage on your device.
              They are not uploaded to DJAI, Firebase, Google Analytics, or AdMob. Content leaves
              the app only when you choose an Android sharing, printing, saving, or export action.
            </p>
          </section>

          <section>
            <h2>Account information</h2>
            <p>
              Firebase Authentication processes your user ID, sign-in provider, email address,
              email-verification status, and basic Google profile information when you choose
              Google Sign-In. We store your display name, consent versions and timestamps,
              marketing choices, weekly-use balance, quest progress, and account creation/update
              times in Cloud Firestore. This information provides account recovery, cross-device
              usage synchronization, fraud prevention, and account controls.
            </p>
          </section>

          <section>
            <h2>Preference survey</h2>
            <p>
              The optional reward survey stores broad age bracket, optional gender, country,
              profession category, primary app use, personal/work/education context, discovery
              source, whether you drive, and an optional favourite vehicle category. We do not ask
              for an exact birth date, income, marital status, children, or the vehicle you own.
              Survey answers remain in Firestore and are not sent to AdMob or configured as Firebase
              Analytics user properties.
            </p>
          </section>

          <section>
            <h2>Analytics and diagnostics</h2>
            <p>
              Firebase Analytics may process a pseudonymous user ID, app instance and device
              identifiers, app version, device and operating-system details, broad country derived
              from network information, feature interactions, export completion, quest completion,
              and technical events. We do not request precise location permission for analytics.
              Sentry may receive timestamps, stack traces, app/device details, and scrubbed technical
              context needed to diagnose failures. Filenames and document content are excluded.
            </p>
          </section>

          <section>
            <h2>Advertising and purchases</h2>
            <p>
              Google Mobile Ads and Google&apos;s User Messaging Platform may process advertising IDs,
              IP-derived approximate location, consent choices, ad interactions, and diagnostics to
              provide, measure, secure, or personalize ads where permitted. Reward verification may
              store your pseudonymous user ID, AdMob transaction ID, ad-unit identifier, and reward
              time. Google Play processes purchases and supplies entitlement and purchase-history
              information used to remove ads and restore purchases. Ad privacy choices are available
              in app settings.
            </p>
          </section>

          <section>
            <h2>Email and notifications</h2>
            <p>
              Promotional email and marketing notifications are optional and disabled unless you
              choose them. When notifications are enabled, Firebase Cloud Messaging processes a
              device notification token. You can turn notifications or promotional email off from
              the account screen at any time. Android system settings can also revoke notification
              permission.
            </p>
          </section>

          <section>
            <h2>Permissions</h2>
            <p>
              Camera access is used for document and QR capture. Android system pickers provide
              selected files or photos without broad media-library access. Optional biometric
              authentication is performed by Android; the app receives only the result. Network and
              notification access support accounts, ads, purchases, analytics, and messaging.
            </p>
          </section>

          <section>
            <h2>Legal basis and sharing</h2>
            <p>
              We process essential account and security information to provide the service and meet
              legal obligations. Optional marketing and applicable personalized advertising rely on
              consent, which can be withdrawn. Firebase, Google Play, AdMob, and Sentry act as service
              providers under their terms. We do not sell your document content or survey responses.
              Google&apos;s policy is available at <a href="https://policies.google.com/privacy">policies.google.com/privacy</a>
              {" "}and Sentry&apos;s at <a href="https://sentry.io/privacy/">sentry.io/privacy</a>.
            </p>
          </section>

          <section>
            <h2>Retention and deletion</h2>
            <p>
              Cloud account records remain until you delete your account, subject to limited legal,
              security, backup, and provider retention. Use Account → Delete account in the app or
              follow the <a href={`${APP_PATH}delete-account/`}>web deletion instructions</a>.
              Deletion removes the Firebase account, profile, survey, quota, notification token, and
              recorded reward-verification entries. Files on your device must be removed in the app,
              Android settings, or by uninstalling because DJAI never received them.
            </p>
          </section>

          <section>
            <h2>Security and children</h2>
            <p>
              We use Firebase security rules, authenticated callable services, Play Integrity App
              Check, encrypted transport, Android application storage, and optional app-lock controls.
              No system is completely secure. The service is not directed to children under 13. A
              parent or guardian should contact us if they believe a child supplied personal data.
            </p>
          </section>

          <section>
            <h2>Your choices and contact</h2>
            <p>
              You may access or change profile and marketing preferences in the app and request
              access, correction, objection, withdrawal, or deletion where local law provides those
              rights. Contact <a href="mailto:contact@djai.academy">contact@djai.academy</a>. We may
              update this policy when the product, providers, or legal requirements change; the
              effective date identifies the current version.
            </p>
          </section>

          <nav className={styles.links} aria-label="Related app links">
            <a href={APP_PATH}>Return to the app page</a>
            <a href={`${APP_PATH}terms/`}>Terms of Service</a>
            <a href={`${APP_PATH}delete-account/`}>Delete an account</a>
            <a href="/app-ads.txt">View app-ads.txt</a>
          </nav>
        </article>
      </main>
      <SiteFooter locale="en" />
    </>
  );
}

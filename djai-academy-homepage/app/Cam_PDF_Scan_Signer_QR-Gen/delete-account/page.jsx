import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";
import styles from "../privacy/page.module.css";

const APP_PATH = "/Cam_PDF_Scan_Signer_QR-Gen/";

export const metadata = {
  title: "Delete Account | Cam PDF Scan Signer QR Gen",
  description: "Request deletion of a Cam PDF Scan Signer QR Gen account and associated cloud data.",
  alternates: { canonical: `${APP_PATH}delete-account/` },
  robots: { index: true, follow: true }
};

export default function DeleteCamPdfAccountPage() {
  return <><SiteHeader locale="en" currentRoute="home" languageHref={`${APP_PATH}delete-account/`} /><main className={styles.page}>
    <header className={styles.hero}><p>Cam PDF Scan Signer QR Gen</p><h1>Delete your account</h1><span>Account and cloud-data deletion</span></header>
    <article className={styles.content}>
      <p className={styles.lead}>You can permanently delete your account from inside the Android app. This is the fastest method because it verifies the signed-in account directly.</p>
      <section><h2>Delete inside the app</h2><p>Open Cam PDF Scan Signer QR Gen → Me → Account and consent → Delete account. Review the warning and confirm Delete account. The app signs you out after the request succeeds.</p></section>
      <section><h2>What is deleted</h2><p>Deletion removes the Firebase Authentication account, email and profile record, consent and marketing preferences, preference survey, weekly-use and quest state, notification token, and reward-verification records associated with the user ID.</p></section>
      <section><h2>Files on your device</h2><p>Scans, imports, signatures, QR codes, images, video, audio, and exports are not stored in your DJAI account. Delete them from the app or Android storage, or uninstall the app. Account deletion cannot remove copies you already shared, printed, or saved in another application.</p></section>
      <section><h2>Cannot access the app?</h2><p>Email <a href="mailto:contact@djai.academy?subject=Cam%20PDF%20account%20deletion">contact@djai.academy</a> from the address used for your account with the subject &quot;Cam PDF account deletion&quot;. We may ask you to verify account ownership. Do not send identity documents or document files.</p></section>
      <section><h2>Timing and third parties</h2><p>In-app deletion is processed immediately by our active database service. Limited encrypted backups, security logs, legal records, and data independently controlled by Google Play, AdMob, Firebase Analytics, or Sentry may remain for their documented retention periods. Aggregated analytics that no longer identifies your account may remain.</p></section>
      <nav className={styles.links}><a href={APP_PATH}>App page</a><a href={`${APP_PATH}privacy/`}>Privacy Policy</a><a href={`${APP_PATH}terms/`}>Terms of Service</a></nav>
    </article>
  </main><SiteFooter locale="en" /></>;
}

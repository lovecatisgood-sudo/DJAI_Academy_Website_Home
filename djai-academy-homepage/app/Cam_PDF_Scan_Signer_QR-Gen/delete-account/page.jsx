import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";
import styles from "../privacy/page.module.css";

const APP_PATH = "/Cam_PDF_Scan_Signer_QR-Gen/";

export const metadata = {
  title: "Delete Account | Cam PDF Scanner: Sign & QR",
  description: "Request deletion of a Cam PDF Scanner: Sign & QR account and associated cloud data.",
  alternates: { canonical: `${APP_PATH}delete-account/` },
  robots: { index: true, follow: true }
};

export default function DeleteCamPdfAccountPage() {
  return <><SiteHeader locale="en" currentRoute="camPdf" languageHrefs={{ "zh-CN": `${APP_PATH}zh-cn/delete-account/`, "zh-TW": `${APP_PATH}zh-tw/delete-account/` }} /><main className={styles.page}>
    <header className={styles.hero}><p>Cam PDF Scanner: Sign &amp; QR</p><h1>Delete your account</h1><span>Account and cloud-data deletion</span></header>
    <article className={styles.content}>
      <p className={styles.lead}>You can permanently delete your account from inside the Android or iOS app. This is the fastest method because it verifies the signed-in account directly.</p>
      <section><h2>Delete inside the app</h2><p>Open Cam PDF Scanner: Sign &amp; QR → Me → Account and consent → Delete account. Review the warning and confirm Delete account. Recent sign-in may be required. Apple sign-in accounts may require fresh Apple authentication to revoke authorization. The app signs you out after the request succeeds.</p></section>
      <section><h2>What is deleted</h2><p>Deletion removes the Firebase Authentication account, email and profile record, consent and marketing preferences, preference survey, weekly-use and quest state, notification token, and reward-verification records associated with the user ID.</p></section>
      <section><h2>Files on your device</h2><p>Scans, imports, signatures, QR codes, images, video, audio, and exports are not stored in your DJAI account. Delete them from the app or device storage, or uninstall the app. Account deletion cannot remove copies you already shared, printed, or saved in another application.</p></section>
      <section><h2>Cannot access the app?</h2><p>Email <a href="mailto:contact@djai.academy?subject=Cam%20PDF%20account%20deletion">contact@djai.academy</a> from the address used for your account with the subject &quot;Cam PDF account deletion&quot;. We may ask you to verify account ownership. Do not send passwords, identity documents, or document files.</p></section>
      <section><h2>Timing and third parties</h2><p>A successful deletion removes active account records under our control. Limited deletion safeguards, security and legal records, provider logs, and backups may remain for the purposes described in our Privacy Policy. Expiry and backup cleanup can take additional time. If deletion fails, contact contact@djai.academy so we can investigate and complete a verified request. Deletion does not erase Apple or Google transaction records.</p></section>
      <nav className={styles.links}><a href={APP_PATH}>App page</a><a href={`${APP_PATH}privacy/`}>Privacy Policy</a><a href={`${APP_PATH}terms/`}>Terms of Service</a></nav>
    </article>
  </main><SiteFooter locale="en" /></>;
}

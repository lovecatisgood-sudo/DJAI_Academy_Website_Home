import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";
import styles from "../privacy/page.module.css";

const APP_PATH = "/Cam_PDF_Scan_Signer_QR-Gen/";

export const metadata = {
  title: "Terms of Service | Cam PDF Scan Signer QR Gen",
  description: "Terms governing Cam PDF Scan Signer QR Gen accounts and Android application use.",
  alternates: { canonical: `${APP_PATH}terms/` },
  robots: { index: true, follow: true }
};

export default function CamPdfTermsPage() {
  return <><SiteHeader locale="en" currentRoute="home" languageHref={`${APP_PATH}terms/`} /><main className={styles.page}>
    <header className={styles.hero}><p>Cam PDF Scan Signer QR Gen</p><h1>Terms of Service</h1><span>Effective July 30, 2026</span></header>
    <article className={styles.content}>
      <p className={styles.lead}>These terms govern your use of the Cam PDF Scan Signer QR Gen Android app and its DJAI account services. By creating an account, you agree to these terms and the Privacy Policy.</p>
      <section><h2>Eligibility and accounts</h2><p>You must be at least 13 years old and able to enter a binding agreement, or use the service with permission from a parent or guardian where required. Provide accurate account information, protect your credentials, and notify us of suspected unauthorized access.</p></section>
      <section><h2>Local document responsibility</h2><p>Documents, signatures, QR payloads, images, video, audio, and generated files are stored and processed on your device. You are responsible for backups, reviewing output accuracy, obtaining permission to process content, and deciding where files are shared. The app is not a substitute for legal, medical, financial, archival, or identity-verification advice.</p></section>
      <section><h2>Weekly uses and quests</h2><p>Accounts start with two successful exports per weekly cycle and can unlock up to six through the displayed survey, rewarded-ad, and sharing quests. Cycles reset Saturday at 7:00 AM America/New_York time. A failed or cancelled export is not intended to consume a use. Quest availability, advertising inventory, and promotional limits may change prospectively to protect service quality and prevent abuse.</p></section>
      <section><h2>Advertising and purchases</h2><p>The free service contains advertising, including optional rewarded ads. Rewards are granted only after the SDK reports completion and may be verified by AdMob. Do not automate, manipulate, or fraudulently generate ad or quest activity. Purchases are processed by Google Play under its terms. The app describes the benefit, price, and restoration behavior before purchase.</p></section>
      <section><h2>Acceptable use</h2><p>Do not use the service to violate law or another person&apos;s rights, process content without authority, distribute malware, evade quotas, interfere with security, reverse engineer protected services, impersonate others, or create abusive, deceptive, or unlawful material. We may restrict or terminate accounts involved in abuse.</p></section>
      <section><h2>Intellectual property</h2><p>You retain rights in content you lawfully process. DJAI and its licensors retain rights in the app, branding, interface, software, and services. These terms grant a personal, revocable, non-exclusive, non-transferable licence to use the app as distributed.</p></section>
      <section><h2>Availability and disclaimers</h2><p>The service is provided on an &quot;as available&quot; basis. We work to produce reliable files but do not guarantee uninterrupted service, ad availability, perfect scanning, recognition, conversion, compression, signature placement, or compatibility with every third-party system. Always inspect important output before relying on it.</p></section>
      <section><h2>Liability</h2><p>To the maximum extent permitted by law, DJAI is not liable for indirect, incidental, special, consequential, or lost-profit damages, data loss, missed deadlines, or decisions based on generated output. Rights that cannot legally be excluded remain unaffected.</p></section>
      <section><h2>Termination and changes</h2><p>You may stop using the app and delete your account at any time. We may suspend abusive or unlawful accounts and may update these terms for product, security, legal, or provider changes. Material changes will be presented through appropriate product or website notice.</p></section>
      <section><h2>Contact</h2><p>Questions can be sent to <a href="mailto:contact@djai.academy">contact@djai.academy</a>. Applicable mandatory consumer and privacy rights remain available regardless of these terms.</p></section>
      <nav className={styles.links}><a href={APP_PATH}>App page</a><a href={`${APP_PATH}privacy/`}>Privacy Policy</a><a href={`${APP_PATH}delete-account/`}>Delete an account</a></nav>
    </article>
  </main><SiteFooter locale="en" /></>;
}

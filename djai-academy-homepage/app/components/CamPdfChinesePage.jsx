import Image from "next/image";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";
import { CAM_PDF_PATH } from "../lib/camPdfChineseContent";
import styles from "../Cam_PDF_Scan_Signer_QR-Gen/page.module.css";

export function camPdfMetadata(content) {
  const path = `${CAM_PDF_PATH}${content.segment}/`;
  return {
    title: content.title,
    description: content.description,
    alternates: {
      canonical: path,
      languages: {
        en: CAM_PDF_PATH,
        "zh-CN": `${CAM_PDF_PATH}zh-cn/`,
        "zh-TW": `${CAM_PDF_PATH}zh-tw/`,
        "x-default": CAM_PDF_PATH
      }
    },
    robots: { index: content.indexable, follow: true }
  };
}

export default function CamPdfChinesePage({ content }) {
  const legalRoot = `${CAM_PDF_PATH}${content.segment}/`;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    name: "Cam PDF Scan Signer QR Gen",
    operatingSystem: "Android",
    applicationCategory: "UtilitiesApplication",
    inLanguage: content.locale,
    description: content.description,
    url: `https://www.djai.academy${legalRoot}`,
    installUrl: content.androidUrl,
    featureList: content.features.map(([title]) => title)
  };

  return (
    <>
      <SiteHeader locale={content.locale} currentRoute="home" languageHref={legalRoot} />
      <main className={styles.page}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <section className={styles.hero}>
          <div className={styles.heroScreens}>
            <Image className={styles.heroScreenLeft} src="/apps/cam-pdf/editor.png" alt="Cam PDF 文件邊緣校正畫面" width={390} height={844} priority />
            <Image className={styles.heroScreenMain} src="/apps/cam-pdf/home.png" alt="Cam PDF 文件庫首頁" width={390} height={844} priority />
            <Image className={styles.heroScreenRight} src="/apps/cam-pdf/qr.png" alt="Cam PDF QR Code 工具畫面" width={390} height={844} priority />
          </div>
          <div className={styles.heroShade} />
          <div className={styles.heroInner}>
            <div className={styles.productLockup}>
              <Image src="/apps/cam-pdf/icon.png" alt="Cam PDF App 圖示" width={72} height={72} />
              <span>{content.eyebrow}</span>
            </div>
            <h1 className={styles.heroTitle}>{content.hero}</h1>
            <p className={styles.heroCopy}>{content.intro}</p>
            <div className={styles.heroActions}>
              <a className={styles.releaseButton} href={content.primaryDownload.href}>{content.primaryDownload.label}</a>
              <a className={styles.secondaryButton} href="#features">{content.locale === "zh-CN" ? "查看核心功能" : "查看核心功能"}</a>
            </div>
            <p className={styles.heroPromise}>{content.watermarkMessage}</p>
          </div>
        </section>

        <section className={styles.features} id="features">
          <header className={styles.sectionHeading}>
            <p className={styles.kicker}>{content.locale === "zh-CN" ? "完整文档流程" : "完整文件流程"}</p>
            <h2>{content.locale === "zh-CN" ? "从扫描到交付，不必在多个工具之间来回切换" : "從掃描到交付，不必在多個工具之間來回切換"}</h2>
            <p>{content.watermarkMessage}</p>
          </header>
          <div className={styles.featureGrid}>
            {content.features.map(([title, text], index) => (
              <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{text}</p></article>
            ))}
          </div>
        </section>

        <section className={styles.privacyBand} id="availability">
          <div><p className={styles.kicker}>Android</p><h2>{content.availabilityTitle}</h2><p>{content.availabilityBody}</p></div>
          <div className={styles.privacyLinks}>
            <a href={content.androidUrl}>{content.androidLabel}</a>
            <a href={`${legalRoot}privacy/`}>{content.locale === "zh-CN" ? "隐私政策" : "隱私權政策"}</a>
            <a href={`${legalRoot}terms/`}>{content.locale === "zh-CN" ? "服务条款" : "服務條款"}</a>
            <a href={`${legalRoot}delete-account/`}>{content.locale === "zh-CN" ? "删除账户" : "刪除帳戶"}</a>
          </div>
        </section>

        <section className={styles.details}>
          <div className={styles.detailCopy}><p className={styles.kicker}>Privacy</p><h2>{content.privacyTitle}</h2><p>{content.privacyBody}</p></div>
          <div className={styles.detailCopy}><p className={styles.kicker}>iOS</p><h2>{content.locale === "zh-CN" ? "iPhone 与 iPad 用户，敬请期待" : "iPhone 與 iPad 使用者，敬請期待"}</h2><p>{content.iosMessage}</p></div>
        </section>

        <section className={styles.finalCta}>
          <Image src="/apps/cam-pdf/icon.webp" alt="Cam PDF App 圖示" width={92} height={92} />
          <p className={styles.kicker}>Cam PDF Scan Signer QR Gen</p>
          <h2>{content.availabilityTitle}</h2>
          <p>{content.watermarkMessage}</p>
          <a href={content.androidUrl}>{content.androidLabel}</a>
        </section>
      </main>
      <SiteFooter locale={content.locale} />
    </>
  );
}

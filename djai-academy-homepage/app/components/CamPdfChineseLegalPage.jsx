import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";
import { CAM_PDF_PATH } from "../lib/camPdfChineseContent";
import styles from "../Cam_PDF_Scan_Signer_QR-Gen/privacy/page.module.css";

export function camPdfLegalMetadata(content, type) {
  const path = `${CAM_PDF_PATH}${content.segment}/${type}/`;
  const page = content.legal[type === "delete-account" ? "deleteAccount" : type];
  return {
    title: `${page.title} | DJAI`,
    description: page.lead,
    alternates: { canonical: path },
    robots: { index: false, follow: true }
  };
}

export default function CamPdfChineseLegalPage({ content, type }) {
  const key = type === "delete-account" ? "deleteAccount" : type;
  const page = content.legal[key];
  const base = `${CAM_PDF_PATH}${content.segment}/`;
  return (
    <>
      <SiteHeader locale={content.locale} currentRoute="home" languageHref={base} />
      <main className={styles.page}>
        <header className={styles.hero}><p>Cam PDF Scan Signer QR Gen</p><h1>{page.title}</h1><span>{page.updated}</span></header>
        <article className={styles.content}>
          <p className={styles.lead}>{page.lead}</p>
          {page.sections.map(([title, body]) => <section key={title}><h2>{title}</h2><p>{body}</p></section>)}
          <nav className={styles.links}>
            <a href={base}>{content.locale === "zh-CN" ? "应用介绍" : "App 介紹"}</a>
            <a href={`${base}privacy/`}>{content.locale === "zh-CN" ? "隐私政策" : "隱私權政策"}</a>
            <a href={`${base}terms/`}>{content.locale === "zh-CN" ? "服务条款" : "服務條款"}</a>
            <a href={`${base}delete-account/`}>{content.locale === "zh-CN" ? "删除账户" : "刪除帳戶"}</a>
          </nav>
        </article>
      </main>
      <SiteFooter locale={content.locale} />
    </>
  );
}

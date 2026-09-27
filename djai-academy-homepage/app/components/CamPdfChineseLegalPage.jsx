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
  const languageHrefs = {
    en: `${CAM_PDF_PATH}${type}/`,
    "zh-CN": `${CAM_PDF_PATH}zh-cn/${type}/`,
    "zh-TW": `${CAM_PDF_PATH}zh-tw/${type}/`,
    ...(type === "privacy" ? { th: `${CAM_PDF_PATH}privacy/th/` } : {})
  };
  return (
    <>
      <SiteHeader locale={content.locale} currentRoute="camPdf" languageHrefs={languageHrefs} />
      <main className={styles.page}>
        <header className={styles.hero}><p>Cam PDF Scanner: Sign &amp; QR</p><h1>{page.title}</h1><span>{page.updated}</span></header>
        <article className={styles.content}>
          <p className={styles.lead}>{page.lead}</p>
          <aside className={styles.notice}>{content.locale === "zh-CN" ? "2026年9月28日更新：iOS V1 可跳过登录，每周共享两次本机输出，不提供广告、购买或奖励补充。账户删除可能需要重新验证身份；有限的安全记录和备份可能保留。完整当前规定请查看英文页面及隐私政策。" : "2026年9月28日更新：iOS V1 可略過登入，每週共用兩次本機輸出，不提供廣告、購買或獎勵補充。帳戶刪除可能需要重新驗證身分；有限的安全紀錄和備份可能保留。完整現行規定請參閱英文頁面及隱私權政策。"} <a href={`${CAM_PDF_PATH}${type}/`}>English</a> · <a href={`${CAM_PDF_PATH}privacy/`}>Privacy Policy</a></aside>
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

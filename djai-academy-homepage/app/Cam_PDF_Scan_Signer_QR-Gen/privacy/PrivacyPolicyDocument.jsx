import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";
import copy from "./policy-content.json";
import styles from "./page.module.css";
const APP_PATH = "/Cam_PDF_Scan_Signer_QR-Gen/";
const notices = {
  th: "นโยบายฉบับปัจจุบันลงวันที่ 28 กันยายน 2026 แสดงเป็นภาษาอังกฤษด้านล่าง และครอบคลุม Android และ iOS ข้อความนี้ใช้แทนคำแปลฉบับเก่าที่ครอบคลุมเฉพาะ Android หากต้องการคำอธิบายภาษาไทย โปรดติดต่อ contact@djai.academy",
  "zh-CN": "下方为2026年9月28日修订的完整英文隐私政策，涵盖 Android 和 iOS，并取代之前仅适用于 Android 的旧译文。如需中文说明，请联系 contact@djai.academy。",
  "zh-TW": "下方為2026年9月28日修訂的完整英文隱私權政策，涵蓋 Android 和 iOS，並取代先前僅適用於 Android 的舊譯文。如需中文說明，請聯絡 contact@djai.academy。"
};
function Inline({ text }) {
  return text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g).map((part, index) => {
    if (part.startsWith("**")) return <strong key={index}>{part.slice(2,-2)}</strong>;
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) return <a key={index} href={link[2]}>{link[1]}</a>;
    return part;
  });
}
function Blocks({ blocks }) {
  return blocks.map((block,index) => {
    if (block.type === "heading") return <h3 key={index}>{block.text}</h3>;
    if (block.type === "list") return <ul key={index}>{block.items.map((text,i)=><li key={i}><Inline text={text}/></li>)}</ul>;
    if (block.type === "table") return <div key={index} className={styles.tableWrap}><table><thead><tr>{block.rows[0].map((text,i)=><th key={i} scope="col">{text}</th>)}</tr></thead><tbody>{block.rows.slice(1).map((row,i)=><tr key={i}>{row.map((text,j)=><td key={j}><Inline text={text}/></td>)}</tr>)}</tbody></table></div>;
    return <p key={index}><Inline text={block.text}/></p>;
  });
}
export default function PrivacyPolicyDocument({ locale = "en" }) {
  const languageHrefs = { en: APP_PATH+"privacy/", th: APP_PATH+"privacy/th/", "zh-CN": APP_PATH+"zh-cn/privacy/", "zh-TW": APP_PATH+"zh-tw/privacy/" };
  return <><SiteHeader locale={locale} currentRoute="camPdf" languageHrefs={languageHrefs}/><main className={styles.page}>
    <header className={styles.hero} lang="en"><p>Cam PDF Scanner: Sign &amp; QR</p><h1>{copy.title}</h1><span>{copy.date}</span></header>
    <article className={styles.content} lang="en">
      {notices[locale] && <aside className={styles.notice} lang={locale}>{notices[locale]}</aside>}
      <div className={styles.introduction}><Blocks blocks={copy.intro}/></div>
      {copy.sections.map((section,index)=><section id={"section-"+(index+1)} key={section.title}><h2>{section.title}</h2><div className={styles.sectionBody}><Blocks blocks={section.blocks}/></div></section>)}
      <nav className={styles.links} aria-label="Related pages"><a href={APP_PATH}>App page</a><a href={APP_PATH+"terms/"}>Terms of Service</a><a href={APP_PATH+"delete-account/"}>Delete an account</a></nav>
    </article></main><SiteFooter locale={locale}/></>;
}

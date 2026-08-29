import Image from "next/image";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";
import { CAM_PDF_PATH } from "../lib/camPdfChineseContent";

export function camPdfArticleMetadata(article) {
  const path = `/blog/${article.segment}/cam-pdf-scanner-app-google-play-release/`;
  return {
    title: article.articleTitle,
    description: article.articleDescription,
    alternates: {
      canonical: path,
      languages: {
        "zh-CN": "/blog/zh-cn/cam-pdf-scanner-app-google-play-release/",
        "zh-TW": "/blog/zh-tw/cam-pdf-scanner-app-google-play-release/"
      }
    },
    robots: { index: article.indexable, follow: true },
    openGraph: { title: article.articleTitle, description: article.articleDescription, type: "article", images: [{ url: "/apps/cam-pdf/home.png", width: 390, height: 844 }] }
  };
}

export default function CamPdfReleaseArticle({ article }) {
  const productPath = `${CAM_PDF_PATH}${article.segment}/`;
  return (
    <>
      <SiteHeader locale={article.locale} currentRoute="blog" languageHref={productPath} />
      <main className="article-page">
        <article className="article-shell">
          <header className="article-header">
            <a className="back-link" href={productPath}>{article.locale === "zh-CN" ? "返回 Cam PDF 产品页" : "返回 Cam PDF 產品頁"}</a>
            <div className="post-meta"><span>{article.locale === "zh-CN" ? "产品发布" : "產品發布"}</span><span>{article.readingTime}</span><time dateTime="2026-08-29">2026 年 8 月 29 日</time></div>
            <h1>{article.articleTitle}</h1>
            <p>{article.articleDescription}</p>
          </header>
          <div className="article-content">
            <p>{article.intro}</p>
            <p><a href={article.androidUrl}>{article.androidLabel}</a></p>
            <Image src="/apps/cam-pdf/home.png" alt="Cam PDF 文件庫與掃描操作畫面" width={390} height={844} />
            {article.sections.map(([title, body]) => <section key={title}><h2>{title}</h2><p>{body}</p></section>)}
            <Image src="/apps/cam-pdf/tools.png" alt="Cam PDF 簽名、壓縮、PDF 與 QR Code 工具" width={390} height={844} />
          </div>
          <footer className="article-cta"><div><p className="eyebrow">ANDROID</p><h2>{article.watermarkMessage}</h2></div><a className="button" href={productPath}>{article.locale === "zh-CN" ? "查看完整产品介绍" : "查看完整產品介紹"}</a></footer>
        </article>
      </main>
      <SiteFooter locale={article.locale} />
    </>
  );
}

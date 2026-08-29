import Link from "next/link";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import { camPdfReleaseArticles } from "../lib/camPdfChineseContent";

export function chineseBlogMetadata(locale) {
  const article = camPdfReleaseArticles[locale];
  const canonical = `/blog/${article.segment}/`;
  return {
    title: locale === "zh-CN" ? "DJAI 中文文章与产品动态" : "DJAI 中文文章與產品動態",
    description: locale === "zh-CN"
      ? "阅读 DJAI 的 AI 实践、免费工具与产品发布内容。"
      : "閱讀 DJAI 的 AI 實作、免費工具與產品發布內容。",
    robots: { index: false, follow: true },
    alternates: { canonical }
  };
}

export default function ChineseBlogHub({ locale }) {
  const article = camPdfReleaseArticles[locale];
  const traditional = locale === "zh-TW";
  const href = `/blog/${article.segment}/cam-pdf-scanner-app-google-play-release/`;

  return (
    <>
      <SiteHeader locale={locale} currentRoute="blog" />
      <main className="blog-page">
        <section className="blog-hero">
          <p className="eyebrow">DJAI BLOG</p>
          <h1>{traditional ? "從實際產品與工具開始理解 AI" : "从实际产品与工具开始理解 AI"}</h1>
          <p>{traditional ? "這裡整理 DJAI 的產品發布、實作方法與免費工具指南。先看清楚一個具體工作怎麼完成，再決定下一步要學什麼。" : "这里整理 DJAI 的产品发布、实践方法与免费工具指南。先看清楚一项具体工作如何完成，再决定下一步要学什么。"}</p>
        </section>
        <section className="blog-layout">
          <aside className="blog-sidebar" aria-label={traditional ? "文章主題" : "文章主题"}>
            <h2>{traditional ? "主題" : "主题"}</h2>
            <Link className="active" href={`/blog/${article.segment}/`}>{traditional ? "全部文章" : "全部文章"}<strong>1</strong></Link>
            <a href={`/tools/${article.segment}/`}>{traditional ? "免費線上工具" : "免费在线工具"}</a>
          </aside>
          <div className="blog-list">
            <div className="blog-list-heading"><div><p className="eyebrow">{traditional ? "最新發布" : "最新发布"}</p><h2>{traditional ? "產品與實作文章" : "产品与实践文章"}</h2></div></div>
            <div className="post-grid">
              <article className="post-card">
                <div className="post-meta"><span>{traditional ? "產品發布" : "产品发布"}</span><span>{article.readingTime}</span></div>
                <h3><Link href={href}>{article.articleTitle}</Link></h3>
                <p>{article.articleDescription}</p>
                <div className="post-card-footer"><time dateTime="2026-08-29">2026 年 8 月 29 日</time><Link href={href}>{traditional ? "閱讀文章" : "阅读文章"}</Link></div>
              </article>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}

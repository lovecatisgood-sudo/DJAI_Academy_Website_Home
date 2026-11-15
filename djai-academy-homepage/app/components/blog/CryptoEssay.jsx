import Link from "next/link";
import SiteHeader from "../SiteHeader";
import SiteFooter from "../SiteFooter";
import BlogMarkdown from "./BlogMarkdown";
import styles from "./CryptoEssay.module.css";
import { SITE_URL, pathFor } from "../../lib/i18n";
import {
  cryptoEssayAuthor, cryptoEssayDate, cryptoEssayIndexableLocales, cryptoEssayPaths, getCryptoEssay
} from "../../lib/cryptoEssay";

function blogBackLink(locale) {
  if (locale === "en") return "/siamese_cat/dev/blog/en/";
  if (locale === "th") return "/siamese_cat/dev/blog/";
  return pathFor("blog", locale);
}

export function cryptoEssayMetadata(locale) {
  const { title, excerpt } = getCryptoEssay(locale);
  const indexable = cryptoEssayIndexableLocales.includes(locale);
  const canonical = cryptoEssayPaths[locale];
  const languages = Object.fromEntries(cryptoEssayIndexableLocales.map((code) => [code, cryptoEssayPaths[code]]));

  return {
    title,
    description: excerpt,
    authors: [{ name: cryptoEssayAuthor }],
    alternates: indexable ? { canonical, languages: { ...languages, "x-default": cryptoEssayPaths.th } } : { canonical },
    robots: { index: indexable, follow: true },
    openGraph: {
      title, description: excerpt, url: canonical, type: "article", siteName: "DJAI Academy",
      images: ["/social/djai-blog.webp"]
    },
    twitter: { card: "summary_large_image", title, description: excerpt, images: ["/social/djai-blog.webp"] }
  };
}

export function CryptoEssayCard({ locale }) {
  const { title, excerpt, read, month, readingTime } = getCryptoEssay(locale);
  const href = cryptoEssayPaths[locale];
  return (
    <article className="post-card">
      <div className="post-meta"><span>{cryptoEssayAuthor}</span><span>{readingTime}</span></div>
      <h3><Link href={href}>{title}</Link></h3>
      <p>{excerpt}</p>
      <div className="post-card-footer">
        <time dateTime="2026-11">{month}</time>
        <Link href={href}>{read}</Link>
      </div>
    </article>
  );
}

export default function CryptoEssay({ locale }) {
  const { title, excerpt, content, back, by, month, readingTime } = getCryptoEssay(locale);
  const authorPath = pathFor("siameseCatDev", locale);
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: excerpt,
    inLanguage: locale,
    datePublished: cryptoEssayDate,
    articleSection: cryptoEssayAuthor,
    author: { "@type": "Person", name: cryptoEssayAuthor, url: SITE_URL + authorPath },
    publisher: { "@type": "Organization", name: "DJAI Academy", url: SITE_URL },
    mainEntityOfPage: SITE_URL + cryptoEssayPaths[locale]
  };

  return (
    <>
      <SiteHeader locale={locale} currentRoute="blog" languageHrefs={cryptoEssayPaths} />
      <main className={`article-page siamese-dev-blog-page ${styles.page}`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
        <article className="article-shell">
          <header className="article-header">
            <Link className="back-link" href={blogBackLink(locale)}>{back}</Link>
            <div className="post-meta">
              <span>{cryptoEssayAuthor}</span>
              <span>{readingTime}</span>
              <time dateTime="2026-11">{month}</time>
            </div>
            <h1>{title}</h1>
            <p>{excerpt}</p>
            <p className="article-byline">{by} <a href={authorPath}>{cryptoEssayAuthor}</a></p>
          </header>
          <div className="article-content"><BlogMarkdown content={content} /></div>
        </article>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}

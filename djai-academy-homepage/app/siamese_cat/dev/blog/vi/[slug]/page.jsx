import { notFound } from "next/navigation";
import Link from "next/link";
import AdSenseAd from "../../../../../components/AdSenseAd";
import ShareButtons from "../../../../../components/ShareButtons";
import SiteFooter from "../../../../../components/SiteFooter";
import SiteHeader from "../../../../../components/SiteHeader";
import BlogMarkdown from "../../../../../components/blog/BlogMarkdown";
import { ScannerBuildStoryEvidence, ScannerBuildStoryNextStep } from "../../../../../components/blog/ScannerBuildStoryEvidence";
import { getSiameseDevViPost, siameseDevViPosts } from "../../../../../lib/siameseDevViPosts";

export function generateStaticParams() { return siameseDevViPosts.map((post) => ({ slug: post.slug })); }

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getSiameseDevViPost(slug);
  if (!post) return { title: "Không tìm thấy bài viết | Siamese Cat Dev" };
  const path = `/siamese_cat/dev/blog/vi/${post.slug}/`;
  return { title: post.seoTitle, description: post.seoDescription, keywords: post.keywords, alternates: { canonical: path, languages: { th: `/siamese_cat/dev/blog/${post.slug}/`, en: `/siamese_cat/dev/blog/en/${post.slug}/`, vi: path, "x-default": `/siamese_cat/dev/blog/${post.slug}/` } }, openGraph: { title: post.seoTitle, description: post.seoDescription, url: path, siteName: "Siamese Cat Dev", locale: "vi_VN", images: [{ url: "/social/djai-blog.webp", width: 1200, height: 630, alt: post.title }], type: "article", publishedTime: post.publishedAt, modifiedTime: post.updatedAt, authors: [post.author] } };
}

function formatDate(value) { return new Intl.DateTimeFormat("vi-VN", { day: "numeric", month: "long", year: "numeric" }).format(new Date(value)); }

export default async function SiameseCatDevVietnamesePostPage({ params }) {
  const { slug } = await params;
  const post = getSiameseDevViPost(slug);
  if (!post) notFound();
  const postUrl = `https://www.djai.academy/siamese_cat/dev/blog/vi/${post.slug}/`;
  const structuredData = { "@context": "https://schema.org", "@type": "Article", headline: post.title, description: post.seoDescription, inLanguage: "vi", datePublished: post.publishedAt, dateModified: post.updatedAt, articleSection: post.category, author: { "@type": "Organization", name: post.author }, publisher: { "@type": "Organization", name: "Siamese Cat Dev", url: "https://www.djai.academy/siamese_cat/dev/vi/", logo: { "@type": "ImageObject", url: "https://www.djai.academy/siamese_cat/dev/siamese-cat-dev-logo.webp" } }, mainEntityOfPage: postUrl };
  return <>
    <SiteHeader locale="vi" currentRoute="siameseCat" languageHref={`/siamese_cat/dev/blog/en/${post.slug}/`} />
    <main className="article-page siamese-dev-blog-page"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /><article className="article-shell">
      <header className="article-header"><Link className="back-link" href="/siamese_cat/dev/blog/vi/">Quay lại blog Siamese Cat Dev</Link><div className="post-meta"><span>{post.category}</span><span>{post.readingTime}</span><time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time></div><h1>{post.title}</h1><p>{post.excerpt}</p><p className="article-byline">Bởi {post.author} · Cập nhật {formatDate(post.updatedAt)}</p><ShareButtons url={postUrl} title={post.title} locale="vi" /></header>
      <ScannerBuildStoryEvidence locale="vi" />
      <div className="article-content"><BlogMarkdown content={post.content} /></div>
      <ScannerBuildStoryNextStep locale="vi" />
      <AdSenseAd label="Quảng cáo trong bài viết" variant="inArticle" />
      <footer className="article-cta"><div><p className="eyebrow">DÙNG SẢN PHẨM</p><h2>Thử quy trình scanner và tài liệu trong câu chuyện này.</h2></div><Link className="button" href="/Cam_PDF_Scan_Signer_QR-Gen/vi/">Khám phá Cam PDF</Link></footer>
      <ShareButtons url={postUrl} title={post.title} locale="vi" compact />
    </article></main>
    <SiteFooter locale="vi" />
  </>;
}

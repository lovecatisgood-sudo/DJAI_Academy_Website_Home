import Link from "next/link";
import { notFound } from "next/navigation";
import AdSenseAd from "../../../components/AdSenseAd";
import ShareButtons from "../../../components/ShareButtons";
import SiteFooter from "../../../components/SiteFooter";
import SiteHeader from "../../../components/SiteHeader";
import BlogMarkdown from "../../../components/blog/BlogMarkdown";
import { getViPost, viBlogPosts } from "../../../lib/viBlogPosts";

export const dynamicParams = false;
export function generateStaticParams() { return viBlogPosts.map(({ slug }) => ({ slug })); }
function formatDate(value) { return new Intl.DateTimeFormat("vi-VN", { day: "numeric", month: "long", year: "numeric" }).format(new Date(value)); }

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getViPost(slug);
  if (!post) return { title: "Không tìm thấy bài viết | DJAI Academy" };
  const languages = { vi: `/blog/vi/${post.slug}/` };
  if (post.alternateEn) {
    languages.th = `/blog/${post.alternateEn}/`;
    languages.en = `/blog/en/${post.alternateEn}/`;
    languages["x-default"] = `/blog/${post.alternateEn}/`;
  }
  return { title: post.seoTitle, description: post.seoDescription, keywords: post.keywords, alternates: { canonical: `/blog/vi/${post.slug}/`, languages }, openGraph: { title: post.seoTitle, description: post.seoDescription, url: `/blog/vi/${post.slug}/`, siteName: "DJAI Academy", images: [{ url: "/social/djai-blog.webp", width: 1200, height: 630, alt: post.title }], type: "article", locale: "vi_VN", publishedTime: post.publishedAt, modifiedTime: post.updatedAt, authors: [post.author] } };
}

export default async function VietnameseBlogPostPage({ params }) {
  const { slug } = await params;
  const post = getViPost(slug);
  if (!post) notFound();
  const languageHrefs = { vi: `/blog/vi/${post.slug}/` };
  if (post.alternateEn) {
    languageHrefs.th = `/blog/${post.alternateEn}/`;
    languageHrefs.en = `/blog/en/${post.alternateEn}/`;
  }
  const schema = { "@context": "https://schema.org", "@type": "Article", headline: post.title, description: post.seoDescription, datePublished: post.publishedAt, dateModified: post.updatedAt, inLanguage: "vi", articleSection: post.category, author: { "@type": "Organization", name: post.author }, publisher: { "@type": "Organization", name: "DJAI Academy", url: "https://www.djai.academy/", logo: { "@type": "ImageObject", url: "https://www.djai.academy/djai-logo.webp" } }, mainEntityOfPage: `https://www.djai.academy/blog/vi/${post.slug}/` };
  return <><SiteHeader locale="vi" currentRoute="blog" languageHrefs={languageHrefs} /><main className="article-page"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><article className="article-shell"><header className="article-header"><Link className="back-link" href="/blog/vi/">Trở lại danh sách bài viết</Link><div className="post-meta"><span>{post.category}</span><span>{post.readingTime}</span><time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time></div><h1>{post.title}</h1><p>{post.excerpt}</p><p className="article-byline">DJAI Academy · Cập nhật {formatDate(post.updatedAt)}</p><ShareButtons url={`https://www.djai.academy/blog/vi/${post.slug}/`} title={post.title} locale="vi" /></header><div className="article-content"><BlogMarkdown content={post.content} /></div><AdSenseAd label="Quảng cáo trong bài viết" variant="inArticle" /><footer className="article-cta"><div><p className="eyebrow">BƯỚC TIẾP THEO</p><h2>Thử công cụ hoặc bắt đầu một dự án nhỏ.</h2></div><a className="button" href="/tools/vi/">Mở bộ công cụ miễn phí</a></footer><ShareButtons url={`https://www.djai.academy/blog/vi/${post.slug}/`} title={post.title} locale="vi" compact /></article></main><SiteFooter locale="vi" /></>;
}

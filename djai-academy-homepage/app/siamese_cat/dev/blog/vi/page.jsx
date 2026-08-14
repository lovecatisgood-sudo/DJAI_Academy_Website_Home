import Link from "next/link";
import AdSenseAd from "../../../../components/AdSenseAd";
import SiteFooter from "../../../../components/SiteFooter";
import SiteHeader from "../../../../components/SiteHeader";
import { siameseDevViPosts } from "../../../../lib/siameseDevViPosts";

export const metadata = {
  title: "Blog Siamese Cat Dev | Sản phẩm, Vibe Coding và phát triển với AI",
  description: "Bài viết tiếng Việt của Siamese Cat Dev về tư duy sản phẩm, phát triển phần mềm, Vibe Coding và những bài học từ dự án thật.",
  alternates: { canonical: "/siamese_cat/dev/blog/vi/", languages: { th: "/siamese_cat/dev/blog/", en: "/siamese_cat/dev/blog/en/", vi: "/siamese_cat/dev/blog/vi/", "x-default": "/siamese_cat/dev/blog/" } },
  openGraph: { title: "Blog Siamese Cat Dev", description: "Ghi chép về sản phẩm, phần mềm và quy trình AI từ Siamese Cat Dev.", url: "/siamese_cat/dev/blog/vi/", siteName: "DJAI Academy", locale: "vi_VN", images: ["/social/djai-blog.webp"], type: "website" }
};

function formatDate(value) {
  return new Intl.DateTimeFormat("vi-VN", { day: "numeric", month: "long", year: "numeric" }).format(new Date(value));
}

export default function SiameseCatDevVietnameseBlogPage() {
  const posts = siameseDevViPosts;
  const structuredData = { "@context": "https://schema.org", "@type": "Blog", name: "Blog Siamese Cat Dev", url: "https://www.djai.academy/siamese_cat/dev/blog/vi/", inLanguage: "vi", publisher: { "@type": "Organization", name: "Siamese Cat Dev", url: "https://www.djai.academy/siamese_cat/dev/vi/" }, blogPost: posts.map((post) => ({ "@type": "BlogPosting", headline: post.title, url: `https://www.djai.academy/siamese_cat/dev/blog/vi/${post.slug}/`, datePublished: post.publishedAt, description: post.excerpt })) };
  return <>
    <SiteHeader locale="vi" currentRoute="siameseCat" languageHref="/siamese_cat/dev/blog/en/" />
    <main className="blog-page siamese-dev-blog-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <section className="blog-hero"><p className="eyebrow">BLOG SIAMESE CAT DEV</p><h1>Ghi chép về việc xây sản phẩm, phần mềm và quy trình AI.</h1><p>Các bài viết đã được biên soạn bằng tiếng Việt về tư duy sản phẩm, Vibe Coding, phát triển với AI và bài học từ dự án thật.</p></section>
      <AdSenseAd label="Quảng cáo blog Siamese Cat Dev" />
      <section className="blog-layout">
        <aside className="blog-sidebar" aria-label="Điều hướng blog Siamese Cat Dev"><h2>Siamese Cat Dev</h2><Link className="active" href="/siamese_cat/dev/blog/vi/"><span>Tất cả bài viết</span><strong>{posts.length}</strong></Link><a href="/siamese_cat/dev/vi/">Tìm hiểu Siamese Cat Dev</a><Link href="/blog/vi/">Blog DJAI</Link></aside>
        <div className="blog-list"><div className="blog-list-heading"><div><p className="eyebrow">Siamese Cat Dev</p><h2>Bài viết mới nhất</h2></div><a href="/siamese_cat/dev/vi/">Quay lại trang giới thiệu</a></div><div className="post-grid">{posts.map((post) => <article className="post-card" key={post.slug}><div className="post-meta"><span>{post.category}</span><span>{post.readingTime}</span></div><h3><a href={`/siamese_cat/dev/blog/vi/${post.slug}/`}>{post.title}</a></h3><p>{post.excerpt}</p><div className="post-card-footer"><time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time><a href={`/siamese_cat/dev/blog/vi/${post.slug}/`}>Đọc bài viết</a></div></article>)}</div></div>
      </section>
    </main>
    <SiteFooter locale="vi" />
  </>;
}

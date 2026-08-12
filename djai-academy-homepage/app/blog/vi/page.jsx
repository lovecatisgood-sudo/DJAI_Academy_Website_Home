import Link from "next/link";
import AdSenseAd from "../../components/AdSenseAd";
import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";
import { viBlogPosts } from "../../lib/viBlogPosts";

export const metadata = {
  title: "Bài viết AI, vibe coding và xây sản phẩm | DJAI Academy",
  description: "Hướng dẫn thực hành bằng tiếng Việt về AI, vibe coding, công cụ web và cách đưa một ý tưởng thành sản phẩm có thể kiểm tra.",
  alternates: { canonical: "/blog/vi/", languages: { th: "/blog/", en: "/blog/en/", vi: "/blog/vi/", "x-default": "/blog/" } },
  openGraph: { title: "Bài viết tiếng Việt từ DJAI Academy", description: "Hướng dẫn thực hành cho người học và người đang tự xây sản phẩm bằng AI.", url: "/blog/vi/", siteName: "DJAI Academy", images: ["/social/djai-blog.webp"], type: "website", locale: "vi_VN" }
};

function formatDate(value) { return new Intl.DateTimeFormat("vi-VN", { day: "numeric", month: "long", year: "numeric" }).format(new Date(value)); }

export default function VietnameseBlogPage() {
  const schema = { "@context": "https://schema.org", "@type": "Blog", name: "Bài viết DJAI Academy", url: "https://www.djai.academy/blog/vi/", inLanguage: "vi", publisher: { "@type": "Organization", name: "DJAI Academy", url: "https://www.djai.academy/" }, blogPost: viBlogPosts.map((post) => ({ "@type": "BlogPosting", headline: post.title, url: `https://www.djai.academy/blog/vi/${post.slug}/`, datePublished: post.publishedAt, description: post.excerpt })) };
  return <><SiteHeader locale="vi" currentRoute="blog" /><main className="blog-page"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <section className="blog-hero"><p className="eyebrow">DJAI BLOG — TIẾNG VIỆT</p><h1>Học AI bằng những quyết định bạn phải đưa ra khi xây thật.</h1><p>Mỗi bài viết bắt đầu từ một việc cụ thể: chia nhỏ ý tưởng, chọn định dạng ảnh, tạo QR có thể quét ngoài đời. Không cần học thuật ngữ trước khi biết mình dùng nó để làm gì.</p></section>
    <AdSenseAd label="Quảng cáo trong trang bài viết" />
    <section className="blog-layout"><aside className="blog-sidebar" aria-label="Chủ đề"><h2>Chủ đề</h2><Link className="active" href="/blog/vi/"><span>Tất cả bài viết</span><strong>{viBlogPosts.length}</strong></Link><a href="/course/vi/"><span>Học theo workshop</span></a><a href="/tools/vi/"><span>Dùng công cụ miễn phí</span></a></aside><div className="blog-list"><div className="blog-list-heading"><div><p className="eyebrow">MỚI NHẤT</p><h2>Hướng dẫn thực hành</h2></div><a href="/tools/vi/">Mở bộ công cụ</a></div><div className="post-grid">{viBlogPosts.map((post) => <article className="post-card" key={post.slug}><div className="post-meta"><span>{post.category}</span><span>{post.readingTime}</span></div><h3><Link href={`/blog/vi/${post.slug}/`}>{post.title}</Link></h3><p>{post.excerpt}</p><div className="post-card-footer"><time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time><Link href={`/blog/vi/${post.slug}/`}>Đọc bài viết</Link></div></article>)}</div></div></section>
    <AdSenseAd label="Quảng cáo nội dung liên quan" variant="multiplex" />
  </main><SiteFooter locale="vi" /></>;
}

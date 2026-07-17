import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";
import { TH_BLOG_CATEGORIES, getAllThaiPosts } from "../../lib/thBlogPosts";

export const metadata = {
  title: "บล็อก DJAI | ข่าวสาร คู่มือ และบทความสอนใช้งาน",
  description:
    "อ่านข่าวสาร คู่มือ และบทความสอนใช้งานจาก DJAI Academy เกี่ยวกับ AI เครื่องมือฟรี image optimization QR code และการสร้าง product",
  alternates: {
    canonical: "/blog/th/",
    languages: {
      en: "/blog/EN/",
      th: "/blog/th/"
    }
  },
  openGraph: {
    title: "บล็อก DJAI",
    description:
      "ข่าวสาร คู่มือ และบทความสอนใช้งานจาก DJAI Academy สำหรับคนสร้างงานและธุรกิจ",
    url: "/blog/th/",
    siteName: "DJAI Academy",
    images: ["/djai-logo.webp"],
    type: "website"
  }
};

function formatDate(value) {
  return new Intl.DateTimeFormat("th-TH", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(value));
}

export default async function ThaiBlogPage({ searchParams }) {
  const params = await searchParams;
  const selectedCategory = TH_BLOG_CATEGORIES.includes(params?.category) ? params.category : "ทั้งหมด";
  const posts = await getAllThaiPosts();
  const visiblePosts =
    selectedCategory === "ทั้งหมด"
      ? posts
      : posts.filter((post) => post.category === selectedCategory);
  const categoryCounts = TH_BLOG_CATEGORIES.reduce(
    (counts, category) => ({
      ...counts,
      [category]: posts.filter((post) => post.category === category).length
    }),
    { "ทั้งหมด": posts.length }
  );

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "บล็อก DJAI",
    url: "https://djai.academy/blog/th/",
    publisher: {
      "@type": "Organization",
      name: "DJAI Academy",
      url: "https://djai.academy/"
    },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: `https://djai.academy/blog/th/${post.slug}/`,
      datePublished: post.publishedAt,
      articleSection: post.category,
      description: post.excerpt
    }))
  };

  return (
    <>
      <SiteHeader locale="th" currentRoute="blog" />
      <main className="blog-page">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <section className="blog-hero">
          <p className="eyebrow">บล็อก DJAI</p>
          <h1>ข่าวสาร คู่มือ และบทความสอนใช้งานสำหรับคนสร้างงานจริง</h1>
          <p>
            เรียนรู้การใช้ AI เครื่องมือฟรีของ DJAI และ workflow การสร้าง product ที่ practical
            สำหรับ creator, founder, นักเรียน และธุรกิจ
          </p>
        </section>

        <section className="blog-layout">
          <aside className="blog-sidebar" aria-label="Blog categories">
            <h2>หมวดหมู่</h2>
            <a className={selectedCategory === "ทั้งหมด" ? "active" : ""} href="/blog/th/">
              <span>ทั้งหมด</span>
              <strong>{categoryCounts["ทั้งหมด"]}</strong>
            </a>
            {TH_BLOG_CATEGORIES.map((category) => (
              <a
                className={selectedCategory === category ? "active" : ""}
                href={`/blog/th/?category=${encodeURIComponent(category)}`}
                key={category}
              >
                <span>{category}</span>
                <strong>{categoryCounts[category]}</strong>
              </a>
            ))}
          </aside>

          <div className="blog-list">
            <div className="blog-list-heading">
              <div>
                <p className="eyebrow">{selectedCategory}</p>
                <h2>{selectedCategory === "ทั้งหมด" ? "บทความล่าสุด" : selectedCategory}</h2>
              </div>
              <a href="https://djai.academy/tools/th/">เปิดเครื่องมือฟรี</a>
            </div>

            {visiblePosts.length ? (
              <div className="post-grid">
                {visiblePosts.map((post) => (
                  <article className="post-card" key={post.slug}>
                    <div className="post-meta">
                      <span>{post.category}</span>
                      <span>{post.readingTime}</span>
                    </div>
                    <h3>
                      <a href={`/blog/th/${post.slug}/`}>{post.title}</a>
                    </h3>
                    <p>{post.excerpt}</p>
                    <div className="post-card-footer">
                      <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                      <a href={`/blog/th/${post.slug}/`}>อ่านบทความ</a>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="empty-posts">
                <h3>ยังไม่มีบทความในหมวดนี้</h3>
                <p>หมวดนี้พร้อมสำหรับการเผยแพร่ผ่านระบบ admin blog ในอนาคต</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <SiteFooter locale="th" />
    </>
  );
}

import SiteFooter from "../../../components/SiteFooter";
import SiteHeader from "../../../components/SiteHeader";
import AdSenseAd from "../../../components/AdSenseAd";
import {
  SIAMESE_CAT_DEV_CATEGORY,
  getPostsByCategory
} from "../../../lib/blogStore";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "บล็อก Siamese Cat Dev | Product, Vibe Coding และ AI-assisted Development",
  description:
    "บทความจาก Siamese Cat Dev เกี่ยวกับ product, software development, vibe coding, AI-assisted development และการสร้างโปรเจกต์จริง",
  alternates: {
    canonical: "/siamese_cat/dev/blog/",
    languages: {
      th: "/siamese_cat/dev/blog/",
      en: "/siamese_cat/dev/blog/en/",
      "x-default": "/siamese_cat/dev/blog/"
    }
  },
  openGraph: {
    title: "บล็อก Siamese Cat Dev",
    description:
      "Product notes, build stories, Vibe Coding และ AI-assisted development จาก Siamese Cat Dev",
    url: "/siamese_cat/dev/blog/",
    siteName: "DJAI Academy",
    images: ["/social/djai-blog.webp"],
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

export default async function SiameseCatDevBlogPage() {
  const posts = await getPostsByCategory(SIAMESE_CAT_DEV_CATEGORY, { locale: "th" });

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "บล็อก Siamese Cat Dev",
    url: "https://www.djai.academy/siamese_cat/dev/blog/",
    publisher: {
      "@type": "Organization",
      name: "Siamese Cat Dev",
      url: "https://www.djai.academy/siamese_cat/dev/"
    },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: `https://www.djai.academy/siamese_cat/dev/blog/${post.slug}/`,
      datePublished: post.publishedAt,
      articleSection: post.category,
      description: post.excerpt
    }))
  };

  return (
    <>
      <SiteHeader locale="th" currentRoute="siameseCat" languageHref="/siamese_cat/dev/blog/en/" />
      <main className="blog-page siamese-dev-blog-page">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <section className="blog-hero">
          <p className="eyebrow">Siamese Cat Dev Blog</p>
          <h1>บันทึกการสร้าง product, software และ workflow ด้วย AI</h1>
          <p>
            บทความจาก Siamese Cat Dev เกี่ยวกับการออกแบบ product, vibe coding,
            AI-assisted development, เครื่องมือฟรี และบทเรียนจากโปรเจกต์จริง
          </p>
        </section>

        <AdSenseAd label="Siamese Cat Dev blog advertisement" />

        <section className="blog-layout">
          <aside className="blog-sidebar" aria-label="Siamese Cat Dev blog navigation">
            <h2>Siamese Cat Dev</h2>
            <a className="active" href="/siamese_cat/dev/blog/">
              <span>บทความทั้งหมด</span>
              <strong>{posts.length}</strong>
            </a>
            <a href="/siamese_cat/dev/">รู้จัก Siamese Cat Dev</a>
            <a href="/blog/">บล็อก DJAI</a>
          </aside>

          <div className="blog-list">
            <div className="blog-list-heading">
              <div>
                <p className="eyebrow">Siamese Cat Dev</p>
                <h2>บทความล่าสุด</h2>
              </div>
              <a href="/siamese_cat/dev/">กลับไปหน้า Bio</a>
            </div>

            {posts.length ? (
              <div className="post-grid">
                {posts.map((post) => (
                  <article className="post-card" key={post.slug}>
                    <div className="post-meta">
                      <span>{post.category}</span>
                      <span>{post.readingTime}</span>
                    </div>
                    <h3>
                      <a href={`/siamese_cat/dev/blog/${post.slug}/`}>{post.title}</a>
                    </h3>
                    <p>{post.excerpt}</p>
                    <div className="post-card-footer">
                      <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                      <a href={`/siamese_cat/dev/blog/${post.slug}/`}>อ่านบทความ</a>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="empty-posts">
                <h3>ยังไม่มีบทความใน section นี้</h3>
                <p>เลือก category “Siamese Cat Dev” ในหน้า admin blog เพื่อเผยแพร่บทความที่นี่</p>
              </div>
            )}
          </div>
        </section>

        <AdSenseAd label="Related Siamese Cat Dev content advertisement" variant="multiplex" />
      </main>
      <SiteFooter locale="th" />
    </>
  );
}

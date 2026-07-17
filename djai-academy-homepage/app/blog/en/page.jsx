import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";
import { BLOG_CATEGORIES, getAllPosts } from "../../lib/blogStore";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "DJAI Blog | News, Guides, and Tutorials",
  description:
    "Read DJAI Academy news, guides, and tutorials for AI learning, free tools, image optimization, QR codes, and practical digital product building.",
  alternates: {
    canonical: "/blog/en/",
    languages: {
      en: "/blog/en/",
      th: "/blog/"
    }
  },
  openGraph: {
    title: "DJAI Blog",
    description:
      "News, guides, and tutorials from DJAI Academy for builders, creators, students, and businesses.",
    url: "/blog/en/",
    siteName: "DJAI Academy",
    images: ["/djai-logo.webp"],
    type: "website"
  }
};

function formatDate(value) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(value));
}

export default async function BlogPage({ searchParams }) {
  const params = await searchParams;
  const selectedCategory = BLOG_CATEGORIES.includes(params?.category) ? params.category : "All";
  const posts = await getAllPosts({ locale: "en" });
  const visiblePosts =
    selectedCategory === "All" ? posts : posts.filter((post) => post.category === selectedCategory);
  const categoryCounts = BLOG_CATEGORIES.reduce(
    (counts, category) => ({
      ...counts,
      [category]: posts.filter((post) => post.category === category).length
    }),
    { All: posts.length }
  );

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "DJAI Blog",
    url: "https://www.djai.academy/blog/en/",
    publisher: {
      "@type": "Organization",
      name: "DJAI Academy",
      url: "https://www.djai.academy/"
    },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: `https://www.djai.academy/blog/en/${post.slug}/`,
      datePublished: post.publishedAt,
      articleSection: post.category,
      description: post.excerpt
    }))
  };

  return (
    <>
      <SiteHeader locale="en" currentRoute="blog" />
      <main className="blog-page">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <section className="blog-hero">
          <p className="eyebrow">DJAI Blog</p>
          <h1>News, guides, and tutorials for practical builders.</h1>
          <p>
            Learn how to use AI, free DJAI tools, and practical product workflows to build,
            publish, and improve digital experiences.
          </p>
        </section>

        <section className="blog-layout">
          <aside className="blog-sidebar" aria-label="Blog categories">
            <h2>Categories</h2>
            <a className={selectedCategory === "All" ? "active" : ""} href="/blog/en/">
              <span>All</span>
              <strong>{categoryCounts.All}</strong>
            </a>
            {BLOG_CATEGORIES.map((category) => (
              <a
                className={selectedCategory === category ? "active" : ""}
                href={`/blog/en/?category=${encodeURIComponent(category)}`}
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
                <h2>{selectedCategory === "All" ? "Latest posts" : `${selectedCategory} posts`}</h2>
              </div>
              <a href="https://www.djai.academy/tools/en/">Open free tools</a>
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
                      <a href={`/blog/en/${post.slug}/`}>{post.title}</a>
                    </h3>
                    <p>{post.excerpt}</p>
                    <div className="post-card-footer">
                      <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                      <a href={`/blog/en/${post.slug}/`}>Read tutorial</a>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="empty-posts">
                <h3>No posts yet.</h3>
                <p>This category is ready for publishing through the admin blog backend.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <SiteFooter locale="en" />
    </>
  );
}

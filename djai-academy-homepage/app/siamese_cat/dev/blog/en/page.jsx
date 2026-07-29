import SiteFooter from "../../../../components/SiteFooter";
import SiteHeader from "../../../../components/SiteHeader";
import AdSenseAd from "../../../../components/AdSenseAd";
import {
  SIAMESE_CAT_DEV_CATEGORY,
  getPostsByCategory
} from "../../../../lib/blogStore";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Siamese Cat Dev Blog | Product, Vibe Coding, and AI-assisted Development",
  description:
    "Articles from Siamese Cat Dev about product thinking, software development, Vibe Coding, AI-assisted development, and practical project building.",
  alternates: {
    canonical: "/siamese_cat/dev/blog/en/",
    languages: {
      th: "/siamese_cat/dev/blog/",
      en: "/siamese_cat/dev/blog/en/",
      "x-default": "/siamese_cat/dev/blog/"
    }
  },
  openGraph: {
    title: "Siamese Cat Dev Blog",
    description:
      "Product notes, build stories, Vibe Coding, and AI-assisted development from Siamese Cat Dev.",
    url: "/siamese_cat/dev/blog/en/",
    siteName: "DJAI Academy",
    images: ["/social/djai-blog.webp"],
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

export default async function SiameseCatDevEnglishBlogPage() {
  const posts = await getPostsByCategory(SIAMESE_CAT_DEV_CATEGORY, { locale: "en" });

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Siamese Cat Dev Blog",
    url: "https://www.djai.academy/siamese_cat/dev/blog/en/",
    publisher: {
      "@type": "Organization",
      name: "Siamese Cat Dev",
      url: "https://www.djai.academy/siamese_cat/dev/en/"
    },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: `https://www.djai.academy/siamese_cat/dev/blog/en/${post.slug}/`,
      datePublished: post.publishedAt,
      articleSection: post.category,
      description: post.excerpt
    }))
  };

  return (
    <>
      <SiteHeader locale="en" currentRoute="siameseCat" languageHref="/siamese_cat/dev/blog/" />
      <main className="blog-page siamese-dev-blog-page">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <section className="blog-hero">
          <p className="eyebrow">Siamese Cat Dev Blog</p>
          <h1>Notes on building products, software, and AI workflows.</h1>
          <p>
            Articles from Siamese Cat Dev about product thinking, Vibe Coding,
            AI-assisted development, free tools, and lessons from real projects.
          </p>
        </section>

        <AdSenseAd label="Siamese Cat Dev blog advertisement" />

        <section className="blog-layout">
          <aside className="blog-sidebar" aria-label="Siamese Cat Dev blog navigation">
            <h2>Siamese Cat Dev</h2>
            <Link className="active" href="/siamese_cat/dev/blog/en/">
              <span>All posts</span>
              <strong>{posts.length}</strong>
            </Link>
            <a href="/siamese_cat/dev/en/">Meet Siamese Cat Dev</a>
            <Link href="/blog/en/">DJAI Blog</Link>
          </aside>

          <div className="blog-list">
            <div className="blog-list-heading">
              <div>
                <p className="eyebrow">Siamese Cat Dev</p>
                <h2>Latest posts</h2>
              </div>
              <a href="/siamese_cat/dev/en/">Back to bio</a>
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
                      <a href={`/siamese_cat/dev/blog/en/${post.slug}/`}>{post.title}</a>
                    </h3>
                    <p>{post.excerpt}</p>
                    <div className="post-card-footer">
                      <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                      <a href={`/siamese_cat/dev/blog/en/${post.slug}/`}>Read article</a>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="empty-posts">
                <h3>No posts in this section yet.</h3>
                <p>Choose the “Siamese Cat Dev” category in the blog admin to publish here.</p>
              </div>
            )}
          </div>
        </section>

        <AdSenseAd label="Related Siamese Cat Dev content advertisement" variant="multiplex" />
      </main>
      <SiteFooter locale="en" />
    </>
  );
}
import Link from "next/link";

import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import SiteFooter from "../../../components/SiteFooter";
import SiteHeader from "../../../components/SiteHeader";
import AdSenseAd from "../../../components/AdSenseAd";
import ShareButtons from "../../../components/ShareButtons";
import BlogMarkdown from "../../../components/blog/BlogMarkdown";
import { SIAMESE_CAT_DEV_CATEGORY, getPostBySlug } from "../../../lib/blogStore";
import { getSeededThaiPostBySlug } from "../../../lib/thBlogPosts";
import { getBlogJourney } from "../../../lib/blogJourneys";

export const dynamic = "force-dynamic";

function formatDate(value) {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric"
  }).format(new Date(value));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug, { locale: "en" });

  if (!post) {
    return {
      title: "Blog Post Not Found | DJAI Academy"
    };
  }

  const languages = {
    en: `/blog/en/${post.slug}/`
  };
  const thaiPost = post.alternateSlugs?.th ? null : getSeededThaiPostBySlug(post.slug);
  const thaiSlug = post.alternateSlugs?.th || thaiPost?.slug;
  if (thaiSlug) {
    languages.th = `/blog/${thaiSlug}/`;
    languages["x-default"] = `/blog/${thaiSlug}/`;
  } else {
    languages["x-default"] = `/blog/en/${post.slug}/`;
  }

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    keywords: post.keywords,
    alternates: {
      canonical: `/blog/en/${post.slug}/`,
      languages
    },
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      url: `/blog/en/${post.slug}/`,
      siteName: "DJAI Academy",
      images: [{ url: "/social/djai-blog.webp", width: 1200, height: 630, alt: post.title }],
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author]
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      images: ["/social/djai-blog.webp"]
    }
  };
}

export default async function BlogPostPage({ params }) {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug, { locale: "en" });

  if (!post) {
    notFound();
  }

  if (post.categoryKey === SIAMESE_CAT_DEV_CATEGORY) {
    permanentRedirect(`/siamese_cat/dev/blog/en/${post.slug}/`);
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.seoDescription || post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    articleSection: post.category,
    author: {
      "@type": "Organization",
      name: post.author || "DJAI Academy"
    },
    publisher: {
      "@type": "Organization",
      name: "DJAI Academy",
      url: "https://www.djai.academy/",
      logo: {
        "@type": "ImageObject",
        url: "https://www.djai.academy/djai-logo.webp"
      }
    },
    mainEntityOfPage: `https://www.djai.academy/blog/en/${post.slug}/`
  };
  const journey = getBlogJourney(post, "en");

  return (
    <>
      <SiteHeader
        locale="en"
        currentRoute="blog"
        languageHref={post.alternateSlugs?.th ? `/blog/${post.alternateSlugs.th}/` : "/blog/"}
      />
      <main className="article-page">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <article className="article-shell">
          <header className="article-header">
            <Link className="back-link" href="/blog/en/">
              Back to blog
            </Link>
            <div className="post-meta">
              <span>{post.category}</span>
              <span>{post.readingTime}</span>
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            </div>
            <h1>{post.title}</h1>
            <p>{post.excerpt}</p>
            <ShareButtons url={`https://www.djai.academy/blog/en/${post.slug}/`} title={post.title} locale="en" />
          </header>

          <AdSenseAd label="Article advertisement" variant="inArticle" />

          <div className="article-content"><BlogMarkdown content={post.content} /></div>

          <AdSenseAd label="Article advertisement" variant="inArticle" />

          <footer className="article-cta">
            <div>
              <p className="eyebrow">{journey.eyebrow}</p>
              <h2>{journey.title}</h2>
            </div>
            <Link className="button" href={journey.href}>{journey.label}</Link>
          </footer>

          <ShareButtons url={`https://www.djai.academy/blog/en/${post.slug}/`} title={post.title} locale="en" compact />

          <AdSenseAd label="Related content advertisement" variant="multiplex" />
        </article>
      </main>
      <SiteFooter locale="en" />
    </>
  );
}

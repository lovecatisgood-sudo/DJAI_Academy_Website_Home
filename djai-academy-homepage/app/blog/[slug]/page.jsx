import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";
import AdSenseAd from "../../components/AdSenseAd";
import ShareButtons from "../../components/ShareButtons";
import BlogMarkdown from "../../components/blog/BlogMarkdown";
import {
  ToolTutorialEvidence,
  ToolTutorialNextStep,
  hasToolTutorialEvidence
} from "../../components/blog/ToolTutorialEvidence";
import { SIAMESE_CAT_DEV_CATEGORY } from "../../lib/blogStore";
import { getThaiPostBySlug } from "../../lib/thBlogPosts";
import { getBlogJourney } from "../../lib/blogJourneys";
import { getViPostByEnglishSlug } from "../../lib/viBlogPosts";

function formatDate(value) {
  return new Intl.DateTimeFormat("th-TH", {
    month: "long",
    day: "numeric",
    year: "numeric"
  }).format(new Date(value));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const post = await getThaiPostBySlug(resolvedParams.slug);

  if (!post) {
    return {
      title: "ไม่พบบทความ | DJAI Academy"
    };
  }

  const englishSlug = post.alternateSlugs?.en || (post.source === "admin" ? "" : post.slug);
  const languages = {
    th: `/blog/${post.slug}/`,
    "x-default": `/blog/${post.slug}/`
  };
  if (englishSlug) {
    languages.en = `/blog/en/${englishSlug}/`;
    const vietnamesePost = getViPostByEnglishSlug(englishSlug);
    if (vietnamesePost) languages.vi = `/blog/vi/${vietnamesePost.slug}/`;
  }

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    keywords: post.keywords,
    alternates: {
      canonical: `/blog/${post.slug}/`,
      languages
    },
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      url: `/blog/${post.slug}/`,
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

export default async function ThaiBlogPostPage({ params }) {
  const resolvedParams = await params;
  const post = await getThaiPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  if (post.categoryKey === SIAMESE_CAT_DEV_CATEGORY) {
    permanentRedirect(`/siamese_cat/dev/blog/${post.slug}/`);
  }

  const hasTutorialEvidence = hasToolTutorialEvidence(post.slug);

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
    mainEntityOfPage: `https://www.djai.academy/blog/${post.slug}/`
  };
  const journey = getBlogJourney(post, "th");

  return (
    <>
      <SiteHeader
        locale="th"
        currentRoute="blog"
        languageHref={
          post.alternateSlugs?.en
            ? `/blog/en/${post.alternateSlugs.en}/`
            : post.source === "admin"
              ? "/blog/en/"
              : `/blog/en/${post.slug}/`
        }
      />
      <main className="article-page">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <article className="article-shell">
          <header className="article-header">
            <Link className="back-link" href="/blog/">
              กลับไปที่บล็อก
            </Link>
            <div className="post-meta">
              <span>{post.category}</span>
              <span>{post.readingTime}</span>
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            </div>
            <h1>{post.title}</h1>
            <p>{post.excerpt}</p>
            <p className="article-byline">
              โดย {post.author || "DJAI Academy"} · อัปเดต {formatDate(post.updatedAt)}
            </p>
            <ShareButtons url={`https://www.djai.academy/blog/${post.slug}/`} title={post.title} locale="th" />
          </header>

          {hasTutorialEvidence ? <ToolTutorialEvidence slug={post.slug} locale="th" /> : null}

          <div className="article-content"><BlogMarkdown content={post.content} /></div>

          <AdSenseAd label="Article advertisement" variant="inArticle" />

          {hasTutorialEvidence ? (
            <ToolTutorialNextStep slug={post.slug} locale="th" />
          ) : (
            <footer className="article-cta">
              <div>
                <p className="eyebrow">{journey.eyebrow}</p>
                <h2>{journey.title}</h2>
              </div>
              <Link className="button" href={journey.href}>{journey.label}</Link>
            </footer>
          )}

          <ShareButtons url={`https://www.djai.academy/blog/${post.slug}/`} title={post.title} locale="th" compact />

          <AdSenseAd label="Related content advertisement" variant="multiplex" />
        </article>
      </main>
      <SiteFooter locale="th" />
    </>
  );
}

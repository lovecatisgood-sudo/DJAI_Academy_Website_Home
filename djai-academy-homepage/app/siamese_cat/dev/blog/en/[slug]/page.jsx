import { notFound } from "next/navigation";
import Link from "next/link";
import SiteFooter from "../../../../../components/SiteFooter";
import SiteHeader from "../../../../../components/SiteHeader";
import AdSenseAd from "../../../../../components/AdSenseAd";
import ShareButtons from "../../../../../components/ShareButtons";
import BlogMarkdown from "../../../../../components/blog/BlogMarkdown";
import {
  SIAMESE_CAT_DEV_CATEGORY,
  getPostBySlugInCategory
} from "../../../../../lib/blogStore";

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
  const post = await getPostBySlugInCategory(resolvedParams.slug, SIAMESE_CAT_DEV_CATEGORY, { locale: "en" });

  if (!post) {
    return {
      title: "Post Not Found | Siamese Cat Dev"
    };
  }

  const languages = {
    en: `/siamese_cat/dev/blog/en/${post.slug}/`
  };
  if (post.alternateSlugs?.th) {
    languages.th = `/siamese_cat/dev/blog/${post.alternateSlugs.th}/`;
    languages["x-default"] = `/siamese_cat/dev/blog/${post.alternateSlugs.th}/`;
  } else {
    languages["x-default"] = `/siamese_cat/dev/blog/en/${post.slug}/`;
  }

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    keywords: post.keywords,
    alternates: {
      canonical: `/siamese_cat/dev/blog/en/${post.slug}/`,
      languages
    },
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      url: `/siamese_cat/dev/blog/en/${post.slug}/`,
      siteName: "Siamese Cat Dev",
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

export default async function SiameseCatDevEnglishPostPage({ params }) {
  const resolvedParams = await params;
  const post = await getPostBySlugInCategory(resolvedParams.slug, SIAMESE_CAT_DEV_CATEGORY, { locale: "en" });

  if (!post) {
    notFound();
  }

  const postUrl = `https://www.djai.academy/siamese_cat/dev/blog/en/${post.slug}/`;
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
      name: post.author || "Siamese Cat Dev"
    },
    publisher: {
      "@type": "Organization",
      name: "Siamese Cat Dev",
      url: "https://www.djai.academy/siamese_cat/dev/en/",
      logo: {
        "@type": "ImageObject",
        url: "https://www.djai.academy/siamese_cat/dev/siamese-cat-dev-logo.webp"
      }
    },
    mainEntityOfPage: postUrl
  };

  return (
    <>
      <SiteHeader
        locale="en"
        currentRoute="siameseCat"
        languageHref={
          post.alternateSlugs?.th
            ? `/siamese_cat/dev/blog/${post.alternateSlugs.th}/`
            : "/siamese_cat/dev/blog/"
        }
      />
      <main className="article-page siamese-dev-blog-page">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <article className="article-shell">
          <header className="article-header">
            <Link className="back-link" href="/siamese_cat/dev/blog/en/">
              Back to Siamese Cat Dev blog
            </Link>
            <div className="post-meta">
              <span>{post.category}</span>
              <span>{post.readingTime}</span>
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            </div>
            <h1>{post.title}</h1>
            <p>{post.excerpt}</p>
            <ShareButtons url={postUrl} title={post.title} locale="en" />
          </header>

          <AdSenseAd label="Article advertisement" variant="inArticle" />

          <div className="article-content">
            <BlogMarkdown content={post.content} />
          </div>

          <AdSenseAd label="Article advertisement" variant="inArticle" />

          <footer className="article-cta">
            <div>
              <p className="eyebrow">Use the product</p>
              <h2>Try the scanner and document workflows from this build story.</h2>
            </div>
            <Link className="button" href="/Cam_PDF_Scan_Signer_QR-Gen/">Explore Cam PDF</Link>
          </footer>

          <ShareButtons url={postUrl} title={post.title} locale="en" compact />

          <AdSenseAd label="Related content advertisement" variant="multiplex" />
        </article>
      </main>
      <SiteFooter locale="en" />
    </>
  );
}

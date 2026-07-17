import { notFound } from "next/navigation";
import SiteFooter from "../../../components/SiteFooter";
import SiteHeader from "../../../components/SiteHeader";
import { getPostBySlug } from "../../../lib/blogStore";

export const dynamic = "force-dynamic";

function formatDate(value) {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric"
  }).format(new Date(value));
}

function renderInline(text) {
  const parts = String(text).split(/(\[[^\]]+\]\([^)]+\))/g);

  return parts.map((part, index) => {
    const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (!match) {
      return part;
    }

    const [, label, href] = match;
    const isExternal = href.startsWith("http");
    return (
      <a
        href={href}
        key={`${href}-${index}`}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
      >
        {label}
      </a>
    );
  });
}

function renderContent(content) {
  const blocks = [];
  let listItems = [];

  function flushList() {
    if (!listItems.length) {
      return;
    }
    const items = listItems;
    listItems = [];
    blocks.push(
      <ul key={`list-${blocks.length}`}>
        {items.map((item) => (
          <li key={item}>{renderInline(item)}</li>
        ))}
      </ul>
    );
  }

  content.split("\n").forEach((line) => {
    const trimmed = line.trim();

    if (!trimmed) {
      flushList();
      return;
    }

    if (trimmed.startsWith("### ")) {
      flushList();
      blocks.push(<h3 key={`h3-${blocks.length}`}>{renderInline(trimmed.slice(4))}</h3>);
      return;
    }

    if (trimmed.startsWith("## ")) {
      flushList();
      blocks.push(<h2 key={`h2-${blocks.length}`}>{renderInline(trimmed.slice(3))}</h2>);
      return;
    }

    if (trimmed.startsWith("- ")) {
      listItems.push(trimmed.slice(2));
      return;
    }

    flushList();
    blocks.push(<p key={`p-${blocks.length}`}>{renderInline(trimmed)}</p>);
  });

  flushList();
  return blocks;
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
    en: `/blog/EN/${post.slug}/`
  };
  if (post.alternateSlugs?.th) {
    languages.th = `/blog/th/${post.alternateSlugs.th}/`;
  }

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    keywords: post.keywords,
    alternates: {
      canonical: `/blog/EN/${post.slug}/`,
      languages
    },
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      url: `/blog/EN/${post.slug}/`,
      siteName: "DJAI Academy",
      images: ["/djai-logo.webp"],
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author]
    }
  };
}

export default async function BlogPostPage({ params }) {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug, { locale: "en" });

  if (!post) {
    notFound();
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
      url: "https://djai.academy/",
      logo: {
        "@type": "ImageObject",
        url: "https://djai.academy/djai-logo.webp"
      }
    },
    mainEntityOfPage: `https://djai.academy/blog/EN/${post.slug}/`
  };

  return (
    <>
      <SiteHeader
        locale="en"
        currentRoute="blog"
        languageHref={post.alternateSlugs?.th ? `/blog/th/${post.alternateSlugs.th}/` : "/blog/th/"}
      />
      <main className="article-page">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <article className="article-shell">
          <header className="article-header">
            <a className="back-link" href="/blog/EN/">
              Back to blog
            </a>
            <div className="post-meta">
              <span>{post.category}</span>
              <span>{post.readingTime}</span>
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            </div>
            <h1>{post.title}</h1>
            <p>{post.excerpt}</p>
          </header>

          <div className="article-content">{renderContent(post.content)}</div>

          <footer className="article-cta">
            <div>
              <p className="eyebrow">Free DJAI tools</p>
              <h2>Use the tools from this tutorial.</h2>
            </div>
            <a className="button" href="https://djai.academy/tools/EN/">
              Open free tools
            </a>
          </footer>
        </article>
      </main>
      <SiteFooter locale="en" />
    </>
  );
}

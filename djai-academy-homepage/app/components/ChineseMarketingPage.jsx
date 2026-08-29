import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";
import { alternateFor, urlFor } from "../lib/i18n";

export function metadataForChinesePage(route, content) {
  const page = content[route];
  return {
    title: page.meta.title,
    description: page.meta.description,
    alternates: alternateFor(route === "seoTool" ? "seoTool" : route, content.locale),
    robots: page.indexable === false ? { index: false, follow: true } : undefined,
    openGraph: {
      title: page.meta.title,
      description: page.meta.description,
      url: urlFor(route === "seoTool" ? "seoTool" : route, content.locale),
      siteName: "DJAI Academy",
      images: ["/social/djai-academy.webp"],
      locale: content.locale.replace("-", "_"),
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: page.meta.title,
      description: page.meta.description,
      images: ["/social/djai-academy.webp"]
    }
  };
}

export default function ChineseMarketingPage({ route, content }) {
  const page = content[route];
  const currentRoute = route === "seoTool" ? "seoTool" : route;
  const pageUrl = urlFor(currentRoute, content.locale);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": route === "tools" ? "CollectionPage" : "WebPage",
    name: page.meta.title,
    description: page.meta.description,
    url: pageUrl,
    inLanguage: content.lang,
    isPartOf: {
      "@type": "WebSite",
      name: "DJAI Academy",
      url: "https://www.djai.academy/"
    }
  };

  return (
    <>
      <SiteHeader locale={content.locale} currentRoute={currentRoute} />
      <main className={`development-page chinese-marketing-page chinese-marketing-${route}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <section className="development-hero">
          <div>
            <p className="eyebrow">{page.hero.eyebrow}</p>
            <h1>{page.hero.title}</h1>
            <p>{page.hero.description}</p>
            <div className="development-actions">
              <a className="button primary" href={page.primary.href}>{page.primary.label}</a>
              <a className="button secondary dark" href={page.secondary.href}>{page.secondary.label}</a>
            </div>
          </div>
          <div className="development-proof-card" aria-label={page.hero.eyebrow}>
            <span>DJAI ACADEMY</span>
            <strong>{page.highlights[0]?.title}</strong>
            <p>{page.highlights[0]?.text}</p>
          </div>
        </section>

        <section className="development-section" aria-label={page.hero.eyebrow}>
          <div className="development-capability-grid">
            {page.highlights.map((highlight) => (
              <article className="development-capability-card" key={highlight.title}>
                <h2>{highlight.title}</h2>
                <p>{highlight.text}</p>
              </article>
            ))}
          </div>
        </section>

        {page.sections.map((section) => (
          <section className="development-section" key={section.title}>
            <div className="development-section-heading">
              <h2>{section.title}</h2>
              <p>{section.intro}</p>
            </div>
            {section.items.length > 0 && (
              <div className="development-capability-grid">
                {section.items.map((item) => (
                  <article className="development-capability-card" key={item.title}>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                    {item.href && <a href={item.href}>{item.title} <span aria-hidden="true">→</span></a>}
                  </article>
                ))}
              </div>
            )}
          </section>
        ))}

        <section className="development-cta">
          <div>
            <h2>{page.final.title}</h2>
            <p>{page.final.text}</p>
          </div>
          <a className="button primary" href={page.final.href}>{page.final.label}</a>
        </section>
      </main>
      <SiteFooter locale={content.locale} />
    </>
  );
}

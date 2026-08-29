import { ArrowRight, CheckCircle2 } from "lucide-react";
import CourseRegistrationLink from "./CourseRegistrationLink";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";
import { registrationUrlFor } from "./lib/courseRegistration";

export function chineseCourseMetadata(content, detail = false) {
  const path = `/course/${detail ? "detail/" : ""}${content.segment}/`;
  return {
    title: content.title,
    description: content.description,
    alternates: {
      canonical: path,
      languages: {
        th: `/course/${detail ? "detail/" : ""}`,
        en: `/course/${detail ? "detail/en/" : "en/"}`,
        vi: `/course/${detail ? "detail/vi/" : "vi/"}`,
        "zh-CN": `/course/${detail ? "detail/zh-cn/" : "zh-cn/"}`,
        "zh-TW": `/course/${detail ? "detail/zh-tw/" : "zh-tw/"}`,
        "x-default": `/course/${detail ? "detail/" : ""}`
      }
    },
    robots: { index: content.indexable, follow: true },
    openGraph: { title: content.title, description: content.description, url: path, images: ["/course/assets/community2-display.webp"], type: "website" }
  };
}

function Eyebrow({ children }) {
  return <div className="eyebrow"><span />{children}<span /></div>;
}

export default function ChineseCoursePage({ content, detail = false }) {
  const detailPath = `/course/detail/${content.segment}/`;
  const hubPath = `/course/${content.segment}/`;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: content.title,
    description: content.description,
    inLanguage: content.locale,
    provider: { "@type": "Organization", name: "DJAI Academy", url: "https://www.djai.academy/" },
    url: `https://www.djai.academy${detail ? detailPath : hubPath}`
  };

  return (
    <main id="home" className="site-shell course-detail-page" lang={content.locale}>
      <SiteHeader locale={content.locale} switchLanguageHref={content.locale === "zh-CN" ? `/course/${detail ? "detail/zh-tw/" : "zh-tw/"}` : `/course/${detail ? "detail/zh-cn/" : "zh-cn/"}`} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <section className="detail-hero">
        <img src="/course/assets/community2-display.webp" alt={content.locale === "zh-CN" ? "DJAI Academy AI 实战工作坊" : "DJAI Academy AI 實戰工作坊"} />
        <div className="detail-hero-shade" />
        <div className="detail-hero-content">
          <div className="pill"><span className="pulse-dot" />{content.hero.pill}</div>
          <span className="detail-kicker">{content.hero.eyebrow}</span>
          <h1>{content.hero.title}</h1>
          <p>{content.hero.copy}</p>
          <div className="hero-actions">
            <CourseRegistrationLink locale={content.locale}>{content.hero.primary} <ArrowRight size={18} /></CourseRegistrationLink>
            <a className="button button-ghost" href={detail ? "#curriculum" : detailPath}>{content.hero.secondary}</a>
          </div>
          <p className="account-entry-note">{content.notice}</p>
        </div>
      </section>

      <section className="section detail-section">
        <Eyebrow>{content.locale === "zh-CN" ? "学习方式" : "學習方式"}</Eyebrow>
        <div className="detail-curriculum-grid">
          {content.highlights.map(([title, copy]) => <article className="detail-curriculum-card" key={title}><h3>{title}</h3><p>{copy}</p></article>)}
        </div>
      </section>

      <section id="curriculum" className="detail-curriculum-band">
        <div className="section detail-section">
          <Eyebrow>CURRICULUM</Eyebrow>
          <div className="section-heading centered"><h2>{content.curriculumTitle}</h2><p>{content.curriculumIntro}</p></div>
          <div className="detail-curriculum-grid">
            {content.curriculum.map(([part, title, points]) => (
              <article className="detail-curriculum-card" key={part}>
                <div className="detail-card-heading"><span>{part}</span></div><h3>{title}</h3>
                <ul>{points.map((point) => <li key={point}><CheckCircle2 size={17} />{point}</li>)}</ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section detail-section">
        <Eyebrow>OUTCOMES</Eyebrow>
        <div className="section-heading centered"><h2>{content.outcomesTitle}</h2></div>
        <div className="detail-curriculum-grid">
          {content.outcomes.map((outcome) => <article className="detail-curriculum-card" key={outcome}><h3><CheckCircle2 size={20} /> {outcome}</h3></article>)}
        </div>
      </section>

      <section className="section detail-cta">
        <div><span>{content.pricingTitle}</span><h2>{content.ctaTitle}</h2><p>{content.pricing}</p><p>{content.ctaCopy}</p></div>
        <div className="detail-cta-action">
          <CourseRegistrationLink locale={content.locale}>{content.cta} <ArrowRight size={18} /></CourseRegistrationLink>
          <a className="detail-account-login" href={registrationUrlFor("login", content.locale)}>{content.login}</a>
        </div>
      </section>

      <SiteFooter locale={content.locale} />
      <a className="scroll-top" href="#home" aria-label={content.top}><ArrowRight size={20} /></a>
    </main>
  );
}

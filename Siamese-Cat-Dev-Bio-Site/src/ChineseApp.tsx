import { ArrowRight, ArrowUpRight, Code2, Layers3, MessageCircle, Rocket, Sparkles } from 'lucide-react';
import { useEffect } from 'react';
import zhCN from './locales/zh-CN';
import zhTW from './locales/zh-TW';
import catalog from './courses-data.json';
import './courses.css';

type Locale = typeof zhCN;
const root = '/siamese_cat/dev';
const asset = (name: string) => `${import.meta.env.BASE_URL}${name}`;

function setMetadata(locale: Locale, canonical: string, title: string, description: string) {
  document.documentElement.lang = locale.locale;
  document.title = title;
  document.querySelector('meta[name="description"]')?.setAttribute('content', description);
  document.querySelector('link[rel="canonical"]')?.setAttribute('href', canonical);
  document.querySelector('meta[name="robots"]')?.setAttribute('content', 'noindex, follow');
}

function Header({ locale }: { locale: Locale }) {
  const other = locale.segment === 'zh-cn' ? 'zh-tw' : 'zh-cn';
  return <header className="catalog-header"><div className="catalog-header-inner"><a className="catalog-brand" href={`${root}/${locale.segment}/`}><img src={asset('siamese-cat-dev-wordmark.webp')} alt="Siamese Cat Dev" /></a><nav className="catalog-desktop-nav"><a href={`${root}/${locale.segment}/`}>{locale.segment === 'zh-tw' ? '關於' : '关于'}</a><a href={`${root}/courses/${locale.segment}/`}>{locale.segment === 'zh-tw' ? '課程' : '课程'}</a><a href={`${root}/${other}/`}>{locale.switchLabel}</a><a href={`/${locale.segment}/`}>DJAI Academy</a></nav></div></header>;
}

function Footer({ locale }: { locale: Locale }) {
  return <footer className="catalog-footer"><div className="catalog-footer-main"><div className="catalog-footer-brand"><img src={asset('siamese-cat-dev-wordmark.webp')} alt="Siamese Cat Dev" /><p>{locale.bioDescription}</p></div><a className="catalog-button catalog-button-primary" href={`https://www.djai.academy/development/${locale.segment}/`}>{locale.cta}<ArrowRight /></a></div></footer>;
}

function Bio({ locale }: { locale: Locale }) {
  const canonical = `https://www.djai.academy${root}/${locale.segment}/`;
  useEffect(() => setMetadata(locale, canonical, locale.bioTitle, locale.bioDescription), [canonical, locale]);
  return <div className="catalog-page"><Header locale={locale} /><main id="top"><section className="catalog-hero"><div><p className="catalog-kicker">PRODUCT · DEVELOPMENT · VIBE CODING</p><h1>{locale.greeting}<br /><em>Siamese Cat Dev</em></h1><p>{locale.hero}</p><div className="catalog-hero-actions"><a className="catalog-button catalog-button-primary" href={`https://www.djai.academy/development/${locale.segment}/`}>{locale.cta}<ArrowUpRight /></a><a className="catalog-button" href={`${root}/courses/${locale.segment}/`}>{locale.catalogCta}<ArrowRight /></a></div></div><img src={asset('siamese-cat-dev-character.webp')} alt="Siamese Cat Dev" /></section><section className="catalog-section"><p className="catalog-kicker">01</p><h2>{locale.aboutTitle}</h2><p>{locale.about}</p></section><section className="catalog-course-grid">{locale.work.map((item, index) => <article className="catalog-course-card" key={item}>{index === 0 ? <Layers3 /> : index === 1 ? <Code2 /> : index === 2 ? <Sparkles /> : <Rocket />}<h3>{item}</h3></article>)}</section></main><Footer locale={locale} /></div>;
}

function CourseCampaign({ locale }: { locale: Locale }) {
  const canonical = `https://www.djai.academy${root}/course/${locale.segment}/`;
  useEffect(() => setMetadata(locale, canonical, locale.courseTitle, locale.courseText), [canonical, locale]);
  return <div className="catalog-page"><Header locale={locale} /><main><section className="catalog-hero"><div><p className="catalog-kicker">FREE LIVE ENGLISH COURSE · 22 AUGUST 2026</p><h1>{locale.courseTitle}</h1><p>{locale.courseText}</p><a className="catalog-button catalog-button-primary" href={`/MONEY_MAKING_PRODUCT/?lang=${locale.segment}`}>{locale.courseCta}<ArrowRight /></a></div></section><section className="catalog-section"><h2>{locale.segment === 'zh-tw' ? '從 Prompt 到 Production' : '从 Prompt 到 Production'}</h2><p>{locale.segment === 'zh-tw' ? '選擇有價值的產品方向，運用專業軟體開發標準強化 MVP，並規劃務實的發布流程。' : '选择有价值的产品方向，用专业软件开发标准强化 MVP，并规划务实的发布流程。'}</p></section></main><Footer locale={locale} /></div>;
}

function Courses({ locale, slug }: { locale: Locale; slug?: string }) {
  const course = slug ? catalog.courses.find((item) => item.slug === slug) : undefined;
  const title = course ? locale.courseNames[course.slug] : locale.catalogTitle;
  const description = course ? `${title}：${course.promise}` : locale.catalogText;
  const canonical = `https://www.djai.academy${root}/courses/${course ? `${course.slug}/` : ''}${locale.segment}/`;
  useEffect(() => setMetadata(locale, canonical, title, description), [canonical, description, locale, title]);
  const whatsapp = `https://wa.me/66804803802?text=${encodeURIComponent(`Hi Siamese Cat Dev, I would like to check a trial class for ${course?.title || 'an English course'}.`)}`;
  if (course) return <div className="catalog-page"><Header locale={locale} /><main><section className="catalog-hero"><div><p className="catalog-kicker">ENGLISH COURSE · {course.level}</p><h1>{title}</h1><p>{course.heroLead}</p><a className="catalog-button catalog-button-primary" href={whatsapp}><MessageCircle />{locale.trial}</a><a className="catalog-button" href={`${root}/courses/${locale.segment}/`}>{locale.back}</a></div></section><section className="catalog-section"><h2>{course.practiceHeading}</h2><p>{course.practiceLead}</p></section></main><Footer locale={locale} /></div>;
  return <div className="catalog-page"><Header locale={locale} /><main><section className="catalog-hero"><div><p className="catalog-kicker">BUILD WITH AI · UNDERSTAND THE WORK</p><h1>{locale.catalogTitle}</h1><p>{locale.catalogText}</p><a className="catalog-button catalog-button-primary" href={whatsapp}><MessageCircle />{locale.trial}</a></div></section><section className="catalog-course-grid">{catalog.courses.map((item) => <a className="catalog-course-card" href={`${root}/courses/${item.slug}/${locale.segment}/`} key={item.slug}><h2>{locale.courseNames[item.slug]}</h2><p>{item.cardDescription}</p><span>{locale.courseCta}<ArrowRight /></span></a>)}</section></main><Footer locale={locale} /></div>;
}

export default function ChineseApp({ locale }: { locale: 'zh-CN' | 'zh-TW' }) {
  const copy = locale === 'zh-TW' ? zhTW : zhCN;
  const path = window.location.pathname.toLowerCase();
  if (path.includes('/course/')) return <CourseCampaign locale={copy} />;
  if (path.includes('/courses/')) {
    const slug = catalog.courses.find((item) => path.includes(`/${item.slug}/`))?.slug;
    return <Courses locale={copy} slug={slug} />;
  }
  return <Bio locale={copy} />;
}

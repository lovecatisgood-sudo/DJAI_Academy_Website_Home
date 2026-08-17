import {
  ArrowRight,
  Bot,
  Check,
  Code2,
  Gamepad2,
  Layers3,
  ListChecks,
  Map as MapIcon,
  Menu,
  MessageCircle,
  RefreshCw,
  Rocket,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  Target,
  X,
} from 'lucide-react';
import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { HeaderSocialLinks } from './SocialLinks';
import catalog from './courses-data.json';
import './courses.css';

const SITE_ROOT = 'https://www.djai.academy';
const DEV_ROOT = '/siamese_cat/dev';
const HUB_PATH = `${DEV_ROOT}/courses/`;
const WHATSAPP_BASE = 'https://wa.me/66804803802';
const assetPath = (path: string) => `${import.meta.env.BASE_URL}${path}`;

type Course = (typeof catalog.courses)[number];
type IconName =
  | 'Bot'
  | 'Code2'
  | 'Gamepad2'
  | 'Layers3'
  | 'ListChecks'
  | 'Map'
  | 'RefreshCw'
  | 'Rocket'
  | 'SearchCheck'
  | 'ShieldCheck'
  | 'Sparkles'
  | 'Target';

const iconMap = {
  Bot,
  Code2,
  Gamepad2,
  Layers3,
  ListChecks,
  Map: MapIcon,
  RefreshCw,
  Rocket,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  Target,
} satisfies Record<IconName, typeof Code2>;

type GtagWindow = Window & {
  gtag?: (...args: unknown[]) => void;
};

function coursePath(course: Course) {
  return `${HUB_PATH}${course.slug}/`;
}

function whatsappHref(courseTitle?: string) {
  const course = courseTitle || 'one of the English courses';
  const message = `Hi Siamese Cat Dev, I would like to check a 30-minute trial class for ${course}. My preferred times are `;
  return `${WHATSAPP_BASE}?text=${encodeURIComponent(message)}`;
}

function trackWhatsAppClick(course: Course | undefined, placement: string) {
  const gtag = (window as GtagWindow).gtag;
  gtag?.('event', 'course_trial_whatsapp_click', {
    course_slug: course?.slug || 'course-hub',
    placement,
    destination: 'whatsapp',
  });
}

function CourseIcon({ name, size = 24 }: { name: string; size?: number }) {
  const Icon = iconMap[name as IconName] || Code2;
  return <Icon aria-hidden="true" size={size} strokeWidth={1.8} />;
}

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: '-8% 0px' }}
      transition={{ duration: 0.62, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

function WhatsAppButton({
  course,
  placement,
  className = '',
}: {
  course?: Course;
  placement: string;
  className?: string;
}) {
  const label = course ? `Check a trial slot for ${course.title} on WhatsApp` : 'Check a trial slot on WhatsApp';
  return (
    <a
      className={`catalog-button catalog-button-primary ${className}`}
      href={whatsappHref(course?.title)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onClick={() => trackWhatsAppClick(course, placement)}
    >
      <MessageCircle aria-hidden="true" size={18} />
      <span>Check a trial slot</span>
    </a>
  );
}

function CourseHeader({ course }: { course?: Course }) {
  const [open, setOpen] = useState(false);
  const nav = course
    ? [
        ['Course plan', '#course-plan'],
        ['Who it is for', '#fit'],
        ['Other courses', '#other-courses'],
        ['Siamese Cat Dev', `${DEV_ROOT}/en/`],
      ]
    : [
        ['Courses', '#courses'],
        ['How it works', '#how-it-works'],
        ['Siamese Cat Dev', `${DEV_ROOT}/en/`],
        ['Blog', `${DEV_ROOT}/blog/en/`],
      ];

  const closeMenu = () => setOpen(false);

  return (
    <header className="catalog-header">
      <div className="catalog-header-inner">
        <a className="catalog-brand" href={`${DEV_ROOT}/en/`} aria-label="Siamese Cat Dev home">
          <img src={assetPath('siamese-cat-dev-wordmark.webp')} alt="Siamese Cat Dev" />
          <span>Courses</span>
        </a>
        <nav className="catalog-desktop-nav" aria-label="Course navigation">
          {nav.map(([label, href]) => (
            <a key={label} href={href} onClick={closeMenu}>
              {label}
            </a>
          ))}
        </nav>
        <div className="catalog-header-actions">
          <HeaderSocialLinks language="en" />
          <WhatsAppButton course={course} placement="header" className="catalog-header-cta" />
          <button
            className="catalog-menu-button"
            type="button"
            aria-label={open ? 'Close course navigation' : 'Open course navigation'}
            aria-expanded={open}
            aria-controls="catalog-mobile-navigation"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
        <nav
          className={`catalog-mobile-nav ${open ? 'is-open' : ''}`}
          id="catalog-mobile-navigation"
          aria-label="Mobile course navigation"
        >
          {nav.map(([label, href]) => (
            <a key={label} href={href} onClick={closeMenu}>
              {label}
              <ArrowRight aria-hidden="true" size={16} />
            </a>
          ))}
          <WhatsAppButton course={course} placement="mobile-header" />
        </nav>
      </div>
    </header>
  );
}

function CatalogFooter({ course }: { course?: Course }) {
  return (
    <footer className="catalog-footer">
      <div className="catalog-footer-main">
        <div className="catalog-footer-brand">
          <img src={assetPath('siamese-cat-dev-wordmark.webp')} alt="Siamese Cat Dev" />
          <p>English courses for people who want to build with AI and understand the work behind the result.</p>
        </div>
        <div className="catalog-footer-links">
          <a href={HUB_PATH}>All courses</a>
          <a href={`${DEV_ROOT}/blog/en/`}>Siamese Cat Dev Blog</a>
          <a href={`${DEV_ROOT}/en/`}>About Siamese Cat Dev</a>
          <a href="https://www.djai.academy/en/" target="_blank" rel="noopener noreferrer">DJAI Academy</a>
        </div>
        <WhatsAppButton course={course} placement="footer" />
      </div>
      <div className="catalog-footer-bottom">
        <span>Teaching in English. Trial-class times are arranged on WhatsApp.</span>
        <a href="#top">Back to top <ArrowRight aria-hidden="true" size={15} /></a>
      </div>
    </footer>
  );
}

function PageFrame({ children, course }: { children: ReactNode; course?: Course }) {
  return (
    <div className={`catalog-page ${course ? `catalog-page-${course.slug}` : 'catalog-page-hub'}`} style={course ? ({ '--course-accent': course.accent } as CSSProperties) : undefined}>
      <CourseHeader course={course} />
      {children}
      <CatalogFooter course={course} />
    </div>
  );
}

function CourseCard({ course, featured = false }: { course: Course; featured?: boolean }) {
  return (
    <article className={`catalog-course-card ${featured ? 'is-featured' : ''}`} style={{ '--course-accent': course.accent } as CSSProperties}>
      <div className="catalog-course-card-top">
        <span>{course.level}</span>
        <span className="catalog-card-icon"><CourseIcon name={course.icon} size={22} /></span>
      </div>
      <h3><a href={coursePath(course)}>{course.title}</a></h3>
      <p>{course.cardDescription}</p>
      <div className="catalog-course-card-bottom">
        <span>English instruction</span>
        <a href={coursePath(course)} aria-label={`See ${course.title} course details`}>
          See course <ArrowRight aria-hidden="true" size={16} />
        </a>
      </div>
    </article>
  );
}

function FaqSection({ items }: { items: readonly { question: string; answer: string }[] }) {
  return (
    <section className="catalog-section catalog-faq" aria-labelledby="faq-heading">
      <div className="catalog-section-heading">
        <h2 id="faq-heading">Questions before you start</h2>
        <p>A short conversation is usually the fastest way to choose the right starting point.</p>
      </div>
      <div className="catalog-faq-list">
        {items.map((item) => (
          <details key={item.question}>
            <summary>{item.question}<span aria-hidden="true">+</span></summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function HubPage() {
  const { hub, courses } = catalog;
  return (
    <PageFrame>
      <main id="top">
        <section className="catalog-hero catalog-hub-hero">
          <div className="catalog-hero-copy">
            <p className="catalog-eyebrow">{hub.eyebrow}</p>
            <h1>{hub.heading}</h1>
            <p className="catalog-hero-lead">{hub.lead}</p>
            <div className="catalog-actions">
              <WhatsAppButton placement="hub-hero" />
              <a className="catalog-button catalog-button-secondary" href="#courses">Choose a course <ArrowRight aria-hidden="true" size={17} /></a>
            </div>
          </div>
          <div className="catalog-hero-visual">
            <div className="catalog-visual-grid" aria-hidden="true" />
            <div className="catalog-visual-label">PLAN / BUILD / CHECK</div>
            <img src={assetPath('siamese-cat-dev-character.webp')} alt="Siamese Cat Dev character building with AI" />
            <div className="catalog-visual-caption">Build something small. Learn what makes it work.</div>
          </div>
        </section>

        <section className="catalog-trust-line" aria-label="Course details">
          <div><strong>English</strong><span>Teaching language</span></div>
          <div><strong>30 minutes</strong><span>Trial class to find your starting point</span></div>
          <div><strong>By Siamese Cat Dev</strong><span>Project-led learning</span></div>
        </section>

        <section className="catalog-section catalog-course-map" id="courses" aria-labelledby="course-map-heading">
          <div className="catalog-section-heading">
            <h2 id="course-map-heading">{hub.sectionHeading}</h2>
            <p>{hub.sectionLead}</p>
          </div>
          <div className="catalog-course-grid">
            <Reveal className="catalog-course-grid-featured">
              <CourseCard course={courses[0]} featured />
            </Reveal>
            <Reveal delay={0.08}>
              <CourseCard course={courses[1]} />
            </Reveal>
            <Reveal delay={0.16}>
              <CourseCard course={courses[2]} />
            </Reveal>
          </div>
        </section>

        <section className="catalog-trial-band" id="trial" aria-labelledby="trial-heading">
          <div>
            <h2 id="trial-heading">{hub.trialHeading}</h2>
            <p>{hub.trialLead}</p>
            <small>{hub.trialNote}</small>
          </div>
          <WhatsAppButton placement="hub-trial" />
        </section>

        <section className="catalog-section catalog-method" id="how-it-works" aria-labelledby="method-heading">
          <div className="catalog-section-heading">
            <h2 id="method-heading">{hub.methodHeading}</h2>
            <p>{hub.methodLead}</p>
          </div>
          <div className="catalog-method-grid">
            {hub.method.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.06} className="catalog-method-item">
                <span className="catalog-method-icon"><CourseIcon name={item.icon} /></span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <FaqSection items={hub.faq} />
      </main>
    </PageFrame>
  );
}

function CourseDetailPage({ course }: { course: Course }) {
  const relatedCourses = catalog.courses.filter((item) => item.slug !== course.slug);
  return (
    <PageFrame course={course}>
      <main id="top">
        <section className="catalog-hero catalog-detail-hero">
          <div className="catalog-hero-copy">
            <nav className="catalog-breadcrumbs" aria-label="Breadcrumb">
              <a href={HUB_PATH}>Courses</a>
              <span aria-hidden="true">/</span>
              <span>{course.title}</span>
            </nav>
            <p className="catalog-eyebrow">{course.heroEyebrow}</p>
            <h1>{course.title}</h1>
            <p className="catalog-hero-lead">{course.heroLead}</p>
            <div className="catalog-actions">
              <WhatsAppButton course={course} placement="detail-hero" />
              <a className="catalog-button catalog-button-secondary" href="#course-plan">See the course plan <ArrowRight aria-hidden="true" size={17} /></a>
            </div>
          </div>
          <div className="catalog-hero-visual">
            <div className="catalog-visual-grid" aria-hidden="true" />
            <div className="catalog-visual-label">{course.level.toUpperCase()}</div>
            <img src={assetPath('siamese-cat-dev-character.webp')} alt={course.heroAlt} />
            <div className="catalog-outcome-card">
              <span>{course.outcomeLabel}</span>
              <strong>{course.outcome}</strong>
            </div>
          </div>
        </section>

        <section className="catalog-trust-line" aria-label="Course details">
          <div><strong>{course.level}</strong><span>Starting point</span></div>
          <div><strong>English</strong><span>Teaching language</span></div>
          <div><strong>30-minute trial</strong><span>Check the next available slot</span></div>
        </section>

        <section className="catalog-section catalog-course-overview" aria-labelledby="overview-heading">
          <div className="catalog-section-heading">
            <h2 id="overview-heading">{course.promiseHeading}</h2>
            <p>{course.promise}</p>
          </div>
          <div className="catalog-overview-detail">
            <p>{course.details}</p>
            <a href="#trial">How the trial class works <ArrowRight aria-hidden="true" size={17} /></a>
          </div>
        </section>

        <section className="catalog-section catalog-practice" id="course-plan" aria-labelledby="practice-heading">
          <div className="catalog-section-heading">
            <h2 id="practice-heading">{course.practiceHeading}</h2>
            <p>{course.practiceLead}</p>
          </div>
          <div className="catalog-practice-grid">
            {course.practice.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.06} className="catalog-practice-card">
                <span className="catalog-practice-icon"><CourseIcon name={item.icon} /></span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="catalog-section catalog-fit" id="fit" aria-labelledby="fit-heading">
          <div className="catalog-section-heading">
            <h2 id="fit-heading">{course.fitHeading}</h2>
            <p>{course.fitLead}</p>
          </div>
          <ul className="catalog-check-list">
            {course.fit.map((item) => (
              <li key={item}><Check aria-hidden="true" size={18} />{item}</li>
            ))}
          </ul>
        </section>

        <section className="catalog-trial-band" id="trial" aria-labelledby="detail-trial-heading">
          <div>
            <h2 id="detail-trial-heading">Try the right starting point</h2>
            <p>Tell us what you want to build and when you are available. Message on WhatsApp to check a 30-minute trial class for this course.</p>
            <small>Teaching is in English. The trial class is arranged directly with Siamese Cat Dev.</small>
          </div>
          <WhatsAppButton course={course} placement="detail-trial" />
        </section>

        <section className="catalog-section catalog-related" id="other-courses" aria-labelledby="related-heading">
          <div className="catalog-section-heading">
            <h2 id="related-heading">Choose a different starting point</h2>
            <p>Not every learner needs the same first project. Compare the other courses before you book.</p>
          </div>
          <div className="catalog-related-grid">
            {relatedCourses.map((related) => <CourseCard key={related.slug} course={related} />)}
          </div>
        </section>

        <FaqSection items={course.faq} />
      </main>
    </PageFrame>
  );
}

export function getCourseFromPath(pathname: string) {
  const parts = pathname.split('/').filter(Boolean);
  const coursesIndex = parts.lastIndexOf('courses');
  const slug = coursesIndex >= 0 ? parts[coursesIndex + 1] : undefined;
  return catalog.courses.find((course) => course.slug === slug);
}

export function getCourseSchema(course?: Course) {
  const organization = {
    '@type': 'Organization',
    '@id': `${SITE_ROOT}/siamese_cat/dev/#organization`,
    name: 'Siamese Cat Dev',
    url: `${SITE_ROOT}${DEV_ROOT}/`,
    logo: `${SITE_ROOT}${DEV_ROOT}/siamese-cat-dev-logo.webp`,
  };

  if (!course) {
    const canonical = catalog.hub.canonical;
    return {
      '@context': 'https://schema.org',
      '@graph': [
        organization,
        {
          '@type': 'CollectionPage',
          '@id': `${canonical}#webpage`,
          name: catalog.hub.title,
          description: catalog.hub.description,
          url: canonical,
          inLanguage: 'en',
          mainEntity: { '@id': `${canonical}#course-list` },
        },
        {
          '@type': 'ItemList',
          '@id': `${canonical}#course-list`,
          name: 'Siamese Cat Dev English courses',
          itemListElement: catalog.courses.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.title,
            url: `${SITE_ROOT}${coursePath(item)}`,
          })),
        },
      ],
    };
  }

  const canonical = course.canonical;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      organization,
      {
        '@type': 'Course',
        '@id': `${canonical}#course`,
        name: course.title,
        description: course.promise,
        url: canonical,
        provider: { '@id': `${SITE_ROOT}${DEV_ROOT}/#organization` },
        educationalLevel: course.level,
        inLanguage: 'en',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Siamese Cat Dev', item: `${SITE_ROOT}${DEV_ROOT}/en/` },
          { '@type': 'ListItem', position: 2, name: 'Courses', item: `${SITE_ROOT}${HUB_PATH}` },
          { '@type': 'ListItem', position: 3, name: course.title, item: canonical },
        ],
      },
    ],
  };
}

function applyPageMetadata(course?: Course) {
  const page = course || catalog.hub;
  document.documentElement.lang = 'en';
  document.title = course?.metaTitle || catalog.hub.title;
  document.querySelector('meta[name="description"]')?.setAttribute('content', course?.metaDescription || catalog.hub.description);
  document.querySelector('link[rel="canonical"]')?.setAttribute('href', page.canonical);
  document.querySelector('meta[property="og:type"]')?.setAttribute('content', 'website');
  document.querySelector('meta[property="og:title"]')?.setAttribute('content', course?.metaTitle || catalog.hub.title);
  document.querySelector('meta[property="og:description"]')?.setAttribute('content', course?.metaDescription || catalog.hub.description);
  document.querySelector('meta[property="og:url"]')?.setAttribute('content', page.canonical);
  document.querySelector('meta[property="og:image"]')?.setAttribute('content', page.ogImage);
  document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', course?.metaTitle || catalog.hub.title);
  document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', course?.metaDescription || catalog.hub.description);
  document.querySelector('meta[name="twitter:image"]')?.setAttribute('content', page.ogImage);
  document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((link) => link.remove());
  const structuredData = document.querySelector('script[type="application/ld+json"]');
  if (structuredData) structuredData.textContent = JSON.stringify(getCourseSchema(course));
}

export default function CoursesApp() {
  const course = getCourseFromPath(window.location.pathname);

  useEffect(() => {
    applyPageMetadata(course);
  }, [course]);

  return course ? <CourseDetailPage course={course} /> : <HubPage />;
}

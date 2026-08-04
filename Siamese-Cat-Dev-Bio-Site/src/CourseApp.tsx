import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Check,
  Clock3,
  Code2,
  ExternalLink,
  Globe2,
  Lightbulb,
  Rocket,
  Target,
  Users,
  Video,
} from 'lucide-react';
import { useEffect } from 'react';
import './course.css';

const assetPath = (path: string) => `${import.meta.env.BASE_URL}${path}`;
const registrationPath = '/MONEY_MAKING_PRODUCT/';

const lessons = [
  {
    icon: <Target aria-hidden="true" />,
    title: 'Choose a product people will pay for',
    copy: 'Start with a real audience, a painful problem, and a clear commercial outcome—not a feature list looking for a market.',
  },
  {
    icon: <Code2 aria-hidden="true" />,
    title: 'Apply professional development standards',
    copy: 'Use practical product, architecture, quality, security, and release thinking so your AI-assisted build can survive beyond the demo.',
  },
  {
    icon: <Rocket aria-hidden="true" />,
    title: 'Move from MVP to a shippable product',
    copy: 'Understand what changes after the first prototype: validation, hardening, onboarding, pricing, distribution, support, and iteration.',
  },
  {
    icon: <Lightbulb aria-hidden="true" />,
    title: 'Turn your next idea into a plan',
    copy: 'Bring your idea or your current roadblock. You will have a chance to ask the trainers what to build next and how to approach it.',
  },
];

const agenda = [
  ['00–10 min', 'Why promising vibe-coded MVPs fail to become commercial products'],
  ['10–25 min', 'How experienced product teams decide what is worth building'],
  ['25–40 min', 'The software-development standards that matter when AI writes the code'],
  ['40–50 min', 'A practical rollout path: validate, ship, reach users, learn, and improve'],
  ['50–60 min', 'Live Q&A and direct guidance on your next money-making product idea'],
];

function CourseHeader() {
  return (
    <header className="course-header">
      <a className="course-brand" href="/siamese_cat/dev/en/" aria-label="Siamese Cat Dev home">
        <img src={assetPath('siamese-cat-dev-wordmark.webp')} alt="Siamese Cat Dev" />
      </a>
      <nav aria-label="Course navigation">
        <a href="#curriculum">What you will learn</a>
        <a href="#trainers">Your trainers</a>
        <a className="course-nav-cta" href={registrationPath}>Register free</a>
      </nav>
    </header>
  );
}

function EventFacts() {
  return (
    <dl className="event-facts" aria-label="Live course details">
      <div><CalendarDays aria-hidden="true" /><dt>Date</dt><dd>22 August 2026</dd></div>
      <div><Clock3 aria-hidden="true" /><dt>Time</dt><dd>1:00–2:00 PM ICT</dd></div>
      <div><Video aria-hidden="true" /><dt>Format</dt><dd>Live online session</dd></div>
      <div><Globe2 aria-hidden="true" /><dt>Language</dt><dd>English</dd></div>
    </dl>
  );
}

function CourseApp() {
  useEffect(() => {
    document.documentElement.lang = 'en';
    document.title = 'Vibe Code a Money-Making Product | Free Live Course';
    document.querySelector('meta[name="description"]')?.setAttribute(
      'content',
      'Join a free one-hour live English course on 22 August 2026 and learn how to turn a vibe-coded MVP into a product that can be shipped and sold.',
    );
    document.querySelector('link[rel="canonical"]')?.setAttribute(
      'href',
      'https://www.djai.academy/siamese_cat/dev/course/',
    );
  }, []);

  return (
    <div className="course-page">
      <CourseHeader />
      <main>
        <section className="course-hero" id="top">
          <div className="course-grid" aria-hidden="true" />
          <div className="course-hero-copy">
            <p className="course-kicker"><span>FREE LIVE COURSE</span> SIAMESE CAT DEV × DJAI ACADEMY</p>
            <h1>VIBE CODE A PRODUCT THAT CAN <em>MAKE MONEY.</em></h1>
            <p className="course-lead">
              Building an MVP is easier than ever. Building something reliable, useful, and commercially ready is still hard. Learn how experienced product builders move from an AI-generated prototype to a product people can actually use—and pay for.
            </p>
            <div className="course-actions">
              <a className="course-button course-button-primary" href={registrationPath}>
                Learn more &amp; register free <ArrowRight aria-hidden="true" />
              </a>
              <a className="course-button course-button-secondary" href="#curriculum">See the one-hour agenda</a>
            </div>
            <p className="course-account-note"><BadgeCheck aria-hidden="true" /> Free DJAI School account required. Complete the learner survey once, then confirm your seat.</p>
          </div>
          <div className="course-hero-visual">
            <div className="course-mascot-orbit" aria-hidden="true"><span>IDEA</span><span>BUILD</span><span>SHIP</span><span>SELL</span></div>
            <img src={assetPath('siamese-cat-dev-character.webp')} alt="Siamese Cat Dev building software on a laptop" />
            <div className="course-price-card"><span>YOUR INVESTMENT</span><strong>1 HOUR</strong><b>FREE</b></div>
          </div>
          <EventFacts />
        </section>

        <section className="course-problem">
          <div>
            <p className="course-section-label">THE REAL GAP</p>
            <h2>YOU MADE AN MVP.<br />WHY ISN'T IT A <em>PRODUCT?</em></h2>
          </div>
          <div className="course-problem-copy">
            <p>Many people learn vibe coding. Far fewer ship software that is dependable enough for real customers or commercial use.</p>
            <p>The usual roadblock appears after the first exciting prototype: unclear audience, weak product decisions, fragile architecture, no quality process, no rollout strategy, and no reliable path to revenue.</p>
            <p>Knowing <strong>what to build, for whom, and why</strong> matters more than generating more code. This session gives you the product and software-development thinking that AI tools cannot choose for you.</p>
          </div>
        </section>

        <section className="course-curriculum" id="curriculum">
          <div className="course-section-heading">
            <p className="course-section-label">WHAT YOU WILL LEARN</p>
            <h2>FROM PROMPTING<br />TO <em>PRODUCTION.</em></h2>
            <p>No hype and no tool parade. This is a focused working session about making better product decisions and shipping responsibly.</p>
          </div>
          <div className="lesson-grid">
            {lessons.map((lesson, index) => (
              <article key={lesson.title}>
                <div className="lesson-number">0{index + 1}</div>
                <span className="lesson-icon">{lesson.icon}</span>
                <h3>{lesson.title}</h3>
                <p>{lesson.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="course-agenda">
          <div className="course-section-heading">
            <p className="course-section-label">ONE REAL HOUR</p>
            <h2>ZERO FLUFF.<br /><em>STRAIGHT TO THE WORK.</em></h2>
          </div>
          <ol>
            {agenda.map(([time, item]) => (
              <li key={time}><time>{time}</time><span>{item}</span></li>
            ))}
          </ol>
        </section>

        <section className="course-trainers" id="trainers">
          <div className="trainer-portrait">
            <img src={assetPath('siamese-cat-dev-logo.webp')} alt="Siamese Cat Dev logo" loading="lazy" />
          </div>
          <div className="trainer-copy">
            <p className="course-section-label">LEARN FROM ACTIVE BUILDERS</p>
            <h2>BUILT IN PRACTICE.<br /><em>TAUGHT FROM EXPERIENCE.</em></h2>
            <p>Siamese Cat Dev has spent more than a decade across product design, project management, software development, and development-team leadership—including work inside multi-million-dollar software businesses.</p>
            <p>Today, building with AI is daily work: shipping client products, open-source tools, games, community utilities, and learning systems. The goal is not to produce more demos. It is to apply professional standards so AI-assisted software can support real users and serious production.</p>
            <div className="trainer-pair">
              <div><strong>Siamese Cat Dev</strong><span>Product builder, development lead &amp; vibe coder</span></div>
              <div><strong>Mr. A</strong><span>Experienced CTO &amp; technical product leader</span></div>
            </div>
          </div>
        </section>

        <section className="course-fit">
          <div>
            <p className="course-section-label">THIS SESSION IS FOR YOU IF</p>
            <h2>YOU ARE TIRED OF BUILDING<br />WITHOUT A PATH TO <em>REVENUE.</em></h2>
          </div>
          <ul>
            {[
              'You can make prototypes but struggle to finish and launch them.',
              'You have too many ideas and cannot decide which one has commercial potential.',
              'Your AI-generated code works in a demo but feels unsafe or difficult to maintain.',
              'You want a practical product and rollout strategy—not another list of prompts.',
              'You want direct feedback from people who build and manage software products professionally.',
            ].map((item) => <li key={item}><Check aria-hidden="true" />{item}</li>)}
          </ul>
        </section>

        <section className="course-register" id="register">
          <div className="course-register-card">
            <div>
              <p className="course-section-label">YOUR NEXT PRODUCT STARTS HERE</p>
              <h2>GIVE US ONE HOUR.<br /><em>LEAVE WITH A CLEARER PATH.</em></h2>
              <p>Register with a free DJAI School account. New members complete the learner survey once, confirm the course registration, and receive the session details by email.</p>
            </div>
            <EventFacts />
            <a className="course-button course-button-primary" href={registrationPath}>
              Register for the free live course <ArrowRight aria-hidden="true" />
            </a>
            <p className="course-delivery-note"><Users aria-hidden="true" /> Confirmation includes the live-session link, Google Calendar action, and private participant WhatsApp group.</p>
          </div>
        </section>
      </main>
      <footer className="course-footer">
        <img src={assetPath('siamese-cat-dev-wordmark.webp')} alt="Siamese Cat Dev" />
        <p>Built by practitioners. Hosted with DJAI Academy.</p>
        <div><a href="/siamese_cat/dev/en/">About the trainer</a><a href="https://www.djai.academy/en/">DJAI Academy <ExternalLink aria-hidden="true" /></a></div>
      </footer>
    </div>
  );
}

export default CourseApp;

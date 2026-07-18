import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Bot,
  BriefcaseBusiness,
  Code2,
  Coffee,
  GitFork,
  GraduationCap,
  Hotel,
  Layers3,
  Lightbulb,
  MapPin,
  Menu,
  MousePointer2,
  Rocket,
  Sparkles,
  Users,
  X,
} from 'lucide-react';
import { ReactNode, useEffect, useRef, useState } from 'react';

const ease = [0.25, 0.1, 0.25, 1] as const;
const assetPath = (path: string) => `${import.meta.env.BASE_URL}${path}`;

type FadeInProps = {
  children: ReactNode;
  delay?: number;
  x?: number;
  y?: number;
  className?: string;
};

function FadeIn({ children, delay = 0, x = 0, y = 28, className = '' }: FadeInProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: '-8% 0px' }}
      transition={{ duration: 0.72, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const nav = [
    ['About', '#about'],
    ['Journey', '#journey'],
    ['What I Do', '#work'],
    ['DJAI Academy', 'https://www.djai.academy/en/'],
    ['ไทย', '/siamese_cat/dev/'],
    ['Contact', '#contact'],
  ];

  return (
    <motion.header
      className={`site-header ${scrolled ? 'is-scrolled' : ''}`}
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease }}
    >
      <a className="brand" href="#top" aria-label="Siamese Cat Dev home">
        <img src={assetPath('siamese-cat-dev-wordmark.webp')} alt="Siamese Cat Dev" />
      </a>
      <nav className="desktop-nav" aria-label="Main navigation">
        {nav.map(([label, href]) => (
          <a
            key={label}
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noreferrer' : undefined}
          >
            {label}
          </a>
        ))}
      </nav>
      <button
        className="menu-button"
        type="button"
        aria-label={open ? 'Close navigation' : 'Open navigation'}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X /> : <Menu />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.nav
            className="mobile-nav"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
          >
            {nav.map(([label, href]) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noreferrer' : undefined}
                onClick={() => setOpen(false)}
              >
                {label}
                <ArrowUpRight aria-hidden="true" />
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function MagneticMascot() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const scale = useMotionValue(1);
  const springConfig = { stiffness: 150, damping: 18, mass: 0.8 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);
  const springScale = useSpring(scale, springConfig);

  useEffect(() => {
    if (reduceMotion) return;
    let frame = 0;

    const onPointerMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const node = ref.current;
        if (!node) return;
        const rect = node.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = event.clientX - centerX;
        const dy = event.clientY - centerY;
        const outsideX = Math.max(Math.abs(dx) - rect.width / 2, 0);
        const outsideY = Math.max(Math.abs(dy) - rect.height / 2, 0);
        const distance = Math.hypot(outsideX, outsideY);

        if (distance < 180) {
          x.set(Math.max(-46, Math.min(46, dx / 5)));
          y.set(Math.max(-38, Math.min(38, dy / 5)));
          rotateY.set(Math.max(-6, Math.min(6, dx / 75)));
          rotateX.set(Math.max(-6, Math.min(6, -dy / 75)));
          scale.set(1.025);
        } else {
          x.set(0);
          y.set(0);
          rotateX.set(0);
          rotateY.set(0);
          scale.set(1);
        }
      });
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onPointerMove);
    };
  }, [reduceMotion, rotateX, rotateY, scale, x, y]);

  return (
    <motion.div
      ref={ref}
      className="mascot-wrap"
      initial={{ opacity: 0, y: 55, scale: 0.88 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.3, ease }}
      style={{
        x: springX,
        y: springY,
        rotateX: springRotateX,
        rotateY: springRotateY,
        scale: springScale,
      }}
    >
      <img
        src={assetPath('siamese-cat-dev-character.webp')}
        alt="Siamese Cat Dev mascot coding on a laptop"
        draggable="false"
      />
    </motion.div>
  );
}

const tokens = [
  ['{ }', 'token-a'],
  ['</>', 'token-b'],
  ['AI', 'token-c'],
  ['UX', 'token-d'],
  ['SHIP', 'token-e'],
  ['01', 'token-f'],
];

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-glow hero-glow-blue" aria-hidden="true" />
      <div className="hero-glow hero-glow-orange" aria-hidden="true" />
      <div className="hero-heading-wrap">
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.12, ease }}
        >
          PRODUCT DESIGN <span>/</span> DEVELOPMENT <span>/</span> VIBE CODING
        </motion.p>
        <h1>
          <motion.span
            initial={{ opacity: 0, y: 65 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.16, ease }}
          >
            HI, I'M
          </motion.span>
          <motion.span
            className="hero-name"
            initial={{ opacity: 0, y: 65 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.24, ease }}
          >
            SIAMESE CAT DEV
          </motion.span>
        </h1>
      </div>

      <div className="hero-mascot-stage">
        {tokens.map(([label, className], index) => (
          <motion.span
            key={label}
            className={`code-token ${className}`}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.75 + index * 0.08 }}
            aria-hidden="true"
          >
            {label}
          </motion.span>
        ))}
        <MagneticMascot />
      </div>

      <motion.div
        className="hero-bottom"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, delay: 0.48, ease }}
      >
        <div className="hero-intro">
          <p>I turn thoughtful product ideas into useful, high-quality software, faster with Vibe Coding.</p>
          <span><Sparkles aria-hidden="true" /> Development & training partner at DJAI Academy</span>
        </div>
        <div className="hero-actions">
          <a className="button button-primary" href="#about">
            Meet Siamese Cat Dev <ArrowDown aria-hidden="true" />
          </a>
          <a className="text-link" href="#work">
            Explore my work <ArrowRight aria-hidden="true" />
          </a>
        </div>
      </motion.div>

      <div className="hero-interaction-note" aria-hidden="true">
        <MousePointer2 />
        <span>INTERACTIVE BUILD MODE</span>
      </div>
    </section>
  );
}

const marqueeOne = ['PRODUCT DESIGN', 'PROJECT MANAGEMENT', 'SOFTWARE DEVELOPMENT', 'VIBE CODING', 'CLAUDE CODE', 'CODEX'];
const marqueeTwo = ['DJAI ACADEMY', 'OPEN SOURCE', 'TRAINING', 'BUSINESS SOLUTIONS', 'UX STRATEGY', 'RAPID PROTOTYPING'];

function MarqueeRow({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const repeated = [...items, ...items, ...items];
  return (
    <div className={`marquee-row ${reverse ? 'reverse' : ''}`}>
      <div className="marquee-track">
        {repeated.map((item, index) => (
          <span key={`${item}-${index}`}>
            {item}<i aria-hidden="true" />
          </span>
        ))}
      </div>
    </div>
  );
}

function Marquee() {
  return (
    <section className="marquee-section" aria-label="Skills and specialties">
      <MarqueeRow items={marqueeOne} />
      <MarqueeRow items={marqueeTwo} reverse />
    </section>
  );
}

function RevealWord({ word, progress, index, total }: { word: string; progress: ReturnType<typeof useScroll>['scrollYProgress']; index: number; total: number }) {
  const start = index / total;
  const end = Math.min(1, start + 0.18);
  const opacity = useTransform(progress, [start, end], [0.15, 1]);
  return <motion.span style={{ opacity }}>{word}{' '}</motion.span>;
}

function ScrollRevealText({ children }: { children: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.25'] });
  const words = children.split(' ');
  return (
    <p ref={ref} className="scroll-reveal" aria-label={children}>
      {words.map((word, index) => (
        <RevealWord key={`${word}-${index}`} word={word} progress={scrollYProgress} index={index} total={words.length} />
      ))}
    </p>
  );
}

function About() {
  return (
    <section className="about section-light" id="about">
      <div className="section-shell about-layout">
        <FadeIn className="section-heading-block about-heading">
          <span className="section-kicker">01 / ABOUT</span>
          <h2>BUILDER BY EXPERIENCE.<br /><em>CURIOUS BY NATURE.</em></h2>
          <p>
            I connect product thinking, software delivery, and AI-assisted development into one practical build process.
          </p>
        </FadeIn>
        <div className="about-copy-card">
          <ScrollRevealText>
            I am a product designer, project manager, and software development partner with close to 10 years of experience building digital products.
          </ScrollRevealText>
          <FadeIn delay={0.1}>
            <p className="body-copy">
              For the past decade, I have led my own development team, working closely with businesses to design, build, and launch real software solutions.
            </p>
          </FadeIn>
          <FadeIn delay={0.16}>
            <blockquote>
              <span>“</span>
              Good tools do not replace good developers. They help good developers move faster.
            </blockquote>
          </FadeIn>
        </div>
        <FadeIn className="about-rail" delay={0.22}>
          <div><strong>~10</strong><span>Years building products</span></div>
          <div><strong>01</strong><span>Experienced dev team</span></div>
          <div><strong>02</strong><span>Core AI coding tools</span></div>
        </FadeIn>
      </div>
    </section>
  );
}

type Story = {
  number: string;
  title: string;
  label: string;
  copy: string;
  accent: string;
  icon: ReactNode;
};

const stories: Story[] = [
  {
    number: '01',
    title: 'A DECADE OF BUILDING',
    label: 'EXPERIENCE',
    copy: 'Close to 10 years across product design and project management, with a decade of hands-on experience leading my own development team and delivering real products for businesses.',
    accent: 'cream',
    icon: <Layers3 />,
  },
  {
    number: '02',
    title: 'THE VIBE CODING SHIFT',
    label: 'MOMENTUM',
    copy: 'Mr A introduced me to Vibe Coding and became an important mentor. Under his guidance, I developed deep working knowledge of Claude Code and Codex. These tools are now central to how I build and teach.',
    accent: 'orange',
    icon: <Bot />,
  },
  {
    number: '03',
    title: 'BUILDING WITH DJAI',
    label: 'PARTNERSHIP',
    copy: 'Today I am a co-assistant, development partner, and training partner with DJAI Academy. I support businesses that need software development and help learners use modern AI-assisted tools with confidence.',
    accent: 'blue',
    icon: <GraduationCap />,
  },
];

function StoryCard({ story, index }: { story: Story; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.955]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.72]);
  return (
    <div ref={ref} className="story-step">
      <motion.article
        className={`story-card story-${story.accent}`}
        style={{ scale, opacity, top: `calc(92px + ${index * 16}px)` }}
      >
        <div className="story-topline">
          <span>{story.label}</span>
          <span>{story.number} / 03</span>
        </div>
        <div className="story-icon" aria-hidden="true">{story.icon}</div>
        <div className="story-content">
          <span className="story-number">{story.number}</span>
          <div>
            <h3>{story.title}</h3>
            <p>{story.copy}</p>
          </div>
        </div>
        <div className="story-line" aria-hidden="true"><span /></div>
      </motion.article>
    </div>
  );
}

function Journey() {
  return (
    <section className="journey" id="journey">
      <div className="section-shell">
        <FadeIn className="section-heading-block dark-heading">
          <span className="section-kicker">02 / JOURNEY</span>
          <h2>FROM SOLID CRAFT<br />TO <em>FASTER CRAFT.</em></h2>
          <p>Vibe Coding did not replace what I knew. It gave an experienced team a much faster way to explore, refine, and ship.</p>
        </FadeIn>
        <div className="story-stack">
          {stories.map((story, index) => <StoryCard story={story} index={index} key={story.number} />)}
        </div>
      </div>
    </section>
  );
}

const services = [
  {
    number: '01',
    title: 'Product Design',
    copy: 'Product strategy, user experience, flows, interfaces, prototypes, and design systems shaped around real business needs.',
    tags: ['UX Strategy', 'UI Design', 'Prototyping'],
    icon: <Lightbulb />,
  },
  {
    number: '02',
    title: 'Software Development',
    copy: 'Practical web and software solutions built with an experienced development team, from first concept through launch.',
    tags: ['Web Apps', 'Product Engineering', 'Delivery'],
    icon: <Code2 />,
  },
  {
    number: '03',
    title: 'Vibe Coding',
    copy: 'Rapid exploration and implementation using Claude Code, Codex, and the engineering judgment to keep quality high.',
    tags: ['Claude Code', 'Codex', 'Rapid Build'],
    icon: <Rocket />,
  },
  {
    number: '04',
    title: 'Training & Partnership',
    copy: 'Hands-on support for businesses, developers, and learners through practical development and DJAI Academy training.',
    tags: ['AI Training', 'Mentoring', 'Business Support'],
    icon: <BookOpen />,
  },
];

function Work() {
  return (
    <section className="work section-light" id="work">
      <div className="section-shell">
        <FadeIn className="section-heading-block">
          <span className="section-kicker">03 / WHAT I DO</span>
          <h2>THINK CLEARLY.<br /><em>BUILD USEFULLY.</em></h2>
        </FadeIn>
        <div className="service-list">
          {services.map((service, index) => (
            <FadeIn key={service.number} delay={index * 0.06}>
              <article className="service-row" tabIndex={0}>
                <span className="service-number">{service.number}</span>
                <div className="service-main">
                  <h3>{service.title}</h3>
                  <p>{service.copy}</p>
                  <div className="tags">
                    {service.tags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                </div>
                <div className="service-icon" aria-hidden="true">{service.icon}</div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function DjaiLogoTilt() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 120, damping: 18 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-7, 7]), { stiffness: 120, damping: 18 });

  return (
    <motion.div
      className="djai-logo-stage"
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - rect.left) / rect.width - 0.5);
        y.set((event.clientY - rect.top) / rect.height - 0.5);
      }}
      onPointerLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY }}
    >
      <img src={assetPath('djai-academy-logo.webp')} alt="DJAI Academy" loading="lazy" decoding="async" />
    </motion.div>
  );
}

function DjaiPartnership() {
  return (
    <section className="djai-section">
      <div className="djai-circuit" aria-hidden="true" />
      <div className="section-shell djai-layout">
        <FadeIn className="djai-copy" x={-35}>
          <span className="section-kicker">04 / PARTNERSHIP</span>
          <h2>BUILDING AND TEACHING WITH <em>DJAI ACADEMY.</em></h2>
          <p>As a co-assistant and development and training partner, I help turn business needs into useful software while sharing practical ways to work with AI-assisted development tools.</p>
          <div className="button-row">
            <a className="button button-light" href="https://www.djai.academy/en/" target="_blank" rel="noreferrer">
              Visit DJAI Academy <ArrowUpRight />
            </a>
            <a className="text-link light-link" href="https://share.google/hFTdRIqW8KeL4Z7p0" target="_blank" rel="noreferrer">
              View on Google Maps <MapPin />
            </a>
          </div>
        </FadeIn>
        <FadeIn className="djai-visual" x={35} delay={0.1}>
          <DjaiLogoTilt />
          <span className="orbit-label orbit-one">DEVELOPMENT</span>
          <span className="orbit-label orbit-two">TRAINING</span>
          <span className="orbit-label orbit-three">PARTNERSHIP</span>
        </FadeIn>
      </div>
    </section>
  );
}

const communityItems = [
  { icon: <GitFork />, title: 'Open Source Tools', copy: 'Useful tools people can access, learn from, and build upon.' },
  { icon: <Users />, title: 'Community Learning', copy: 'Practical knowledge shared with developers, teams, and new learners.' },
  { icon: <BriefcaseBusiness />, title: 'Business Support', copy: 'Real software help shaped around real operating needs.' },
];

function Community() {
  return (
    <section className="community section-light">
      <div className="section-shell">
        <FadeIn className="community-heading">
          <span className="section-kicker">05 / COMMUNITY</span>
          <h2>BUILD USEFUL THINGS.<br /><em>SHARE WHAT HELPS.</em></h2>
          <p>I create open-source tools that people can use freely. My goal is simple: solve practical problems, share what I learn, and contribute something useful.</p>
        </FadeIn>
        <div className="community-grid">
          {communityItems.map((item, index) => (
            <FadeIn key={item.title} delay={index * 0.08}>
              <article className="community-item">
                <span className="community-index">0{index + 1}</span>
                <div className="community-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
                <ArrowUpRight className="community-arrow" aria-hidden="true" />
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

const places = [
  {
    icon: <Coffee />,
    label: 'CAFE',
    title: 'Siamese Cat Cafe',
    copy: 'A welcoming cafe and community space where coffee, food, and cats live together.',
    href: 'https://siamesecat.cafe/',
    className: 'place-orange',
  },
  {
    icon: <Sparkles />,
    label: 'CREATIVE',
    title: 'Siamese Cat Creative Club',
    copy: 'Creative work, experiments, and public projects connected to the Siamese Cat community.',
    href: 'https://creative.siamesecat.cafe/',
    className: 'place-purple',
  },
  {
    icon: <Hotel />,
    label: 'HOTEL & LEARNING',
    title: 'Siamese Cat Hotel & Learning Center',
    copy: 'A cat hotel and learning space near Suvarnabhumi Airport in Bangkok.',
    href: 'https://hotel.siamesecat.cafe/',
    className: 'place-blue',
  },
];

function Places() {
  return (
    <section className="places">
      <div className="section-shell">
        <FadeIn className="section-heading-block dark-heading places-heading">
          <span className="section-kicker">06 / BANGKOK</span>
          <h2>CODE, COFFEE, CATS,<br />AND <em>LEARNING.</em></h2>
          <p>I live and work from the spaces my partner and I created near Suvarnabhumi Airport. They bring together the things I love: software, teaching, coffee, and cats.</p>
        </FadeIn>
        <div className="places-grid">
          {places.map((place, index) => (
            <FadeIn key={place.title} delay={index * 0.1}>
              <a className={`place-card ${place.className}`} href={place.href} target="_blank" rel="noreferrer">
                <div className="place-top">
                  <span>{place.label}</span>
                  <span className="place-icon">{place.icon}</span>
                </div>
                <div>
                  <h3>{place.title}</h3>
                  <p>{place.copy}</p>
                </div>
                <span className="place-link">Visit website <ArrowUpRight /></span>
              </a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact">
      <div className="section-shell footer-content">
        <FadeIn>
          <span className="section-kicker">07 / LET'S TALK</span>
          <h2>LET'S BUILD<br /><em>SOMETHING USEFUL.</em></h2>
        </FadeIn>
        <FadeIn className="footer-side" delay={0.1}>
          <p>I partner with businesses, developers, and learners who want to turn good ideas into working software.</p>
          <a className="button button-primary" href="https://www.djai.academy/service/en/" target="_blank" rel="noreferrer">
            Start a conversation <ArrowUpRight />
          </a>
        </FadeIn>
      </div>
      <div className="footer-brand section-shell">
        <div className="footer-logo-panel">
          <img src={assetPath('siamese-cat-dev-logo.webp')} alt="Siamese Cat Dev" loading="lazy" decoding="async" />
        </div>
        <div className="footer-links">
          <a href="https://www.djai.academy/en/" target="_blank" rel="noreferrer">DJAI Academy <ArrowUpRight /></a>
          <a href="https://www.djai.academy/tools/en/" target="_blank" rel="noreferrer">Free DJAI Tools <ArrowUpRight /></a>
          <a href="https://siamesecat.cafe/" target="_blank" rel="noreferrer">Siamese Cat Cafe <ArrowUpRight /></a>
          <a href="https://creative.siamesecat.cafe/" target="_blank" rel="noreferrer">Creative Club <ArrowUpRight /></a>
          <a href="https://hotel.siamesecat.cafe/" target="_blank" rel="noreferrer">Cat Hotel & Learning Center <ArrowUpRight /></a>
        </div>
      </div>
      <div className="footer-wordmark" aria-hidden="true">SIAMESE CAT DEV</div>
      <div className="footer-bottom section-shell">
        <span>Designed and developed by Siamese Cat Dev.</span>
        <a href="#top">Back to top <ArrowUpRight /></a>
      </div>
    </footer>
  );
}

export default function App() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 25, restDelta: 0.001 });

  useEffect(() => {
    document.documentElement.lang = 'en';
    document.title = 'Siamese Cat Dev | Product, Development & Vibe Coding';
    document.querySelector('meta[name="description"]')?.setAttribute(
      'content',
      'Siamese Cat Dev is a product designer, project manager, and software development partner building useful digital products with Vibe Coding.',
    );
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', 'https://www.djai.academy/siamese_cat/dev/en/');
  }, []);

  return (
    <div className="app-shell">
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />
      <Header />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Journey />
        <Work />
        <DjaiPartnership />
        <Community />
        <Places />
      </main>
      <Footer />
    </div>
  );
}

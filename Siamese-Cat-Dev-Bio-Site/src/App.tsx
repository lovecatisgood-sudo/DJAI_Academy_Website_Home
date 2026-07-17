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
import EnglishApp from './EnglishApp';

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
    ['เกี่ยวกับ', '#about'],
    ['เส้นทาง', '#journey'],
    ['งานที่ทำ', '#work'],
    ['DJAI Academy', 'https://djai.academy/th/'],
    ['EN', '/siamese_cat/dev/EN/'],
    ['ติดต่อ', '#contact'],
  ];

  return (
    <motion.header
      className={`site-header ${scrolled ? 'is-scrolled' : ''}`}
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease }}
    >
      <a className="brand" href="#top" aria-label="หน้าแรก Siamese Cat Dev">
        <img src={assetPath('siamese-cat-dev-wordmark.png')} alt="Siamese Cat Dev" />
      </a>
      <nav className="desktop-nav" aria-label="เมนูหลัก">
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
        aria-label={open ? 'ปิดเมนู' : 'เปิดเมนู'}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X /> : <Menu />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.nav
            className="mobile-nav"
            aria-label="เมนูมือถือ"
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
        src={assetPath('siamese-cat-dev-character.png')}
        alt="Mascot Siamese Cat Dev กำลังเขียนโค้ดบน laptop"
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
            สวัสดี ผมคือ
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
          <p>ผมเปลี่ยนไอเดีย product ที่คิดมาอย่างดีให้เป็น software คุณภาพสูงที่ใช้งานได้จริง เร็วขึ้นด้วย Vibe Coding</p>
          <span><Sparkles aria-hidden="true" /> Development และ training partner ของ DJAI Academy</span>
        </div>
        <div className="hero-actions">
          <a className="button button-primary" href="#about">
            รู้จัก Siamese Cat Dev <ArrowDown aria-hidden="true" />
          </a>
          <a className="text-link" href="#work">
            ดูงานที่ทำ <ArrowRight aria-hidden="true" />
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
    <section className="marquee-section" aria-label="ทักษะและความเชี่ยวชาญ">
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
          <span className="section-kicker">01 / เกี่ยวกับ</span>
          <h2>สร้างจากประสบการณ์<br /><em>ขับเคลื่อนด้วยความอยากรู้</em></h2>
          <p>
            ผมเชื่อม product thinking, software delivery และ AI-assisted development ให้กลายเป็นกระบวนการสร้างที่ practical
          </p>
        </FadeIn>
        <div className="about-copy-card">
          <ScrollRevealText>
            ผมเป็น product designer, project manager และ software development partner ที่มีประสบการณ์เกือบ 10 ปีในการสร้าง digital product
          </ScrollRevealText>
          <FadeIn delay={0.1}>
            <p className="body-copy">
              ตลอดเกือบหนึ่งทศวรรษที่ผ่านมา ผมนำทีม development ของตัวเองและทำงานใกล้ชิดกับธุรกิจต่างๆ เพื่อออกแบบ สร้าง และ launch software solution ที่ใช้งานได้จริง
            </p>
          </FadeIn>
          <FadeIn delay={0.16}>
            <blockquote>
              <span>“</span>
              เครื่องมือที่ดีไม่ได้มาแทน developer ที่ดี แต่มันช่วยให้ developer ที่ดีทำงานได้เร็วขึ้น
            </blockquote>
          </FadeIn>
        </div>
        <FadeIn className="about-rail" delay={0.22}>
          <div><strong>~10</strong><span>ปีในการสร้าง product</span></div>
          <div><strong>01</strong><span>ทีม dev ที่มีประสบการณ์</span></div>
          <div><strong>02</strong><span>เครื่องมือ AI coding หลัก</span></div>
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
    title: 'เกือบหนึ่งทศวรรษของการสร้าง',
    label: 'ประสบการณ์',
    copy: 'เกือบ 10 ปีในงาน product design และ project management พร้อมประสบการณ์ลงมือจริงในการนำทีม development และส่งมอบ product ให้ธุรกิจ',
    accent: 'cream',
    icon: <Layers3 />,
  },
  {
    number: '02',
    title: 'จุดเปลี่ยนของ Vibe Coding',
    label: 'แรงส่ง',
    copy: 'Mr A แนะนำผมให้รู้จัก Vibe Coding และเป็น mentor สำคัญ ภายใต้การแนะนำของเขา ผมพัฒนาความเข้าใจเชิงลึกในการใช้ Claude Code และ Codex ซึ่งตอนนี้เป็นเครื่องมือหลักในการสร้างและสอนของผม',
    accent: 'orange',
    icon: <Bot />,
  },
  {
    number: '03',
    title: 'สร้างไปพร้อมกับ DJAI',
    label: 'PARTNERSHIP',
    copy: 'วันนี้ผมเป็น co-assistant, development partner และ training partner ของ DJAI Academy ผมช่วยธุรกิจที่ต้องการ software development และช่วยผู้เรียนใช้เครื่องมือ AI-assisted อย่างมั่นใจ',
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
          <span className="section-kicker">02 / เส้นทาง</span>
          <h2>จากงานสร้างที่แข็งแรง<br />สู่การสร้างที่ <em>เร็วขึ้น</em></h2>
          <p>Vibe Coding ไม่ได้แทนที่สิ่งที่ผมรู้ แต่มันทำให้ทีมที่มีประสบการณ์สำรวจ ปรับปรุง และ ship งานได้เร็วขึ้นมาก</p>
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
    copy: 'Product strategy, user experience, flow, interface, prototype และ design system ที่ออกแบบจากความต้องการจริงของธุรกิจ',
    tags: ['UX Strategy', 'UI Design', 'Prototyping'],
    icon: <Lightbulb />,
  },
  {
    number: '02',
    title: 'Software Development',
    copy: 'Web และ software solution ที่ practical สร้างร่วมกับทีม development ที่มีประสบการณ์ ตั้งแต่ concept แรกจนถึง launch',
    tags: ['Web Apps', 'Product Engineering', 'Delivery'],
    icon: <Code2 />,
  },
  {
    number: '03',
    title: 'Vibe Coding',
    copy: 'สำรวจและลงมือสร้างอย่างรวดเร็วด้วย Claude Code, Codex และ engineering judgment เพื่อรักษาคุณภาพของงาน',
    tags: ['Claude Code', 'Codex', 'Rapid Build'],
    icon: <Rocket />,
  },
  {
    number: '04',
    title: 'Training & Partnership',
    copy: 'สนับสนุนธุรกิจ developer และผู้เรียนแบบลงมือทำจริง ผ่านการพัฒนา product และ training กับ DJAI Academy',
    tags: ['AI Training', 'Mentoring', 'Business Support'],
    icon: <BookOpen />,
  },
];

function Work() {
  return (
    <section className="work section-light" id="work">
      <div className="section-shell">
        <FadeIn className="section-heading-block">
          <span className="section-kicker">03 / งานที่ทำ</span>
          <h2>คิดให้ชัด<br /><em>สร้างให้มีประโยชน์</em></h2>
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
      <img src={assetPath('djai-academy-logo.png')} alt="DJAI Academy" />
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
          <h2>สร้างและสอนไปกับ <em>DJAI ACADEMY</em></h2>
          <p>ในฐานะ co-assistant และ development/training partner ผมช่วยเปลี่ยนความต้องการทางธุรกิจให้เป็น software ที่มีประโยชน์ พร้อมแบ่งปันวิธีใช้เครื่องมือ AI-assisted development แบบ practical</p>
          <div className="button-row">
            <a className="button button-light" href="https://djai.academy/th/" target="_blank" rel="noreferrer">
              ไปที่ DJAI Academy <ArrowUpRight />
            </a>
            <a className="text-link light-link" href="https://share.google/hFTdRIqW8KeL4Z7p0" target="_blank" rel="noreferrer">
              ดูบน Google Maps <MapPin />
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
  { icon: <GitFork />, title: 'Open Source Tools', copy: 'เครื่องมือที่คนเข้าถึง เรียนรู้ และนำไปต่อยอดได้' },
  { icon: <Users />, title: 'Community Learning', copy: 'ความรู้ practical สำหรับ developer, team และผู้เรียนรุ่นใหม่' },
  { icon: <BriefcaseBusiness />, title: 'Business Support', copy: 'ความช่วยเหลือด้าน software ที่ออกแบบจากความต้องการจริงของธุรกิจ' },
];

function Community() {
  return (
    <section className="community section-light">
      <div className="section-shell">
        <FadeIn className="community-heading">
          <span className="section-kicker">05 / COMMUNITY</span>
          <h2>สร้างสิ่งที่มีประโยชน์<br /><em>และแบ่งปันสิ่งที่ช่วยคนได้</em></h2>
          <p>ผมสร้างเครื่องมือ open-source และเครื่องมือฟรีให้คนใช้ได้จริง เป้าหมายคือแก้ปัญหาที่ practical แบ่งปันสิ่งที่เรียนรู้ และสร้างประโยชน์กลับคืนให้ community</p>
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
    copy: 'คาเฟ่และพื้นที่ community ที่รวม coffee, food และ cats ไว้ด้วยกัน',
    href: 'https://siamesecat.cafe/',
    className: 'place-orange',
  },
  {
    icon: <Sparkles />,
    label: 'CREATIVE',
    title: 'Siamese Cat Creative Club',
    copy: 'งานสร้างสรรค์ experiment และ public project ที่เชื่อมกับ Siamese Cat community',
    href: 'https://creative.siamesecat.cafe/',
    className: 'place-purple',
  },
  {
    icon: <Hotel />,
    label: 'HOTEL & LEARNING',
    title: 'Siamese Cat Hotel & Learning Center',
    copy: 'โรงแรมแมวและพื้นที่เรียนรู้ใกล้สนามบินสุวรรณภูมิ',
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
          <h2>CODE, COFFEE, CATS<br />และ <em>LEARNING</em></h2>
          <p>ผมใช้ชีวิตและทำงานจากพื้นที่ที่ผมและ partner สร้างขึ้นใกล้สนามบินสุวรรณภูมิ พื้นที่เหล่านี้รวมสิ่งที่ผมรักไว้ด้วยกัน: software, teaching, coffee และ cats</p>
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
                <span className="place-link">เยี่ยมชมเว็บไซต์ <ArrowUpRight /></span>
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
          <span className="section-kicker">07 / คุยกันได้</span>
          <h2>มาสร้าง<br /><em>สิ่งที่มีประโยชน์</em></h2>
        </FadeIn>
        <FadeIn className="footer-side" delay={0.1}>
          <p>ผมทำงานร่วมกับธุรกิจ developer และผู้เรียนที่ต้องการเปลี่ยนไอเดียดีๆ ให้เป็น software ที่ใช้งานได้จริง</p>
          <a className="button button-primary" href="https://djai.academy/service/th/" target="_blank" rel="noreferrer">
            เริ่มคุยโปรเจกต์ <ArrowUpRight />
          </a>
        </FadeIn>
      </div>
      <div className="footer-brand section-shell">
        <div className="footer-logo-panel">
          <img src={assetPath('siamese-cat-dev-logo.png')} alt="Siamese Cat Dev" />
        </div>
        <div className="footer-links">
          <a href="https://djai.academy/th/" target="_blank" rel="noreferrer">DJAI Academy <ArrowUpRight /></a>
          <a href="https://djai.academy/tools/th/" target="_blank" rel="noreferrer">เครื่องมือฟรีจาก DJAI <ArrowUpRight /></a>
          <a href="https://siamesecat.cafe/" target="_blank" rel="noreferrer">Siamese Cat Cafe <ArrowUpRight /></a>
          <a href="https://creative.siamesecat.cafe/" target="_blank" rel="noreferrer">Creative Club <ArrowUpRight /></a>
          <a href="https://hotel.siamesecat.cafe/" target="_blank" rel="noreferrer">Cat Hotel & Learning Center <ArrowUpRight /></a>
        </div>
      </div>
      <div className="footer-wordmark" aria-hidden="true">SIAMESE CAT DEV</div>
      <div className="footer-bottom section-shell">
        <span>ออกแบบและพัฒนาโดย Siamese Cat Dev</span>
        <a href="#top">กลับขึ้นด้านบน <ArrowUpRight /></a>
      </div>
    </footer>
  );
}

function ThaiApp() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 25, restDelta: 0.001 });

  useEffect(() => {
    document.documentElement.lang = 'th';
    document.title = 'Siamese Cat Dev | Product, Development และ Vibe Coding';
    document.querySelector('meta[name="description"]')?.setAttribute(
      'content',
      'Siamese Cat Dev คือ product designer, project manager และ software development partner ที่สร้าง digital product คุณภาพสูงด้วย Vibe Coding และ AI-assisted development',
    );
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', 'https://djai.academy/siamese_cat/dev/');
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

export default function App() {
  const isEnglish = window.location.pathname.toLowerCase().includes('/en');
  return isEnglish ? <EnglishApp /> : <ThaiApp />;
}

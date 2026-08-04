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

type CourseLanguage = 'en' | 'th';

const assetPath = (path: string) => `${import.meta.env.BASE_URL}${path}`;
const registrationPath = '/MONEY_MAKING_PRODUCT/';
const lessonIcons = [Target, Code2, Rocket, Lightbulb];

const courseCopy = {
  en: {
    htmlLang: 'en',
    title: 'Vibe Code a Money-Making Product | Free Live Course',
    description: 'Join a free one-hour live English course on 22 August 2026 and learn how to turn a vibe-coded MVP into a product that can be shipped and sold.',
    canonical: 'https://www.djai.academy/siamese_cat/dev/course/',
    languageSwitch: ['ไทย', '/siamese_cat/dev/course/th/'],
    nav: ['What you will learn', 'Your trainers', 'Register free'],
    kicker: ['FREE LIVE COURSE', 'SIAMESE CAT DEV × DJAI ACADEMY'],
    hero: ['VIBE CODE A PRODUCT THAT CAN', 'MAKE MONEY.', 'Building an MVP is easier than ever. Building something reliable, useful, and commercially ready is still hard. Learn how experienced product builders move from an AI-generated prototype to a product people can actually use—and pay for.', 'Learn more & register free', 'See the one-hour agenda', 'Free DJAI School account required. Complete the learner survey once, then confirm your seat.'],
    facts: [['Date', '22 August 2026'], ['Time', '1:00–2:00 PM ICT'], ['Format', 'Live online session'], ['Language', 'English']],
    price: ['YOUR INVESTMENT', '1 HOUR', 'FREE'],
    problem: ['THE REAL GAP', "YOU MADE AN MVP. WHY ISN'T IT A", 'PRODUCT?', 'Many people learn vibe coding. Far fewer ship software that is dependable enough for real customers or commercial use.', 'The usual roadblock appears after the first exciting prototype: unclear audience, weak product decisions, fragile architecture, no quality process, no rollout strategy, and no reliable path to revenue.', 'Knowing what to build, for whom, and why matters more than generating more code. This session gives you the product and software-development thinking that AI tools cannot choose for you.'],
    curriculumHeading: ['WHAT YOU WILL LEARN', 'FROM PROMPTING TO', 'PRODUCTION.', 'No hype and no tool parade. This is a focused working session about making better product decisions and shipping responsibly.'],
    lessons: [
      ['Choose a product people will pay for', 'Start with a real audience, a painful problem, and a clear commercial outcome—not a feature list looking for a market.'],
      ['Apply professional development standards', 'Use practical product, architecture, quality, security, and release thinking so your AI-assisted build can survive beyond the demo.'],
      ['Move from MVP to a shippable product', 'Understand what changes after the first prototype: validation, hardening, onboarding, pricing, distribution, support, and iteration.'],
      ['Turn your next idea into a plan', 'Bring your idea or your current roadblock. You will have a chance to ask the trainers what to build next and how to approach it.'],
    ],
    agendaHeading: ['ONE REAL HOUR', 'ZERO FLUFF.', 'STRAIGHT TO THE WORK.'],
    agenda: [
      ['00–10 min', 'Why promising vibe-coded MVPs fail to become commercial products'],
      ['10–25 min', 'How experienced product teams decide what is worth building'],
      ['25–40 min', 'The software-development standards that matter when AI writes the code'],
      ['40–50 min', 'A practical rollout path: validate, ship, reach users, learn, and improve'],
      ['50–60 min', 'Live Q&A and direct guidance on your next money-making product idea'],
    ],
    trainersHeading: ['MEET BOTH INSTRUCTORS', 'BUILT IN PRACTICE.', 'TAUGHT FROM EXPERIENCE.', 'Learn directly from two active product and technology leaders who build, manage, and teach real software work.'],
    trainers: [
      ['PRODUCT BUILDER & DEVELOPMENT LEAD', 'Siamese Cat Dev', 'More than a decade across product design, project management, software development, and development-team leadership. Today he ships client products, open-source tools, games, community utilities, and learning systems with AI.'],
      ['DJAI FOUNDER, CTO & INSTRUCTOR', 'Mr. A', 'Founder of DJAI Academy, experienced CTO, technical product leader, and the instructor behind DJAI’s offline course. He brings real leadership and production experience into the room—not theory from the sidelines.'],
    ],
    fit: ['THIS SESSION IS FOR YOU IF', 'YOU ARE TIRED OF BUILDING WITHOUT A PATH TO', 'REVENUE.', [
      'You can make prototypes but struggle to finish and launch them.',
      'You have too many ideas and cannot decide which one has commercial potential.',
      'Your AI-generated code works in a demo but feels unsafe or difficult to maintain.',
      'You want a practical product and rollout strategy—not another list of prompts.',
      'You want direct feedback from people who build and manage software products professionally.',
    ]],
    register: ['YOUR NEXT PRODUCT STARTS HERE', 'GIVE US ONE HOUR.', 'LEAVE WITH A CLEARER PATH.', 'Register with a free DJAI School account. New members complete the learner survey once, confirm the course registration, and receive the session details by email.', 'Register for the free live course', 'Confirmation includes the live-session link, Google Calendar action, and private participant WhatsApp group.'],
    footer: ['Built by practitioners. Hosted with DJAI Academy.', 'About Siamese Cat Dev', 'DJAI Academy'],
  },
  th: {
    htmlLang: 'th',
    title: 'Vibe Code สินค้าให้สร้างรายได้ | คลาสสดออนไลน์ฟรี',
    description: 'หน้าลงทะเบียนภาษาไทยสำหรับคลาสสดภาษาอังกฤษฟรี 1 ชั่วโมง วันที่ 22 สิงหาคม 2569 เรียนรู้วิธีพัฒนา MVP จาก Vibe Coding ให้เป็นสินค้าที่พร้อมเปิดตัวและสร้างรายได้',
    canonical: 'https://www.djai.academy/siamese_cat/dev/course/th/',
    languageSwitch: ['EN', '/siamese_cat/dev/course/'],
    nav: ['สิ่งที่จะได้เรียน', 'ผู้สอน', 'ลงทะเบียนฟรี'],
    kicker: ['คลาสสดออนไลน์ฟรี', 'SIAMESE CAT DEV × DJAI ACADEMY'],
    hero: ['VIBE CODE สินค้าให้พร้อม', 'สร้างรายได้จริง', 'วันนี้ใครก็สร้าง MVP ได้เร็วขึ้น แต่การทำให้เป็นสินค้าที่น่าเชื่อถือ ใช้งานจริง และพร้อมขายยังเป็นเรื่องยาก มาเรียนรู้วิธีที่คนทำ Product ตัวจริงพัฒนาต้นแบบจาก AI ให้เป็นสิ่งที่ผู้ใช้ต้องการและยอมจ่ายเงิน', 'ดูรายละเอียดและลงทะเบียนฟรี', 'ดูเนื้อหาตลอด 1 ชั่วโมง', 'ใช้บัญชี DJAI School ฟรี ทำแบบสำรวจผู้เรียนเพียงครั้งเดียว แล้วจึงยืนยันที่นั่ง'],
    facts: [['วันที่', '22 สิงหาคม 2569'], ['เวลา', '13:00–14:00 น.'], ['รูปแบบ', 'คลาสสดออนไลน์'], ['ภาษาที่ใช้สอน', 'ภาษาอังกฤษ']],
    price: ['สิ่งที่คุณลงทุน', '1 ชั่วโมง', 'ฟรี'],
    problem: ['ช่องว่างที่คนส่วนใหญ่ติดอยู่', 'คุณสร้าง MVP ได้แล้ว แต่ทำไมยังไม่เป็น', 'สินค้าจริง?', 'หลายคนเรียน Vibe Coding แต่มีน้อยคนที่ส่งมอบซอฟต์แวร์ซึ่งน่าเชื่อถือพอสำหรับลูกค้าจริงและการใช้งานเชิงพาณิชย์', 'ปัญหามักเริ่มหลังจากต้นแบบแรกสำเร็จ: ไม่ชัดว่าลูกค้าคือใคร ตัดสินใจ Product ไม่ขาด สถาปัตยกรรมเปราะ ไม่มีขั้นตอนควบคุมคุณภาพ ไม่มีกลยุทธ์เปิดตัว และไม่มีเส้นทางสู่รายได้ที่ชัดเจน', 'การรู้ว่าจะสร้างอะไร เพื่อใคร และเพราะอะไร สำคัญกว่าการสร้างโค้ดเพิ่ม คลาสนี้จะให้กรอบคิดด้าน Product และกระบวนการพัฒนาซอฟต์แวร์ที่ AI ตัดสินใจแทนคุณไม่ได้'],
    curriculumHeading: ['สิ่งที่จะได้เรียน', 'จากการ PROMPT สู่', 'PRODUCTION จริง', 'ไม่มีคำโฆษณาเกินจริงและไม่เสียเวลากับการไล่รายชื่อเครื่องมือ นี่คือคลาสเข้มข้นเพื่อช่วยให้คุณตัดสินใจด้าน Product ได้ดีขึ้นและส่งมอบงานอย่างมืออาชีพ'],
    lessons: [
      ['เลือกสินค้าที่คนยอมจ่ายเงิน', 'เริ่มจากกลุ่มเป้าหมายจริง ปัญหาที่เจ็บจริง และผลลัพธ์ทางธุรกิจที่ชัด ไม่ใช่เริ่มจากรายการฟีเจอร์แล้วค่อยหาตลาด'],
      ['ใช้มาตรฐานการพัฒนาซอฟต์แวร์', 'นำแนวคิดด้าน Product, Architecture, Quality, Security และ Release มาใช้ เพื่อให้งานที่สร้างด้วย AI ไปไกลกว่าการ Demo'],
      ['พัฒนา MVP ให้พร้อมเปิดตัว', 'เข้าใจสิ่งที่ต้องทำหลังต้นแบบแรก ตั้งแต่ Validation, Hardening, Onboarding, Pricing, Distribution, Support จนถึง Iteration'],
      ['เปลี่ยนไอเดียถัดไปให้เป็นแผน', 'นำไอเดียหรือปัญหาที่คุณกำลังติดมาถามผู้สอนโดยตรง ว่าควรสร้างอะไรต่อและควรเริ่มอย่างไร'],
    ],
    agendaHeading: ['1 ชั่วโมงจริง', 'ไม่มีน้ำ', 'เข้าเรื่องทันที'],
    agenda: [
      ['00–10 นาที', 'ทำไม MVP จาก Vibe Coding ที่ดูดีจึงไปไม่ถึงสินค้าเชิงพาณิชย์'],
      ['10–25 นาที', 'ทีม Product ที่มีประสบการณ์ตัดสินใจอย่างไรว่าสิ่งไหนควรสร้าง'],
      ['25–40 นาที', 'มาตรฐานพัฒนาซอฟต์แวร์ที่สำคัญเมื่อ AI เป็นคนเขียนโค้ด'],
      ['40–50 นาที', 'เส้นทางเปิดตัวที่ทำได้จริง: Validate, Ship, เข้าถึงผู้ใช้ เรียนรู้ และปรับปรุง'],
      ['50–60 นาที', 'ถามตอบสดและรับคำแนะนำตรงสำหรับไอเดียสร้างรายได้ของคุณ'],
    ],
    trainersHeading: ['พบกับผู้สอนทั้งสองคน', 'สร้างจริงทุกวัน', 'สอนจากประสบการณ์จริง', 'เรียนโดยตรงกับผู้นำด้าน Product และ Technology ที่ยังสร้าง บริหาร และสอนงานซอฟต์แวร์จริงอยู่ทุกวัน'],
    trainers: [
      ['PRODUCT BUILDER & DEVELOPMENT LEAD', 'Siamese Cat Dev', 'มีประสบการณ์มากกว่าสิบปีด้าน Product Design, Project Management, Software Development และการบริหารทีมพัฒนา ปัจจุบันสร้างและส่งมอบสินค้าลูกค้า เครื่องมือโอเพนซอร์ส เกม ระบบชุมชน และระบบการเรียนรู้ด้วย AI อย่างต่อเนื่อง'],
      ['ผู้ก่อตั้ง DJAI, CTO และผู้สอน', 'Mr. A', 'ผู้ก่อตั้ง DJAI Academy, CTO ที่มีประสบการณ์ ผู้นำด้าน Technical Product และผู้สอนคอร์สออฟไลน์ของ DJAI เขานำประสบการณ์การบริหารและ Production จริงมาสอน ไม่ใช่เพียงทฤษฎีจากข้างสนาม'],
    ],
    fit: ['คลาสนี้เหมาะกับคุณถ้า', 'คุณเหนื่อยกับการสร้าง แต่ยังไม่มีเส้นทางสู่', 'รายได้', [
      'คุณสร้างต้นแบบได้ แต่ยังทำไม่จบหรือเปิดตัวไม่ได้',
      'คุณมีไอเดียมากเกินไปและตัดสินใจไม่ได้ว่าอะไรมีโอกาสเชิงพาณิชย์',
      'โค้ดจาก AI ใช้ Demo ได้ แต่ยังไม่ปลอดภัยหรือดูแลต่อได้ยาก',
      'คุณต้องการกลยุทธ์ Product และการเปิดตัวที่ใช้ได้จริง ไม่ใช่รายการ Prompt เพิ่มเติม',
      'คุณต้องการคำแนะนำตรงจากคนที่สร้างและบริหารซอฟต์แวร์อย่างมืออาชีพ',
    ]],
    register: ['สินค้าถัดไปของคุณเริ่มตรงนี้', 'ให้เวลาเรา 1 ชั่วโมง', 'กลับไปพร้อมเส้นทางที่ชัดขึ้น', 'ลงทะเบียนด้วยบัญชี DJAI School ฟรี สมาชิกใหม่ทำแบบสำรวจผู้เรียนเพียงครั้งเดียว ยืนยันการลงทะเบียน แล้วรับรายละเอียดคลาสทางอีเมล', 'ลงทะเบียนคลาสสดฟรี', 'อีเมลยืนยันจะมีลิงก์เข้าคลาส ปุ่มเพิ่ม Google Calendar และกลุ่ม WhatsApp สำหรับผู้เรียน'],
    footer: ['สร้างโดยคนทำงานจริง จัดคลาสร่วมกับ DJAI Academy', 'รู้จัก Siamese Cat Dev', 'DJAI Academy'],
  },
} as const;

function CourseHeader({ language }: { language: CourseLanguage }) {
  const copy = courseCopy[language];
  return (
    <header className="course-header">
      <a className="course-brand" href={language === 'th' ? '/' : '/en/'} aria-label={language === 'th' ? 'หน้าแรก DJAI Academy' : 'DJAI Academy home'}>
        <img src={assetPath('djai-academy-logo.webp')} alt="DJAI Academy" />
      </a>
      <nav aria-label={language === 'th' ? 'เมนูคลาส' : 'Course navigation'}>
        <a href="#curriculum">{copy.nav[0]}</a>
        <a href="#trainers">{copy.nav[1]}</a>
        <a href={copy.languageSwitch[1]}>{copy.languageSwitch[0]}</a>
        <a className="course-nav-cta" href={registrationPath}>{copy.nav[2]}</a>
      </nav>
    </header>
  );
}

function EventFacts({ language }: { language: CourseLanguage }) {
  const facts = courseCopy[language].facts;
  const icons = [CalendarDays, Clock3, Video, Globe2];
  return (
    <dl className="event-facts" aria-label={language === 'th' ? 'รายละเอียดคลาสสด' : 'Live course details'}>
      {facts.map(([label, value], index) => {
        const Icon = icons[index];
        return <div key={label}><Icon aria-hidden="true" /><dt>{label}</dt><dd>{value}</dd></div>;
      })}
    </dl>
  );
}

function CourseApp({ language = 'en' }: { language?: CourseLanguage }) {
  const copy = courseCopy[language];

  useEffect(() => {
    document.documentElement.lang = copy.htmlLang;
    document.title = copy.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', copy.description);
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', copy.canonical);
  }, [copy]);

  return (
    <div className={`course-page course-page-${language}`}>
      <CourseHeader language={language} />
      <main>
        <section className="course-hero" id="top">
          <div className="course-grid" aria-hidden="true" />
          <div className="course-hero-copy">
            <p className="course-kicker"><span>{copy.kicker[0]}</span> {copy.kicker[1]}</p>
            <h1>{copy.hero[0]} <em>{copy.hero[1]}</em></h1>
            <p className="course-lead">{copy.hero[2]}</p>
            <div className="course-actions">
              <a className="course-button course-button-primary" href={registrationPath}>{copy.hero[3]} <ArrowRight aria-hidden="true" /></a>
              <a className="course-button course-button-secondary" href="#curriculum">{copy.hero[4]}</a>
            </div>
            <p className="course-account-note"><BadgeCheck aria-hidden="true" /> {copy.hero[5]}</p>
          </div>
          <div className="course-hero-visual">
            <div className="course-mascot-orbit" aria-hidden="true"><span>IDEA</span><span>BUILD</span><span>SHIP</span><span>SELL</span></div>
            <img src={assetPath('siamese-cat-dev-character.webp')} alt={language === 'th' ? 'Siamese Cat Dev กำลังพัฒนาซอฟต์แวร์' : 'Siamese Cat Dev building software on a laptop'} />
            <div className="course-price-card"><span>{copy.price[0]}</span><strong>{copy.price[1]}</strong><b>{copy.price[2]}</b></div>
          </div>
          <EventFacts language={language} />
        </section>

        <section className="course-problem">
          <div><p className="course-section-label">{copy.problem[0]}</p><h2>{copy.problem[1]} <em>{copy.problem[2]}</em></h2></div>
          <div className="course-problem-copy"><p>{copy.problem[3]}</p><p>{copy.problem[4]}</p><p><strong>{copy.problem[5]}</strong></p></div>
        </section>

        <section className="course-curriculum" id="curriculum">
          <div className="course-section-heading"><p className="course-section-label">{copy.curriculumHeading[0]}</p><h2>{copy.curriculumHeading[1]} <em>{copy.curriculumHeading[2]}</em></h2><p>{copy.curriculumHeading[3]}</p></div>
          <div className="lesson-grid">
            {copy.lessons.map(([title, description], index) => {
              const Icon = lessonIcons[index];
              return <article key={title}><div className="lesson-number">0{index + 1}</div><span className="lesson-icon"><Icon aria-hidden="true" /></span><h3>{title}</h3><p>{description}</p></article>;
            })}
          </div>
        </section>

        <section className="course-agenda">
          <div className="course-section-heading"><p className="course-section-label">{copy.agendaHeading[0]}</p><h2>{copy.agendaHeading[1]} <em>{copy.agendaHeading[2]}</em></h2></div>
          <ol>{copy.agenda.map(([time, item]) => <li key={time}><time>{time}</time><span>{item}</span></li>)}</ol>
        </section>

        <section className="course-trainers" id="trainers">
          <div className="course-trainers-heading"><p className="course-section-label">{copy.trainersHeading[0]}</p><h2>{copy.trainersHeading[1]} <em>{copy.trainersHeading[2]}</em></h2><p>{copy.trainersHeading[3]}</p></div>
          <div className="trainer-grid">
            <article className="trainer-card trainer-card-siamese">
              <div className="trainer-portrait"><img src={assetPath('siamese-cat-dev-logo.webp')} alt="Siamese Cat Dev" loading="lazy" /></div>
              <div className="trainer-copy"><p className="trainer-role">{copy.trainers[0][0]}</p><h3>{copy.trainers[0][1]}</h3><p>{copy.trainers[0][2]}</p></div>
            </article>
            <article className="trainer-card trainer-card-founder">
              <div className="trainer-portrait"><img src="/founder-djai-display.webp" alt={language === 'th' ? 'Mr. A ผู้ก่อตั้ง DJAI Academy, CTO และผู้สอน' : 'Mr. A, founder of DJAI Academy, CTO, and course instructor'} loading="lazy" /></div>
              <div className="trainer-copy"><p className="trainer-role">{copy.trainers[1][0]}</p><h3>{copy.trainers[1][1]}</h3><p>{copy.trainers[1][2]}</p></div>
            </article>
          </div>
        </section>

        <section className="course-fit">
          <div><p className="course-section-label">{copy.fit[0]}</p><h2>{copy.fit[1]} <em>{copy.fit[2]}</em></h2></div>
          <ul>{copy.fit[3].map((item) => <li key={item}><Check aria-hidden="true" />{item}</li>)}</ul>
        </section>

        <section className="course-register" id="register">
          <div className="course-register-card">
            <div><p className="course-section-label">{copy.register[0]}</p><h2>{copy.register[1]} <em>{copy.register[2]}</em></h2><p>{copy.register[3]}</p></div>
            <EventFacts language={language} />
            <a className="course-button course-button-primary" href={registrationPath}>{copy.register[4]} <ArrowRight aria-hidden="true" /></a>
            <p className="course-delivery-note"><Users aria-hidden="true" /> {copy.register[5]}</p>
          </div>
        </section>
      </main>
      <footer className="course-footer">
        <img src={assetPath('djai-academy-logo.webp')} alt="DJAI Academy" />
        <p>{copy.footer[0]}</p>
        <div><a href={language === 'th' ? '/siamese_cat/dev/' : '/siamese_cat/dev/en/'}>{copy.footer[1]}</a><a href={language === 'th' ? '/' : '/en/'}>{copy.footer[2]} <ExternalLink aria-hidden="true" /></a></div>
      </footer>
    </div>
  );
}

export default CourseApp;

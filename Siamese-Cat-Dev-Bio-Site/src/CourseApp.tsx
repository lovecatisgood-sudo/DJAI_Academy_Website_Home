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
  MailCheck,
  Rocket,
  Send,
  Target,
  Users,
  Video,
} from 'lucide-react';
import type { FormEvent } from 'react';
import { useEffect, useId, useState } from 'react';
import './course.css';

type CourseLanguage = 'en' | 'th';

const assetPath = (path: string) => `${import.meta.env.BASE_URL}${path}`;
const lessonIcons = [Target, Code2, Rocket, Lightbulb];

const courseCopy = {
  en: {
    htmlLang: 'en',
    title: 'Vibe Code a Money-Making Product | Siamese Cat Dev Course',
    description: 'Express interest in a live Siamese Cat Dev course and learn how to turn a vibe-coded MVP into a reliable product that can be shipped and sold.',
    canonical: 'https://www.djai.academy/siamese_cat/dev/course/',
    languageSwitch: ['ไทย', '/siamese_cat/dev/course/th/'],
    nav: ['What you will learn', 'Your trainers', 'Express interest'],
    kicker: ['LIVE COURSE', 'SIAMESE CAT DEV × DJAI ACADEMY'],
    hero: ['VIBE CODE A PRODUCT THAT CAN', 'MAKE MONEY.', 'Building an MVP is easier than ever. Building something reliable, useful, and commercially ready is still hard. Learn how experienced product builders move from an AI-generated prototype to a product people can actually use—and pay for.', 'Express interest in a course', 'See the course outline', 'Tell Siamese Cat Dev what you want to build. We will follow up by email about a suitable format and schedule.'],
    facts: [['Schedule', 'Arranged with you'], ['Focus', 'One practical session'], ['Format', 'Online or in person'], ['Language', 'English or Thai']],
    price: ['FIRST STEP', 'SHARE', 'YOUR GOALS'],
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
    register: ['COURSE BOOKING INTEREST', 'TELL ME WHAT YOU WANT TO', 'BUILD NEXT.', 'Share your goals, preferred format, and availability. Siamese Cat Dev will review your request and reply by email about the best course option and next steps.', 'This form expresses interest; it does not confirm a booking or payment.'],
    form: {
      name: ['Your name', 'Name'],
      email: ['Email address', 'you@example.com'],
      phone: ['Phone or WhatsApp (optional)', '+66…'],
      format: ['Preferred course format', 'Choose a format'],
      formats: [['public-online', 'Next public online course'], ['private-online', 'Private online course'], ['in-person', 'In-person course'], ['team', 'Team or company course']],
      schedule: ['Preferred dates or times (optional)', 'For example, weekday evenings in September'],
      goals: ['What do you want to build or learn?', 'Tell me about your idea, current experience, and the result you want from the course.'],
      consent: ['I agree that DJAI Academy and Siamese Cat Dev may use these details to reply about this course request.', 'Read the Privacy Policy'],
      submit: ['Send course interest', 'Sending…'],
      success: ['Interest received', 'Thank you. Your request was sent to Siamese Cat Dev. We will reply to the email address you provided.'],
      error: 'Your request could not be sent. Please check the fields and try again.',
    },
    footer: ['Built by practitioners. Hosted with DJAI Academy.', 'About Siamese Cat Dev', 'DJAI Academy'],
  },
  th: {
    htmlLang: 'th',
    title: 'Vibe Code สินค้าให้สร้างรายได้ | คอร์ส Siamese Cat Dev',
    description: 'แจ้งความสนใจคอร์สสดกับ Siamese Cat Dev เพื่อเรียนรู้วิธีพัฒนา MVP จาก Vibe Coding ให้เป็นสินค้าที่น่าเชื่อถือ พร้อมเปิดตัวและสร้างรายได้',
    canonical: 'https://www.djai.academy/siamese_cat/dev/course/th/',
    languageSwitch: ['EN', '/siamese_cat/dev/course/'],
    nav: ['สิ่งที่จะได้เรียน', 'ผู้สอน', 'แจ้งความสนใจ'],
    kicker: ['คอร์สสด', 'SIAMESE CAT DEV × DJAI ACADEMY'],
    hero: ['VIBE CODE สินค้าให้พร้อม', 'สร้างรายได้จริง', 'วันนี้ใครก็สร้าง MVP ได้เร็วขึ้น แต่การทำให้เป็นสินค้าที่น่าเชื่อถือ ใช้งานจริง และพร้อมขายยังเป็นเรื่องยาก มาเรียนรู้วิธีที่คนทำ Product ตัวจริงพัฒนาต้นแบบจาก AI ให้เป็นสิ่งที่ผู้ใช้ต้องการและยอมจ่ายเงิน', 'แจ้งความสนใจคอร์ส', 'ดูหัวข้อการเรียน', 'บอก Siamese Cat Dev ว่าคุณอยากสร้างอะไร แล้วเราจะติดต่อกลับทางอีเมลเพื่อคุยรูปแบบและเวลาที่เหมาะสม'],
    facts: [['วันและเวลา', 'นัดหมายร่วมกัน'], ['เนื้อหา', '1 คลาสเน้นลงมือจริง'], ['รูปแบบ', 'ออนไลน์หรือพบกัน'], ['ภาษา', 'ไทยหรืออังกฤษ']],
    price: ['ขั้นตอนแรก', 'บอก', 'เป้าหมาย'],
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
    register: ['แจ้งความสนใจจองคอร์ส', 'บอกผมว่าคุณอยาก', 'สร้างอะไรต่อ', 'แชร์เป้าหมาย รูปแบบคอร์ส และเวลาที่สะดวก Siamese Cat Dev จะอ่านคำขอและตอบกลับทางอีเมลเพื่อแนะนำคอร์สและขั้นตอนถัดไป', 'การส่งฟอร์มเป็นการแจ้งความสนใจ ยังไม่ถือว่าเป็นการยืนยันการจองหรือชำระเงิน'],
    form: {
      name: ['ชื่อของคุณ', 'ชื่อ'],
      email: ['อีเมล', 'you@example.com'],
      phone: ['โทรศัพท์หรือ WhatsApp (ไม่บังคับ)', '+66…'],
      format: ['รูปแบบคอร์สที่สนใจ', 'เลือกรูปแบบ'],
      formats: [['public-online', 'คอร์สออนไลน์รอบถัดไป'], ['private-online', 'คอร์สออนไลน์ส่วนตัว'], ['in-person', 'คอร์สแบบพบกัน'], ['team', 'คอร์สสำหรับทีมหรือบริษัท']],
      schedule: ['วันหรือเวลาที่สะดวก (ไม่บังคับ)', 'เช่น เย็นวันธรรมดาในเดือนกันยายน'],
      goals: ['คุณอยากสร้างหรือเรียนรู้อะไร?', 'เล่าไอเดีย ประสบการณ์ปัจจุบัน และผลลัพธ์ที่อยากได้จากคอร์ส'],
      consent: ['ฉันยินยอมให้ DJAI Academy และ Siamese Cat Dev ใช้ข้อมูลนี้เพื่อตอบกลับเกี่ยวกับคำขอคอร์ส', 'อ่านนโยบายความเป็นส่วนตัว'],
      submit: ['ส่งความสนใจคอร์ส', 'กำลังส่ง…'],
      success: ['รับคำขอแล้ว', 'ขอบคุณ คำขอถูกส่งถึง Siamese Cat Dev แล้ว เราจะตอบกลับไปยังอีเมลที่คุณให้ไว้'],
      error: 'ไม่สามารถส่งคำขอได้ กรุณาตรวจข้อมูลแล้วลองอีกครั้ง',
    },
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
        <a className="course-nav-cta" href="#course-interest">{copy.nav[2]}</a>
      </nav>
    </header>
  );
}

function CourseFacts({ language }: { language: CourseLanguage }) {
  const facts = courseCopy[language].facts;
  const icons = [CalendarDays, Clock3, Video, Globe2];
  return (
    <dl className="event-facts" aria-label={language === 'th' ? 'รายละเอียดคอร์ส' : 'Course details'}>
      {facts.map(([label, value], index) => {
        const Icon = icons[index];
        return <div key={label}><Icon aria-hidden="true" /><dt>{label}</dt><dd>{value}</dd></div>;
      })}
    </dl>
  );
}

type InterestStatus = 'idle' | 'submitting' | 'success' | 'error';

function CourseInterestForm({ language }: { language: CourseLanguage }) {
  const copy = courseCopy[language].form;
  const id = useId();
  const [status, setStatus] = useState<InterestStatus>('idle');
  const [fields, setFields] = useState({
    name: '',
    email: '',
    phone: '',
    courseFormat: '',
    schedule: '',
    goals: '',
    consent: false,
    company: '',
  });

  const update = (field: keyof typeof fields, value: string | boolean) => {
    setFields((current) => ({ ...current, [field]: value }));
    if (status === 'error') setStatus('idle');
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('submitting');
    try {
      const response = await fetch('/api/course-interest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...fields, locale: language }),
      });
      if (!response.ok) throw new Error('Course interest request failed');
      setStatus('success');
      setFields({ name: '', email: '', phone: '', courseFormat: '', schedule: '', goals: '', consent: false, company: '' });
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="course-form-success" role="status" aria-live="polite">
        <MailCheck aria-hidden="true" />
        <div><h3>{copy.success[0]}</h3><p>{copy.success[1]}</p></div>
      </div>
    );
  }

  return (
    <form className="course-interest-form" id="course-interest" onSubmit={submit}>
      <div className="course-form-grid">
        <label htmlFor={`${id}-name`}><span>{copy.name[0]}</span><input id={`${id}-name`} name="name" autoComplete="name" required minLength={2} maxLength={100} placeholder={copy.name[1]} value={fields.name} onChange={(event) => update('name', event.target.value)} /></label>
        <label htmlFor={`${id}-email`}><span>{copy.email[0]}</span><input id={`${id}-email`} name="email" type="email" autoComplete="email" required maxLength={254} placeholder={copy.email[1]} value={fields.email} onChange={(event) => update('email', event.target.value)} /></label>
        <label htmlFor={`${id}-phone`}><span>{copy.phone[0]}</span><input id={`${id}-phone`} name="phone" type="tel" autoComplete="tel" maxLength={40} placeholder={copy.phone[1]} value={fields.phone} onChange={(event) => update('phone', event.target.value)} /></label>
        <label htmlFor={`${id}-format`}><span>{copy.format[0]}</span><select id={`${id}-format`} name="courseFormat" required value={fields.courseFormat} onChange={(event) => update('courseFormat', event.target.value)}><option value="" disabled>{copy.format[1]}</option>{copy.formats.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
        <label className="course-form-wide" htmlFor={`${id}-schedule`}><span>{copy.schedule[0]}</span><input id={`${id}-schedule`} name="schedule" maxLength={200} placeholder={copy.schedule[1]} value={fields.schedule} onChange={(event) => update('schedule', event.target.value)} /></label>
        <label className="course-form-wide" htmlFor={`${id}-goals`}><span>{copy.goals[0]}</span><textarea id={`${id}-goals`} name="goals" required minLength={10} maxLength={2000} rows={6} placeholder={copy.goals[1]} value={fields.goals} onChange={(event) => update('goals', event.target.value)} /></label>
      </div>
      <label className="course-bot-field" aria-hidden="true" htmlFor={`${id}-company`}>Company<input id={`${id}-company`} name="company" tabIndex={-1} autoComplete="off" value={fields.company} onChange={(event) => update('company', event.target.value)} /></label>
      <label className="course-consent" htmlFor={`${id}-consent`}><input id={`${id}-consent`} name="consent" type="checkbox" required checked={fields.consent} onChange={(event) => update('consent', event.target.checked)} /><span>{copy.consent[0]} <a href={language === 'th' ? '/privacy/' : '/privacy/en/'}>{copy.consent[1]}</a>.</span></label>
      <button className="course-button course-button-primary" type="submit" disabled={status === 'submitting'}>{status === 'submitting' ? copy.submit[1] : copy.submit[0]} <Send aria-hidden="true" /></button>
      <div className="course-form-status" role="status" aria-live="polite">{status === 'error' ? copy.error : ''}</div>
    </form>
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
              <a className="course-button course-button-primary" href="#course-interest">{copy.hero[3]} <ArrowRight aria-hidden="true" /></a>
              <a className="course-button course-button-secondary" href="#curriculum">{copy.hero[4]}</a>
            </div>
            <p className="course-account-note"><BadgeCheck aria-hidden="true" /> {copy.hero[5]}</p>
          </div>
          <div className="course-hero-visual">
            <div className="course-mascot-orbit" aria-hidden="true"><span>IDEA</span><span>BUILD</span><span>SHIP</span><span>SELL</span></div>
            <img src={assetPath('siamese-cat-dev-character.webp')} alt={language === 'th' ? 'Siamese Cat Dev กำลังพัฒนาซอฟต์แวร์' : 'Siamese Cat Dev building software on a laptop'} />
            <div className="course-price-card"><span>{copy.price[0]}</span><strong>{copy.price[1]}</strong><b>{copy.price[2]}</b></div>
          </div>
          <CourseFacts language={language} />
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
            <CourseFacts language={language} />
            <CourseInterestForm language={language} />
            <p className="course-delivery-note"><Users aria-hidden="true" /> {copy.register[4]}</p>
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

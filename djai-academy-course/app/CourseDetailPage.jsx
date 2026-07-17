import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  Code2,
  Coffee,
  Rocket,
  Sparkles,
  Users
} from "lucide-react";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";

const checkoutHref = "https://buy.stripe.com/aFa28r2F21L7dkxb0LgIo01";

const content = {
  th: {
    languageSwitch: "https://www.djai.academy/course/detail/en/",
    hero: {
      pill: "1 สิงหาคม 2026 | 09:30 - 16:00 น.",
      eyebrow: "AI Masterclass แบบลงมือทำเต็มวัน",
      title: "จากไอเดียสู่โปรดักต์ที่ใช้งานได้จริง",
      copy: "เรียนกระบวนการครบถ้วนในการเปลี่ยนไอเดียเป็นเว็บไซต์ แอป ระบบอัตโนมัติ หรือ digital product ด้วย AI พร้อมลงมือสร้างและเผยแพร่ผลงานภายในวันเดียว",
      schedule: "ดูตารางกิจกรรม",
      book: "จองตอนนี้"
    },
    schedule: {
      eyebrow: "กำหนดการ Workshop",
      title: "หนึ่งวันเต็มสำหรับการเรียน สร้าง และเชื่อมต่อ",
      copy: "ตั้งแต่การเตรียมตัวช่วงเช้าจนถึงการแลกเปลี่ยนไอเดียกับผู้สร้างคนอื่นในช่วงท้ายวัน",
      items: [
        {
          phase: "เปิดประตูและ Morning Briefing",
          time: "09:30 - 10:00 น.",
          title: "Warm-Up & Welcome",
          copy: "รับกาแฟ เลือกที่นั่ง ทำความรู้จักเพื่อนร่วมคลาส และเตรียมเครื่องมือให้พร้อมสำหรับการสร้างตลอดวัน",
          icon: Coffee
        },
        {
          phase: "Morning Deep-Dive Session",
          time: "10:00 - 12:00 น.",
          title: "Core AI & No-Code Lesson",
          copy: "เรียนและลงมือทำจริง เปลี่ยนจากแนวคิดพื้นฐานไปสู่การประยุกต์ใช้กับโปรเจกต์ของคุณ",
          icon: BrainCircuit
        },
        {
          phase: "Midday Break",
          time: "12:00 - 13:00 น.",
          title: "Lunch",
          copy: "พัก เติมพลัง และพูดคุยแลกเปลี่ยนกับผู้สร้างคนอื่นในคลาส",
          icon: Sparkles
        },
        {
          phase: "Afternoon Build Session",
          time: "13:00 - 15:00 น.",
          title: "Interactive Lesson & Implementation",
          copy: "นำความรู้ช่วงเช้ามาลงมือสร้าง ฟีเจอร์ เชื่อมส่วนประกอบ และพัฒนาโปรเจกต์ให้ใช้งานได้จริง",
          icon: Code2
        },
        {
          phase: "Happy Hour & Mix",
          time: "15:00 - 16:00 น.",
          title: "Networking Event",
          copy: "เชื่อมต่อกับผู้ประกอบการ นักสร้าง และทีม DJAI เพื่อแชร์ไอเดีย ประสบการณ์ และโอกาสใหม่",
          icon: Users
        }
      ]
    },
    curriculum: {
      eyebrow: "หลักสูตร Workshop",
      title: "From Idea To Live Product",
      copy: "เรียนกระบวนการครบถ้วนในการเปลี่ยนไอเดียเป็นเว็บไซต์ แอป automation หรือ digital product ด้วย AI",
      journey: ["ไอเดีย", "วางแผน", "สร้าง", "เปิดตัว"],
      parts: [
        {
          part: "ส่วนที่ 1",
          title: "AI Mindset & Vibe Coding Foundations",
          copy: "เข้าใจวิธีการสร้างด้วย AI สมัยใหม่และ mindset ที่ช่วยให้คุณสร้าง product ได้โดยไม่ต้องเริ่มจากการเขียนโค้ดแบบเดิม",
          points: [
            "AI เปลี่ยนกระบวนการสร้าง product อย่างไร",
            "ทำความเข้าใจ Vibe Coding workflow",
            "เลือกไอเดียโปรเจกต์ที่เหมาะสม",
            "วางแผนการสร้างครั้งแรก"
          ],
          outcome: "ไอเดียโปรเจกต์ที่ผ่านการตรวจสอบและ roadmap ที่ชัดเจน",
          icon: BrainCircuit
        },
        {
          part: "ส่วนที่ 2",
          title: "Project Planning & Design",
          copy: "เปลี่ยนไอเดียให้เป็นแผนที่มีโครงสร้างก่อนเริ่มลงมือสร้าง",
          points: [
            "กำหนด project requirements",
            "ออกแบบ user experience และ flow",
            "วาง project architecture",
            "ใช้ AI ช่วยในการวางแผน"
          ],
          outcome: "Project blueprint ที่ครบถ้วนและพร้อมนำไปสร้าง",
          icon: Sparkles
        },
        {
          part: "ส่วนที่ 3",
          title: "Build Your Product With AI",
          copy: "ใช้เครื่องมือ AI สร้างเว็บไซต์ แอป หรือระบบ automation ของคุณ",
          points: [
            "สร้างฟีเจอร์ด้วย AI",
            "เชื่อมหน้าและ component",
            "ใช้ prompt อย่างมีประสิทธิภาพ",
            "ทดสอบและปรับปรุง functionality"
          ],
          outcome: "Product prototype ที่ทำงานได้จริง",
          icon: Code2
        },
        {
          part: "ส่วนที่ 4",
          title: "Launch, Improve & Scale",
          copy: "Deploy โปรเจกต์และเรียนรู้วิธีพัฒนาต่อหลังจากเปิดใช้งาน",
          points: [
            "Deploy โปรเจกต์ขึ้นระบบจริง",
            "แก้ bug และปรับปรุงผลงาน",
            "เก็บ feedback จากผู้ใช้",
            "วางแนวทางต่อยอดและ scale ไอเดีย"
          ],
          outcome: "โปรเจกต์ออนไลน์ที่พร้อมแชร์ให้ผู้ใช้งานจริง",
          icon: Rocket
        }
      ]
    },
    cta: {
      eyebrow: "Workshop รอบถัดไป",
      title: "พร้อมเปลี่ยนไอเดียของคุณให้เป็นของจริงหรือยัง?",
      copy: "1 สิงหาคม 2026 เวลา 09:30 - 16:00 น. ที่ Siamese Cat Learning Center ที่นั่งมีจำนวนจำกัดเพื่อให้ผู้สอนได้ดูแลทุกโปรเจกต์อย่างทั่วถึง",
      price: "5,999 บาทต่อท่าน",
      book: "จองตอนนี้"
    },
    top: "กลับขึ้นด้านบน"
  },
  en: {
    languageSwitch: "https://www.djai.academy/course/detail/",
    hero: {
      pill: "1 August 2026 | 09:30 AM - 04:00 PM",
      eyebrow: "One-Day Hands-On AI Masterclass",
      title: "From Idea to a Live Product",
      copy: "Learn the complete process of turning an idea into a real website, application, automation, or digital product using AI, then build and launch it in one focused day.",
      schedule: "View Schedule",
      book: "Book Now"
    },
    schedule: {
      eyebrow: "Workshop Itinerary",
      title: "One focused day to learn, build, and connect",
      copy: "Move from a calm morning setup to practical implementation, then finish the day by sharing ideas with other builders.",
      items: [
        {
          phase: "Doors Open & Morning Briefing",
          time: "09:30 AM - 10:00 AM",
          title: "Warm-Up & Welcome",
          copy: "Grab a coffee, settle in, meet your peers, and get set up for the day's build.",
          icon: Coffee
        },
        {
          phase: "Morning Deep-Dive Session",
          time: "10:00 AM - 12:00 PM",
          title: "Core AI & No-Code Lesson",
          copy: "Hands-on building. We transition from concepts to actual practical application.",
          icon: BrainCircuit
        },
        {
          phase: "Midday Break",
          time: "12:00 PM - 01:00 PM",
          title: "Lunch",
          copy: "Unwind, refuel, and chat with fellow creators.",
          icon: Sparkles
        },
        {
          phase: "Afternoon Build Session",
          time: "01:00 PM - 03:00 PM",
          title: "Interactive Lesson & Implementation",
          copy: "Put the morning's theory into action and ship features live.",
          icon: Code2
        },
        {
          phase: "Happy Hour & Mix",
          time: "03:00 PM - 04:00 PM",
          title: "Networking Event",
          copy: "Connect with other entrepreneurs, builders, and the DJAI team to share ideas.",
          icon: Users
        }
      ]
    },
    curriculum: {
      eyebrow: "Workshop Curriculum",
      title: "From Idea To Live Product",
      copy: "Learn the complete process of turning an idea into a real website, application, automation, or digital product using AI.",
      journey: ["Idea", "Plan", "Build", "Launch"],
      parts: [
        {
          part: "Part 1",
          title: "AI Mindset & Vibe Coding Foundations",
          copy: "Understand how modern AI creation works and the mindset behind building without traditional coding.",
          points: [
            "How AI changes product creation",
            "Understanding Vibe Coding workflows",
            "Choosing the right project idea",
            "Planning your first build"
          ],
          outcome: "A validated project idea and clear roadmap",
          icon: BrainCircuit
        },
        {
          part: "Part 2",
          title: "Project Planning & Design",
          copy: "Transform your idea into a structured plan before building.",
          points: [
            "Defining project requirements",
            "Designing user experience and flow",
            "Creating project architecture",
            "AI-assisted planning techniques"
          ],
          outcome: "A complete project blueprint ready to build",
          icon: Sparkles
        },
        {
          part: "Part 3",
          title: "Build Your Product With AI",
          copy: "Use AI tools to create your website, application, or automation.",
          points: [
            "Building features with AI",
            "Connecting pages and components",
            "Working with prompts effectively",
            "Testing and refining functionality"
          ],
          outcome: "A fully working product prototype",
          icon: Code2
        },
        {
          part: "Part 4",
          title: "Launch, Improve & Scale",
          copy: "Deploy your project and learn how to improve it after launch.",
          points: [
            "Deploying your project live",
            "Fixing bugs and making improvements",
            "Gathering feedback",
            "Scaling your ideas further"
          ],
          outcome: "A live project you can share with the world",
          icon: Rocket
        }
      ]
    },
    cta: {
      eyebrow: "Upcoming Workshop",
      title: "Ready to turn your idea into something real?",
      copy: "1 August 2026, 09:30 AM - 04:00 PM at Siamese Cat Learning Center. Seats are limited so every project receives practical guidance.",
      price: "THB 5,999 per person",
      book: "Book Now"
    },
    top: "Back to top"
  }
};

function Eyebrow({ children }) {
  return (
    <div className="eyebrow">
      <span />
      {children}
      <span />
    </div>
  );
}

export default function CourseDetailPage({ locale = "th" }) {
  const language = locale === "en" ? "en" : "th";
  const copy = content[language];
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Event",
        name: "DJAI Academy AI Masterclass: From Idea to Live Product",
        startDate: "2026-08-01T09:30:00+07:00",
        endDate: "2026-08-01T16:00:00+07:00",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        eventStatus: "https://schema.org/EventScheduled",
        location: {
          "@type": "Place",
          name: "Siamese Cat Learning Center",
          address: {
            "@type": "PostalAddress",
            streetAddress: "46/27 Bangna-Trad Road, Bang Kaeo",
            addressLocality: "Bang Phli",
            addressRegion: "Samut Prakan",
            postalCode: "10540",
            addressCountry: "TH"
          }
        },
        offers: {
          "@type": "Offer",
          price: "5999",
          priceCurrency: "THB",
          availability: "https://schema.org/LimitedAvailability",
          url: checkoutHref
        },
        organizer: {
          "@type": "Organization",
          name: "DJAI Academy",
          url: "https://www.djai.academy/"
        }
      },
      {
        "@type": "Course",
        name: "From Idea to Live Product",
        description: copy.curriculum.copy,
        provider: {
          "@type": "Organization",
          name: "DJAI Academy",
          sameAs: "https://www.djai.academy/"
        }
      }
    ]
  };

  return (
    <main id="home" className="site-shell course-detail-page" lang={language}>
      <SiteHeader locale={language} switchLanguageHref={copy.languageSwitch} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="detail-hero">
        <img
          src="/course/assets/community2.webp"
          alt={language === "en" ? "DJAI Academy hands-on workshop" : "Workshop แบบลงมือทำของ DJAI Academy"}
        />
        <div className="detail-hero-shade" />
        <div className="detail-hero-content">
          <div className="pill">
            <span className="pulse-dot" />
            {copy.hero.pill}
          </div>
          <span className="detail-kicker">{copy.hero.eyebrow}</span>
          <h1>{copy.hero.title}</h1>
          <p>{copy.hero.copy}</p>
          <div className="hero-actions">
            <a className="button" href={checkoutHref}>
              {copy.hero.book} <ArrowRight size={18} />
            </a>
            <a className="button button-ghost" href="#schedule">
              {copy.hero.schedule}
            </a>
          </div>
        </div>
      </section>

      <section id="schedule" className="section detail-section">
        <Eyebrow>{copy.schedule.eyebrow}</Eyebrow>
        <div className="section-heading centered">
          <h2>{copy.schedule.title}</h2>
          <p>{copy.schedule.copy}</p>
        </div>
        <div className="schedule-list">
          {copy.schedule.items.map((item, index) => {
            const Icon = item.icon;
            return (
              <article className="schedule-row" key={item.time}>
                <div className="schedule-index">{String(index + 1).padStart(2, "0")}</div>
                <div className="schedule-time">{item.time}</div>
                <div className="schedule-icon">
                  <Icon size={24} />
                </div>
                <div className="schedule-copy">
                  <span>{item.phase}</span>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="detail-curriculum-band">
        <div className="section detail-section">
          <Eyebrow>{copy.curriculum.eyebrow}</Eyebrow>
          <div className="section-heading centered">
            <h2>{copy.curriculum.title}</h2>
            <p>{copy.curriculum.copy}</p>
          </div>
          <div className="journey-steps" aria-label={copy.curriculum.eyebrow}>
            {copy.curriculum.journey.map((step, index) => (
              <div key={step}>
                <span>{index + 1}</span>
                <strong>{step}</strong>
              </div>
            ))}
          </div>
          <div className="detail-curriculum-grid">
            {copy.curriculum.parts.map((part) => {
              const Icon = part.icon;
              return (
                <article className="detail-curriculum-card" key={part.part}>
                  <div className="detail-card-heading">
                    <div className="detail-card-icon">
                      <Icon size={26} />
                    </div>
                    <span>{part.part}</span>
                  </div>
                  <h3>{part.title}</h3>
                  <p>{part.copy}</p>
                  <ul>
                    {part.points.map((point) => (
                      <li key={point}>
                        <CheckCircle2 size={17} />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <div className="detail-outcome">
                    <strong>Outcome</strong>
                    <span>{part.outcome}</span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section detail-cta">
        <div>
          <span>{copy.cta.eyebrow}</span>
          <h2>{copy.cta.title}</h2>
          <p>{copy.cta.copy}</p>
        </div>
        <div className="detail-cta-action">
          <strong>{copy.cta.price}</strong>
          <a className="button" href={checkoutHref}>
            {copy.cta.book} <ArrowRight size={18} />
          </a>
        </div>
      </section>

      <SiteFooter locale={language} />
      <a className="scroll-top" href="#home" aria-label={copy.top}>
        <ArrowRight size={20} />
      </a>
    </main>
  );
}

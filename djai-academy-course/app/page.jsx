import {
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  Code2,
  Cpu,
  Laptop,
  MapPin,
  MonitorSmartphone,
  Rocket,
  Sparkles,
  Users
} from "lucide-react";
import NewsletterSignup from "./NewsletterSignup";
import SiteHeader from "./SiteHeader";

const reserveHref =
  "https://buy.stripe.com/dRm5kD2F2ahD1BP2ufgIo00";
const mapHref =
  "https://www.google.com/maps/search/?api=1&query=House%2C%2046%2F27%20Bangna-Trad%20Road%2C%20Bang%20Kaeo%2C%20Bang%20Phli%20District%2C%20Samut%20Prakan%2010540";

const BASE_PATH = "/course";
const assetPath = (path) => `${BASE_PATH}/assets/${path}`;

const siteLinks = {
  academy: "https://www.djai.academy/",
  tools: "https://www.djai.academy/tools/",
  services: "https://www.djai.academy/service/",
  courses: "https://www.djai.academy/course/",
  community: "https://www.djai.academy/course/#community",
  portfolio: "https://www.djai.academy/portfolio/",
  promo: "https://www.djai.academy/course/#pricing",
  development: "https://www.djai.academy/development/",
  blog: "https://www.djai.academy/blog/"
};

const footerColumns = [
  {
    title: "เรียนรู้",
    links: [
      ["เข้าร่วมคอร์ส Offline", siteLinks.courses],
      ["คอร์สที่กำลังเปิด", siteLinks.courses],
      ["บล็อก", siteLinks.blog]
    ]
  },
  {
    title: "สร้างกับเรา",
    links: [
      ["พัฒนาโปรเจกต์", siteLinks.development],
      ["บริการ", siteLinks.services],
      ["ผลงาน", siteLinks.portfolio],
      ["โปรโมชัน", siteLinks.promo]
    ]
  },
  {
    title: "Community",
    links: [
      ["เข้าร่วม Online Community", siteLinks.community],
      ["เครื่องมือฟรี", siteLinks.tools],
      ["โปรเจกต์ Open-source", null]
    ]
  }
];

const contactChannels = [
  "WhatsApp",
  "LINE",
  "Facebook",
  "Instagram",
  "TikTok",
  "X"
];

const communityImages = [
  ["community2.webp", "นักเรียนกำลังนำเสนอผลงาน AI บนเวที"],
  ["community4.webp", "วิทยากร DJAI สอนการสร้างภาพด้วย AI"],
  ["community1.webp", "ภาพกลุ่มนักเรียน workshop ของ DJAI Academy"],
  ["community8.webp", "คลาสอบรม digital transformation"],
  ["community3.webp", "นักเรียนและผู้สอนหลังจบคลาส AI"],
  ["community6.webp", "กลุ่มอบรม AI สำหรับองค์กร"],
  ["community5.webp", "กลุ่ม workshop partner ของ DJAI Academy"],
  ["community7.webp", "การนำเสนอคลาส AI transformation"]
];

const includedItems = [
  "Workshop ปฏิบัติจริงเต็มวัน",
  "8 ชั่วโมงของการสร้างงานด้วย AI แบบมีผู้แนะนำ",
  "เส้นทางสร้าง product ทีละขั้นตอน",
  "โปรเจกต์จริงที่สร้างด้วย AI",
  "Template, prompt และ workflow สำหรับนำไปใช้ต่อ",
  "เหมาะกับผู้เริ่มต้น",
  "ใบรับรองหลังจบ workshop",
  "เอกสารอ้างอิงหลัง workshop"
];

const curriculum = [
  {
    label: "คิด",
    title: "จัดรูปไอเดีย",
    copy: "เลือกแนวคิด product ที่มีประโยชน์ กำหนดกลุ่มผู้ใช้ และวางประสบการณ์ก่อนเริ่มใช้เครื่องมือ",
    icon: BrainCircuit
  },
  {
    label: "อธิบาย",
    title: "สั่งงาน AI ให้ชัด",
    copy: "เปลี่ยนไอเดียเป็น prompt, requirement, หน้าจอ, workflow และงานที่ต้องทำเพื่อ launch",
    icon: Sparkles
  },
  {
    label: "สร้าง",
    title: "สร้าง product",
    copy: "ใช้เครื่องมือ AI เพื่อ generate, ปรับแต่ง, ทดสอบ และพัฒนาเว็บไซต์ แอป หรือ automation ที่ใช้งานได้จริง",
    icon: Code2
  },
  {
    label: "Launch",
    title: "ปล่อยงานให้ใช้งานจริง",
    copy: "เตรียม demo เผยแพร่ผลงาน และกลับไปพร้อม workflow ที่ทำซ้ำได้สำหรับโปรเจกต์ต่อไป",
    icon: Rocket
  }
];

const faqs = [
  {
    q: "ต้องมีพื้นฐานเขียนโปรแกรมไหม?",
    a: "ไม่จำเป็น คลาสนี้ออกแบบมาสำหรับ founder, นักเรียน, creator, manager และเจ้าของธุรกิจที่อยากสร้างด้วย AI โดยไม่ต้องเริ่มจากการเขียนโค้ดแบบเดิม"
  },
  {
    q: "จะได้สร้างอะไรในคลาส?",
    a: "คุณจะได้สร้างแนวทาง digital product จริง เช่น landing page, app prototype, automation, AI workflow หรือ business tool ตามไอเดียและจังหวะของ workshop"
  },
  {
    q: "Workshop หนึ่งวันหรือสี่วัน?",
    a: "หน้านี้ปรับเป็น workshop แบบเข้มข้น 1 วัน วันที่ 25 July เวลา 09:30 AM ถึง 04:00 PM รวม 8 ชั่วโมงของการเรียนแบบลงมือทำ"
  },
  {
    q: "จองที่นั่งอย่างไร?",
    a: "กดปุ่ม Reserve Your Seat เพื่อชำระเงินผ่าน Stripe อย่างปลอดภัย ที่นั่งมีจำนวนจำกัดเพื่อให้คลาสยัง practical, interactive และลงมือทำได้จริง"
  }
];

function Eyebrow({ children }) {
  return (
    <div className="eyebrow">
      <span />
      {children}
      <span />
    </div>
  );
}

function GradientText({ children }) {
  return <span className="gradient-text">{children}</span>;
}

function GlowIcon({ children, tone = "cyan" }) {
  return <div className={`glow-icon ${tone}`}>{children}</div>;
}

export default function Home() {
  return (
    <main id="home" className="site-shell" lang="th">
      <SiteHeader locale="th" />

      <section className="hero section">
        <div className="hero-copy">
          <div className="pill">
            <span className="pulse-dot" />
            DJAI Academy | AI Masterclass
          </div>
          <h1>
            สร้างแอป AI ใช้งานจริง <GradientText>โดยไม่ต้องเขียนโค้ด</GradientText>
          </h1>
          <p>
            เปลี่ยนไอเดียให้เป็น digital product ที่ใช้งานได้จริงด้วยเครื่องมือ AI,
            workflow ที่ฉลาด และระบบ no-code ที่ practical แม้คุณไม่มีพื้นฐาน programming
          </p>

          <div className="event-strip">
            <span className="pulse-dot" />
            <strong>Workshop รอบถัดไป:</strong>
            <span>25 July | 09:30 AM - 04:00 PM</span>
            <em>ที่นั่งจำกัด</em>
            <ChevronRight size={16} />
          </div>

          <div className="hero-actions">
            <a className="button" href={reserveHref}>
              จองที่นั่งสำหรับ 25 July <ArrowRight size={18} />
            </a>
            <a className="button button-ghost" href="#curriculum">
              ดูรายละเอียดคอร์ส <ArrowUpRight size={18} />
            </a>
          </div>

          <div className="hero-metrics" aria-label="จุดเด่นของ workshop">
            <div>
              <strong>1 วัน</strong>
              <span>เส้นทางการสร้าง</span>
            </div>
            <div>
              <strong>8 ชั่วโมง</strong>
              <span>ลงมือทำจริง</span>
            </div>
            <div>
              <strong>1 แอป</strong>
              <span>พร้อม demo จริง</span>
            </div>
          </div>
        </div>

        <div className="hero-visual" aria-label="ผู้สอน DJAI Academy">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <img
            className="instructor"
            src={assetPath("Instructor-DJAI.webp")}
            alt="ผู้สอน DJAI Academy"
          />
          <div className="floating-badge badge-ai">
            <span className="pulse-dot" />
            AI Tools
          </div>
          <div className="floating-badge badge-no-code">
            <span className="pulse-dot" />
            No-Code Apps
          </div>
          <div className="floating-badge badge-deploy">
            <span className="pulse-dot" />
            Deploy Live
          </div>
        </div>
      </section>

      <section className="section creator-gap">
        <Eyebrow>ช่องว่างของคนสร้าง</Eyebrow>
        <div className="section-heading centered">
          <h2>
            หลายคนใช้ AI <br />
            แต่มีไม่กี่คนที่ <GradientText>สร้างสิ่งใหม่ด้วย AI</GradientText>
          </h2>
          <p>
            โอกาสถัดไปไม่ใช่แค่รู้วิธี prompt แต่คือการเปลี่ยนไอเดีย
            ให้เป็น application, business และ system ที่ใช้งานได้จริง
          </p>
        </div>

        <div className="stat-grid">
          <article className="glass-card">
            <GlowIcon>
              <Cpu size={28} />
            </GlowIcon>
            <div>
              <strong>ใช้ AI</strong>
              <h3>ทำงานเร็วขึ้นทุกวัน</h3>
              <p>
                ค้นหา เขียน วางแผน และสร้าง content ด้วยเครื่องมือ AI สมัยใหม่
              </p>
            </div>
          </article>
          <article className="glass-card violet-card">
            <GlowIcon tone="violet">
              <BrainCircuit size={28} />
            </GlowIcon>
            <div>
              <strong>สร้าง</strong>
              <h3>ไปไกลกว่า prompt</h3>
              <p>
                เปลี่ยน concept เป็น workflow, หน้าจอ, automation และ logic ของ product จริง
              </p>
            </div>
          </article>
          <article className="glass-card silver-card">
            <GlowIcon tone="silver">
              <Users size={28} />
            </GlowIcon>
            <div>
              <strong>Launch</strong>
              <h3>สร้างโอกาสของตัวเอง</h3>
              <p>
                เรียน mindset ของคนสร้าง เพื่อให้คุณลงมือปล่อยงานจริง ไม่ใช่แค่เฝ้าดูคลื่น AI
              </p>
            </div>
          </article>
        </div>

        <div className="wide-callout">
          <GlowIcon>
            <BrainCircuit size={28} />
          </GlowIcon>
          <p>
            คนสร้างรุ่นถัดไปจะโดดเด่นจากความสามารถในการ{" "}
            <GradientText>เปลี่ยนจินตนาการให้เป็นจริงด้วย AI</GradientText>
          </p>
        </div>
      </section>

      <section id="community" className="section split-section community">
        <div className="photo-grid" aria-label="ภาพ community ของ DJAI Academy">
          {communityImages.map(([src, alt]) => (
            <img key={src} src={assetPath(src)} alt={alt} />
          ))}
        </div>

        <div className="split-copy">
          <Eyebrow>Vibe Coding คืออะไร?</Eyebrow>
          <h2>
            เปลี่ยนไอเดียให้เป็นจริงโดยไม่ต้องเป็น{" "}
            <GradientText>Developer</GradientText>
          </h2>
          <p>
            Vibe Coding คือวิธีสร้างงานแบบใหม่ที่ AI กลายเป็น technical partner ของคุณ
          </p>
          <p>
            แทนที่จะใช้เวลาหลายปีเรียนภาษา programming, framework และเครื่องมือพัฒนาที่ซับซ้อน
            คุณโฟกัสที่ไอเดีย แล้วให้ AI ช่วยสร้างมันขึ้นมา
          </p>
          <p>
            คุณอธิบายสิ่งที่ต้องการ ปรับให้ดีขึ้นผ่านการคุยกับ AI
            และเปลี่ยน concept เป็นเว็บไซต์ แอป automation เครื่องมือธุรกิจ และ digital product
          </p>

          <div className="journey-strip" aria-label="เส้นทางการสร้าง">
            <span>เส้นทางการสร้าง</span>
            <b>คิด</b>
            <ChevronRight size={14} />
            <b>อธิบาย</b>
            <ChevronRight size={14} />
            <b>สร้าง</b>
            <ChevronRight size={14} />
            <b>Launch</b>
          </div>

          <blockquote>
            Vibe Coding ไม่ได้มาแทนความคิดสร้างสรรค์{" "}
            <span>
              แต่มันช่วยลดกำแพงด้านเทคนิค เพื่อให้คนจำนวนมากขึ้นสามารถสร้าง launch และ innovate ได้
            </span>
          </blockquote>
        </div>
      </section>

      <section className="section apps-section">
        <div className="apps-copy">
          <Eyebrow>จากไอเดียสู่แอปใช้งานจริง</Eyebrow>
          <h2>
            สร้างแอปจริง <GradientText>โดยไม่ต้องเขียนโค้ด</GradientText>
          </h2>
          <p>
            เปลี่ยนไอเดียเป็น digital product จริงด้วย AI ออกแบบ ปรับแต่ง
            ทดสอบ และ launch workflow ระดับมืออาชีพผ่านการคุยที่ชัดเจนแทนการเขียนโค้ดแบบเดิม
          </p>
          <p>
            Launch ได้เร็วขึ้น ปรับปรุงได้ไวขึ้น และทำให้ vision ของคุณเกิดขึ้นจริง
            ด้วยเครื่องมือสมัยใหม่สำหรับ creator และ innovator
          </p>

          <div className="benefit-row">
            <div>
              <GlowIcon tone="violet">
                <Sparkles size={24} />
              </GlowIcon>
              <strong>No Code</strong>
              <span>เริ่มจากไอเดียของคุณ</span>
            </div>
            <div>
              <GlowIcon>
                <Rocket size={24} />
              </GlowIcon>
              <strong>Ship Fast</strong>
              <span>Launch ได้ภายในวันเดียว</span>
            </div>
          </div>

          <div className="quote-panel">
            <span>Launch แอปได้เร็วกว่าเดิม</span>
            <p>
              สร้าง product ที่ขับเคลื่อนด้วย AI โดยลด dependency, delay และความซับซ้อนที่ไม่จำเป็น
            </p>
          </div>
        </div>

        <div className="phone-stage">
          <div className="phone-glow" />
          <img
            src={assetPath("719233138_122103496575327302_5083318908732239582_n.webp")}
            alt="ตัวอย่างหน้าจอ mobile app ที่สร้างผ่าน AI workflow"
          />
        </div>
      </section>

      <section id="curriculum" className="section curriculum">
        <Eyebrow>หลักสูตร Workshop</Eyebrow>
        <div className="section-heading centered">
          <h2>
            เรียนเส้นทาง <GradientText>AI Build Journey</GradientText> แบบครบขั้นตอน
          </h2>
          <p>
            โครงสร้าง 1 วันที่ practical ตั้งแต่จัดความชัดเจนของไอเดียจนถึง product ที่ใช้งานได้จริง
          </p>
        </div>

        <div className="curriculum-grid">
          {curriculum.map((item) => {
            const Icon = item.icon;
            return (
              <article className="glass-card curriculum-card" key={item.label}>
                <GlowIcon tone={item.label === "อธิบาย" ? "violet" : "cyan"}>
                  <Icon size={26} />
                </GlowIcon>
                <span>{item.label}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section id="pricing" className="section pricing">
        <Eyebrow>ราคาคอร์ส</Eyebrow>
        <div className="section-heading centered">
          <h2>
            AI <GradientText>Masterclass</GradientText>
          </h2>
          <p>
            เข้าร่วม AI Masterclass และเรียนรู้วิธีเปลี่ยนไอเดียเป็นเว็บไซต์
            แอป automation และ digital product โดยไม่จำเป็นต้องมีพื้นฐาน programming
          </p>
        </div>

        <div className="workshop-card">
          <div className="workshop-main">
            <span className="mini-label">Workshop รอบถัดไป</span>
            <h3>
              เข้าร่วม <GradientText>AI Masterclass</GradientText> รอบถัดไป
            </h3>
            <p>
              เริ่มก้าวแรกสู่โลกของการสร้างด้วย AI ผ่าน workshop ที่ลงมือทำจริง
            </p>

            <div className="info-grid">
              <div>
                <span>วันที่</span>
                <strong>25 July</strong>
              </div>
              <div>
                <span>เวลา</span>
                <strong>09:30 AM - 04:00 PM</strong>
              </div>
              <div>
                <span>สถานที่</span>
                <strong>Siamese Cat Learning Center</strong>
              </div>
              <div>
                <span>ติดต่อ</span>
                <strong>contact@djai.academy</strong>
              </div>
            </div>

            <p className="address">
              House, 46/27 Bangna-Trad Road, Bang Kaeo, Bang Phli District,
              Samut Prakan 10540
            </p>

            <div className="workshop-actions">
              <a className="button button-map" href={mapHref} target="_blank" rel="noreferrer">
                ดู Google Map <MapPin size={18} />
              </a>
              <a className="button" href={reserveHref}>
                Reserve Your Seat
              </a>
            </div>
          </div>

          <aside className="date-tile" aria-label="วันที่ workshop">
            <div>
              <strong>25</strong>
              <span>July</span>
            </div>
            <p>ที่นั่งมีจำนวนจำกัด</p>
          </aside>
        </div>

        <div className="price-grid">
          <article className="price-card">
            <span>AI Masterclass</span>
            <h3>
              <small>THB</small> 5,999 <del>8,999</del>
            </h3>
            <p>ชำระครั้งเดียวต่อท่าน รวมสิทธิ์เข้าร่วม workshop เต็มรูปแบบ</p>
            <a className="button" href={reserveHref}>
              Reserve Your Seat <ArrowRight size={18} />
            </a>
            <small>จองที่นั่งของคุณใน AI Masterclass รอบถัดไป</small>
          </article>

          <article className="included-card">
            <h3>สิ่งที่รวมในคอร์ส</h3>
            <ul>
              {includedItems.map((item) => (
                <li key={item}>
                  <CheckCircle2 size={18} />
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <article className="seat-card">
            <GlowIcon tone="violet">
              <Users size={32} />
            </GlowIcon>
            <h3>
              ที่นั่ง <GradientText>มีจำนวนจำกัด</GradientText>
            </h3>
            <p>
              เพื่อให้ workshop โต้ตอบได้จริงและลงมือทำได้ทั่วถึง เราจำกัดจำนวนผู้เข้าร่วมแต่ละรอบ
            </p>
          </article>
        </div>

        <div className="value-strip">
          <div>
            <Code2 size={28} />
            <strong>ไม่ต้องเขียนโค้ด</strong>
            <span>เริ่มจากพื้นฐานและสร้างทีละขั้นตอน</span>
          </div>
          <div>
            <Laptop size={28} />
            <strong>เรียนด้วยการสร้าง</strong>
            <span>สร้างโปรเจกต์จริงแทนการนั่งดู lesson อย่างเดียว</span>
          </div>
          <div>
            <Rocket size={28} />
            <strong>Launch สิ่งที่ใช้งานได้จริง</strong>
            <span>กลับไปพร้อม project ที่สร้างด้วย AI และพร้อม demo</span>
          </div>
        </div>

        <div className="launch-banner">
          <MonitorSmartphone size={56} />
          <div>
            <h3>
              เรียนรู้ <GradientText>สร้าง และ Launch</GradientText>
            </h3>
            <p>เปลี่ยนไอเดียของคุณให้เป็น product จริงใน 1 วัน</p>
          </div>
        </div>
      </section>

      <section id="faqs" className="section faqs">
        <Eyebrow>FAQ</Eyebrow>
        <div className="section-heading centered">
          <h2>
            คำถามก่อน <GradientText>จองที่นั่ง?</GradientText>
          </h2>
        </div>

        <div className="faq-grid">
          {faqs.map((faq) => (
            <article className="glass-card" key={faq.q}>
              <h3>{faq.q}</h3>
              <p>{faq.a}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="footer">
        <div className="footer-grid">
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3>{column.title}</h3>
              {column.links.map(([label, href]) =>
                href ? (
                  <a key={label} href={href}>
                    {label}
                  </a>
                ) : (
                  <span className="footer-muted-link" key={label}>
                    {label}
                  </span>
                )
              )}
            </div>
          ))}

          <div className="footer-contact">
            <h3>ติดต่อ</h3>
            <div className="contact-list">
              {contactChannels.map((channel) => (
                <span key={channel}>{channel}</span>
              ))}
              <a href="mailto:contact@djai.academy">Email: contact@djai.academy</a>
            </div>
          </div>
        </div>

        <NewsletterSignup locale="th" />

        <div className="copyright">(c) 2026 DJAI Academy. สงวนลิขสิทธิ์</div>
      </footer>

      <a className="scroll-top" href="#home" aria-label="กลับขึ้นด้านบน">
        <ArrowRight size={20} />
      </a>
    </main>
  );
}

import Image from "next/image";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";

export const metadata = {
  title: "DJAI Academy | เรียน AI สร้างซอฟต์แวร์ และพัฒนาโปรเจกต์",
  description:
    "DJAI Academy ช่วยให้คุณเรียน AI ใช้เครื่องมือฟรี และพัฒนาเว็บไซต์ แอป SaaS ระบบอัตโนมัติ เกม Fintech และ Web3 ได้เร็วขึ้น",
  alternates: {
    canonical: "/",
    languages: {
      en: "/en/",
      th: "/"
    }
  },
  openGraph: {
    title: "DJAI Academy",
    description:
      "เรียน AI สร้างโปรเจกต์ และพัฒนาซอฟต์แวร์กับ DJAI Academy",
    url: "/",
    siteName: "DJAI Academy",
    images: ["/djai-logo.webp"],
    type: "website"
  }
};

const routes = [
  {
    eyebrow: "เรียน",
    title: "คอร์ส Vibe Coding และ AI",
    text: "คอร์สสำหรับผู้เริ่มต้น เจ้าของธุรกิจ ครีเอเตอร์ และนักพัฒนาที่อยากสร้างงานเร็วขึ้นด้วย AI",
    href: "https://www.djai.academy/course/",
    action: "ดูคอร์สเรียน"
  },
  {
    eyebrow: "เข้าร่วม",
    title: "ชุมชนคนสร้างโปรเจกต์",
    text: "ติดตามความรู้ เครื่องมือฟรี และแนวคิดการสร้างโปรดักต์สำหรับยุค AI",
    href: "https://www.djai.academy/course/#community",
    action: "เข้าร่วมชุมชน"
  },
  {
    eyebrow: "สร้าง",
    title: "ทีมพัฒนาซอฟต์แวร์",
    text: "ให้ DJAI ช่วยสร้าง MVP เว็บไซต์ แอป ระบบอัตโนมัติ เกม SaaS และแพลตฟอร์มธุรกิจ",
    href: "https://www.djai.academy/service/",
    action: "ดูบริการ"
  }
];

const pillars = [
  {
    title: "Educate",
    text: "สอน AI, vibe coding, automation และวิธีคิดแบบคนสร้างโปรดักต์จริง"
  },
  {
    title: "Build",
    text: "ช่วยเปลี่ยนไอเดียให้เป็น MVP เว็บไซต์ แอป เกม ระบบภายใน และ SaaS ที่ใช้งานได้จริง"
  },
  {
    title: "Deploy",
    text: "วางแผน พัฒนา เปิดใช้งาน และต่อยอดโปรเจกต์ให้เหมาะกับงบและเวลาของลูกค้า"
  }
];

const toolCards = ["เครื่องมือชุมชน", "ตัวช่วยงาน AI", "โปรเจกต์ทดลอง", "ต้นแบบ MVP"];

export default function ThaiHomePage() {
  return (
    <>
      <SiteHeader locale="th" currentRoute="home" />
      <main id="top">
        <section className="hero">
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">AI Academy และทีมพัฒนาโปรเจกต์ในกรุงเทพ</p>
              <h1>DJAI Academy</h1>
              <p className="hero-line">เรียนรู้ สร้าง และเปิดตัวโปรเจกต์</p>
              <p className="hero-text">
                DJAI คือพื้นที่สำหรับคนที่อยากใช้ AI เพื่อสร้างงานจริง ไม่ว่าจะเป็นการเรียน
                vibe coding การทำ automation การสร้างเว็บไซต์ แอป เครื่องมือภายใน เกม หรือ
                โปรดักต์ดิจิทัลสำหรับธุรกิจ
              </p>
              <div className="hero-actions">
                <a className="button primary" href="https://www.djai.academy/course/#community">
                  เข้าร่วมชุมชนฟรี
                </a>
                <a className="button secondary" href="https://www.djai.academy/course/">
                  ดูคอร์สเรียน
                </a>
                <a className="button ghost" href="https://www.djai.academy/development/">
                  พัฒนาโปรเจกต์กับ DJAI
                </a>
              </div>
            </div>

            <div className="hero-visual" aria-label="DJAI Academy brand visual">
              <div className="orbit one" />
              <div className="orbit two" />
              <div className="logo-plate">
                <Image src="/djai-logo-display.webp" alt="DJAI Academy logo" width={768} height={413} loading="eager" />
              </div>
              <img
                className="founder"
                src="/founder-djai-display.webp"
                srcSet="/founder-djai-mobile.webp 640w, /founder-djai-display.webp 912w"
                sizes="(max-width: 640px) 86vw, (max-width: 1024px) 420px, 440px"
                alt="DJAI Academy founder"
                width="912"
                height="1440"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
              <div className="signal-card">
                <span>AI + Product + Deployment</span>
                <strong>จากไอเดียสู่โปรดักต์จริง</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="quick-routes" aria-label="DJAI routes">
          {routes.map((route) => (
            <a className="route-card" href={route.href} key={route.title}>
              <span>{route.eyebrow}</span>
              <h2>{route.title}</h2>
              <p>{route.text}</p>
              <strong>{route.action}</strong>
            </a>
          ))}
        </section>

        <section className="section dark-section">
          <div className="section-heading">
            <p className="eyebrow">DJAI ทำอะไร</p>
            <h2>Educate. Build. Deploy.</h2>
          </div>
          <div className="pillar-grid">
            {pillars.map((pillar) => (
              <article className="pillar-card" key={pillar.title}>
                <h3>{pillar.title}</h3>
                <p>{pillar.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section split-section">
          <div>
            <p className="eyebrow">ทีมของเรา</p>
            <h2>ทีมสร้างโปรดักต์สำหรับยุค AI</h2>
          </div>
          <div className="copy-block">
            <p>
              เรามีทีม developer, project manager, CTO, product designer, AI specialist และ
              business consultant ที่มีประสบการณ์สร้างระบบจริงหลากหลายอุตสาหกรรม
            </p>
            <p>
              ลูกค้าสามารถนำ requirement หรือปัญหาทางธุรกิจมาให้เราได้ เราจะช่วยวางแผน
              เลือกขอบเขตที่คุ้มค่า และพัฒนาให้เร็วที่สุดเท่าที่เหมาะสมกับเป้าหมาย
            </p>
            <a className="button secondary dark" href="https://www.djai.academy/portfolio/">
              ดูผลงาน
            </a>
          </div>
        </section>

        <section className="section tools-section">
          <div className="section-heading">
            <p className="eyebrow">เครื่องมือฟรี</p>
            <h2>เครื่องมือที่ DJAI สร้างให้คนทั่วไปใช้ฟรี</h2>
            <p>
              เราสร้างเครื่องมือฟรีเพื่อช่วยคนทำงานจริง แสดงวิธีคิดด้าน product และสร้างความเชื่อมั่น
              ผ่านของที่ใช้งานได้ ไม่ใช่แค่คำโฆษณา
            </p>
          </div>
          <div className="tool-grid">
            {toolCards.map((card) => (
              <div className="tool-card" key={card}>
                <span />
                <strong>{card}</strong>
              </div>
            ))}
          </div>
          <a className="button secondary dark" href="https://www.djai.academy/tools/">
            เปิดเครื่องมือฟรี
          </a>
        </section>

        <section className="section service-section">
          <div className="service-panel">
            <p className="eyebrow">Development house</p>
            <h2>ต้องการทีมช่วยสร้างโปรดักต์หรือระบบให้ธุรกิจ?</h2>
            <p>
              DJAI รับพัฒนาเว็บไซต์ แอป AI agent ระบบ automation SaaS CRM POS Fintech เกม
              Web3 และระบบภายในสำหรับธุรกิจ
            </p>
            <div className="hero-actions compact">
              <a className="button primary" href="https://www.djai.academy/service/">
                ดูบริการ
              </a>
              <a className="button ghost light" href="https://www.djai.academy/portfolio/">
                ดูผลงาน
              </a>
            </div>
          </div>
        </section>

        <section className="final-cta">
          <h2>ถ้ามีไอเดียหรือ requirement แล้ว อย่าปล่อยให้ช้าเกินไป</h2>
          <p>
            ส่งสิ่งที่คุณอยากสร้างหรือปัญหาที่อยากแก้มาให้ DJAI เราจะช่วยดูว่าเส้นทางไหนเร็ว
            คุ้มค่า และเหมาะกับธุรกิจที่สุด
          </p>
          <div className="hero-actions compact">
            <a className="button primary" href="mailto:contact@djai.academy">
              contact@djai.academy
            </a>
            <a className="button secondary" href="https://www.djai.academy/development/">
              วิธีการพัฒนา
            </a>
          </div>
        </section>
      </main>
      <SiteFooter locale="th" />
    </>
  );
}

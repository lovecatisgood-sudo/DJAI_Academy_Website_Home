import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import TrackedLink from "../components/TrackedLink";

export const metadata = {
  title: "DJAI Development | รับทำซอฟต์แวร์ แอป และ AI Automation",
  description:
    "DJAI รับทำซอฟต์แวร์ตามความต้องการ ช่วย founder, SME และทีมงานเปลี่ยน requirement ให้เป็น scope และโปรดักต์เวอร์ชันเล็กที่สุดที่พร้อมนำไปใช้งานจริง",
  alternates: {
    canonical: "/development/",
    languages: {
      en: "/development/en/",
      th: "/development/",
      vi: "/development/vi/",
      "x-default": "/development/"
    }
  },
  openGraph: {
    title: "DJAI Development",
    description:
      "ส่ง requirement ให้ DJAI เราช่วยวางแผน ออกแบบ พัฒนา และเปิดใช้งานโปรดักต์อย่างเร็วและคุ้มค่า",
    url: "/development/",
    siteName: "DJAI Academy",
    images: ["/portfolio/optimized/games/Xana_Metaverse.webp"],
    type: "website"
  }
};

const capabilityGroups = [
  {
    title: "Product Development",
    text: "พัฒนาโปรดักต์สำหรับลูกค้าหรือทีมภายใน ตั้งแต่ web application และ mobile app ไปจนถึง SaaS, portal และระบบที่ต้องมีผู้ใช้หลายบทบาท"
  },
  {
    title: "AI และ Automation",
    text: "ลดงานซ้ำหรือทำให้ข้อมูลค้นหาและใช้งานได้ง่ายขึ้นด้วย workflow automation, AI assistant, chatbot, voice bot หรือ RAG ที่เชื่อมกับแหล่งข้อมูลที่กำหนด"
  },
  {
    title: "Fintech และ Business System",
    text: "สร้าง payment flow, POS, CRM, management system หรือ dashboard โดยเริ่มจากขั้นตอนใช้งาน สิทธิ์ผู้ใช้ และจุดเสี่ยงที่ต้องตรวจสอบ"
  },
  {
    title: "Games และ Web3",
    text: "พัฒนาเกมบนเว็บ mini-game และผลิตภัณฑ์ Web3 เมื่อกลไกเหล่านี้เหมาะกับผู้ใช้และโมเดลของโปรเจกต์ ไม่ใช่เพียงเพราะเทคโนโลยีกำลังเป็นกระแส"
  }
];

const processSteps = [
  {
    title: "คุย Requirement",
    text: "คุณส่งปัญหา เป้าหมาย workflow หรือไอเดียมาให้เรา เราช่วยแยก use case, user, ความเสี่ยง และฟีเจอร์สำคัญ"
  },
  {
    title: "วาง Scope ให้คุ้ม",
    text: "เราแยกสิ่งที่ต้องทำเพื่อ launch ก่อน ออกจากสิ่งที่รอ phase ถัดไปได้ เพื่อลดต้นทุนและเวลา"
  },
  {
    title: "พัฒนาเร็วเป็นรอบ",
    text: "ออกแบบ พัฒนา integration, AI tooling และทดสอบเป็นรอบสั้นๆ เพื่อให้ลูกค้าเห็นความคืบหน้าเร็ว"
  },
  {
    title: "Launch และต่อยอด",
    text: "ช่วย deploy, monitor, รับ feedback และวางแผนการพัฒนาเวอร์ชันต่อไปหลังจากเริ่มใช้งานจริง"
  }
];

const proofLinks = [
  {
    title: "ผลงาน",
    text: "ดูตัวอย่างเว็บไซต์ เกม และ Web3 product ที่ DJAI ได้รับอนุญาตให้แสดงต่อสาธารณะ",
    href: "https://www.djai.academy/portfolio/"
  },
  {
    title: "บริการ",
    text: "ดูหมวดหมู่บริการพัฒนาโปรดักต์และระบบที่ DJAI รองรับ",
    href: "https://www.djai.academy/service/"
  },
  {
    title: "เครื่องมือฟรี",
    text: "ลองใช้เครื่องมือฟรีที่สะท้อนแนวคิดด้าน product และ utility ของ DJAI",
    href: "https://www.djai.academy/tools/"
  }
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "DJAI Development",
  url: "https://www.djai.academy/development/",
  description:
    "DJAI ช่วยเปลี่ยน requirement ของ founder, SME และทีมงานให้เป็น scope และ working product เวอร์ชันเล็กที่สุดที่พร้อมเปิดใช้งานและพัฒนาต่อ",
  email: "contact@djai.academy",
  areaServed: ["Thailand", "Singapore", "Global"],
  provider: {
    "@type": "Organization",
    name: "DJAI Academy",
    url: "https://www.djai.academy/"
  }
};

export default function ThaiDevelopmentPage() {
  const enquiryEvent = {
    source_path: "/development/",
    locale: "th",
    cluster: "commercial",
    destination_type: "email",
    destination_url: "mailto:contact@djai.academy"
  };

  return (
    <>
      <SiteHeader locale="th" currentRoute="development" />
      <main className="development-page">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <section className="development-hero">
          <div>
            <p className="eyebrow">Custom software development</p>
            <h1>ส่ง requirement มา แล้ว DJAI ช่วยพัฒนาโปรดักต์เวอร์ชันเล็กที่สุดที่ใช้งานได้จริง</h1>
            <p>
              สำหรับ founder, SME หรือทีมที่มีปัญหาใน workflow หรือไอเดียโปรดักต์
              เราช่วยแยกผู้ใช้ เป้าหมาย ความเสี่ยง และสิ่งที่ต้องพิสูจน์ก่อน
              แล้วจึงวาง scope ที่พร้อมสร้าง เปิดใช้ และเรียนรู้จากของจริง
            </p>
            <div className="development-actions">
              <TrackedLink className="button primary" href="mailto:contact@djai.academy" eventName="enquiry_start" eventParams={enquiryEvent}>
                เริ่มคุยโปรเจกต์
              </TrackedLink>
              <a className="button secondary dark" href="https://www.djai.academy/portfolio/">
                ดูผลงาน
              </a>
            </div>
          </div>
          <div className="development-proof-card" aria-label="Development capability summary">
            <span>From idea to launch</span>
            <strong>Web, mobile, SaaS, automation, games, fintech และ Web3</strong>
            <p>
              เราช่วยลูกค้าเลือกว่าจะเริ่มจากอะไร ใช้เทคโนโลยีแบบไหน และลดความซับซ้อนที่ไม่จำเป็น
            </p>
          </div>
        </section>

        <section className="development-band">
          <p>
            คุณไม่จำเป็นต้องมี technical brief ที่สมบูรณ์ก่อนคุยกับเรา แค่บอกเป้าหมาย ปัญหา
            workflow หรือ reference product ที่อยากได้ แล้วเราช่วยวางเส้นทางให้ practical ที่สุด
          </p>
        </section>

        <section className="development-section">
          <div className="development-section-heading">
            <p className="eyebrow">สิ่งที่เราสร้างได้</p>
            <h2>พัฒนาโปรดักต์และระบบธุรกิจได้ครบวงจร</h2>
          </div>
          <div className="development-capability-grid">
            {capabilityGroups.map((group) => (
              <article className="development-capability-card" key={group.title}>
                <h3>{group.title}</h3>
                <p>{group.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="development-process">
          <div className="development-section-heading">
            <p className="eyebrow">วิธีทำงาน</p>
            <h2>เร็ว ไม่ใช่ลวก แต่คือการ focus ให้ถูกจุด</h2>
          </div>
          <div className="development-process-grid">
            {processSteps.map((step, index) => (
              <article key={step.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="development-proof-links" aria-label="Related DJAI pages">
          {proofLinks.map((link) => (
            <a href={link.href} key={link.title}>
              <strong>{link.title}</strong>
              <span>{link.text}</span>
            </a>
          ))}
        </section>

        <section className="development-cta">
          <div>
            <p className="eyebrow">คุยกับ DJAI</p>
            <h2>ส่ง requirement มา แล้วเราช่วยดูเส้นทางที่เร็วและคุ้มที่สุด</h2>
            <p>
              ไม่ว่าจะเป็น public product, internal platform, AI workflow, fintech หรือ Web3 build
              เราช่วย scope และ execute ให้เหมาะกับธุรกิจได้
            </p>
          </div>
          <div className="development-actions">
            <TrackedLink className="button primary" href="mailto:contact@djai.academy" eventName="enquiry_start" eventParams={enquiryEvent}>
              contact@djai.academy
            </TrackedLink>
            <a className="button ghost light" href="https://www.djai.academy/service/">
              ดูบริการทั้งหมด
            </a>
          </div>
        </section>
      </main>
      <SiteFooter locale="th" />
    </>
  );
}

import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";

export const metadata = {
  title: "DJAI Development | รับพัฒนาซอฟต์แวร์ แอป AI Automation และ Web3",
  description:
    "DJAI รับพัฒนาเว็บไซต์ แอปมือถือ SaaS ระบบ AI Automation CRM POS Fintech เกม Crypto และ Web3 ด้วยแนวทางที่เร็วและคุมต้นทุน",
  alternates: {
    canonical: "/development/th/",
    languages: {
      en: "/development/EN/",
      th: "/development/th/"
    }
  },
  openGraph: {
    title: "DJAI Development",
    description:
      "ส่ง requirement ให้ DJAI เราช่วยวางแผน ออกแบบ พัฒนา และเปิดใช้งานโปรดักต์อย่างเร็วและคุ้มค่า",
    url: "/development/th/",
    siteName: "DJAI Academy",
    images: ["/portfolio/games/Xana_Metaverse.webp"],
    type: "website"
  }
};

const capabilityGroups = [
  {
    title: "Product Development",
    text: "เว็บไซต์ เว็บแอป แอปมือถือ SaaS marketplace dashboard portal booking flow และระบบภายในองค์กร",
    items: ["Web application", "Mobile app", "SaaS platform", "MVP และ prototype"]
  },
  {
    title: "AI และ Automation",
    text: "ระบบ workflow automation, AI assistant, chatbot, voice bot, RAG system และเครื่องมือ AI ที่เชื่อมกับฐานข้อมูลบริษัท",
    items: ["AI workflow", "Chatbot / Voice bot", "RAG system", "SME automation"]
  },
  {
    title: "Fintech และ Business System",
    text: "Payment application, crypto wallet, POS, CRM, corporate management system และ dashboard สำหรับการทำงานจริง",
    items: ["Payment app", "Crypto wallet", "POS system", "CRM / Management system"]
  },
  {
    title: "Games และ Web3",
    text: "เกมบนเว็บ Telegram mini-game, on-chain game, NFT marketplace, token ecosystem และ crypto infrastructure",
    items: ["Mini-game", "Web3 app", "NFT marketplace", "Token ecosystem"]
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
    href: "https://djai.academy/portfolio/th/"
  },
  {
    title: "บริการ",
    text: "ดูหมวดหมู่บริการพัฒนาโปรดักต์และระบบที่ DJAI รองรับ",
    href: "https://djai.academy/service/th/"
  },
  {
    title: "เครื่องมือฟรี",
    text: "ลองใช้เครื่องมือฟรีที่สะท้อนแนวคิดด้าน product และ utility ของ DJAI",
    href: "https://djai.academy/tools/th/"
  }
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "DJAI Development",
  url: "https://djai.academy/development/th/",
  description:
    "บริการพัฒนาซอฟต์แวร์ AI automation, SaaS, mobile app, fintech, games, Web3 และระบบธุรกิจ",
  email: "contact@djai.academy",
  areaServed: ["Thailand", "Singapore", "Global"],
  provider: {
    "@type": "Organization",
    name: "DJAI Academy",
    url: "https://djai.academy/"
  }
};

export default function ThaiDevelopmentPage() {
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
            <h1>ส่ง requirement มาให้เรา แล้ว DJAI ช่วยเปลี่ยนเป็นโปรดักต์ที่ใช้งานได้จริง</h1>
            <p>
              DJAI พัฒนาได้ตั้งแต่เว็บไซต์ เว็บแอป แอปมือถือ SaaS ระบบอัตโนมัติ Fintech
              AI system เกม ไปจนถึง Web3 product จุดแข็งของเราคือช่วยหาวิธีที่เร็ว คุ้มค่า
              และเหมาะกับเป้าหมายของลูกค้า
            </p>
            <div className="development-actions">
              <a className="button primary" href="mailto:contact@djai.academy">
                เริ่มคุยโปรเจกต์
              </a>
              <a className="button secondary dark" href="https://djai.academy/portfolio/th/">
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
                <div>
                  {group.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
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
            <a className="button primary" href="mailto:contact@djai.academy">
              contact@djai.academy
            </a>
            <a className="button ghost light" href="https://djai.academy/service/th/">
              ดูบริการทั้งหมด
            </a>
          </div>
        </section>
      </main>
      <SiteFooter locale="th" />
    </>
  );
}

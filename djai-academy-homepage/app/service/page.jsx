import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";

export const metadata = {
  title: "บริการ DJAI | รับทำเว็บไซต์ แอป SaaS AI Automation Fintech และ Web3",
  description:
    "บริการพัฒนาซอฟต์แวร์ของ DJAI ครอบคลุมเว็บไซต์ เว็บแอป แอปมือถือ SaaS AI automation CRM POS fintech เกม และ Web3",
  alternates: {
    canonical: "/service/",
    languages: {
      en: "/service/en/",
      th: "/service/"
    }
  },
  openGraph: {
    title: "บริการ DJAI",
    description:
      "บริการพัฒนาเว็บไซต์ แอป SaaS AI Automation ระบบธุรกิจ Fintech เกม และ Web3",
    url: "/service/",
    siteName: "DJAI Academy",
    images: ["/portfolio/websites/Siamese_Cat_Cafe.png"],
    type: "website"
  }
};

const services = [
  {
    title: "เว็บไซต์และ Landing Page",
    text: "เว็บไซต์บริษัท เว็บไซต์ธุรกิจท้องถิ่น product landing page ecommerce booking page และโครงสร้าง SEO",
    keywords: ["Corporate website", "Ecommerce", "Landing page", "Local SEO"]
  },
  {
    title: "Web App และ SaaS",
    text: "Customer portal, dashboard, subscription platform, marketplace, admin panel และ SaaS หลายผู้ใช้",
    keywords: ["SaaS", "Dashboard", "Portal", "Marketplace"]
  },
  {
    title: "Mobile App",
    text: "แอปผู้บริโภค แอปธุรกิจ แอป community ระบบ booking และ mobile experience สำหรับใช้งานจริง",
    keywords: ["iOS / Android", "React Native", "User account", "Push workflow"]
  },
  {
    title: "AI Automation และ Agent",
    text: "Workflow automation, AI assistant, document processing, chatbot และ voice bot สำหรับลดงานซ้ำ",
    keywords: ["AI agent", "Chatbot", "Voice bot", "Automation"]
  },
  {
    title: "RAG และ Database AI",
    text: "AI ที่เชื่อมกับเอกสาร ฐานข้อมูล manual policy customer record และ knowledge base ของบริษัท",
    keywords: ["RAG", "Knowledge base", "Database AI", "Internal search"]
  },
  {
    title: "CRM และ Corporate System",
    text: "CRM, corporate management system, approval flow, inventory tool, operation dashboard และ reporting",
    keywords: ["CRM", "ERP-style tool", "Operation", "Management system"]
  },
  {
    title: "POS, Payment และ Fintech",
    text: "POS system, payment application, wallet, card workflow, transaction dashboard และ finance product flow",
    keywords: ["POS", "Payment", "Wallet", "Fintech"]
  },
  {
    title: "Games และ Interactive Product",
    text: "Mini-game, viral marketing game, Telegram game, prediction game, leaderboard และ gamified loyalty",
    keywords: ["Mini-game", "Telegram game", "Gamification", "Leaderboard"]
  },
  {
    title: "Crypto และ Web3",
    text: "Crypto wallet, NFT marketplace, token ecosystem, staking flow, on-chain game, Web3 dashboard และ RWA planning",
    keywords: ["Web3", "NFT marketplace", "Crypto wallet", "Token system"]
  }
];

const engagementModels = [
  {
    title: "MVP Build",
    text: "เหมาะกับ founder หรือทีมที่ต้องการเวอร์ชันแรกเพื่อทดสอบกับผู้ใช้จริง"
  },
  {
    title: "Business Automation",
    text: "เหมาะกับ SME และบริษัทที่ต้องการลดงาน manual ลดความช้า และลดงานซ้ำ"
  },
  {
    title: "Product Expansion",
    text: "เหมาะกับธุรกิจที่มีระบบแล้ว แต่อยากเพิ่ม feature, integration, mobile app หรือ AI layer"
  },
  {
    title: "Technical Rescue",
    text: "เหมาะกับโปรเจกต์ที่ต้องการปรับปรุง วางแผน rebuild แก้ performance หรือทำให้ launch ได้ชัดขึ้น"
  }
];

const relatedPages = [
  ["แนวทางการพัฒนา", "https://www.djai.academy/development/"],
  ["ผลงาน", "https://www.djai.academy/portfolio/"],
  ["เครื่องมือฟรี", "https://www.djai.academy/tools/"],
  ["บทความ", "https://www.djai.academy/blog/"]
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "DJAI Custom Software Development Services",
  url: "https://www.djai.academy/service/",
  provider: {
    "@type": "Organization",
    name: "DJAI Academy",
    url: "https://www.djai.academy/"
  },
  areaServed: ["Thailand", "Singapore", "Global"],
  serviceType: services.map((service) => service.title),
  description:
    "บริการพัฒนาซอฟต์แวร์สำหรับเว็บไซต์ แอป SaaS AI automation fintech games Web3 CRM POS และระบบธุรกิจ"
};

export default function ThaiServicePage() {
  return (
    <>
      <SiteHeader locale="th" currentRoute="service" />
      <main className="service-page">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <section className="service-hero">
          <p className="eyebrow">บริการของ DJAI</p>
          <h1>พัฒนาโปรดักต์ ระบบอัตโนมัติ และซอฟต์แวร์ธุรกิจแบบครบวงจร</h1>
          <p>
            DJAI รับพัฒนาเว็บไซต์ เว็บแอป แอปมือถือ SaaS AI automation CRM POS fintech
            games crypto apps และ Web3 systems คุณส่ง requirement มา แล้วเราช่วยดูทางที่ practical
            ที่สุดสำหรับเวลาและงบประมาณ
          </p>
          <div className="service-hero-actions">
            <a className="button primary" href="mailto:contact@djai.academy">
              ขอใบเสนอราคา
            </a>
            <a className="button secondary dark" href="https://www.djai.academy/development/">
              วิธีพัฒนา
            </a>
            <a className="button secondary dark" href="https://www.djai.academy/portfolio/">
              ดูผลงาน
            </a>
          </div>
        </section>

        <section className="service-summary-grid" aria-label="Service summary">
          <div>
            <strong>Full Product Build</strong>
            <span>ตั้งแต่ scope ถึง launch</span>
          </div>
          <div>
            <strong>AI + Automation</strong>
            <span>สำหรับ SME และบริษัท</span>
          </div>
          <div>
            <strong>Fast MVP Delivery</strong>
            <span>เร็วและคุมต้นทุน</span>
          </div>
        </section>

        <section className="service-catalog">
          <div className="service-section-heading">
            <p className="eyebrow">หมวดบริการ</p>
            <h2>เลือกหมวดที่ใกล้กับสิ่งที่คุณต้องการ</h2>
            <p>
              หลายโปรเจกต์ต้องใช้หลายบริการร่วมกัน เช่น payment app อาจต้องมี mobile app,
              dashboard, security flow และ automation ส่วน CRM อาจต้องมี AI search และ reporting
            </p>
          </div>
          <div className="service-card-grid">
            {services.map((service) => (
              <article className="service-card" key={service.title}>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <div>
                  {service.keywords.map((keyword) => (
                    <span key={keyword}>{keyword}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="service-models">
          <div className="service-section-heading">
            <p className="eyebrow">รูปแบบการเริ่มงาน</p>
            <h2>เริ่มต่างกันได้ แต่เป้าหมายคือส่งมอบของที่ใช้งานได้จริง</h2>
          </div>
          <div className="service-model-grid">
            {engagementModels.map((model) => (
              <article key={model.title}>
                <h3>{model.title}</h3>
                <p>{model.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="service-related">
          <div>
            <p className="eyebrow">ดูเพิ่มเติม</p>
            <h2>ดูวิธีทำงานและผลงานที่ DJAI เคยสร้าง</h2>
          </div>
          <div className="service-related-links">
            {relatedPages.map(([label, href]) => (
              <a href={href} key={label}>
                {label}
              </a>
            ))}
          </div>
        </section>

        <section className="service-cta">
          <div>
            <p className="eyebrow">เริ่มจาก requirement</p>
            <h2>ไม่ต้องมี technical brief ที่สมบูรณ์ก็เริ่มคุยได้</h2>
            <p>
              ส่งเป้าหมาย ปัญหา reference product หรือ workflow ที่อยาก automate มาให้เรา
              DJAI จะช่วยดูทางที่เร็วและคุ้มค่าที่สุด
            </p>
          </div>
          <a className="button primary" href="mailto:contact@djai.academy">
            contact@djai.academy
          </a>
        </section>
      </main>
      <SiteFooter locale="th" />
    </>
  );
}

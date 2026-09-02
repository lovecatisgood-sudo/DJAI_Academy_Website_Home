import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import TrackedLink from "../components/TrackedLink";

export const metadata = {
  title: "เลือกบริการพัฒนาซอฟต์แวร์ที่เหมาะกับโจทย์ | DJAI",
  description:
    "เลือกหมวดบริการ DJAI จากปัญหาที่ต้องแก้ สิ่งที่มักส่งมอบ และขั้นตอนถัดไป ก่อนนำ requirement ไปวาง scope กับทีม Development",
  alternates: {
    canonical: "/service/",
    languages: {
      en: "/service/en/",
      th: "/service/",
      vi: "/service/vi/",
      "x-default": "/service/"
    }
  },
  openGraph: {
    title: "บริการ DJAI",
    description:
      "บริการพัฒนาเว็บไซต์ แอป SaaS AI Automation ระบบธุรกิจ Fintech เกม และ Web3",
    url: "/service/",
    siteName: "DJAI Academy",
    images: [{ url: "/social/djai-development.webp", width: 1200, height: 630 }],
    type: "website"
  }
};

const services = [
  {
    title: "เว็บไซต์และ Landing Page",
    problem: "ลูกค้ายังไม่เข้าใจธุรกิจ สินค้า หรือขั้นตอนติดต่อจากหน้าเว็บปัจจุบัน",
    deliverable: "เว็บไซต์บริษัท landing page หน้าร้าน หรือ booking flow ที่จัดโครงสร้างเนื้อหาและเส้นทางติดต่อให้ชัด",
    nextAction: "คุยโจทย์เว็บไซต์"
  },
  {
    title: "Web App และ SaaS",
    problem: "งานต้องมีบัญชีผู้ใช้ ข้อมูลหลายบทบาท หรือขั้นตอนที่เว็บไซต์ทั่วไปจัดการไม่พอ",
    deliverable: "Web app, customer portal, dashboard, admin panel หรือ SaaS ที่กำหนดสิทธิ์และ workflow ได้",
    nextAction: "คุยโจทย์ Web App"
  },
  {
    title: "Mobile App",
    problem: "ผู้ใช้ต้องทำงานซ้ำบนมือถือ ต้องเข้าถึงกล้อง การแจ้งเตือน หรือประสบการณ์เฉพาะอุปกรณ์",
    deliverable: "แอปสำหรับลูกค้าหรือทีมงาน พร้อม account, data flow และ integration ที่จำเป็นต่อ use case",
    nextAction: "คุยโจทย์ Mobile App"
  },
  {
    title: "AI Automation และ Agent",
    problem: "ทีมใช้เวลามากกับงานซ้ำ การส่งต่อข้อมูล หรือคำถามเดิมที่ต้องค้นจากหลายระบบ",
    deliverable: "Workflow automation, assistant, chatbot, voice bot หรือ document flow ที่มีจุดตรวจสอบโดยคน",
    nextAction: "คุยโจทย์ AI Automation"
  },
  {
    title: "RAG และ Database AI",
    problem: "ข้อมูลที่ทีมต้องใช้กระจายอยู่ในเอกสาร ฐานข้อมูล policy หรือ knowledge base และค้นหาได้ช้า",
    deliverable: "ระบบค้นหาและตอบจากแหล่งข้อมูลที่กำหนด พร้อมสิทธิ์ แหล่งอ้างอิง และขอบเขตคำตอบ",
    nextAction: "คุยโจทย์ RAG"
  },
  {
    title: "CRM และ Corporate System",
    problem: "การขาย การอนุมัติ inventory หรือ reporting ยังพึ่ง spreadsheet และการส่งข้อความหลายรอบ",
    deliverable: "CRM, approval flow, operations dashboard หรือ management system ที่สะท้อนขั้นตอนทำงานจริง",
    nextAction: "คุยโจทย์ระบบภายใน"
  },
  {
    title: "POS, Payment และ Fintech",
    problem: "ธุรกิจต้องจัดการการขาย การชำระเงิน หรือข้อมูลธุรกรรมด้วย flow และสิทธิ์ที่ตรวจสอบได้",
    deliverable: "POS, payment workflow, wallet experience หรือ transaction dashboard ที่กำหนด security scope ก่อนเริ่มสร้าง",
    nextAction: "คุยโจทย์ Fintech"
  },
  {
    title: "Games และ Interactive Product",
    problem: "แคมเปญหรือชุมชนต้องการ interaction ที่ทำให้คนลงมือเล่น แข่งขัน หรือกลับมาใช้งาน",
    deliverable: "Mini-game, interactive campaign, leaderboard หรือ gamified loyalty flow ที่วัดผลได้ตามเป้าหมาย",
    nextAction: "คุยโจทย์ Interactive Product"
  },
  {
    title: "Crypto และ Web3",
    problem: "โปรดักต์มีเหตุผลชัดเจนที่ต้องใช้ wallet, ownership หรือธุรกรรม on-chain",
    deliverable: "Wallet flow, marketplace, dashboard หรือ on-chain experience ที่แยก product scope และ risk review ไว้ชัด",
    nextAction: "คุยโจทย์ Web3"
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
  ["แนวทางการพัฒนา", "/development/"],
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
    "ตัวช่วยเลือกหมวดบริการพัฒนาซอฟต์แวร์จากปัญหา สิ่งที่มักส่งมอบ และขั้นตอนถัดไปก่อนวาง scope กับ DJAI Development"
};

export default function ThaiServicePage() {
  const enquiryEvent = {
    source_path: "/service/",
    locale: "th",
    cluster: "commercial",
    service_category: "not_selected",
    destination_type: "email",
    destination_url: "mailto:contact@djai.academy"
  };

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
          <h1>เลือกหมวดบริการให้ตรงกับปัญหาที่ต้องแก้</h1>
          <p>
            เริ่มจากงานที่ติดขัด ผู้ใช้ที่เกี่ยวข้อง และผลลัพธ์ที่ต้องการ
            แต่ละหมวดด้านล่างอธิบายโจทย์ที่เหมาะ สิ่งที่มักส่งมอบ และทางไปคุย scope กับ Development
            โปรเจกต์หนึ่งอาจใช้มากกว่าหนึ่งหมวดได้
          </p>
          <div className="service-hero-actions">
            <a className="button primary" href="#service-categories">
              เลือกหมวดบริการ
            </a>
            <a className="button secondary dark" href="/development/">
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

        <section className="service-catalog" id="service-categories">
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
                <p><strong>โจทย์:</strong> {service.problem}</p>
                <p><strong>สิ่งที่มักส่งมอบ:</strong> {service.deliverable}</p>
                <a href="/development/">{service.nextAction}</a>
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
          <TrackedLink className="button primary" href="mailto:contact@djai.academy" eventName="enquiry_start" eventParams={enquiryEvent}>
            contact@djai.academy
          </TrackedLink>
        </section>
      </main>
      <SiteFooter locale="th" />
    </>
  );
}

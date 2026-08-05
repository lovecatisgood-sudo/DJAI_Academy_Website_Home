import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import CookieSettingsButton from "../components/CookieSettingsButton";
import styles from "./privacy.module.css";

const content = {
  en: {
    eyebrow: "Privacy at DJAI Academy",
    title: "Privacy & Cookie Policy",
    updated: "Effective and last updated: August 2, 2026",
    intro:
      "This policy explains how the DJAI Academy website uses information, cookies, and similar browser storage. It applies to www.djai.academy and does not replace a separate product or mobile-app policy where one is provided.",
    sections: [
      {
        title: "Who is responsible",
        paragraphs: [
          "DJAI Academy operates this website. Questions or privacy requests can be sent to contact@djai.academy."
        ]
      },
      {
        title: "Information processed when you visit",
        paragraphs: [
          "Our hosting and security infrastructure necessarily receives technical request information such as IP address, requested URL, date and time, browser headers, and diagnostic or security events.",
          "If you allow analytics, Google Analytics may process a browser identifier, page visits, session activity, referral information, approximate location, and browser or device characteristics. We use this information to understand which pages and tools are useful and to improve website performance and content.",
          "If you allow advertising, Google AdSense and its advertising partners may process cookie identifiers, ad impressions, clicks, approximate location, browser or device information, and signals used to deliver, limit, protect, and measure advertising. DJAI currently requests non-personalized ads; contextual information such as the page topic may still affect which ad appears."
        ]
      },
      {
        title: "Cookies and browser storage we use",
        table: [
          ["djai_consent_v1", "DJAI Academy local storage", "Necessary", "Remembers analytics and advertising choices", "Up to 6 months"],
          ["_ga", "Google Analytics", "Analytics", "Distinguishes browsers for visitor and session measurement", "Up to 2 years; browsers may shorten this"],
          ["_ga_<property>", "Google Analytics", "Analytics", "Maintains measurement state for this Analytics property", "Up to 2 years; browsers may shorten this"],
          ["IDE and possible advertising cookies", "Google / DoubleClick", "Advertising", "Non-personalized ad delivery, frequency limiting, fraud prevention, and measurement", "Varies by cookie, region, browser, and Google settings"]
        ],
        paragraphs: [
          "The exact advertising cookies can vary according to region, browser restrictions, whether an ad is available, and your Google Account or advertising settings. Cookies are not required for the website’s primary pages and tools."
        ]
      },
      {
        title: "Your choices",
        paragraphs: [
          "Analytics and advertising storage are denied by default. Google Analytics is loaded only after analytics consent, and Google AdSense is loaded only after advertising consent. You can accept all optional categories, reject them, select categories separately, or change your choice later.",
          "Withdrawing consent prevents optional services from loading on future page views and removes accessible DJAI-domain Google Analytics cookies. Third-party cookies already controlled by Google must be managed through your browser or Google privacy settings."
        ],
        settings: "Open cookie settings"
      },
      {
        title: "File-processing tools",
        paragraphs: [
          "Where a tool explicitly says that processing happens in your browser, supported files are processed locally and their contents are not intentionally uploaded to DJAI Analytics or AdSense. Analytics and advertising services may still receive ordinary page-visit or ad-interaction information if you have allowed those categories. Check the notice on each tool before processing confidential material."
        ]
      },
      {
        title: "Service providers and international processing",
        paragraphs: [
          "We use website hosting and delivery providers to operate and secure the service. Optional measurement and advertising use Google Analytics and Google AdSense. These providers may process information in countries other than your own under their terms and data-protection mechanisms."
        ],
        links: [
          ["How Google uses information from partner sites", "https://policies.google.com/technologies/partner-sites"],
          ["How Google uses cookies", "https://policies.google.com/technologies/cookies"],
          ["Google privacy controls", "https://myaccount.google.com/data-and-privacy"]
        ]
      },
      {
        title: "Retention and your rights",
        paragraphs: [
          "Technical logs, analytics information, and advertising information are retained according to operational needs, configured provider settings, legal obligations, and the provider periods described above. We do not promise that every provider record can be identified from your name because many records use browser identifiers.",
          "Depending on applicable law, you may have rights to ask about, access, correct, delete, restrict, object to, or receive a copy of personal information, and to withdraw consent. Contact us with enough information to understand the request. You may also complain to your local data-protection authority."
        ]
      },
      {
        title: "Changes to this policy",
        paragraphs: [
          "We may update this policy when website features, providers, or legal requirements change. Material changes will be reflected by the date above and, where appropriate, a new consent request."
        ]
      }
    ]
  },
  th: {
    eyebrow: "ความเป็นส่วนตัวที่ DJAI Academy",
    title: "นโยบายความเป็นส่วนตัวและคุกกี้",
    updated: "มีผลและปรับปรุงล่าสุด: 2 สิงหาคม 2569",
    intro:
      "นโยบายนี้อธิบายว่าเว็บไซต์ DJAI Academy ใช้ข้อมูล คุกกี้ และพื้นที่จัดเก็บในเบราว์เซอร์อย่างไร โดยใช้กับ www.djai.academy และไม่ใช้แทนนโยบายเฉพาะของผลิตภัณฑ์หรือแอปมือถือที่มีการประกาศแยกไว้",
    sections: [
      {
        title: "ผู้รับผิดชอบข้อมูล",
        paragraphs: [
          "DJAI Academy เป็นผู้ดำเนินการเว็บไซต์นี้ หากมีคำถามหรือคำขอด้านความเป็นส่วนตัว โปรดติดต่อ contact@djai.academy"
        ]
      },
      {
        title: "ข้อมูลที่ประมวลผลเมื่อคุณเข้าชม",
        paragraphs: [
          "โครงสร้างพื้นฐานด้านโฮสติ้งและความปลอดภัยจำเป็นต้องได้รับข้อมูลทางเทคนิค เช่น IP address, URL ที่เรียกใช้ วันและเวลา browser header รวมถึงเหตุการณ์วินิจฉัยหรือความปลอดภัย",
          "หากคุณอนุญาตการวิเคราะห์ Google Analytics อาจประมวลผลรหัสระบุเบราว์เซอร์ หน้าที่เข้าชม กิจกรรมใน session แหล่งที่มา ตำแหน่งโดยประมาณ และลักษณะของเบราว์เซอร์หรืออุปกรณ์ เราใช้ข้อมูลนี้เพื่อทำความเข้าใจว่าหน้าและเครื่องมือใดมีประโยชน์ และปรับปรุงประสิทธิภาพกับเนื้อหา",
          "หากคุณอนุญาตการโฆษณา Google AdSense และพันธมิตรโฆษณาอาจประมวลผลรหัสคุกกี้ การแสดงและการคลิกโฆษณา ตำแหน่งโดยประมาณ ข้อมูลเบราว์เซอร์หรืออุปกรณ์ และสัญญาณสำหรับแสดง จำกัดความถี่ ป้องกันการทุจริต และวัดผลโฆษณา ปัจจุบัน DJAI ขอแสดงโฆษณาแบบไม่ปรับตามบุคคล แต่บริบท เช่น หัวข้อของหน้า อาจยังมีผลต่อโฆษณาที่แสดง"
        ]
      },
      {
        title: "คุกกี้และพื้นที่จัดเก็บที่เราใช้",
        table: [
          ["djai_consent_v1", "Local storage ของ DJAI Academy", "จำเป็น", "จดจำตัวเลือกการวิเคราะห์และโฆษณา", "ไม่เกิน 6 เดือน"],
          ["_ga", "Google Analytics", "การวิเคราะห์", "แยกเบราว์เซอร์เพื่อวัดผู้เข้าชมและ session", "ไม่เกิน 2 ปี โดยเบราว์เซอร์อาจลดระยะเวลา"],
          ["_ga_<property>", "Google Analytics", "การวิเคราะห์", "เก็บสถานะการวัดผลของ Analytics property นี้", "ไม่เกิน 2 ปี โดยเบราว์เซอร์อาจลดระยะเวลา"],
          ["IDE และคุกกี้โฆษณาที่อาจพบ", "Google / DoubleClick", "การโฆษณา", "แสดงโฆษณาแบบไม่ปรับตามบุคคล จำกัดความถี่ ป้องกันการทุจริต และวัดผล", "แตกต่างตามคุกกี้ ภูมิภาค เบราว์เซอร์ และการตั้งค่า Google"]
        ],
        paragraphs: [
          "คุกกี้โฆษณาที่พบจริงอาจแตกต่างตามภูมิภาค ข้อจำกัดของเบราว์เซอร์ การมีโฆษณาพร้อมแสดง และการตั้งค่าบัญชี Google หรือโฆษณาของคุณ คุกกี้เหล่านี้ไม่จำเป็นต่อหน้าและเครื่องมือหลักของเว็บไซต์"
        ]
      },
      {
        title: "ตัวเลือกของคุณ",
        paragraphs: [
          "ระบบปฏิเสธพื้นที่จัดเก็บสำหรับการวิเคราะห์และโฆษณาเป็นค่าเริ่มต้น Google Analytics จะโหลดหลังจากคุณอนุญาตการวิเคราะห์เท่านั้น และ Google AdSense จะโหลดหลังจากคุณอนุญาตการโฆษณาเท่านั้น คุณสามารถยอมรับทั้งหมด ปฏิเสธ เลือกเป็นรายหมวดหมู่ หรือเปลี่ยนตัวเลือกภายหลังได้",
          "การถอนความยินยอมจะหยุดบริการเสริมในหน้าที่โหลดครั้งถัดไปและลบคุกกี้ Google Analytics บนโดเมน DJAI ที่เว็บไซต์เข้าถึงได้ ส่วนคุกกี้บุคคลที่สามที่ Google ควบคุมต้องจัดการผ่านเบราว์เซอร์หรือการตั้งค่าความเป็นส่วนตัวของ Google"
        ],
        settings: "เปิดการตั้งค่าคุกกี้"
      },
      {
        title: "เครื่องมือประมวลผลไฟล์",
        paragraphs: [
          "เมื่อเครื่องมือระบุอย่างชัดเจนว่าประมวลผลในเบราว์เซอร์ ไฟล์ที่รองรับจะถูกประมวลผลภายในอุปกรณ์ และเราไม่มีเจตนาอัปโหลดเนื้อหาไฟล์ไปยัง DJAI, Analytics หรือ AdSense อย่างไรก็ตาม หากคุณอนุญาต หมวดการวิเคราะห์และโฆษณาอาจยังได้รับข้อมูลการเข้าชมหน้าหรือการโต้ตอบกับโฆษณาตามปกติ โปรดอ่านคำชี้แจงของแต่ละเครื่องมือก่อนประมวลผลข้อมูลลับ"
        ]
      },
      {
        title: "ผู้ให้บริการและการประมวลผลระหว่างประเทศ",
        paragraphs: [
          "เราใช้ผู้ให้บริการโฮสติ้งและส่งมอบเว็บไซต์เพื่อให้บริการและรักษาความปลอดภัย ส่วนการวัดผลและโฆษณาที่เป็นตัวเลือกใช้ Google Analytics และ Google AdSense ผู้ให้บริการเหล่านี้อาจประมวลผลข้อมูลในประเทศอื่นภายใต้ข้อกำหนดและกลไกคุ้มครองข้อมูลของตน"
        ],
        links: [
          ["Google ใช้ข้อมูลจากเว็บไซต์พันธมิตรอย่างไร", "https://policies.google.com/technologies/partner-sites?hl=th"],
          ["Google ใช้คุกกี้อย่างไร", "https://policies.google.com/technologies/cookies?hl=th"],
          ["การควบคุมความเป็นส่วนตัวของ Google", "https://myaccount.google.com/data-and-privacy?hl=th"]
        ]
      },
      {
        title: "ระยะเวลาจัดเก็บและสิทธิของคุณ",
        paragraphs: [
          "บันทึกทางเทคนิค ข้อมูลการวิเคราะห์ และข้อมูลโฆษณาจะถูกเก็บตามความจำเป็นในการดำเนินงาน การตั้งค่าผู้ให้บริการ หน้าที่ตามกฎหมาย และระยะเวลาของผู้ให้บริการที่อธิบายไว้ข้างต้น เราไม่รับรองว่าจะสามารถระบุทุกข้อมูลจากชื่อของคุณได้ เพราะหลายรายการใช้รหัสเบราว์เซอร์",
          "ตามกฎหมายที่ใช้บังคับ คุณอาจมีสิทธิขอข้อมูล เข้าถึง แก้ไข ลบ จำกัด คัดค้าน รับสำเนาข้อมูลส่วนบุคคล หรือถอนความยินยอม โปรดติดต่อพร้อมข้อมูลที่เพียงพอให้เราเข้าใจคำขอ และคุณอาจร้องเรียนต่อหน่วยงานคุ้มครองข้อมูลในพื้นที่ของคุณได้"
        ]
      },
      {
        title: "การเปลี่ยนแปลงนโยบาย",
        paragraphs: [
          "เราอาจปรับปรุงนโยบายเมื่อฟีเจอร์ ผู้ให้บริการ หรือข้อกำหนดทางกฎหมายเปลี่ยนไป การเปลี่ยนแปลงสำคัญจะแสดงผ่านวันที่ด้านบนและขอความยินยอมใหม่เมื่อเหมาะสม"
        ]
      }
    ]
  }
};

const headers = {
  en: ["Item", "Provider", "Category", "Purpose", "Typical retention"],
  th: ["รายการ", "ผู้ให้บริการ", "หมวดหมู่", "วัตถุประสงค์", "ระยะเวลาทั่วไป"]
};

export default function PrivacyContent({ locale = "en" }) {
  const page = content[locale] || content.en;

  return (
    <>
      <SiteHeader locale={locale} currentRoute="home" languageHref={locale === "th" ? "/privacy/en/" : "/privacy/"} />
      <main className={styles.page}>
        <header className={styles.hero}>
          <p>{page.eyebrow}</p>
          <h1>{page.title}</h1>
          <span>{page.updated}</span>
        </header>
        <article className={styles.policy}>
          <p className={styles.lead}>{page.intro}</p>
          {page.sections.map((section) => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.table && (
                <div className={styles.tableWrap}>
                  <table>
                    <thead><tr>{headers[locale].map((heading) => <th key={heading}>{heading}</th>)}</tr></thead>
                    <tbody>
                      {section.table.map((row) => <tr key={row[0]}>{row.map((cell) => <td key={cell}>{cell}</td>)}</tr>)}
                    </tbody>
                  </table>
                </div>
              )}
              {section.links && (
                <ul>{section.links.map(([label, href]) => <li key={href}><a href={href} rel="noreferrer">{label}</a></li>)}</ul>
              )}
              {section.settings && <CookieSettingsButton>{section.settings}</CookieSettingsButton>}
            </section>
          ))}
        </article>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}

import Image from "next/image";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";

const partners = [
  {
    key: "cafe",
    href: "https://siamesecat.cafe/",
    image: "/portfolio/optimized/websites/Siamese_Cat_Cafe.webp"
  },
  {
    key: "hotel",
    href: "https://hotel.siamesecat.cafe/",
    image: "/portfolio/optimized/websites/Siamese_Cat_Hotel.webp"
  },
  {
    key: "creative",
    href: "https://creative.siamesecat.cafe/",
    image: "/portfolio/optimized/websites/Siamese_Cat_Creative_Club.webp"
  }
];

const copy = {
  th: {
    eyebrow: "DJAI ACADEMY × SIAMESE CAT",
    title: "DJAI × Siamese Cat",
    heroStatement: "พาร์ทเนอร์ธุรกิจและเทคโนโลยีที่เปลี่ยนไอเดียให้ใช้งานจริง",
    intro: "DJAI Academy และกลุ่ม Siamese Cat ร่วมมือด้านการเรียนรู้ product ซอฟต์แวร์ และการเติบโตทางธุรกิจ เพื่อเปลี่ยนโจทย์หน้างานเป็น digital product ที่เปิดใช้ได้จริง",
    devButton: "รู้จัก Siamese Cat Dev",
    serviceButton: "พัฒนาโปรเจกต์กับ DJAI",
    relationEyebrow: "ความสัมพันธ์ของเรา",
    relationTitle: "เรียนรู้ร่วมกัน สร้างร่วมกัน และเติบโตจากการลงมือทำ",
    relationText: "Siamese Cat Dev เป็นทั้งนักเรียนของ DJAI Academy และ partner ด้าน product, development และ training ที่ช่วยเปลี่ยน requirement ให้เป็นเว็บไซต์ แอป ระบบอัตโนมัติ และเครื่องมือที่ใช้งานได้จริง ความร่วมมือนี้เชื่อมความรู้จาก Academy เข้ากับประสบการณ์การสร้างธุรกิจและ software สำหรับผู้ใช้จริง",
    relationshipPoints: [
      ["Educate", "แลกเปลี่ยนความรู้ด้าน AI, vibe coding, product thinking และการสร้างระบบ"],
      ["Build", "ออกแบบ พัฒนา ทดสอบ และ deploy digital product ตามปัญหาที่เกิดขึ้นจริง"],
      ["Grow", "ใช้เทคโนโลยีและข้อมูลช่วยให้ทีมทำงานเร็วขึ้น รองรับลูกค้า และต่อยอดบริการได้ดีขึ้น"]
    ],
    ecosystemEyebrow: "BUSINESS ECOSYSTEM",
    ecosystemTitle: "DJAI สนับสนุนเทคโนโลยีให้ธุรกิจในกลุ่ม Siamese Cat",
    ecosystemText: "DJAI มีความร่วมมือใกล้ชิดกับ Siamese Cat Cafe, Siamese Cat Hotel และ Siamese Cat Creative Club โดยช่วยสนับสนุนด้าน digital presence, product execution และเทคโนโลยีสำหรับการดำเนินงาน ความร่วมมือนี้ช่วยให้แต่ละแบรนด์ทดลอง เปิดตัว และปรับปรุงแนวคิดใหม่ได้รวดเร็วขึ้น และมีส่วนสนับสนุนการเติบโตของธุรกิจอย่างรวดเร็ว",
    partnerCopy: {
      cafe: ["Siamese Cat Cafe", "คาเฟ่ community ที่เชื่อมผู้คน กิจกรรม และประสบการณ์ของแบรนด์เข้าด้วยกันผ่านทั้งพื้นที่จริงและช่องทาง digital", "เยี่ยมชม Cat Cafe"],
      hotel: ["Siamese Cat Hotel", "ธุรกิจ pet hospitality ที่นำ digital guest experience, การสื่อสาร และโอกาสด้าน booking automation มาต่อยอดงานบริการ", "เยี่ยมชม Cat Hotel"],
      creative: ["Siamese Cat Creative Club", "พื้นที่สำหรับ creative learning, visual production, social content และ workflow ที่ช่วยให้ creator เปลี่ยนไอเดียเป็นผลงาน", "เยี่ยมชม Creative Club"]
    },
    growthEyebrow: "PARTNERSHIP IN PRACTICE",
    growthTitle: "ความสำเร็จมาจากการเชื่อมธุรกิจกับทีมที่สร้างและ deploy ได้จริง",
    growthText: "การสนับสนุนด้านเทคโนโลยีของ DJAI ช่วยให้ธุรกิจใน Siamese Cat ecosystem เคลื่อนจากแนวคิดไปสู่เว็บไซต์ เครื่องมือ และ workflow ที่ใช้งานจริงได้เร็วขึ้น ความร่วมมือระหว่างทีมธุรกิจและทีมพัฒนาทำให้สามารถเรียนรู้จากลูกค้า ปรับปรุงบริการ และรองรับการเติบโตได้อย่างเป็นระบบ",
    growthLink: "ดูผลงานที่ได้รับอนุญาตให้เผยแพร่",
    finalTitle: "มีไอเดียธุรกิจหรือ workflow ที่ควรทำให้ดีขึ้นด้วยเทคโนโลยี?",
    finalText: "นำ requirement มาให้ DJAI ช่วยวางขอบเขต เลือกวิธีที่คุ้มค่า และเปลี่ยนเป็น product ที่เปิดใช้ได้เร็ว",
    finalPrimary: "คุยเรื่องโปรเจกต์",
    finalSecondary: "ดูคอร์ส Vibe Coding"
  },
  en: {
    eyebrow: "DJAI ACADEMY × SIAMESE CAT",
    title: "DJAI × Siamese Cat",
    heroStatement: "A business and technology partnership that turns ideas into working products.",
    intro: "DJAI Academy and the Siamese Cat group collaborate across education, products, software, and business growth, turning operational needs into live digital products.",
    devButton: "Meet Siamese Cat Dev",
    serviceButton: "Develop with DJAI",
    relationEyebrow: "OUR RELATIONSHIP",
    relationTitle: "Learning together, building together, and growing through execution.",
    relationText: "Siamese Cat Dev is both a DJAI Academy student and a product, development, and training partner who helps turn requirements into websites, applications, automation, and useful tools. The relationship connects Academy knowledge with practical experience building businesses and software for real users.",
    relationshipPoints: [
      ["Educate", "Share practical knowledge about AI, vibe coding, product thinking, and systems."],
      ["Build", "Design, develop, test, and deploy digital products around real operational problems."],
      ["Grow", "Use technology and data to help teams work faster, serve customers, and extend their services."]
    ],
    ecosystemEyebrow: "BUSINESS ECOSYSTEM",
    ecosystemTitle: "DJAI supports technology across the Siamese Cat businesses.",
    ecosystemText: "DJAI works closely with Siamese Cat Cafe, Siamese Cat Hotel, and Siamese Cat Creative Club, supporting digital presence, product execution, and operational technology. This partnership has helped each brand test, launch, and improve new ideas faster and has contributed to rapid business growth.",
    partnerCopy: {
      cafe: ["Siamese Cat Cafe", "A community cafe connecting people, activities, and the brand experience across physical and digital touchpoints.", "Visit Siamese Cat Cafe"],
      hotel: ["Siamese Cat Hotel", "A pet hospitality business extending its service through digital guest experiences, communication, and booking automation opportunities.", "Visit Siamese Cat Hotel"],
      creative: ["Siamese Cat Creative Club", "A space for creative learning, visual production, social content, and workflows that help creators turn ideas into published work.", "Visit Creative Club"]
    },
    growthEyebrow: "PARTNERSHIP IN PRACTICE",
    growthTitle: "Growth is stronger when a business works with a team that can build and deploy.",
    growthText: "DJAI's technology support has helped the Siamese Cat ecosystem move from ideas to live websites, tools, and workflows more quickly. Collaboration between business and development teams makes it easier to learn from customers, improve services, and support growth systematically.",
    growthLink: "View projects we are authorized to showcase",
    finalTitle: "Have a business idea or workflow that technology could improve?",
    finalText: "Bring your requirements to DJAI. We will help define a practical scope, choose a cost-effective approach, and move toward a launchable product quickly.",
    finalPrimary: "Discuss your project",
    finalSecondary: "Explore the Vibe Coding course"
  },
  vi: {
    eyebrow: "DJAI ACADEMY × SIAMESE CAT",
    title: "DJAI × Siamese Cat",
    heroStatement: "Quan hệ đối tác kinh doanh và công nghệ biến ý tưởng thành sản phẩm hoạt động thật.",
    intro: "DJAI Academy và nhóm Siamese Cat hợp tác trong đào tạo, sản phẩm, phần mềm và tăng trưởng kinh doanh để biến nhu cầu vận hành thành sản phẩm số đã được đưa vào sử dụng.",
    devButton: "Tìm hiểu Siamese Cat Dev",
    serviceButton: "Phát triển cùng DJAI",
    relationEyebrow: "MỐI QUAN HỆ CỦA CHÚNG TÔI",
    relationTitle: "Cùng học, cùng xây và trưởng thành qua việc thực hiện.",
    relationText: "Siamese Cat Dev vừa là học viên của DJAI Academy, vừa là đối tác về sản phẩm, phát triển và đào tạo, giúp biến yêu cầu thành website, ứng dụng, tự động hóa và công cụ hữu ích. Mối quan hệ này kết nối kiến thức từ Academy với kinh nghiệm thực tế khi xây doanh nghiệp và phần mềm cho người dùng thật.",
    relationshipPoints: [["Đào tạo", "Chia sẻ kiến thức thực tế về AI, vibe coding, tư duy sản phẩm và hệ thống."], ["Xây dựng", "Thiết kế, phát triển, kiểm thử và triển khai sản phẩm số dựa trên vấn đề vận hành thật."], ["Tăng trưởng", "Dùng công nghệ và dữ liệu để đội ngũ làm việc nhanh hơn, phục vụ khách hàng và mở rộng dịch vụ."]],
    ecosystemEyebrow: "HỆ SINH THÁI KINH DOANH",
    ecosystemTitle: "DJAI hỗ trợ công nghệ cho các doanh nghiệp Siamese Cat.",
    ecosystemText: "DJAI hợp tác chặt chẽ với Siamese Cat Cafe, Siamese Cat Hotel và Siamese Cat Creative Club, hỗ trợ hiện diện số, triển khai sản phẩm và công nghệ vận hành. Quan hệ này giúp từng thương hiệu thử nghiệm, ra mắt và cải thiện ý tưởng mới nhanh hơn.",
    partnerCopy: {
      cafe: ["Siamese Cat Cafe", "Quán cà phê cộng đồng kết nối con người, hoạt động và trải nghiệm thương hiệu tại cả điểm chạm trực tiếp lẫn kỹ thuật số.", "Ghé Siamese Cat Cafe"],
      hotel: ["Siamese Cat Hotel", "Dịch vụ lưu trú thú cưng mở rộng trải nghiệm khách hàng bằng giao tiếp số và cơ hội tự động hóa đặt chỗ.", "Ghé Siamese Cat Hotel"],
      creative: ["Siamese Cat Creative Club", "Không gian học sáng tạo, sản xuất hình ảnh, nội dung xã hội và quy trình giúp nhà sáng tạo biến ý tưởng thành tác phẩm đã xuất bản.", "Ghé Creative Club"]
    },
    growthEyebrow: "HỢP TÁC TRONG THỰC TẾ",
    growthTitle: "Doanh nghiệp phát triển vững hơn khi làm việc với đội ngũ có thể xây và triển khai.",
    growthText: "Hỗ trợ công nghệ của DJAI giúp hệ sinh thái Siamese Cat đi từ ý tưởng đến website, công cụ và quy trình đang hoạt động nhanh hơn. Sự phối hợp giữa đội kinh doanh và đội phát triển giúp học từ khách hàng, cải thiện dịch vụ và hỗ trợ tăng trưởng có hệ thống.",
    growthLink: "Xem các dự án được phép giới thiệu",
    finalTitle: "Bạn có ý tưởng kinh doanh hoặc quy trình có thể cải thiện bằng công nghệ?",
    finalText: "Hãy mang yêu cầu đến DJAI. Chúng tôi sẽ giúp xác định phạm vi thực tế, chọn cách tiếp cận hiệu quả về chi phí và nhanh chóng tiến tới một sản phẩm có thể ra mắt.",
    finalPrimary: "Trao đổi về dự án",
    finalSecondary: "Xem khóa Vibe Coding"
  }
};

export default function SiameseCatPage({ locale }) {
  const text = copy[locale];
  const localeSuffix = locale === "th" ? "" : `${locale}/`;
  const devHref = `/siamese_cat/dev/${localeSuffix}`;
  const homeHref = locale === "th" ? "/" : `/${locale}/`;
  const pageHref = `/siamese_cat/${localeSuffix}`;
  const localizedName = locale === "th" ? "ความร่วมมือระหว่าง DJAI Academy และ Siamese Cat" : locale === "vi" ? "Quan hệ đối tác giữa DJAI Academy và Siamese Cat" : "DJAI Academy and Siamese Cat Partnership";
  const ecosystemName = locale === "th" ? "ธุรกิจใน Siamese Cat ecosystem" : locale === "vi" ? "Hệ sinh thái doanh nghiệp Siamese Cat" : "Siamese Cat business ecosystem";

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        name: localizedName,
        url: `https://www.djai.academy${pageHref}`,
        inLanguage: locale,
        description: text.intro,
        about: ["DJAI Academy", "Siamese Cat Dev", "Siamese Cat Cafe", "Siamese Cat Hotel", "Siamese Cat Creative Club"]
      },
      {
        "@type": "ItemList",
        name: ecosystemName,
        itemListElement: partners.map((partner, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: text.partnerCopy[partner.key][0],
          url: partner.href
        }))
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "DJAI Academy", item: `https://www.djai.academy${homeHref}` },
          { "@type": "ListItem", position: 2, name: "Siamese Cat", item: `https://www.djai.academy${pageHref}` }
        ]
      }
    ]
  };

  return (
    <>
      <SiteHeader locale={locale} currentRoute="siameseCat" />
      <main className="siamese-partnership-page">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

        <section className="siamese-partnership-hero">
          <div className="siamese-partnership-copy">
            <p className="eyebrow">{text.eyebrow}</p>
            <h1>{text.title}</h1>
            <strong className="partnership-lead">{text.heroStatement}</strong>
            <p>{text.intro}</p>
            <div className="siamese-partnership-actions">
              <a className="button primary" href={devHref}>{text.devButton}</a>
              <a className="button secondary dark" href={`/development/${localeSuffix}`}>{text.serviceButton}</a>
            </div>
          </div>
          <div className="partnership-lockup" aria-label="DJAI Academy and Siamese Cat Dev partnership">
            <div><Image src="/djai-logo-display.webp" alt="DJAI Academy" width={768} height={413} priority /></div>
            <span aria-hidden="true">×</span>
            <a href={devHref} aria-label={text.devButton}>
              <img src="/siamese_cat/dev/siamese-cat-dev-logo.webp" alt="Siamese Cat Dev" width="640" height="540" />
            </a>
          </div>
        </section>

        <section className="partnership-overview">
          <div>
            <p className="eyebrow">{text.relationEyebrow}</p>
            <h2>{text.relationTitle}</h2>
            <p>{text.relationText.split("Siamese Cat Dev").map((part, index) => <span key={`${index}-${part.slice(0, 8)}`}>{index > 0 && <a className="partnership-inline-link" href={devHref}>Siamese Cat Dev</a>}{part}</span>)}</p>
          </div>
          <div className="partnership-pillars">
            {text.relationshipPoints.map(([title, description]) => (
              <article key={title}><strong>{title}</strong><p>{description}</p></article>
            ))}
          </div>
        </section>

        <section className="partner-directory">
          <div className="partner-directory-heading">
            <p className="eyebrow">{text.ecosystemEyebrow}</p>
            <h2>{text.ecosystemTitle}</h2>
            <p>{text.ecosystemText}</p>
          </div>
          <div className="partner-business-grid">
            {partners.map((partner) => {
              const [title, description, action] = text.partnerCopy[partner.key];
              return (
                <article className="partner-business" key={partner.key}>
                  <a className="partner-business-image" href={partner.href}>
                    <Image src={partner.image} alt={`${title} website`} width={960} height={540} loading="lazy" />
                  </a>
                  <div><h3>{title}</h3><p>{description}</p><a href={partner.href}>{action} <span aria-hidden="true">↗</span></a></div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="partnership-growth">
          <div><p className="eyebrow">{text.growthEyebrow}</p><h2>{text.growthTitle}</h2></div>
          <div><p>{text.growthText}</p><a href={`/portfolio/${localeSuffix}`}>{text.growthLink} <span aria-hidden="true">→</span></a></div>
        </section>

        <section className="partnership-cta">
          <div><h2>{text.finalTitle}</h2><p>{text.finalText}</p></div>
          <div className="siamese-partnership-actions">
            <a className="button primary" href={`/development/${localeSuffix}`}>{text.finalPrimary}</a>
            <a className="button secondary" href={`/course/detail/${localeSuffix}`}>{text.finalSecondary}</a>
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}

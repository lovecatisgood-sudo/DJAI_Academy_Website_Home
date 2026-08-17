import NewsletterSignup from "./NewsletterSignup";

const contactChannels = ["WhatsApp", "LINE", "Facebook", "Instagram", "TikTok", "X"];

const content = {
  th: {
    columns: [
      {
        title: "เรียนรู้",
        links: [
          ["เข้าร่วมคอร์ส Offline", "https://www.djai.academy/course/"],
          ["รายละเอียดคอร์ส", "https://www.djai.academy/course/detail/"],
          ["บล็อก", "https://www.djai.academy/blog/"]
        ]
      },
      {
        title: "สร้างกับเรา",
        links: [
          ["พัฒนาโปรเจกต์", "https://www.djai.academy/development/"],
          ["บริการ", "https://www.djai.academy/service/"],
          ["ผลงาน", "https://www.djai.academy/portfolio/"],
          ["โปรโมชัน", "https://www.djai.academy/course/#pricing"]
        ]
      },
      {
        title: "Community",
        links: [
          ["เข้าร่วม Online Community", "https://www.djai.academy/academy/"],
          ["เครื่องมือฟรี", "https://www.djai.academy/tools/"],
          ["โปรเจกต์ Open-source", null]
        ]
      }
    ],
    contact: "ติดต่อ",
    copyright: "(c) 2026 DJAI Academy. สงวนลิขสิทธิ์"
  },
  en: {
    columns: [
      {
        title: "Learn",
        links: [
          ["Join Offline Course", "https://www.djai.academy/course/en/"],
          ["Course Details", "https://www.djai.academy/course/detail/en/"],
          ["Blog", "https://www.djai.academy/blog/en/"]
        ]
      },
      {
        title: "Build",
        links: [
          ["Development", "https://www.djai.academy/development/en/"],
          ["Services", "https://www.djai.academy/service/en/"],
          ["Portfolio", "https://www.djai.academy/portfolio/en/"],
          ["Current Promo", "https://www.djai.academy/course/en/#pricing"]
        ]
      },
      {
        title: "Community",
        links: [
          ["Join Online Community", "https://www.djai.academy/academy/en/"],
          ["Tools", "https://www.djai.academy/tools/en/"],
          ["Open-source Projects", null]
        ]
      }
    ],
    contact: "Contact",
    copyright: "(c) 2026 DJAI Academy. All rights reserved."
  },
  vi: {
    columns: [
      { title: "Học", links: [["Tham gia lớp trực tiếp", "https://www.djai.academy/course/vi/"], ["Chi tiết chương trình", "https://www.djai.academy/course/detail/vi/"], ["Bài viết", "https://www.djai.academy/blog/vi/"]] },
      { title: "Xây cùng DJAI", links: [["Phát triển sản phẩm", "https://www.djai.academy/development/vi/"], ["Dịch vụ", "https://www.djai.academy/service/vi/"], ["Dự án", "https://www.djai.academy/portfolio/vi/"], ["Ưu đãi hiện tại", "https://www.djai.academy/course/vi/#pricing"]] },
      { title: "Cộng đồng", links: [["Tham gia cộng đồng online", "https://www.djai.academy/academy/vi/"], ["Công cụ miễn phí", "https://www.djai.academy/tools/vi/"], ["Dự án mã nguồn mở", null]] }
    ],
    contact: "Liên hệ", copyright: "(c) 2026 DJAI Academy. Bảo lưu mọi quyền."
  }
};

export default function SiteFooter({ locale = "th" }) {
  const language = ["th", "en", "vi"].includes(locale) ? locale : "th";
  const copy = content[language];

  return (
    <footer className="footer">
      <div className="footer-grid">
        {copy.columns.map((column) => (
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
          <h3>{copy.contact}</h3>
          <div className="contact-list">
            {contactChannels.map((channel) => (
              <span key={channel}>{channel}</span>
            ))}
            <a href="mailto:contact@djai.academy">Email: contact@djai.academy</a>
          </div>
        </div>
      </div>

      <NewsletterSignup locale={language} />
      <div className="copyright">{copy.copyright}</div>
    </footer>
  );
}

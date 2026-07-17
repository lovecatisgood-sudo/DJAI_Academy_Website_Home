import { urlFor } from "../lib/i18n";

const footerCopy = {
  en: {
    columns: [
      {
        title: "Learn",
        links: [
          ["Join Offline Course", "course"],
          ["Upcoming Courses", "course"],
          ["Blog", "blog"]
        ]
      },
      {
        title: "Build",
        links: [
          ["Development", "development"],
          ["Services", "service"],
          ["Portfolio", "portfolio"],
          ["Current Promo", "promo"]
        ]
      },
      {
        title: "Community",
        links: [
          ["Join Online Community", "community"],
          ["Tools", "tools"],
          ["Open-source Projects", null]
        ]
      }
    ],
    contact: "Contact",
    email: "Email:contact@djai.academy",
    copyright: "(c) 2026 DJAI Academy. All rights reserved."
  },
  th: {
    columns: [
      {
        title: "เรียนรู้",
        links: [
          ["สมัครคอร์สออฟไลน์", "course"],
          ["คอร์สเรียนที่กำลังเปิด", "course"],
          ["บล็อก", "blog"]
        ]
      },
      {
        title: "สร้างโปรเจกต์",
        links: [
          ["งานพัฒนา", "development"],
          ["บริการ", "service"],
          ["ผลงาน", "portfolio"],
          ["โปรโมชัน", "promo"]
        ]
      },
      {
        title: "ชุมชน",
        links: [
          ["เข้าร่วมชุมชนออนไลน์", "community"],
          ["เครื่องมือฟรี", "tools"],
          ["โปรเจกต์โอเพนซอร์ส", null]
        ]
      }
    ],
    contact: "ติดต่อ",
    email: "Email:contact@djai.academy",
    copyright: "(c) 2026 DJAI Academy. All rights reserved."
  }
};

const contactChannels = ["WhatsApp", "LINE", "Facebook", "Instagram", "TikTok", "X"];

export default function SiteFooter({ locale = "en" }) {
  const copy = footerCopy[locale] || footerCopy.en;

  return (
    <footer className="footer" id="contact">
      <div className="footer-grid">
        {copy.columns.map((column) => (
          <div key={column.title}>
            <h3>{column.title}</h3>
            {column.links.map(([label, route]) =>
              route ? (
                <a href={urlFor(route, locale)} key={label}>
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
            <a href="mailto:contact@djai.academy">{copy.email}</a>
          </div>
        </div>
      </div>

      <div className="copyright">{copy.copyright}</div>
    </footer>
  );
}

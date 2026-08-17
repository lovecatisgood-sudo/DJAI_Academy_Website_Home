import { urlFor } from "../lib/i18n";
import CookieSettingsButton from "./CookieSettingsButton";

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
          ["Current Promo", "promo"],
          ["Cam PDF Android App", "/Cam_PDF_Scan_Signer_QR-Gen/"]
        ]
      },
      {
        title: "Community",
        links: [
          ["Join Online Community", "community"],
          ["Tools", "tools"],
          ["Siamese Cat ecosystem", "siameseCat"],
          ["Open-source Projects", null]
        ]
      }
    ],
    contact: "Contact",
    email: "Email:contact@djai.academy",
    copyright: "(c) 2026 DJAI Academy. All rights reserved.",
    privacy: "Privacy & Cookie Policy",
    cookieSettings: "Cookie settings"
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
          ["โปรโมชัน", "promo"],
          ["แอป Cam PDF Android", "/Cam_PDF_Scan_Signer_QR-Gen/"]
        ]
      },
      {
        title: "ชุมชน",
        links: [
          ["เข้าร่วมชุมชนออนไลน์", "community"],
          ["เครื่องมือฟรี", "tools"],
          ["เครือข่าย Siamese Cat", "siameseCat"],
          ["โปรเจกต์โอเพนซอร์ส", null]
        ]
      }
    ],
    contact: "ติดต่อ",
    email: "Email:contact@djai.academy",
    copyright: "(c) 2026 DJAI Academy. All rights reserved.",
    privacy: "นโยบายความเป็นส่วนตัวและคุกกี้",
    cookieSettings: "ตั้งค่าคุกกี้"
  },
  vi: {
    columns: [
      {
        title: "Học",
        links: [
          ["Khóa học thực hành", "course"],
          ["Lộ trình cho người mới", "course"],
          ["Bài viết", "blog"]
        ]
      },
      {
        title: "Xây dựng",
        links: [
          ["Phát triển sản phẩm", "development"],
          ["Dịch vụ", "service"],
          ["Dự án đã thực hiện", "portfolio"],
          ["Ưu đãi hiện tại", "promo"],
          ["Ứng dụng Cam PDF Android", "/Cam_PDF_Scan_Signer_QR-Gen/"]
        ]
      },
      {
        title: "Cộng đồng",
        links: [
          ["Tham gia cộng đồng", "community"],
          ["Công cụ miễn phí", "tools"],
          ["Hệ sinh thái Siamese Cat", "siameseCat"],
          ["Dự án mã nguồn mở", null]
        ]
      }
    ],
    contact: "Liên hệ",
    email: "Email: contact@djai.academy",
    copyright: "© 2026 DJAI Academy. Bảo lưu mọi quyền.",
    privacy: "Quyền riêng tư và cookie",
    cookieSettings: "Cài đặt cookie"
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
                <a href={route.startsWith("/") ? route : urlFor(route, locale)} key={label}>
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

      <div className="copyright">
        <span>{copy.copyright}</span>
        <nav className="footer-legal" aria-label={locale === "th" ? "ลิงก์ทางกฎหมาย" : locale === "vi" ? "Liên kết pháp lý" : "Legal links"}>
          <a href={locale === "th" ? "/privacy/" : `/privacy/${locale}/`}>{copy.privacy}</a>
          <CookieSettingsButton>{copy.cookieSettings}</CookieSettingsButton>
        </nav>
      </div>
    </footer>
  );
}

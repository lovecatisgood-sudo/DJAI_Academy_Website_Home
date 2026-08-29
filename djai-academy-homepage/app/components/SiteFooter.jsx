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
  },
  "zh-CN": {
    columns: [
      { title: "学习", links: [["AI 课程", "course"], ["学习社区", "community"], ["文章", "blog"]] },
      { title: "构建", links: [["产品开发", "development"], ["开发服务", "service"], ["项目案例", "portfolio"], ["Cam PDF Android 应用", "/Cam_PDF_Scan_Signer_QR-Gen/"]] },
      { title: "工具与社区", links: [["免费工具", "tools"], ["Siamese Cat", "siameseCat"], ["联系 DJAI", "contact"]] }
    ],
    contact: "联系",
    email: "电子邮件：contact@djai.academy",
    copyright: "© 2026 DJAI Academy。保留所有权利。",
    privacy: "隐私政策与 Cookie",
    cookieSettings: "Cookie 设置"
  },
  "zh-TW": {
    columns: [
      { title: "學習", links: [["AI 課程", "course"], ["學習社群", "community"], ["文章", "blog"]] },
      { title: "打造", links: [["產品開發", "development"], ["開發服務", "service"], ["專案案例", "portfolio"], ["Cam PDF Android 應用程式", "/Cam_PDF_Scan_Signer_QR-Gen/"]] },
      { title: "工具與社群", links: [["免費工具", "tools"], ["Siamese Cat", "siameseCat"], ["聯絡 DJAI", "contact"]] }
    ],
    contact: "聯絡",
    email: "電子郵件：contact@djai.academy",
    copyright: "© 2026 DJAI Academy。保留所有權利。",
    privacy: "隱私權政策與 Cookie",
    cookieSettings: "Cookie 設定"
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
        <nav className="footer-legal" aria-label={locale === "th" ? "ลิงก์ทางกฎหมาย" : locale === "vi" ? "Liên kết pháp lý" : locale === "zh-CN" ? "法律链接" : locale === "zh-TW" ? "法律連結" : "Legal links"}>
          <a href={locale === "th" ? "/privacy/" : locale === "zh-CN" ? "/privacy/zh-cn/" : locale === "zh-TW" ? "/privacy/zh-tw/" : `/privacy/${locale}/`}>{copy.privacy}</a>
          <CookieSettingsButton>{copy.cookieSettings}</CookieSettingsButton>
        </nav>
      </div>
    </footer>
  );
}

import { schoolUrlFor, urlFor } from "../lib/i18n";
import CookieSettingsButton from "./CookieSettingsButton";

const footerCopy = {
  en: {
    columns: [
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
        title: "Tools & Product",
        links: [
          ["Free Tools", "tools"],
          ["Cam PDF Android App", "/Cam_PDF_Scan_Signer_QR-Gen/"]
        ]
      },
      {
        title: "Learn & Resources",
        links: [
          ["Learn at DJAI School", "school"],
          ["Blog and Guides", "blog"],
          ["Siamese Cat ecosystem", "siameseCat"]
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
        title: "พัฒนาโปรเจกต์",
        links: [
          ["งานพัฒนา", "development"],
          ["บริการ", "service"],
          ["ผลงาน", "portfolio"],
          ["โปรโมชัน", "promo"]
        ]
      },
      {
        title: "เครื่องมือและผลิตภัณฑ์",
        links: [
          ["เครื่องมือฟรี", "tools"],
          ["แอป Cam PDF Android", "/Cam_PDF_Scan_Signer_QR-Gen/"]
        ]
      },
      {
        title: "เรียนรู้และอ่านต่อ",
        links: [
          ["เรียนกับ DJAI School", "school"],
          ["บทความและคู่มือ", "blog"],
          ["เครือข่าย Siamese Cat", "siameseCat"]
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
        title: "Xây dựng",
        links: [
          ["Phát triển sản phẩm", "development"],
          ["Dịch vụ", "service"],
          ["Dự án đã thực hiện", "portfolio"],
          ["Ưu đãi hiện tại", "promo"]
        ]
      },
      {
        title: "Công cụ và sản phẩm",
        links: [
          ["Công cụ miễn phí", "tools"],
          ["Ứng dụng Cam PDF Android", "/Cam_PDF_Scan_Signer_QR-Gen/"]
        ]
      },
      {
        title: "Học và tài nguyên",
        links: [
          ["Học tại DJAI School", "school"],
          ["Bài viết và hướng dẫn", "blog"],
          ["Hệ sinh thái Siamese Cat", "siameseCat"]
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
      { title: "构建", links: [["产品开发", "development"], ["开发服务", "service"], ["项目案例", "portfolio"]] },
      { title: "工具与产品", links: [["免费工具", "tools"], ["Cam PDF Android 应用", "/Cam_PDF_Scan_Signer_QR-Gen/"]] },
      { title: "学习与资源", links: [["在 DJAI School 学习", "school"], ["文章与指南", "blog"], ["Siamese Cat", "siameseCat"]] }
    ],
    contact: "联系",
    email: "电子邮件：contact@djai.academy",
    copyright: "© 2026 DJAI Academy。保留所有权利。",
    privacy: "隐私政策与 Cookie",
    cookieSettings: "Cookie 设置"
  },
  "zh-TW": {
    columns: [
      { title: "打造", links: [["產品開發", "development"], ["開發服務", "service"], ["專案案例", "portfolio"]] },
      { title: "工具與產品", links: [["免費工具", "tools"], ["Cam PDF Android 應用程式", "/Cam_PDF_Scan_Signer_QR-Gen/"]] },
      { title: "學習與資源", links: [["在 DJAI School 學習", "school"], ["文章與指南", "blog"], ["Siamese Cat", "siameseCat"]] }
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
                <a href={route === "school" ? schoolUrlFor(locale) : route.startsWith("/") ? route : urlFor(route, locale)} key={label}>
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

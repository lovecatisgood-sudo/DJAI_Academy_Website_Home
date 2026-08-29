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
  },
  "zh-CN": {
    columns: [
      { title: "学习", links: [["AI 实战课程", "https://www.djai.academy/course/zh-cn/"], ["课程详情", "https://www.djai.academy/course/detail/zh-cn/"], ["文章", "https://www.djai.academy/blog/zh-cn/"]] },
      { title: "与 DJAI 共创", links: [["产品开发", "https://www.djai.academy/development/zh-cn/"], ["服务", "https://www.djai.academy/service/zh-cn/"], ["案例", "https://www.djai.academy/portfolio/zh-cn/"]] },
      { title: "学习社区", links: [["加入社区", "https://www.djai.academy/academy/zh-cn/"], ["免费在线工具", "https://www.djai.academy/tools/zh-cn/"]] }
    ],
    contact: "联系我们", copyright: "(c) 2026 DJAI Academy. 保留所有权利。"
  },
  "zh-TW": {
    columns: [
      { title: "學習", links: [["AI 實戰課程", "https://www.djai.academy/course/zh-tw/"], ["課程詳情", "https://www.djai.academy/course/detail/zh-tw/"], ["文章", "https://www.djai.academy/blog/zh-tw/"]] },
      { title: "與 DJAI 共創", links: [["產品開發", "https://www.djai.academy/development/zh-tw/"], ["服務", "https://www.djai.academy/service/zh-tw/"], ["案例", "https://www.djai.academy/portfolio/zh-tw/"]] },
      { title: "學習社群", links: [["加入社群", "https://www.djai.academy/academy/zh-tw/"], ["免費線上工具", "https://www.djai.academy/tools/zh-tw/"]] }
    ],
    contact: "聯絡我們", copyright: "(c) 2026 DJAI Academy. 保留所有權利。"
  }
};

export default function SiteFooter({ locale = "th" }) {
  const language = ["th", "en", "vi", "zh-CN", "zh-TW"].includes(locale) ? locale : "th";
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

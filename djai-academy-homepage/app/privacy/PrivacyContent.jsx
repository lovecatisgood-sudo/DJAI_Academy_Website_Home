import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import CookieSettingsButton from "../components/CookieSettingsButton";
import styles from "./privacy.module.css";

const content = {
  vi: {
    eyebrow: "Quyền riêng tư tại DJAI Academy",
    title: "Chính sách quyền riêng tư và cookie",
    updated: "Có hiệu lực từ: 2 tháng 8, 2026 · Cập nhật lần cuối: 26 tháng 10, 2026",
    intro: "Chính sách này giải thích cách website DJAI Academy sử dụng thông tin, cookie và các hình thức lưu trữ tương tự trên trình duyệt. Chính sách áp dụng cho www.djai.academy và không thay thế chính sách riêng của sản phẩm hoặc ứng dụng di động, nếu sản phẩm đó có chính sách riêng.",
    sections: [
      { title: "Đơn vị chịu trách nhiệm", paragraphs: ["DJAI Academy vận hành website này. Bạn có thể gửi câu hỏi hoặc yêu cầu về quyền riêng tư đến contact@djai.academy."] },
      { title: "Thông tin được xử lý khi bạn truy cập", paragraphs: [
        "Hạ tầng lưu trữ và bảo mật cần tiếp nhận một số thông tin kỹ thuật của yêu cầu, chẳng hạn địa chỉ IP, URL được truy cập, ngày giờ, header của trình duyệt và sự kiện chẩn đoán hoặc bảo mật.",
        "Nếu bạn cho phép phân tích, Google Analytics có thể xử lý mã định danh trình duyệt, trang đã xem, hoạt động trong phiên, nguồn giới thiệu, vị trí gần đúng và đặc điểm của trình duyệt hoặc thiết bị. Chúng tôi dùng thông tin này để hiểu trang và công cụ nào hữu ích, đồng thời cải thiện hiệu suất và nội dung website.",
        "Hiện website tạm dừng Google AdSense và không tải mã phân phối quảng cáo hoặc yêu cầu đồng ý với quảng cáo. Thẻ xác minh nhà xuất bản và ads.txt vẫn được giữ lại. Nếu quảng cáo được bật lại, chúng tôi sẽ cập nhật thông báo và cơ chế đồng ý trước khi phân phối quảng cáo."
      ] },
      { title: "Cookie và dữ liệu trình duyệt chúng tôi sử dụng", table: [
        ["djai_consent_v1", "Local storage của DJAI Academy", "Cần thiết", "Ghi nhớ lựa chọn phân tích; quảng cáo vẫn bị tắt", "Tối đa 180 ngày"],
        ["_ga", "Google Analytics", "Phân tích", "Phân biệt trình duyệt để đo lường người truy cập và phiên", "Tối đa 2 năm; trình duyệt có thể rút ngắn"],
        ["_ga_<property>", "Google Analytics", "Phân tích", "Duy trì trạng thái đo lường cho thuộc tính Analytics", "Tối đa 2 năm; trình duyệt có thể rút ngắn"]
      ], paragraphs: ["Website không tải cookie quảng cáo AdSense trong thời gian tạm dừng. Cookie do Google hoặc bên thứ ba đặt trước đây có thể vẫn còn trong trình duyệt và được quản lý qua cài đặt trình duyệt hoặc Google. Cookie tùy chọn không cần thiết để sử dụng các trang và công cụ chính."] },
      { title: "Lựa chọn của bạn", paragraphs: [
        "Mặc định, website từ chối lưu trữ cho phân tích và quảng cáo. Google Analytics chỉ tải sau khi bạn đồng ý với phân tích. Bạn có thể đồng ý, từ chối hoặc thay đổi lựa chọn phân tích trong cài đặt cookie. Quảng cáo vẫn bị tắt bất kể lựa chọn phân tích.",
        "Khi rút lại sự đồng ý, các dịch vụ tùy chọn sẽ không tải ở những lần xem trang tiếp theo và website sẽ xóa cookie Google Analytics trên tên miền DJAI mà nó có thể truy cập. Cookie bên thứ ba do Google kiểm soát cần được quản lý trong trình duyệt hoặc cài đặt quyền riêng tư của Google."
      ], settings: "Mở cài đặt cookie" },
      { title: "Công cụ xử lý tệp", paragraphs: ["Khi công cụ nêu rõ việc xử lý diễn ra trong trình duyệt, các tệp được hỗ trợ được xử lý cục bộ. Chúng tôi không chủ ý gửi nội dung tệp đến hệ thống phân tích hoặc quảng cáo. Nếu bạn đồng ý với phân tích, Google Analytics có thể nhận thông tin truy cập trang và sự kiện công cụ thông thường. AdSense hiện bị tắt. Hãy đọc thông báo trên từng công cụ trước khi xử lý tài liệu mật."] },
      { title: "Nhà cung cấp dịch vụ và xử lý dữ liệu quốc tế", paragraphs: ["Chúng tôi sử dụng nhà cung cấp lưu trữ và phân phối website để vận hành và bảo vệ dịch vụ, cùng Google Analytics khi bạn đồng ý với phân tích. Google AdSense hiện bị tắt. Nhà cung cấp đang hoạt động có thể xử lý thông tin tại quốc gia khác theo điều khoản và cơ chế bảo vệ dữ liệu của họ."], links: [
        ["Cách Google sử dụng thông tin từ website đối tác", "https://policies.google.com/technologies/partner-sites?hl=vi"],
        ["Cách Google sử dụng cookie", "https://policies.google.com/technologies/cookies?hl=vi"],
        ["Các công cụ kiểm soát quyền riêng tư của Google", "https://myaccount.google.com/data-and-privacy?hl=vi"]
      ] },
      { title: "Thời gian lưu giữ và quyền của bạn", paragraphs: [
        "Nhật ký kỹ thuật, dữ liệu phân tích và dữ liệu quảng cáo được lưu theo nhu cầu vận hành, cấu hình của nhà cung cấp, nghĩa vụ pháp lý và thời hạn nêu trên. Chúng tôi không cam kết có thể xác định mọi bản ghi từ tên của bạn vì nhiều bản ghi sử dụng mã định danh trình duyệt.",
        "Tùy luật áp dụng, bạn có thể có quyền hỏi, truy cập, sửa, xóa, hạn chế, phản đối, nhận bản sao thông tin cá nhân hoặc rút lại sự đồng ý. Hãy cung cấp đủ thông tin để chúng tôi hiểu yêu cầu. Bạn cũng có thể khiếu nại đến cơ quan bảo vệ dữ liệu tại nơi mình sinh sống."
      ] },
      { title: "Thay đổi chính sách", paragraphs: ["Chúng tôi có thể cập nhật chính sách khi tính năng, nhà cung cấp hoặc yêu cầu pháp lý thay đổi. Thay đổi quan trọng sẽ được phản ánh bằng ngày cập nhật ở trên và, khi phù hợp, bằng một yêu cầu đồng ý mới."] }
    ]
  },
  en: {
    eyebrow: "Privacy at DJAI Academy",
    title: "Privacy & Cookie Policy",
    updated: "Effective: August 2, 2026 · Last updated: October 26, 2026",
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
          "Google AdSense serving is currently paused. This website does not load ad-serving code or offer advertising consent. Publisher verification metadata and ads.txt remain available. Before advertising resumes, we will update the disclosures and consent controls for the advertising services being enabled."
        ]
      },
      {
        title: "Cookies and browser storage we use",
        table: [
          ["djai_consent_v1", "DJAI Academy local storage", "Necessary", "Remembers the analytics choice; advertising stays disabled", "Up to 180 days"],
          ["_ga", "Google Analytics", "Analytics", "Distinguishes browsers for visitor and session measurement", "Up to 2 years; browsers may shorten this"],
          ["_ga_<property>", "Google Analytics", "Analytics", "Maintains measurement state for this Analytics property", "Up to 2 years; browsers may shorten this"]
        ],
        paragraphs: [
          "The website does not load AdSense advertising cookies while ad serving is paused. Google or third-party cookies already present from earlier activity may remain and can be managed through browser or Google settings. Optional cookies are not required for the website’s primary pages and tools."
        ]
      },
      {
        title: "Your choices",
        paragraphs: [
          "Analytics and advertising storage are denied by default. Google Analytics loads only after analytics consent. You can accept, reject, or later change the analytics choice in cookie settings. Advertising remains disabled regardless of your analytics choice.",
          "Withdrawing consent prevents optional services from loading on future page views and removes accessible DJAI-domain Google Analytics cookies. Third-party cookies already controlled by Google must be managed through your browser or Google privacy settings."
        ],
        settings: "Open cookie settings"
      },
      {
        title: "File-processing tools",
        paragraphs: [
          "Where a tool explicitly says that processing happens in your browser, supported files are processed locally. We do not intentionally send file contents to analytics or advertising services. If you allow analytics, Google Analytics may receive ordinary page-visit and tool-event information. AdSense is currently disabled. Check each tool’s notice before processing confidential material."
        ]
      },
      {
        title: "Service providers and international processing",
        paragraphs: [
          "We use website hosting and delivery providers to operate and secure the service, and Google Analytics when you allow analytics. Google AdSense serving is currently disabled. Active providers may process information in countries other than your own under their terms and data-protection mechanisms."
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
    updated: "มีผล: 2 สิงหาคม 2569 · ปรับปรุงล่าสุด: 26 ตุลาคม 2569",
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
          "ขณะนี้เว็บไซต์พักการแสดงโฆษณา Google AdSense โดยไม่โหลดโค้ดแสดงโฆษณาและไม่มีตัวเลือกให้ยินยอมรับโฆษณา เรายังคงข้อมูลยืนยันผู้เผยแพร่และ ads.txt ไว้ ก่อนกลับมาแสดงโฆษณา เราจะปรับคำชี้แจงและระบบความยินยอมให้ตรงกับบริการที่เปิดใช้"
        ]
      },
      {
        title: "คุกกี้และพื้นที่จัดเก็บที่เราใช้",
        table: [
          ["djai_consent_v1", "Local storage ของ DJAI Academy", "จำเป็น", "จดจำตัวเลือกการวิเคราะห์ โดยยังปิดการโฆษณา", "ไม่เกิน 180 วัน"],
          ["_ga", "Google Analytics", "การวิเคราะห์", "แยกเบราว์เซอร์เพื่อวัดผู้เข้าชมและ session", "ไม่เกิน 2 ปี โดยเบราว์เซอร์อาจลดระยะเวลา"],
          ["_ga_<property>", "Google Analytics", "การวิเคราะห์", "เก็บสถานะการวัดผลของ Analytics property นี้", "ไม่เกิน 2 ปี โดยเบราว์เซอร์อาจลดระยะเวลา"]
        ],
        paragraphs: [
          "เว็บไซต์ไม่โหลดคุกกี้โฆษณา AdSense ระหว่างพักการแสดงโฆษณา คุกกี้ของ Google หรือบุคคลที่สามที่มีอยู่จากการใช้งานก่อนหน้าอาจยังคงอยู่ และจัดการได้ผ่านการตั้งค่าเบราว์เซอร์หรือ Google คุกกี้เสริมไม่จำเป็นต่อหน้าและเครื่องมือหลักของเว็บไซต์"
        ]
      },
      {
        title: "ตัวเลือกของคุณ",
        paragraphs: [
          "ระบบปฏิเสธพื้นที่จัดเก็บสำหรับการวิเคราะห์และโฆษณาเป็นค่าเริ่มต้น Google Analytics จะโหลดหลังจากคุณอนุญาตการวิเคราะห์เท่านั้น คุณสามารถยอมรับ ปฏิเสธ หรือเปลี่ยนตัวเลือกการวิเคราะห์ได้ในการตั้งค่าคุกกี้ การโฆษณายังคงปิดอยู่ไม่ว่าคุณจะเลือกการวิเคราะห์อย่างไร",
          "การถอนความยินยอมจะหยุดบริการเสริมในหน้าที่โหลดครั้งถัดไปและลบคุกกี้ Google Analytics บนโดเมน DJAI ที่เว็บไซต์เข้าถึงได้ ส่วนคุกกี้บุคคลที่สามที่ Google ควบคุมต้องจัดการผ่านเบราว์เซอร์หรือการตั้งค่าความเป็นส่วนตัวของ Google"
        ],
        settings: "เปิดการตั้งค่าคุกกี้"
      },
      {
        title: "เครื่องมือประมวลผลไฟล์",
        paragraphs: [
          "เมื่อเครื่องมือระบุว่าประมวลผลในเบราว์เซอร์ ไฟล์ที่รองรับจะถูกประมวลผลภายในอุปกรณ์ เราไม่มีเจตนาส่งเนื้อหาไฟล์ไปยังระบบวิเคราะห์หรือโฆษณา หากคุณอนุญาตการวิเคราะห์ Google Analytics อาจได้รับข้อมูลการเข้าชมหน้าและเหตุการณ์การใช้เครื่องมือตามปกติ ขณะนี้ปิด AdSense อยู่ โปรดอ่านคำชี้แจงของแต่ละเครื่องมือก่อนประมวลผลข้อมูลลับ"
        ]
      },
      {
        title: "ผู้ให้บริการและการประมวลผลระหว่างประเทศ",
        paragraphs: [
          "เราใช้ผู้ให้บริการโฮสติ้งและส่งมอบเว็บไซต์เพื่อให้บริการและรักษาความปลอดภัย และใช้ Google Analytics เมื่อคุณอนุญาตการวิเคราะห์ ขณะนี้ปิดการแสดงโฆษณา Google AdSense อยู่ ผู้ให้บริการที่ใช้งานอาจประมวลผลข้อมูลในประเทศอื่นภายใต้ข้อกำหนดและกลไกคุ้มครองข้อมูลของตน"
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
  th: ["รายการ", "ผู้ให้บริการ", "หมวดหมู่", "วัตถุประสงค์", "ระยะเวลาทั่วไป"],
  vi: ["Mục", "Nhà cung cấp", "Phân loại", "Mục đích", "Thời gian lưu thông thường"]
};

export default function PrivacyContent({ locale = "en" }) {
  const page = content[locale] || content.en;

  return (
    <>
      <SiteHeader locale={locale} currentRoute="home" languageHrefs={{ th: "/privacy/", en: "/privacy/en/", vi: "/privacy/vi/" }} />
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

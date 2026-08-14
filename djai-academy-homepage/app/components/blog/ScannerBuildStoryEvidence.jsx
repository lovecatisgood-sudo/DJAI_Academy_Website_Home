import Image from "next/image";

const APP_PATH = "/Cam_PDF_Scan_Signer_QR-Gen/";

const copy = {
  en: {
    eyebrow: "Product evidence",
    title: "The app in this build story is a working product, not a mockup.",
    body:
      "These screens show the current Android document workflow while the Google Play release is being prepared. The product page records the available features, release status, and privacy boundaries separately from the lessons in this article.",
    product: "Explore the Cam PDF product",
    privacy: "Read its document-privacy policy",
    screens: [
      ["home.png", "Document library", "Recent files, scan actions, and document management."],
      ["editor.png", "Edge correction", "A captured page can be reviewed and corrected before export."],
      ["export.png", "Named export", "The user chooses the file name, format, page size, and quality."]
    ],
    nextEyebrow: "Continue from the build story",
    nextTitle: "Inspect the product, then study the workflow behind it.",
    academy: "See the DJAI learning path"
  },
  th: {
    eyebrow: "หลักฐานจาก Product",
    title: "แอปใน Build Story นี้เป็น Product ที่ทำงานจริง ไม่ใช่ Mockup",
    body:
      "หน้าจอเหล่านี้แสดง workflow เอกสารบน Android เวอร์ชันปัจจุบัน ระหว่างที่ทีมเตรียมเผยแพร่บน Google Play ส่วนหน้า Product จะแยกรายละเอียดฟีเจอร์ สถานะการเปิดตัว และขอบเขตความเป็นส่วนตัวออกจากบทเรียนในบทความนี้อย่างชัดเจน",
    product: "ดู Product Cam PDF",
    privacy: "อ่านนโยบายความเป็นส่วนตัวของเอกสาร",
    screens: [
      ["home.png", "คลังเอกสาร", "ไฟล์ล่าสุด ปุ่มสแกน และการจัดการเอกสารอยู่ในหน้าหลักเดียวกัน"],
      ["editor.png", "ปรับขอบเอกสาร", "ผู้ใช้ตรวจและแก้ขอบหน้าที่ถ่ายก่อน Export ได้"],
      ["export.png", "ตั้งชื่อก่อน Export", "ผู้ใช้เลือกชื่อไฟล์ Format ขนาดหน้า และคุณภาพได้เอง"]
    ],
    nextEyebrow: "ไปต่อจาก Build Story",
    nextTitle: "ลองดู Product จริง แล้วเรียนรู้ Workflow ที่ใช้สร้างมัน",
    academy: "ดูเส้นทางการเรียนของ DJAI"
  },
  vi: {
    eyebrow: "Bằng chứng sản phẩm",
    title: "Ứng dụng trong câu chuyện này là sản phẩm hoạt động thật, không phải mockup.",
    body: "Các màn hình cho thấy quy trình tài liệu Android hiện tại trong lúc bản Google Play đang được chuẩn bị. Trang sản phẩm ghi riêng tính năng, trạng thái phát hành và ranh giới quyền riêng tư để phân biệt bằng chứng sản phẩm với bài học trong bài viết.",
    product: "Khám phá sản phẩm Cam PDF",
    privacy: "Đọc chính sách quyền riêng tư tài liệu",
    screens: [["home.png", "Thư viện tài liệu", "Tệp gần đây, thao tác quét và quản lý tài liệu."], ["editor.png", "Chỉnh đường biên", "Trang đã chụp có thể được kiểm tra và sửa trước khi xuất."], ["export.png", "Đặt tên khi xuất", "Người dùng chọn tên tệp, định dạng, kích thước trang và chất lượng."]],
    nextEyebrow: "Tiếp tục từ câu chuyện xây sản phẩm",
    nextTitle: "Xem sản phẩm thật rồi học quy trình phía sau.",
    academy: "Xem lộ trình học DJAI"
  }
};

export const SCANNER_BUILD_STORY_SLUG = "vibe-coded-free-scanner-app-real-product";

export function ScannerBuildStoryEvidence({ locale = "en" }) {
  const text = copy[locale] || copy.en;

  return (
    <section className="article-evidence" aria-labelledby="scanner-evidence-title">
      <div className="article-evidence-heading">
        <p className="eyebrow">{text.eyebrow}</p>
        <h2 id="scanner-evidence-title">{text.title}</h2>
        <p>{text.body}</p>
        <div className="article-evidence-links">
          <a href={locale === "vi" ? `${APP_PATH}vi/` : APP_PATH}>{text.product}</a>
          <a href={`${APP_PATH}privacy/`}>{text.privacy}</a>
        </div>
      </div>

      <div className="article-evidence-grid">
        {text.screens.map(([src, title, description]) => (
          <figure key={src}>
            <Image
              src={`/apps/cam-pdf/${src}`}
              alt={`${title} — Cam PDF Scan Signer QR Gen`}
              width={390}
              height={844}
              sizes="(max-width: 760px) 78vw, 240px"
            />
            <figcaption>
              <strong>{title}</strong>
              <span>{description}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export function ScannerBuildStoryNextStep({ locale = "en" }) {
  const text = copy[locale] || copy.en;
  const academyHref = locale === "th" ? "/academy/" : `/academy/${locale}/`;
  const productHref = locale === "vi" ? `${APP_PATH}vi/` : APP_PATH;

  return (
    <aside className="article-next-step" aria-label={text.nextEyebrow}>
      <div>
        <p className="eyebrow">{text.nextEyebrow}</p>
        <h2>{text.nextTitle}</h2>
      </div>
      <div className="article-next-step-actions">
        <a className="button" href={productHref}>{text.product}</a>
        <a className="text-link" href={academyHref}>{text.academy}</a>
      </div>
    </aside>
  );
}

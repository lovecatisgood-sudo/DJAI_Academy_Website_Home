"use client";

import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  BookOpen,
  Check,
  Download,
  FileArchive,
  FileImage,
  FileLock2,
  Files,
  FileStack,
  GraduationCap,
  Hash,
  ImagePlus,
  ListOrdered,
  LoaderCircle,
  LockKeyhole,
  Menu,
  Minimize2,
  ScanLine,
  Smartphone,
  Tags,
  RotateCw,
  ShieldCheck,
  Sparkles,
  Trash2,
  Upload,
  WandSparkles,
  X
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import type { ProcessingOptions, ProcessResult } from "./pdf-actions";
import { pdfSeoAliases, type PdfSeoPage } from "./seo-alias-data";
import AdSenseAd from "./AdSenseAd";
import ShareButtons from "./ShareButtons";
import ToolPromoModal, { shouldShowToolPromo } from "./ToolPromoModal";
import { BASE_PATH, SITE_URL, homeHref, toolCopy, toolGuides, toolHref, toolSlugs, type Language, type ToolSlug } from "./tool-data";

const icons: Record<ToolSlug, LucideIcon> = {
  "merge-pdf": Files,
  "split-pdf": FileStack,
  "compress-pdf": Minimize2,
  "images-to-pdf": ImagePlus,
  "pdf-to-images": FileImage,
  "rotate-pdf": RotateCw,
  "watermark-pdf": Sparkles,
  "protect-pdf": FileLock2,
  "organize-pdf": ListOrdered,
  "add-page-numbers": Hash,
  "remove-pdf-metadata": Tags
};

const relatedToolOrder: Record<ToolSlug, ToolSlug[]> = {
  "merge-pdf": ["split-pdf", "organize-pdf", "compress-pdf", "add-page-numbers", "watermark-pdf", "protect-pdf"],
  "split-pdf": ["merge-pdf", "organize-pdf", "compress-pdf", "remove-pdf-metadata", "protect-pdf", "add-page-numbers"],
  "compress-pdf": ["merge-pdf", "split-pdf", "remove-pdf-metadata", "protect-pdf", "organize-pdf", "images-to-pdf"],
  "images-to-pdf": ["pdf-to-images", "merge-pdf", "compress-pdf", "organize-pdf", "add-page-numbers", "protect-pdf"],
  "pdf-to-images": ["images-to-pdf", "split-pdf", "compress-pdf", "remove-pdf-metadata", "organize-pdf", "merge-pdf"],
  "rotate-pdf": ["organize-pdf", "split-pdf", "merge-pdf", "add-page-numbers", "watermark-pdf", "compress-pdf"],
  "watermark-pdf": ["protect-pdf", "add-page-numbers", "remove-pdf-metadata", "compress-pdf", "merge-pdf", "organize-pdf"],
  "protect-pdf": ["remove-pdf-metadata", "watermark-pdf", "compress-pdf", "merge-pdf", "organize-pdf", "add-page-numbers"],
  "organize-pdf": ["split-pdf", "merge-pdf", "rotate-pdf", "add-page-numbers", "compress-pdf", "remove-pdf-metadata"],
  "add-page-numbers": ["watermark-pdf", "organize-pdf", "merge-pdf", "protect-pdf", "compress-pdf", "remove-pdf-metadata"],
  "remove-pdf-metadata": ["protect-pdf", "compress-pdf", "watermark-pdf", "organize-pdf", "split-pdf", "merge-pdf"]
};

const toolCategories = {
  th: [
    ["เครื่องมือทั้งหมด", "/tools/", "รวมเครื่องมือฟรีทุกหมวดจาก DJAI"],
    ["QR Code", "/tools/qrgen/", "สร้าง QR สำหรับลิงก์ Wi-Fi และผู้ติดต่อ"],
    ["รูปภาพ", "/tools/resizeimg/", "แปลง resize บีบอัด และลบพื้นหลัง"],
    ["เสียงและวิดีโอ", "/tools/media/", "แปลงไฟล์ ดึงเสียง และบีบอัดวิดีโอ"],
    ["เอกสาร", "/tools/document/", "แปลง DOCX ดึงข้อความ และ OCR"],
    ["AI Context", "/tools/ai/", "นับ token แบ่ง RAG chunk และจัด prompt"],
    ["Spreadsheet", "/tools/spreadsheet/", "แปลงและจัดการ CSV JSON และ XLSX"]
  ],
  en: [
    ["All free tools", "/tools/en/", "Browse every free DJAI tool by task."],
    ["QR code tools", "/tools/qrgen/en/", "Create QR codes for links, Wi-Fi, and contacts."],
    ["Image tools", "/tools/resizeimg/en/", "Convert, resize, compress, and remove backgrounds."],
    ["Audio and video", "/tools/media/en/", "Convert files, extract audio, and compress video."],
    ["Document tools", "/tools/document/en/", "Convert DOCX, extract text, and run OCR."],
    ["AI context tools", "/tools/ai/en/", "Count tokens, plan RAG chunks, and package prompts."],
    ["Spreadsheet tools", "/tools/spreadsheet/en/", "Convert and process CSV, JSON, and XLSX."]
  ],
  vi: [
    ["Tất cả công cụ", "/tools/vi/", "Duyệt toàn bộ công cụ miễn phí theo công việc."],
    ["Công cụ QR", "/tools/qrgen/vi/", "Tạo QR cho URL, Wi-Fi và liên hệ."],
    ["Công cụ hình ảnh", "/tools/resizeimg/vi/", "Chuyển đổi, resize, nén và xóa nền."],
    ["Âm thanh và video", "/tools/media/", "Chuyển đổi media, tách âm thanh và nén video."],
    ["Công cụ tài liệu", "/tools/document/vi/", "Chuyển DOCX, trích xuất văn bản và OCR."],
    ["Công cụ AI", "/tools/ai/vi/", "Đếm token, chia RAG chunk và chuẩn bị prompt."],
    ["Công cụ bảng tính", "/tools/spreadsheet/vi/", "Chuyển đổi và xử lý CSV, JSON, XLSX."]
  ]
} as const;

function linkedBuilderName(text: string, href: string) {
  return text.split("Siamese Cat Dev").map((part, index) => (
    <Fragment key={`${index}-${part.slice(0, 12)}`}>
      {index > 0 && <a className="siamese-dev-link" href={href}>Siamese Cat Dev</a>}
      {part}
    </Fragment>
  ));
}

const defaultOptions: ProcessingOptions = {
  splitMode: "extract",
  pageRanges: "1",
  everyPages: 1,
  compression: "recommended",
  imagePageSize: "a4",
  imageOrientation: "auto",
  imageFormat: "jpg",
  imageScale: 1.5,
  rotation: 90,
  selectedPages: "",
  watermarkType: "text",
  watermarkText: "CONFIDENTIAL",
  watermarkImage: null,
  watermarkOpacity: 28,
  watermarkPosition: "center",
  watermarkSize: 42,
  password: "",
  allowPrint: true,
  allowCopy: false,
  allowModify: false,
  allowForms: true,
  organizeMode: "order",
  pageOrder: "1-3",
  deletePages: "1",
  pageNumberPosition: "bottom-center",
  pageNumberStart: 1
};

const ui = {
  th: {
    nav: { tools: "เครื่องมือทั้งหมด", course: "คอร์ส Vibe Coding", development: "พัฒนาเว็บไซต์", blog: "บทความ", language: "EN" },
    heroEyebrow: "DJTools by DJAI Academy",
    heroTitle: "เครื่องมือ PDF ระดับมืออาชีพ ใช้ฟรีทุกคน",
    heroText: "รวม แยก บีบอัด แปลง หมุน ใส่ลายน้ำ และป้องกัน PDF โดยไฟล์ทำงานใน browser และไม่ออกจากอุปกรณ์ของคุณ",
    heroButton: "เริ่มใช้เครื่องมือฟรี",
    trust: ["ฟรี 100%", "ไม่ต้องสมัคร", "ไม่มี watermark", "ประมวลผลในอุปกรณ์"],
    allTools: "11 เครื่องมือ PDF ที่ใช้งานได้จริง",
    allToolsText: "เลือกงานที่ต้องการ ไฟล์จะถูกประมวลผลใน browser โดยไม่ส่งขึ้น server",
    open: "เปิดเครื่องมือ",
    workspace: "พื้นที่ทำงาน",
    uploadTitle: "วางไฟล์ที่นี่",
    uploadPdf: "เลือก PDF",
    uploadImages: "เลือกรูปภาพ",
    uploadHint: "รองรับไฟล์สูงสุด 100 MB ต่อไฟล์",
    files: "ไฟล์ที่เลือก",
    settings: "ตั้งค่าผลลัพธ์",
    process: "ประมวลผลไฟล์",
    processing: "กำลังประมวลผลใน browser...",
    clear: "เริ่มใหม่",
    resultTitle: "ไฟล์ของคุณพร้อมแล้ว",
    resultText: "ประมวลผลเสร็จบนอุปกรณ์นี้ และไม่มีไฟล์ถูกส่งไปยัง server",
    download: "ดาวน์โหลดไฟล์",
    original: "ไฟล์ต้นฉบับ",
    result: "ไฟล์ผลลัพธ์",
    items: "รายการ",
    continue: "ทำงานต่อด้วยเครื่องมืออื่น",
    privacyTitle: "Private by design",
    privacyText: "PDF รูปภาพ และรหัสผ่านของคุณทำงานใน memory ของ browser เท่านั้น DJAI และ Siamese Cat Dev ไม่ได้รับ จัดเก็บ หรือดูไฟล์เหล่านี้ ข้อมูลจะหายเมื่อปิดหรือ refresh หน้า",
    devEyebrow: "จากงานเอกสารสู่ระบบธุรกิจ",
    devTitle: "ต้องการ portal เอกสารหรือ workflow สำหรับบริษัท?",
    devText: "DJAI และ Siamese Cat Dev พัฒนาเว็บไซต์ web application ระบบจัดการเอกสาร CRM automation และ AI workflow ที่เหมาะกับกระบวนการจริงของธุรกิจ",
    devButton: "คุยเรื่องพัฒนาเว็บไซต์",
    portfolioButton: "ดูผลงาน",
    courseEyebrow: "สร้างเครื่องมือของคุณเอง",
    courseTitle: "เรียน Vibe Coding แล้วเปลี่ยน workflow ให้เป็น product",
    courseText: "เรียนกระบวนการตั้งแต่ idea, plan, build ไปจนถึง launch เว็บไซต์ application และ automation ด้วย AI",
    courseButton: "สำรวจคอร์ส",
    builderEyebrow: "Built with intention by",
    builderTitle: "Siamese Cat Dev",
    builderText: "Created with intention by Siamese Cat Dev. Siamese Cat Dev is a product designer, project manager, and software development partner with nearly 10 years of experience building digital products for real businesses. He is also a student at DJAI Academy and a development/training partner who helps transform ideas into usable products.",
    builderLink: "รู้จักผู้พัฒนา",
    seoTitle: "เครื่องมือ PDF ฟรีที่ให้ความสำคัญกับ privacy",
    seoText: "DJTools ช่วยจัดการเอกสารทั่วไปโดยไม่ต้องติดตั้งโปรแกรมหรือสร้างบัญชี เหมาะกับนักเรียน ผู้สอน freelancer ธุรกิจขนาดเล็ก และทีมที่ไม่ต้องการส่งเอกสารให้ conversion server ภายนอก",
    faqTitle: "คำถามเกี่ยวกับ DJTools PDF",
    faq: [
      ["เครื่องมือ PDF นี้ฟรีจริงหรือไม่?", "ฟรีสำหรับ core tools ทั้งหมด ไม่ต้องสมัคร ไม่มี watermark และไม่มีค่าใช้จ่ายหลังดาวน์โหลด"],
      ["ไฟล์ PDF ถูก upload ไปที่ไหน?", "ไฟล์ไม่ถูก upload ไปยัง DJAI การอ่าน แก้ไข และสร้างผลลัพธ์เกิดขึ้นใน browser บนอุปกรณ์ของคุณ"],
      ["บีบอัด PDF แล้วคุณภาพจะลดลงหรือไม่?", "Light รักษาโครงสร้างเดิม ส่วน Recommended และ Strong จะ render หน้าใหม่เพื่อลดขนาด จึงอาจทำให้ข้อความค้นหาไม่ได้และ interactive form ถูก flatten"],
      ["ใช้บนโทรศัพท์ได้หรือไม่?", "ใช้ได้ใน browser รุ่นใหม่ แต่ PDF ขนาดใหญ่หรือหลายร้อยหน้าเหมาะกับคอมพิวเตอร์ที่มี memory มากกว่า"]
    ],
    footerPrivacy: "Privacy-first PDF tools",
    copyright: "DJTools by DJAI Academy"
  },
  en: {
    nav: { tools: "All tools", course: "Vibe Coding course", development: "Web development", blog: "Blog", language: "ไทย" },
    heroEyebrow: "DJTools by DJAI Academy",
    heroTitle: "Professional PDF tools, completely free",
    heroText: "Merge, split, compress, convert, rotate, watermark, and protect PDFs in your browser. Your files never leave your device.",
    heroButton: "Start using tools for free",
    trust: ["100% free", "No sign-up", "No watermark", "On-device processing"],
    allTools: "Eleven practical PDF tools",
    allToolsText: "Choose a task. Your files are processed locally in the browser and are never sent to a server.",
    open: "Open tool",
    workspace: "PDF workspace",
    uploadTitle: "Drop your files here",
    uploadPdf: "Select PDF",
    uploadImages: "Select images",
    uploadHint: "Up to 100 MB per file",
    files: "Selected files",
    settings: "Output settings",
    process: "Process files",
    processing: "Processing in your browser...",
    clear: "Start over",
    resultTitle: "Your file is ready",
    resultText: "Processing finished on this device. No file was sent to a server.",
    download: "Download file",
    original: "Original",
    result: "Result",
    items: "Items",
    continue: "Continue with another tool",
    privacyTitle: "Private by design",
    privacyText: "Your PDFs, images, and passwords exist only in your browser memory. DJAI and Siamese Cat Dev do not receive, store, or view them. The data disappears when you close or refresh this page.",
    devEyebrow: "From documents to business systems",
    devTitle: "Need a document portal or workflow for your company?",
    devText: "DJAI and Siamese Cat Dev build websites, web applications, document systems, CRM platforms, automation, and AI workflows around real business processes.",
    devButton: "Discuss web development",
    portfolioButton: "View our work",
    courseEyebrow: "Build your own tool",
    courseTitle: "Learn Vibe Coding and turn a workflow into a product",
    courseText: "Learn the path from idea and planning to building and launching websites, applications, and automation with AI.",
    courseButton: "Explore the course",
    builderEyebrow: "Built with intention by",
    builderTitle: "Siamese Cat Dev",
    builderText: "Created with intention by Siamese Cat Dev. Siamese Cat Dev is a product designer, project manager, and software development partner with nearly 10 years of experience building digital products for real businesses. He is also a student at DJAI Academy and a development/training partner who helps transform ideas into usable products.",
    builderLink: "Meet the builder",
    seoTitle: "Free PDF tools built around privacy",
    seoText: "DJTools handles everyday document tasks without installing software or creating an account. It is designed for students, educators, freelancers, small businesses, and teams that do not want to send documents to an external conversion server.",
    faqTitle: "Questions about DJTools PDF",
    faq: [
      ["Are these PDF tools really free?", "Yes. All core tools are free, with no account, watermark, or charge after processing."],
      ["Where are my PDF files uploaded?", "Nowhere. Reading, editing, and creating the result happens in your browser on your device."],
      ["Does PDF compression reduce quality?", "Light keeps the document structure. Recommended and Strong render new pages to reduce size, which can flatten forms and make text non-searchable."],
      ["Can I use the tools on a phone?", "Yes, in a modern browser. Very large PDFs or documents with hundreds of pages work better on a computer with more memory."]
    ],
    footerPrivacy: "Privacy-first PDF tools",
    copyright: "DJTools by DJAI Academy"
  },
  vi: {
    nav: { tools: "Tất cả công cụ", course: "Khóa Vibe Coding", development: "Phát triển website", blog: "Bài viết", language: "ไทย / EN" },
    heroEyebrow: "DJTools by DJAI Academy",
    heroTitle: "Bộ công cụ PDF chuyên nghiệp, hoàn toàn miễn phí",
    heroText: "Ghép, tách, nén, chuyển đổi, xoay, đóng watermark và bảo vệ PDF ngay trong trình duyệt. File không rời khỏi thiết bị.",
    heroButton: "Dùng công cụ miễn phí",
    trust: ["Miễn phí 100%", "Không cần đăng ký", "Không watermark", "Xử lý trên thiết bị"],
    allTools: "11 công cụ PDF thực dụng",
    allToolsText: "Chọn công việc cần làm. File được xử lý cục bộ trong trình duyệt và không gửi lên máy chủ.",
    open: "Mở công cụ", workspace: "Không gian xử lý PDF", uploadTitle: "Thả file vào đây", uploadPdf: "Chọn PDF", uploadImages: "Chọn ảnh", uploadHint: "Tối đa 100 MB mỗi file", files: "File đã chọn", settings: "Thiết lập đầu ra", process: "Xử lý file", processing: "Đang xử lý trong trình duyệt...", clear: "Làm lại", resultTitle: "File đã sẵn sàng", resultText: "Quá trình đã hoàn tất trên thiết bị này. Không file nào được gửi lên máy chủ.", download: "Tải file", original: "Ban đầu", result: "Kết quả", items: "Mục", continue: "Tiếp tục với công cụ khác",
    privacyTitle: "Riêng tư từ thiết kế",
    privacyText: "PDF, ảnh và mật khẩu chỉ tồn tại trong bộ nhớ trình duyệt. DJAI và Siamese Cat Dev không nhận, lưu hay xem file. Dữ liệu làm việc mất khi bạn đóng hoặc tải lại trang.",
    devEyebrow: "Từ tài liệu đến hệ thống doanh nghiệp", devTitle: "Cần portal tài liệu hoặc workflow cho công ty?", devText: "DJAI và Siamese Cat Dev xây website, ứng dụng web, hệ thống tài liệu, CRM, tự động hóa và AI workflow dựa trên quy trình kinh doanh thực tế.", devButton: "Trao đổi về phát triển", portfolioButton: "Xem dự án",
    courseEyebrow: "Tự xây công cụ", courseTitle: "Học Vibe Coding và biến workflow thành sản phẩm", courseText: "Học từ ý tưởng, lập kế hoạch đến xây và ra mắt website, ứng dụng cùng tự động hóa bằng AI.", courseButton: "Khám phá khóa học",
    builderEyebrow: "Được xây dựng bởi", builderTitle: "Siamese Cat Dev", builderText: "Siamese Cat Dev là đối tác thiết kế sản phẩm, quản lý dự án và phát triển phần mềm, đồng thời là học viên và đối tác đào tạo của DJAI Academy.", builderLink: "Tìm hiểu nhà phát triển",
    seoTitle: "Công cụ PDF miễn phí đặt quyền riêng tư lên trước", seoText: "DJTools xử lý các công việc PDF hằng ngày mà không cần cài phần mềm hoặc tạo tài khoản. Công cụ phù hợp khi bạn không muốn gửi tài liệu đến máy chủ chuyển đổi bên ngoài.",
    faqTitle: "Câu hỏi về DJTools PDF",
    faq: [["Các công cụ PDF có thực sự miễn phí?", "Có. Tất cả công cụ cốt lõi đều miễn phí, không cần tài khoản, không watermark và không thu phí sau khi xử lý."], ["File PDF được upload ở đâu?", "Không ở đâu cả. Việc đọc, chỉnh sửa và tạo kết quả diễn ra trong trình duyệt trên thiết bị."], ["Nén PDF có giảm chất lượng không?", "Mức Light giữ cấu trúc tài liệu. Recommended và Strong có thể render trang thành ảnh để giảm dung lượng, làm form phẳng và mất khả năng tìm kiếm văn bản."], ["Có dùng trên điện thoại được không?", "Có, trong trình duyệt hiện đại. PDF rất lớn hoặc có hàng trăm trang phù hợp hơn với máy tính có nhiều bộ nhớ."]],
    footerPrivacy: "Công cụ PDF ưu tiên quyền riêng tư", copyright: "DJTools by DJAI Academy"
  }
};

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

function Segmented<T extends string | number>({ values, value, onChange }: {
  values: Array<{ value: T; label: string }>;
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div className="segmented">
      {values.map((item) => (
        <button type="button" className={item.value === value ? "active" : ""} onClick={() => onChange(item.value)} key={item.value}>
          {item.label}
        </button>
      ))}
    </div>
  );
}

function CamPdfAppCallout({ language }: { language: Language }) {
  const en = language === "en";
  const vi = language === "vi";
  return (
    <section className="mobile-app-callout" aria-labelledby="cam-pdf-app-title">
      <div className="app-device-mark"><Smartphone /><ScanLine /></div>
      <div>
        <p className="eyebrow">{vi ? "ỨNG DỤNG DI ĐỘNG" : en ? "MOBILE APP" : "แอปมือถือ"}</p>
        <h2 id="cam-pdf-app-title">{vi ? "Cần dùng các công cụ này trên điện thoại?" : en ? "Need these tools on your phone?" : "อยากใช้เครื่องมือเหล่านี้บนมือถือ?"}</h2>
        <p>
          {vi ? "Cam PDF Scan, Signer & QR Generator kết hợp quét tài liệu, ký PDF, tạo QR và các quy trình năng suất trong một ứng dụng di động."
            : en
            ? "Cam PDF Scan, Signer & QR Generator brings document scanning, PDF signing, QR tools, and advanced productivity features into one mobile app."
            : "Cam PDF Scan, Signer & QR Generator รวมการสแกนเอกสาร เซ็น PDF เครื่องมือ QR และฟีเจอร์ productivity ขั้นสูงไว้ในแอปมือถือเดียว"}
        </p>
      </div>
      <a className="primary-button" href="https://www.djai.academy/Cam_PDF_Scan_Signer_QR-Gen/">
        {vi ? "Tải ứng dụng" : en ? "Download the app" : "ดาวน์โหลดแอป"}<ArrowRight />
      </a>
    </section>
  );
}

function ToolSettings({ tool, language, options, update }: {
  tool: ToolSlug;
  language: Language;
  options: ProcessingOptions;
  update: <K extends keyof ProcessingOptions>(key: K, value: ProcessingOptions[K]) => void;
}) {
  const en = language === "en";
  const vi = language === "vi";
  const t = (enText: string, thText: string, viText: string) => vi ? viText : en ? enText : thText;
  if (tool === "merge-pdf") return <p className="setting-note">{t("Use the arrow buttons to arrange PDFs before merging.", "ใช้ปุ่มลูกศรเพื่อจัดลำดับ PDF ก่อนรวมไฟล์", "Dùng các nút mũi tên để sắp xếp PDF trước khi ghép.")}</p>;
  if (tool === "split-pdf") return (
    <>
      <label>{t("Split method", "วิธีแยกไฟล์", "Cách tách tệp")}</label>
      <Segmented values={[
        { value: "extract", label: t("Extract pages", "ดึงหน้า", "Trích xuất trang") },
        { value: "ranges", label: t("Page groups", "แบ่งช่วง", "Nhóm trang") },
        { value: "every", label: t("Every N pages", "ทุก N หน้า", "Mỗi N trang") }
      ]} value={options.splitMode} onChange={(value) => update("splitMode", value)} />
      {options.splitMode === "every" ? (
        <label className="field-label">{t("Pages per file", "จำนวนหน้าต่อไฟล์", "Số trang mỗi tệp")}<input type="number" min="1" value={options.everyPages} onChange={(event) => update("everyPages", Number(event.target.value))} /></label>
      ) : (
        <label className="field-label">{options.splitMode === "ranges" ? t("Groups separated by semicolons", "แยกแต่ละกลุ่มด้วย ;", "Phân cách các nhóm bằng dấu chấm phẩy") : t("Pages to extract", "หน้าที่ต้องการดึง", "Các trang cần trích xuất")}
          <input value={options.pageRanges} onChange={(event) => update("pageRanges", event.target.value)} placeholder={options.splitMode === "ranges" ? "1-3; 4-6; 8" : "1-3, 5, 8"} />
        </label>
      )}
    </>
  );
  if (tool === "compress-pdf") return (
    <>
      <label>{t("Compression level", "ระดับการบีบอัด", "Mức nén")}</label>
      <Segmented values={[
        { value: "light", label: "Light" },
        { value: "recommended", label: t("Recommended", "แนะนำ", "Đề xuất") },
        { value: "strong", label: "Strong" }
      ]} value={options.compression} onChange={(value) => update("compression", value)} />
      <p className="setting-note warning">{options.compression === "light"
        ? t("Lossless structure optimization. Savings depend on the source PDF.", "ปรับโครงสร้างโดยไม่ลดคุณภาพ ขนาดที่ลดได้ขึ้นอยู่กับไฟล์ต้นฉบับ", "Tối ưu cấu trúc không làm giảm chất lượng; mức giảm tùy thuộc PDF gốc.")
        : t("Pages are flattened as images for smaller files. Links, forms, and searchable text may be lost.", "หน้า PDF จะถูก flatten เป็นรูปเพื่อลดขนาด link, form และข้อความที่ค้นหาได้อาจหายไป", "Các trang được làm phẳng thành ảnh để giảm dung lượng; liên kết, biểu mẫu và văn bản tìm kiếm được có thể bị mất.")}</p>
    </>
  );
  if (tool === "images-to-pdf") return (
    <div className="setting-grid">
      <label className="field-label">{t("Page size", "ขนาดกระดาษ", "Khổ trang")}<select value={options.imagePageSize} onChange={(event) => update("imagePageSize", event.target.value as ProcessingOptions["imagePageSize"])}><option value="auto">Auto</option><option value="a4">A4</option><option value="letter">Letter</option></select></label>
      <label className="field-label">{t("Orientation", "แนวกระดาษ", "Hướng trang")}<select value={options.imageOrientation} onChange={(event) => update("imageOrientation", event.target.value as ProcessingOptions["imageOrientation"])}><option value="auto">Auto</option><option value="portrait">{t("Portrait", "แนวตั้ง", "Dọc")}</option><option value="landscape">{t("Landscape", "แนวนอน", "Ngang")}</option></select></label>
    </div>
  );
  if (tool === "pdf-to-images") return (
    <div className="setting-grid">
      <div><label>{t("Image format", "รูปแบบไฟล์", "Định dạng ảnh")}</label><Segmented values={[{ value: "jpg", label: "JPG" }, { value: "png", label: "PNG" }]} value={options.imageFormat} onChange={(value) => update("imageFormat", value)} /></div>
      <label className="field-label">{t("Resolution", "ความละเอียด", "Độ phân giải")}<select value={options.imageScale} onChange={(event) => update("imageScale", Number(event.target.value))}><option value="1">Standard</option><option value="1.5">High</option><option value="2">Very high</option></select></label>
    </div>
  );
  if (tool === "rotate-pdf") return (
    <>
      <label>{t("Rotate clockwise", "หมุนตามเข็มนาฬิกา", "Xoay theo chiều kim đồng hồ")}</label>
      <Segmented values={[{ value: 90, label: "90°" }, { value: 180, label: "180°" }, { value: 270, label: "270°" }]} value={options.rotation} onChange={(value) => update("rotation", value)} />
      <label className="field-label">{t("Pages (leave blank for all)", "ระบุหน้า (เว้นว่างเพื่อหมุนทุกหน้า)", "Trang (để trống để chọn tất cả)")}<input value={options.selectedPages} onChange={(event) => update("selectedPages", event.target.value)} placeholder="1-3, 5" /></label>
    </>
  );
  if (tool === "organize-pdf") return (
    <>
      {options.organizeMode === "delete" ? (
        <label className="field-label">{t("Pages to delete", "หน้าที่ต้องการลบ", "Các trang cần xóa")}<input value={options.deletePages} onChange={(event) => update("deletePages", event.target.value)} placeholder="2, 4-6" /></label>
      ) : (
        <label className="field-label">{t("Final page order", "ลำดับหน้าสุดท้าย", "Thứ tự trang cuối cùng")}<input value={options.pageOrder} onChange={(event) => update("pageOrder", event.target.value)} placeholder="3, 1-2, 5" /></label>
      )}
      <p className="setting-note warning">{options.organizeMode === "delete" ? t("Selected pages are removed from a new copy. The original stays unchanged.", "หน้าที่ระบุจะถูกลบจากสำเนาใหม่ โดยไฟล์ต้นฉบับไม่เปลี่ยนแปลง", "Các trang đã chọn chỉ bị xóa khỏi bản sao mới; tệp gốc không thay đổi.") : t("Pages left out are removed. You can repeat a page if a duplicate is needed.", "หน้าที่ไม่ระบุจะถูกลบ และสามารถระบุหน้าเดิมซ้ำเพื่อทำสำเนาได้", "Các trang không được liệt kê sẽ bị xóa; bạn có thể lặp lại một trang nếu cần nhân bản.")}</p>
    </>
  );
  if (tool === "add-page-numbers") return (
    <div className="setting-grid">
      <label className="field-label">{t("Position", "ตำแหน่ง", "Vị trí")}<select value={options.pageNumberPosition} onChange={(event) => update("pageNumberPosition", event.target.value as ProcessingOptions["pageNumberPosition"])}><option value="bottom-left">{t("Bottom left", "ล่างซ้าย", "Dưới trái")}</option><option value="bottom-center">{t("Bottom center", "ล่างกลาง", "Dưới giữa")}</option><option value="bottom-right">{t("Bottom right", "ล่างขวา", "Dưới phải")}</option><option value="top-left">{t("Top left", "บนซ้าย", "Trên trái")}</option><option value="top-center">{t("Top center", "บนกลาง", "Trên giữa")}</option><option value="top-right">{t("Top right", "บนขวา", "Trên phải")}</option></select></label>
      <label className="field-label">{t("Start at", "เริ่มที่เลข", "Bắt đầu từ")}<input type="number" min="0" value={options.pageNumberStart} onChange={(event) => update("pageNumberStart", Number(event.target.value))} /></label>
    </div>
  );
  if (tool === "remove-pdf-metadata") return <p className="setting-note warning">{t("This clears title, author, subject, keywords, creator, producer, and document dates. Page content is not changed.", "ระบบจะลบ title, author, subject, keywords, creator, producer และวันที่ของเอกสาร โดยไม่เปลี่ยนเนื้อหาในหน้า", "Thao tác này xóa tiêu đề, tác giả, chủ đề, từ khóa, ứng dụng tạo tệp và ngày tài liệu; nội dung trang không thay đổi.")}</p>;
  if (tool === "watermark-pdf") return (
    <>
      <label>{t("Watermark type", "ประเภทลายน้ำ", "Loại watermark")}</label>
      <Segmented values={[{ value: "text", label: t("Text", "ข้อความ", "Văn bản") }, { value: "image", label: t("Image", "รูปภาพ", "Hình ảnh") }]} value={options.watermarkType} onChange={(value) => update("watermarkType", value)} />
      {options.watermarkType === "text" ? (
        <label className="field-label">{t("Watermark text", "ข้อความลายน้ำ", "Nội dung watermark")}<input value={options.watermarkText} onChange={(event) => update("watermarkText", event.target.value)} /></label>
      ) : (
        <label className="field-label">{t("PNG or JPG logo", "โลโก้ PNG หรือ JPG", "Logo PNG hoặc JPG")}<input type="file" accept="image/png,image/jpeg" onChange={(event) => update("watermarkImage", event.target.files?.[0] || null)} /></label>
      )}
      <div className="setting-grid">
        <label className="field-label">{t("Position", "ตำแหน่ง", "Vị trí")}<select value={options.watermarkPosition} onChange={(event) => update("watermarkPosition", event.target.value as ProcessingOptions["watermarkPosition"])}><option value="center">{t("Center", "กลาง", "Giữa")}</option><option value="top-left">{t("Top left", "ซ้ายบน", "Trên trái")}</option><option value="top-right">{t("Top right", "ขวาบน", "Trên phải")}</option><option value="bottom-left">{t("Bottom left", "ซ้ายล่าง", "Dưới trái")}</option><option value="bottom-right">{t("Bottom right", "ขวาล่าง", "Dưới phải")}</option></select></label>
        <label className="range-label">{t("Opacity", "ความโปร่งใส", "Độ mờ")} <strong>{options.watermarkOpacity}%</strong><input type="range" min="5" max="100" value={options.watermarkOpacity} onChange={(event) => update("watermarkOpacity", Number(event.target.value))} /></label>
        <label className="range-label">{t("Width", "ความกว้าง", "Chiều rộng")} <strong>{options.watermarkSize}%</strong><input type="range" min="10" max="85" value={options.watermarkSize} onChange={(event) => update("watermarkSize", Number(event.target.value))} /></label>
        <label className="field-label">{t("Pages (blank for all)", "ระบุหน้า (ว่าง = ทุกหน้า)", "Trang (để trống để chọn tất cả)")}<input value={options.selectedPages} onChange={(event) => update("selectedPages", event.target.value)} placeholder="1-3, 5" /></label>
      </div>
    </>
  );
  return (
    <>
      <label className="field-label">{t("Password", "รหัสผ่าน", "Mật khẩu")}<input type="password" autoComplete="new-password" value={options.password} onChange={(event) => update("password", event.target.value)} minLength={8} /></label>
      <p className="setting-note"><LockKeyhole size={15} /> AES-256 · {t("Keep this password safe. DJAI cannot recover it.", "เก็บรหัสผ่านให้ปลอดภัย DJAI ไม่สามารถกู้คืนได้", "Hãy lưu mật khẩu an toàn. DJAI không thể khôi phục mật khẩu này.")}</p>
      <div className="permission-grid">
        {([
          ["allowPrint", t("Allow printing", "อนุญาตให้พิมพ์", "Cho phép in")],
          ["allowCopy", t("Allow copying", "อนุญาตให้ copy", "Cho phép sao chép")],
          ["allowModify", t("Allow editing", "อนุญาตให้แก้ไข", "Cho phép chỉnh sửa")],
          ["allowForms", t("Allow form filling", "อนุญาตให้กรอก form", "Cho phép điền biểu mẫu")]
        ] as Array<[keyof ProcessingOptions, string]>).map(([key, label]) => (
          <label className="check-label" key={key}><input type="checkbox" checked={Boolean(options[key])} onChange={(event) => update(key, event.target.checked as never)} /> <span><Check size={14} /></span>{label}</label>
        ))}
      </div>
    </>
  );
}

export default function PdfToolsApp({ language, initialTool, seoPage, initialOptions, acceptedTypes, acceptOverride, fileTypeLabel }: { language: Language; initialTool?: ToolSlug; seoPage?: PdfSeoPage; initialOptions?: Partial<ProcessingOptions>; acceptedTypes?: string[]; acceptOverride?: string; fileTypeLabel?: string }) {
  const copy = ui[language];
  const en = language === "en";
  const vi = language === "vi";
  const localePath = (th: string, enPath: string, viPath: string) => vi ? viPath : en ? enPath : th;
  const devHref = localePath("https://www.djai.academy/siamese_cat/dev/", "https://www.djai.academy/siamese_cat/dev/en/", "https://www.djai.academy/siamese_cat/dev/");
  const activeTool = initialTool || "merge-pdf";
  const activeCopy = seoPage || toolCopy[language][activeTool];
  const activeGuide = seoPage?.guide || toolGuides[language][activeTool];
  const ActiveIcon = icons[activeTool];
  const [files, setFiles] = useState<File[]>([]);
  const configuredDefaults = useMemo(() => ({ ...defaultOptions, ...initialOptions }), [initialOptions]);
  const [options, setOptions] = useState(configuredDefaults);
  const [dragging, setDragging] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<(ProcessResult & { url: string; originalSize: number }) | null>(null);
  const [promoType, setPromoType] = useState<"course" | "development" | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  const isImageInput = activeTool === "images-to-pdf";
  const allowsMultiple = activeTool === "merge-pdf" || activeTool === "images-to-pdf";
  const accept = acceptOverride || (isImageInput ? "image/jpeg,image/png,image/webp" : "application/pdf,.pdf");
  const related = useMemo(() => relatedToolOrder[activeTool], [activeTool]);

  useEffect(() => () => {
    if (result?.url) URL.revokeObjectURL(result.url);
  }, [result]);

  function updateOption<K extends keyof ProcessingOptions>(key: K, value: ProcessingOptions[K]) {
    setOptions((current) => ({ ...current, [key]: value }));
  }

  function addFiles(incoming: FileList | File[]) {
    const selected = Array.from(incoming).filter((file) => acceptedTypes?.length ? acceptedTypes.includes(file.type) : isImageInput ? file.type.startsWith("image/") : (file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")));
    setError("");
    setResult(null);
    setFiles((current) => allowsMultiple ? [...current, ...selected] : selected.slice(0, 1));
  }

  function moveFile(index: number, offset: number) {
    setFiles((current) => {
      const next = [...current];
      const target = index + offset;
      if (target < 0 || target >= next.length) return current;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  function clearWorkspace() {
    if (result?.url) URL.revokeObjectURL(result.url);
    setFiles([]);
    setResult(null);
    setError("");
    setOptions(configuredDefaults);
    if (fileInput.current) fileInput.current.value = "";
  }

  async function run() {
    setError("");
    if (activeTool === "protect-pdf" && options.password.length < 8) {
      setError(vi ? "Mật khẩu phải có ít nhất 8 ký tự." : en ? "Use a password with at least 8 characters." : "กรุณาใช้รหัสผ่านอย่างน้อย 8 ตัวอักษร");
      return;
    }
    setProcessing(true);
    try {
      const { processFiles } = await import("./pdf-actions");
      const processed = await processFiles(activeTool, files, options);
      if (result?.url) URL.revokeObjectURL(result.url);
      setResult({ ...processed, url: URL.createObjectURL(processed.blob), originalSize: files.reduce((sum, file) => sum + file.size, 0) });
      setPromoType(shouldShowToolPromo());
      window.setTimeout(() => document.getElementById("pdf-result")?.scrollIntoView({ behavior: "smooth", block: "center" }), 50);
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : "Unable to process this file.";
      setError(message);
    } finally {
      setProcessing(false);
    }
  }

  const publicSlug = seoPage?.slug || initialTool;
  const localeSuffix = language === "th" ? "" : `${language}/`;
  const canonical = publicSlug ? `${SITE_URL}/${publicSlug}/${localeSuffix}` : `${SITE_URL}/${localeSuffix}`;
  const thaiHref = initialTool ? toolHref(initialTool, "th") : homeHref("th");
  const englishHref = initialTool ? toolHref(initialTool, "en") : homeHref("en");
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: initialTool ? activeCopy.title : "DJTools by DJAI Academy - Free PDF Tool Set",
      url: canonical,
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Web browser",
      description: initialTool ? activeCopy.description : copy.heroText,
      featureList: toolSlugs.map((slug) => toolCopy[language][slug].label),
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      publisher: { "@type": "Organization", name: "DJAI Academy", url: localePath("https://www.djai.academy/", "https://www.djai.academy/en/", "https://www.djai.academy/vi/") }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: copy.faq.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } }))
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "DJAI Academy", item: localePath("https://www.djai.academy/", "https://www.djai.academy/en/", "https://www.djai.academy/vi/") },
        { "@type": "ListItem", position: 2, name: vi ? "Công cụ miễn phí" : en ? "Free Tools" : "เครื่องมือฟรี", item: localePath("https://www.djai.academy/tools/", "https://www.djai.academy/tools/en/", "https://www.djai.academy/tools/vi/") },
        { "@type": "ListItem", position: 3, name: initialTool ? activeCopy.title : "DJTools PDF", item: canonical }
      ]
    },
    ...(initialTool ? [{
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: activeGuide.title,
      description: activeGuide.intro,
      totalTime: "PT2M",
      step: activeGuide.steps.map((text, index) => ({ "@type": "HowToStep", position: index + 1, name: text, text }))
    }] : [])
  ];

  return (
    <main id="top">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <header className="site-header">
        <a className="brand" href={homeHref(language)}>
          <Image src={`${BASE_PATH}/djai-academy-logo-display.webp`} alt="DJAI Academy" width={114} height={61} loading="eager" unoptimized />
          <span><strong>DJTools</strong><small>PDF · by DJAI Academy</small></span>
        </a>
        <button className="menu-button" type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X /> : <Menu />}</button>
        <nav className={menuOpen ? "open" : ""} aria-label="Main navigation">
          <a className="active" href={homeHref(language)}>PDF</a>
          <a href={localePath("/tools/resizeimg/", "/tools/resizeimg/en/", "/tools/resizeimg/vi/")}>{vi ? "Hình ảnh" : en ? "Image" : "รูปภาพ"}</a>
          <a href={localePath("/tools/document/", "/tools/document/en/", "/tools/document/vi/")}>{vi ? "Tài liệu" : en ? "Document" : "เอกสาร"}</a>
          <a href={localePath("/tools/ai/", "/tools/ai/en/", "/tools/ai/vi/")}>AI</a>
          <a href={localePath("/tools/spreadsheet/", "/tools/spreadsheet/en/", "/tools/spreadsheet/vi/")}>{vi ? "Bảng tính" : en ? "Spreadsheet" : "ตารางข้อมูล"}</a>
          <a href={localePath("/tools/", "/tools/en/", "/tools/vi/")}>{copy.nav.tools}</a>
          {vi ? <><a className="language-link" href={thaiHref} hrefLang="th">ไทย</a><a className="language-link" href={englishHref} hrefLang="en">EN</a></> : <a className="language-link" href={en ? thaiHref : englishHref} hrefLang={en ? "th" : "en"}>{copy.nav.language}</a>}
        </nav>
      </header>

      <section className={`hero ${initialTool ? "tool-hero" : ""}`}>
        <div className="hero-content">
          {initialTool && <a className="back-link" href={homeHref(language)}><ArrowLeft size={17} /> {copy.nav.tools}</a>}
          <p className="eyebrow">{initialTool ? activeCopy.label : copy.heroEyebrow}</p>
          <h1>{initialTool ? activeCopy.title : copy.heroTitle}</h1>
          <p>{initialTool ? activeCopy.description : copy.heroText}</p>
          <ShareButtons url={canonical} title={initialTool ? activeCopy.title : copy.heroTitle} language={language} compact />
          <a className="primary-button" href="#workspace">{copy.heroButton}<ArrowDown size={19} /></a>
        </div>
        <div className="hero-visual" aria-label="DJTools PDF workflow">
          <div className="logo-stage"><Image src={`${BASE_PATH}/djai-academy-logo-display.webp`} alt="DJAI Academy logo" width={192} height={103} loading="eager" unoptimized /><strong>DJTools</strong><span>Free PDF Tool Set</span></div>
          <div className="file-sheet sheet-back"><span>PDF</span></div>
          <div className="file-sheet sheet-front"><FileArchive size={48} /><strong>{initialTool ? activeCopy.label : "PDF"}</strong><small>PRIVATE · FREE</small></div>
        </div>
      </section>

      <section className="trust-bar" aria-label="Product promises">
        {copy.trust.map((item, index) => <div key={item}>{index === 3 ? <ShieldCheck /> : <Check />}<span>{item}</span></div>)}
      </section>

      <AdSenseAd label="PDF tools advertisement" />

      {!initialTool && (
        <section className="tools-section" id="tools">
          <div className="section-heading"><p className="eyebrow">PDF TOOLKIT</p><h2>{copy.allTools}</h2><p>{copy.allToolsText}</p></div>
          <div className="tools-grid">
            {toolSlugs.map((slug, index) => {
              const Icon = icons[slug];
              const item = toolCopy[language][slug];
              return <a className={`tool-card accent-${index % 4}`} href={toolHref(slug, language)} key={slug}><span className="tool-icon"><Icon /></span><div><small>{String(index + 1).padStart(2, "0")}</small><h3>{item.label}</h3><p>{item.short}</p></div><strong>{copy.open}<ArrowRight size={16} /></strong></a>;
            })}
          </div>
          {!vi && <div className="popular-task-links" aria-label={en ? "Popular PDF tasks" : "งาน PDF ยอดนิยม"}>
            {Object.values(pdfSeoAliases).map((alias) => <a href={`${BASE_PATH}/${alias.slug}/${en ? "en/" : ""}`} key={alias.slug}>{alias.copy[language].label}<ArrowRight size={15} /></a>)}
          </div>}
        </section>
      )}

      <section className="workspace-section" id="workspace">
        <div className="workspace-heading"><span className="tool-icon"><ActiveIcon /></span><div><p className="eyebrow">{copy.workspace}</p><h2>{activeCopy.title}</h2><p>{activeCopy.short}</p></div></div>
        <div className="workspace-card">
          <div className="upload-column">
            <button
              type="button"
              className={`drop-zone ${dragging ? "dragging" : ""}`}
              onClick={() => fileInput.current?.click()}
              onDragEnter={(event) => { event.preventDefault(); setDragging(true); }}
              onDragOver={(event) => event.preventDefault()}
              onDragLeave={() => setDragging(false)}
              onDrop={(event) => { event.preventDefault(); setDragging(false); addFiles(event.dataTransfer.files); }}
            >
              <span><Upload /></span><strong>{copy.uploadTitle}</strong><small>{fileTypeLabel || (isImageInput ? "JPG · PNG · WebP" : "PDF")} · {copy.uploadHint}</small><b>{isImageInput ? copy.uploadImages : copy.uploadPdf}</b>
            </button>
            <input ref={fileInput} className="visually-hidden" type="file" accept={accept} multiple={allowsMultiple} aria-label={vi ? "Chọn file cần xử lý" : en ? "Choose files to process" : "เลือกไฟล์ที่ต้องการประมวลผล"} onChange={(event) => event.target.files && addFiles(event.target.files)} />
            {files.length > 0 && <div className="file-list"><div className="file-list-title"><strong>{copy.files}</strong><span>{files.length}</span></div>{files.map((file, index) => <div className="file-row" key={`${file.name}-${file.lastModified}-${index}`}><span className="file-type">{isImageInput ? <FileImage /> : <FileArchive />}</span><div><strong>{file.name}</strong><small>{formatBytes(file.size)}</small></div>{allowsMultiple && <div className="file-order"><button type="button" aria-label="Move up" title="Move up" onClick={() => moveFile(index, -1)} disabled={index === 0}><ArrowUp /></button><button type="button" aria-label="Move down" title="Move down" onClick={() => moveFile(index, 1)} disabled={index === files.length - 1}><ArrowDown /></button></div>}<button className="remove-file" type="button" aria-label="Remove file" title="Remove file" onClick={() => setFiles((current) => current.filter((_, itemIndex) => itemIndex !== index))}><Trash2 /></button></div>)}</div>}
          </div>
          <div className="settings-column">
            <div className="settings-title"><span>{copy.settings}</span><ShieldCheck size={18} /></div>
            <ToolSettings tool={activeTool} language={language} options={options} update={updateOption} />
            {error && <p className="error-message" role="alert">{error}</p>}
            <button className="process-button" type="button" onClick={run} disabled={processing || !files.length}>{processing ? <LoaderCircle className="spin" /> : <WandSparkles />}<span>{processing ? copy.processing : copy.process}</span><ArrowRight /></button>
            <button className="clear-button" type="button" onClick={clearWorkspace}>{copy.clear}</button>
          </div>
        </div>
      </section>

      <CamPdfAppCallout language={language} />

      <AdSenseAd label="PDF tools advertisement" variant="display2" />

      {result && (
        <section className="result-section" id="pdf-result" aria-live="polite">
          <div className="success-mark"><Check /></div><p className="eyebrow">SUCCESS</p><h2>{copy.resultTitle}</h2><p>{copy.resultText}</p>
          <div className="result-stats"><div><span>{copy.original}</span><strong>{formatBytes(result.originalSize)}</strong></div><div><span>{copy.result}</span><strong>{formatBytes(result.blob.size)}</strong></div><div><span>{copy.items}</span><strong>{result.itemCount}</strong></div>{result.note && <div><span>MODE</span><strong>{result.note}</strong></div>}</div>
          <a className="download-button" href={result.url} download={result.fileName}><Download />{copy.download}</a>
          <ShareButtons url={canonical} title={initialTool ? activeCopy.title : copy.heroTitle} language={language} compact />
          <button className="clear-button light" type="button" onClick={clearWorkspace}>{copy.clear}</button>
          <div className="continue-tools"><h3>{copy.continue}</h3><div>{related.map((slug) => { const Icon = icons[slug]; return <a href={toolHref(slug, language)} key={slug}><Icon /><span>{toolCopy[language][slug].label}</span><ArrowRight /></a>; })}</div></div>
        </section>
      )}

      {initialTool && <section className="tool-guide"><div><p className="eyebrow">HOW TO</p><h2>{activeGuide.title}</h2><p>{activeGuide.intro}</p></div><ol>{activeGuide.steps.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, "0")}</span><p>{step}</p></li>)}</ol></section>}

      <AdSenseAd label="Related content advertisement" variant="multiplex" />

      <section className="privacy-band"><ShieldCheck /><div><h2>{copy.privacyTitle}</h2><p>{linkedBuilderName(copy.privacyText, devHref)}</p></div></section>

      <section className="conversion-band development-band"><div><p className="eyebrow">{copy.devEyebrow}</p><h2>{copy.devTitle}</h2><p>{linkedBuilderName(copy.devText, devHref)}</p><div className="button-row"><a className="primary-button" href={localePath("/development/", "/development/en/", "/development/vi/")}>{copy.devButton}<ArrowRight /></a><a className="secondary-button" href={localePath("/portfolio/", "/portfolio/en/", "/portfolio/vi/")}>{copy.portfolioButton}</a></div></div><div className="system-visual"><span><Files /></span><ArrowRight /><span><WandSparkles /></span><ArrowRight /><span><ShieldCheck /></span></div></section>

      <section className="conversion-band course-band"><div className="course-symbol"><GraduationCap /></div><div><p className="eyebrow">{copy.courseEyebrow}</p><h2>{copy.courseTitle}</h2><p>{copy.courseText}</p><a className="secondary-button" href={localePath("/course/detail/", "/course/detail/en/", "/course/detail/vi/")}>{copy.courseButton}<BookOpen /></a></div></section>

      <section className="builder-section" id="builder"><a className="builder-logo" href={devHref}><Image src={`${BASE_PATH}/siamese-cat-dev-logo.webp`} alt="Siamese Cat Dev logo" width={640} height={540} loading="lazy" unoptimized /></a><div><p className="eyebrow">{copy.builderEyebrow}</p><h2>{linkedBuilderName(copy.builderTitle, devHref)}</h2><p>{linkedBuilderName(copy.builderText, devHref)}</p><a className="text-link" href={devHref}>{copy.builderLink}<ArrowRight /></a></div></section>

      <section className="seo-section"><div><p className="eyebrow">FREE PDF TOOLS</p><h2>{copy.seoTitle}</h2><p>{copy.seoText}</p></div><div className="faq-list"><h2>{copy.faqTitle}</h2>{copy.faq.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></section>

      <nav className="tool-ecosystem-directory" aria-labelledby={`tool-ecosystem-${language}`} data-tool-discovery>
        <div><p className="eyebrow">{vi ? "KHÁM PHÁ CÔNG CỤ DJAI" : en ? "EXPLORE DJAI TOOLS" : "สำรวจเครื่องมือ DJAI"}</p><h2 id={`tool-ecosystem-${language}`}>{vi ? "Tiếp tục với một quy trình miễn phí khác" : en ? "Continue with another free workflow" : "ทำงานต่อด้วยเครื่องมือฟรีหมวดอื่น"}</h2></div>
        <div>{toolCategories[language].map(([label, href, description]) => <a href={href} key={href}><strong>{label}</strong><span>{description}</span><ArrowRight /></a>)}</div>
      </nav>
      <footer><div className="footer-brand"><a className="brand" href={homeHref(language)}><Image src={`${BASE_PATH}/djai-academy-logo-display.webp`} alt="DJAI Academy" width={114} height={61} loading="lazy" unoptimized /><span><strong>DJTools</strong><small>PDF · by DJAI Academy</small></span></a><p>{copy.footerPrivacy}</p></div><div className="footer-links"><div><strong>DJAI</strong><a href={localePath("/", "/en/", "/vi/")}>DJAI Academy</a><a href={localePath("/course/", "/course/en/", "/course/vi/")}>{copy.nav.course}</a><a href={localePath("/blog/", "/blog/en/", "/blog/vi/")}>{copy.nav.blog}</a></div><div><strong>BUILD</strong><a href={localePath("/development/", "/development/en/", "/development/vi/")}>{copy.nav.development}</a><a href={localePath("/portfolio/", "/portfolio/en/", "/portfolio/vi/")}>{copy.portfolioButton}</a><a href={devHref}>Siamese Cat Dev</a></div><div><strong>TOOLS</strong>{related.slice(0, 4).map((slug) => <a href={toolHref(slug, language)} key={slug}>{toolCopy[language][slug].label}</a>)}</div></div><p className="copyright">© 2026 {copy.copyright}</p></footer>
      <ToolPromoModal language={language} type={promoType} onClose={() => setPromoType(null)} />
    </main>
  );
}

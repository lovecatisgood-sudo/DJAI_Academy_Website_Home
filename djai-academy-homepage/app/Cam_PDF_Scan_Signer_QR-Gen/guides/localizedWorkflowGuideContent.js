const HERO_IMAGES = {
  multiPage: "/apps/cam-pdf/guides/multi-page-scan-hero.png",
  pdfQr: "/apps/cam-pdf/guides/pdf-qr-code-hero.png",
  scanSign: "/apps/cam-pdf/guides/scan-sign-send-hero.png"
};

const EDITOR_IMAGE = "/apps/cam-pdf/editor.png";
const QR_IMAGE = "/apps/cam-pdf/qr.png";
const EXPORT_IMAGE = "/apps/cam-pdf/export.png";

const localeBase = {
  th: {
    breadcrumbGuide: "คู่มือ",
    breadcrumbLabel: "เส้นทางนำทาง",
    published: "เผยแพร่ 9 กันยายน 2026",
    readTime: "อ่านประมาณ 8 นาที",
    tocLabel: "เนื้อหาในหน้านี้",
    faqNumber: "05",
    relatedLabel: "อ่านต่อ",
    relatedTitle: "ทำงานเอกสารบนมือถือให้จบในขั้นตอนถัดไป",
    watermarkLink: "อ่านคู่มือลบลายน้ำอย่างปลอดภัย",
    ctaBase: {
      label: "ขั้นตอนถัดไป",
      tocLabel: "ดาวน์โหลด Cam PDF",
      play: "ดาวน์โหลด Cam PDF จาก Google Play",
      explore: "ดูความสามารถของ Cam PDF",
      access: "Cam PDF ไม่เพิ่มลายน้ำของแอปในไฟล์ส่งออก แต่ต้องมีบัญชี มีโฆษณา และมีโควต้าการส่งออกรายสัปดาห์ จึงไม่ควรสัญญาว่าใช้งานได้ไม่จำกัด",
      platform: "ลิงก์ที่ยืนยันแล้วด้านบนเป็นเวอร์ชัน Android ส่วนลิงก์ App Store จะเพิ่มเมื่อรายการ iPhone เปิดเผยต่อสาธารณะ",
      imageCaption: "หน้าจอจริงของ Cam PDF ในขั้นตอนเอกสาร"
    },
    footer: { label: "อ่านต่อ", title: "สร้างขั้นตอนจัดการเอกสารที่สะอาดและตรวจสอบได้", hub: "ดูคู่มือ Cam PDF", product: "ดู Cam PDF", privacy: "อ่านนโยบายความเป็นส่วนตัว", contact: "ติดต่อฝ่ายสนับสนุน Cam PDF" }
  },
  vi: {
    breadcrumbGuide: "Hướng dẫn",
    breadcrumbLabel: "Đường dẫn",
    published: "Đăng ngày 9 tháng 9 năm 2026",
    readTime: "Đọc khoảng 8 phút",
    tocLabel: "Trong bài này",
    faqNumber: "05",
    relatedLabel: "Đọc tiếp",
    relatedTitle: "Hoàn tất quy trình tài liệu trên điện thoại",
    watermarkLink: "Đọc hướng dẫn xử lý watermark an toàn",
    ctaBase: {
      label: "Bước tiếp theo",
      tocLabel: "Tải Cam PDF",
      play: "Tải Cam PDF trên Google Play",
      explore: "Xem tính năng Cam PDF",
      access: "Cam PDF không chèn watermark của ứng dụng vào tệp xuất, nhưng cần tài khoản, có quảng cáo và giới hạn xuất theo tuần. Vì vậy không nên hứa hẹn sử dụng không giới hạn.",
      platform: "Liên kết đã xác minh ở trên là bản Android. Liên kết App Store sẽ được thêm khi trang iPhone được công khai.",
      imageCaption: "Màn hình Cam PDF trong quy trình tài liệu"
    },
    footer: { label: "Đọc tiếp", title: "Xây dựng quy trình tài liệu di động dễ kiểm tra", hub: "Xem hướng dẫn Cam PDF", product: "Xem Cam PDF", privacy: "Đọc chính sách quyền riêng tư", contact: "Liên hệ hỗ trợ Cam PDF" }
  },
  "zh-CN": {
    breadcrumbGuide: "指南",
    breadcrumbLabel: "面包屑导航",
    published: "发布于 2026 年 9 月 9 日",
    readTime: "阅读约 8 分钟",
    tocLabel: "本文内容",
    faqNumber: "05",
    relatedLabel: "继续阅读",
    relatedTitle: "把下一步文档工作也完成",
    watermarkLink: "阅读安全处理水印的指南",
    ctaBase: {
      label: "下一步",
      tocLabel: "获取 Cam PDF",
      play: "从 Google Play 下载 Cam PDF",
      explore: "查看 Cam PDF 功能",
      access: "Cam PDF 导出文件不会添加 Cam PDF 水印，但需要账户，包含广告，并有每周导出额度。因此不要把它宣传为无限使用。",
      platform: "上面的已验证链接是 Android 版本。iPhone 的 App Store 页面公开后再添加对应链接。",
      imageCaption: "Cam PDF 文档流程中的实际界面"
    },
    footer: { label: "继续阅读", title: "建立清晰、可检查的移动文档流程", hub: "浏览 Cam PDF 指南", product: "了解 Cam PDF", privacy: "阅读隐私政策", contact: "联系 Cam PDF 支持" }
  },
  "zh-TW": {
    breadcrumbGuide: "指南",
    breadcrumbLabel: "麵包屑導覽",
    published: "發布於 2026 年 9 月 9 日",
    readTime: "閱讀約 8 分鐘",
    tocLabel: "本文內容",
    faqNumber: "05",
    relatedLabel: "繼續閱讀",
    relatedTitle: "把下一個文件工作也完成",
    watermarkLink: "閱讀安全處理浮水印的指南",
    ctaBase: {
      label: "下一步",
      tocLabel: "取得 Cam PDF",
      play: "從 Google Play 下載 Cam PDF",
      explore: "查看 Cam PDF 功能",
      access: "Cam PDF 匯出的檔案不會加入 Cam PDF 浮水印，但需要帳戶，包含廣告，並有每週匯出額度。因此不要把它宣傳為無限使用。",
      platform: "上面的已驗證連結是 Android 版本。iPhone 的 App Store 頁面公開後再加入對應連結。",
      imageCaption: "Cam PDF 文件流程中的實際介面"
    },
    footer: { label: "繼續閱讀", title: "建立清楚、可檢查的行動文件流程", hub: "瀏覽 Cam PDF 指南", product: "了解 Cam PDF", privacy: "閱讀隱私權政策", contact: "聯絡 Cam PDF 支援" }
  }
};

const relatedLabels = {
  th: {
    multiPage: [{ key: "pdfQr", label: "แชร์ PDF ด้วย QR Code" }, { key: "scanSign", label: "สแกน เซ็น และส่ง PDF" }],
    pdfQr: [{ key: "multiPage", label: "สแกนหลายหน้าเป็น PDF เดียว" }, { key: "scanSign", label: "สแกน เซ็น และส่ง PDF" }],
    scanSign: [{ key: "multiPage", label: "สแกนหลายหน้าเป็น PDF เดียว" }, { key: "pdfQr", label: "แชร์ PDF ด้วย QR Code" }]
  },
  vi: {
    multiPage: [{ key: "pdfQr", label: "Chia sẻ PDF bằng mã QR" }, { key: "scanSign", label: "Scan, ký và gửi PDF" }],
    pdfQr: [{ key: "multiPage", label: "Scan nhiều trang thành một PDF" }, { key: "scanSign", label: "Scan, ký và gửi PDF" }],
    scanSign: [{ key: "multiPage", label: "Scan nhiều trang thành một PDF" }, { key: "pdfQr", label: "Chia sẻ PDF bằng mã QR" }]
  },
  "zh-CN": {
    multiPage: [{ key: "pdfQr", label: "用二维码分享 PDF" }, { key: "scanSign", label: "扫描、签名并发送 PDF" }],
    pdfQr: [{ key: "multiPage", label: "把多页扫描成一个 PDF" }, { key: "scanSign", label: "扫描、签名并发送 PDF" }],
    scanSign: [{ key: "multiPage", label: "把多页扫描成一个 PDF" }, { key: "pdfQr", label: "用二维码分享 PDF" }]
  },
  "zh-TW": {
    multiPage: [{ key: "pdfQr", label: "用 QR Code 分享 PDF" }, { key: "scanSign", label: "掃描、簽名並傳送 PDF" }],
    pdfQr: [{ key: "multiPage", label: "把多頁掃描成一份 PDF" }, { key: "scanSign", label: "掃描、簽名並傳送 PDF" }],
    scanSign: [{ key: "multiPage", label: "把多頁掃描成一份 PDF" }, { key: "pdfQr", label: "用 QR Code 分享 PDF" }]
  }
};

function makeContent(locale, key, content) {
  return {
    ...localeBase[locale],
    ...content,
    heroImage: HERO_IMAGES[key],
    related: relatedLabels[locale][key],
    cta: { ...localeBase[locale].ctaBase, ...content.cta },
    footer: localeBase[locale].footer
  };
}

export const localizedWorkflowGuideContent = {
  th: {
    multiPage: makeContent("th", "multiPage", {
      metaTitle: "วิธีสแกนหลายหน้าเป็น PDF เดียวบน Android | Cam PDF",
      metaDescription: "เรียนรู้วิธีสแกนเอกสารหลายหน้าเป็น PDF เดียวบน Android ตรวจลำดับหน้า แก้ขอบกระดาษ บีบอัดไฟล์ และแชร์ด้วย Cam PDF",
      ogDescription: "ขั้นตอนสแกนเอกสารหลายหน้า ตรวจไฟล์ และส่งออก PDF เดียวจากโทรศัพท์",
      title: "วิธีสแกนหลายหน้าเป็น PDF เดียวบน Android",
      breadcrumbCurrent: "สแกนหลายหน้าเป็น PDF",
      eyebrow: "คู่มือ CAM PDF · PDF หลายหน้า",
      dek: "เอกสารหลายแผ่นควรกลายเป็นไฟล์เดียว ไม่ใช่ไฟล์แยกหน้า วิธีนี้ช่วยถ่ายเอกสารทั้งชุด ตรวจความผิดพลาด และส่งออก PDF ที่อ่านได้",
      heroAlt: "โทรศัพท์กำลังถ่ายเอกสารหลายหน้าและรวมเป็น PDF เดียว",
      heroCaption: "ถ่ายเอกสารเป็นชุดเดียว แล้วตรวจไฟล์ก่อนแชร์",
      toc: [{ id: "prepare", label: "เตรียมเอกสาร" }, { id: "capture", label: "ถ่ายทุกหน้า" }, { id: "check", label: "ตรวจ PDF" }, { id: "export", label: "ส่งออกและแชร์" }, { id: "questions", label: "คำถาม" }],
      answer: { label: "คำตอบสั้น ๆ", title: "เริ่มการสแกนครั้งเดียว เพิ่มหน้า แล้วบันทึกพร้อมกัน", steps: ["เปิด Cam PDF และเลือกการสแกนเอกสาร", "ถ่ายหน้าแรก แล้วใช้คำสั่งเพิ่มหน้าในเอกสารเดิม", "ตรวจภาพย่อ ลำดับหน้า ขอบกระดาษ และความชัด", "บันทึกเป็น PDF เดียว แล้วบีบอัดหรือแชร์เมื่อจำเป็น"], note: "จุดสำคัญคือบันทึกเมื่อทำครบทั้งชุด อย่าส่งออกทีละหน้า ถ้าผู้รับต้องการเอกสารเป็นไฟล์เดียว" },
      sections: [
        { id: "prepare", number: "01", title: "เตรียมเอกสารก่อนเปิดกล้อง", paragraphs: ["เรียงกระดาษให้ถูกลำดับ นำคลิปหรือมุมพับออก และเลือกพื้นหลังที่ทำให้เห็นขอบกระดาษชัด แสงสม่ำเสมอสำคัญกว่าฟิลเตอร์ เพราะเงาบนตัวเลขหรือลายเซ็นแก้ภายหลังได้ยาก"], cards: [{ label: "ลำดับ", title: "วางหน้าแรกไว้ด้านบน", body: "ให้หน้าถัดไปอยู่ใกล้มือเพื่อถ่ายต่อโดยไม่สลับชุด" }, { label: "แสง", title: "ลดเงาแข็ง", body: "ขยับไฟหรือกระดาษก่อนพึ่งการปรับภาพอัตโนมัติ" }, { label: "กรอบ", title: "เก็บมุมทั้งสี่", body: "ระบบจะตรวจขอบได้ดีเมื่อมีพื้นที่รอบกระดาษ" }], image: { src: EDITOR_IMAGE, alt: "หน้าจอแก้ขอบกระดาษของ Cam PDF", caption: "ตรวจขอบกระดาษแทนการยอมรับการครอบตัดครั้งแรกทันที" } },
        { id: "capture", number: "02", title: "ถ่ายทุกหน้าไว้ในเอกสารเดียว", paragraphs: ["หลังถ่ายหน้าแรก ให้เปิดเอกสารเดิมและเพิ่มหน้าถัดไปแทนการเริ่มไฟล์ใหม่ เว้นจังหวะให้กล้องโฟกัส และถ้าหน้าใดเอียงหรือเบลอให้ถ่ายซ้ำทันที"], steps: ["ถือโทรศัพท์ให้ขนานกับหน้าและรอเส้นขอบนิ่ง", "ถ่ายแล้วดูภาพย่อก่อนเลื่อนกระดาษ", "กดเพิ่มหน้าและทำซ้ำจนถึงแผ่นสุดท้าย", "หมุน ครอบตัด หรือลบหน้าซ้ำในตัวแก้ไขก่อนส่งออก"], note: "Cam PDF รองรับการถ่ายหลายหน้าและจัดหน้า แต่ความชัดของต้นฉบับยังเป็นตัวกำหนดว่าไฟล์สุดท้ายใช้งานได้จริงหรือไม่" },
        { id: "check", number: "03", title: "ตรวจลำดับหน้าและความอ่านง่ายก่อนบันทึก", paragraphs: ["ดูภาพย่อเพื่อจับหน้าที่หาย หน้าที่กลับด้าน นิ้วบังมุม หรือวันที่ถูกตัดออก ซูมดูตัวอักษรเล็ก ลายเซ็น ตราประทับ และหมายเลขที่สำคัญ"], cards: [{ label: "ลำดับ", title: "อ่านบรรทัดแรกทุกหน้า", body: "ใช้หัวข้อ วันที่ หรือเลขหน้าเพื่อยืนยันลำดับ" }, { label: "ขอบ", title: "ดูมุมทั้งสี่", body: "ตรวจว่ากรอบ ตรา และลายมือไม่ถูกตัด" }, { label: "ตัวอักษร", title: "ซูมจุดเล็กที่สุด", body: "ภาพตัวอย่างบนมือถือชัด ไม่ได้แปลว่า PDF ที่ส่งออกจะชัดเสมอ" }] },
        { id: "export", number: "04", title: "ส่งออก PDF เดียว แล้วแก้ปัญหาขนาดไฟล์", paragraphs: ["ตั้งชื่อไฟล์ที่ค้นหาได้ เลือกขนาดหน้าและคุณภาพให้เหมาะ จากนั้นเปิด PDF ที่ส่งออกนอกตัวแก้ไขเพื่อตรวจอีกครั้ง หากแบบฟอร์มอัปโหลดปฏิเสธไฟล์ ให้ใช้เครื่องมือบีบอัด PDF แทนการลดคุณภาพตั้งแต่ตอนถ่าย"], note: "อย่าสัญญาว่าการส่งออกใช้ได้ไม่จำกัด เพราะเงื่อนไขการเข้าถึงของ Cam PDF อาจมีผลกับบัญชีและโควต้ารายสัปดาห์" }
      ],
      cta: { title: "เก็บเอกสารทั้งชุดไว้ในที่เดียว", paragraphs: ["Cam PDF เชื่อมขั้นตอนถ่ายภาพ แก้ขอบ จัดหน้า ส่งออก PDF และแชร์ไว้ในพื้นที่เดียว เปิดหน้าผลิตภัณฑ์เพื่อดูเงื่อนไขปัจจุบันก่อนติดตั้ง"], image: EXPORT_IMAGE, imageAlt: "หน้าจอส่งออก PDF ของ Cam PDF" },
      faqTitle: "คำถามหลังสแกนเอกสารหลายหน้า", faqs: [["สแกนหลายหน้าเป็น PDF เดียวโดยไม่มีเครื่องสแกนได้ไหม", "ได้ กล้องโทรศัพท์และแอปสแกนเอกสารสามารถถ่ายแต่ละแผ่น รวมหน้า และส่งออกเป็น PDF เดียวได้"], ["ทำไม PDF หลายหน้าของฉันหายไปหนึ่งหน้า", "หน้านั้นอาจไม่ได้ถูกเพิ่ม ถูกลบตอนตรวจ หรือถูกบันทึกเป็นไฟล์แยก ให้เช็กจำนวนภาพย่อก่อนส่งออก"], ["ถ้า PDF ใหญ่ควรถ่ายใหม่ไหม", "ยังไม่ต้อง ลองบีบอัด PDF ก่อน แล้วตรวจว่าตัวอักษรเล็กและลายเซ็นยังอ่านได้"]]
    }),
    pdfQr: makeContent("th", "pdfQr", {
      metaTitle: "วิธีสร้าง QR Code สำหรับ PDF จากโทรศัพท์ | Cam PDF",
      metaDescription: "เรียนรู้วิธีสร้าง QR Code สำหรับ PDF จากโทรศัพท์ วางไฟล์ไว้ที่ลิงก์ที่เปิดได้ สร้าง QR แบบเว็บไซต์ และทดสอบก่อนนำไปแชร์",
      ogDescription: "วิธีเปลี่ยนลิงก์ PDF ให้เป็น QR Code โดยคำนึงถึงสิทธิ์การเข้าถึงและความเป็นส่วนตัว",
      title: "วิธีสร้าง QR Code สำหรับ PDF จากโทรศัพท์",
      breadcrumbCurrent: "แชร์ PDF ด้วย QR Code",
      eyebrow: "คู่มือ CAM PDF · แชร์ PDF ด้วย QR Code",
      dek: "QR Code ไม่จำเป็นต้องเก็บเอกสารทั้งไฟล์ แค่ชี้ไปยังลิงก์ PDF ที่เปิดได้ ผู้อ่านก็สแกนโปสเตอร์ เมนู หรือเอกสารแจกจากโทรศัพท์ได้",
      heroAlt: "ลิงก์ PDF ไหลเข้าสู่ QR Code และเปิดบนโทรศัพท์อีกเครื่อง",
      heroCaption: "QR Code ชี้ไปยังลิงก์เอกสาร ส่วน PDF ยังคงอยู่ในที่ที่คุณเลือกเก็บ",
      toc: [{ id: "make-link", label: "ทำลิงก์ PDF" }, { id: "generate", label: "สร้าง QR Code" }, { id: "test", label: "ทดสอบก่อนพิมพ์" }, { id: "limits", label: "รู้ข้อจำกัด" }, { id: "questions", label: "คำถาม" }],
      answer: { label: "คำตอบสั้น ๆ", title: "วาง PDF ไว้ที่ลิงก์ แล้วเปลี่ยนลิงก์นั้นเป็น QR Code", steps: ["อัปโหลดหรือเผยแพร่ PDF ในที่ที่ผู้อ่านเปิดได้", "คัดลอกลิงก์และตรวจสิทธิ์การแชร์ในหน้าต่างส่วนตัว", "เปิด Cam PDF QR Studio เลือก QR แบบเว็บไซต์ แล้ววางลิงก์", "บันทึกภาพ QR สแกนจากโทรศัพท์อีกเครื่อง แล้วค่อยนำไปพิมพ์"], note: "QR Code ชี้ไปยังตำแหน่งเอกสาร ไม่ได้โฮสต์ PDF ทั้งไฟล์ไว้ในลายเส้นของโค้ด" },
      sections: [
        { id: "make-link", number: "01", title: "ทำลิงก์ PDF ที่ผู้อ่านเปิดได้จริง", paragraphs: ["เลือกที่เก็บไฟล์ก่อนออกแบบ QR Code เมนูหรือโบรชัวร์สาธารณะอาจใช้ URL สาธารณะ แต่สัญญา เอกสารระบุตัวตน หรือประวัตินักเรียนควรใช้สิทธิ์การเข้าถึงที่ตั้งใจไว้"], cards: [{ label: "เอกสารสาธารณะ", title: "ใช้ URL ที่มั่นคง", body: "เหมาะกับเมนู โปรแกรมงาน และคู่มือที่ตั้งใจให้คนทั่วไปเปิด" }, { label: "เอกสารจำกัดสิทธิ์", title: "ตรวจสิทธิ์ก่อนแชร์", body: "QR ที่พิมพ์แล้วสามารถถูกถ่ายรูปต่อได้ ลิงก์แปลกตาไม่ใช่ระบบรักษาความลับ" }, { label: "ใช้นาน", title: "รักษาปลายทางเดิม", body: "ถ้า URL เปลี่ยน QR แบบคงที่จะยังชี้ไปที่ลิงก์เก่า" }] },
        { id: "generate", number: "02", title: "สร้าง QR แบบเว็บไซต์ใน Cam PDF", paragraphs: ["QR Studio ของ Cam PDF รองรับเว็บไซต์ ข้อความ Wi-Fi รายชื่อ และอีเมล สำหรับ PDF ให้เลือกประเภทเว็บไซต์ เพราะปลายทางคือ URL ที่คุณตรวจสอบแล้ว"], steps: ["เปิด Cam PDF และเข้า QR Studio", "เลือกประเภทเว็บไซต์หรือ URL", "วางลิงก์ PDF แบบเต็ม รวม https:// เมื่อมี", "ตรวจตัวอย่างแล้วบันทึกภาพ QR"], image: { src: QR_IMAGE, alt: "หน้าจอ QR Studio ของ Cam PDF", caption: "ใช้ payload แบบเว็บไซต์สำหรับ PDF ที่มีลิงก์อยู่แล้ว" } },
        { id: "test", number: "03", title: "ทดสอบก่อนนำ QR ไปติดโปสเตอร์", paragraphs: ["QR ที่ดูดีบนหน้าจออาจสแกนยากเมื่อพิมพ์เล็ก วางบนพื้นหลังรก หรืออยู่ไกล ทดสอบภาพสุดท้ายกับปลายทางจริง ไม่ใช่แค่ตัวอย่างในเครื่องมือ"], cards: [{ label: "สแกน", title: "ใช้โทรศัพท์อีกเครื่อง", body: "สแกนภาพที่ผู้รับจะเห็นจริง" }, { label: "เปิด", title: "ตรวจเอกสาร", body: "ยืนยันว่า PDF โหลดได้โดยไม่ติดหน้าล็อกอินที่ไม่คาดคิด" }, { label: "พิมพ์", title: "ทดสอบขนาดจริง", body: "ลองกับสำเนาพิมพ์ก่อนผลิตจำนวนมาก" }] },
        { id: "limits", number: "04", title: "รู้ว่า Cam PDF ทำอะไรได้และไม่ได้", paragraphs: ["Cam PDF สร้างภาพ QR บนโทรศัพท์ แต่ไม่ได้โฮสต์ PDF และไม่รับรองว่าลิงก์จะเปิดสาธารณะตลอดไป คุณเป็นผู้เลือกที่เก็บไฟล์ ใครเปิดได้ และไฟล์จะใช้ได้นานเท่าไร", "ถ้าต้องแก้เอกสารบ่อย ให้คง URL เดิมเมื่อระบบที่เก็บไฟล์รองรับ ถ้าเปลี่ยน URL ให้สร้างและทดสอบ QR ใหม่ก่อนเปลี่ยนสื่อสิ่งพิมพ์"], note: "หากยังไม่มี PDF ให้เริ่มจากคู่มือสแกนหลายหน้า หรือถ้าต้องเซ็นก่อนแชร์ให้ดูคู่มือสแกน เซ็น และส่ง PDF" }
      ],
      cta: { title: "สร้าง QR จากโทรศัพท์ที่คุณใช้อยู่", paragraphs: ["Cam PDF QR Studio สร้าง QR แบบเว็บไซต์หลังจากคุณคัดลอกลิงก์ PDF แล้ว จึงทำงานบนมือถือได้โดยไม่อ้างว่า QR เป็นที่เก็บไฟล์"], image: QR_IMAGE, imageAlt: "หน้าจอ Cam PDF QR Studio สำหรับสร้าง QR แบบเว็บไซต์" },
      faqTitle: "คำถามเกี่ยวกับ QR Code สำหรับ PDF", faqs: [["QR Code เก็บ PDF ทั้งไฟล์ได้ไหม", "สำหรับการแชร์เอกสารทั่วไป ให้ถือว่า QR Code เป็นลิงก์ไปยัง PDF ส่วนไฟล์ยังอยู่ที่ปลายทาง"], ["ใช้ QR กับ PDF ส่วนตัวได้ไหม", "ได้ แต่ QR ที่พิมพ์แล้วถูกถ่ายรูปและแชร์ต่อได้ ใช้ปลายทางที่มีสิทธิ์ตามเอกสารและทดสอบประสบการณ์ของผู้รับ"], ["ถ้าลิงก์ PDF เปลี่ยนภายหลังต้องทำอย่างไร", "QR แบบคงที่จะยังชี้ URL เดิม ให้อัปเดตไฟล์ที่ลิงก์เดิมเมื่อทำได้ หรือสร้าง QR ใหม่"]]
    }),
    scanSign: makeContent("th", "scanSign", {
      metaTitle: "วิธีสแกน เซ็น และส่ง PDF บน Android | Cam PDF",
      metaDescription: "เรียนรู้วิธีสแกนหรือนำเข้า PDF ใส่ลายเซ็น ตรวจไฟล์ ส่งออก และส่งเอกสารจากโทรศัพท์ Android ด้วย Cam PDF",
      ogDescription: "ขั้นตอนจากเอกสารกระดาษหรือ PDF ไปสู่ไฟล์ที่เซ็นแล้วและพร้อมแชร์",
      title: "วิธีสแกน เซ็น และส่ง PDF บน Android",
      breadcrumbCurrent: "สแกน เซ็น และส่ง PDF",
      eyebrow: "คู่มือ CAM PDF · สแกน เซ็น และส่ง",
      dek: "เมื่อแบบฟอร์มมาถึงโทรศัพท์ จุดจบที่ใช้งานได้จริงไม่ใช่แค่การสแกน แต่คือ PDF ที่ตรวจแล้ว มีลายเซ็นอยู่ถูกที่ และพร้อมส่งโดยไม่ต้องพิมพ์ใหม่",
      heroAlt: "โทรศัพท์กำลังสแกนแบบฟอร์ม ใส่ลายเซ็น และส่ง PDF ที่เสร็จแล้ว",
      heroCaption: "สแกน วางลายเซ็น ตรวจไฟล์ส่งออก แล้วเลือกช่องทางส่ง",
      toc: [{ id: "capture", label: "สแกนหรือนำเข้า" }, { id: "sign", label: "วางลายเซ็น" }, { id: "review", label: "ตรวจไฟล์" }, { id: "send", label: "ส่ง PDF" }, { id: "questions", label: "คำถาม" }],
      answer: { label: "คำตอบสั้น ๆ", title: "สแกนหรือนำเข้าเอกสาร ใส่ลายเซ็น แล้วตรวจ PDF ที่ส่งออก", steps: ["สแกนกระดาษหรือนำเข้า PDF ใน Cam PDF", "แก้ขอบหน้าและเพิ่มข้อความหรือวันที่ที่จำเป็น", "วาดหรือเลือกลายเซ็นแล้ววางบนบรรทัดที่ถูกต้อง", "ส่งออก เปิดไฟล์จริง และแชร์หลังตรวจผ่าน"], note: "ขั้นตอนนี้หมายถึงลายเซ็นแบบวางบนเอกสาร ไม่ได้สัญญาว่าผู้รับทุกแห่งจะยอมรับแทนลายเซ็นอิเล็กทรอนิกส์ที่มีใบรับรอง" },
      sections: [
        { id: "capture", number: "01", title: "สแกนกระดาษหรือนำเข้า PDF", paragraphs: ["ถ้าเป็นกระดาษ ให้ถือโทรศัพท์ขนานกับแบบฟอร์ม เก็บมุมให้ครบ และใช้แสงสม่ำเสมอ ถ้าเป็น PDF อยู่แล้ว ให้นำเข้าแทนการแคปหน้าจอเพื่อรักษาขนาดหน้าและความคมของข้อความ"], cards: [{ label: "ถ่าย", title: "วางหน้าให้เรียบ", body: "ลดเงาและรอให้ขอบเอกสารนิ่งก่อนถ่าย" }, { label: "แก้", title: "ตรวจการครอบตัด", body: "ดูว่าบรรทัดเซ็น วันที่ และป้ายกำกับยังอยู่ในหน้า" }, { label: "จัด", title: "ตั้งชื่อเอกสาร", body: "ใช้ชื่อที่บอกว่าแบบฟอร์มนี้คืออะไร ก่อนส่งออก" }], image: { src: EDITOR_IMAGE, alt: "ตัวแก้ไขเอกสาร Cam PDF พร้อมปุ่มแก้ขอบหน้า", caption: "แก้ขอบหน้าก่อนวางลายเซ็น" } },
        { id: "sign", number: "02", title: "วางลายเซ็นในตำแหน่งที่ผู้รับคาดไว้", paragraphs: ["เปิดเครื่องมือเซ็น วาดลายเซ็น และวางบนบรรทัดที่ถูกต้อง ปรับขนาดเท่าที่จำเป็น อย่าวางทับชื่อ วันที่ ช่องติ๊ก หรือช่องพยาน"], steps: ["ซูมให้ช่องลายเซ็นวางได้แม่น", "เพิ่มลายเซ็นแล้วเลื่อนโดยไม่บังคำแนะนำใกล้เคียง", "เพิ่มวันที่หรือข้อความเฉพาะช่องที่แบบฟอร์มขอ", "ตรวจทุกหน้า ไม่ใช่เฉพาะหน้าที่เซ็น"], note: "หากผู้รับต้องการใบรับรอง การตรวจตัวตน audit trail หรือพยาน ให้ใช้บริการเซ็นที่ผู้รับกำหนด Cam PDF เป็นกระบวนการ PDF บนมือถือ ไม่ใช่สิ่งทดแทนข้อกำหนดเหล่านั้น" },
        { id: "review", number: "03", title: "ตรวจไฟล์ที่ส่งออกก่อนส่งจริง", paragraphs: ["ตัวแก้ไขกับ PDF ที่ส่งออกเป็นจุดตรวจคนละจุด บันทึกไฟล์ เปิดในโปรแกรมอ่าน PDF แล้วดูว่าลายเซ็น ลำดับหน้า ข้อความ และแนวกระดาษยังถูกต้อง"], cards: [{ label: "เนื้อหา", title: "ดูทุกหน้า", body: "ตรวจว่าไม่มีหน้าหายหรือถูกครอบจนช่องข้อมูลหาย" }, { label: "ลายเซ็น", title: "เช็กตำแหน่งและขนาด", body: "ดูว่าไม่ทับชื่อ วันที่ ตรา หรือคำแนะนำ" }, { label: "ผลลัพธ์", title: "เปิด PDF จริง", body: "อย่าเชื่อว่าดาวน์โหลดสำเร็จจนกว่าไฟล์จะเปิดได้" }] },
        { id: "send", number: "04", title: "ส่ง PDF ด้วยการตั้งค่าความเป็นส่วนตัวและขนาดที่เหมาะ", paragraphs: ["ตั้งชื่อไฟล์และคุณภาพส่งออกให้เหมาะ ถ้าอีเมลหรือแบบฟอร์มมีข้อจำกัดขนาด ให้บีบอัด PDF แล้วเปิดตรวจอีกครั้ง จากนั้นแชร์ผ่านช่องทางที่ผู้รับแจ้งไว้", "อย่าอัปโหลดเอกสารระบุตัวตน การเงิน สุขภาพ โรงเรียน หรือเอกสารที่เซ็นแล้วไปยังตัวแก้ไขออนไลน์ที่ไม่เกี่ยวข้องเพียงเพื่อใส่ลายเซ็น"], note: "ถ้าต้องเซ็นเอกสารหลายหน้า ให้สแกนเป็น PDF เดียวก่อน หากต้องแชร์ด้วย QR ให้ตรวจสิทธิ์ของลิงก์ก่อนพิมพ์" }
      ],
      cta: { title: "จบเอกสารโดยไม่ต้องสลับแอป", paragraphs: ["Cam PDF รวมการสแกน แก้หน้า ใส่ลายเซ็น ส่งออก บีบอัด และแชร์ไว้ในพื้นที่เดียว ใช้ขั้นตอนนี้กับลายเซ็นแบบ annotation แล้วตรวจข้อกำหนดของผู้รับก่อนส่ง"], image: EXPORT_IMAGE, imageAlt: "หน้าจอส่งออก PDF ของ Cam PDF พร้อมชื่อไฟล์และคุณภาพ" },
      faqTitle: "คำถามเกี่ยวกับการเซ็น PDF บน Android", faqs: [["เซ็น PDF โดยไม่พิมพ์ก่อนได้ไหม", "ได้สำหรับลายเซ็นแบบ annotation ทั่วไป ให้นำเข้าหรือสแกน ใส่ลายเซ็น ส่งออก และตรวจไฟล์ก่อนแชร์"], ["ลายเซ็นที่วาดเหมือนลายเซ็นอิเล็กทรอนิกส์แบบมีใบรับรองไหม", "ไม่เหมือนกัน ลายเซ็นที่วาดเป็น annotation ส่วนใบรับรอง การตรวจตัวตน และ audit trail อาจจำเป็นตามผู้รับหรือข้อตกลง"], ["ถ้า PDF ที่เซ็นใหญ่เกินไปจะส่งอย่างไร", "ส่งออก ใช้เครื่องมือบีบอัด PDF แล้วเปิดสำเนาที่บีบอัดเพื่อตรวจลายเซ็นและตัวอักษรเล็ก"]]
    })
  },

  vi: {
    multiPage: makeContent("vi", "multiPage", {
      metaTitle: "Cách scan nhiều trang thành một PDF trên Android | Cam PDF",
      metaDescription: "Học cách scan nhiều trang thành một PDF trên Android, kiểm tra thứ tự, chỉnh khung, nén tệp và chia sẻ bằng Cam PDF.",
      ogDescription: "Quy trình thực tế để scan một chồng giấy, kiểm tra rồi xuất thành một PDF dễ đọc.",
      title: "Cách scan nhiều trang thành một PDF trên Android",
      breadcrumbCurrent: "Scan nhiều trang thành PDF",
      eyebrow: "HƯỚNG DẪN CAM PDF · PDF NHIỀU TRANG",
      dek: "Một chồng giấy nên trở thành một tệp duy nhất, không phải nhiều tệp rời từng trang. Quy trình này giúp bạn chụp đủ, phát hiện lỗi và xuất một PDF dễ đọc.",
      heroAlt: "Điện thoại chụp nhiều trang giấy và tạo một PDF duy nhất",
      heroCaption: "Giữ cả chồng giấy trong một phiên scan rồi kiểm tra trước khi chia sẻ.",
      toc: [{ id: "prepare", label: "Chuẩn bị giấy" }, { id: "capture", label: "Chụp từng trang" }, { id: "check", label: "Kiểm tra PDF" }, { id: "export", label: "Xuất và chia sẻ" }, { id: "questions", label: "Câu hỏi" }],
      answer: { label: "Câu trả lời ngắn", title: "Bắt đầu một lần scan, thêm trang, rồi lưu một lần", steps: ["Mở Cam PDF và chọn quy trình scan tài liệu", "Chụp trang đầu rồi dùng nút thêm trang cho các tờ tiếp theo", "Kiểm tra ảnh thu nhỏ, thứ tự, góc giấy và độ rõ", "Lưu thành một PDF rồi nén hoặc chia sẻ khi cần"], note: "Điểm quan trọng là thời điểm lưu. Đừng xuất từng trang riêng nếu người nhận cần một tài liệu duy nhất." },
      sections: [
        { id: "prepare", number: "01", title: "Chuẩn bị chồng giấy trước khi mở camera", paragraphs: ["Xếp đúng thứ tự, tháo kẹp và làm phẳng góc gấp. Chọn mặt bàn có tương phản rõ với giấy và ánh sáng đều; bóng đổ trên chữ nhỏ hoặc chữ ký thường khó sửa sau đó."], cards: [{ label: "Thứ tự", title: "Đặt trang đầu lên trên", body: "Giữ các trang sau trong tầm tay để không làm lẫn bộ giấy." }, { label: "Ánh sáng", title: "Giảm bóng cứng", body: "Đổi vị trí đèn hoặc giấy trước khi dùng bộ lọc tự động." }, { label: "Khung", title: "Giữ đủ bốn góc", body: "Nhận diện viền tốt hơn khi quanh tờ giấy còn khoảng trống." }], image: { src: EDITOR_IMAGE, alt: "Màn hình chỉnh viền trang của Cam PDF", caption: "Kiểm tra khung thay vì chấp nhận ngay lần cắt tự động đầu tiên." } },
        { id: "capture", number: "02", title: "Chụp mọi trang trong cùng một tài liệu", paragraphs: ["Sau trang đầu, giữ tài liệu đang mở và thêm trang tiếp theo thay vì tạo tệp mới. Dừng một chút để camera lấy nét; nếu trang bị nghiêng hoặc mờ, chụp lại ngay khi chồng giấy vẫn còn bên cạnh."], steps: ["Giữ điện thoại song song với trang và chờ đường viền ổn định", "Chụp xong xem ảnh thu nhỏ trước khi chuyển giấy", "Nhấn thêm trang và lặp lại đến tờ cuối", "Xoay, cắt hoặc xóa trang trùng trong trình chỉnh sửa trước khi xuất"], note: "Cam PDF hỗ trợ scan nhiều trang và sắp xếp trang, nhưng chất lượng bản gốc vẫn quyết định tệp cuối có dùng được hay không." },
        { id: "check", number: "03", title: "Kiểm tra thứ tự và khả năng đọc trước khi lưu", paragraphs: ["Xem ảnh thu nhỏ để phát hiện trang thiếu, trang ngược, ngón tay che góc hoặc ngày tháng bị cắt. Phóng to chữ nhỏ, chữ ký, con dấu và số tài khoản nếu chúng quan trọng."], cards: [{ label: "Thứ tự", title: "Đọc dòng đầu mỗi trang", body: "Dùng tiêu đề, ngày hoặc số trang để xác nhận trình tự." }, { label: "Viền", title: "Xem bốn góc", body: "Đảm bảo khung, dấu và nét viết tay không bị cắt." }, { label: "Chữ", title: "Phóng to chi tiết nhỏ nhất", body: "Bản xem trước rõ trên điện thoại không đảm bảo PDF xuất ra cũng rõ." }] },
        { id: "export", number: "04", title: "Xuất một PDF rồi xử lý vấn đề dung lượng", paragraphs: ["Đặt tên tệp dễ tìm, chọn khổ giấy và chất lượng phù hợp, rồi mở PDF đã xuất bên ngoài trình chỉnh sửa để kiểm tra lần cuối. Nếu biểu mẫu từ chối tệp lớn, hãy dùng công cụ nén PDF thay vì giảm chất lượng ngay lúc chụp."], note: "Điều kiện truy cập của Cam PDF vẫn áp dụng; đừng hứa hẹn quy trình xuất không giới hạn." }
      ],
      cta: { title: "Giữ cả tài liệu trong một nơi", paragraphs: ["Cam PDF nối liền chụp camera, chỉnh viền, sắp xếp trang, xuất PDF và chia sẻ. Xem trang sản phẩm để kiểm tra điều kiện hiện tại trước khi cài đặt."], image: EXPORT_IMAGE, imageAlt: "Màn hình xuất PDF của Cam PDF" },
      faqTitle: "Câu hỏi sau khi scan nhiều trang", faqs: [["Có thể scan nhiều trang thành một PDF mà không cần máy scan không?", "Có. Camera điện thoại và ứng dụng scan tài liệu có thể chụp từng tờ, giữ các trang cùng nhau và xuất một PDF."], ["Vì sao PDF nhiều trang bị thiếu một trang?", "Trang đó có thể chưa được thêm, bị xóa lúc kiểm tra hoặc được lưu thành tệp riêng. Hãy kiểm tra số lượng ảnh thu nhỏ trước khi xuất."], ["PDF quá lớn thì có cần scan lại không?", "Chưa cần. Hãy thử nén PDF trước rồi kiểm tra chữ nhỏ và chữ ký vẫn rõ."]]
    }),
    pdfQr: makeContent("vi", "pdfQr", {
      metaTitle: "Cách tạo mã QR cho PDF bằng điện thoại | Cam PDF",
      metaDescription: "Học cách tạo mã QR cho PDF bằng điện thoại: đặt tài liệu ở một liên kết ổn định, tạo QR website và kiểm tra trước khi chia sẻ.",
      ogDescription: "Quy trình tạo QR từ liên kết PDF, có kiểm tra quyền truy cập và quyền riêng tư.",
      title: "Cách tạo mã QR cho PDF bằng điện thoại",
      breadcrumbCurrent: "Chia sẻ PDF bằng mã QR",
      eyebrow: "HƯỚNG DẪN CAM PDF · CHIA SẺ PDF BẰNG QR",
      dek: "Mã QR không cần chứa toàn bộ tài liệu. Nó có thể trỏ đến một liên kết PDF ổn định để người đọc quét áp phích, menu hoặc tờ phát tay bằng điện thoại.",
      heroAlt: "Liên kết PDF đi vào mã QR và mở trên điện thoại thứ hai",
      heroCaption: "Mã trỏ đến liên kết tài liệu; PDF vẫn nằm ở nơi bạn chọn lưu trữ.",
      toc: [{ id: "make-link", label: "Tạo liên kết PDF" }, { id: "generate", label: "Tạo mã QR" }, { id: "test", label: "Kiểm tra trước khi in" }, { id: "limits", label: "Biết giới hạn" }, { id: "questions", label: "Câu hỏi" }],
      answer: { label: "Câu trả lời ngắn", title: "Đặt PDF ở một liên kết rồi biến liên kết đó thành mã QR", steps: ["Tải hoặc xuất bản PDF ở nơi người đọc có thể mở", "Sao chép liên kết và kiểm tra quyền chia sẻ trong cửa sổ riêng tư", "Mở Cam PDF QR Studio, chọn QR website rồi dán liên kết", "Lưu ảnh QR, quét bằng điện thoại khác rồi mới in hoặc phát"], note: "Mã QR trỏ đến vị trí tài liệu; nó không tự lưu trữ toàn bộ PDF trong các ô đen trắng." },
      sections: [
        { id: "make-link", number: "01", title: "Tạo liên kết PDF mà người đọc thật sự mở được", paragraphs: ["Chọn nơi lưu trước khi thiết kế QR. Menu hoặc brochure công khai có thể dùng URL công khai; hợp đồng, giấy tờ định danh hoặc hồ sơ trường học cần quyền truy cập có chủ đích."], cards: [{ label: "Công khai", title: "Dùng URL ổn định", body: "Phù hợp với menu, chương trình sự kiện và tài liệu muốn chia sẻ rộng." }, { label: "Giới hạn", title: "Kiểm tra quyền truy cập", body: "QR in trên giấy có thể bị chụp lại; liên kết khó đoán không phải bảo mật." }, { label: "Dùng lâu", title: "Giữ nguyên đích đến", body: "Nếu URL đổi, QR tĩnh vẫn trỏ đến liên kết cũ." }] },
        { id: "generate", number: "02", title: "Tạo QR website trong Cam PDF", paragraphs: ["QR Studio của Cam PDF hỗ trợ website, văn bản, Wi‑Fi, liên hệ và email. Với PDF, chọn loại website vì đích đến chính là liên kết bạn vừa kiểm tra."], steps: ["Mở Cam PDF và vào QR Studio", "Chọn loại website hoặc URL", "Dán liên kết PDF đầy đủ, gồm https:// khi có", "Xem trước rồi lưu ảnh QR"], image: { src: QR_IMAGE, alt: "Màn hình QR Studio của Cam PDF với bản xem trước mã", caption: "Dùng payload website khi PDF đã có sẵn một liên kết." } },
        { id: "test", number: "03", title: "Kiểm tra mã trước khi đặt lên áp phích", paragraphs: ["QR có thể trông hoàn hảo trên màn hình nhưng khó quét khi in quá nhỏ, đặt trên nền rối hoặc nhìn từ xa. Hãy kiểm tra đúng ảnh cuối và đúng đích đến."], cards: [{ label: "Quét", title: "Dùng điện thoại thứ hai", body: "Quét ảnh mà thiết bị nhận sẽ thật sự nhìn thấy." }, { label: "Mở", title: "Đọc tài liệu", body: "Xác nhận PDF mở mà không xuất hiện màn hình đăng nhập bất ngờ." }, { label: "In", title: "Thử kích thước thật", body: "Quét bản in thử trước khi in số lượng lớn." }] },
        { id: "limits", number: "04", title: "Biết Cam PDF làm gì và không làm gì", paragraphs: ["Cam PDF tạo ảnh QR trên điện thoại. Ứng dụng không lưu trữ PDF và không hứa rằng liên kết sẽ công khai mãi mãi. Bạn quyết định nơi lưu, ai được mở và tài liệu tồn tại bao lâu.", "Nếu tài liệu thường xuyên được cập nhật, hãy giữ cùng URL khi dịch vụ lưu trữ cho phép. Nếu đổi URL, hãy tạo và kiểm tra mã mới trước khi thay vật phẩm đã in."], note: "Nếu chưa có PDF, hãy xem hướng dẫn scan nhiều trang. Nếu cần ký trước khi chia sẻ, hãy tiếp tục với quy trình scan, ký và gửi." }
      ],
      cta: { title: "Tạo mã từ chiếc điện thoại bạn đang dùng", paragraphs: ["Cam PDF QR Studio tạo QR website sau khi bạn sao chép liên kết PDF, giúp giữ quy trình trên một ứng dụng di động mà không giả vờ rằng QR là nơi lưu tệp."], image: QR_IMAGE, imageAlt: "Màn hình Cam PDF QR Studio để tạo QR website" },
      faqTitle: "Câu hỏi về mã QR cho PDF", faqs: [["Mã QR có thể chứa toàn bộ PDF không?", "Với chia sẻ tài liệu thông thường, hãy xem QR là liên kết đến PDF. Tệp vẫn nằm ở đích đến và mở khi người đọc quét."], ["Có thể dùng QR cho PDF riêng tư không?", "Có, nhưng mã in có thể bị chụp và chia sẻ. Hãy dùng nơi lưu trữ có quyền phù hợp và thử đúng trải nghiệm của người nhận."], ["Nếu liên kết PDF đổi sau này thì sao?", "QR tĩnh vẫn trỏ đến URL cũ. Hãy cập nhật tệp tại liên kết cũ nếu có thể hoặc tạo và phát mã mới."]]
    }),
    scanSign: makeContent("vi", "scanSign", {
      metaTitle: "Cách scan, ký và gửi PDF trên Android | Cam PDF",
      metaDescription: "Học cách scan hoặc nhập PDF, thêm chữ ký, kiểm tra trang, xuất tệp và gửi từ điện thoại Android bằng Cam PDF.",
      ogDescription: "Quy trình từ biểu mẫu giấy hoặc PDF đến tệp đã ký và sẵn sàng chia sẻ.",
      title: "Cách scan, ký và gửi PDF trên Android",
      breadcrumbCurrent: "Scan, ký và gửi PDF",
      eyebrow: "HƯỚNG DẪN CAM PDF · SCAN, KÝ VÀ GỬI",
      dek: "Khi biểu mẫu đến điện thoại, đích đến hữu ích không chỉ là bản scan. Đó là một PDF đã kiểm tra, chữ ký nằm đúng vị trí và sẵn sàng gửi mà không cần vòng qua máy in.",
      heroAlt: "Điện thoại scan biểu mẫu, thêm chữ ký và gửi PDF hoàn chỉnh",
      heroCaption: "Scan trang, đặt chữ ký, kiểm tra tệp xuất rồi chọn nơi gửi.",
      toc: [{ id: "capture", label: "Scan hoặc nhập" }, { id: "sign", label: "Đặt chữ ký" }, { id: "review", label: "Kiểm tra tệp" }, { id: "send", label: "Gửi PDF" }, { id: "questions", label: "Câu hỏi" }],
      answer: { label: "Câu trả lời ngắn", title: "Scan hoặc nhập tài liệu, ký rồi kiểm tra PDF đã xuất", steps: ["Scan giấy hoặc nhập PDF vào Cam PDF", "Chỉnh viền trang và thêm văn bản hoặc ngày nếu cần", "Vẽ hoặc chọn chữ ký rồi đặt vào đúng dòng", "Xuất PDF, mở tệp hoàn chỉnh và chỉ chia sẻ sau khi kiểm tra"], note: "Quy trình này mô tả chữ ký dạng chú thích trên PDF. Không nên mặc định rằng mọi người nhận hoặc hợp đồng đều xem nó như chữ ký điện tử có chứng thư." },
      sections: [
        { id: "capture", number: "01", title: "Scan giấy hoặc nhập PDF", paragraphs: ["Nếu là giấy, giữ điện thoại song song với biểu mẫu, lấy đủ bốn góc và dùng ánh sáng đều. Nếu biểu mẫu đã là PDF, hãy nhập tệp thay vì chụp màn hình để giữ khổ trang và chất lượng chữ."], cards: [{ label: "Chụp", title: "Giữ trang phẳng", body: "Giảm bóng và chờ viền tài liệu ổn định trước khi chụp." }, { label: "Sửa", title: "Kiểm tra khung", body: "Đảm bảo dòng ký, ngày và nhãn nhỏ vẫn nằm trong trang." }, { label: "Sắp xếp", title: "Đặt tên tài liệu", body: "Dùng tên giúp nhận ra biểu mẫu trước khi xuất." }], image: { src: EDITOR_IMAGE, alt: "Trình chỉnh sửa Cam PDF với điều khiển sửa viền", caption: "Sửa viền trước khi thêm chữ ký." } },
        { id: "sign", number: "02", title: "Đặt chữ ký ở nơi người nhận chờ", paragraphs: ["Mở công cụ ký, vẽ chữ ký và đặt vào đúng dòng. Chỉ đổi kích thước khi cần; chữ ký che tên, ngày, ô chọn hoặc mục người làm chứng có thể khiến biểu mẫu khó xử lý."], steps: ["Phóng to trường chữ ký để đặt chính xác", "Thêm chữ ký và di chuyển mà không che hướng dẫn", "Chỉ thêm ngày hoặc chữ ở nơi biểu mẫu yêu cầu", "Kiểm tra mọi trang, không chỉ trang có chữ ký"], note: "Nếu người nhận yêu cầu chứng thư, nhật ký kiểm toán, xác minh danh tính hoặc người làm chứng, hãy dùng dịch vụ mà họ chỉ định. Cam PDF là quy trình PDF di động, không thay thế các yêu cầu đó." },
        { id: "review", number: "03", title: "Kiểm tra tệp đã xuất trước khi gửi", paragraphs: ["Bản xem trước trong trình chỉnh sửa và PDF đã xuất là hai điểm kiểm tra khác nhau. Lưu tệp, mở bằng trình đọc PDF rồi xác nhận chữ ký, thứ tự trang, chữ và hướng trang vẫn đúng."], cards: [{ label: "Nội dung", title: "Xem mọi trang", body: "Đảm bảo không trang nào mất hoặc bị cắt mất trường thông tin." }, { label: "Chữ ký", title: "Kiểm tra vị trí và cỡ", body: "Tìm phần bị chồng lên tên, ngày, dấu hoặc hướng dẫn." }, { label: "Đầu ra", title: "Mở PDF thật", body: "Không coi tải xuống là thành công cho đến khi tệp mở được." }] },
        { id: "send", number: "04", title: "Gửi PDF với lựa chọn phù hợp về quyền riêng tư và dung lượng", paragraphs: ["Đặt tên tệp và chất lượng xuất hợp lý. Nếu email hoặc biểu mẫu giới hạn dung lượng, hãy nén PDF rồi kiểm tra lại. Sau đó dùng cách chia sẻ mà người nhận yêu cầu.", "Đừng tải giấy tờ định danh, tài chính, y tế, trường học hoặc tài liệu đã ký lên một trình chỉnh sửa trực tuyến không liên quan chỉ để thêm chữ ký."], note: "Cần ký một chồng giấy? Hãy scan thành một PDF trước. Muốn chia sẻ bằng QR? Kiểm tra quyền truy cập của liên kết trước khi in." }
      ],
      cta: { title: "Hoàn tất tài liệu mà không đổi ứng dụng", paragraphs: ["Cam PDF kết hợp scan, chỉnh trang, chữ ký, xuất PDF, nén và chia sẻ trong một không gian di động. Dùng quy trình này cho chữ ký dạng chú thích rồi xác nhận yêu cầu của người nhận trước khi gửi."], image: EXPORT_IMAGE, imageAlt: "Màn hình xuất PDF Cam PDF với tên tệp và chất lượng" },
      faqTitle: "Câu hỏi về ký PDF trên Android", faqs: [["Có thể ký PDF mà không in trước không?", "Có, với chữ ký dạng chú thích thông thường: nhập hoặc scan, thêm chữ ký, xuất PDF và kiểm tra trước khi chia sẻ."], ["Chữ ký vẽ có giống chữ ký điện tử có chứng thư không?", "Không. Chữ ký vẽ là chú thích; chứng thư, xác minh danh tính và nhật ký kiểm toán có thể cần tùy người nhận hoặc thỏa thuận."], ["Gửi PDF đã ký quá lớn bằng cách nào?", "Xuất tệp, dùng công cụ nén PDF, rồi mở bản nén để xác nhận chữ ký và chữ nhỏ vẫn rõ."]]
    })
  },

  "zh-CN": {
    multiPage: makeContent("zh-CN", "multiPage", {
      metaTitle: "如何在 Android 上将多页扫描成一个 PDF | Cam PDF",
      metaDescription: "了解如何在 Android 上把多页文档扫描成一个 PDF，检查页序、修正边缘、压缩文件并用 Cam PDF 分享。",
      ogDescription: "从一叠纸张到一个清晰 PDF 的实用手机流程。",
      title: "如何在 Android 上将多页扫描成一个 PDF",
      breadcrumbCurrent: "多页扫描成 PDF",
      eyebrow: "CAM PDF 指南 · 多页 PDF",
      dek: "一叠纸应该成为一个文件，而不是一堆分开的单页导出。下面的流程帮助你拍完整、找出错误，并导出容易阅读的 PDF。",
      heroAlt: "手机拍摄多页文件并生成一个 PDF",
      heroCaption: "把整叠文件放在一次扫描中，然后在分享前检查结果。",
      toc: [{ id: "prepare", label: "准备页面" }, { id: "capture", label: "拍摄所有页面" }, { id: "check", label: "检查 PDF" }, { id: "export", label: "导出并分享" }, { id: "questions", label: "常见问题" }],
      answer: { label: "简短答案", title: "开始一次扫描，持续添加页面，最后一次保存", steps: ["打开 Cam PDF，选择文档扫描流程", "拍摄第一页，再使用添加页面功能继续", "检查缩略图、页序、边缘和清晰度", "保存为一个 PDF，需要时再压缩或分享"], note: "关键在于保存时机。如果收件人需要一份完整文件，就不要把每一页分别导出。" },
      sections: [
        { id: "prepare", number: "01", title: "打开相机前先整理页面", paragraphs: ["先排好顺序，取下夹子并压平折角。选择能看清纸张边缘的背景，并保持光线均匀；签名或小数字上的阴影之后很难补救。"], cards: [{ label: "顺序", title: "把第一页放在最上面", body: "让后续页面在手边，避免扫描时打乱整叠纸。" }, { label: "光线", title: "减少硬阴影", body: "先移动灯光或纸张，再依赖自动增强。" }, { label: "边缘", title: "保留四个角", body: "边缘识别需要纸张周围留有足够空间。" }], image: { src: EDITOR_IMAGE, alt: "Cam PDF 页面边缘修正界面", caption: "检查裁剪边界，不要直接接受第一次自动裁剪。" } },
        { id: "capture", number: "02", title: "把所有页面放在同一个文档中", paragraphs: ["拍完第一页后保持当前文档打开，使用添加页面，而不是新建文件。每页之间稍停让相机对焦；如果某页歪了或模糊，趁纸张还在手边马上重拍。"], steps: ["让手机与页面平行，等待边缘框稳定", "拍摄后先查看缩略图再移动纸张", "点击添加页面并重复到最后一张", "导出前在编辑器中旋转、裁剪或删除重复页"], note: "Cam PDF 支持多页拍摄和页面整理，但原稿质量仍决定最终文件是否真正可用。" },
        { id: "check", number: "03", title: "保存前检查页序和可读性", paragraphs: ["缩略图检查可以发现漏页、倒页、手指挡角或日期被裁掉。放大查看最小字号，以及签名、印章和账号等重要区域。"], cards: [{ label: "顺序", title: "阅读每页第一行", body: "用标题、日期或页码确认顺序。" }, { label: "边缘", title: "检查四个角", body: "确认边框、印章和手写内容没有被切掉。" }, { label: "文字", title: "放大最小细节", body: "手机预览清晰，不代表导出的 PDF 一定清晰。" }] },
        { id: "export", number: "04", title: "导出一个 PDF，再处理文件大小", paragraphs: ["使用容易查找的文件名，选择合适的纸张和质量，然后在编辑器外打开导出的 PDF 再检查一次。如果上传表单拒绝大文件，先使用 PDF 压缩工具，而不是一开始就降低拍摄质量。"], note: "Cam PDF 的账户、广告和每周导出额度仍然适用，不要向读者承诺无限导出。" }
      ],
      cta: { title: "把整份文档放在一个工作区", paragraphs: ["Cam PDF 把拍摄、边缘修正、页面整理、PDF 导出和分享连接起来。安装前可以先查看产品页的当前使用条件。"], image: EXPORT_IMAGE, imageAlt: "Cam PDF PDF 导出界面" },
      faqTitle: "多页扫描后的常见问题", faqs: [["没有实体扫描仪也能把多页扫描成一个 PDF 吗？", "可以。手机相机和文档扫描应用能够逐页拍摄、保持页面顺序并导出一个 PDF。"], ["为什么多页 PDF 少了一页？", "该页可能没有加入扫描会话、在检查时被删除，或被保存为独立文件。导出前检查缩略图数量。"], ["PDF 太大需要重新扫描吗？", "不一定。先压缩 PDF，再确认小字和签名仍然清晰。"]]
    }),
    pdfQr: makeContent("zh-CN", "pdfQr", {
      metaTitle: "如何用手机为 PDF 创建二维码 | Cam PDF",
      metaDescription: "了解如何用手机为 PDF 创建二维码：先准备稳定的文件链接，生成网站二维码，并在分享前测试。",
      ogDescription: "把 PDF 链接变成二维码的清晰流程，同时检查权限和隐私。",
      title: "如何用手机为 PDF 创建二维码",
      breadcrumbCurrent: "用二维码分享 PDF",
      eyebrow: "CAM PDF 指南 · PDF 二维码分享",
      dek: "二维码不需要装下整份文档。它可以指向一个稳定的 PDF 链接，让读者扫描海报、菜单或传单后在手机上打开文件。",
      heroAlt: "PDF 链接流向二维码，并在另一部手机上打开",
      heroCaption: "二维码指向文档链接；PDF 仍保存在你选择的位置。",
      toc: [{ id: "make-link", label: "准备 PDF 链接" }, { id: "generate", label: "生成二维码" }, { id: "test", label: "打印前测试" }, { id: "limits", label: "了解限制" }, { id: "questions", label: "常见问题" }],
      answer: { label: "简短答案", title: "先让 PDF 出现在一个链接中，再把链接变成二维码", steps: ["把 PDF 上传或发布到读者可以打开的位置", "复制完整链接，并用无痕窗口检查分享权限", "打开 Cam PDF QR Studio，选择网站二维码并粘贴链接", "保存二维码图片，用另一部手机扫描后再打印或发布"], note: "二维码指向文件位置，并不会把整个 PDF 自动存储在黑白图案里。" },
      sections: [
        { id: "make-link", number: "01", title: "准备一个读者真的能打开的 PDF 链接", paragraphs: ["设计二维码前先决定文件放在哪里。公开菜单或活动手册可以使用公开 URL；合同、证件或学校资料则要有明确的访问控制。"], cards: [{ label: "公开文件", title: "使用稳定的公开 URL", body: "适合菜单、活动日程、说明书和公开资料。" }, { label: "受限访问", title: "先检查权限设置", body: "印刷二维码可以被拍照，难猜的链接并不等于安全。" }, { label: "长期使用", title: "保持目标地址稳定", body: "如果 URL 改变，静态二维码仍会指向旧地址。" }] },
        { id: "generate", number: "02", title: "在 Cam PDF 中生成网站二维码", paragraphs: ["Cam PDF 的 QR Studio 支持网站、文字、Wi‑Fi、联系人和邮箱。PDF 工作流应选择网站类型，因为目标就是你刚刚检查过的链接。"], steps: ["打开 Cam PDF 并进入 QR Studio", "选择网站或 URL 类型", "粘贴完整 PDF 链接，有条件时包含 https://", "查看预览并保存二维码图片"], image: { src: QR_IMAGE, alt: "Cam PDF QR Studio 二维码预览界面", caption: "PDF 已经有链接时，使用网站类型。" } },
        { id: "test", number: "03", title: "把二维码放上海报前先测试", paragraphs: ["二维码在屏幕上看起来正常，打印太小、背景太复杂或距离太远时仍可能无法扫描。请测试最终图片和最终目标，而不只是生成器里的预览。"], cards: [{ label: "扫描", title: "使用另一部手机", body: "扫描接收设备真正会看到的保存图片。" }, { label: "打开", title: "确认文档可读", body: "检查 PDF 不会意外跳到登录或权限页面。" }, { label: "打印", title: "测试实际尺寸", body: "大批量打印前先扫描一张实物样本。" }] },
        { id: "limits", number: "04", title: "了解 Cam PDF 能做什么、不能做什么", paragraphs: ["Cam PDF 在手机上生成二维码图片，但不会托管 PDF，也不保证目标链接永远公开。文件放在哪里、谁可以打开、链接能用多久，都由你决定。", "如果文件经常更新，在存储服务允许时保持同一个 URL。如果 URL 改变，请在替换印刷品前重新生成并测试二维码。"], note: "还没有 PDF 时，可以先阅读多页扫描指南；如果要先签名再分享，可以继续阅读扫描、签名并发送 PDF 指南。" }
      ],
      cta: { title: "用手边的手机创建二维码", paragraphs: ["复制 PDF 链接后，Cam PDF QR Studio 可以生成网站二维码，让流程留在一个移动应用中，同时明确二维码本身不是文件存储空间。"], image: QR_IMAGE, imageAlt: "Cam PDF QR Studio 网站二维码创建界面" },
      faqTitle: "PDF 二维码常见问题", faqs: [["二维码可以包含整个 PDF 吗？", "一般文档分享应把二维码看作 PDF 链接。文件仍在目标地址，读者扫描后打开。"], ["可以给私密 PDF 使用二维码吗？", "可以，但印刷二维码可能被拍照转发。请使用符合文件要求的访问控制，并测试收件人的实际体验。"], ["PDF 链接以后变了怎么办？", "静态二维码仍指向旧 URL。能在原链接更新文件时就保持原链接，否则应重新生成并发布二维码。"]]
    }),
    scanSign: makeContent("zh-CN", "scanSign", {
      metaTitle: "如何在 Android 上扫描、签名并发送 PDF | Cam PDF",
      metaDescription: "了解如何扫描或导入 PDF、添加签名、检查页面、导出文件，并用 Cam PDF 从 Android 手机发送。",
      ogDescription: "从纸质表格或 PDF 到检查完毕、可分享文件的移动流程。",
      title: "如何在 Android 上扫描、签名并发送 PDF",
      breadcrumbCurrent: "扫描、签名并发送 PDF",
      eyebrow: "CAM PDF 指南 · 扫描、签名并发送",
      dek: "表格来到手机后，真正有用的终点不只是扫描，而是一份检查过、签名位置正确、可以发送的 PDF，而不必再绕回打印机。",
      heroAlt: "手机扫描表格、添加签名并发送完成的 PDF",
      heroCaption: "扫描页面、放置签名、检查导出结果，再选择发送位置。",
      toc: [{ id: "capture", label: "扫描或导入" }, { id: "sign", label: "放置签名" }, { id: "review", label: "检查导出" }, { id: "send", label: "发送 PDF" }, { id: "questions", label: "常见问题" }],
      answer: { label: "简短答案", title: "扫描或导入文件，签名，然后检查导出的 PDF", steps: ["扫描纸张或把 PDF 导入 Cam PDF", "修正页面边缘，并在需要时添加文字或日期", "绘制或选择签名，放在正确的签名线上", "导出 PDF，打开完成的文件，确认无误后再分享"], note: "这里说的是在文件上放置签名标注，并不保证所有收件人或合同都把它视为带证书的电子签名。" },
      sections: [
        { id: "capture", number: "01", title: "扫描纸张或导入 PDF", paragraphs: ["如果是纸张，让手机与表格平行，拍全四个角并使用均匀光线。如果表格已经是 PDF，请直接导入，不要截图，以保留原始页面尺寸和文字质量。"], cards: [{ label: "拍摄", title: "保持页面平整", body: "减少阴影，等边缘稳定后再拍。" }, { label: "修正", title: "检查裁剪", body: "确保签名线、日期和小标签仍在页面内。" }, { label: "整理", title: "先给文件命名", body: "导出前使用能说明表格用途的文件名。" }], image: { src: EDITOR_IMAGE, alt: "Cam PDF 页面修正编辑器", caption: "添加签名前先修正页面边界。" } },
        { id: "sign", number: "02", title: "把签名放在收件人预期的位置", paragraphs: ["打开签名工具，绘制签名并放在正确的线上。只在需要时调整大小；签名盖住姓名、日期、勾选框或见证人栏，可能让表格无法处理。"], steps: ["放大签名区域，确保位置准确", "添加签名并移动它，不要盖住附近说明", "只在表格要求的位置添加日期或文字", "检查每一页，而不只是有签名的页面"], note: "如果收件人要求证书、审计记录、身份验证或见证流程，请使用对方指定的签名服务。Cam PDF 是移动 PDF 工具，不能替代这些要求。" },
        { id: "review", number: "03", title: "发送前检查导出的文件", paragraphs: ["编辑器预览和导出的 PDF 是两个不同检查点。保存文件，在 PDF 阅读器中打开，确认签名、页序、文字和方向都在导出后保持正确。"], cards: [{ label: "内容", title: "检查每一页", body: "确保没有页面消失，也没有裁剪掉字段。" }, { label: "签名", title: "确认位置和大小", body: "查看是否压住姓名、日期、印章或说明。" }, { label: "输出", title: "打开真正的 PDF", body: "文件能打开并显示正确，才算下载成功。" }] },
        { id: "send", number: "04", title: "用合适的隐私和大小设置发送 PDF", paragraphs: ["选择清楚的文件名和导出质量。如果邮件或上传表单有限制，先压缩 PDF，再打开检查。然后使用收件人要求的渠道发送。", "不要为了添加签名，就把身份证明、财务、医疗、学校或已签名文件上传到无关的在线编辑器。"], note: "需要签一叠页面时，先把它们扫描成一个 PDF。想用二维码分享时，打印前先检查链接权限。" }
      ],
      cta: { title: "不切换应用也能完成文件", paragraphs: ["Cam PDF 将扫描、页面编辑、签名、PDF 导出、压缩和分享放在一个移动工作区中。使用普通签名标注时，请在发送前确认收件人的具体要求。"], image: EXPORT_IMAGE, imageAlt: "Cam PDF 文件名、PDF 格式和质量设置界面" },
      faqTitle: "Android 签名 PDF 常见问题", faqs: [["可以不打印就签 PDF 吗？", "对于普通签名标注，可以导入或扫描文件，在应用中添加签名，导出 PDF，并在分享前检查。"], ["手绘签名等同于带证书的电子签名吗？", "不等同。手绘签名是标注；具体场景可能还需要证书、身份验证和审计记录。"], ["签名 PDF 太大怎么发送？", "导出后使用 PDF 压缩工具，再打开压缩副本确认签名和小字仍然清晰。"]]
    })
  },

  "zh-TW": {
    multiPage: makeContent("zh-TW", "multiPage", {
      metaTitle: "如何在 Android 將多頁掃描成一份 PDF | Cam PDF",
      metaDescription: "了解如何在 Android 將多頁文件掃描成一份 PDF，檢查頁序、修正邊緣、壓縮檔案並使用 Cam PDF 分享。",
      ogDescription: "從一疊紙張到一份清楚 PDF 的實用手機流程。",
      title: "如何在 Android 將多頁掃描成一份 PDF",
      breadcrumbCurrent: "多頁掃描成 PDF",
      eyebrow: "CAM PDF 指南 · 多頁 PDF",
      dek: "一疊紙應該成為一個檔案，而不是一堆分開的單頁匯出。下面的流程幫助你完整拍攝、找出錯誤，再匯出容易閱讀的 PDF。",
      heroAlt: "手機拍攝多頁文件並產生一份 PDF",
      heroCaption: "把整疊文件放在同一次掃描中，分享前再檢查結果。",
      toc: [{ id: "prepare", label: "準備頁面" }, { id: "capture", label: "拍攝所有頁面" }, { id: "check", label: "檢查 PDF" }, { id: "export", label: "匯出與分享" }, { id: "questions", label: "常見問題" }],
      answer: { label: "簡短答案", title: "開始一次掃描，持續加入頁面，最後一次儲存", steps: ["開啟 Cam PDF，選擇文件掃描流程", "拍攝第一頁，再使用加入頁面功能繼續", "檢查縮圖、頁序、邊緣與清晰度", "儲存為一份 PDF，需要時再壓縮或分享"], note: "關鍵在於儲存時機。如果收件人需要一份完整文件，就不要把每一頁分開匯出。" },
      sections: [
        { id: "prepare", number: "01", title: "開啟相機前先整理頁面", paragraphs: ["先排好順序，取下夾子並壓平折角。選擇看得清紙張邊緣的背景，保持光線均勻；簽名或小數字上的陰影之後很難補救。"], cards: [{ label: "順序", title: "把第一頁放在最上面", body: "讓後續頁面在手邊，避免掃描時弄亂整疊紙。" }, { label: "光線", title: "減少硬陰影", body: "先移動燈光或紙張，再依賴自動增強。" }, { label: "邊緣", title: "保留四個角", body: "紙張周圍有足夠空間時，邊緣偵測會更可靠。" }], image: { src: EDITOR_IMAGE, alt: "Cam PDF 頁面邊緣修正介面", caption: "檢查裁切邊界，不要直接接受第一次自動裁切。" } },
        { id: "capture", number: "02", title: "把所有頁面放在同一份文件中", paragraphs: ["拍完第一頁後保持目前文件開啟，使用加入頁面，而不是新建檔案。每頁之間稍停讓相機對焦；如果某頁歪了或模糊，趁紙張還在手邊立即重拍。"], steps: ["讓手機與頁面平行，等待邊緣框穩定", "拍攝後先查看縮圖再移動紙張", "點選加入頁面並重複到最後一張", "匯出前在編輯器中旋轉、裁切或刪除重複頁"], note: "Cam PDF 支援多頁拍攝與頁面整理，但原稿品質仍決定最後檔案是否真的可用。" },
        { id: "check", number: "03", title: "儲存前檢查頁序與可讀性", paragraphs: ["查看縮圖可以發現漏頁、倒頁、手指遮住角落或日期被裁掉。放大查看最小字級，以及簽名、印章和帳號等重要區域。"], cards: [{ label: "順序", title: "閱讀每頁第一行", body: "用標題、日期或頁碼確認順序。" }, { label: "邊緣", title: "檢查四個角", body: "確認框線、印章和手寫內容沒有被切掉。" }, { label: "文字", title: "放大最小細節", body: "手機預覽清楚，不代表匯出的 PDF 一定清楚。" }] },
        { id: "export", number: "04", title: "匯出一份 PDF，再處理檔案大小", paragraphs: ["使用容易尋找的檔名，選擇合適的紙張和品質，然後在編輯器外開啟匯出的 PDF 再檢查一次。如果上傳表單拒絕大檔案，先使用 PDF 壓縮工具，而不是一開始就降低拍攝品質。"], note: "Cam PDF 的帳戶、廣告與每週匯出額度仍然適用，不要向讀者承諾無限匯出。" }
      ],
      cta: { title: "把整份文件放在同一個工作區", paragraphs: ["Cam PDF 串起拍攝、邊緣修正、頁面整理、PDF 匯出與分享。安裝前可以先查看產品頁的目前使用條件。"], image: EXPORT_IMAGE, imageAlt: "Cam PDF PDF 匯出介面" },
      faqTitle: "多頁掃描後的常見問題", faqs: [["沒有實體掃描器也能把多頁掃描成一份 PDF 嗎？", "可以。手機相機與文件掃描 App 能逐頁拍攝、維持頁序並匯出一份 PDF。"], ["為什麼多頁 PDF 少了一頁？", "該頁可能沒有加入掃描流程、檢查時被刪除，或被儲存成獨立檔案。匯出前檢查縮圖數量。"], ["PDF 太大需要重新掃描嗎？", "不一定。先壓縮 PDF，再確認小字與簽名仍然清楚。"]]
    }),
    pdfQr: makeContent("zh-TW", "pdfQr", {
      metaTitle: "如何用手機為 PDF 建立 QR Code | Cam PDF",
      metaDescription: "了解如何用手機為 PDF 建立 QR Code：先準備穩定的檔案連結，產生網站 QR Code，並在分享前測試。",
      ogDescription: "把 PDF 連結變成 QR Code 的清楚流程，同時檢查權限與隱私。",
      title: "如何用手機為 PDF 建立 QR Code",
      breadcrumbCurrent: "用 QR Code 分享 PDF",
      eyebrow: "CAM PDF 指南 · PDF QR Code 分享",
      dek: "QR Code 不需要裝下整份文件。它可以指向穩定的 PDF 連結，讓讀者掃描海報、菜單或傳單後在手機上開啟檔案。",
      heroAlt: "PDF 連結流向 QR Code，並在另一支手機上開啟",
      heroCaption: "QR Code 指向文件連結；PDF 仍保存在你選擇的位置。",
      toc: [{ id: "make-link", label: "準備 PDF 連結" }, { id: "generate", label: "產生 QR Code" }, { id: "test", label: "列印前測試" }, { id: "limits", label: "了解限制" }, { id: "questions", label: "常見問題" }],
      answer: { label: "簡短答案", title: "先讓 PDF 出現在一個連結中，再把連結變成 QR Code", steps: ["把 PDF 上傳或發布到讀者可以開啟的位置", "複製完整連結，並用私密視窗檢查分享權限", "開啟 Cam PDF QR Studio，選擇網站 QR Code 並貼上連結", "儲存 QR 圖片，用另一支手機掃描後再列印或發布"], note: "QR Code 指向檔案位置，不會把整份 PDF 自動儲存在黑白圖案裡。" },
      sections: [
        { id: "make-link", number: "01", title: "準備讀者真的能開啟的 PDF 連結", paragraphs: ["設計 QR Code 前先決定檔案放在哪裡。公開菜單或活動手冊可以使用公開 URL；合約、證件或學校資料則需要清楚設定存取權限。"], cards: [{ label: "公開文件", title: "使用穩定的公開 URL", body: "適合菜單、活動日程、說明書與公開資料。" }, { label: "受限存取", title: "先檢查權限設定", body: "印刷 QR Code 可以被拍照，難猜的連結不等於安全。" }, { label: "長期使用", title: "維持目的地穩定", body: "如果 URL 改變，靜態 QR Code 仍會指向舊地址。" }] },
        { id: "generate", number: "02", title: "在 Cam PDF 產生網站 QR Code", paragraphs: ["Cam PDF 的 QR Studio 支援網站、文字、Wi‑Fi、聯絡人與電子郵件。PDF 流程應選擇網站類型，因為目的地就是剛才檢查過的連結。"], steps: ["開啟 Cam PDF 並進入 QR Studio", "選擇網站或 URL 類型", "貼上完整 PDF 連結，有條件時包含 https://", "查看預覽並儲存 QR 圖片"], image: { src: QR_IMAGE, alt: "Cam PDF QR Studio QR Code 預覽介面", caption: "PDF 已經有連結時，使用網站類型。" } },
        { id: "test", number: "03", title: "放上海報前先測試 QR Code", paragraphs: ["QR Code 在螢幕上看起來正常，列印太小、背景太複雜或距離太遠時仍可能無法掃描。請測試最終圖片和最終目的地，而不只是產生器裡的預覽。"], cards: [{ label: "掃描", title: "使用另一支手機", body: "掃描接收裝置真正會看到的儲存圖片。" }, { label: "開啟", title: "確認文件可讀", body: "檢查 PDF 不會意外跳到登入或權限頁面。" }, { label: "列印", title: "測試實際尺寸", body: "大量列印前先掃描一張實體樣本。" }] },
        { id: "limits", number: "04", title: "了解 Cam PDF 能做什麼、不能做什麼", paragraphs: ["Cam PDF 在手機上產生 QR 圖片，但不會代管 PDF，也不保證目的地連結永遠公開。檔案放在哪裡、誰能開啟、連結能用多久，都由你決定。", "如果檔案經常更新，在儲存服務允許時維持同一個 URL。如果 URL 改變，請在更換印刷品前重新產生並測試 QR Code。"], note: "還沒有 PDF 時，可以先閱讀多頁掃描指南；如果要先簽名再分享，可以繼續閱讀掃描、簽名並傳送 PDF 指南。" }
      ],
      cta: { title: "用手邊的手機建立 QR Code", paragraphs: ["複製 PDF 連結後，Cam PDF QR Studio 可以產生網站 QR Code，讓流程留在一個行動 App 中，同時清楚說明 QR Code 本身不是檔案儲存空間。"], image: QR_IMAGE, imageAlt: "Cam PDF QR Studio 網站 QR Code 建立介面" },
      faqTitle: "PDF QR Code 常見問題", faqs: [["QR Code 可以包含整份 PDF 嗎？", "一般文件分享應把 QR Code 看作 PDF 連結。檔案仍在目的地，讀者掃描後開啟。"], ["可以為私密 PDF 使用 QR Code 嗎？", "可以，但印刷 QR Code 可能被拍照轉發。請使用符合文件要求的存取控制，並測試收件人的實際體驗。"], ["PDF 連結之後變了怎麼辦？", "靜態 QR Code 仍會指向舊 URL。若可以在原連結更新檔案，就維持原連結；否則重新產生並發布 QR Code。"]]
    }),
    scanSign: makeContent("zh-TW", "scanSign", {
      metaTitle: "如何在 Android 掃描、簽名並傳送 PDF | Cam PDF",
      metaDescription: "了解如何掃描或匯入 PDF、加入簽名、檢查頁面、匯出檔案，並使用 Cam PDF 從 Android 手機傳送。",
      ogDescription: "從紙本表格或 PDF 到檢查完成、可以分享的行動流程。",
      title: "如何在 Android 掃描、簽名並傳送 PDF",
      breadcrumbCurrent: "掃描、簽名並傳送 PDF",
      eyebrow: "CAM PDF 指南 · 掃描、簽名並傳送",
      dek: "表格來到手機後，真正有用的終點不只是掃描，而是一份檢查過、簽名位置正確、可以傳送的 PDF，不必再繞回印表機。",
      heroAlt: "手機掃描表格、加入簽名並傳送完成的 PDF",
      heroCaption: "掃描頁面、放置簽名、檢查匯出結果，再選擇傳送位置。",
      toc: [{ id: "capture", label: "掃描或匯入" }, { id: "sign", label: "放置簽名" }, { id: "review", label: "檢查匯出" }, { id: "send", label: "傳送 PDF" }, { id: "questions", label: "常見問題" }],
      answer: { label: "簡短答案", title: "掃描或匯入檔案，簽名，再檢查匯出的 PDF", steps: ["掃描紙張或將 PDF 匯入 Cam PDF", "修正頁面邊緣，需要時加入文字或日期", "繪製或選擇簽名，放在正確的簽名線上", "匯出 PDF，開啟完成的檔案，確認無誤後再分享"], note: "這裡說的是文件上的簽名標註，不保證所有收件人或合約都把它視為有憑證的電子簽名。" },
      sections: [
        { id: "capture", number: "01", title: "掃描紙張或匯入 PDF", paragraphs: ["如果是紙張，讓手機與表格平行，拍完整四個角並使用均勻光線。如果表格已經是 PDF，請直接匯入，不要截圖，以保留原始頁面尺寸和文字品質。"], cards: [{ label: "拍攝", title: "保持頁面平整", body: "減少陰影，等邊緣穩定後再拍。" }, { label: "修正", title: "檢查裁切", body: "確保簽名線、日期和小標籤仍在頁面內。" }, { label: "整理", title: "先為檔案命名", body: "匯出前使用能說明表格用途的檔名。" }], image: { src: EDITOR_IMAGE, alt: "Cam PDF 頁面修正編輯器", caption: "加入簽名前先修正頁面邊界。" } },
        { id: "sign", number: "02", title: "把簽名放在收件人預期的位置", paragraphs: ["開啟簽名工具，繪製簽名並放在正確的線上。只在需要時調整大小；簽名蓋住姓名、日期、勾選框或見證人欄，可能讓表格無法處理。"], steps: ["放大簽名區域，確保位置準確", "加入簽名並移動它，不要蓋住附近說明", "只在表格要求的位置加入日期或文字", "檢查每一頁，不只是有簽名的頁面"], note: "如果收件人要求憑證、稽核記錄、身分驗證或見證流程，請使用對方指定的簽名服務。Cam PDF 是行動 PDF 工具，不能取代這些要求。" },
        { id: "review", number: "03", title: "傳送前檢查匯出的檔案", paragraphs: ["編輯器預覽和匯出的 PDF 是兩個不同檢查點。儲存檔案，在 PDF 閱讀器中開啟，確認簽名、頁序、文字和方向在匯出後仍然正確。"], cards: [{ label: "內容", title: "檢查每一頁", body: "確保沒有頁面消失，也沒有裁切掉欄位。" }, { label: "簽名", title: "確認位置與大小", body: "查看是否壓住姓名、日期、印章或說明。" }, { label: "輸出", title: "開啟真正的 PDF", body: "檔案能開啟並顯示正確，才算下載成功。" }] },
        { id: "send", number: "04", title: "用合適的隱私與大小設定傳送 PDF", paragraphs: ["選擇清楚的檔名與匯出品質。如果電子郵件或上傳表單有限制，先壓縮 PDF，再開啟檢查。接著使用收件人要求的方式傳送。", "不要為了加入簽名，就把身分、財務、醫療、學校或已簽名文件上傳到無關的線上編輯器。"], note: "需要簽一疊頁面時，先把它們掃描成一份 PDF。想用 QR Code 分享時，列印前先檢查連結權限。" }
      ],
      cta: { title: "不切換 App 也能完成文件", paragraphs: ["Cam PDF 將掃描、頁面編輯、簽名、PDF 匯出、壓縮和分享放在同一個行動工作區。使用普通簽名標註時，傳送前請確認收件人的具體要求。"], image: EXPORT_IMAGE, imageAlt: "Cam PDF 檔名、PDF 格式和品質設定介面" },
      faqTitle: "Android 簽名 PDF 常見問題", faqs: [["可以不列印就簽 PDF 嗎？", "對一般簽名標註，可以匯入或掃描文件，在 App 中加入簽名，匯出 PDF，並在分享前檢查。"], ["手繪簽名等同有憑證的電子簽名嗎？", "不等同。手繪簽名是標註；具體情境可能還需要憑證、身分驗證和稽核記錄。"], ["簽名 PDF 太大怎麼傳送？", "匯出後使用 PDF 壓縮工具，再開啟壓縮副本確認簽名和小字仍然清楚。"]]
    })
  }
};

export const localizedWorkflowHubCards = {
  th: {
    sectionEyebrow: "เลือกงานที่ต้องทำ",
    sectionTitle: "คู่มือสำหรับขั้นตอนเอกสารถัดไป",
    sectionBody: "แต่ละคู่มือมีเจตนาการค้นหาต่างกัน: รวมหน้า แชร์ PDF ด้วย QR Code หรือเซ็นแล้วส่งไฟล์",
    cards: {
      multiPage: { label: "PDF หลายหน้า", body: "ถ่ายเอกสารทั้งชุด ตรวจลำดับ แก้ขอบ และส่งออกไฟล์เดียว", cta: "อ่านคู่มือ PDF หลายหน้า" },
      pdfQr: { label: "แชร์ PDF", body: "เปลี่ยนลิงก์ PDF ที่มั่นคงให้เป็น QR แบบเว็บไซต์จากโทรศัพท์", cta: "อ่านคู่มือ QR Code" },
      scanSign: { label: "เอกสารมีลายเซ็น", body: "วางลายเซ็น ตรวจไฟล์ส่งออก และเลือกช่องทางส่ง", cta: "อ่านคู่มือเซ็น PDF" }
    }
  },
  vi: {
    sectionEyebrow: "Chọn công việc",
    sectionTitle: "Hướng dẫn cho bước tài liệu tiếp theo",
    sectionBody: "Mỗi hướng dẫn giữ một ý định tìm kiếm riêng: gộp trang, chia sẻ PDF bằng QR hoặc ký rồi gửi.",
    cards: {
      multiPage: { label: "PDF nhiều trang", body: "Chụp một chồng giấy, kiểm tra thứ tự, sửa viền và xuất một tệp.", cta: "Đọc hướng dẫn PDF nhiều trang" },
      pdfQr: { label: "Chia sẻ PDF", body: "Biến liên kết PDF ổn định thành QR website ngay trên điện thoại.", cta: "Đọc hướng dẫn QR" },
      scanSign: { label: "Tài liệu cần ký", body: "Đặt chữ ký, kiểm tra tệp xuất và chọn cách gửi.", cta: "Đọc hướng dẫn ký PDF" }
    }
  },
  "zh-CN": {
    sectionEyebrow: "选择任务",
    sectionTitle: "为下一步文档工作准备的指南",
    sectionBody: "每篇指南对应一个独立搜索意图：合并页面、用二维码分享 PDF，或签名后发送。",
    cards: {
      multiPage: { label: "多页 PDF", body: "拍摄整叠文件、检查页序、修正边缘并导出一个文件。", cta: "阅读多页 PDF 指南" },
      pdfQr: { label: "分享 PDF", body: "在手机上把稳定的 PDF 链接变成网站二维码。", cta: "阅读二维码指南" },
      scanSign: { label: "需要签名的文件", body: "放置签名、检查导出结果，再选择发送方式。", cta: "阅读签名 PDF 指南" }
    }
  },
  "zh-TW": {
    sectionEyebrow: "選擇工作",
    sectionTitle: "為下一個文件工作準備的指南",
    sectionBody: "每篇指南對應一個獨立搜尋意圖：合併頁面、用 QR Code 分享 PDF，或簽名後傳送。",
    cards: {
      multiPage: { label: "多頁 PDF", body: "拍攝整疊文件、檢查頁序、修正邊緣並匯出一個檔案。", cta: "閱讀多頁 PDF 指南" },
      pdfQr: { label: "分享 PDF", body: "在手機上把穩定的 PDF 連結變成網站 QR Code。", cta: "閱讀 QR Code 指南" },
      scanSign: { label: "需要簽名的文件", body: "放置簽名、檢查匯出結果，再選擇傳送方式。", cta: "閱讀簽名 PDF 指南" }
    }
  }
};

const APP_PATH = "/Cam_PDF_Scan_Signer_QR-Gen/";

const sourceUrls = {
  camScannerAnnouncement:
    "https://blog.camscanner.com/2022/11/22/camscanner-unlocks-an-advanced-feature-to-american-ios-and-android-users/",
  camScannerStore: "https://apps.apple.com/us/app/camscanner-pdf-scanner-app/id388627783",
  camScannerBilling: "https://www.camscanner.com/question-answer",
  swiftScan:
    "https://swiftscanapp.zendesk.com/hc/en-us/articles/7479476497691-SwiftScan-Pro-Features-by-Account-Type-Android",
  tapScanner: "https://tap.pm/faq/tapscanner/",
  iScanner: "https://iscanner.com/get-support-and-answers/"
};

const sharedSources = sourceUrls;

export const localizedWatermarkGuideContent = {
  th: {
    metaTitle: "วิธีลบลายน้ำ CamScanner ฟรี (คู่มือ 2026)",
    metaDescription:
      "วิธีตรวจสอบตัวเลือกลบลายน้ำ CamScanner ฟรี วิธีแก้ไฟล์เดิมอย่างปลอดภัย และทางเลือกสแกนเอกสารแบบไม่มีลายน้ำบน Android และ iPhone",
    ogDescription: "คำตอบตรงไปตรงมา วิธีที่ปลอดภัย ราคาโดยประมาณ และแอปสแกนเอกสารไม่มีลายน้ำ",
    title: "วิธีลบลายน้ำ CamScanner ฟรี และหลีกเลี่ยงลายน้ำในการสแกนครั้งต่อไป",
    breadcrumbGuide: "คู่มือ",
    breadcrumbCurrent: "ลบลายน้ำ",
    eyebrow: "คู่มือ CAM PDF · ส่งออกเอกสารสะอาด",
    dek:
      "คำตอบจริงอาจไม่ง่ายเหมือนหลายหน้าค้นหา ขั้นแรกให้ตรวจสอบว่าบัญชี CamScanner ของคุณมีตัวเลือกลบลายน้ำฟรีหรือไม่ หากไม่มี ควรรักษาความครบถ้วนของเอกสารก่อนลองครอบตัด แก้ไข หรืออัปโหลดไฟล์ไปยังบริการอื่น",
    published: "เผยแพร่ 7 กันยายน 2026",
    readTime: "อ่านประมาณ 12 นาที",
    heroAlt: "โทรศัพท์สแกนเอกสารและส่งออกเป็น PDF สะอาดโดยไม่มีตราแอปเพิ่ม",
    heroCaption: "วิธีที่ดีที่สุดคือรักษาหน้ากระดาษไว้ครบ ไม่ใช่ปิดทับส่วนหนึ่งของไฟล์เดิม",
    tocLabel: "เนื้อหาในหน้านี้",
    toc: ["คำตอบสั้น ๆ", "ลองใน CamScanner ก่อน", "ไฟล์ PDF หรือรูปเดิม", "สแกนต้นฉบับใหม่", "เปรียบเทียบแอป", "ทางเลือกไฟล์สะอาด", "คำถามที่พบบ่อย", "แหล่งข้อมูล"],
    short: {
      label: "คำตอบสั้น ๆ",
      title: "มองหาตัวเลือกลบลายน้ำที่ถูกต้องก่อนแก้ไขไฟล์",
      steps: [
        "เปิดเอกสารต้นฉบับภายใน CamScanner",
        "ตรวจสอบเมนูเอกสาร การแชร์ หรือหน้าส่งออกว่ามีคำสั่ง Remove watermark หรือไม่",
        "ถ้ามี ให้ใช้คำสั่งนั้นก่อนส่งออก PDF หรือรูปภาพใหม่",
        "ถ้าไม่พบหรือระบบขอให้สมัครสมาชิก จะไม่มีวิธีฟรีในแอปแบบเดียวที่รับรองว่าใช้ได้กับทุกเวอร์ชัน ภูมิภาค และแพ็กเกจ"
      ],
      note: "หากมีเพียงไฟล์ที่ส่งออกแล้ว ให้ทำงานกับสำเนาและเก็บต้นฉบับไว้ หากยังมีกระดาษต้นฉบับ การสแกนใหม่มักเร็วและปลอดภัยกว่าการลบตราออกทีละพิกเซล"
    },
    inApp: {
      title: "ลองใช้ตัวเลือกของ CamScanner ก่อน",
      paragraphs: [
        "CamScanner เคยมีคำสั่งลบลายน้ำในแอป แต่ข้อมูลสาธารณะไม่ได้บอกกติกาเดียวสำหรับผู้ใช้ทุกคน ในปี 2022 บริษัทประกาศให้บัญชี Basic ในสหรัฐฯ แชร์ PDF และ JPEG แบบไม่มีลายน้ำได้บน iOS และ Android ขณะเดียวกันหน้าร้านค้าและข้อมูลสมาชิกยังแสดงแพ็กเกจแบบชำระเงินและสิทธิที่ต่างกันตามแพ็กเกจ",
        "ดังนั้นผู้ใช้สองคนอาจทำตามคลิปเดียวกันแต่เห็นเมนูไม่เหมือนกัน เวอร์ชันแอป ประเทศ ร้านค้า สถานะบัญชี โปรโมชัน และชนิดไฟล์ส่งออกล้วนมีผล"
      ],
      steps: [
        ["เปิดสแกนต้นฉบับ", "ใช้เอกสารใน CamScanner ไม่ใช่ไฟล์บีบอัดที่ส่งต่อมาจากแชต"],
        ["ตรวจสอบเมนูส่งออก", "มองหาคำสั่งลบลายน้ำในเมนูเอกสาร การแชร์ หรือการส่งออก"],
        ["ส่งออกและตรวจสอบ", "เปิดไฟล์ใหม่และตรวจทุกหน้าก่อนนำไปแทนต้นฉบับ"]
      ],
      sourceLabel: "แหล่งข้อมูล",
      sourceText: "ประกาศสำหรับบัญชี Basic ในสหรัฐฯ ของ CamScanner ปี 2022"
    },
    cost: {
      label: "Premium ราคาเท่าไร",
      title: "ราคาขึ้นอยู่กับแพ็กเกจและหน้าร้านค้า",
      paragraphs: [
        "เมื่อตรวจสอบวันที่ 7 กันยายน 2026 หน้าร้าน App Store สหรัฐฯ ของ CamScanner แสดงรายการ Premium และ Plus หลายแบบราว US$4.99–9.99 ต่อเดือน และ US$49.99–69.99 ต่อปี ราคาของคุณอาจต่างออกไปตามประเทศ สกุลเงิน โปรโมชัน และแพ็กเกจที่แสดงตอนชำระเงิน",
        "ตรวจสอบยอดสุดท้ายใน App Store หรือ Google Play ของคุณเสมอ อย่าตัดสินใจสมัครจากราคาในบทความเก่าเพียงอย่างเดียว"
      ],
      sourcesLabel: "แหล่งข้อมูล",
      storeText: "CamScanner บน App Store สหรัฐฯ",
      billingText: "คำถามเกี่ยวกับการชำระเงินของ CamScanner"
    },
    existing: {
      title: "ถ้าคุณมีเพียง PDF หรือรูปที่มีลายน้ำ",
      intro: "ทำสำเนาก่อนแก้ไขไฟล์ การครอบตัดหรือปิดทับส่วนท้ายอาจทำให้เลขหน้า ขอบลายเซ็น กรอบแบบฟอร์ม วันที่ ตราประทับ หรือข้อมูลตรวจสอบหายไป โดยเฉพาะเอกสารสำหรับโรงเรียน งาน ธนาคาร ประกัน สุขภาพ กฎหมาย หรือหน่วยงานรัฐ",
      options: [
        ["ความเสี่ยงต่ำสุด", "ส่งออกจาก CamScanner ใหม่", "เหมาะเมื่อโปรเจกต์ต้นฉบับยังอยู่ในแอปและมีคำสั่งลบลายน้ำ"],
        ["ใช้ด้วยความระวัง", "ครอบตัดเฉพาะขอบว่าง", "ทำเมื่อเครื่องหมายอยู่นอกเนื้อหาเอกสารทั้งหมดและไม่มีข้อมูลขยับ"],
        ["ต้องแลกกับความเป็นส่วนตัว", "อัปโหลดไปยังโปรแกรมออนไลน์", "หลีกเลี่ยงกับไฟล์สำคัญ เพราะบริการอื่นจะได้รับสำเนาเอกสาร"]
      ],
      avoidTitle: "สิ่งที่เราไม่แนะนำ",
      avoid: [
        ["Mod APK โปรแกรมเถื่อน หรือการปลดสมาชิก", "อาจเปิดเผยเอกสารและข้อมูลบัญชี รวมทั้งหลีกเลี่ยงระบบเผยแพร่และชำระเงินของผู้พัฒนา"],
        ["ปิดทับลายน้ำบนเอกสารทางการ", "สี่เหลี่ยมสีขาวอาจบังรายละเอียดข้างเคียงและทำให้ไฟล์ดูเหมือนถูกแก้ไข"],
        ["ใช้ AI เติมภาพใกล้ลายเซ็น ตัวเลข หรือตราประทับ", "ระบบอาจสร้างพิกเซลที่ไม่เคยมีอยู่จริง"]
      ],
      toolBefore: "หากขอบว่างครอบตัดได้อย่างปลอดภัย คุณสามารถใช้",
      organizer: "เครื่องมือจัดลำดับหน้า PDF ฟรี",
      toolBetween: "เพื่อตรวจลำดับหน้า และใช้",
      compressor: "เครื่องมือบีบอัด PDF",
      toolAfter: "เพื่อลดขนาดไฟล์ ห้ามใช้เครื่องมือเหล่านี้เพื่อบิดเบือนความหมายของเอกสาร"
    },
    rescan: {
      title: "ทางเลือกฟรีที่ดีที่สุด: สแกนต้นฉบับใหม่",
      intro: "ถ้ายังมีกระดาษหรือรูปต้นฉบับ การถ่ายใหม่ช่วยเลี่ยงความเสี่ยงจากการแก้ไฟล์ที่ถูกรวมเป็นภาพแล้ว และยังแก้เงา มุมมอง โฟกัส ลำดับหน้า และชื่อไฟล์ได้อีกครั้ง",
      alt: "สามขั้นตอนจากกระดาษต้นฉบับ ผ่านการถ่ายด้วยโทรศัพท์ ไปยัง PDF สะอาด",
      caption: "หน้าต้นฉบับ → ตรวจภาพจากกล้อง → ส่งออก PDF หลายหน้าแบบสะอาด",
      steps: ["วางเอกสารบนพื้นเรียบที่มีสีตัดกันและแสงสม่ำเสมอ", "ถือโทรศัพท์ให้ขนานกับหน้าและเก็บมุมทั้งสี่ให้ครบ", "ตรวจขอบที่ระบบจับ ไม่กดยอมรับการครอบตัดอัตโนมัติทันที", "ตรวจโฟกัส แนวกระดาษ ลำดับหน้า และตำแหน่งลายเซ็น", "ส่งออกเป็นสำเนา เปิดไฟล์ และตรวจทุกหน้าก่อนส่ง"]
    },
    comparison: {
      title: "แอปสแกนใดส่งออกไฟล์แบบไม่มีลายน้ำ",
      intro: "คำว่าแอปฟรีไม่ได้แปลว่าใช้งานไม่จำกัด และคำว่า Premium ลบลายน้ำไม่ได้หมายความว่าค่าสมาชิกจ่ายเพื่อเรื่องนี้อย่างเดียว แพ็กเกจมักรวม OCR ซิงก์คลาวด์ พื้นที่เก็บข้อมูล ฟิลเตอร์ และลายเซ็นด้วย คำถามสำคัญคือเวอร์ชันที่เลือกจะใส่ตราของแอปลงในไฟล์หรือไม่",
      headings: ["แอป", "การส่งออกแบบไม่มีลายน้ำ", "ข้อมูลทางการที่ตรวจสอบได้"],
      rows: [
        ["CamScanner", "ต่างกันตามเวอร์ชัน ประเทศ และข้อเสนอ", "ลองคำสั่ง Remove watermark ในแอปก่อน ประกาศปี 2022 ครอบคลุมบัญชี Basic ในสหรัฐฯ จึงไม่ควรเหมารวมกับทุกบัญชี", "ประกาศ CamScanner", sharedSources.camScannerAnnouncement],
        ["SwiftScan", "ระบุการลบลายน้ำเป็นฟีเจอร์แบบชำระเงิน", "ตารางแพ็กเกจ Android อย่างเป็นทางการใส่ Remove Watermark ไว้ในระดับ VIP และ Plus ไม่ใช่ Basic", "ศูนย์ช่วยเหลือ SwiftScan", sharedSources.swiftScan],
        ["TapScanner", "Premium รวมการลบลายน้ำ", "FAQ ทางการระบุการลบลายน้ำในความสามารถ Premium ซึ่งรวมฟีเจอร์อื่นด้วย", "FAQ TapScanner", sharedSources.tapScanner],
        ["iScanner", "Free และ Pro ไม่ใส่ลายน้ำ iScanner", "iScanner ระบุว่าทั้งสองรุ่นส่งออกโดยไม่มีตราแอป แม้รุ่นฟรีจะมีข้อจำกัดด้านอื่น", "ศูนย์ช่วยเหลือ iScanner", sharedSources.iScanner],
        ["Cam PDF", "ไม่เพิ่มลายน้ำ Cam PDF", "รุ่นฟรีส่งออกไฟล์สะอาด มีบัญชี โฆษณา และโควตาการส่งออกรายสัปดาห์ โดยดูโฆษณาแบบเลือกรับเพื่อเพิ่มการใช้งานได้ ใช้ได้บน Android และ iPhone", "รายละเอียด Cam PDF", APP_PATH]
      ],
      note: "เปรียบเทียบจากข้อมูลผลิตภัณฑ์และศูนย์ช่วยเหลือทางการที่ตรวจเมื่อ 7 กันยายน 2026 ฟีเจอร์และราคาอาจเปลี่ยนได้"
    },
    product: {
      label: "สำหรับเอกสารถัดไป",
      title: "เริ่มด้วยแอปสแกนที่ส่งออกไฟล์สะอาด",
      paragraphs: [
        "Cam PDF Scanner: Sign & QR เป็นผลิตภัณฑ์ของ DJAI ดังนั้นนี่คือทางเลือกของเราเอง ไม่ใช่คำแนะนำจากผู้ประเมินอิสระ แอปใช้ได้บน Android และ iPhone และไม่เพิ่มลายน้ำ Cam PDF ลงในเอกสารที่ส่งออกจากรุ่นฟรี",
        "แอปรวมการสแกนหลายหน้า แก้ขอบ จัดเอกสาร PDF เซ็นชื่อ บีบอัด ตั้งชื่อไฟล์ และเครื่องมือ QR มีบัญชี โฆษณา และโควตาการส่งออกรายสัปดาห์ พร้อมโฆษณาแบบเลือกรับเพื่อเพิ่มการใช้งาน จึงไม่ควรเรียกว่าใช้งานไม่จำกัด"
      ],
      play: "ดาวน์โหลด Cam PDF บน Google Play",
      explore: "ดูรายละเอียด Cam PDF",
      platform: "พร้อมใช้งานบน Android และ iPhone หน้านี้ให้ลิงก์ Android ที่ตรวจสอบแล้ว และจะเพิ่มลิงก์ App Store เมื่อ DJAI มี URL สาธารณะฉบับสุดท้าย",
      imageAlt: "หน้าส่งออก Cam PDF ที่ตั้งชื่อไฟล์ รูปแบบ PDF ขนาดหน้า และคุณภาพได้",
      imageCaption: "หน้าควบคุมการส่งออกจริงใน Cam PDF"
    },
    faqTitle: "คำถามที่พบบ่อย",
    faqs: [
      ["ลบลายน้ำ CamScanner โดยไม่ใช้ Premium ได้ไหม", "บางบัญชีทำได้ ให้ตรวจเมนูเอกสาร แชร์ หรือส่งออกก่อน หากไม่มีคำสั่งหรือเปิดหน้าสมัครสมาชิก เราไม่สามารถรับรองวิธีฟรีในแอปสำหรับทุกเวอร์ชัน ประเทศ และแพ็กเกจได้"],
      ["ลบข้อความ Scanned by CamScanner จาก PDF เดิมได้ไหม", "โปรแกรม PDF อาจครอบตัดได้เมื่อข้อความอยู่ในขอบว่างทั้งหมด แต่ควรเก็บต้นฉบับและตรวจเลขหน้า ลายเซ็น วันที่ ตราประทับ และช่องแบบฟอร์ม เอกสารทางการควรสแกนจากต้นฉบับใหม่"],
      ["ควรใช้เว็บลบลายน้ำออนไลน์ไหม", "ไม่ควรใช้กับเอกสารส่วนตัว การเงิน บัตรประจำตัว งาน โรงเรียน การแพทย์ หรือไฟล์ที่มีลายเซ็น เพราะบริการอื่นจะได้รับสำเนาไฟล์"],
      ["มีแอปสแกนฟรีที่ไม่ใส่ลายน้ำหรือไม่", "Cam PDF และ iScanner ระบุว่าไฟล์ส่งออกฟรีไม่มีตราของแอป แต่ข้อจำกัดด้านอื่นต่างกัน Cam PDF รวมการสแกน จัดหน้า เซ็น บีบอัด และ QR"],
      ["Cam PDF ฟรีและไม่จำกัดจริงไหม", "Cam PDF มีฟีเจอร์เอกสารฟรีและไม่ใส่ลายน้ำ แต่ไม่ได้โฆษณาว่าไม่จำกัด มีบัญชี โฆษณา และโควตาส่งออกรายสัปดาห์"]
    ],
    sources: {
      title: "แหล่งข้อมูลและหมายเหตุจากกองบรรณาธิการ",
      intro: "นโยบายผลิตภัณฑ์และราคาได้รับการตรวจสอบเมื่อ 7 กันยายน 2026 เราเลือกใช้หน้าช่วยเหลือและหน้าร้านทางการ เพราะฟีเจอร์อาจเปลี่ยนตามเวอร์ชันและประเทศ",
      labels: ["CamScanner: ประกาศเรื่องลายน้ำสำหรับ US Basic", "CamScanner: FAQ การชำระเงิน", "CamScanner: App Store สหรัฐฯ และรายการซื้อในแอป", "SwiftScan: ฟีเจอร์ตามแพ็กเกจ Android", "TapScanner: FAQ ทางการ", "iScanner: คำตอบจากศูนย์ช่วยเหลือ"],
      disclaimer: "CamScanner เป็นเครื่องหมายการค้าของเจ้าของที่เกี่ยวข้อง DJAI Academy ไม่มีความเกี่ยวข้องหรือได้รับการรับรองจาก CamScanner หรือแอปบุคคลที่สามในบทความนี้ ใช้วิธีเหล่านี้เฉพาะกับเอกสารที่คุณเป็นเจ้าของหรือมีสิทธิแก้ไข และเก็บสำเนาที่ไม่ถูกแก้ไขเมื่อความแท้จริงของเอกสารมีความสำคัญ"
    },
    footer: { label: "อ่านต่อ", title: "สร้างขั้นตอนจัดการเอกสารบนมือถือที่สะอาดกว่า", hub: "ดูคู่มือ Cam PDF", product: "ดูฟีเจอร์ Cam PDF", privacy: "นโยบายความเป็นส่วนตัว Cam PDF", contact: "ติดต่อฝ่ายช่วยเหลือ Cam PDF" }
  },

  vi: {
    metaTitle: "Cách xóa watermark CamScanner miễn phí (2026)",
    metaDescription: "Kiểm tra cách xóa watermark CamScanner miễn phí, xử lý tệp cũ an toàn và chọn ứng dụng scan không chèn watermark trên Android hoặc iPhone.",
    ogDescription: "Câu trả lời thẳng thắn, lựa chọn an toàn, giá tham khảo và ứng dụng scan không watermark.",
    title: "Cách xóa watermark CamScanner miễn phí và tránh watermark cho lần scan sau",
    breadcrumbGuide: "Hướng dẫn",
    breadcrumbCurrent: "Xóa watermark",
    eyebrow: "HƯỚNG DẪN CAM PDF · XUẤT TÀI LIỆU SẠCH",
    dek: "Câu trả lời thực tế không đơn giản như nhiều kết quả tìm kiếm. Hãy kiểm tra trước xem tài khoản CamScanner của bạn có tùy chọn xóa watermark miễn phí hay không. Nếu không, cần bảo toàn nội dung tài liệu trước khi cắt, chỉnh sửa hoặc tải tệp lên dịch vụ khác.",
    published: "Xuất bản ngày 7 tháng 9, 2026",
    readTime: "12 phút đọc",
    heroAlt: "Điện thoại scan tài liệu và xuất PDF sạch không có dấu ứng dụng thêm vào",
    heroCaption: "Cách sạch nhất là giữ nguyên toàn bộ trang thay vì che một phần tệp đã xuất.",
    tocLabel: "Nội dung",
    toc: ["Câu trả lời ngắn", "Kiểm tra CamScanner trước", "PDF hoặc ảnh đã có", "Scan lại bản gốc", "So sánh ứng dụng", "Giải pháp xuất sạch", "Câu hỏi", "Nguồn"],
    short: {
      label: "Câu trả lời ngắn",
      title: "Tìm đúng tùy chọn xóa watermark trước khi sửa tệp",
      steps: ["Mở tài liệu gốc trong CamScanner", "Kiểm tra menu tài liệu, chia sẻ hoặc xuất tệp để tìm Remove watermark", "Nếu có, dùng tùy chọn đó trước khi tạo PDF hoặc ảnh mới", "Nếu không có hoặc ứng dụng yêu cầu đăng ký, không tồn tại một cách miễn phí trong ứng dụng có thể cam kết cho mọi phiên bản, khu vực và gói"],
      note: "Nếu chỉ còn tệp đã xuất, hãy làm việc trên bản sao và giữ bản gốc. Khi còn giấy hoặc ảnh gốc, scan lại thường nhanh và an toàn hơn việc xóa logo CamScanner từng phần."
    },
    inApp: {
      title: "Thử tùy chọn của CamScanner trước",
      paragraphs: ["CamScanner từng cung cấp thao tác xóa watermark trong ứng dụng, nhưng hướng dẫn công khai không áp dụng một quy tắc cho tất cả người dùng. Năm 2022, CamScanner thông báo tài khoản Basic tại Hoa Kỳ có thể chia sẻ PDF và JPEG không watermark trên iOS và Android. Các trang cửa hàng và thông tin thuê bao vẫn cho thấy tính năng phụ thuộc gói.", "Vì vậy, hai người làm theo cùng một video có thể thấy menu khác nhau. Phiên bản ứng dụng, cửa hàng, trạng thái tài khoản, khu vực, ưu đãi và loại tệp xuất đều có thể ảnh hưởng."],
      steps: [["Mở bản scan nguồn", "Dùng tài liệu trong CamScanner, không dùng bản đã nén qua ứng dụng chat"], ["Kiểm tra thao tác xuất", "Tìm tùy chọn trong menu tài liệu, luồng chia sẻ hoặc cài đặt xuất"], ["Xuất và kiểm tra", "Mở tệp mới và kiểm tra từng trang trước khi thay bản gốc"]],
      sourceLabel: "Nguồn",
      sourceText: "Thông báo năm 2022 của CamScanner dành cho tài khoản Basic tại Hoa Kỳ"
    },
    cost: {
      label: "Premium có giá bao nhiêu",
      title: "Giá phụ thuộc gói và cửa hàng",
      paragraphs: ["Khi kiểm tra ngày 7 tháng 9, 2026, trang CamScanner trên App Store Hoa Kỳ hiển thị nhiều gói Premium và Plus khoảng US$4.99–9.99 mỗi tháng và US$49.99–69.99 mỗi năm. Giá thực tế có thể khác theo quốc gia, tiền tệ, khuyến mãi và gói tại bước thanh toán.", "Hãy xác nhận số tiền cuối cùng trong App Store hoặc Google Play của bạn. Không nên đăng ký chỉ dựa trên mức giá trong một bài viết cũ."],
      sourcesLabel: "Nguồn",
      storeText: "CamScanner trên App Store Hoa Kỳ",
      billingText: "FAQ thanh toán CamScanner"
    },
    existing: {
      title: "Nếu bạn chỉ có PDF hoặc ảnh đã chèn watermark",
      intro: "Hãy tạo bản sao trước khi sửa. Cắt hoặc che phần chân trang có thể làm mất số trang, mép chữ ký, khung biểu mẫu, ngày tháng, con dấu hoặc chi tiết xác minh—đặc biệt nguy hiểm với hồ sơ học tập, việc làm, ngân hàng, bảo hiểm, y tế, pháp lý hoặc hành chính.",
      options: [["Rủi ro thấp nhất", "Xuất lại từ CamScanner", "Tốt nhất khi dự án gốc vẫn còn và tùy chọn xóa watermark khả dụng"], ["Dùng thận trọng", "Chỉ cắt lề trống", "Chỉ phù hợp khi dấu nằm hoàn toàn ngoài tài liệu và không có nội dung bị dịch chuyển"], ["Đánh đổi quyền riêng tư", "Tải lên trình sửa trực tuyến", "Tránh với tệp nhạy cảm vì dịch vụ khác sẽ nhận một bản sao"]],
      avoidTitle: "Những cách chúng tôi không khuyến nghị",
      avoid: [["Mod APK, bản crack hoặc mở khóa thuê bao", "Có thể làm lộ tài liệu và thông tin tài khoản, đồng thời né hệ thống phân phối và thanh toán của nhà phát triển"], ["Che watermark trên tài liệu chính thức", "Một khối màu trắng có thể che chi tiết bên cạnh và khiến tệp trông đã bị sửa"], ["Dùng AI tái tạo gần chữ ký, số hoặc con dấu", "Mô hình có thể tạo ra điểm ảnh chưa từng tồn tại trong bản gốc"]],
      toolBefore: "Nếu việc cắt lề thật sự an toàn, dùng",
      organizer: "công cụ sắp xếp trang PDF miễn phí",
      toolBetween: "để kiểm tra thứ tự trang và",
      compressor: "công cụ nén PDF",
      toolAfter: "để giảm dung lượng. Không dùng các công cụ này để làm sai lệch ý nghĩa tài liệu."
    },
    rescan: {
      title: "Giải pháp miễn phí tốt nhất: scan lại bản gốc",
      intro: "Khi còn giấy hoặc ảnh gốc, chụp lại giúp tránh rủi ro xóa watermark khỏi một tệp đã phẳng. Bạn cũng có thể sửa bóng, phối cảnh, độ nét, thứ tự trang và tên tệp.",
      alt: "Ba bước từ giấy gốc qua chụp bằng điện thoại đến PDF sạch",
      caption: "Trang gốc → kiểm tra ảnh chụp → xuất PDF nhiều trang sạch",
      steps: ["Đặt trang trên bề mặt phẳng, tương phản và đủ sáng", "Giữ điện thoại song song với trang và lấy đủ bốn góc", "Kiểm tra nhận diện cạnh thay vì chấp nhận cắt tự động ngay", "Kiểm tra nét, hướng, thứ tự trang và vị trí chữ ký", "Xuất một bản sao, mở và kiểm tra từng trang trước khi gửi"]
    },
    comparison: {
      title: "Ứng dụng scan nào xuất tệp không watermark",
      intro: "Miễn phí không đồng nghĩa không giới hạn; Premium xóa watermark cũng không có nghĩa phí thuê bao chỉ mua một tính năng. Các gói thường kèm OCR, đồng bộ đám mây, lưu trữ, bộ lọc hoặc ký PDF. Điều cần biết là phiên bản bạn chọn có thêm thương hiệu của ứng dụng vào tệp hay không.",
      headings: ["Ứng dụng", "Xuất không watermark", "Thông tin chính thức hiện tại"],
      rows: [["CamScanner", "Tùy phiên bản, khu vực và ưu đãi", "Thử Remove watermark trong ứng dụng trước. Thông báo năm 2022 áp dụng cho tài khoản Basic tại Hoa Kỳ, không thể suy rộng cho mọi tài khoản.", "Thông báo CamScanner", sharedSources.camScannerAnnouncement], ["SwiftScan", "Xóa watermark được liệt kê là tính năng trả phí", "Bảng gói Android chính thức đặt Remove Watermark ở VIP và Plus thay vì Basic.", "Hỗ trợ SwiftScan", sharedSources.swiftScan], ["TapScanner", "Premium có xóa watermark", "FAQ chính thức liệt kê xóa watermark trong bộ tính năng Premium cùng các tính năng khác.", "FAQ TapScanner", sharedSources.tapScanner], ["iScanner", "Free và Pro không chèn watermark iScanner", "iScanner nói cả hai phiên bản đều xuất không có dấu ứng dụng, dù bản miễn phí có giới hạn khác.", "Hỗ trợ iScanner", sharedSources.iScanner], ["Cam PDF", "Không thêm watermark Cam PDF", "Bản miễn phí xuất tệp sạch; có tài khoản, quảng cáo và giới hạn xuất tệp hằng tuần, có thể xem quảng cáo tự chọn để tăng lượt. Có trên Android và iPhone.", "Chi tiết Cam PDF", APP_PATH]],
      note: "So sánh dựa trên trang sản phẩm và hỗ trợ chính thức được kiểm tra ngày 7 tháng 9, 2026. Tính năng và giá có thể thay đổi."
    },
    product: {
      label: "Cho tài liệu tiếp theo",
      title: "Bắt đầu bằng một ứng dụng scan xuất tệp sạch",
      paragraphs: ["Cam PDF Scanner: Sign & QR là sản phẩm của DJAI, vì vậy đây là giải pháp của chúng tôi chứ không phải đánh giá độc lập. Ứng dụng có trên Android và iPhone và không thêm watermark Cam PDF vào tài liệu xuất từ bản miễn phí.", "Ứng dụng kết hợp scan nhiều trang, sửa cạnh, sắp xếp PDF, ký, nén, đặt tên tệp và công cụ QR. Ứng dụng dùng tài khoản, quảng cáo và giới hạn xuất tệp hằng tuần; quảng cáo có thưởng tùy chọn có thể tăng lượt dùng. Vì vậy chúng tôi không gọi là không giới hạn."],
      play: "Tải Cam PDF trên Google Play",
      explore: "Xem Cam PDF",
      platform: "Có trên Android và iPhone. Trang này cung cấp liên kết Android đã xác minh; liên kết App Store sẽ được thêm khi DJAI có URL công khai cuối cùng.",
      imageAlt: "Màn hình xuất Cam PDF với tên tệp, định dạng PDF, cỡ trang và chất lượng",
      imageCaption: "Điều khiển xuất tệp thật trong Cam PDF"
    },
    faqTitle: "Câu hỏi thường gặp",
    faqs: [["Có thể xóa watermark CamScanner mà không cần Premium không", "Đôi khi. Kiểm tra menu tài liệu, chia sẻ hoặc xuất. Nếu tùy chọn không có hoặc mở màn hình đăng ký, không thể cam kết một cách miễn phí trong ứng dụng cho mọi phiên bản, khu vực và gói."], ["Có thể xóa Scanned by CamScanner khỏi PDF cũ không", "Trình sửa PDF có thể cắt chân trang nếu nó nằm hoàn toàn trong lề trống. Giữ bản gốc và kiểm tra số trang, chữ ký, ngày, con dấu và biểu mẫu. Với hồ sơ chính thức, scan lại an toàn hơn."], ["Có nên dùng website xóa watermark trực tuyến không", "Không nên với tài liệu riêng tư, tài chính, nhận dạng, việc làm, học tập, y tế hoặc có chữ ký vì một dịch vụ khác sẽ nhận bản sao."], ["Ứng dụng scan miễn phí nào không thêm watermark", "Cam PDF và iScanner đều công bố tệp xuất miễn phí không có dấu của ứng dụng, dù giới hạn khác nhau. Cam PDF kết hợp scan, sắp xếp, ký, nén và QR."], ["Cam PDF có thật sự miễn phí và không giới hạn không", "Cam PDF có tính năng tài liệu miễn phí và không thêm watermark, nhưng không được quảng bá là không giới hạn. Ứng dụng có tài khoản, quảng cáo và hạn mức xuất hằng tuần."]],
    sources: {
      title: "Nguồn và ghi chú biên tập",
      intro: "Chính sách sản phẩm và giá cửa hàng được kiểm tra ngày 7 tháng 9, 2026. Chúng tôi ưu tiên trang hỗ trợ và cửa hàng chính thức vì tính năng có thể đổi theo phiên bản và khu vực.",
      labels: ["CamScanner: thông báo watermark cho US Basic", "CamScanner: FAQ thanh toán", "CamScanner: App Store Hoa Kỳ và mua trong ứng dụng", "SwiftScan: tính năng theo gói Android", "TapScanner: FAQ chính thức", "iScanner: câu trả lời hỗ trợ"],
      disclaimer: "CamScanner là nhãn hiệu của chủ sở hữu tương ứng. DJAI Academy không liên kết hoặc được CamScanner hay các ứng dụng bên thứ ba trong bài viết chứng thực. Chỉ áp dụng các cách này cho tài liệu bạn sở hữu hoặc được phép chỉnh sửa, và giữ một bản không chỉnh sửa khi tính xác thực quan trọng."
    },
    footer: { label: "Xem tiếp", title: "Xây dựng quy trình tài liệu di động sạch hơn", hub: "Xem hướng dẫn Cam PDF", product: "Khám phá Cam PDF", privacy: "Quyền riêng tư Cam PDF", contact: "Liên hệ hỗ trợ Cam PDF" }
  },

  "zh-CN": {
    metaTitle: "扫描全能王去水印免费方法（2026 指南）",
    metaDescription: "了解扫描全能王去水印的免费选项、旧 PDF 的安全处理方式，以及 Android 和 iPhone 上不添加应用水印的扫描替代方案。",
    ogDescription: "如实说明可用方法、文档风险、价格参考和无水印扫描应用。",
    title: "扫描全能王去水印：免费方法与下次扫描的无水印方案",
    breadcrumbGuide: "指南",
    breadcrumbCurrent: "去水印",
    eyebrow: "CAM PDF 指南 · 导出干净文档",
    dek: "实际答案没有许多搜索结果说得那么简单。先查看你的 CamScanner（扫描全能王）账户是否提供免费移除水印选项；如果没有，在裁剪、涂抹或上传文件前，应优先保护文档的完整性。",
    published: "发布于 2026 年 9 月 7 日",
    readTime: "约 12 分钟",
    heroAlt: "手机扫描纸质文档并导出不带应用标记的干净 PDF",
    heroCaption: "最稳妥的办法是保留完整页面，而不是遮盖现有文件的一部分。",
    tocLabel: "本文内容",
    toc: ["简短答案", "先检查 CamScanner", "已有 PDF 或图片", "重新扫描原件", "应用对比", "干净导出替代方案", "常见问题", "资料来源"],
    short: { label: "简短答案", title: "编辑文件前，先找正规的移除水印选项", steps: ["在 CamScanner 中打开原始文档", "在文档操作、分享或导出页面查找 Remove watermark（移除水印）", "如果该选项可用，请在导出新 PDF 或图片前使用", "如果没有该选项或系统要求订阅，就不存在一个能保证适用于所有版本、地区和套餐的免费应用内方法"], note: "如果只剩下已导出的文件，请保留原件并在副本上操作。若纸质原件仍在，重新扫描通常比逐像素修补水印更快、更安全。" },
    inApp: { title: "先尝试 CamScanner 自带选项", paragraphs: ["CamScanner 曾提供应用内移除水印操作，但公开说明并没有一条适用于所有用户的规则。2022 年，CamScanner 宣布美国 Basic 账户可在 iOS 和 Android 上分享无水印 PDF 和 JPEG；与此同时，官方商店和订阅信息仍显示功能会随套餐变化。", "因此，两个人照着同一个教程操作，也可能看到不同菜单。应用版本、商店、账户状态、地区、临时优惠和导出类型都可能影响结果。"], steps: [["打开源扫描件", "使用 CamScanner 内的文档，而不是聊天软件压缩过的副本"], ["检查导出操作", "在文档菜单、分享流程或导出设置中查找移除选项"], ["导出并核对", "打开新文件，逐页检查后再替换原件"]], sourceLabel: "来源", sourceText: "CamScanner 2022 年美国 Basic 账户公告" },
    cost: { label: "Premium 多少钱", title: "价格取决于套餐和商店", paragraphs: ["截至 2026 年 9 月 7 日，CamScanner 美国 iPhone 商店页显示多个 Premium 和 Plus 项目，约为每月 US$4.99–9.99、每年 US$49.99–69.99。你看到的价格会因国家、货币、促销和结账套餐而不同。", "请以你自己的 App Store 或 Google Play 结账页面为准，不要仅凭旧文章中的价格订阅。"], sourcesLabel: "来源", storeText: "CamScanner 美国 App Store 页面", billingText: "CamScanner 付费常见问题" },
    existing: { title: "如果只有带水印的 PDF 或图片", intro: "编辑前先复制一份。裁剪或遮盖页脚可能误删页码、签名边缘、表格边框、日期、印章或核验信息，尤其不适合用于学校、求职、银行、保险、医疗、法律或政务材料。", options: [["风险最低", "从 CamScanner 重新导出", "适用于原项目仍在应用中且移除选项可用的情况"], ["谨慎使用", "只裁剪空白边距", "仅当水印完全位于文档内容之外，且不会移动任何内容时才考虑"], ["存在隐私代价", "上传在线编辑器", "敏感文件应避免，因为另一个服务会获得文档副本"]], avoidTitle: "我们不建议的做法", avoid: [["Mod APK、破解版或破解订阅", "可能泄露文档和账户信息，也绕过开发者的分发与支付机制"], ["在正式文件上涂白", "白色方块可能遮挡相邻信息，并让文件看起来被篡改"], ["在签名、数字或印章附近用 AI 补图", "生成式工具可能创造原件中不存在的像素"]], toolBefore: "如果空白边距确实可以安全裁剪，可用免费的", organizer: "PDF 页面排序工具", toolBetween: "检查页序，再用", compressor: "PDF 压缩工具", toolAfter: "减小文件。请勿用这些工具改变或歪曲文档含义。" },
    rescan: { title: "最可靠的免费后备方案：重新扫描原件", intro: "如果纸张或原始图片仍在，重新拍摄可避免从扁平文件中去除水印的不确定性，也能重新处理阴影、透视、清晰度、页序和文件名。", alt: "从纸张原件到手机拍摄再到干净 PDF 的三步流程", caption: "原始页面 → 检查拍摄结果 → 导出干净的多页 PDF", steps: ["把页面放在平整、有色差且光线均匀的表面", "让手机与页面平行，并完整拍下四个角", "检查边缘识别，不要盲目接受自动裁剪", "核对对焦、方向、页序和签名位置", "导出副本，打开并逐页检查后再发送"] },
    comparison: { title: "哪些扫描应用可以无水印导出", intro: "免费不等于不限量，Premium 可去水印也不代表订阅费只购买这一项功能。付费套餐通常还包含 OCR、云同步、存储、滤镜或签名。真正需要确认的是：你选择的版本会不会把应用品牌加到导出文件中。", headings: ["应用", "无水印导出", "当前官方说明"], rows: [["CamScanner", "随版本、地区和优惠而变", "先检查应用内 Remove watermark。2022 年公告仅针对美国 Basic 账户，不能推定所有账户都一样。", "CamScanner 公告", sharedSources.camScannerAnnouncement], ["SwiftScan", "移除水印列为付费功能", "官方 Android 套餐表把 Remove Watermark 放在 VIP 和 Plus，而不是 Basic。", "SwiftScan 支持", sharedSources.swiftScan], ["TapScanner", "Premium 包含移除水印", "官方 FAQ 将去水印列入 Premium 功能组合。", "TapScanner FAQ", sharedSources.tapScanner], ["iScanner", "Free 与 Pro 均不添加 iScanner 水印", "iScanner 表示两种版本都可无应用水印导出，但免费版仍有其他限制。", "iScanner 支持", sharedSources.iScanner], ["Cam PDF", "不添加 Cam PDF 水印", "免费版导出干净文件；需要账户，包含广告和每周导出额度，可通过自愿观看奖励广告增加用量。支持 Android 和 iPhone。", "Cam PDF 详情", APP_PATH]], note: "对比基于截至 2026 年 9 月 7 日的官方产品与支持信息；功能和价格可能变化。" },
      product: { label: "用于下一份文档", title: "从一开始就选择干净导出的扫描应用", paragraphs: ["Cam PDF Scanner: Sign & QR 是 DJAI 自有产品，因此这是我们的替代方案，不是独立测评推荐。它支持 Android 和 iPhone，免费版导出文档时不会添加 Cam PDF 水印。", "应用整合多页扫描、边缘校正、PDF 整理、签名、压缩、文件命名和二维码工具。它需要账户，包含广告和每周导出额度，可选奖励广告能增加用量；因此我们不会把它称为无限使用。"], play: "前往 Google Play 下载 Cam PDF", explore: "了解 Cam PDF", platform: "支持 Android 和 iPhone。本页提供已验证的 Android 商店链接；DJAI 获得最终公开 App Store URL 后再补充 iPhone 链接。Google Play 在部分地区的可用性可能不同。", imageAlt: "Cam PDF 导出页面，可设置文件名、PDF 格式、纸张大小和质量", imageCaption: "Cam PDF 的真实导出控制" },
    faqTitle: "常见问题",
    faqs: [["不用 Premium 能移除 CamScanner 水印吗", "有时可以。先检查文档、分享或导出菜单。如果没有该选项或进入订阅页面，就不能保证存在适用于所有版本、地区和套餐的免费应用内方法。"], ["可以从现有 PDF 中删除 Scanned by CamScanner 吗", "若标记完全位于空白边距，PDF 编辑器可能可以裁剪。务必保留原件并检查页码、签名、日期、印章和表单。正式材料重新扫描更安全。"], ["应不应该使用在线去水印网站", "私密、财务、身份、求职、学校、医疗或签字文件不建议上传，因为另一个服务会获得副本。"], ["哪款免费扫描应用不会添加水印", "Cam PDF 和 iScanner 都表示免费导出不带各自应用水印，但其他限制不同。Cam PDF 还整合扫描、整理、签名、压缩和二维码工具。"], ["Cam PDF 真的免费且不限量吗", "Cam PDF 提供免费文档功能且不添加水印，但不宣传为不限量。它需要账户，包含广告和每周导出额度。"]],
    sources: { title: "资料来源与编辑说明", intro: "产品政策和商店价格于 2026 年 9 月 7 日核查。我们优先引用官方支持页和商店页，因为功能会随版本和地区变化。", labels: ["CamScanner：美国 Basic 去水印公告", "CamScanner：付费常见问题", "CamScanner：美国 App Store 与应用内购买", "SwiftScan：Android 套餐功能", "TapScanner：官方 FAQ", "iScanner：官方支持回答"], disclaimer: "CamScanner 是其权利人的商标。DJAI Academy 与 CamScanner 或本文讨论的其他第三方应用无隶属或背书关系。仅处理你拥有或获准编辑的文档；当真实性重要时，请保留未修改副本。" },
    footer: { label: "继续阅读", title: "建立更干净的移动文档流程", hub: "浏览 Cam PDF 指南", product: "了解 Cam PDF 功能", privacy: "查看 Cam PDF 隐私政策", contact: "联系 Cam PDF 支持" }
  },

  "zh-TW": {
    metaTitle: "CamScanner 去浮水印免費方法（2026 指南）",
    metaDescription: "查看 CamScanner 去浮水印的免費選項、舊 PDF 的安全處理方式，以及 Android 和 iPhone 上不加 App 浮水印的掃描替代方案。",
    ogDescription: "如實說明可用方法、文件風險、價格參考與無浮水印掃描 App。",
    title: "CamScanner 去浮水印：免費方法與下次掃描的無浮水印方案",
    breadcrumbGuide: "指南",
    breadcrumbCurrent: "去浮水印",
    eyebrow: "CAM PDF 指南 · 匯出乾淨文件",
    dek: "實際答案沒有許多搜尋結果說得那麼簡單。先查看你的 CamScanner 帳戶是否提供免費移除浮水印選項；若沒有，在裁切、塗改或上傳檔案前，應先保護文件的完整性。",
    published: "發布於 2026 年 9 月 7 日",
    readTime: "約 12 分鐘",
    heroAlt: "手機掃描紙本文件並匯出不帶 App 標記的乾淨 PDF",
    heroCaption: "最穩妥的方法是保留完整頁面，而不是遮蓋現有檔案的一部分。",
    tocLabel: "本文內容",
    toc: ["簡短答案", "先檢查 CamScanner", "已有 PDF 或圖片", "重新掃描原件", "App 比較", "乾淨匯出替代方案", "常見問題", "資料來源"],
    short: { label: "簡短答案", title: "編輯檔案前，先找正規的移除浮水印選項", steps: ["在 CamScanner 中開啟原始文件", "在文件操作、分享或匯出畫面尋找 Remove watermark", "若選項可用，先使用它再匯出新的 PDF 或圖片", "若沒有此選項或系統要求訂閱，就沒有一個可保證適用所有版本、地區與方案的免費 App 內方法"], note: "若只剩已匯出的檔案，請保留原件並在副本上操作。紙本原件仍在時，重新掃描通常比逐像素修補浮水印更快、更安全。" },
    inApp: { title: "先嘗試 CamScanner 自帶選項", paragraphs: ["CamScanner 曾提供 App 內移除浮水印操作，但公開說明沒有一條適用所有使用者的規則。2022 年，CamScanner 宣布美國 Basic 帳戶可在 iOS 與 Android 分享無浮水印 PDF 和 JPEG；同時，官方商店與訂閱資訊仍顯示功能會隨方案變化。", "因此，兩個人照著同一支教學影片操作，也可能看到不同選單。App 版本、商店、帳戶狀態、地區、優惠與匯出類型都可能影響結果。"], steps: [["開啟來源掃描", "使用 CamScanner 內的文件，而不是通訊軟體壓縮過的副本"], ["檢查匯出操作", "在文件選單、分享流程或匯出設定尋找移除選項"], ["匯出並核對", "開啟新檔案，逐頁檢查後再取代原件"]], sourceLabel: "來源", sourceText: "CamScanner 2022 年美國 Basic 帳戶公告" },
    cost: { label: "Premium 價格", title: "價格取決於方案與商店", paragraphs: ["截至 2026 年 9 月 7 日，CamScanner 美國 iPhone 商店頁顯示多個 Premium 與 Plus 項目，約每月 US$4.99–9.99、每年 US$49.99–69.99。你看到的價格會因國家、貨幣、促銷與結帳方案而不同。", "請以自己的 App Store 或 Google Play 結帳畫面為準，不要只憑舊文章中的價格訂閱。"], sourcesLabel: "來源", storeText: "CamScanner 美國 App Store 頁面", billingText: "CamScanner 付款常見問題" },
    existing: { title: "如果只有帶浮水印的 PDF 或圖片", intro: "編輯前先複製一份。裁切或遮蓋頁尾可能誤刪頁碼、簽名邊緣、表格邊框、日期、印章或驗證資訊，尤其不適合學校、求職、銀行、保險、醫療、法律或政府文件。", options: [["風險最低", "從 CamScanner 重新匯出", "適合原始專案仍在 App 中且移除選項可用的情況"], ["謹慎使用", "只裁切空白邊界", "僅在浮水印完全位於文件內容之外，且不會移動任何內容時考慮"], ["有隱私代價", "上傳線上編輯器", "敏感檔案應避免，因為另一個服務會取得文件副本"]], avoidTitle: "我們不建議的做法", avoid: [["Mod APK、破解版或破解訂閱", "可能洩露文件與帳戶資料，也繞過開發者的散布與付款機制"], ["在正式文件上塗白", "白色方塊可能遮住相鄰資訊，讓檔案看起來被竄改"], ["在簽名、數字或印章附近用 AI 補圖", "生成式工具可能創造原件中不存在的像素"]], toolBefore: "若空白邊界確實能安全裁切，可使用免費的", organizer: "PDF 頁面排序工具", toolBetween: "檢查頁序，再用", compressor: "PDF 壓縮工具", toolAfter: "減少檔案大小。請勿用這些工具改變或扭曲文件含義。" },
    rescan: { title: "最可靠的免費後備方案：重新掃描原件", intro: "若紙張或原始圖片仍在，重新拍攝能避開從扁平檔案移除浮水印的不確定性，也可重新處理陰影、透視、清晰度、頁序與檔名。", alt: "從紙本原件到手機拍攝再到乾淨 PDF 的三步流程", caption: "原始頁面 → 檢查拍攝結果 → 匯出乾淨的多頁 PDF", steps: ["把頁面放在平整、有色差且光線均勻的表面", "讓手機與頁面平行，完整拍下四個角", "檢查邊緣偵測，不要直接接受自動裁切", "核對對焦、方向、頁序與簽名位置", "匯出副本，開啟並逐頁檢查後再傳送"] },
    comparison: { title: "哪些掃描 App 可以無浮水印匯出", intro: "免費不等於不限量；Premium 可去浮水印也不代表訂閱費只買這一項功能。付費方案通常還包含 OCR、雲端同步、儲存、濾鏡或簽名。真正需要確認的是：你選擇的版本會不會把 App 品牌加到匯出檔案。", headings: ["App", "無浮水印匯出", "目前官方說明"], rows: [["CamScanner", "隨版本、地區與優惠而變", "先檢查 App 內 Remove watermark。2022 年公告只針對美國 Basic 帳戶，不能推定所有帳戶都相同。", "CamScanner 公告", sharedSources.camScannerAnnouncement], ["SwiftScan", "移除浮水印列為付費功能", "官方 Android 方案表把 Remove Watermark 放在 VIP 與 Plus，而不是 Basic。", "SwiftScan 支援", sharedSources.swiftScan], ["TapScanner", "Premium 包含移除浮水印", "官方 FAQ 將去浮水印列入 Premium 功能組合。", "TapScanner FAQ", sharedSources.tapScanner], ["iScanner", "Free 與 Pro 都不加 iScanner 浮水印", "iScanner 表示兩個版本均可無 App 浮水印匯出，但免費版仍有其他限制。", "iScanner 支援", sharedSources.iScanner], ["Cam PDF", "不添加 Cam PDF 浮水印", "免費版匯出乾淨檔案；需要帳戶，包含廣告與每週匯出額度，可自願觀看獎勵廣告增加用量。支援 Android 與 iPhone。", "Cam PDF 詳情", APP_PATH]], note: "比較依據為截至 2026 年 9 月 7 日的官方產品與支援資訊；功能與價格可能變更。" },
      product: { label: "用於下一份文件", title: "從一開始就選擇乾淨匯出的掃描 App", paragraphs: ["Cam PDF Scanner: Sign & QR 是 DJAI 自有產品，因此這是我們的替代方案，不是獨立評測推薦。它支援 Android 與 iPhone，免費版匯出文件時不會添加 Cam PDF 浮水印。", "App 整合多頁掃描、邊緣校正、PDF 整理、簽名、壓縮、檔名與 QR Code 工具。它需要帳戶，包含廣告與每週匯出額度，可選獎勵廣告能增加用量；因此我們不把它稱為無限使用。"], play: "前往 Google Play 下載 Cam PDF", explore: "了解 Cam PDF", platform: "支援 Android 與 iPhone。本頁提供已驗證的 Android 商店連結；DJAI 取得最終公開 App Store URL 後再補上 iPhone 連結。", imageAlt: "Cam PDF 匯出畫面，可設定檔名、PDF 格式、紙張大小與品質", imageCaption: "Cam PDF 的實際匯出控制" },
    faqTitle: "常見問題",
    faqs: [["不用 Premium 能移除 CamScanner 浮水印嗎", "有時可以。先檢查文件、分享或匯出選單。若沒有選項或進入訂閱畫面，就不能保證有適用所有版本、地區與方案的免費 App 內方法。"], ["可以從現有 PDF 刪除 Scanned by CamScanner 嗎", "若標記完全位於空白邊界，PDF 編輯器可能能裁切。務必保留原件並核對頁碼、簽名、日期、印章與表單；正式文件重新掃描更安全。"], ["應不應該使用線上去浮水印網站", "私密、財務、身分、求職、學校、醫療或已簽名文件不建議上傳，因為另一個服務會取得副本。"], ["哪款免費掃描 App 不加浮水印", "Cam PDF 與 iScanner 都表示免費匯出不帶各自 App 浮水印，但其他限制不同。Cam PDF 也整合掃描、整理、簽名、壓縮與 QR Code。"], ["Cam PDF 真的免費且不限量嗎", "Cam PDF 提供免費文件功能且不加浮水印，但不宣稱不限量。它需要帳戶，包含廣告與每週匯出額度。"]],
    sources: { title: "資料來源與編輯說明", intro: "產品政策與商店價格於 2026 年 9 月 7 日核對。我們優先引用官方支援頁與商店頁，因為功能會隨版本和地區改變。", labels: ["CamScanner：美國 Basic 去浮水印公告", "CamScanner：付款常見問題", "CamScanner：美國 App Store 與 App 內購買", "SwiftScan：Android 方案功能", "TapScanner：官方 FAQ", "iScanner：官方支援回答"], disclaimer: "CamScanner 是其權利人的商標。DJAI Academy 與 CamScanner 或本文討論的其他第三方 App 沒有隸屬或背書關係。只處理你擁有或獲准編輯的文件；文件真實性重要時，請保留未修改副本。" },
    footer: { label: "繼續閱讀", title: "建立更乾淨的行動文件流程", hub: "瀏覽 Cam PDF 指南", product: "了解 Cam PDF 功能", privacy: "查看 Cam PDF 隱私權政策", contact: "聯絡 Cam PDF 支援" }
  }
};

export const guideSourceUrls = sourceUrls;

export const localizedGuideHubContent = {
  th: { title: "คู่มือ Cam PDF สำหรับการสแกน เซ็น และส่งออกไฟล์สะอาด", description: "คำแนะนำที่ใช้งานได้จริงสำหรับจัดการเอกสารบนมือถือ Android และ iPhone", eyebrow: "ศูนย์คู่มือ CAM PDF", dek: "แก้ปัญหางานเอกสารทีละเรื่อง พร้อมคำอธิบายตรงไปตรงมาเรื่องความเป็นส่วนตัว ค่าใช้จ่าย ข้อจำกัด และการส่งออกแบบไม่มีลายน้ำ Cam PDF", cardLabel: "คู่มือเด่น · 12 นาที", cardTitle: "วิธีลบลายน้ำ CamScanner ฟรี", cardBody: "ตรวจตัวเลือกในแอป วิธีแก้ไฟล์เดิมอย่างปลอดภัย และทางเลือกสำหรับการสแกนครั้งต่อไป", cardCta: "อ่านคู่มือ", productTitle: "ต้องการสแกนไฟล์ใหม่", productBody: "ดูความสามารถของ Cam PDF และดาวน์โหลดเวอร์ชัน Android จาก Google Play", productCta: "ดู Cam PDF", trustTitle: "เอกสารของคุณถูกจัดการอย่างไร", trustBody: "อ่านขอบเขตข้อมูลของเอกสาร บัญชี การวิเคราะห์ โฆษณา และการแชร์", trustCta: "อ่านนโยบายความเป็นส่วนตัว" },
  vi: { title: "Hướng dẫn Cam PDF về scan, ký và xuất tài liệu sạch", description: "Hướng dẫn thực tế cho quy trình tài liệu trên Android và iPhone", eyebrow: "TRUNG TÂM HƯỚNG DẪN CAM PDF", dek: "Giải quyết từng công việc tài liệu với thông tin rõ ràng về quyền riêng tư, chi phí, giới hạn và xuất tệp không có watermark Cam PDF.", cardLabel: "Hướng dẫn nổi bật · 12 phút", cardTitle: "Cách xóa watermark CamScanner miễn phí", cardBody: "Kiểm tra tùy chọn trong ứng dụng, xử lý tệp cũ an toàn và chọn cách scan sạch cho lần sau.", cardCta: "Đọc hướng dẫn", productTitle: "Cần scan tài liệu mới", productBody: "Xem các tính năng Cam PDF và tải phiên bản Android từ Google Play.", productCta: "Xem Cam PDF", trustTitle: "Cách dữ liệu tài liệu được xử lý", trustBody: "Xem ranh giới dữ liệu cho tài liệu, tài khoản, phân tích, quảng cáo và chia sẻ.", trustCta: "Đọc chính sách quyền riêng tư" },
  "zh-CN": { title: "Cam PDF 扫描、签名与干净导出指南", description: "面向 Android 与 iPhone 移动文档流程的实用指南", eyebrow: "CAM PDF 指南中心", dek: "围绕具体文档任务，清楚说明隐私、费用、限制以及不添加 Cam PDF 水印的导出方式。", cardLabel: "精选指南 · 约 12 分钟", cardTitle: "扫描全能王去水印免费方法", cardBody: "先检查应用内选项，再了解旧文件的安全处理方法和下次扫描的干净替代方案。", cardCta: "阅读指南", productTitle: "需要扫描新文件", productBody: "了解 Cam PDF 功能，并通过 Google Play 获取 Android 版本。", productCta: "了解 Cam PDF", trustTitle: "文档数据如何处理", trustBody: "查看文档、账户、分析、广告与分享的数据边界。", trustCta: "阅读隐私政策" },
  "zh-TW": { title: "Cam PDF 掃描、簽名與乾淨匯出指南", description: "適用於 Android 與 iPhone 行動文件流程的實用指南", eyebrow: "CAM PDF 指南中心", dek: "針對具體文件工作，清楚說明隱私、費用、限制以及不添加 Cam PDF 浮水印的匯出方式。", cardLabel: "精選指南 · 約 12 分鐘", cardTitle: "CamScanner 去浮水印免費方法", cardBody: "先檢查 App 內選項，再了解舊檔案的安全處理方式與下次掃描的乾淨替代方案。", cardCta: "閱讀指南", productTitle: "需要掃描新文件", productBody: "了解 Cam PDF 功能，並透過 Google Play 取得 Android 版本。", productCta: "了解 Cam PDF", trustTitle: "文件資料如何處理", trustBody: "查看文件、帳戶、分析、廣告與分享的資料界線。", trustCta: "閱讀隱私權政策" }
};

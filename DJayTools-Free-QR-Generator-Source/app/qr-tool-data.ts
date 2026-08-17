export const QR_BASE_PATH = "/tools/qrgen";

export const qrToolSlugs = [
  "url-qr-code-generator",
  "wifi-qr-code-generator",
  "vcard-qr-code-generator",
  "text-qr-code-generator",
  "email-qr-code-generator",
  "whatsapp-qr-code-generator",
  "qr-code-generator-with-logo"
] as const;

export type QrToolSlug = (typeof qrToolSlugs)[number];
export type QrMode = "url" | "wifi" | "vcard" | "text" | "email" | "whatsapp" | "logo";
export type QrLanguage = "th" | "en" | "vi";

export type QrPageCopy = {
  mode: QrMode;
  title: string;
  description: string;
  keywords: string[];
};

export const qrToolCopy: Record<QrToolSlug, Record<QrLanguage, QrPageCopy>> = {
  "url-qr-code-generator": {
    th: { mode: "url", title: "สร้าง QR Code จากลิงก์ฟรี", description: "สร้าง QR Code จาก URL หรือลิงก์เว็บไซต์ฟรี ปรับสี ลาย กรอบ และดาวน์โหลด PNG หรือ SVG โดยไม่ต้องสมัคร", keywords: ["สร้าง QR Code จากลิงก์", "URL QR Code", "QR Code ฟรี"] },
    en: { mode: "url", title: "Free URL QR Code Generator", description: "Create a QR code for any URL or website link. Customize colors, patterns, and frames, then download PNG or SVG free.", keywords: ["URL QR code generator", "link to QR code", "free QR code"] },
    vi: { mode: "url", title: "Tạo mã QR từ URL miễn phí", description: "Chuyển URL hoặc liên kết website thành mã QR miễn phí. Tùy chỉnh màu, họa tiết và khung rồi tải PNG hoặc SVG, không cần đăng ký.", keywords: ["tạo mã QR từ URL", "chuyển link thành mã QR", "tạo QR miễn phí", "URL sang QR code"] }
  },
  "wifi-qr-code-generator": {
    th: { mode: "wifi", title: "สร้าง Wi-Fi QR Code ฟรี", description: "สร้าง Wi-Fi QR Code จากชื่อเครือข่ายและรหัสผ่าน ให้ผู้ใช้สแกนเพื่อเชื่อมต่อ Wi-Fi ได้ง่ายโดยไม่ต้องพิมพ์รหัส", keywords: ["WiFi QR Code", "สร้าง QR WiFi", "QR รหัส WiFi"] },
    en: { mode: "wifi", title: "Free Wi-Fi QR Code Generator", description: "Create a Wi-Fi QR code from your network name and password so guests can scan and connect without typing credentials.", keywords: ["WiFi QR code generator", "WiFi password QR", "connect WiFi QR"] },
    vi: { mode: "wifi", title: "Tạo mã QR Wi-Fi miễn phí", description: "Tạo mã QR từ tên mạng và mật khẩu để khách quét và kết nối Wi-Fi mà không phải nhập thủ công.", keywords: ["tạo mã QR WiFi", "QR mật khẩu WiFi", "kết nối WiFi bằng QR"] }
  },
  "vcard-qr-code-generator": {
    th: { mode: "vcard", title: "สร้าง vCard QR Code สำหรับนามบัตรฟรี", description: "สร้าง vCard QR Code พร้อมชื่อ เบอร์โทร อีเมล บริษัท และเว็บไซต์ ให้ผู้รับสแกนและบันทึกผู้ติดต่อ", keywords: ["vCard QR Code", "QR นามบัตร", "QR ผู้ติดต่อ"] },
    en: { mode: "vcard", title: "Free vCard QR Code Generator", description: "Create a vCard QR code with a name, phone, email, company, and website so people can save your contact details.", keywords: ["vCard QR code generator", "contact QR code", "digital business card QR"] },
    vi: { mode: "vcard", title: "Tạo mã QR vCard miễn phí", description: "Tạo mã QR danh thiếp với tên, số điện thoại, email, công ty và website để người nhận lưu liên hệ nhanh.", keywords: ["tạo QR vCard", "mã QR danh bạ", "QR danh thiếp điện tử"] }
  },
  "text-qr-code-generator": {
    th: { mode: "text", title: "สร้าง QR Code ข้อความฟรี", description: "เปลี่ยนข้อความ หมายเลข หรือข้อมูลสั้นเป็น QR Code ฟรี ปรับรูปแบบและดาวน์โหลด PNG หรือ SVG", keywords: ["QR Code ข้อความ", "text QR code", "สร้าง QR ฟรี"] },
    en: { mode: "text", title: "Free Text QR Code Generator", description: "Turn text, reference numbers, or short information into a customizable QR code and download PNG or SVG free.", keywords: ["text QR code generator", "convert text to QR", "free QR maker"] },
    vi: { mode: "text", title: "Tạo mã QR từ văn bản miễn phí", description: "Chuyển văn bản, mã tham chiếu hoặc thông tin ngắn thành mã QR tùy chỉnh rồi tải PNG hoặc SVG miễn phí.", keywords: ["tạo QR từ văn bản", "chuyển chữ thành mã QR", "tạo QR miễn phí"] }
  },
  "email-qr-code-generator": {
    th: { mode: "email", title: "สร้าง Email QR Code ฟรี", description: "สร้าง QR Code สำหรับเปิดอีเมลพร้อมผู้รับ หัวข้อ และข้อความที่กรอกไว้ล่วงหน้า เหมาะกับนามบัตรและโปสเตอร์", keywords: ["Email QR Code", "QR ส่งอีเมล", "mailto QR"] },
    en: { mode: "email", title: "Free Email QR Code Generator", description: "Create a QR code that opens an email with a recipient, subject, and optional message already filled in.", keywords: ["email QR code generator", "mailto QR code", "QR code for email"] },
    vi: { mode: "email", title: "Tạo mã QR email miễn phí", description: "Tạo mã QR mở email với người nhận, tiêu đề và nội dung được điền sẵn, phù hợp cho danh thiếp và poster.", keywords: ["tạo QR email", "mã QR mailto", "QR gửi email"] }
  },
  "whatsapp-qr-code-generator": {
    th: { mode: "whatsapp", title: "สร้าง WhatsApp QR Code ฟรี", description: "สร้าง WhatsApp QR Code จากหมายเลขโทรศัพท์และข้อความเริ่มต้น ให้ลูกค้าสแกนเพื่อเปิดแชตได้ทันที", keywords: ["WhatsApp QR Code", "QR เปิดแชต WhatsApp", "WhatsApp link QR"] },
    en: { mode: "whatsapp", title: "Free WhatsApp QR Code Generator", description: "Create a WhatsApp QR code from a phone number and optional starting message so customers can scan and open a chat.", keywords: ["WhatsApp QR code generator", "WhatsApp chat QR", "wa.me QR code"] },
    vi: { mode: "whatsapp", title: "Tạo mã QR WhatsApp miễn phí", description: "Tạo mã QR từ số điện thoại và lời nhắn mở đầu để khách quét và mở cuộc trò chuyện WhatsApp ngay.", keywords: ["tạo QR WhatsApp", "QR chat WhatsApp", "mã QR wa.me"] }
  },
  "qr-code-generator-with-logo": {
    th: { mode: "logo", title: "สร้าง QR Code ใส่โลโก้ฟรี", description: "สร้าง QR Code พร้อมโลโก้ตรงกลาง ปรับสีและรูปแบบ แล้วดาวน์โหลด PNG หรือ SVG ฟรีโดยรูปไม่ถูก upload", keywords: ["QR Code ใส่โลโก้", "QR logo generator", "สร้าง QR แบรนด์"] },
    en: { mode: "logo", title: "Free QR Code Generator with Logo", description: "Create a branded QR code with your logo in the center. Customize and download PNG or SVG without uploading the image.", keywords: ["QR code generator with logo", "branded QR code", "custom logo QR"] },
    vi: { mode: "logo", title: "Tạo mã QR có logo miễn phí", description: "Đặt logo vào giữa mã QR, tùy chỉnh màu và kiểu rồi tải PNG hoặc SVG. Ảnh được xử lý trong trình duyệt và không bị tải lên.", keywords: ["tạo mã QR có logo", "QR thương hiệu", "chèn logo vào QR", "QR không watermark"] }
  }
};

export function qrToolHref(slug: QrToolSlug, language: QrLanguage) {
  return `${QR_BASE_PATH}/${slug}/${language === "th" ? "" : `${language}/`}`;
}

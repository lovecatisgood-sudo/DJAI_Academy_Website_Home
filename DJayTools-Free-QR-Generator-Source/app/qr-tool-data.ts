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
export type QrLanguage = "th" | "en";

export type QrPageCopy = {
  mode: QrMode;
  title: string;
  description: string;
  keywords: string[];
};

export const qrToolCopy: Record<QrToolSlug, Record<QrLanguage, QrPageCopy>> = {
  "url-qr-code-generator": {
    th: { mode: "url", title: "สร้าง QR Code จากลิงก์ฟรี", description: "สร้าง QR Code จาก URL หรือลิงก์เว็บไซต์ฟรี ปรับสี ลาย กรอบ และดาวน์โหลด PNG หรือ SVG โดยไม่ต้องสมัคร", keywords: ["สร้าง QR Code จากลิงก์", "URL QR Code", "QR Code ฟรี"] },
    en: { mode: "url", title: "Free URL QR Code Generator", description: "Create a QR code for any URL or website link. Customize colors, patterns, and frames, then download PNG or SVG free.", keywords: ["URL QR code generator", "link to QR code", "free QR code"] }
  },
  "wifi-qr-code-generator": {
    th: { mode: "wifi", title: "สร้าง Wi-Fi QR Code ฟรี", description: "สร้าง Wi-Fi QR Code จากชื่อเครือข่ายและรหัสผ่าน ให้ผู้ใช้สแกนเพื่อเชื่อมต่อ Wi-Fi ได้ง่ายโดยไม่ต้องพิมพ์รหัส", keywords: ["WiFi QR Code", "สร้าง QR WiFi", "QR รหัส WiFi"] },
    en: { mode: "wifi", title: "Free Wi-Fi QR Code Generator", description: "Create a Wi-Fi QR code from your network name and password so guests can scan and connect without typing credentials.", keywords: ["WiFi QR code generator", "WiFi password QR", "connect WiFi QR"] }
  },
  "vcard-qr-code-generator": {
    th: { mode: "vcard", title: "สร้าง vCard QR Code สำหรับนามบัตรฟรี", description: "สร้าง vCard QR Code พร้อมชื่อ เบอร์โทร อีเมล บริษัท และเว็บไซต์ ให้ผู้รับสแกนและบันทึกผู้ติดต่อ", keywords: ["vCard QR Code", "QR นามบัตร", "QR ผู้ติดต่อ"] },
    en: { mode: "vcard", title: "Free vCard QR Code Generator", description: "Create a vCard QR code with a name, phone, email, company, and website so people can save your contact details.", keywords: ["vCard QR code generator", "contact QR code", "digital business card QR"] }
  },
  "text-qr-code-generator": {
    th: { mode: "text", title: "สร้าง QR Code ข้อความฟรี", description: "เปลี่ยนข้อความ หมายเลข หรือข้อมูลสั้นเป็น QR Code ฟรี ปรับรูปแบบและดาวน์โหลด PNG หรือ SVG", keywords: ["QR Code ข้อความ", "text QR code", "สร้าง QR ฟรี"] },
    en: { mode: "text", title: "Free Text QR Code Generator", description: "Turn text, reference numbers, or short information into a customizable QR code and download PNG or SVG free.", keywords: ["text QR code generator", "convert text to QR", "free QR maker"] }
  },
  "email-qr-code-generator": {
    th: { mode: "email", title: "สร้าง Email QR Code ฟรี", description: "สร้าง QR Code สำหรับเปิดอีเมลพร้อมผู้รับ หัวข้อ และข้อความที่กรอกไว้ล่วงหน้า เหมาะกับนามบัตรและโปสเตอร์", keywords: ["Email QR Code", "QR ส่งอีเมล", "mailto QR"] },
    en: { mode: "email", title: "Free Email QR Code Generator", description: "Create a QR code that opens an email with a recipient, subject, and optional message already filled in.", keywords: ["email QR code generator", "mailto QR code", "QR code for email"] }
  },
  "whatsapp-qr-code-generator": {
    th: { mode: "whatsapp", title: "สร้าง WhatsApp QR Code ฟรี", description: "สร้าง WhatsApp QR Code จากหมายเลขโทรศัพท์และข้อความเริ่มต้น ให้ลูกค้าสแกนเพื่อเปิดแชตได้ทันที", keywords: ["WhatsApp QR Code", "QR เปิดแชต WhatsApp", "WhatsApp link QR"] },
    en: { mode: "whatsapp", title: "Free WhatsApp QR Code Generator", description: "Create a WhatsApp QR code from a phone number and optional starting message so customers can scan and open a chat.", keywords: ["WhatsApp QR code generator", "WhatsApp chat QR", "wa.me QR code"] }
  },
  "qr-code-generator-with-logo": {
    th: { mode: "logo", title: "สร้าง QR Code ใส่โลโก้ฟรี", description: "สร้าง QR Code พร้อมโลโก้ตรงกลาง ปรับสีและรูปแบบ แล้วดาวน์โหลด PNG หรือ SVG ฟรีโดยรูปไม่ถูก upload", keywords: ["QR Code ใส่โลโก้", "QR logo generator", "สร้าง QR แบรนด์"] },
    en: { mode: "logo", title: "Free QR Code Generator with Logo", description: "Create a branded QR code with your logo in the center. Customize and download PNG or SVG without uploading the image.", keywords: ["QR code generator with logo", "branded QR code", "custom logo QR"] }
  }
};

export function qrToolHref(slug: QrToolSlug, language: QrLanguage) {
  return `${QR_BASE_PATH}/${slug}/${language === "en" ? "en/" : ""}`;
}

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
export type QrLanguage = "th" | "en" | "vi" | "zh-CN" | "zh-TW";

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
    vi: { mode: "url", title: "Tạo mã QR từ URL miễn phí", description: "Chuyển URL hoặc liên kết website thành mã QR miễn phí. Tùy chỉnh màu, họa tiết và khung rồi tải PNG hoặc SVG, không cần đăng ký.", keywords: ["tạo mã QR từ URL", "chuyển link thành mã QR", "tạo QR miễn phí", "URL sang QR code"] },
    "zh-CN": { mode: "url", title: "免费网址二维码生成器", description: "把网址或网页链接生成二维码，自定义颜色、样式和边框，并免费下载 PNG 或 SVG，无需注册。", keywords: ["二维码生成器", "网址转二维码", "免费二维码"] },
    "zh-TW": { mode: "url", title: "免費網址 QR Code 產生器", description: "將網址或網頁連結製作成 QR Code，自訂顏色、樣式與外框，免費下載 PNG 或 SVG，不必註冊。", keywords: ["QR Code 產生器", "網址轉 QR Code", "免費 QR Code"] }
  },
  "wifi-qr-code-generator": {
    th: { mode: "wifi", title: "สร้าง Wi-Fi QR Code ฟรี", description: "สร้าง Wi-Fi QR Code จากชื่อเครือข่ายและรหัสผ่าน ให้ผู้ใช้สแกนเพื่อเชื่อมต่อ Wi-Fi ได้ง่ายโดยไม่ต้องพิมพ์รหัส", keywords: ["WiFi QR Code", "สร้าง QR WiFi", "QR รหัส WiFi"] },
    en: { mode: "wifi", title: "Free Wi-Fi QR Code Generator", description: "Create a Wi-Fi QR code from your network name and password so guests can scan and connect without typing credentials.", keywords: ["WiFi QR code generator", "WiFi password QR", "connect WiFi QR"] },
    vi: { mode: "wifi", title: "Tạo mã QR Wi-Fi miễn phí", description: "Tạo mã QR từ tên mạng và mật khẩu để khách quét và kết nối Wi-Fi mà không phải nhập thủ công.", keywords: ["tạo mã QR WiFi", "QR mật khẩu WiFi", "kết nối WiFi bằng QR"] },
    "zh-CN": { mode: "wifi", title: "免费 Wi-Fi 二维码生成器", description: "输入网络名称和密码生成 Wi-Fi 二维码，访客扫描后即可连接，无需手动输入。", keywords: ["WiFi二维码", "无线网密码二维码", "二维码连接WiFi"] },
    "zh-TW": { mode: "wifi", title: "免費 Wi-Fi QR Code 產生器", description: "輸入網路名稱與密碼產生 Wi-Fi QR Code，訪客掃描後即可連線，不必手動輸入。", keywords: ["WiFi QR Code", "WiFi 密碼 QR Code", "掃描連接 WiFi"] }
  },
  "vcard-qr-code-generator": {
    th: { mode: "vcard", title: "สร้าง vCard QR Code สำหรับนามบัตรฟรี", description: "สร้าง vCard QR Code พร้อมชื่อ เบอร์โทร อีเมล บริษัท และเว็บไซต์ ให้ผู้รับสแกนและบันทึกผู้ติดต่อ", keywords: ["vCard QR Code", "QR นามบัตร", "QR ผู้ติดต่อ"] },
    en: { mode: "vcard", title: "Free vCard QR Code Generator", description: "Create a vCard QR code with a name, phone, email, company, and website so people can save your contact details.", keywords: ["vCard QR code generator", "contact QR code", "digital business card QR"] },
    vi: { mode: "vcard", title: "Tạo mã QR vCard miễn phí", description: "Tạo mã QR danh thiếp với tên, số điện thoại, email, công ty và website để người nhận lưu liên hệ nhanh.", keywords: ["tạo QR vCard", "mã QR danh bạ", "QR danh thiếp điện tử"] },
    "zh-CN": { mode: "vcard", title: "免费 vCard 联系人二维码生成器", description: "将姓名、电话、邮箱、公司和网址制作成 vCard 二维码，方便对方扫描保存联系人。", keywords: ["vCard二维码", "联系人二维码", "电子名片二维码"] },
    "zh-TW": { mode: "vcard", title: "免費 vCard 聯絡人 QR Code 產生器", description: "將姓名、電話、電子郵件、公司與網址製作成 vCard QR Code，方便對方掃描儲存聯絡人。", keywords: ["vCard QR Code", "聯絡人 QR Code", "電子名片 QR Code"] }
  },
  "text-qr-code-generator": {
    th: { mode: "text", title: "สร้าง QR Code ข้อความฟรี", description: "เปลี่ยนข้อความ หมายเลข หรือข้อมูลสั้นเป็น QR Code ฟรี ปรับรูปแบบและดาวน์โหลด PNG หรือ SVG", keywords: ["QR Code ข้อความ", "text QR code", "สร้าง QR ฟรี"] },
    en: { mode: "text", title: "Free Text QR Code Generator", description: "Turn text, reference numbers, or short information into a customizable QR code and download PNG or SVG free.", keywords: ["text QR code generator", "convert text to QR", "free QR maker"] },
    vi: { mode: "text", title: "Tạo mã QR từ văn bản miễn phí", description: "Chuyển văn bản, mã tham chiếu hoặc thông tin ngắn thành mã QR tùy chỉnh rồi tải PNG hoặc SVG miễn phí.", keywords: ["tạo QR từ văn bản", "chuyển chữ thành mã QR", "tạo QR miễn phí"] },
    "zh-CN": { mode: "text", title: "免费文本二维码生成器", description: "将文字、编号或简短信息生成可自定义的二维码，并免费下载 PNG 或 SVG。", keywords: ["文字转二维码", "文本二维码生成器", "免费二维码"] },
    "zh-TW": { mode: "text", title: "免費文字 QR Code 產生器", description: "將文字、編號或簡短資訊製作成可自訂的 QR Code，免費下載 PNG 或 SVG。", keywords: ["文字轉 QR Code", "文字 QR Code 產生器", "免費 QR Code"] }
  },
  "email-qr-code-generator": {
    th: { mode: "email", title: "สร้าง Email QR Code ฟรี", description: "สร้าง QR Code สำหรับเปิดอีเมลพร้อมผู้รับ หัวข้อ และข้อความที่กรอกไว้ล่วงหน้า เหมาะกับนามบัตรและโปสเตอร์", keywords: ["Email QR Code", "QR ส่งอีเมล", "mailto QR"] },
    en: { mode: "email", title: "Free Email QR Code Generator", description: "Create a QR code that opens an email with a recipient, subject, and optional message already filled in.", keywords: ["email QR code generator", "mailto QR code", "QR code for email"] },
    vi: { mode: "email", title: "Tạo mã QR email miễn phí", description: "Tạo mã QR mở email với người nhận, tiêu đề và nội dung được điền sẵn, phù hợp cho danh thiếp và poster.", keywords: ["tạo QR email", "mã QR mailto", "QR gửi email"] },
    "zh-CN": { mode: "email", title: "免费电子邮件二维码生成器", description: "生成可打开邮件并预填收件人、主题和正文的二维码，适合名片、海报和客服入口。", keywords: ["邮箱二维码", "邮件二维码生成器", "mailto二维码"] },
    "zh-TW": { mode: "email", title: "免費電子郵件 QR Code 產生器", description: "製作可開啟郵件並預填收件人、主旨與內容的 QR Code，適合名片、海報與客服入口。", keywords: ["Email QR Code", "電子郵件 QR Code", "mailto QR Code"] }
  },
  "whatsapp-qr-code-generator": {
    th: { mode: "whatsapp", title: "สร้าง WhatsApp QR Code ฟรี", description: "สร้าง WhatsApp QR Code จากหมายเลขโทรศัพท์และข้อความเริ่มต้น ให้ลูกค้าสแกนเพื่อเปิดแชตได้ทันที", keywords: ["WhatsApp QR Code", "QR เปิดแชต WhatsApp", "WhatsApp link QR"] },
    en: { mode: "whatsapp", title: "Free WhatsApp QR Code Generator", description: "Create a WhatsApp QR code from a phone number and optional starting message so customers can scan and open a chat.", keywords: ["WhatsApp QR code generator", "WhatsApp chat QR", "wa.me QR code"] },
    vi: { mode: "whatsapp", title: "Tạo mã QR WhatsApp miễn phí", description: "Tạo mã QR từ số điện thoại và lời nhắn mở đầu để khách quét và mở cuộc trò chuyện WhatsApp ngay.", keywords: ["tạo QR WhatsApp", "QR chat WhatsApp", "mã QR wa.me"] },
    "zh-CN": { mode: "whatsapp", title: "免费 WhatsApp 二维码生成器", description: "输入电话号码和预设消息，生成可直接打开 WhatsApp 对话的二维码。", keywords: ["WhatsApp二维码", "WhatsApp聊天二维码", "wa.me二维码"] },
    "zh-TW": { mode: "whatsapp", title: "免費 WhatsApp QR Code 產生器", description: "輸入電話號碼與預設訊息，製作可直接開啟 WhatsApp 對話的 QR Code。", keywords: ["WhatsApp QR Code", "WhatsApp 聊天 QR Code", "wa.me QR Code"] }
  },
  "qr-code-generator-with-logo": {
    th: { mode: "logo", title: "สร้าง QR Code ใส่โลโก้ฟรี", description: "สร้าง QR Code พร้อมโลโก้ตรงกลาง ปรับสีและรูปแบบ แล้วดาวน์โหลด PNG หรือ SVG ฟรีโดยรูปไม่ถูก upload", keywords: ["QR Code ใส่โลโก้", "QR logo generator", "สร้าง QR แบรนด์"] },
    en: { mode: "logo", title: "Free QR Code Generator with Logo", description: "Create a branded QR code with your logo in the center. Customize and download PNG or SVG without uploading the image.", keywords: ["QR code generator with logo", "branded QR code", "custom logo QR"] },
    vi: { mode: "logo", title: "Tạo mã QR có logo miễn phí", description: "Đặt logo vào giữa mã QR, tùy chỉnh màu và kiểu rồi tải PNG hoặc SVG. Ảnh được xử lý trong trình duyệt và không bị tải lên.", keywords: ["tạo mã QR có logo", "QR thương hiệu", "chèn logo vào QR", "QR không watermark"] },
    "zh-CN": { mode: "logo", title: "免费带 Logo 的二维码生成器", description: "把 Logo 放在二维码中央，自定义颜色和样式，再免费下载 PNG 或 SVG；图片仅在浏览器中处理。", keywords: ["带logo二维码", "品牌二维码生成器", "二维码加logo"] },
    "zh-TW": { mode: "logo", title: "免費加入 Logo 的 QR Code 產生器", description: "將 Logo 放在 QR Code 中央，自訂顏色與樣式，再免費下載 PNG 或 SVG；圖片只在瀏覽器中處理。", keywords: ["QR Code 加 Logo", "品牌 QR Code", "Logo QR Code 產生器"] }
  }
};

export function qrToolHref(slug: QrToolSlug, language: QrLanguage) {
  const segment = language === "zh-CN" ? "zh-cn" : language === "zh-TW" ? "zh-tw" : language;
  return `${QR_BASE_PATH}/${slug}/${language === "th" ? "" : `${segment}/`}`;
}

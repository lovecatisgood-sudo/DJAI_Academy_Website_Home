"use client";

import { useEffect, useState } from "react";
import { buildQrPayload, validateQrTask, type QrTaskValues } from "./qr-payload";
import type { QrLanguage, QrMode } from "./qr-tool-data";

const initialValues: QrTaskValues = {
  url: "https://www.djai.academy", text: "DJAI Academy", ssid: "", wifiPassword: "", wifiSecurity: "WPA", hidden: false,
  name: "", phone: "", email: "", company: "", website: "", subject: "", message: ""
};

export default function QrTaskFields({ mode, language, onPayload, onError, onLogo }: { mode: QrMode; language: QrLanguage; onPayload: (value: string) => void; onError: (value: string) => void; onLogo: (value: string) => void }) {
  const [values, setValues] = useState(initialValues);
  const en = language === "en";
  const vi = language === "vi";
  const zhCn = language === "zh-CN";
  const zhTw = language === "zh-TW";
  const chineseLabels: Record<string, [string, string]> = {
    "Website URL": ["网址", "網址"], "Text": ["文本", "文字"], "Network name (SSID)": ["网络名称（SSID）", "網路名稱（SSID）"],
    "Security": ["安全类型", "安全性"], "No password": ["无密码", "無密碼"], "Password": ["密码", "密碼"], "Hidden network": ["隐藏网络", "隱藏網路"],
    "Full name": ["联系人姓名", "聯絡人姓名"], "Phone": ["电话", "電話"], "Email": ["电子邮箱", "電子郵件"], "Company": ["公司", "公司"], "Website": ["网站", "網站"],
    "Recipient email": ["收件人邮箱", "收件人電子郵件"], "Subject": ["主题", "主旨"], "Message": ["正文", "內容"], "Phone with country code": ["含国家区号的电话号码", "含國碼的電話號碼"],
    "Starting message": ["预设消息", "預設訊息"], "Logo image (PNG, JPG, or WebP)": ["Logo 图片（PNG、JPG 或 WebP）", "Logo 圖片（PNG、JPG 或 WebP）"]
  };
  const label = (th: string, enText: string, viText: string) => zhCn ? chineseLabels[enText]?.[0] || enText : zhTw ? chineseLabels[enText]?.[1] || enText : vi ? viText : en ? enText : th;
  const update = <K extends keyof QrTaskValues>(key: K, value: QrTaskValues[K]) => setValues((current) => ({ ...current, [key]: value }));

  useEffect(() => {
    onPayload(buildQrPayload(mode, values));
    const issue = validateQrTask(mode, values);
    const messages: Record<string, string> = zhCn ? {
      url: "请输入有效网址。", text: "请输入要编码的文本。", ssid: "请输入 Wi-Fi 网络名称。", password: "请输入 Wi-Fi 密码。", name: "请输入联系人姓名。", email: "请输入有效的电子邮箱。", phone: "请输入包含国家区号的电话号码。"
    } : zhTw ? {
      url: "請輸入有效網址。", text: "請輸入要編碼的文字。", ssid: "請輸入 Wi-Fi 網路名稱。", password: "請輸入 Wi-Fi 密碼。", name: "請輸入聯絡人姓名。", email: "請輸入有效的電子郵件。", phone: "請輸入包含國碼的電話號碼。"
    } : vi ? {
      url: "Nhập địa chỉ website.", text: "Nhập văn bản cần mã hóa.", ssid: "Nhập tên mạng Wi-Fi.", password: "Nhập mật khẩu Wi-Fi.", name: "Nhập tên liên hệ.", email: "Nhập địa chỉ email hợp lệ.", phone: "Nhập số điện thoại kèm mã quốc gia."
    } : en ? {
      url: "Enter a website address.", text: "Enter text to encode.", ssid: "Enter the Wi-Fi network name.", password: "Enter the Wi-Fi password.", name: "Enter a contact name.", email: "Enter a valid email address.", phone: "Enter a phone number with country code."
    } : {
      url: "กรุณาใส่ลิงก์เว็บไซต์", text: "กรุณาใส่ข้อความ", ssid: "กรุณาใส่ชื่อเครือข่าย Wi-Fi", password: "กรุณาใส่รหัสผ่าน Wi-Fi", name: "กรุณาใส่ชื่อผู้ติดต่อ", email: "กรุณาใส่อีเมลที่ถูกต้อง", phone: "กรุณาใส่เบอร์โทรพร้อมรหัสประเทศ"
    };
    onError(issue ? messages[issue] : "");
  }, [en, vi, zhCn, zhTw, mode, onError, onPayload, values]);

  const field = (label: string, key: keyof QrTaskValues, type = "text", placeholder = "") => (
    <label className="task-field"><span>{label}</span><input type={type} value={String(values[key])} placeholder={placeholder} onChange={(event) => update(key, event.target.value as never)} /></label>
  );

  return (
    <div className="task-fields">
      {(mode === "url" || mode === "logo") && field(label("ลิงก์เว็บไซต์", "Website URL", "URL website"), "url", "url", "https://example.com")}
      {mode === "text" && <label className="task-field"><span>{label("ข้อความ", "Text", "Văn bản")}</span><textarea value={values.text} onChange={(event) => update("text", event.target.value)} rows={4} /></label>}
      {mode === "wifi" && <>
        {field(label("ชื่อเครือข่าย (SSID)", "Network name (SSID)", "Tên mạng (SSID)"), "ssid")}
        <label className="task-field"><span>{label("ความปลอดภัย", "Security", "Bảo mật")}</span><select value={values.wifiSecurity} onChange={(event) => update("wifiSecurity", event.target.value as QrTaskValues["wifiSecurity"])}><option value="WPA">WPA/WPA2/WPA3</option><option value="WEP">WEP</option><option value="nopass">{label("ไม่มีรหัสผ่าน", "No password", "Không có mật khẩu")}</option></select></label>
        {values.wifiSecurity !== "nopass" && field(label("รหัสผ่าน", "Password", "Mật khẩu"), "wifiPassword", "password")}
        <label className="task-check"><input type="checkbox" checked={values.hidden} onChange={(event) => update("hidden", event.target.checked)} /><span>{label("เครือข่ายซ่อนอยู่", "Hidden network", "Mạng ẩn")}</span></label>
      </>}
      {mode === "vcard" && <>{field(label("ชื่อผู้ติดต่อ", "Full name", "Họ và tên"), "name")}{field(label("เบอร์โทร", "Phone", "Số điện thoại"), "phone", "tel")}{field(label("อีเมล", "Email", "Email"), "email", "email")}{field(label("บริษัท", "Company", "Công ty"), "company")}{field(label("เว็บไซต์", "Website", "Website"), "website", "url")}</>}
      {mode === "email" && <>{field(label("อีเมลผู้รับ", "Recipient email", "Email người nhận"), "email", "email")}{field(label("หัวข้อ", "Subject", "Tiêu đề"), "subject")}<label className="task-field"><span>{label("ข้อความ", "Message", "Nội dung")}</span><textarea value={values.message} onChange={(event) => update("message", event.target.value)} rows={3} /></label></>}
      {mode === "whatsapp" && <>{field(label("เบอร์โทรพร้อมรหัสประเทศ", "Phone with country code", "Số điện thoại kèm mã quốc gia"), "phone", "tel", "+84...")}<label className="task-field"><span>{label("ข้อความเริ่มต้น", "Starting message", "Tin nhắn mở đầu")}</span><textarea value={values.message} onChange={(event) => update("message", event.target.value)} rows={3} /></label></>}
      {mode === "logo" && <label className="task-field"><span>{label("รูปโลโก้ (PNG, JPG หรือ WebP)", "Logo image (PNG, JPG, or WebP)", "Ảnh logo (PNG, JPG hoặc WebP)")}</span><input type="file" accept="image/png,image/jpeg,image/webp" onChange={(event) => {
        const file = event.target.files?.[0];
        if (!file) { onLogo(""); return; }
        const reader = new FileReader();
        reader.onload = () => onLogo(typeof reader.result === "string" ? reader.result : "");
        reader.readAsDataURL(file);
      }} /></label>}
    </div>
  );
}

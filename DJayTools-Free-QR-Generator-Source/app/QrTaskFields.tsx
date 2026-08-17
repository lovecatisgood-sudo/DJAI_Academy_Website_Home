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
  const label = (th: string, enText: string, viText: string) => vi ? viText : en ? enText : th;
  const update = <K extends keyof QrTaskValues>(key: K, value: QrTaskValues[K]) => setValues((current) => ({ ...current, [key]: value }));

  useEffect(() => {
    onPayload(buildQrPayload(mode, values));
    const issue = validateQrTask(mode, values);
    const messages: Record<string, string> = vi ? {
      url: "Nhập địa chỉ website.", text: "Nhập văn bản cần mã hóa.", ssid: "Nhập tên mạng Wi-Fi.", password: "Nhập mật khẩu Wi-Fi.", name: "Nhập tên liên hệ.", email: "Nhập địa chỉ email hợp lệ.", phone: "Nhập số điện thoại kèm mã quốc gia."
    } : en ? {
      url: "Enter a website address.", text: "Enter text to encode.", ssid: "Enter the Wi-Fi network name.", password: "Enter the Wi-Fi password.", name: "Enter a contact name.", email: "Enter a valid email address.", phone: "Enter a phone number with country code."
    } : {
      url: "กรุณาใส่ลิงก์เว็บไซต์", text: "กรุณาใส่ข้อความ", ssid: "กรุณาใส่ชื่อเครือข่าย Wi-Fi", password: "กรุณาใส่รหัสผ่าน Wi-Fi", name: "กรุณาใส่ชื่อผู้ติดต่อ", email: "กรุณาใส่อีเมลที่ถูกต้อง", phone: "กรุณาใส่เบอร์โทรพร้อมรหัสประเทศ"
    };
    onError(issue ? messages[issue] : "");
  }, [en, vi, mode, onError, onPayload, values]);

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

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
  const update = <K extends keyof QrTaskValues>(key: K, value: QrTaskValues[K]) => setValues((current) => ({ ...current, [key]: value }));

  useEffect(() => {
    onPayload(buildQrPayload(mode, values));
    const issue = validateQrTask(mode, values);
    const messages: Record<string, string> = en ? {
      url: "Enter a website address.", text: "Enter text to encode.", ssid: "Enter the Wi-Fi network name.", password: "Enter the Wi-Fi password.", name: "Enter a contact name.", email: "Enter a valid email address.", phone: "Enter a phone number with country code."
    } : {
      url: "กรุณาใส่ลิงก์เว็บไซต์", text: "กรุณาใส่ข้อความ", ssid: "กรุณาใส่ชื่อเครือข่าย Wi-Fi", password: "กรุณาใส่รหัสผ่าน Wi-Fi", name: "กรุณาใส่ชื่อผู้ติดต่อ", email: "กรุณาใส่อีเมลที่ถูกต้อง", phone: "กรุณาใส่เบอร์โทรพร้อมรหัสประเทศ"
    };
    onError(issue ? messages[issue] : "");
  }, [en, mode, onError, onPayload, values]);

  const field = (label: string, key: keyof QrTaskValues, type = "text", placeholder = "") => (
    <label className="task-field"><span>{label}</span><input type={type} value={String(values[key])} placeholder={placeholder} onChange={(event) => update(key, event.target.value as never)} /></label>
  );

  return (
    <div className="task-fields">
      {(mode === "url" || mode === "logo") && field(en ? "Website URL" : "ลิงก์เว็บไซต์", "url", "url", "https://example.com")}
      {mode === "text" && <label className="task-field"><span>{en ? "Text" : "ข้อความ"}</span><textarea value={values.text} onChange={(event) => update("text", event.target.value)} rows={4} /></label>}
      {mode === "wifi" && <>
        {field(en ? "Network name (SSID)" : "ชื่อเครือข่าย (SSID)", "ssid")}
        <label className="task-field"><span>{en ? "Security" : "ความปลอดภัย"}</span><select value={values.wifiSecurity} onChange={(event) => update("wifiSecurity", event.target.value as QrTaskValues["wifiSecurity"])}><option value="WPA">WPA/WPA2/WPA3</option><option value="WEP">WEP</option><option value="nopass">{en ? "No password" : "ไม่มีรหัสผ่าน"}</option></select></label>
        {values.wifiSecurity !== "nopass" && field(en ? "Password" : "รหัสผ่าน", "wifiPassword", "password")}
        <label className="task-check"><input type="checkbox" checked={values.hidden} onChange={(event) => update("hidden", event.target.checked)} /><span>{en ? "Hidden network" : "เครือข่ายซ่อนอยู่"}</span></label>
      </>}
      {mode === "vcard" && <>{field(en ? "Full name" : "ชื่อผู้ติดต่อ", "name")}{field(en ? "Phone" : "เบอร์โทร", "phone", "tel")}{field(en ? "Email" : "อีเมล", "email", "email")}{field(en ? "Company" : "บริษัท", "company")}{field(en ? "Website" : "เว็บไซต์", "website", "url")}</>}
      {mode === "email" && <>{field(en ? "Recipient email" : "อีเมลผู้รับ", "email", "email")}{field(en ? "Subject" : "หัวข้อ", "subject")}<label className="task-field"><span>{en ? "Message" : "ข้อความ"}</span><textarea value={values.message} onChange={(event) => update("message", event.target.value)} rows={3} /></label></>}
      {mode === "whatsapp" && <>{field(en ? "Phone with country code" : "เบอร์โทรพร้อมรหัสประเทศ", "phone", "tel", "+66...")}<label className="task-field"><span>{en ? "Starting message" : "ข้อความเริ่มต้น"}</span><textarea value={values.message} onChange={(event) => update("message", event.target.value)} rows={3} /></label></>}
      {mode === "logo" && <label className="task-field"><span>{en ? "Logo image (PNG, JPG, or WebP)" : "รูปโลโก้ (PNG, JPG หรือ WebP)"}</span><input type="file" accept="image/png,image/jpeg,image/webp" onChange={(event) => {
        const file = event.target.files?.[0];
        if (!file) { onLogo(""); return; }
        const reader = new FileReader();
        reader.onload = () => onLogo(typeof reader.result === "string" ? reader.result : "");
        reader.readAsDataURL(file);
      }} /></label>}
    </div>
  );
}

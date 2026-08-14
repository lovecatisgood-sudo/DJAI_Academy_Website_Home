"use client";

import { useState } from "react";
import type { Language } from "./tool-data";

const PROMO_KEY = "djai-tool-promo-last-shown";
const PROMO_TYPE_KEY = "djai-tool-promo-next-type";
const PROMO_INTERVAL_MS = 6 * 60 * 60 * 1000;

type PromoType = "course" | "development";

export function shouldShowToolPromo() {
  try {
    const lastShown = Number(localStorage.getItem(PROMO_KEY) || "0");
    if (Date.now() - lastShown < PROMO_INTERVAL_MS) return null;
    const type = (localStorage.getItem(PROMO_TYPE_KEY) === "development" ? "development" : "course") as PromoType;
    localStorage.setItem(PROMO_KEY, String(Date.now()));
    localStorage.setItem(PROMO_TYPE_KEY, type === "course" ? "development" : "course");
    return type;
  } catch {
    return null;
  }
}

export default function ToolPromoModal({ language, type, onClose }: { language: Language; type: PromoType | null; onClose: () => void }) {
  const [closing, setClosing] = useState(false);
  if (!type) return null;

  const en = language === "en";
  const vi = language === "vi";
  const content = type === "course"
    ? {
      eyebrow: vi ? "Tự xây công cụ" : en ? "Build tools like this" : "สร้างเครื่องมือแบบนี้",
      title: vi ? "Bạn muốn học Vibe Coding cùng DJAI?" : en ? "Want to learn Vibe Coding with DJAI?" : "อยากเรียน Vibe Coding กับ DJAI ไหม?",
      text: vi ? "Học cách biến ý tưởng thành website, ứng dụng và tự động hóa thực tế theo quy trình của DJAI Academy."
        : en
        ? "Learn how to turn ideas into real websites, apps, and automations with a practical DJAI Academy workflow."
        : "เรียนวิธีเปลี่ยนไอเดียให้เป็นเว็บไซต์ แอป และ automation ที่ใช้งานได้จริงผ่าน workflow ของ DJAI Academy",
      href: vi ? "https://www.djai.academy/course/vi/" : en ? "https://www.djai.academy/course/en/" : "https://www.djai.academy/course/",
      cta: vi ? "Khám phá khóa học" : en ? "Explore the course" : "ดูคอร์สเรียน"
    }
    : {
      eyebrow: vi ? "Phát triển chuyên nghiệp" : en ? "Professional development" : "ทีมพัฒนาโปรเจกต์",
      title: vi ? "Cần đội ngũ chuyên nghiệp xây ứng dụng hoặc website?" : en ? "Want to make your app or your own site with professional development team?" : "อยากทำแอปหรือเว็บไซต์ของคุณกับทีมพัฒนามืออาชีพไหม?",
      text: vi ? "DJAI và Siamese Cat Dev xây website, ứng dụng, công cụ nội bộ, hệ thống tự động hóa và AI workflow cho doanh nghiệp."
        : en
        ? "DJAI and Siamese Cat Dev build websites, apps, internal tools, automation systems, and AI workflows for real businesses."
        : "DJAI และ Siamese Cat Dev รับพัฒนาเว็บไซต์ แอป เครื่องมือภายใน automation และ AI workflow สำหรับธุรกิจจริง",
      href: vi ? "https://www.djai.academy/development/vi/" : en ? "https://www.djai.academy/development/en/" : "https://www.djai.academy/development/",
      cta: vi ? "Trao đổi về dự án" : en ? "Discuss development" : "คุยเรื่องพัฒนา"
    };

  function close() {
    setClosing(true);
    window.setTimeout(onClose, 140);
  }

  return (
    <div className={`promo-modal ${closing ? "closing" : ""}`} role="dialog" aria-modal="true" aria-labelledby="tool-promo-title">
      <div className="promo-card">
        <button className="promo-close" type="button" onClick={close} aria-label={vi ? "Đóng ưu đãi" : en ? "Close promotion" : "ปิดโปรโมชัน"}>×</button>
        <p className="eyebrow">{content.eyebrow}</p>
        <h2 id="tool-promo-title">{content.title}</h2>
        <p>{content.text}</p>
        <div className="promo-actions">
          <a href={content.href}>{content.cta}</a>
          <button type="button" onClick={close}>{vi ? "Để sau" : en ? "Maybe later" : "ไว้ทีหลัง"}</button>
        </div>
      </div>
    </div>
  );
}

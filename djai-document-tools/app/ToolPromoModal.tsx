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
  const cn = language === "zh-CN";
  const tw = language === "zh-TW";
  let content = type === "course"
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
      text: vi ? "DJAI và Siamese Cat Dev xây website, ứng dụng, công cụ nội bộ, tự động hóa và AI workflow cho doanh nghiệp."
        : en
        ? "DJAI and Siamese Cat Dev build websites, apps, internal tools, automation systems, and AI workflows for real businesses."
        : "DJAI และ Siamese Cat Dev รับพัฒนาเว็บไซต์ แอป เครื่องมือภายใน automation และ AI workflow สำหรับธุรกิจจริง",
      href: vi ? "https://www.djai.academy/development/vi/" : en ? "https://www.djai.academy/development/en/" : "https://www.djai.academy/development/",
      cta: vi ? "Trao đổi về dự án" : en ? "Discuss development" : "คุยเรื่องพัฒนา"
    };
  if (cn || tw) content = type === "course" ? {
    eyebrow: tw ? "親手打造工具" : "亲手构建工具",
    title: tw ? "想和 DJAI 一起學習 Vibe Coding？" : "想和 DJAI 一起学习 Vibe Coding？",
    text: tw ? "透過 DJAI Academy 的實作流程，把想法做成真正可用的網站、應用程式與自動化。" : "通过 DJAI Academy 的实战流程，把想法做成真正可用的网站、应用和自动化。",
    href: `https://www.djai.academy/course/${tw ? "zh-tw" : "zh-cn"}/`,
    cta: tw ? "查看課程" : "查看课程"
  } : {
    eyebrow: tw ? "專業開發服務" : "专业开发服务",
    title: tw ? "需要專業團隊開發應用程式或網站？" : "需要专业团队开发应用或网站？",
    text: tw ? "DJAI 與 Siamese Cat Dev 為企業打造網站、應用程式、內部工具、自動化與 AI 工作流程。" : "DJAI 与 Siamese Cat Dev 为企业构建网站、应用、内部工具、自动化和 AI 工作流。",
    href: `https://www.djai.academy/development/${tw ? "zh-tw" : "zh-cn"}/`,
    cta: tw ? "洽談開發需求" : "咨询开发需求"
  };

  function close() {
    setClosing(true);
    window.setTimeout(onClose, 140);
  }

  return (
    <div className={`promo-modal ${closing ? "closing" : ""}`} role="dialog" aria-modal="true" aria-labelledby="tool-promo-title">
      <div className="promo-card">
        <button className="promo-close" type="button" onClick={close} aria-label={tw ? "關閉" : cn ? "关闭" : vi ? "Đóng" : en ? "Close promotion" : "ปิดโปรโมชัน"}>×</button>
        <p className="eyebrow">{content.eyebrow}</p>
        <h2 id="tool-promo-title">{content.title}</h2>
        <p>{content.text}</p>
        <div className="promo-actions">
          <a href={content.href}>{content.cta}</a>
          <button type="button" onClick={close}>{tw ? "稍後再說" : cn ? "稍后再说" : vi ? "Để sau" : en ? "Maybe later" : "ไว้ทีหลัง"}</button>
        </div>
      </div>
    </div>
  );
}

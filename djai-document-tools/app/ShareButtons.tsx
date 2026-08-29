"use client";

import { useState } from "react";

export default function ShareButtons({ url, title, language, compact = false }: { url: string; title: string; language: "en" | "th" | "vi" | "zh-CN" | "zh-TW"; compact?: boolean }) {
  const [copied, setCopied] = useState(false);
  const en = language === "en";
  const vi = language === "vi";
  const cn = language === "zh-CN";
  const tw = language === "zh-TW";
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.prompt(tw ? "複製此連結：" : cn ? "复制此链接：" : vi ? "Sao chép liên kết này:" : en ? "Copy this link:" : "คัดลอกลิงก์นี้:", url);
    }
  }

  return (
    <section className={`share-buttons ${compact ? "compact" : ""}`} aria-label={tw ? "分享此工具" : cn ? "分享此工具" : vi ? "Chia sẻ công cụ" : en ? "Share this tool" : "แชร์เครื่องมือนี้"}>
      <span>{tw ? "分享" : cn ? "分享" : vi ? "Chia sẻ" : en ? "Share" : "แชร์"}</span>
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`} target="_blank" rel="noopener noreferrer">Facebook</a>
      <a href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`} target="_blank" rel="noopener noreferrer">X</a>
      <a href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
      <button type="button" onClick={copyLink}>{copied ? (tw ? "已複製" : cn ? "已复制" : vi ? "Đã sao chép" : en ? "Copied" : "คัดลอกแล้ว") : (tw ? "複製連結" : cn ? "复制链接" : vi ? "Sao chép link" : en ? "Copy link" : "คัดลอกลิงก์")}</button>
    </section>
  );
}

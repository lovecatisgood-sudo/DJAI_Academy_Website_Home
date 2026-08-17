"use client";

import { useState } from "react";

export default function ShareButtons({ url, title, language, compact = false }: { url: string; title: string; language: "en" | "th" | "vi"; compact?: boolean }) {
  const [copied, setCopied] = useState(false);
  const en = language === "en";
  const vi = language === "vi";
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.prompt(vi ? "Sao chép liên kết này:" : en ? "Copy this link:" : "คัดลอกลิงก์นี้:", url);
    }
  }

  return (
    <section className={`share-buttons ${compact ? "compact" : ""}`} aria-label={vi ? "Chia sẻ công cụ" : en ? "Share this tool" : "แชร์เครื่องมือนี้"}>
      <span>{vi ? "Chia sẻ" : en ? "Share" : "แชร์"}</span>
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`} target="_blank" rel="noopener noreferrer">Facebook</a>
      <a href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`} target="_blank" rel="noopener noreferrer">X</a>
      <a href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
      <button type="button" onClick={copyLink}>{copied ? (vi ? "Đã sao chép" : en ? "Copied" : "คัดลอกแล้ว") : (vi ? "Sao chép link" : en ? "Copy link" : "คัดลอกลิงก์")}</button>
    </section>
  );
}

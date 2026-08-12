"use client";

import { useState } from "react";

function shareUrls(url, title) {
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(title);
  return {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    x: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
    whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`
  };
}

export default function ShareButtons({ url, title, locale = "en", compact = false }) {
  const [copied, setCopied] = useState(false);
  const en = locale === "en";
  const vi = locale === "vi";
  const labels = {
    title: vi ? "Chia sẻ trang này" : en ? "Share this page" : "แชร์หน้านี้",
    facebook: "Facebook",
    x: "X",
    whatsapp: "WhatsApp",
    copy: copied ? (vi ? "Đã sao chép" : en ? "Copied" : "คัดลอกแล้ว") : (vi ? "Sao chép liên kết" : en ? "Copy link" : "คัดลอกลิงก์")
  };
  const urls = shareUrls(url, title);

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
    <section className={`share-buttons ${compact ? "compact" : ""}`} aria-label={labels.title}>
      <span>{labels.title}</span>
      <a href={urls.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
      <a href={urls.x} target="_blank" rel="noopener noreferrer">X</a>
      <a href={urls.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp</a>
      <button type="button" onClick={copyLink}>{labels.copy}</button>
    </section>
  );
}

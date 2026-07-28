"use client";

import { useState } from "react";

export default function ShareButtons({ url, title, language, compact = false }: { url: string; title: string; language: "en" | "th"; compact?: boolean }) {
  const [copied, setCopied] = useState(false);
  const en = language === "en";
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.prompt(en ? "Copy this link:" : "คัดลอกลิงก์นี้:", url);
    }
  }

  return (
    <section className={`share-buttons ${compact ? "compact" : ""}`} aria-label={en ? "Share this tool" : "แชร์เครื่องมือนี้"}>
      <span>{en ? "Share" : "แชร์"}</span>
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`} target="_blank" rel="noopener noreferrer">Facebook</a>
      <a href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`} target="_blank" rel="noopener noreferrer">X</a>
      <a href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
      <button type="button" onClick={copyLink}>{copied ? (en ? "Copied" : "คัดลอกแล้ว") : (en ? "Copy link" : "คัดลอกลิงก์")}</button>
    </section>
  );
}

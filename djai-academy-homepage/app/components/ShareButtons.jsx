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

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M20.52 3.48A11.85 11.85 0 0 0 12.08 0C5.53 0 .2 5.32.2 11.88c0 2.1.55 4.15 1.6 5.96L.1 23.9l6.2-1.63a11.9 11.9 0 0 0 5.78 1.48h.01c6.55 0 11.88-5.32 11.88-11.87 0-3.17-1.23-6.15-3.45-8.4Zm-8.44 18.22h-.01a9.82 9.82 0 0 1-5.01-1.37l-.36-.21-3.68.97.98-3.58-.23-.37a9.8 9.8 0 0 1-1.5-5.26C2.27 6.47 6.67 2.07 12.08 2.07c2.62 0 5.08 1.02 6.93 2.87a9.75 9.75 0 0 1 2.87 6.94c0 5.41-4.4 9.82-9.8 9.82Zm5.39-7.36c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.74-1.64-2.03-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.05 1.03-1.05 2.5s1.08 2.9 1.23 3.1c.15.2 2.12 3.24 5.14 4.55.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z"
      />
    </svg>
  );
}

function CopyLinkIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect x="7" y="7" width="11" height="11" rx="2" />
      <path d="M15 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
    </svg>
  );
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
      <a
        className="share-control"
        data-network="facebook"
        href={urls.facebook}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={labels.facebook}
        title={labels.facebook}
      >
        <img src="/social/facebook.png" alt="" width="20" height="20" decoding="async" />
      </a>
      <a
        className="share-control"
        data-network="x"
        href={urls.x}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={labels.x}
        title={labels.x}
      >
        <img src="/social/x.png" alt="" width="20" height="20" decoding="async" />
      </a>
      <a
        className="share-control"
        data-network="whatsapp"
        href={urls.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={labels.whatsapp}
        title={labels.whatsapp}
      >
        <WhatsAppIcon />
      </a>
      <button className="share-control" type="button" onClick={copyLink} aria-label={labels.copy} title={labels.copy}>
        <CopyLinkIcon />
      </button>
    </section>
  );
}

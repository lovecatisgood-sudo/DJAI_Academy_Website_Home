"use client";

import { trackSeoEvent } from "./analytics";
import { qrRelatedToolOrder, qrToolCopy, qrToolHref, type QrToolSlug } from "./qr-tool-data";

const CAM_PDF_PLAY_URL = "https://play.google.com/store/apps/details?id=com.djai.campdfscan";
const businessQrTypes = new Set<QrToolSlug>([
  "url-qr-code-generator",
  "vcard-qr-code-generator",
  "email-qr-code-generator",
  "whatsapp-qr-code-generator",
  "qr-code-generator-with-logo"
]);

const copy = {
  th: {
    eyebrow: "ดาวน์โหลดสำเร็จ",
    title: "ทำงาน QR ถัดไปโดยไม่เสียจังหวะ",
    related: "เครื่องมือ QR ที่เกี่ยวข้อง",
    camTitle: "สร้างและสแกน QR บนมือถือพร้อมงานเอกสาร",
    camText: "Cam PDF รวม QR scanner และ generator เข้ากับการสแกนเอกสารและเซ็น PDF ต้องมีบัญชีและมีเงื่อนไขการใช้งาน",
    camCta: "ดาวน์โหลดจาก Google Play",
    devCta: "ต้องการระบบ QR สำหรับธุรกิจ? คุยกับทีมพัฒนา"
  },
  en: {
    eyebrow: "DOWNLOAD COMPLETE",
    title: "Continue the next QR task without losing momentum",
    related: "Related QR tool",
    camTitle: "Create and scan QR codes alongside mobile document work",
    camText: "Cam PDF combines a QR scanner and generator with document scanning and PDF signing. Account and usage conditions apply.",
    camCta: "Download on Google Play",
    devCta: "Need a branded business QR workflow? Discuss development"
  },
  vi: {
    eyebrow: "ĐÃ TẢI XUỐNG",
    title: "Tiếp tục công việc QR tiếp theo",
    related: "Công cụ QR liên quan",
    camTitle: "Tạo và quét QR cùng quy trình tài liệu trên điện thoại",
    camText: "Cam PDF kết hợp quét và tạo QR với quét tài liệu và ký PDF. Cần tài khoản và áp dụng điều kiện sử dụng.",
    camCta: "Tải trên Google Play",
    devCta: "Cần quy trình QR cho doanh nghiệp? Trao đổi với đội phát triển"
  }
} as const;

type PublishedLanguage = "th" | "en" | "vi";

export default function QrSuccessJourney({ language, currentTool, sourcePath }: {
  language: PublishedLanguage;
  currentTool: QrToolSlug;
  sourcePath: string;
}) {
  const text = copy[language];
  const relatedTool = qrRelatedToolOrder[currentTool][0];
  const developmentHref = language === "th" ? "/development/" : `/development/${language}/`;

  return (
    <section className="qr-success-journey" aria-live="polite" aria-labelledby={`qr-success-title-${language}`}>
      <header>
        <span className="step-tag">{text.eyebrow}</span>
        <h2 id={`qr-success-title-${language}`}>{text.title}</h2>
      </header>
      <div className="qr-success-related">
        <small>{text.related}</small>
        <a href={qrToolHref(relatedTool, language)}>
          <strong>{qrToolCopy[relatedTool][language].title}</strong>
          <span>{qrToolCopy[relatedTool][language].description}</span>
        </a>
      </div>
      <div className="qr-success-cam">
        <div className="mobile-app-callout">
          <div className="app-device-mark" aria-hidden="true"><span>▯</span><b>⌁</b></div>
          <div>
            <span className="step-tag">CAM PDF · ANDROID</span>
            <h3>{text.camTitle}</h3>
            <p>{text.camText}</p>
            {businessQrTypes.has(currentTool) && <a className="qr-development-link" href={developmentHref}>{text.devCta}</a>}
          </div>
          <a
            className="primary"
            href={CAM_PDF_PLAY_URL}
            onClick={() => trackSeoEvent("play_store_click", {
              source_path: sourcePath,
              locale: language,
              cluster: "qr",
              tool_slug: currentTool,
              destination_type: "google_play",
              destination_url: CAM_PDF_PLAY_URL
            })}
          >
            {text.camCta} <span>↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}

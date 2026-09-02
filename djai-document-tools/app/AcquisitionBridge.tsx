import { ArrowRight, ScanLine, Smartphone } from "lucide-react";
import type { Category, Language } from "./tool-data";

export default function AcquisitionBridge({ language, category, compact = false }: { language: Language; category: Category; compact?: boolean }) {
  const en = language === "en";
  const vi = language === "vi";
  const developmentHref = vi ? "/development/vi/" : en ? "/development/en/" : "/development/";
  if (category === "document") {
    return <section className={`mobile-app-callout ${compact ? "compact-acquisition" : ""}`} aria-labelledby={`document-acquisition-${language}`} data-acquisition-primary="cam_pdf">
      <div className="app-device-mark"><Smartphone /><ScanLine /></div>
      <div>
        <p className="eyebrow">{vi ? "LÀM TIẾP TRÊN ĐIỆN THOẠI" : en ? "CONTINUE ON ANDROID" : "ทำงานต่อบน ANDROID"}</p>
        <h2 id={`document-acquisition-${language}`}>{vi ? "Cần quét hoặc ký tài liệu mới?" : en ? "Need to scan or sign the next document?" : "ต้องการสแกนหรือเซ็นเอกสารต่อ?"}</h2>
        <p>{vi ? "Cam PDF bổ sung thao tác quét tài liệu, ký PDF và tạo QR trên Android. Ứng dụng cần tài khoản; hạn mức sử dụng và quảng cáo có thể áp dụng." : en ? "Cam PDF adds document scanning, PDF signing, and QR creation on Android. An account is required; usage allowances and ads may apply." : "Cam PDF ช่วยสแกนเอกสาร เซ็น PDF และสร้าง QR บน Android ต้องใช้บัญชี และอาจมีโควตาการใช้งานกับโฆษณา"}</p>
      </div>
      <div className="acquisition-actions">
        <a className="primary-button" href="https://play.google.com/store/apps/details?id=com.djai.campdfscan">{vi ? "Xem trên Google Play" : en ? "View on Google Play" : "ดูบน Google Play"}<ArrowRight /></a>
        <a href={developmentHref}>{vi ? "Tự động hóa quy trình tài liệu" : en ? "Automate a document workflow" : "พัฒนา workflow เอกสาร"}</a>
      </div>
    </section>;
  }
  const service = category === "spreadsheet"
    ? { title: vi ? "Cần dashboard thay cho bảng tính?" : en ? "Need a dashboard instead of spreadsheets?" : "ต้องการ dashboard แทน spreadsheet?", text: vi ? "DJAI xây nền tảng vận hành, CRM, dashboard báo cáo và quy trình dữ liệu tự động." : en ? "DJAI builds operations platforms, CRM systems, reporting dashboards, and automated data workflows." : "DJAI พัฒนาระบบ operation, CRM, dashboard และ workflow ข้อมูลอัตโนมัติ" }
    : { title: vi ? "Đang xây kho kiến thức AI riêng tư?" : en ? "Building a private AI knowledge base?" : "กำลังสร้าง AI knowledge base สำหรับองค์กร?", text: vi ? "DJAI thiết kế RAG riêng tư, chatbot doanh nghiệp, tìm kiếm tài liệu và tự động hóa AI dựa trên dữ liệu thực." : en ? "We design private RAG systems, company chatbots, document search, and AI automation around real business data." : "เราพัฒนา private RAG, chatbot องค์กร, document search และ AI automation จากข้อมูลธุรกิจจริง" };
  return <section className={`service-band ${compact ? "compact-acquisition" : ""}`} data-acquisition-primary="development"><div><p className="eyebrow">{vi ? "XÂY CÙNG DJAI" : en ? "BUILD WITH DJAI" : "พัฒนากับ DJAI"}</p><h2>{service.title}</h2><p>{service.text}</p>{category === "ai" ? <a className="secondary-acquisition-link" href={vi ? "/siamese_cat/dev/courses/vi/" : en ? "/siamese_cat/dev/courses/en/" : "/siamese_cat/dev/courses/"}>{vi ? "Muốn tự học? Xem khóa học AI và vibe coding" : en ? "Want to learn it? Explore AI and vibe-coding courses" : "อยากลงมือเรียนเอง? ดูคอร์ส AI และ vibe coding"}</a> : null}</div><a className="primary-button" href={developmentHref}>{vi ? "Trao đổi về hệ thống" : en ? "Discuss your system" : "คุยเรื่องระบบของคุณ"}<ArrowRight /></a></section>;
}

import type { Metadata } from "next";
import Script from "next/script";
import PromoHeader from "../PromoHeader";

export const metadata: Metadata = {
  title: "Dịch vụ phát triển website và AI Voice Agent | DJAI Academy",
  description:
    "Dịch vụ thiết kế và phát triển website cho doanh nghiệp: technical SEO, giao diện responsive, hosting, AI chatbot và trợ lý tư vấn bằng giọng nói.",
  keywords: [
    "dịch vụ thiết kế website",
    "phát triển website doanh nghiệp",
    "thiết kế landing page",
    "website chuẩn SEO",
    "AI chatbot cho website",
    "AI voice agent",
  ],
  alternates: {
    canonical: "/web_promo/vi/",
    languages: {
      th: "/web_promo/",
      vi: "/web_promo/vi/",
      "x-default": "/web_promo/",
    },
  },
  openGraph: {
    type: "website",
    url: "/web_promo/vi/",
    siteName: "DJAI Academy",
    title: "Xây website để ra mắt, được tìm thấy và tạo khách hàng",
    description:
      "Website doanh nghiệp có technical SEO, giao diện responsive, hosting và lựa chọn tích hợp AI.",
    locale: "vi_VN",
  },
};

export default function VietnameseWebPromoPage() {
  const canonical = "https://www.djai.academy/web_promo/vi/";
  const serviceStructuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Dịch vụ phát triển website DJAI Academy",
    description: "Dịch vụ phát triển website có technical SEO, giao diện responsive, hosting và tích hợp AI.",
    url: canonical,
    mainEntityOfPage: canonical,
    provider: { "@id": "https://www.djai.academy/#organization" },
    availableLanguage: ["Vietnamese"],
    serviceType: "Phát triển website, technical SEO và tích hợp AI",
  };

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: `(function(){try{var s=JSON.parse(localStorage.getItem('djai-web-voucher-v1')||'null');var active=!s||(['new','won','form'].includes(s.stage)&&Number(s.deadline)>Date.now());if(active){document.documentElement.classList.add('voucher-pending');setTimeout(function(){document.documentElement.classList.remove('voucher-pending')},3000)}}catch(e){}})();` }} />
      <PromoHeader initialLocale="vi" />
      <div id="voucher-welcome-root" />
      <main id="app">
        <article>
          <header>
            <p>Dịch vụ phát triển website của DJAI Academy</p>
            <h1>Xây website để ra mắt, được tìm thấy và tạo khách hàng</h1>
            <p>Chọn landing page tập trung vào một mục tiêu, bổ sung trang cho website hiện có, hoặc xây trọn bộ website doanh nghiệp 5 trang. Mỗi gói đều có nền tảng technical SEO, giao diện responsive và hosting.</p>
            <p>DJAI hỗ trợ từ cấu trúc nội dung, thiết kế đến triển khai. Bạn biết rõ giá khởi điểm và phần việc được bao gồm trước khi gửi yêu cầu.</p>
          </header>
          <section aria-labelledby="promo-packages-vi">
            <h2 id="promo-packages-vi">Các gói phát triển website đang áp dụng</h2>
            <ul>
              <li>Landing Page — giá ưu đãi 5.000 THB</li>
              <li>Trang bổ sung — giá ưu đãi 3.000 THB mỗi trang</li>
              <li>Website doanh nghiệp 5 trang — giá ưu đãi 10.000 THB</li>
            </ul>
          </section>
          <section aria-labelledby="promo-voucher-vi">
            <h2 id="promo-voucher-vi">Voucher chào mừng trị giá 10.000 THB</h2>
            <p>Khách truy cập mới có thể mở voucher phát triển website trị giá 10.000 THB và giữ quyền sử dụng trong 4 giờ. Toàn bộ giá trị áp dụng cho gói Complete Website giá gốc 20.000 THB; với gói khác, mức giảm tối đa là 50% giá gốc.</p>
          </section>
          <section aria-labelledby="promo-agent-vi">
            <h2 id="promo-agent-vi">Trao đổi với trợ lý tư vấn bằng giọng nói của DJAI</h2>
            <p>Bạn có thể đặt câu hỏi bằng tiếng Việt. Trợ lý giải thích các gói, giúp xác định lựa chọn phù hợp và ghi nhận thông tin dự án để đội ngũ DJAI liên hệ lại.</p>
          </section>
        </article>
      </main>
      <Script src="/web_promo/assets/js/promo.js" strategy="afterInteractive" />
      <Script src="/web_promo/djai-voice-widget.js" strategy="afterInteractive" data-api-base="/web_promo" data-mode="inline" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceStructuredData) }} />
    </>
  );
}

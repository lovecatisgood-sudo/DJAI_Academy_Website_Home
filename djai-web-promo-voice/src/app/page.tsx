import Script from "next/script";
import PromoHeader from "./PromoHeader";

const serviceStructuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.djai.academy/web_promo/#service",
  name: "DJAI Academy Web Development Service",
  alternateName: "บริการพัฒนาเว็บไซต์ DJAI Academy",
  description:
    "Bilingual web development service with technical SEO, responsive design, hosting, AI chatbot, and an OpenAI Realtime voice sales agent.",
  url: "https://www.djai.academy/web_promo/",
  mainEntityOfPage: "https://www.djai.academy/web_promo/",
  provider: {
    "@id": "https://www.djai.academy/#organization",
  },
  areaServed: "Worldwide",
  availableLanguage: ["Thai", "English"],
  serviceType: "Web development, technical SEO, and AI voice agent integration",
  offers: {
    "@type": "OfferCatalog",
    name: "Web development promotional packages",
    itemListElement: [
      { "@type": "Offer", name: "Landing Page", price: "5000", priceCurrency: "THB" },
      { "@type": "Offer", name: "Additional Page", price: "3000", priceCurrency: "THB" },
      { "@type": "Offer", name: "Complete Website", price: "10000", priceCurrency: "THB" },
    ],
  },
};

type PromoLocale = "th" | "vi";

const serverCopy = {
  th: {
    eyebrow: "DJAI Academy Web Development Service",
    title: "บริการพัฒนาเว็บไซต์ พร้อมเปิดตัว ติดอันดับ และสร้างลูกค้า",
    intro: "Choose a high-converting landing page, additional business page, or complete five-page website with technical SEO, responsive design, hosting, and bilingual Thai-English support.",
    localIntro: "บริการพัฒนาเว็บไซต์สำหรับธุรกิจ พร้อมโครงสร้าง Technical SEO ดีไซน์รองรับมือถือ โฮสติ้ง และการสนับสนุนทั้งภาษาไทยและอังกฤษ",
    packagesTitle: "Web development promotional packages",
    packages: ["Landing Page — 5,000 THB promotional price", "Additional Page — 3,000 THB promotional price", "Complete five-page business website — 10,000 THB promotional price"],
    voucherTitle: "Guaranteed 10,000 THB welcome voucher",
    voucher: "New visitors can reveal a guaranteed 10,000 THB web-development voucher and reserve it for four hours. The full value applies to the 20,000 THB Complete Website package. Discounts on other packages are capped at 50% of their standard price.",
    agentTitle: "Talk to the DJAI AI voice sales agent",
    agent: "Ask questions in Thai or English. The OpenAI Realtime voice agent can explain packages, identify a suitable service, and collect project details for human follow-up.",
  },
  vi: {
    eyebrow: "Dịch vụ phát triển website của DJAI Academy",
    title: "Xây website để ra mắt, được tìm thấy và tạo khách hàng",
    intro: "Chọn landing page tập trung vào một mục tiêu, bổ sung trang cho website hiện có, hoặc xây trọn bộ website doanh nghiệp 5 trang. Mỗi gói đều có nền tảng technical SEO, giao diện responsive và hosting.",
    localIntro: "DJAI hỗ trợ từ cấu trúc nội dung, thiết kế đến triển khai. Bạn biết rõ giá khởi điểm và phần việc được bao gồm trước khi gửi yêu cầu.",
    packagesTitle: "Các gói phát triển website đang áp dụng",
    packages: ["Landing Page — giá ưu đãi 5.000 THB", "Trang bổ sung — giá ưu đãi 3.000 THB mỗi trang", "Website doanh nghiệp 5 trang — giá ưu đãi 10.000 THB"],
    voucherTitle: "Voucher chào mừng trị giá 10.000 THB",
    voucher: "Khách truy cập mới có thể mở voucher phát triển website trị giá 10.000 THB và giữ quyền sử dụng trong 4 giờ. Toàn bộ giá trị áp dụng cho gói Complete Website giá gốc 20.000 THB; với gói khác, mức giảm tối đa là 50% giá gốc.",
    agentTitle: "Trao đổi với trợ lý tư vấn bằng giọng nói của DJAI",
    agent: "Bạn có thể đặt câu hỏi bằng tiếng Việt. Trợ lý giải thích các gói, giúp xác định lựa chọn phù hợp và ghi nhận thông tin dự án để đội ngũ DJAI liên hệ lại.",
  },
} as const;

export default function Home() {
  const locale: PromoLocale = "th";
  const copy = serverCopy[locale];
  const canonical = "https://www.djai.academy/web_promo/";
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){try{var s=JSON.parse(localStorage.getItem('djai-web-voucher-v1')||'null');var active=!s||(['new','won','form'].includes(s.stage)&&Number(s.deadline)>Date.now());if(active){document.documentElement.classList.add('voucher-pending');setTimeout(function(){document.documentElement.classList.remove('voucher-pending')},3000)}}catch(e){}})();`,
        }}
      />
      <PromoHeader initialLocale={locale} />
      <div id="voucher-welcome-root" />
      <main id="app">
        <article>
          <header>
            <p>{copy.eyebrow}</p>
            <h1>{copy.title}</h1>
            <p>{copy.intro}</p>
            <p lang={locale}>{copy.localIntro}</p>
          </header>
          <section aria-labelledby="promo-packages">
            <h2 id="promo-packages">{copy.packagesTitle}</h2>
            <ul>
              {copy.packages.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </section>
          <section aria-labelledby="promo-voucher">
            <h2 id="promo-voucher">{copy.voucherTitle}</h2>
            <p>{copy.voucher}</p>
          </section>
          <section aria-labelledby="promo-ai-agent">
            <h2 id="promo-ai-agent">{copy.agentTitle}</h2>
            <p>{copy.agent}</p>
          </section>
        </article>
      </main>
      <Script src="/web_promo/assets/js/promo.js" strategy="afterInteractive" />
      <Script
        src="/web_promo/djai-voice-widget.js"
        strategy="afterInteractive"
        data-api-base="/web_promo"
        data-mode="inline"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({ ...serviceStructuredData, url: canonical, mainEntityOfPage: canonical, availableLanguage: ["Thai", "English"] }) }}
      />
    </>
  );
}

const origin = "https://www.djai.academy";
const path = "/web_promo/vi";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${origin}${path}#service`,
  name: "Dịch vụ phát triển website DJAI Academy",
  description: "Dịch vụ phát triển website với SEO kỹ thuật, thiết kế responsive, hosting, chatbot AI và tùy chọn voice sales agent.",
  url: `${origin}${path}`,
  mainEntityOfPage: `${origin}${path}`,
  provider: { "@type": "Organization", name: "DJAI Academy", url: `${origin}/` },
  areaServed: "Worldwide",
  availableLanguage: ["Thai", "English", "Vietnamese"],
  serviceType: "Phát triển website, SEO kỹ thuật và tích hợp AI",
  offers: { "@type": "OfferCatalog", name: "Gói khuyến mãi phát triển website", itemListElement: [
    { "@type": "Offer", name: "Landing Page", price: "5000", priceCurrency: "THB" },
    { "@type": "Offer", name: "Trang bổ sung", price: "3000", priceCurrency: "THB" },
    { "@type": "Offer", name: "Website hoàn chỉnh", price: "10000", priceCurrency: "THB" }
  ] }
};

const html = `<!doctype html>
<html lang="vi"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Khuyến mãi phát triển website và tích hợp AI | DJAI</title>
<meta name="description" content="Dịch vụ phát triển website cho doanh nghiệp với SEO kỹ thuật, responsive, hosting, chatbot AI và tùy chọn voice sales agent từ DJAI Academy.">
<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1">
<link rel="canonical" href="${origin}${path}">
<link rel="alternate" hreflang="th" href="${origin}/web_promo/">
<link rel="alternate" hreflang="vi" href="${origin}${path}">
<link rel="alternate" hreflang="x-default" href="${origin}/web_promo/">
<meta property="og:type" content="website"><meta property="og:site_name" content="DJAI Academy"><meta property="og:locale" content="vi_VN">
<meta property="og:title" content="Phát triển website và tích hợp AI | DJAI"><meta property="og:description" content="Website doanh nghiệp có SEO kỹ thuật, responsive, hosting và tùy chọn AI."><meta property="og:url" content="${origin}${path}"><meta property="og:image" content="${origin}/social/djai-academy.webp">
<link rel="icon" href="/web_promo/assets/icons/favicon.svg"><link rel="stylesheet" href="/web_promo/assets/css/styles.css">
<style>body{background:#050914;color:#eef6ff;font-family:Manrope,Arial,sans-serif;margin:0}.vi-page{max-width:1120px;margin:auto;padding:24px}.vi-nav{display:flex;align-items:center;justify-content:space-between;padding:8px 0 44px}.vi-nav img{width:150px;height:auto}.vi-nav div{display:flex;gap:18px;flex-wrap:wrap}.vi-nav a{color:#c9dcf4;text-decoration:none}.vi-hero{padding:72px 0 56px;max-width:900px}.vi-kicker{color:#5ee7ff;font-weight:800;letter-spacing:.14em;text-transform:uppercase}.vi-hero h1{font-size:clamp(2.4rem,7vw,5.8rem);line-height:.98;margin:18px 0}.vi-lead{font-size:1.2rem;line-height:1.75;color:#c7d5e9}.vi-actions{display:flex;gap:14px;flex-wrap:wrap;margin-top:28px}.vi-button{display:inline-block;padding:14px 20px;border-radius:12px;background:#2d8cff;color:white;text-decoration:none;font-weight:800}.vi-button.alt{background:transparent;border:1px solid #52708f}.vi-section{padding:56px 0;border-top:1px solid #213249}.vi-section h2{font-size:clamp(1.8rem,4vw,3rem);margin:10px 0 16px}.vi-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}.vi-card{background:#0b1425;border:1px solid #203653;border-radius:18px;padding:24px}.vi-card strong{font-size:1.25rem}.vi-card b{display:block;color:#5ee7ff;font-size:1.5rem;margin:12px 0}.vi-card p,.vi-section>p,.vi-list{color:#b9c9dd;line-height:1.7}.vi-note{background:#111d31;border-left:4px solid #ff9d42;padding:20px;border-radius:8px}.vi-footer{padding:44px 0;color:#8fa5be;border-top:1px solid #213249}@media(max-width:760px){.vi-grid{grid-template-columns:1fr}.vi-nav{align-items:flex-start;gap:20px;flex-direction:column}.vi-hero{padding-top:30px}}</style>
<script type="application/ld+json">${JSON.stringify(structuredData)}</script>
</head><body><main class="vi-page">
<nav class="vi-nav" aria-label="Điều hướng DJAI"><a href="/vi/"><img src="/djai-logo-small.webp" alt="DJAI Academy"></a><div><a href="/service/vi/">Dịch vụ</a><a href="/portfolio/vi/">Dự án</a><a href="/tools/vi/">Công cụ</a><a href="/web_promo/" hreflang="th">ไทย / English</a></div></nav>
<section class="vi-hero"><p class="vi-kicker">DJAI Academy · Phát triển website</p><h1>Website sẵn sàng ra mắt, được tìm thấy và tạo khách hàng.</h1><p class="vi-lead">Chọn landing page, trang kinh doanh bổ sung hoặc website năm trang với SEO kỹ thuật, thiết kế responsive và hosting. Phạm vi được xác nhận trước khi bắt đầu để giá, nội dung và tích hợp phù hợp với nhu cầu thật.</p><div class="vi-actions"><a class="vi-button" href="mailto:contact@djai.academy?subject=Vietnamese%20website%20project">Trao đổi về dự án</a><a class="vi-button alt" href="#packages">Xem gói dịch vụ</a></div></section>
<section class="vi-section" id="packages"><p class="vi-kicker">Gói khuyến mãi</p><h2>Giá công khai, phạm vi rõ ràng.</h2><div class="vi-grid"><article class="vi-card"><strong>Landing Page</strong><b>5.000 THB</b><p>Một trang tập trung vào một đề nghị, chiến dịch hoặc dịch vụ.</p></article><article class="vi-card"><strong>Trang bổ sung</strong><b>3.000 THB</b><p>Thêm một trang riêng vào phạm vi website hiện có.</p></article><article class="vi-card"><strong>Website hoàn chỉnh</strong><b>10.000 THB</b><p>Website doanh nghiệp năm trang theo mức giá khuyến mãi hiển thị.</p></article></div><p class="vi-note">Giá trên là giá khuyến mãi được công bố trên trang này. Phạm vi tùy chỉnh, nội dung, tích hợp và thời gian giao được xác nhận bởi con người trước khi ký kết.</p></section>
<section class="vi-section"><p class="vi-kicker">Nội dung bàn giao</p><h2>Nền tảng cần thiết để website hoạt động sau ngày ra mắt.</h2><ul class="vi-list"><li>Cấu trúc responsive cho điện thoại, tablet và desktop.</li><li>Metadata, canonical, sitemap và nền tảng SEO kỹ thuật.</li><li>Hosting và quy trình triển khai được thống nhất theo phạm vi.</li><li>Luồng liên hệ hoặc thu thập lead phù hợp với mục tiêu kinh doanh.</li><li>Tùy chọn chatbot AI hoặc voice sales agent sau khi đánh giá nhu cầu, ngôn ngữ và chi phí vận hành.</li></ul></section>
<section class="vi-section"><p class="vi-kicker">AI có giới hạn rõ ràng</p><h2>Voice agent không thay thế việc xác nhận của con người.</h2><p>Voice agent đang hoạt động trên trang chính hỗ trợ tiếng Thái và tiếng Anh. Nó chỉ trình bày giá và nội dung dịch vụ từ tài liệu đã được DJAI phê duyệt; phạm vi tùy chỉnh luôn cần nhân sự xem lại. Trang tiếng Việt này không tuyên bố hỗ trợ hội thoại giọng nói tiếng Việt khi tính năng đó chưa được xác minh.</p><div class="vi-actions"><a class="vi-button" href="mailto:contact@djai.academy?subject=Vietnamese%20website%20consultation">Gửi yêu cầu bằng email</a><a class="vi-button alt" href="/development/vi/">Xem quy trình phát triển</a></div></section>
</main><footer class="vi-page vi-footer">© 2026 DJAI Academy · Thông tin khuyến mãi có thể được cập nhật cho các dự án mới.</footer></body></html>`;

export function GET() {
  return new Response(html, { headers: { "content-type": "text/html; charset=utf-8", "cache-control": "public, max-age=0, s-maxage=3600" } });
}

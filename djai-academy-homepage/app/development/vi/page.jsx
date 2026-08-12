import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";

export const metadata = {
  title: "Phát triển phần mềm theo yêu cầu | MVP, ứng dụng và AI — DJAI",
  description: "DJAI giúp làm rõ yêu cầu, thu gọn phạm vi và phát triển website, ứng dụng, SaaS, hệ thống tự động hóa AI cùng các sản phẩm số có thể đưa vào vận hành.",
  alternates: { canonical: "/development/vi/", languages: { th: "/development/", en: "/development/en/", vi: "/development/vi/", "x-default": "/development/" } },
  openGraph: { title: "Phát triển sản phẩm cùng DJAI", description: "Từ yêu cầu còn rời rạc đến phạm vi rõ ràng, phiên bản MVP và kế hoạch đưa sản phẩm lên chạy.", url: "/development/vi/", siteName: "DJAI Academy", images: ["/portfolio/optimized/games/Xana_Metaverse.webp"], type: "website", locale: "vi_VN" }
};

const capabilities = [
  ["Website, ứng dụng và SaaS", "Website doanh nghiệp, web app, ứng dụng di động, dashboard, cổng khách hàng, nền tảng đăng ký và hệ thống nội bộ.", ["Website và web app", "Ứng dụng di động", "SaaS", "MVP"]],
  ["AI và tự động hóa", "AI assistant, chatbot, voice bot, xử lý tài liệu, RAG và luồng tự động hóa kết nối với dữ liệu doanh nghiệp.", ["AI agent", "Chatbot và voice bot", "RAG", "Tự động hóa quy trình"]],
  ["Hệ thống vận hành", "CRM, POS, quy trình phê duyệt, báo cáo, quản lý dữ liệu và công cụ giúp đội ngũ giảm thao tác lặp lại.", ["CRM", "POS", "Dashboard", "Quy trình nội bộ"]],
  ["Game và sản phẩm Web3", "Mini-game, sản phẩm tương tác, marketplace, ví và trải nghiệm on-chain khi mô hình kinh doanh thực sự cần đến chúng.", ["Mini-game", "Web3 app", "Marketplace", "Sản phẩm tương tác"]]
];

const process = [
  ["Hiểu đúng bài toán", "Bắt đầu từ người dùng, công việc đang bị chậm và kết quả kinh doanh cần đạt — chưa cần một bản đặc tả kỹ thuật hoàn hảo."],
  ["Chọn phần đáng xây trước", "Tách tính năng bắt buộc khỏi những ý tưởng có thể chờ. Phiên bản đầu nên đủ để học từ người dùng mà không mang theo chi phí thừa."],
  ["Xây theo vòng ngắn", "Thiết kế, phát triển, tích hợp và kiểm thử theo từng phần có thể xem được để quyết định sớm khi hướng đi cần thay đổi."],
  ["Đưa lên chạy và theo dõi", "Chuẩn bị môi trường vận hành, theo dõi lỗi, thu phản hồi và quyết định vòng cải tiến tiếp theo dựa trên dữ liệu thật."]
];

export default function VietnameseDevelopmentPage() {
  return <>
    <SiteHeader locale="vi" currentRoute="development" />
    <main className="development-page">
      <section className="development-hero">
        <div><p className="eyebrow">PHÁT TRIỂN PHẦN MỀM THEO YÊU CẦU</p><h1>Mang bài toán đến. Chúng ta sẽ xác định thứ cần xây trước.</h1><p>Một dự án thường bắt đầu bằng nhiều yêu cầu lẫn vào nhau. DJAI giúp làm rõ người dùng, rủi ro và phiên bản nhỏ nhất có thể tạo giá trị trước khi đội ngũ dành thời gian cho phần còn lại.</p><div className="development-actions"><a className="button primary" href="mailto:contact@djai.academy">Gửi yêu cầu dự án</a><a className="button secondary dark" href="/portfolio/vi/">Xem dự án tiêu biểu</a></div></div>
        <div className="development-proof-card" aria-label="Tóm tắt năng lực phát triển"><span>TỪ Ý TƯỞNG ĐẾN VẬN HÀNH</span><strong>Web, mobile, SaaS, AI, hệ thống nội bộ, game và Web3</strong><p>Chọn công nghệ sau khi hiểu mục tiêu. Không đẩy dự án vào một nền tảng chỉ vì nền tảng đó đang được nhắc đến nhiều.</p></div>
      </section>
      <section className="development-band"><p>Bạn có thể gửi một quy trình đang tốn công, một sản phẩm tham khảo hoặc một ý tưởng chưa thành bản đặc tả. Cuộc trao đổi đầu tiên dùng để tìm phạm vi thực tế, không phải để bán thêm tính năng.</p></section>
      <section className="development-section"><div className="development-section-heading"><p className="eyebrow">NĂNG LỰC</p><h2>Những nhóm sản phẩm DJAI có thể cùng bạn xây dựng</h2></div><div className="development-capability-grid">{capabilities.map(([title, text, items]) => <article className="development-capability-card" key={title}><h3>{title}</h3><p>{text}</p><div>{items.map((item) => <span key={item}>{item}</span>)}</div></article>)}</div></section>
      <section className="development-process"><div className="development-section-heading"><p className="eyebrow">QUY TRÌNH</p><h2>Làm nhanh bằng cách tập trung, không phải bằng cách bỏ qua kiểm tra</h2></div><div className="development-process-grid">{process.map(([title, text], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>
      <section className="development-proof-links" aria-label="Nội dung liên quan"><a href="/portfolio/vi/"><strong>Dự án</strong><span>Xem những loại sản phẩm DJAI được phép giới thiệu công khai.</span></a><a href="/service/vi/"><strong>Dịch vụ</strong><span>Đối chiếu yêu cầu của bạn với từng nhóm dịch vụ.</span></a><a href="/tools/vi/"><strong>Công cụ miễn phí</strong><span>Thử các tiện ích DJAI đã đưa lên hoạt động công khai.</span></a></section>
      <section className="development-cta"><div><p className="eyebrow">TRAO ĐỔI VỚI DJAI</p><h2>Gửi mục tiêu, vấn đề hiện tại và điều bạn cần chứng minh trước.</h2><p>DJAI sẽ phản hồi bằng những câu hỏi cần thiết để xác định phạm vi, rủi ro và bước khả thi tiếp theo.</p></div><div className="development-actions"><a className="button primary" href="mailto:contact@djai.academy">contact@djai.academy</a><a className="button ghost light" href="/service/vi/">Xem dịch vụ</a></div></section>
    </main><SiteFooter locale="vi" />
  </>;
}

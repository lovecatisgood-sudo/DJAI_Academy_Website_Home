import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";

export const metadata = {
  title: "Dịch vụ phát triển phần mềm, ứng dụng AI và tự động hóa | DJAI",
  description: "Dịch vụ phát triển website, web app, ứng dụng di động, SaaS, AI agent, tự động hóa, CRM, POS, fintech, game và sản phẩm Web3 theo yêu cầu.",
  alternates: { canonical: "/service/vi/", languages: { th: "/service/", en: "/service/en/", vi: "/service/vi/", "x-default": "/service/" } },
  openGraph: { title: "Dịch vụ phát triển sản phẩm số — DJAI", description: "Chọn nhóm dịch vụ gần nhất với bài toán của bạn, sau đó cùng thu gọn phạm vi cần thực hiện.", url: "/service/vi/", siteName: "DJAI Academy", images: [{ url: "/social/djai-development.webp", width: 1200, height: 630 }], type: "website", locale: "vi_VN" }
};

const services = [
  ["Website và landing page", "Website doanh nghiệp, cửa hàng, trang giới thiệu sản phẩm, đặt lịch và cấu trúc nội dung sẵn sàng cho SEO.", ["Website doanh nghiệp", "Ecommerce", "Landing page", "SEO kỹ thuật"]],
  ["Web app và nền tảng SaaS", "Cổng khách hàng, dashboard, hệ thống đăng ký, marketplace, trang quản trị và sản phẩm nhiều người dùng.", ["SaaS", "Dashboard", "Portal", "Marketplace"]],
  ["Ứng dụng di động", "Ứng dụng cho khách hàng hoặc nhân viên, quy trình đặt lịch, cộng đồng và trải nghiệm đa nền tảng.", ["iOS và Android", "Tài khoản người dùng", "Thông báo", "Đồng bộ dữ liệu"]],
  ["AI agent và tự động hóa", "AI assistant, chatbot, voice bot, xử lý tài liệu và luồng giảm thao tác thủ công có điểm kiểm soát của con người.", ["AI agent", "Chatbot", "Voice bot", "Workflow automation"]],
  ["RAG và AI kết nối dữ liệu", "Tìm kiếm và trả lời dựa trên tài liệu, chính sách, cơ sở dữ liệu hoặc kho kiến thức mà doanh nghiệp kiểm soát.", ["RAG", "Knowledge base", "Tìm kiếm nội bộ", "Document AI"]],
  ["CRM, POS và hệ thống vận hành", "Quản lý khách hàng, bán hàng, tồn kho, phê duyệt, báo cáo và công việc nội bộ.", ["CRM", "POS", "Vận hành", "Báo cáo"]],
  ["Fintech và thanh toán", "Luồng thanh toán, ví, dashboard giao dịch và sản phẩm liên quan đến tài chính với phạm vi bảo mật được xác định từ đầu.", ["Thanh toán", "Ví", "Dashboard", "Fintech"]],
  ["Game và sản phẩm tương tác", "Mini-game, chiến dịch tương tác, gamification, leaderboard và trải nghiệm cộng đồng.", ["Mini-game", "Gamification", "Leaderboard", "Interactive product"]],
  ["Crypto và Web3", "Marketplace, ví, dashboard, luồng token và sản phẩm on-chain khi phù hợp với mô hình sử dụng.", ["Web3", "NFT marketplace", "Crypto wallet", "On-chain"]]
];

export default function VietnameseServicePage() {
  return <><SiteHeader locale="vi" currentRoute="service" /><main className="service-page">
    <section className="service-hero"><p className="eyebrow">DỊCH VỤ DJAI</p><h1>Phát triển phần mềm theo bài toán, không theo danh sách công nghệ.</h1><p>Hãy cho DJAI biết người dùng đang gặp vấn đề gì, quy trình nào đang chậm và kết quả nào cần đạt. Từ đó chúng ta mới chọn website, ứng dụng, AI hay tự động hóa là lời giải phù hợp.</p><div className="service-hero-actions"><a className="button primary" href="mailto:contact@djai.academy">Yêu cầu tư vấn phạm vi</a><a className="button secondary dark" href="/development/vi/">Cách DJAI phát triển</a><a className="button secondary dark" href="/portfolio/vi/">Xem dự án</a></div></section>
    <section className="service-summary-grid" aria-label="Tóm tắt dịch vụ"><div><strong>Xây trọn sản phẩm</strong><span>Từ phạm vi đến triển khai</span></div><div><strong>AI và tự động hóa</strong><span>Có điểm kiểm soát rõ ràng</span></div><div><strong>MVP tập trung</strong><span>Ưu tiên phần tạo giá trị trước</span></div></section>
    <section className="service-catalog"><div className="service-section-heading"><p className="eyebrow">NHÓM DỊCH VỤ</p><h2>Chọn nhóm gần nhất với việc bạn cần hoàn thành</h2><p>Một dự án có thể kết hợp nhiều nhóm. DJAI sẽ giúp xác định đâu là nền móng, đâu là tính năng có thể thêm sau và phần nào cần kiểm tra về dữ liệu, bảo mật hoặc chi phí vận hành.</p></div><div className="service-card-grid">{services.map(([title, text, tags]) => <article className="service-card" key={title}><h3>{title}</h3><p>{text}</p><div>{tags.map((tag) => <span key={tag}>{tag}</span>)}</div></article>)}</div></section>
    <section className="service-models"><div className="service-section-heading"><p className="eyebrow">ĐIỂM BẮT ĐẦU</p><h2>Bạn không cần có sẵn một bản đặc tả hoàn chỉnh</h2></div><div className="service-model-grid"><article><h3>Làm MVP</h3><p>Kiểm tra giả định quan trọng bằng phiên bản nhỏ nhất có thể đưa cho người dùng thật.</p></article><article><h3>Tự động hóa doanh nghiệp</h3><p>Giảm thao tác lặp lại và thời gian chờ trong quy trình đang vận hành.</p></article><article><h3>Mở rộng sản phẩm</h3><p>Thêm tích hợp, ứng dụng di động, báo cáo hoặc lớp AI cho hệ thống hiện có.</p></article><article><h3>Cứu dự án</h3><p>Đánh giá phần đang lỗi, hiệu năng, cấu trúc và lộ trình đưa dự án trở lại trạng thái có thể phát hành.</p></article></div></section>
    <section className="service-cta"><div><p className="eyebrow">BẮT ĐẦU TỪ YÊU CẦU</p><h2>Gửi điều bạn muốn đạt được, không cần đoán trước giải pháp kỹ thuật.</h2><p>Một email ngắn về người dùng, vấn đề và thời hạn sẽ hữu ích hơn một danh sách tính năng chưa được ưu tiên.</p></div><a className="button primary" href="mailto:contact@djai.academy">contact@djai.academy</a></section>
  </main><SiteFooter locale="vi" /></>;
}

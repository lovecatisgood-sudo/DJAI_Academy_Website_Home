import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";
import TrackedLink from "../../components/TrackedLink";

export const metadata = {
  title: "Chọn dịch vụ phát triển phần mềm phù hợp | DJAI",
  description: "Chọn nhóm dịch vụ DJAI theo bài toán kinh doanh, sản phẩm thường được bàn giao và bước tiếp theo trước khi xác định phạm vi với Development.",
  alternates: { canonical: "/service/vi/", languages: { th: "/service/", en: "/service/en/", vi: "/service/vi/", "x-default": "/service/" } },
  openGraph: { title: "Dịch vụ phát triển sản phẩm số — DJAI", description: "Chọn nhóm dịch vụ gần nhất với bài toán của bạn, sau đó cùng thu gọn phạm vi cần thực hiện.", url: "/service/vi/", siteName: "DJAI Academy", images: [{ url: "/social/djai-development.webp", width: 1200, height: 630 }], type: "website", locale: "vi_VN" }
};

const services = [
  { title: "Website và landing page", problem: "Khách hàng chưa hiểu rõ đề nghị, chưa tin tưởng doanh nghiệp hoặc không biết bước liên hệ tiếp theo.", deliverable: "Website doanh nghiệp, landing page, cửa hàng hoặc luồng đặt lịch với cấu trúc nội dung và liên hệ rõ ràng.", nextAction: "Trao đổi về website" },
  { title: "Web app và nền tảng SaaS", problem: "Công việc cần tài khoản, nhiều vai trò người dùng, dữ liệu được quản lý hoặc quy trình mà website thông thường không đáp ứng được.", deliverable: "Web app, cổng khách hàng, dashboard, trang quản trị, marketplace hoặc SaaS với quyền và luồng được xác định.", nextAction: "Trao đổi về web app" },
  { title: "Ứng dụng di động", problem: "Người dùng cần quy trình lặp lại trên điện thoại, tính năng thiết bị, thông báo hoặc trải nghiệm riêng cho mobile.", deliverable: "Ứng dụng cho khách hàng hoặc nhân viên với tài khoản, luồng dữ liệu và tích hợp cần thiết.", nextAction: "Trao đổi về ứng dụng" },
  { title: "AI agent và tự động hóa", problem: "Đội ngũ mất thời gian cho thao tác lặp lại, chuyển dữ liệu thủ công hoặc cùng một nhóm câu hỏi ở nhiều hệ thống.", deliverable: "Luồng tự động hóa, assistant, chatbot, voice bot hoặc xử lý tài liệu với điểm kiểm soát của con người.", nextAction: "Trao đổi về tự động hóa AI" },
  { title: "RAG và AI kết nối dữ liệu", problem: "Thông tin hữu ích nằm rải rác trong tài liệu, chính sách, cơ sở dữ liệu hoặc kho kiến thức được kiểm soát.", deliverable: "Luồng tìm kiếm và trả lời với nguồn, quyền truy cập, trích dẫn và giới hạn câu trả lời rõ ràng.", nextAction: "Trao đổi về RAG" },
  { title: "CRM, POS và hệ thống vận hành", problem: "Bán hàng, phê duyệt, tồn kho hoặc báo cáo vẫn phụ thuộc vào bảng tính và nhiều vòng nhắn tin.", deliverable: "CRM, luồng phê duyệt, dashboard vận hành hoặc hệ thống quản lý theo quy trình hằng ngày.", nextAction: "Trao đổi về hệ thống nội bộ" },
  { title: "Fintech và thanh toán", problem: "Doanh nghiệp cần luồng bán hàng, thanh toán, ví hoặc giao dịch với vai trò và điểm kiểm tra rõ ràng.", deliverable: "POS, luồng thanh toán, trải nghiệm ví hoặc dashboard giao dịch với phạm vi bảo mật được xác định trước.", nextAction: "Trao đổi về fintech" },
  { title: "Game và sản phẩm tương tác", problem: "Chiến dịch hoặc cộng đồng cần một tương tác khiến người dùng có lý do để chơi, cạnh tranh hoặc quay lại.", deliverable: "Mini-game, chiến dịch tương tác, leaderboard hoặc cơ chế loyalty gắn với mục tiêu người dùng.", nextAction: "Trao đổi về sản phẩm tương tác" },
  { title: "Crypto và Web3", problem: "Sản phẩm có lý do rõ ràng để dùng ví, quyền sở hữu hoặc giao dịch on-chain.", deliverable: "Luồng ví, marketplace, dashboard hoặc trải nghiệm on-chain với phạm vi sản phẩm và đánh giá rủi ro minh bạch.", nextAction: "Trao đổi về Web3" }
];

export default function VietnameseServicePage() {
  const enquiryEvent = {
    source_path: "/service/vi/",
    locale: "vi",
    cluster: "commercial",
    service_category: "not_selected",
    destination_type: "email",
    destination_url: "mailto:contact@djai.academy"
  };

  return <><SiteHeader locale="vi" currentRoute="service" /><main className="service-page">
    <section className="service-hero"><p className="eyebrow">DỊCH VỤ DJAI</p><h1>Chọn nhóm dịch vụ gần nhất với bài toán cần giải quyết.</h1><p>Bắt đầu từ công việc đang bị chậm, người dùng liên quan và kết quả cần đạt. Mỗi nhóm bên dưới nêu bài toán phù hợp, sản phẩm thường được bàn giao và đường dẫn để xác định phạm vi với Development.</p><div className="service-hero-actions"><a className="button primary" href="#service-categories">Chọn nhóm dịch vụ</a><a className="button secondary dark" href="/development/vi/">Cách DJAI phát triển</a><a className="button secondary dark" href="/portfolio/vi/">Xem dự án</a></div></section>
    <section className="service-summary-grid" aria-label="Tóm tắt dịch vụ"><div><strong>Xây trọn sản phẩm</strong><span>Từ phạm vi đến triển khai</span></div><div><strong>AI và tự động hóa</strong><span>Có điểm kiểm soát rõ ràng</span></div><div><strong>MVP tập trung</strong><span>Ưu tiên phần tạo giá trị trước</span></div></section>
    <section className="service-catalog" id="service-categories"><div className="service-section-heading"><p className="eyebrow">NHÓM DỊCH VỤ</p><h2>Chọn nhóm gần nhất với việc bạn cần hoàn thành</h2><p>Một dự án có thể kết hợp nhiều nhóm. DJAI sẽ giúp xác định đâu là nền móng, đâu là tính năng có thể thêm sau và phần nào cần kiểm tra về dữ liệu, bảo mật hoặc chi phí vận hành.</p></div><div className="service-card-grid">{services.map((service) => <article className="service-card" key={service.title}><h3>{service.title}</h3><p><strong>Bài toán:</strong> {service.problem}</p><p><strong>Sản phẩm thường bàn giao:</strong> {service.deliverable}</p><a href="/development/vi/">{service.nextAction}</a></article>)}</div></section>
    <section className="service-models"><div className="service-section-heading"><p className="eyebrow">ĐIỂM BẮT ĐẦU</p><h2>Bạn không cần có sẵn một bản đặc tả hoàn chỉnh</h2></div><div className="service-model-grid"><article><h3>Làm MVP</h3><p>Kiểm tra giả định quan trọng bằng phiên bản nhỏ nhất có thể đưa cho người dùng thật.</p></article><article><h3>Tự động hóa doanh nghiệp</h3><p>Giảm thao tác lặp lại và thời gian chờ trong quy trình đang vận hành.</p></article><article><h3>Mở rộng sản phẩm</h3><p>Thêm tích hợp, ứng dụng di động, báo cáo hoặc lớp AI cho hệ thống hiện có.</p></article><article><h3>Cứu dự án</h3><p>Đánh giá phần đang lỗi, hiệu năng, cấu trúc và lộ trình đưa dự án trở lại trạng thái có thể phát hành.</p></article></div></section>
    <section className="service-cta"><div><p className="eyebrow">BẮT ĐẦU TỪ YÊU CẦU</p><h2>Gửi điều bạn muốn đạt được, không cần đoán trước giải pháp kỹ thuật.</h2><p>Một email ngắn về người dùng, vấn đề và thời hạn sẽ hữu ích hơn một danh sách tính năng chưa được ưu tiên.</p></div><TrackedLink className="button primary" href="mailto:contact@djai.academy" eventName="enquiry_start" eventParams={enquiryEvent}>contact@djai.academy</TrackedLink></section>
  </main><SiteFooter locale="vi" /></>;
}

import { ArrowRight, BrainCircuit, CheckCircle2, Code2, Rocket, Sparkles } from "lucide-react";
import SiteFooter from "../SiteFooter";
import SiteHeader from "../SiteHeader";
import CourseRegistrationLink from "../CourseRegistrationLink";
import CourseLandingSchema from "../CourseLandingSchema";
import { courseRegistrationUrls } from "../lib/courseRegistration";

export const metadata = {
  title: "AI Masterclass trực tiếp tại Thái Lan: Xây và giữ chỗ | DJAI",
  description: "Đánh giá AI Masterclass trực tiếp một ngày của DJAI tại Thái Lan. Xem kết quả, học phí, địa điểm và quy trình giữ chỗ trước khi đăng ký.",
  alternates: { canonical: "/course/vi/", languages: { th: "/course/", en: "/course/en/", vi: "/course/vi/", "x-default": "/course/" } },
  openGraph: { title: "AI Masterclass: từ ý tưởng đến sản phẩm chạy được", description: "Workshop thực hành ngày 22 tháng 8, 2026 tại Samut Prakan, Thái Lan.", url: "/course/vi/", images: ["/course/assets/community2-display.webp"], type: "website", locale: "vi_VN" }
};

const curriculum = [
  [BrainCircuit, "Chọn bài toán", "Xác định người dùng, việc họ cần làm và phiên bản nhỏ nhất đáng để xây."],
  [Sparkles, "Viết yêu cầu cho AI", "Biến ý tưởng thành màn hình, luồng thao tác, dữ liệu và tiêu chí kiểm tra rõ ràng."],
  [Code2, "Xây và kiểm tra", "Dùng công cụ AI để tạo sản phẩm, thử tình huống lỗi và sửa những phần chưa đúng."],
  [Rocket, "Đưa lên chạy", "Chuẩn bị demo, triển khai phiên bản đầu tiên và lập danh sách việc cần cải thiện sau lớp."]
];

const included = ["Một ngày workshop thực hành có hướng dẫn", "Lộ trình từ ý tưởng đến bản demo", "Template, prompt và workflow để dùng lại", "Phù hợp với người mới", "Chứng nhận hoàn thành", "Tài liệu tham khảo sau workshop"];

export default function VietnameseCoursePage() {
  return <main id="home" className="site-shell" lang="vi"><SiteHeader locale="vi" />
    <CourseLandingSchema locale="vi" name="AI Masterclass trực tiếp: xây một sản phẩm thật trong một ngày" description="Workshop trực tiếp một ngày để lập kế hoạch, xây, kiểm tra và trình bày một sản phẩm bằng AI." path="/course/vi/" />
    <section className="hero section"><div className="hero-copy"><div className="pill"><span className="pulse-dot" />DJAI Academy | AI Masterclass</div><h1>AI Masterclass trực tiếp: <span className="gradient-text">xây một sản phẩm thật trong một ngày</span></h1><p>Đánh giá xem workshop thực hành này có phù hợp với bạn không, rồi xem kết quả, học phí, địa điểm và quy trình giữ chỗ trước khi xây một sản phẩm bằng AI và no-code.</p><div className="event-strip"><span className="pulse-dot" /><strong>Lớp tiếp theo:</strong><span>22 tháng 8, 2026 | 09:30–16:00</span><em>Số chỗ có hạn</em></div><div className="hero-actions"><CourseRegistrationLink>Tạo tài khoản và giữ chỗ <ArrowRight size={18} /></CourseRegistrationLink><a className="button button-ghost" href="/course/detail/vi/">Xem lịch học chi tiết</a></div><p className="account-entry-note">Cần tài khoản DJAI School miễn phí hoặc gói cao hơn. <a href={courseRegistrationUrls.login}>Đã có tài khoản? Đăng nhập</a></p><div className="hero-metrics"><div><strong>1 ngày</strong><span>học và xây liên tục</span></div><div><strong>4 chặng</strong><span>từ ý tưởng đến launch</span></div><div><strong>1 demo</strong><span>để bạn tiếp tục phát triển</span></div></div></div><div className="hero-visual"><img className="instructor" src="/course/assets/Instructor-DJAI-display.webp" alt="Giảng viên DJAI Academy" fetchPriority="high" decoding="async" /><div className="floating-badge badge-ai"><span className="pulse-dot" />AI Tools</div><div className="floating-badge badge-no-code"><span className="pulse-dot" />No-Code Apps</div><div className="floating-badge badge-deploy"><span className="pulse-dot" />Deploy Live</div></div></section>
    <section className="section creator-gap"><div className="eyebrow"><span />BẠN SẼ ĐI QUA NHỮNG GÌ?<span /></div><div className="section-heading centered"><h2>Không dừng ở prompt. <span className="gradient-text">Bạn phải làm ra thứ dùng được.</span></h2><p>Mỗi chặng giải quyết một câu hỏi cụ thể của quá trình xây sản phẩm, theo đúng thứ tự để tránh mất thời gian vào tính năng chưa cần.</p></div><div className="stat-grid">{curriculum.map(([Icon, title, text]) => <article className="glass-card" key={title}><div className="glow-icon"><Icon size={28} /></div><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></section>
    <section id="pricing" className="section pricing"><div className="section-heading centered"><div className="eyebrow"><span />LỚP TRỰC TIẾP TẠI THÁI LAN<span /></div><h2>AI Masterclass — 22 tháng 8, 2026</h2><p>09:30–16:00 tại Siamese Cat Learning Center, Bang Kaeo, Samut Prakan. Phí tham gia 5.999 THB mỗi người.</p></div><div className="pricing-grid"><article className="price-card featured"><span className="price-label">BAO GỒM</span><ul>{included.map((item) => <li key={item}><CheckCircle2 size={18} />{item}</li>)}</ul><CourseRegistrationLink>Giữ chỗ <ArrowRight size={18} /></CourseRegistrationLink></article></div></section>
    <section className="section final-cta"><div><h2>Bạn có một ý tưởng nhưng chưa biết bắt đầu từ đâu?</h2><p>Hãy đến lớp với vấn đề bạn muốn giải quyết. Mục tiêu của ngày học là rời đi cùng một bản demo và một kế hoạch tiếp tục đủ rõ.</p></div><CourseRegistrationLink>Đăng ký workshop <ArrowRight size={18} /></CourseRegistrationLink></section>
    <SiteFooter locale="vi" />
  </main>;
}

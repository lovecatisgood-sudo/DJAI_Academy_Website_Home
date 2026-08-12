import { ArrowRight, BrainCircuit, CheckCircle2, Code2, Coffee, Rocket, Sparkles, Users } from "lucide-react";
import SiteFooter from "../../SiteFooter";
import SiteHeader from "../../SiteHeader";
import CourseRegistrationLink from "../../CourseRegistrationLink";
import { courseRegistrationUrls } from "../../lib/courseRegistration";

export const metadata = {
  title: "Lịch học AI Masterclass: từ ý tưởng đến sản phẩm | DJAI",
  description: "Xem lịch trình và nội dung AI Masterclass ngày 22 tháng 8, 2026: lên kế hoạch, vibe coding, kiểm tra và đưa một sản phẩm AI lên chạy trong một ngày.",
  alternates: { canonical: "/course/detail/vi/", languages: { th: "/course/detail/", en: "/course/detail/en/", vi: "/course/detail/vi/", "x-default": "/course/detail/" } },
  openGraph: { title: "Lịch học AI Masterclass của DJAI", description: "Một ngày thực hành để đi từ ý tưởng đến bản demo sản phẩm.", url: "/course/detail/vi/", images: ["/course/assets/community2-display.webp"], type: "website", locale: "vi_VN" }
};

const schedule = [
  [Coffee, "09:30–10:00", "Làm quen và chuẩn bị", "Kiểm tra công cụ, chọn chỗ, làm quen với lớp và chốt ý tưởng sẽ thực hiện."],
  [BrainCircuit, "10:00–12:00", "Nền tảng AI và no-code", "Hiểu cách chia bài toán, viết yêu cầu và chuyển từ ý tưởng sang kế hoạch có thể thực thi."],
  [Sparkles, "12:00–13:00", "Nghỉ trưa", "Nghỉ, trao đổi ý tưởng và chuẩn bị cho phiên xây sản phẩm buổi chiều."],
  [Code2, "13:00–15:00", "Xây, nối và kiểm tra", "Tạo tính năng, nối các phần của sản phẩm, thử luồng chính và sửa lỗi có ảnh hưởng đến demo."],
  [Users, "15:00–16:00", "Trình bày và kết nối", "Chia sẻ kết quả, nhận phản hồi và trao đổi cùng những người xây sản phẩm khác."]
];

const parts = [
  [BrainCircuit, "Phần 1", "Tư duy AI và nền tảng vibe coding", ["AI thay đổi quá trình làm sản phẩm ra sao", "Chọn ý tưởng vừa sức trong một ngày", "Chia mục tiêu thành các bước kiểm tra được"], "Một ý tưởng đã được thu gọn và roadmap rõ"],
  [Sparkles, "Phần 2", "Lập kế hoạch và thiết kế", ["Xác định yêu cầu", "Vẽ luồng người dùng", "Chọn dữ liệu và cấu trúc cần thiết"], "Blueprint đủ rõ để bắt đầu xây"],
  [Code2, "Phần 3", "Xây sản phẩm cùng AI", ["Tạo giao diện và tính năng", "Viết prompt có ngữ cảnh", "Kiểm thử luồng chính và lỗi thường gặp"], "Prototype hoạt động được"],
  [Rocket, "Phần 4", "Đưa lên chạy và cải thiện", ["Triển khai phiên bản đầu", "Sửa lỗi dựa trên bằng chứng", "Thu phản hồi và chọn bước tiếp theo"], "Một bản demo online có thể chia sẻ"]
];

const schema = { "@context": "https://schema.org", "@type": "Event", name: "DJAI Academy AI Masterclass: From Idea to Live Product", startDate: "2026-08-22T09:30:00+07:00", endDate: "2026-08-22T16:00:00+07:00", eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode", eventStatus: "https://schema.org/EventScheduled", inLanguage: "vi", location: { "@type": "Place", name: "Siamese Cat Learning Center", address: { "@type": "PostalAddress", streetAddress: "46/27 Bangna-Trad Road, Bang Kaeo", addressLocality: "Bang Phli", addressRegion: "Samut Prakan", postalCode: "10540", addressCountry: "TH" } }, offers: { "@type": "Offer", price: "5999", priceCurrency: "THB", availability: "https://schema.org/LimitedAvailability", url: courseRegistrationUrls.signup }, organizer: { "@type": "Organization", name: "DJAI Academy", url: "https://www.djai.academy/" } };

export default function VietnameseCourseDetailPage() {
  return <main id="home" className="site-shell course-detail-page" lang="vi"><SiteHeader locale="vi" /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <section className="detail-hero"><img src="/course/assets/community2-display.webp" alt="Workshop thực hành của DJAI Academy" /><div className="detail-hero-shade" /><div className="detail-hero-content"><div className="pill"><span className="pulse-dot" />22 tháng 8, 2026 | 09:30–16:00</div><span className="detail-kicker">AI MASTERCLASS THỰC HÀNH MỘT NGÀY</span><h1>Từ ý tưởng đến sản phẩm chạy được</h1><p>Đi hết quy trình xây website, ứng dụng, automation hoặc công cụ số bằng AI—từ chọn bài toán, lập kế hoạch, xây, kiểm tra đến triển khai bản demo.</p><div className="hero-actions"><CourseRegistrationLink>Giữ chỗ <ArrowRight size={18} /></CourseRegistrationLink><a className="button button-ghost" href="#schedule">Xem lịch trình</a></div><p className="account-entry-note">Cần tài khoản DJAI School miễn phí hoặc gói cao hơn. <a href={courseRegistrationUrls.login}>Đã có tài khoản? Đăng nhập</a></p></div></section>
    <section id="schedule" className="section detail-section"><div className="eyebrow"><span />LỊCH TRÌNH WORKSHOP<span /></div><div className="section-heading centered"><h2>Một ngày để học, xây và nhận phản hồi</h2><p>Buổi sáng dành cho nền tảng và kế hoạch; buổi chiều dành cho triển khai, kiểm tra và trình bày kết quả.</p></div><div className="schedule-list">{schedule.map(([Icon, time, title, text], index) => <article className="schedule-row" key={time}><div className="schedule-index">{String(index + 1).padStart(2, "0")}</div><div className="schedule-time">{time}</div><div className="schedule-icon"><Icon size={24} /></div><div className="schedule-copy"><h3>{title}</h3><p>{text}</p></div></article>)}</div></section>
    <section className="detail-curriculum-band"><div className="section detail-section"><div className="eyebrow"><span />NỘI DUNG HỌC<span /></div><div className="section-heading centered"><h2>From Idea to Live Product</h2><p>Bốn phần bám theo đúng trình tự một sản phẩm cần đi qua, không học kỹ thuật tách rời khỏi dự án.</p></div><div className="journey-steps">{["Ý tưởng", "Kế hoạch", "Xây", "Ra mắt"].map((step, index) => <div key={step}><span>{index + 1}</span><strong>{step}</strong></div>)}</div><div className="detail-curriculum-grid">{parts.map(([Icon, part, title, points, outcome]) => <article className="detail-curriculum-card" key={part}><div className="detail-card-heading"><div className="detail-card-icon"><Icon size={26} /></div><span>{part}</span></div><h3>{title}</h3><ul>{points.map((point) => <li key={point}><CheckCircle2 size={17} />{point}</li>)}</ul><div className="detail-outcome"><strong>Kết quả</strong><span>{outcome}</span></div></article>)}</div></div></section>
    <section className="section detail-cta"><div><span>LỚP TIẾP THEO</span><h2>Sẵn sàng biến ý tưởng thành một bản demo thật?</h2><p>22 tháng 8, 2026, 09:30–16:00 tại Siamese Cat Learning Center. Số chỗ được giới hạn để mỗi dự án có thời gian nhận hướng dẫn.</p></div><div className="detail-cta-action"><strong>5.999 THB/người</strong><CourseRegistrationLink>Giữ chỗ <ArrowRight size={18} /></CourseRegistrationLink><a className="detail-account-login" href={courseRegistrationUrls.login}>Đã có tài khoản? Đăng nhập</a></div></section>
    <SiteFooter locale="vi" /><a className="scroll-top" href="#home" aria-label="Trở lại đầu trang"><ArrowRight size={20} /></a>
  </main>;
}

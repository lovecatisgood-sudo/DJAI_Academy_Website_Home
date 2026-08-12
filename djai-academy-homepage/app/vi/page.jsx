import Image from "next/image";
import Link from "next/link";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";

export const metadata = {
  title: "DJAI Academy Việt Nam | Học AI bằng cách tự tay xây sản phẩm",
  description:
    "Bắt đầu với AI và vibe coding qua dự án thật: làm website, ứng dụng, công cụ tự động hóa và đưa sản phẩm lên chạy mà không cần chờ đến khi biết lập trình chuyên sâu.",
  alternates: {
    canonical: "/vi/",
    languages: { th: "/", en: "/en/", vi: "/vi/", "x-default": "/" }
  },
  openGraph: {
    title: "DJAI Academy Việt Nam | Từ ý tưởng đến sản phẩm chạy được",
    description: "Học AI, thử công cụ miễn phí và xây sản phẩm thật theo từng bước có thể kiểm tra.",
    url: "/vi/",
    siteName: "DJAI Academy",
    images: ["/social/djai-academy.webp"],
    type: "website",
    locale: "vi_VN"
  }
};

const routes = [
  {
    eyebrow: "HỌC",
    title: "Bắt đầu với AI và vibe coding",
    text: "Dành cho người có ý tưởng nhưng chưa biết nên bắt đầu từ giao diện, dữ liệu hay câu lệnh cho AI.",
    href: "/course/vi/",
    action: "Xem lộ trình học"
  },
  {
    eyebrow: "LÀM THỬ",
    title: "Dùng công cụ miễn phí ngay",
    text: "Xử lý PDF, hình ảnh, âm thanh, video và dữ liệu ngay trên trình duyệt trước khi học cách tự xây công cụ của riêng bạn.",
    href: "/tools/vi/",
    action: "Mở bộ công cụ"
  },
  {
    eyebrow: "XÂY DỰNG",
    title: "Biến yêu cầu thành sản phẩm",
    text: "Nếu dự án cần một đội ngũ thực hiện, DJAI có thể cùng bạn xác định phạm vi, làm MVP và chuẩn bị cho giai đoạn vận hành thật.",
    href: "/development/vi/",
    action: "Tìm hiểu cách hợp tác"
  }
];

const steps = [
  ["01", "Làm ra kết quả nhỏ đầu tiên", "Bạn bắt đầu bằng một website, luồng tự động hóa hoặc công cụ có thể mở và dùng được — không phải một danh sách thuật ngữ phải học thuộc."],
  ["02", "Hiểu kỹ thuật đúng lúc cần", "Database, API, frontend hay deploy sẽ được giải thích khi chúng xuất hiện trong chính thứ bạn đang xây."],
  ["03", "Kiểm tra trước khi tin AI", "AI có thể viết code rất nhanh nhưng vẫn có thể sai. Bạn sẽ học cách đọc kết quả, thử tình huống lỗi và nhận ra phần cần con người quyết định."],
  ["04", "Đưa sản phẩm lên chạy thật", "Một bản demo chỉ là điểm giữa. DJAI tập trung cả vào dữ liệu, quyền riêng tư, chi phí và cách duy trì sản phẩm sau khi ra mắt."]
];

export default function VietnameseHomePage() {
  return (
    <>
      <SiteHeader locale="vi" currentRoute="home" />
      <main>
        <section className="hero">
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">AI KHÔNG CHỈ ĐỂ HỎI — HÃY DÙNG NÓ ĐỂ XÂY</p>
              <h1>DJAI Academy</h1>
              <p className="hero-line">Từ một ý tưởng còn mơ hồ đến sản phẩm chạy được</p>
              <p className="hero-text">
                Bạn chưa cần biết hết về lập trình mới có thể bắt đầu. DJAI giúp bạn tạo phiên bản đầu tiên,
                nhìn thấy nó hoạt động, rồi học từng phần kỹ thuật vào đúng lúc cần dùng đến.
              </p>
              <div className="hero-actions">
                <a className="button primary" href="/course/vi/">Bắt đầu lộ trình cho người mới</a>
                <a className="button secondary" href="/tools/vi/">Dùng công cụ miễn phí</a>
                <a className="button ghost" href="/development/vi/">Trao đổi về một dự án</a>
              </div>
            </div>
            <div className="hero-visual" aria-label="DJAI Academy — học AI bằng dự án thực tế">
              <div className="orbit one" />
              <div className="orbit two" />
              <div className="logo-plate">
                <Image src="/djai-logo-display.webp" alt="DJAI Academy" width={768} height={413} priority />
              </div>
              <img
                className="founder"
                src="/founder-djai-display.webp"
                srcSet="/founder-djai-mobile.webp 640w, /founder-djai-display.webp 912w"
                sizes="(max-width: 640px) 86vw, (max-width: 1024px) 420px, 440px"
                alt="Người sáng lập DJAI Academy"
                width="912"
                height="1440"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
              <div className="signal-card"><span>AI + PRODUCT + DEPLOYMENT</span><strong>Học bằng cách tự tay làm</strong></div>
            </div>
          </div>
        </section>

        <section className="quick-routes" aria-label="Các điểm bắt đầu tại DJAI Academy">
          {routes.map((route) => <a className="route-card" href={route.href} key={route.title}>
            <span>{route.eyebrow}</span><h2>{route.title}</h2><p>{route.text}</p><strong>{route.action}</strong>
          </a>)}
        </section>

        <section className="section dark-section">
          <div className="section-heading">
            <p className="eyebrow">CÁCH DJAI DẠY VÀ LÀM SẢN PHẨM</p>
            <h2>Xây trước. Hiểu sâu dần. Luôn kiểm tra.</h2>
            <p>Không có lời hứa rằng AI sẽ làm đúng mọi thứ trong một lần. Điều quan trọng là bạn biết mình đang yêu cầu gì, kết quả nào cần kiểm tra và lúc nào nên dừng để sửa nền móng.</p>
          </div>
          <div className="pillar-grid">
            {steps.map(([number, title, text]) => <article className="pillar-card" key={number}>
              <span className="eyebrow">{number}</span><h3>{title}</h3><p>{text}</p>
            </article>)}
          </div>
        </section>

        <section className="section split-section">
          <div><p className="eyebrow">BẠN MUỐN TỰ HỌC HAY CẦN ĐỘI NGŨ?</p><h2>Hai con đường, cùng một tiêu chuẩn: sản phẩm phải dùng được</h2></div>
          <div className="copy-block">
            <p>Nếu muốn tự xây, hãy bắt đầu bằng một dự án nhỏ và dùng bài viết, khóa học, công cụ để tháo từng nút thắt.</p>
            <p>Nếu bài toán liên quan đến khách hàng, dữ liệu thật hoặc thời hạn kinh doanh, đội ngũ DJAI có thể giúp thu gọn phạm vi và xây phần cần thiết trước.</p>
            <div className="hero-actions">
              <Link className="button secondary dark" href="/blog/vi/">Đọc hướng dẫn thực hành</Link>
              <Link className="button secondary dark" href="/portfolio/vi/">Xem các loại dự án</Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter locale="vi" />
    </>
  );
}

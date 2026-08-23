import AdSenseAd from "../../components/AdSenseAd";
import ShareButtons from "../../components/ShareButtons";
import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";

export const metadata = {
  title: "Công cụ AI, PDF, hình ảnh và dữ liệu miễn phí | DJAI",
  description: "Bộ công cụ miễn phí của DJAI để xử lý PDF, hình ảnh, video, âm thanh, tài liệu và dữ liệu. Nhiều tác vụ chạy ngay trên trình duyệt, không cần tài khoản.",
  alternates: { canonical: "/tools/vi/", languages: { th: "/tools/", en: "/tools/en/", vi: "/tools/vi/", "x-default": "/tools/" } },
  openGraph: { title: "Bộ công cụ miễn phí của DJAI", description: "Giải quyết nhanh các việc thường gặp với PDF, ảnh, video, tài liệu và dữ liệu.", url: "/tools/vi/", siteName: "DJAI Academy", images: ["/djai-logo.webp"], type: "website", locale: "vi_VN" }
};

const tools = [
  ["Chuyển video thành văn bản", "Tạo bản chép lời bằng AI", "Chuyển video hoặc audio thành TXT, SRT, VTT hay JSON. Không cần đăng ký; dữ liệu media không được tải lên máy chủ DJAI.", "/tools/video-to-text/en/", ["Phụ đề", "AI cục bộ"]],
  ["Kiểm tra SEO", "SEO Screaming Toad", "Thu thập website để kiểm tra canonical, hreflang, sitemap, structured data và lỗi kỹ thuật bằng bằng chứng có thể đối chiếu.", "/tools/seo-screaming-toad/en/", ["SEO kỹ thuật", "Mã nguồn mở"]],
  ["Tạo mã QR", "QR Code miễn phí", "Tạo QR cho đường dẫn, Wi-Fi, danh thiếp, nội dung hoặc chiến dịch rồi tải PNG hay SVG mà không cần tài khoản.", "/tools/qrgen/vi/", ["PNG", "SVG"]],
  ["Xử lý hình ảnh", "Đổi định dạng, nén và đổi kích thước ảnh", "Đổi JPG, PNG, WebP, HEIC; nén hàng loạt hoặc xóa nền. Phần lớn tác vụ chạy ngay trên thiết bị.", "/tools/resizeimg/vi/", ["HEIC", "Xử lý hàng loạt"]],
  ["Xử lý PDF", "Bộ công cụ PDF dùng ngay", "Ghép, tách, nén, xoay, đóng dấu, đặt mật khẩu hoặc chuyển PDF sang ảnh mà không gửi tài liệu lên máy chủ.", "/tools/PDFTools/vi/", ["PDF", "Riêng tư"]],
  ["Tài liệu", "Chuyển đổi DOCX, OCR và trích xuất chữ", "Chuyển DOCX sang PDF, HTML, Markdown hoặc văn bản; đọc chữ từ PDF và ảnh ngay trong trình duyệt.", "/tools/document/vi/", ["DOCX", "OCR"]],
  ["Ngữ cảnh cho AI", "Đếm token và chuẩn bị dữ liệu RAG", "Đếm token, làm sạch ngữ cảnh, xem trước các đoạn RAG và đóng gói nhiều tệp trước khi đưa vào mô hình AI.", "/tools/ai/vi/", ["Token", "RAG"]],
  ["Bảng tính", "Chuyển đổi CSV, JSON và Excel", "Làm sạch, ghép, tách và chuyển đổi CSV, JSON, XLSX cho các luồng dữ liệu và tự động hóa.", "/tools/spreadsheet/vi/", ["CSV", "XLSX"]]
];

const workflows = [
  ["Xóa nền ảnh", "/tools/resizeimg/remove-background-image/vi/"], ["Đổi HEIC sang JPG", "/tools/resizeimg/heic-to-jpg/vi/"],
  ["Nén ảnh còn khoảng 100 KB", "/tools/resizeimg/image-to-100kb/vi/"], ["Ghép PDF", "/tools/PDFTools/merge-pdf/vi/"],
  ["Tách trang PDF thành ảnh", "/tools/PDFTools/pdf-to-images/vi/"], ["Chuyển DOCX sang PDF", "/tools/document/docx-to-pdf/vi/"],
  ["Đếm token trong tài liệu", "/tools/ai/token-counter/vi/"], ["Chuyển CSV sang JSON", "/tools/spreadsheet/csv-to-json/vi/"]
];

const structuredData = { "@context": "https://schema.org", "@type": "CollectionPage", name: "Bộ công cụ miễn phí của DJAI", url: "https://www.djai.academy/tools/vi/", inLanguage: "vi", hasPart: tools.map(([, title, text, href]) => ({ "@type": "SoftwareApplication", name: title, description: text, url: `https://www.djai.academy${href}`, applicationCategory: "UtilitiesApplication", operatingSystem: "Web browser", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } })) };

export default function VietnameseToolsPage() {
  return <>
    <SiteHeader locale="vi" currentRoute="tools" />
    <main className="tools-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <section className="tools-hero"><p className="eyebrow">CÔNG CỤ MIỄN PHÍ TỪ DJAI ACADEMY</p><h1>Xử lý việc nhỏ ngay, không cần cài thêm phần mềm.</h1><p>Chọn đúng tác vụ, đưa tệp vào và tải kết quả về. Mỗi trang công cụ ghi rõ dữ liệu được xử lý ở đâu và những giới hạn bạn cần biết trước khi bắt đầu.</p><ShareButtons url="https://www.djai.academy/tools/vi/" title="Bộ công cụ miễn phí của DJAI" locale="vi" compact /></section>
      <AdSenseAd label="Quảng cáo trong danh mục công cụ" />
      <section className="tools-grid" aria-label="Các nhóm công cụ miễn phí" data-tool-discovery>
        {tools.map(([label, title, text, href, tags]) => <a className="tool-listing" href={href} key={title}><span>{label}</span><h2>{title}</h2><p>{text}</p><div>{tags.map((tag) => <small key={tag}>{tag}</small>)}</div><strong>Mở công cụ <span aria-hidden="true">→</span></strong></a>)}
      </section>
      <section className="workflow-section" aria-labelledby="workflow-heading"><div><p className="eyebrow">BẮT ĐẦU TỪ VIỆC CẦN LÀM</p><h2 id="workflow-heading">Lối tắt cho những tác vụ thường gặp</h2><p>Giao diện của một số công cụ chuyên biệt hiện dùng tiếng Anh, nhưng thao tác chính vẫn nằm ngay trên trang và không yêu cầu đăng ký.</p></div><div className="workflow-links">{workflows.map(([title, href]) => <a href={href} key={title}><strong>{title}</strong><span>Mở công cụ</span></a>)}</div></section>
      <section className="tools-band"><div><p className="eyebrow">VÌ SAO MIỄN PHÍ?</p><h2>Một công cụ hữu ích là cách rõ nhất để chứng minh năng lực sản phẩm.</h2></div><p>DJAI phát hành các công cụ này để giải quyết nhu cầu thật, đồng thời cho thấy cách một tiện ích web được thiết kế, kiểm tra và vận hành. Nếu doanh nghiệp cần luồng riêng, hãy bắt đầu từ <a href="/service/vi/">dịch vụ phát triển sản phẩm</a>.</p></section>
    </main>
    <SiteFooter locale="vi" />
  </>;
}

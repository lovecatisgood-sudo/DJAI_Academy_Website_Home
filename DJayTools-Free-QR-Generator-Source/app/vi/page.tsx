"use client";

import { useEffect, useRef, useState } from "react";
import type { CornerSquareType, DotType } from "qr-code-styling";
import AdSenseAd from "../AdSenseAd";
import QrTaskFields from "../QrTaskFields";
import ShareButtons from "../ShareButtons";
import ToolDiscoveryFooter from "../ToolDiscoveryFooter";
import ToolPromoModal, { shouldShowToolPromo } from "../ToolPromoModal";
import { qrToolCopy, qrToolHref, qrToolSlugs, type QrPageCopy, type QrToolSlug } from "../qr-tool-data";

const COLORS = ["#D97757", "#0B32A4", "#00BFD8", "#5630C8", "#071E3D", "#F2A65A", "#2E8B57", "#D7467D"];
const BASE_PATH = "/tools/qrgen";
const assetPath = (path: string) => `${BASE_PATH}/${path}`;

export default function VietnameseQrGenerator({ toolSlug, pageCopy }: { toolSlug?: QrToolSlug; pageCopy?: QrPageCopy }) {
  const qrMount = useRef<HTMLDivElement>(null);
  const qrInstance = useRef<import("qr-code-styling").default | null>(null);
  const [payload, setPayload] = useState("https://www.djai.academy");
  const [taskError, setTaskError] = useState("");
  const [logoData, setLogoData] = useState("");
  const [dots, setDots] = useState<DotType>("rounded");
  const [corners, setCorners] = useState<CornerSquareType>("extra-rounded");
  const [color, setColor] = useState(COLORS[0]);
  const [format, setFormat] = useState<"png" | "svg">("png");
  const [error, setError] = useState("");
  const [promoType, setPromoType] = useState<"course" | "development" | null>(null);
  const canonical = toolSlug ? `https://www.djai.academy${qrToolHref(toolSlug, "vi")}` : "https://www.djai.academy/tools/qrgen/vi/";
  const title = pageCopy?.title || "Tạo mã QR miễn phí";

  useEffect(() => {
    let active = true;
    import("qr-code-styling").then(({ default: QRCodeStyling }) => {
      if (!active || !qrMount.current) return;
      const instance = new QRCodeStyling({
        width: 280, height: 280, type: "svg", data: payload || "https://www.djai.academy", image: logoData || undefined, margin: 12,
        qrOptions: { errorCorrectionLevel: "Q" }, dotsOptions: { type: dots, color }, cornersSquareOptions: { type: corners, color },
        cornersDotOptions: { type: "dot", color }, backgroundOptions: { color: "#ffffff" }, imageOptions: { hideBackgroundDots: true, imageSize: 0.32, margin: 5 },
      });
      qrMount.current.innerHTML = "";
      instance.append(qrMount.current);
      qrInstance.current = instance;
    });
    return () => { active = false; };
  }, [payload, logoData, dots, corners, color]);

  function download() {
    if (!payload || taskError) { setError(taskError || "Nhập thông tin cần mã hóa trong mã QR."); return; }
    setError("");
    qrInstance.current?.download({ name: "DJayTools-QR-Code", extension: format });
    setPromoType(shouldShowToolPromo());
  }

  function scrollToGenerator() { document.getElementById("generator")?.scrollIntoView({ behavior: "smooth" }); }

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", name: title, url: canonical, applicationCategory: "UtilitiesApplication", operatingSystem: "Web browser", description: pageCopy?.description || "Trình tạo mã QR miễn phí, không cần đăng ký và không watermark.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "DJAI Academy", url: "https://www.djai.academy/vi/" } }) }} />
      <header className="site-header">
        <a className="brand" href="#top"><img src={assetPath("djai-academy-logo-display.webp")} alt="DJAI Academy" width="384" height="206" /><span><strong>DJayTools</strong><small>by DJAI Academy</small></span></a>
        <nav aria-label="Điều hướng chính">
          <a href="#profile">Nhà phát triển</a><a href="/vi/">DJAI Academy</a><a href="/development/vi/">Phát triển cùng DJAI</a><a href="/tools/resizeimg/vi/">Công cụ hình ảnh</a><a href="/blog/vi/">Bài viết</a>
          <a href="/tools/qrgen/" hrefLang="th">ไทย</a><a href="/tools/qrgen/en/" hrefLang="en">EN</a><a className="nav-cta" href="/academy/vi/">Tham gia cộng đồng</a>
        </nav>
      </header>
      <section className="hero" id="top">
        <div className="eyebrow"><span>Miễn phí 100%</span> · Không cần đăng ký</div>
        <h1>{pageCopy?.title || <>Tạo mã QR đẹp,<br /><em>sẵn sàng để dùng.</em></>}</h1>
        <p>{pageCopy?.description || "Tạo, tùy chỉnh và tải mã QR chất lượng cao trong vài giây. Riêng tư, không giới hạn và không watermark."}</p>
        <button className="primary hero-button" onClick={scrollToGenerator}>Tạo mã QR miễn phí <span>↘</span></button>
        <ShareButtons url={canonical} title={title} language="vi" compact />
        <div className="hero-note"><span>✓</span> Không giới hạn <span>✓</span> Tải PNG &amp; SVG <span>✓</span> Không hết hạn</div>
      </section>
      <AdSenseAd label="Quảng cáo công cụ QR" />
      <nav className="qr-task-links" aria-label="Công cụ QR theo loại">
        {qrToolSlugs.map((slug) => <a key={slug} href={qrToolHref(slug, "vi")} aria-current={slug === toolSlug ? "page" : undefined}>{qrToolCopy[slug].vi.title}</a>)}
      </nav>
      <section className="generator-shell" id="generator">
        <div className="generator-head"><div><span className="step-tag">TRÌNH TẠO QR MIỄN PHÍ</span><h2>Tạo mã trong vài giây</h2></div><p>Không tài khoản. Không watermark. Không hết hạn.</p></div>
        <div className="generator-card">
          <div className="controls">
            <div className="control-block"><label><b>1</b> Nhập thông tin cho mã QR</label><QrTaskFields mode={pageCopy?.mode || "url"} language="vi" onPayload={setPayload} onError={setTaskError} onLogo={setLogoData} />{error && <p className="error" role="alert">{error}</p>}</div>
            <div className="control-block split-options"><fieldset><legend><b>2</b> Họa tiết</legend><div className="option-row">{(["square", "rounded", "dots"] as DotType[]).map((item) => <button key={item} aria-label={`Họa tiết ${item}`} aria-pressed={dots === item} onClick={() => setDots(item)} className={`pattern-option ${dots === item ? "selected" : ""}`}><span className={`pattern-preview ${item}`} /></button>)}</div></fieldset><fieldset><legend>Góc</legend><div className="option-row">{(["square", "extra-rounded"] as CornerSquareType[]).map((item) => <button key={item} aria-label={`Góc ${item}`} aria-pressed={corners === item} onClick={() => setCorners(item)} className={`corner-option ${corners === item ? "selected" : ""}`}><span className={item} /></button>)}</div></fieldset></div>
            <fieldset className="control-block"><legend><b>3</b> Chọn màu</legend><div className="colors">{COLORS.map((item) => <button key={item} aria-label={`Dùng màu ${item}`} aria-pressed={color === item} onClick={() => setColor(item)} className={color === item ? "selected" : ""} style={{ backgroundColor: item }} />)}</div></fieldset>
          </div>
          <div className="preview-panel"><div className="preview-top"><span>XEM TRƯỚC</span><i><span /> Sẵn sàng quét</i></div><div className="qr-frame frame-none"><div ref={qrMount} className="qr-mount" role="img" aria-label="Xem trước mã QR" /></div><p>Mã QR tĩnh này không hết hạn.</p><div className="download-controls"><div className="format-switch" aria-label="Định dạng tải xuống"><button className={format === "png" ? "active" : ""} onClick={() => setFormat("png")}>PNG</button><button className={format === "svg" ? "active" : ""} onClick={() => setFormat("svg")}>SVG</button></div><button className="primary download" onClick={download}>Tải mã QR <span>↓</span></button></div></div>
        </div>
      </section>
      <section className="trust-strip" aria-label="Lợi ích"><div><b>∞</b><span><strong>Không giới hạn</strong><small>Tạo bao nhiêu mã tùy nhu cầu</small></span></div><div><b>◌</b><span><strong>Riêng tư</strong><small>Dữ liệu ở trong trình duyệt</small></span></div><div><b>↯</b><span><strong>Tải ngay</strong><small>PNG và SVG sẵn sàng sử dụng</small></span></div></section>
      <section className="how-section"><div className="section-intro"><span className="step-tag">CÁCH SỬ DỤNG</span><h2>Từ dữ liệu thành QR<br />trong ba bước.</h2><p>Nhập đúng thông tin, chọn kiểu hiển thị rồi tải file.</p></div><div className="steps"><article><span>01</span><div className="step-icon">↗</div><h3>Nhập dữ liệu</h3><p>Thêm URL, Wi-Fi, liên hệ, email hoặc văn bản cần chia sẻ.</p></article><article><span>02</span><div className="step-icon">✦</div><h3>Tùy chỉnh</h3><p>Chọn họa tiết, góc và màu phù hợp.</p></article><article><span>03</span><div className="step-icon">↓</div><h3>Tải và kiểm tra</h3><p>Lưu PNG hoặc SVG rồi quét thử trước khi in.</p></article></div></section>
      <section className="final-cta"><div><span className="step-tag">SẴN SÀNG</span><h2>Mã QR tiếp theo<br />chỉ cách vài giây.</h2></div><button className="primary" onClick={scrollToGenerator}>Tạo mã QR miễn phí <span>↗</span></button></section>
      <section className="developer-profile" id="profile"><div className="developer-logo-stage"><img src={assetPath("siamese-cat-dev-logo.webp")} alt="Siamese Cat Dev" width="900" height="900" loading="lazy" /></div><div className="developer-profile-copy"><span className="step-tag">NHÀ PHÁT TRIỂN</span><h2>Được xây dựng bởi<br /><em>Siamese Cat Dev.</em></h2><p>Một công cụ thực tế của hệ sinh thái DJAI Academy, được thiết kế để xử lý công việc ngay trong trình duyệt mà không buộc bạn tạo tài khoản.</p><div className="developer-tags"><span>Thiết kế sản phẩm</span><span>Phát triển phần mềm</span><span>Đào tạo</span></div></div></section>
      <ToolDiscoveryFooter language="vi" currentTool={toolSlug} />
      <footer><div className="footer-identity"><a className="brand footer-brand" href="#top"><img src={assetPath("djai-academy-logo-display.webp")} alt="DJAI Academy" width="384" height="206" /><span><strong>DJayTools</strong><small>by DJAI Academy</small></span></a><p>Công cụ số hữu ích dành cho cộng đồng.</p></div><p className="copyright">© 2026 DJAI Academy</p></footer>
      <ToolPromoModal language="vi" type={promoType} onClose={() => setPromoType(null)} />
    </main>
  );
}

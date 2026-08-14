import Image from "next/image";
import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";
import styles from "../page.module.css";

const APP_PATH = "/Cam_PDF_Scan_Signer_QR-Gen/";
const VI_PATH = `${APP_PATH}vi/`;

export const metadata = {
  title: "Cam PDF Scan Signer QR Gen cho Android | DJAI",
  description: "Quét tài liệu, quản lý tệp, chỉnh sửa và ký PDF, tạo mã QR rồi xuất tệp sạch trong một ứng dụng Android của DJAI.",
  alternates: {
    canonical: VI_PATH,
    languages: { en: APP_PATH, vi: VI_PATH, "x-default": APP_PATH }
  },
  openGraph: {
    title: "Cam PDF Scan Signer QR Gen",
    description: "Ứng dụng Android của DJAI để quét tài liệu, chỉnh sửa và ký PDF, quản lý tệp và tạo mã QR.",
    url: VI_PATH,
    siteName: "DJAI Academy",
    locale: "vi_VN",
    images: [{ url: "/apps/cam-pdf/home.png", width: 390, height: 844, alt: "Màn hình thư viện tài liệu Cam PDF Scan Signer QR Gen" }],
    type: "website"
  },
  twitter: { card: "summary_large_image", title: "Cam PDF Scan Signer QR Gen", description: "Quét, chỉnh sửa, ký, quản lý và xuất tài liệu trên Android.", images: ["/apps/cam-pdf/home.png"] }
};

const features = [
  ["01", "Quét và căn chỉnh", "Chụp tài liệu một hoặc nhiều trang, sửa đường biên, xoay trang và áp dụng bộ lọc giúp bản quét dễ đọc."],
  ["02", "Nhập và sắp xếp", "Nhập PDF, DOCX và hình ảnh; sau đó sắp xếp, đổi tên, nhân bản hoặc xóa tài liệu trong một thư viện."],
  ["03", "Chỉnh sửa và ký", "Sắp xếp lại trang, xóa nội dung, thêm chữ ký, đặt văn bản và ngày tháng, rồi chuẩn bị bản sao giấy tờ để in."],
  ["04", "Kiểm soát khi xuất", "Chọn tên tệp, kích thước trang và chất lượng PDF, nén theo giới hạn upload rồi chia sẻ hoặc in."],
  ["05", "Công cụ PDF thiết yếu", "Ghép, tách, trích xuất, bảo vệ và chuyển đổi trang PDF mà không phải đổi qua nhiều tiện ích."],
  ["06", "QR Studio", "Quét mã QR hoặc tạo mã cho website, văn bản, Wi-Fi, danh bạ và email rồi lưu thành hình ảnh."]
];

const screens = [
  ["home.png", "Thư viện tài liệu", "Lối tắt quét và quản lý tệp trên một màn hình tập trung."],
  ["editor.png", "Chỉnh đường biên", "Điều chỉnh ranh giới trang trước khi tăng cường và xuất."],
  ["export.png", "Đặt tên khi xuất", "Chọn tên, định dạng, kích thước trang và chất lượng trước khi tạo tệp."],
  ["tools.png", "Công cụ tài liệu", "Ký, tạo bản sao giấy tờ, nén, xử lý PDF và chuyển đổi hình ảnh."],
  ["qr.png", "QR Studio", "Tạo và lưu các loại mã QR thường dùng ngay trong ứng dụng."]
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  name: "Cam PDF Scan Signer QR Gen",
  operatingSystem: "Android",
  applicationCategory: "UtilitiesApplication",
  inLanguage: "vi",
  description: "Ứng dụng Android của DJAI để quét tài liệu, chỉnh sửa và ký PDF, quản lý tệp, xuất tài liệu và tạo mã QR.",
  url: `https://www.djai.academy${VI_PATH}`,
  author: { "@type": "Organization", name: "DJAI Academy", url: "https://www.djai.academy/" },
  featureList: features.map(([, title]) => title)
};

export default function VietnameseCamPdfPage() {
  return <>
    <SiteHeader locale="vi" currentRoute="home" languageHref={APP_PATH} />
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <section className={styles.hero}>
        <div className={styles.heroScreens}>
          <Image className={styles.heroScreenLeft} src="/apps/cam-pdf/editor.png" alt="Màn hình chỉnh đường biên tài liệu trong Cam PDF" width={390} height={844} priority />
          <Image className={styles.heroScreenMain} src="/apps/cam-pdf/home.png" alt="Màn hình thư viện tài liệu Cam PDF" width={390} height={844} priority />
          <Image className={styles.heroScreenRight} src="/apps/cam-pdf/qr.png" alt="Màn hình tạo mã QR trong Cam PDF" width={390} height={844} priority />
        </div>
        <div className={styles.heroShade} />
        <div className={styles.heroInner}>
          <div className={styles.productLockup}><Image src="/apps/cam-pdf/icon.png" alt="Biểu tượng ứng dụng Cam PDF" width={72} height={72} /><span>Ứng dụng Android của DJAI</span></div>
          <h1 className={styles.heroTitle}>Cam PDF Scan Signer QR Gen</h1>
          <p className={styles.heroCopy}>Biến giấy tờ, ảnh, PDF và tài liệu văn phòng thành những tệp có tổ chức để chỉnh sửa, ký, nén, đặt tên và chia sẻ trong một không gian làm việc Android.</p>
          <div className={styles.heroActions}><span className={styles.releaseButton}>Đang chuẩn bị phát hành trên Google Play</span><a className={styles.secondaryButton} href="#product">Khám phá ứng dụng</a></div>
          <p className={styles.heroPromise}>Tính năng tài liệu miễn phí. Tệp xuất không có watermark.</p>
        </div>
      </section>

      <section className={styles.releaseStrip} aria-label="Trạng thái sản phẩm">
        <div><strong>Ưu tiên Android</strong><span>Thiết kế cho công việc tài liệu thực tế trên điện thoại</span></div>
        <div><strong>Quy trình tài liệu cục bộ</strong><span>Nội dung tài liệu được xử lý trên thiết bị</span></div>
        <div><strong>Một không gian làm việc</strong><span>Quét, quản lý, chỉnh sửa, ký, xuất và tạo mã QR</span></div>
      </section>

      <section className={styles.features} id="product">
        <header className={styles.sectionHeading}><p className={styles.kicker}>Được xây quanh toàn bộ luồng tài liệu</p><h2>Từ ảnh chụp bằng camera đến tệp cuối cùng có tên rõ ràng.</h2><p>Cam PDF loại bỏ việc chuyển qua lại giữa ứng dụng quét, quản lý tệp, công cụ PDF, chữ ký, nén và tạo QR.</p></header>
        <div className={styles.featureGrid}>{features.map(([number, title, text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>

      <section className={styles.showcase}>
        <header className={styles.sectionHeading}><p className={styles.kicker}>Giao diện sản phẩm</p><h2>Thư viện tài liệu vẫn rõ ràng khi khối lượng công việc tăng.</h2><p>Truy cập nhanh tệp gần đây, điều khiển chỉnh sửa dễ đoán và cài đặt xuất minh bạch giúp công việc quét hằng ngày dễ kiểm tra.</p></header>
        <div className={styles.screenGrid}>{screens.map(([image, title, text]) => <figure key={image}><div className={styles.screenFrame}><Image src={`/apps/cam-pdf/${image}`} alt={`Màn hình ${title} trong Cam PDF Scan Signer QR Gen`} width={390} height={844} /></div><figcaption><strong>{title}</strong><span>{text}</span></figcaption></figure>)}</div>
      </section>

      <section className={styles.privacyBand}>
        <div><p className={styles.kicker}>Quyền riêng tư theo mặc định</p><h2>Tài liệu của bạn không phải một dịch vụ cloud.</h2><p>Bản quét, nội dung nhập, chữ ký và tệp được tạo nằm trong vùng lưu trữ của ứng dụng trừ khi bạn chủ động chia sẻ hoặc xuất. Metadata về tài khoản, sử dụng, đồng ý, analytics, quảng cáo và thông báo được mô tả riêng trong chính sách quyền riêng tư.</p></div>
        <div className={styles.privacyLinks}><a href={`${APP_PATH}privacy/`}>Đọc chính sách quyền riêng tư (tiếng Anh)</a><a href={`${APP_PATH}terms/`}>Đọc điều khoản (tiếng Anh)</a><a href={`${APP_PATH}delete-account/`}>Xóa tài khoản (tiếng Anh)</a><a href="mailto:contact@djai.academy">Liên hệ hỗ trợ</a></div>
      </section>

      <section className={styles.details}>
        <div className={styles.detailCopy}><p className={styles.kicker}>Thiết kế cho việc xử lý tệp thật</p><h2>Giữ quyền kiểm soát trước và sau khi xuất.</h2><p>Tệp đã nhập vẫn hiển thị trong thư viện với chức năng sắp xếp và quản lý. Trước khi xuất, hãy chọn tên tệp cuối cùng thay vì chấp nhận một nhãn tự động rồi phải sửa sau.</p></div>
        <dl className={styles.detailList}>
          <div><dt>Nhập</dt><dd>PDF, DOCX, JPG, PNG và các định dạng ảnh phổ biến</dd></div>
          <div><dt>Quản lý</dt><dd>Sắp xếp, đổi tên, nhân bản, chọn và xóa tài liệu</dd></div>
          <div><dt>Chỉnh sửa</dt><dd>Cắt, xoay, tăng cường, sắp xếp lại, xóa, chú thích và ký</dd></div>
          <div><dt>Hoàn tất</dt><dd>Xuất PDF và ảnh có tên, với điều khiển chất lượng và kích thước</dd></div>
        </dl>
      </section>

      <section className={styles.finalCta}><Image src="/apps/cam-pdf/icon.webp" alt="Biểu tượng Cam PDF" width={92} height={92} /><p className={styles.kicker}>Đang chuẩn bị ra mắt</p><h2>Cam PDF Scan Signer QR Gen</h2><p>Bản Android đang được chuẩn bị cho Google Play. Thông tin sản phẩm và quyền riêng tư trên website sẽ tiếp tục là tài liệu tham chiếu chính thức của ứng dụng.</p><a href="mailto:contact@djai.academy?subject=Cam%20PDF%20app">contact@djai.academy</a></section>
    </main>
    <SiteFooter locale="vi" />
  </>;
}

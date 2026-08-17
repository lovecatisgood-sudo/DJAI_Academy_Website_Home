import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";
import Link from "next/link";

export const metadata = {
  title: "Dự án DJAI | Website, ứng dụng, game và sản phẩm Web3",
  description: "Xem các dự án DJAI được phép giới thiệu công khai: ứng dụng di động, website doanh nghiệp, game tương tác và sản phẩm Web3.",
  alternates: { canonical: "/portfolio/vi/", languages: { th: "/portfolio/", en: "/portfolio/en/", vi: "/portfolio/vi/", "x-default": "/portfolio/" } },
  openGraph: { title: "Dự án tiêu biểu của DJAI", description: "Các sản phẩm được chọn lọc trong mảng website, ứng dụng, game và Web3.", url: "/portfolio/vi/", siteName: "DJAI Academy", images: ["/portfolio/optimized/websites/Siamese_Cat_Cafe.webp"], type: "website", locale: "vi_VN" }
};

const categories = [
  { id: "mobile", label: "Ứng dụng di động", title: "Công cụ tài liệu dùng hằng ngày", summary: "Sản phẩm Android gom thao tác quét, quản lý tệp, chỉnh sửa PDF, ký tên và tạo QR vào một luồng gọn.", projects: [
    ["Cam PDF Scan Signer QR Gen", "/apps/cam-pdf/home.png", "Không gian làm việc tài liệu trên Android: quét và sắp xếp tệp, nhập PDF, DOCX và ảnh, chỉnh sửa, ký, xuất tệp và xử lý QR.", ["Android", "Quét tài liệu", "PDF và QR"], "/Cam_PDF_Scan_Signer_QR-Gen/"]
  ]},
  { id: "website", label: "Website", title: "Website cho doanh nghiệp, sản phẩm và thương hiệu địa phương", summary: "Từ website B2B đến trang dịch vụ và landing page, mỗi dự án tập trung vào thông tin người dùng cần để đưa ra bước tiếp theo.", projects: [
    ["Siam Silk Road Global Logistic", "/portfolio/optimized/websites/Siam_Silk_Road_Global_Logistic.webp", "Website doanh nghiệp logistics và thương mại quốc tế đặt tại Thái Lan, phục vụ kết nối với thị trường Trung Á và khu vực lân cận.", ["Website doanh nghiệp", "B2B"], "https://ssrgc.com/"],
    ["KuSolution Roof", "/portfolio/optimized/websites/Kusolution.webp", "Landing page dịch vụ sửa mái, dẫn người dùng từ nhận biết vấn đề đến yêu cầu khảo sát.", ["Landing page", "Tạo khách hàng tiềm năng"], "https://roof.kusolutions.co/"],
    ["Siamese Cat Cafe", "/portfolio/optimized/websites/Siamese_Cat_Cafe.webp", "Website giới thiệu trải nghiệm quán, những chú mèo được nhận nuôi và câu chuyện thương hiệu gần Mega Bangna.", ["Kinh doanh địa phương", "SEO"], "https://siamesecat.cafe/"],
    ["Siamese Cat Creative Club", "/portfolio/optimized/websites/Siamese_Cat_Creative_Club.webp", "Website trung tâm sáng tạo giúp phụ huynh tìm hiểu chương trình sau giờ học, cuối tuần và các gói hoạt động cho trẻ.", ["Giáo dục", "Khám phá khóa học"], "https://creative.siamesecat.cafe/"],
    ["Siamese Cat Hotel", "/portfolio/optimized/websites/Siamese_Cat_Hotel.webp", "Website dịch vụ lưu trú cho mèo, mở rộng hệ sinh thái thương hiệu với luồng tìm hiểu và đặt dịch vụ rõ ràng.", ["Dịch vụ", "Ý định đặt chỗ"], "https://hotel.siamesecat.cafe/"],
    ["Luna Homemade Bakery", "/portfolio/optimized/websites/Luna_Bakery.webp", "Website tiệm bánh và cà phê tại Korat, giới thiệu sản phẩm và câu chuyện kinh doanh địa phương.", ["Ẩm thực", "Thương hiệu địa phương"], "https://lunahomemadebakery.com/"]
  ]},
  { id: "game", label: "Game tương tác", title: "Game, mini-game và cơ chế giữ chân cộng đồng", summary: "Các trải nghiệm từ metaverse đến mini-game trên Telegram, kết hợp vòng lặp chơi, phần thưởng và khả năng chia sẻ.", projects: [
    ["XANA Metaverse", "/portfolio/optimized/games/Xana_Metaverse.webp", "Hệ sinh thái metaverse quy mô lớn phát triển cùng Noborderz, gồm ứng dụng di động, trải nghiệm NFT duel và hạ tầng marketplace.", ["Metaverse", "Ứng dụng di động"]],
    ["Flipper On-chain Game", "/portfolio/optimized/games/Flipper_Game_Onchain_odds_coin_flip_game.webp", "Ý tưởng game tung đồng xu với xác suất công khai on-chain để người chơi có thể kiểm tra cơ chế.", ["Game on-chain", "Xác suất minh bạch"]],
    ["Pump Dump Price Prediction", "/portfolio/optimized/games/Pump_Dump_Price_Prediction_Game.webp", "Game dự đoán hướng giá BTC hoặc ETH trong 30 giây, dùng dữ liệu thị trường và vòng chơi ngắn.", ["Dữ liệu thị trường", "Thời gian thực"]],
    ["Kong Banana", "/portfolio/optimized/games/Kong_Banana.webp", "Mini-game tap-to-earn trên Telegram với token thưởng, giới thiệu bạn bè, năng lượng và cơ chế tăng trưởng cộng đồng.", ["Telegram", "Tap-to-earn"]],
    ["Siamese Cat Vs Dog", "/portfolio/optimized/games/Siamese_Cat_Vs_Dog.webp", "Mini-game marketing cho quán cà phê mèo với năm màn chơi, ba mức độ khó, pixel art, bảng xếp hạng và phần thưởng chia sẻ.", ["Mini-game", "Viral marketing"]]
  ]},
  { id: "web3", label: "Web3 và crypto", title: "Hệ sinh thái token, NFT marketplace và sản phẩm RWA", summary: "Những dự án được chọn lọc về kinh tế token, marketplace đa chuỗi, thương hiệu crypto và kiến trúc sản phẩm Web3.", projects: [
    ["Cazi Cazi", "/portfolio/optimized/crypto_apps/Cazi_Cazi_Full_Ecosystem.webp", "Hệ sinh thái game play-to-earn gồm staking, yield farming, thiết kế kinh tế token và hạ tầng sản phẩm.", ["P2E", "Token economy"]],
    ["Felicite The Space Cat", "/portfolio/optimized/crypto_apps/Felicite.webp", "Thương hiệu meme-token trên Solana dựa trên câu chuyện chú mèo đầu tiên bay vào không gian, với artwork gốc và định hướng ra mắt.", ["Solana", "Định hướng nghệ thuật"]],
    ["Lolipop NFT Marketplace", "/portfolio/optimized/crypto_apps/Lolipop_NFT_Marketplace.webp", "NFT marketplace trên Ethereum, Base và BSC với hệ thống hình ảnh vui nhộn, token utility và cơ chế thưởng.", ["NFT marketplace", "Đa chuỗi"]],
    ["Web3 RWA Real Estate", "/portfolio/optimized/crypto_apps/Web3_RWA_Realestate.webp", "Ý tưởng token hóa bất động sản, đi cùng hoạch định sản phẩm, kiến trúc và chiến lược thực thi Web3.", ["RWA", "Kiến trúc sản phẩm"]]
  ]}
];

const allProjects = categories.flatMap((category) => category.projects);
const structuredData = { "@context": "https://schema.org", "@type": "CollectionPage", name: "Dự án DJAI", url: "https://www.djai.academy/portfolio/vi/", inLanguage: "vi", hasPart: allProjects.map(([name, image, description, , href]) => ({ "@type": "CreativeWork", name, image: `https://www.djai.academy${image}`, description, ...(href ? { url: href } : {}) })) };

export default function VietnamesePortfolioPage() {
  return <><SiteHeader locale="vi" currentRoute="portfolio" /><main className="portfolio-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    <section className="portfolio-hero"><p className="eyebrow">CÁC DỰ ÁN ĐƯỢC PHÉP GIỚI THIỆU CÔNG KHAI</p><h1>Sản phẩm DJAI đã tham gia xây dựng</h1><p>Đây là tuyển chọn dự án thuộc nhiều loại hình khác nhau, không phải toàn bộ công việc đội ngũ từng thực hiện. Mỗi ví dụ cho thấy bài toán, loại sản phẩm và phạm vi năng lực liên quan.</p><div className="portfolio-hero-actions"><Link className="button primary" href="/service/vi/">Trao đổi về dự án</Link><Link className="button secondary dark" href="/blog/vi/">Đọc hướng dẫn xây sản phẩm</Link></div></section>
    <section className="portfolio-stats" aria-label="Tóm tắt dự án"><div><strong>{allProjects.length}</strong><span>dự án tiêu biểu</span></div><div><strong>{categories.length}</strong><span>nhóm sản phẩm</span></div><div><strong>Công khai</strong><span>chỉ gồm dự án được phép giới thiệu</span></div></section>
    <nav className="portfolio-category-nav" aria-label="Nhóm dự án">{categories.map(({ id, label }) => <a href={`#${id}`} key={id}>{label}</a>)}</nav>
    {categories.map((category) => <section className="portfolio-section" id={category.id} key={category.id}><div className="portfolio-section-heading"><p className="eyebrow">{category.label}</p><h2>{category.title}</h2><p>{category.summary}</p></div><div className="portfolio-grid">{category.projects.map(([name, image, description, tags, href]) => <article className="portfolio-card" key={name}><div className="portfolio-card-image"><img src={image} alt={`Ảnh dự án ${name}`} width="1200" height="675" loading="lazy" decoding="async" /></div><div className="portfolio-card-body"><h3>{name}</h3><p>{description}</p><div className="portfolio-tags">{tags.map((tag) => <span key={tag}>{tag}</span>)}</div>{href && <a className="portfolio-live-link" href={href}>Xem sản phẩm đang hoạt động</a>}</div></article>)}</div></section>)}
    <section className="portfolio-cta"><p className="eyebrow">BẮT ĐẦU TỪ BÀI TOÁN, KHÔNG PHẢI TỪ DANH SÁCH TÍNH NĂNG</p><h2>Bạn đang muốn xây loại sản phẩm nào?</h2><p>Hãy mô tả người sẽ dùng, việc họ cần hoàn thành và giới hạn hiện tại. DJAI sẽ giúp thu gọn phạm vi trước khi chọn công nghệ.</p><a className="button primary" href="/development/vi/">Xem quy trình phát triển</a></section>
  </main><SiteFooter locale="vi" /></>;
}

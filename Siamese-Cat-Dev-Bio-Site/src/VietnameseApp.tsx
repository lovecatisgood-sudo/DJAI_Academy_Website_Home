import { ArrowDown, ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import SocialLinks, { HeaderSocialLinks } from './SocialLinks';

const assetPath = (path: string) => `${import.meta.env.BASE_URL}${path}`;

function Header() {
  const [open, setOpen] = useState(false);
  const nav = [['Giới thiệu', '#about'], ['Hành trình', '#journey'], ['Công việc', '#work'], ['Bài viết', '/siamese_cat/dev/blog/en/'], ['DJAI Academy', 'https://www.djai.academy/vi/'], ['TH', '/siamese_cat/dev/'], ['EN', '/siamese_cat/dev/en/'], ['Liên hệ', '#contact']];
  return <header className="site-header is-scrolled">
    <a className="brand" href="#top" aria-label="Trang chủ Siamese Cat Dev"><img src={assetPath('siamese-cat-dev-wordmark.webp')} alt="Siamese Cat Dev" /></a>
    <nav className="desktop-nav" aria-label="Điều hướng chính">{nav.map(([label, href]) => <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noreferrer' : undefined}>{label}</a>)}</nav>
    <div className="header-actions"><HeaderSocialLinks language="vi" /><button className="menu-button" type="button" aria-label={open ? 'Đóng menu' : 'Mở menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button></div>
    {open && <nav className="mobile-nav" aria-label="Điều hướng di động">{nav.map(([label, href]) => <a key={label} href={href} onClick={() => setOpen(false)}>{label}<ArrowUpRight aria-hidden="true" /></a>)}</nav>}
  </header>;
}

const skills = ['THIẾT KẾ SẢN PHẨM', 'QUẢN LÝ DỰ ÁN', 'PHÁT TRIỂN PHẦN MỀM', 'VIBE CODING', 'AI-ASSISTED DEVELOPMENT', 'ĐÀO TẠO'];
const work = [
  ['Chiến lược và thiết kế sản phẩm', 'Làm rõ vấn đề, người dùng, phạm vi và luồng công việc trước khi viết nhiều mã.'],
  ['Phát triển phần mềm', 'Xây website, ứng dụng, tự động hóa và công cụ có thể kiểm thử, triển khai và bảo trì.'],
  ['Vibe coding có kỷ luật', 'Dùng AI để tăng tốc nhưng vẫn giữ kiểm tra, bằng chứng, bảo mật và trách nhiệm kỹ thuật.'],
  ['Đào tạo thực hành', 'Giúp người học chuyển từ prompt và prototype sang sản phẩm hoạt động thật.']
];

export default function VietnameseApp() {
  useEffect(() => {
    document.documentElement.lang = 'vi';
    document.title = 'Siamese Cat Dev | Thiết kế sản phẩm, phát triển và Vibe Coding';
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'Siamese Cat Dev là đối tác thiết kế sản phẩm, quản lý dự án và phát triển phần mềm, xây sản phẩm số bằng Vibe Coding và quy trình hỗ trợ bởi AI.');
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', 'https://www.djai.academy/siamese_cat/dev/vi/');
  }, []);

  return <div className="app-shell">
    <Header />
    <main>
      <section className="hero" id="top">
        <div className="hero-grid" aria-hidden="true" /><div className="hero-glow hero-glow-blue" aria-hidden="true" /><div className="hero-glow hero-glow-orange" aria-hidden="true" />
        <div className="hero-heading-wrap"><p className="eyebrow">PRODUCT DESIGN <span>/</span> DEVELOPMENT <span>/</span> VIBE CODING</p><h1><span>Xin chào, tôi là</span><span className="hero-name">SIAMESE CAT DEV</span></h1></div>
        <div className="hero-mascot-stage"><div className="mascot-wrap"><img src={assetPath('siamese-cat-dev-character.webp')} alt="Nhân vật Siamese Cat Dev đang viết mã trên laptop" /></div></div>
        <div className="hero-bottom"><div className="hero-intro"><p>Tôi biến những ý tưởng sản phẩm đã được suy nghĩ kỹ thành phần mềm chất lượng, hoạt động thật và được xây nhanh hơn với Vibe Coding.</p><span>Đối tác phát triển và đào tạo của DJAI Academy</span></div><div className="hero-actions"><a className="button button-primary" href="#about">Tìm hiểu thêm <ArrowDown /></a><a className="text-link" href="#work">Xem công việc <ArrowRight /></a></div></div>
      </section>

      <section className="marquee-section" aria-label="Năng lực">{[skills, [...skills].reverse()].map((items, row) => <div className={`marquee-row ${row ? 'reverse' : ''}`} key={row}><div className="marquee-track">{[...items, ...items, ...items].map((item, index) => <span key={`${item}-${index}`}>{item}<i aria-hidden="true" /></span>)}</div></div>)}</section>

      <section className="section-shell section-pad" id="about"><span className="section-kicker">01 / GIỚI THIỆU</span><h2>Xây sản phẩm có ích,<br /><em>không chỉ tạo prototype đẹp.</em></h2><p className="scroll-reveal">Siamese Cat Dev làm việc ở giao điểm của tư duy sản phẩm, thiết kế trải nghiệm, kỹ thuật phần mềm và AI. Mục tiêu là đưa một ý tưởng đến trạng thái người thật có thể dùng, đội ngũ có thể vận hành và nhà phát triển có thể tiếp tục cải thiện.</p></section>

      <section className="section-shell section-pad" id="journey"><span className="section-kicker">02 / HÀNH TRÌNH</span><h2>Học bằng cách xây,<br /><em>xác minh bằng cách triển khai.</em></h2><div className="work-grid">{[['Học tại DJAI Academy', 'Rèn tư duy sản phẩm, AI, vibe coding và cách đưa phần mềm vào vận hành.'], ['Xây cho nhu cầu thật', 'Chuyển yêu cầu kinh doanh thành website, ứng dụng, công cụ và tự động hóa.'], ['Chia sẻ lại quy trình', 'Viết bài, phát hành công cụ miễn phí và đào tạo để người khác có thể áp dụng.']].map(([title, text], index) => <article className="work-card" key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>

      <section className="section-shell section-pad" id="work"><span className="section-kicker">03 / CÔNG VIỆC</span><h2>Từ vấn đề đến<br /><em>sản phẩm đã triển khai.</em></h2><div className="work-grid">{work.map(([title, text], index) => <article className="work-card" key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div><a className="button button-primary" href="https://www.djai.academy/portfolio/vi/">Xem danh mục dự án <ArrowUpRight /></a></section>

      <section className="section-shell section-pad"><span className="section-kicker">04 / DJAI ACADEMY</span><h2>Một quan hệ đối tác<br /><em>giữa học tập và thực thi.</em></h2><p>Siamese Cat Dev vừa học từ DJAI Academy, vừa hợp tác phát triển và đào tạo. Kiến thức được kiểm tra qua sản phẩm thật; kinh nghiệm từ sản phẩm lại quay về cải thiện cách hướng dẫn người học.</p><div className="hero-actions"><a className="button button-primary" href="https://www.djai.academy/course/vi/">Xem lộ trình học <ArrowUpRight /></a><a className="text-link" href="https://www.djai.academy/siamese_cat/vi/">Xem quan hệ đối tác <ArrowRight /></a></div></section>
    </main>
    <footer id="contact"><div className="section-shell footer-content"><div><span className="section-kicker">05 / LIÊN HỆ</span><h2>Hãy cùng xây<br /><em>thứ có ích.</em></h2></div><div className="footer-side"><p>Tôi làm việc với doanh nghiệp, nhà phát triển và người học muốn biến một ý tưởng tốt thành phần mềm hoạt động thật.</p><a className="button button-primary" href="https://www.djai.academy/service/vi/">Trao đổi về dự án <ArrowUpRight /></a><SocialLinks language="vi" /></div></div><div className="footer-bottom section-shell"><span>Thiết kế và phát triển bởi Siamese Cat Dev</span><a href="#top">Lên đầu trang <ArrowUpRight /></a></div></footer>
  </div>;
}

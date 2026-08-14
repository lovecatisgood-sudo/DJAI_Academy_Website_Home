import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const distDir = new URL('../dist/', import.meta.url);
const englishDir = join(distDir.pathname, 'en');
const vietnameseDir = join(distDir.pathname, 'vi');
const courseDir = join(distDir.pathname, 'course');
const courseThaiDir = join(courseDir, 'th');
const courseVietnameseDir = join(courseDir, 'vi');
const indexPath = join(distDir.pathname, 'index.html');
const englishIndexPath = join(englishDir, 'index.html');
const vietnameseIndexPath = join(vietnameseDir, 'index.html');
const courseIndexPath = join(courseDir, 'index.html');
const courseThaiIndexPath = join(courseThaiDir, 'index.html');
const courseVietnameseIndexPath = join(courseVietnameseDir, 'index.html');

mkdirSync(englishDir, { recursive: true });
mkdirSync(vietnameseDir, { recursive: true });
mkdirSync(courseDir, { recursive: true });
mkdirSync(courseThaiDir, { recursive: true });
mkdirSync(courseVietnameseDir, { recursive: true });

const englishHtml = readFileSync(indexPath, 'utf8')
  .replace('<html lang="th">', '<html lang="en">')
  .replace(
    'content="Siamese Cat Dev คือ product designer, project manager และ software development partner ที่สร้าง digital product คุณภาพสูงด้วย Vibe Coding และ AI-assisted development"',
    'content="Siamese Cat Dev is a product designer, project manager, and software development partner building useful digital products with Vibe Coding."',
  )
  .replace(
    '<link rel="canonical" href="https://www.djai.academy/siamese_cat/dev/" />',
    '<link rel="canonical" href="https://www.djai.academy/siamese_cat/dev/en/" />',
  )
  .replaceAll(
    'Siamese Cat Dev | Product, Development และ Vibe Coding',
    'Siamese Cat Dev | Product, Development & Vibe Coding',
  )
  .replaceAll(
    'Product design, software development, AI-assisted building และเครื่องมือฟรีจาก Siamese Cat Dev',
    'Product design, software development, AI-assisted building, and public tools from Siamese Cat Dev.',
  )
  .replace(
    '<meta property="og:url" content="https://www.djai.academy/siamese_cat/dev/" />',
    '<meta property="og:url" content="https://www.djai.academy/siamese_cat/dev/en/" />',
  )
  .replace(
    'Siamese Cat Dev: Product Design, Software Development และ Vibe Coding',
    'Siamese Cat Dev: Product Design, Software Development and Vibe Coding',
  )
  .replace(
    'สร้าง digital product, software และ AI-assisted workflow ที่ใช้งานได้จริง\n          พร้อมแบ่งปันบทความและเครื่องมือฟรีสำหรับ builders.',
    'Building useful digital products, software, and AI-assisted workflows while sharing practical articles and free tools for builders.',
  )
  .replace('อ่านบล็อก Siamese Cat Dev', 'Read the Siamese Cat Dev blog')
  .replace('เข้าร่วม DJAI Academy community', 'Join the DJAI Academy community')
  .replace('https://www.djai.academy/academy/', 'https://www.djai.academy/academy/en/')
  .replace(
    'href="/siamese_cat/dev/blog/"',
    'href="/siamese_cat/dev/blog/en/"',
  );

writeFileSync(englishIndexPath, englishHtml);

const vietnameseDescription = 'Siamese Cat Dev là đối tác thiết kế sản phẩm, quản lý dự án và phát triển phần mềm, xây sản phẩm số bằng Vibe Coding và quy trình hỗ trợ bởi AI.';
const vietnameseTitle = 'Siamese Cat Dev | Thiết kế sản phẩm, phát triển và Vibe Coding';
const vietnameseCanonical = 'https://www.djai.academy/siamese_cat/dev/vi/';
const vietnameseFallback = `<div id="root"><main>
  <h1>Siamese Cat Dev: Thiết kế sản phẩm, phát triển phần mềm và Vibe Coding</h1>
  <p>Biến ý tưởng sản phẩm thành phần mềm hoạt động thật bằng tư duy sản phẩm, kỹ thuật và quy trình hỗ trợ bởi AI.</p>
  <section><h2>Từ vấn đề đến sản phẩm đã triển khai</h2><p>Thiết kế, phát triển, kiểm thử và đưa website, ứng dụng, tự động hóa cùng công cụ hữu ích vào vận hành.</p></section>
  <section><h2>Đối tác phát triển và đào tạo của DJAI Academy</h2><p>Học qua việc xây sản phẩm thật rồi chia sẻ lại quy trình cho doanh nghiệp, nhà phát triển và người học.</p></section>
  <nav aria-label="Liên kết Siamese Cat Dev"><a href="/siamese_cat/dev/blog/en/">Đọc bài viết hiện có</a><a href="https://www.djai.academy/course/vi/">Xem lộ trình học DJAI</a><a href="https://www.djai.academy/service/vi/">Trao đổi về dự án</a></nav>
</main></div>`;
const vietnameseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Siamese Cat Dev',
  url: vietnameseCanonical,
  logo: 'https://www.djai.academy/siamese_cat/dev/siamese-cat-dev-logo.webp',
  inLanguage: 'vi',
  description: vietnameseDescription,
  sameAs: ['https://www.djai.academy/', 'https://x.com/siamesecatdev', 'https://www.instagram.com/djcatdev/', 'https://www.facebook.com/people/Siamese-Cat-Dev/61592514145429/']
};
const vietnameseHtml = readFileSync(indexPath, 'utf8')
  .replace('<html lang="th">', '<html lang="vi">')
  .replace(/<meta\s+name="description"[\s\S]*?\/>/, `<meta name="description" content="${vietnameseDescription}" />`)
  .replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${vietnameseCanonical}" />`)
  .replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${vietnameseTitle}" />`)
  .replace(/<meta\s+property="og:description"[\s\S]*?\/>/, `<meta property="og:description" content="${vietnameseDescription}" />`)
  .replace(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${vietnameseCanonical}" />`)
  .replace(/<meta name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${vietnameseTitle}" />`)
  .replace(/<meta\s+name="twitter:description"[\s\S]*?\/>/, `<meta name="twitter:description" content="${vietnameseDescription}" />`)
  .replace(/<title>[\s\S]*?<\/title>/, `<title>${vietnameseTitle}</title>`)
  .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, `<script type="application/ld+json">${JSON.stringify(vietnameseSchema)}</script>`)
  .replace(/<div id="root">[\s\S]*?<\/div>/, vietnameseFallback);

writeFileSync(vietnameseIndexPath, vietnameseHtml);

const courseLocales = {
  en: {
    title: 'Vibe Code a Money-Making Product | Free Live Course',
    description: 'Join a free one-hour live English course on 22 August 2026 and learn how to turn a vibe-coded MVP into a product that can be shipped and sold.',
    canonical: 'https://www.djai.academy/siamese_cat/dev/course/',
    name: 'Your Journey to Vibe Code a Money-Making Product',
    fallback: `<div id="root"><header><a href="/en/"><img src="/siamese_cat/dev/djai-academy-logo.webp" alt="DJAI Academy"></a></header><main>
      <p>Free live English course · 22 August 2026 · 1:00–2:00 PM ICT</p>
      <h1>Vibe Code a Product That Can Make Money</h1>
      <p>Learn how experienced product builders move from an AI-generated MVP to reliable software that can be shipped, used, and sold.</p>
      <section><h2>From prompting to production</h2><p>Choose a valuable product, apply professional software-development standards, harden the MVP, and plan a practical rollout.</p></section>
      <section><h2>Meet both instructors</h2><img src="/founder-djai-display.webp" alt="Mr. A, founder of DJAI Academy, CTO, and course instructor"><p>Learn from Siamese Cat Dev and Mr. A, founder of DJAI Academy, experienced CTO, and instructor of DJAI's offline course.</p></section>
      <a href="/MONEY_MAKING_PRODUCT/">Learn more and register free</a><a href="/siamese_cat/dev/course/th/" hreflang="th">อ่านภาษาไทย</a>
    </main></div>`,
  },
  th: {
    title: 'Vibe Code สินค้าให้สร้างรายได้ | คลาสสดออนไลน์ฟรี',
    description: 'หน้าลงทะเบียนภาษาไทยสำหรับคลาสสดภาษาอังกฤษฟรี 1 ชั่วโมง วันที่ 22 สิงหาคม 2569 เรียนรู้วิธีพัฒนา MVP จาก Vibe Coding ให้เป็นสินค้าที่พร้อมเปิดตัวและสร้างรายได้',
    canonical: 'https://www.djai.academy/siamese_cat/dev/course/th/',
    name: 'เส้นทางสู่การ Vibe Code สินค้าที่สร้างรายได้',
    fallback: `<div id="root"><header><a href="/"><img src="/siamese_cat/dev/djai-academy-logo.webp" alt="DJAI Academy"></a></header><main>
      <p>คลาสสดออนไลน์ฟรี · 22 สิงหาคม 2569 · 13:00–14:00 น.</p>
      <h1>Vibe Code สินค้าให้สร้างรายได้จริง</h1>
      <p>เรียนรู้วิธีพัฒนาต้นแบบจาก AI ให้เป็นซอฟต์แวร์ที่น่าเชื่อถือ พร้อมเปิดตัว ใช้งาน และขายได้จริง</p>
      <section><h2>จากการ Prompt สู่ Production</h2><p>เลือกสินค้าที่มีคุณค่า ใช้มาตรฐานพัฒนาซอฟต์แวร์ ปรับ MVP ให้แข็งแรง และวางแผนเปิดตัวอย่างเป็นระบบ</p></section>
      <section><h2>พบกับผู้สอนทั้งสองคน</h2><img src="/founder-djai-display.webp" alt="Mr. A ผู้ก่อตั้ง DJAI Academy, CTO และผู้สอน"><p>เรียนกับ Siamese Cat Dev และ Mr. A ผู้ก่อตั้ง DJAI Academy, CTO ที่มีประสบการณ์ และผู้สอนคอร์สออฟไลน์ของ DJAI</p></section>
      <a href="/MONEY_MAKING_PRODUCT/">ดูรายละเอียดและลงทะเบียนฟรี</a><a href="/siamese_cat/dev/course/" hreflang="en">Read in English</a>
    </main></div>`,
  },
  vi: {
    title: 'Vibe Code sản phẩm tạo doanh thu | Lớp học trực tiếp miễn phí',
    description: 'Trang tiếng Việt cho lớp học trực tiếp bằng tiếng Anh kéo dài một giờ ngày 22 tháng 8 năm 2026, hướng dẫn biến MVP vibe-coded thành sản phẩm có thể phát hành và bán.',
    canonical: 'https://www.djai.academy/siamese_cat/dev/course/vi/',
    name: 'Hành trình Vibe Code một sản phẩm tạo doanh thu',
    fallback: `<div id="root"><header><a href="/vi/"><img src="/siamese_cat/dev/djai-academy-logo.webp" alt="DJAI Academy"></a></header><main>
      <p>Lớp học trực tiếp miễn phí bằng tiếng Anh · 22 tháng 8 năm 2026 · 13:00–14:00 ICT</p>
      <h1>Vibe Code một sản phẩm có thể tạo doanh thu</h1>
      <p>Học cách người xây sản phẩm có kinh nghiệm đưa MVP do AI hỗ trợ thành phần mềm đáng tin cậy, có thể phát hành, sử dụng và bán.</p>
      <section><h2>Từ prompt đến production</h2><p>Chọn sản phẩm có giá trị, áp dụng tiêu chuẩn phát triển chuyên nghiệp, gia cố MVP và lập kế hoạch ra mắt thực tế.</p></section>
      <section><h2>Gặp hai giảng viên</h2><img src="/founder-djai-display.webp" alt="Mr. A, nhà sáng lập DJAI Academy, CTO và giảng viên"><p>Học cùng Siamese Cat Dev và Mr. A, nhà sáng lập DJAI Academy, CTO giàu kinh nghiệm và giảng viên khóa học trực tiếp của DJAI.</p></section>
      <a href="/MONEY_MAKING_PRODUCT/">Xem chi tiết và đăng ký miễn phí</a><a href="/siamese_cat/dev/course/" hreflang="en">Read in English</a>
    </main></div>`,
  },
};

function buildCourseHtml(language) {
  const locale = courseLocales[language];
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'EducationEvent',
    name: locale.name,
    description: locale.description,
    url: locale.canonical,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
    startDate: '2026-08-22T13:00:00+07:00',
    endDate: '2026-08-22T14:00:00+07:00',
    inLanguage: 'en',
    isAccessibleForFree: true,
    location: { '@type': 'VirtualLocation', url: 'https://school.djai.academy/' },
    organizer: [
      { '@type': 'Organization', name: 'DJAI Academy', url: 'https://www.djai.academy/' },
      { '@type': 'Organization', name: 'Siamese Cat Dev', url: 'https://www.djai.academy/siamese_cat/dev/' },
    ],
    performer: [
      { '@type': 'Person', name: 'Siamese Cat Dev' },
      { '@type': 'Person', name: 'Mr. A', jobTitle: language === 'th' ? 'ผู้ก่อตั้ง DJAI Academy และ CTO' : 'Founder of DJAI Academy and Chief Technology Officer' },
    ],
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'THB', availability: 'https://schema.org/InStock', url: 'https://www.djai.academy/MONEY_MAKING_PRODUCT/' },
  };
  const alternates = `<link rel="alternate" hreflang="en" href="https://www.djai.academy/siamese_cat/dev/course/" />
    <link rel="alternate" hreflang="th" href="https://www.djai.academy/siamese_cat/dev/course/th/" />
    <link rel="alternate" hreflang="vi" href="https://www.djai.academy/siamese_cat/dev/course/vi/" />
    <link rel="alternate" hreflang="x-default" href="https://www.djai.academy/siamese_cat/dev/course/" />`;

  return readFileSync(indexPath, 'utf8')
    .replace('<html lang="th">', `<html lang="${language}">`)
    .replace(/<meta\s+name="description"[\s\S]*?\/>/, `<meta name="description" content="${locale.description}" />`)
    .replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${locale.canonical}" />`)
    .replace(/\s*<link rel="alternate"[^>]*>/g, '')
    .replace(`    <meta property="og:type"`, `    ${alternates}\n    <meta property="og:type"`)
    .replace(/<meta property="og:type"[^>]*>/, '<meta property="og:type" content="website" />')
    .replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${locale.title}" />`)
    .replace(/<meta\s+property="og:description"[\s\S]*?\/>/, `<meta property="og:description" content="${locale.description}" />`)
    .replace(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${locale.canonical}" />`)
    .replace(/<meta property="og:image"[^>]*>/, '<meta property="og:image" content="https://www.djai.academy/founder-djai-display.webp" />')
    .replace(/<meta name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${locale.title}" />`)
    .replace(/<meta\s+name="twitter:description"[\s\S]*?\/>/, `<meta name="twitter:description" content="${locale.description}" />`)
    .replace(/<meta name="twitter:image"[^>]*>/, '<meta name="twitter:image" content="https://www.djai.academy/founder-djai-display.webp" />')
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${locale.title}</title>`)
    .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, `<script type="application/ld+json">${JSON.stringify(schema)}</script>`)
    .replace(/<div id="root">[\s\S]*?<\/div>/, locale.fallback);
}

writeFileSync(courseIndexPath, buildCourseHtml('en'));
writeFileSync(courseThaiIndexPath, buildCourseHtml('th'));
writeFileSync(courseVietnameseIndexPath, buildCourseHtml('vi'));

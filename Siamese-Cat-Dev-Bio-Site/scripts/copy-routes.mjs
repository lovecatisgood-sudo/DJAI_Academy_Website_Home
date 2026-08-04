import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const distDir = new URL('../dist/', import.meta.url);
const englishDir = join(distDir.pathname, 'en');
const courseDir = join(distDir.pathname, 'course');
const courseThaiDir = join(courseDir, 'th');
const indexPath = join(distDir.pathname, 'index.html');
const englishIndexPath = join(englishDir, 'index.html');
const courseIndexPath = join(courseDir, 'index.html');
const courseThaiIndexPath = join(courseThaiDir, 'index.html');

mkdirSync(englishDir, { recursive: true });
mkdirSync(courseDir, { recursive: true });
mkdirSync(courseThaiDir, { recursive: true });

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

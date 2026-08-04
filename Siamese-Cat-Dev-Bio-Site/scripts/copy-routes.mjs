import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const distDir = new URL('../dist/', import.meta.url);
const englishDir = join(distDir.pathname, 'en');
const courseDir = join(distDir.pathname, 'course');
const indexPath = join(distDir.pathname, 'index.html');
const englishIndexPath = join(englishDir, 'index.html');
const courseIndexPath = join(courseDir, 'index.html');

mkdirSync(englishDir, { recursive: true });
mkdirSync(courseDir, { recursive: true });

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

const courseTitle = 'Vibe Code a Money-Making Product | Free Live Course';
const courseDescription = 'Join a free one-hour live English course on 22 August 2026 and learn how to turn a vibe-coded MVP into a product that can be shipped and sold.';
const courseCanonical = 'https://www.djai.academy/siamese_cat/dev/course/';
const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'EducationEvent',
  name: 'Your Journey to Vibe Code a Money-Making Product',
  description: courseDescription,
  url: courseCanonical,
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
    { '@type': 'Person', name: 'Mr. A', jobTitle: 'Chief Technology Officer' },
  ],
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    url: 'https://www.djai.academy/MONEY_MAKING_PRODUCT/',
  },
};

const courseFallback = `<div id="root">
      <main>
        <p>Free live English course · 22 August 2026 · 1:00–2:00 PM ICT</p>
        <h1>Vibe Code a Product That Can Make Money</h1>
        <p>Learn how experienced product builders move from an AI-generated MVP to reliable software that can be shipped, used, and sold.</p>
        <section>
          <h2>From prompting to production</h2>
          <p>Choose a valuable product, apply professional software-development standards, harden the MVP, and plan a practical rollout.</p>
        </section>
        <section>
          <h2>Learn from active builders</h2>
          <p>Siamese Cat Dev and Mr. A bring product leadership, software-development, project-management, and CTO experience to one focused live session.</p>
        </section>
        <a href="/MONEY_MAKING_PRODUCT/">Learn more and register free</a>
      </main>
    </div>`;

const courseHtml = readFileSync(indexPath, 'utf8')
  .replace('<html lang="th">', '<html lang="en">')
  .replace(/<meta\s+name="description"[\s\S]*?\/>/, `<meta name="description" content="${courseDescription}" />`)
  .replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${courseCanonical}" />`)
  .replace(/\s*<link rel="alternate"[^>]*>/g, '')
  .replace(/<meta property="og:type"[^>]*>/, '<meta property="og:type" content="website" />')
  .replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${courseTitle}" />`)
  .replace(/<meta\s+property="og:description"[\s\S]*?\/>/, `<meta property="og:description" content="${courseDescription}" />`)
  .replace(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${courseCanonical}" />`)
  .replace(/<meta property="og:image"[^>]*>/, '<meta property="og:image" content="https://www.djai.academy/siamese_cat/dev/siamese-cat-dev-character.webp" />')
  .replace(/<meta name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${courseTitle}" />`)
  .replace(/<meta\s+name="twitter:description"[\s\S]*?\/>/, `<meta name="twitter:description" content="${courseDescription}" />`)
  .replace(/<meta name="twitter:image"[^>]*>/, '<meta name="twitter:image" content="https://www.djai.academy/siamese_cat/dev/siamese-cat-dev-character.webp" />')
  .replace(/<title>[\s\S]*?<\/title>/, `<title>${courseTitle}</title>`)
  .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, `<script type="application/ld+json">${JSON.stringify(courseSchema)}</script>`)
  .replace(/<div id="root">[\s\S]*?<\/div>/, courseFallback);

writeFileSync(courseIndexPath, courseHtml);

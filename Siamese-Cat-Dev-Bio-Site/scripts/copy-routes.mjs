import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const distDir = new URL('../dist/', import.meta.url);
const englishDir = join(distDir.pathname, 'en');
const indexPath = join(distDir.pathname, 'index.html');
const englishIndexPath = join(englishDir, 'index.html');

mkdirSync(englishDir, { recursive: true });

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

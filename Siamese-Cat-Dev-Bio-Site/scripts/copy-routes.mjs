import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const distDir = new URL('../dist/', import.meta.url);
const catalog = JSON.parse(readFileSync(new URL('../src/courses-data.json', import.meta.url), 'utf8'));
const englishDir = join(distDir.pathname, 'en');
const courseDir = join(distDir.pathname, 'course');
const courseThaiDir = join(courseDir, 'th');
const coursesDir = join(distDir.pathname, 'courses');
const indexPath = join(distDir.pathname, 'index.html');
const englishIndexPath = join(englishDir, 'index.html');
const courseIndexPath = join(courseDir, 'index.html');
const courseThaiIndexPath = join(courseThaiDir, 'index.html');
const coursesIndexPath = join(coursesDir, 'index.html');

mkdirSync(englishDir, { recursive: true });
mkdirSync(courseDir, { recursive: true });
mkdirSync(courseThaiDir, { recursive: true });
mkdirSync(coursesDir, { recursive: true });
for (const course of catalog.courses) {
  mkdirSync(join(coursesDir, course.slug), { recursive: true });
}

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
    title: 'Vibe Code a Money-Making Product | Siamese Cat Dev Course',
    description: 'Express interest in a live Siamese Cat Dev course and learn how to turn a vibe-coded MVP into a reliable product that can be shipped and sold.',
    canonical: 'https://www.djai.academy/siamese_cat/dev/course/',
    name: 'Your Journey to Vibe Code a Money-Making Product',
    fallback: `<div id="root"><header><a href="/en/"><img src="/siamese_cat/dev/djai-academy-logo.webp" alt="DJAI Academy"></a></header><main>
      <p>Live practical course · Schedule arranged with you · English or Thai</p>
      <h1>Vibe Code a Product That Can Make Money</h1>
      <p>Learn how experienced product builders move from an AI-generated MVP to reliable software that can be shipped, used, and sold.</p>
      <section><h2>From prompting to production</h2><p>Choose a valuable product, apply professional software-development standards, harden the MVP, and plan a practical rollout.</p></section>
      <section><h2>Meet both instructors</h2><img src="/founder-djai-display.webp" alt="Mr. A, founder of DJAI Academy, CTO, and course instructor"><p>Learn from Siamese Cat Dev and Mr. A, founder of DJAI Academy, experienced CTO, and instructor of DJAI's offline course.</p></section>
      <section><h2>Express interest in a course</h2><p>Share your goals, preferred format, and availability. Siamese Cat Dev will reply by email about the best course option and next steps.</p></section><a href="/siamese_cat/dev/course/th/" hreflang="th">อ่านภาษาไทย</a>
    </main></div>`,
  },
  th: {
    title: 'Vibe Code สินค้าให้สร้างรายได้ | คอร์ส Siamese Cat Dev',
    description: 'แจ้งความสนใจคอร์สสดกับ Siamese Cat Dev เพื่อเรียนรู้วิธีพัฒนา MVP จาก Vibe Coding ให้เป็นสินค้าที่น่าเชื่อถือ พร้อมเปิดตัวและสร้างรายได้',
    canonical: 'https://www.djai.academy/siamese_cat/dev/course/th/',
    name: 'เส้นทางสู่การ Vibe Code สินค้าที่สร้างรายได้',
    fallback: `<div id="root"><header><a href="/"><img src="/siamese_cat/dev/djai-academy-logo.webp" alt="DJAI Academy"></a></header><main>
      <p>คอร์สสดเน้นลงมือจริง · นัดหมายวันเวลาร่วมกัน · ภาษาไทยหรืออังกฤษ</p>
      <h1>Vibe Code สินค้าให้สร้างรายได้จริง</h1>
      <p>เรียนรู้วิธีพัฒนาต้นแบบจาก AI ให้เป็นซอฟต์แวร์ที่น่าเชื่อถือ พร้อมเปิดตัว ใช้งาน และขายได้จริง</p>
      <section><h2>จากการ Prompt สู่ Production</h2><p>เลือกสินค้าที่มีคุณค่า ใช้มาตรฐานพัฒนาซอฟต์แวร์ ปรับ MVP ให้แข็งแรง และวางแผนเปิดตัวอย่างเป็นระบบ</p></section>
      <section><h2>พบกับผู้สอนทั้งสองคน</h2><img src="/founder-djai-display.webp" alt="Mr. A ผู้ก่อตั้ง DJAI Academy, CTO และผู้สอน"><p>เรียนกับ Siamese Cat Dev และ Mr. A ผู้ก่อตั้ง DJAI Academy, CTO ที่มีประสบการณ์ และผู้สอนคอร์สออฟไลน์ของ DJAI</p></section>
      <section><h2>แจ้งความสนใจคอร์ส</h2><p>แชร์เป้าหมาย รูปแบบคอร์ส และเวลาที่สะดวก Siamese Cat Dev จะตอบกลับทางอีเมลเพื่อแนะนำคอร์สและขั้นตอนถัดไป</p></section><a href="/siamese_cat/dev/course/" hreflang="en">Read in English</a>
    </main></div>`,
  },
};

function buildCourseHtml(language) {
  const locale = courseLocales[language];
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: locale.name,
    description: locale.description,
    url: locale.canonical,
    inLanguage: ['en', 'th'],
    educationalLevel: 'Beginner to intermediate',
    provider: [
      { '@type': 'Organization', name: 'Siamese Cat Dev', url: 'https://www.djai.academy/siamese_cat/dev/' },
      { '@type': 'Organization', name: 'DJAI Academy', url: 'https://www.djai.academy/' },
    ],
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

const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
}[character]));

const catalogCoursePath = (course) => `/siamese_cat/dev/courses/${course.slug}/`;
const catalogWhatsAppHref = (courseTitle) => {
  const title = courseTitle || 'one of the English courses';
  const message = `Hi Siamese Cat Dev, I would like to check a 30-minute trial class for ${title}. My preferred times are `;
  return `https://wa.me/66804803802?text=${encodeURIComponent(message)}`;
};

function catalogSchema(course) {
  const organization = {
    '@type': 'Organization',
    '@id': 'https://www.djai.academy/siamese_cat/dev/#organization',
    name: 'Siamese Cat Dev',
    url: 'https://www.djai.academy/siamese_cat/dev/',
    logo: 'https://www.djai.academy/siamese_cat/dev/siamese-cat-dev-logo.webp',
  };

  if (!course) {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        organization,
        {
          '@type': 'CollectionPage',
          '@id': `${catalog.hub.canonical}#webpage`,
          name: catalog.hub.title,
          description: catalog.hub.description,
          url: catalog.hub.canonical,
          inLanguage: 'en',
          mainEntity: { '@id': `${catalog.hub.canonical}#course-list` },
        },
        {
          '@type': 'ItemList',
          '@id': `${catalog.hub.canonical}#course-list`,
          name: 'Siamese Cat Dev English courses',
          itemListElement: catalog.courses.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.title,
            url: `https://www.djai.academy${catalogCoursePath(item)}`,
          })),
        },
      ],
    };
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [
      organization,
      {
        '@type': 'Course',
        '@id': `${course.canonical}#course`,
        name: course.title,
        description: course.promise,
        url: course.canonical,
        provider: { '@id': 'https://www.djai.academy/siamese_cat/dev/#organization' },
        educationalLevel: course.level,
        inLanguage: 'en',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Siamese Cat Dev', item: 'https://www.djai.academy/siamese_cat/dev/en/' },
          { '@type': 'ListItem', position: 2, name: 'Courses', item: catalog.hub.canonical },
          { '@type': 'ListItem', position: 3, name: course.title, item: course.canonical },
        ],
      },
    ],
  };
}

function catalogFallback(course) {
  if (!course) {
    const links = catalog.courses
      .map((item) => `<li><a href="${catalogCoursePath(item)}">${escapeHtml(item.title)}</a><p>${escapeHtml(item.cardDescription)}</p></li>`)
      .join('');
    return `<div id="root"><main><p>${escapeHtml(catalog.hub.eyebrow)}</p><h1>${escapeHtml(catalog.hub.heading)}</h1><p>${escapeHtml(catalog.hub.lead)}</p><h2>${escapeHtml(catalog.hub.sectionHeading)}</h2><ul>${links}</ul><p>${escapeHtml(catalog.hub.trialLead)}</p><a href="${catalogWhatsAppHref()}">Check a trial slot on WhatsApp</a></main></div>`;
  }

  const practice = course.practice
    .map((item) => `<li><strong>${escapeHtml(item.title)}</strong><p>${escapeHtml(item.body)}</p></li>`)
    .join('');
  return `<div id="root"><main><nav aria-label="Breadcrumb"><a href="${catalog.hub.canonical}">Courses</a> / <span>${escapeHtml(course.title)}</span></nav><p>${escapeHtml(course.heroEyebrow)}</p><h1>${escapeHtml(course.title)}</h1><p>${escapeHtml(course.heroLead)}</p><h2>${escapeHtml(course.practiceHeading)}</h2><p>${escapeHtml(course.practiceLead)}</p><ul>${practice}</ul><a href="${catalogWhatsAppHref(course.title)}">Check a trial slot on WhatsApp</a><a href="${catalog.hub.canonical}">See all courses</a></main></div>`;
}

function buildCatalogHtml(course) {
  const page = course || catalog.hub;
  const title = course?.metaTitle || catalog.hub.title;
  const description = course?.metaDescription || catalog.hub.description;
  const schema = JSON.stringify(catalogSchema(course)).replace(/</g, '\\u003c');

  return readFileSync(indexPath, 'utf8')
    .replace('<html lang="th">', '<html lang="en">')
    .replace(/<meta\s+name="description"[^>]*>/, `<meta name="description" content="${escapeHtml(description)}" />`)
    .replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${escapeHtml(page.canonical)}" />`)
    .replace(/\s*<link rel="alternate"[^>]*>/g, '')
    .replace(/<meta property="og:type"[^>]*>/, '<meta property="og:type" content="website" />')
    .replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${escapeHtml(title)}" />`)
    .replace(/<meta\s+property="og:description"[^>]*>/, `<meta property="og:description" content="${escapeHtml(description)}" />`)
    .replace(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${escapeHtml(page.canonical)}" />`)
    .replace(/<meta property="og:image"[^>]*>/, `<meta property="og:image" content="${escapeHtml(page.ogImage)}" />`)
    .replace(/<meta name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${escapeHtml(title)}" />`)
    .replace(/<meta\s+name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${escapeHtml(description)}" />`)
    .replace(/<meta name="twitter:image"[^>]*>/, `<meta name="twitter:image" content="${escapeHtml(page.ogImage)}" />`)
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
    .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, `<script type="application/ld+json">${schema}</script>`)
    .replace(/<div id="root">[\s\S]*?<\/div>/, catalogFallback(course));
}

writeFileSync(coursesIndexPath, buildCatalogHtml());
for (const course of catalog.courses) {
  writeFileSync(join(coursesDir, course.slug, 'index.html'), buildCatalogHtml(course));
}

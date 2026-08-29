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

const chinese = {
  'zh-cn': { lang: 'zh-CN', other: 'zh-tw', bioTitle: 'Siamese Cat Dev｜产品设计、软件开发与 Vibe Coding', bio: 'Siamese Cat Dev 是 DJAI Academy 的产品与开发合作伙伴，专注于产品设计、软件开发、AI 辅助开发与实战教学。', heading: '把好想法做成真正可用的数字产品。', courses: 'Siamese Cat Dev 英语课程', course: '免费直播课：用 Vibe Coding 做出能创造收入的产品', trial: '在 WhatsApp 预约体验课', names: { 'build-first-app': '从零构建第一个应用', 'make-a-game': '用 AI 制作游戏', 'coding-with-ai': '与 AI 一起学编程' } },
  'zh-tw': { lang: 'zh-TW', other: 'zh-cn', bioTitle: 'Siamese Cat Dev｜產品設計、軟體開發與 Vibe Coding', bio: 'Siamese Cat Dev 是 DJAI Academy 的產品與開發夥伴，專注於產品設計、軟體開發、AI 輔助開發與實作教學。', heading: '把好點子做成真正可用的數位產品。', courses: 'Siamese Cat Dev 英語課程', course: '免費直播課：用 Vibe Coding 做出能創造收入的產品', trial: '在 WhatsApp 預約體驗課', names: { 'build-first-app': '從零打造第一個應用程式', 'make-a-game': '用 AI 製作遊戲', 'coding-with-ai': '與 AI 一起學程式設計' } }
};

function chineseHtml(locale, path, title, description, body) {
  const canonical = `https://www.djai.academy${path}`;
  const otherPath = path.replace(`/${locale === chinese['zh-cn'] ? 'zh-cn' : 'zh-tw'}/`, `/${locale.other}/`);
  return readFileSync(indexPath, 'utf8')
    .replace('<html lang="th">', `<html lang="${locale.lang}">`)
    .replace(/<meta\s+name="description"[^>]*>/, `<meta name="description" content="${escapeHtml(description)}" />`)
    .replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${canonical}" />`)
    .replace(/\s*<link rel="alternate"[^>]*>/g, '')
    .replace('<meta property="og:type"', `<meta name="robots" content="noindex, follow" /><link rel="alternate" hreflang="${locale.lang}" href="${canonical}" /><link rel="alternate" hreflang="${locale.lang === 'zh-CN' ? 'zh-TW' : 'zh-CN'}" href="https://www.djai.academy${otherPath}" /><link rel="alternate" hreflang="x-default" href="https://www.djai.academy/siamese_cat/dev/" /><meta property="og:type"`)
    .replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${escapeHtml(title)}" />`)
    .replace(/<meta\s+property="og:description"[^>]*>/, `<meta property="og:description" content="${escapeHtml(description)}" />`)
    .replace(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${canonical}" />`)
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
    .replace(/<div id="root">[\s\S]*?<\/div>/, `<div id="root">${body}</div>`);
}

for (const [segment, locale] of Object.entries(chinese)) {
  const bioPath = `/siamese_cat/dev/${segment}/`;
  const bioDir = join(distDir.pathname, segment);
  mkdirSync(bioDir, { recursive: true });
  writeFileSync(join(bioDir, 'index.html'), chineseHtml(locale, bioPath, locale.bioTitle, locale.bio, `<main><h1>Siamese Cat Dev</h1><p>${locale.heading}</p><p>${locale.bio}</p><a href="/siamese_cat/dev/courses/${segment}/">${locale.courses}</a></main>`));

  const campaignDir = join(courseDir, segment);
  mkdirSync(campaignDir, { recursive: true });
  writeFileSync(join(campaignDir, 'index.html'), chineseHtml(locale, `/siamese_cat/dev/course/${segment}/`, locale.course, locale.course, `<main><h1>${locale.course}</h1><p>22 August 2026 · 1:00–2:00 PM ICT · English</p><a href="/MONEY_MAKING_PRODUCT/?lang=${segment}">${locale.course}</a></main>`));

  const hubDir = join(coursesDir, segment);
  mkdirSync(hubDir, { recursive: true });
  writeFileSync(join(hubDir, 'index.html'), chineseHtml(locale, `/siamese_cat/dev/courses/${segment}/`, locale.courses, locale.bio, `<main><h1>${locale.courses}</h1><ul>${catalog.courses.map((item) => `<li><a href="/siamese_cat/dev/courses/${item.slug}/${segment}/">${locale.names[item.slug]}</a></li>`).join('')}</ul><p>${locale.trial}</p></main>`));
  for (const item of catalog.courses) {
    const detailDir = join(coursesDir, item.slug, segment);
    mkdirSync(detailDir, { recursive: true });
    writeFileSync(join(detailDir, 'index.html'), chineseHtml(locale, `/siamese_cat/dev/courses/${item.slug}/${segment}/`, locale.names[item.slug], item.promise, `<main><a href="/siamese_cat/dev/courses/${segment}/">${locale.courses}</a><h1>${locale.names[item.slug]}</h1><p>${escapeHtml(item.heroLead)}</p><p>${locale.trial}</p></main>`));
  }
}

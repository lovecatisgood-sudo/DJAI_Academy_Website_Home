import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const [component, dataText, routeBuilder, styles, app] = await Promise.all([
  readFile(new URL('../src/CoursesApp.tsx', import.meta.url), 'utf8'),
  readFile(new URL('../src/courses-data.json', import.meta.url), 'utf8'),
  readFile(new URL('../scripts/copy-routes.mjs', import.meta.url), 'utf8'),
  readFile(new URL('../src/courses.css', import.meta.url), 'utf8'),
  readFile(new URL('../src/App.tsx', import.meta.url), 'utf8'),
]);

const catalog = JSON.parse(dataText);

test('course catalogue contains three English learning paths and the WhatsApp conversion', () => {
  assert.deepEqual(
    catalog.courses.map((course) => course.slug),
    ['build-first-app', 'make-a-game', 'coding-with-ai'],
  );
  assert.equal(catalog.hub.canonical, 'https://www.djai.academy/siamese_cat/dev/courses/');
  assert.match(component, /https:\/\/wa\.me\/66804803802/);
  assert.match(component, /course_trial_whatsapp_click/);
  assert.match(component, /30-minute trial class/);
  assert.doesNotMatch(dataText, /[—–]/);
});

test('course pages have English-only metadata, crawlable fallbacks, and course schema', () => {
  assert.match(component, /document\.documentElement\.lang = 'en'/);
  assert.match(component, /document\.querySelectorAll\('link\[rel="alternate"\]\[hreflang\]'\)/);
  assert.match(component, /'@type': 'Course'/);
  assert.match(component, /'@type': 'CollectionPage'/);
  assert.match(routeBuilder, /const coursesIndexPath/);
  assert.match(routeBuilder, /writeFileSync\(join\(coursesDir, course\.slug, 'index\.html'\)/);
  assert.match(routeBuilder, /catalogFallback\(course\)/);
});

test('course catalogue keeps the established brand assets and responsive safeguards', () => {
  assert.match(component, /siamese-cat-dev-wordmark\.webp/);
  assert.match(component, /siamese-cat-dev-character\.webp/);
  assert.match(component, /<HeaderSocialLinks language="en" \/>/);
  assert.match(styles, /@media \(max-width: 560px\)/);
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(styles, /min-height: 50px/);
});

test('plural course routes take precedence over the existing singular campaign', () => {
  const pluralRoute = app.indexOf("if (pathname.includes('/courses'))");
  const singularRoute = app.indexOf("if (pathname.includes('/course/th'))");
  assert.ok(pluralRoute >= 0);
  assert.ok(singularRoute >= 0);
  assert.ok(pluralRoute < singularRoute);
});

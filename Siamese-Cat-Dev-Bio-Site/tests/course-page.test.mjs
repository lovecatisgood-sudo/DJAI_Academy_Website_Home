import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const [component, routeBuilder, styles] = await Promise.all([
  readFile(new URL('../src/CourseApp.tsx', import.meta.url), 'utf8'),
  readFile(new URL('../scripts/copy-routes.mjs', import.meta.url), 'utf8'),
  readFile(new URL('../src/course.css', import.meta.url), 'utf8'),
]);

test('course page communicates the evergreen live-course interest offer', () => {
  for (const expected of ['Arranged with you', 'One practical session', 'Online or in person', 'English or Thai']) {
    assert.match(component, new RegExp(expected.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
  assert.doesNotMatch(component, /22 August 2026|registrationPath/);
  assert.match(component, /href="#course-interest"/);
  assert.match(component, /djai-academy-logo\.webp/);
  assert.match(component, /founder-djai-display\.webp/);
  assert.match(component, /Founder of DJAI Academy/);
  assert.match(component, /ผู้ก่อตั้ง DJAI/);
});

test('English and Thai initial HTML form a truthful reciprocal language cluster', () => {
  assert.match(routeBuilder, /https:\/\/www\.djai\.academy\/siamese_cat\/dev\/course\//);
  assert.match(routeBuilder, /https:\/\/www\.djai\.academy\/siamese_cat\/dev\/course\/th\//);
  assert.match(routeBuilder, /buildCourseHtml\('en'\)/);
  assert.match(routeBuilder, /buildCourseHtml\('th'\)/);
  assert.match(routeBuilder, /hreflang=\"x-default\"/);
  assert.match(routeBuilder, /'@type': 'Course'/);
  assert.match(routeBuilder, /inLanguage: \['en', 'th'\]/);
  assert.doesNotMatch(routeBuilder, /EducationEvent|startDate|isAccessibleForFree/);
});

test('course interest form is localized, accessible, and posts to the protected endpoint', () => {
  for (const expected of ['name="name"', 'name="email"', 'name="courseFormat"', 'name="goals"', 'name="consent"']) {
    assert.match(component, new RegExp(expected));
  }
  assert.match(component, /fetch\('\/api\/course-interest'/);
  assert.match(component, /aria-live="polite"/);
  assert.match(component, /\/privacy\/en\//);
  assert.match(component, /\/privacy\//);
  assert.match(component, /This form expresses interest; it does not confirm a booking or payment/);
  assert.match(component, /ยังไม่ถือว่าเป็นการยืนยันการจองหรือชำระเงิน/);
});

test('course layout protects mobile and reduced-motion users', () => {
  assert.match(styles, /@media \(max-width: 600px\)/);
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(styles, /min-height: 54px/);
  assert.match(styles, /\.trainer-grid/);
});

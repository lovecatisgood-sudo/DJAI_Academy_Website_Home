import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const [component, routeBuilder, styles] = await Promise.all([
  readFile(new URL('../src/CourseApp.tsx', import.meta.url), 'utf8'),
  readFile(new URL('../scripts/copy-routes.mjs', import.meta.url), 'utf8'),
  readFile(new URL('../src/course.css', import.meta.url), 'utf8'),
]);

test('course page communicates the exact free live-session offer', () => {
  for (const expected of ['22 August 2026', '1:00–2:00 PM ICT', 'Live online session', 'English']) {
    assert.match(component, new RegExp(expected.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
  assert.match(component, /href=\{registrationPath\}/);
  assert.match(component, /Free DJAI School account required/);
  assert.match(component, /djai-academy-logo\.webp/);
  assert.match(component, /founder-djai-display\.webp/);
  assert.match(component, /Founder of DJAI Academy/);
  assert.match(component, /ผู้ก่อตั้ง DJAI/);
});

test('English, Thai, and Vietnamese initial HTML form a truthful reciprocal language cluster', () => {
  assert.match(routeBuilder, /https:\/\/www\.djai\.academy\/siamese_cat\/dev\/course\//);
  assert.match(routeBuilder, /https:\/\/www\.djai\.academy\/siamese_cat\/dev\/course\/th\//);
  assert.match(routeBuilder, /https:\/\/www\.djai\.academy\/siamese_cat\/dev\/course\/vi\//);
  assert.match(routeBuilder, /buildCourseHtml\('en'\)/);
  assert.match(routeBuilder, /buildCourseHtml\('th'\)/);
  assert.match(routeBuilder, /buildCourseHtml\('vi'\)/);
  assert.match(routeBuilder, /hreflang=\"x-default\"/);
  assert.match(routeBuilder, /'@type': 'EducationEvent'/);
  assert.match(routeBuilder, /startDate: '2026-08-22T13:00:00\+07:00'/);
  assert.match(routeBuilder, /isAccessibleForFree: true/);
  assert.match(routeBuilder, /price: '0'/);
});

test('course layout protects mobile and reduced-motion users', () => {
  assert.match(styles, /@media \(max-width: 600px\)/);
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(styles, /min-height: 54px/);
  assert.match(styles, /\.trainer-grid/);
});

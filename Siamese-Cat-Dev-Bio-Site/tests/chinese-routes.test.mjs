import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';

const root = new URL('../dist/', import.meta.url).pathname;
const slugs = ['build-first-app', 'make-a-game', 'coding-with-ai'];

test('dispatches Chinese routes before English and Thai fallbacks', () => {
  const source = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  assert.ok(source.indexOf("pathname.includes('/zh-cn')") < source.indexOf("pathname.includes('/courses')"));
  assert.ok(source.indexOf("pathname.includes('/zh-tw')") < source.indexOf("const isEnglish"));
});

test('exports Chinese bio, campaign, catalog, and course detail routes', () => {
  for (const [segment, locale, phrase] of [['zh-cn', 'zh-CN', /产品|课程/], ['zh-tw', 'zh-TW', /產品|課程/]]) {
    const paths = [
      `${segment}/index.html`,
      `course/${segment}/index.html`,
      `courses/${segment}/index.html`,
      ...slugs.map((slug) => `courses/${slug}/${segment}/index.html`),
    ];
    for (const relative of paths) {
      const file = join(root, relative);
      assert.equal(existsSync(file), true, `missing ${relative}`);
      const html = readFileSync(file, 'utf8');
      assert.match(html, new RegExp(`<html lang="${locale}"`));
      assert.match(html, /name="robots" content="noindex, follow"/);
      assert.match(html, /hreflang="zh-CN"/);
      assert.match(html, /hreflang="zh-TW"/);
      assert.match(html, phrase);
    }
  }
});

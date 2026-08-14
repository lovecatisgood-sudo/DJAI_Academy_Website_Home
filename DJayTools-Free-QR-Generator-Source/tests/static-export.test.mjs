import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const basePath = "/tools/qrgen";

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

test("Hostinger static export uses the configured subpath", async () => {
  const html = await readFile(new URL("../out/index.html", import.meta.url), "utf8");
  const englishHtml = await readFile(new URL("../out/en/index.html", import.meta.url), "utf8");
  const vietnameseHtml = await readFile(new URL("../out/vi/index.html", import.meta.url), "utf8");

  assert.match(html, new RegExp(`${basePath}/_next/static`));
  assert.match(html, new RegExp(`${basePath}/djai-academy-logo\\.webp`));
  assert.match(html, new RegExp(`${basePath}/djai-academy-logo-display\\.webp`));
  assert.match(html, new RegExp(`${basePath}/siamese-cat-dev-logo\\.webp`));
  assert.doesNotMatch(html, /src="\/(?:djai-academy-logo|siamese-cat-dev-logo)/);
  assert.match(html, /<html lang="th">/);
  assert.match(englishHtml, /<html lang="en">/);
  assert.match(englishHtml, /Free QR Code Generator/);
  assert.match(vietnameseHtml, /<html lang="vi">/);
  assert.match(vietnameseHtml, /Tạo mã QR miễn phí/);
  assert.match(vietnameseHtml, /<link rel="canonical" href="https:\/\/www\.djai\.academy\/tools\/qrgen\/vi\/"/);

  assert.equal(await exists(new URL("../out/djai-academy-logo.webp", import.meta.url)), true);
  assert.equal(await exists(new URL("../out/djai-academy-logo-display.webp", import.meta.url)), true);
  assert.equal(await exists(new URL("../out/siamese-cat-dev-logo.webp", import.meta.url)), true);
});

test("exports trilingual task pages with unique metadata", async () => {
  const slugs = ["url-qr-code-generator", "wifi-qr-code-generator", "vcard-qr-code-generator", "text-qr-code-generator", "email-qr-code-generator", "whatsapp-qr-code-generator", "qr-code-generator-with-logo"];
  for (const slug of slugs) {
    const thai = await readFile(new URL(`../out/${slug}/index.html`, import.meta.url), "utf8");
    const english = await readFile(new URL(`../out/${slug}/en/index.html`, import.meta.url), "utf8");
    const vietnamese = await readFile(new URL(`../out/${slug}/vi/index.html`, import.meta.url), "utf8");
    assert.match(thai, new RegExp(`<link rel="canonical" href="https://www.djai.academy${basePath}/${slug}/"`));
    assert.match(english, new RegExp(`<link rel="canonical" href="https://www.djai.academy${basePath}/${slug}/en/"`));
    assert.match(vietnamese, new RegExp(`<link rel="canonical" href="https://www.djai.academy${basePath}/${slug}/vi/"`));
    assert.match(english, /<html lang="en">/);
    assert.match(vietnamese, /<html lang="vi">/);
    for (const page of [thai, english, vietnamese]) {
      assert.match(page, /hrefLang="th"/);
      assert.match(page, /hrefLang="en"/);
      assert.match(page, /hrefLang="vi"/);
      assert.match(page, /hrefLang="x-default"/);
    }
    assert.match(thai, /hrefLang="en"/);
    assert.match(english, /hrefLang="th"/);
  }
});

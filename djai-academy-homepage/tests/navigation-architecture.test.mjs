import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const appRoot = join(import.meta.dirname, "..");
const read = (relativePath) => readFileSync(join(appRoot, relativePath), "utf8");
const header = read("app/components/SiteHeader.jsx");
const footer = read("app/components/SiteFooter.jsx");
const i18n = read("app/lib/i18n.js");

test("header exposes the approved journeys without changing its visual component structure", () => {
  for (const className of [
    "site-header",
    "brand",
    "menu-button",
    "nav",
    "nav-dropdown",
    "language-options",
    "nav-subscribe",
  ]) {
    assert.match(header, new RegExp(`className=["'][^"']*${className}`), `preserve ${className}`);
  }

  for (const key of ["build", "tools", "camPdf", "school", "resources", "discussProject"]) {
    assert.match(header, new RegExp(`${key}:`), `missing navigation copy key ${key}`);
  }
  assert.match(header, /<DevelopmentDropdown/);
  assert.match(header, /urlFor\("tools", locale\)/);
  assert.match(header, /href="\/Cam_PDF_Scan_Signer_QR-Gen\/"/);
  assert.match(header, /schoolUrlFor\(locale\)/);
  assert.match(header, /urlFor\("blog", locale\)/);
  assert.match(header, /href="mailto:contact@djai\.academy"/);

  assert.doesNotMatch(header, /urlFor\("course", locale\)/);
  assert.doesNotMatch(header, /urlFor\("community", locale\)/);
});

test("Build with DJAI keeps existing commercial child destinations but Cam PDF is top-level", () => {
  assert.match(header, /urlFor\("service", locale\)/);
  assert.match(header, /urlFor\("portfolio", locale\)/);
  assert.match(header, /urlFor\("promo", locale\)/);
  const dropdown = header.match(/function DevelopmentDropdown[\s\S]*?\n}\n\nexport default/)?.[0] || "";
  assert.doesNotMatch(dropdown, /Cam_PDF_Scan_Signer_QR-Gen/);
});

test("footer preserves its grid and legal controls while linking the approved clusters", () => {
  for (const className of ["footer", "footer-grid", "footer-contact", "copyright", "footer-legal"]) {
    assert.match(footer, new RegExp(`className=["'][^"']*${className}`), `preserve ${className}`);
  }
  assert.match(footer, /schoolUrlFor\(locale\)/);
  assert.match(footer, /Cam_PDF_Scan_Signer_QR-Gen/);
  assert.match(footer, /urlFor\(route, locale\)/);
  assert.doesNotMatch(footer, /\[.*["']course["']\]/);
  assert.doesNotMatch(footer, /\[.*["']community["']\]/);
  assert.match(footer, /CookieSettingsButton/);
});

test("School links use live locale homes until public course routes are released", () => {
  assert.match(i18n, /export function schoolUrlFor/);
  assert.match(i18n, /th:\s*["']https:\/\/school\.djai\.academy\/th["']/);
  assert.match(i18n, /en:\s*["']https:\/\/school\.djai\.academy\/en["']/);
  assert.doesNotMatch(i18n, /school\.djai\.academy\/(?:th|en)\/courses/);
});

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (relativePath) => readFileSync(new URL(relativePath, import.meta.url), "utf8");
const development = {
  th: read("../app/development/page.jsx"),
  en: read("../app/development/en/page.jsx"),
  vi: read("../app/development/vi/page.jsx")
};
const service = {
  th: read("../app/service/page.jsx"),
  en: read("../app/service/en/page.jsx"),
  vi: read("../app/service/vi/page.jsx")
};

function extractH1(source) {
  return source.match(/<h1>([^<]+)<\/h1>/)?.[1]?.trim() || "";
}

function extractSchemaDescription(source) {
  const schema = source.split("const structuredData =")[1] || "";
  return schema.match(/description:\s*[\n\s]*["']([^"']+)["']/)?.[1] || "";
}

test("Development owns the working-product proposition in every published locale", () => {
  assert.match(development.th, /รับทำซอฟต์แวร์|พัฒนาโปรดักต์/);
  assert.match(development.en, /custom software|working product/i);
  assert.match(development.vi, /phần mềm theo yêu cầu|sản phẩm có thể đưa vào vận hành/i);

  for (const [locale, source] of Object.entries(development)) {
    assert.match(source, /TrackedLink/);
    assert.match(source, /eventName="enquiry_start"/);
    assert.match(source, new RegExp(`locale: "${locale}"`));
    assert.doesNotMatch(source, /\.items\.map|items\]\)\s*=>\s*<span/);
  }
});

test("Service is a category chooser, not a second Development landing page", () => {
  assert.match(service.th, /เลือก.*บริการ|หมวดบริการ/);
  assert.match(service.en, /choose.*service|service categor/i);
  assert.match(service.vi, /chọn.*dịch vụ|nhóm dịch vụ/i);

  assert.match(service.th, /href="\/development\/"/);
  assert.match(service.en, /href="\/development\/en\/"/);
  assert.match(service.vi, /href="\/development\/vi\/"/);

  for (const [locale, source] of Object.entries(service)) {
    assert.match(source, /problem:/);
    assert.match(source, /deliverable:/);
    assert.match(source, /nextAction:/);
    assert.match(source, /eventName="enquiry_start"/);
    assert.match(source, new RegExp(`locale: "${locale}"`));
    assert.doesNotMatch(source, /keywords:|\.keywords\.map|tags\.map/);
  }
});

test("Development and Service expose distinct first-screen and schema promises", () => {
  for (const locale of ["th", "en", "vi"]) {
    assert.notEqual(extractH1(development[locale]), extractH1(service[locale]));
  }

  const developmentSchema = extractSchemaDescription(development.en);
  const serviceSchema = extractSchemaDescription(service.en);
  assert.notEqual(developmentSchema, serviceSchema);
  assert.match(developmentSchema, /requirement|working product/i);
  assert.match(serviceSchema, /choose|categor/i);
});

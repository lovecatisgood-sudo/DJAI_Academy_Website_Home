const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const root = path.resolve(__dirname, "..");
const read = (file) => readFileSync(path.join(root, file), "utf8");

const imageSource = read("djai-image-resizer/scripts/generate-seo-pages.mjs");
const documentSource = read("djai-document-tools/app/tool-data.ts");
const pdfSource = read("djai-pdf-tools/app/tool-data.ts");
const qrSource = read("DJayTools-Free-QR-Generator-Source/app/qr-tool-data.ts");
const hubSource = read("djai-academy-homepage/app/tools/page.jsx");

test("priority Thai tool pages expose natural search wording", () => {
  assert.match(imageSource, /ลบพื้นหลัง JPG, PNG หรือ WebP ฟรี \| DJAI Image Tools/);
  assert.match(imageSource, /ลบพื้นหลังรูป JPG, PNG หรือ WebP ฟรี/);
  assert.match(imageSource, /ดาวน์โหลด PNG พื้นหลังโปร่งใส/);

  assert.match(documentSource, /th: "แปลง Word \(DOCX\) เป็น PDF ฟรี"/);
  assert.match(documentSource, /Word DOCX เป็น PDF ใน browser โดยไม่อัปโหลด/);
  assert.match(documentSource, /th: "OCR ภาษาไทย: แปลง PDF สแกนและรูปเป็นข้อความ"/);
  assert.match(documentSource, /JPG และ PNG เป็นข้อความที่ค้นหาและ copy ได้/);

  assert.match(pdfSource, /title: "บีบอัด PDF ออนไลน์ ลดขนาดไฟล์ฟรี"/);
  assert.match(pdfSource, /ไฟล์ไม่ออกจากอุปกรณ์ของคุณ/);

  assert.match(qrSource, /title: "สร้าง QR Code จากลิงก์ฟรี ไม่ต้องสมัคร"/);
  assert.match(qrSource, /ดาวน์โหลด PNG หรือ SVG/);
});

test("Thai tools hub uses descriptive anchors for priority workflows", () => {
  assert.match(hubSource, /ลบพื้นหลัง JPG PNG หรือ WebP/);
  assert.match(hubSource, /แปลง Word \(DOCX\) เป็น PDF/);
  assert.match(hubSource, /OCR ภาษาไทยจาก PDF สแกนหรือรูปภาพ/);
  assert.match(hubSource, /บีบอัด PDF และลดขนาดไฟล์/);
  assert.match(hubSource, /สร้าง QR Code จากลิงก์/);

  for (const route of [
    "/tools/resizeimg/remove-background-image/",
    "/tools/document/docx-to-pdf/",
    "/tools/document/ocr/",
    "/tools/PDFTools/compress-pdf/",
    "/tools/qrgen/url-qr-code-generator/",
  ]) {
    assert.match(hubSource, new RegExp(route.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
});

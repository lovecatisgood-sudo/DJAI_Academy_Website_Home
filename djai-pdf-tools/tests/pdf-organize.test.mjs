import assert from "node:assert/strict";
import test from "node:test";
import { PDFDocument } from "pdf-lib";
import { processFiles } from "../app/pdf-actions.ts";

const options = {
  splitMode: "extract",
  pageRanges: "1",
  everyPages: 1,
  compression: "recommended",
  imagePageSize: "a4",
  imageOrientation: "auto",
  imageFormat: "jpg",
  imageScale: 1.5,
  rotation: 90,
  selectedPages: "",
  watermarkType: "text",
  watermarkText: "CONFIDENTIAL",
  watermarkImage: null,
  watermarkOpacity: 28,
  watermarkPosition: "center",
  watermarkSize: 42,
  password: "",
  allowPrint: true,
  allowCopy: false,
  allowModify: false,
  allowForms: true,
  organizeMode: "order",
  pageOrder: "3, 1",
  deletePages: "2",
  pageNumberPosition: "bottom-center",
  pageNumberStart: 1
};

async function threePageFile() {
  const pdf = await PDFDocument.create();
  pdf.addPage([100, 100]);
  pdf.addPage([200, 200]);
  pdf.addPage([300, 300]);
  return new File([await pdf.save()], "three-pages.pdf", { type: "application/pdf" });
}

test("reorder PDF creates the requested sequence", async () => {
  const result = await processFiles("organize-pdf", [await threePageFile()], options);
  const output = await PDFDocument.load(await result.blob.arrayBuffer());
  assert.equal(output.getPageCount(), 2);
  assert.equal(output.getPage(0).getWidth(), 300);
  assert.equal(output.getPage(1).getWidth(), 100);
});

test("delete PDF pages keeps all unselected pages", async () => {
  const result = await processFiles("organize-pdf", [await threePageFile()], { ...options, organizeMode: "delete" });
  const output = await PDFDocument.load(await result.blob.arrayBuffer());
  assert.equal(output.getPageCount(), 2);
  assert.equal(output.getPage(0).getWidth(), 100);
  assert.equal(output.getPage(1).getWidth(), 300);
});

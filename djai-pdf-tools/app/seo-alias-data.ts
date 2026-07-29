import type { ProcessingOptions } from "./pdf-actions";
import type { Language, ToolSlug } from "./tool-data";

export type PdfSeoPage = {
  slug: string;
  label: string;
  title: string;
  short: string;
  description: string;
  guide: { title: string; intro: string; steps: [string, string, string] };
};

export type PdfSeoAlias = {
  slug: string;
  tool: ToolSlug;
  keywords: Record<Language, string[]>;
  copy: Record<Language, PdfSeoPage>;
  initialOptions?: Partial<ProcessingOptions>;
  acceptedTypes?: string[];
  accept?: string;
  fileTypeLabel?: string;
};

export const pdfSeoAliases: Record<string, PdfSeoAlias> = {
  "jpg-to-pdf": {
    slug: "jpg-to-pdf",
    tool: "images-to-pdf",
    keywords: {
      th: ["JPG เป็น PDF", "แปลง JPG เป็น PDF ฟรี", "รวมรูปเป็น PDF"],
      en: ["JPG to PDF free", "convert JPG to PDF", "combine JPG images into PDF"]
    },
    copy: {
      th: {
        slug: "jpg-to-pdf",
        label: "JPG เป็น PDF",
        title: "แปลง JPG เป็น PDF ออนไลน์ฟรี",
        short: "รวมรูป JPG หลายรูปเป็น PDF เดียว พร้อมจัดลำดับและเลือกขนาดกระดาษ",
        description: "แปลง JPG เป็น PDF ฟรีใน browser รวมรูปหลายไฟล์ จัดลำดับ เลือก A4 หรือ Letter โดยไม่ upload รูปขึ้น server",
        guide: {
          title: "วิธีแปลง JPG หลายรูปเป็น PDF",
          intro: "เหมาะกับการรวมใบเสร็จ รูปเอกสาร งานสมัคร หรือภาพหลายหน้าเป็น PDF เดียวที่ส่งต่อได้ง่าย",
          steps: ["เลือกรูป JPG หนึ่งไฟล์หรือหลายไฟล์", "จัดลำดับและเลือกขนาดกระดาษ", "สร้างและดาวน์โหลด PDF"]
        }
      },
      en: {
        slug: "jpg-to-pdf",
        label: "JPG to PDF",
        title: "Convert JPG to PDF Online Free",
        short: "Combine multiple JPG images into one PDF with page size and ordering controls.",
        description: "Convert JPG to PDF free in your browser. Combine and reorder images, choose A4 or Letter, and never upload files to a server.",
        guide: {
          title: "How to convert JPG images to PDF",
          intro: "Combine receipts, photographed documents, application pages, or image sets into one PDF that is easy to share.",
          steps: ["Choose one or more JPG images", "Arrange them and select a page size", "Create and download the PDF"]
        }
      }
    }
  },
  "pdf-to-jpg": {
    slug: "pdf-to-jpg",
    tool: "pdf-to-images",
    keywords: {
      th: ["PDF เป็น JPG", "แปลง PDF เป็นรูป", "PDF to JPG ฟรี"],
      en: ["PDF to JPG free", "convert PDF to images", "save PDF pages as JPG"]
    },
    copy: {
      th: {
        slug: "pdf-to-jpg",
        label: "PDF เป็น JPG",
        title: "แปลง PDF เป็น JPG ออนไลน์ฟรี",
        short: "ส่งออกทุกหน้า PDF เป็น JPG และดาวน์โหลดเป็นไฟล์เดียวหรือ ZIP",
        description: "แปลง PDF เป็น JPG ฟรี ส่งออกทุกหน้าเป็นรูปความละเอียดสูงและดาวน์โหลด ZIP โดยไฟล์ประมวลผลใน browser",
        guide: {
          title: "วิธีแปลงหน้า PDF เป็นรูป JPG",
          intro: "ใช้รูป JPG จาก PDF สำหรับ presentation, social media, preview หรือระบบที่ไม่รองรับเอกสาร PDF",
          steps: ["เลือกไฟล์ PDF", "เลือก JPG และระดับความละเอียด", "ดาวน์โหลดรูปหรือ ZIP"]
        }
      },
      en: {
        slug: "pdf-to-jpg",
        label: "PDF to JPG",
        title: "Convert PDF to JPG Online Free",
        short: "Export every PDF page as JPG and download one image or a ZIP archive.",
        description: "Convert PDF pages to high-quality JPG images free in your browser. Download a single image or ZIP without uploading the PDF.",
        guide: {
          title: "How to convert PDF pages to JPG",
          intro: "Create JPG images from a PDF for presentations, social media, previews, and systems that do not accept PDF documents.",
          steps: ["Choose a PDF file", "Select JPG and a resolution", "Download the image or ZIP archive"]
        }
      }
    }
  },
  "png-to-pdf": {
    slug: "png-to-pdf", tool: "images-to-pdf", acceptedTypes: ["image/png"], accept: "image/png,.png", fileTypeLabel: "PNG",
    keywords: { th: ["PNG เป็น PDF", "แปลง PNG เป็น PDF ฟรี"], en: ["PNG to PDF free", "convert PNG to PDF"] },
    copy: {
      th: { slug: "png-to-pdf", label: "PNG เป็น PDF", title: "แปลง PNG เป็น PDF ออนไลน์ฟรี", short: "รวมรูป PNG หนึ่งรูปหรือหลายรูปเป็น PDF พร้อมจัดลำดับและเลือกขนาดกระดาษ", description: "แปลง PNG เป็น PDF ฟรีใน browser รวมหลายรูปเป็นเอกสารเดียวโดยไม่ upload ไฟล์และไม่ต้องสมัครบัญชี", guide: { title: "วิธีแปลง PNG เป็น PDF", intro: "รวมภาพหน้าจอ งานกราฟิก และเอกสาร PNG เป็น PDF สำหรับส่งหรือพิมพ์", steps: ["เลือกรูป PNG หนึ่งไฟล์หรือหลายไฟล์", "จัดลำดับและเลือกขนาดกระดาษ", "สร้างและดาวน์โหลด PDF"] } },
      en: { slug: "png-to-pdf", label: "PNG to PDF", title: "Convert PNG to PDF Online Free", short: "Combine one or more PNG images into a PDF with ordering and page-size controls.", description: "Convert PNG to PDF free in your browser. Combine multiple PNG images without uploading files or creating an account.", guide: { title: "How to convert PNG images to PDF", intro: "Combine screenshots, graphics, and scanned PNG pages into one document for sharing or printing.", steps: ["Choose one or more PNG images", "Arrange them and choose a page size", "Create and download the PDF"] } }
    }
  },
  "webp-to-pdf": {
    slug: "webp-to-pdf", tool: "images-to-pdf", acceptedTypes: ["image/webp"], accept: "image/webp,.webp", fileTypeLabel: "WebP",
    keywords: { th: ["WebP เป็น PDF", "แปลง WebP เป็น PDF ฟรี"], en: ["WebP to PDF free", "convert WebP to PDF"] },
    copy: {
      th: { slug: "webp-to-pdf", label: "WebP เป็น PDF", title: "แปลง WebP เป็น PDF ออนไลน์ฟรี", short: "แปลงและรวมรูป WebP เป็น PDF โดยเลือกขนาดและแนวกระดาษได้", description: "แปลง WebP เป็น PDF ฟรีและเป็นส่วนตัวใน browser รองรับหลายรูปและไม่ upload ไฟล์ขึ้น server", guide: { title: "วิธีแปลง WebP เป็น PDF", intro: "เปลี่ยนภาพ WebP เป็นเอกสารที่เปิด พิมพ์ และแชร์ได้กว้างขึ้น", steps: ["เลือกรูป WebP", "จัดลำดับและตั้งค่ากระดาษ", "สร้างและดาวน์โหลด PDF"] } },
      en: { slug: "webp-to-pdf", label: "WebP to PDF", title: "Convert WebP to PDF Online Free", short: "Convert and combine WebP images into a PDF with page controls.", description: "Convert WebP to PDF free and privately in your browser. Reorder multiple images without uploading them to a server.", guide: { title: "How to convert WebP images to PDF", intro: "Turn WebP images into a widely shareable and printable PDF document.", steps: ["Choose one or more WebP images", "Arrange them and configure the pages", "Create and download the PDF"] } }
    }
  },
  "pdf-to-png": {
    slug: "pdf-to-png", tool: "pdf-to-images", initialOptions: { imageFormat: "png" },
    keywords: { th: ["PDF เป็น PNG", "แปลง PDF เป็น PNG ฟรี"], en: ["PDF to PNG free", "convert PDF to PNG"] },
    copy: {
      th: { slug: "pdf-to-png", label: "PDF เป็น PNG", title: "แปลง PDF เป็น PNG ออนไลน์ฟรี", short: "ส่งออกทุกหน้า PDF เป็น PNG ความละเอียดสูงและดาวน์โหลดเป็นรูปหรือ ZIP", description: "แปลง PDF เป็น PNG ฟรีใน browser เหมาะกับข้อความและกราฟิกที่ต้องการคุณภาพแบบ lossless โดยไม่ upload เอกสาร", guide: { title: "วิธีแปลงหน้า PDF เป็น PNG", intro: "PNG เหมาะกับหน้าเอกสารและกราฟิกที่ต้องการรายละเอียดคมชัด", steps: ["เลือกไฟล์ PDF", "ใช้ PNG และเลือกความละเอียด", "ดาวน์โหลด PNG หรือ ZIP"] } },
      en: { slug: "pdf-to-png", label: "PDF to PNG", title: "Convert PDF to PNG Online Free", short: "Export every PDF page as a high-quality PNG and download an image or ZIP.", description: "Convert PDF pages to lossless PNG images free in your browser without uploading the document.", guide: { title: "How to convert PDF pages to PNG", intro: "PNG is useful for crisp document text, graphics, and lossless editing workflows.", steps: ["Choose a PDF file", "Keep PNG selected and choose a resolution", "Download the PNG image or ZIP"] } }
    }
  },
  "extract-pdf-pages": {
    slug: "extract-pdf-pages", tool: "split-pdf", initialOptions: { splitMode: "extract", pageRanges: "1" },
    keywords: { th: ["ดึงหน้า PDF", "แยกบางหน้า PDF"], en: ["extract PDF pages", "PDF page extractor"] },
    copy: {
      th: { slug: "extract-pdf-pages", label: "ดึงหน้า PDF", title: "ดึงเฉพาะหน้าจาก PDF ฟรี", short: "เลือกหน้าหรือช่วงหน้าที่ต้องการแล้วสร้าง PDF ฉบับใหม่", description: "ดึงเฉพาะหน้าจาก PDF ฟรี ระบุหน้า เช่น 1-3, 5, 8 แล้วดาวน์โหลดเอกสารใหม่โดยประมวลผลใน browser", guide: { title: "วิธีดึงบางหน้าจาก PDF", intro: "สร้างเอกสารใหม่จากหน้าที่เลือกโดยไม่ต้องแชร์ไฟล์ต้นฉบับทั้งหมด", steps: ["เลือกไฟล์ PDF", "ระบุหน้าหรือช่วงหน้าที่ต้องการ", "สร้างและดาวน์โหลด PDF ใหม่"] } },
      en: { slug: "extract-pdf-pages", label: "Extract PDF Pages", title: "Extract Pages from PDF Free", short: "Select pages or ranges and create a new PDF containing only those pages.", description: "Extract selected PDF pages free in your browser. Enter pages such as 1-3, 5, 8 and download a private new document.", guide: { title: "How to extract selected pages from a PDF", intro: "Create a smaller document containing only the pages you need.", steps: ["Choose a PDF file", "Enter the pages or ranges to extract", "Create and download the new PDF"] } }
    }
  },
  "delete-pages-from-pdf": {
    slug: "delete-pages-from-pdf", tool: "organize-pdf", initialOptions: { organizeMode: "delete", deletePages: "1" },
    keywords: { th: ["ลบหน้า PDF", "ตัดหน้า PDF ฟรี"], en: ["delete pages from PDF", "PDF page remover"] },
    copy: {
      th: { slug: "delete-pages-from-pdf", label: "ลบหน้า PDF", title: "ลบหน้าจาก PDF ออนไลน์ฟรี", short: "ระบุหน้าที่ไม่ต้องการแล้วสร้าง PDF ใหม่จากหน้าที่เหลือ", description: "ลบหน้าจาก PDF ฟรีใน browser ระบุหน้าเดี่ยวหรือช่วงหน้าโดยไฟล์ไม่ถูก upload และต้นฉบับไม่ถูกแก้ไข", guide: { title: "วิธีลบหน้าที่ไม่ต้องการจาก PDF", intro: "ตัดหน้าว่าง ภาคผนวก หรือข้อมูลที่ไม่ต้องการแชร์ออกจากสำเนาใหม่", steps: ["เลือกไฟล์ PDF", "ระบุหน้าที่ต้องการลบ", "สร้างและดาวน์โหลด PDF ที่เหลือ"] } },
      en: { slug: "delete-pages-from-pdf", label: "Delete PDF Pages", title: "Delete Pages from PDF Online Free", short: "Enter unwanted pages and create a new PDF containing everything else.", description: "Delete pages from a PDF free in your browser. Remove pages or ranges without uploading or modifying the original.", guide: { title: "How to delete unwanted PDF pages", intro: "Remove blank pages, appendices, or private sections from a new copy.", steps: ["Choose a PDF file", "Enter the pages to delete", "Create and download the remaining PDF"] } }
    }
  },
  "reorder-pdf-pages": {
    slug: "reorder-pdf-pages", tool: "organize-pdf", initialOptions: { organizeMode: "order", pageOrder: "3, 1-2" },
    keywords: { th: ["เรียงหน้า PDF", "สลับหน้า PDF"], en: ["reorder PDF pages", "rearrange PDF pages"] },
    copy: {
      th: { slug: "reorder-pdf-pages", label: "เรียงหน้า PDF", title: "เรียงหน้า PDF ใหม่ออนไลน์ฟรี", short: "กำหนดลำดับหน้าสุดท้าย เช่น 3, 1-2, 5 แล้วสร้าง PDF ใหม่", description: "เรียงหน้า PDF ใหม่ฟรีใน browser โดยไม่ upload เอกสารและไม่แก้ไขไฟล์ต้นฉบับ", guide: { title: "วิธีเปลี่ยนลำดับหน้า PDF", intro: "แก้เอกสารสแกนหรือรายงานที่หน้าอยู่ผิดลำดับ", steps: ["เลือกไฟล์ PDF", "พิมพ์ลำดับหน้าสุดท้าย", "สร้างและดาวน์โหลด PDF ที่เรียงแล้ว"] } },
      en: { slug: "reorder-pdf-pages", label: "Reorder PDF Pages", title: "Reorder PDF Pages Online Free", short: "Enter the final order, such as 3, 1-2, 5, and create a newly arranged PDF.", description: "Reorder PDF pages free in your browser. Define the final sequence without uploading the original document.", guide: { title: "How to change the order of PDF pages", intro: "Correct scanned documents and reports whose pages are in the wrong sequence.", steps: ["Choose a PDF file", "Enter the final page order", "Create and download the reordered PDF"] } }
    }
  }
};

export const pdfSeoAliasSlugs = Object.keys(pdfSeoAliases);

export function pdfAliasHref(alias: PdfSeoAlias, language: Language) {
  return `/tools/PDFTools/${alias.slug}/${language === "en" ? "en/" : ""}`;
}

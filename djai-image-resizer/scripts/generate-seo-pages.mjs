import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const projectDir = join(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = join(projectDir, "public");
const siteRoot = "https://www.djai.academy/tools/resizeimg";

export const presets = [
  {
    slug: "jpg-to-png", mode: "dimensions", format: "image/png",
    th: ["แปลง JPG เป็น PNG ฟรี ออนไลน์ | DJAI Image Tools", "แปลง JPG เป็น PNG ฟรี", "แปลงรูป JPG เป็น PNG ฟรีใน browser โดยไม่อัปโหลดไฟล์ ไม่ต้องสมัคร และไม่มี watermark", "วิธีแปลง JPG เป็น PNG", "เลือก JPG แล้วระบบจะตั้ง PNG ให้ทันที เหมาะกับงานออกแบบและระบบที่ต้องการไฟล์ PNG", ["เลือกรูป JPG จากอุปกรณ์", "ตรวจสอบขนาดและ PNG ที่ตั้งไว้", "ประมวลผลแล้วดาวน์โหลด PNG"]],
    en: ["Convert JPG to PNG Free Online | DJAI Image Tools", "Convert JPG to PNG for free", "Convert JPG images to PNG free in your browser with no upload, account, watermark, or server storage.", "How to convert JPG to PNG", "Choose a JPG and PNG is selected automatically for design or publishing workflows that require PNG files.", ["Choose a JPG from your device", "Review the dimensions and PNG output", "Process and download the PNG"]]
  },
  {
    slug: "png-to-jpg", mode: "dimensions", format: "image/jpeg",
    th: ["แปลง PNG เป็น JPG ฟรี ลดขนาดรูป | DJAI Image Tools", "แปลง PNG เป็น JPG ฟรี", "แปลง PNG เป็น JPG ฟรี พร้อมปรับคุณภาพและลดขนาดไฟล์ใน browser โดยรูปไม่ถูกอัปโหลด", "วิธีแปลง PNG เป็น JPG", "JPG เหมาะกับรูปถ่ายและไฟล์ที่ต้องการขนาดเล็กลง พื้นที่โปร่งใสจะเปลี่ยนเป็นพื้นหลังสีขาว", ["เลือกรูป PNG", "เลือกคุณภาพ JPG", "ประมวลผลและดาวน์โหลด JPG"]],
    en: ["Convert PNG to JPG Free and Reduce Size | DJAI Image Tools", "Convert PNG to JPG for free", "Convert PNG to JPG free with quality controls and private browser processing. No upload, account, or watermark.", "How to convert PNG to JPG", "JPG is practical for photographs and smaller downloads. Transparent areas use a white background because JPG has no transparency.", ["Choose a PNG image", "Select a suitable JPG quality", "Process and download the JPG"]]
  },
  {
    slug: "jpg-to-webp", mode: "dimensions", format: "image/webp",
    th: ["แปลง JPG เป็น WebP ฟรี สำหรับเว็บไซต์ | DJAI Image Tools", "แปลง JPG เป็น WebP ฟรี", "แปลง JPG เป็น WebP ฟรี เพื่อรูปเว็บไซต์ที่โหลดเร็วขึ้น พร้อมควบคุมคุณภาพใน browser", "วิธีแปลง JPG เป็น WebP", "WebP ช่วยลดน้ำหนักรูปสำหรับเว็บไซต์และแอป ใช้ quality slider เพื่อหาสมดุลระหว่างความคมชัดและขนาดไฟล์", ["เลือกรูป JPG", "ปรับคุณภาพ WebP", "เปรียบเทียบขนาดแล้วดาวน์โหลด"]],
    en: ["Convert JPG to WebP Free for Websites | DJAI Image Tools", "Convert JPG to WebP for free", "Convert JPG to WebP free for faster websites with private browser processing and quality control.", "How to convert JPG to WebP", "WebP can reduce image weight for modern websites. Use the quality control to balance visual detail and download size.", ["Choose a JPG image", "Adjust WebP quality", "Compare the size and download"]]
  },
  {
    slug: "png-to-webp", mode: "dimensions", format: "image/webp",
    th: ["แปลง PNG เป็น WebP ฟรี ออนไลน์ | DJAI Image Tools", "แปลง PNG เป็น WebP ฟรี", "แปลง PNG เป็น WebP ฟรี รักษาพื้นโปร่งใสและลดขนาดไฟล์โดยประมวลผลใน browser", "วิธีแปลง PNG เป็น WebP", "WebP รองรับพื้นโปร่งใสและมักเหมาะกับรูปเว็บไซต์ที่ต้องการไฟล์เล็กกว่า PNG", ["เลือกรูป PNG", "เลือกคุณภาพ WebP", "ดูผลลัพธ์และดาวน์โหลด"]],
    en: ["Convert PNG to WebP Free Online | DJAI Image Tools", "Convert PNG to WebP for free", "Convert PNG to WebP free while preserving transparency, processed privately in your browser.", "How to convert PNG to WebP", "WebP supports transparency and can be smaller than PNG for web use. Preview and compare the result before downloading.", ["Choose a PNG image", "Select WebP quality", "Review and download the result"]]
  },
  {
    slug: "webp-to-jpg", mode: "dimensions", format: "image/jpeg",
    th: ["แปลง WebP เป็น JPG ฟรี ออนไลน์ | DJAI Image Tools", "แปลง WebP เป็น JPG ฟรี", "แปลง WebP เป็น JPG ฟรีสำหรับระบบหรือโปรแกรมที่ต้องการ JPG โดยไม่อัปโหลดรูป", "วิธีแปลง WebP เป็น JPG", "ใช้เมื่อแบบฟอร์ม โปรแกรม หรืออุปกรณ์ปลายทางไม่รองรับ WebP แล้วดาวน์โหลดไฟล์ JPG ที่ใช้ได้กว้างขึ้น", ["เลือกไฟล์ WebP", "กำหนดคุณภาพ JPG", "ประมวลผลและดาวน์โหลด JPG"]],
    en: ["Convert WebP to JPG Free Online | DJAI Image Tools", "Convert WebP to JPG for free", "Convert WebP to JPG free for forms, software, and devices that require JPG. Your image stays on your device.", "How to convert WebP to JPG", "Use JPG when a form or application does not accept WebP. Select the quality and download a widely compatible file.", ["Choose a WebP image", "Set JPG quality", "Process and download the JPG"]]
  },
  {
    slug: "webp-to-png", mode: "dimensions", format: "image/png",
    th: ["แปลง WebP เป็น PNG ฟรี ออนไลน์ | DJAI Image Tools", "แปลง WebP เป็น PNG ฟรี", "แปลง WebP เป็น PNG ฟรีสำหรับงานออกแบบ โดยไฟล์อยู่ในอุปกรณ์และไม่ถูกอัปโหลด", "วิธีแปลง WebP เป็น PNG", "PNG เหมาะกับงานกราฟิก ระบบที่ต้องการ lossless และรูปโปร่งใส เครื่องมือแปลงพร้อมลบ metadata", ["เลือกไฟล์ WebP", "ตรวจสอบ PNG ที่ตั้งไว้", "ประมวลผลและดาวน์โหลด PNG"]],
    en: ["Convert WebP to PNG Free Online | DJAI Image Tools", "Convert WebP to PNG for free", "Convert WebP to PNG free for design workflows. Files remain on your device and are never uploaded.", "How to convert WebP to PNG", "PNG is useful for graphics, lossless workflows, and transparency. Conversion also removes image metadata.", ["Choose a WebP image", "Confirm PNG output", "Process and download the PNG"]]
  },
  {
    slug: "compress-image", mode: "target", targetKb: 200,
    th: ["บีบอัดรูป ลดขนาดไฟล์ JPG PNG WebP ฟรี | DJAI", "บีบอัดรูปและลดขนาดไฟล์ฟรี", "บีบอัดรูป JPG PNG และ WebP ให้ใกล้ขนาด KB ที่ต้องการ ฟรีและเป็นส่วนตัวใน browser", "วิธีบีบอัดรูปให้ไฟล์เล็กลง", "กำหนดขนาดเป้าหมายเป็น KB แล้วเครื่องมือจะปรับคุณภาพและขนาดภาพเท่าที่จำเป็น", ["เลือกรูปที่ต้องการลดขนาด", "ใส่ขนาด KB เป้าหมาย", "ตรวจขนาดแล้วดาวน์โหลด"]],
    en: ["Compress JPG PNG WebP Images Free Online | DJAI", "Compress images and reduce file size", "Compress JPG, PNG, and WebP images toward a target KB size free with private browser processing.", "How to compress an image", "Enter a target in KB and the tool adjusts quality and dimensions only as needed for email, forms, and websites.", ["Choose the image to reduce", "Enter a target size in KB", "Review the result and download"]]
  },
  {
    slug: "resize-image", mode: "percentage", percent: 50,
    th: ["Resize รูปตาม Pixel หรือเปอร์เซ็นต์ฟรี | DJAI", "Resize และย่อรูปออนไลน์ฟรี", "Resize รูปตาม pixel เปอร์เซ็นต์ หรือ preset สำหรับ social media ฟรี พร้อมล็อกอัตราส่วนภาพ", "วิธี Resize รูปโดยไม่ทำให้ภาพยืด", "ย่อหรือขยายรูปตามเปอร์เซ็นต์ กำหนด pixel หรือใช้ preset โดยระบบล็อกอัตราส่วนภาพไว้เป็นค่าเริ่มต้น", ["เลือกรูปจากอุปกรณ์", "เลือกเปอร์เซ็นต์ pixel หรือ preset", "ตรวจขนาดใหม่แล้วดาวน์โหลด"]],
    en: ["Resize Image by Pixels or Percentage Free | DJAI", "Resize images online for free", "Resize images by pixels, percentage, or social media presets free while keeping the aspect ratio.", "How to resize an image without stretching", "Scale by percentage, enter pixel dimensions, or use a preset. Aspect ratio protection is enabled by default.", ["Choose an image", "Select percentage, dimensions, or preset", "Review the size and download"]]
  },
  {
    slug: "image-to-100kb", mode: "target", targetKb: 100,
    th: ["ลดขนาดรูปให้ใกล้ 100 KB ฟรี | DJAI Image Tools", "ลดขนาดรูปให้ใกล้ 100 KB", "บีบอัด JPG PNG หรือ WebP ให้ใกล้ 100 KB ฟรี เหมาะกับแบบฟอร์มสมัครงานและระบบอัปโหลดไฟล์", "วิธีลดรูปให้ใกล้ 100 KB", "ตั้งค่า 100 KB ไว้แล้ว เครื่องมือจะพยายามให้ใกล้เป้าหมายหรือเล็กกว่าโดยรักษาคุณภาพให้ดีที่สุด", ["เลือกรูป JPG PNG หรือ WebP", "ใช้ค่าเป้าหมาย 100 KB", "ตรวจขนาดและดาวน์โหลด"]],
    en: ["Compress Image to Approximately 100 KB Free | DJAI", "Compress an image to approximately 100 KB", "Reduce a JPG, PNG, or WebP image toward 100 KB free for forms, applications, and upload limits.", "How to reduce an image to 100 KB", "The 100 KB target is selected automatically. The tool aims for the target or slightly below while preserving useful quality.", ["Choose a supported image", "Use the 100 KB target", "Review the actual size and download"]]
  },
  {
    slug: "image-to-500kb", mode: "target", targetKb: 500,
    th: ["ลดขนาดรูปให้ใกล้ 500 KB ฟรี | DJAI Image Tools", "ลดขนาดรูปให้ใกล้ 500 KB", "บีบอัด JPG PNG หรือ WebP ให้ใกล้ 500 KB ฟรีใน browser เหมาะกับอีเมล เว็บไซต์ และแบบฟอร์ม", "วิธีลดรูปให้ใกล้ 500 KB", "ตั้งค่า 500 KB ไว้แล้ว เหมาะกับงานที่ต้องการภาพคมชัดแต่มีข้อจำกัดขนาดไฟล์", ["เลือกรูปที่ต้องการบีบอัด", "ใช้ค่าเป้าหมาย 500 KB", "เปรียบเทียบแล้วดาวน์โหลด"]],
    en: ["Compress Image to Approximately 500 KB Free | DJAI", "Compress an image to approximately 500 KB", "Reduce a JPG, PNG, or WebP image toward 500 KB free in your browser for email, websites, and forms.", "How to reduce an image to 500 KB", "The 500 KB target is preselected for images that need useful detail under a file-size limit.", ["Choose the image to compress", "Use the 500 KB target", "Compare the sizes and download"]]
  },
  {
    slug: "resize-image-to-200kb", mode: "target", targetKb: 200,
    th: ["ลดขนาดรูปให้ใกล้ 200 KB ฟรี | DJAI Image Tools", "ลดขนาดรูปให้ใกล้ 200 KB", "ลดขนาด JPG PNG WebP หรือ AVIF ให้ใกล้ 200 KB ฟรีสำหรับแบบฟอร์ม อีเมล และเว็บไซต์ โดยประมวลผลใน browser", "วิธีลดขนาดรูปให้ใกล้ 200 KB", "ระบบตั้งเป้าหมาย 200 KB ไว้ล่วงหน้าและจะปรับคุณภาพหรือขนาดภาพเท่าที่จำเป็น โดยแสดงขนาดจริงก่อนดาวน์โหลด", ["เลือกรูปจากอุปกรณ์", "ตรวจค่าเป้าหมาย 200 KB", "ประมวลผล ตรวจขนาดจริง และดาวน์โหลด"]],
    en: ["Resize Image to Approximately 200 KB Free | DJAI", "Resize an image to approximately 200 KB", "Reduce JPG, PNG, WebP, or AVIF images toward 200 KB free for forms, email, and websites with private browser processing.", "How to resize an image to 200 KB", "The 200 KB target is preconfigured. The tool adjusts quality or dimensions only as needed and shows the actual output size before download.", ["Choose an image from your device", "Confirm the 200 KB target", "Process, check the actual size, and download"]]
  },
  {
    slug: "avif-to-jpg", mode: "dimensions", format: "image/jpeg",
    th: ["แปลง AVIF เป็น JPG ฟรี ออนไลน์ | DJAI Image Tools", "แปลง AVIF เป็น JPG ฟรี", "แปลงรูป AVIF เป็น JPG สำหรับแบบฟอร์ม ระบบเก่า อีเมล และเว็บไซต์ที่ต้องการไฟล์ภาพถ่ายขนาดเล็ก โดยไม่อัปโหลดรูป", "วิธีแปลง AVIF เป็น JPG", "JPG เหมาะกับภาพถ่ายและระบบที่ไม่รับ AVIF สามารถปรับคุณภาพเพื่อลดขนาดไฟล์ได้ แต่ JPG ไม่รองรับพื้นโปร่งใสและเป็นการบีบอัดแบบสูญเสียรายละเอียดบางส่วน เครื่องมือจะแสดงขนาดผลลัพธ์ก่อนดาวน์โหลด", ["เลือกภาพ AVIF และตรวจว่ารูปแสดง preview ได้", "ตั้งคุณภาพ JPG ให้เหมาะกับความคมชัดและขนาดไฟล์", "เปรียบเทียบขนาดแล้วดาวน์โหลดไฟล์ JPG ที่รองรับได้กว้าง"]],
    en: ["Convert AVIF to JPG Free Online | DJAI Image Tools", "Convert AVIF to JPG for free", "Turn AVIF photos into smaller, widely accepted JPG files for forms, legacy software, email, and websites without uploading the image.", "How to convert AVIF to JPG", "Choose JPG when broad compatibility and a smaller photographic file matter more than transparency. JPG uses lossy compression, offers an adjustable quality setting, and cannot preserve an alpha channel. Preview the decoded AVIF, balance detail against file size, and check the actual JPG output before downloading.", ["Choose an AVIF photo and confirm that the preview decodes correctly", "Adjust JPG quality to balance visible detail and download size", "Compare the result and download the widely compatible JPG file"]]
  },
  {
    slug: "avif-to-png", mode: "dimensions", format: "image/png",
    th: ["แปลง AVIF เป็น PNG ฟรี ออนไลน์ | DJAI Image Tools", "แปลง AVIF เป็น PNG ฟรี", "แปลง AVIF เป็น PNG สำหรับโลโก้ กราฟิก ภาพหน้าจอ และงานออกแบบที่ต้องรักษาพื้นโปร่งใส โดยประมวลผลใน browser", "วิธีแปลง AVIF เป็น PNG", "PNG เหมาะกับกราฟิก ขอบคม และงานที่ต้องการพื้นโปร่งใสหรือไฟล์แบบ lossless ผลลัพธ์มักใหญ่กว่า JPG แต่ไม่มี quality slider ที่ลดรายละเอียดภาพ ตรวจ alpha channel และขนาดไฟล์ก่อนนำไปใช้ในงานออกแบบหรือ publishing", ["เลือกภาพ AVIF และตรวจพื้นโปร่งใสใน preview", "ยืนยัน PNG เมื่อต้องการกราฟิกแบบ lossless หรือ alpha channel", "ประมวลผล ตรวจขนาดผลลัพธ์ และดาวน์โหลด PNG"]],
    en: ["Convert AVIF to PNG Free Online | DJAI Image Tools", "Convert AVIF to PNG for free", "Convert AVIF artwork to PNG for logos, screenshots, graphics, and publishing workflows that need transparency, entirely in your browser.", "How to convert AVIF to PNG", "Choose PNG for sharp-edged graphics, lossless output, or an alpha channel that must remain transparent. PNG output is commonly larger than JPG and does not use a photographic quality slider. Check transparency and the resulting file size before using it in design or publishing work.", ["Choose an AVIF graphic and inspect transparent areas in the preview", "Confirm PNG when you need lossless pixels or an alpha channel", "Process locally, review the output size, and download the PNG"]]
  },
  {
    slug: "passport-photo-resizer", mode: "dimensions", format: "image/jpeg", width: 413, height: 531, crop: true,
    th: ["Resize รูปพาสปอร์ต 35x45 มม. ฟรี | DJAI", "Resize และครอปรูปพาสปอร์ตฟรี", "ครอปรูปพาสปอร์ตเป็นสัดส่วน 35 × 45 มม. ที่ 413 × 531 px หรือเลือก US 2 × 2 นิ้ว 600 × 600 px ฟรีใน browser", "วิธี Resize รูปพาสปอร์ต", "ค่าเริ่มต้นใช้รูป 35 × 45 มม. ที่ประมาณ 300 DPI เครื่องมือครอปกึ่งกลางให้เต็มกรอบ โปรดตรวจข้อกำหนดล่าสุดของหน่วยงานก่อนยื่นจริง", ["เลือกรูปหน้าตรงที่มีพื้นที่รอบศีรษะ", "เลือก 35x45 หรือ US 2x2", "ครอป ตรวจภาพ และดาวน์โหลด JPG"]],
    en: ["Passport Photo Resizer 35x45 mm and 2x2 Inch | DJAI", "Resize and crop a passport photo for free", "Crop a passport photo to 35 × 45 mm at 413 × 531 px or choose the US 2 × 2 inch 600 × 600 px preset, privately in your browser.", "How to resize a passport photo", "The default is a 35 × 45 mm ratio at approximately 300 DPI. The tool center-crops to fill the frame. Always verify current authority requirements before submitting.", ["Choose a front-facing photo with space around the head", "Select the 35x45 or US 2x2 preset", "Crop, review, and download the JPG"]]
  },
  {
    slug: "heic-to-jpg", mode: "dimensions", format: "image/jpeg",
    th: ["แปลง HEIC เป็น JPG ฟรี ออนไลน์ | DJAI Image Tools", "แปลง HEIC เป็น JPG ฟรี", "แปลงรูป HEIC และ HEIF จาก iPhone เป็น JPG ฟรีใน browser โดยไม่อัปโหลดรูป", "วิธีแปลง HEIC เป็น JPG", "เปิดรูป HEIC หรือ HEIF จาก iPhone แล้วแปลงเป็น JPG สำหรับเว็บไซต์ แบบฟอร์ม และโปรแกรมทั่วไป", ["เลือกไฟล์ HEIC หรือ HEIF", "รอ browser ถอดรหัสและแสดงภาพ", "ประมวลผลแล้วดาวน์โหลด JPG"]],
    en: ["Convert HEIC to JPG Free Online | DJAI Image Tools", "Convert HEIC to JPG for free", "Convert iPhone HEIC and HEIF photos to JPG free in your browser without uploading images to a server.", "How to convert HEIC to JPG", "Open an iPhone HEIC or HEIF photo and create a compatible JPG for websites, forms, and common applications.", ["Choose a HEIC or HEIF file", "Let the browser decode and preview it", "Process and download the JPG"]]
  },
  {
    slug: "remove-background-image", mode: "background",
    ctaEn: "Remove your first background for free.", ctaTh: "ลบพื้นหลังรูปแรกของคุณฟรี",
    faqHeadingEn: "Questions about removing backgrounds.", faqHeadingTh: "คำถามเกี่ยวกับการลบพื้นหลัง",
    faq: {
      en: [
        ["Is removing the background really free?", "Yes. There is no signup, no watermark, and no limit on how many images you process."],
        ["What file do I get back?", "A PNG with a transparent background, so it keeps its transparency in design tools, slide decks, and online stores."],
        ["Are my images uploaded?", "No. The AI model runs inside your browser, so the image never leaves your device."],
        ["Does it handle hair and fine edges?", "Yes. The model produces a soft alpha edge rather than a hard cutout, which keeps hair and fur looking natural."],
        ["Can I remove backgrounds from several images at once?", "Yes. Add a batch and download every transparent PNG together in a single ZIP."],
        ["Which formats can I upload?", "JPG, PNG, WebP, HEIC, and HEIF, including photos straight from an iPhone."]
      ],
      th: [
        ["ลบพื้นหลังฟรีจริงไหม", "ฟรีจริง ไม่ต้องสมัครสมาชิก ไม่มีลายน้ำ และไม่จำกัดจำนวนรูป"],
        ["ได้ไฟล์อะไรกลับมา", "ไฟล์ PNG พื้นหลังโปร่งใส ใช้ต่อในงานออกแบบ สไลด์ และร้านค้าออนไลน์ได้ทันที"],
        ["รูปของฉันถูกอัปโหลดไหม", "ไม่ถูกอัปโหลด โมเดล AI ทำงานใน browser รูปจึงไม่ออกจากอุปกรณ์ของคุณ"],
        ["ลบพื้นหลังบริเวณเส้นผมได้ดีไหม", "ได้ โมเดลสร้างขอบแบบ alpha ที่นุ่มนวล ทำให้เส้นผมและขนดูเป็นธรรมชาติ"],
        ["ลบพื้นหลังหลายรูปพร้อมกันได้ไหม", "ได้ เพิ่มรูปเป็นชุดแล้วดาวน์โหลด PNG โปร่งใสทั้งหมดเป็นไฟล์ ZIP เดียว"],
        ["อัปโหลดไฟล์แบบไหนได้บ้าง", "JPG, PNG, WebP, HEIC และ HEIF รวมถึงรูปจาก iPhone โดยตรง"]
      ]
    },
    th: ["ลบพื้นหลังรูปฟรี ออนไลน์ | DJAI Image Tools", "ลบพื้นหลังรูปฟรี", "ลบพื้นหลังรูป JPG, PNG, WebP, HEIC หรือ HEIF ฟรีใน browser แล้วดาวน์โหลด PNG พื้นหลังโปร่งใส", "วิธีลบพื้นหลังรูป", "เลือกภาพสินค้า โปรไฟล์ หรือคอนเทนต์ social แล้วเครื่องมือจะใช้ AI segmentation ใน browser เพื่อสร้างไฟล์ PNG พื้นหลังโปร่งใส", ["เลือกรูปจากอุปกรณ์", "รอ AI ลบพื้นหลังใน browser", "ตรวจผลลัพธ์และดาวน์โหลด PNG โปร่งใส"]],
    en: ["Remove Image Background Free Online | DJAI Image Tools", "Remove an image background for free", "Remove the background from JPG, PNG, WebP, HEIC, or HEIF images free in your browser and download a transparent PNG.", "How to remove an image background", "Choose a product photo, profile image, or social content image and the tool uses browser-based AI segmentation to create a transparent PNG.", ["Choose an image from your device", "Let browser AI remove the background", "Review and download the transparent PNG"]]
  },
  {
    slug: "remove-image-metadata", mode: "dimensions",
    th: ["ลบ Metadata รูปภาพฟรี แบบ Private | DJAI Image Tools", "ลบ Metadata จากรูปภาพฟรี", "ลบ EXIF และ metadata จาก JPG PNG WebP หรือ HEIC ด้วยการสร้างสำเนาใหม่ใน browser โดยไม่ upload รูป", "วิธีลบ Metadata จากรูปภาพ", "เครื่องมือจะ decode และสร้างไฟล์รูปใหม่ผ่าน browser canvas ทำให้ metadata เดิมไม่ติดไปกับไฟล์ผลลัพธ์", ["เลือกรูปที่ต้องการทำให้เป็นส่วนตัว", "คงขนาดและ format ที่ต้องการ", "ประมวลผลและดาวน์โหลดสำเนาใหม่"]],
    en: ["Remove Image Metadata Free and Privately | DJAI Image Tools", "Remove metadata from an image for free", "Remove EXIF and metadata from JPG, PNG, WebP, or HEIC by creating a new browser-processed copy without uploading it.", "How to remove image metadata", "The tool decodes the image and creates a new file through browser canvas, preventing original metadata from being carried into the result.", ["Choose the image to make privacy-safe", "Keep the dimensions and preferred format", "Process and download the new copy"]]
  }
];

const escapeHtml = (value) => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

function discoveryMarkup(language, currentSlug) {
  const en = language === "en";
  const tools = presets.filter((preset) => preset.slug !== currentSlug).map((preset) => {
    const [, label, description] = preset[language];
    const url = `/tools/resizeimg/${preset.slug}/${en ? "en/" : ""}`;
    return `<a href="${url}"><strong>${escapeHtml(label)}</strong><span>${escapeHtml(description)}</span></a>`;
  }).join("");
  const categories = en ? [
    ["All free tools", "/tools/en/", "Browse every free DJAI tool by task."], ["QR code tools", "/tools/qrgen/en/", "Create QR codes for links, Wi-Fi, and contacts."], ["PDF tools", "/tools/PDFTools/en/", "Merge, split, convert, organize, and protect PDFs."], ["Audio and video", "/tools/media/en/", "Convert media, extract audio, and compress video."], ["Document tools", "/tools/document/en/", "Convert DOCX, extract text, and run OCR."], ["AI context tools", "/tools/ai/en/", "Count tokens, clean context, and plan RAG chunks."], ["Spreadsheet tools", "/tools/spreadsheet/en/", "Convert and process CSV, JSON, and XLSX."]
  ] : [
    ["เครื่องมือทั้งหมด", "/tools/", "รวมเครื่องมือฟรีทุกหมวดจาก DJAI"], ["เครื่องมือ QR Code", "/tools/qrgen/", "สร้าง QR สำหรับลิงก์ Wi-Fi และผู้ติดต่อ"], ["เครื่องมือ PDF", "/tools/PDFTools/", "รวม แยก แปลง จัดหน้า และป้องกัน PDF"], ["เสียงและวิดีโอ", "/tools/media/", "แปลงไฟล์ ดึงเสียง และบีบอัดวิดีโอ"], ["เครื่องมือเอกสาร", "/tools/document/", "แปลง DOCX ดึงข้อความ และ OCR"], ["เครื่องมือ AI", "/tools/ai/", "นับ token ทำความสะอาด context และแบ่ง RAG chunk"], ["เครื่องมือ Spreadsheet", "/tools/spreadsheet/", "แปลงและจัดการ CSV JSON และ XLSX"]
  ];
  const categoryLinks = categories.map(([label, href, description]) => `<a href="${href}"><strong>${label}</strong><span>${description}</span></a>`).join("");
  return `<!-- TOOL_DISCOVERY_START --><nav class="tool-discovery-footer section-shell" aria-labelledby="tool-discovery-${language}" data-tool-discovery><div class="tool-discovery-heading"><span class="section-kicker">${en ? "IMAGE WORKFLOWS" : "เครื่องมือรูปภาพ"}</span><h2 id="tool-discovery-${language}">${en ? "Continue with the image task you need" : "ทำงานรูปภาพต่อด้วยเครื่องมือที่ตรงจุด"}</h2><p>${en ? "Choose a focused conversion, compression, resizing, privacy, or background-removal workflow." : "เลือกงานแปลงไฟล์ บีบอัด resize ความเป็นส่วนตัว หรือลบพื้นหลังที่ตั้งค่าไว้พร้อมใช้"}</p></div><div class="tool-discovery-links">${tools}</div><div class="tool-category-links">${categoryLinks}</div></nav><!-- TOOL_DISCOVERY_END -->`;
}

function injectDiscovery(template, markup) {
  const clean = template.replace(/<!-- TOOL_DISCOVERY_START -->[\s\S]*?<!-- TOOL_DISCOVERY_END -->\s*/g, "");
  return clean.replace('  <footer class="site-footer">', `  ${markup}\n\n  <footer class="site-footer">`);
}

function render(template, preset, language) {
  const [title, h1, description, guideTitle, intro, steps] = preset[language];
  const thaiUrl = `${siteRoot}/${preset.slug}/`;
  const englishUrl = `${siteRoot}/${preset.slug}/en/`;
  const canonical = language === "th" ? thaiUrl : englishUrl;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "SoftwareApplication", name: h1, url: canonical, applicationCategory: "UtilitiesApplication", operatingSystem: "Web browser", description, offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "DJAI Academy", url: "https://www.djai.academy/" } },
      { "@type": "HowTo", name: guideTitle, description: intro, step: steps.map((text, index) => ({ "@type": "HowToStep", position: index + 1, text })) },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "DJAI Academy", item: language === "th" ? "https://www.djai.academy/" : "https://www.djai.academy/en/" },
        { "@type": "ListItem", position: 2, name: "Image Tools", item: language === "th" ? `${siteRoot}/` : `${siteRoot}/en/` },
        { "@type": "ListItem", position: 3, name: h1, item: canonical }
      ] }
    ]
  };
  const attrs = [`data-preset="${preset.slug}"`, `data-preset-mode="${preset.mode}"`];
  if (preset.format) attrs.push(`data-preset-format="${preset.format}"`);
  if (preset.targetKb) attrs.push(`data-preset-target="${preset.targetKb}"`);
  if (preset.percent) attrs.push(`data-preset-percent="${preset.percent}"`);
  if (preset.width) attrs.push(`data-preset-width="${preset.width}"`);
  if (preset.height) attrs.push(`data-preset-height="${preset.height}"`);
  if (preset.crop) attrs.push('data-preset-crop="true"');
  const switchUrl = language === "th" ? englishUrl : thaiUrl;
  const guide = `<section class="seo-guide section-shell" aria-labelledby="seo-guide-heading"><div><span class="section-kicker">${language === "th" ? "คู่มือเครื่องมือ" : "TOOL GUIDE"}</span><h2 id="seo-guide-heading">${escapeHtml(guideTitle)}</h2><p>${escapeHtml(intro)}</p></div><ol>${steps.map((step) => `<li><span>${escapeHtml(step)}</span></li>`).join("")}</ol></section>`;

  // The model attribution belongs on pages that actually run the model. Preset
  // pages for other modes never load it, so the credit is stripped there.
  const creditScoped = (html) => preset.mode === "background"
    ? html
    : html.replace(/\s*<p class="footer-credit">[\s\S]*?<\/p>/, "");

  // Presets that define their own FAQ replace the shared resizer one, in both the
  // visible copy and the FAQPage schema, so the two never disagree.
  const faqScoped = (html) => {
    if (!preset.faq) return html;
    const entries = preset[`faq`][language];
    const heading = language === "th" ? preset.faqHeadingTh : preset.faqHeadingEn;
    const cta = language === "th" ? preset.ctaTh : preset.ctaEn;
    const details = entries.map(([question, answer], index) =>
      `<details${index === 0 ? " open" : ""}><summary>${escapeHtml(question)}<span></span></summary><p>${escapeHtml(answer)}</p></details>`
    ).join("");
    const schema = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: entries.map(([question, answer]) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer }
      }))
    });
    return html
      .replace(/<script type="application\/ld\+json">\s*\{"@context":"https:\/\/schema\.org","@type":"FAQPage"[\s\S]*?<\/script>/, `<script type="application/ld+json">${schema}</script>`)
      .replace(/(<section class="faq-section[\s\S]*?<h2>)[\s\S]*?(<\/h2>)/, `$1${escapeHtml(heading)}$2`)
      .replace(/(<div class="faq-list">)[\s\S]*?(<\/div>\s*<\/section>)/, `$1${details}$2`)
      .replace(/(<div><span>[^<]*<\/span><h2>)[\s\S]*?(<\/h2><\/div>)/, `$1${escapeHtml(cta)}$2`);
  };

  return faqScoped(creditScoped(injectDiscovery(template, discoveryMarkup(language, preset.slug))))
    .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
    .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${escapeHtml(description)}">`)
    .replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${canonical}">`)
    .replace(/<link rel="alternate" hreflang="th" href="[^"]*">/, `<link rel="alternate" hreflang="th" href="${thaiUrl}">`)
    .replace(/<link rel="alternate" hreflang="en" href="[^"]*">/, `<link rel="alternate" hreflang="en" href="${englishUrl}">`)
    .replace(/<link rel="alternate" hreflang="x-default" href="[^"]*">/, `<link rel="alternate" hreflang="x-default" href="${thaiUrl}">`)
    .replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${escapeHtml(title)}">`)
    .replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${escapeHtml(description)}">`)
    .replace(/<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${canonical}">`)
    .replace(/<meta name="twitter:title" content="[^"]*">/, `<meta name="twitter:title" content="${escapeHtml(title)}">`)
    .replace(/<meta name="twitter:description" content="[^"]*">/, `<meta name="twitter:description" content="${escapeHtml(description)}">`)
    .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, `<script type="application/ld+json">${JSON.stringify(schema)}</script>`)
    .replace("<body>", `<body ${attrs.join(" ")}>`)
    .replace(/<h1>.*?<\/h1>/s, `<h1>${escapeHtml(h1)}</h1>`)
    .replace(/<p class="hero-description">.*?<\/p>/s, `<p class="hero-description">${escapeHtml(description)}</p>`)
    .replace(/<a href="https:\/\/www\.djai\.academy\/tools\/resizeimg\/(?:en\/)?" hreflang="(?:en|th)">(?:EN|ไทย)<\/a>/, `<a href="${switchUrl}" hreflang="${language === "th" ? "en" : "th"}">${language === "th" ? "EN" : "ไทย"}</a>`)
    .replace("    <section class=\"how-section\">", `    ${guide}\n\n    <section class="how-section">`);
}

const templates = {
  th: readFileSync(join(publicDir, "index.html"), "utf8")
    .replaceAll("https://school.djai.academy/", "https://www.djai.academy/academy/"),
  en: readFileSync(join(publicDir, "en", "index.html"), "utf8")
    .replaceAll("https://school.djai.academy/", "https://www.djai.academy/academy/en/")
    .replace(/https:\/\/www\.djai\.academy\/academy(?:\/en)*\//g, "https://www.djai.academy/academy/en/")
};
writeFileSync(join(publicDir, "index.html"), injectDiscovery(templates.th, discoveryMarkup("th")));
writeFileSync(join(publicDir, "en", "index.html"), injectDiscovery(templates.en, discoveryMarkup("en")));
for (const preset of presets) {
  for (const language of ["th", "en"]) {
    const directory = join(publicDir, preset.slug, ...(language === "en" ? ["en"] : []));
    mkdirSync(directory, { recursive: true });
    writeFileSync(join(directory, "index.html"), render(templates[language], preset, language));
  }
}
console.log(`Generated ${presets.length * 2} bilingual image-tool SEO pages.`);

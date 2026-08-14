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
    faqHeadingVi: "Câu hỏi về xóa nền hình ảnh.", ctaVi: "Xóa nền hình ảnh đầu tiên miễn phí.",
    faq: {
      en: [
        ["Is removing the background really free?", "Yes. There is no signup, no watermark, and no monthly quota. You can process up to 20 images per batch, as many batches as you like."],
        ["What file do I get back?", "A PNG with a transparent background, so it keeps its transparency in design tools, slide decks, and online stores."],
        ["Are my images uploaded?", "No. The AI model runs inside your browser, so the image never leaves your device."],
        ["Does it handle hair and fine edges?", "Yes. The model produces a soft alpha edge rather than a hard cutout, which keeps hair and fur looking natural."],
        ["Can I remove backgrounds from several images at once?", "Yes. Add a batch and download every transparent PNG together in a single ZIP."],
        ["Which formats can I upload?", "JPG, PNG, WebP, HEIC, and HEIF, including photos straight from an iPhone."],
        ["How long does it take?", "A few seconds per image once the model is loaded. The first run also downloads a one-time model of about 18 MB, so it takes longer depending on your connection."],
        ["Does it work offline?", "After the first run the model is cached in your browser, so background removal keeps working without a connection."],
        ["Can I use the results commercially?", "Yes. The images you process are yours, and the tool adds no watermark and claims no rights over your files."]
      ],
      th: [
        ["ลบพื้นหลังฟรีจริงไหม", "ฟรีจริง ไม่ต้องสมัครสมาชิก ไม่มีลายน้ำ และไม่มีโควตารายเดือน ประมวลผลได้ครั้งละไม่เกิน 20 รูป และทำซ้ำได้ไม่จำกัด"],
        ["ได้ไฟล์อะไรกลับมา", "ไฟล์ PNG พื้นหลังโปร่งใส ใช้ต่อในงานออกแบบ สไลด์ และร้านค้าออนไลน์ได้ทันที"],
        ["รูปของฉันถูกอัปโหลดไหม", "ไม่ถูกอัปโหลด โมเดล AI ทำงานใน browser รูปจึงไม่ออกจากอุปกรณ์ของคุณ"],
        ["ลบพื้นหลังบริเวณเส้นผมได้ดีไหม", "ได้ โมเดลสร้างขอบแบบ alpha ที่นุ่มนวล ทำให้เส้นผมและขนดูเป็นธรรมชาติ"],
        ["ลบพื้นหลังหลายรูปพร้อมกันได้ไหม", "ได้ เพิ่มรูปเป็นชุดแล้วดาวน์โหลด PNG โปร่งใสทั้งหมดเป็นไฟล์ ZIP เดียว"],
        ["อัปโหลดไฟล์แบบไหนได้บ้าง", "JPG, PNG, WebP, HEIC และ HEIF รวมถึงรูปจาก iPhone โดยตรง"],
        ["ใช้เวลานานแค่ไหน", "เมื่อโหลดโมเดลแล้วจะใช้เวลาไม่กี่วินาทีต่อรูป ครั้งแรกจะมีการดาวน์โหลดโมเดลขนาดประมาณ 18 MB หนึ่งครั้ง จึงใช้เวลานานกว่าตามความเร็วอินเทอร์เน็ตของคุณ"],
        ["ใช้งานแบบออฟไลน์ได้ไหม", "ได้ หลังจากใช้งานครั้งแรก โมเดลจะถูก cache ไว้ใน browser การลบพื้นหลังจึงทำงานต่อได้แม้ไม่มีอินเทอร์เน็ต"],
        ["นำผลลัพธ์ไปใช้เชิงพาณิชย์ได้ไหม", "ได้ รูปที่คุณประมวลผลเป็นของคุณ เครื่องมือไม่ใส่ลายน้ำและไม่อ้างสิทธิ์ใด ๆ ในไฟล์ของคุณ"]
      ],
      vi: [
        ["Công cụ xóa nền có thật sự miễn phí không?", "Có. Bạn không cần đăng ký, ảnh không có watermark và không có hạn mức theo tháng. Mỗi lượt xử lý tối đa 20 ảnh."],
        ["Tệp kết quả có định dạng gì?", "Bạn nhận được tệp PNG có nền trong suốt để dùng trong thiết kế, slide, ảnh sản phẩm và cửa hàng trực tuyến."],
        ["Ảnh của tôi có được tải lên máy chủ không?", "Không. Mô hình AI chạy trong trình duyệt nên ảnh không rời khỏi thiết bị của bạn."],
        ["Công cụ có xử lý tóc và các cạnh nhỏ không?", "Có. Mô hình tạo cạnh alpha mềm để tóc và lông trông tự nhiên hơn, nhưng bạn vẫn nên kiểm tra kết quả trước khi xuất bản."],
        ["Có thể xóa nền nhiều ảnh cùng lúc không?", "Có. Bạn có thể thêm tối đa 20 ảnh rồi tải tất cả PNG trong suốt trong một tệp ZIP."],
        ["Công cụ nhận những định dạng nào?", "JPG, PNG, WebP, HEIC và HEIF, bao gồm ảnh chụp trực tiếp từ iPhone."],
        ["Xóa nền mất bao lâu?", "Sau khi mô hình được tải, mỗi ảnh thường mất vài giây. Lần đầu lâu hơn vì trình duyệt cần tải mô hình khoảng 18 MB."],
        ["Công cụ có hoạt động ngoại tuyến không?", "Sau lần chạy đầu tiên, trình duyệt lưu mô hình vào bộ nhớ đệm nên công cụ có thể tiếp tục hoạt động khi không có mạng."],
        ["Tôi có thể dùng ảnh kết quả cho mục đích thương mại không?", "Có. Ảnh của bạn vẫn thuộc về bạn; công cụ không thêm watermark và không yêu cầu quyền đối với tệp của bạn."]
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

const vietnameseNames = {
  "jpg-to-png": "Chuyển JPG sang PNG", "png-to-jpg": "Chuyển PNG sang JPG", "jpg-to-webp": "Chuyển JPG sang WebP", "png-to-webp": "Chuyển PNG sang WebP", "webp-to-jpg": "Chuyển WebP sang JPG", "webp-to-png": "Chuyển WebP sang PNG", "compress-image": "Nén hình ảnh", "resize-image": "Resize hình ảnh", "image-to-100kb": "Nén ảnh xuống khoảng 100 KB", "image-to-500kb": "Nén ảnh xuống khoảng 500 KB", "resize-image-to-200kb": "Resize ảnh xuống khoảng 200 KB", "avif-to-jpg": "Chuyển AVIF sang JPG", "avif-to-png": "Chuyển AVIF sang PNG", "passport-photo-resizer": "Resize ảnh hộ chiếu 35 × 45 mm", "remove-background-image": "Xóa nền hình ảnh", "remove-image-metadata": "Xóa metadata hình ảnh", "heic-to-jpg": "Chuyển HEIC sang JPG"
};

for (const preset of presets) {
  const name = vietnameseNames[preset.slug];
  preset.vi = [
    `${name} miễn phí, không cần đăng ký | DJAI Image Tools`,
    `${name} miễn phí`,
    `${name} ngay trong trình duyệt. Không cần đăng ký, không watermark và hình ảnh không bị upload lên máy chủ DJAI.`,
    `Cách ${name.toLowerCase()}`,
    `Chọn hình ảnh từ thiết bị, kiểm tra thiết lập phù hợp rồi xử lý cục bộ trong trình duyệt. Bạn có thể xem dung lượng và kích thước đầu ra trước khi tải.`,
    ["Chọn hình ảnh từ thiết bị", "Điều chỉnh định dạng, kích thước hoặc chất lượng", "Xử lý rồi kiểm tra và tải kết quả"]
  ];
}

const backgroundPreset = presets.find(({ slug }) => slug === "remove-background-image");
backgroundPreset.vi = [
  "Xóa nền ảnh miễn phí online | Background Remover DJAI",
  "Xóa nền hình ảnh miễn phí",
  "Xóa nền ảnh JPG, PNG, WebP, HEIC hoặc HEIF miễn phí ngay trong trình duyệt và tải PNG trong suốt. Không đăng ký, không watermark.",
  "Cách xóa nền ảnh bằng Background Remover",
  "Chọn ảnh sản phẩm, ảnh hồ sơ hoặc nội dung mạng xã hội. Công cụ background remover dùng AI trên thiết bị để xóa background, remove bg và tạo PNG trong suốt mà không upload ảnh.",
  ["Chọn ảnh từ thiết bị", "Để AI trong trình duyệt xóa nền", "Kiểm tra viền và tải PNG trong suốt"]
];

function vietnameseTemplate(template) {
  const replacements = [
    [">Image<", ">Hình ảnh<"], [">Document<", ">Tài liệu<"], [">Spreadsheet<", ">Bảng tính<"], [">All tools<", ">Tất cả công cụ<"], [">Use free tool<", ">Dùng công cụ miễn phí<"],
    ["FREE JPG, PNG, WEBP &amp; HEIC IMAGE TOOL", "CÔNG CỤ JPG, PNG, WEBP &amp; HEIC MIỄN PHÍ"],
    ["Make every image ", "Làm cho mọi hình ảnh "], ["fit perfectly.", "vừa đúng mục đích."],
    ["No sign-up", "Không cần đăng ký"], ["Browser processing", "Xử lý trong trình duyệt"], ["Free to use", "Dùng miễn phí"],
    [">Share<", ">Chia sẻ<"], [">Copy link<", ">Sao chép link<"], ["Same ratio", "Giữ tỷ lệ"],
    ["IMAGE RESIZER", "CÔNG CỤ HÌNH ẢNH"], ["Smaller file. Same great image.", "File gọn hơn. Hình ảnh vẫn phù hợp."],
    ["Private &amp; local", "Riêng tư &amp; cục bộ"], ["Drop your image here", "Thả hình ảnh vào đây"], ["or click to browse from your device", "hoặc chọn file từ thiết bị"], ["Choose image", "Chọn hình ảnh"],
    ["What do you want to do?", "Bạn muốn làm gì?"], ["Target file size", "Dung lượng mục tiêu"], ["Keep original dimensions", "Giữ kích thước ban đầu"], ["Resize percentage", "Tỷ lệ resize"], ["Image size preset", "Kích thước đặt sẵn"], ["Custom dimensions", "Kích thước tùy chỉnh"],
    ["Resize an image", "Resize hình ảnh"], ["Target KB", "KB mục tiêu"], ["Percentage", "Phần trăm"], ["Dimensions", "Kích thước"], ["Background", "Xóa nền"], ["Only reduce quality when possible", "Chỉ giảm chất lượng khi có thể"], ["For difficult targets, the tool may reduce dimensions unless this option is enabled.", "Với mục tiêu khó đạt, công cụ có thể giảm kích thước nếu tùy chọn này chưa bật."], ["Width", "Chiều rộng"], ["Height", "Chiều cao"], ["Aspect ratio is locked by default to prevent stretched images.", "Tỷ lệ khung hình được khóa mặc định để tránh ảnh bị kéo giãn."], ["Output format", "Định dạng đầu ra"], ["Keep original", "Giữ nguyên"], ["Output quality", "Chất lượng đầu ra"], ["Smaller", "Nhỏ hơn"], ["Balanced", "Cân bằng"], ["Higher quality", "Chất lượng cao hơn"], ["Used as export quality or the maximum quality in target-KB mode.", "Dùng làm chất lượng xuất hoặc mức chất lượng tối đa trong chế độ KB mục tiêu."],
    ["Process image", "Xử lý hình ảnh"], ["Resize image", "Xử lý hình ảnh"], ["Download image", "Tải hình ảnh"], ["Start over", "Làm lại"], ["Original", "Bản gốc"], ["Result", "Kết quả"], ["Compare", "So sánh"], ["Before", "Trước"], ["After", "Sau"], ["Image ready!", "Hình ảnh đã sẵn sàng!"], ["Your image has been resized.", "Hình ảnh đã được xử lý."], ["File size", "Dung lượng"], ["Format", "Định dạng"], ["Your image never leaves your browser. We do not upload, store, or view your file.", "Hình ảnh không rời khỏi trình duyệt. DJAI không tải lên, lưu trữ hoặc xem tệp của bạn."],
    ["MOBILE APP", "ỨNG DỤNG DI ĐỘNG"], ["Need scanning, PDF signing, and QR tools on your phone?", "Bạn cần quét tài liệu, ký PDF và tạo QR trên điện thoại?"], ["Cam PDF Scan, Signer & QR Generator brings a scanner, PDF signer, QR generator, and advanced document workflows into one mobile app.", "Cam PDF Scan, Signer & QR Generator kết hợp quét tài liệu, ký PDF, tạo QR và các quy trình tài liệu nâng cao trong một ứng dụng."], ["Download the app", "Tải ứng dụng"], ["Choose your image", "Chọn hình ảnh"], ["Up to 20 files", "Tối đa 20 tệp"], ["Remove the background with browser AI", "Xóa nền bằng AI trong trình duyệt"], ["The result is a transparent PNG for product images, profile photos, thumbnails, and social content.", "Kết quả là PNG trong suốt cho ảnh sản phẩm, ảnh hồ sơ, thumbnail và nội dung mạng xã hội."], ["The first run downloads a one-time AI model from our own servers (about 18 MB) and is slower; later runs are fast from cache. Your image is never uploaded — the model runs on your device.", "Lần đầu công cụ tải mô hình AI khoảng 18 MB từ máy chủ DJAI nên sẽ chậm hơn; các lần sau dùng bản đã lưu. Ảnh không được tải lên vì mô hình chạy trên thiết bị."], ["From oversized to optimized in three steps.", "Hoàn thành xử lý hình ảnh qua ba bước."],
    ["HOW IT WORKS", "CÁCH SỬ DỤNG"], ["PRIVACY FIRST", "ƯU TIÊN QUYỀN RIÊNG TƯ"], ["Your image stays on your device", "Hình ảnh vẫn ở trên thiết bị của bạn"],
    ["POPULAR TASKS", "TÁC VỤ PHỔ BIẾN"], ["Open the tool with the right settings.", "Mở công cụ với thiết lập phù hợp."],
    ["Choose a common conversion, compression, or resize workflow. Every page uses the same private browser-based processing engine.", "Chọn quy trình đổi định dạng, nén hoặc resize. Mỗi trang dùng cùng bộ xử lý riêng tư trong trình duyệt."],
    ["Questions about image resizing.", "Câu hỏi về resize và xử lý hình ảnh."],
    ["Can the tool make an image exactly 100 KB?", "Công cụ có thể tạo ảnh đúng chính xác 100 KB không?"], ["The compressor aims for the selected size or slightly below it. The final size can vary by a few KB because every image compresses differently.", "Công cụ nhắm đến dung lượng đã chọn hoặc thấp hơn một chút. Kết quả có thể chênh vài KB vì mỗi ảnh có đặc điểm nén khác nhau."],
    ["Will my PNG transparency be preserved?", "Độ trong suốt của PNG có được giữ lại không?"], ["Yes, when the output format is PNG or WebP. Converting a transparent image to JPG adds a white background because JPG does not support transparency.", "Có, khi đầu ra là PNG hoặc WebP. Nếu chuyển ảnh trong suốt sang JPG, nền sẽ thành màu trắng vì JPG không hỗ trợ độ trong suốt."],
    ["Does reducing the file size reduce image quality?", "Giảm dung lượng có làm giảm chất lượng ảnh không?"], ["Target-KB compression may lower quality or dimensions. Percentage and dimension modes let you control the image size directly while using a high-quality export.", "Nén theo KB mục tiêu có thể giảm chất lượng hoặc kích thước. Chế độ phần trăm và kích thước cho phép bạn kiểm soát trực tiếp đầu ra."],
    ["Are my images uploaded to DJAI?", "Ảnh của tôi có được tải lên DJAI không?"], ["No. The tool works locally in your browser and does not send the image to DJAI or", "Không. Công cụ chạy cục bộ trong trình duyệt và không gửi ảnh đến DJAI hoặc"],
    ["Can this remove image backgrounds?", "Công cụ có thể xóa nền ảnh không?"], ["Yes. Background mode uses browser-based AI segmentation and exports a transparent PNG for product photos, profile images, and social media assets.", "Có. Chế độ xóa nền dùng AI trong trình duyệt và xuất PNG trong suốt cho ảnh sản phẩm, ảnh hồ sơ và nội dung mạng xã hội."],
    ["Ready when you are.", "Sẵn sàng khi bạn cần."], ["Resize your first image for free.", "Resize hình ảnh đầu tiên miễn phí."],
    ["Open image resizer", "Mở công cụ hình ảnh"], ["Join the Academy", "Tham gia Academy"]
  ];
  let output = template;
  for (const [from, to] of replacements) output = output.replaceAll(from, to);
  return output;
}

function discoveryMarkup(language, currentSlug) {
  const en = language === "en";
  const vi = language === "vi";
  const tools = presets.filter((preset) => preset.slug !== currentSlug).map((preset) => {
    const [, label, description] = preset[language];
    const url = `/tools/resizeimg/${preset.slug}/${language === "th" ? "" : `${language}/`}`;
    return `<a href="${url}"><strong>${escapeHtml(label)}</strong><span>${escapeHtml(description)}</span></a>`;
  }).join("");
  const categories = vi ? [
    ["Tất cả công cụ", "/tools/vi/", "Duyệt mọi công cụ DJAI theo công việc."], ["Công cụ QR", "/tools/qrgen/vi/", "Tạo QR cho URL, Wi-Fi và liên hệ."], ["Công cụ PDF", "/tools/PDFTools/vi/", "Ghép, tách, chuyển đổi và bảo vệ PDF."], ["Âm thanh và video", "/tools/media/vi/", "Chuyển đổi media, tách âm thanh và nén video."], ["Công cụ tài liệu", "/tools/document/vi/", "Chuyển DOCX, trích xuất văn bản và OCR."], ["Công cụ AI", "/tools/ai/vi/", "Đếm token, chia RAG chunk và chuẩn bị context."], ["Công cụ bảng tính", "/tools/spreadsheet/vi/", "Chuyển đổi và xử lý CSV, JSON, XLSX."]
  ] : en ? [
    ["All free tools", "/tools/en/", "Browse every free DJAI tool by task."], ["QR code tools", "/tools/qrgen/en/", "Create QR codes for links, Wi-Fi, and contacts."], ["PDF tools", "/tools/PDFTools/en/", "Merge, split, convert, organize, and protect PDFs."], ["Audio and video", "/tools/media/en/", "Convert media, extract audio, and compress video."], ["Document tools", "/tools/document/en/", "Convert DOCX, extract text, and run OCR."], ["AI context tools", "/tools/ai/en/", "Count tokens, clean context, and plan RAG chunks."], ["Spreadsheet tools", "/tools/spreadsheet/en/", "Convert and process CSV, JSON, and XLSX."]
  ] : [
    ["เครื่องมือทั้งหมด", "/tools/", "รวมเครื่องมือฟรีทุกหมวดจาก DJAI"], ["เครื่องมือ QR Code", "/tools/qrgen/", "สร้าง QR สำหรับลิงก์ Wi-Fi และผู้ติดต่อ"], ["เครื่องมือ PDF", "/tools/PDFTools/", "รวม แยก แปลง จัดหน้า และป้องกัน PDF"], ["เสียงและวิดีโอ", "/tools/media/", "แปลงไฟล์ ดึงเสียง และบีบอัดวิดีโอ"], ["เครื่องมือเอกสาร", "/tools/document/", "แปลง DOCX ดึงข้อความ และ OCR"], ["เครื่องมือ AI", "/tools/ai/", "นับ token ทำความสะอาด context และแบ่ง RAG chunk"], ["เครื่องมือ Spreadsheet", "/tools/spreadsheet/", "แปลงและจัดการ CSV JSON และ XLSX"]
  ];
  const categoryLinks = categories.map(([label, href, description]) => `<a href="${href}"><strong>${label}</strong><span>${description}</span></a>`).join("");
  return `<!-- TOOL_DISCOVERY_START --><nav class="tool-discovery-footer section-shell" aria-labelledby="tool-discovery-${language}" data-tool-discovery><div class="tool-discovery-heading"><span class="section-kicker">${vi ? "QUY TRÌNH HÌNH ẢNH" : en ? "IMAGE WORKFLOWS" : "เครื่องมือรูปภาพ"}</span><h2 id="tool-discovery-${language}">${vi ? "Tiếp tục với công việc hình ảnh bạn cần" : en ? "Continue with the image task you need" : "ทำงานรูปภาพต่อด้วยเครื่องมือที่ตรงจุด"}</h2><p>${vi ? "Chọn quy trình chuyển đổi, nén, resize, quyền riêng tư hoặc xóa nền phù hợp." : en ? "Choose a focused conversion, compression, resizing, privacy, or background-removal workflow." : "เลือกงานแปลงไฟล์ บีบอัด resize ความเป็นส่วนตัว หรือลบพื้นหลังที่ตั้งค่าไว้พร้อมใช้"}</p></div><div class="tool-discovery-links">${tools}</div><div class="tool-category-links">${categoryLinks}</div></nav><!-- TOOL_DISCOVERY_END -->`;
}

function injectDiscovery(template, markup) {
  const clean = template.replace(/<!-- TOOL_DISCOVERY_START -->[\s\S]*?<!-- TOOL_DISCOVERY_END -->\s*/g, "");
  return clean.replace('  <footer class="site-footer">', `  ${markup}\n\n  <footer class="site-footer">`);
}

function addVietnameseHubAlternate(html) {
  if (html.includes('hreflang="vi"')) return html;
  return html.replace('<link rel="alternate" hreflang="x-default"', `<link rel="alternate" hreflang="vi" href="${siteRoot}/vi/">\n  <link rel="alternate" hreflang="x-default"`);
}

function render(template, preset, language) {
  const [title, h1, description, guideTitle, intro, steps] = preset[language];
  const thaiUrl = `${siteRoot}/${preset.slug}/`;
  const englishUrl = `${siteRoot}/${preset.slug}/en/`;
  const vietnameseUrl = `${siteRoot}/${preset.slug}/vi/`;
  const canonical = language === "th" ? thaiUrl : language === "vi" ? vietnameseUrl : englishUrl;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "SoftwareApplication", name: h1, url: canonical, applicationCategory: "UtilitiesApplication", operatingSystem: "Web browser", description, offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "DJAI Academy", url: "https://www.djai.academy/" } },
      { "@type": "HowTo", name: guideTitle, description: intro, step: steps.map((text, index) => ({ "@type": "HowToStep", position: index + 1, text })) },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "DJAI Academy", item: language === "th" ? "https://www.djai.academy/" : language === "vi" ? "https://www.djai.academy/vi/" : "https://www.djai.academy/en/" },
        { "@type": "ListItem", position: 2, name: "Image Tools", item: language === "th" ? `${siteRoot}/` : language === "vi" ? `${siteRoot}/vi/` : `${siteRoot}/en/` },
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
  const guide = `<section class="seo-guide section-shell" aria-labelledby="seo-guide-heading"><div><span class="section-kicker">${language === "vi" ? "HƯỚNG DẪN" : language === "th" ? "คู่มือเครื่องมือ" : "TOOL GUIDE"}</span><h2 id="seo-guide-heading">${escapeHtml(guideTitle)}</h2><p>${escapeHtml(intro)}</p></div><ol>${steps.map((step) => `<li><span>${escapeHtml(step)}</span></li>`).join("")}</ol></section>`;

  // The shared template is written for the resizer. On a background-removal
  // page that copy contradicts the h1, so the on-page prose is retargeted.
  // Scoped to mode "background": every other preset keeps the template verbatim.
  const copyScoped = (html) => {
    if (preset.mode !== "background") return html;
    const th = language === "th";
    const vi = language === "vi";
    const prose = vi
      ? `<section class="seo-guide section-shell" aria-labelledby="bg-about-heading"><div><span class="section-kicker">CÔNG CỤ NÀY LÀM GÌ</span><h2 id="bg-about-heading">Xóa nền ảnh miễn phí và nhận PNG trong suốt</h2><p>DJAI Background Remover xóa nền khỏi JPG, PNG, WebP, HEIC và HEIF rồi trả về PNG trong suốt. Không cần đăng ký, không watermark và có thể xử lý tối đa 20 ảnh trong một lần.</p><p>Mô hình U²-Net (giấy phép Apache-2.0) chạy qua ONNX Runtime ngay trong trình duyệt. Lần đầu sử dụng, trình duyệt tải mô hình phân đoạn khoảng 18 MB từ djai.academy rồi lưu vào bộ nhớ đệm. Ảnh được xử lý trên thiết bị và không được tải lên máy chủ DJAI. Hãy kiểm tra kỹ viền tóc, lông hoặc vật thể trong suốt trước khi dùng kết quả.</p></div></section>`
      : th
      ? `<section class="seo-guide section-shell" aria-labelledby="bg-about-heading"><div><span class="section-kicker">เครื่องมือนี้ทำอะไร</span><h2 id="bg-about-heading">ลบพื้นหลังรูปฟรี ได้ไฟล์ PNG โปร่งใส</h2><p>DJAI Background Remover คือเครื่องมือออนไลน์ฟรีที่ลบพื้นหลังออกจากรูปถ่าย แล้วคืนไฟล์ PNG พื้นหลังโปร่งใสให้คุณ รองรับไฟล์ JPG, PNG, WebP, HEIC และ HEIF รวมถึงรูปที่ถ่ายจาก iPhone โดยตรง ไม่ต้องสมัครสมาชิก ไม่มีลายน้ำ และไม่มีโควตารายเดือน ประมวลผลได้ครั้งละไม่เกิน 20 รูป และดาวน์โหลดทั้งหมดเป็นไฟล์ ZIP เดียวได้</p><p>เครื่องมือทำงานใน browser ของคุณ ไม่ใช่บน server ของเรา ครั้งแรกที่ใช้งาน browser จะดาวน์โหลดโมเดล AI segmentation ขนาดประมาณ 18 MB จาก djai.academy หนึ่งครั้ง หลังจากนั้นจะถูก cache ไว้และทำงานได้ทันที โมเดลประมวลผลทั้งหมดบนอุปกรณ์ของคุณ รูปของคุณจึงไม่ถูกอัปโหลด ไม่ถูกจัดเก็บ และเราไม่เห็นรูปของคุณ รูปทั่วไปใช้เวลาไม่กี่วินาที โมเดลที่ใช้คือ U²-Net (สัญญาอนุญาต Apache-2.0) ทำงานผ่าน ONNX Runtime และสร้างขอบแบบ alpha ที่นุ่มนวล ทำให้เส้นผมและขนดูเป็นธรรมชาติแทนที่จะเป็นขอบตัดแข็ง</p></div></section>`
      : `<section class="seo-guide section-shell" aria-labelledby="bg-about-heading"><div><span class="section-kicker">WHAT THIS TOOL DOES</span><h2 id="bg-about-heading">Remove an image background free and get a transparent PNG</h2><p>DJAI Background Remover is a free online tool that deletes the background from a photo and gives you back a PNG with a transparent background. It works on JPG, PNG, WebP, HEIC, and HEIF files, including photos taken straight from an iPhone. There is no signup, no watermark, and no monthly quota, and you can process up to 20 images in one batch and download them together as a ZIP.</p><p>It runs in your browser, not on our servers. The first time you use it, your browser downloads a one-time AI segmentation model of about 18 MB from djai.academy; after that it is cached and starts instantly. The model then does all of the work on your own device, so your photo is never uploaded, stored, or seen by us. A typical image takes a few seconds. The model is U²-Net (Apache-2.0 licensed), run through ONNX Runtime, and it produces a soft alpha edge, so hair and fur keep natural detail instead of a hard cutout line.</p></div></section>`;
    const replacements = vi ? [
      [/(<span class="section-kicker">)CÔNG CỤ HÌNH ẢNH(<\/span>)/, "$1XÓA NỀN HÌNH ẢNH$2"],
      [/<h2 id="tool-heading">.*?<\/h2>/, '<h2 id="tool-heading">Tách chủ thể và nhận PNG trong suốt</h2>'],
      [/(<h2 id="tool-heading">.*?<\/h2>\s*<p>).*?(<\/p>)/s, "$1Chọn một ảnh hoặc một nhóm ảnh. Mô hình AI chạy trên thiết bị của bạn và trả về PNG có nền trong suốt.$2"],
      [/<strong>Your resized image will appear here<\/strong><small>.*?<\/small>/, "<strong>PNG trong suốt sẽ xuất hiện tại đây</strong><small>Nhấn xử lý để bắt đầu.</small>"],
      [/<h2>From oversized to optimized in three steps\.<\/h2>/, "<h2>Từ ảnh gốc đến PNG trong suốt qua ba bước</h2>"],
      [/<p>Upload a JPG, PNG, or WebP file directly from your device\.<\/p>/, "<p>Chọn JPG, PNG, WebP, HEIC hoặc HEIF trực tiếp từ thiết bị.</p>"],
      [/<h3>Pick a resize method<\/h3>\s*<p>.*?<\/p>/, "<h3>Để AI nhận diện chủ thể</h3><p>Mô hình phân đoạn chạy trong trình duyệt; ảnh không được tải lên.</p>"],
      [/<h3>Download the result<\/h3>\s*<p>.*?<\/p>/, "<h3>Tải PNG trong suốt</h3><p>Kiểm tra phần tách nền rồi lưu tệp PNG.</p>"],
      [/<p>The complete resize process happens.*?<\/p>/, "<p>Toàn bộ quá trình xóa nền diễn ra trên thiết bị của bạn. Mô hình AI được tải vào trình duyệt và ảnh không được gửi đi nơi khác.</p>"],
      [/(<a class="cta-white-button" href="#resizer">)Mở công cụ hình ảnh/, "$1Mở công cụ xóa nền"]
    ] : th ? [
      [/(<span class="section-kicker">)เครื่องมือย่อรูป(<\/span>)/, "$1เครื่องมือลบพื้นหลัง$2"],
      [/<h2 id="tool-heading">.*?<\/h2>/, '<h2 id="tool-heading">ตัดวัตถุออกจากพื้นหลัง ได้ PNG โปร่งใส</h2>'],
      [/(<h2 id="tool-heading">.*?<\/h2>\s*<p>).*?(<\/p>)/s, "$1เลือกรูปหนึ่งไฟล์หรือหลายไฟล์ โมเดล AI ทำงานบนอุปกรณ์ของคุณโดยตรง แล้วคืนไฟล์ PNG พื้นหลังโปร่งใส$2"],
      [/(<a class="primary-button hero-button" href="#resizer">\s*)ย่อรูปภาพ/, "$1ลบพื้นหลัง"],
      [/<strong>รูปที่ย่อแล้วจะแสดงที่นี่<\/strong><small>.*?<\/small>/, "<strong>PNG พื้นหลังโปร่งใสจะแสดงที่นี่</strong><small>กด ลบพื้นหลัง เพื่อเริ่ม</small>"],
      [/<h2>จากไฟล์ใหญ่เป็นไฟล์พร้อมใช้ใน 3 ขั้นตอน<\/h2>/, "<h2>จากรูปถ่ายสู่ PNG โปร่งใส ใน 3 ขั้นตอน</h2>"],
      [/<p>เลือกไฟล์ JPG, PNG หรือ WebP จากอุปกรณ์ของคุณโดยตรง<\/p>/, "<p>เลือกไฟล์ JPG, PNG, WebP, HEIC หรือ HEIF จากอุปกรณ์ของคุณโดยตรง</p>"],
      [/<h3>เลือกวิธีย่อรูป<\/h3>\s*<p>.*?<\/p>/, "<h3>ให้ AI หาวัตถุในภาพ</h3>\n            <p>โมเดล segmentation ทำงานใน browser ของคุณ รูปไม่ถูกอัปโหลดไปที่ใด</p>"],
      [/<h3>ดาวน์โหลดผลลัพธ์<\/h3>\s*<p>.*?<\/p>/, "<h3>ดาวน์โหลด PNG โปร่งใส</h3>\n            <p>ตรวจผลลัพธ์แล้วบันทึกไฟล์ PNG พื้นหลังโปร่งใสได้ทันที</p>"],
      [/<p>กระบวนการย่อรูปทั้งหมด.*?<\/p>/, "<p>กระบวนการลบพื้นหลังทั้งหมดเกิดขึ้นบนอุปกรณ์ของคุณ โมเดล AI ถูกดาวน์โหลดมาไว้ใน browser เพียงครั้งเดียวแล้วทำงานที่นั่น รูปของคุณไม่ถูกส่งออกไปที่ใด</p>"],
      [/(<a class="cta-white-button" href="#resizer">)เปิดเครื่องมือย่อรูป/, "$1เปิดเครื่องมือลบพื้นหลัง"]
    ] : [
      [/(<span class="section-kicker">)IMAGE RESIZER(<\/span>)/, "$1BACKGROUND REMOVER$2"],
      [/<h2 id="tool-heading">.*?<\/h2>/, '<h2 id="tool-heading">Cut out the subject. Keep a transparent PNG.</h2>'],
      [/(<h2 id="tool-heading">.*?<\/h2>\s*<p>).*?(<\/p>)/s, "$1Choose one image or a batch. The AI model runs on your own device and returns a PNG with a transparent background.$2"],
      [/(<a class="primary-button hero-button" href="#resizer">\s*)Resize an image/, "$1Remove a background"],
      [/<strong>Your resized image will appear here<\/strong><small>.*?<\/small>/, "<strong>Your transparent PNG will appear here</strong><small>Press Remove background to start.</small>"],
      [/<h2>From oversized to optimized in three steps\.<\/h2>/, "<h2>From photo to transparent PNG in three steps.</h2>"],
      [/<p>Upload a JPG, PNG, or WebP file directly from your device\.<\/p>/, "<p>Upload a JPG, PNG, WebP, HEIC, or HEIF file directly from your device.</p>"],
      [/<h3>Pick a resize method<\/h3>\s*<p>.*?<\/p>/, "<h3>Let the AI find the subject</h3>\n            <p>The segmentation model runs inside your browser. Nothing is uploaded.</p>"],
      [/<h3>Download the result<\/h3>\s*<p>.*?<\/p>/, "<h3>Download the transparent PNG</h3>\n            <p>Review the cutout and save a PNG that keeps its transparency.</p>"],
      [/<p>The complete resize process happens.*?<\/p>/, "<p>The complete background-removal process happens on your device. The AI model is downloaded to your browser once and runs there; the image is never sent anywhere.</p>"],
      [/(<a class="cta-white-button" href="#resizer">)Open image resizer/, "$1Open the background remover"]
    ];
    let out = html;
    for (const [pattern, value] of replacements) {
      const next = out.replace(pattern, value);
      if (next === out && !vi) throw new Error(`background copy replacement did not apply: ${pattern}`);
      out = next;
    }

    // The share buttons advertise the resizer index, so sharing this tool sends
    // people to the wrong page. Rewritten inside the share blocks only, to keep
    // the canonical/hreflang/language-switcher replacements below intact.
    const indexUrl = `${siteRoot}/${language === "th" ? "" : `${language}/`}`;
    const shareTitle = language === "vi" ? "Xóa nền hình ảnh miễn phí — DJAI" : th ? "ลบพื้นหลังรูปฟรี โดย DJAI" : "Remove Image Background Free — DJAI";
    out = out.replace(/<div class="share-buttons[\s\S]*?<\/div>/g, (block) => block
      .replaceAll(encodeURIComponent(indexUrl), encodeURIComponent(canonical))
      .replaceAll(indexUrl, canonical)
      .replaceAll(encodeURIComponent("Free Image Converter and Resizer by DJAI"), encodeURIComponent(shareTitle))
      .replaceAll("Free Image Converter and Resizer by DJAI", shareTitle));

    return out.replace('    <section class="how-section">', `    ${prose}\n\n    <section class="how-section">`);
  };

  // Presets that define their own FAQ replace the shared resizer one, in both the
  // visible copy and the FAQPage schema, so the two never disagree.
  const faqScoped = (html) => {
    if (!preset.faq) return html;
    const entries = preset[`faq`][language];
    const heading = language === "vi" ? preset.faqHeadingVi : language === "th" ? preset.faqHeadingTh : preset.faqHeadingEn;
    const cta = language === "vi" ? preset.ctaVi : language === "th" ? preset.ctaTh : preset.ctaEn;
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

  return faqScoped(copyScoped(injectDiscovery(language === "vi" ? vietnameseTemplate(template) : template, discoveryMarkup(language, preset.slug))))
    .replace(/<html lang="(?:th|en)">/, `<html lang="${language}">`)
    .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
    .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${escapeHtml(description)}">`)
    .replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${canonical}">`)
    .replace(/<link rel="alternate" hreflang="vi" href="[^"]*">\s*/g, "")
    .replace(/<link rel="alternate" hreflang="th" href="[^"]*">/, `<link rel="alternate" hreflang="th" href="${thaiUrl}">`)
    .replace(/<link rel="alternate" hreflang="en" href="[^"]*">/, `<link rel="alternate" hreflang="en" href="${englishUrl}">`)
    .replace(/<link rel="alternate" hreflang="x-default"/, `<link rel="alternate" hreflang="vi" href="${vietnameseUrl}">\n  <link rel="alternate" hreflang="x-default"`)
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
    .replace(/<a href="https:\/\/www\.djai\.academy\/tools\/resizeimg\/(?:en\/)?" hreflang="(?:en|th)">(?:EN|ไทย)<\/a>/, language === "vi" ? `<a href="${thaiUrl}" hreflang="th">ไทย</a><a href="${englishUrl}" hreflang="en">EN</a>` : `<a href="${switchUrl}" hreflang="${language === "th" ? "en" : "th"}">${language === "th" ? "EN" : "ไทย"}</a>`)
    .replace("    <section class=\"how-section\">", `    ${guide}\n\n    <section class="how-section">`);
}

const templates = {
  th: readFileSync(join(publicDir, "index.html"), "utf8")
    .replaceAll("https://school.djai.academy/", "https://www.djai.academy/academy/"),
  en: readFileSync(join(publicDir, "en", "index.html"), "utf8")
    .replaceAll("https://school.djai.academy/", "https://www.djai.academy/academy/en/")
    .replace(/https:\/\/www\.djai\.academy\/academy(?:\/en)*\//g, "https://www.djai.academy/academy/en/")
};
templates.vi = vietnameseTemplate(templates.en)
  .replaceAll('href="/tools/resizeimg/en/"', 'href="/tools/resizeimg/vi/"')
  .replace(/(href="\/tools\/resizeimg\/[^\"]+)\/en\//g, "$1/vi/");
writeFileSync(join(publicDir, "index.html"), addVietnameseHubAlternate(injectDiscovery(templates.th, discoveryMarkup("th"))));
writeFileSync(join(publicDir, "en", "index.html"), addVietnameseHubAlternate(injectDiscovery(templates.en, discoveryMarkup("en"))));
mkdirSync(join(publicDir, "vi"), { recursive: true });
writeFileSync(join(publicDir, "vi", "index.html"), addVietnameseHubAlternate(injectDiscovery(templates.vi
  .replaceAll(`${siteRoot}/en/`, `${siteRoot}/vi/`)
  .replace(`<link rel="alternate" hreflang="en" href="${siteRoot}/vi/">`, `<link rel="alternate" hreflang="en" href="${siteRoot}/en/">`)
  .replace('<html lang="en">', '<html lang="vi">')
  .replace(/<title>.*?<\/title>/, "<title>Công cụ chuyển đổi và resize hình ảnh miễn phí | DJAI</title>"), discoveryMarkup("vi"))));
for (const preset of presets) {
  for (const language of ["th", "en", "vi"]) {
    const directory = join(publicDir, preset.slug, ...(language === "th" ? [] : [language]));
    mkdirSync(directory, { recursive: true });
    writeFileSync(join(directory, "index.html"), render(templates[language], preset, language));
  }
}
console.log(`Generated ${presets.length * 3} multilingual image-tool SEO pages.`);

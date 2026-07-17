import { getAllPosts, getPostBySlug } from "./blogStore";

export const TH_BLOG_CATEGORIES = ["ข่าวสาร", "คู่มือ", "บทความสอนใช้งาน"];

const posts = [
  {
    id: "tutorial-free-qr-code-generator-th",
    title: "วิธีสร้าง QR Code ฟรีสำหรับเว็บไซต์ เมนู หรืออีเวนต์",
    slug: "how-to-create-free-qr-code",
    category: "บทความสอนใช้งาน",
    status: "published",
    excerpt:
      "สอนสร้าง QR code ฟรีสำหรับเว็บไซต์ เมนูร้าน คาเฟ่ อีเวนต์ แบบไม่ต้องสมัครบัญชี และดาวน์โหลดเป็น PNG หรือ SVG ได้",
    seoTitle: "วิธีสร้าง QR Code ฟรีสำหรับเว็บไซต์ เมนู หรืออีเวนต์",
    seoDescription:
      "คู่มือสร้าง QR code ฟรีด้วย DJAI QR Generator ไม่มี watermark ไม่ต้องสมัครบัญชี และรองรับ PNG/SVG",
    author: "DJAI Academy",
    publishedAt: "2026-07-17T03:00:00.000Z",
    updatedAt: "2026-07-17T03:00:00.000Z",
    readingTime: "อ่าน 5 นาที",
    keywords: ["สร้าง QR code ฟรี", "QR code เมนู", "QR code เว็บไซต์", "DJAI tools"],
    content: `## ทำไม QR Code ยังมีประโยชน์

QR code เป็นวิธีที่ง่ายที่สุดในการเชื่อมโลก offline เข้ากับ online ร้านอาหารสามารถวาง QR code บนโต๊ะ คาเฟ่สามารถใช้กับเมนู โรงแรมสามารถใช้กับคู่มือแขก และทีมจัดอีเวนต์สามารถใช้กับ poster หรือ flyer ได้

เป้าหมายคือไม่ให้คนต้องพิมพ์ URL ยาวๆ แต่ scan ครั้งเดียวแล้วไปถึงหน้าที่ต้องการทันที

ตัวอย่างเช่น [Siamese Cat Cafe](https://siamesecat.cafe/) สามารถใช้ QR code สำหรับเมนู ส่วน [Siamese Cat Hotel](https://hotel.siamesecat.cafe/) สามารถใช้สำหรับข้อมูลแขก วิธีจอง หรือคำแนะนำในพื้นที่

## เครื่องมือที่ใช้

ใช้ [Free QR Code Generator by DJAI Academy](https://www.djai.academy/tools/qrgen/) เครื่องมือนี้สร้าง QR code ใน browser และดาวน์โหลดเป็น PNG หรือ SVG ได้

## ขั้นตอนที่ 1: เปิด QR Generator

เข้าไปที่ [DJAI QR Generator](https://www.djai.academy/tools/qrgen/) ไม่ต้องสมัครบัญชี ไม่ต้องติดตั้งโปรแกรม และไม่ต้อง upload ไฟล์ขึ้น server

## ขั้นตอนที่ 2: วางลิงก์ปลายทาง

ลิงก์ที่เหมาะกับ QR code เช่น:

- หน้าเว็บไซต์
- หน้าเมนู
- หน้าจอง
- Google Form
- Payment page
- หน้าโปรโมชัน
- หน้า course หรือ portfolio

ถ้าต้องการโปรโมตคอร์ส DJAI สามารถลิงก์ไปที่ [หน้า course](https://www.djai.academy/course/) ได้ ถ้าต้องการ campaign page หรือ custom tool ทีม [DJAI development](https://www.djai.academy/service/) ช่วยสร้างได้

## ขั้นตอนที่ 3: เลือกสไตล์

หลังใส่ลิงก์แล้ว สามารถปรับ pattern, corner และสีได้ ควรเลือก contrast ที่ชัด โดยเฉพาะงาน print เช่น poster, menu หรือ sticker

## ขั้นตอนที่ 4: ดาวน์โหลด PNG หรือ SVG

ใช้ PNG สำหรับงานทั่วไปบนเว็บหรือ print ขนาดเล็ก ใช้ SVG เมื่อต้องการไฟล์ vector สำหรับป้าย poster หรือ design software

## Checklist ก่อนใช้จริง

- ใช้ URL ที่คงที่
- ทดสอบบนมือถืออย่างน้อยสองเครื่อง
- ใช้สีที่ contrast ชัด
- อย่าวาง QR code ชิดขอบเกินไป
- ใส่ label หรือ call to action ให้ชัด
- ใช้ SVG ถ้าต้องพิมพ์ขนาดใหญ่

## สรุป

เริ่มจาก [DJAI Free QR Code Generator](https://www.djai.academy/tools/qrgen/) แล้วสร้าง QR code หนึ่งอันสำหรับ action ที่ชัดเจน QR code ที่ดีควรพาคนไปยังปลายทางเดียวอย่างรวดเร็ว`
  },
  {
    id: "tutorial-free-image-converter-th",
    title: "วิธีแปลงไฟล์ JPG, PNG และ WebP ฟรีผ่าน Browser",
    slug: "how-to-convert-jpg-png-webp-free",
    category: "บทความสอนใช้งาน",
    status: "published",
    excerpt:
      "คู่มือแปลงรูป JPG, PNG และ WebP ด้วย DJAI Image Tools โดยไฟล์ไม่ถูก upload ขึ้น server",
    seoTitle: "วิธีแปลงไฟล์ JPG PNG และ WebP ฟรี",
    seoDescription:
      "แปลงรูป JPG PNG WebP ฟรีผ่าน browser พร้อมคำแนะนำว่าควรใช้ format ไหนสำหรับเว็บไซต์และงานธุรกิจ",
    author: "DJAI Academy",
    publishedAt: "2026-07-17T03:10:00.000Z",
    updatedAt: "2026-07-17T03:10:00.000Z",
    readingTime: "อ่าน 6 นาที",
    keywords: ["แปลงรูปฟรี", "JPG to PNG", "PNG to WebP", "WebP to JPG", "DJAI Image Tools"],
    content: `## ทำไม Image Format ถึงสำคัญ

Format ของรูปมีผลต่อคุณภาพ ขนาดไฟล์ transparency และความเร็วเว็บไซต์ ถ้าเลือก format ถูก เว็บไซต์จะโหลดเร็วขึ้นและ workflow การทำงานง่ายขึ้น

ใช้ JPG เมื่อเป็นรูปถ่ายและต้องการไฟล์เล็ก ใช้ PNG เมื่อมี transparency หรือภาพ graphic ที่ต้องคม ใช้ WebP เมื่อทำเว็บไซต์และต้องการ compression ที่ดี

## เครื่องมือที่ใช้

ใช้ [DJAI Image Tools](https://www.djai.academy/tools/resizeimg/) เพื่อแปลง JPG, PNG และ WebP ใน browser ไฟล์ของคุณอยู่ในเครื่องและไม่ถูก upload ไปที่ server ของ DJAI

สามารถเริ่มจาก [หน้าเครื่องมือฟรี DJAI](https://www.djai.academy/tools/) เพื่อดูเครื่องมือทั้งหมดที่มีอยู่

## ขั้นตอนที่ 1: เปิด DJAI Image Tools

เข้าไปที่ [Free Image Converter and Resizer](https://www.djai.academy/tools/resizeimg/) แล้วเลือกภาพ JPG, JPEG, PNG หรือ WebP หากต้องการงานเฉพาะสามารถเปิด [JPG เป็น PNG](https://www.djai.academy/tools/resizeimg/jpg-to-png/) หรือ [JPG เป็น WebP](https://www.djai.academy/tools/resizeimg/jpg-to-webp/) พร้อมค่าที่ตั้งไว้ได้

## ขั้นตอนที่ 2: เลือก Output Format

เลือก format ตามเป้าหมาย:

- JPG สำหรับรูปถ่ายและไฟล์เล็ก
- PNG สำหรับ transparency, screenshot, logo และภาพ graphic
- WebP สำหรับเว็บไซต์ที่ต้องการไฟล์เล็กและคุณภาพดี

สำหรับเว็บไซต์อย่าง [Siamese Cat Cafe](https://siamesecat.cafe/) การใช้ WebP ช่วยให้รูปเมนูและภาพบรรยากาศโหลดเร็วขึ้น ส่วนงาน graphic จาก [Siamese Cat Creative Club](https://creative.siamesecat.cafe/) อาจใช้ PNG เมื่อต้องการ transparency

## ขั้นตอนที่ 3: Resize ถ้ารูปใหญ่เกินไป

ถ้าต้องการแค่แปลง format สามารถใช้ขนาดเดิมได้ แต่ถ้ารูปกว้าง 4000 px มักใหญ่เกินสำหรับ blog thumbnail หรือ social preview

ขนาดที่พบบ่อย:

- 1200 px สำหรับ blog image
- 1600 px สำหรับ website banner
- 1080 px สำหรับรูป social แบบ square
- 1920 px สำหรับ hero image

## ขั้นตอนที่ 4: Export และ Download

เมื่อเลือก format และขนาดแล้ว ให้ process image และ download ผลลัพธ์ Browser จะสร้างไฟล์ใหม่ในเครื่องของคุณ

## เลือก Format ไหนดี

### JPG

เหมาะกับรูปถ่ายที่มีหลายสี แต่ไม่รองรับ transparency

### PNG

เหมาะกับภาพโปร่งใส screenshot icon และภาพที่มีตัวอักษร แต่ไฟล์อาจใหญ่กว่า JPG หรือ WebP

### WebP

เหมาะกับเว็บไซต์สมัยใหม่ เพราะลดขนาดไฟล์ได้ดีโดยคุณภาพยังดี

ถ้าธุรกิจของคุณต้องการเว็บไซต์หรือระบบจัดการรูปภาพแบบอัตโนมัติ ดูบริการ [DJAI software development](https://www.djai.academy/service/) ได้

## สรุป

ใช้ [DJAI Image Tools](https://www.djai.academy/tools/resizeimg/) เมื่อคุณต้องการแปลงรูปแบบเร็ว ปลอดภัย และเป็นส่วนตัว เริ่มจาก WebP สำหรับเว็บไซต์ PNG สำหรับ transparency และ JPG สำหรับรูปถ่ายทั่วไป`
  },
  {
    id: "tutorial-compress-image-to-target-size-th",
    title: "วิธีบีบอัดรูปให้เหลือ 100 KB หรือ 500 KB โดยไม่ต้อง Upload",
    slug: "compress-image-to-100kb-500kb",
    category: "บทความสอนใช้งาน",
    status: "published",
    excerpt:
      "เรียนรู้วิธีลดขนาดรูปให้ใกล้ 100 KB, 200 KB หรือ 500 KB ด้วยเครื่องมือ browser-based ที่เป็นส่วนตัว",
    seoTitle: "วิธีบีบอัดรูปให้เหลือ 100 KB หรือ 500 KB",
    seoDescription:
      "คู่มือบีบอัดรูปให้ได้ target KB size ผ่าน browser ด้วย DJAI Image Tools โดยไม่ต้อง upload รูปขึ้น server",
    author: "DJAI Academy",
    publishedAt: "2026-07-17T03:20:00.000Z",
    updatedAt: "2026-07-17T03:20:00.000Z",
    readingTime: "อ่าน 6 นาที",
    keywords: ["บีบอัดรูป 100 KB", "ลดขนาดรูป 500 KB", "compress image", "DJAI Image Tools"],
    content: `## ทำไม Target File Size ถึงมีประโยชน์

หลายเว็บไซต์ แบบฟอร์มสมัครงาน ระบบจอง หรือ platform ต่างๆ กำหนดขนาดไฟล์รูป เช่น profile photo ต้องต่ำกว่า 100 KB หรือรูปเอกสารต้องต่ำกว่า 200 KB

เครื่องมือทั่วไปมักให้เดา quality เอง แต่ target size tool ง่ายกว่า เพราะคุณบอกขนาดไฟล์ที่ต้องการได้

## เครื่องมือที่ใช้

ใช้ [เครื่องมือบีบอัดรูปตามขนาดเป้าหมาย](https://www.djai.academy/tools/resizeimg/compress-image/) เครื่องมือทำงานใน browser ดังนั้นรูปไม่ถูก upload ไปยัง server

แนวทางนี้เหมาะกับธุรกิจ โรงเรียน โรงแรม และ creator ที่จัดการรูปภาพลูกค้าหรือเอกสารภายใน

## ขั้นตอนที่ 1: เลือกรูปภาพ

เปิด [DJAI Image Tools](https://www.djai.academy/tools/resizeimg/compress-image/) แล้วเลือกรูป JPG, PNG หรือ WebP ที่ต้องการ compress สำหรับงานที่กำหนดชัดเจนเปิด [ลดรูปใกล้ 100 KB](https://www.djai.academy/tools/resizeimg/image-to-100kb/) หรือ [ลดรูปใกล้ 500 KB](https://www.djai.academy/tools/resizeimg/image-to-500kb/) ได้โดยตรง

ถ้ารูปใหญ่มาก เครื่องมืออาจต้องลดทั้ง quality และ dimension เพื่อให้ถึง target size ซึ่งเป็นเรื่องปกติ

## ขั้นตอนที่ 2: เลือก Target Size

ตัวอย่าง target ที่ใช้บ่อย:

- 50 KB สำหรับ thumbnail เล็ก
- 100 KB สำหรับ profile photo หรือ application form
- 200 KB สำหรับ document upload
- 500 KB สำหรับรูปเว็บไซต์หรือ blog
- 1 MB สำหรับรูปคุณภาพสูง

ถ้ากำลังเตรียมรูปสำหรับ [DJAI Academy](https://www.djai.academy/) ขนาด 500 KB มักเหมาะกับรูปใหญ่บนเว็บ ส่วนหน้า mobile-first อาจใช้ 100-200 KB

## ขั้นตอนที่ 3: ลด Dimension เมื่อจำเป็น

บางกรณีต้องรักษาขนาด pixel แต่ถ้า target size เข้มงวด ให้ยอมลด dimension เพื่อให้ไฟล์เล็กลงโดยภาพยังดูดี

เช่น guest guide ของ [Siamese Cat Hotel](https://hotel.siamesecat.cafe/) ควรใช้รูปที่โหลดเร็วสำหรับ mobile ส่วน creative portfolio ของ [Siamese Cat Creative Club](https://creative.siamesecat.cafe/) อาจใช้ target สูงขึ้นเพื่อรักษารายละเอียด

## ขั้นตอนที่ 4: เปรียบเทียบผลลัพธ์

หลัง process ให้ดู:

- ขนาดไฟล์เดิม
- ขนาดไฟล์ใหม่
- Dimension เดิม
- Dimension ใหม่
- เปอร์เซ็นต์ที่ลดลง

ถ้าภาพแตกเกินไป ให้เลือก target size สูงขึ้นหรือ export เป็น WebP

## ขั้นตอนที่ 5: Download

เมื่อรูปพร้อมแล้ว download และนำไปใช้กับเว็บไซต์ form campaign article หรือ workflow ภายใน

ถ้าทีมของคุณต้องเตรียมรูปจำนวนมากซ้ำๆ DJAI สามารถสร้าง custom tool หรือ automation ผ่าน [บริการพัฒนา DJAI](https://www.djai.academy/service/) ได้

## Best Practices

- Resize dimension ก่อน compress หนักๆ
- ใช้ WebP สำหรับเว็บไซต์เมื่อทำได้
- ใช้ PNG เมื่อจำเป็นต้องมี transparency
- อย่า upload รูปจากกล้องขนาดใหญ่มากไปยังเว็บโดยตรง
- ทดสอบบนมือถือ
- ตรวจว่า text ในภาพยังอ่านได้

## สรุป

ใช้ [DJAI Image Tools](https://www.djai.academy/tools/resizeimg/) เมื่อคุณต้องการ compress รูปให้ใกล้ 100 KB, 200 KB, 500 KB หรือขนาดอื่น เป็นเครื่องมือฟรี เร็ว และเป็นส่วนตัว`
  }
];

export async function getAllThaiPosts() {
  const adminPosts = await getAllPosts({ locale: "th" });
  const adminSlugs = new Set(adminPosts.map((post) => post.slug));
  return [...adminPosts, ...posts.filter((post) => !adminSlugs.has(post.slug))].sort(
    (a, b) => new Date(b.publishedAt || b.updatedAt) - new Date(a.publishedAt || a.updatedAt)
  );
}

export async function getThaiPostBySlug(slug) {
  return (await getPostBySlug(slug, { locale: "th" })) || posts.find((post) => post.slug === slug);
}

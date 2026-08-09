const reviewedOn = {
  en: "Implementation reviewed August 9, 2026",
  th: "ตรวจสอบการทำงานจาก Implementation เมื่อ 9 สิงหาคม 2026"
};

const tutorials = {
  "how-to-create-free-qr-code": {
    en: {
      eyebrow: "Verified tool workflow",
      title: "What the QR generator actually does",
      intro:
        "The current DJAI tool turns the destination into a live QR preview in your browser. It does not need an account, and the finished code can be downloaded directly from the page.",
      steps: [
        ["Encode", "The tool validates the destination and builds the QR payload in the browser."],
        ["Style", "Pattern, corners, color, and an optional local logo are applied to the preview."],
        ["Download", "Choose PNG for everyday use or SVG when the artwork must scale for print."]
      ],
      boundary:
        "Before printing a batch, scan the exported file on at least two phones and test it at the final physical size. Styling cannot rescue a broken destination URL or poor contrast.",
      primaryHref: "/tools/qrgen/en/",
      primaryLabel: "Create a QR code",
      secondaryHref: "/tools/qrgen/url-qr-code-generator/en/",
      secondaryLabel: "Open the URL QR preset",
      nextEyebrow: "Your next step",
      nextTitle: "Create one code for one stable destination, then test the downloaded file."
    },
    th: {
      eyebrow: "Workflow ที่ตรวจสอบแล้ว",
      title: "QR Generator ทำอะไรกับข้อมูลของคุณจริง ๆ",
      intro:
        "เครื่องมือ DJAI เวอร์ชันปัจจุบันนำปลายทางมาสร้างเป็น Preview ของ QR ใน Browser ไม่ต้องมีบัญชี และดาวน์โหลดไฟล์ที่สร้างเสร็จจากหน้าเครื่องมือได้โดยตรง",
      steps: [
        ["สร้างข้อมูล", "เครื่องมือตรวจปลายทางและสร้าง QR Payload ภายใน Browser"],
        ["ปรับรูปแบบ", "Pattern มุม สี และโลโก้จากเครื่องของคุณจะแสดงใน Preview"],
        ["ดาวน์โหลด", "เลือก PNG สำหรับงานทั่วไป หรือ SVG เมื่อต้องขยายสำหรับงานพิมพ์"]
      ],
      boundary:
        "ก่อนพิมพ์จำนวนมาก ควร Scan ไฟล์ที่ Export ด้วยมือถืออย่างน้อยสองเครื่องและทดสอบที่ขนาดจริง การตกแต่ง QR ไม่สามารถแก้ URL ที่เสียหรือ Contrast ที่ต่ำได้",
      primaryHref: "/tools/qrgen/",
      primaryLabel: "สร้าง QR Code",
      secondaryHref: "/tools/qrgen/url-qr-code-generator/",
      secondaryLabel: "เปิด Preset สำหรับ URL",
      nextEyebrow: "ขั้นตอนถัดไป",
      nextTitle: "สร้างหนึ่ง QR สำหรับหนึ่งปลายทางที่คงที่ แล้วทดสอบไฟล์ที่ดาวน์โหลด"
    }
  },
  "how-to-convert-jpg-png-webp-free": {
    en: {
      eyebrow: "Verified tool workflow",
      title: "Conversion happens locally, but formats are not interchangeable",
      intro:
        "The converter decodes the selected image, draws it to a browser canvas, and creates the chosen JPG, PNG, or WebP output as a local Blob. DJAI's server serves the tool; it does not receive the image being converted.",
      steps: [
        ["Select", "The browser reads the local image and shows its type, size, and dimensions."],
        ["Render", "Canvas redraws the image at the retained or selected dimensions."],
        ["Export", "The browser creates the new format and provides a local download link."]
      ],
      boundary:
        "Changing JPG to PNG does not restore detail already lost to JPEG compression. Exporting transparency to JPG replaces transparent areas with white, while PNG and WebP can preserve transparency.",
      primaryHref: "/tools/resizeimg/en/",
      primaryLabel: "Convert an image",
      secondaryHref: "/tools/resizeimg/jpg-to-webp/en/",
      secondaryLabel: "Try JPG to WebP",
      nextEyebrow: "Choose by outcome",
      nextTitle: "Use WebP for a lighter website image, PNG for transparency, or JPG for a compact photo."
    },
    th: {
      eyebrow: "Workflow ที่ตรวจสอบแล้ว",
      title: "การแปลงไฟล์เกิดในเครื่อง แต่แต่ละ Format ไม่ได้แทนกันได้ทุกกรณี",
      intro:
        "เครื่องมืออ่านรูปที่เลือก วาดรูปใหม่ด้วย Canvas ใน Browser และสร้างผลลัพธ์ JPG, PNG หรือ WebP เป็น Blob ในเครื่อง Server ของ DJAI มีหน้าที่ส่งหน้าเครื่องมือ แต่ไม่ได้รับรูปที่กำลังแปลง",
      steps: [
        ["เลือกรูป", "Browser อ่านไฟล์ในเครื่องและแสดงชนิด ขนาดไฟล์ และ Dimension"],
        ["สร้างภาพใหม่", "Canvas วาดรูปตาม Dimension เดิมหรือขนาดที่ผู้ใช้เลือก"],
        ["Export", "Browser สร้าง Format ใหม่และเตรียมลิงก์ดาวน์โหลดในเครื่อง"]
      ],
      boundary:
        "การเปลี่ยน JPG เป็น PNG ไม่ได้คืนรายละเอียดที่เสียไปจาก JPEG Compression และเมื่อ Export รูปโปร่งใสเป็น JPG พื้นที่โปร่งใสจะกลายเป็นสีขาว ส่วน PNG และ WebP รองรับความโปร่งใสได้",
      primaryHref: "/tools/resizeimg/",
      primaryLabel: "แปลงไฟล์รูป",
      secondaryHref: "/tools/resizeimg/jpg-to-webp/",
      secondaryLabel: "ลองแปลง JPG เป็น WebP",
      nextEyebrow: "เลือกตามผลลัพธ์",
      nextTitle: "ใช้ WebP สำหรับเว็บที่เบาขึ้น PNG เมื่อต้องมีพื้นโปร่งใส หรือ JPG สำหรับรูปถ่ายขนาดเล็ก"
    }
  },
  "compress-image-to-100kb-500kb": {
    en: {
      eyebrow: "Verified tool workflow",
      title: "A target size is a ceiling to work toward—not an exact-byte promise",
      intro:
        "For JPG and WebP, the tool searches for the highest export quality that fits the target. If the image is still too large and dimensions are not locked, it reduces width and height and tries again. PNG uses dimension reduction because its browser export is lossless.",
      steps: [
        ["Set the ceiling", "Enter 100 KB, 500 KB, or another target from 5 KB to 50,000 KB."],
        ["Search", "The tool tries quality levels and may reduce dimensions when the target cannot otherwise be met."],
        ["Inspect", "Compare the before and after sizes and check the result visually before downloading."]
      ],
      boundary:
        "The result may land below the target rather than exactly on it. A lossless PNG or an image with locked dimensions may remain above a very small target; switch to WebP/JPG or allow smaller dimensions when the upload limit is strict.",
      primaryHref: "/tools/resizeimg/compress-image/en/",
      primaryLabel: "Open target-size compression",
      secondaryHref: "/tools/resizeimg/image-to-100kb/en/",
      secondaryLabel: "Start with the 100 KB preset",
      nextEyebrow: "Your next step",
      nextTitle: "Compress once, inspect legibility at the intended display size, then adjust the target if needed."
    },
    th: {
      eyebrow: "Workflow ที่ตรวจสอบแล้ว",
      title: "Target Size คือเพดานที่เครื่องมือพยายามทำให้ถึง ไม่ใช่คำสัญญาว่าจะตรงทุก Byte",
      intro:
        "สำหรับ JPG และ WebP เครื่องมือจะค้นหาค่า Export Quality สูงสุดที่ไม่เกิน Target หากไฟล์ยังใหญ่และไม่ได้ล็อก Dimension เครื่องมือจะลดความกว้างกับความสูงแล้วลองใหม่ ส่วน PNG ใช้การลด Dimension เพราะการ Export PNG ใน Browser เป็นแบบ Lossless",
      steps: [
        ["กำหนดเพดาน", "ใส่ 100 KB, 500 KB หรือ Target อื่นตั้งแต่ 5 KB ถึง 50,000 KB"],
        ["ค้นหาค่าที่เหมาะ", "เครื่องมือลองหลายระดับ Quality และอาจลด Dimension เมื่อจำเป็น"],
        ["ตรวจผล", "เปรียบเทียบขนาดก่อนและหลัง พร้อมดูความคมชัดก่อนดาวน์โหลด"]
      ],
      boundary:
        "ผลลัพธ์อาจต่ำกว่า Target แทนที่จะตรงพอดี และ PNG แบบ Lossless หรือรูปที่ล็อก Dimension อาจยังเกิน Target ที่เล็กมาก หากระบบรับไฟล์แบบเข้มงวดให้เปลี่ยนเป็น WebP/JPG หรือยอมลด Dimension",
      primaryHref: "/tools/resizeimg/compress-image/",
      primaryLabel: "เปิดเครื่องมือบีบอัดตาม Target",
      secondaryHref: "/tools/resizeimg/image-to-100kb/",
      secondaryLabel: "เริ่มด้วย Preset 100 KB",
      nextEyebrow: "ขั้นตอนถัดไป",
      nextTitle: "บีบอัดหนึ่งครั้ง ตรวจความชัดที่ขนาดใช้งานจริง แล้วค่อยปรับ Target หากจำเป็น"
    }
  }
};

export function hasToolTutorialEvidence(slug) {
  return Boolean(tutorials[slug]);
}

function tutorialCopy(slug, locale) {
  const tutorial = tutorials[slug];
  return tutorial?.[locale] || tutorial?.en;
}

export function ToolTutorialEvidence({ slug, locale = "en" }) {
  const text = tutorialCopy(slug, locale);
  if (!text) return null;

  return (
    <section className="article-evidence tutorial-evidence" aria-labelledby={`${slug}-evidence-title`}>
      <div className="article-evidence-heading">
        <p className="eyebrow">{text.eyebrow}</p>
        <h2 id={`${slug}-evidence-title`}>{text.title}</h2>
        <p>{text.intro}</p>
        <p className="evidence-review-date">{reviewedOn[locale] || reviewedOn.en}</p>
      </div>

      <ol className="tutorial-evidence-steps">
        {text.steps.map(([title, description], index) => (
          <li key={title}>
            <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <div><strong>{title}</strong><p>{description}</p></div>
          </li>
        ))}
      </ol>

      <div className="tutorial-evidence-boundary">
        <strong>{locale === "th" ? "ข้อจำกัดที่ควรรู้" : "Limit to understand"}</strong>
        <p>{text.boundary}</p>
      </div>
    </section>
  );
}

export function ToolTutorialNextStep({ slug, locale = "en" }) {
  const text = tutorialCopy(slug, locale);
  if (!text) return null;

  return (
    <aside className="article-next-step" aria-label={text.nextEyebrow}>
      <div>
        <p className="eyebrow">{text.nextEyebrow}</p>
        <h2>{text.nextTitle}</h2>
      </div>
      <div className="article-next-step-actions">
        <a className="button" href={text.primaryHref}>{text.primaryLabel}</a>
        <a className="text-link" href={text.secondaryHref}>{text.secondaryLabel}</a>
      </div>
    </aside>
  );
}

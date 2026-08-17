const journeys = {
  "how-to-create-free-qr-code": {
    en: ["Try the result", "Create the QR code from this tutorial.", "/tools/qrgen/en/", "Open the QR generator"],
    th: ["ลองทำผลลัพธ์", "สร้าง QR Code จากคู่มือนี้", "/tools/qrgen/", "เปิดเครื่องมือสร้าง QR Code"]
  },
  "how-to-convert-jpg-png-webp-free": {
    en: ["Next image task", "Now reduce the converted image to the size you need.", "/blog/en/compress-image-to-100kb-500kb/", "Compress an image to a target size"],
    th: ["งานรูปภาพถัดไป", "ลดรูปที่แปลงแล้วให้ได้ขนาดไฟล์ที่ต้องการ", "/blog/compress-image-to-100kb-500kb/", "บีบอัดรูปตามขนาดเป้าหมาย"]
  },
  "compress-image-to-100kb-500kb": {
    en: ["Use it now", "Prepare an image for a 100 KB upload limit.", "/tools/resizeimg/image-to-100kb/en/", "Compress an image toward 100 KB"],
    th: ["นำไปใช้ตอนนี้", "เตรียมรูปสำหรับระบบที่จำกัดไฟล์ไว้ที่ 100 KB", "/tools/resizeimg/image-to-100kb/", "ลดรูปให้ใกล้ 100 KB"]
  },
  "build-open-source-browser-tools-with-codex-and-claude-code": {
    en: ["Build with guidance", "Turn the build-story lessons into your own working AI product.", "/course/en/", "Explore the AI Masterclass"],
    th: ["สร้างแบบมีเส้นทาง", "นำบทเรียนจากการสร้างเครื่องมือไปพัฒนา AI product ของคุณ", "/course/", "ดู AI Masterclass"]
  },
  "djai-community-open-source-tools-mcp": {
    en: ["Next: understand the toolkit", "See what DJAI Tools MCP can do and where its safety boundaries are.", "/blog/en/complete-guide-djai-tools-mcp/", "Read the complete DJAI Tools MCP guide"],
    th: ["ถัดไป: เข้าใจชุดเครื่องมือ", "ดูว่า DJAI Tools MCP ทำอะไรได้และมีขอบเขตความปลอดภัยอย่างไร", "/blog/complete-guide-djai-tools-mcp/", "อ่านคู่มือ DJAI Tools MCP ฉบับเต็ม"]
  },
  "complete-guide-djai-tools-mcp": {
    en: ["Next: add a repeatable workflow", "Use Agent Skills to turn individual MCP tools into a controlled process.", "/blog/en/how-to-use-ai-agent-skills-djai-tools-mcp/", "Learn how to use DJAI Agent Skills"],
    th: ["ถัดไป: เพิ่ม workflow ที่ทำซ้ำได้", "ใช้ Agent Skills เปลี่ยน MCP tools ให้เป็นกระบวนการที่ควบคุมได้", "/blog/how-to-use-ai-agent-skills-djai-tools-mcp/", "เรียนรู้การใช้ DJAI Agent Skills"]
  },
  "how-to-use-djai-ai-agent-skills-mcp": {
    en: ["Next: understand a skill", "See what an Agent Skill contributes beyond a prompt or tool call.", "/blog/en/superpower-skills-what-is-skill-for-agents/", "What is a skill for AI agents?"],
    th: ["ถัดไป: เข้าใจ Skill", "ดูว่า Agent Skill เพิ่มอะไรนอกเหนือจาก prompt หรือ tool call", "/blog/superpower-skills-skill-agent-thai/", "Skill สำหรับ AI Agent คืออะไร"]
  },
  "superpower-skills-what-is-skill-for-agents": {
    en: ["Next: apply the idea", "See how a structured skill changes a real Claude development workflow.", "/blog/en/giving-claude-superpower-power-up-development/", "Give Claude a repeatable development workflow"],
    th: ["ถัดไป: นำแนวคิดไปใช้", "ดูว่า Skill ที่มีโครงสร้างเปลี่ยน workflow การพัฒนาด้วย Claude อย่างไร", "/blog/giving-claude-superpower-power-up-development-thai/", "เพิ่ม workflow การพัฒนาให้ Claude"]
  },
  "giving-claude-superpower-power-up-development": {
    en: ["Next: choose when a skill is justified", "Learn when an Agent Skill helps and when a simpler instruction is enough.", "/blog/en/when-you-need-superpower-skill-for-all-agents/", "When should an AI agent use a skill?"],
    th: ["ถัดไป: เลือกเวลาที่ควรใช้ Skill", "เรียนรู้ว่าเมื่อใด Agent Skill ช่วยได้ และเมื่อใดคำสั่งธรรมดาก็เพียงพอ", "/blog/when-you-need-superpower-skill-for-all-agents-thai/", "เมื่อใด AI Agent ควรใช้ Skill"]
  },
  "when-you-need-superpower-skill-for-all-agents": {
    en: ["See the workflow produce a real result", "Read the evidence from building and shipping browser tools with AI agents.", "/blog/en/how-i-built-open-source-browser-tools-with-codex-and-claude-code/", "Read the open-source browser-tool build story"],
    th: ["ดู workflow สร้างผลลัพธ์จริง", "อ่านหลักฐานจากการสร้างและเผยแพร่ browser tools ด้วย AI agents", "/blog/ai-vibe-coding-codex-claude-code-open-source-tools/", "อ่านเรื่องการสร้าง browser tools แบบโอเพนซอร์ส"]
  },
  "seo-screaming-toad-open-source-crawler-launch": {
    en: ["Next: use the crawler evidence", "Apply technical SEO lessons from a real DJAI Academy site audit.", "/blog/en/technical-seo-audit-screaming-frog-ai-search/", "Read the technical SEO audit guide"],
    th: ["ถัดไป: ใช้หลักฐานจาก crawler", "นำบทเรียน Technical SEO จากการ audit เว็บไซต์ DJAI Academy จริงไปใช้", "/blog/technical-seo-audit-screaming-frog-ai-search/", "อ่านคู่มือ Technical SEO Audit"]
  },
  "technical-seo-audit-screaming-frog-ai-search": {
    en: ["Next: compare the evidence layers", "Combine field data, lab diagnostics, crawl evidence, and agent workflows.", "/blog/en/three-seo-tools-screaming-frog-mcp/", "Use the three-layer SEO verification workflow"],
    th: ["ถัดไป: เปรียบเทียบหลักฐานแต่ละชั้น", "รวม field data, lab diagnostics, crawl evidence และ agent workflow", "/blog/three-seo-tools-screaming-frog-mcp/", "ใช้ workflow ตรวจสอบ SEO สามชั้น"]
  },
  "three-seo-tools-screaming-frog-mcp": {
    en: ["Next: make the process repeatable", "Turn the audit workflow into a professional SEO skill for AI agents.", "/blog/en/skills-ai-agent-professional-seo-web-developer/", "Build a professional SEO Agent Skill"],
    th: ["ถัดไป: ทำให้กระบวนการใช้ซ้ำได้", "เปลี่ยน audit workflow ให้เป็น Professional SEO Skill สำหรับ AI agents", "/blog/skills-ai-agent-professional-seo-web-developer/", "สร้าง Professional SEO Agent Skill"]
  },
  "skills-ai-agent-professional-seo-web-developer": {
    en: ["Use the evidence tool", "Run the open-source crawler described in this workflow.", "/tools/seo-screaming-toad/en/", "Explore SEO Screaming Toad"],
    th: ["ใช้เครื่องมือเก็บหลักฐาน", "เปิด crawler โอเพนซอร์สที่ใช้ใน workflow นี้", "/tools/seo-screaming-toad/", "ดู SEO Screaming Toad"]
  },
  "claude-opus-5-cost-efficiency-news": {
    en: ["Keep exploring", "Continue with practical AI-agent workflows rather than relying on one model comparison.", "/blog/en/", "Browse current DJAI builder guides"],
    th: ["ศึกษาเนื้อหาต่อ", "ไปต่อด้วย workflow สำหรับ AI agent ที่นำไปใช้ได้จริง ไม่ยึดติดกับการเปรียบเทียบโมเดลเดียว", "/blog/", "ดูคู่มือ DJAI ล่าสุด"]
  }
};

const fallback = {
  en: ["Continue learning", "Choose the next practical DJAI guide for your current task.", "/blog/en/", "Browse DJAI guides"],
  th: ["เรียนรู้ต่อ", "เลือกคู่มือ DJAI ถัดไปให้ตรงกับงานที่คุณกำลังทำ", "/blog/", "ดูคู่มือ DJAI"]
};

export function getBlogJourney(post, locale) {
  if (post.ctaEyebrow && post.ctaTitle && post.ctaHref && post.ctaLabel) {
    return {
      eyebrow: post.ctaEyebrow,
      title: post.ctaTitle,
      href: post.ctaHref,
      label: post.ctaLabel,
      mapped: true
    };
  }

  const key = post.translationGroupId || post.slug;
  const mapped = Boolean(journeys[key]?.[locale]);
  const [eyebrow, title, href, label] = journeys[key]?.[locale] || fallback[locale];
  return { eyebrow, title, href, label, mapped };
}

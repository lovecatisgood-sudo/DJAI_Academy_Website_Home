export const productUrls = {
  th: "https://www.djai.academy/tools/seo-screaming-toad/",
  en: "https://www.djai.academy/tools/seo-screaming-toad/en/",
  vi: "https://www.djai.academy/tools/seo-screaming-toad/vi/"
};

export const repositoryUrls = {
  th: "https://github.com/DJAI-Academy/-Screaming-Frog-Screaming-Toad-SEO-100M-URL",
  en: "https://github.com/lovecatisgood-sudo/Free-Opensource-SEO-Screaming-Toad-not-Frog-tool-with-100million-url-crawl-potential",
  vi: "https://github.com/lovecatisgood-sudo/Free-Opensource-SEO-Screaming-Toad-not-Frog-tool-with-100million-url-crawl-potential"
};

const sharedTools = [
  "health_get",
  "project_create",
  "project_list",
  "profile_create",
  "profile_list",
  "crawl_preview_scope",
  "crawl_start",
  "crawl_status",
  "crawl_pause",
  "crawl_resume",
  "crawl_cancel",
  "crawl_list",
  "crawl_timeline",
  "audit_summary",
  "issue_list",
  "issue_explain",
  "page_list",
  "page_get",
  "link_list",
  "crawl_compare",
  "report_export",
  "diagnostic_create",
  "artifact_get"
];

export const content = {
  th: {
    locale: "th",
    repository: repositoryUrls.th,
    repositoryLabel: "เปิด Repository ภาษาไทย",
    secondaryCta: "ดูวิธีติดตั้ง",
    languageLabel: "English",
    eyebrow: "OPEN-SOURCE SEO CRAWLER + MCP สำหรับ AI AGENT",
    h1: "SEO Screaming Toad: SEO Crawler โอเพนซอร์สสำหรับคนไทย",
    lead:
      "ตรวจ Technical SEO, JavaScript SEO, Canonical, Hreflang, Sitemap, Structured Data และ Internal Link ด้วย Crawler ที่เก็บหลักฐานในเครื่อง พร้อม MCP 23 เครื่องมือให้ AI Agent วิเคราะห์และติดตามการแก้ SEO อย่างเป็นระบบ",
    note:
      "ฟรีภายใต้ MIT License · ข้อมูลอยู่ในเครื่อง · รุ่นปัจจุบันเป็น Release Candidate · ไม่เกี่ยวข้องหรือได้รับการรับรองจาก Screaming Frog Ltd.",
    nav: [
      ["ภาพรวม", "#overview"],
      ["ฟีเจอร์", "#features"],
      ["วิธีใช้", "#how-to-use"],
      ["MCP", "#mcp"],
      ["AI Search", "#ai-search"],
      ["คำถาม", "#faq"]
    ],
    proof: [
      ["23", "MCP tools สำหรับ AI Agent"],
      ["13", "หมวดกฎ Technical SEO"],
      ["Raw + Rendered", "แยกหลักฐาน HTML กับ JavaScript"],
      ["Local-first", "SQLite/WAL บนเครื่องของคุณ"]
    ],
    overviewTitle: "SEO Screaming Toad คืออะไร?",
    overviewCopy: [
      "SEO Screaming Toad หรือ DJAI Toad คือโปรแกรม SEO crawler และ website audit tool แบบโอเพนซอร์สสำหรับ Crawl เว็บไซต์ที่คุณเป็นเจ้าของหรือได้รับอนุญาต โปรแกรมค้นหาหน้าเว็บและทรัพยากรตามลิงก์ ตรวจสัญญาณ Technical SEO แล้วเก็บ URL, Page Evidence, Link Graph และ Finding ลง SQLite เพื่อให้ตรวจย้อนกลับ เปรียบเทียบ และส่งออกรายงานได้",
      "จุดต่างสำคัญคือ MCP Server ที่ออกแบบมาโดยเฉพาะสำหรับ AI Agent แทนการให้ AI ใช้ Shell หรือ HTTP อย่างไม่จำกัด Agent สามารถสร้างโปรไฟล์ Preview Scope เริ่มหรือควบคุม Crawl อ่านปัญหา เปิดหลักฐานของหน้า เปรียบเทียบรอบ และสร้างรายงานผ่านเครื่องมือที่มีขอบเขตและตรวจสอบได้"
    ],
    audienceTitle: "เหมาะกับใคร",
    audiences: [
      ["นักพัฒนาเว็บไซต์", "ตรวจปัญหา Canonical, Metadata, Hreflang, Sitemap และ JavaScript ก่อน Deploy"],
      ["Technical SEO", "ทำ Audit ที่มี Rule ID, Evidence, Limitation และ Crawl Comparison"],
      ["ทีม Content และ Growth", "ค้นหา Duplicate Metadata, หน้าอยู่ลึก, Link เสีย และโอกาส Internal Link"],
      ["AI Agent Builder", "ต่อ Crawler เข้ากับ Codex, Claude หรือ MCP Client ที่รองรับ stdio"],
      ["Agency และธุรกิจ", "เก็บ Crawl Database และรายงานไว้ในเครื่อง แทนการส่งข้อมูลลูกค้าไป Hosted Service"],
      ["ผู้เรียน SEO", "อ่านคำอธิบายกฎและหลักฐานจริงเพื่อเข้าใจว่า Finding เกิดจากอะไร"]
    ],
    featuresEyebrow: "ความสามารถหลัก",
    featuresTitle: "จาก Crawl ไปถึงหลักฐานที่แก้ไขได้จริง",
    featuresIntro:
      "ไม่ใช่เพียงรายการคำเตือน แต่เป็น Workflow ที่เชื่อมการค้นพบ URL, การดึงข้อมูลอย่างปลอดภัย, การแยกหลักฐาน, กฎที่มีเวอร์ชัน และการตรวจซ้ำหลังแก้ไข",
    features: [
      ["Crawler ที่มี Guard", "Concurrent Go crawler พร้อม robots.txt, sitemap discovery, URL normalization, deduplication, redirect validation, TLS และ per-host politeness"],
      ["Raw + JavaScript audit", "เก็บ Raw HTML แยกจากหลักฐานหลัง Playwright render เพื่อเห็นสิ่งที่ Server ส่งและสิ่งที่ JavaScript เปลี่ยน"],
      ["Evidence-backed findings", "ทุก Finding มี Rule ID, เวอร์ชัน, Severity, Subject, Evidence, Remediation และ Limitation"],
      ["Canonical และ Indexability", "ตรวจ Canonical ที่หาย ขัดแย้ง ไม่ถูกต้อง เป็น Chain ชี้หน้าเสียหรือ Noindex รวมถึง Meta Robots และ X-Robots-Tag"],
      ["International SEO", "ตรวจ Hreflang code, Target และ Reciprocity เพื่อค้นหาคลัสเตอร์ภาษาที่ไม่สมบูรณ์"],
      ["Content และ Metadata", "ตรวจ Title, Meta Description, H1, Exact Duplicate, Near-duplicate Signal และความยาวตามเกณฑ์ที่ตั้งไว้"],
      ["Link architecture", "ดู Inlink, Outlink, Crawl Depth, Broken Internal Target, Nofollow และหน้า Orphan-like จากข้อมูลที่พบ"],
      ["Structured Data", "ตรวจ JSON-LD syntax และโครงสร้างพื้นฐาน โดยแยกข้อจำกัดจาก Schema.org vocabulary และ Google rich-result eligibility"],
      ["Recoverable campaigns", "Pause, Resume, Cancel, Timeline, Durable Frontier, Checkpoint และ Recovery สำหรับงาน Crawl ที่ใช้เวลานาน"],
      ["Reports และ Comparison", "ส่งออก CSV, NDJSON หรือ XLSX และเปรียบเทียบหน้าที่เพิ่ม ลบ เปลี่ยน รวมถึงปัญหาใหม่หรือแก้แล้ว"],
      ["Dashboard ภาษาไทย", "Fork ของ DJAI มี README, Dashboard, CLI guidance, audit explanation และ MCP description ภาษาไทย"],
      ["โอเพนซอร์สจริง", "Source code, crawler, dashboard, CLI, Local API และ MCP ใช้งานภายใต้ MIT License"]
    ],
    coverageTitle: "รายการตรวจ SEO ที่สำคัญ",
    coverageIntro:
      "Audit Engine ปัจจุบันมี 13 หมวดกฎที่มีเวอร์ชัน ผลตรวจคือข้อสังเกตทางเทคนิค ไม่ใช่การรับประกันอันดับหรือการ Index",
    coverageHeaders: ["หมวด", "สิ่งที่ตรวจ", "สิ่งที่ต้องพิจารณา"],
    coverage: [
      ["Response", "หน้าเสีย Redirect และ Internal Target ที่โหลดไม่สำเร็จ", "Failure อาจเกิดชั่วคราว"],
      ["Metadata", "Title และ Description ที่หาย สั้น ยาว หรือซ้ำ", "เกณฑ์ความยาวเป็นแนวทาง ไม่ใช่ Ranking Factor"],
      ["Canonical", "Canonical หาย ขัดแย้ง Invalid, Chain, Failed หรือ Noindex Target", "Canonical เป็น Hint"],
      ["Indexability", "Non-200, Noindex, Robots และ Sitemap Coverage", "Search Engine มีนโยบายเพิ่มเติม"],
      ["International", "Hreflang code, Target และ Reciprocity", "เจตนาภาษา/ภูมิภาคต้องตรวจโดยมนุษย์"],
      ["Architecture", "Depth, Inlink, Outlink, Nofollow และ Orphan-like Page", "Utility Page อาจตั้งใจแยก"],
      ["Media", "รูปไม่มี Alt และ Image Target ที่เสีย", "Crawler ไม่เข้าใจเจตนาของภาพ"],
      ["Structured data", "JSON-LD syntax และ structural consistency", "ไม่รับประกัน Google Rich Result"]
    ],
    flowTitle: "Crawler เปลี่ยนเว็บไซต์เป็น SEO Evidence อย่างไร",
    flow: [
      ["1", "กำหนด Scope", "ตั้ง Seed URL, Allowed Host, Path Exclusion, URL Ceiling, Depth, Rate และ Raw/Rendered Mode"],
      ["2", "Preview ก่อน Fetch", "Normalize Candidate URL และตรวจว่ารวมอยู่ใน Profile หรือไม่"],
      ["3", "Crawl อย่างสุภาพ", "บังคับ Robots, DNS/IP Guard, TLS, Redirect, Size Limit และ Per-host Delay"],
      ["4", "Extract และ Audit", "แยก Metadata, Link, Image, Hreflang, Structured Data และสร้าง Finding ที่มีหลักฐาน"],
      ["5", "แก้และ Crawl ซ้ำ", "เปรียบเทียบ Added, Removed, Changed, New Issue และ Fixed Issue ระหว่างรอบ"]
    ],
    howTitle: "วิธีติดตั้งและเริ่มใช้ SEO crawler",
    howIntro:
      "รุ่นปัจจุบันเป็น Release Candidate และยังไม่มี Signed Stable Release วิธีที่โปร่งใสที่สุดคือ Clone Repository ตรวจ Source และ Build บนเครื่องของคุณ",
    requirements: "ต้องมี Go ตาม .go-version; Node.js และ pnpm ใช้เมื่อต้อง Build Dashboard หรือ JavaScript Renderer",
    installCode: `git clone ${repositoryUrls.th}.git\ncd -- -Screaming-Frog-Screaming-Toad-SEO-100M-URL\nmake bootstrap\ngo run ./cmd/seo-auditor`,
    howSteps: [
      "เปิด http://127.0.0.1:7331",
      "สร้าง Project สำหรับเว็บไซต์หรือลูกค้า",
      "สร้าง Profile และตั้ง URL Ceiling แบบอนุรักษ์นิยม",
      "Preview Scope และตรวจ Path หรือ Subdomain ที่จะถูก Crawl",
      "เริ่ม Audit แล้วติดตาม Discovered, Queued, Fetched, Analysed และ Failed",
      "เปิด Audit Summary, Issue Explanation และ Page Evidence ก่อนแก้เว็บไซต์",
      "Crawl ซ้ำด้วย Configuration ที่เทียบกันได้เพื่อยืนยันผล"
    ],
    mcpEyebrow: "MCP สำหรับ AI SEO",
    mcpTitle: "ให้ AI Agent ใช้ SEO crawler โดยไม่มอบ Shell ทั้งเครื่อง",
    mcpIntro:
      "MCP Server สื่อสารผ่าน stdio และเรียก Authenticated Loopback API ของ SEO Screaming Toad จึงให้ Agent ทำงาน SEO ได้จริง แต่ไม่เปิด Generic Shell, Arbitrary SQL, Filesystem, Browser หรือ HTTP Fetch ที่ไม่จำกัด",
    mcpDiagram: ["AI Agent / MCP Client", "seo-auditor-mcp (stdio)", "Authenticated Local API", "Guarded Crawler + SQLite Evidence"],
    mcpConfigTitle: "ตัวอย่าง MCP configuration",
    mcpConfig: `{
  "mcpServers": {
    "seo-screaming-toad": {
      "command": "/absolute/path/to/seo-auditor-mcp",
      "env": {
        "SEO_AUDITOR_BIND_HOST": "127.0.0.1",
        "SEO_AUDITOR_BIND_PORT": "7331"
      }
    }
  }
}`,
    mcpGroups: [
      ["Project และ Profile", sharedTools.slice(1, 6)],
      ["Crawl lifecycle", sharedTools.slice(6, 13)],
      ["Audit evidence", sharedTools.slice(13, 20)],
      ["Report และ Diagnostic", sharedTools.slice(20)]
    ],
    agentWorkflowTitle: "Workflow ที่แนะนำสำหรับ AI Agent",
    agentWorkflow: [
      "เรียก health_get เพื่อยืนยันว่า MCP และ Local API พร้อม",
      "อ่าน project_list และ profile_list ก่อนสร้างข้อมูลใหม่",
      "ใช้ crawl_preview_scope แล้วรายงาน URL Ceiling, Exclusion และขอบเขตสำคัญ",
      "เริ่ม crawl_start ด้วย Idempotency Key เมื่อผู้ใช้อนุญาต",
      "Poll crawl_status ทุก 2–5 วินาทีจนถึง Terminal State",
      "อ่าน audit_summary แล้ว Paginate issue_list และ page_list",
      "เปิด issue_explain และ page_get ก่อนแนะนำการแก้",
      "สร้าง report_export เฉพาะเมื่อผู้ใช้ร้องขอ"
    ],
    aiSearchTitle: "AI Search Optimization, AEO, GEO และความพร้อมสำหรับ AI Search",
    aiSearchCopy: [
      "AI Search Optimization คือการทำให้เนื้อหาและ Entity ของเว็บไซต์ Crawl ได้ เข้าใจง่าย ตรวจสอบแหล่งที่มาได้ และตอบคำถามผู้ใช้ได้ชัดเจน ชุมชนอาจใช้คำว่า AEO หรือ GEO ด้วย ส่วนคำว่า ASO โดยทั่วไปหมายถึง App Store Optimization แต่บางคนใช้ ASO ในความหมาย AI Search Optimization เช่นกัน",
      "SEO Screaming Toad ไม่สามารถรับประกันว่า AI Search จะอ้างอิงเว็บไซต์ของคุณ แต่ช่วยตรวจฐานทางเทคนิคที่ทั้ง Search Crawler และระบบ Retrieval ต้องพึ่งพา เช่น Status, Canonical, Indexability, Hreflang, Internal Link, Structured Data, Raw/Rendered Content และความซ้ำของหน้า"
    ],
    aiSearchChecks: [
      ["Crawlability", "หน้าและลิงก์สำคัญค้นพบได้โดยไม่พึ่ง Interaction ที่ซ่อนอยู่"],
      ["Entity clarity", "Title, H1, Canonical, Language และ Structured Data สอดคล้องกับเนื้อหาที่เห็น"],
      ["Retrievable answers", "คำตอบ นิยาม ขั้นตอน ข้อจำกัด และหลักฐานอยู่ใน HTML ที่อ่านได้"],
      ["Multilingual consistency", "Thai/English URL มี Self-canonical และ Reciprocal Hreflang"],
      ["Source confidence", "ผู้เขียน องค์กร Repository License และข้อจำกัดระบุชัด"],
      ["Rendered parity", "ตรวจว่าข้อมูลสำคัญไม่หายหรือเปลี่ยนผิดหลัง JavaScript ทำงาน"]
    ],
    comparisonTitle: "เป็น Screaming Frog alternative ได้หรือไม่?",
    comparisonCopy:
      "SEO Screaming Toad เป็นโปรเจกต์อิสระและใช้คำว่า Screaming Frog เพื่อการเปรียบเทียบเชิงอธิบายเท่านั้น ไม่อ้าง Feature Parity และไม่เกี่ยวข้องกับ Screaming Frog Ltd. จุดเด่นคือ Open Source, Local-first, Evidence Model และ MCP ที่ออกแบบสำหรับ AI Agent หาก Workflow ของคุณพึ่ง Integration หรือฟีเจอร์เฉพาะของ Commercial Crawler ให้ทดสอบทั้งสองเครื่องมือบนเว็บไซต์ตัวอย่างที่ได้รับอนุญาตแล้วเปรียบเทียบ Coverage, False Positive, Rendered Output, Export และต้นทุนการปฏิบัติงาน",
    comparisonHeaders: ["หัวข้อ", "SEO Screaming Toad", "สิ่งที่ควรประเมิน"],
    comparison: [
      ["License", "MIT Open Source", "ทีมสามารถตรวจ Source และปรับแต่งได้"],
      ["Data", "Local SQLite/WAL", "กำหนด Retention และ Backup เอง"],
      ["AI automation", "MCP 23 เครื่องมือ", "ต้องเปิด Local Supervisor ก่อน"],
      ["JavaScript", "Optional isolated renderer", "ตรวจ Raw และ Rendered แยกกัน"],
      ["Maturity", "Release Candidate", "ทดสอบบน Environment และ Workflow จริงก่อนย้ายงาน"]
    ],
    scaleTitle: "100M URL: สถาปัตยกรรมเชิงทฤษฎี ไม่ใช่คำรับรอง",
    scaleCopy:
      "โปรเจกต์ผ่าน Synthetic Production-path Campaign 1 ล้านและ 5 ล้าน URL โดยรอบ 5 ล้านเก็บ Page 5,000,000, Link 4,999,999 และ Finding 15,884,167 รายการใน SQLite ประมาณ 11.1 GB แต่การทดสอบนี้ไม่ใช้ Live Network จึงไม่พิสูจน์ DNS, TLS, Robots, Redirect, Bandwidth, Host Scheduling หรือ JavaScript Rendering ที่ขนาดดังกล่าว สถาปัตยกรรม 100M+ เป็นทิศทางวิจัยแบบ Segmented Campaign เท่านั้น",
    safetyTitle: "ความปลอดภัย ความเป็นส่วนตัว และการใช้อย่างรับผิดชอบ",
    safety: [
      "Crawl เฉพาะเว็บไซต์ที่คุณเป็นเจ้าของหรือได้รับอนุญาต",
      "เริ่มจาก URL Ceiling และ Concurrency ต่ำ แล้วเพิ่มตามความสามารถของ Server",
      "อย่าปิด TLS, Robots, DNS/IP Guard หรือ Redirect Validation เพื่อให้ Crawl ผ่าน",
      "Database และ Report อาจมี URL หรือข้อมูลลูกค้า ต้องกำหนดสิทธิ์และ Retention",
      "MCP ไม่รับ Credential, Arbitrary Header หรือ Private Target ในรุ่นปัจจุบัน",
      "Finding คือหลักฐานให้มนุษย์ตัดสินใจ ไม่ใช่คำสั่งแก้ SEO อัตโนมัติทุกข้อ"
    ],
    faqTitle: "คำถามที่พบบ่อยเกี่ยวกับ SEO crawler และ MCP",
    faqs: [
      ["SEO Screaming Toad ฟรีหรือไม่?", "ฟรีและโอเพนซอร์สภายใต้ MIT License คุณสามารถตรวจ Source, Build และใช้งานในเครื่องได้"],
      ["ใช้แทน Screaming Frog ได้ทุกงานหรือไม่?", "ยังไม่ควรอ้างเช่นนั้น รุ่นปัจจุบันเป็น Release Candidate และไม่อ้าง Feature Parity ควรทดสอบกับ Workflow และเว็บไซต์ตัวอย่างของคุณ"],
      ["MCP ช่วยงาน SEO อย่างไร?", "MCP ให้ AI Agent เริ่มและติดตาม Crawl อ่าน Finding เปิด Page Evidence เปรียบเทียบรอบ และสร้างรายงานผ่านเครื่องมือที่มีขอบเขต"],
      ["Crawler ช่วย AI Search Optimization ได้อย่างไร?", "ช่วยตรวจ Crawlability, Canonical, Language, Structured Data, Internal Link และ Raw/Rendered Content ซึ่งเป็นฐานสำหรับ Search และ Retrieval แต่ไม่รับประกันการถูกอ้างอิง"],
      ["ข้อมูลเว็บไซต์ถูกส่งไป Cloud หรือไม่?", "Crawler และ SQLite ทำงานในเครื่องโดยค่าเริ่มต้น แต่ผู้ใช้ต้องตรวจ Environment, Renderer และ Workflow การ Export ของตนเอง"],
      ["รองรับการ Crawl 100 ล้าน URL แล้วหรือยัง?", "ยัง 100M+ เป็นเป้าหมายเชิงสถาปัตยกรรมที่ไม่ผ่าน Live-network Benchmark หลักฐานปัจจุบันคือ Synthetic Campaign สูงสุด 5 ล้าน URL หนึ่งรอบ"],
      ["ต้องใช้ JavaScript Renderer ทุกครั้งหรือไม่?", "ไม่ Raw Mode เร็วกว่าและควรเป็น Baseline ใช้ Rendered Mode เมื่อเว็บไซต์พึ่ง JavaScript และต้องการเปรียบเทียบสิ่งที่เปลี่ยนหลัง Render"],
      ["เริ่ม Audit อย่างปลอดภัยควรทำอย่างไร?", "ยืนยันสิทธิ์ ตั้ง Scope และ Budget แบบอนุรักษ์นิยม Preview URL ก่อนเริ่ม แล้วตรวจ Terminal Reason และ Evidence ก่อนแก้เว็บไซต์"]
    ],
    finalTitle: "เริ่มใช้ Open SEO Tool ที่ AI Agent เข้าใจได้",
    finalCopy:
      "เปิด Repository ภาษาไทย อ่านข้อจำกัด ตรวจ Source และเริ่มจาก Crawl ขนาดเล็กบนเว็บไซต์ที่คุณได้รับอนุญาต จากนั้นใช้ Evidence และ Crawl Comparison เพื่อแก้ Technical SEO อย่างตรวจสอบได้",
    finalPrimary: "เปิด Source Code ภาษาไทย",
    finalSecondary: "ดูเครื่องมือฟรีทั้งหมด",
    legal:
      "SEO Screaming Toad เป็นโปรเจกต์อิสระ ไม่เกี่ยวข้องหรือได้รับการรับรองจาก Screaming Frog Ltd. Screaming Frog เป็นเครื่องหมายหรือชื่อทางการค้าของเจ้าของที่เกี่ยวข้อง"
  },
  en: {
    locale: "en",
    repository: repositoryUrls.en,
    repositoryLabel: "Open the English repository",
    secondaryCta: "Read the installation guide",
    languageLabel: "ไทย",
    eyebrow: "OPEN-SOURCE SEO CRAWLER + MCP FOR AI AGENTS",
    h1: "SEO Screaming Toad: an open-source SEO crawler built for AI workflows",
    lead:
      "Audit technical SEO, JavaScript SEO, canonicals, hreflang, sitemaps, structured data, and internal links with local evidence—then give AI agents 23 bounded MCP tools to inspect and compare real crawl results.",
    note:
      "Free under the MIT License · Local-first data · Current release candidate · Not affiliated with or endorsed by Screaming Frog Ltd.",
    nav: [
      ["Overview", "#overview"],
      ["Features", "#features"],
      ["How to use", "#how-to-use"],
      ["MCP", "#mcp"],
      ["AI search", "#ai-search"],
      ["FAQ", "#faq"]
    ],
    proof: [
      ["23", "MCP tools for AI agents"],
      ["13", "versioned technical SEO families"],
      ["Raw + rendered", "separate HTML and JavaScript evidence"],
      ["Local-first", "SQLite/WAL on your machine"]
    ],
    overviewTitle: "What is SEO Screaming Toad?",
    overviewCopy: [
      "SEO Screaming Toad, also called DJAI Toad, is an open-source SEO crawler and website audit tool for sites you own or are authorized to test. It discovers pages and resources, audits technical SEO signals, and stores URL inventory, page evidence, link relationships, and findings in SQLite for review, comparison, and export.",
      "Its defining feature is a purpose-built MCP server for AI agents. Instead of giving an agent an unrestricted shell or HTTP client, Toad exposes bounded tools for profiles, scope previews, crawl control, issues, page evidence, comparisons, and managed reports."
    ],
    audienceTitle: "Who it is for",
    audiences: [
      ["Web developers", "Catch canonical, metadata, hreflang, sitemap, and JavaScript SEO problems before release."],
      ["Technical SEOs", "Run audits with rule IDs, evidence, limitations, and recrawl comparisons."],
      ["Content and growth teams", "Find duplicate metadata, deep pages, broken targets, and internal-link opportunities."],
      ["AI-agent builders", "Connect the crawler to Codex, Claude, or another stdio-compatible MCP client."],
      ["Agencies and businesses", "Keep crawl databases and exports local instead of uploading client data to a hosted crawler."],
      ["SEO learners", "Inspect real evidence and rule explanations to understand why each finding exists."]
    ],
    featuresEyebrow: "CORE CAPABILITIES",
    featuresTitle: "From crawl discovery to evidence you can act on",
    featuresIntro:
      "This is more than a list of warnings. The workflow connects guarded URL discovery, extraction, versioned rules, stored evidence, and a comparable recrawl after changes.",
    features: [
      ["Guarded crawler", "Concurrent Go crawling with robots.txt, sitemap discovery, URL normalization, deduplication, TLS, redirect validation, and per-host politeness."],
      ["Raw + JavaScript audits", "Keep server HTML separate from optional Playwright-rendered evidence so client-side changes remain visible."],
      ["Evidence-backed findings", "Each finding retains a rule ID, version, severity, subject, evidence, remediation, and explicit limitation."],
      ["Canonical and indexability", "Check missing, conflicting, invalid, chained, failed, and noindex canonical targets plus robots directives."],
      ["International SEO", "Check hreflang codes, reachable targets, and reciprocal language relationships."],
      ["Content and metadata", "Inspect titles, descriptions, H1s, exact duplicates, near-duplicate signals, and configurable length thresholds."],
      ["Link architecture", "Review inlinks, outlinks, crawl depth, broken internal targets, nofollow observations, and orphan-like pages."],
      ["Structured data", "Detect JSON-LD syntax and basic structural problems while disclosing vocabulary and rich-result limitations."],
      ["Recoverable campaigns", "Pause, resume, cancel, timeline, durable frontier, checkpoints, and recovery for longer-running work."],
      ["Reports and comparison", "Export CSV, NDJSON, or XLSX and compare added, removed, changed, new, and fixed results."],
      ["Agent-ready interface", "Operate the same stored evidence through the dashboard, JSON CLI, local API, or 23-tool MCP server."],
      ["Actually open source", "The crawler, dashboard, CLI, local API, reports, and MCP server are available under the MIT License."]
    ],
    coverageTitle: "Important SEO audit coverage",
    coverageIntro:
      "The current engine has 13 versioned audit families. Findings are technical observations, not guarantees of indexing or rankings.",
    coverageHeaders: ["Area", "What it checks", "What to remember"],
    coverage: [
      ["Responses", "Failed pages, redirects, and broken internal targets", "Failures can be temporary"],
      ["Metadata", "Missing, short, long, or duplicate titles and descriptions", "Length thresholds are editorial guidance"],
      ["Canonicals", "Missing, conflicting, invalid, chained, failed, or noindex targets", "Canonicals are hints"],
      ["Indexability", "Non-200, noindex, robots, and sitemap coverage", "Search engines apply other policies"],
      ["International", "Hreflang codes, targets, and reciprocity", "Market intent needs human review"],
      ["Architecture", "Depth, inlinks, outlinks, nofollow, and orphan-like pages", "Some utility pages are intentionally isolated"],
      ["Media", "Missing image alt attributes and failing image resources", "A crawler cannot infer visual intent"],
      ["Structured data", "JSON-LD syntax and structural consistency", "It does not guarantee a Google rich result"]
    ],
    flowTitle: "How the crawler turns a site into SEO evidence",
    flow: [
      ["1", "Define scope", "Set seed URLs, allowed hosts, exclusions, URL ceiling, depth, rate, and raw or rendered mode."],
      ["2", "Preview before fetching", "Normalize candidate URLs and explain whether the stored profile includes them."],
      ["3", "Crawl politely", "Enforce robots, DNS/IP guards, TLS, redirects, response limits, and per-host delay."],
      ["4", "Extract and audit", "Store metadata, links, images, hreflang, structured data, and versioned findings."],
      ["5", "Fix and recrawl", "Compare added, removed, changed, new-issue, and fixed-issue results between runs."]
    ],
    howTitle: "How to install and use the SEO crawler",
    howIntro:
      "The project is currently a release candidate and does not yet publish a signed stable release. The most transparent route is to clone the repository, inspect the source, and build locally.",
    requirements: "Use the Go version in .go-version. Node.js and pnpm are needed to build the dashboard or optional JavaScript renderer.",
    installCode: `git clone ${repositoryUrls.en}.git\ncd Free-Opensource-SEO-Screaming-Toad-not-Frog-tool-with-100million-url-crawl-potential\nmake bootstrap\ngo run ./cmd/seo-auditor`,
    howSteps: [
      "Open http://127.0.0.1:7331.",
      "Create a project for the site or client.",
      "Create a profile with a conservative URL ceiling.",
      "Preview scope and verify included paths and subdomains.",
      "Start the audit and monitor discovered, queued, fetched, analysed, and failed counts.",
      "Read the summary, issue explanations, and page evidence before changing the site.",
      "Recrawl with a comparable configuration to verify the outcome."
    ],
    mcpEyebrow: "MCP FOR AI SEO",
    mcpTitle: "Give an AI agent an SEO crawler—not your whole shell",
    mcpIntro:
      "The MCP server communicates over stdio and calls Toad's authenticated loopback API. Agents can operate real SEO workflows without receiving a generic shell, arbitrary SQL, filesystem access, a browser primitive, or unrestricted HTTP fetching.",
    mcpDiagram: ["AI agent / MCP client", "seo-auditor-mcp (stdio)", "Authenticated local API", "Guarded crawler + SQLite evidence"],
    mcpConfigTitle: "Example MCP configuration",
    mcpConfig: `{
  "mcpServers": {
    "seo-screaming-toad": {
      "command": "/absolute/path/to/seo-auditor-mcp",
      "env": {
        "SEO_AUDITOR_BIND_HOST": "127.0.0.1",
        "SEO_AUDITOR_BIND_PORT": "7331"
      }
    }
  }
}`,
    mcpGroups: [
      ["Projects and profiles", sharedTools.slice(1, 6)],
      ["Crawl lifecycle", sharedTools.slice(6, 13)],
      ["Audit evidence", sharedTools.slice(13, 20)],
      ["Reports and diagnostics", sharedTools.slice(20)]
    ],
    agentWorkflowTitle: "Recommended AI-agent workflow",
    agentWorkflow: [
      "Call health_get to verify MCP and API readiness.",
      "Read project_list and profile_list before creating state.",
      "Use crawl_preview_scope and disclose limits and exclusions.",
      "Call crawl_start with an idempotency key after operator intent is clear.",
      "Poll crawl_status every two to five seconds until a terminal state.",
      "Read audit_summary, then paginate issue_list and page_list.",
      "Use issue_explain and page_get before recommending a fix.",
      "Create report_export only when requested."
    ],
    aiSearchTitle: "AI Search Optimization, AEO, GEO, and AI-search readiness",
    aiSearchCopy: [
      "AI Search Optimization aims to make content and entities crawlable, understandable, attributable, and useful for answer-oriented retrieval. Related labels include AEO and GEO. ASO normally means App Store Optimization, although some people also use it for AI Search Optimization.",
      "SEO Screaming Toad cannot guarantee an AI citation. It can audit the technical foundation used by search crawlers and retrieval systems: response status, canonicals, indexability, language relationships, internal links, structured data, raw and rendered content, and duplicate signals."
    ],
    aiSearchChecks: [
      ["Crawlability", "Important pages and links are discoverable without hidden interaction."],
      ["Entity clarity", "Titles, H1s, canonicals, language, and structured data align with visible content."],
      ["Retrievable answers", "Definitions, steps, limits, and evidence appear in readable HTML."],
      ["Multilingual consistency", "Thai and English URLs use self-canonicals and reciprocal hreflang."],
      ["Source confidence", "Authors, organizations, repositories, licensing, and limitations are explicit."],
      ["Rendered parity", "Critical information does not disappear or mutate incorrectly after JavaScript runs."]
    ],
    comparisonTitle: "Is it a Screaming Frog alternative?",
    comparisonCopy:
      "SEO Screaming Toad is independent and uses 'Screaming Frog' only for descriptive comparison. It does not claim feature parity and is not affiliated with Screaming Frog Ltd. Its differentiators are open code, local evidence, a versioned finding model, and a first-class MCP interface. If you rely on mature commercial integrations, test both tools on a representative authorized site and compare coverage, false positives, rendered output, exports, and operational cost.",
    comparisonHeaders: ["Area", "SEO Screaming Toad", "What to evaluate"],
    comparison: [
      ["License", "MIT open source", "Your team can inspect and adapt the source"],
      ["Data", "Local SQLite/WAL", "You own retention and backup"],
      ["AI automation", "23 bounded MCP tools", "The local supervisor must be running"],
      ["JavaScript", "Optional isolated renderer", "Raw and rendered evidence stay separate"],
      ["Maturity", "Release candidate", "Validate your real environment before migration"]
    ],
    scaleTitle: "100M URLs: theoretical architecture, not a capacity promise",
    scaleCopy:
      "The project has completed synthetic production-path campaigns at one million and five million URLs. The 5M run retained 5,000,000 pages, 4,999,999 links, and 15,884,167 findings in about 11.1 GB of SQLite storage. It did not use live networking, so it does not prove DNS, TLS, robots, redirects, bandwidth, host scheduling, or JavaScript rendering at that scale. The 100M+ design remains a segmented-campaign research direction.",
    safetyTitle: "Security, privacy, and responsible use",
    safety: [
      "Crawl only sites you own or are authorized to test.",
      "Start with low URL and concurrency limits, then increase them with server capacity.",
      "Do not disable TLS, robots, DNS/IP guards, or redirect validation to force a crawl through.",
      "Databases and exports may contain client URLs or evidence; protect them with access and retention policies.",
      "The current MCP does not accept credentials, arbitrary headers, or private-network targets.",
      "Treat findings as evidence for human decisions, not instructions to auto-fix every warning."
    ],
    faqTitle: "Frequently asked questions about the SEO crawler and MCP",
    faqs: [
      ["Is SEO Screaming Toad free?", "Yes. The source is available under the MIT License and can be inspected, built, and run locally."],
      ["Can it replace Screaming Frog for every workflow?", "That is not the claim. Toad is a release candidate and does not claim feature parity. Validate it against your sites and workflow."],
      ["How does MCP help SEO work?", "MCP lets an agent start and monitor crawls, read findings, inspect page evidence, compare runs, and create reports through bounded tools."],
      ["Can a crawler improve AI Search Optimization?", "It can audit crawlability, canonicals, language, structured data, links, and raw/rendered content—the technical foundation for retrieval—but cannot guarantee citations."],
      ["Does crawl data go to the cloud?", "The crawler and SQLite database are local by default. Operators must still review their renderer, environment, and export workflow."],
      ["Can it crawl 100 million URLs today?", "100M+ is an unverified architectural target. Current evidence is one synthetic production-path campaign at five million URLs."],
      ["Do I always need JavaScript rendering?", "No. Raw mode is the faster baseline. Use rendered mode when client-side JavaScript changes important SEO evidence."],
      ["How should I start safely?", "Confirm authorization, choose conservative scope and budgets, preview URLs, then inspect terminal reasons and evidence before making changes."]
    ],
    finalTitle: "Start with an open SEO tool an AI agent can understand",
    finalCopy:
      "Open the English repository, read the limitations, inspect the source, and begin with a small authorized crawl. Use stored evidence and comparable recrawls to improve technical SEO without guessing.",
    finalPrimary: "Open the English source code",
    finalSecondary: "Browse all free DJAI tools",
    legal:
      "SEO Screaming Toad is an independent project. It is not affiliated with or endorsed by Screaming Frog Ltd. Screaming Frog is a trademark or trade name of its respective owner."
  }
};

content.vi = {
  locale: "vi",
  repository: repositoryUrls.vi,
  repositoryLabel: "Mở kho mã nguồn",
  secondaryCta: "Đọc hướng dẫn cài đặt",
  languageLabel: "English",
  eyebrow: "SEO CRAWLER MÃ NGUỒN MỞ + MCP CHO AI AGENT",
  h1: "SEO Screaming Toad: trình thu thập SEO mã nguồn mở cho quy trình AI",
  lead:
    "Kiểm tra SEO kỹ thuật, JavaScript SEO, canonical, hreflang, sitemap, structured data và liên kết nội bộ bằng bằng chứng lưu trên máy; sau đó dùng 23 công cụ MCP có giới hạn để AI agent đọc và so sánh kết quả crawl thật.",
  note:
    "Miễn phí theo giấy phép MIT · Dữ liệu ưu tiên lưu cục bộ · Phiên bản hiện tại là release candidate · Không liên kết hoặc được Screaming Frog Ltd. chứng thực.",
  nav: [["Tổng quan", "#overview"], ["Tính năng", "#features"], ["Cách dùng", "#how-to-use"], ["MCP", "#mcp"], ["AI Search", "#ai-search"], ["Câu hỏi", "#faq"]],
  proof: [["23", "công cụ MCP cho AI agent"], ["13", "nhóm quy tắc SEO có phiên bản"], ["Raw + rendered", "tách bằng chứng HTML và JavaScript"], ["Local-first", "SQLite/WAL trên máy của bạn"]],
  overviewTitle: "SEO Screaming Toad là gì?",
  overviewCopy: [
    "SEO Screaming Toad, còn gọi là DJAI Toad, là SEO crawler và công cụ kiểm tra website mã nguồn mở dành cho những website bạn sở hữu hoặc được phép kiểm tra. Công cụ khám phá trang và tài nguyên, kiểm tra tín hiệu SEO kỹ thuật, rồi lưu danh sách URL, bằng chứng từng trang, quan hệ liên kết và phát hiện vào SQLite để xem lại, so sánh và xuất báo cáo.",
    "Điểm khác biệt chính là MCP server được thiết kế riêng cho AI agent. Thay vì cấp shell hoặc HTTP client không giới hạn, Toad cung cấp các công cụ có phạm vi rõ ràng để quản lý profile, xem trước phạm vi crawl, điều khiển tác vụ, đọc lỗi và bằng chứng trang, so sánh các lần chạy và tạo báo cáo."
  ],
  audienceTitle: "Phù hợp với ai",
  audiences: [
    ["Lập trình viên web", "Phát hiện lỗi canonical, metadata, hreflang, sitemap và JavaScript SEO trước khi phát hành."],
    ["Chuyên viên SEO kỹ thuật", "Kiểm tra với mã quy tắc, bằng chứng, giới hạn và phép so sánh sau khi crawl lại."],
    ["Nhóm nội dung và tăng trưởng", "Tìm metadata trùng lặp, trang nằm sâu, đích liên kết hỏng và cơ hội liên kết nội bộ."],
    ["Người xây AI agent", "Kết nối crawler với Codex, Claude hoặc MCP client hỗ trợ stdio."],
    ["Agency và doanh nghiệp", "Giữ cơ sở dữ liệu crawl và file xuất trên máy thay vì tải dữ liệu khách hàng lên dịch vụ bên ngoài."],
    ["Người học SEO", "Đọc bằng chứng thật và giải thích quy tắc để hiểu vì sao mỗi phát hiện xuất hiện."]
  ],
  featuresEyebrow: "NĂNG LỰC CỐT LÕI",
  featuresTitle: "Từ khám phá URL đến bằng chứng có thể hành động",
  featuresIntro: "Đây không chỉ là danh sách cảnh báo. Quy trình nối việc khám phá URL có kiểm soát, trích xuất dữ liệu, quy tắc có phiên bản, bằng chứng được lưu và lần crawl đối chiếu sau khi sửa.",
  features: [
    ["Crawler có lớp bảo vệ", "Crawl đồng thời bằng Go với robots.txt, khám phá sitemap, chuẩn hóa URL, loại trùng, TLS, kiểm tra redirect và giới hạn tốc độ theo host."],
    ["Kiểm tra raw + JavaScript", "Giữ HTML từ server tách khỏi bằng chứng render bằng Playwright để thấy rõ thay đổi phía client."],
    ["Phát hiện kèm bằng chứng", "Mỗi phát hiện lưu mã và phiên bản quy tắc, mức độ, đối tượng, bằng chứng, cách khắc phục và giới hạn."],
    ["Canonical và indexability", "Kiểm tra canonical thiếu, xung đột, sai, tạo chuỗi, trỏ tới trang lỗi hoặc noindex cùng các chỉ thị robots."],
    ["SEO đa ngôn ngữ", "Kiểm tra mã hreflang, khả năng truy cập đích và quan hệ ngôn ngữ hai chiều."],
    ["Nội dung và metadata", "Kiểm tra title, description, H1, nội dung trùng hoàn toàn, tín hiệu gần trùng và ngưỡng độ dài tùy chỉnh."],
    ["Kiến trúc liên kết", "Xem inlink, outlink, độ sâu crawl, đích nội bộ hỏng, nofollow và các trang có dấu hiệu bị cô lập."],
    ["Structured data", "Phát hiện lỗi cú pháp JSON-LD và cấu trúc cơ bản, đồng thời nêu rõ giới hạn về từ vựng và rich result."],
    ["Tác vụ có thể phục hồi", "Tạm dừng, tiếp tục, hủy, timeline, hàng đợi bền vững, checkpoint và phục hồi cho lượt crawl dài."],
    ["Báo cáo và so sánh", "Xuất CSV, NDJSON hoặc XLSX và so sánh trang thêm, xóa, thay đổi, lỗi mới và lỗi đã sửa."],
    ["Giao diện sẵn cho agent", "Dùng cùng một kho bằng chứng qua dashboard, JSON CLI, API cục bộ hoặc MCP server 23 công cụ."],
    ["Mã nguồn mở thực sự", "Crawler, dashboard, CLI, API cục bộ, báo cáo và MCP server đều phát hành theo giấy phép MIT."]
  ],
  coverageTitle: "Phạm vi kiểm tra SEO quan trọng",
  coverageIntro: "Engine hiện có 13 nhóm kiểm tra có phiên bản. Kết quả là quan sát kỹ thuật, không phải cam kết được index hoặc xếp hạng.",
  coverageHeaders: ["Khu vực", "Nội dung kiểm tra", "Điều cần nhớ"],
  coverage: [
    ["Phản hồi", "Trang lỗi, redirect và đích liên kết nội bộ hỏng", "Lỗi có thể chỉ xảy ra tạm thời"],
    ["Metadata", "Title và description thiếu, ngắn, dài hoặc trùng", "Ngưỡng độ dài chỉ là hướng dẫn biên tập"],
    ["Canonical", "Đích thiếu, xung đột, sai, tạo chuỗi, lỗi hoặc noindex", "Canonical là một tín hiệu gợi ý"],
    ["Indexability", "Non-200, noindex, robots và độ phủ sitemap", "Công cụ tìm kiếm còn áp dụng chính sách khác"],
    ["Đa ngôn ngữ", "Mã, đích và tính đối ứng của hreflang", "Ý định thị trường cần con người đánh giá"],
    ["Kiến trúc", "Độ sâu, inlink, outlink, nofollow và trang có dấu hiệu bị cô lập", "Một số trang tiện ích được tách riêng có chủ đích"],
    ["Media", "Ảnh thiếu alt và tài nguyên ảnh lỗi", "Crawler không thể suy ra ý nghĩa hình ảnh"],
    ["Structured data", "Cú pháp JSON-LD và tính nhất quán cấu trúc", "Không bảo đảm Google rich result"]
  ],
  flowTitle: "Crawler biến website thành bằng chứng SEO như thế nào",
  flow: [["1", "Xác định phạm vi", "Đặt URL đầu vào, host được phép, đường dẫn loại trừ, giới hạn URL, độ sâu, tốc độ và chế độ raw hoặc rendered."], ["2", "Xem trước khi tải", "Chuẩn hóa URL ứng viên và giải thích profile hiện tại có bao gồm URL đó hay không."], ["3", "Crawl có trách nhiệm", "Tuân thủ robots, lớp bảo vệ DNS/IP, TLS, redirect, giới hạn phản hồi và độ trễ theo host."], ["4", "Trích xuất và kiểm tra", "Lưu metadata, liên kết, ảnh, hreflang, structured data và phát hiện có phiên bản."], ["5", "Sửa rồi crawl lại", "So sánh kết quả thêm, xóa, thay đổi, lỗi mới và lỗi đã sửa giữa các lần chạy."]],
  howTitle: "Cách cài đặt và sử dụng SEO crawler",
  howIntro: "Dự án hiện là release candidate và chưa có bản stable được ký. Cách minh bạch nhất là clone repository, đọc mã nguồn và build trên máy.",
  requirements: "Dùng phiên bản Go ghi trong .go-version. Cần Node.js và pnpm nếu muốn build dashboard hoặc JavaScript renderer tùy chọn.",
  installCode: `git clone ${repositoryUrls.vi}.git\ncd Free-Opensource-SEO-Screaming-Toad-not-Frog-tool-with-100million-url-crawl-potential\nmake bootstrap\ngo run ./cmd/seo-auditor`,
  howSteps: ["Mở http://127.0.0.1:7331.", "Tạo project cho website hoặc khách hàng.", "Tạo profile với giới hạn URL thận trọng.", "Xem trước phạm vi và xác nhận đường dẫn cùng subdomain được đưa vào.", "Bắt đầu kiểm tra và theo dõi số URL discovered, queued, fetched, analysed và failed.", "Đọc tổng kết, giải thích lỗi và bằng chứng từng trang trước khi sửa website.", "Crawl lại bằng cấu hình tương đương để xác nhận kết quả."],
  mcpEyebrow: "MCP CHO AI SEO",
  mcpTitle: "Cấp cho AI agent một SEO crawler, không phải toàn bộ shell",
  mcpIntro: "MCP server giao tiếp qua stdio và gọi loopback API có xác thực của Toad. Agent có thể thực hiện quy trình SEO thật mà không được cấp shell tổng quát, SQL tùy ý, filesystem, trình duyệt hoặc quyền tải HTTP không giới hạn.",
  mcpDiagram: ["AI agent / MCP client", "seo-auditor-mcp (stdio)", "API cục bộ có xác thực", "Crawler có bảo vệ + bằng chứng SQLite"],
  mcpConfigTitle: "Ví dụ cấu hình MCP",
  mcpConfig: content.en.mcpConfig,
  mcpGroups: [["Project và profile", sharedTools.slice(1, 6)], ["Vòng đời crawl", sharedTools.slice(6, 13)], ["Bằng chứng kiểm tra", sharedTools.slice(13, 20)], ["Báo cáo và chẩn đoán", sharedTools.slice(20)]],
  agentWorkflowTitle: "Quy trình đề xuất cho AI agent",
  agentWorkflow: ["Gọi health_get để xác nhận MCP và API đã sẵn sàng.", "Đọc project_list và profile_list trước khi tạo dữ liệu mới.", "Dùng crawl_preview_scope và trình bày rõ giới hạn cùng phần loại trừ.", "Gọi crawl_start với idempotency key sau khi ý định của người vận hành đã rõ.", "Kiểm tra crawl_status mỗi hai đến năm giây cho đến trạng thái kết thúc.", "Đọc audit_summary, sau đó phân trang issue_list và page_list.", "Dùng issue_explain và page_get trước khi đề xuất cách sửa.", "Chỉ tạo report_export khi được yêu cầu."],
  aiSearchTitle: "AI Search Optimization, AEO, GEO và mức sẵn sàng cho AI Search",
  aiSearchCopy: ["AI Search Optimization hướng tới việc làm cho nội dung và thực thể dễ crawl, dễ hiểu, có nguồn rõ ràng và hữu ích cho hệ thống truy xuất câu trả lời. Các tên gọi liên quan gồm AEO và GEO. ASO thường có nghĩa là App Store Optimization, dù đôi khi cũng được dùng cho AI Search Optimization.", "SEO Screaming Toad không thể bảo đảm website được AI trích dẫn. Công cụ có thể kiểm tra nền tảng kỹ thuật mà crawler và hệ thống truy xuất dựa vào: trạng thái phản hồi, canonical, indexability, quan hệ ngôn ngữ, liên kết nội bộ, structured data, nội dung raw/rendered và tín hiệu trùng lặp."],
  aiSearchChecks: [["Khả năng crawl", "Trang và liên kết quan trọng có thể được khám phá mà không cần tương tác ẩn."], ["Thực thể rõ ràng", "Title, H1, canonical, ngôn ngữ và structured data phù hợp với nội dung hiển thị."], ["Câu trả lời có thể truy xuất", "Định nghĩa, bước làm, giới hạn và bằng chứng xuất hiện trong HTML đọc được."], ["Nhất quán đa ngôn ngữ", "URL tiếng Thái, Anh và Việt dùng self-canonical cùng hreflang đối ứng."], ["Độ tin cậy nguồn", "Tác giả, tổ chức, repository, giấy phép và giới hạn được nêu rõ."], ["Tương đồng sau render", "Thông tin quan trọng không biến mất hoặc thay đổi sai sau khi JavaScript chạy."]],
  comparisonTitle: "Có thể thay thế Screaming Frog không?",
  comparisonCopy: "SEO Screaming Toad là dự án độc lập và chỉ dùng tên 'Screaming Frog' để so sánh mô tả. Dự án không tuyên bố ngang bằng tính năng và không liên kết với Screaming Frog Ltd. Điểm khác biệt là mã mở, bằng chứng cục bộ, mô hình phát hiện có phiên bản và giao diện MCP được ưu tiên. Nếu phụ thuộc vào tích hợp thương mại trưởng thành, hãy thử cả hai công cụ trên một website đại diện mà bạn được phép kiểm tra rồi so sánh độ phủ, false positive, kết quả render, file xuất và chi phí vận hành.",
  comparisonHeaders: ["Khu vực", "SEO Screaming Toad", "Điều cần đánh giá"],
  comparison: [["Giấy phép", "Mã nguồn mở MIT", "Nhóm của bạn có thể đọc và điều chỉnh mã"], ["Dữ liệu", "SQLite/WAL cục bộ", "Bạn tự quản thời hạn lưu và sao lưu"], ["Tự động hóa AI", "23 công cụ MCP có giới hạn", "Supervisor cục bộ phải đang chạy"], ["JavaScript", "Renderer cô lập tùy chọn", "Bằng chứng raw và rendered được tách riêng"], ["Độ trưởng thành", "Release candidate", "Xác minh trên môi trường thật trước khi chuyển quy trình"]],
  scaleTitle: "100 triệu URL: kiến trúc lý thuyết, không phải cam kết công suất",
  scaleCopy: "Dự án đã hoàn thành các chiến dịch tổng hợp theo đường chạy production ở mức một triệu và năm triệu URL. Lần chạy 5 triệu lưu 5.000.000 trang, 4.999.999 liên kết và 15.884.167 phát hiện trong khoảng 11,1 GB SQLite. Thử nghiệm không dùng mạng thật nên không chứng minh DNS, TLS, robots, redirect, băng thông, lập lịch host hoặc JavaScript rendering ở quy mô đó. Thiết kế 100M+ vẫn là hướng nghiên cứu theo chiến dịch phân đoạn.",
  safetyTitle: "Bảo mật, quyền riêng tư và cách dùng có trách nhiệm",
  safety: ["Chỉ crawl website bạn sở hữu hoặc được phép kiểm tra.", "Bắt đầu với giới hạn URL và mức đồng thời thấp, sau đó tăng theo năng lực server.", "Không tắt TLS, robots, lớp bảo vệ DNS/IP hoặc kiểm tra redirect để ép crawler chạy qua.", "Cơ sở dữ liệu và file xuất có thể chứa URL hoặc bằng chứng của khách hàng; hãy bảo vệ bằng chính sách truy cập và lưu giữ.", "MCP hiện tại không nhận thông tin đăng nhập, header tùy ý hoặc đích mạng riêng.", "Dùng phát hiện làm bằng chứng cho quyết định của con người, không tự động sửa mọi cảnh báo."],
  faqTitle: "Câu hỏi thường gặp về SEO crawler và MCP",
  faqs: [["SEO Screaming Toad có miễn phí không?", "Có. Mã nguồn phát hành theo giấy phép MIT và có thể được đọc, build và chạy cục bộ."], ["Công cụ có thay Screaming Frog cho mọi quy trình không?", "Không có tuyên bố đó. Toad đang ở giai đoạn release candidate và không tuyên bố ngang bằng tính năng. Hãy kiểm tra với website và quy trình của bạn."], ["MCP hỗ trợ công việc SEO như thế nào?", "MCP cho phép agent bắt đầu và theo dõi crawl, đọc phát hiện, xem bằng chứng trang, so sánh lần chạy và tạo báo cáo qua các công cụ có giới hạn."], ["Crawler có thể cải thiện AI Search Optimization không?", "Công cụ có thể kiểm tra khả năng crawl, canonical, ngôn ngữ, structured data, liên kết và nội dung raw/rendered, nhưng không thể bảo đảm được trích dẫn."], ["Dữ liệu crawl có được gửi lên cloud không?", "Crawler và cơ sở dữ liệu SQLite mặc định nằm cục bộ. Người vận hành vẫn cần xem lại renderer, môi trường và quy trình xuất dữ liệu."], ["Hiện tại có thể crawl 100 triệu URL không?", "100M+ là mục tiêu kiến trúc chưa được xác minh. Bằng chứng hiện tại là một chiến dịch tổng hợp theo đường chạy production ở mức năm triệu URL."], ["Có luôn cần JavaScript rendering không?", "Không. Raw mode là đường cơ sở nhanh hơn. Dùng rendered mode khi JavaScript phía client thay đổi bằng chứng SEO quan trọng."], ["Nên bắt đầu an toàn thế nào?", "Xác nhận quyền kiểm tra, đặt phạm vi và ngân sách thận trọng, xem trước URL, rồi đọc trạng thái kết thúc và bằng chứng trước khi thay đổi."]],
  finalTitle: "Bắt đầu với công cụ SEO mở mà AI agent có thể hiểu",
  finalCopy: "Mở repository, đọc các giới hạn, xem mã nguồn và bắt đầu bằng một lượt crawl nhỏ trên website được phép. Dùng bằng chứng đã lưu cùng những lần crawl có thể so sánh để cải thiện SEO kỹ thuật mà không phải đoán.",
  finalPrimary: "Mở mã nguồn",
  finalSecondary: "Xem tất cả công cụ DJAI miễn phí",
  legal: "SEO Screaming Toad là dự án độc lập. Dự án không liên kết hoặc được Screaming Frog Ltd. chứng thực. Screaming Frog là nhãn hiệu hoặc tên thương mại của chủ sở hữu tương ứng."
};

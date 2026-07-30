const basePromoData = {
  contactUrl: "https://dev.djai.academy/contact-us/",
  voucher: {
    storageKey: "djai-web-voucher-v1",
    durationMs: 4 * 60 * 60 * 1000,
    title: "Spin to reveal your guaranteed welcome voucher",
    intro: "Every new visitor receives a 10,000 THB web-development voucher in this welcome spin.",
    spin: "Spin the wheel",
    skip: "View packages first",
    disclosure:
      "This welcome spin always awards the 10,000 THB voucher. Other wheel labels preview campaign rewards and are not available in this welcome spin.",
    winnerEyebrow: "Congratulations!",
    winnerTitle: "You unlocked a 10,000 THB voucher",
    winnerCopy: "Reserve it within 4 hours so the DJAI team can apply it to your project quote.",
    lock: "Lock in this deal",
    later: "Later",
    reopen: "Open ฿10,000 voucher",
    formTitle: "Reserve your voucher",
    formCopy: "Enter your email and we will save your interest for a DJAI web-development follow-up.",
    emailLabel: "Email address",
    emailPlaceholder: "you@example.com",
    consent:
      "I agree that DJAI Academy may contact me about this website offer. I can ask to be removed at any time.",
    submit: "Reserve my voucher",
    submitting: "Saving…",
    successTitle: "Your voucher is reserved",
    successCopy: "Thank you. Your email is now in the DJAI lead dashboard for follow-up.",
    error: "We could not save your email. Please try again.",
    expired: "Voucher reservation window expired",
    terms:
      "Full 10,000 THB value applies to the 20,000 THB Complete Website package. For other packages, the discount is capped at 50% of the standard package price. One voucher per customer; final scope is confirmed by DJAI.",
    prizes: ["10,000\nTHB", "5,000\nTHB", "2,500\nTHB", "Free\neBooks", "Better luck\nnext time", "100,000\nTHB"],
  },
  ui: {
    skipToPackages: "Skip to packages",
    languageLabel: "Language",
    countdownLabels: {
      days: "Days",
      hours: "Hours",
      minutes: "Minutes",
      seconds: "Seconds",
    },
    includesTitle: "Every Package Includes These For Free",
    includesSubtitle: "No hidden fees. No surprises. Just everything you need to go live.",
    leadSummaryTitle: "Project Request Summary",
    leadPackageInterest: "Package interest",
    leadBusinessType: "Business type",
    leadContact: "Contact",
    leadPackageDefault: "Landing Page",
    leadBusinessDefault: "Cafe or local service",
    leadContactDefault: "Waiting for customer details",
    leadSubmit: "Submit Request",
    leadEdit: "Edit Details",
    voiceCardTitle: "DJAI Voice Sales Agent",
    voiceReady: "Ready to talk",
    voiceState: "Ask about your website, AI, software, automation, or course plan.",
    voiceStart: "Start voice call",
    voiceMute: "Mute",
    voiceEnd: "End",
    voicePrivacy:
      "Your microphone connects to OpenAI Realtime after you press start. DJAI saves the transcript and lead details for follow-up.",
    aiDesktopHeading: "Talk to DJAI Voice Sales Agent",
    aiMobileHeading: "Talk with DJAI before you choose",
    aiDesktopIntro:
      "Use the same AI voice sales agent DJAI builds for businesses. It can diagnose what you need, explain matching DJAI services, and capture your project details for the team.",
    aiMobileIntro:
      "Speak in Thai or English. The agent helps compare packages, understand your project, and collect your details for follow-up.",
    aiDesktopSupport:
      "The agent only states prices and service details from DJAI's approved knowledge document. A human confirms custom scopes after review.",
    progressLabel: "Slide progress",
    progressGoto: "Go to slide",
    aiTypingLabel: "DJAI AI Consultant is typing",
    fallbackContact:
      "Great. Please send your name and phone/WhatsApp/Line contact, and our team will follow up with you.",
    fallbackLanding:
      "The Landing Page package is currently 5,000 THB, discounted from 10,000 THB. It is best for promotions, menus, campaigns, portfolios, or a simple business launch. Would you like me to collect your contact for this package?",
    fallbackFull:
      "The Complete Website package is currently 10,000 THB, discounted from 20,000 THB. It includes a 5-page business website with mobile responsive design, SEO setup, AI chatbot trial, and first-year hosting & maintenance. Would you like a quotation?",
    fallbackAdditional:
      "Additional pages are 3,000 THB/page, discounted from 5,000 THB/page. This is suitable if you already have a website and want to expand it with more pages.",
    fallbackCustom:
      "Sure. I can help collect the basic project requirements first. What type of business is this website for, and what features do you need?",
    fallbackCompare:
      "Landing Page is best for one focused offer. Additional Page is for expanding an existing site. Complete Website is best when you need a full 5-page business website with stronger structure and value.",
    fallbackDefault:
      "Thanks. I can help with that. DJAI websites include professional design, mobile responsive layout, SEO foundation, AI chatbot option, and first-year hosting & maintenance. Could you tell me what kind of website you want to build?",
  },
  urgency: {
    label: "Your voucher window",
    offer: "Reserve within 4 hours",
    dates: "Up to 50% off eligible packages",
  },
  header: {
    badge: "Website Packages",
    title: "Your Website, Ready to Launch",
    subtitle:
      "Professional design, built-in SEO, AI chatbot, and hosting &mdash; all included in every package.",
  },
  packages: [
    {
      title: "Landing Page",
      description: "Perfect for launching your idea with a single, high-converting page.",
      icon: "https://img.icons8.com/ios-filled/100/00d8ff/web.png",
      iconClass: "icon-cyan",
      glowClass: "card-glow-cyan",
      buttonClass: "btn-gradient",
      promoPrice: "5,000",
      originalPrice: "10,000 THB",
      originalBadge: "Save 50%",
      popularTag: "Most Popular",
      cta: "Get Started",
      renewalNote: "3,000 THB/year after 1st year",
      features: [
        "1 Page &mdash; Custom Design",
        "SEO Optimization",
        "AI Chat Bot (Auto CTA) &mdash; <span class=\"highlight-offer\">1-Month Free Trial</span>",
        "Free Hosting &mdash; 1st Year",
        "Mobile Responsive",
        "Fast Turnaround",
      ],
    },
    {
      title: "Additional Page",
      description: "Expand your existing website with extra pages, same quality &amp; design.",
      iconSvg:
        '<svg viewBox="0 0 24 24" fill="none" stroke="#2d8cff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"></path><path d="M14 3v5h5"></path><path d="M12 11v6"></path><path d="M9 14h6"></path></svg>',
      iconClass: "icon-blue",
      glowClass: "card-glow-blue",
      buttonClass: "btn-blue",
      promoPrice: "3,000",
      priceUnit: "/page",
      originalPrice: "5,000 THB /page",
      cta: "Add Page",
      renewalNote: "Covered under your maintenance plan",
      features: [
        "Add To Any Project",
        "Design Consistency",
        "SEO Optimized",
        "AI Chat Bot &mdash; <span class=\"highlight-offer\">1-Month Free Trial</span>",
        "Quick Turnaround",
        "Mobile Responsive",
      ],
    },
    {
      title: "Complete Website",
      description: "A full 5-page business website &mdash; everything you need to go online.",
      icon: "https://img.icons8.com/ios-filled/100/c653ff/domain.png",
      iconClass: "icon-purple",
      glowClass: "card-glow-purple",
      buttonClass: "btn-purple",
      featured: true,
      featuredRibbon: "Best Value",
      promoPrice: "10,000",
      originalPrice: "20,000 THB",
      originalBadge: "Save 50%",
      cta: "Build My Website",
      renewalNote: "3,000 THB/year after 1st year",
      comparison: [
        ["5 pages individually", "15,000 THB", ""],
        ["Bundle price", "10,000 THB", "comparison-save"],
        ["You save", "5,000 THB", "comparison-highlight"],
      ],
      features: [
        "5 Pages &mdash; Custom Design",
        "SEO Optimization",
        "AI Chat Bot (Auto CTA) &mdash; <span class=\"highlight-offer\">1-Month Free Trial</span>",
        "Free Hosting &mdash; 1st Year",
        "Contact Form",
        "Social Media Integration",
        "Mobile Responsive",
        "Priority Support",
      ],
    },
  ],
  chatbot: {
    iconSvg:
      '<svg viewBox="0 0 24 24" fill="none" stroke="#00d8ff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 10h10"></path><path d="M7 14h6"></path><path d="M5 19l-2 2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2z"></path></svg>',
    title: "AI Chat Bot (Auto CTA)",
    description:
      "Engage visitors &amp; capture leads 24/7 &mdash; <span>Start with a 1-Month Free Trial</span>",
    cta: "Claim Free Trial",
  },
  trustItems: ["No Hidden Fees", "Money-Back Guarantee", "Free Revisions"],
  includes: [
    {
      icon: "https://img.icons8.com/ios-filled/100/00d8ff/design.png",
      iconClass: "icon-wrap-cyan",
      title: "Custom Web Design",
      description: "Unique design tailored to your brand &mdash; never a template.",
    },
    {
      icon: "https://img.icons8.com/ios-filled/100/c653ff/google-web-search.png",
      iconClass: "icon-wrap-purple",
      title: "SEO Optimization",
      description: "Your site optimized to rank on Google from day one.",
    },
    {
      iconSvg:
        '<svg viewBox="0 0 24 24" fill="none" stroke="#2d8cff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 10h10"></path><path d="M7 14h6"></path><path d="M5 19l-2 2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2z"></path></svg>',
      iconClass: "icon-wrap-blue",
      title: "AI Chat Bot (Auto CTA)",
      description:
        "Engages visitors &amp; captures leads 24/7 &mdash; <span class=\"include-highlight\">1-Month Free Trial</span>",
    },
    {
      icon: "https://img.icons8.com/ios-filled/100/00d8ff/server.png",
      iconClass: "icon-wrap-cyan",
      title: "Free Hosting (1st Year)",
      description: "Fast &amp; secure hosting included. 3,000 THB/year after.",
    },
  ],
  aiConsultant: {
    badge: "AI Voice Sales Agent",
    desktopTitle: "Talk to DJAI AI Consultant",
    desktopSubtitle:
      "Not sure which package fits your business? Ask our AI consultant about pricing, packages, AI chatbot integration, SEO, hosting, maintenance, or custom website requirements.",
    desktopSupport:
      "Our AI consultant can help you choose the right package, answer objections, and collect your project details for quotation.",
    mobileTitle: "Not sure which package fits your business?",
    mobileSubtitle:
      "Chat with our AI consultant to compare packages, ask questions, and request a quotation.",
    benefits: [
      "Compare packages instantly",
      "Get answers about pricing and included services",
      "Request a custom quotation",
      "Leave your contact for follow-up",
    ],
    welcome:
      "Hi, I&rsquo;m your DJAI AI Consultant. I can help you choose the right website package, explain pricing, answer questions, or prepare a custom quotation. What would you like to build?",
    initialChips: [
      ["landing", "Landing Page &mdash; 5,000 THB"],
      ["full", "Full Website &mdash; 10,000 THB"],
      ["additional", "Additional Page &mdash; 3,000 THB/page"],
      ["custom", "Custom Quotation"],
    ],
    ctaChips: [
      ["contact", "Leave my contact"],
      ["compare", "Compare packages"],
      ["custom", "Need custom quote"],
    ],
  },
};

const thaiPromoOverrides = {
  voucher: {
    title: "หมุนวงล้อเพื่อเปิดคูปองต้อนรับของคุณ",
    intro: "ผู้เข้าชมใหม่ทุกคนจะได้รับคูปองพัฒนาเว็บไซต์มูลค่า 10,000 บาทจากวงล้อต้อนรับนี้",
    spin: "หมุนวงล้อ",
    skip: "ดูแพ็กเกจก่อน",
    disclosure:
      "วงล้อต้อนรับนี้มอบคูปอง 10,000 บาทให้ทุกครั้ง ส่วนรางวัลอื่นบนวงล้อเป็นตัวอย่างรางวัลแคมเปญและไม่ได้เปิดให้รับจากวงล้อนี้",
    winnerEyebrow: "ยินดีด้วย!",
    winnerTitle: "คุณได้รับคูปองมูลค่า 10,000 บาท",
    winnerCopy: "สำรองสิทธิ์ภายใน 4 ชั่วโมง เพื่อให้ทีม DJAI นำส่วนลดไปใช้ในใบเสนอราคาโปรเจกต์ของคุณ",
    lock: "ล็อกสิทธิ์นี้ตอนนี้",
    later: "ไว้ทีหลัง",
    reopen: "เปิดคูปอง ฿10,000",
    formTitle: "สำรองคูปองของคุณ",
    formCopy: "กรอกอีเมล แล้วเราจะบันทึกความสนใจของคุณเพื่อให้ทีมพัฒนาเว็บไซต์ DJAI ติดต่อกลับ",
    emailLabel: "อีเมล",
    emailPlaceholder: "you@example.com",
    consent: "ฉันยินยอมให้ DJAI Academy ติดต่อเกี่ยวกับข้อเสนอเว็บไซต์นี้ และสามารถขอให้หยุดติดต่อได้ทุกเมื่อ",
    submit: "สำรองคูปองของฉัน",
    submitting: "กำลังบันทึก…",
    successTitle: "สำรองคูปองเรียบร้อยแล้ว",
    successCopy: "ขอบคุณ อีเมลของคุณถูกบันทึกในระบบ lead ของ DJAI เพื่อให้ทีมติดต่อกลับแล้ว",
    error: "ไม่สามารถบันทึกอีเมลได้ กรุณาลองอีกครั้ง",
    expired: "หมดเวลาสำรองคูปองแล้ว",
    terms:
      "คูปองมูลค่าเต็ม 10,000 บาทใช้กับแพ็กเกจ Complete Website ราคาปกติ 20,000 บาท สำหรับแพ็กเกจอื่น ส่วนลดสูงสุดไม่เกิน 50% ของราคาปกติ จำกัด 1 สิทธิ์ต่อลูกค้า และทีม DJAI จะยืนยันขอบเขตงานขั้นสุดท้าย",
    prizes: ["10,000\nบาท", "5,000\nบาท", "2,500\nบาท", "eBooks\nฟรี", "ครั้งหน้า\nขอให้โชคดี", "100,000\nบาท"],
  },
  ui: {
    skipToPackages: "ข้ามไปดูแพ็กเกจ",
    languageLabel: "ภาษา",
    countdownLabels: {
      days: "วัน",
      hours: "ชั่วโมง",
      minutes: "นาที",
      seconds: "วินาที",
    },
    includesTitle: "ทุกแพ็กเกจรวมสิ่งเหล่านี้ให้แล้ว",
    includesSubtitle: "ไม่มีค่าธรรมเนียมแอบแฝง ไม่มีเซอร์ไพรส์ มีครบสำหรับการเริ่มออนไลน์",
    leadSummaryTitle: "สรุปคำขอโปรเจกต์",
    leadPackageInterest: "แพ็กเกจที่สนใจ",
    leadBusinessType: "ประเภทธุรกิจ",
    leadContact: "ช่องทางติดต่อ",
    leadPackageDefault: "Landing Page",
    leadBusinessDefault: "คาเฟ่หรือธุรกิจบริการในพื้นที่",
    leadContactDefault: "รอรายละเอียดติดต่อจากลูกค้า",
    leadSubmit: "ส่งคำขอ",
    leadEdit: "แก้ไขรายละเอียด",
    voiceCardTitle: "DJAI Voice Sales Agent",
    voiceReady: "พร้อมคุย",
    voiceState: "ถามเรื่องเว็บไซต์, AI, ซอฟต์แวร์, ออโตเมชัน หรือคอร์สเรียนของคุณได้เลย",
    voiceStart: "เริ่มคุยด้วยเสียง",
    voiceMute: "ปิดไมค์",
    voiceEnd: "จบสาย",
    voicePrivacy:
      "หลังจากกดเริ่ม ไมโครโฟนจะเชื่อมต่อกับ OpenAI Realtime และ DJAI จะบันทึก transcript กับรายละเอียด lead เพื่อให้ทีมติดต่อต่อ",
    aiDesktopHeading: "คุยกับ DJAI Voice Sales Agent",
    aiMobileHeading: "คุยกับ DJAI ก่อนเลือกแพ็กเกจ",
    aiDesktopIntro:
      "ลองใช้งาน AI voice sales agent แบบเดียวกับที่ DJAI สร้างให้ธุรกิจ ระบบช่วยวิเคราะห์สิ่งที่คุณต้องการ แนะนำบริการที่เหมาะ และเก็บรายละเอียดโปรเจกต์ให้ทีมติดต่อกลับ",
    aiMobileIntro:
      "พูดได้ทั้งไทยและอังกฤษ เอเจนต์ช่วยเปรียบเทียบแพ็กเกจ เข้าใจโปรเจกต์ และเก็บข้อมูลเพื่อให้ทีมติดต่อกลับ",
    aiDesktopSupport:
      "เอเจนต์จะบอกเฉพาะราคาและรายละเอียดบริการที่อยู่ในเอกสารความรู้ของ DJAI เท่านั้น งาน custom จะให้ทีมมนุษย์ยืนยันหลังดู scope",
    progressLabel: "ความคืบหน้าสไลด์",
    progressGoto: "ไปที่สไลด์",
    aiTypingLabel: "DJAI AI Consultant กำลังพิมพ์",
    fallbackContact:
      "ได้เลยครับ/ค่ะ กรุณาส่งชื่อและเบอร์โทร, WhatsApp หรือ LINE แล้วทีมงานจะติดต่อกลับ",
    fallbackLanding:
      "แพ็กเกจ Landing Page ตอนนี้ราคา 5,000 บาท จากปกติ 10,000 บาท เหมาะกับโปรโมชัน เมนู แคมเปญ พอร์ตโฟลิโอ หรือเริ่มธุรกิจแบบหน้าเดียว ต้องการให้เก็บข้อมูลติดต่อสำหรับแพ็กเกจนี้ไหมครับ/ค่ะ",
    fallbackFull:
      "แพ็กเกจ Complete Website ตอนนี้ราคา 10,000 บาท จากปกติ 20,000 บาท รวมเว็บไซต์ธุรกิจ 5 หน้า รองรับมือถือ SEO ทดลอง AI chatbot และโฮสติ้งปีแรก ต้องการให้ทีมทำใบเสนอราคาไหมครับ/ค่ะ",
    fallbackAdditional:
      "หน้าเพิ่มเติมราคา 3,000 บาทต่อหน้า จากปกติ 5,000 บาทต่อหน้า เหมาะกับธุรกิจที่มีเว็บไซต์แล้วและอยากเพิ่มหน้าใหม่",
    fallbackCustom:
      "ได้เลยครับ/ค่ะ ผม/ฉันช่วยเก็บ requirement เบื้องต้นก่อนได้ เว็บไซต์นี้เป็นธุรกิจประเภทไหน และต้องการฟีเจอร์อะไรบ้าง",
    fallbackCompare:
      "Landing Page เหมาะกับข้อเสนอหลักหน้าเดียว Additional Page เหมาะกับการเพิ่มหน้าให้เว็บเดิม ส่วน Complete Website เหมาะเมื่อคุณต้องการเว็บไซต์ธุรกิจ 5 หน้าที่มีโครงสร้างครบและคุ้มกว่า",
    fallbackDefault:
      "ขอบคุณครับ/ค่ะ DJAI ช่วยทำเว็บไซต์ดีไซน์มืออาชีพ รองรับมือถือ วางพื้นฐาน SEO มีตัวเลือก AI chatbot และโฮสติ้งปีแรก อยากสร้างเว็บไซต์แบบไหนครับ/ค่ะ",
  },
  urgency: {
    label: "เวลาสำรองคูปองของคุณ",
    offer: "สำรองสิทธิ์ภายใน 4 ชั่วโมง",
    dates: "ลดสูงสุด 50% สำหรับแพ็กเกจที่ร่วมรายการ",
  },
  header: {
    badge: "แพ็กเกจเว็บไซต์",
    title: "เว็บไซต์ของคุณ พร้อมเปิดใช้งาน",
    subtitle:
      "ดีไซน์มืออาชีพ, SEO พื้นฐาน, AI chatbot และโฮสติ้ง &mdash; รวมอยู่ในทุกแพ็กเกจ",
  },
  packages: [
    {
      title: "Landing Page",
      description: "เหมาะสำหรับเปิดตัวไอเดียหรือแคมเปญด้วยหน้าเดียวที่เน้นแปลงผู้ชมเป็นลูกค้า",
      originalBadge: "ประหยัด 50%",
      popularTag: "ยอดนิยม",
      cta: "เริ่มโปรเจกต์",
      renewalNote: "หลังปีแรก 3,000 บาท/ปี",
      features: [
        "1 หน้า &mdash; ออกแบบเฉพาะธุรกิจ",
        "ปรับแต่ง SEO",
        "AI Chat Bot (Auto CTA) &mdash; <span class=\"highlight-offer\">ทดลองใช้ฟรี 1 เดือน</span>",
        "โฮสติ้งฟรี &mdash; ปีแรก",
        "รองรับมือถือ",
        "ทำงานรวดเร็ว",
      ],
    },
    {
      title: "หน้าเพิ่มเติม",
      description: "ขยายเว็บไซต์เดิมด้วยหน้าใหม่ที่ดีไซน์และคุณภาพสอดคล้องกับเว็บของคุณ",
      cta: "เพิ่มหน้าเว็บ",
      renewalNote: "รวมอยู่ในแผนดูแลเว็บไซต์ของคุณ",
      features: [
        "เพิ่มได้กับทุกโปรเจกต์",
        "ดีไซน์สอดคล้องกับเว็บเดิม",
        "ปรับแต่ง SEO",
        "AI Chat Bot &mdash; <span class=\"highlight-offer\">ทดลองใช้ฟรี 1 เดือน</span>",
        "ทำงานรวดเร็ว",
        "รองรับมือถือ",
      ],
    },
    {
      title: "Complete Website",
      description: "เว็บไซต์ธุรกิจครบ 5 หน้า พร้อมทุกอย่างที่จำเป็นสำหรับเริ่มออนไลน์",
      featuredRibbon: "คุ้มที่สุด",
      originalBadge: "ประหยัด 50%",
      cta: "สร้างเว็บไซต์ของฉัน",
      renewalNote: "หลังปีแรก 3,000 บาท/ปี",
      comparison: [
        ["ซื้อ 5 หน้าแยกกัน", "15,000 บาท", ""],
        ["ราคาแพ็กเกจ", "10,000 บาท", "comparison-save"],
        ["คุณประหยัด", "5,000 บาท", "comparison-highlight"],
      ],
      features: [
        "5 หน้า &mdash; ออกแบบเฉพาะธุรกิจ",
        "ปรับแต่ง SEO",
        "AI Chat Bot (Auto CTA) &mdash; <span class=\"highlight-offer\">ทดลองใช้ฟรี 1 เดือน</span>",
        "โฮสติ้งฟรี &mdash; ปีแรก",
        "ฟอร์มติดต่อ",
        "เชื่อมต่อโซเชียลมีเดีย",
        "รองรับมือถือ",
        "Priority Support",
      ],
    },
  ],
  chatbot: {
    title: "AI Chat Bot (Auto CTA)",
    description:
      "ช่วยตอบลูกค้าและเก็บ lead ตลอด 24/7 &mdash; <span>เริ่มด้วยทดลองใช้ฟรี 1 เดือน</span>",
    cta: "รับทดลองใช้ฟรี",
  },
  trustItems: ["ไม่มีค่าธรรมเนียมแอบแฝง", "รับประกันคืนเงิน", "แก้ไขงานฟรี"],
  includes: [
    {
      title: "ออกแบบเว็บไซต์เฉพาะธุรกิจ",
      description: "ดีไซน์ให้เข้ากับแบรนด์ของคุณ &mdash; ไม่ใช่ template สำเร็จรูป",
    },
    {
      title: "ปรับแต่ง SEO",
      description: "วางโครงสร้างเว็บไซต์ให้พร้อมสำหรับ Google ตั้งแต่วันแรก",
    },
    {
      title: "AI Chat Bot (Auto CTA)",
      description:
        "ช่วยตอบลูกค้าและเก็บ lead ตลอด 24/7 &mdash; <span class=\"include-highlight\">ทดลองใช้ฟรี 1 เดือน</span>",
    },
    {
      title: "โฮสติ้งฟรีปีแรก",
      description: "โฮสติ้งเร็วและปลอดภัยรวมให้แล้ว หลังจากนั้น 3,000 บาท/ปี",
    },
  ],
  aiConsultant: {
    badge: "AI Voice Sales Agent",
    desktopTitle: "คุยกับ DJAI AI Consultant",
    desktopSubtitle:
      "ยังไม่แน่ใจว่าแพ็กเกจไหนเหมาะกับธุรกิจของคุณ? ถาม AI consultant เรื่องราคา แพ็กเกจ AI chatbot, SEO, โฮสติ้ง, maintenance หรือ requirement เว็บไซต์ custom ได้เลย",
    desktopSupport:
      "AI consultant ช่วยเลือกแพ็กเกจที่เหมาะ ตอบข้อกังวล และเก็บรายละเอียดโปรเจกต์เพื่อให้ทีมทำใบเสนอราคา",
    mobileTitle: "ยังไม่แน่ใจว่าแพ็กเกจไหนเหมาะกับธุรกิจของคุณ?",
    mobileSubtitle:
      "คุยกับ AI consultant เพื่อเปรียบเทียบแพ็กเกจ ถามคำถาม และขอใบเสนอราคา",
    benefits: [
      "เปรียบเทียบแพ็กเกจได้ทันที",
      "ตอบเรื่องราคาและสิ่งที่รวมในบริการ",
      "ขอใบเสนอราคางาน custom",
      "ฝากช่องทางติดต่อให้ทีม follow-up",
    ],
    welcome:
      "สวัสดีครับ/ค่ะ ผม/ฉันคือ DJAI AI Consultant ช่วยเลือกแพ็กเกจเว็บไซต์ อธิบายราคา ตอบคำถาม หรือเตรียมใบเสนอราคา custom ได้ คุณอยากสร้างอะไรครับ/ค่ะ",
    initialChips: [
      ["landing", "Landing Page &mdash; 5,000 บาท"],
      ["full", "เว็บไซต์ครบชุด &mdash; 10,000 บาท"],
      ["additional", "หน้าเพิ่มเติม &mdash; 3,000 บาท/หน้า"],
      ["custom", "ขอใบเสนอราคา custom"],
    ],
    ctaChips: [
      ["contact", "ฝากช่องทางติดต่อ"],
      ["compare", "เปรียบเทียบแพ็กเกจ"],
      ["custom", "ต้องการ quote custom"],
    ],
  },
};

function deepMerge(base, override) {
  if (Array.isArray(base) && Array.isArray(override)) {
    return base.map((item, index) => deepMerge(item, index < override.length ? override[index] : undefined));
  }

  if (
    base &&
    override &&
    typeof base === "object" &&
    typeof override === "object" &&
    !Array.isArray(base) &&
    !Array.isArray(override)
  ) {
    return Object.fromEntries(
      Object.keys({ ...base, ...override }).map((key) => [key, deepMerge(base[key], override[key])]),
    );
  }

  return override === undefined ? base : override;
}

function getInitialLanguage() {
  const queryLanguage = new URLSearchParams(window.location.search).get("lang");
  const storedLanguage = window.localStorage.getItem("djai-language");
  if (queryLanguage === "en" || queryLanguage === "th") {
    return queryLanguage;
  }
  return storedLanguage === "en" ? "en" : "th";
}

let currentLanguage = getInitialLanguage();
let promoData = currentLanguage === "en" ? basePromoData : deepMerge(basePromoData, thaiPromoOverrides);

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };

    return entities[char];
  });
}

function renderCountdownMarkup(prefix) {
  return `
    <div class="urgency-countdown">
      <div class="countdown-item">
        <span class="countdown-number" data-countdown="${prefix}:hours">00</span>
        <span class="countdown-label">${promoData.ui.countdownLabels.hours}</span>
      </div>
      <span class="countdown-separator">:</span>
      <div class="countdown-item">
        <span class="countdown-number" data-countdown="${prefix}:minutes">00</span>
        <span class="countdown-label">${promoData.ui.countdownLabels.minutes}</span>
      </div>
      <span class="countdown-separator">:</span>
      <div class="countdown-item">
        <span class="countdown-number" data-countdown="${prefix}:seconds">00</span>
        <span class="countdown-label">${promoData.ui.countdownLabels.seconds}</span>
      </div>
    </div>
  `;
}

function renderUrgency(prefix) {
  return `
    <div class="urgency-banner">
      <div class="urgency-glow"></div>
      <div class="urgency-shine"></div>
      <div class="urgency-content">
        <div class="urgency-icon-left">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            <path d="M11 1L14 8L21 11L14 14L11 21L8 14L1 11L8 8L11 1Z" fill="#FFD700" stroke="#FFA500" stroke-width="0.5"/>
          </svg>
        </div>
        <div class="urgency-text-block">
          <span class="urgency-label">${promoData.urgency.label}</span>
          <span class="urgency-divider-dot">&middot;</span>
          <span class="urgency-offer">${promoData.urgency.offer}</span>
          <span class="urgency-divider-dot">&middot;</span>
          <span class="urgency-dates" data-countdown-status>${promoData.urgency.dates}</span>
        </div>
        <div class="urgency-icon-right">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            <path d="M11 1L14 8L21 11L14 14L11 21L8 14L1 11L8 8L11 1Z" fill="#FFD700" stroke="#FFA500" stroke-width="0.5"/>
          </svg>
        </div>
      </div>
      ${renderCountdownMarkup(prefix)}
    </div>
  `;
}

function renderHeader() {
  return `
    <div class="section-header">
      <div class="header-badge">
        <span class="badge-dot"></span>
        ${promoData.header.badge}
      </div>
      <h2>${promoData.header.title}</h2>
      <p>${promoData.header.subtitle}</p>
    </div>
  `;
}

function renderPackageCard(pkg, singleSlide = false) {
  const originalPriceRow = pkg.originalPrice
    ? `
      <div class="price-discount-row">
        <span class="original-price">${pkg.originalPrice}</span>
        ${pkg.originalBadge ? `<span class="discount-badge">${pkg.originalBadge}</span>` : ""}
      </div>
    `
    : "";

  const comparison = pkg.comparison
    ? `
      <div class="price-comparison">
        ${pkg.comparison
          .map(
            ([label, value, rowClass], index) => `
              ${index === 2 ? `<div class="comparison-divider"></div>` : ""}
              <div class="comparison-row ${rowClass}">
                <span class="comparison-label">${label}</span>
                <span class="comparison-value">${value}</span>
              </div>
            `,
          )
          .join("")}
      </div>
    `
    : "";

  return `
    <div class="pricing-card ${pkg.featured ? "card-featured" : ""}">
      <div class="card-bg-glow ${pkg.glowClass}"></div>
      <div class="card-inner-border ${pkg.featured ? "featured-border" : ""}"></div>
      ${pkg.featured ? '<div class="featured-shimmer"></div>' : ""}
      ${pkg.featuredRibbon ? `<div class="best-value-ribbon">${pkg.featuredRibbon}</div>` : ""}

      <div class="card-top">
        <div class="card-icon-circle ${pkg.iconClass}">
          ${pkg.iconSvg ? `<span class="icon-svg">${pkg.iconSvg}</span>` : `<img decoding="async" src="${pkg.icon}" alt="">`}
        </div>
        ${pkg.popularTag ? `<span class="popular-tag">${pkg.popularTag}</span>` : ""}
      </div>

      <div class="card-middle">
        <h3>${pkg.title}</h3>
        <p class="card-description">${pkg.description}</p>

        <div class="price-block">
          <div class="price-main">
            <span class="price-symbol">THB</span>
            <span class="price-value">${pkg.promoPrice}</span>
            ${pkg.priceUnit ? `<span class="price-unit">${pkg.priceUnit}</span>` : ""}
          </div>
          ${originalPriceRow}
        </div>

        ${comparison}

        <div class="card-separator"></div>

        <ul class="check-list">
          ${pkg.features.map((feature) => `<li>${feature}</li>`).join("")}
        </ul>
      </div>

      <div class="card-bottom">
        <a href="${promoData.contactUrl}" class="btn-primary ${pkg.buttonClass} ${pkg.featured ? "btn-featured" : ""}">
          ${pkg.cta} <span class="btn-arrow">→</span>
          ${pkg.featured ? '<span class="btn-pulse"></span>' : ""}
        </a>
        <p class="renewal-note">
          <span class="renewal-icon">↻</span> ${pkg.renewalNote}
        </p>
      </div>
    </div>
  `;
}

function renderChatbotBanner() {
  return `
    <div class="chatbot-cta-banner">
      <div class="chatbot-cta-glow"></div>
      <div class="chatbot-cta-content">
        <div class="chatbot-cta-icon">
          <span class="icon-svg">${promoData.chatbot.iconSvg}</span>
        </div>
        <div class="chatbot-cta-text">
          <h4>${promoData.chatbot.title}</h4>
          <p>${promoData.chatbot.description}</p>
        </div>
        <a href="${promoData.contactUrl}" class="chatbot-cta-btn">
          ${promoData.chatbot.cta} <span>→</span>
        </a>
      </div>
    </div>
  `;
}

function renderTrustStrip() {
  return `
    <div class="trust-strip">
      ${promoData.trustItems
        .map(
          (item, index) => `
            <div class="trust-item">
              <span class="trust-icon">✓</span>
              <span>${item}</span>
            </div>
            ${index < promoData.trustItems.length - 1 ? '<div class="trust-divider"></div>' : ""}
          `,
        )
        .join("")}
    </div>
  `;
}

function renderIncludes() {
  return `
    <div class="includes-section">
      <div class="includes-header">
        <h4>${promoData.ui.includesTitle}</h4>
        <p>${promoData.ui.includesSubtitle}</p>
      </div>
      <div class="includes-grid">
        ${promoData.includes
          .map(
            (item) => `
              <div class="include-card">
                <div class="include-glow"></div>
                <div class="include-icon-wrap ${item.iconClass}">
                  ${item.iconSvg ? `<span class="icon-svg">${item.iconSvg}</span>` : `<img decoding="async" src="${item.icon}" alt="">`}
                </div>
                <div class="include-text">
                  <strong>${item.title}</strong>
                  <span>${item.description}</span>
                </div>
              </div>
            `,
          )
          .join("")}
      </div>
    </div>
  `;
}

function renderLeadSummaryCard() {
  return `
    <div class="lead-summary-card" hidden>
      <strong>${promoData.ui.leadSummaryTitle}</strong>
      <dl>
        <div>
          <dt>${promoData.ui.leadPackageInterest}</dt>
          <dd>${promoData.ui.leadPackageDefault}</dd>
        </div>
        <div>
          <dt>${promoData.ui.leadBusinessType}</dt>
          <dd>${promoData.ui.leadBusinessDefault}</dd>
        </div>
        <div>
          <dt>${promoData.ui.leadContact}</dt>
          <dd>${promoData.ui.leadContactDefault}</dd>
        </div>
      </dl>
      <div class="lead-summary-actions">
        <button type="button">${promoData.ui.leadSubmit}</button>
        <button type="button">${promoData.ui.leadEdit}</button>
      </div>
    </div>
  `;
}

function renderAiChatCard(instanceId) {
  return `
    <div class="ai-chat-card voice-agent-card" data-djai-voice-inline="${instanceId}">
      <div class="ai-chat-header voice-agent-header">
        <div class="ai-chat-identity">
          <div class="ai-avatar voice-agent-avatar" aria-hidden="true">DJ</div>
          <div>
            <h3>${promoData.ui.voiceCardTitle}</h3>
            <p><span class="ai-status-dot"></span><span data-djai-status>${promoData.ui.voiceReady}</span></p>
          </div>
        </div>
        <div class="voice-agent-timer" data-djai-timer>00:00</div>
      </div>

      <div class="voice-agent-body" aria-live="polite">
        <div class="voice-agent-meter" aria-hidden="true">
          <span></span><span></span><span></span><span></span><span></span>
        </div>
        <p class="voice-agent-state" data-djai-state>${promoData.ui.voiceState}</p>
        <div class="voice-agent-transcript" data-djai-transcript></div>
      </div>

      <div class="voice-agent-actions">
        <button type="button" class="voice-agent-primary" data-djai-start>
          <span class="voice-agent-mic" aria-hidden="true"></span>
          ${promoData.ui.voiceStart}
        </button>
        <button type="button" class="voice-agent-secondary" data-djai-mute hidden>${promoData.ui.voiceMute}</button>
        <button type="button" class="voice-agent-end" data-djai-end hidden>${promoData.ui.voiceEnd}</button>
      </div>

      <p class="ai-privacy-note">${promoData.ui.voicePrivacy}</p>
    </div>
  `;
}

function renderAiChatSection(mode = "desktop") {
  const isMobile = mode === "mobile";

  return `
    <section class="ai-chat-section ${isMobile ? "ai-chat-section-mobile" : ""}" id="${isMobile ? "mobile-ai-consultant" : "ai-consultant"}">
      <div class="ai-chat-glow"></div>
      <div class="ai-chat-copy">
        <div class="ai-chat-badge">
          <span class="badge-dot"></span>
          ${promoData.aiConsultant.badge}
        </div>
        <h2>${isMobile ? promoData.ui.aiMobileHeading : promoData.ui.aiDesktopHeading}</h2>
        <p>${isMobile ? promoData.ui.aiMobileIntro : promoData.ui.aiDesktopIntro}</p>
        ${isMobile ? "" : `<p class="ai-chat-support">${promoData.ui.aiDesktopSupport}</p>`}
        ${
          isMobile
            ? ""
            : `<ul class="ai-chat-benefits">${promoData.aiConsultant.benefits
                .map((benefit) => `<li>${benefit}</li>`)
                .join("")}</ul>`
        }
      </div>
      ${renderAiChatCard(mode)}
    </section>
  `;
}

function renderDesktopView() {
  return `
    <div class="desktop-view">
      <div class="section-shell">
        <section class="web-pricing-section" id="packages">
          <div class="section-bg-pattern"></div>
          ${renderUrgency("desktop")}
          ${renderHeader()}
          <div class="pricing-cards-row">
            ${promoData.packages.map((pkg) => renderPackageCard(pkg)).join("")}
          </div>
          ${renderChatbotBanner()}
          ${renderTrustStrip()}
          ${renderIncludes()}
          ${renderAiChatSection("desktop")}
        </section>
      </div>
    </div>
  `;
}

function renderMobileSlides() {
  const [landing, additional, complete] = promoData.packages;

  const slides = [
    `
      <section class="mobile-slide" id="slide-intro" data-slide-index="0">
        <div class="mobile-slide-panel">
          <div class="mobile-slide-content">
            <section class="web-pricing-section">
              <div class="section-bg-pattern"></div>
              ${renderUrgency("mobile-intro")}
              ${renderHeader()}
            </section>
          </div>
        </div>
      </section>
    `,
    `
      <section class="mobile-slide" id="slide-landing" data-slide-index="1">
        <div class="mobile-slide-panel">
          <div class="mobile-slide-content">
            <section class="web-pricing-section">
              <div class="section-bg-pattern"></div>
              <div class="pricing-cards-row">
                ${renderPackageCard(landing, true)}
              </div>
            </section>
          </div>
        </div>
      </section>
    `,
    `
      <section class="mobile-slide" id="slide-additional" data-slide-index="2">
        <div class="mobile-slide-panel">
          <div class="mobile-slide-content">
            <section class="web-pricing-section">
              <div class="section-bg-pattern"></div>
              <div class="pricing-cards-row">
                ${renderPackageCard(additional, true)}
              </div>
            </section>
          </div>
        </div>
      </section>
    `,
    `
      <section class="mobile-slide" id="slide-complete" data-slide-index="3">
        <div class="mobile-slide-panel">
          <div class="mobile-slide-content">
            <section class="web-pricing-section">
              <div class="section-bg-pattern"></div>
              <div class="pricing-cards-row">
                ${renderPackageCard(complete, true)}
              </div>
            </section>
          </div>
        </div>
      </section>
    `,
    `
      <section class="mobile-slide" id="slide-chatbot" data-slide-index="4">
        <div class="mobile-slide-panel">
          <div class="mobile-slide-content">
            <section class="web-pricing-section">
              <div class="section-bg-pattern"></div>
              ${renderChatbotBanner()}
              ${renderTrustStrip()}
            </section>
          </div>
        </div>
      </section>
    `,
    `
      <section class="mobile-slide" id="slide-includes" data-slide-index="5">
        <div class="mobile-slide-panel">
          <div class="mobile-slide-content">
            <section class="web-pricing-section" id="includes">
              <div class="section-bg-pattern"></div>
              ${renderIncludes()}
            </section>
          </div>
        </div>
      </section>
    `,
    `
      <section class="mobile-slide mobile-slide-ai-chat" id="slide-ai-consultant" data-slide-index="6">
        <div class="mobile-slide-panel">
          <div class="mobile-slide-content">
            <section class="web-pricing-section">
              <div class="section-bg-pattern"></div>
              ${renderAiChatSection("mobile")}
            </section>
          </div>
        </div>
      </section>
    `,
  ];

  return `
    <div class="mobile-view">
      <div class="mobile-progress" aria-label="${promoData.ui.progressLabel}">
        ${slides
          .map(
            (_, index) =>
              `<button type="button" data-progress-index="${index}" aria-label="${promoData.ui.progressGoto} ${index + 1}"></button>`,
          )
          .join("")}
      </div>
      <div class="mobile-slides" id="mobile-slides">
        ${slides.join("")}
      </div>
    </div>
  `;
}

function renderLanguageSwitch() {
  return `
    <div class="language-bar" aria-label="${promoData.ui.languageLabel}">
      <span>${promoData.ui.languageLabel}</span>
      <div class="language-switch" role="group" aria-label="${promoData.ui.languageLabel}">
        <button type="button" data-language="th" class="${currentLanguage === "th" ? "is-active" : ""}" aria-pressed="${currentLanguage === "th"}">TH</button>
        <button type="button" data-language="en" class="${currentLanguage === "en" ? "is-active" : ""}" aria-pressed="${currentLanguage === "en"}">EN</button>
      </div>
    </div>
  `;
}

function renderVoucherExperience() {
  const prizeLabels = promoData.voucher.prizes
    .map(
      (prize, index) => `
        <span class="voucher-wheel-label" style="--segment-angle: ${index * 60}deg">
          <b>${escapeHtml(prize).replace("\n", "<br>")}</b>
        </span>
      `,
    )
    .join("");

  return `
    <section class="voucher-gate" data-voucher-gate hidden>
      <div class="voucher-backdrop" aria-hidden="true"></div>
      <div class="voucher-dialog" role="dialog" aria-modal="true" aria-labelledby="voucher-title">
        <div class="voucher-panel" data-voucher-panel="spin">
          <p class="voucher-eyebrow">DJAI Academy welcome offer</p>
          <h2 id="voucher-title">${promoData.voucher.title}</h2>
          <p class="voucher-intro">${promoData.voucher.intro}</p>
          <div class="voucher-wheel-stage">
            <div class="voucher-pointer" aria-hidden="true"></div>
            <div class="voucher-wheel" data-voucher-wheel aria-label="${promoData.voucher.title}">
              <div class="voucher-wheel-rim"></div>
              ${prizeLabels}
              <div class="voucher-wheel-hub"><span>DJAI</span></div>
            </div>
          </div>
          <button class="voucher-primary" type="button" data-voucher-spin>${promoData.voucher.spin}</button>
          <button class="voucher-text-button" type="button" data-voucher-later>${promoData.voucher.skip}</button>
          <p class="voucher-disclosure">${promoData.voucher.disclosure}</p>
        </div>

        <div class="voucher-panel" data-voucher-panel="winner" hidden>
          <div class="voucher-confetti" aria-hidden="true">✦ ✧ ✦</div>
          <p class="voucher-eyebrow">${promoData.voucher.winnerEyebrow}</p>
          <h2>${promoData.voucher.winnerTitle}</h2>
          <div class="voucher-winner-value">฿10,000</div>
          <p class="voucher-intro">${promoData.voucher.winnerCopy}</p>
          ${renderCountdownMarkup("voucher")}
          <div class="voucher-actions">
            <button class="voucher-primary" type="button" data-voucher-lock>${promoData.voucher.lock}</button>
            <button class="voucher-secondary" type="button" data-voucher-later>${promoData.voucher.later}</button>
          </div>
          <p class="voucher-terms">${promoData.voucher.terms}</p>
        </div>

        <div class="voucher-panel" data-voucher-panel="form" hidden>
          <p class="voucher-eyebrow">฿10,000 DJAI voucher</p>
          <h2>${promoData.voucher.formTitle}</h2>
          <p class="voucher-intro">${promoData.voucher.formCopy}</p>
          <form class="voucher-form" data-voucher-form>
            <label for="voucher-email">${promoData.voucher.emailLabel}</label>
            <input id="voucher-email" name="email" type="email" autocomplete="email" inputmode="email" placeholder="${promoData.voucher.emailPlaceholder}" maxlength="254" required>
            <div class="voucher-honeypot" aria-hidden="true">
              <label for="voucher-website">Website</label>
              <input id="voucher-website" name="website" type="text" tabindex="-1" autocomplete="off">
            </div>
            <label class="voucher-consent">
              <input name="consent" type="checkbox" required>
              <span>${promoData.voucher.consent}</span>
            </label>
            <p class="voucher-form-status" data-voucher-form-status role="status"></p>
            <button class="voucher-primary" type="submit">${promoData.voucher.submit}</button>
            <button class="voucher-text-button" type="button" data-voucher-later>${promoData.voucher.later}</button>
          </form>
          <p class="voucher-terms">${promoData.voucher.terms}</p>
        </div>

        <div class="voucher-panel" data-voucher-panel="success" hidden>
          <div class="voucher-success-icon" aria-hidden="true">✓</div>
          <h2>${promoData.voucher.successTitle}</h2>
          <p class="voucher-intro">${promoData.voucher.successCopy}</p>
          <button class="voucher-primary" type="button" data-voucher-later>${promoData.voucher.skip}</button>
        </div>
      </div>
    </section>
    <button class="voucher-reopen" type="button" data-voucher-reopen hidden>
      <span aria-hidden="true">✦</span> ${promoData.voucher.reopen}
    </button>
  `;
}

function renderPage() {
  const app = document.querySelector("#app");
  const voucherRoot = document.querySelector("#voucher-welcome-root");
  document.documentElement.lang = currentLanguage === "th" ? "th" : "en";

  if (voucherRoot) {
    voucherRoot.innerHTML = renderVoucherExperience();
  }

  app.innerHTML = `
    <a class="skip-link" href="#packages">${promoData.ui.skipToPackages}</a>
    <div class="page-shell">
      ${renderDesktopView()}
      ${renderMobileSlides()}
    </div>
  `;
}

let voucherStateCache;

function getVoucherState() {
  if (voucherStateCache) {
    return voucherStateCache;
  }

  let stored;
  try {
    stored = JSON.parse(window.localStorage.getItem(promoData.voucher.storageKey) || "null");
  } catch {
    stored = null;
  }

  const validDeadline = Number.isFinite(stored?.deadline) && stored.deadline > 0;
  voucherStateCache = validDeadline
    ? stored
    : { deadline: Date.now() + promoData.voucher.durationMs, stage: "new" };

  if (voucherStateCache.deadline <= Date.now() && voucherStateCache.stage !== "reserved") {
    voucherStateCache.stage = "expired";
  }

  saveVoucherState(voucherStateCache);
  return voucherStateCache;
}

function saveVoucherState(state) {
  voucherStateCache = state;
  try {
    window.localStorage.setItem(promoData.voucher.storageKey, JSON.stringify(state));
  } catch {
  }
}

function updateCountdown() {
  const state = getVoucherState();
  const diff = Math.max(0, state.deadline - Date.now());

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  const values = {
    days,
    hours,
    minutes,
    seconds,
  };

  document.querySelectorAll("[data-countdown]").forEach((field) => {
    const [, unit] = field.dataset.countdown.split(":");
    field.textContent = String(values[unit]).padStart(2, "0");
  });

  if (diff === 0) {
    if (state.stage !== "reserved" && state.stage !== "expired") {
      saveVoucherState({ ...state, stage: "expired" });
    }
    document.querySelectorAll("[data-countdown-status]").forEach((field) => {
      field.textContent = promoData.voucher.expired;
    });
    document.querySelectorAll("[data-voucher-spin], [data-voucher-lock]").forEach((button) => {
      button.disabled = true;
      button.textContent = promoData.voucher.expired;
    });
    const reopen = document.querySelector("[data-voucher-reopen]");
    if (reopen) reopen.hidden = true;
  }
}

function bindVoucherExperience() {
  const gate = document.querySelector("[data-voucher-gate]");
  if (!gate) {
    document.documentElement.classList.remove("voucher-pending");
    return;
  }

  const panels = [...gate.querySelectorAll("[data-voucher-panel]")];
  const reopen = document.querySelector("[data-voucher-reopen]");
  const state = getVoucherState();
  let previousFocus = null;

  function showPanel(name) {
    panels.forEach((panel) => {
      panel.hidden = panel.dataset.voucherPanel !== name;
    });
    const activePanel = panels.find((panel) => panel.dataset.voucherPanel === name);
    window.requestAnimationFrame(() => activePanel?.querySelector("button, input")?.focus());
  }

  function openGate(panelName) {
    previousFocus = document.activeElement;
    gate.hidden = false;
    if (reopen) reopen.hidden = true;
    document.body.classList.add("voucher-open");
    showPanel(panelName);
    document.documentElement.classList.remove("voucher-pending");
  }

  function closeGate(stage = "dismissed") {
    saveVoucherState({ ...getVoucherState(), stage });
    gate.hidden = true;
    document.body.classList.remove("voucher-open");
    document.documentElement.classList.remove("voucher-pending");
    if (reopen) reopen.hidden = stage === "reserved" || getVoucherState().deadline <= Date.now();
    previousFocus?.focus?.();
  }

  if (state.stage === "new") {
    openGate("spin");
  } else if (state.stage === "won") {
    openGate("winner");
  } else if (state.stage === "form") {
    openGate("form");
  } else {
    document.documentElement.classList.remove("voucher-pending");
    if (reopen) reopen.hidden = state.stage === "reserved" || state.stage === "expired";
  }

  gate.querySelector("[data-voucher-spin]")?.addEventListener("click", (event) => {
    const button = event.currentTarget;
    const wheel = gate.querySelector("[data-voucher-wheel]");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    button.disabled = true;
    wheel.classList.add("is-spinning");

    window.setTimeout(
      () => {
        saveVoucherState({ ...getVoucherState(), stage: "won" });
        showPanel("winner");
        updateCountdown();
      },
      reducedMotion ? 500 : 5200,
    );
  });

  gate.querySelector("[data-voucher-lock]")?.addEventListener("click", () => {
    saveVoucherState({ ...getVoucherState(), stage: "form" });
    showPanel("form");
  });

  gate.querySelectorAll("[data-voucher-later]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = button.closest("[data-voucher-panel]")?.dataset.voucherPanel;
      const stage = panel === "success" ? "reserved" : panel === "spin" ? "new" : panel === "form" ? "form" : "won";
      closeGate(stage);
    });
  });

  reopen?.addEventListener("click", () => {
    const current = getVoucherState();
    if (current.deadline <= Date.now() || current.stage === "reserved") {
      reopen.hidden = true;
      return;
    }
    openGate(current.stage === "form" ? "form" : current.stage === "won" ? "winner" : "spin");
  });

  gate.querySelector("[data-voucher-form]")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const submit = form.querySelector('button[type="submit"]');
    const status = form.querySelector("[data-voucher-form-status]");
    const formData = new FormData(form);
    submit.disabled = true;
    submit.textContent = promoData.voucher.submitting;
    status.textContent = "";

    try {
      const response = await fetch("/web_promo/api/voucher-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.get("email"),
          website: formData.get("website"),
          consent: formData.get("consent") === "on",
          language: currentLanguage,
          deadline: getVoucherState().deadline,
          pageUrl: window.location.href,
        }),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok || !payload.ok) {
        throw new Error(payload.error || promoData.voucher.error);
      }

      saveVoucherState({ ...getVoucherState(), stage: "reserved", leadId: payload.leadId || null });
      showPanel("success");
    } catch (error) {
      status.textContent = error instanceof Error ? error.message : promoData.voucher.error;
      submit.disabled = false;
      submit.textContent = promoData.voucher.submit;
    }
  });

  gate.addEventListener("keydown", (event) => {
    if (event.key !== "Tab" || gate.hidden) return;
    const focusable = [...gate.querySelectorAll('button:not([disabled]):not([hidden]), input:not([disabled]):not([type="hidden"])')]
      .filter((element) => !element.closest("[hidden]"));
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
}

function bindMobileSlides() {
  const slidesRoot = document.querySelector("#mobile-slides");
  if (!slidesRoot) {
    return;
  }

  const slides = [...slidesRoot.querySelectorAll(".mobile-slide")];
  const dots = [...document.querySelectorAll("[data-progress-index]")];

  function setActive(index) {
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === index);
    });

    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === index);
      dot.setAttribute("aria-current", dotIndex === index ? "step" : "false");
    });
  }

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const index = Number(dot.dataset.progressIndex);
      slidesRoot.scrollTo({ top: slides[index].offsetTop, behavior: "smooth" });
    });
  });

  if (!("IntersectionObserver" in window)) {
    setActive(0);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(slides.indexOf(entry.target));
        }
      });
    },
    { root: slidesRoot, threshold: 0.6 },
  );

  slides.forEach((slide) => observer.observe(slide));
  setActive(0);

  const hash = window.location.hash;
  if (hash) {
    const targetSlide = slides.find((slide) => `#${slide.id}` === hash);
    if (targetSlide) {
      window.requestAnimationFrame(() => {
        slidesRoot.scrollTo({ top: targetSlide.offsetTop, behavior: "instant" });
      });
    }
  }
}

function getAiResponse(action, message) {
  const normalized = `${action || ""} ${message || ""}`.toLowerCase();

  if (action === "contact" || normalized.includes("contact") || normalized.includes("whatsapp") || normalized.includes("phone")) {
    return {
      text: promoData.ui.fallbackContact,
      chips: [],
    };
  }

  if (action === "landing" || normalized.includes("landing")) {
    return {
      text: promoData.ui.fallbackLanding,
      chips: promoData.aiConsultant.ctaChips,
    };
  }

  if (action === "full" || normalized.includes("full") || normalized.includes("complete") || normalized.includes("website")) {
    return {
      text: promoData.ui.fallbackFull,
      chips: promoData.aiConsultant.ctaChips,
    };
  }

  if (action === "additional" || normalized.includes("additional") || normalized.includes("extra page") || normalized.includes("page")) {
    return {
      text: promoData.ui.fallbackAdditional,
      chips: promoData.aiConsultant.ctaChips,
    };
  }

  if (action === "custom" || normalized.includes("custom") || normalized.includes("quote") || normalized.includes("quotation")) {
    return {
      text: promoData.ui.fallbackCustom,
      chips: promoData.aiConsultant.ctaChips.filter(([actionName]) => actionName === "contact" || actionName === "compare"),
    };
  }

  if (action === "compare" || normalized.includes("compare")) {
    return {
      text: promoData.ui.fallbackCompare,
      chips: promoData.aiConsultant.initialChips,
    };
  }

  return {
    text: promoData.ui.fallbackDefault,
    chips: promoData.aiConsultant.ctaChips,
  };
}

function renderAiChips(chips) {
  return chips.map(([action, label]) => `<button type="button" class="ai-chip" data-ai-action="${action}">${label}</button>`).join("");
}

function bindAiChatbots() {
  document.querySelectorAll("[data-ai-chatbot]").forEach((chatbot) => {
    const body = chatbot.querySelector("[data-ai-chat-body]");
    const chips = chatbot.querySelector("[data-ai-chips]");
    const form = chatbot.querySelector("[data-ai-form]");
    const input = chatbot.querySelector("[data-ai-input]");
    const reset = chatbot.querySelector("[data-ai-reset]");
    let responseTimer;

    function scrollBody() {
      body.scrollTop = body.scrollHeight;
    }

    function addMessage(role, text) {
      const message = document.createElement("div");
      message.className = `ai-message ai-message-${role}`;
      message.innerHTML =
        role === "bot"
          ? `<div class="ai-message-avatar" aria-hidden="true">D</div><div class="ai-message-bubble">${text}</div>`
          : `<div class="ai-message-bubble">${escapeHtml(text)}</div>`;
      body.appendChild(message);
      scrollBody();
    }

    function showTyping() {
      const typing = document.createElement("div");
      typing.className = "ai-message ai-message-bot ai-typing-message";
      typing.innerHTML = `
        <div class="ai-message-avatar" aria-hidden="true">D</div>
        <div class="ai-message-bubble ai-typing" aria-label="${promoData.ui.aiTypingLabel}">
          <span></span><span></span><span></span>
        </div>
      `;
      body.appendChild(typing);
      scrollBody();
      return typing;
    }

    function sendMessage(label, action = "") {
      const cleanLabel = label.trim();
      if (!cleanLabel) {
        return;
      }

      window.clearTimeout(responseTimer);
      addMessage("user", cleanLabel);
      chips.innerHTML = "";

      const typing = showTyping();
      responseTimer = window.setTimeout(() => {
        typing.remove();
        const response = getAiResponse(action, cleanLabel);
        addMessage("bot", response.text);
        chips.innerHTML = renderAiChips(response.chips.length ? response.chips : promoData.aiConsultant.initialChips);
      }, 620);
    }

    chips.addEventListener("click", (event) => {
      const chip = event.target.closest("[data-ai-action]");
      if (!chip) {
        return;
      }

      sendMessage(chip.textContent, chip.dataset.aiAction);
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      sendMessage(input.value);
      input.value = "";
    });

    reset.addEventListener("click", () => {
      window.clearTimeout(responseTimer);
      body.innerHTML = `
        <div class="ai-message ai-message-bot">
          <div class="ai-message-avatar" aria-hidden="true">D</div>
          <div class="ai-message-bubble">${promoData.aiConsultant.welcome}</div>
        </div>
        ${renderLeadSummaryCard()}
      `;
      chips.innerHTML = renderAiChips(promoData.aiConsultant.initialChips);
      input.value = "";
      scrollBody();
    });
  });
}

function bindLanguageSwitch() {
  document.querySelectorAll("[data-language]").forEach((button) => {
    button.addEventListener("click", () => {
      const language = button.dataset.language === "en" ? "en" : "th";
      window.localStorage.setItem("djai-language", language);

      const url = new URL(window.location.href);
      url.searchParams.set("lang", language);
      window.location.href = url.toString();
    });
  });
}

renderPage();
updateCountdown();
window.setInterval(updateCountdown, 1000);
bindVoucherExperience();
bindLanguageSwitch();
bindMobileSlides();
bindAiChatbots();

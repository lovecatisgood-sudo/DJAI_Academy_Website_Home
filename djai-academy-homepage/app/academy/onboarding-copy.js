export const SIGNUP_DESTINATION = "https://school.djai.academy/signup?returnTo=%2Fonboarding%2Fprofile";
export const LOGIN_DESTINATION = "https://school.djai.academy/login?returnTo=%2Fonboarding%2Fprofile";

export const onboardingCopy = {
  en: {
    locale: "en",
    languageLabel: "ไทย",
    languageHref: "/academy/",
    brandAlt: "DJAI Academy",
    eyebrow: "WELCOME TO DJAI ACADEMY",
    progress: "Step {current} of {total}",
    back: "Back",
    next: "Next",
    required: "Please complete this step before continuing.",
    privacy:
      "DJAI Academy uses your answers to understand learner needs and improve community learning. Please do not include sensitive personal information. You may request access to or deletion of your response at contact@djai.academy.",
    submitError:
      "Your agreement is saved on this device, but we could not send your survey right now. You may still continue to the Academy.",
    retry: "Try sending again",
    continueAnyway: "Continue to the Academy",
    submitting: "Saving your response…",
    teaser: {
      title: "Learn, build, and grow with DJAI",
      body:
        "DJAI School is a bilingual learning community for people building practical skills with AI. Create your School account to complete the learner survey securely and begin your journey.",
      accountNote:
        "Your onboarding answers are saved only after you sign in, so they stay connected to your account across browsers and devices.",
      createAccount: "Create my School account",
      signIn: "I already have an account",
      processTitle: "How to begin",
      process: [
        "Create or sign in to your DJAI School account.",
        "Complete the six-step learner survey securely.",
        "Choose your community and start learning."
      ],
      guidelinesEyebrow: "OUR COMMUNITY",
      guidelinesTitle: "A thoughtful place to learn together",
      guidelinesBody:
        "You will confirm these guidelines during authenticated onboarding. Here is what every DJAI School member can expect."
    },
    mobile: {
      guidelineDetails: "Read details",
      programmingLabel: "Programming",
      programmingTitle: "Your programming background",
      programmingIntro: "A programming background is helpful, but it is not required to learn and build with DJAI."
    },
    steps: [
      {
        label: "Community",
        title: "Welcome to DJAI Academy",
        intro:
          "This is a place where we learn, build, and grow together. Please agree to these community guidelines before continuing.",
        guidelines: [
          {
            title: "Be kind and respectful",
            text: "Treat every member with dignity, regardless of background, identity, experience, or skill level."
          },
          {
            title: "Create a healthy learning environment",
            text: "Share constructive feedback, celebrate progress, and help others learn without judgment."
          },
          {
            title: "Collaborate with integrity",
            text: "Give credit, respect intellectual property, and never present another person’s work as your own."
          },
          {
            title: "Protect privacy and safety",
            text: "Do not share private, confidential, harmful, or illegal content, and ask permission before sharing someone else’s information."
          },
          {
            title: "Use AI responsibly",
            text: "Review your work, be honest about AI assistance when relevant, and do not use technology to harm, deceive, or exploit others."
          }
        ],
        agreement: "I have read and agree to follow the DJAI Academy Community Guidelines."
      },
      {
        label: "About you",
        title: "Tell us a little about yourself",
        intro: "Your answers help us make DJAI learning activities more useful for the community.",
        name: "What should we call you?",
        namePlaceholder: "Your name or preferred name",
        age: "Age range",
        agePlaceholder: "Select an age range",
        ageOptions: [
          ["under-18", "Under 18"],
          ["18-24", "18–24"],
          ["25-34", "25–34"],
          ["35-44", "35–44"],
          ["45-54", "45–54"],
          ["55-plus", "55 or above"],
          ["not-stated", "Prefer not to say"]
        ],
        profession: "Current profession or area of work",
        professionPlaceholder: "For example: student, designer, business owner"
      },
      {
        label: "Experience",
        title: "Your technical background",
        intro: "There is no wrong answer. DJAI welcomes complete beginners and experienced builders.",
        experience: "How would you describe your software or IT background?",
        experienceOptions: [
          ["none", "No previous background", "I am starting from zero."],
          ["beginner", "Beginner", "I understand a few basics or have tried simple tools."],
          ["intermediate", "Intermediate", "I can build or troubleshoot small projects."],
          ["advanced", "Advanced", "I am confident working with software or technical systems."]
        ],
        programming: "Do you know any programming languages?",
        yes: "Yes",
        no: "No",
        languages: "Which programming languages do you know?",
        languagesPlaceholder: "For example: Python, JavaScript, Java"
      },
      {
        label: "Goals",
        title: "What would you like to achieve with DJAI?",
        intro: "Choose every goal that matters to you. You can select more than one.",
        goalOptions: [
          ["app", "Build an app"],
          ["game", "Build a game"],
          ["work", "Use AI in my work or business"],
          ["income", "Create income opportunities with AI"],
          ["startup", "Start my own technology company"],
          ["other", "Something else"]
        ],
        other: "Tell us what else you would like to achieve",
        otherPlaceholder: "Describe your goal"
      },
      {
        label: "Commitment",
        title: "My learning commitment",
        intro: "Meaningful progress comes from curiosity, practice, and persistence. Please make this commitment to yourself.",
        declaration: [
          "I take responsibility for my own learning and progress.",
          "I will stay committed to the goals I choose for myself.",
          "When problems arise, I will ask questions, try again, and not give up easily.",
          "I understand that learning to build with AI and vibe coding is a practical skill developed through consistent practice."
        ],
        agreement: "I accept the DJAI Academy Learner Commitment and am ready to begin.",
        enter: "Agree and enter the Academy"
      }
    ]
  },
  th: {
    locale: "th",
    languageLabel: "EN",
    languageHref: "/academy/en/",
    brandAlt: "DJAI Academy",
    eyebrow: "ยินดีต้อนรับสู่ DJAI ACADEMY",
    progress: "ขั้นตอนที่ {current} จาก {total}",
    back: "ย้อนกลับ",
    next: "ถัดไป",
    required: "กรุณาตอบคำถามในขั้นตอนนี้ให้ครบก่อนดำเนินการต่อ",
    privacy:
      "DJAI Academy ใช้คำตอบของคุณเพื่อทำความเข้าใจความต้องการของผู้เรียนและพัฒนากิจกรรมในชุมชน กรุณาอย่ากรอกข้อมูลส่วนบุคคลที่มีความละเอียดอ่อน หากต้องการขอดูหรือลบคำตอบ โปรดติดต่อ contact@djai.academy",
    submitError:
      "ระบบบันทึกคำยืนยันไว้ในอุปกรณ์นี้แล้ว แต่ยังส่งแบบสำรวจไม่ได้ในขณะนี้ คุณยังสามารถเข้าสู่ Academy ได้",
    retry: "ลองส่งอีกครั้ง",
    continueAnyway: "เข้าสู่ Academy",
    submitting: "กำลังบันทึกคำตอบ…",
    teaser: {
      title: "เรียนรู้ ลงมือสร้าง และเติบโตไปกับ DJAI",
      body:
        "DJAI School คือชุมชนการเรียนรู้สองภาษาสำหรับผู้ที่ต้องการพัฒนาทักษะ AI ผ่านการลงมือทำจริง สร้างบัญชี School เพื่อทำแบบสำรวจผู้เรียนอย่างปลอดภัยและเริ่มต้นเส้นทางของคุณ",
      accountNote:
        "คำตอบการเริ่มต้นใช้งานจะถูกบันทึกหลังจากเข้าสู่ระบบเท่านั้น จึงเชื่อมกับบัญชีของคุณได้อย่างถูกต้องในทุกเบราว์เซอร์และอุปกรณ์",
      createAccount: "สร้างบัญชี School",
      signIn: "ฉันมีบัญชีอยู่แล้ว",
      processTitle: "เริ่มต้นอย่างไร",
      process: [
        "สร้างบัญชีหรือเข้าสู่ระบบ DJAI School",
        "ทำแบบสำรวจผู้เรียน 6 ขั้นตอนอย่างปลอดภัย",
        "เลือกชุมชนและเริ่มเรียนรู้"
      ],
      guidelinesEyebrow: "ชุมชนของเรา",
      guidelinesTitle: "พื้นที่ที่ตั้งใจสร้างเพื่อการเรียนรู้ร่วมกัน",
      guidelinesBody:
        "คุณจะยืนยันแนวทางเหล่านี้ในขั้นตอนเริ่มต้นหลังเข้าสู่ระบบ และนี่คือสิ่งที่สมาชิก DJAI School ทุกคนคาดหวังได้"
    },
    mobile: {
      guidelineDetails: "ดูรายละเอียด",
      programmingLabel: "การเขียนโปรแกรม",
      programmingTitle: "พื้นฐานด้านการเขียนโปรแกรมของคุณ",
      programmingIntro: "การมีพื้นฐานเขียนโปรแกรมอาจช่วยได้ แต่ไม่ใช่ข้อกำหนดสำหรับการเรียนรู้และลงมือสร้างกับ DJAI"
    },
    steps: [
      {
        label: "ชุมชน",
        title: "ยินดีต้อนรับสู่ DJAI Academy",
        intro:
          "ที่นี่คือพื้นที่สำหรับเรียนรู้ ลงมือสร้าง และเติบโตไปด้วยกัน กรุณาอ่านและยอมรับแนวทางของชุมชนก่อนดำเนินการต่อ",
        guidelines: [
          {
            title: "สุภาพและให้เกียรติกัน",
            text: "ปฏิบัติต่อสมาชิกทุกคนอย่างให้เกียรติ ไม่ว่าจะแตกต่างกันด้านภูมิหลัง ตัวตน ประสบการณ์ หรือระดับทักษะ"
          },
          {
            title: "ร่วมสร้างพื้นที่การเรียนรู้ที่ดี",
            text: "ให้คำแนะนำอย่างสร้างสรรค์ ชื่นชมความก้าวหน้า และช่วยให้ผู้อื่นเรียนรู้โดยไม่ตัดสิน"
          },
          {
            title: "ร่วมมือกันอย่างซื่อสัตย์",
            text: "ให้เครดิตเจ้าของผลงาน เคารพทรัพย์สินทางปัญญา และไม่นำผลงานของผู้อื่นมาอ้างว่าเป็นของตนเอง"
          },
          {
            title: "เคารพความเป็นส่วนตัวและความปลอดภัย",
            text: "ไม่เผยแพร่ข้อมูลส่วนตัว ข้อมูลลับ เนื้อหาที่เป็นอันตรายหรือผิดกฎหมาย และขออนุญาตก่อนแบ่งปันข้อมูลของผู้อื่น"
          },
          {
            title: "ใช้ AI อย่างรับผิดชอบ",
            text: "ตรวจสอบผลงานของตนเอง เปิดเผยการใช้ AI เมื่อเหมาะสม และไม่ใช้เทคโนโลยีเพื่อทำร้าย หลอกลวง หรือเอาเปรียบผู้อื่น"
          }
        ],
        agreement: "ฉันได้อ่านและตกลงที่จะปฏิบัติตามแนวทางชุมชนของ DJAI Academy"
      },
      {
        label: "เกี่ยวกับคุณ",
        title: "แนะนำตัวให้เรารู้จักสักเล็กน้อย",
        intro: "คำตอบของคุณจะช่วยให้เราพัฒนากิจกรรมการเรียนรู้ของ DJAI ให้เป็นประโยชน์ต่อชุมชนมากขึ้น",
        name: "อยากให้เราเรียกคุณว่าอะไร?",
        namePlaceholder: "ชื่อหรือชื่อที่ต้องการให้เรียก",
        age: "ช่วงอายุ",
        agePlaceholder: "เลือกช่วงอายุ",
        ageOptions: [
          ["under-18", "ต่ำกว่า 18 ปี"],
          ["18-24", "18–24 ปี"],
          ["25-34", "25–34 ปี"],
          ["35-44", "35–44 ปี"],
          ["45-54", "45–54 ปี"],
          ["55-plus", "55 ปีขึ้นไป"],
          ["not-stated", "ไม่ประสงค์ระบุ"]
        ],
        profession: "อาชีพหรือสายงานปัจจุบัน",
        professionPlaceholder: "เช่น นักเรียน นักออกแบบ เจ้าของธุรกิจ"
      },
      {
        label: "ประสบการณ์",
        title: "พื้นฐานด้านเทคโนโลยีของคุณ",
        intro: "ไม่มีคำตอบที่ผิด DJAI ยินดีต้อนรับทั้งผู้ที่เริ่มจากศูนย์และผู้ที่มีประสบการณ์",
        experience: "คุณมีพื้นฐานด้านซอฟต์แวร์หรือ IT ในระดับใด?",
        experienceOptions: [
          ["none", "ไม่มีพื้นฐาน", "ฉันกำลังเริ่มต้นจากศูนย์"],
          ["beginner", "ระดับเริ่มต้น", "ฉันรู้พื้นฐานเล็กน้อยหรือเคยลองใช้เครื่องมือง่าย ๆ"],
          ["intermediate", "ระดับปานกลาง", "ฉันสามารถสร้างหรือแก้ปัญหาโปรเจกต์ขนาดเล็กได้"],
          ["advanced", "ระดับสูง", "ฉันทำงานกับซอฟต์แวร์หรือระบบเทคนิคได้อย่างมั่นใจ"]
        ],
        programming: "คุณรู้จักหรือใช้ภาษาโปรแกรมใดหรือไม่?",
        yes: "รู้จัก/ใช้งานได้",
        no: "ยังไม่รู้จัก",
        languages: "คุณรู้จักหรือใช้ภาษาโปรแกรมใดบ้าง?",
        languagesPlaceholder: "เช่น Python, JavaScript, Java"
      },
      {
        label: "เป้าหมาย",
        title: "คุณอยากทำอะไรให้สำเร็จกับ DJAI?",
        intro: "เลือกได้ทุกข้อที่ตรงกับเป้าหมายของคุณ โดยสามารถเลือกได้มากกว่าหนึ่งข้อ",
        goalOptions: [
          ["app", "สร้างแอป"],
          ["game", "สร้างเกม"],
          ["work", "นำ AI ไปใช้ในงานหรือธุรกิจ"],
          ["income", "สร้างโอกาสทางรายได้ด้วย AI"],
          ["startup", "เริ่มต้นบริษัทเทคโนโลยีของตนเอง"],
          ["other", "เป้าหมายอื่น"]
        ],
        other: "บอกเราเพิ่มเติมเกี่ยวกับเป้าหมายของคุณ",
        otherPlaceholder: "อธิบายเป้าหมายของคุณ"
      },
      {
        label: "คำมั่นสัญญา",
        title: "คำมั่นสัญญาในการเรียนรู้ของฉัน",
        intro: "การเติบโตที่มีความหมายเกิดจากความอยากรู้ การลงมือทำ และความพยายาม กรุณาให้คำมั่นสัญญานี้กับตัวคุณเอง",
        declaration: [
          "ฉันจะรับผิดชอบต่อการเรียนรู้และความก้าวหน้าของตนเอง",
          "ฉันจะมุ่งมั่นต่อเป้าหมายที่เลือกไว้ให้กับตนเอง",
          "เมื่อพบปัญหา ฉันจะตั้งคำถาม ลองใหม่ และไม่ยอมแพ้ง่าย ๆ",
          "ฉันเข้าใจว่าการสร้างสิ่งต่าง ๆ ด้วย AI และ Vibe Coding เป็นทักษะที่พัฒนาได้จากการฝึกฝนอย่างสม่ำเสมอ"
        ],
        agreement: "ฉันยอมรับคำมั่นสัญญาของผู้เรียน DJAI Academy และพร้อมเริ่มต้นเรียนรู้",
        enter: "ยอมรับและเข้าสู่ Academy"
      }
    ]
  }
};

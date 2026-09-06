import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";
import styles from "./page.module.css";

const APP_PATH = "/Cam_PDF_Scan_Signer_QR-Gen/";
const PRIVACY_PATH = APP_PATH + "privacy/";
const THAI_PATH = PRIVACY_PATH + "th/";

const en = {
  title: "Privacy Policy for Cam PDF Scan Signer QR Gen",
  date: "Effective date: September 6, 2026 · Last updated: September 6, 2026",
  intro: [
    "DEEJAI LAB Co ., Ltd, company registration number 0105569117953, operating under the brand DJAI Academy (\"DJAI\", \"we\", \"us\", or \"our\"), provides Cam PDF Scan Signer QR Gen (the \"App\"). This policy explains what information is processed when you use the App, why it is processed, who may receive it, how long it is kept, and the controls available to you.",
    "This revision describes the Android release distributed through Google Play under package name com.djai.campdfscan. It does not claim coverage for an iOS release or platform features that have not been verified in the current production source."
  ],
  sections: [
    {
      title: "Important summary",
      lists: [[
        "Scans, imported files, signatures, annotations, OCR text, QR-code content, and generated files are primarily processed and stored on your device.",
        "DJAI stores limited account, usage, survey, notification, consent, and reward data in Firebase when you use connected App features.",
        "The Android App uses Firebase Analytics, Google Mobile Ads, Google's consent tools, Firebase App Check with Play Integrity, and Sentry diagnostics.",
        "You can delete your account in the App or request deletion through https://www.djai.academy/Cam_PDF_Scan_Signer_QR-Gen/delete-account/."
      ]]
    },
    {
      title: "Documents and media on your device",
      paragraphs: [
        "The App performs scanning, image editing, signatures, annotations, OCR, QR-code creation and reading, media processing, and export work in App-controlled storage on your device. DJAI does not intentionally upload your document pages, imported files, signatures, annotations, OCR text, QR payloads, or generated files to its account database.",
        "Content leaves the App when you choose a system action such as sharing, printing, saving to another folder or photo library, or opening the content in another app. The destination you select then processes that content under its own privacy practices.",
        "The App may create temporary working files during import, editing, recognition, conversion, or export. Saved projects and exported copies remain until you delete them, clear the App's storage, use an applicable cleanup option, or uninstall the App. Android App backup is disabled by the App.",
        "Diagnostic reporting is separate from document storage. As explained in Section 8, an error event may contain technical context generated during an operation. DJAI does not use diagnostic reporting to access or reconstruct your documents."
      ]
    },
    {
      title: "Account and authentication information",
      paragraphs: [
        "An account is required for connected usage allowances, rewards, preferences, and account controls. Firebase Authentication and DJAI's Firebase backend may process:"
      ],
      lists: [[
        "your Firebase user identifier;",
        "your email address and email-verification status;",
        "your display name;",
        "your sign-in method, currently email/password or Google sign-in;",
        "authentication tokens, login and password-reset events, timestamps, IP address, device information, and security signals processed by Firebase;",
        "the versions and acceptance time of the Terms, Privacy Policy, and required consent; and",
        "account creation, update, and profile-preference timestamps."
      ]],
      closing: ["Firebase Authentication handles passwords. DJAI does not store or receive your plain-text password."]
    },
    {
      title: "App usage, allowances, quests, and rewards",
      paragraphs: [
        "To apply free usage limits and rewards consistently, DJAI may store your weekly allowance period, used and remaining exports, pending export reservations, completed export identifiers, rewarded credits, quest completion state, and synchronization timestamps.",
        "For rewarded advertisements, Google Mobile Ads may receive a pseudonymous account value and reward-purpose marker. DJAI's Firebase function receives Google's signed reward callback, including transaction, ad-unit, reward, timestamp, and verification information, so it can reject duplicate or invalid rewards and credit the correct account.",
        "Firebase Analytics separately records limited events such as feature opened, export completed, sign-in method, registration completed, preference changes, and quest completion as described in Section 7."
      ]
    },
    {
      title: "Optional preference survey",
      paragraphs: ["If you voluntarily complete the in-App reward survey, DJAI stores the answers under your Firebase user identifier. The survey currently asks for:"],
      lists: [[
        "your display name;",
        "your age bracket;",
        "your gender selection;",
        "your country or region;",
        "your broad profession;",
        "your primary use of the App;",
        "whether the use is personal, work, education, or a combination;",
        "how you discovered the App;",
        "whether you drive;",
        "your vehicle preference; and",
        "the survey completion time."
      ]],
      closing: [
        "The survey is optional for using the App but may be required to earn the related survey reward. DJAI uses the answers for product planning, feature prioritization, and aggregated product analysis. The answers are not configured as Firebase Analytics user properties and are not sent to Google Mobile Ads by the survey submission function.",
        "You can request correction or deletion of survey information by emailing contact@djai.academy. Deleting your App account also deletes the active survey record."
      ]
    },
    {
      title: "Advertising and consent choices",
      paragraphs: ["The Android App uses Google Mobile Ads and Google's User Messaging Platform. Depending on your region, consent choice, device settings, and Remove Ads status, Google may process:"],
      lists: [[
        "advertising, app-instance, and device identifiers;",
        "IP address and approximate location derived from it;",
        "device model, operating system, language, App version, network, and diagnostic information;",
        "consent choices;",
        "ad requests, impressions, interactions, frequency, and fraud signals; and",
        "information used to deliver, limit, measure, secure, or personalize advertising where legally permitted."
      ]],
      closing: [
        "The App does not request precise-location permission for advertising. Where Google's privacy-options interface is available, you can open it from the App to review or change available advertising choices. Contextual or non-personalized ads may still use limited device, approximate-location, measurement, frequency, and fraud-prevention information.",
        "DJAI does not intentionally send scanned pages, signatures, OCR text, annotations, or QR payloads to Google Mobile Ads."
      ]
    },
    {
      title: "Firebase Analytics",
      paragraphs: [
        "Firebase Analytics is enabled in the current Android release. It may process a Firebase user identifier, app-instance and device identifiers, App version, device model, operating-system version, language or region, approximate country, session information, feature interactions, sign-in method, export completion, quest completion, and other technical events.",
        "DJAI uses this information to understand feature use, diagnose product problems, prevent abuse, and improve the App. Analytics events are designed not to contain document pages, OCR text, QR payloads, signatures, user-selected file contents, passwords, authentication tokens, or payment-card information.",
        "The current App does not provide a separate Firebase Analytics switch. Advertising privacy choices do not necessarily disable Firebase Analytics. You may request deletion of account-linked information as described below; Firebase may retain aggregated or provider-controlled analytics according to its own retention rules."
      ]
    },
    {
      title: "Crash reports and diagnostics",
      paragraphs: [
        "When a production release is configured with Sentry, Sentry may receive App and release version, timestamps, device and operating-system details, session information, stack traces, error types, performance measurements, network-request status, and technical error context. DJAI may associate Sentry diagnostics with a pseudonymous Firebase user identifier.",
        "Before a Sentry event is sent, the current App removes the device-name field. It does not currently remove every possible path or filename from all exception text. An error generated during a file operation may incidentally contain a local file path, file URI, or filename. DJAI does not intentionally attach document contents, OCR text, QR payloads, signatures, passwords, authentication tokens, or payment-card information to Sentry events.",
        "If a release is not configured with a Sentry DSN, that release sends no Sentry events."
      ]
    },
    {
      title: "Email preferences and notifications",
      paragraphs: [
        "DJAI stores your optional promotional-email and marketing-notification preferences with your account. Choosing not to receive promotional communications does not prevent essential account or security messages.",
        "If you enable push notifications, Firebase Cloud Messaging and DJAI may process your Firebase user identifier, Android notification token, permission and preference status, and update time. When you disable push notifications in the App, the backend marks the preference disabled and replaces the stored token with a null value. You can also revoke notification permission in Android settings."
      ]
    },
    {
      title: "Google Play purchase",
      paragraphs: [
        "The Android App offers an optional one-time Remove Ads product through Google Play. Google Play processes payment details, billing-account information, purchase and order records, tax, refunds, and payment-risk information under Google's terms. DJAI does not receive your full payment-card or bank-account details.",
        "The App uses the Google Play billing interface to request the product, receive purchase status, acknowledge a completed purchase, restore eligible purchases, and store a local ads-removed entitlement on the device. The current Android release does not send a separate purchase record to DJAI's backend.",
        "Deleting your App account does not cancel, refund, or erase Google Play's transaction record. You must use Google Play's purchase-management and refund controls for those actions. Clearing App storage or changing devices may require the App to query Google Play again to restore an eligible purchase."
      ]
    },
    {
      title: "Permissions and device features",
      paragraphs: ["Depending on the feature you choose, the App may use:"],
      lists: [[
        "Camera: to scan documents and QR codes.",
        "System photo and document pickers: to access only the files or photos you select.",
        "Biometric or device authentication: for optional App Lock; the operating system performs the match and the App receives only the result.",
        "Notifications: for optional marketing notifications and user-initiated functional notices.",
        "Network access: for accounts, Firebase functions, App Check, Analytics, diagnostics, advertising, purchases, reward verification, and messaging.",
        "Advertising identifier and related device signals: for advertising, measurement, frequency limiting, consent, and fraud prevention through Google services."
      ]],
      closing: ["The App does not request microphone, precise-location, contacts, all-files, overlay, or app-installation permission. QR contact, email, Wi-Fi, phone, SMS, location-text, and similar payloads are created from information you enter and remain on the device unless you choose to share or open them."]
    },
    {
      title: "How and why information is used",
      lists: [[
        "to create, authenticate, recover, maintain, and delete accounts;",
        "to provide connected allowances, exports, quests, rewards, preferences, notifications, and support;",
        "to show, measure, limit, and secure advertising;",
        "to recognize an eligible Remove Ads purchase on the device;",
        "to understand feature usage and improve reliability;",
        "to diagnose failures and prevent fraud, abuse, duplicate rewards, and unauthorized requests;",
        "to respond to support and privacy requests;",
        "to send optional promotional communications when selected; and",
        "to comply with legal obligations and protect DJAI's and users' rights."
      ]],
      closing: ["Where applicable law requires a legal basis, DJAI relies on performance of the service agreement, legitimate interests in operating and securing the App, consent where required for optional processing, and compliance with legal obligations. You may withdraw optional consent, but withdrawal does not affect earlier lawful processing or processing required on another legal basis."]
    },
    {
      title: "Service providers, sharing, and transfers",
      paragraphs: ["DJAI does not sell your document content, survey answers, or account profile for money. DJAI shares information only for the purposes described here, including with:"],
      lists: [[
        "Google Firebase for authentication, Firestore database, Cloud Functions, Analytics, Cloud Messaging, and App Check;",
        "Google Play for Android distribution and the Remove Ads purchase;",
        "Google Mobile Ads and User Messaging Platform for advertising, consent management, measurement, fraud prevention, and rewarded-ad verification;",
        "Sentry for crash reporting and diagnostics when configured;",
        "professional advisers and operational providers subject to appropriate duties; and",
        "authorities, successors, or other parties when required by law or reasonably necessary to protect rights, safety, security, or the service."
      ]],
      closing: [
        "Some laws may describe advertising disclosures as sharing or targeted advertising even when no money is exchanged. Where required and available, advertising choices are provided through the App or Google's consent interface.",
        "Providers may process information outside your country, including in the United States. Where they act on DJAI's behalf, DJAI uses their contractual and legal data-protection terms and expects them to protect the information consistently with applicable law. Google privacy information is available at https://policies.google.com/privacy and https://policies.google.com/technologies/ads. Firebase privacy information is available at https://firebase.google.com/support/privacy. Sentry's privacy policy is available at https://sentry.io/privacy/."
      ]
    },
    {
      title: "Retention",
      lists: [[
        "Documents, projects, recent QR history, and exported files on your device remain until you delete them, clear App storage, use an applicable cleanup option, or uninstall the App.",
        "Active Firebase account, profile, consent, usage, survey, notification-preference, quest, and reward records are generally kept while your account is active and as needed to operate the connected service.",
        "When App account deletion succeeds, DJAI deletes the active Firebase Authentication user and the active account-linked records described in Section 14. The current backend does not create a separate post-deletion account guard.",
        "Google Play retains purchase and payment records under Google's rules. DJAI's current backend does not maintain a separate purchase ledger for the App.",
        "Firebase, Google Mobile Ads, and Sentry may retain provider-controlled logs, backups, analytics, advertising, security, and diagnostic records under their configured retention periods, terms, and legal obligations.",
        "DJAI may retain information when specifically required by law or necessary to address security, fraud, disputes, or enforceable claims, and will limit that retention to the relevant purpose."
      ]]
    },
    {
      title: "Account deletion, choices, and privacy rights",
      paragraphs: [
        "You can delete your account in the Android App through Me → Account and consent → Delete account. For security, Firebase may require a recent sign-in. You can also request deletion through https://www.djai.academy/Cam_PDF_Scan_Signer_QR-Gen/delete-account/.",
        "When deletion succeeds, DJAI deletes the Firebase Authentication user and the active Firestore profile, consent and marketing preferences, usage and quest state, survey, notification-token record, rewarded-ad verification records, and reward balance associated with the Firebase user identifier.",
        "Account deletion does not delete files stored on your device, copies already exported or shared, Google Play transaction records, or provider-controlled analytics, security logs, and backups. Delete local files through the App or Android storage and manage Play transactions through Google Play.",
        "Depending on applicable law, you may request access, correction, deletion, restriction, portability, or objection; withdraw consent; or complain to a data-protection authority. Email contact@djai.academy to exercise a right not available in the App. DJAI may verify your identity before responding."
      ]
    },
    {
      title: "Security",
      paragraphs: [
        "DJAI uses reasonable technical and organizational measures including encrypted network transport, Firebase Authentication, owner-scoped database rules, App-Check-protected Firebase functions, Play Integrity for Android release attestation, transactional updates for usage and rewards, Android backup restrictions, and optional device authentication for App Lock.",
        "No method of storage or transmission is completely secure. Keep your device protected, review sensitive exports before sharing them, and send no document files, passwords, or identity documents when requesting support unless DJAI specifically provides a secure and necessary process."
      ]
    },
    {
      title: "Children",
      paragraphs: [
        "The App is a general productivity utility and is not directed to children under 13. A person under 13 should not create an account or submit the survey. If local law sets a higher minimum age for independent consent, that higher age applies unless valid permission is provided as required by law.",
        "Contact contact@djai.academy if you believe a child provided personal information improperly so DJAI can investigate and delete it where required."
      ]
    },
    {
      title: "Changes to this policy",
      paragraphs: ["DJAI may update this policy when the App, its providers, or legal requirements change. The current version will be published at https://www.djai.academy/Cam_PDF_Scan_Signer_QR-Gen/privacy/ with a new last-updated date. DJAI will provide additional notice or request renewed consent when required."]
    },
    {
      title: "Contact",
      paragraphs: [
        "DEEJAI LAB Co ., Ltd\nCompany registration number: 0105569117953\nOperating brand: DJAI Academy\nWebsite: https://www.djai.academy/\nPrivacy and support email: contact@djai.academy",
        "Related pages:"
      ],
      lists: [[
        "Terms of Service: https://www.djai.academy/Cam_PDF_Scan_Signer_QR-Gen/terms/",
        "Account deletion: https://www.djai.academy/Cam_PDF_Scan_Signer_QR-Gen/delete-account/"
      ]]
    }
  ],
  relatedLabel: "Related app links",
  related: ["Return to the app page", "Terms of Service", "Delete an account", "View app-ads.txt"]
};

const th = {
  title: "นโยบายความเป็นส่วนตัวสำหรับ Cam PDF Scan Signer QR Gen",
  date: "วันที่มีผลบังคับใช้: 6 กันยายน 2026 · ปรับปรุงล่าสุด: 6 กันยายน 2026",
  intro: [
    "DEEJAI LAB Co ., Ltd เลขทะเบียนนิติบุคคล 0105569117953 ซึ่งดำเนินงานภายใต้แบรนด์ DJAI Academy (\"DJAI\", \"เรา\" หรือ \"ของเรา\") เป็นผู้ให้บริการ Cam PDF Scan Signer QR Gen (\"แอป\") นโยบายนี้อธิบายว่าแอปประมวลผลข้อมูลใด เหตุใดจึงประมวลผล ใครอาจได้รับข้อมูล เก็บข้อมูลไว้นานเพียงใด และคุณมีวิธีควบคุมข้อมูลอย่างไร",
    "นโยบายฉบับนี้อธิบายรุ่น Android ที่เผยแพร่ผ่าน Google Play ภายใต้ชื่อแพ็กเกจ com.djai.campdfscan และไม่ได้อ้างว่าครอบคลุมรุ่น iOS หรือความสามารถของแพลตฟอร์มที่ยังไม่ได้รับการยืนยันใน source code ของรุ่นเผยแพร่ปัจจุบัน"
  ],
  sections: [
    {
      title: "สรุปสำคัญ",
      lists: [[
        "ไฟล์สแกน ไฟล์ที่นำเข้า ลายเซ็น คำอธิบายประกอบ ข้อความ OCR เนื้อหา QR Code และไฟล์ที่สร้างขึ้น จะประมวลผลและจัดเก็บบนอุปกรณ์ของคุณเป็นหลัก",
        "DJAI เก็บข้อมูลบัญชี การใช้งาน แบบสำรวจ การแจ้งเตือน ความยินยอม และรางวัลใน Firebase เท่าที่จำเป็นสำหรับฟังก์ชันที่เชื่อมต่อกับระบบ",
        "แอป Android ใช้ Firebase Analytics, Google Mobile Ads, เครื่องมือความยินยอมของ Google, Firebase App Check ร่วมกับ Play Integrity และ Sentry",
        "คุณสามารถลบบัญชีในแอป หรือส่งคำขอผ่าน https://www.djai.academy/Cam_PDF_Scan_Signer_QR-Gen/delete-account/."
      ]]
    },
    {
      title: "เอกสารและสื่อบนอุปกรณ์ของคุณ",
      paragraphs: [
        "แอปดำเนินการสแกน แก้ไขภาพ ลงลายเซ็น เพิ่มคำอธิบายประกอบ ทำ OCR สร้างและอ่าน QR Code ประมวลผลสื่อ และส่งออกไฟล์ในพื้นที่จัดเก็บที่แอปควบคุมบนอุปกรณ์ของคุณ DJAI ไม่มีเจตนาอัปโหลดหน้าเอกสาร ไฟล์ที่นำเข้า ลายเซ็น คำอธิบายประกอบ ข้อความ OCR ข้อมูล QR หรือไฟล์ที่สร้างขึ้นไปยังฐานข้อมูลบัญชีของเรา",
        "เนื้อหาจะออกจากแอปเมื่อคุณเลือกคำสั่งของระบบ เช่น แชร์ พิมพ์ บันทึกไปยังโฟลเดอร์หรือคลังรูปภาพอื่น หรือเปิดด้วยแอปอื่น ปลายทางที่คุณเลือกจะประมวลผลเนื้อหาตามแนวปฏิบัติด้านความเป็นส่วนตัวของปลายทางนั้น",
        "แอปอาจสร้างไฟล์ชั่วคราวระหว่างนำเข้า แก้ไข รับรู้ข้อมูล แปลง หรือส่งออก โปรเจกต์ที่บันทึกและสำเนาที่ส่งออกจะอยู่จนกว่าคุณจะลบ ล้างพื้นที่จัดเก็บของแอป ใช้ตัวเลือกล้างข้อมูลที่เกี่ยวข้อง หรือถอนการติดตั้ง แอปปิดการสำรองข้อมูลของแอปบน Android",
        "การรายงานข้อผิดพลาดแยกจากการจัดเก็บเอกสาร ตามที่อธิบายในข้อ 8 เหตุการณ์ข้อผิดพลาดอาจมีบริบททางเทคนิคที่เกิดขึ้นระหว่างการทำงาน DJAI ไม่ใช้ข้อมูลวินิจฉัยเพื่อเข้าถึงหรือสร้างเอกสารของคุณขึ้นใหม่"
      ]
    },
    {
      title: "ข้อมูลบัญชีและการยืนยันตัวตน",
      paragraphs: ["จำเป็นต้องมีบัญชีสำหรับโควตาการใช้งาน รางวัล การตั้งค่า และการควบคุมบัญชีที่เชื่อมต่อกับระบบ Firebase Authentication และ backend ของ DJAI บน Firebase อาจประมวลผล:"],
      lists: [[
        "รหัสผู้ใช้ Firebase",
        "อีเมลและสถานะการยืนยันอีเมล",
        "ชื่อที่แสดง",
        "วิธีลงชื่อเข้าใช้ ซึ่งปัจจุบันคืออีเมลและรหัสผ่าน หรือ Google",
        "โทเค็นยืนยันตัวตน เหตุการณ์เข้าสู่ระบบและรีเซ็ตรหัสผ่าน เวลา IP address ข้อมูลอุปกรณ์ และสัญญาณความปลอดภัยที่ Firebase ประมวลผล",
        "เวอร์ชันและเวลาที่ยอมรับข้อกำหนด นโยบายความเป็นส่วนตัว และความยินยอมที่จำเป็น และ",
        "เวลาสร้างบัญชี ปรับปรุงบัญชี และแก้ไขการตั้งค่าโปรไฟล์"
      ]],
      closing: ["Firebase Authentication เป็นผู้จัดการรหัสผ่าน DJAI ไม่จัดเก็บหรือได้รับรหัสผ่านแบบข้อความธรรมดาของคุณ"]
    },
    {
      title: "การใช้งาน โควตา ภารกิจ และรางวัล",
      paragraphs: [
        "เพื่อใช้ข้อจำกัดการใช้งานฟรีและรางวัลอย่างสม่ำเสมอ DJAI อาจเก็บรอบโควตารายสัปดาห์ จำนวนการส่งออกที่ใช้และเหลือ การจองการส่งออกที่รอดำเนินการ รหัสงานที่เสร็จแล้ว เครดิตจากโฆษณา สถานะภารกิจ และเวลาซิงค์",
        "สำหรับโฆษณาแบบมีรางวัล Google Mobile Ads อาจได้รับค่าบัญชีแบบนามแฝงและตัวบ่งชี้วัตถุประสงค์ของรางวัล ฟังก์ชัน Firebase ของ DJAI รับ callback รางวัลที่ Google ลงนาม ซึ่งรวมถึงรหัสธุรกรรม หน่วยโฆษณา รางวัล เวลา และข้อมูลยืนยัน เพื่อปฏิเสธรางวัลซ้ำหรือไม่ถูกต้องและเพิ่มเครดิตให้บัญชีที่ถูกต้อง",
        "Firebase Analytics บันทึกเหตุการณ์ในขอบเขตจำกัด เช่น การเปิดฟีเจอร์ การส่งออกสำเร็จ วิธีลงชื่อเข้าใช้ การลงทะเบียนสำเร็จ การเปลี่ยนการตั้งค่า และการทำภารกิจสำเร็จ ตามข้อ 7"
      ]
    },
    {
      title: "แบบสำรวจความต้องการที่เป็นทางเลือก",
      paragraphs: ["หากคุณเลือกทำแบบสำรวจรางวัลในแอป DJAI จะเก็บคำตอบภายใต้รหัสผู้ใช้ Firebase แบบสำรวจปัจจุบันถาม:"],
      lists: [[
        "ชื่อที่แสดง",
        "ช่วงอายุที่คุณเลือก",
        "เพศที่คุณเลือก",
        "ประเทศหรือภูมิภาค",
        "กลุ่มอาชีพ",
        "วัตถุประสงค์หลักในการใช้แอป",
        "ใช้เพื่อเรื่องส่วนตัว งาน การศึกษา หรือหลายวัตถุประสงค์",
        "คุณรู้จักแอปได้อย่างไร",
        "คุณขับรถหรือไม่",
        "ประเภทยานพาหนะที่ชอบ และ",
        "เวลาที่ทำแบบสำรวจเสร็จ"
      ]],
      closing: [
        "แบบสำรวจเป็นทางเลือกสำหรับการใช้แอป แต่อาจจำเป็นหากต้องการรับรางวัลของแบบสำรวจ DJAI ใช้คำตอบเพื่อวางแผนผลิตภัณฑ์ จัดลำดับฟีเจอร์ และวิเคราะห์ภาพรวม คำตอบไม่ได้ถูกตั้งเป็น Firebase Analytics user property และฟังก์ชันส่งแบบสำรวจไม่ได้ส่งคำตอบไปยัง Google Mobile Ads",
        "คุณขอแก้ไขหรือลบข้อมูลแบบสำรวจได้ทาง contact@djai.academy การลบบัญชีแอปจะลบบันทึกแบบสำรวจที่ใช้งานอยู่ด้วย"
      ]
    },
    {
      title: "โฆษณาและตัวเลือกความยินยอม",
      paragraphs: ["แอป Android ใช้ Google Mobile Ads และ User Messaging Platform ของ Google โดยขึ้นอยู่กับภูมิภาค ตัวเลือกความยินยอม การตั้งค่าอุปกรณ์ และสถานะ Remove Ads, Google อาจประมวลผล:"],
      lists: [[
        "รหัสโฆษณา รหัส app instance และรหัสอุปกรณ์",
        "IP address และตำแหน่งโดยประมาณที่อนุมานจาก IP",
        "รุ่นอุปกรณ์ ระบบปฏิบัติการ ภาษา เวอร์ชันแอป เครือข่าย และข้อมูลวินิจฉัย",
        "ตัวเลือกความยินยอม",
        "คำขอโฆษณา การแสดงผล การโต้ตอบ ความถี่ และสัญญาณการฉ้อโกง และ",
        "ข้อมูลเพื่อส่ง จำกัด วัดผล รักษาความปลอดภัย หรือปรับโฆษณาให้เหมาะกับบุคคลเมื่อกฎหมายอนุญาต"
      ]],
      closing: [
        "แอปไม่ขอสิทธิ์ตำแหน่งที่แม่นยำสำหรับโฆษณา เมื่อหน้าตัวเลือกความเป็นส่วนตัวของ Google เปิดให้ใช้ คุณสามารถเปิดจากแอปเพื่อตรวจสอบหรือเปลี่ยนตัวเลือก โฆษณาตามบริบทหรือแบบไม่เฉพาะบุคคลยังอาจใช้ข้อมูลอุปกรณ์ ตำแหน่งโดยประมาณ การวัดผล ความถี่ และการป้องกันการฉ้อโกงในขอบเขตจำกัด",
        "DJAI ไม่มีเจตนาส่งหน้าเอกสาร ลายเซ็น ข้อความ OCR คำอธิบายประกอบ หรือข้อมูล QR ไปยัง Google Mobile Ads"
      ]
    },
    {
      title: "Firebase Analytics",
      paragraphs: [
        "Firebase Analytics เปิดใช้งานในรุ่น Android ปัจจุบัน และอาจประมวลผลรหัสผู้ใช้ Firebase, app instance และรหัสอุปกรณ์ เวอร์ชันแอป รุ่นอุปกรณ์ เวอร์ชันระบบปฏิบัติการ ภาษา หรือภูมิภาค ประเทศโดยประมาณ ข้อมูลเซสชัน การใช้งานฟีเจอร์ วิธีลงชื่อเข้าใช้ การส่งออกสำเร็จ การทำภารกิจสำเร็จ และเหตุการณ์ทางเทคนิคอื่น",
        "DJAI ใช้ข้อมูลนี้เพื่อทำความเข้าใจการใช้งาน วินิจฉัยปัญหา ป้องกันการใช้งานในทางที่ผิด และปรับปรุงแอป เหตุการณ์ Analytics ถูกออกแบบไม่ให้มีหน้าเอกสาร ข้อความ OCR ข้อมูล QR ลายเซ็น เนื้อหาไฟล์ที่ผู้ใช้เลือก รหัสผ่าน โทเค็นยืนยันตัวตน หรือข้อมูลบัตรชำระเงิน",
        "แอปปัจจุบันไม่มีสวิตช์ปิด Firebase Analytics แยกต่างหาก ตัวเลือกความเป็นส่วนตัวของโฆษณาอาจไม่ปิด Firebase Analytics คุณขอลบข้อมูลที่เชื่อมกับบัญชีได้ตามที่อธิบายด้านล่าง แต่ Firebase อาจเก็บข้อมูลรวม หรือข้อมูลที่อยู่ภายใต้การควบคุมของผู้ให้บริการตามกฎการเก็บรักษาของตน"
      ]
    },
    {
      title: "รายงานข้อขัดข้องและข้อมูลวินิจฉัย",
      paragraphs: [
        "เมื่อรุ่นเผยแพร่กำหนดค่า Sentry, Sentry อาจได้รับเวอร์ชันแอปและรุ่นเผยแพร่ เวลา รายละเอียดอุปกรณ์และระบบปฏิบัติการ ข้อมูลเซสชัน stack trace ประเภทข้อผิดพลาด การวัดประสิทธิภาพ สถานะคำขอเครือข่าย และบริบทข้อผิดพลาดทางเทคนิค DJAI อาจเชื่อมข้อมูล Sentry กับรหัสผู้ใช้ Firebase แบบนามแฝง",
        "ก่อนส่งเหตุการณ์ Sentry แอปปัจจุบันจะลบช่องชื่ออุปกรณ์ แต่ยังไม่ได้ลบทุกเส้นทางหรือชื่อไฟล์ที่อาจอยู่ในข้อความ exception ทั้งหมด ข้อผิดพลาดระหว่างทำงานกับไฟล์อาจมีเส้นทางไฟล์ URI ของไฟล์ หรือชื่อไฟล์ติดไปโดยไม่ตั้งใจ DJAI ไม่มีเจตนาแนบเนื้อหาเอกสาร ข้อความ OCR ข้อมูล QR ลายเซ็น รหัสผ่าน โทเค็นยืนยันตัวตน หรือข้อมูลบัตรชำระเงินไปกับเหตุการณ์ Sentry",
        "หากรุ่นใดไม่ได้กำหนดค่า Sentry DSN รุ่นนั้นจะไม่ส่งเหตุการณ์ไปยัง Sentry"
      ]
    },
    {
      title: "การตั้งค่าอีเมลและการแจ้งเตือน",
      paragraphs: [
        "DJAI เก็บตัวเลือกอีเมลส่งเสริมการขายและการแจ้งเตือนการตลาดไว้กับบัญชี การไม่รับข้อความส่งเสริมการขายไม่ขัดขวางข้อความสำคัญเกี่ยวกับบัญชีหรือความปลอดภัย",
        "หากเปิด push notification, Firebase Cloud Messaging และ DJAI อาจประมวลผลรหัสผู้ใช้ Firebase, Android notification token, สถานะสิทธิ์และการตั้งค่า และเวลาปรับปรุง เมื่อปิด push notification ในแอป backend จะตั้งค่าสถานะเป็นปิดและแทนที่ token ที่เก็บไว้ด้วยค่า null คุณยังเพิกถอนสิทธิ์แจ้งเตือนในการตั้งค่า Android ได้"
      ]
    },
    {
      title: "การซื้อผ่าน Google Play",
      paragraphs: [
        "แอป Android มีผลิตภัณฑ์ Remove Ads แบบซื้อครั้งเดียวผ่าน Google Play, Google Play ประมวลผลข้อมูลชำระเงิน บัญชีเรียกเก็บเงิน ประวัติการซื้อและคำสั่งซื้อ ภาษี การคืนเงิน และความเสี่ยงด้านการชำระเงินตามข้อกำหนดของ Google, DJAI ไม่ได้รับรายละเอียดบัตรหรือบัญชีธนาคารแบบเต็มของคุณ",
        "แอปใช้ระบบเรียกเก็บเงินของ Google Play เพื่อขอซื้อสินค้า รับสถานะการซื้อ ยืนยันการซื้อที่เสร็จแล้ว กู้คืนการซื้อที่เข้าเกณฑ์ และเก็บสิทธิ์ลบโฆษณาไว้ในอุปกรณ์ รุ่น Android ปัจจุบันไม่ส่งบันทึกการซื้อแยกต่างหากไปยัง backend ของ DJAI",
        "การลบบัญชีแอปไม่ได้ยกเลิก คืนเงิน หรือลบประวัติธุรกรรมของ Google Play คุณต้องใช้ระบบจัดการการซื้อและคืนเงินของ Google Play การล้างพื้นที่จัดเก็บหรือเปลี่ยนอุปกรณ์อาจทำให้แอปต้องตรวจสอบ Google Play อีกครั้งเพื่อกู้คืนการซื้อที่เข้าเกณฑ์"
      ]
    },
    {
      title: "สิทธิ์และฟีเจอร์ของอุปกรณ์",
      paragraphs: ["แอปอาจใช้สิ่งต่อไปนี้ตามฟีเจอร์ที่คุณเลือก:"],
      lists: [[
        "กล้อง: เพื่อสแกนเอกสารและ QR Code",
        "ตัวเลือกรูปภาพและเอกสารของระบบ: เพื่อเข้าถึงเฉพาะไฟล์หรือรูปที่คุณเลือก",
        "การยืนยันตัวตนด้วยไบโอเมตริกหรืออุปกรณ์: สำหรับ App Lock ที่เป็นทางเลือก ระบบปฏิบัติการเป็นผู้ตรวจสอบและแอปได้รับเฉพาะผลลัพธ์",
        "การแจ้งเตือน: สำหรับข้อความการตลาดที่เป็นทางเลือกและการแจ้งเตือนการทำงานที่ผู้ใช้เริ่ม",
        "เครือข่าย: สำหรับบัญชี ฟังก์ชัน Firebase, App Check, Analytics, การวินิจฉัย โฆษณา การซื้อ การยืนยันรางวัล และการส่งข้อความ",
        "รหัสโฆษณาและสัญญาณอุปกรณ์ที่เกี่ยวข้อง: สำหรับโฆษณา การวัดผล การจำกัดความถี่ ความยินยอม และการป้องกันการฉ้อโกงผ่านบริการ Google"
      ]],
      closing: ["แอปไม่ขอสิทธิ์ไมโครโฟน ตำแหน่งที่แม่นยำ รายชื่อติดต่อ การเข้าถึงไฟล์ทั้งหมด overlay หรือการติดตั้งแอป ข้อมูล QR สำหรับรายชื่อติดต่อ อีเมล Wi-Fi โทรศัพท์ SMS ข้อความตำแหน่ง และข้อมูลคล้ายกันจะสร้างจากข้อมูลที่คุณป้อนและอยู่บนอุปกรณ์ เว้นแต่คุณเลือกแชร์หรือเปิด"]
    },
    {
      title: "วิธีและเหตุผลที่เราใช้ข้อมูล",
      lists: [[
        "สร้าง ยืนยัน กู้คืน ดูแล และลบบัญชี",
        "ให้บริการโควตา การส่งออก ภารกิจ รางวัล การตั้งค่า การแจ้งเตือน และการช่วยเหลือที่เชื่อมกับระบบ",
        "แสดง วัดผล จำกัด และรักษาความปลอดภัยของโฆษณา",
        "รับรู้การซื้อ Remove Ads ที่เข้าเกณฑ์บนอุปกรณ์",
        "ทำความเข้าใจการใช้ฟีเจอร์และปรับปรุงความเสถียร",
        "วินิจฉัยความล้มเหลวและป้องกันการฉ้อโกง การใช้งานในทางที่ผิด รางวัลซ้ำ และคำขอที่ไม่ได้รับอนุญาต",
        "ตอบคำขอช่วยเหลือและคำขอด้านความเป็นส่วนตัว",
        "ส่งข้อความส่งเสริมการขายที่เป็นทางเลือกเมื่อคุณเลือก และ",
        "ปฏิบัติตามกฎหมายและคุ้มครองสิทธิของ DJAI และผู้ใช้"
      ]],
      closing: ["เมื่อกฎหมายกำหนดฐานการประมวลผล DJAI อาศัยการปฏิบัติตามสัญญาบริการ ประโยชน์โดยชอบด้วยกฎหมายในการดำเนินงานและรักษาความปลอดภัยของแอป ความยินยอมเมื่อจำเป็นสำหรับการประมวลผลที่เป็นทางเลือก และหน้าที่ตามกฎหมาย คุณถอนความยินยอมที่เป็นทางเลือกได้ แต่ไม่กระทบการประมวลผลที่ชอบด้วยกฎหมายก่อนหน้า หรือการประมวลผลตามฐานอื่น"]
    },
    {
      title: "ผู้ให้บริการ การแบ่งปัน และการโอนข้อมูล",
      paragraphs: ["DJAI ไม่ขายเนื้อหาเอกสาร คำตอบแบบสำรวจ หรือโปรไฟล์บัญชีของคุณเพื่อเงิน DJAI แบ่งปันข้อมูลเฉพาะเพื่อวัตถุประสงค์ที่อธิบายไว้ รวมถึงกับ:"],
      lists: [[
        "Google Firebase สำหรับ Authentication, Firestore, Cloud Functions, Analytics, Cloud Messaging และ App Check",
        "Google Play สำหรับเผยแพร่แอป Android และการซื้อ Remove Ads",
        "Google Mobile Ads และ User Messaging Platform สำหรับโฆษณา การจัดการความยินยอม การวัดผล การป้องกันการฉ้อโกง และการยืนยันโฆษณาแบบมีรางวัล",
        "Sentry สำหรับรายงานข้อขัดข้องและวินิจฉัยเมื่อกำหนดค่า",
        "ที่ปรึกษาวิชาชีพและผู้ให้บริการดำเนินงานซึ่งมีหน้าที่ที่เหมาะสม และ",
        "หน่วยงาน ผู้สืบทอด หรือบุคคลอื่นเมื่อกฎหมายกำหนด หรือจำเป็นอย่างสมเหตุสมผลเพื่อคุ้มครองสิทธิ ความปลอดภัย หรือบริการ"
      ]],
      closing: [
        "กฎหมายบางแห่งอาจเรียกการเปิดเผยข้อมูลโฆษณาว่าเป็นการแบ่งปันหรือโฆษณาแบบกำหนดเป้าหมาย แม้ไม่มีการจ่ายเงิน เมื่อกฎหมายกำหนดและมีเครื่องมือให้ใช้ คุณสามารถจัดการตัวเลือกผ่านแอปหรือหน้าความยินยอมของ Google",
        "ผู้ให้บริการอาจประมวลผลข้อมูลนอกประเทศของคุณ รวมถึงสหรัฐอเมริกา เมื่อประมวลผลในนามของ DJAI เราใช้ข้อกำหนดตามสัญญาและกฎหมายของผู้ให้บริการ และคาดหวังให้ปกป้องข้อมูลตามกฎหมายที่ใช้บังคับ ดูข้อมูลของ Google ที่ https://policies.google.com/privacy และ https://policies.google.com/technologies/ads ข้อมูล Firebase ที่ https://firebase.google.com/support/privacy และนโยบาย Sentry ที่ https://sentry.io/privacy/."
      ]
    },
    {
      title: "ระยะเวลาการเก็บรักษา",
      lists: [[
        "เอกสาร โปรเจกต์ ประวัติ QR ล่าสุด และไฟล์ส่งออกบนอุปกรณ์จะอยู่จนกว่าคุณจะลบ ล้างพื้นที่จัดเก็บ ใช้ตัวเลือกล้างข้อมูลที่เกี่ยวข้อง หรือถอนการติดตั้ง",
        "บัญชี Firebase โปรไฟล์ ความยินยอม การใช้งาน แบบสำรวจ การตั้งค่าแจ้งเตือน ภารกิจ และรางวัลที่ใช้งานอยู่ โดยทั่วไปจะเก็บระหว่างที่บัญชียังใช้งานและตราบเท่าที่จำเป็นต่อบริการที่เชื่อมต่อ",
        "เมื่อลบบัญชีสำเร็จ DJAI จะลบผู้ใช้ Firebase Authentication และบันทึกที่เชื่อมบัญชีซึ่งอธิบายในข้อ 14 โดย backend ปัจจุบันไม่ได้สร้างตัวป้องกันบัญชีหลังการลบแยกต่างหาก",
        "Google Play เก็บบันทึกการซื้อและชำระเงินตามกฎของ Google โดย backend ปัจจุบันของ DJAI ไม่มีบัญชีแยกสำหรับประวัติการซื้อของแอป",
        "Firebase, Google Mobile Ads และ Sentry อาจเก็บ log, backup, analytics, โฆษณา ความปลอดภัย และข้อมูลวินิจฉัยที่ผู้ให้บริการควบคุม ตามระยะเวลาที่ตั้งค่า ข้อกำหนด และหน้าที่ตามกฎหมาย",
        "DJAI อาจเก็บข้อมูลเมื่อกฎหมายกำหนดโดยเฉพาะ หรือจำเป็นต่อความปลอดภัย การฉ้อโกง ข้อพิพาท หรือข้อเรียกร้องที่บังคับใช้ได้ โดยจำกัดไว้ตามวัตถุประสงค์นั้น"
      ]]
    },
    {
      title: "การลบบัญชี ตัวเลือก และสิทธิด้านความเป็นส่วนตัว",
      paragraphs: [
        "คุณลบบัญชีในแอป Android ได้ที่ Me → Account and consent → Delete account เพื่อความปลอดภัย Firebase อาจขอให้ลงชื่อเข้าใช้ใหม่ คุณยังส่งคำขอได้ที่ https://www.djai.academy/Cam_PDF_Scan_Signer_QR-Gen/delete-account/.",
        "เมื่อลบสำเร็จ DJAI จะลบผู้ใช้ Firebase Authentication และโปรไฟล์ Firestore ที่ใช้งานอยู่ ความยินยอมและการตลาด สถานะการใช้งานและภารกิจ แบบสำรวจ บันทึก notification token บันทึกการยืนยันโฆษณาแบบมีรางวัล และยอดรางวัลที่เชื่อมกับรหัสผู้ใช้ Firebase",
        "การลบบัญชีไม่ลบไฟล์บนอุปกรณ์ สำเนาที่ส่งออกหรือแชร์แล้ว ประวัติธุรกรรม Google Play หรือ Analytics, log ความปลอดภัย และ backup ที่ผู้ให้บริการควบคุม โปรดลบไฟล์ในแอปหรือพื้นที่จัดเก็บ Android และจัดการธุรกรรมผ่าน Google Play",
        "ภายใต้กฎหมายที่ใช้บังคับ คุณอาจมีสิทธิขอเข้าถึง แก้ไข ลบ จำกัด โอน หรือคัดค้าน ถอนความยินยอม หรือร้องเรียนต่อหน่วยงานคุ้มครองข้อมูล ส่งอีเมลไปที่ contact@djai.academy เพื่อใช้สิทธิที่ไม่มีในแอป DJAI อาจยืนยันตัวตนก่อนตอบคำขอ"
      ]
    },
    {
      title: "ความปลอดภัย",
      paragraphs: [
        "DJAI ใช้มาตรการทางเทคนิคและองค์กรตามสมควร ได้แก่ การรับส่งข้อมูลแบบเข้ารหัส Firebase Authentication, กฎฐานข้อมูลที่จำกัดตามเจ้าของ ฟังก์ชัน Firebase ที่ปกป้องด้วย App Check, Play Integrity สำหรับรุ่น Android, การอัปเดตแบบ transaction สำหรับการใช้งานและรางวัล การปิด backup ของ Android และการยืนยันตัวตนบนอุปกรณ์สำหรับ App Lock ที่เป็นทางเลือก",
        "ไม่มีวิธีจัดเก็บหรือส่งข้อมูลใดปลอดภัยอย่างสมบูรณ์ โปรดปกป้องอุปกรณ์ ตรวจสอบไฟล์สำคัญก่อนแชร์ และอย่าส่งไฟล์เอกสาร รหัสผ่าน หรือเอกสารยืนยันตัวตนเมื่อขอความช่วยเหลือ เว้นแต่ DJAI จะจัดช่องทางที่ปลอดภัยและจำเป็นไว้โดยเฉพาะ"
      ]
    },
    {
      title: "เด็ก",
      paragraphs: [
        "แอปเป็นเครื่องมือเพิ่มประสิทธิภาพทั่วไปและไม่ได้มุ่งให้บริการแก่เด็กอายุต่ำกว่า 13 ปี ผู้ที่อายุต่ำกว่า 13 ปีไม่ควรสร้างบัญชีหรือส่งแบบสำรวจ หากกฎหมายท้องถิ่นกำหนดอายุขั้นต่ำสำหรับการให้ความยินยอมเองสูงกว่า ให้ใช้อายุที่สูงกว่านั้น เว้นแต่ได้รับอนุญาตอย่างถูกต้องตามกฎหมาย",
        "ติดต่อ contact@djai.academy หากเชื่อว่าเด็กให้ข้อมูลส่วนบุคคลโดยไม่เหมาะสม เพื่อให้ DJAI ตรวจสอบและลบเมื่อกฎหมายกำหนด"
      ]
    },
    {
      title: "การเปลี่ยนแปลงนโยบาย",
      paragraphs: ["DJAI อาจปรับปรุงนโยบายเมื่อแอป ผู้ให้บริการ หรือกฎหมายเปลี่ยนแปลง เวอร์ชันปัจจุบันจะเผยแพร่ที่ https://www.djai.academy/Cam_PDF_Scan_Signer_QR-Gen/privacy/ พร้อมวันที่ปรับปรุงใหม่ และ DJAI จะแจ้งเพิ่มเติมหรือขอความยินยอมใหม่เมื่อกฎหมายกำหนด"]
    },
    {
      title: "ติดต่อเรา",
      paragraphs: [
        "DEEJAI LAB Co ., Ltd\nเลขทะเบียนนิติบุคคล: 0105569117953\nแบรนด์ที่ใช้ดำเนินงาน: DJAI Academy\nเว็บไซต์: https://www.djai.academy/\nอีเมลด้านความเป็นส่วนตัวและฝ่ายช่วยเหลือ: contact@djai.academy",
        "หน้าที่เกี่ยวข้อง:"
      ],
      lists: [[
        "ข้อกำหนดการให้บริการ: https://www.djai.academy/Cam_PDF_Scan_Signer_QR-Gen/terms/",
        "การลบบัญชี: https://www.djai.academy/Cam_PDF_Scan_Signer_QR-Gen/delete-account/"
      ]]
    }
  ],
  relatedLabel: "ลิงก์ที่เกี่ยวข้องกับแอป",
  related: ["กลับไปหน้าแอป", "ข้อกำหนดการให้บริการ", "ลบบัญชี", "ดู app-ads.txt"]
};

const knownLinks = new Set([
  "https://www.djai.academy/",
  "https://www.djai.academy/Cam_PDF_Scan_Signer_QR-Gen/privacy/",
  "https://www.djai.academy/Cam_PDF_Scan_Signer_QR-Gen/terms/",
  "https://www.djai.academy/Cam_PDF_Scan_Signer_QR-Gen/delete-account/",
  "https://policies.google.com/privacy",
  "https://policies.google.com/technologies/ads",
  "https://firebase.google.com/support/privacy",
  "https://sentry.io/privacy/",
  "contact@djai.academy"
]);

const linkPattern = /(https:\/\/www\.djai\.academy\/Cam_PDF_Scan_Signer_QR-Gen\/(?:privacy|terms|delete-account)\/|https:\/\/www\.djai\.academy\/|https:\/\/policies\.google\.com\/(?:privacy|technologies\/ads)|https:\/\/firebase\.google\.com\/support\/privacy|https:\/\/sentry\.io\/privacy\/|contact@djai\.academy)/g;

function LinkedText({ children }) {
  return String(children).split(linkPattern).map((part, index) => {
    if (!knownLinks.has(part)) return part;
    const href = part.includes("@") ? "mailto:" + part : part;
    return <a href={href} key={part + "-" + index}>{part}</a>;
  });
}

function PolicySection({ number, section }) {
  const lists = section.lists || [];
  return (
    <section id={"section-" + number}>
      <h2>{number}. {section.title}</h2>
      <div className={styles.sectionBody}>
        {(section.paragraphs || []).map((paragraph) => (
          <p className={paragraph.includes("\n") ? styles.address : undefined} key={paragraph}>
            <LinkedText>{paragraph}</LinkedText>
          </p>
        ))}
        {lists.map((items, listIndex) => (
          <div className={styles.listGroup} key={number + "-" + listIndex}>
            <ul>
              {items.map((item) => <li key={item}><LinkedText>{item}</LinkedText></li>)}
            </ul>
          </div>
        ))}
        {(section.closing || []).map((paragraph) => <p key={paragraph}><LinkedText>{paragraph}</LinkedText></p>)}
      </div>
    </section>
  );
}

export default function PrivacyPolicyDocument({ locale }) {
  const copy = locale === "th" ? th : en;
  const relatedHrefs = [APP_PATH, APP_PATH + "terms/", APP_PATH + "delete-account/", "/app-ads.txt"];
  const languageHrefs = {
    en: PRIVACY_PATH,
    th: THAI_PATH,
    "zh-CN": `${APP_PATH}zh-cn/privacy/`,
    "zh-TW": `${APP_PATH}zh-tw/privacy/`
  };

  return (
    <>
      <SiteHeader locale={locale} currentRoute="camPdf" languageHrefs={languageHrefs} />
      <main className={styles.page}>
        <header className={styles.hero}>
          <p>Cam PDF Scan Signer QR Gen</p>
          <h1>{copy.title}</h1>
          <span>{copy.date}</span>
        </header>
        <article className={styles.content}>
          <div className={styles.introduction}>
            {copy.intro.map((paragraph) => <p key={paragraph}><LinkedText>{paragraph}</LinkedText></p>)}
          </div>
          {copy.sections.map((section, index) => (
            <PolicySection key={section.title} number={index + 1} section={section} />
          ))}
          <nav className={styles.links} aria-label={copy.relatedLabel}>
            {copy.related.map((label, index) => <a href={relatedHrefs[index]} key={label}>{label}</a>)}
          </nav>
        </article>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}

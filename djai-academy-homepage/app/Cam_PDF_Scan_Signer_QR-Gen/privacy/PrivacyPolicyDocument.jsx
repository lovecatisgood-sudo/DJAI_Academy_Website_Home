import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";
import styles from "./page.module.css";

const APP_PATH = "/Cam_PDF_Scan_Signer_QR-Gen/";
const PRIVACY_PATH = `${APP_PATH}privacy/`;
const THAI_PATH = `${PRIVACY_PATH}th/`;

const en = {
  title: "Privacy Policy for Cam PDF Scan Signer QR Gen",
  date: "Effective date: August 21, 2026 · Last updated: August 21, 2026",
  intro: [
    "DEEJAI LAB Co ., Ltd, company registration number 0105569117953, operating under the brand DJAI Academy (\"DJAI\", \"we\", \"us\", or \"our\"), provides the Cam PDF Scan Signer QR Gen mobile application (the \"App\"). This Privacy Policy explains what information the App processes, why it is processed, when it is shared with service providers, how long it is retained, and the choices and rights available to you.",
    "DEEJAI LAB Co ., Ltd is the legal operator and data controller for the App. DJAI Academy is its operating brand. You can contact us at contact@djai.academy or through https://www.djai.academy/."
  ],
  sections: [
    {
      title: "Documents and media remain on your device",
      paragraphs: [
        "Scanned pages, imported documents and images, OCR text, signatures, annotations, QR-code content, audio, video, and generated PDF, image, text, audio, and video files are processed in app-controlled storage on your device. DJAI does not upload this content to its account database, Firebase Analytics, Google Mobile Ads, or Sentry.",
        "Content leaves the App only when you choose an operating-system action such as sharing, printing, saving to Files, saving to Photos, or opening the content in another app. The receiving app or service then handles that content under its own privacy terms.",
        "The App may create temporary copies while importing, editing, OCR processing, or exporting. It removes temporary output after completion or cancellation where technically possible. Your saved projects remain on your device until you delete them, clear the App's storage, or uninstall the App. If you enable the App's cleanup-after-export option, project source files are removed from the App after a successful export according to that setting."
      ]
    },
    {
      title: "Account information",
      paragraphs: ["An account is required to use the App. Firebase Authentication processes the information needed to create and secure your account, including:"],
      lists: [[
        "your Firebase user identifier;",
        "your email address and email-verification status;",
        "your sign-in provider;",
        "your display name and basic profile information supplied by Google or Apple when you choose those sign-in methods; and",
        "authentication, password-reset, security, and anti-abuse events."
      ], [
        "Firebase user identifier, email address, display name, and sign-in provider;",
        "the Terms, Privacy Policy, and PDPA consent versions and acceptance time;",
        "optional promotional-email and marketing-notification choices;",
        "account creation and update times;",
        "weekly export allowance, use balance, rewarded credits, reservations, and completed-job identifiers needed to apply usage limits exactly once;",
        "quest completion and reward status; and",
        "account-deletion status needed to prevent deleted records from being recreated by an older or already-running request."
      ]],
      listLead: "DJAI stores the following account records in Cloud Firestore:",
      closing: ["We use this information to provide authentication, account recovery, cross-device usage synchronisation, App functionality, fraud prevention, security, support, and account controls."]
    },
    {
      title: "Optional preference survey",
      paragraphs: ["The optional reward survey asks only:"],
      lists: [[
        "your primary use of the App;",
        "whether you use it for personal, work, education, or combined purposes; and",
        "how you discovered the App."
      ]],
      closing: [
        "The answers and completion time are stored in Firestore under your user identifier. Survey answers are used for product planning and aggregated product analysis. They are not sent to Google Mobile Ads and are not configured as Firebase Analytics user properties. You may delete the survey answers from the App without deleting your entire account.",
        "The App does not ask this survey for your age, gender, exact location, income, marital status, children, profession, driving status, or vehicle preference."
      ]
    },
    {
      title: "Analytics",
      paragraphs: [
        "Firebase Analytics may process a pseudonymous Firebase user identifier, app-instance and device identifiers, App version, device model, operating-system version, language or region, broad country derived from network information, feature interactions, sign-in method, export completion, quest completion, and technical events. DJAI uses this information to understand feature use, diagnose product problems, prevent abuse, and improve the App.",
        "Analytics events are designed not to contain document content, OCR text, QR content, signatures, user-selected filenames, passwords, authentication tokens, purchase tokens, or message content. DJAI does not request precise-location permission for analytics."
      ]
    },
    {
      title: "Crash reports and diagnostics",
      paragraphs: [
        "Production releases may use Sentry for crash reporting and technical diagnostics. When Sentry is configured, it may receive timestamps, a pseudonymous Firebase user identifier, App and release version, device and operating-system details, stack traces, error category, performance information, and scrubbed technical context needed to reproduce a failure.",
        "The App sanitises telemetry to remove local file and content URIs, sandbox paths, filenames, request bodies, headers, cookies, query strings, and direct identifiers. DJAI does not intentionally send document content, OCR text, QR payloads, signatures, passwords, authentication credentials, payment card details, purchase tokens, or Google Play order identifiers to Sentry. If a release is not configured with a Sentry DSN, that release sends no information to Sentry."
      ]
    },
    {
      title: "Advertising and consent",
      paragraphs: ["The Android App uses Google Mobile Ads and Google's User Messaging Platform. Depending on your region, consent choice, device settings, and whether you have purchased Remove Ads, Google may process:"],
      lists: [[
        "advertising and app-instance identifiers;",
        "IP-derived approximate location;",
        "device, App, network, and diagnostic information;",
        "consent choices;",
        "ad requests, impressions, interactions, frequency, and fraud signals; and",
        "information used to provide, limit, measure, secure, or personalise advertising where legally permitted."
      ]],
      closing: ["The App does not request precise location for advertising. You can review available advertising privacy choices from the App's settings. A verified Remove Ads entitlement suppresses App ad requests and removes paid-ad placements. Rewarded-ad verification may store your pseudonymous user identifier, the AdMob transaction identifier, ad-unit identifier, reward amount, and verification time so the same reward cannot be granted twice."]
    },
    {
      title: "Google Play purchases",
      paragraphs: [
        "Google Play processes payment details, billing-account information, transaction records, tax, and payment risk under Google's terms. DJAI does not receive your payment-card or bank-account details.",
        "The App sends the Google Play purchase token to DJAI's protected Firebase backend. The backend uses Google's Android Publisher API with the fixed App package and Remove Ads product identifier to check the purchase state, product, quantity, consumption state, refundable quantity, acknowledgement state, and any obfuscated App-account identifier supplied with the purchase. Access is granted only after Google reports a completed, unconsumed, eligible purchase. New purchases include a one-way obfuscated value derived from your Firebase user identifier so Google and DJAI can detect an account mismatch without sending the Firebase identifier as the billing identifier.",
        "DJAI stores the raw purchase token only in a server-restricted purchase record because Google requires it for verification, acknowledgement, restoration, and refund reconciliation. That record may also contain a one-way token hash, Google Play order identifier, product identifier, purchase, consumption and acknowledgement states, quantity, refundable quantity, completion time, billing region, test-purchase indicator, linked Firebase user identifier, verification times, and refund or revocation details. If Google sends a pending chargeback-review notice, DJAI may also store its restricted review token, order identifier, reason, and receipt time so the request can be handled within Google's review period. A separate account entitlement record allows the backend to authorise paid exports. The device stores only a cached verified entitlement for offline UI and ad suppression; the backend remains authoritative for export access.",
        "DJAI receives Google Play Real-time Developer Notifications and performs scheduled acknowledgement retry and Voided Purchases reconciliation. A cancelled, refunded, charged-back, consumed, invalid, or account-conflicting purchase does not grant access, and a later voided purchase revokes the server entitlement. Purchase tokens, order identifiers, and obfuscated account identifiers are not sent to Analytics, AdMob, or Sentry and are not written to application logs."
      ]
    },
    {
      title: "Email and notifications",
      paragraphs: ["Promotional email and marketing notifications are optional and disabled unless you choose them. Your preference is stored with your account. When marketing notifications are enabled, Firebase Cloud Messaging processes a device notification token, and DJAI stores that token under your user identifier so messages can be delivered. You may disable promotional email or marketing notifications in the App. Android system settings can also revoke notification permission. When push notifications are disabled, the App requests deletion of the device token and removes the server token record."]
    },
    {
      title: "Permissions and device features",
      paragraphs: ["The App may use:"],
      lists: [[
        "Camera: document and QR-code capture.",
        "System photo and document pickers: access only to files or photos you select, without broad modern media-library permission.",
        "Biometric or device authentication: optional App Lock. Authentication is performed by the operating system; the App receives only the result.",
        "Notifications: optional marketing notifications and user-initiated functional notices.",
        "Network access: accounts, App Check, analytics, diagnostics, advertising, purchases, reward verification, and messaging.",
        "Advertising identifier: advertising, measurement, frequency limiting, fraud prevention, and compliance through Google advertising services."
      ]],
      closing: ["The App does not request microphone, precise location, contacts, all-files access, overlay, or app installation permission. QR contact, email, Wi-Fi, phone, SMS, location-text, and similar payloads are created from text you enter and remain local unless you choose to share or open them."]
    },
    {
      title: "Legal bases and purposes",
      paragraphs: ["Depending on the law that applies to you, DJAI processes information on one or more of these bases:"],
      lists: [[
        "performing the App service and account agreement;",
        "DJAI's legitimate interests in security, fraud prevention, reliable operation, support, and product improvement;",
        "your consent for optional promotional communications and personalised advertising where consent is required; and",
        "compliance with legal, accounting, consumer-protection, and law-enforcement obligations."
      ]],
      closing: ["You may withdraw optional consent at any time. Withdrawal does not affect processing already carried out lawfully and does not prevent processing required to provide the account or meet legal duties."]
    },
    {
      title: "Service providers, sharing, and international processing",
      paragraphs: ["DJAI uses service providers that process information on its behalf or independently under their terms, including:"],
      lists: [[
        "Google Firebase for authentication, database, App Check, analytics, functions, and messaging;",
        "Google Play for distribution and billing;",
        "Google Mobile Ads and User Messaging Platform for advertising and consent; and",
        "Sentry for crash reporting when configured."
      ]],
      closing: [
        "DJAI does not sell your document content, survey answers, or account profile. Information may also be disclosed when required by law, to protect users or the service, to investigate fraud or abuse, or as part of a business reorganisation subject to applicable safeguards.",
        "Providers may process information in countries other than your own. DJAI relies on the contractual, technical, organisational, and legal transfer safeguards made available by those providers and applicable law. Google's privacy policy is available at https://policies.google.com/privacy and Sentry's at https://sentry.io/privacy/."
      ]
    },
    {
      title: "Retention",
      lists: [[
        "Device documents and generated files remain until you delete them, clear App storage, enable an applicable cleanup option, or uninstall the App.",
        "Account, profile, consent, usage, survey, notification-token, quest, and reward records remain while your account is active or as needed to provide the service.",
        "When account deletion begins, DJAI creates a temporary deletion guard to prevent stale requests from recreating your data. Account-linked records and the Firebase Authentication account are removed through the deletion process. The guard may remain temporarily for security and consistency and is configured for automatic expiry.",
        "Limited security, legal, transaction, provider-backup, and diagnostic records may remain for the period reasonably necessary for fraud prevention, dispute handling, legal compliance, backup rotation, and enforcement of DJAI's rights.",
        "Google Play purchase and refund records may be retained after account deletion where reasonably needed for accounting, dispute handling, refund and chargeback reconciliation, fraud prevention, and legal compliance. DJAI removes the live account entitlement and unlinks the Firebase user identifier from the retained purchase record during account deletion.",
        "Google, Firebase, AdMob, and Sentry apply their own retention periods to information they process under their terms and configured controls."
      ]]
    },
    {
      title: "Account and data deletion",
      paragraphs: [
        "You can delete your account in the App through Me → Account and consent → Delete account. You can also follow the public instructions at https://www.djai.academy/Cam_PDF_Scan_Signer_QR-Gen/delete-account/.",
        "Account deletion removes the Firebase Authentication account and DJAI's UID-linked profile, survey, usage, notification-token, quest, reward-balance, and reward-verification records. Files stored only on your device are not available to DJAI and therefore must be deleted in the App, through Android App-storage settings, or by uninstalling the App.",
        "Account deletion also removes the active billing-entitlement record and unlinks your Firebase user identifier from the retained Google Play transaction record. Limited transaction and refund data may remain as described in Section 12; it is not used to recreate the deleted App account."
      ]
    },
    {
      title: "Your privacy rights",
      paragraphs: [
        "Subject to applicable law, you may request access, correction, deletion, restriction, objection, withdrawal of consent, or a portable copy of eligible personal information. You may also complain to the data-protection authority that applies to you.",
        "Use the App's account controls where available or email contact@djai.academy. We may need to verify your identity before fulfilling a request. We will respond within the period required by applicable law."
      ]
    },
    {
      title: "Security",
      paragraphs: ["DJAI uses encrypted network transport, Firebase Authentication, owner-scoped Firestore access, App-Check-protected backend functions, Play Integrity for Android release attestation, transactional write guards, account-deletion barriers, telemetry sanitisation, App-owned storage, and optional App Lock. No storage or transmission method is completely secure, and users should independently review important exported documents before relying on them."]
    },
    {
      title: "Children",
      paragraphs: ["The App is a general productivity utility and is not directed to children under 13. A user must be at least 13 and legally able to accept the App's terms, or have permission from a parent or guardian where required. Contact contact@djai.academy if you believe a child provided personal information unlawfully so DJAI can investigate and delete it where required."]
    },
    {
      title: "Changes to this policy",
      paragraphs: ["DJAI may update this policy when the App, providers, laws, or business practices change. The updated policy will show a new effective date and will be published at https://www.djai.academy/Cam_PDF_Scan_Signer_QR-Gen/privacy/. Material changes will be presented through an appropriate App or website notice and, when required, a renewed consent request."]
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
  title: "นโยบายความเป็นส่วนตัว",
  date: "วันที่มีผลบังคับใช้: 20 สิงหาคม 2026 · ปรับปรุงล่าสุด: 20 สิงหาคม 2026",
  intro: [
    "DEEJAI LAB Co ., Ltd เลขทะเบียนนิติบุคคล 0105569117953 ซึ่งดำเนินงานภายใต้แบรนด์ DJAI Academy (\"DJAI\", \"เรา\", \"พวกเรา\" หรือ \"ของเรา\") เป็นผู้ให้บริการแอปพลิเคชันมือถือ Cam PDF Scan Signer QR Gen (\"แอป\") นโยบายความเป็นส่วนตัวฉบับนี้อธิบายว่าแอปประมวลผลข้อมูลใด เหตุใดจึงประมวลผล มีการแบ่งปันข้อมูลกับผู้ให้บริการเมื่อใด เก็บรักษาข้อมูลไว้นานเพียงใด ตลอดจนตัวเลือกและสิทธิที่คุณมี",
    "DEEJAI LAB Co ., Ltd เป็นผู้ดำเนินการตามกฎหมายและผู้ควบคุมข้อมูลส่วนบุคคลสำหรับแอป ส่วน DJAI Academy เป็นแบรนด์ที่ใช้ดำเนินงาน คุณติดต่อเราได้ที่ contact@djai.academy หรือผ่าน https://www.djai.academy/."
  ],
  sections: [
    {
      title: "เอกสารและสื่อยังคงอยู่บนอุปกรณ์ของคุณ",
      paragraphs: [
        "หน้าที่สแกน เอกสารและรูปภาพที่นำเข้า ข้อความจาก OCR ลายเซ็น คำอธิบายประกอบ เนื้อหา QR Code เสียง วิดีโอ และไฟล์ PDF รูปภาพ ข้อความ เสียง และวิดีโอที่สร้างขึ้น จะได้รับการประมวลผลในพื้นที่จัดเก็บที่แอปควบคุมบนอุปกรณ์ของคุณ DJAI ไม่อัปโหลดเนื้อหาเหล่านี้ไปยังฐานข้อมูลบัญชี Firebase Analytics, Google Mobile Ads หรือ Sentry",
        "เนื้อหาจะออกจากแอปต่อเมื่อคุณเลือกดำเนินการผ่านระบบปฏิบัติการ เช่น แชร์ พิมพ์ บันทึกลง Files บันทึกลง Photos หรือเปิดเนื้อหาในแอปอื่น จากนั้นแอปหรือบริการปลายทางจะจัดการเนื้อหานั้นตามข้อกำหนดความเป็นส่วนตัวของตน",
        "แอปอาจสร้างสำเนาชั่วคราวระหว่างการนำเข้า แก้ไข ประมวลผล OCR หรือส่งออก แอปจะลบผลลัพธ์ชั่วคราวหลังดำเนินการเสร็จหรือยกเลิกในกรณีที่ทางเทคนิคทำได้ โปรเจกต์ที่คุณบันทึกจะอยู่บนอุปกรณ์จนกว่าคุณจะลบ ล้างพื้นที่จัดเก็บของแอป หรือถอนการติดตั้งแอป หากคุณเปิดตัวเลือกล้างข้อมูลหลังส่งออกของแอป ไฟล์ต้นฉบับของโปรเจกต์จะถูกลบออกจากแอปหลังส่งออกสำเร็จตามการตั้งค่านั้น"
      ]
    },
    {
      title: "ข้อมูลบัญชี",
      paragraphs: ["คุณต้องมีบัญชีเพื่อใช้แอป Firebase Authentication ประมวลผลข้อมูลที่จำเป็นต่อการสร้างและรักษาความปลอดภัยของบัญชี ได้แก่:"],
      lists: [[
        "รหัสผู้ใช้ Firebase ของคุณ",
        "ที่อยู่อีเมลและสถานะการยืนยันอีเมล",
        "ผู้ให้บริการที่ใช้ลงชื่อเข้าใช้",
        "ชื่อที่แสดงและข้อมูลโปรไฟล์พื้นฐานที่ Google หรือ Apple ส่งให้เมื่อคุณเลือกวิธีลงชื่อเข้าใช้ดังกล่าว และ",
        "เหตุการณ์เกี่ยวกับการยืนยันตัวตน การรีเซ็ตรหัสผ่าน ความปลอดภัย และการป้องกันการใช้งานในทางที่ผิด"
      ], [
        "รหัสผู้ใช้ Firebase ที่อยู่อีเมล ชื่อที่แสดง และผู้ให้บริการที่ใช้ลงชื่อเข้าใช้",
        "เวอร์ชันของข้อกำหนด นโยบายความเป็นส่วนตัว และความยินยอมตาม PDPA พร้อมเวลาที่ยอมรับ",
        "ตัวเลือกอีเมลส่งเสริมการขายและการแจ้งเตือนการตลาดซึ่งเป็นทางเลือก",
        "เวลาที่สร้างและอัปเดตบัญชี",
        "สิทธิส่งออกรายสัปดาห์ ยอดการใช้งาน เครดิตรางวัล การจอง และรหัสงานที่เสร็จแล้วซึ่งจำเป็นต่อการใช้ข้อจำกัดการใช้งานเพียงครั้งเดียวอย่างถูกต้อง",
        "สถานะการทำภารกิจสำเร็จและรางวัล และ",
        "สถานะการลบบัญชีซึ่งจำเป็นเพื่อป้องกันไม่ให้คำขอเก่าหรือคำขอที่กำลังทำงานสร้างข้อมูลที่ลบแล้วขึ้นใหม่"
      ]],
      listLead: "DJAI จัดเก็บข้อมูลบัญชีต่อไปนี้ใน Cloud Firestore:",
      closing: ["เราใช้ข้อมูลนี้เพื่อให้บริการยืนยันตัวตน การกู้คืนบัญชี การซิงค์การใช้งานข้ามอุปกรณ์ ฟังก์ชันของแอป การป้องกันการฉ้อโกง ความปลอดภัย การช่วยเหลือ และการควบคุมบัญชี"]
    },
    {
      title: "แบบสำรวจความชอบที่ไม่บังคับ",
      paragraphs: ["แบบสำรวจเพื่อรับรางวัลซึ่งเป็นทางเลือกจะถามเฉพาะ:"],
      lists: [[
        "วัตถุประสงค์หลักที่คุณใช้แอป",
        "คุณใช้แอปเพื่อเรื่องส่วนตัว งาน การศึกษา หรือหลายวัตถุประสงค์ร่วมกัน และ",
        "คุณรู้จักแอปได้อย่างไร"
      ]],
      closing: [
        "คำตอบและเวลาที่ทำแบบสำรวจเสร็จจะถูกจัดเก็บใน Firestore ภายใต้รหัสผู้ใช้ของคุณ คำตอบใช้เพื่อวางแผนผลิตภัณฑ์และวิเคราะห์ผลิตภัณฑ์ในภาพรวม โดยจะไม่ส่งไปยัง Google Mobile Ads และไม่ได้กำหนดเป็นพร็อพเพอร์ตี้ผู้ใช้ของ Firebase Analytics คุณสามารถลบคำตอบแบบสำรวจออกจากแอปได้โดยไม่ต้องลบบัญชีทั้งหมด",
        "แบบสำรวจนี้จะไม่ถามอายุ เพศ ตำแหน่งที่แน่นอน รายได้ สถานภาพสมรส บุตร อาชีพ สถานะการขับรถ หรือความชอบเกี่ยวกับยานพาหนะของคุณ"
      ]
    },
    {
      title: "การวิเคราะห์",
      paragraphs: [
        "Firebase Analytics อาจประมวลผลรหัสผู้ใช้ Firebase แบบนามแฝง รหัสอินสแตนซ์แอปและอุปกรณ์ เวอร์ชันแอป รุ่นอุปกรณ์ เวอร์ชันระบบปฏิบัติการ ภาษา หรือภูมิภาค ประเทศในระดับกว้างซึ่งได้จากข้อมูลเครือข่าย การโต้ตอบกับฟีเจอร์ วิธีลงชื่อเข้าใช้ การส่งออกสำเร็จ การทำภารกิจสำเร็จ และเหตุการณ์ทางเทคนิค DJAI ใช้ข้อมูลนี้เพื่อทำความเข้าใจการใช้ฟีเจอร์ วินิจฉัยปัญหาผลิตภัณฑ์ ป้องกันการใช้งานในทางที่ผิด และปรับปรุงแอป",
        "เหตุการณ์การวิเคราะห์ได้รับการออกแบบไม่ให้มีเนื้อหาเอกสาร ข้อความ OCR เนื้อหา QR ลายเซ็น ชื่อไฟล์ที่ผู้ใช้เลือก รหัสผ่าน โทเค็นยืนยันตัวตน โทเค็นการซื้อ หรือเนื้อหาข้อความ DJAI ไม่ขอสิทธิ์เข้าถึงตำแหน่งที่แม่นยำเพื่อการวิเคราะห์"
      ]
    },
    {
      title: "รายงานข้อขัดข้องและข้อมูลวินิจฉัย",
      paragraphs: [
        "รุ่นที่เผยแพร่จริงอาจใช้ Sentry เพื่อรายงานข้อขัดข้องและวินิจฉัยปัญหาทางเทคนิค เมื่อกำหนดค่า Sentry แล้ว Sentry อาจได้รับเวลา รหัสผู้ใช้ Firebase แบบนามแฝง เวอร์ชันแอปและรุ่นเผยแพร่ รายละเอียดอุปกรณ์และระบบปฏิบัติการ stack trace ประเภทข้อผิดพลาด ข้อมูลประสิทธิภาพ และบริบททางเทคนิคที่ผ่านการล้างข้อมูลซึ่งจำเป็นต่อการจำลองข้อผิดพลาด",
        "แอปทำความสะอาดข้อมูล telemetry เพื่อลบ URI ของไฟล์และเนื้อหาในเครื่อง เส้นทาง sandbox ชื่อไฟล์ เนื้อหาคำขอ ส่วนหัว คุกกี้ query string และตัวระบุโดยตรง DJAI ไม่มีเจตนาส่งเนื้อหาเอกสาร ข้อความ OCR ข้อมูล QR ลายเซ็น รหัสผ่าน ข้อมูลรับรองการยืนยันตัวตน รายละเอียดบัตรชำระเงิน โทเค็นการซื้อ หรือรหัสคำสั่งซื้อ Google Play ไปยัง Sentry หากรุ่นใดไม่ได้กำหนดค่า Sentry DSN รุ่นนั้นจะไม่ส่งข้อมูลไปยัง Sentry"
      ]
    },
    {
      title: "การโฆษณาและความยินยอม",
      paragraphs: ["แอป Android ใช้ Google Mobile Ads และ User Messaging Platform ของ Google โดยขึ้นอยู่กับภูมิภาค ตัวเลือกความยินยอม การตั้งค่าอุปกรณ์ และคุณได้ซื้อ Remove Ads หรือไม่ Google อาจประมวลผล:"],
      lists: [[
        "รหัสโฆษณาและรหัสอินสแตนซ์แอป",
        "ตำแหน่งโดยประมาณที่ได้จาก IP",
        "ข้อมูลอุปกรณ์ แอป เครือข่าย และข้อมูลวินิจฉัย",
        "ตัวเลือกความยินยอม",
        "คำขอโฆษณา การแสดงผล การโต้ตอบ ความถี่ และสัญญาณการฉ้อโกง และ",
        "ข้อมูลที่ใช้เพื่อแสดง จำกัด วัดผล รักษาความปลอดภัย หรือปรับโฆษณาให้เหมาะกับบุคคลในกรณีที่กฎหมายอนุญาต"
      ]],
      closing: ["แอปไม่ขอตำแหน่งที่แม่นยำเพื่อการโฆษณา คุณตรวจสอบตัวเลือกความเป็นส่วนตัวด้านโฆษณาที่มีได้ในการตั้งค่าของแอป สิทธิ Remove Ads ที่ยืนยันแล้วจะระงับคำขอโฆษณาของแอปและนำตำแหน่งโฆษณาแบบชำระเงินออก การยืนยันโฆษณาที่ให้รางวัลอาจจัดเก็บรหัสผู้ใช้แบบนามแฝง รหัสธุรกรรม AdMob รหัสหน่วยโฆษณา จำนวนรางวัล และเวลายืนยัน เพื่อไม่ให้มอบรางวัลเดียวกันซ้ำสองครั้ง"]
    },
    {
      title: "การซื้อผ่าน Google Play",
      paragraphs: [
        "Google Play ประมวลผลรายละเอียดการชำระเงิน ข้อมูลบัญชีเรียกเก็บเงิน บันทึกธุรกรรม ภาษี และความเสี่ยงด้านการชำระเงินตามข้อกำหนดของ Google โดย DJAI ไม่ได้รับรายละเอียดบัตรชำระเงินหรือบัญชีธนาคารของคุณ",
        "แอปได้รับรหัสผลิตภัณฑ์ สถานะการซื้อ โทเค็นการซื้อ สถานะการรับทราบ และข้อมูลสิทธิที่เกี่ยวข้องซึ่ง Google Play ส่งให้ เพื่อให้แอปดำเนินการ กู้คืน หรือเพิกถอนสิทธิ Remove Ads แบบตลอดอายุการใช้งานได้ ในการทำงานของรุ่นที่เผยแพร่อยู่ในปัจจุบัน แอปตรวจสอบสถานะการซื้อบนอุปกรณ์และจัดเก็บสิทธิที่ได้ไว้ในพื้นที่จัดเก็บของแอปที่ได้รับการปกป้อง กระบวนการเผยแพร่รุ่น production ของ DJAI กำหนดให้ย้ายไปใช้การยืนยัน Google Play ฝั่งเซิร์ฟเวอร์ก่อนเผยแพร่ต่อสาธารณะ นโยบายนี้ต้องได้รับการทบทวนอีกครั้งเมื่อเปิดใช้ backend ดังกล่าว เพราะในเวลานั้น DJAI จะประมวลผลโทเค็นการซื้อและบันทึกสิทธิบนเซิร์ฟเวอร์เพื่อการยืนยัน การรับทราบ การกู้คืน การคืนเงิน การเพิกถอน การป้องกันการฉ้อโกง และการช่วยเหลือ"
      ]
    },
    {
      title: "อีเมลและการแจ้งเตือน",
      paragraphs: ["อีเมลส่งเสริมการขายและการแจ้งเตือนการตลาดเป็นทางเลือกและปิดใช้งานอยู่จนกว่าคุณจะเลือกเปิด การตั้งค่าของคุณจะถูกจัดเก็บไว้กับบัญชี เมื่อเปิดใช้การแจ้งเตือนการตลาด Firebase Cloud Messaging จะประมวลผลโทเค็นการแจ้งเตือนของอุปกรณ์ และ DJAI จะจัดเก็บโทเค็นนั้นภายใต้รหัสผู้ใช้ของคุณเพื่อส่งข้อความ คุณสามารถปิดอีเมลส่งเสริมการขายหรือการแจ้งเตือนการตลาดในแอปได้ การตั้งค่าระบบ Android สามารถเพิกถอนสิทธิ์การแจ้งเตือนได้เช่นกัน เมื่อปิดการแจ้งเตือนแบบ push แอปจะขอให้ลบโทเค็นของอุปกรณ์และนำบันทึกโทเค็นบนเซิร์ฟเวอร์ออก"]
    },
    {
      title: "สิทธิ์และฟีเจอร์ของอุปกรณ์",
      paragraphs: ["แอปอาจใช้:"],
      lists: [[
        "กล้อง: สำหรับถ่ายเอกสารและ QR Code",
        "ตัวเลือกรูปภาพและเอกสารของระบบ: เข้าถึงเฉพาะไฟล์หรือรูปภาพที่คุณเลือก โดยไม่ขอสิทธิ์เข้าถึงคลังสื่อสมัยใหม่แบบกว้าง",
        "ไบโอเมตริกหรือการยืนยันตัวตนของอุปกรณ์: สำหรับ App Lock ซึ่งเป็นทางเลือก ระบบปฏิบัติการเป็นผู้ดำเนินการยืนยันตัวตน และแอปได้รับเพียงผลลัพธ์",
        "การแจ้งเตือน: สำหรับการแจ้งเตือนการตลาดที่เป็นทางเลือกและการแจ้งเตือนการทำงานที่ผู้ใช้เป็นผู้เริ่ม",
        "การเข้าถึงเครือข่าย: สำหรับบัญชี App Check การวิเคราะห์ การวินิจฉัย โฆษณา การซื้อ การยืนยันรางวัล และการส่งข้อความ",
        "รหัสโฆษณา: สำหรับโฆษณา การวัดผล การจำกัดความถี่ การป้องกันการฉ้อโกง และการปฏิบัติตามข้อกำหนดผ่านบริการโฆษณาของ Google"
      ]],
      closing: ["แอปไม่ขอสิทธิ์ไมโครโฟน ตำแหน่งที่แม่นยำ รายชื่อติดต่อ การเข้าถึงไฟล์ทั้งหมด การวางซ้อนหน้าจอ หรือการติดตั้งแอป ข้อมูล QR สำหรับรายชื่อติดต่อ อีเมล Wi-Fi โทรศัพท์ SMS ข้อความตำแหน่ง และข้อมูลลักษณะเดียวกันจะสร้างจากข้อความที่คุณป้อนและยังคงอยู่ในเครื่อง เว้นแต่คุณเลือกแชร์หรือเปิดข้อมูลนั้น"]
    },
    {
      title: "ฐานทางกฎหมายและวัตถุประสงค์",
      paragraphs: ["DJAI ประมวลผลข้อมูลโดยอาศัยฐานอย่างน้อยหนึ่งข้อต่อไปนี้ ทั้งนี้ขึ้นอยู่กับกฎหมายที่ใช้บังคับกับคุณ:"],
      lists: [[
        "การปฏิบัติตามสัญญาบริการแอปและบัญชี",
        "ประโยชน์โดยชอบด้วยกฎหมายของ DJAI ในด้านความปลอดภัย การป้องกันการฉ้อโกง การดำเนินงานที่เชื่อถือได้ การช่วยเหลือ และการปรับปรุงผลิตภัณฑ์",
        "ความยินยอมของคุณสำหรับการสื่อสารส่งเสริมการขายที่เป็นทางเลือกและโฆษณาเฉพาะบุคคลในกรณีที่ต้องได้รับความยินยอม และ",
        "การปฏิบัติตามหน้าที่ตามกฎหมาย การบัญชี การคุ้มครองผู้บริโภค และการบังคับใช้กฎหมาย"
      ]],
      closing: ["คุณสามารถถอนความยินยอมที่เป็นทางเลือกได้ทุกเมื่อ การถอนความยินยอมไม่กระทบต่อการประมวลผลที่ได้ดำเนินการไปแล้วโดยชอบด้วยกฎหมาย และไม่ขัดขวางการประมวลผลที่จำเป็นต่อการให้บริการบัญชีหรือปฏิบัติตามหน้าที่ทางกฎหมาย"]
    },
    {
      title: "ผู้ให้บริการ การแบ่งปัน และการประมวลผลระหว่างประเทศ",
      paragraphs: ["DJAI ใช้ผู้ให้บริการที่ประมวลผลข้อมูลในนามของเรา หรือประมวลผลอย่างเป็นอิสระภายใต้ข้อกำหนดของตน ได้แก่:"],
      lists: [[
        "Google Firebase สำหรับการยืนยันตัวตน ฐานข้อมูล App Check การวิเคราะห์ ฟังก์ชัน และการส่งข้อความ",
        "Google Play สำหรับการจัดจำหน่ายและการเรียกเก็บเงิน",
        "Google Mobile Ads และ User Messaging Platform สำหรับการโฆษณาและความยินยอม และ",
        "Sentry สำหรับการรายงานข้อขัดข้องเมื่อมีการกำหนดค่า"
      ]],
      closing: [
        "DJAI ไม่ขายเนื้อหาเอกสาร คำตอบแบบสำรวจ หรือโปรไฟล์บัญชีของคุณ ข้อมูลอาจถูกเปิดเผยเมื่อกฎหมายกำหนด เพื่อปกป้องผู้ใช้หรือบริการ เพื่อตรวจสอบการฉ้อโกงหรือการใช้งานในทางที่ผิด หรือเป็นส่วนหนึ่งของการปรับโครงสร้างธุรกิจภายใต้มาตรการคุ้มครองที่ใช้บังคับ",
        "ผู้ให้บริการอาจประมวลผลข้อมูลในประเทศอื่นนอกเหนือจากประเทศของคุณ DJAI อาศัยมาตรการคุ้มครองการโอนข้อมูลด้านสัญญา เทคนิค องค์กร และกฎหมายที่ผู้ให้บริการเหล่านั้นจัดให้ รวมถึงกฎหมายที่ใช้บังคับ นโยบายความเป็นส่วนตัวของ Google ดูได้ที่ https://policies.google.com/privacy และของ Sentry ที่ https://sentry.io/privacy/."
      ]
    },
    {
      title: "ระยะเวลาการเก็บรักษา",
      lists: [[
        "เอกสารและไฟล์ที่สร้างบนอุปกรณ์จะอยู่จนกว่าคุณจะลบ ล้างพื้นที่จัดเก็บของแอป เปิดตัวเลือกการล้างข้อมูลที่ใช้ได้ หรือถอนการติดตั้งแอป",
        "บันทึกบัญชี โปรไฟล์ ความยินยอม การใช้งาน แบบสำรวจ โทเค็นการแจ้งเตือน ภารกิจ และรางวัล จะอยู่ในระหว่างที่บัญชียังใช้งานอยู่หรือตราบเท่าที่จำเป็นต่อการให้บริการ",
        "เมื่อเริ่มลบบัญชี DJAI จะสร้างตัวป้องกันการลบชั่วคราวเพื่อไม่ให้คำขอเก่าสร้างข้อมูลของคุณขึ้นใหม่ บันทึกที่เชื่อมโยงกับบัญชีและบัญชี Firebase Authentication จะถูกลบผ่านกระบวนการลบ ตัวป้องกันอาจคงอยู่ชั่วคราวเพื่อความปลอดภัยและความสอดคล้อง และได้รับการกำหนดให้หมดอายุโดยอัตโนมัติ",
        "บันทึกด้านความปลอดภัย กฎหมาย ธุรกรรม สำรองข้อมูลของผู้ให้บริการ และการวินิจฉัยในขอบเขตจำกัด อาจคงอยู่ตามระยะเวลาที่จำเป็นอย่างสมเหตุสมผลสำหรับการป้องกันการฉ้อโกง การจัดการข้อพิพาท การปฏิบัติตามกฎหมาย การหมุนเวียนข้อมูลสำรอง และการบังคับใช้สิทธิของ DJAI",
        "Google, Firebase, AdMob และ Sentry ใช้ระยะเวลาเก็บรักษาของตนเองกับข้อมูลที่ประมวลผลตามข้อกำหนดและการควบคุมที่กำหนดค่าไว้"
      ]]
    },
    {
      title: "การลบบัญชีและข้อมูล",
      paragraphs: [
        "คุณสามารถลบบัญชีในแอปได้ที่ Me → Account and consent → Delete account หรือทำตามคำแนะนำสาธารณะที่ https://www.djai.academy/Cam_PDF_Scan_Signer_QR-Gen/delete-account/.",
        "การลบบัญชีจะลบบัญชี Firebase Authentication และโปรไฟล์ แบบสำรวจ การใช้งาน โทเค็นการแจ้งเตือน ภารกิจ ยอดรางวัล และบันทึกการยืนยันรางวัลของ DJAI ที่เชื่อมโยงกับ UID ไฟล์ที่จัดเก็บเฉพาะบนอุปกรณ์ของคุณจะไม่อยู่ในความครอบครองของ DJAI ดังนั้นคุณต้องลบไฟล์ดังกล่าวในแอป ผ่านการตั้งค่าพื้นที่จัดเก็บแอปของ Android หรือโดยถอนการติดตั้งแอป"
      ]
    },
    {
      title: "สิทธิด้านความเป็นส่วนตัวของคุณ",
      paragraphs: [
        "ภายใต้กฎหมายที่ใช้บังคับ คุณอาจขอเข้าถึง แก้ไข ลบ จำกัด หรือคัดค้านการประมวลผล ถอนความยินยอม หรือขอสำเนาข้อมูลส่วนบุคคลที่เข้าเกณฑ์ในรูปแบบที่โอนได้ นอกจากนี้คุณอาจร้องเรียนต่อหน่วยงานคุ้มครองข้อมูลที่มีอำนาจกับคุณ",
        "ใช้การควบคุมบัญชีในแอปเมื่อมี หรือส่งอีเมลไปที่ contact@djai.academy เราอาจต้องยืนยันตัวตนของคุณก่อนดำเนินการตามคำขอ และจะตอบกลับภายในระยะเวลาที่กฎหมายที่ใช้บังคับกำหนด"
      ]
    },
    {
      title: "ความปลอดภัย",
      paragraphs: ["DJAI ใช้การรับส่งข้อมูลผ่านเครือข่ายแบบเข้ารหัส Firebase Authentication การเข้าถึง Firestore ที่จำกัดตามเจ้าของ ฟังก์ชัน backend ที่ปกป้องด้วย App Check, Play Integrity สำหรับการรับรองรุ่น Android ที่เผยแพร่ ตัวป้องกันการเขียนแบบธุรกรรม แนวกั้นการลบบัญชี การทำความสะอาด telemetry พื้นที่จัดเก็บที่แอปเป็นเจ้าของ และ App Lock ที่เป็นทางเลือก ไม่มีวิธีจัดเก็บหรือส่งข้อมูลใดที่ปลอดภัยอย่างสมบูรณ์ และผู้ใช้ควรตรวจสอบเอกสารสำคัญที่ส่งออกด้วยตนเองก่อนนำไปใช้อ้างอิง"]
    },
    {
      title: "เด็ก",
      paragraphs: ["แอปเป็นเครื่องมือเพิ่มประสิทธิภาพการทำงานสำหรับบุคคลทั่วไป และไม่ได้มุ่งให้บริการแก่เด็กอายุต่ำกว่า 13 ปี ผู้ใช้ต้องมีอายุอย่างน้อย 13 ปีและมีความสามารถตามกฎหมายในการยอมรับข้อกำหนดของแอป หรือได้รับอนุญาตจากบิดามารดาหรือผู้ปกครองในกรณีที่กำหนด โปรดติดต่อ contact@djai.academy หากคุณเชื่อว่าเด็กให้ข้อมูลส่วนบุคคลโดยไม่ชอบด้วยกฎหมาย เพื่อให้ DJAI ตรวจสอบและลบข้อมูลเมื่อจำเป็น"]
    },
    {
      title: "การเปลี่ยนแปลงนโยบายนี้",
      paragraphs: ["DJAI อาจปรับปรุงนโยบายนี้เมื่อแอป ผู้ให้บริการ กฎหมาย หรือแนวปฏิบัติทางธุรกิจเปลี่ยนแปลง นโยบายที่ปรับปรุงจะแสดงวันที่มีผลบังคับใช้ใหม่และเผยแพร่ที่ https://www.djai.academy/Cam_PDF_Scan_Signer_QR-Gen/privacy/. การเปลี่ยนแปลงที่มีสาระสำคัญจะแจ้งผ่านประกาศที่เหมาะสมในแอปหรือเว็บไซต์ และจะขอความยินยอมใหม่เมื่อกฎหมายกำหนด"]
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
  "https://sentry.io/privacy/",
  "contact@djai.academy"
]);

const linkPattern = /(https:\/\/www\.djai\.academy\/Cam_PDF_Scan_Signer_QR-Gen\/(?:privacy|terms|delete-account)\/|https:\/\/www\.djai\.academy\/|https:\/\/policies\.google\.com\/privacy|https:\/\/sentry\.io\/privacy\/|contact@djai\.academy)/g;

function LinkedText({ children }) {
  return String(children).split(linkPattern).map((part, index) => {
    if (!knownLinks.has(part)) return part;
    const href = part.includes("@") ? `mailto:${part}` : part;
    return <a href={href} key={`${part}-${index}`}>{part}</a>;
  });
}

function PolicySection({ number, section }) {
  const lists = section.lists || [];
  return (
    <section id={`section-${number}`}>
      <h2>{number}. {section.title}</h2>
      <div className={styles.sectionBody}>
        {(section.paragraphs || []).map((paragraph) => (
          <p className={paragraph.includes("\n") ? styles.address : undefined} key={paragraph}>
            <LinkedText>{paragraph}</LinkedText>
          </p>
        ))}
        {lists.map((items, listIndex) => (
          <div className={styles.listGroup} key={`${number}-${listIndex}`}>
            {listIndex === 1 && section.listLead ? <p>{section.listLead}</p> : null}
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
  const thai = locale === "th";
  const relatedHrefs = [APP_PATH, `${APP_PATH}terms/`, `${APP_PATH}delete-account/`, "/app-ads.txt"];

  return (
    <>
      <SiteHeader locale={locale} currentRoute="home" languageHrefs={thai ? { en: PRIVACY_PATH } : { th: THAI_PATH }} />
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

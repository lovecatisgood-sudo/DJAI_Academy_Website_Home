import OnboardingFlow from "./OnboardingFlow";

export const metadata = {
  title: "เข้าร่วม DJAI Academy | แนวทางชุมชนและแบบสำรวจผู้เรียน",
  description: "อ่านแนวทางชุมชน แนะนำเป้าหมายการเรียนรู้ และเริ่มต้นใช้งาน DJAI Academy",
  alternates: {
    canonical: "/academy/",
    languages: { th: "/academy/", en: "/academy/en/", "x-default": "/academy/" }
  },
  robots: { index: false, follow: true }
};

export default function ThaiAcademyOnboardingPage() {
  return <OnboardingFlow locale="th" />;
}

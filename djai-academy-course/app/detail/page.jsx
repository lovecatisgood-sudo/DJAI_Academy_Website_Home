import CourseDetailPage from "../CourseDetailPage";

export const metadata = {
  title: "รายละเอียด AI Masterclass | จากไอเดียสู่โปรดักต์จริง | DJAI Academy",
  description:
    "ดูกำหนดการและหลักสูตร AI Masterclass วันที่ 1 สิงหาคม 2026 เรียน Vibe Coding วางแผน สร้าง และ launch โปรดักต์จริงด้วย AI ภายในหนึ่งวัน",
  alternates: {
    canonical: "/course/detail/",
    languages: {
      th: "/course/detail/",
      en: "/course/detail/en/",
      "x-default": "/course/detail/"
    }
  },
  openGraph: {
    title: "AI Masterclass: จากไอเดียสู่โปรดักต์จริง",
    description: "Workshop AI แบบลงมือทำเต็มวัน วันที่ 1 สิงหาคม 2026 โดย DJAI Academy",
    url: "/course/detail/",
    images: ["/course/assets/community2.webp"],
    type: "website"
  }
};

export default function CourseDetail() {
  return <CourseDetailPage locale="th" />;
}

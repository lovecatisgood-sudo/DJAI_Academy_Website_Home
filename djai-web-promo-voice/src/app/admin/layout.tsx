import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Voice Agent Admin | DJAI Academy",
  description: "Protected administration area for the DJAI voice sales agent.",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nocache: true,
  },
  alternates: {
    canonical: "/voice_admin/",
  },
  openGraph: {
    title: "Voice Agent Admin | DJAI Academy",
    description: "Protected administration area for the DJAI voice sales agent.",
    url: "/voice_admin/",
  },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}

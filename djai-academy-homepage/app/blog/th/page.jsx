import { permanentRedirect } from "next/navigation";

export default function LegacyThaiBlogPage() {
  permanentRedirect("/blog/");
}

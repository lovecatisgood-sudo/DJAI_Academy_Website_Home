import { permanentRedirect } from "next/navigation";

export default function LegacyThaiHomePage() {
  permanentRedirect("/");
}

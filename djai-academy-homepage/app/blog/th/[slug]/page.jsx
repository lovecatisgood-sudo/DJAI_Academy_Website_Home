import { permanentRedirect } from "next/navigation";

export default async function LegacyThaiBlogPostPage({ params }) {
  const resolvedParams = await params;
  permanentRedirect(`/blog/${resolvedParams.slug}/`);
}

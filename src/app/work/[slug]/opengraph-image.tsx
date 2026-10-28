import { ogImage, ogSize, ogContentType } from "@/lib/og";
import { getProject, projects } from "@/lib/work";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "ByteWright case study";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  return ogImage({ eyebrow: `Case study · ${p?.kind ?? ""}`, title: p?.title ?? "Case study" });
}

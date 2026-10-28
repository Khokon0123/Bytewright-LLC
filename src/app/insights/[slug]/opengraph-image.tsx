import { ogImage, ogSize, ogContentType } from "@/lib/og";
import { getPost, posts } from "@/lib/insights";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "ByteWright insight";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  return ogImage({ eyebrow: `Insights · ${post?.topic ?? ""}`, title: post?.title ?? "Insights" });
}

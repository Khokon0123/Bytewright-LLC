import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Insights from the ByteWright studio";

export default function Image() {
  return ogImage({ eyebrow: "Insights", title: "Notes from the", emphasis: "studio." });
}

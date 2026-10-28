import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "About ByteWright";

export default function Image() {
  return ogImage({ eyebrow: "About", title: "A small studio with", emphasis: "high standards." });
}

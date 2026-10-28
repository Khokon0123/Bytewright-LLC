import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "ByteWright: Software, crafted.";

export default function Image() {
  return ogImage({ eyebrow: "Software studio", title: "Software,", emphasis: "crafted." });
}

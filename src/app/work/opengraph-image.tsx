import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Selected work by ByteWright";

export default function Image() {
  return ogImage({ eyebrow: "Work", title: "Selected", emphasis: "work." });
}

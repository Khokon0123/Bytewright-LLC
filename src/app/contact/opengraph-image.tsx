import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Contact ByteWright";

export default function Image() {
  return ogImage({ eyebrow: "Contact", title: "Let’s", emphasis: "talk." });
}

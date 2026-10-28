import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "ByteWright services";

export default function Image() {
  return ogImage({ eyebrow: "Services", title: "One team, idea to launch and", emphasis: "beyond." });
}

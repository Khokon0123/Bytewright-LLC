import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const dir = join(process.cwd(), "src/assets/og");
const fonts = Promise.all([
  readFile(join(dir, "Switzer-Medium.otf")),
  readFile(join(dir, "Switzer-Regular.otf")),
  readFile(join(dir, "InstrumentSerif-Italic.ttf")),
]);

/**
 * One template for every share card: eyebrow, a two-part headline where `emphasis`
 * is set in the serif, and the wordmark. Dark, warm, monochrome, blue only in "Wright".
 */
export async function ogImage({ eyebrow, title, emphasis }: { eyebrow: string; title: string; emphasis?: string }) {
  const [switzer, switzerRegular, serif] = await fonts;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0B0B0C",
          color: "#EDEBE7",
          padding: "64px 72px",
          fontFamily: "Switzer",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "SwitzerRegular", fontSize: 26, color: "#8C8983" }}>
          <span>{eyebrow}</span>
          <span>bytewright.com</span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", fontSize: title.length > 28 ? 84 : 112, lineHeight: 1, letterSpacing: "-0.04em", maxWidth: 1000 }}>
          <span style={{ marginRight: emphasis ? 22 : 0 }}>{title}</span>
          {emphasis && <span style={{ fontFamily: "Serif", fontSize: "1.06em", letterSpacing: "-0.01em" }}>{emphasis}</span>}
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", paddingTop: 28 }}>
          <div style={{ display: "flex", fontSize: 40, letterSpacing: "-0.035em" }}>
            <span>Byte</span>
            <span style={{ color: "#4F8EF7" }}>Wright</span>
          </div>
          <span style={{ fontFamily: "SwitzerRegular", fontSize: 24, color: "#8C8983" }}>Where creativity meets top-notch engineering.</span>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Switzer", data: switzer, weight: 500, style: "normal" },
        { name: "Serif", data: serif, weight: 400, style: "italic" },
        { name: "SwitzerRegular", data: switzerRegular, weight: 400, style: "normal" },
      ],
    },
  );
}

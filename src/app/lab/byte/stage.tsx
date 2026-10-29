"use client";

import dynamic from "next/dynamic";

const ByteCanvas = dynamic(() => import("@/components/byte/byte-canvas"), { ssr: false });

/* Square, fixed-size stage so captures are pixel-exact. ?bg=transparent|dark */
export function CaptureStage() {
  return (
    <div id="byte-stage" style={{ position: "fixed", inset: 0, zIndex: 100, display: "grid", placeItems: "center", background: "var(--bg)" }}>
      <div id="byte-frame" style={{ width: 720, height: 720 }}>
        <ByteCanvas mode="capture" />
      </div>
    </div>
  );
}

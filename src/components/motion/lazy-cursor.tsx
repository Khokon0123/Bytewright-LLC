"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";

const ViewCursor = dynamic(() => import("./view-cursor").then((m) => m.ViewCursor), { ssr: false });

const query = "(hover: hover) and (pointer: fine)";
const subscribe = (cb: () => void) => {
  const m = window.matchMedia(query);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
};

/** Only fine-pointer devices ever download the cursor (and Motion with it). */
export function LazyCursor() {
  const fine = useSyncExternalStore(subscribe, () => window.matchMedia(query).matches, () => false);
  return fine ? <ViewCursor /> : null;
}

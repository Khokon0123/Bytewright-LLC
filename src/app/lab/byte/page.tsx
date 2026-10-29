import { notFound } from "next/navigation";
import { CaptureStage } from "./stage";

/*
 * Development-only stage used to render the hero's still image and phone video from the real scene.
 * `npm run dev`, then open /lab/byte. Never exists in production builds.
 */
export const metadata = { robots: { index: false, follow: false } };

export default function ByteLab() {
  if (process.env.NODE_ENV === "production") notFound();
  return <CaptureStage />;
}

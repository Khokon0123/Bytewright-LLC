import localFont from "next/font/local";
import { Instrument_Serif, JetBrains_Mono } from "next/font/google";

/**
 * Switzer — self-hosted from Fontshare (FFL licence, see ./fonts/FFL.txt).
 * Only the two weights the system uses ship: 400 (body) and 500 (headlines).
 */
export const switzer = localFont({
  src: [
    { path: "./fonts/Switzer-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Switzer-Medium.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-switzer",
  display: "swap",
  fallback: ["Helvetica Neue", "Arial", "sans-serif"],
  adjustFontFallback: "Arial",
});

/** Exactly one emphasised word per major headline. Nothing else. */
export const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: "italic",
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

/** Numbers only (01, 02, years, counts). Labels and metadata use Switzer. */
export const jetbrainsMono = JetBrains_Mono({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

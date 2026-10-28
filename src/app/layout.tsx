import type { Metadata, Viewport } from "next";
import { instrumentSerif, jetbrainsMono, switzer } from "./fonts";
import { site } from "@/lib/site";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { LazyCursor } from "@/components/motion/lazy-cursor";
import { RevealObserver } from "@/components/motion/reveal-observer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name}: Software, crafted.`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover", // draw under the notch; safe-area insets handled in CSS
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0c" },
    { media: "(prefers-color-scheme: light)", color: "#f4f2ee" },
  ],
};

/* Runs before paint so a saved light preference never flashes dark. */
const themeScript = `document.documentElement.classList.add("js");try{var t=localStorage.getItem("bw-theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${switzer.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-dvh">
        <a
          href="#main"
          id="skip-link"
          className="label sr-only z-50 bg-bg px-4 py-3 text-fg focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Skip to content
        </a>
        <SmoothScroll />
        <RevealObserver />
        <LazyCursor />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

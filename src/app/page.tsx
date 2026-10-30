import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { Work } from "@/components/home/work";
import { Pillars } from "@/components/home/pillars";
import { Process } from "@/components/home/process";
import { Testimonial } from "@/components/home/testimonial";
import { Insights } from "@/components/home/insights";
import { Closing } from "@/components/home/closing";
import { LogoMarquee } from "@/components/home/logo-marquee";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `${site.name}: Software, crafted.` },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: { title: `${site.name}: Software, crafted.`, description: site.description, url: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <LogoMarquee />
      <Work />
      <Pillars />
      <Process />
      <Testimonial />
      <Insights />
      <Closing />
    </>
  );
}

import Link from "next/link";
import type { ReactNode } from "react";
import { SectionHead } from "@/components/section-head";
import { Reveal } from "@/components/motion/reveal";
import { BrowserMock } from "./mockups/browser";
import { PhoneMock } from "./mockups/phone";
import { ChatMock } from "./mockups/chat";
import { DashboardMock } from "./mockups/dashboard";

type Feature = { slug: string; title: ReactNode; line: string; link: string; mock: ReactNode };

const features: Feature[] = [
  {
    slug: "websites",
    title: (
      <>
        Websites people <span className="em-serif">remember.</span>
      </>
    ),
    line: "Fast, findable, and easy for your team to update.",
    link: "Websites",
    mock: <BrowserMock />,
  },
  {
    slug: "apps-and-products",
    title: (
      <>
        Apps people <span className="em-serif">open</span> every day.
      </>
    ),
    line: "iOS, Android and web, designed and built by one team.",
    link: "Apps & Products",
    mock: <PhoneMock />,
  },
  {
    slug: "ai-and-automation",
    title: (
      <>
        AI that does <span className="em-serif">real</span> work.
      </>
    ),
    line: "Assistants and automations inside the tools you already use.",
    link: "AI & Automation",
    mock: <ChatMock />,
  },
  {
    slug: "infrastructure-and-support",
    title: (
      <>
        Infrastructure that stays <span className="em-serif">quiet.</span>
      </>
    ),
    line: "Cloud, integrations and care plans that keep it all running.",
    link: "Infrastructure & Support",
    mock: <DashboardMock />,
  },
];

export function Pillars() {
  return (
    <section className="page-x mx-auto max-w-page pt-section" aria-labelledby="services-title">
      <SectionHead
        id="services-title"
        lines={[
          "One team from idea",
          <span key="l1">
            to launch and <span className="em-serif">beyond.</span>
          </span>,
        ]}
      />

      <div className="mt-16 space-y-24 md:mt-24 md:space-y-32 lg:space-y-40">
        {features.map((f, i) => {
          const flip = i % 2 === 1;
          return (
            <article key={f.slug} className="grid-page items-center gap-y-10" aria-labelledby={`f-${f.slug}`}>
              <Reveal
                className={`col-span-4 md:col-span-5 lg:col-span-4 ${flip ? "lg:col-start-9 lg:row-start-1" : "lg:col-start-1"}`}
              >
                <h3 id={`f-${f.slug}`} className="text-h2">
                  {f.title}
                </h3>
                <p className="mt-5 max-w-[34ch] text-lead text-soft">{f.line}</p>
                <Link href={`/services#${f.slug}`} className="tap link mt-6 inline-flex gap-2 text-fg">
                  {f.link} <span aria-hidden="true">→</span>
                </Link>
              </Reveal>
              <Reveal
                delay={120}
                className={`col-span-4 md:col-span-6 lg:col-span-7 ${flip ? "lg:col-start-1 lg:row-start-1" : "lg:col-start-6"}`}
              >
                <div
                  className="feature-card grid place-items-center overflow-hidden rounded-[1.75rem] border border-line px-4 py-10 sm:aspect-[4/3] sm:px-10 md:rounded-[2rem]"
                  style={{ "--glow-x": flip ? "0%" : "100%" } as React.CSSProperties}
                >
                  {f.mock}
                </div>
              </Reveal>
            </article>
          );
        })}
      </div>
    </section>
  );
}

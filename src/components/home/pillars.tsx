import Link from "next/link";
import { listSentence, pillars } from "@/lib/services";
import { SectionHead } from "@/components/section-head";
import { Reveal } from "@/components/motion/reveal";

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
        aside={
          <p className="text-muted">
            Design, engineering, AI, and the infrastructure underneath, under one roof. Nothing gets lost between handoffs,
            and UI/UX design is part of every project.
          </p>
        }
      />

      {/* rows separated by space and scale, not rules */}
      <ul className="mt-20 space-y-16 md:mt-28 md:space-y-24">
        {pillars.map((p) => (
          <Reveal as="li" key={p.slug}>
            <Link href={`/services#${p.slug}`} className="group grid-page gap-y-5" aria-label={`${p.title}: ${p.line}`}>
              <h3 className="col-span-4 text-h2 transition-colors duration-300 group-hover:text-accent-ink md:col-span-6 lg:col-span-5">
                {p.title}
              </h3>
              <div className="col-span-4 md:col-span-5 lg:col-span-6 lg:col-start-7 xl:col-span-5 xl:col-start-7">
                <p className="text-lead">{p.line}</p>
                <p className="mt-4 text-muted">
                  {listSentence(p.includes)} {p.design}
                </p>
              </div>
            </Link>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

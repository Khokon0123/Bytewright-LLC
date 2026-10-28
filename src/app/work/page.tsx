import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/lib/work";
import { PageHero } from "@/components/page-hero";
import { WorkMedia } from "@/components/work-media";
import { Reveal } from "@/components/motion/reveal";
import { Closing } from "@/components/home/closing";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected projects by ByteWright: websites for a monastery, a welfare organization, and a construction company.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        lines={[
          "Built for a monastery,",
          <span key="l1">
            a nonprofit and a <span className="em-serif">builder.</span>
          </span>,
        ]}
        intro={<p>Three different worlds, one standard. Each project started with a conversation and ended with a 5-star review.</p>}
      />

      <ol className="page-x mx-auto mt-12 max-w-page md:mt-16">
        {projects.map((p, i) => {
          const flip = i % 2 === 1;
          return (
            <Reveal as="li" key={p.slug} className="py-12 md:py-20 lg:py-24">
              <Link href={`/work/${p.slug}`} className="work-card group grid-page items-end gap-y-8" data-cursor="view">
                <div className={`col-span-4 md:col-span-6 lg:col-span-7 ${flip ? "lg:order-2 lg:col-start-6" : ""}`}>
                  <WorkMedia
                    project={p}
                    ratio="aspect-[4/3] md:aspect-[16/10]"
                    sizes="(min-width: 1600px) 900px, (min-width: 1024px) 56vw, 92vw"
                    priority={i === 0}
                  />
                </div>
                <div className={`col-span-4 md:col-span-6 lg:col-span-4 ${flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-9"}`}>
                  <h2 className="flex items-baseline gap-3 text-h2 transition-colors duration-300 group-hover:text-accent-ink">
                    <span className="num shrink-0 text-faint" style={{ fontSize: "0.42em" }}>
                      {p.n}
                    </span>
                    {p.title}
                  </h2>
                  <p className="mt-4 max-w-[46ch] text-muted">{p.summary}</p>
                  <dl className="mt-8 grid grid-cols-2 gap-4">
                    <div>
                      <dt className="label">Type</dt>
                      <dd className="mt-1 text-small">{p.kind}</dd>
                    </div>
                    <div>
                      <dt className="label">Review</dt>
                      <dd className="mt-1 text-small">
                        <span className="num">5</span> stars
                      </dd>
                    </div>
                  </dl>
                  <span className="label mt-8 inline-flex min-h-11 items-center gap-2 font-medium text-fg">
                    Read the case study
                    <span aria-hidden="true" className="transition-transform duration-500 ease-out-expo group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </ol>

      <Closing />
    </>
  );
}

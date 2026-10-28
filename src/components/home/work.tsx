import Link from "next/link";
import { projects, type Project } from "@/lib/work";
import { WorkMedia } from "@/components/work-media";
import { SectionHead } from "@/components/section-head";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/button";

function Card({
  project,
  ratio,
  sizes,
  className = "",
  priority,
  wide = false,
}: {
  project: Project;
  ratio: string;
  sizes: string;
  className?: string;
  priority?: boolean;
  wide?: boolean;
}) {
  return (
    <Reveal as="article" className={className}>
      <Link href={`/work/${project.slug}`} className="work-card group block" data-cursor="view">
        <WorkMedia project={project} ratio={ratio} sizes={sizes} priority={priority} />
        <div className={`mt-5 grid grid-cols-[2.5rem_1fr] gap-x-3 md:mt-6 ${wide ? "md:grid-cols-[3.5rem_1fr_auto]" : ""}`}>
          <span className="num pt-[0.45em] text-faint">{project.n}</span>
          <div>
            <h3 className="text-h3 transition-colors duration-300 group-hover:text-accent-ink">{project.title}</h3>
            <p className="mt-2 max-w-[48ch] text-muted">{project.summary}</p>
          </div>
          <p className={`label col-start-2 mt-4 ${wide ? "md:col-start-3 md:mt-[0.45em] md:text-right" : ""}`}>
            {project.kind}
            <span className={`whitespace-nowrap text-faint ${wide ? "mt-1 block" : "before:mx-2 before:content-['·']"}`}>
              <span className="num">5</span>-star review
            </span>
          </p>
          {/* touch has no cursor label, so say it in words */}
          <span className="label col-start-2 mt-3 font-medium text-fg can-hover:hidden" aria-hidden="true">
            View case study →
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

export function Work() {
  const [a, b, c] = projects;
  return (
    <section id="work" className="page-x mx-auto max-w-page scroll-mt-24 pt-24 md:pt-32" aria-labelledby="work-title">
      <SectionHead
        id="work-title"
        lines={[
          "Three recent launches,",
          <span key="l1">
            all rated <span className="em-serif">five</span> stars.
          </span>,
        ]}
        aside={
          <div className="lg:text-right">
            <Button href="/work" variant="quiet">
              All projects
            </Button>
          </div>
        }
      />

      <div className="grid-page mt-14 gap-y-20 md:mt-20 md:gap-y-28">
        <Card wide project={a} ratio="aspect-[4/3] md:aspect-[16/9]" sizes="(min-width: 1600px) 1500px, 94vw" className="col-span-4 md:col-span-6 lg:col-span-12" />
        <Card project={b} ratio="aspect-[4/3]" sizes="(min-width: 1024px) 48vw, (min-width: 768px) 46vw, 92vw" className="col-span-4 md:col-span-3 lg:col-span-6" />
        <Card project={c} ratio="aspect-[4/5]" sizes="(min-width: 1024px) 40vw, (min-width: 768px) 46vw, 92vw" className="col-span-4 md:col-span-3 md:mt-40 lg:col-span-5 lg:col-start-8 lg:mt-56" />
      </div>
    </section>
  );
}

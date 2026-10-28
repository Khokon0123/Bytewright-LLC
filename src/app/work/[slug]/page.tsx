import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/lib/work";
import { WorkMedia } from "@/components/work-media";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/button";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: `${p.title}: case study`,
    description: p.summary,
    alternates: { canonical: `/work/${p.slug}` },
    openGraph: { type: "article", title: `${p.title}, a ByteWright case study`, description: p.summary },
  };
}

/* Heading on the left, story on the right. Space does the separating. */
function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="grid-page gap-y-6">
      <h2 className="col-span-4 text-h3 md:col-span-2 lg:col-span-3">{title}</h2>
      <div className="col-span-4 md:col-span-4 lg:col-span-7 lg:col-start-5">{children}</div>
    </section>
  );
}


/* Only seen for unknown slugs on their way to notFound(); every real slug is prerendered in full. */
function Shell() {
  return <div className="min-h-svh" aria-busy="true" />;
}

export default function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  return (
    <Suspense fallback={<Shell />}>
      <CaseStudy params={params} />
    </Suspense>
  );
}

async function CaseStudy({ params }: { params: PageProps<"/work/[slug]">["params"] }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const next = projects[(projects.indexOf(p) + 1) % projects.length];

  return (
    <article>
      <header className="page-x mx-auto max-w-page pt-[calc(9rem+env(safe-area-inset-top))] md:pt-[calc(12rem+env(safe-area-inset-top))] short:pt-[calc(6rem+env(safe-area-inset-top))]">
        <div className="grid-page gap-y-8">
          <Reveal as="h1" immediate className="col-span-4 text-h1 md:col-span-6 lg:col-span-10" lines={[p.title]} />
          <Reveal immediate opaque delay={200} className="col-span-4 md:col-span-4 lg:col-span-5">
            <p className="text-lead text-muted">{p.summary}</p>
          </Reveal>
          <Reveal immediate delay={300} className="col-span-4 md:col-span-6 lg:col-span-6 lg:col-start-7">
            <dl className="grid grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-3">
              <div>
                <dt className="label">Client</dt>
                <dd className="mt-1 text-small">{p.sector}</dd>
              </div>
              <div>
                <dt className="label">Review</dt>
                <dd className="mt-1 text-small">
                  <span className="num">5</span> stars
                </dd>
              </div>
              <div className="col-span-2 md:col-span-1">
                <dt className="label">Scope</dt>
                <dd className="mt-1 text-small">{p.services.join(", ")}</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </header>

      <Reveal className="page-x mx-auto mt-16 max-w-page md:mt-24">
        <WorkMedia project={p} ratio="aspect-[4/3] md:aspect-[16/9]" sizes="(min-width: 1600px) 1500px, 94vw" priority />
      </Reveal>

      <div className="page-x mx-auto mt-24 max-w-page space-y-20 md:mt-32 md:space-y-28">
        <Reveal>
          <Block title="Where it started">
            {p.challenge.map((t) => (
              <p key={t} className="mb-5 text-lead last:mb-0">
                {t}
              </p>
            ))}
          </Block>
        </Reveal>

        <Reveal>
          <Block title="What we did">
            <ol className="space-y-10">
              {p.approach.map((a) => (
                <li key={a.title}>
                  <div>
                    <h3 className="text-h3">{a.title}</h3>
                    <p className="mt-3 text-muted">{a.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Block>
        </Reveal>
      </div>

      {/* gallery: two screenshots, offset */}
      <div className="page-x mx-auto mt-24 max-w-page md:mt-32">
        <div className="grid-page gap-y-6">
          <Reveal className="col-span-4 md:col-span-3 lg:col-span-7">
            <WorkMedia project={p} suffix="-2" label="Screenshot" ratio="aspect-[4/3]" sizes="(min-width: 1024px) 56vw, (min-width: 768px) 46vw, 92vw" />
          </Reveal>
          <Reveal delay={120} className="col-span-4 md:col-span-3 md:mt-24 lg:col-span-5 lg:mt-40">
            <WorkMedia project={p} suffix="-3" label="Mobile screenshot" ratio="aspect-[4/5]" sizes="(min-width: 1024px) 40vw, (min-width: 768px) 46vw, 92vw" />
          </Reveal>
        </div>
      </div>

      <div className="page-x mx-auto mt-24 max-w-page md:mt-32">
        <Reveal>
          <Block title="Where it landed">
            {p.result.map((t) => (
              <p key={t} className="mb-5 text-lead last:mb-0">
                {t}
              </p>
            ))}
            {/* TODO: approved client quote */}
            <figure className="mt-14">
              <blockquote className="text-h3 text-muted">“[Client quote to be added]”</blockquote>
              <figcaption className="label mt-4">[Client name], {p.title}</figcaption>
            </figure>
          </Block>
        </Reveal>
      </div>

      {/* next project */}
      <nav aria-label="Next project" className="page-x mx-auto mt-28 max-w-page md:mt-40">
        <Link href={`/work/${next.slug}`} className="group grid-page items-end gap-y-3 pb-2">
          <span className="label col-span-4 md:col-span-6 lg:col-span-12">
            Next project
          </span>
          <span className="col-span-4 text-h1 transition-colors duration-300 group-hover:text-accent-ink md:col-span-5 lg:col-span-10">
            {next.title}
          </span>
          <span aria-hidden="true" className="hidden text-h1 text-faint transition-transform duration-500 ease-out-expo group-hover:translate-x-2 md:col-span-1 md:block md:text-right lg:col-span-2">
            →
          </span>
        </Link>
      </nav>

      <section className="page-x mx-auto mt-24 max-w-page md:mt-32" aria-label="Start a project">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-h3">Want something like this?</p>
            <Link href="/work" className="tap label link mt-2 hover:text-fg">
              Back to all work
            </Link>
          </div>
          <Button href="/contact">{site.cta}</Button>
        </div>
      </section>
    </article>
  );
}

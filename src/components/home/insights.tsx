import Link from "next/link";
import { posts } from "@/lib/insights";
import { SectionHead } from "@/components/section-head";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/button";

export function Insights() {
  return (
    <section className="page-x mx-auto max-w-page pt-section" aria-labelledby="insights-title">
      <SectionHead
        id="insights-title"
        lines={[
          <span key="l1">
            What we’ve learned, kept <span className="em-serif">short.</span>
          </span>,
        ]}
        aside={
          <div className="lg:text-right">
            <Button href="/insights" variant="quiet">
              All notes
            </Button>
          </div>
        }
      />
      {/* a list keeps its dividers: they separate items, they don't decorate */}
      <ul className="mt-14 md:mt-20">
        {posts.map((post, i) => (
          <Reveal as="li" key={post.slug} delay={i * 80} className="border-b border-line first:border-t">
            <Link href={`/insights/${post.slug}`} className="group grid-page items-baseline gap-y-2 py-7 md:py-9">
              <h3 className="col-span-4 text-h3 transition-colors duration-300 group-hover:text-accent-ink md:col-span-4 lg:col-span-8">
                {post.title}
              </h3>
              <span className="label col-span-4 md:col-span-2 md:text-right lg:col-span-4">{post.topic}</span>
            </Link>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

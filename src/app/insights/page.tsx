import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "@/lib/insights";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Insights",
  description: "Notes from the ByteWright studio on process, websites, and practical AI.",
  alternates: { canonical: "/insights" },
};

export default function InsightsPage() {
  return (
    <>
      <PageHero
        lines={[
          <span key="l1">
            Short notes on how we <span className="em-serif">work.</span>
          </span>,
        ]}
        intro={<p>What we’ve learned on real projects, written down plainly. No hot takes.</p>}
      />

      <section className="page-x mx-auto mt-20 max-w-page md:mt-28" aria-label="All posts">
        <ul className="border-t border-line">
          {posts.map((post, i) => (
            <Reveal as="li" key={post.slug} delay={i * 80} className="border-b border-line">
              <Link href={`/insights/${post.slug}`} className="group grid-page gap-y-4 py-9 md:py-12">
                <div className="col-span-4 md:col-span-5 lg:col-span-8">
                  <h2 className="text-h2 transition-colors duration-300 group-hover:text-accent-ink">{post.title}</h2>
                  <p className="mt-4 max-w-[56ch] text-muted">{post.excerpt}</p>
                  <p className="label mt-5">
                    {post.topic}, {post.status.toLowerCase()}, <span className="num">{post.readingTime}</span> min read
                  </p>
                </div>
                <span
                  aria-hidden="true"
                  className="col-span-4 hidden self-start pt-[0.3em] text-right text-h3 text-faint transition-[color,transform] duration-500 ease-out-expo group-hover:translate-x-1 group-hover:text-accent-ink md:col-span-1 md:block lg:col-span-1 lg:col-start-12"
                >
                  →
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>
    </>
  );
}

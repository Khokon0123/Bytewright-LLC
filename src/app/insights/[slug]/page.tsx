import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, posts } from "@/lib/insights";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/button";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/insights/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/insights/${post.slug}` },
    openGraph: { type: "article", title: post.title, description: post.excerpt },
  };
}


/* Only seen for unknown slugs on their way to notFound(); every real slug is prerendered in full. */
function Shell() {
  return <div className="min-h-svh" aria-busy="true" />;
}

export default function PostPage({ params }: PageProps<"/insights/[slug]">) {
  return (
    <Suspense fallback={<Shell />}>
      <Post params={params} />
    </Suspense>
  );
}

async function Post({ params }: { params: PageProps<"/insights/[slug]">["params"] }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const { default: Body } = await import(`@/content/insights/${slug}.mdx`);
  const others = posts.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <article>
      <header className="page-x mx-auto max-w-page pt-[calc(9rem+env(safe-area-inset-top))] md:pt-[calc(12rem+env(safe-area-inset-top))] short:pt-[calc(6rem+env(safe-area-inset-top))]">
        <div className="grid-page gap-y-8">
          <Reveal as="h1" immediate className="col-span-4 text-h1 md:col-span-6 lg:col-span-9" lines={[post.title]} />
          <Reveal immediate delay={200} className="col-span-4 flex gap-6 md:col-span-6 lg:col-span-8 lg:col-start-4">
            <p className="label">{post.topic}</p>
            <p className="label">{post.status}</p>
            <p className="label">
              <span className="num">{post.readingTime}</span> min read
            </p>
          </Reveal>
        </div>
      </header>

      <div className="page-x mx-auto mt-14 max-w-page md:mt-20">
        <div className="grid-page">
          {/* 65ch measure, offset to the reading column */}
          <div className="col-span-4 max-w-[65ch] md:col-span-6 lg:col-span-7 lg:col-start-4">
            <Body />
          </div>
        </div>
      </div>

      <section className="page-x mx-auto mt-24 max-w-page md:mt-32" aria-labelledby="more-title">
        <div className="grid-page gap-y-6">
          <h2 id="more-title" className="col-span-4 text-h3 md:col-span-6 lg:col-span-3">
            Keep reading
          </h2>
          <ul className="col-span-4 md:col-span-6 lg:col-span-9">
            {others.map((p) => (
              <li key={p.slug} className="border-b border-line first:border-t lg:first:border-t-0">
                <Link href={`/insights/${p.slug}`} className="group flex min-h-16 items-center justify-between gap-6 py-5">
                  <span className="text-h3 transition-colors group-hover:text-accent-ink">{p.title}</span>
                  <span aria-hidden="true" className="text-faint transition-transform duration-500 ease-out-expo group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-24 flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-h3">Thinking about a project?</p>
            <Link href="/insights" className="tap label link mt-2 hover:text-fg">
              Back to all notes
            </Link>
          </div>
          <Button href="/contact">{site.cta}</Button>
        </div>
      </section>
    </article>
  );
}

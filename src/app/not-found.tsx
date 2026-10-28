import { Button } from "@/components/button";

export default function NotFound() {
  return (
    <section className="page-x mx-auto flex min-h-[80svh] max-w-page flex-col justify-end pt-[calc(8rem+env(safe-area-inset-top))]" aria-labelledby="nf-title">
      <h1 id="nf-title" className="text-h1">
        This page doesn’t <span className="em-serif">exist.</span>
      </h1>
      <p className="mt-8 max-w-[40ch] text-lead text-muted">It may have moved, or the link may be mistyped.</p>
      <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
        <Button href="/">Back to the homepage</Button>
        <Button href="/work" variant="quiet">
          See the work
        </Button>
      </div>
    </section>
  );
}

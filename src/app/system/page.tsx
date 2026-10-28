import type { Metadata } from "next";
import { Button } from "@/components/button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Design system",
  robots: { index: false, follow: false },
};

const typeScale = [
  { token: "display", spec: "Switzer 500 · 80px → ~10vw · lh 0.95 · −0.045em", sample: "Software." , cls: "text-display" },
  { token: "h1", spec: "Switzer 500 · lh 0.98 · −0.035em", sample: "Let’s build it.", cls: "text-h1" },
  { token: "h2", spec: "Switzer 500 · lh 1.02 · −0.03em", sample: "Selected work", cls: "text-h2" },
  { token: "h3", spec: "Switzer 500 · lh 1.1 · −0.02em", sample: "New York Buddhist Bihar", cls: "text-h3" },
  { token: "lead", spec: "Switzer 400 · 18 → 23px · lh 1.45", sample: "We design and build websites, apps, and AI tools for people who care about quality.", cls: "text-lead text-muted" },
  { token: "body", spec: "Switzer 400 · 17 → 18px · lh 1.6", sample: "Every project starts with a conversation. We learn what you’re trying to do, then we design and build the smallest thing that does it well.", cls: "text-body" },
  { token: "label", spec: "Switzer 400/500 · 14px · sentence case · no tracking · muted", sample: "Selected work", cls: "label" },
];

const colours = [
  { name: "--bg", dark: "#0B0B0C", light: "#F4F2EE", use: "Page. Warm near-black, never #000." },
  { name: "--fg", dark: "#EDEBE7", light: "#111110", use: "Ink. 16.5:1 / 16.9:1." },
  { name: "--fg-muted", dark: "#8C8983", light: "#5F5C56", use: "Secondary copy, labels, nav. AA on both." },
  { name: "--fg-faint", dark: "#7C7973", light: "#726E67", use: "Tertiary: numbers, status. Just AA (4.5:1)." },
  { name: "--line", dark: "ink @ 12%", light: "ink @ 12%", use: "Hairlines. Structure without boxes." },
  { name: "--accent", dark: "#4F8EF7", light: "#4F8EF7", use: "CTA fill, ‘Wright’. Nothing else." },
  { name: "--accent-ink", dark: "#4F8EF7", light: "#2A62C9", use: "Link hover text. Deepened on paper for AA." },
];

/* Same rule as the site: a section opens with its heading. No numbers, no rules, no labels. */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="grid-page pb-28 md:pb-40">
      <h2 className="col-span-4 mb-10 text-h3 md:col-span-2 lg:col-span-3">{title}</h2>
      <div className="col-span-4 md:col-span-6 lg:col-span-9">{children}</div>
    </section>
  );
}

const rules = [
  ["Headlines introduce sections", "No section numbers, no rule-and-label combos, no small caption above a headline. The homepage carries no labels above headlines at all."],
  ["Write the headline a person would", "“How a project actually runs”, not “Our process”. Specific beats categorical."],
  ["Space, size and weight make structure", "Hairlines only divide items in a list (posts, form fields, menu). Never above a section, beside a label, or around a block."],
  ["Numbers only when order matters", "The four process steps, the project list, the steps after you get in touch. Nowhere else."],
  ["No em dashes in copy", "Use a period, comma or colon. En dashes stay only in number ranges ($10k – $25k)."],
  ["One serif word per major headline", "Instrument Serif Italic, never a phrase, never body copy."],
];

export default function SystemPage() {
  return (
    <div className="page-x mx-auto max-w-page">

      <div className="pt-16 md:pt-20">
        <div className="grid-page pt-20 pb-28 md:pt-32 md:pb-40">
          <h1 className="col-span-4 text-h1 md:col-span-6 lg:col-span-9">
            The <span className="em-serif">system</span>, before the site.
          </h1>
        </div>

        <Section title="Rules">
          <dl className="grid gap-x-[var(--spacing-grid)] gap-y-10 md:grid-cols-2">
            {rules.map(([k, v]) => (
              <div key={k}>
                <dt className="text-lead font-medium">{k}</dt>
                <dd className="mt-2 text-muted">{v}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section title="Hero">
          <h2 className="text-display">
            Software,
            <br />
            <span className="em-serif">crafted.</span>
          </h2>
          <div className="mt-10 grid gap-8 md:mt-14 lg:grid-cols-9 lg:gap-[var(--spacing-grid)]">
            <p className="text-lead text-muted lg:col-span-5 lg:col-start-4">
              We design and build websites, apps, and AI tools for people who care how things are made.
            </p>
          </div>
          <div className="mt-10 lg:ml-[33.33%]">
            <Button href="/contact">{site.cta}</Button>
          </div>
        </Section>


        <Section title="Type">
          <ul>
            {typeScale.map((t) => (
              <li key={t.token} className="grid gap-4 border-b border-line py-8 first:pt-0 lg:grid-cols-9 lg:gap-[var(--spacing-grid)]">
                <div className="lg:col-span-2">
                  <p className="label text-fg">{t.token}</p>
                  <p className="label mt-2">{t.spec}</p>
                </div>
                <p className={`lg:col-span-7 ${t.cls}`}>{t.sample}</p>
              </li>
            ))}
          </ul>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <div>
              <p className="label font-medium text-fg">Numbers</p>
              <p className="mt-3 flex items-baseline gap-4">
                <span className="num text-faint">01</span>
                <span className="num text-faint">02</span>
                <span className="num text-faint">2026</span>
                <span className="label">
                  <span className="num">5</span> stars
                </span>
              </p>
              <p className="mt-3 text-small text-muted">
                JetBrains Mono 13px, normal tracking, tabular figures. Numbers only: section and project numbers, years,
                counts. Labels, nav and metadata never use mono.
              </p>
            </div>
            <div>
              <p className="label font-medium text-fg">Links and email</p>
              <p className="mt-3">
                <a href="mailto:hello@bytewright.com" className="tap link">
                  hello@bytewright.com
                </a>
              </p>
              <p className="mt-3 text-small text-muted">
                Always lowercase. Ink colour, underline appears on hover and focus.
              </p>
            </div>
          </div>
          <p className="mt-10 max-w-[38ch] text-muted">
            One word per major headline gets <span className="em-serif text-fg">Instrument Serif</span>. Never a phrase,
            never body copy.
          </p>
        </Section>

        <Section title="Colour">
          <ul>
            {colours.map((c) => (
              <li key={c.name} className="grid grid-cols-[3.5rem_1fr] items-center gap-x-6 gap-y-1 border-b border-line py-5 first:pt-0 md:grid-cols-[3.5rem_12rem_14rem_1fr]">
                <span
                  aria-hidden="true"
                  className="row-span-2 size-14 border border-line md:row-span-1"
                  style={{ background: c.name === "--line" ? "var(--line)" : `var(${c.name})` }}
                />
                <span className="label text-fg">{c.name}</span>
                <span className="label col-start-2 md:col-start-auto">
                  dark {c.dark} · light {c.light}
                </span>
                <span className="col-span-2 mt-2 text-small text-muted md:col-span-1 md:mt-0">{c.use}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Grid">
          <div className="relative h-56 border-y border-line">
            <div className="grid-page absolute inset-0 !grid-cols-12">
              {Array.from({ length: 12 }, (_, i) => (
                <div key={i} className="flex h-full flex-col justify-between border-x border-line bg-fg/[0.025] p-1.5">
                  <span className="num text-faint">{String(i + 1).padStart(2, "0")}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-8 max-w-[52ch] text-muted">
            12 columns from 1024px, 6 on tablet, 4 on phones. Gutter scales 20 → 56px. Headlines sit left; supporting copy
            offsets to column 4 or 7. Sections are separated by 160px+ of air and a single hairline.
          </p>
        </Section>

        <Section title="Motion">
          <dl className="grid gap-x-[var(--spacing-grid)] gap-y-8 md:grid-cols-2">
            {[
              ["Ease", "Expo-out (0.16, 1, 0.3, 1). Fast start, long soft landing."],
              ["Headlines", "Line-by-line masked rise, 900ms, 80ms stagger, once."],
              ["Work", "Image scales 1 → 1.04 and drifts 1.5%, 1000ms. ‘View’ cursor, desktop only."],
              ["Smooth scrolling", "Lenis on mouse and trackpad only (touch keeps native scroll). Service marquee at ~70s per loop."],
              ["Reduced motion", "Everything resolves to its end state instantly. Lenis and marquee off."],
              ["Never", "Parallax for its own sake, bounces, spinning, scroll-jacking."],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="label text-fg">{k}</dt>
                <dd className="mt-3 text-muted">{v}</dd>
              </div>
            ))}
          </dl>
        </Section>
      </div>
    </div>
  );
}

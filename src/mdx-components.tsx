import type { MDXComponents } from "mdx/types";
import Link from "next/link";

/** Long-form type for Insights. Same system, tuned for reading: 65ch measure, 1.7 leading. */
const components: MDXComponents = {
  h2: (props) => <h2 className="mt-16 mb-5 text-h3 md:mt-20" {...props} />,
  h3: (props) => <h3 className="mt-10 mb-3 text-lead font-medium" {...props} />,
  p: (props) => <p className="my-5 leading-[1.7] text-fg/90" {...props} />,
  ul: (props) => <ul className="my-6 list-disc space-y-2 pl-5 marker:text-faint" {...props} />,
  ol: (props) => <ol className="my-6 list-decimal space-y-2 pl-5 marker:font-mono marker:text-faint" {...props} />,
  li: (props) => <li className="leading-[1.65] text-fg/90" {...props} />,
  blockquote: (props) => <blockquote className="my-12 text-h3 text-fg md:-ml-[4ch]" {...props} />,
  strong: (props) => <strong className="font-medium text-fg" {...props} />,
  hr: () => <hr className="my-16 border-0" />,
  code: (props) => <code className="rounded-sm bg-bg-raised px-1.5 py-0.5 text-[0.92em]" {...props} />,
  a: ({ href = "", ...props }) =>
    href.startsWith("/") ? (
      <Link href={href} className="underline decoration-line-strong hover:text-accent-ink hover:decoration-current touch:py-[0.75em]" {...props} />
    ) : (
      <a href={href} className="underline decoration-line-strong hover:text-accent-ink hover:decoration-current touch:py-[0.75em]" {...props} />
    ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}

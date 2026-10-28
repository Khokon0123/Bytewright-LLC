import type { CSSProperties, ElementType, ReactNode } from "react";

type Props = {
  as?: ElementType;
  className?: string;
  /** Headline lines. Each line rises out of its own mask. */
  lines?: ReactNode[];
  /** Or a block that fades up. */
  children?: ReactNode;
  /** ms before the first line moves */
  delay?: number;
  /** Reveal on first paint (hero) instead of on scroll. Pure CSS, no JS. */
  immediate?: boolean;
  /** With `immediate`: move only, never transparent. Use for the LCP block. */
  opaque?: boolean;
  id?: string;
};

/**
 * Server-rendered markup only. Scroll reveals are switched on by one shared
 * IntersectionObserver (<RevealObserver /> in the root layout), so a page with
 * forty reveals hydrates zero extra components.
 */
export function Reveal({ as: Tag = "div", className, lines, children, delay = 0, immediate = false, opaque = false, id }: Props) {
  const style = { "--d": `${delay}ms` } as CSSProperties;

  if (lines) {
    return (
      <Tag id={id} className={className} data-reveal={immediate ? "lines-now" : "lines"} style={style}>
        {lines.map((line, i) => (
          <span key={i} className="reveal-line">
            <span style={{ "--i": i } as CSSProperties}>{line}</span>
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag id={id} className={className} data-reveal={immediate ? (opaque ? "rise-now" : "fade-now") : "fade"} style={style}>
      {children}
    </Tag>
  );
}

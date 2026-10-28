/**
 * Slow, continuous list of what we do. Items are separated by space and alternating tone,
 * no glyphs. Duplicated once for a seamless loop.
 */
export function Marquee({ items, duration = 70 }: { items: string[]; duration?: number }) {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((item, i) => (
        <li key={item} className={`pr-[1.1em] text-h2 whitespace-nowrap ${i % 2 ? "text-muted" : "text-fg"}`}>
          {item}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="marquee overflow-hidden py-4 md:py-6" aria-label="What we do">
      <div className="marquee-track flex w-max" style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}>
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

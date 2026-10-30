"use client";

import { useSequence } from "./use-sequence";

/** A browser window where a page assembles itself, section by section. */
export function BrowserMock() {
  const { ref, at } = useSequence<HTMLDivElement>([200, 650, 1100, 1550, 2000]);
  const bar = "rounded-full bg-mock-line";
  return (
    <div ref={ref} className="mock w-full max-w-[34rem] overflow-hidden rounded-2xl border border-line bg-mock shadow-[0_30px_60px_-30px_rgb(0_0_0/0.6)]" aria-hidden="true">
      {/* chrome */}
      <div className="flex items-center gap-3 border-b border-mock-line px-4 py-3">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-mock-line" />
          <span className="size-2.5 rounded-full bg-mock-line" />
          <span className="size-2.5 rounded-full bg-mock-line" />
        </div>
        <div className="mx-auto flex h-6 w-1/2 items-center justify-center rounded-md bg-bg-tile text-[0.6875rem] text-faint">
          yourbrand.com
        </div>
        <span className="w-[2.6rem]" />
      </div>

      <div className="space-y-4 p-5 sm:p-6">
        {/* nav */}
        <div {...at(1)} className="flex items-center justify-between">
          <span className="text-[0.8125rem] font-semibold text-fg">Northfield</span>
          <div className="flex gap-3">
            <span className={`h-1.5 w-8 ${bar}`} />
            <span className={`h-1.5 w-8 ${bar}`} />
            <span className={`h-1.5 w-8 ${bar}`} />
          </div>
        </div>
        {/* hero */}
        <div {...at(2)} className="pt-3">
          <p className="text-[1.375rem] leading-tight font-semibold tracking-tight text-fg sm:text-[1.625rem]">
            Fresh bread,
            <br />
            baked before sunrise.
          </p>
          <div className="mt-4 flex items-center gap-3">
            <span className="h-7 w-24 rounded-full bg-accent" />
            <span className={`h-1.5 w-16 ${bar}`} />
          </div>
        </div>
        {/* tiles */}
        <div className="grid grid-cols-3 gap-3 pt-2">
          {[0, 1, 2].map((i) => (
            <div key={i} {...at(3)} style={{ transitionDelay: `${i * 90}ms` }} className="aspect-[4/5] rounded-lg bg-bg-tile" />
          ))}
        </div>
        {/* footer */}
        <div {...at(4)} className="flex items-center justify-between border-t border-mock-line pt-4">
          <span className={`h-1.5 w-20 ${bar}`} />
          <span className={`h-1.5 w-12 ${bar}`} />
        </div>
      </div>
    </div>
  );
}

"use client";

import { useSequence } from "./use-sequence";

const rows = [
  { t: "Morning run", s: "5.2 km" },
  { t: "Team standup", s: "9:30" },
  { t: "Lunch with Sam", s: "12:15" },
];

/** A phone where a tapped row opens a detail screen that slides in. */
export function PhoneMock() {
  const { ref, step, at } = useSequence<HTMLDivElement>([250, 900, 1350, 2000]);
  return (
    <div
      ref={ref}
      className="mock relative w-[13rem] rounded-[2.4rem] border border-line bg-bg p-2.5 shadow-[0_30px_60px_-30px_rgb(0_0_0/0.6)] "
      aria-hidden="true"
    >
      <div className="relative aspect-[9/19] overflow-hidden rounded-[1.95rem] bg-mock">
        {/* status bar */}
        <div className="flex items-center justify-between px-6 pt-3.5 text-[0.625rem] font-medium text-fg">
          <span className="num">9:41</span>
          <span className="h-4 w-16 rounded-full bg-bg" />
          <span className="h-1.5 w-5 rounded-full bg-fg/60" />
        </div>

        {/* list screen */}
        <div className="px-5 pt-6">
          <p className="text-[1.125rem] font-semibold tracking-tight text-fg">Today</p>
          <ul className="mt-4 space-y-2.5">
            {rows.map((r, i) => (
              <li
                key={r.t}
                {...at(1)}
                style={{ transitionDelay: `${i * 80}ms` }}
                className={`flex items-center justify-between rounded-xl px-3 py-3 text-[0.75rem] transition-colors ${
                  i === 1 && step === 2 ? "bg-accent/20" : "bg-bg-tile"
                }`}
              >
                <span className="text-fg">{r.t}</span>
                <span className="num text-faint">{r.s}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* detail screen slides over */}
        <div {...at(3, "slide")} className="absolute inset-0 bg-mock px-5 pt-10">
          <p className="text-[0.6875rem] text-accent-ink">‹ Today</p>
          <p className="mt-3 text-[1.125rem] font-semibold tracking-tight text-fg">Team standup</p>
          <p className="mt-1 text-[0.6875rem] text-muted">
            <span className="num">9:30</span> · Room 2 · 15 min
          </p>
          <div className="mt-5 space-y-2">
            <span className="block h-1.5 w-full rounded-full bg-mock-line" />
            <span className="block h-1.5 w-4/5 rounded-full bg-mock-line" />
            <span className="block h-1.5 w-3/5 rounded-full bg-mock-line" />
          </div>
          <div className="mt-6 flex -space-x-2">
            {[0, 1, 2].map((i) => (
              <span key={i} className="size-7 rounded-full border-2 border-mock bg-bg-tile" />
            ))}
          </div>
          <div {...at(4)} className="absolute inset-x-5 bottom-6 flex h-10 items-center justify-center rounded-full bg-accent text-[0.75rem] font-medium text-on-accent">
            Join call
          </div>
        </div>
      </div>
    </div>
  );
}

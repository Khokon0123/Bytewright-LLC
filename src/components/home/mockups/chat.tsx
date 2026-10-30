"use client";

import { useSequence } from "./use-sequence";

function Typing() {
  return (
    <div className="mock-typing flex w-fit gap-1 rounded-2xl rounded-bl-md bg-bg-tile px-3.5 py-3">
      <span className="size-1.5 rounded-full bg-muted" />
      <span className="size-1.5 rounded-full bg-muted" />
      <span className="size-1.5 rounded-full bg-muted" />
    </div>
  );
}

const them = "w-fit max-w-[85%] rounded-2xl rounded-br-md bg-accent px-3.5 py-2.5 text-on-accent ml-auto";
const bot = "w-fit max-w-[85%] rounded-2xl rounded-bl-md bg-bg-tile px-3.5 py-2.5 text-fg";

/** A support assistant answering a customer, one message at a time. */
export function ChatMock() {
  // 1 customer · 2 typing · 3 answer · 4 customer · 5 typing · 6 answer
  const { ref, step, at } = useSequence<HTMLDivElement>([300, 1100, 2300, 3300, 4000, 5100]);
  const typing = step === 2 || step === 5;
  return (
    <div
      ref={ref}
      className="mock flex w-full max-w-[26rem] flex-col overflow-hidden rounded-2xl border border-line bg-mock shadow-[0_30px_60px_-30px_rgb(0_0_0/0.6)]"
      aria-hidden="true"
    >
      <div className="flex items-center gap-3 border-b border-mock-line px-4 py-3">
        <span className="grid size-7 place-items-center rounded-full bg-bg-tile text-[0.6875rem] font-semibold text-fg">N</span>
        <div className="leading-tight">
          <p className="text-[0.8125rem] font-medium text-fg">Northfield support</p>
          <p className="text-[0.6875rem] text-faint">Assistant · replies instantly</p>
        </div>
      </div>

      <div className="flex min-h-[19rem] flex-col justify-end gap-2.5 p-4 text-[0.8125rem] leading-snug">
        <p {...at(1)} className={them}>
          Hi! Can I change the delivery address on order <span className="num">#4821</span>?
        </p>
        {step >= 3 && (
          <p className={`mock-in ${bot}`}>
            Yes. It hasn’t shipped yet, so I’ve updated it to <span className="text-soft">14 Elm Street</span>. Same delivery date.
          </p>
        )}
        {step >= 4 && (
          <p className={`mock-in ${them}`}>
            Perfect, thank you.
          </p>
        )}
        {step >= 6 && (
          <p className={`mock-in ${bot}`}>
            You’re welcome. A confirmation is on its way to your inbox.
          </p>
        )}
        {typing && (
          <div className="mock-in">
            <Typing />
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 border-t border-mock-line px-4 py-3">
        <span className="h-8 flex-1 rounded-full bg-bg-tile" />
        <span className="grid size-8 place-items-center rounded-full bg-accent text-on-accent">↑</span>
      </div>
    </div>
  );
}

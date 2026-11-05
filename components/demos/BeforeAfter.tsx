"use client";

import { useId, useState } from "react";

type Side = { label: string; content: React.ReactNode };

type BeforeAfterProps = {
  before: Side;
  after: Side;
  /** Width / height of the two pictures, which must match. */
  ratio: string;
  caption: React.ReactNode;
};

/**
 * Two pictures stacked; a native range input wipes from one to the other,
 * so dragging, touch and the arrow keys all work.
 */
export function BeforeAfter({ before, after, ratio, caption }: BeforeAfterProps) {
  const [split, setSplit] = useState(50);
  const id = useId();

  return (
    <figure className="max-w-[640px]">
      <div className="relative overflow-hidden border border-rule select-none has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-offset-2 has-[input:focus-visible]:outline-ink" style={{ aspectRatio: ratio }}>
        <div className="absolute inset-0">{after.content}</div>
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}>
          {before.content}
        </div>

        <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-ink" style={{ left: `calc(${split}% - 1px)` }} aria-hidden>
          <span className="absolute top-1/2 left-1/2 block h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-ink bg-ball" />
        </div>
        <span className="meta pointer-events-none absolute top-2 left-2 bg-paper px-1.5 text-ink" aria-hidden>
          {before.label}
        </span>
        <span className="meta pointer-events-none absolute top-2 right-2 bg-paper px-1.5 text-ink" aria-hidden>
          {after.label}
        </span>

        <label htmlFor={id} className="sr-only">
          Share of the picture showing “{before.label}”, the rest shows “{after.label}”
        </label>
        <input
          id={id}
          type="range"
          min={0}
          max={100}
          value={split}
          onChange={(event) => setSplit(Number(event.target.value))}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
      <figcaption className="meta mt-2 text-[11px]">{caption}</figcaption>
    </figure>
  );
}

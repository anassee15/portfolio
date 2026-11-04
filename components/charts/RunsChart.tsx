"use client";

import { useState } from "react";

const RUNS = 5;
const SUCCESS_RATE = 0.7;
// The first render is fixed (4 passes, 1 failure) so server and client agree.
const FIRST_RUNS = [true, true, false, true, true];

/** The same question replayed five times: pass@5 needs one success, pass^5 needs all of them. */
export function RunsChart() {
  const [runs, setRuns] = useState(FIRST_RUNS);
  const passAtK = runs.some(Boolean);
  const passHatK = runs.every(Boolean);

  return (
    <figure>
      <figcaption>
        <p className="text-[13px] font-medium">The same question, replayed {RUNS} times</p>
        <p className="meta mb-3 text-[11px]">Each try succeeds 70 % of the time. Replay to roll again.</p>
      </figcaption>

      <ol className="flex gap-3" aria-label="Results of the five tries">
        {runs.map((ok, i) => (
          <li
            key={i}
            className={`grid size-10 place-items-center text-base font-bold text-paper ${ok ? "bg-ink" : "bg-ball-text"}`}
          >
            <span aria-hidden>{ok ? "✓" : "✗"}</span>
            <span className="sr-only">{`Try ${i + 1}: ${ok ? "pass" : "fail"}`}</span>
          </li>
        ))}
      </ol>

      <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-[13px]" aria-live="polite">
        <dt className="font-bold">pass@5</dt>
        <dd className="text-ink-2">{passAtK ? "pass: one success is enough" : "fail: not a single success"}</dd>
        <dt className="font-bold">pass^5</dt>
        <dd className={passHatK ? "text-ink-2" : "text-ball-text"}>
          {passHatK ? "pass: all five succeeded" : "fail: all five must pass"}
        </dd>
      </dl>

      <button
        type="button"
        onClick={() => setRuns(Array.from({ length: RUNS }, () => Math.random() < SUCCESS_RATE))}
        className="meta mt-4 cursor-pointer border border-ink px-2.5 py-1.5 text-[11px] text-ink"
      >
        Replay
      </button>
    </figure>
  );
}

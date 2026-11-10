"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, usePrefersReducedMotion } from "@/lib/hooks";
import { conversation, trajectory, verdicts } from "./eva-replay-script";

const STEP_MS = 1100;
// Steps: each message, then the trajectory and the judges' verdicts.
const LAST_STEP = conversation.length + 1;

/** A harness conversation that plays out message by message, then opens what happened behind it. */
export function EvaReplay() {
  const frame = useRef<HTMLDivElement>(null);
  const inView = useInView(frame, { rootMargin: "-15% 0px", once: true });
  const reducedMotion = usePrefersReducedMotion();
  // Everything is shown on the server and without motion; the replay starts from 0.
  const [step, setStep] = useState(LAST_STEP);
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reset before the replay starts
    setStep(0);
  }, [reducedMotion, run]);

  useEffect(() => {
    if (reducedMotion || !inView || step >= LAST_STEP) return;
    const timer = setTimeout(() => setStep((s) => s + 1), step === 0 ? 300 : STEP_MS);
    return () => clearTimeout(timer);
  }, [reducedMotion, inView, step]);

  const showBehind = step >= LAST_STEP;

  return (
    <div ref={frame}>
      <p className="meta mb-3 text-[0.6875rem]">Harness situation, anonymised. The policyholder is simulated.</p>

      <ol className="grid gap-2" aria-live="polite">
        {conversation.slice(0, step).map((message, i) => (
          <li
            key={i}
            className={`max-w-[85%] rounded-[14px] border px-3 py-2 text-sm ${
              message.from === "eva"
                ? "justify-self-end border-ink bg-ink text-paper"
                : "border-rule bg-surface"
            }`}
          >
            <small className="mb-0.5 block font-mono text-[0.625rem] opacity-70">
              {message.from === "eva" ? "EVA" : "simulated policyholder"}
            </small>
            {message.text}
          </li>
        ))}
      </ol>

      {showBehind && <BehindTheAnswer />}

      {!reducedMotion && (
        <button
          type="button"
          onClick={() => setRun((n) => n + 1)}
          className="meta mt-4 cursor-pointer border border-ink px-2.5 py-1.5 text-[0.6875rem] text-ink"
        >
          Replay
        </button>
      )}
    </div>
  );
}

function BehindTheAnswer() {
  return (
    <div className="mt-5 grid gap-4 border-t border-rule pt-4 text-[0.8125rem]">
      <div>
        <p className="meta mb-1.5 text-[0.6875rem] uppercase">Trajectory</p>
        <ol className="grid gap-1 font-mono text-xs text-ink-2">
          {trajectory.map((step, i) => (
            <li key={step}>
              {i + 1}. {step}
            </li>
          ))}
        </ol>
      </div>
      <div>
        <p className="meta mb-1.5 text-[0.6875rem] uppercase">Judges</p>
        <ul className="grid gap-1">
          {verdicts.map(({ claim, verdict }) => (
            <li key={claim} className="flex justify-between gap-3">
              <span className="text-ink-2">{claim}</span>
              <span className="font-mono text-xs whitespace-nowrap">{verdict}</span>
            </li>
          ))}
        </ul>
        <p className="mt-2 font-medium">Goal met in 2 turns.</p>
      </div>
    </div>
  );
}

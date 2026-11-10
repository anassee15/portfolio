import type { BarChartData } from "@/data/projects";

/**
 * Horizontal bars on a linear scale, one highlighted in orange, the value at the end of
 * each bar. Plain HTML: labels and values are real text, so screen readers read the list.
 * A bar with `low` is a range: solid up to `low`, lighter up to `value`.
 */
export function BarChart({ title, bars, note }: BarChartData) {
  const max = Math.max(...bars.map((bar) => bar.value));
  const pct = (v: number) => `${Math.max((v / max) * 100, 0.4)}%`;

  return (
    <figure>
      <figcaption className="mb-3 text-[0.8125rem] font-medium">{title}</figcaption>
      <ul className="grid gap-2.5">
        {bars.map((bar) => (
          <li key={bar.label}>
            <p className="mb-1 text-[0.75rem] leading-tight text-ink-2">{bar.label}</p>
            {/* Room on the right for the value of the longest bar. */}
            <div className="relative mr-14 h-3.5" aria-hidden>
              <div
                className={`absolute inset-y-0 left-0 ${bar.highlight ? "bg-ball" : "bg-bar"} ${bar.low ? "opacity-40" : ""}`}
                style={{ width: pct(bar.value) }}
              />
              {bar.low && (
                <div className={`absolute inset-y-0 left-0 ${bar.highlight ? "bg-ball" : "bg-bar"}`} style={{ width: pct(bar.low) }} />
              )}
              <span
                className="absolute top-1/2 ml-2 -translate-y-1/2 text-[0.8125rem] font-medium whitespace-nowrap tabular-nums"
                style={{ left: pct(bar.value) }}
              >
                {bar.display}
              </span>
            </div>
            <span className="sr-only">{bar.display}</span>
          </li>
        ))}
      </ul>
      <p className="meta mt-3 text-[0.6875rem]">{note}</p>
    </figure>
  );
}

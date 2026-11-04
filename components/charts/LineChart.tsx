"use client";

import { useState } from "react";

export type Series = { name: string; values: number[]; highlight?: boolean };

type LineChartProps = {
  title: string;
  subtitle?: string;
  xLabels: string[];
  series: Series[];
  /** Values are fractions in [0, 1], shown as percentages. */
  yTicks?: number[];
};

const W = 420;
const H = 210;
const PAD = { left: 40, right: 64, top: 10, bottom: 30 };

const percent = (v: number) => `${Math.round(v * 100)} %`;

/**
 * Small line chart with one highlighted series. Hovering a column shows its exact values;
 * a hidden table carries the same data for screen readers.
 */
export function LineChart({ title, subtitle, xLabels, series, yTicks = [0, 0.25, 0.5, 0.75, 1] }: LineChartProps) {
  const [active, setActive] = useState<number | null>(null);
  const last = xLabels.length - 1;
  const sx = (i: number) => PAD.left + (i / last) * (W - PAD.left - PAD.right);
  const sy = (v: number) => PAD.top + (1 - v) * (H - PAD.top - PAD.bottom);
  const color = (s: Series) => (s.highlight ? "var(--ball)" : "var(--muted)");

  return (
    <figure>
      <figcaption>
        <p className="text-[13px] font-medium">{title}</p>
        {subtitle && <p className="meta mb-2 text-[11px]">{subtitle}</p>}
      </figcaption>
      <ul className="mb-1.5 flex flex-wrap gap-4 text-xs font-medium text-ink-2" aria-hidden>
        {series.map((s) => (
          <li key={s.name} className="flex items-center gap-1.5">
            <i className="inline-block h-0.5 w-3.5" style={{ background: color(s) }} />
            {s.name}
          </li>
        ))}
      </ul>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full overflow-visible"
        aria-hidden
        onPointerLeave={() => setActive(null)}
      >
        {yTicks.map((v) => (
          <g key={v}>
            <line x1={PAD.left} x2={W - PAD.right} y1={sy(v)} y2={sy(v)} className="stroke-rule" />
            <text x={PAD.left - 8} y={sy(v) + 4} textAnchor="end" className="fill-muted text-[10px]">
              {percent(v)}
            </text>
          </g>
        ))}
        {xLabels.map((label, i) => (
          <text key={label} x={sx(i)} y={H - 10} textAnchor="middle" className="fill-muted text-[10px]">
            {label}
          </text>
        ))}

        {active !== null && <line x1={sx(active)} x2={sx(active)} y1={PAD.top} y2={H - PAD.bottom} className="stroke-ink-2" strokeDasharray="2 3" />}

        {series.map((s) => (
          <g key={s.name}>
            <path
              d={s.values.map((v, i) => `${i ? "L" : "M"}${sx(i)} ${sy(v)}`).join(" ")}
              fill="none"
              stroke={color(s)}
              strokeWidth={2}
              strokeLinejoin="round"
            />
            {s.values.map((v, i) => (
              <circle key={i} cx={sx(i)} cy={sy(v)} r={active === i ? 6 : 4.5} fill={color(s)} className="stroke-paper" strokeWidth={2} />
            ))}
            {/* Value at the end of the line, or at the hovered point. */}
            <text x={sx(active ?? last) + 10} y={sy(s.values[active ?? last]) + 4} className="fill-ink text-xs font-medium">
              {percent(s.values[active ?? last])}
            </text>
          </g>
        ))}

        {/* Invisible columns that catch the pointer. */}
        {xLabels.map((label, i) => (
          <rect
            key={label}
            x={sx(i) - (W - PAD.left - PAD.right) / last / 2}
            y={0}
            width={(W - PAD.left - PAD.right) / last}
            height={H}
            fill="transparent"
            onPointerEnter={() => setActive(i)}
          />
        ))}
      </svg>

      <table className="sr-only">
        <caption>{title}</caption>
        <thead>
          <tr>
            <th scope="col">k</th>
            {series.map((s) => (
              <th key={s.name} scope="col">
                {s.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {xLabels.map((label, i) => (
            <tr key={label}>
              <th scope="row">{label}</th>
              {series.map((s) => (
                <td key={s.name}>{percent(s.values[i])}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}

import type { Figure } from "@/data/projects";

/**
 * A row of key figures, read like a scoreboard: an orange tick, the number in the
 * display face, signs and units kept smaller so the digits carry the weight.
 * The first figure is the headline; the source sits underneath.
 */
export function Figures({ figures, source }: { figures: Figure[]; source: string }) {
  const [headline, ...rest] = figures;
  return (
    <div className="@container">
      <dl className="grid grid-cols-2 items-end gap-x-7 gap-y-8 @lg:grid-cols-3 @4xl:grid-cols-[1.5fr_repeat(3,minmax(0,1fr))]">
        <Item figure={headline} className="col-span-full @4xl:col-span-1" big />
        {rest.map((figure) => (
          <Item key={figure.label} figure={figure} />
        ))}
      </dl>
      <p className="meta mt-5 text-[11px]">{source}</p>
    </div>
  );
}

/** "≈ CHF 360k" → ["≈ CHF ", "360", "k"]: the digits, and what surrounds them. */
function splitValue(value: string): [string, string, string] {
  const match = value.match(/^(\D*)([\d.,]+)(.*)$/);
  return match ? [match[1], match[2], match[3]] : ["", value, ""];
}

function Item({ figure, big, className }: { figure: Figure; big?: boolean; className?: string }) {
  const [prefix, digits, suffix] = splitValue(figure.value);
  return (
    <div className={`flex flex-col-reverse ${className ?? ""}`}>
      <dt className="mt-2 font-mono text-[11px] leading-snug tracking-[0.06em] text-ink-2 uppercase">{figure.label}</dt>
      <dd
        className={`font-display leading-[0.85] font-black whitespace-nowrap tabular-nums ${
          big ? "text-[clamp(72px,10vw,112px)]" : "text-[clamp(44px,5.4vw,64px)]"
        }`}
      >
        {prefix && <span className="mr-[0.08em] text-[0.56em] font-bold text-ink-2">{prefix.trim()}</span>}
        {digits}
        {suffix && <span className="ml-[0.04em] text-[0.6em] text-ball-text">{suffix}</span>}
      </dd>
      <span className={`mb-3 block h-1 bg-ball ${big ? "w-12" : "w-8"}`} aria-hidden />
    </div>
  );
}

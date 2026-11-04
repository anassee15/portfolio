import type { Figure } from "@/data/projects";

/** A row of key figures: the first one is the headline, the source sits underneath. */
export function Figures({ figures, source }: { figures: Figure[]; source: string }) {
  const [headline, ...rest] = figures;
  return (
    <div className="@container">
      <dl className="grid grid-cols-2 items-end gap-x-7 gap-y-6 @3xl:grid-cols-[1.4fr_repeat(3,minmax(0,1fr))]">
        <Item figure={headline} className="col-span-2 @3xl:col-span-1" big />
        {rest.map((figure) => (
          <Item key={figure.label} figure={figure} />
        ))}
      </dl>
      <p className="meta mt-3.5 text-[11px]">{source}</p>
    </div>
  );
}

function Item({ figure, big, className }: { figure: Figure; big?: boolean; className?: string }) {
  return (
    <div className={`flex flex-col-reverse ${className ?? ""}`}>
      <dt className="mt-1.5 text-[13px] leading-snug text-ink-2">{figure.label}</dt>
      <dd className={`leading-none font-medium whitespace-nowrap tracking-[-0.01em] ${big ? "text-[clamp(46px,6vw,66px)]" : "text-[clamp(28px,3.6vw,38px)]"}`}>
        {figure.value}
      </dd>
    </div>
  );
}

import { Icon, type IconName } from "@/components/icons/Icon";

/** Building blocks shared by the EVA and harness architecture figures. */

export type Block = { icon: IconName; kicker: string; title: string; text: string; mine?: boolean };

export function Card({ icon, kicker, title, text, mine }: Block) {
  return (
    <div className={`flex gap-2.5 border bg-paper px-3 py-2.5 ${mine ? "border-ball" : "border-rule"}`}>
      <Icon name={icon} className="mt-1 text-ink-2" />
      <div>
        <p className={`font-mono text-[10px] tracking-[0.06em] uppercase ${mine ? "text-ball-text" : "text-muted"}`}>
          {mine && <span aria-hidden>● </span>}
          {kicker}
          {mine && <span className="sr-only"> (my work)</span>}
        </p>
        <p className="mt-0.5 text-sm leading-snug font-bold">{title}</p>
        <p className="mt-0.5 text-xs leading-snug text-ink-2">{text}</p>
      </div>
    </div>
  );
}

export function Layer({ index, name, children }: { index: number; name: string; children: React.ReactNode }) {
  return (
    <div role="group" aria-label={name}>
      <p className="meta mb-2 flex items-center gap-3 text-[11px] tracking-[0.06em] uppercase">
        <span>
          {index} · {name}
        </span>
        <span className="h-px flex-1 bg-rule" aria-hidden />
      </p>
      {children}
    </div>
  );
}

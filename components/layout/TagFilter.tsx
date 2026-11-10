import Link from "next/link";

export type TagOption = { tag: string | null; label: string; count: number };

type TagFilterProps = {
  /** Page the filter links to, e.g. "/projects". */
  base: string;
  options: TagOption[];
  active: string | null;
  /** For screen readers: "3 projects", "2 notes". */
  noun: string;
};

/** Text buttons; the chosen tag lives in the URL (?tag=), so a filtered view can be shared. */
export function TagFilter({ base, options, active, noun }: TagFilterProps) {
  return (
    <nav aria-label="Filter by tag">
      <ul className="flex flex-wrap gap-x-5 gap-y-2">
        {options.map(({ tag, label, count }) => {
          const current = tag === active;
          return (
            <li key={label}>
              <Link
                href={tag ? `${base}?tag=${encodeURIComponent(tag)}` : base}
                scroll={false}
                aria-current={current ? "page" : undefined}
                className={`text-[0.9375rem] font-medium underline-offset-[6px] ${
                  current ? "underline decoration-ball decoration-2" : "text-ink-2 hover:text-ink"
                }`}
              >
                {label}
                <span className="meta ml-1 text-[0.6875rem]" aria-hidden>
                  {count}
                </span>
                <span className="sr-only">
                  , {count} {noun}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

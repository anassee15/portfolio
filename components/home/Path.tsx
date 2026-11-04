import { Section } from "@/components/layout/Section";
import { education, experience, intro, type PathEntry } from "@/data/path";

export function Path() {
  return (
    <Section label="Path" id="path">
      <h2 className="mb-3 font-display text-[clamp(26px,3.6vw,36px)] leading-[1.02] font-extrabold">
        From robots to agents in production
      </h2>
      <p className="max-w-[62ch] text-[17px]">{intro}</p>
      <div className="mt-8 grid gap-x-10 gap-y-8 md:grid-cols-2">
        <Entries title="Experience" entries={experience} />
        <Entries title="Education" entries={education} />
      </div>
    </Section>
  );
}

function Entries({ title, entries }: { title: string; entries: PathEntry[] }) {
  return (
    <div>
      <h3 className="mb-1 font-display text-[19px] leading-tight font-extrabold">{title}</h3>
      <ul>
        {entries.map((entry) => (
          <li key={entry.role} className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-4 border-t border-rule py-3 first:border-t-0">
            <p className="font-medium">
              {entry.org}
              <span className="block font-normal text-ink-2 lg:inline">
                <span className="hidden lg:inline"> · </span>
                {entry.role}
              </span>
            </p>
            <p className="meta pt-0.5 text-right tabular-nums">{entry.dates}</p>
            <p className="col-span-2 mt-0.5 text-[14px] leading-snug text-ink-2">{entry.detail}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

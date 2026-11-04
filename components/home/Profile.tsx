import { Section } from "@/components/layout/Section";
import { education, experience, strengths, type PathEntry } from "@/data/profile";

export function Profile() {
  return (
    <Section label="Profile" id="profile">
      <h2 className="mb-5 font-display text-[clamp(26px,3.6vw,36px)] leading-[1.02] font-extrabold">What I bring</h2>
      <dl className="grid gap-x-10 md:grid-cols-2">
        {strengths.map(({ title, proof, keywords }) => (
          <div key={title} className="border-t border-rule py-4">
            <dt className="font-display text-[20px] leading-tight font-extrabold">{title}</dt>
            <dd className="mt-1 max-w-[52ch] text-[14px] leading-snug text-ink-2">{proof}</dd>
            <dd className="meta mt-2 text-[11px]">{keywords.join(" · ")}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-6 grid gap-x-10 gap-y-6 md:grid-cols-2">
        <Entries title="Experience" entries={experience} />
        <Entries title="Education" entries={education} />
      </div>
    </Section>
  );
}

function Entries({ title, entries }: { title: string; entries: PathEntry[] }) {
  return (
    <div>
      <h3 className="meta mb-1.5 tracking-[0.06em] uppercase">{title}</h3>
      <ul className="text-[14px]">
        {entries.map(({ org, role, dates }) => (
          <li key={role} className="grid grid-cols-[72px_minmax(0,1fr)] gap-x-3 py-0.5">
            <span className="meta pt-px tabular-nums">{dates}</span>
            <span>
              <span className="font-medium">{org}</span> <span className="text-ink-2">· {role}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

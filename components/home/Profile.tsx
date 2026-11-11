import { Section } from "@/components/layout/Section";
import { education, experience, type PathEntry, type Role } from "@/data/profile";

export function Profile() {
  return (
    <Section label="Background" id="profile">
      <div className="grid gap-y-12">
        <Entries title="Experience" entries={experience} />
        <Entries title="Education" entries={education} />
      </div>
    </Section>
  );
}

function Entries({ title, entries }: { title: string; entries: PathEntry[] }) {
  return (
    <div>
      <h2 className="mb-4 font-display text-[clamp(1.625rem,3.6vw,2.25rem)] leading-[1.02] font-extrabold">{title}</h2>
      <ul className="border-b border-rule">
        {entries.map((entry) => (
          <Entry key={entry.org} entry={entry} />
        ))}
      </ul>
    </div>
  );
}

const orgName = "font-display text-[1.5rem] leading-[1.05] font-extrabold";

/**
 * One ruled row per organisation: its logo once, then one line per role held there.
 * From 1024px every role line shares the same three columns (who and when, what, the number
 * to remember), so the page reads as one table. Below, each role is a plain top-to-bottom
 * block, and the roles of one organisation hang on a rail.
 */
function Entry({ entry: { org, logo, emblem, roles } }: { entry: PathEntry }) {
  const grouped = roles.length > 1;
  return (
    <li className="relative grid gap-x-6 gap-y-3 border-t border-rule py-5 sm:grid-cols-[104px_minmax(0,1fr)] lg:grid-cols-[112px_minmax(0,1fr)] lg:gap-x-8">
      {/* On a phone the logo sits to the right of the name; from 640px it has its own column. */}
      <span
        aria-hidden
        className={`absolute right-0 block w-[84px] bg-ink [mask-position:right_center] [mask-repeat:no-repeat] [mask-size:contain] sm:static sm:w-[96px] sm:[mask-position:left_center] ${
          emblem ? "top-3.5 h-[36px] sm:-mt-1 sm:h-[46px]" : "top-5 h-[22px] sm:mt-0.5 sm:h-[26px]"
        }`}
        style={{
          maskImage: `url(/logos/${logo})`,
          WebkitMaskImage: `url(/logos/${logo})`,
        }}
      />
      <div className="grid gap-y-4">
        <h3 className={`${orgName} pr-24 sm:pr-0 lg:hidden`}>{org}</h3>
        {roles.map((role, index) => (
          <RoleLine key={role.title} role={role} org={index === 0 ? org : undefined} grouped={grouped} />
        ))}
      </div>
    </li>
  );
}

function RoleLine({
  role: { title, dates, detail, figure, current },
  org,
  grouped,
}: {
  role: Role;
  /** Set on the first role only: from 1024px the name sits on its line. */
  org?: string;
  grouped: boolean;
}) {
  const rail = grouped ? `border-l-2 pl-4 lg:border-l-0 lg:pl-0 ${current ? "border-l-ball" : "border-l-rule"}` : "";
  const divider = org ? "" : "lg:border-t lg:border-dashed lg:border-rule lg:pt-4";
  return (
    <div
      className={`grid items-start gap-y-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)_8.5rem] lg:gap-x-8 ${rail} ${divider}`}
    >
      <div>
        {org && <h3 className={`${orgName} mb-1 hidden lg:block`}>{org}</h3>}
        <p className="text-[0.9375rem] leading-snug font-medium">{title}</p>
        <p className="meta mt-1 tabular-nums">{dates}</p>
      </div>
      <p className="max-w-[58ch] text-[0.875rem] leading-relaxed text-ink-2 lg:pt-1">{detail}</p>
      <p className="mt-1 flex items-baseline gap-2 lg:mt-0 lg:block lg:text-right">
        <span
          className={`font-display text-[1.625rem] leading-[0.9] font-black whitespace-nowrap tabular-nums lg:block lg:text-[clamp(1.75rem,3vw,2.25rem)] ${current ? "text-ball-text" : ""}`}
        >
          {figure.value}
        </span>
        <span className="font-mono text-[0.6875rem] tracking-[0.06em] text-ink-2 uppercase lg:mt-1.5 lg:block">
          {figure.label}
        </span>
      </p>
    </div>
  );
}

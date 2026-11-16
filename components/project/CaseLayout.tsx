import { Section } from "@/components/layout/Section";
import type { CaseSection, CaseSubsection } from "@/lib/content";

/** Extra content for a section or a subsection, keyed by its id ("the-system", "results", ...). */
export type CaseSlots = Record<string, { before?: React.ReactNode; after?: React.ReactNode }>;

export function CaseLayout({ sections, slots = {} }: { sections: CaseSection[]; slots?: CaseSlots }) {
  return (
    <>
      {sections.map((section) => {
        const slot = slots[section.id] ?? {};
        return (
          <Section key={section.id} id={section.id} label={section.label}>
            {slot.before}
            {section.html && <div className="prose" dangerouslySetInnerHTML={{ __html: section.html }} />}
            {section.subsections.length > 0 && (
              <ol className="mt-4 grid">
                {section.subsections.map((subsection, i) => (
                  <Subsection key={subsection.id} subsection={subsection} index={i + 1} slot={slots[subsection.id]} />
                ))}
              </ol>
            )}
            {slot.after}
          </Section>
        );
      })}
    </>
  );
}

/** A numbered `###` block: title, text, then its figure. */
function Subsection({ subsection, index, slot = {} }: { subsection: CaseSubsection; index: number; slot?: CaseSlots[string] }) {
  return (
    <li id={subsection.id} className="border-t border-dashed border-rule py-10 first:border-t-0 first:pt-4 last:pb-0">
      <h3 className="mb-4 flex items-baseline gap-3 font-display text-[clamp(1.5rem,3vw,1.875rem)] leading-[1.05] font-extrabold">
        <span className="font-mono text-[0.8125rem] font-medium text-ball-text tabular-nums">
          {String(index).padStart(2, "0")}
        </span>
        {subsection.label}
      </h3>
      {slot.before}
      <div className="prose" dangerouslySetInnerHTML={{ __html: subsection.html }} />
      {slot.after}
    </li>
  );
}

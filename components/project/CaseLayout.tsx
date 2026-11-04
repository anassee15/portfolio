import { Section } from "@/components/layout/Section";
import type { CaseSection } from "@/lib/content";

/** Extra content for a section, keyed by section id ("the-system", "results", ...). */
export type CaseSlots = Record<string, { before?: React.ReactNode; after?: React.ReactNode }>;

export function CaseLayout({ sections, slots = {} }: { sections: CaseSection[]; slots?: CaseSlots }) {
  return (
    <>
      {sections.map((section) => {
        const slot = slots[section.id] ?? {};
        return (
          <Section key={section.id} id={section.id} label={section.label}>
            {slot.before}
            <div className="prose" dangerouslySetInnerHTML={{ __html: section.html }} />
            {slot.after}
          </Section>
        );
      })}
    </>
  );
}

type SectionProps = {
  label: string;
  id?: string;
  children: React.ReactNode;
};

/**
 * Editorial row: a small label on the left, the content on the right, a hairline between rows.
 * Below 1024px the label moves above the content, which then gets the full width.
 */
export function Section({ label, id, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-label={label}
      className="grid gap-x-10 gap-y-3 border-t border-rule py-[clamp(36px,6vw,64px)] first:border-t-0 lg:grid-cols-[150px_minmax(0,1fr)]"
    >
      <p className="meta tracking-[0.04em] lg:pt-1.5">{label}</p>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

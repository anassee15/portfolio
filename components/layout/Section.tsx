type SectionProps = {
  label: string;
  id?: string;
  children: React.ReactNode;
};

/** Editorial row: a small label on the left, the content on the right, a hairline between rows. */
export function Section({ label, id, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-label={label}
      className="grid gap-x-10 gap-y-1.5 border-t border-rule py-[clamp(36px,6vw,64px)] first:border-t-0 md:grid-cols-[150px_minmax(0,1fr)]"
    >
      <p className="meta pt-1.5 tracking-[0.04em]">{label}</p>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

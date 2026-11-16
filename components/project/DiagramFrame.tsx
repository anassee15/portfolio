/**
 * Holds an ink diagram at a readable size: on narrow screens it keeps `minWidth`
 * and scrolls sideways instead of shrinking its text.
 */
export function DiagramFrame({
  label,
  caption,
  minWidth = 520,
  maxWidth = 760,
  children,
}: {
  label: string;
  caption?: React.ReactNode;
  minWidth?: number;
  maxWidth?: number;
  children: React.ReactNode;
}) {
  return (
    <figure className="min-w-0">
      <div className="overflow-x-auto" tabIndex={0} role="region" aria-label={`${label}, diagram`}>
        <div style={{ minWidth, maxWidth }}>{children}</div>
      </div>
      {caption && <figcaption className="meta mt-3 text-[0.6875rem]">{caption}</figcaption>}
    </figure>
  );
}

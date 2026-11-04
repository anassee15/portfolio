import { siDatabricks, siFastapi, siGitlab, siKubernetes, siPython, siReact } from "simple-icons";

/**
 * Small monochrome icons for the architecture blocks.
 * Tools keep their own mark (filled, from simple-icons); generic blocks get
 * a thin line drawing on a 24 grid. Both follow currentColor.
 */

const OPENAI =
  "M11.248 18.25q-.825 0-1.568-.314a4.3 4.3 0 0 1-1.32-.874 4 4 0 0 1-1.304.214 4 4 0 0 1-2.046-.544 4.27 4.27 0 0 1-1.518-1.485 4 4 0 0 1-.56-2.095q0-.48.131-1.04A4.4 4.4 0 0 1 2.04 10.71a4.07 4.07 0 0 1 .017-3.4 4.2 4.2 0 0 1 1.056-1.418 3.8 3.8 0 0 1 1.6-.842 3.9 3.9 0 0 1 .76-1.683q.593-.759 1.451-1.188a4.04 4.04 0 0 1 1.832-.429q.825 0 1.567.313.742.314 1.32.875a4 4 0 0 1 1.304-.215q1.106 0 2.046.545a4.14 4.14 0 0 1 1.501 1.485q.578.941.578 2.095 0 .48-.132 1.04.66.61 1.023 1.419.363.792.363 1.666 0 .892-.38 1.717a4.3 4.3 0 0 1-1.072 1.435 3.8 3.8 0 0 1-1.584.825 3.8 3.8 0 0 1-.775 1.683 4.06 4.06 0 0 1-1.436 1.188 4.04 4.04 0 0 1-1.832.429m-4.076-2.062q.825 0 1.435-.347l3.103-1.782a.36.36 0 0 0 .164-.313v-1.42L7.881 14.62a.67.67 0 0 1-.726 0l-3.118-1.798a.5.5 0 0 1-.017.115v.198q0 .841.396 1.551.413.693 1.139 1.089a3.2 3.2 0 0 0 1.617.412m.165-2.69a.4.4 0 0 0 .181.05q.083 0 .165-.05l1.238-.71-3.977-2.31a.7.7 0 0 1-.363-.643v-3.58q-.825.362-1.32 1.122a2.9 2.9 0 0 0-.495 1.65q0 .809.413 1.55.412.743 1.072 1.123zm3.91 3.663q.875 0 1.585-.396a2.96 2.96 0 0 0 1.534-2.64v-3.564a.32.32 0 0 0-.165-.297l-1.254-.726v4.604a.7.7 0 0 1-.363.643l-3.119 1.799a3 3 0 0 0 1.783.577m.627-6.039V8.878L10.01 7.822 8.129 8.878v2.244l1.881 1.056zM7.057 5.859a.7.7 0 0 1 .363-.644l3.119-1.798a3 3 0 0 0-1.782-.578q-.874 0-1.584.396A2.96 2.96 0 0 0 6.05 4.324a3.07 3.07 0 0 0-.396 1.551v3.547q0 .199.165.314l1.237.726zm8.383 7.887q.825-.364 1.303-1.123.495-.758.495-1.65a3.15 3.15 0 0 0-.412-1.55q-.413-.743-1.073-1.123l-3.086-1.782q-.099-.065-.181-.049a.3.3 0 0 0-.165.05l-1.238.692 3.993 2.327a.6.6 0 0 1 .264.264.64.64 0 0 1 .1.363zm-3.317-8.382a.63.63 0 0 1 .726 0l3.135 1.831v-.297q0-.792-.396-1.501a2.86 2.86 0 0 0-1.105-1.155q-.71-.43-1.65-.43-.825 0-1.436.347L8.294 5.941a.36.36 0 0 0-.165.314v1.418z";

const BRANDS = {
  fastapi: { viewBox: "0 0 24 24", d: siFastapi.path },
  openai: { viewBox: "1.68 1.75 16.65 16.5", d: OPENAI },
  databricks: { viewBox: "0 0 24 24", d: siDatabricks.path },
  kubernetes: { viewBox: "0 0 24 24", d: siKubernetes.path },
  gitlab: { viewBox: "0 0 24 24", d: siGitlab.path },
  python: { viewBox: "0 0 24 24", d: siPython.path },
  react: { viewBox: "0 0 24 24", d: siReact.path },
};

const LINES = {
  phone: "M8 3h8a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z M11 18h2",
  search: "M10.5 5a5.5 5.5 0 1 1 0 11a5.5 5.5 0 0 1 0-11z M15 15l5 5",
  archive: "M4 5h16v4H4z M5 9v10h14V9 M10 13h4",
  network: "M4 4h5v5H4z M15 4h5v5h-5z M15 15h5v5h-5z M9 6.5h6 M17.5 9v6",
  database:
    "M5 6c0-1.7 3.1-3 7-3s7 1.3 7 3-3.1 3-7 3-7-1.3-7-3z M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6 M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3",
  trace: "M4 5h7 M7 10h10 M9 15h6 M13 20h7",
  clipboard: "M9 3h6v3H9z M7 4.5H5V21h14V4.5h-2 M9 13.5l2 2 4-4",
  review: "M9 4.5a3.5 3.5 0 1 1 0 7a3.5 3.5 0 0 1 0-7z M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6 M15 10l2 2 4-4",
  pulse: "M3 12h4l2-6 4 12 2-6h6",
  file: "M6 3h8l4 4v14H6z M14 3v4h4 M9 12h6 M9 16h6",
  person: "M12 4a4 4 0 1 1 0 8a4 4 0 0 1 0-8z M5 21c0-3.9 3.1-7 7-7s7 3.1 7 7",
  flag: "M6 21V4 M6 4h11l-2 4 2 4H6",
  eye: "M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z M12 9.5a2.5 2.5 0 1 1 0 5a2.5 2.5 0 0 1 0-5z",
  scales: "M12 4v16 M8 20h8 M5 7h14 M5 7l-3 6a3 3 0 0 0 6 0z M19 7l-3 6a3 3 0 0 0 6 0z",
  chart: "M4 20h16 M7 20v-6 M12 20V9 M17 20V5",
  lock: "M5 11h14v10H5z M8 11V7a4 4 0 0 1 8 0v4",
};

export type IconName = keyof typeof BRANDS | keyof typeof LINES;

export function Icon({ name, className }: { name: IconName; className?: string }) {
  const common = { "aria-hidden": true, className: `size-[18px] shrink-0 ${className ?? ""}` };

  if (name in BRANDS) {
    const { viewBox, d } = BRANDS[name as keyof typeof BRANDS];
    return (
      <svg viewBox={viewBox} fill="currentColor" {...common}>
        <path d={d} />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...common}>
      <path d={LINES[name as keyof typeof LINES]} />
    </svg>
  );
}

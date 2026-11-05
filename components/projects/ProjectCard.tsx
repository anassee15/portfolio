import Link from "next/link";
import { tagLabels, type Figure, type Project } from "@/data/projects";
import { cardDrawings } from "./drawings";

/** A whole-card link: meta, title, two lines, the key figure, tags. The lead project spans two columns. */
export function ProjectCard({ project }: { project: Project }) {
  const lead = project.tier === "lead";
  const Drawing = cardDrawings[project.slug];
  const figures = project.figures.slice(0, lead ? 2 : 1);

  return (
    <li className={lead ? "sm:col-span-2" : undefined}>
      <Link
        href={`/projects/${project.slug}`}
        className={`group grid h-full gap-x-8 gap-y-6 border border-rule p-5 transition-colors hover:border-ink sm:p-6 ${
          lead && Drawing ? "lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]" : ""
        }`}
      >
        <div className="flex flex-col">
          <p className="meta">
            {project.year} · {project.context}
          </p>
          <h2 className="mt-1.5 font-display text-[clamp(23px,2.4vw,27px)] leading-[1.05] font-extrabold decoration-ball decoration-2 underline-offset-4 group-hover:underline">
            {project.title}
          </h2>
          <p className={`mt-2 max-w-[52ch] ${lead ? "" : "line-clamp-2"} text-[14px] leading-snug text-ink-2`}>{project.pitch}</p>
          <dl className="mt-auto flex flex-wrap gap-x-8 gap-y-3 pt-7">
            {figures.map((figure) => (
              <CardFigure key={figure.label} figure={figure} />
            ))}
          </dl>
          <p className="meta mt-4">{project.tags.map((tag) => tagLabels[tag]).join(" · ")}</p>
        </div>
        {Drawing && (
          <div aria-hidden className="order-first self-center lg:order-none">
            <Drawing />
          </div>
        )}
      </Link>
    </li>
  );
}

function CardFigure({ figure }: { figure: Figure }) {
  return (
    <div className="flex flex-col-reverse">
      <dt className="mt-1 text-[13px] leading-snug text-ink-2">{figure.label}</dt>
      <dd className="font-display text-[34px] leading-none font-extrabold whitespace-nowrap tabular-nums">
        {figure.value}
      </dd>
    </div>
  );
}

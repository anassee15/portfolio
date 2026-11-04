import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { projects } from "@/data/projects";

/** The smaller projects: one ruled line each, the key figure aligned right. */
export function MoreWork() {
  const bench = projects.filter((project) => project.tier === "bench");

  return (
    <Section label="More work" id="more">
      <h2 className="sr-only">More work</h2>
      <ul>
        {bench.map((project) => (
          <li key={project.slug} className="border-t border-rule first:border-t-0">
            <Link
              href={`/projects/${project.slug}`}
              className="group grid gap-x-6 gap-y-1 py-3.5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-baseline"
            >
              <span>
                <span className="font-medium group-hover:underline group-hover:decoration-ball group-hover:underline-offset-4">
                  {project.title}
                </span>
                <span className="meta ml-2">
                  {project.context} · {project.year}
                </span>
                <span className="mt-0.5 block text-[14px] leading-snug text-ink-2">{project.pitch}</span>
              </span>
              <span className="text-[15px] font-medium whitespace-nowrap tabular-nums sm:text-right">
                {project.score ?? project.figures[0].value}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}

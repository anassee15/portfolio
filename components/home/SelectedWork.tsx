import Link from "next/link";
import { BarChart } from "@/components/charts/BarChart";
import { Figures } from "@/components/charts/Figures";
import { Section } from "@/components/layout/Section";
import { projects } from "@/data/projects";

export function SelectedWork() {
  const selected = projects.filter((project) => project.tier === "flagship");

  return (
    <Section label="Selected work" id="work">
      <h2 className="sr-only">Selected work</h2>
      <ul>
        {selected.map((project) => (
          <li
            key={project.slug}
            className="grid gap-x-10 gap-y-5 border-t border-rule py-7 first:border-t-0 first:pt-0 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]"
          >
            <div>
              <p className="meta">
                {project.context} · {project.year}
              </p>
              <h3 className="mt-1 mb-2 font-display text-[clamp(1.4375rem,2.6vw,1.75rem)] leading-[1.05] font-extrabold">
                {project.title}
              </h3>
              <p className="max-w-[48ch]">{project.pitch}</p>
              <p className="mt-3">
                <Link href={`/projects/${project.slug}`} className="link">
                  Read more<span className="sr-only"> about {project.title}</span> <span aria-hidden>→</span>
                </Link>
              </p>
            </div>
            {project.chart ? (
              <BarChart {...project.chart} />
            ) : (
              <Figures figures={project.figures} source={project.source} compact />
            )}
          </li>
        ))}
      </ul>
      <p className="mt-2 border-t border-rule pt-5">
        <Link href="/projects" className="link">
          All projects <span aria-hidden>→</span>
        </Link>
      </p>
    </Section>
  );
}

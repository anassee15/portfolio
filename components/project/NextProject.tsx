import Link from "next/link";
import { Section } from "@/components/layout/Section";
import type { Project } from "@/data/projects";

export function NextProject({ project }: { project: Project }) {
  return (
    <Section label="Next">
      <Link href={`/projects/${project.slug}`} className="group inline-block">
        <span className="meta">
          {project.context} · {project.year}
        </span>
        <span className="mt-1 block font-display text-[clamp(28px,4vw,44px)] leading-[1.02] font-extrabold decoration-ball decoration-[3px] underline-offset-[6px] group-hover:underline">
          {project.title} <span aria-hidden>→</span>
        </span>
      </Link>
    </Section>
  );
}

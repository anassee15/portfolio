import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { projects } from "@/data/projects";

/** The home only points to the work: the projects live on /projects. */
export function ProjectsTeaser() {
  return (
    <Section label="Projects" id="projects">
      <h2 className="mb-2 font-display text-[clamp(1.625rem,3.6vw,2.25rem)] leading-[1.02] font-extrabold">
        See what I&apos;ve built
      </h2>
      <p className="mb-6 max-w-[58ch] text-[1.0625rem]">
        {projects.length} projects: a conversational agent in production and its evaluation harness, a Minecraft agent
        that sees, a fluid solver on GPU, robots, and a few more.
      </p>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <Link href="/projects" className="btn btn-primary">
          All projects <span aria-hidden>→</span>
        </Link>
        <Link href="/projects/eva" className="link text-[0.9375rem]">
          Start with the main one
        </Link>
      </div>
    </Section>
  );
}

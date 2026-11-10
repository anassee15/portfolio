import type { Metadata } from "next";
import { Suspense } from "react";
import { FilteredProjectIndex, ProjectIndex } from "@/components/projects/ProjectIndex";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Agents in production, LLM evaluation, vision, robotics and GPU code: everything I've built that I'd still show.",
};

export default function ProjectsPage() {
  return (
    <main className="page-x pb-[clamp(48px,8vw,96px)]">
      <header className="pt-11 pb-8">
        <p className="meta">{projects.length} projects</p>
        <h1 className="mt-2.5 mb-4 font-display text-[clamp(2.75rem,8vw,5rem)] leading-[0.9] font-black uppercase">
          Projects
        </h1>
        <p className="max-w-[52ch] text-[1.1875rem] leading-normal">
          At work, at EPFL and HES-SO, and on my own. Each one has a page with the problem, what I did, and the numbers.
        </p>
      </header>
      <Suspense fallback={<ProjectIndex active={null} />}>
        <FilteredProjectIndex />
      </Suspense>
    </main>
  );
}

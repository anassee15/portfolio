"use client";

import { useSearchParams } from "next/navigation";
import { projects, tagLabels, type Tag } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { TagFilter } from "./TagFilter";

const isTag = (value: string | null): value is Tag => value !== null && value in tagLabels;

/** The filter and the grid; the tag is read from the URL. */
export function FilteredProjectIndex() {
  const tag = useSearchParams().get("tag");
  return <ProjectIndex active={isTag(tag) ? tag : null} />;
}

/** Also rendered on its own, unfiltered, before the URL is known (prerender, no JavaScript). */
export function ProjectIndex({ active }: { active: Tag | null }) {
  const shown = active ? projects.filter((project) => project.tags.includes(active)) : projects;

  return (
    <>
      <TagFilter projects={projects} active={active} />
      <ul className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </ul>
    </>
  );
}

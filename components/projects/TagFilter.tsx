import Link from "next/link";
import { tagLabels, type Project, type Tag } from "@/data/projects";

/** Text buttons; the chosen tag lives in the URL (?tag=), so a filtered view can be shared. */
export function TagFilter({ projects, active }: { projects: Project[]; active: Tag | null }) {
  const options: { tag: Tag | null; label: string; count: number }[] = [
    { tag: null, label: "All", count: projects.length },
    ...(Object.keys(tagLabels) as Tag[]).map((tag) => ({
      tag,
      label: tagLabels[tag],
      count: projects.filter((project) => project.tags.includes(tag)).length,
    })),
  ];

  return (
    <nav aria-label="Filter by tag">
      <ul className="flex flex-wrap gap-x-5 gap-y-2">
        {options.map(({ tag, label, count }) => {
          const current = tag === active;
          return (
            <li key={label}>
              <Link
                href={tag ? `/projects?tag=${tag}` : "/projects"}
                scroll={false}
                aria-current={current ? "page" : undefined}
                className={`text-[15px] font-medium underline-offset-[6px] ${
                  current ? "underline decoration-ball decoration-2" : "text-ink-2 hover:text-ink"
                }`}
              >
                {label}
                <span className="meta ml-1 text-[11px]" aria-hidden>
                  {count}
                </span>
                <span className="sr-only">, {count} projects</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

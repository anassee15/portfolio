import type { CaseHeader } from "@/lib/content";
import type { Project } from "@/data/projects";

export function ProjectHeader({ header, project }: { header: CaseHeader; project: Project }) {
  return (
    <header className="pt-11 pb-2">
      <p className="meta">{header.meta}</p>
      <h1 className="mt-2.5 mb-4 font-display text-[clamp(2.75rem,8vw,5rem)] leading-[0.9] font-black uppercase">
        {header.headline}
      </h1>
      <p className="max-w-[52ch] text-[1.1875rem] leading-normal">{header.lede}</p>
      <p className="meta mt-4">{project.stack.join(" · ")}</p>
      {project.links && (
        <p className="mt-2 flex gap-4">
          {project.links.map((link) => (
            <a key={link.href} href={link.href} className="link">
              {link.label}
            </a>
          ))}
        </p>
      )}
    </header>
  );
}

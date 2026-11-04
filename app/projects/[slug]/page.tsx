import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseLayout } from "@/components/project/CaseLayout";
import { ProjectHeader } from "@/components/project/ProjectHeader";
import { getProjectBySlug } from "@/data/projects";
import { getCaseStudy, getCaseStudySlugs } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getCaseStudySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return { title: project.title, description: project.pitch };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const study = await getCaseStudy(slug);
  if (!project || !study) notFound();

  return (
    <main className="page-x">
      <ProjectHeader header={study.header} project={project} />
      <CaseLayout sections={study.sections} />
    </main>
  );
}

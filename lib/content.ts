import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

const PROJECTS_DIR = path.join(process.cwd(), "content/projects");

/** Header of a project page, from the Markdown frontmatter. */
export type CaseHeader = {
  headline: string;
  meta: string;
  lede: string;
};

/** A page is cut into sections at each `## Heading`; the heading becomes the section label. */
export type CaseSection = {
  id: string;
  label: string;
  html: string;
};

export type CaseStudy = {
  header: CaseHeader;
  sections: CaseSection[];
};

const markdown = unified().use(remarkParse).use(remarkGfm).use(remarkRehype).use(rehypeStringify);

async function toHtml(source: string) {
  return String(await markdown.process(source));
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function splitSections(body: string) {
  const parts = body.split(/^## +(.+)$/m);
  // parts = [intro, label1, body1, label2, body2, ...]; anything before the first heading is ignored.
  const sections: { label: string; body: string }[] = [];
  for (let i = 1; i < parts.length; i += 2) {
    sections.push({ label: parts[i].trim(), body: parts[i + 1].trim() });
  }
  return sections;
}

export async function getCaseStudy(slug: string): Promise<CaseStudy | null> {
  let file: string;
  try {
    file = await fs.readFile(path.join(PROJECTS_DIR, `${slug}.md`), "utf8");
  } catch {
    return null;
  }

  const { data, content } = matter(file);
  const sections = await Promise.all(
    splitSections(content).map(async ({ label, body }) => ({
      id: slugify(label),
      label,
      html: await toHtml(body),
    })),
  );

  return { header: data as CaseHeader, sections };
}

export async function getCaseStudySlugs() {
  const files = await fs.readdir(PROJECTS_DIR);
  return files.filter((file) => file.endsWith(".md")).map((file) => file.replace(/\.md$/, ""));
}

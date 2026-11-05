import fs from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkRehype from "remark-rehype";
import rehypeKatex from "rehype-katex";
import rehypeShiki from "@shikijs/rehype";
import rehypeStringify from "rehype-stringify";
import { createCssVariablesTheme } from "shiki";

const NOTES_DIR = path.join(process.cwd(), "content/notes");

export type Note = {
  slug: string;
  title: string;
  /** YYYY-MM-DD */
  date: string;
  /** "14 Nov 2026", formatted once on the server. */
  dateLabel: string;
  tags: string[];
  summary: string;
  draft: boolean;
  minutes: number;
};

// Code colours come from CSS variables (set in globals.css), so they follow the light and dark tokens.
const inkTheme = createCssVariablesTheme({ name: "ink" });

const markdown = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkMath)
  .use(remarkRehype)
  .use(rehypeKatex)
  .use(rehypeShiki, { theme: inkTheme, fallbackLanguage: "text", lazy: true })
  .use(rehypeStringify);

async function readNote(file: string) {
  const source = await fs.readFile(path.join(NOTES_DIR, file), "utf8");
  const { data, content } = matter(source);
  // YAML turns an unquoted date into a Date.
  const date = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date);
  const note: Note = {
    slug: file.replace(/\.md$/, ""),
    title: data.title,
    date,
    dateLabel: formatDate(date),
    tags: data.tags ?? [],
    summary: data.summary,
    draft: data.draft !== false,
    minutes: Math.max(1, Math.round(content.split(/\s+/).length / 220)),
  };
  return { note, content };
}

/** Published notes, newest first. In development, drafts are listed too. */
export const getNotes = cache(async (): Promise<Note[]> => {
  let files: string[];
  try {
    files = (await fs.readdir(NOTES_DIR)).filter((file) => file.endsWith(".md"));
  } catch {
    return [];
  }
  const notes = await Promise.all(files.map(async (file) => (await readNote(file)).note));
  return notes
    .filter((note) => !note.draft || process.env.NODE_ENV === "development")
    .sort((a, b) => b.date.localeCompare(a.date));
});

export async function getNote(slug: string) {
  const note = (await getNotes()).find((candidate) => candidate.slug === slug);
  if (!note) return null;
  const { content } = await readNote(`${slug}.md`);
  return { note, html: String(await markdown.process(content)) };
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
}

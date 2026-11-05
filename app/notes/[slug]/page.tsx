import "katex/dist/katex.min.css";

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NoteLayout } from "@/components/notes/NoteLayout";
import { getNote, getNotes } from "@/lib/notes";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getNotes()).map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const found = await getNote(slug);
  if (!found) return {};
  const { note } = found;
  return {
    title: note.title,
    description: note.summary,
    openGraph: { type: "article", publishedTime: note.date, tags: note.tags },
  };
}

export default async function NotePage({ params }: Props) {
  const { slug } = await params;
  const found = await getNote(slug);
  if (!found) notFound();

  return (
    <main className="page-x">
      <NoteLayout note={found.note} html={found.html} />
    </main>
  );
}

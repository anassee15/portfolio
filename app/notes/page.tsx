import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { FilteredNoteList, NoteList } from "@/components/notes/NoteList";
import { getNotes } from "@/lib/notes";

export const metadata: Metadata = {
  title: "Notes",
  description: "Notes on what I build and what I like: AI, GPUs, basketball, manga, games.",
  alternates: { types: { "application/rss+xml": "/notes/rss.xml" } },
};

export default async function NotesPage() {
  const notes = await getNotes();
  // No published note yet: the page does not exist.
  if (notes.length === 0) notFound();

  return (
    <main className="page-x">
      <header className="pt-11 pb-8">
        <p className="meta">
          {notes.length} {notes.length === 1 ? "note" : "notes"} ·{" "}
          <a href="/notes/rss.xml" className="hover:text-ink">
            RSS
          </a>
        </p>
        <h1 className="mt-2.5 mb-4 font-display text-[clamp(2.75rem,8vw,5rem)] leading-[0.9] font-black uppercase">Notes</h1>
        <p className="max-w-[52ch] text-[1.1875rem] leading-normal">
          Notes on what I build and what I like: AI, GPUs, basketball, manga, games.
        </p>
      </header>
      <Suspense fallback={<NoteList notes={notes} active={null} />}>
        <FilteredNoteList notes={notes} />
      </Suspense>
    </main>
  );
}

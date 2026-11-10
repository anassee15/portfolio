"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { TagFilter } from "@/components/layout/TagFilter";
import type { Note } from "@/lib/notes";

/** The list, filtered by the ?tag= in the URL. */
export function FilteredNoteList({ notes }: { notes: Note[] }) {
  const tag = useSearchParams().get("tag");
  return <NoteList notes={notes} active={notes.some((note) => tag && note.tags.includes(tag)) ? tag : null} />;
}

/** Also rendered on its own, unfiltered, before the URL is known (prerender, no JavaScript). */
export function NoteList({ notes, active }: { notes: Note[]; active: string | null }) {
  const tags = [...new Set(notes.flatMap((note) => note.tags))].sort();
  const shown = active ? notes.filter((note) => note.tags.includes(active)) : notes;
  const options = [
    { tag: null, label: "All", count: notes.length },
    ...tags.map((tag) => ({ tag, label: tag, count: notes.filter((note) => note.tags.includes(tag)).length })),
  ];

  return (
    <>
      {tags.length > 1 && <TagFilter base="/notes" options={options} active={active} noun="notes" />}
      <ul className="mt-7 border-b border-rule">
        {shown.map((note) => (
          <li key={note.slug} className="grid gap-x-10 gap-y-1 border-t border-rule py-5 sm:grid-cols-[120px_minmax(0,1fr)]">
            <p className="meta sm:pt-1.5">
              <time dateTime={note.date}>{note.dateLabel}</time>
            </p>
            <div>
              <Link
                href={`/notes/${note.slug}`}
                className="font-display text-[clamp(1.5rem,3.4vw,2rem)] leading-[1.05] font-extrabold decoration-ball decoration-[3px] underline-offset-[5px] hover:underline"
              >
                {note.title}
              </Link>
              <p className="mt-1.5 max-w-[60ch] text-ink-2">{note.summary}</p>
              <p className="meta mt-1.5">
                {note.tags.join(" · ")}
                {note.draft && " · draft"}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

import Link from "next/link";
import type { Note } from "@/lib/notes";

/** A note: a reading column, no drawing, no noise. */
export function NoteLayout({ note, html }: { note: Note; html: string }) {
  return (
    <article className="mx-auto max-w-[680px] pt-11">
      <header className="pb-8">
        <p className="meta">
          <time dateTime={note.date}>{note.dateLabel}</time> · {note.minutes} min read
          {note.draft && " · draft"}
        </p>
        <h1 className="mt-2.5 mb-4 font-display text-[clamp(40px,7vw,64px)] leading-[0.92] font-black uppercase">
          {note.title}
        </h1>
        <p className="text-[19px] leading-normal text-ink-2">{note.summary}</p>
        {note.tags.length > 0 && <p className="meta mt-4">{note.tags.join(" · ")}</p>}
      </header>
      <div className="prose note border-t border-rule pt-8" dangerouslySetInnerHTML={{ __html: html }} />
      <p className="mt-12 border-t border-rule pt-5">
        <Link href="/notes" className="link">
          <span aria-hidden>←</span> All notes
        </Link>
      </p>
    </article>
  );
}

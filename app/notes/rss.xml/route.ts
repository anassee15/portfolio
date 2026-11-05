import { site } from "@/data/site";
import { getNotes } from "@/lib/notes";

export const dynamic = "force-static";

const escape = (text: string) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function GET() {
  const notes = await getNotes();
  if (notes.length === 0) return new Response("Not found", { status: 404 });

  const items = notes
    .map((note) => {
      const url = `${site.url}/notes/${note.slug}`;
      return `    <item>
      <title>${escape(note.title)}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <pubDate>${new Date(note.date).toUTCString()}</pubDate>
      <description>${escape(note.summary)}</description>
${note.tags.map((tag) => `      <category>${escape(tag)}</category>`).join("\n")}
    </item>`;
    })
    .join("\n");

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(site.name)} · Notes</title>
    <link>${site.url}/notes</link>
    <atom:link href="${site.url}/notes/rss.xml" rel="self" type="application/rss+xml" />
    <description>Notes on what I build and what I like: AI, GPUs, basketball, manga, games.</description>
    <language>en</language>
${items}
  </channel>
</rss>
`;
  return new Response(feed, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}

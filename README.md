# anasse.vercel.app

My portfolio. Next.js (App Router), React, TypeScript, Tailwind CSS v4, three.js / React Three Fiber.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static production build
npm run lint
```

## Layout

- `app/` — routes, global styles and fonts
- `components/` — UI, grouped by area (`layout`, `home`, `project`, `ink`, `charts`, `three`, `demos`)
- `content/projects/*.md` — project pages, written in Markdown with a frontmatter header
- `data/` — typed site data (identity, project index)
- `lib/` — content loading and small helpers

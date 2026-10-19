<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# unison-website

The commercial website and documentation for Unison (cllpse/unison) and its component library
(cllpse/unison-components). Code conventions follow the library's AGENTS.md; the library-only sections (base/web/native
shells, Figma flag types, `compute*` helpers) don't apply here.

## Commands

- `bun install`: bun is the package manager; never add npm/yarn lockfiles
- `bun dev`: local server on http://localhost:3000
- `bun run typecheck`: `tsc --noEmit`; must pass before committing
- `bunx biome check --write .`: format, lint and organize imports; must pass before committing
- `bun run build`: production build; run it before pushing
- `bun run bake`: the landing page as one small, self-contained `dist/index.html` that opens straight from disk
  (`scripts/bake.ts`): styles, Latin fonts and icons inlined, and React swapped for `scripts/bakeClient.js`, which
  mirrors `Nav.tsx` and `ContainOverscroll.tsx`; keep those in step. Every push to `main` bakes it again in CI and
  publishes it to GitHub Pages (`.github/workflows/pages.yml`)
- `bun run deploy`: bakes the page, copies `dist/` into `~/Sites/eject.io/public/figma` and `~/Sites/cllp-se/dist/figma`,
  then runs `firebase deploy` in both projects (`scripts/deploy.ts`)

## Architecture

- Next.js App Router in `src/app`, with React Compiler and Tailwind CSS v4 (configured in `src/app/globals.css`, no
  `tailwind.config`).
- `src/components`: one component per file, PascalCase file names. Server components by default; add
  `"use client"` only where a component needs state, effects or event handlers (`Nav.tsx`,
  `ContainOverscroll.tsx`).
- `src/constants`: site-wide constants such as `PRODUCT_NAME`, `REPO_NAME`, `NAV_LINKS` and `SECTION_ACCENTS` (each
  section's color, shared with the nav). The product name lives only there.
- `src/utilities`: helpers (`highlight.ts`, which wraps Shiki for the code blocks).
- Icons: `src/app/icon.svg` (the 16px mark, white in dark mode) and `favicon.ico` (16 and 32) for tabs,
  `apple-icon.png` for iOS, and `public/icon-*.png` for `manifest.ts`. The larger PNGs draw the 32px mark at twice its
  pixel density on white; regenerate them all together when the mark changes.
- SEO: the site lives at `SITE_URL` (https://cllp.se/figma/, `src/constants/site.ts`), the base for every absolute
  URL. `layout.tsx` holds the metadata (canonical, Open Graph, X card, robots), `opengraph-image.png/route.tsx` builds
  the 1200x630 social card at build time, `sitemap.ts` lists the page, and `page.tsx` carries schema.org JSON-LD.
  There's no robots.txt: under a path it wouldn't count. The bake keeps the JSON-LD and copies the card and sitemap
  into `dist/`.
- Colors exist only as tokens in `globals.css` (Tailwind's defaults are dropped); don't add others. The one exception
  is syntax highlighting, which uses Shiki's `github-light-default` and `github-dark-default` themes (`highlight.ts`).
- The dark theme follows the browser's color scheme (`prefers-color-scheme`, Tailwind's default `dark:` variant).
  It keeps the accents and redefines only the neutrals (`globals.css`); style anything black or white with a `dark:`
  counterpart.
- Headings nest: the hero is the h1 with its subtitle as an h2; each section's promise is an h2, its pitch an h3 and
  its points h4s. The "for <Audience>" label is a `p` kicker grouped with the h2 in an `hgroup`.
- The page speaks to four audiences (the team, designers, developers, agents), one section each, then starters.
- Every section has the same shape: a "for <Audience>" label linking to the section, a heading (`title`) that's a
  promise, a one-line `pitch` (large, in the accent color) on how the library keeps it, and the detail: usually a
  `Points` grid of h4 points built from the arrays at the top of `page.tsx`.
- `Section` styles the `h4`, `p` and emphasis inside it (emphasis in the accent; links keep the text color), and turns a
  direct `div`, `ol` or `ul` child into a two-column grid, so section markup in `page.tsx` stays class-free. `Points`
  uses that grid for two independent columns, so a tall point only pushes down the points below it. Section headings and
  paragraphs keep a `max-w-measure` (700px) measure inside the wider `max-w-page` (1168px) column. All text wraps with
  `text-pretty` (set on `body`); don't use `text-balance`. The h1's break after the comma is the one manual break.
- Code samples on the site use real flags and tokens from the library; check `src/types/figmaProperties.ts` and
  `src/constants` in cllpse/unison-components before writing one. Order each element's properties the same way:
  frames flow, alignment, width, height, padding, gap, corner radius, fill, stroke; text typography, then fill. The one
  liberty: typography flags drop their -wrap/-nowrap suffix (`typography-label`, not `typography-label-nowrap`).
- Icon is being replaced by Vector; don't feature Icon in copy or samples.
- React Native support is unstable: the Team section, which introduces it, ends with `REACT_NATIVE_DISCLAIMER`
  (`page.tsx`), a `Disclaimer` box. Don't repeat it in other sections.

## TypeScript

- `type`, not `interface`.
- Type-only imports use `import type` or inline `type` specifiers.
- Module-level constants are `SCREAMING_SNAKE_CASE`, `as const` where the literals matter; derive types from them
  (`(typeof GAPS)[number]["token"]`) instead of duplicating literals.
- Keep casts local and suppress lint/type errors one line at a time (`// @ts-expect-error`,
  `// biome-ignore <rule>: <reason>`).
- Avoid `any`; `noImplicitAny` is on.

## Code style

Biome enforces the formatting: 2-space indent, 120-column lines, double quotes, no semicolons, sorted imports.
Beyond that:

- Naming: PascalCase for components, component files and types; camelCase for all other files and for functions,
  verb first (`highlight`, `toAlignmentFlag`); `SCREAMING_SNAKE_CASE` for module-level constants.
- Arrow functions only. Components are anonymous default exports, `export default (p: Section) => { ... }`; everything
  else is a named `export const`. Next.js route files (`page.tsx`, `layout.tsx`) follow the same rule.
- A component's props type is exported under the component's name (`export type Section = { ... }`).
- The props parameter is `p`. Destructure what you use: `const { id, title, children } = p`.
- Relative imports only; `@/*` and `src/*` paths are blocked by Biome.
- Leave a blank line before the final `return` and between logical blocks.
- No `useMemo` / `useCallback` / `React.memo`: React Compiler is on.
- Style with Tailwind classes; use inline `style` only for values computed at runtime.

## Copy

- Plain ASCII in everything the site renders: no typographic characters such as `·`, `→`, `©`, `–`, `—`, `…` or curly
  quotes, and no HTML entities (`&apos;`, `&ldquo;`, `&middot;`). Write `'`, `"`, `:`, `-` and words instead.
- The exceptions, which the owner asked for: the real ellipses in the nav's "for…" and at the start of "…or simply
  ship sooner" (For Team) and "…think LEGO® bricks" (For Developers), and the ® itself (a registered trademark).

## Comments and docs

- Comments explain *why*, in full sentences.
- Exported utilities and non-obvious types get JSDoc, with `@example` showing input => output.
- TODOs are attributed: `@todo @cllpse: ...`.

## Git

- Commit directly to `main`; no feature branches or pull requests until the owner asks for them.
- Imperative, sentence-case subjects (`Add pricing section`); one concern per commit.

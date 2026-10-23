/**
 * Bakes the landing page and publishes it under /unison/ on the two sites that host it, eject.io and cllp.se. The web
 * playground's one-shot pages (the proof section's shadcn, Reddit and Google look-alikes) are baked too, as a static
 * export served from /unison/one-shot/, and go into dist/one-shot; the other models' one-shots, baked once from where
 * they were built and kept in this repository (ONE_SHOTS), go in beside them. The playground's test page is baked
 * again, served from /unison/playground/, into dist/playground. Then dist/ (the page, its social card,
 * its sitemap, the session transcript and the one-shot pages) is copied into each site's hosting folder, and
 * `firebase deploy` runs in each project. Stops at the first step that fails, so a broken bake never reaches either
 * site.
 *
 * Run through `bun run deploy`.
 *
 * @example
 * bun run deploy
 * // => dist/index.html: 308 KB
 * // => (the playground's next build output)
 * // => eject.io: copied dist to public/unison
 * // => cllp-se: copied dist to dist/unison
 * // => (each project's firebase deploy output)
 */
import { execFileSync } from "node:child_process"
import { existsSync } from "node:fs"
import { cp, mkdir, readFile, writeFile } from "node:fs/promises"
import { homedir } from "node:os"
import { basename, join } from "node:path"
import { ONE_SHOT_PAGES, ONE_SHOTS } from "../src/constants/oneShots"

const DIST = "dist"

/**
 * The web playground, a sibling submodule, and what its bake (`bun run bake`, a static export served from
 * /unison/one-shot/) leaves in out/: the three one-shot pages, each a folder with an index.html, and the scripts,
 * styles and fonts they share.
 */
const PLAYGROUND = join("..", "unison-playground-web")
const ONE_SHOT = ["_next", ...ONE_SHOT_PAGES]

/**
 * The one-shot pages are laid out for a desktop window and fall apart on a phone, so each baked page keeps at least
 * 1280px of width and scrolls sideways below that. It's a rule on the body in the page's head rather than a wrapping
 * div: React hydrates the whole body, so it would throw away a div that the playground didn't render. Added to the
 * baked files only, so the playground's own code stays as the agent wrote it.
 */
const MIN_WIDTH = "<style>body{min-width:1280px}</style>"

/** Each Firebase project, and the folder inside its hosting root where the page goes. */
const SITES = [
  { root: join(homedir(), "Sites", "eject.io"), folder: join("public", "unison") },
  // cllp-se hosts its build output, dist/, which its own build (vue-cli-service build) replaces; build that project
  // before running this, not after, or the page is gone until the next run.
  { root: join(homedir(), "Sites", "cllp-se"), folder: join("dist", "unison") },
]

/**
 * The web playground's own test page, which exercises the library section by section, baked a second time as a static
 * export served from /unison/playground/ (the developers section links it): its index page with the RSC payloads a
 * client navigation fetches, and the scripts, styles and fonts it loads.
 */
const PLAYGROUND_PATH = "playground"
const PLAYGROUND_PAGE = [
  "_next",
  "index.html",
  "index.txt",
  "__next._full.txt",
  "__next.__PAGE__.txt",
  "__next._tree.txt",
]

/**
 * Runs a command with its output shown as it goes, with `env` added to the environment; a failure throws, which ends
 * the script there.
 */
const run = (command: string, args: string[], cwd?: string, env?: Record<string, string>) =>
  execFileSync(command, args, { cwd, stdio: "inherit", env: { ...process.env, ...env } })

run("bun", ["run", "bake"])
run("bun", ["run", "bake"], PLAYGROUND)

for (const entry of ONE_SHOT)
  await cp(join(PLAYGROUND, "out", entry), join(DIST, "one-shot", entry), { recursive: true })
// A model whose pages aren't baked yet is skipped; the proof section links them already.
const published = ONE_SHOTS.filter(({ baked }) => !baked || existsSync(baked))
for (const { baked, path } of published) if (baked) await cp(baked, join(DIST, path), { recursive: true })
for (const { path } of published)
  for (const page of ONE_SHOT_PAGES) {
    const file = join(DIST, path, page, "index.html")
    await writeFile(file, (await readFile(file, "utf8")).replace("</head>", `${MIN_WIDTH}</head>`))
  }

// The playground's next build replaces out/, so this comes after the one-shot pages are copied from it.
run("bunx", ["next", "build"], PLAYGROUND, { BAKE_BASE_PATH: `/unison/${PLAYGROUND_PATH}` })
for (const entry of PLAYGROUND_PAGE)
  await cp(join(PLAYGROUND, "out", entry), join(DIST, PLAYGROUND_PATH, entry), { recursive: true })

for (const { root, folder } of SITES) {
  const target = join(root, folder)
  await mkdir(target, { recursive: true })
  await cp(DIST, target, { recursive: true })
  console.log(`${basename(root)}: copied dist to ${folder}`)
}

for (const { root } of SITES) run("firebase", ["deploy"], root)

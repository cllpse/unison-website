/**
 * Bakes the landing page and publishes it under /unison/ on the two sites that host it, eject.io and cllp.se: copies
 * dist/ (the page, its social card and its sitemap) into each site's hosting folder, then runs `firebase deploy` in
 * each project. Stops at the first step that fails, so a broken bake never reaches either site.
 *
 * Run through `bun run deploy`.
 *
 * @example
 * bun run deploy
 * // => dist/index.html: 308 KB
 * // => eject.io: copied 3 files to public/unison
 * // => cllp-se: copied 3 files to dist/unison
 * // => (each project's firebase deploy output)
 */
import { execFileSync } from "node:child_process"
import { copyFile, mkdir, readdir } from "node:fs/promises"
import { homedir } from "node:os"
import { basename, join } from "node:path"

const DIST = "dist"

/** Each Firebase project, and the folder inside its hosting root where the page goes. */
const SITES = [
  { root: join(homedir(), "Sites", "eject.io"), folder: join("public", "unison") },
  // cllp-se hosts its build output, dist/, which its own build (vue-cli-service build) replaces; build that project
  // before running this, not after, or the page is gone until the next run.
  { root: join(homedir(), "Sites", "cllp-se"), folder: join("dist", "unison") },
]

/** Runs a command with its output shown as it goes; a failure throws, which ends the script there. */
const run = (command: string, args: string[], cwd?: string) => execFileSync(command, args, { cwd, stdio: "inherit" })

run("bun", ["run", "bake"])

const files = await readdir(DIST)
for (const { root, folder } of SITES) {
  const target = join(root, folder)
  await mkdir(target, { recursive: true })
  for (const file of files) await copyFile(join(DIST, file), join(target, file))
  console.log(`${basename(root)}: copied ${files.length} files to ${folder}`)
}

for (const { root } of SITES) run("firebase", ["deploy"], root)

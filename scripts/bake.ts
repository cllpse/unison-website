/**
 * Folds the static export in out/ into one small dist/index.html that opens straight from disk:
 *
 * - The stylesheet is inlined; the fonts load from Google Fonts (offline, the matched local fallbacks stand in).
 * - React and Next.js are dropped: the prerendered HTML is already the whole page, and the little that's interactive
 *   (the nav's current section, quick in-page jumps) comes from bakeClient.js.
 * - The icons and the manifest are inlined as data URIs.
 * - The page's structured data (its JSON-LD script) stays, and the files search engines and link previews fetch by URL,
 *   the sitemap and the social card image, are copied alongside it.
 *
 * Run through `bun run bake`, which exports the site first; out/ is removed afterwards, so dist/ holds just the page and
 * those files.
 *
 * @example
 * bun run bake
 * // => dist/index.html: 230 KB
 */
import { copyFile, mkdir, readFile, rm, writeFile } from "node:fs/promises"
import { dirname, extname, join } from "node:path"

const OUT = "out"
const DIST = "dist"

/**
 * Files fetched by their own URL, so they're published next to the page: the sitemap and the social card image (for
 * search engines and link previews) and the transcript the proof section links to.
 */
const FETCHED_BY_URL = ["sitemap.xml", "opengraph-image.png", "one-shot-session.txt"]

const MIME_TYPES: Record<string, string> = {
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon",
}

/** Reads a file from the export by its URL path (`/_next/static/...`, query strings dropped). */
const readAsset = (url: string) => readFile(join(OUT, decodeURIComponent(url.split("?")[0])))

/** A file from the export as a data URI. */
const toDataUri = async (url: string) => {
  const path = url.split("?")[0]
  const type = MIME_TYPES[extname(path)] ?? "application/octet-stream"

  return `data:${type};base64,${(await readAsset(path)).toString("base64")}`
}

/** Replaces each match of `pattern` with the result of `replace`, which may be async. */
const replaceAsync = async (text: string, pattern: RegExp, replace: (...match: string[]) => Promise<string>) => {
  const replacements = await Promise.all([...text.matchAll(pattern)].map((match) => replace(...match)))
  let index = 0

  return text.replace(pattern, () => replacements[index++])
}

/**
 * Drops next/font's self-hosted faces (every @font-face with a url()), since the baked page loads the same families
 * from Google Fonts instead (GOOGLE_FONTS); the local fallback faces it sizes to match them stay.
 */
const dropHostedFonts = (css: string) => css.replace(/@font-face\{[^}]*url\([^}]*\}/g, "")

/**
 * The page's fonts from Google Fonts, rather than inlined: the same families next/font names (layout.tsx), as variable
 * fonts over the weights it declares. The stylesheet splits each family by character set, so browsers only fetch the
 * Latin files the page uses.
 */
const GOOGLE_FONTS = [
  '<link rel="preconnect" href="https://fonts.googleapis.com">',
  '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
  '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Martian+Mono:wght@100..800&display=swap">',
].join("")

/** Inlines a stylesheet's font and image url()s, resolved against the stylesheet's own path. */
const inlineCss = (css: string, cssUrl: string) =>
  replaceAsync(css, /url\((["']?)([^"')]+)\1\)/g, async (_, quote, url) => {
    // Only files of a known type are inlined; anything else (data URIs, or the grain SVG's own %23n filter
    // reference, matched inside one) stays as written.
    if (url.startsWith("data:") || !(extname(url.split("?")[0]) in MIME_TYPES)) return `url(${quote}${url}${quote})`
    const resolved = url.startsWith("/") ? url : join(dirname(cssUrl), url)

    return `url(${await toDataUri(resolved)})`
  })

let html = await readFile(join(OUT, "index.html"), "utf8")

// React, Next.js and the page's data for them: every script but the structured data, and the preloads that fetch them.
html = html.replace(/<script\b(?![^>]*application\/ld\+json)[^>]*>[\s\S]*?<\/script>/g, "")
html = html.replace(/<link rel="(preload|modulepreload)"[^>]*>/g, "")

html = await replaceAsync(html, /<link rel="stylesheet" href="([^"]+)"[^>]*>/g, async (_, url) => {
  const css = await inlineCss(dropHostedFonts(await readFile(join(OUT, url), "utf8")), url)

  return `<style>${css}</style>`
})

html = await replaceAsync(html, /(<link rel="(?:icon|apple-touch-icon)" href=")([^"]+)"/g, async (_, start, url) => {
  return `${start}${await toDataUri(url)}"`
})

// The manifest, with its icons inlined, as a data URI.
const manifest = JSON.parse(await readFile(join(OUT, "manifest.webmanifest"), "utf8"))
for (const icon of manifest.icons) icon.src = await toDataUri(icon.src)
html = html.replace(
  '"/manifest.webmanifest"',
  `"data:application/manifest+json;base64,${Buffer.from(JSON.stringify(manifest)).toString("base64")}"`,
)

html = html.replace("</head>", `${GOOGLE_FONTS}</head>`)

const client = await readFile(join("scripts", "bakeClient.js"), "utf8")
html = html.replace("</body>", `<script>${client}</script></body>`)

// dist/ holds only the landing page; out/, with the export's other routes, was only the build's scratch space.
await rm(DIST, { recursive: true, force: true })
await mkdir(DIST, { recursive: true })
await writeFile(join(DIST, "index.html"), html)
for (const file of FETCHED_BY_URL) await copyFile(join(OUT, file), join(DIST, file))
await rm(OUT, { recursive: true, force: true })
console.log(`${join(DIST, "index.html")}: ${(Buffer.byteLength(html) / 1024).toFixed(0)} KB`)

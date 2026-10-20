import { ImageResponse } from "next/og"
import { SITE_DESCRIPTION, SITE_URL } from "../../constants/site"

// Built once at build time, which the static export (bun run bake) requires. A route rather than Next's
// opengraph-image file, whose export has no extension, so static hosts would serve it as a download, not a PNG.
export const dynamic = "force-static"

/** The card's size, also given to the Open Graph and X tags in layout.tsx. */
const SIZE = { width: 1200, height: 630 }

/** The 32px favicon's outline, in whole numbers on its own 32-unit grid. */
const MARK =
  "M3 6h1v-2h2v-1h12v1h2v2h1v5h2v2h2v2h2v2h2v2h-2v2h2v2h-2v2h2v2h-2v2h-2v-2h2v-2h-2v2h-2v2h-2v-2h2v-2h2v-2h2v-2h-2v2h-2v2h-2v2h-2v2h-2v-2h2v-2h2v-2h2v-2h2v-2h2v-2h-2v2h-2v2h-2v2h-2v2h-2v2h-2v2h-2v-2h2v-2h2v-2h2v-2h2v-2h2v-2h2v-2h-2v2h-2v2h-1v1h-1v1h-2v2h-2v2h-2v2h-2v-2h2v-2h2v-2h-2v2h-2v-2h-5v-1h-2v-2h-1zM21 13v2h2v-2zM25 11h2v2h2v2h-2v-2h-2z"

const TITLE = ["Figma properties,", "as code."]

/**
 * Inter at one weight, as a TTF from Google Fonts (the image renderer takes TTF or OTF, not the woff2 the site serves),
 * cut down to the characters drawn. Fetched at build time; on any failure the card falls back to the renderer's own
 * font rather than failing the build.
 */
const inter = async (weight: number, text: string) => {
  try {
    const css = await (
      await fetch(`https://fonts.googleapis.com/css2?family=Inter:wght@${weight}&text=${encodeURIComponent(text)}`)
    ).text()
    const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1]

    return url ? await (await fetch(url)).arrayBuffer() : undefined
  } catch {
    return undefined
  }
}

/**
 * The social card: the pixel mark, the hero's title in its two lines, the one-line description and the address, black
 * on white like the page's light theme.
 */
export const GET = async () => {
  const address = SITE_URL.replace(/^https:\/\//, "").replace(/\/$/, "")
  const [bold, regular] = await Promise.all([inter(900, TITLE.join("")), inter(400, SITE_DESCRIPTION + address)])
  const fonts = [
    ...(bold ? [{ name: "Inter", data: bold, weight: 900 as const, style: "normal" as const }] : []),
    ...(regular ? [{ name: "Inter", data: regular, weight: 400 as const, style: "normal" as const }] : []),
  ]

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 80,
        background: "#ffffff",
        color: "#0a0a0a",
        fontFamily: "Inter",
      }}
    >
      <svg width="96" height="96" viewBox="0 0 32 32" aria-hidden="true">
        <path d={MARK} fill="#0a0a0a" />
      </svg>
      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 84,
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
          }}
        >
          {TITLE.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </div>
        <div style={{ display: "flex", fontSize: 28, lineHeight: 1.35, color: "#5a5a5a" }}>{SITE_DESCRIPTION}</div>
      </div>
      <div style={{ display: "flex", fontSize: 28, color: "#5a5a5a" }}>{address}</div>
    </div>,
    { ...SIZE, fonts: fonts.length ? fonts : undefined },
  )
}

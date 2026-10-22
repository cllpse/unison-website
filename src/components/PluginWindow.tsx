import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { type Config, optimize } from "svgo"
import { highlight } from "../utilities/highlight"

export type PluginWindow = {
  code: string
}

/**
 * Figma's colors in the plugin window's drawing, each swapped for the site token it stands for, so the window follows
 * the theme: the window in the canvas, its bars in the card (at Figma's 90%), the text and icons in the ink, the issues
 * in the red and the orange (and their highlights at Figma's 10%), hidden layers in the muted gray, the active tab in
 * the blue (its button the blue at 10% over the card), and the lines and panels in the shade (Figma's black, at its
 * opacities). Masks keep Figma's colors (see drawing()).
 */
const COLORS: Record<string, string> = {
  "#F5FAF6": "var(--color-canvas)",
  white: "var(--color-card)",
  "#29353C": "var(--color-ink)",
  "#DC3412": "var(--color-red)",
  "#B86200": "var(--color-orange)",
  "#808080": "var(--color-muted)",
  "#0079D8": "var(--color-blue)",
  "#E6F4FF": "color-mix(in srgb, var(--color-blue) 10%, var(--color-card))",
  black: "var(--color-shade)",
}

/**
 * SVGO's defaults, minus what the color swap below depends on: Figma's color names and hexes stay as written
 * (convertColors), and so do fills that repeat the default black (removeUnknownsAndDefaults), since black stands for the
 * shade; the mask ids stay too (cleanupIds), so they can't collide with another drawing's on the page. Coordinates keep
 * two decimals: finer than the screen can show, so the drawing renders as Figma exported it.
 */
const SVGO_CONFIG: Config = {
  floatPrecision: 2,
  plugins: [
    {
      name: "preset-default",
      params: { overrides: { convertColors: false, removeUnknownsAndDefaults: false, cleanupIds: false } },
    },
  ],
}

/**
 * The drawing, read at build time and inlined, its colors moved from attributes into styles (presentation attributes
 * can't take var()), and sized by its container instead of Figma's pixels.
 */
const drawing = async () => {
  const svg = await readFile(join(process.cwd(), "src/assets/plugin-window.svg"), "utf8")

  // Masks keep Figma's colors: a luminance mask's white is what lets the logo through, whatever the theme.
  return optimize(svg, SVGO_CONFIG)
    .data.replace(/ width="300" height="491"/, ' aria-hidden="true" class="size-full"')
    .split(/(<mask[\s\S]*?<\/mask>)/)
    .map((part) =>
      part.startsWith("<mask")
        ? part
        : part.replace(/ (fill|stroke)="([^"]+)"/g, (attribute, property: string, color: string) =>
            color in COLORS ? ` style="${property}:${COLORS[color]}"` : attribute,
          ),
    )
    .join("")
}

/**
 * The Figma plugin's window, as plugin-window.svg draws it (the hero's left.svg from Figma, its code panel left empty),
 * with live code in that panel. Everything is measured in the SVG's 300 x 491 units and scaled with the window through
 * container query units, so the code sits in the panel that runs from 60 to 343 units down (1px clear of the line
 * below), set in 9 units from the left like the issues below it, 7 units from the panel's top. The code
 * itself is the sections' code size (text-code: 0.9 of the body text, capped at 17px), not the drawing's, so it reads
 * like the rest of the page, on the drawing's line spacing (13.65 to 9.5). Longer code scrolls inside the panel. The
 * drawing is inlined with its colors on the site's tokens, so the window and its code follow the theme. It spans its
 * container's width and scales with it, and stands out from the canvas on the cards' shadow, rounded to the window's
 * own corners (10 units). Its scrollbar's resting thumb is the window's outermost outline as it shows against the
 * canvas (the shade at 20% over it), a solid color, so the panel's own shading underneath doesn't darken it.
 */
export default async (p: PluginWindow) => {
  const { code } = p

  return (
    <figure className="@container relative aspect-300/491 w-full rounded-[calc(10/300*100%)/calc(10/491*100%)] shadow-card">
      <div
        className="absolute inset-0"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: our own Figma export, read at build time
        dangerouslySetInnerHTML={{ __html: await drawing() }}
      />
      <div
        data-code-block
        className="code-colors absolute inset-x-[calc(1/300*100%)] top-[calc(60/491*100%)] bottom-[calc(148/491*100%+1px)] *:h-full *:overflow-auto *:bg-transparent! *:data-scroll-x:overscroll-x-contain *:data-scroll-y:overscroll-y-contain *:scrollbar-code *:[--scrollbar-rest:color-mix(in_srgb,var(--color-shade)_20%,var(--color-canvas))] *:font-mono *:text-code *:leading-[calc(13.65/9.5)] [&_code]:block [&_code]:w-fit [&_code]:min-w-full [&_code]:pt-[calc(7/300*100cqw)] [&_code]:pr-[calc(9/300*100cqw)] [&_code]:pb-[calc(9/300*100cqw)] [&_code]:pl-[calc(8/300*100cqw)]"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Shiki output, built from our own constant snippet
        dangerouslySetInnerHTML={{ __html: await highlight(code) }}
      />
    </figure>
  )
}

import { createHighlighterCore, type ThemeRegistration } from "shiki/core"
import { createJavaScriptRegexEngine } from "shiki/engine/javascript"

/**
 * A grayscale Shiki theme for code blocks on #fbfbfb, using coolors.co's text grays. Props are the point of every
 * sample, so they and their values stay black, as do tags (in bold). Text between tags, punctuation, comments and
 * removed diff lines step back to the muted #737373 (see `globals.css`); the italic text keeps its full weight in
 * `CodeBlock.tsx` so the lighter color stays readable. Color on the page belongs to the section accents.
 */
const GRAYSCALE: ThemeRegistration = {
  name: "grayscale",
  type: "light",
  colors: {
    "editor.background": "#fbfbfb",
    "editor.foreground": "#0a0a0a",
  },
  tokenColors: [
    {
      scope: ["comment", "punctuation.definition.comment"],
      settings: { foreground: "#737373", fontStyle: "italic" },
    },
    // JSX text (between tags) is italic; the empty fontStyle keeps tags, props and punctuation nested inside it upright.
    { scope: ["meta.jsx.children"], settings: { foreground: "#737373", fontStyle: "italic" } },
    // A tag nested inside that text is code again: reset it to black and upright, so its props and values stay black.
    { scope: ["meta.tag"], settings: { foreground: "#0a0a0a", fontStyle: "" } },
    { scope: ["punctuation", "meta.brace", "keyword.operator"], settings: { foreground: "#737373", fontStyle: "" } },
    // Tag brackets (<, </, >, />) match the tag name they wrap: black and bold.
    { scope: ["punctuation.definition.tag"], settings: { foreground: "#0a0a0a", fontStyle: "bold" } },
    {
      scope: ["entity.name.tag", "support.class.component", "entity.name.type", "support.type"],
      settings: { foreground: "#0a0a0a", fontStyle: "bold" },
    },
    { scope: ["entity.other.attribute-name"], settings: { foreground: "#0a0a0a", fontStyle: "" } },
    {
      scope: ["string", "constant.numeric", "constant.language", "keyword", "storage"],
      settings: { foreground: "#0a0a0a" },
    },
    { scope: ["markup.inserted", "punctuation.definition.inserted"], settings: { foreground: "#0a0a0a" } },
    { scope: ["markup.deleted", "punctuation.definition.deleted"], settings: { foreground: "#737373" } },
  ],
}

/**
 * A colorful Shiki theme from the site palette (see `globals.css`), for a code block that should stand out. Tags take
 * magenta and props amethyst, the two palette colors dark enough to read on #fbfbfb; punctuation takes capri, and
 * strings and comments use the darker aquamarine and yellow text shades. Everything else stays black.
 */
const COLORFUL: ThemeRegistration = {
  name: "colorful",
  type: "light",
  colors: {
    "editor.background": "#fbfbfb",
    "editor.foreground": "#0a0a0a",
  },
  tokenColors: [
    {
      scope: ["comment", "punctuation.definition.comment"],
      settings: { foreground: "#e7c701", fontStyle: "italic" },
    },
    // JSX text (between tags) is italic; the empty fontStyle keeps tags, props and punctuation nested inside it upright.
    { scope: ["meta.jsx.children"], settings: { fontStyle: "italic" } },
    { scope: ["punctuation", "meta.brace", "keyword.operator"], settings: { foreground: "#00bbf9", fontStyle: "" } },
    // Tag brackets (<, </, >, />) are bold like the tag name they wrap; they keep the punctuation color.
    { scope: ["punctuation.definition.tag"], settings: { fontStyle: "bold" } },
    {
      scope: ["entity.name.tag", "support.class.component", "entity.name.type", "support.type"],
      settings: { foreground: "#f15bb5", fontStyle: "bold" },
    },
    { scope: ["entity.other.attribute-name"], settings: { foreground: "#9b5de5", fontStyle: "" } },
    {
      scope: ["string", "constant.numeric", "constant.language", "keyword", "storage"],
      settings: { foreground: "#00b89f" },
    },
    { scope: ["markup.inserted", "punctuation.definition.inserted"], settings: { foreground: "#9b5de5" } },
    { scope: ["markup.deleted", "punctuation.definition.deleted"], settings: { foreground: "#f15bb5" } },
  ],
}

/** Code-block themes by name: grayscale by default, colorful where a block should stand out. */
export const THEMES = { grayscale: GRAYSCALE, colorful: COLORFUL } as const

export type Theme = keyof typeof THEMES

// One highlighter for the whole build, loading only the grammars the site uses. The JavaScript regex engine avoids
// shipping Oniguruma's WebAssembly.
const HIGHLIGHTER = createHighlighterCore({
  themes: Object.values(THEMES),
  langs: [import("shiki/langs/tsx.mjs"), import("shiki/langs/diff.mjs")],
  engine: createJavaScriptRegexEngine(),
})

/**
 * Highlights a TSX (or diff) snippet with Shiki in one of the site's themes and returns it as an HTML string.
 *
 * @example
 * await highlight("<Frame gap-4 />")
 * // => '<pre class="shiki grayscale" ...><code><span class="line">...</span></code></pre>'
 */
export const highlight = async (code: string, lang: "tsx" | "diff" = "tsx", theme: Theme = "grayscale") => {
  const highlighter = await HIGHLIGHTER

  return highlighter.codeToHtml(code, { lang, theme })
}

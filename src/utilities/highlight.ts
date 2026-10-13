import { createHighlighterCore, type ThemeRegistration } from "shiki/core"
import { createJavaScriptRegexEngine } from "shiki/engine/javascript"

/**
 * A grayscale Shiki theme for code blocks on #f7f7f7, using the site's text grays (see `globals.css`). Props are the
 * point of every sample, so they stay black; tags, strings and keywords step back to subtle gray, and punctuation,
 * comments and removed diff lines to muted gray. Color on the page belongs to the section accents.
 */
const THEME: ThemeRegistration = {
  name: "grayscale",
  type: "light",
  colors: {
    "editor.background": "#f7f7f7",
    "editor.foreground": "#0a0a0a",
  },
  tokenColors: [
    {
      scope: ["comment", "punctuation.definition.comment"],
      settings: { foreground: "#737373", fontStyle: "italic" },
    },
    { scope: ["punctuation", "meta.brace", "keyword.operator"], settings: { foreground: "#737373" } },
    {
      scope: ["entity.name.tag", "support.class.component", "entity.name.type", "support.type"],
      settings: { foreground: "#525252" },
    },
    { scope: ["entity.other.attribute-name"], settings: { foreground: "#0a0a0a" } },
    {
      scope: ["string", "constant.numeric", "constant.language", "keyword", "storage"],
      settings: { foreground: "#525252" },
    },
    { scope: ["markup.inserted", "punctuation.definition.inserted"], settings: { foreground: "#0a0a0a" } },
    { scope: ["markup.deleted", "punctuation.definition.deleted"], settings: { foreground: "#737373" } },
  ],
}

// One highlighter for the whole build, loading only the grammars the site uses. The JavaScript regex engine avoids
// shipping Oniguruma's WebAssembly.
const HIGHLIGHTER = createHighlighterCore({
  themes: [THEME],
  langs: [import("shiki/langs/tsx.mjs"), import("shiki/langs/diff.mjs")],
  engine: createJavaScriptRegexEngine(),
})

/**
 * Highlights a TSX (or diff) snippet with Shiki and returns it as an HTML string.
 *
 * @example
 * await highlight("<Frame gap-4 />")
 * // => '<pre class="shiki grayscale" ...><code><span class="line">...</span></code></pre>'
 */
export const highlight = async (code: string, lang: "tsx" | "diff" = "tsx") => {
  const highlighter = await HIGHLIGHTER

  return highlighter.codeToHtml(code, { lang, theme: THEME.name ?? "grayscale" })
}

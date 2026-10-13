import { createHighlighterCore, type ThemeRegistration } from "shiki/core"
import { createJavaScriptRegexEngine } from "shiki/engine/javascript"

/**
 * A monochrome Shiki theme for code blocks on #f7f7f7: everything is black, and only comments stand apart, in
 * italics. Color on the page belongs to the section accents (see `Section.tsx`).
 */
const THEME: ThemeRegistration = {
  name: "monochrome",
  type: "light",
  colors: {
    "editor.background": "#f7f7f7",
    "editor.foreground": "#0a0a0a",
  },
  tokenColors: [{ scope: ["comment", "punctuation.definition.comment"], settings: { fontStyle: "italic" } }],
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
 * // → '<pre class="shiki monochrome" …><code><span class="line">…</span></code></pre>'
 */
export const highlight = async (code: string, lang: "tsx" | "diff" = "tsx") => {
  const highlighter = await HIGHLIGHTER

  return highlighter.codeToHtml(code, { lang, theme: THEME.name ?? "monochrome" })
}

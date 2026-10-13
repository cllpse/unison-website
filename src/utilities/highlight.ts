import { createHighlighterCore, type ThemeRegistration } from "shiki/core"
import { createJavaScriptRegexEngine } from "shiki/engine/javascript"

/**
 * A Shiki theme built from the site palette (see `globals.css`) for code blocks on #f7f7f7. Yellow, capri and
 * aquamarine are too light to read on it, so props take amethyst, tags magenta and everything else black.
 */
const THEME: ThemeRegistration = {
  name: "palette",
  type: "light",
  colors: {
    "editor.background": "#f7f7f7",
    "editor.foreground": "#0a0a0a",
  },
  tokenColors: [
    {
      scope: ["comment", "punctuation.definition.comment"],
      settings: { foreground: "#0a0a0a", fontStyle: "italic" },
    },
    { scope: ["punctuation", "meta.brace", "keyword.operator"], settings: { foreground: "#0a0a0a" } },
    {
      scope: ["entity.name.tag", "support.class.component", "entity.name.type", "support.type"],
      settings: { foreground: "#f15bb5" },
    },
    { scope: ["entity.other.attribute-name"], settings: { foreground: "#9b5de5" } },
    { scope: ["string", "constant.numeric", "constant.language"], settings: { foreground: "#0a0a0a" } },
    { scope: ["keyword", "storage"], settings: { foreground: "#f15bb5" } },
    { scope: ["markup.inserted", "punctuation.definition.inserted"], settings: { foreground: "#9b5de5" } },
    { scope: ["markup.deleted", "punctuation.definition.deleted"], settings: { foreground: "#f15bb5" } },
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
 * // → '<pre class="shiki palette" …><code><span class="line">…</span></code></pre>'
 */
export const highlight = async (code: string, lang: "tsx" | "diff" = "tsx") => {
  const highlighter = await HIGHLIGHTER

  return highlighter.codeToHtml(code, { lang, theme: THEME.name ?? "palette" })
}

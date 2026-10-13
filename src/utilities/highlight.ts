import { createHighlighterCore, type ThemeRegistration } from "shiki/core"
import { createJavaScriptRegexEngine } from "shiki/engine/javascript"

/**
 * A Shiki theme built from the site palette (see `globals.css`) for code blocks on #f7f7f7. Robin egg and Naples
 * yellow are too light to read on it, so props take midnight green, tags the bittersweet accent and the rest black.
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
      settings: { foreground: "#0a0a0a8c", fontStyle: "italic" },
    },
    { scope: ["punctuation", "meta.brace", "keyword.operator"], settings: { foreground: "#0a0a0a8c" } },
    {
      scope: ["entity.name.tag", "support.class.component", "entity.name.type", "support.type"],
      settings: { foreground: "#ff6b6b" },
    },
    { scope: ["entity.other.attribute-name"], settings: { foreground: "#1a535c" } },
    { scope: ["string", "constant.numeric", "constant.language"], settings: { foreground: "#0a0a0a" } },
    { scope: ["keyword", "storage"], settings: { foreground: "#ff6b6b" } },
  ],
}

// One highlighter for the whole build, loading only the grammar the site uses. The JavaScript regex engine avoids
// shipping Oniguruma's WebAssembly.
const HIGHLIGHTER = createHighlighterCore({
  themes: [THEME],
  langs: [import("shiki/langs/tsx.mjs")],
  engine: createJavaScriptRegexEngine(),
})

/**
 * Highlights a TSX snippet with Shiki and returns it as an HTML string.
 *
 * @example
 * await highlight("<Frame gap-4 />")
 * // → '<pre class="shiki palette" …><code><span class="line">…</span></code></pre>'
 */
export const highlight = async (code: string) => {
  const highlighter = await HIGHLIGHTER

  return highlighter.codeToHtml(code, { lang: "tsx", theme: THEME.name ?? "palette" })
}

import { createHighlighterCore } from "shiki/core"
import { createJavaScriptRegexEngine } from "shiki/engine/javascript"

// One highlighter for the whole build with only what the site uses: GitHub's current light and dark themes and two
// grammars. The JavaScript regex engine avoids shipping Oniguruma's WebAssembly.
const HIGHLIGHTER = createHighlighterCore({
  themes: [import("shiki/themes/github-light-default.mjs"), import("shiki/themes/github-dark-default.mjs")],
  langs: [import("shiki/langs/tsx.mjs"), import("shiki/langs/diff.mjs")],
  engine: createJavaScriptRegexEngine(),
})

/** An editor-style error squiggle. */
const SQUIGGLE = "underline decoration-error decoration-wavy decoration-1 underline-offset-4"

/**
 * Highlights a TSX (or diff) snippet with Shiki, in GitHub's colors, and returns it as an HTML string. Tokens are
 * colored for the light theme, with the dark theme's colors alongside in `--shiki-dark` for `CodeBlock` to switch to.
 * If `error` is given, its first occurrence gets a red squiggle, like a type error in an editor.
 *
 * @example
 * await highlight("<Frame gap-9 />", "tsx", "gap-9")
 * // => '<pre class="shiki shiki-themes github-light-default github-dark-default" ...>...<span style="color:#0550AE;--shiki-dark:#79C0FF" class="underline decoration-error ...">gap-9</span>...'
 */
export const highlight = async (code: string, lang: "tsx" | "diff" = "tsx", error?: string) => {
  const start = error ? code.indexOf(error) : -1
  const decorations = error && start >= 0 ? [{ start, end: start + error.length, properties: { class: SQUIGGLE } }] : []

  // No tabindex: Shiki makes each <pre> focusable by default, so clicking into code would move focus to it.
  return (await HIGHLIGHTER).codeToHtml(code, {
    lang,
    themes: { light: "github-light-default", dark: "github-dark-default" },
    tabindex: false,
    decorations,
  })
}

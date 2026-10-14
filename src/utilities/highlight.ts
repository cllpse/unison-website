import { createHighlighterCore } from "shiki/core"
import { createJavaScriptRegexEngine } from "shiki/engine/javascript"

// One highlighter for the whole build with only what the site uses: GitHub's current light and dark themes and two
// grammars. The JavaScript regex engine avoids shipping Oniguruma's WebAssembly.
const HIGHLIGHTER = createHighlighterCore({
  themes: [import("shiki/themes/github-light-default.mjs"), import("shiki/themes/github-dark-default.mjs")],
  langs: [import("shiki/langs/tsx.mjs"), import("shiki/langs/diff.mjs")],
  engine: createJavaScriptRegexEngine(),
})

/**
 * GitHub's greens, property blues and diff reds, swapped for the site's own colors through the code-colors utility
 * (globals.css), which sets them per theme: tag names and added diff lines in the agents section's aquamarine,
 * properties in the starters section's capri, removed diff lines in the designers section's magenta, like the error
 * squiggle. Keys are each theme's hex.
 */
const COLOR_REPLACEMENTS = {
  "github-light-default": {
    "#116329": "var(--code-tag)",
    "#0550ae": "var(--code-property)",
    "#82071e": "var(--code-error)",
  },
  "github-dark-default": {
    "#7ee787": "var(--code-tag)",
    "#79c0ff": "var(--code-property)",
    "#ffa198": "var(--code-error)",
  },
}

/** An editor-style error squiggle, in the code's pink rather than red. */
const SQUIGGLE = "underline decoration-(--code-error) decoration-wavy decoration-1 underline-offset-4"

/**
 * Highlights a TSX (or diff) snippet with Shiki, in GitHub's colors, and returns it as an HTML string. Tokens are
 * colored for the light theme, with the dark theme's colors alongside in `--shiki-dark` for `CodeBlock` to switch to.
 * If `error` is given, its first occurrence gets a squiggle in the palette's pink, like a type error in an editor.
 *
 * @example
 * await highlight("<Frame gap-9 />", "tsx", "gap-9")
 * // => '<pre class="shiki shiki-themes github-light-default github-dark-default" ...>...<span style="color:#0550AE;--shiki-dark:#79C0FF" class="underline decoration-magenta ...">gap-9</span>...'
 */
export const highlight = async (code: string, lang: "tsx" | "diff" = "tsx", error?: string) => {
  const start = error ? code.indexOf(error) : -1
  const decorations = error && start >= 0 ? [{ start, end: start + error.length, properties: { class: SQUIGGLE } }] : []

  // No tabindex: Shiki makes each <pre> focusable by default, so clicking into code would move focus to it.
  return (await HIGHLIGHTER).codeToHtml(code, {
    lang,
    themes: { light: "github-light-default", dark: "github-dark-default" },
    colorReplacements: COLOR_REPLACEMENTS,
    tabindex: false,
    decorations,
  })
}

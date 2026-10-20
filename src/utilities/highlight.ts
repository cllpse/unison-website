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
 * GitHub's colors, swapped for the site's own palette through the code-colors utility (globals.css), which sets them
 * per theme: plain code in the ink, comments in the muted slate, tag names and added diff lines in the agents section's
 * green, properties in the starters section's blue, keywords (JSDoc tags, the = before a prop's {expression}) in the
 * developers section's orange, strings in the team's purple, and removed diff lines in the red, like the error
 * squiggle. Keys are each theme's hex.
 */
const COLOR_REPLACEMENTS = {
  "github-light-default": {
    "#1f2328": "var(--code-text)",
    "#6e7781": "var(--code-comment)",
    "#116329": "var(--code-tag)",
    "#0550ae": "var(--code-property)",
    "#cf222e": "var(--code-keyword)",
    "#0a3069": "var(--code-string)",
    "#82071e": "var(--code-error)",
  },
  "github-dark-default": {
    "#e6edf3": "var(--code-text)",
    "#8b949e": "var(--code-comment)",
    "#7ee787": "var(--code-tag)",
    "#79c0ff": "var(--code-property)",
    "#ff7b72": "var(--code-keyword)",
    "#a5d6ff": "var(--code-string)",
    "#ffa198": "var(--code-error)",
  },
}

/** An editor-style error squiggle, in the code's red. */
const SQUIGGLE = "underline decoration-(--code-error) decoration-wavy decoration-[1.5px] underline-offset-4"

/**
 * Highlights a TSX (or diff) snippet with Shiki, in GitHub's colors, and returns it as an HTML string. Tokens are
 * colored for the light theme, with the dark theme's colors alongside in `--shiki-dark` for `CodeBlock` to switch to.
 * If `error` is given, its first occurrence gets a squiggle in the palette's red, like a type error in an editor.
 *
 * @example
 * await highlight("<Frame gap-9 />", "tsx", "gap-9")
 * // => '<pre class="shiki shiki-themes github-light-default github-dark-default" ...>...<span style="color:var(--code-property);--shiki-dark:var(--code-property)" class="underline decoration-(--code-error) ...">gap-9</span>...'
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

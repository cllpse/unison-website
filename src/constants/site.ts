/** Product name, kept in one place so a rename touches a single line. */
export const PRODUCT_NAME = "Unison"

/** The repository the site is about, shown as the site title in the header. */
export const REPO_NAME = "cllpse/unison"

export const REPO_URL = `https://github.com/${REPO_NAME}`

/** Where the site lives: the base for its canonical URL, social cards, sitemap and structured data. */
export const SITE_URL = "https://cllp.se/figma/"

/** The page title, for the browser tab, search results and social cards. */
export const SITE_TITLE = `${REPO_NAME} - Figma properties, as code`

/** The Figma plugin's Community page. @todo @cllpse: link the published plugin. */
export const PLUGIN_URL = "about:blank"

/** The one-line description, for search results and the web app manifest. */
export const SITE_DESCRIPTION =
  "Components that speak Figma's vocabulary, so designs ship as drawn and coding agents write in your design system instead of guessing at it."

/**
 * Each section's accent as a Tailwind class setting `--accent`, shared by the section and the nav link that points at
 * it. Headings, links, emphasis and selections inside pick it up. Spelled out in full so Tailwind can find them.
 */
export const SECTION_ACCENTS = {
  team: "[--accent:var(--color-purple)]",
  designers: "[--accent:var(--color-pink)]",
  developers: "[--accent:var(--color-orange)]",
  agents: "[--accent:var(--color-green)]",
  "get-started": "[--accent:var(--color-blue)]",
  // The fine print speaks to everyone, in the ink.
  "fine-print": "[--accent:var(--color-ink)]",
} as const

export type SectionId = keyof typeof SECTION_ACCENTS

/**
 * Each section's underline for its nav link and "For" label, as a Tailwind class from globals.css: a marker stroke by
 * default, a highlighter for designers, a code-editor squiggle for developers, a frame of squares for agents and dots for
 * starters. Their color is set through `--underline`.
 */
export const SECTION_UNDERLINES: Record<SectionId, string> = {
  team: "underline-marker",
  designers: "underline-highlighter",
  developers: "underline-squiggle",
  agents: "underline-square-frame",
  "get-started": "underline-dotted",
  "fine-print": "underline-marker",
}

export const NAV_LINKS: { id: SectionId; label: string }[] = [
  { id: "team", label: "The Team" },
  { id: "designers", label: "Designers" },
  { id: "developers", label: "Developers" },
  { id: "agents", label: "Agents" },
  { id: "get-started", label: "Starters" },
]

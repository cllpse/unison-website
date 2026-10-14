/** Product name, kept in one place so a rename touches a single line. */
export const PRODUCT_NAME = "Figma"

/** The repository the site is about, shown as the site title in the header. */
export const REPO_NAME = "cllpse/figma"

export const REPO_URL = `https://github.com/${REPO_NAME}`

/** The Figma plugin's Community page. @todo @cllpse: link the published plugin. */
export const PLUGIN_URL = "about:blank"

/** The one-line description, for search results and the web app manifest. */
export const SITE_DESCRIPTION =
  "Components that speak Figma's vocabulary, so your coding agent writes your design system instead of guessing at it."

/**
 * Each section's accent as a Tailwind class setting `--accent`, shared by the section and the nav link that points at
 * it. Headings, links, emphasis and selections inside pick it up. Spelled out in full so Tailwind can find them.
 */
export const SECTION_ACCENTS = {
  everyone: "[--accent:var(--color-amethyst)]",
  designers: "[--accent:var(--color-magenta)]",
  developers: "[--accent:var(--color-minion-yellow)]",
  agents: "[--accent:var(--color-aquamarine)]",
  "get-started": "[--accent:var(--color-capri)]",
  // The fine print speaks to everyone, in the plain text color.
  "fine-print": "[--accent:var(--color-black)] dark:[--accent:var(--color-white)]",
} as const

export type SectionId = keyof typeof SECTION_ACCENTS

/**
 * Each section's underline for its nav link and "For" label, as a Tailwind class from globals.css: a marker stroke by
 * default, a highlighter for designers, a code-editor squiggle for developers, dashes for agents and dots for
 * starters. Their color is set through `--underline`.
 */
export const SECTION_UNDERLINES: Record<SectionId, string> = {
  everyone: "underline-marker",
  designers: "underline-highlighter",
  developers: "underline-squiggle",
  agents: "underline-dashed",
  "get-started": "underline-dotted",
  "fine-print": "underline-marker",
}

export const NAV_LINKS: { id: SectionId; label: string }[] = [
  { id: "everyone", label: "Everyone" },
  { id: "designers", label: "Designers" },
  { id: "developers", label: "Developers" },
  { id: "agents", label: "Agents" },
  { id: "get-started", label: "Starters" },
]

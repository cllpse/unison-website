/** Product name, kept in one place so a rename touches a single line. */
export const PRODUCT_NAME = "Figma"

/** The repository the site is about, shown as the site title in the header. */
export const REPO_NAME = "cllpse/figma"

export const REPO_URL = `https://github.com/${REPO_NAME}`

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
} as const

export type SectionId = keyof typeof SECTION_ACCENTS

export const NAV_LINKS: { id: SectionId; label: string }[] = [
  { id: "everyone", label: "Everyone" },
  { id: "designers", label: "Designers" },
  { id: "developers", label: "Developers" },
  { id: "agents", label: "Agents" },
  { id: "get-started", label: "Starters" },
]

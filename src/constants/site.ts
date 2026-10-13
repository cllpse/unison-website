/** Product name, kept in one place so a rename touches a single line. */
export const PRODUCT_NAME = "Figma"

/** The repository the site is about, shown as the site title in the header. */
export const REPO_NAME = "cllpse/figma"

/** Accent per section, shared by the sections and the nav links that point at them. */
export const SECTION_ACCENTS = {
  problem: "amethyst",
  features: "magenta",
  plugin: "minion-yellow",
  agents: "capri",
  audiences: "aquamarine",
  "get-started": "amethyst",
} as const

export type SectionId = keyof typeof SECTION_ACCENTS

export const NAV_LINKS: { id: SectionId; label: string }[] = [
  { id: "problem", label: "Why" },
  { id: "features", label: "Features" },
  { id: "plugin", label: "Plugin" },
  { id: "agents", label: "Agents" },
  { id: "get-started", label: "Get started" },
]

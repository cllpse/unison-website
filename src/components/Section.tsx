import type { ReactNode } from "react"
import { SECTION_ACCENTS, type SectionId } from "../constants/site"

/**
 * Each accent sets `--accent` (borders) and `--accent-text` (headings, links, emphasis) for the whole section, so
 * everything inside it picks up the color without being told. Yellow and aquamarine are too light to read as text on
 * white, so their text uses a darker shade. The class names are spelled out so Tailwind can find them.
 */
export const ACCENT_CLASSES = {
  amethyst: "[--accent:var(--color-amethyst)] [--accent-text:var(--color-amethyst)]",
  magenta: "[--accent:var(--color-magenta)] [--accent-text:var(--color-magenta)]",
  "minion-yellow": "[--accent:var(--color-minion-yellow)] [--accent-text:var(--color-minion-yellow-dark)]",
  capri: "[--accent:var(--color-capri)] [--accent-text:var(--color-capri)]",
  aquamarine: "[--accent:var(--color-aquamarine)] [--accent-text:var(--color-aquamarine-dark)]",
} as const

export type Section = {
  id: SectionId
  title: string
  children: ReactNode
}

export default (p: Section) => {
  const { id, title, children } = p
  const accent = SECTION_ACCENTS[id]

  return (
    <section id={id} className={`mt-16 scroll-mt-6 sm:mt-24 ${ACCENT_CLASSES[accent]}`}>
      <h2 className="text-heading text-balance text-(--accent-text)">{title}</h2>
      {children}
    </section>
  )
}

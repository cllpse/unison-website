import type { ReactNode } from "react"

/**
 * Each accent sets `--accent` for the whole section, so headings and code-block borders inside it pick up the color
 * without being told. The class names are spelled out so Tailwind can find them.
 */
const ACCENT_CLASSES = {
  amethyst: "[--accent:var(--color-amethyst)]",
  magenta: "[--accent:var(--color-magenta)]",
  "minion-yellow": "[--accent:var(--color-minion-yellow)]",
  capri: "[--accent:var(--color-capri)]",
  aquamarine: "[--accent:var(--color-aquamarine)]",
} as const

export type Section = {
  id?: string
  title: string
  accent: keyof typeof ACCENT_CLASSES
  children: ReactNode
}

export default (p: Section) => {
  const { id, title, accent, children } = p

  return (
    <section id={id} className={`mt-16 scroll-mt-6 sm:mt-24 ${ACCENT_CLASSES[accent]}`}>
      <h2 className="text-heading text-balance text-(--accent)">{title}</h2>
      {children}
    </section>
  )
}

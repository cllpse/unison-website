import type { ReactNode } from "react"

export type Disclaimer = { children: ReactNode }

/**
 * A small boxed caveat, centered at the end of a section, on faint pixel warning-tape stripes, its corners stepped in
 * like the section code blocks', set like a paragraph.
 */
export default (p: Disclaimer) => {
  const { children } = p

  return (
    <aside className="mx-auto mt-12 w-fit pixel-corners warning-tape px-4 py-3 font-paragraph [--pixel-corner:calc(var(--spacing)*0.75)]">
      <p>{children}</p>
    </aside>
  )
}

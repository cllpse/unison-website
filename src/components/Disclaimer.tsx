import type { ReactNode } from "react"

export type Disclaimer = { children: ReactNode }

/**
 * A note that closes a section, a band across the bottom of the card in the page's own canvas color, a shade darker
 * (canvas-shade, black at 2% over it), mixed in as a solid color rather than laid over the card, which is white, so the
 * band reads as the canvas showing through. Above it runs a 1px rule (--line), black at 7.5%. On the dark theme both
 * use white at the same strengths. It's padded at the sides as the section's card is (Section.tsx), and above and
 * below half as much; the text is centered and capped at the section headings' width (23 base sizes), as one
 * paragraph or several <p>s an em apart. It steps out over the card's padding to its edges, so it must come last, and
 * its negative margins follow the padding Section sets at each width.
 */
export default (p: Disclaimer) => {
  const { children } = p

  return (
    <aside className="-mx-card-side mt-medium -mb-medium border-[oklch(0_0_0/0.075)] border-t bg-canvas-shade px-card-side py-small text-center lg:-mx-large lg:mt-large lg:-mb-large lg:px-large lg:py-medium dark:border-[oklch(1_0_0/0.075)]">
      <div className="mx-auto max-w-[calc(var(--font-size)*23)] text-small leading-tight [&>p+p]:mt-[1em]">
        {children}
      </div>
    </aside>
  )
}

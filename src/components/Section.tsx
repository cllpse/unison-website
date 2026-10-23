import type { ReactNode } from "react"
import { SECTION_ACCENTS, SECTION_UNDERLINES, type SectionId } from "../constants/site"

/**
 * The heading classes, for the hero's title and the section promises: xxx-large, xxxx-large from 64em, weight 800, tight letter spacing, the x-tight line height,
 * wrapped prettily (globals.css), with -0.215em above and below, which trims the line's
 * leading so the text sits where its box does. In the ink, as wide as its container in the hero; sections cap it at 23
 * base sizes, centered. A <sub> in it sits at 75% of
 * the size, its baseline 10% of the heading's line height below the line's (the x-tight 1.15, over the sub's own 0.75).
 */
export const HEADING =
  "-my-[0.215em] text-xxx-large font-extrabold leading-x-tight [--tracking:var(--tracking-tight)] text-ink wrap-break-word lg:text-xxxx-large [&_sub]:text-[75%] [&_sub]:-bottom-[calc(var(--leading-x-tight)*0.1em/0.75)]"

/**
 * The pitch's classes, also used by the hero's subtitle: x-large (the base size), regular weight, tight letter spacing, the tight line height, wrapped prettily
 * (globals.css), with -0.29em above and below to trim the line's leading, in the ink. A headline and its text sit 1em of the
 * base size apart; that gap is the top margin, less the trim, and it adds up with the heading's own negative
 * margin. As wide as its container in the hero; sections cap it at 23 base sizes, like
 * the heading.
 */
export const PITCH =
  "mt-[calc(var(--font-size)-0.29em)] -mb-[0.29em] text-x-large font-normal leading-tight [--tracking:var(--tracking-tight)] text-ink"

export type Section = {
  id: SectionId
  /**
   * Who the section speaks to, in lowercase ("the team"); shown as a "For <audience>" link to the section above the
   * heading. A node, so a letter can be set apart, like the tipped "s" in agents.
   */
  audience?: ReactNode
  /** The promise; a node, so it can carry inline markup such as a <sub>. */
  title: ReactNode
  /** The h3 under the promise: one line on how the library keeps it, set large. Left out on the TL;DR card. */
  pitch?: ReactNode
  children: ReactNode
  /**
   * Shows the section as a floating card instead, under this id: a manual popover (closed until a button with a
   * matching popoverTarget opens it), centered over a dimmed page, its text scrolling under its heading. Marked data-collapsed,
   * it shrinks to its heading, small, at the top of the view below the header, with no backdrop, so the page can be
   * used under it. TldrCard opens, collapses and closes it. It keeps the section's accent and contents.
   */
  popover?: string
}

/**
 * A titled section on a card of its own, in its accent color, which also styles what's inside it: subheadings,
 * paragraphs (emphasis takes the accent, links keep the text color, their underlines and the abbreviations' higher than
 * the site's (0.09em into the line, scaling with the text) and a little thinner, at 0.095em), and any direct `div`,
 * `ol` or `ul` child, which becomes a two-column grid (of h4 points, or of code blocks side by side) from `md` up; the
 * grid gap spaces those code blocks, so they drop their own top margin. The label, heading and pitch are centered over
 * the card; the points below read from the left, and running paragraphs span the card.
 */
export default (p: Section) => {
  const { id, audience, title, pitch, children, popover } = p

  // In place on the page, the cards are 2 base sizes apart, 3 from 64em, and a jump to one leaves a base size above
  // it. Floating, the card is centered in the view, exactly as wide as the cards on the page (in from the view's sides
  // as the canvas's content is, a small step on phones and an x-large one from 64em, and no wider than the page) and
  // padded as they are, so its text lines up with theirs left and right (from 64em its side padding is a quarter
  // more, and the card a quarter of the cards' padding wider on each side to match); an xx-large step from the top and bottom from
  // 64em, its text scrolling if it's taller than the view, its corners rounded as the yellow links to the proof
  // are, with the cards' shadow lifting it off the dimmed page. Collapsed, it's just its heading at the text size of
  // the header's links, padded a small step at the sides and half that above and below, centered a small step above
  // the bottom of the view, with the header's shadow in its blue (shadow-chip), which suits its height. It inverts the card's colors, the
  // heading and close button in white (the dark theme's off-white) on the accent, and keeps the close button, beside
  // the heading on the right, its tap room taken back by negative margins so it doesn't make the card any bigger. A
  // ring in a lighter tint of its blue (a quarter white) sits over its shadow, setting it apart from the page, as thick
  // relative to the chip as 2px is to its 17px text on phones, so it grows and shrinks with it: a ring rather than an
  // outline, which Chrome rounds to device pixels.
  const placement = popover
    ? "fixed inset-0 m-auto h-fit max-h-[calc(100svh-2*var(--spacing-small))] w-[calc(100%-2*var(--spacing-small))] flex-col overflow-hidden rounded-sm open:flex border-0 text-ink shadow-card popover-card lg:max-h-[calc(100svh-2*var(--spacing-xx-large))] lg:w-[calc(100%-2*var(--spacing-x-large)+var(--spacing-large)/2)] lg:max-w-[calc(var(--container-page)+var(--spacing-large)/2)] lg:px-[calc(var(--spacing-large)*1.25)] data-collapsed:inset-x-0 data-collapsed:top-auto data-collapsed:bottom-small data-collapsed:mx-auto data-collapsed:w-fit data-collapsed:cursor-pointer data-collapsed:px-small data-collapsed:py-[calc(var(--spacing-small)/2)] data-collapsed:shadow-chip data-collapsed:ring-[length:calc(var(--text-small)/8.5)] data-collapsed:ring-[color-mix(in_oklab,var(--accent)_75%,var(--color-white))] data-collapsed:[&_h2]:my-0 data-collapsed:[&_h2]:text-small data-collapsed:[&_h2]:leading-default data-collapsed:flex-row data-collapsed:items-center data-collapsed:gap-x-small data-collapsed:bg-(--accent) data-collapsed:[&_h2_span]:text-white data-collapsed:[&>:not(header,button)]:hidden! data-collapsed:[&>button]:static data-collapsed:[&>button]:order-last data-collapsed:[&>button]:-my-[0.4em] data-collapsed:[&>button]:-mx-[0.4em] data-collapsed:[&>button]:text-white"
    : "mt-large scroll-mt-[calc(var(--header-height)+var(--spacing-medium))] lg:mt-x-large"

  return (
    // The card: square corners and no shadow, set apart from the canvas by its color alone, with the canvas showing
    // between the cards. On phones 2 base sizes apart, padded 1 (two thirds of it at the sides), with rows 1 apart; from 64em,
    // 3 apart, padded 2, with rows 1.5 apart. Content sits 1.5 below the header, in columns 2 apart.
    <section
      id={popover ?? id}
      popover={popover ? "manual" : undefined}
      // Named for the view transition that morphs it between open and collapsed (globals.css).
      style={popover ? { viewTransitionName: popover } : undefined}
      className={`${SECTION_ACCENTS[id]} ${placement} mx-auto max-w-page bg-card px-card-side py-medium lg:p-large [&_:is(a,abbr)]:underline-offset-[-0.09em] [&_:is(a,abbr)]:decoration-[length:0.095em] [&_:is(em,strong)]:text-(--accent) [&_h4]:text-small [&_h4]:font-bold [&_h4]:leading-default [&_h4]:text-ink [&>p]:text-small [&>p]:leading-tight [&_li_p]:text-small [&_li_p]:leading-tight [&_h4+p]:mt-1.5 [&_*+p]:mt-4 [&_li>p+p]:mt-2 [&>:is(div,ol,ul)]:mt-neutral [&>:is(div,ol,ul)]:grid [&>:is(div,ol,ul)]:gap-x-large [&>:is(div,ol,ul)]:gap-y-medium lg:[&>:is(div,ol,ul)]:gap-y-neutral [&>:is(div,ol,ul)]:grid-cols-[repeat(auto-fit,minmax(min(100%,24rem),1fr))] [&>:is(div,ol,ul)>*]:min-w-0 [&>div>figure]:mt-0 [&>p]:mt-neutral [&>p+p]:mt-4`}
    >
      {popover ? (
        // The floating card's close button, in its top right corner as far in as the card's padding reaches on
        // phones, half of it from 64em: a cross drawn like the proof links' arrow (a 12px grid, 1.75px round strokes),
        // in the paragraphs' ink, the text size of the paragraphs, with a little room around it to tap.
        <button
          type="button"
          popoverTarget={popover}
          popoverTargetAction="hide"
          aria-label="Close"
          className="absolute top-[calc(var(--spacing-medium)-0.4em)] right-[calc(var(--spacing-card-side)-0.4em)] cursor-pointer p-[0.4em] text-small text-ink transition-opacity duration-116 ease-out hover:opacity-60 motion-reduce:transition-none lg:top-[calc(var(--spacing-large)/2-0.4em)] lg:right-[calc(var(--spacing-large)/2-0.4em)]"
        >
          <svg viewBox="0 0 12 12" aria-hidden="true" className="block size-[0.875em] fill-none stroke-current">
            <path d="M2.5 2.5L9.5 9.5M9.5 2.5L2.5 9.5" strokeWidth="1.75" strokeLinecap="round" />
          </svg>
        </button>
      ) : null}
      <header className="text-center">
        {/* hgroup ties the audience label to the heading as its kicker. */}
        <hgroup>
          {/* The label is set two notches above the points' h4s: large, bold, the default line height. Its bottom
              margin, 1.17 of the base size from 64em, leaves half again as much space between the label (with its
              underline) and the heading as between the heading and the pitch. On phones the base size is at its
              floor, as large as on a laptop, so the margin takes two thirds of that (0.78 of the base), as the cards'
              side padding does. */}
          {audience ? (
            <p className="mb-[calc(0.78*var(--font-size))] lg:mb-[calc(1.17*var(--font-size))] text-large font-bold leading-default [&_a]:font-bold">
              {/* Like GitHub's heading anchors: a link icon (Font Awesome Free, CC BY 4.0) hangs in the padding on
                    hover, shown at once, and the underline stays as it is: nothing here animates. Only the audience is
                    underlined, not "For"; it's an inline block, like the nav's links (flex items), so the drawn
                    underlines sit at the same distance below the text in both. */}
              <a href={`#${id}`} className="group/anchor relative text-(--accent) no-underline">
                <svg
                  viewBox="0 0 640 512"
                  aria-hidden="true"
                  className="absolute top-1/2 right-full mr-[0.3em] h-[0.7em] w-[0.875em] -translate-y-1/2 fill-current opacity-0 group-hover/anchor:opacity-100"
                >
                  <path d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0l112.3-112.3zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5l112.2-112.3c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z" />
                </svg>
                For <span className={`${SECTION_UNDERLINES[id]} inline-block`}>{audience}</span>
              </a>
            </p>
          ) : null}
          <h2 className={`${HEADING} mx-auto max-w-[calc(var(--font-size)*23)]`}>{title}</h2>
        </hgroup>
        {pitch ? <h3 className={`${PITCH} mx-auto max-w-[calc(var(--font-size)*23)]`}>{pitch}</h3> : null}
      </header>
      {popover ? (
        // Floating, only the text scrolls, under the heading and the close button, which stay put. The sections'
        // rules for a child div (a grid of points) don't fit it, so it's a plain block, its paragraphs set as the
        // card's own would be. Its scrollbar is the code blocks' (scrollbar-code), shown while it scrolls or is under
        // the pointer, against the card's right edge: the text reaches into the card's padding there, padded back by the
        // padding less the scrollbar's track, which is always reserved, so the text ends where the heading's space does.
        <div
          data-scroll-area
          className="-mr-card-side block! min-h-0 overflow-y-auto overscroll-contain pr-[calc(var(--spacing-card-side)-var(--scrollbar-track))] [scrollbar-gutter:stable] scrollbar-code lg:-mr-[calc(var(--spacing-large)*1.25)] lg:pr-[calc(var(--spacing-large)*1.25-var(--scrollbar-track))] [&>p]:text-small [&>p]:leading-tight [&>p+p]:mt-4"
        >
          {children}
        </div>
      ) : (
        children
      )}
    </section>
  )
}

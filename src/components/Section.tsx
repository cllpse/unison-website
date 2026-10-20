import type { ReactNode } from "react"
import { SECTION_ACCENTS, SECTION_UNDERLINES, type SectionId } from "../constants/site"

/**
 * The heading classes, for the hero's title and the section promises, as the reference sets its intro's h1
 * (`.intro header h1`): xxx-large, xxxx-large from 64em, weight 800, tight letter spacing, the x-tight line height and
 * balanced lines, with -0.215em above and below, which trims the line's leading so the text sits where its box does.
 * In the ink, and as wide as its container, in the hero as in the sections.
 */
export const HEADING =
  "-my-[0.215em] text-xxx-large font-extrabold leading-x-tight [--tracking:var(--tracking-tight)] text-ink text-balance wrap-break-word lg:text-xxxx-large"

/**
 * The pitch's classes, also used by the hero's subtitle, as the reference sets its hero's subtitle (`.hero__headline
 * h2`): x-large (the base size), regular weight, tight letter spacing, the tight line height and balanced lines, with
 * -0.29em above and below to trim the line's leading, in the ink. The reference spaces a headline and its text 1em of the
 * base size apart; here that gap is the top margin, less the trim, and it adds up with the heading's own negative margin
 * as it does there. As wide as its container, in the hero as in the sections.
 */
export const PITCH =
  "mt-[calc(var(--font-size)-0.29em)] -mb-[0.29em] text-x-large font-normal leading-tight [--tracking:var(--tracking-tight)] text-ink text-balance"

export type Section = {
  id: SectionId
  /**
   * Who the section speaks to, in Capital Case ("The Team"); shown as a "for <Audience>" link to the section above the
   * heading. A node, so a letter can be set apart, like the tipped "s" in Agents.
   */
  audience?: ReactNode
  /** The promise; a node, so it can carry inline markup such as a <sub>. */
  title: ReactNode
  /** The h3 under the promise: one line on how the library keeps it, set large. */
  pitch: ReactNode
  children: ReactNode
}

/**
 * A titled section on a card of its own, in its accent color, which also styles what's inside it: subheadings,
 * paragraphs (emphasis takes the accent, links keep the text color, their underlines and the abbreviations' higher than
 * the site's (0.09em into the line, scaling with the text) and a little thinner, at 0.095em), and any direct `div`,
 * `ol` or `ul` child, which becomes a two-column grid (of h4 points, or of code blocks side by side) from `md` up; the
 * grid gap spaces those code blocks, so they drop their own top margin. The label, heading and pitch are centered over
 * the card, as the reference heads its cards; the points below read from the left, and running paragraphs span the card.
 */
export default (p: Section) => {
  const { id, audience, title, pitch, children } = p

  return (
    // The card: square corners and no shadow, set apart from the canvas by its color alone, with the canvas showing
    // between the cards. On phones 2 base sizes apart, padded 1 (two thirds of it at the sides), with rows 1 apart; from 64em, as the reference's
    // cards: 3 apart, padded 2, with rows 1.5 apart. Content sits 1.5 below the header, in columns 2 apart.
    <section
      id={id}
      className={`${SECTION_ACCENTS[id]} mx-auto mt-large max-w-page scroll-mt-[calc(var(--header-height)+var(--spacing-medium))] bg-card px-card-side py-medium lg:mt-x-large lg:p-large [&_:is(a,abbr)]:underline-offset-[-0.09em] [&_:is(a,abbr)]:decoration-[length:0.095em] [&_:is(em,strong)]:text-(--accent) [&_h4]:text-small [&_h4]:font-bold [&_h4]:leading-default [&_h4]:text-ink [&>p]:text-small [&>p]:leading-tight [&_li_p]:text-small [&_li_p]:leading-tight [&_h4+p]:mt-1.5 [&_*+p]:mt-4 [&_li>p+p]:mt-2 [&>:is(div,ol,ul)]:mt-neutral [&>:is(div,ol,ul)]:grid [&>:is(div,ol,ul)]:gap-x-large [&>:is(div,ol,ul)]:gap-y-medium lg:[&>:is(div,ol,ul)]:gap-y-neutral [&>:is(div,ol,ul)]:grid-cols-[repeat(auto-fit,minmax(min(100%,24rem),1fr))] [&>:is(div,ol,ul)>*]:min-w-0 [&>div>figure]:mt-0 [&>p]:mt-neutral`}
    >
      <header className="text-center">
        {/* hgroup ties the audience label to the heading as its kicker. */}
        <hgroup>
          {/* The label is set like the points' h4s, as the reference sets the bold links of its hero (`.hero__nav ul li a
              span`): small, bold, the default line height. Its bottom margin, 1.17 of the base size, leaves half again
              as much space between the label (with its underline) and the heading as between the heading and the
              pitch. */}
          {audience ? (
            <p className="mb-[calc(1.17*var(--font-size))] text-small font-bold leading-default [&_a]:font-bold">
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
                for <span className={`${SECTION_UNDERLINES[id]} inline-block`}>{audience}</span>
              </a>
            </p>
          ) : null}
          <h2 className={HEADING}>{title}</h2>
        </hgroup>
        <h3 className={PITCH}>{pitch}</h3>
      </header>
      {children}
    </section>
  )
}

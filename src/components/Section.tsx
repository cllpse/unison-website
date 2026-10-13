import type { ReactNode } from "react"
import { SECTION_ACCENTS, type SectionId } from "../constants/site"

/**
 * The section heading's classes: the accent as a gradient that fades toward the page, from a touch darker to lighter,
 * and from a touch lighter to darker on the dark theme. Also used by the hero.
 */
export const HEADING =
  "w-fit max-w-measure bg-linear-to-br/srgb from-[color-mix(in_oklab,var(--accent)_96%,black)] to-[color-mix(in_oklab,var(--accent)_60%,white)] dark:from-[color-mix(in_oklab,var(--accent)_96%,white)] dark:to-[color-mix(in_oklab,var(--accent)_60%,black)] -mb-[0.1em] bg-clip-text pb-[0.1em] text-heading text-transparent wrap-break-word"

/** The pitch's classes, also used by the hero's subtitle. */
export const PITCH = "mt-4 max-w-measure pb-2 text-[1.625rem] leading-[1.3] font-normal text-(--accent)"

export type Section = {
  id: SectionId
  /** Who the section speaks to, in Capital Case; shown as a "For <Audience>" link to the section above the heading. */
  audience?: string
  /** The promise. */
  title: string
  /** The h3 under the promise: one line on how the library keeps it, set large in the accent color. */
  pitch: string
  children: ReactNode
}

/**
 * A titled section in its accent color, which also styles what's inside it: subheadings, paragraphs (emphasis takes
 * the accent, links keep the text color), and any direct `div`, `ol` or `ul` child, which becomes a two-column grid (of
 * h4 points, or of code blocks side by side) from `md` up; the grid gap spaces those code blocks, so they drop their
 * own top margin. Headings and paragraphs stay at a readable measure while grids and code blocks use the full width.
 */
export default (p: Section) => {
  const { id, audience, title, pitch, children } = p

  return (
    // A full-width band: it steps out over main's padding so the rule above it spans the page, while the centered
    // column, inset by that padding on narrow screens so its side rules stay visible, carries the side rules, which
    // line up into continuous lines from one section to the next. The last section also takes the page's bottom
    // padding, so the side rules run to the end of the page. The top padding is 8px less than the bottom because the
    // first line of text brings its own leading.
    <section
      id={id}
      className={`${SECTION_ACCENTS[id]} group -mx-4 scroll-mt-(--header-height) border-t border-rule px-4`}
    >
      <div
        className={`mx-auto max-w-page border-x border-rule px-6 pt-10 pb-12 group-last:pb-28 max-sm:px-3 max-sm:pt-5 max-sm:pb-6 max-sm:group-last:pb-14 [&_:is(em,strong)]:text-(--accent) [&_h4]:text-xl [&_h4]:font-semibold [&_h4+p]:mt-1 [&_*+p]:mt-4 [&_:is(p,h4)]:font-paragraph [&>:is(div,ol,ul)]:mt-8 [&>:is(div,ol,ul)]:grid [&>:is(div,ol,ul)]:gap-x-10 [&>:is(div,ol,ul)]:gap-y-8 [&>:is(div,ol,ul)]:grid-cols-[repeat(auto-fit,minmax(min(100%,24rem),1fr))] [&>:is(div,ol,ul)>*]:min-w-0 [&>div>figure]:mt-0 [&>p]:max-w-measure`}
      >
        {/* hgroup ties the audience label to the heading as its kicker. */}
        <hgroup>
          {audience ? (
            <p className="mb-3 text-xl font-semibold">
              {/* Like GitHub's heading anchors: a link icon (Octicons, MIT) hangs in the padding on hover. */}
              <a href={`#${id}`} className="group/anchor relative text-(--accent)">
                <svg
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                  className="absolute top-1/2 right-full mr-0.75 size-[0.875em] -translate-y-1/2 fill-current opacity-0 transition-opacity duration-58 ease-in group-hover/anchor:opacity-100 motion-reduce:transition-none"
                >
                  <path d="m7.775 3.275 1.25-1.25a3.5 3.5 0 1 1 4.95 4.95l-2.5 2.5a3.5 3.5 0 0 1-4.95 0 .751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018 1.998 1.998 0 0 0 2.83 0l2.5-2.5a2.002 2.002 0 0 0-2.83-2.83l-1.25 1.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042Zm-4.69 9.64a1.998 1.998 0 0 0 2.83 0l1.25-1.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042l-1.25 1.25a3.5 3.5 0 1 1-4.95-4.95l2.5-2.5a3.5 3.5 0 0 1 4.95 0 .751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018 1.998 1.998 0 0 0-2.83 0l-2.5 2.5a1.998 1.998 0 0 0 0 2.83Z" />
                </svg>
                For {audience}
              </a>
            </p>
          ) : null}
          {/* At line-height 1, descenders reach below the box, where bg-clip-text wouldn't paint; the bottom padding
            covers them, and the matching negative margin keeps the layout unchanged. */}
          <h2 className={HEADING}>{title}</h2>
        </hgroup>
        <h3 className={PITCH}>{pitch}</h3>
        {children}
      </div>
    </section>
  )
}

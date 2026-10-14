import type { ReactNode } from "react"
import { SECTION_ACCENTS, SECTION_UNDERLINES, type SectionId } from "../constants/site"

/**
 * The section heading's classes: the accent as a gradient that fades toward the page, from a touch darker to lighter,
 * and from a touch lighter to darker on the dark theme. Also used by the hero.
 */
export const HEADING =
  "w-fit max-w-measure bg-linear-to-br/srgb from-[color-mix(in_oklab,var(--accent)_96%,black)] to-[color-mix(in_oklab,var(--accent)_60%,white)] dark:from-[color-mix(in_oklab,var(--accent)_96%,white)] dark:to-[color-mix(in_oklab,var(--accent)_60%,black)] -mb-[0.1em] bg-clip-text pb-[0.1em] text-heading text-transparent wrap-break-word"

/**
 * The pitch's classes, also used by the hero's subtitle; each sets its own size, line height and tracking (the section
 * pitch 0.66 of its heading, 26px on phones and 39px wider, at 1.3 less 2px, tracked in). Both widen the word spaces
 * a touch, by 0.075em on Inter's 0.28125em.
 */
export const PITCH = "mt-4 max-w-measure pb-2 font-normal text-(--accent) [word-spacing:0.075em]"

export type Section = {
  id: SectionId
  /** Who the section speaks to, in Capital Case; shown as a "for <Audience>" link to the section above the heading. */
  audience?: string
  /** The promise; a node, so it can carry inline markup such as a <sub>. */
  title: ReactNode
  /** The h3 under the promise: one line on how the library keeps it, set large in the accent color. */
  pitch: ReactNode
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
              {/* Like GitHub's heading anchors: a link icon (Font Awesome Free, CC BY 4.0) hangs in the padding on
                  hover. Only the audience is underlined, not "For"; it's an inline block, like the nav's links (flex
                  items), so the drawn underlines sit at the same distance below the text in both. */}
              <a
                href={`#${id}`}
                className="group/anchor relative text-(--accent) no-underline hover:[--underline:transparent]"
              >
                <svg
                  viewBox="0 0 640 512"
                  aria-hidden="true"
                  className="absolute top-1/2 right-full mr-0.75 h-[0.7em] w-[0.875em] -translate-y-1/2 fill-current opacity-0 transition-opacity duration-116 ease-out group-hover/anchor:opacity-100 motion-reduce:transition-none"
                >
                  <path d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0l112.3-112.3zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5l112.2-112.3c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z" />
                </svg>
                for <span className={`${SECTION_UNDERLINES[id]} inline-block`}>{audience}</span>
              </a>
            </p>
          ) : null}
          {/* At line-height 1, descenders reach below the box, where bg-clip-text wouldn't paint; the bottom padding
            covers them, and the matching negative margin keeps the layout unchanged. Sized at 0.85 of the hero title
            at each width (39px on phones, 59.5px wider); both sizes sit behind a breakpoint so they win over the
            heading size HEADING sets. */}
          <h2
            className={`${HEADING} max-sm:text-[length:calc(var(--text-heading)*0.85)] sm:text-[length:calc(var(--text-display)*0.85)]`}
          >
            {title}
          </h2>
        </hgroup>
        <h3
          className={`${PITCH} text-[length:calc(var(--text-heading)*0.85*0.66)] leading-[calc(1.3em_-_2px)] tracking-[-0.03em] sm:text-[length:calc(var(--text-display)*0.85*0.66)]`}
        >
          {pitch}
        </h3>
        {children}
      </div>
    </section>
  )
}

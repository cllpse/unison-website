import { highlight } from "../utilities/highlight"

export type CodeBlock = {
  code: string
  caption?: string
  lang?: "tsx" | "diff"
  /** Text to mark with an error squiggle (its first occurrence). */
  error?: string
}

export default async (p: CodeBlock) => {
  const { code, caption, lang, error } = p

  return (
    // The figure sets the code size (text-code: 0.9 of the body text, capped at the body text's largest size on
    // phones), which the caption and the code share. The block stays inside the card's padding at every width.
    <figure className="mt-6 min-w-0 text-code">
      {caption ? (
        <figcaption className="mb-2 px-1 font-mono leading-default font-light [--tracking:normal] text-muted">
          {caption}
        </figcaption>
      ) : null}
      {/* The box is the reference's code box (the one under "Quick Start" on the reference): the column's full
          width, square, shaded as the hero's plugin window is, the shade at 3% (black, white on the dark theme), inside
          its 1px line (black at 7.5%, at 45% on the dark theme), without its copy button, in its font (Martian Mono,
          light). Inside, the code is padded 1.05em on every side. Where the code scrolls, the scrollbars show on hover
          (scrollbar-code), and each track (12px, --scrollbar-track) takes its width out of the padding on its side, so
          the code stays 1.05em from every edge, scrollbar or not; a scroll-state container query tells, and browsers
          without one keep the full padding. The site's token colors replace Shiki's inline background (hence the
          !important), and on the dark theme the token colors switch to the dark ones Shiki leaves in --shiki-dark.
          Long samples stop at 60% of the screen's height (50% on desktops, where it's taller) and scroll, but never
          below 416px, so short samples don't scroll on short screens. svh, the height with the mobile browser bars
          shown, holds still as those bars come and go, where dvh would resize the block mid-scroll. Scrolling that
          reaches a block's end stays in the block instead of carrying on to the page (overscroll-behavior: contain),
          but only on an axis it actually scrolls, which ContainOverscroll marks. */}
      <div className="code-colors relative border border-black/7.5 bg-shade/3 dark:border-black/45">
        <div
          data-code-block
          className="*:max-h-[max(60svh,26rem)] lg:*:max-h-[max(50svh,26rem)] *:overflow-x-auto *:overflow-y-auto *:data-scroll-x:overscroll-x-contain *:data-scroll-y:overscroll-y-contain *:[container-type:scroll-state] *:scrollbar-code *:bg-transparent! *:font-mono *:leading-default *:text-thin-white dark:*:text-thin-black [&_code]:block [&_code]:w-fit [&_code]:min-w-full [&_code]:p-[1.05em] [@container_scroll-state(scrollable:x)]:[&_code]:pb-[calc(1.05em-var(--scrollbar-track))] [@container_scroll-state(scrollable:y)]:[&_code]:pr-[calc(1.05em-var(--scrollbar-track))] [&_[style*=italic]]:[-webkit-text-stroke:0] dark:[&_span]:text-(--shiki-dark)!"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: Shiki output, built from our own constant snippets
          dangerouslySetInnerHTML={{ __html: await highlight(code, lang, error) }}
        />
      </div>
    </figure>
  )
}

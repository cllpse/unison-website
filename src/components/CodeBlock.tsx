import { highlight } from "../utilities/highlight"

export type CodeBlock = {
  code: string
  caption?: string
  lang?: "tsx" | "diff"
  /** Text to mark with an error squiggle (its first occurrence). */
  error?: string
  /** Spans its column on desktops too, instead of narrowing to fit its longest line. */
  wide?: boolean
}

export default async (p: CodeBlock) => {
  const { code, caption, lang, error, wide } = p
  const width = wide ? "" : "lg:w-fit lg:min-w-[94%]"

  return (
    <figure className="mt-6 min-w-0">
      {caption ? (
        <figcaption className="mb-2 px-1 font-mono text-code text-muted text-thin-white dark:text-thin-black">
          {caption}
        </figcaption>
      ) : null}
      {/* The wrapper styles Shiki's <pre>: GitHub's token colors on a solid tint, pure black at 3% (off-white on the
          dark theme), with no border and the standard 4px rounded corners. That tint is a pseudo-element behind the
          code; the wrapper shrinks to the code on desktops so the tint fits it. Shiki's inline background color is
          replaced (hence the !important), the thinning stroke takes the page's color, and on the dark theme the token
          colors switch to the dark ones Shiki leaves in --shiki-dark. On desktops each block is only as wide as its longest
          line, but never under 94% of its column (on smaller screens, and for wide blocks, it spans the column), and
          never wider than the column; beyond that the code scrolls inside it, so long lines never widen the page on a
          phone. Where it does scroll, the scrollbar track takes the place of most of the bottom padding, so code sits
          just above the thumb; a scroll-state container query tells, and browsers without one keep the padding. The 2px
          that stays holds the last line's glyphs, which reach a pixel past the line and would make the block scroll
          vertically too. Long samples stop at 60% of the screen's height (50% on desktops, where it's taller) and
          scroll, so one never fills the screen, but the cap never drops below 416px, so short samples don't scroll on
          short screens. svh, the height with the mobile browser bars shown, holds still as those bars come and go,
          where dvh would resize the block mid-scroll. Scrolling that reaches a block's end stays in the block instead
          of carrying on to the page (overscroll-behavior: contain), but only on an axis it actually scrolls, which
          ContainOverscroll marks. Italic runs skip the thinning stroke to keep their full weight. */}
      <div
        data-code-block
        className={`code-colors max-w-full ${width} *:max-w-full *:max-h-[max(60svh,26rem)] lg:*:max-h-[max(50svh,26rem)] *:overflow-x-auto *:overflow-y-auto *:data-scroll-x:overscroll-x-contain *:data-scroll-y:overscroll-y-contain *:[container-type:scroll-state] *:scrollbar-code relative isolate before:absolute before:inset-0 before:-z-10 before:rounded before:bg-[rgb(0_0_0/3%)] dark:before:bg-[rgb(237_237_237/3%)] *:bg-transparent! [&_code]:px-2 [&_code]:py-1.5 [&_code]:block [&_code]:w-fit [&_code]:min-w-full [@container_scroll-state(scrollable:x)]:[&_code]:pb-0.5 *:font-mono *:text-code *:text-thin-white dark:*:text-thin-black [&_[style*=italic]]:[-webkit-text-stroke:0] dark:[&_span]:text-(--shiki-dark)!`}
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Shiki output, built from our own constant snippets
        dangerouslySetInnerHTML={{ __html: await highlight(code, lang, error) }}
      />
    </figure>
  )
}

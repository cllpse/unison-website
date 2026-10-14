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
    <figure className="mt-6 min-w-0">
      {caption ? (
        <figcaption className="mb-2 font-mono text-label text-muted text-thin-white dark:text-thin-black">
          {caption}
        </figcaption>
      ) : null}
      {/* The wrapper styles Shiki's <pre>: GitHub's token colors on the site's own surface (its inline background is
          overridden), switched on the dark theme to the dark colors Shiki leaves in --shiki-dark. Code scrolls inside
          it, so long lines never widen the page on a phone. Where it does scroll, the scrollbar track takes the place
          of the bottom padding, so code sits right above the thumb; a scroll-state container query tells, and browsers
          without one keep the padding. Long samples stop at 60% of the screen's height (50% on desktops, where it's
          taller) and scroll too, so one never fills the screen; svh, the height with the mobile browser bars shown,
          holds still as those bars come and go, where dvh would resize the block mid-scroll. Scrolling that reaches a
          block's end stays in the block instead of carrying on to the page (overscroll-behavior: contain). Italic runs
          skip the thinning stroke to keep their full weight. */}
      <div
        className="code-colors *:max-h-[60svh] lg:*:max-h-[50svh] *:overflow-x-auto *:overflow-y-auto *:overscroll-contain *:[container-type:scroll-state] *:scrollbar-code *:rounded-2xl *:border *:border-gray-edge *:bg-gray! [&_code]:block [&_code]:w-fit [&_code]:min-w-full [&_code]:p-4 [@container_scroll-state(scrollable:x)]:[&_code]:pb-0 *:font-mono *:text-code *:text-thin-gray *:[corner-shape:squircle] [&_[style*=italic]]:[-webkit-text-stroke:0] dark:[&_span]:text-(--shiki-dark)!"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Shiki output, built from our own constant snippets
        dangerouslySetInnerHTML={{ __html: await highlight(code, lang, error) }}
      />
    </figure>
  )
}

import { highlight } from "../utilities/highlight"

export type CodePopover = {
  /** The popover's id, which the button that opens it names in its popoverTarget. */
  id: string
  code: string
}

/**
 * A code sample as a floating card of its own, as the TL;DR card floats (Section's `popover`): centered over the page,
 * dimmed behind it, a small step in from the view's sides, with rounded corners and the cards' shadow, fading in and
 * out with its backdrop on the site's 116ms (popover-card, globals.css). The card is the code block itself, set as the
 * sections' samples are (CodeBlock: their size, colors, shade and 1.05em padding, scrolling within itself if it's
 * taller or wider than the view) but without their border or a card around it. The close cross sits in its top right
 * corner. Escape, a tap outside or the cross closes it; it's an auto popover, so the browser handles all three. The
 * hero opens it on phones, where its plugin window is too narrow to show the sample whole.
 */
export default async (p: CodePopover) => {
  const { id, code } = p

  return (
    <div
      id={id}
      popover="auto"
      className="popover-card code-colors fixed inset-0 m-auto h-fit w-[calc(100%-2*var(--spacing-small))] max-w-page overflow-hidden rounded-sm border-0 bg-card p-0 text-code-block text-ink shadow-card"
    >
      {/* The shade over the card's color, as the sections' code blocks have it. */}
      <div
        data-code-block
        className="bg-shade/3 *:max-h-[calc(100svh-2*var(--spacing-small))] *:overflow-x-auto *:overflow-y-auto *:overscroll-contain *:[container-type:scroll-state] *:scrollbar-code *:bg-transparent! *:font-mono *:leading-default *:text-thin-white dark:*:text-thin-black [&_code]:block [&_code]:w-fit [&_code]:min-w-full [&_code]:p-[1.05em] [@container_scroll-state(scrollable:x)]:[&_code]:pb-[calc(1.05em-var(--scrollbar-track))] [@container_scroll-state(scrollable:y)]:[&_code]:pr-[calc(1.05em-var(--scrollbar-track))] [&_[style*=italic]]:[-webkit-text-stroke:0] dark:[&_span]:text-(--shiki-dark)!"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Shiki output, built from our own constant snippet
        dangerouslySetInnerHTML={{ __html: await highlight(code) }}
      />
      {/* The close cross, as on the TL;DR card: drawn like the proof links' arrow, in the ink, at the body text's size
          (text-small) in the middle of a square twice that size, inset from the top right corner by three quarters
          of the body text's size. */}
      <button
        type="button"
        popoverTarget={id}
        popoverTargetAction="hide"
        aria-label="Close"
        className="absolute top-[calc(var(--text-small)*0.75)] right-[calc(var(--text-small)*0.75)] flex size-[calc(var(--text-small)*2)] cursor-pointer items-center justify-center text-small text-ink transition-opacity duration-116 ease-out hover:opacity-60 motion-reduce:transition-none"
      >
        <svg viewBox="0 0 12 12" aria-hidden="true" className="block size-[1em] fill-none stroke-current">
          <path d="M2.5 2.5L9.5 9.5M9.5 2.5L2.5 9.5" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  )
}

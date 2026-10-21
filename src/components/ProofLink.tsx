import type { ReactNode } from "react"

export type ProofLink = {
  /** Which way the badge leans; counter-clockwise unless set, so a section can lean the other way for variety. */
  tilt?: "counter-clockwise" | "clockwise"
  children: ReactNode
}

/** A small arrow pointing down the page, toward the proof, drawn in the link's color. */
const Arrow = () => (
  <svg
    viewBox="0 0 12 12"
    aria-hidden="true"
    className="ml-[0.25em] inline-block size-[0.7em] fill-none stroke-current align-[-0.05em]"
  >
    <path d="M6 1.5V10M2.5 6.5L6 10L9.5 6.5" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

/**
 * A link down to the proof section (#proof), set apart from the plain links around it: semibold black text on a solid
 * yellow, slightly rounded, with an arrow down the page, on both themes, tilted three quarters of a degree like a
 * sticker (counter-clockwise, or clockwise with `tilt`). It's an inline block (an inline element can't rotate) that
 * never wraps, with its vertical padding taken back by negative margins, so it doesn't make its line any taller. The yellow softens a step under the pointer.
 */
export default (p: ProofLink) => {
  const { tilt = "counter-clockwise", children } = p

  return (
    <a
      href="#proof"
      className={`${tilt === "clockwise" ? "rotate-[0.75deg]" : "-rotate-[0.75deg]"} inline-block rounded-sm bg-yellow whitespace-nowrap px-[0.35em] -my-[0.05em] py-[0.05em] font-semibold text-black no-underline transition-colors duration-116 ease-out hover:bg-yellow/80 motion-reduce:transition-none`}
    >
      {children}
      <Arrow />
    </a>
  )
}

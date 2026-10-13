import type { ReactNode } from "react"

export type Disclaimer = {
  /** A short lead-in, set bold and spaced from the body instead of punctuated. */
  label: string
  children: ReactNode
}

/** A small boxed caveat, centered at the end of a section: tinted red-orange (15%), with a stronger outline. */
export default (p: Disclaimer) => {
  const { label, children } = p

  return (
    <aside className="mx-auto mt-12 w-fit rounded-2xl border border-vermilion/40 bg-vermilion/15 px-4 py-3 text-base [corner-shape:squircle]">
      <p>
        {/* In the text color: important, over Section's accent for emphasis. */}
        <strong className="mr-4 text-inherit!">{label}</strong>
        {children}
      </p>
    </aside>
  )
}

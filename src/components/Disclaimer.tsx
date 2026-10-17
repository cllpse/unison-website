import type { ReactNode } from "react"

export type Disclaimer = { children: ReactNode }

/** A small boxed caveat, centered at the end of a section, on the code blocks' tint, set like a paragraph. */
export default (p: Disclaimer) => {
  const { children } = p

  return (
    <aside className="mx-auto mt-12 w-fit rounded-md bg-[rgb(0_0_0/3%)] px-4 py-3 font-paragraph dark:bg-[rgb(237_237_237/3%)]">
      <p>{children}</p>
    </aside>
  )
}

import type { ReactNode } from "react"

export type Section = {
  id?: string
  eyebrow?: string
  title?: ReactNode
  lead?: ReactNode
  children?: ReactNode
}

/** A full-width band framed by hairlines, with a mono eyebrow, as on tailwindcss.com. */
export default (p: Section) => {
  const { id, eyebrow, title, lead, children } = p
  const hasHeading = Boolean(eyebrow || title || lead)

  return (
    <section id={id} className="scroll-mt-14 rule-t">
      <div className="mx-auto max-w-7xl rule-x">
        {hasHeading ? (
          <div className="rule-b px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
            {eyebrow ? (
              <p className="font-mono text-xs font-medium tracking-widest text-brand-700 uppercase dark:text-brand-400">
                {eyebrow}
              </p>
            ) : null}
            {title ? (
              <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-balance sm:text-5xl">{title}</h2>
            ) : null}
            {lead ? (
              <p className="mt-5 max-w-2xl text-base/7 text-pretty text-gray-600 sm:text-lg/8 dark:text-gray-400">
                {lead}
              </p>
            ) : null}
          </div>
        ) : null}
        {children}
      </div>
    </section>
  )
}

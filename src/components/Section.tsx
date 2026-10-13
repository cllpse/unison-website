import type { ReactNode } from "react"

export type Section = {
  id?: string
  title: string
  children: ReactNode
}

export default (p: Section) => {
  const { id, title, children } = p

  return (
    <section id={id} className="mt-16 scroll-mt-6 sm:mt-24">
      <h2 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">{title}</h2>
      {children}
    </section>
  )
}

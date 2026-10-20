"use client"

import { useEffect, useRef, useState } from "react"
import { NAV_LINKS, SECTION_ACCENTS, SECTION_UNDERLINES, type SectionId } from "../constants/site"
import AgentsLabel from "./AgentsLabel"

/**
 * The section links in the sticky header: plain until hovered, with a squiggle under the section you're reading. They
 * stay in the header at every width, wrapping onto more rows on narrow screens, a quarter of a line further apart than
 * the text's own line height.
 */
export default () => {
  const ref = useRef<HTMLElement>(null)
  const [current, setCurrent] = useState<SectionId>()

  // The header's shadow fades in once the page is scrolled away from the top (Header.tsx).
  useEffect(() => {
    const header = ref.current?.closest("header")
    if (!header) return

    const mark = () => header.toggleAttribute("data-scrolled", window.scrollY > 0)
    mark()
    window.addEventListener("scroll", mark, { passive: true })

    return () => window.removeEventListener("scroll", mark)
  }, [])

  useEffect(() => {
    const header = ref.current?.closest("header")
    if (!header) return

    const ids = NAV_LINKS.map((link) => link.id)
    const crossing = new Set<SectionId>()
    let atBottom = false
    let observers: IntersectionObserver[] = []

    // The current section is the last one crossing the reading line, or the last section once it's fully in view (at
    // the bottom of the page it may never reach that line).
    const update = () => setCurrent(atBottom ? ids.at(-1) : ids.findLast((id) => crossing.has(id)))

    // The observers' margins depend on the header's height (it grows when the nav wraps on phones) and the viewport,
    // so they're rebuilt whenever either changes.
    const observe = () => {
      for (const observer of observers) observer.disconnect()

      const height = header.offsetHeight
      document.documentElement.style.setProperty("--header-height", `${height}px`)

      // The reading line: 1px, a fifth of the way down the view below the header, near where the eye rests, so the
      // section filling most of the screen counts as current, not one that merely reaches up under the header. A jump
      // to a section puts its top under the header, well above the line, so the jump's target is current too.
      const lineTop = height + Math.round((window.innerHeight - height) / 5)
      const line = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            const id = entry.target.id as SectionId
            if (entry.isIntersecting) crossing.add(id)
            else crossing.delete(id)
          }
          update()
        },
        { rootMargin: `-${lineTop}px 0px -${window.innerHeight - lineTop - 1}px 0px` },
      )

      // Fully in view, give or take: fractional layout keeps the ratio just under 1, so a threshold of exactly 1 would
      // never fire.
      const bottom = new IntersectionObserver(
        ([entry]) => {
          atBottom = entry.intersectionRatio > 0.98
          update()
        },
        { threshold: [0.98, 0.99, 1] },
      )

      for (const id of ids) {
        const section = document.getElementById(id)
        if (section) line.observe(section)
      }
      const last = document.getElementById(ids.at(-1) ?? "")
      if (last) bottom.observe(last)

      observers = [line, bottom]
    }

    observe()
    const resize = new ResizeObserver(observe)
    resize.observe(header)
    window.addEventListener("resize", observe)

    return () => {
      resize.disconnect()
      window.removeEventListener("resize", observe)
      for (const observer of observers) observer.disconnect()
    }
  }, [])

  const label = (id: SectionId, text: string) => (id === "agents" ? <AgentsLabel withFrame /> : text)

  return (
    <nav
      ref={ref}
      className="flex flex-wrap gap-x-small gap-y-[0.375em] text-small font-bold leading-default [&_a]:font-bold"
    >
      <p>
        {/* Two eyes looking right, toward the links: outlines and pupils in the text color, whites in the page color. */}
        <svg
          viewBox="0 0 20 16"
          aria-hidden="true"
          className="mr-1.5 inline-block size-[1.05em] fill-white stroke-current align-[-0.155em] dark:fill-black"
        >
          <ellipse cx="5.5" cy="8" rx="4.5" ry="6.5" strokeWidth="1.5" />
          <ellipse cx="14.5" cy="8" rx="4.5" ry="6.5" strokeWidth="1.5" />
          <circle cx="7.3" cy="8.6" r="2.2" className="fill-current stroke-none" />
          <circle cx="16.3" cy="8.6" r="2.2" className="fill-current stroke-none" />
        </svg>
        for…
      </p>
      {NAV_LINKS.map((link) => (
        <a
          key={link.id}
          href={`#${link.id}`}
          aria-current={link.id === current ? "location" : undefined}
          className={`${SECTION_ACCENTS[link.id]} ${SECTION_UNDERLINES[link.id]} group/link text-(--accent) [--underline:transparent] hover:[--underline:var(--accent)] aria-[current=location]:[--underline:var(--accent)]`}
        >
          {label(link.id, link.label)}
        </a>
      ))}
    </nav>
  )
}

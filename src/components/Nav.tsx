"use client"

import { useEffect, useRef, useState } from "react"
import { NAV_LINKS, SECTION_ACCENTS, SECTION_UNDERLINES, type SectionId } from "../constants/site"

/** The section links in the sticky header: plain until hovered, with a squiggle under the section you're reading. */
export default () => {
  const ref = useRef<HTMLElement>(null)
  const [current, setCurrent] = useState<SectionId>()

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

      // The header only cuts gaps for the sections' side rules once the first section has reached it: over the hero
      // there are no rules, and the gaps would show as cutouts. The root runs from the header's bottom up past the top
      // of the page, so "reached" is simply "intersecting", and even a jump straight past it crosses the boundary.
      const rules = new IntersectionObserver(([entry]) => header.toggleAttribute("data-rules", entry.isIntersecting), {
        rootMargin: `${document.documentElement.scrollHeight}px 0px -${window.innerHeight - height}px 0px`,
      })

      for (const id of ids) {
        const section = document.getElementById(id)
        if (section) line.observe(section)
      }
      const first = document.getElementById(ids[0])
      const last = document.getElementById(ids.at(-1) ?? "")
      if (first) rules.observe(first)
      if (last) bottom.observe(last)

      observers = [line, bottom, rules]
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

  return (
    <nav ref={ref} className="flex flex-wrap gap-x-5 gap-y-1 font-paragraph text-xl font-semibold tracking-normal">
      <p>
        {/* Two eyes looking right, toward the links: outlines and pupils in the text color, whites in the page color. */}
        <svg
          viewBox="0 0 20 16"
          aria-hidden="true"
          className="mr-1.5 inline-block size-[1em] fill-white stroke-current translate-y-px align-[-0.125em] dark:fill-black"
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
          className={`${SECTION_ACCENTS[link.id]} ${SECTION_UNDERLINES[link.id]} text-(--accent) [--underline:transparent] hover:[--underline:var(--accent)] aria-[current=location]:[--underline:var(--accent)]`}
        >
          {link.label}
        </a>
      ))}
    </nav>
  )
}

"use client"

import { useEffect, useRef, useState } from "react"
import { NAV_LINKS, SECTION_ACCENTS, SECTION_UNDERLINES, type SectionId } from "../constants/site"
import AgentsLabel from "./AgentsLabel"

/**
 * The section links in the sticky header: plain until hovered, with a squiggle under the section you're reading. They
 * stay in the header at every width, wrapping onto more rows on narrow screens, a quarter of a line further apart than
 * the text's own line height, and five eighths of a base size apart side by side.
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

    // The current section is the last one whose top has passed the reading line, a fifth of the way down the view
    // below the header, so it stays current from its top to the next section's, through the canvas between the cards
    // and the fine print after the last one. The last section also counts once it's fully in view, since at the bottom
    // of the page it may never reach that line. A jump to a section puts its top under the header, above the line, so
    // the jump's target is current too.
    const update = () => {
      const height = header.offsetHeight
      document.documentElement.style.setProperty("--header-height", `${height}px`)

      const line = height + Math.round((window.innerHeight - height) / 5)
      const last = document.getElementById(ids.at(-1) ?? "")
      const atBottom = last ? last.getBoundingClientRect().bottom <= window.innerHeight + 1 : false

      setCurrent(
        atBottom
          ? ids.at(-1)
          : ids.findLast((id) => (document.getElementById(id)?.getBoundingClientRect().top ?? Infinity) <= line),
      )
    }

    let frame = 0
    const schedule = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
    // The header grows when the nav wraps on phones, which moves the line.
    const resize = new ResizeObserver(schedule)
    resize.observe(header)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
      resize.disconnect()
    }
  }, [])

  const label = (id: SectionId, text: string) => (id === "agents" ? <AgentsLabel withFrame /> : text)

  return (
    <nav
      ref={ref}
      className="flex flex-wrap gap-x-[calc(var(--spacing-small)*1.25)] gap-y-[0.375em] text-small font-bold leading-default [&_a]:font-bold"
    >
      <p>For…</p>
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

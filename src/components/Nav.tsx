"use client"

import { useEffect, useRef, useState } from "react"
import { NAV_LINKS, SECTION_ACCENTS, SECTION_UNDERLINES, type SectionId } from "../constants/site"
import AgentsLabel from "./AgentsLabel"

/**
 * The section links in the sticky header: plain until hovered, with a squiggle under the section you're reading. Below
 * 64em they fold into the reference's menu: a toggle (two lines that cross into an X) opens the links as a full-screen
 * list under the header, each on its own row, in the reference's menu type (large, semibold, x-tight), with the same
 * flourishes. The open menu holds the page still, and closes on a link, on Escape, or when the window grows past 64em.
 */
export default () => {
  const ref = useRef<HTMLElement>(null)
  const [current, setCurrent] = useState<SectionId>()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", open)
    if (!open) return

    const close = () => setOpen(false)
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && close()
    const wide = window.matchMedia("(min-width: 64em)")
    window.addEventListener("keydown", closeOnEscape)
    wide.addEventListener("change", close)

    return () => {
      window.removeEventListener("keydown", closeOnEscape)
      wide.removeEventListener("change", close)
    }
  }, [open])

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
    <>
      <nav
        ref={ref}
        className="flex flex-wrap gap-x-small text-small font-bold leading-default max-lg:hidden [&_a]:font-bold"
      >
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
            className={`${SECTION_ACCENTS[link.id]} ${SECTION_UNDERLINES[link.id]} group/link text-(--accent) [--underline:transparent] hover:[--underline:var(--accent)] aria-[current=location]:[--underline:var(--accent)]`}
          >
            {label(link.id, link.label)}
          </a>
        ))}
      </nav>
      {/* the reference's menu toggle: 3.6em of its xx-small size, a circle that tints on hover, two 1.5px lines 0.5em
          apart that turn into an X while the menu is open, pulled 0.8em into the page's side padding. */}
      <button
        type="button"
        data-menu-toggle
        data-open={open || undefined}
        aria-expanded={open}
        aria-controls="menu"
        onClick={() => setOpen(!open)}
        className="relative -mr-[0.8em] grid size-[3.6em] cursor-pointer place-items-center rounded-full text-xx-small text-ink transition-colors duration-150 before:col-start-1 before:row-start-1 before:h-[1.5px] before:w-[1.25em] before:-translate-y-[0.25em] before:bg-current before:transition-transform before:duration-150 after:col-start-1 after:row-start-1 after:h-[1.5px] after:w-[1.25em] after:translate-y-[0.25em] after:bg-current after:transition-transform after:duration-150 hover:bg-canvas data-open:before:translate-y-0 data-open:before:rotate-45 data-open:after:translate-y-0 data-open:after:-rotate-45 lg:hidden motion-reduce:transition-none"
      >
        <span className="sr-only">Menu</span>
      </button>
      {/* The menu: the whole screen under the header, white (the canvas on the dark theme), its list 4.5 base sizes
          down and inset 1 at the sides, rows split by a hairline in the ink at 10%, fading in and out as the reference's
          does. */}
      <nav
        id="menu"
        data-menu
        data-open={open || undefined}
        aria-label="Sections"
        className="invisible fixed inset-0 -z-10 flex flex-col overflow-y-auto bg-white px-small pt-[calc(var(--spacing-x-large)+var(--spacing-neutral))] pb-medium opacity-0 transition-[opacity,visibility] duration-150 data-open:visible data-open:opacity-100 lg:hidden motion-reduce:transition-none dark:bg-canvas"
      >
        <ul className="grid [&>li+li]:border-ink/10 [&>li+li]:border-t">
          {NAV_LINKS.map((link) => (
            <li key={link.id} className="first:[&>a]:-mt-[0.9375em] last:[&>a]:-mb-[0.925em]">
              <a
                href={`#${link.id}`}
                aria-current={link.id === current ? "location" : undefined}
                onClick={() => setOpen(false)}
                className={`${SECTION_ACCENTS[link.id]} group/link block py-[0.75em] text-large font-semibold leading-x-tight text-(--accent) no-underline`}
              >
                <span
                  className={`${SECTION_UNDERLINES[link.id]} inline-block [--underline:transparent] group-hover/link:[--underline:var(--accent)] group-aria-[current=location]/link:[--underline:var(--accent)]`}
                >
                  {label(link.id, link.label)}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}

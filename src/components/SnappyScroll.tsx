"use client"

import { useEffect } from "react"

/** How long an in-page jump takes. CSS `scroll-behavior: smooth` can't be timed, and browsers make it slow. */
const DURATION_MS = 200

const easeOutCubic = (t: number) => 1 - (1 - t) ** 3

/** Animates clicks on in-page links (`href="#..."`) quickly instead of using the browser's slow smooth scroll. */
export default () => {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)")

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) return

      const link = (event.target as Element).closest<HTMLAnchorElement>('a[href^="#"]')
      const hash = link?.getAttribute("href")
      if (!hash) return

      const target = hash === "#" ? document.body : document.getElementById(hash.slice(1))
      if (!target) return

      event.preventDefault()
      history.pushState(null, "", hash)

      // Respect the target's scroll-margin-top, as a native anchor jump would.
      const margin = Number.parseFloat(getComputedStyle(target).scrollMarginTop) || 0
      const end = target.getBoundingClientRect().top + window.scrollY - margin

      if (reduceMotion.matches) {
        window.scrollTo(0, end)
        return
      }

      const start = window.scrollY
      const startTime = performance.now()

      const step = (now: number) => {
        const progress = Math.min((now - startTime) / DURATION_MS, 1)
        window.scrollTo(0, start + (end - start) * easeOutCubic(progress))
        if (progress < 1) requestAnimationFrame(step)
      }

      requestAnimationFrame(step)
    }

    document.addEventListener("click", onClick)

    return () => document.removeEventListener("click", onClick)
  }, [])

  return null
}

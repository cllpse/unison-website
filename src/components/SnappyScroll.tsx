"use client"

import { useEffect } from "react"

/**
 * How long an in-page jump takes: twice the site's 116ms fades (links, anchor icons), since it covers a whole page
 * instead of a color. CSS `scroll-behavior: smooth` can't be timed, and browsers make it slow.
 */
const DURATION_MS = 116 * 2

/**
 * Tailwind's `ease-out`, cubic-bezier(0, 0, 0.2, 1), the curve every transition on the site uses, so the jump moves
 * like the fades. The curve gives progress for a point along it, not for a time, so `t` is found by bisection first.
 *
 * @example
 * easeOut(0.5) // => about 0.84
 */
const easeOut = (time: number) => {
  // x(t) and y(t) for control points (0, 0) and (0.2, 1); the first control point's terms are zero.
  const x = (t: number) => 3 * (1 - t) * t ** 2 * 0.2 + t ** 3
  const y = (t: number) => 3 * (1 - t) * t ** 2 + t ** 3

  let low = 0
  let high = 1
  for (let i = 0; i < 20; i++) {
    const mid = (low + high) / 2
    if (x(mid) < time) low = mid
    else high = mid
  }

  return y((low + high) / 2)
}

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
        window.scrollTo(0, start + (end - start) * easeOut(progress))
        if (progress < 1) requestAnimationFrame(step)
      }

      requestAnimationFrame(step)
    }

    document.addEventListener("click", onClick)

    return () => document.removeEventListener("click", onClick)
  }, [])

  return null
}

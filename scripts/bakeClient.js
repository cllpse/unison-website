// The baked page's only script, in place of React: what Nav.tsx and SnappyScroll.tsx do on the live site, in plain
// JavaScript. Keep the two in step.
;(() => {
  const header = document.querySelector("header")
  const links = [...document.querySelectorAll('nav a[href^="#"]')]
  const ids = links.map((link) => link.getAttribute("href").slice(1))
  const crossing = new Set()
  let atBottom = false
  let observers = []

  // The current section: the last one crossing the reading line, or the last section once it's fully in view.
  const update = () => {
    const current = atBottom ? ids.at(-1) : ids.findLast((id) => crossing.has(id))
    for (const link of links) {
      if (link.getAttribute("href").slice(1) === current) link.setAttribute("aria-current", "location")
      else link.removeAttribute("aria-current")
    }
  }

  const observe = () => {
    for (const observer of observers) observer.disconnect()

    const height = header.offsetHeight
    document.documentElement.style.setProperty("--header-height", `${height}px`)

    // The reading line: 1px, a fifth of the way down the view below the header.
    const lineTop = height + Math.round((window.innerHeight - height) / 5)
    const line = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) crossing.add(entry.target.id)
          else crossing.delete(entry.target.id)
        }
        update()
      },
      { rootMargin: `-${lineTop}px 0px -${window.innerHeight - lineTop - 1}px 0px` },
    )

    const bottom = new IntersectionObserver(
      ([entry]) => {
        atBottom = entry.intersectionRatio > 0.98
        update()
      },
      { threshold: [0.98, 0.99, 1] },
    )

    // The header cuts gaps for the side rules once the first section has reached it.
    const rules = new IntersectionObserver(([entry]) => header.toggleAttribute("data-rules", entry.isIntersecting), {
      rootMargin: `${document.documentElement.scrollHeight}px 0px -${window.innerHeight - height}px 0px`,
    })

    for (const id of ids) {
      const section = document.getElementById(id)
      if (section) line.observe(section)
    }
    const first = document.getElementById(ids[0])
    const last = document.getElementById(ids.at(-1))
    if (first) rules.observe(first)
    if (last) bottom.observe(last)

    observers = [line, bottom, rules]
  }

  observe()
  new ResizeObserver(observe).observe(header)
  window.addEventListener("resize", observe)

  // In-page jumps: 232ms on Tailwind's ease-out, cubic-bezier(0, 0, 0.2, 1), solved by bisection.
  const DURATION_MS = 232
  const easeOut = (time) => {
    const x = (t) => 3 * (1 - t) * t ** 2 * 0.2 + t ** 3
    const y = (t) => 3 * (1 - t) * t ** 2 + t ** 3
    let low = 0
    let high = 1
    for (let i = 0; i < 20; i++) {
      const mid = (low + high) / 2
      if (x(mid) < time) low = mid
      else high = mid
    }
    return y((low + high) / 2)
  }
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)")

  document.addEventListener("click", (event) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) return

    const hash = event.target.closest('a[href^="#"]')?.getAttribute("href")
    if (!hash) return
    const target = hash === "#" ? document.body : document.getElementById(hash.slice(1))
    if (!target) return

    event.preventDefault()
    history.pushState(null, "", hash)

    const margin = Number.parseFloat(getComputedStyle(target).scrollMarginTop) || 0
    const end = target.getBoundingClientRect().top + window.scrollY - margin
    if (reduceMotion.matches) {
      window.scrollTo(0, end)
      return
    }

    const start = window.scrollY
    const startTime = performance.now()
    const step = (now) => {
      const progress = Math.min((now - startTime) / DURATION_MS, 1)
      window.scrollTo(0, start + (end - start) * easeOut(progress))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  })
})()

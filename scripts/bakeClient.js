// The baked page's only script, in place of React: what Nav.tsx (its current section and its menu) and
// ContainOverscroll.tsx do on the live site, in plain JavaScript. Keep them in step.
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

    for (const id of ids) {
      const section = document.getElementById(id)
      if (section) line.observe(section)
    }
    const last = document.getElementById(ids.at(-1))
    if (last) bottom.observe(last)

    observers = [line, bottom]
  }

  observe()
  new ResizeObserver(observe).observe(header)
  window.addEventListener("resize", observe)

  // The header's shadow fades in once the page is scrolled away from the top.
  const markScrolled = () => header.toggleAttribute("data-scrolled", window.scrollY > 0)
  markScrolled()
  window.addEventListener("scroll", markScrolled, { passive: true })

  // The menu below 64em: the toggle opens and closes it; a link, Escape or a window grown past 64em closes it.
  const toggle = document.querySelector("[data-menu-toggle]")
  const menu = document.querySelector("[data-menu]")
  const setOpen = (open) => {
    toggle.toggleAttribute("data-open", open)
    menu.toggleAttribute("data-open", open)
    toggle.setAttribute("aria-expanded", String(open))
    document.documentElement.classList.toggle("menu-open", open)
  }
  toggle.addEventListener("click", () => setOpen(!menu.hasAttribute("data-open")))
  for (const link of menu.querySelectorAll("a")) link.addEventListener("click", () => setOpen(false))
  window.addEventListener("keydown", (event) => event.key === "Escape" && setOpen(false))
  window.matchMedia("(min-width: 64em)").addEventListener("change", () => setOpen(false))

  // Code blocks contain overscroll only on an axis they actually scroll (ContainOverscroll.tsx).
  const blocks = [...document.querySelectorAll("[data-code-block] > pre")]
  const markScrolling = () => {
    for (const block of blocks) {
      block.toggleAttribute("data-scroll-x", block.scrollWidth > block.clientWidth)
      block.toggleAttribute("data-scroll-y", block.scrollHeight > block.clientHeight)
    }
  }
  markScrolling()
  const blockObserver = new ResizeObserver(markScrolling)
  for (const block of blocks) {
    blockObserver.observe(block)
    const code = block.querySelector("code")
    if (code) blockObserver.observe(code)
  }
})()

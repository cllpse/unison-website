// The baked page's only script, in place of React: what Nav.tsx (its current section and the header's shadow) and
// ContainOverscroll.tsx do on the live site, in plain JavaScript. Keep them in step.
;(() => {
  const header = document.querySelector("header")
  const links = [...document.querySelectorAll('nav a[href^="#"]')]
  const ids = links.map((link) => link.getAttribute("href").slice(1))

  // The current section: the last one whose top has passed the reading line (a fifth of the way down the view below
  // the header), or the last section once it's fully in view, so one stays current through the gaps between cards.
  const update = () => {
    const height = header.offsetHeight
    document.documentElement.style.setProperty("--header-height", `${height}px`)

    const line = height + Math.round((window.innerHeight - height) / 5)
    const last = document.getElementById(ids.at(-1))
    const atBottom = last ? last.getBoundingClientRect().bottom <= window.innerHeight + 1 : false
    const current = atBottom
      ? ids.at(-1)
      : ids.findLast((id) => (document.getElementById(id)?.getBoundingClientRect().top ?? Infinity) <= line)
    for (const link of links) {
      if (link.getAttribute("href").slice(1) === current) link.setAttribute("aria-current", "location")
      else link.removeAttribute("aria-current")
    }
  }

  let frame = 0
  const schedule = () => {
    cancelAnimationFrame(frame)
    frame = requestAnimationFrame(update)
  }

  update()
  window.addEventListener("scroll", schedule, { passive: true })
  window.addEventListener("resize", schedule)
  new ResizeObserver(schedule).observe(header)

  // The header's shadow fades in once the page is scrolled away from the top.
  const markScrolled = () => header.toggleAttribute("data-scrolled", window.scrollY > 0)
  markScrolled()
  window.addEventListener("scroll", markScrolled, { passive: true })

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

  // Scrollbars show while the page or a block scrolls, and for 800ms after (ContainOverscroll.tsx).
  const timers = new Map()
  const showScrollbar = (element) => () => {
    element.setAttribute("data-scrolling", "")
    clearTimeout(timers.get(element))
    timers.set(
      element,
      setTimeout(() => element.removeAttribute("data-scrolling"), 800),
    )
  }
  window.addEventListener("scroll", showScrollbar(document.documentElement), { passive: true })
  for (const block of blocks) block.addEventListener("scroll", showScrollbar(block), { passive: true })
})()

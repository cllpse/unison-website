// The baked page's only script, in place of React: what Nav.tsx (its current section and the header's shadow),
// ContainOverscroll.tsx and TldrCard.tsx do on the live site, in plain JavaScript. Keep them in step.
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
  const blocks = [...document.querySelectorAll("[data-code-block] > pre, [data-scroll-area]")]
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

  // The TL;DR card (TldrCard.tsx): a link in it centers and selects the part of a section it picks out and collapses
  // the card to the top, and a click on the collapsed card opens it again, morphing through a view transition where
  // there is one; past a window's height down the page it shows itself collapsed until its close button puts it away,
  // and the hero's TL;DR button opens a collapsed card rather than closing it.
  const card = document.getElementById("tldr")
  if (card) {
    const openers = [...document.querySelectorAll('[popovertarget="tldr"]:not(#tldr *)')]
    // Each time the card opens or opens up again, its text starts from the top, at once rather than scrolling there.
    const toTop = () => card.querySelector("[data-scroll-area]")?.scrollTo({ top: 0, behavior: "instant" })
    const collapse = (collapsed) => {
      if (card.hasAttribute("data-collapsed") === collapsed) return
      const apply = () => {
        card.toggleAttribute("data-collapsed", collapsed)
        if (!collapsed) toTop()
      }
      const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      if (document.startViewTransition && !still) document.startViewTransition(apply)
      else apply()
    }
    // Once the page is scrolled more than a window's height, the card shows itself collapsed (auto), without its
    // backdrop, and hides again back above that line, unless the reader has opened it. Its close button puts it away
    // for the rest of the visit (dismissed); Escape or a click outside an open card collapses it to the chip again
    // past that line, and closes it above.
    let auto = false
    let dismissed = false
    const past = () => window.scrollY > window.innerHeight
    const onScroll = () => {
      const open = card.matches(":popover-open")
      if (past()) {
        if (open || dismissed) return
        auto = true
        card.setAttribute("data-collapsed", "")
        card.showPopover()
      } else if (open && auto && card.hasAttribute("data-collapsed")) card.hidePopover()
    }
    const close = () => {
      if (!card.hasAttribute("data-collapsed") && past() && !dismissed) {
        auto = true
        collapse(true)
      } else card.hidePopover()
    }

    // The text a link last selected, while it stays selected.
    let picked = ""
    // Takes the page to the part of a section a link picks out (its data-part, or the section itself), centered in
    // the view, smoothly unless motion is reduced, and selects it so it stands out once there: a paragraph whole, a
    // point from its title to its last paragraph, leaving its code samples out. The address names the section.
    const go = (link) => {
      const section = document.getElementById(link.hash.slice(1))
      const part = (link.dataset.part && document.getElementById(link.dataset.part)) || section
      if (!section || !part) return
      const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      part.scrollIntoView({ block: "center", behavior: still ? "instant" : "smooth" })
      history.pushState(null, "", link.hash)
      const range = document.createRange()
      if (part.matches("p")) range.selectNodeContents(part)
      else {
        range.setStartBefore(part.firstElementChild ?? part)
        range.setEndAfter([...part.querySelectorAll(":scope > p")].at(-1) ?? part)
      }
      const selection = window.getSelection()
      selection.removeAllRanges()
      selection.addRange(range)
      // Picked out in the starters' blue rather than the section's color, for as long as it stays selected.
      picked = selection.toString()
      document.documentElement.setAttribute("data-tldr-selection", "")
    }
    const onSelection = () => {
      if (picked && window.getSelection().toString() === picked) return
      picked = ""
      document.documentElement.removeAttribute("data-tldr-selection")
    }
    card.addEventListener("click", (event) => {
      if (event.target.closest('button[aria-label="Close"]')) dismissed = true
      // The collapsed card's close button still closes it; anywhere else on it opens it again.
      if (card.hasAttribute("data-collapsed") && !event.target.closest("button")) {
        event.preventDefault()
        auto = false
        collapse(false)
        return
      }
      const link = event.target.closest('a[href^="#"]')
      if (!link) return
      event.preventDefault()
      collapse(true)
      go(link)
    })
    const onOpener = (event) => {
      if (!card.matches(":popover-open")) return
      event.preventDefault()
      auto = false
      collapse(false)
    }
    for (const opener of openers) opener.addEventListener("click", onOpener)
    document.addEventListener("click", (event) => {
      const open = card.matches(":popover-open") && !card.hasAttribute("data-collapsed")
      if (open && !card.contains(event.target) && !openers.some((opener) => opener.contains(event.target))) close()
    })
    document.addEventListener("selectionchange", onSelection)
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && card.matches(":popover-open")) close()
    })
    // A card closed while collapsed fades out as it is, and opens again whole.
    card.addEventListener("beforetoggle", (event) => {
      if (event.newState !== "open") {
        auto = false
        return
      }
      // Shown by scrolling, it opens collapsed.
      if (auto) return
      card.removeAttribute("data-collapsed")
      // Before the next frame, once it's shown: a hidden area keeps its scroll position and can't be scrolled.
      requestAnimationFrame(toTop)
    })
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
  }
})()

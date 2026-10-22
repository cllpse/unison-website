"use client"

import { useEffect } from "react"

/**
 * Drives the hero's TL;DR card (a manual popover, Section's `popover`): a link in it to a section centers and selects
 * the part of it the link picks out and collapses the card to a small "TL;DR" at the top, with the backdrop gone so the
 * page can be used under it, and a click on the collapsed card opens it again. Past a window's height down the page the
 * card shows itself collapsed, until its close button puts it away. Opening and collapsing morph the card through a
 * view transition where the browser has them (globals.css), and simply switch where it doesn't. The hero's TL;DR opens
 * a collapsed card rather than closing it. scripts/bakeClient.js does the same on the baked page.
 */
export default ({ id }: { id: string }) => {
  useEffect(() => {
    const card = document.getElementById(id)
    if (!card) return
    const openers = [...document.querySelectorAll(`[popovertarget="${id}"]:not(#${id} *)`)]

    // Each time the card opens or opens up again, its text starts from the top, at once rather than scrolling there.
    const toTop = () => card.querySelector("[data-scroll-area]")?.scrollTo({ top: 0, behavior: "instant" })
    const collapse = (collapsed: boolean) => {
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
    const go = (link: HTMLAnchorElement) => {
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
      selection?.removeAllRanges()
      selection?.addRange(range)
      // Picked out in the starters' blue rather than the section's color, for as long as it stays selected.
      picked = selection?.toString() ?? ""
      document.documentElement.setAttribute("data-tldr-selection", "")
    }
    const onSelection = () => {
      if (picked && window.getSelection()?.toString() === picked) return
      picked = ""
      document.documentElement.removeAttribute("data-tldr-selection")
    }

    const onCard = (event: MouseEvent) => {
      if ((event.target as Element).closest('button[aria-label="Close"]')) dismissed = true
      // The collapsed card's close button still closes it; anywhere else on it opens it again.
      if (card.hasAttribute("data-collapsed") && !(event.target as Element).closest("button")) {
        event.preventDefault()
        auto = false
        collapse(false)
        return
      }
      const link = (event.target as Element).closest<HTMLAnchorElement>('a[href^="#"]')
      if (!link) return
      event.preventDefault()
      collapse(true)
      go(link)
    }
    const onOpener = (event: Event) => {
      if (!card.matches(":popover-open")) return
      event.preventDefault()
      auto = false
      collapse(false)
    }
    // The open card's backdrop lets clicks through, so a click outside it is any click on the page.
    const onPage = (event: MouseEvent) => {
      const target = event.target as Node
      const open = card.matches(":popover-open") && !card.hasAttribute("data-collapsed")
      if (open && !card.contains(target) && !openers.some((opener) => opener.contains(target))) close()
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && card.matches(":popover-open")) close()
    }
    // A card closed while collapsed fades out as it is, and opens again whole.
    const onToggle = (event: Event) => {
      if ((event as ToggleEvent).newState !== "open") {
        auto = false
        return
      }
      // Shown by scrolling, it opens collapsed.
      if (auto) return
      card.removeAttribute("data-collapsed")
      // Before the next frame, once it's shown: a hidden area keeps its scroll position and can't be scrolled.
      requestAnimationFrame(toTop)
    }

    card.addEventListener("click", onCard)
    for (const opener of openers) opener.addEventListener("click", onOpener)
    document.addEventListener("click", onPage)
    document.addEventListener("selectionchange", onSelection)
    document.addEventListener("keydown", onKey)
    card.addEventListener("beforetoggle", onToggle)
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()

    return () => {
      card.removeEventListener("click", onCard)
      for (const opener of openers) opener.removeEventListener("click", onOpener)
      document.removeEventListener("click", onPage)
      document.removeEventListener("selectionchange", onSelection)
      document.removeEventListener("keydown", onKey)
      card.removeEventListener("beforetoggle", onToggle)
      window.removeEventListener("scroll", onScroll)
    }
  }, [id])

  return null
}

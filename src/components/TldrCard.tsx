"use client"

import { useEffect } from "react"

/**
 * Drives the hero's TL;DR card (a manual popover, Section's `popover`): a link in it to a section centers and selects
 * the part of it the link picks out and collapses the card to a small "TL;DR" at the top, with the backdrop gone so the
 * page can be used under it, and a click on the collapsed card opens it again. Opening and collapsing morph the card
 * through a view transition where the browser has them (globals.css), and simply switch where it doesn't. Escape, the
 * close button or a click outside the open card closes it; the TL;DR buttons open a collapsed card rather than closing
 * it. scripts/bakeClient.js does the same on the baked page.
 */
export default ({ id }: { id: string }) => {
  useEffect(() => {
    const card = document.getElementById(id)
    if (!card) return
    // The hero's TL;DR and the call-outs in the sections (TldrCallout).
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
      // The collapsed card's close button still closes it; anywhere else on it opens it again.
      if (card.hasAttribute("data-collapsed") && !(event.target as Element).closest("button")) {
        event.preventDefault()
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
      collapse(false)
    }
    // The open card's backdrop lets clicks through, so a click outside it is any click on the page.
    const onPage = (event: MouseEvent) => {
      const target = event.target as Node
      const open = card.matches(":popover-open") && !card.hasAttribute("data-collapsed")
      if (open && !card.contains(target) && !openers.some((opener) => opener.contains(target))) card.hidePopover()
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && card.matches(":popover-open")) card.hidePopover()
    }
    // A card closed while collapsed fades out as it is, and opens again whole.
    const onToggle = (event: Event) => {
      if ((event as ToggleEvent).newState !== "open") return
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

    return () => {
      card.removeEventListener("click", onCard)
      for (const opener of openers) opener.removeEventListener("click", onOpener)
      document.removeEventListener("click", onPage)
      document.removeEventListener("selectionchange", onSelection)
      document.removeEventListener("keydown", onKey)
      card.removeEventListener("beforetoggle", onToggle)
    }
  }, [id])

  return null
}

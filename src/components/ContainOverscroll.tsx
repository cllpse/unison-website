"use client"

import { useEffect } from "react"

/**
 * Marks each code block that actually scrolls, per axis (data-scroll-x, data-scroll-y on its <pre>), so CodeBlock only
 * contains overscroll where there's something to scroll. overscroll-behavior: contain on a block that can't scroll would
 * still swallow the wheel, stopping the page from scrolling over it. It also marks the page's root and each code block
 * data-scrolling while they scroll, and for 800ms after, which is when their scrollbars show (globals.css). Other
 * scrolling areas that take the code blocks' scrollbars (data-scroll-area, such as the TL;DR card's text) are marked
 * the same way.
 */
const SCROLLBAR_LINGER = 800
export default () => {
  useEffect(() => {
    const blocks = [...document.querySelectorAll<HTMLElement>("[data-code-block] > pre, [data-scroll-area]")]

    const mark = () => {
      for (const block of blocks) {
        block.toggleAttribute("data-scroll-x", block.scrollWidth > block.clientWidth)
        block.toggleAttribute("data-scroll-y", block.scrollHeight > block.clientHeight)
      }
    }

    // Overflow changes when a block resizes (the viewport, the height cap) and when its contents do (the code font
    // loading after first paint).
    mark()
    const observer = new ResizeObserver(mark)
    for (const block of blocks) {
      observer.observe(block)
      const code = block.querySelector("code")
      if (code) observer.observe(code)
    }

    const timers = new Map<Element, number>()
    const showScrollbar = (element: Element) => () => {
      element.setAttribute("data-scrolling", "")
      window.clearTimeout(timers.get(element))
      timers.set(
        element,
        window.setTimeout(() => element.removeAttribute("data-scrolling"), SCROLLBAR_LINGER),
      )
    }
    const onPage = showScrollbar(document.documentElement)
    const onBlocks = blocks.map((block) => [block, showScrollbar(block)] as const)
    window.addEventListener("scroll", onPage, { passive: true })
    for (const [block, onBlock] of onBlocks) block.addEventListener("scroll", onBlock, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", onPage)
      for (const [block, onBlock] of onBlocks) block.removeEventListener("scroll", onBlock)
      for (const timer of timers.values()) window.clearTimeout(timer)
    }
  }, [])

  return null
}

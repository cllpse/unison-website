"use client"

import { useEffect } from "react"

/**
 * Marks each code block that actually scrolls, per axis (data-scroll-x, data-scroll-y on its <pre>), so CodeBlock only
 * contains overscroll where there's something to scroll. overscroll-behavior: contain on a block that can't scroll would
 * still swallow the wheel, stopping the page from scrolling over it.
 */
export default () => {
  useEffect(() => {
    const blocks = [...document.querySelectorAll<HTMLElement>("[data-code-block] > pre")]

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

    return () => observer.disconnect()
  }, [])

  return null
}

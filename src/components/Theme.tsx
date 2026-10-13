"use client"

import { useLayoutEffect } from "react"

/**
 * Switches the page to the dark theme when the URL asks for it, for trying the theme out: `?theme=dark` sets
 * data-theme="dark" on <html>, which the dark: variant follows, and darkens the browser's toolbar to match. Any other
 * value, or none, keeps the light theme.
 */
const applyTheme = () => {
  if (new URLSearchParams(location.search).get("theme") !== "dark") return

  document.documentElement.dataset.theme = "dark"
  // The dark page background (--color-black).
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", "rgb(10, 10, 10)")
}

/** Applies the theme from the URL before the first paint, so the page itself stays static. Render it in the <head>. */
export default () => {
  // Runs it again after hydration: for the theme-color tag, if the script ran before it was parsed, and in development,
  // where Strict Mode's remount resets <html> to its JSX attributes and drops data-theme.
  useLayoutEffect(applyTheme, [])

  // An inline script runs while the page is parsed, ahead of any content. Its source is the function itself, so the two
  // can't drift apart. React warns about rendering <script> on the client, so there it's inert text, and
  // suppressHydrationWarning keeps the server's type.
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      // biome-ignore lint/security/noDangerouslySetInnerHtml: the source of our own function, with no outside input
      dangerouslySetInnerHTML={{ __html: `(${applyTheme.toString()})()` }}
    />
  )
}

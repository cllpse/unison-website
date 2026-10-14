import type { Metadata, Viewport } from "next"
import { Atkinson_Hyperlegible_Next, Inter } from "next/font/google"
import localFont from "next/font/local"
import SnappyScroll from "../components/SnappyScroll"
import Theme from "../components/Theme"
import { PRODUCT_NAME, SITE_DESCRIPTION } from "../constants/site"
import "./globals.css"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

// Paragraphs and the nav: the variable Next version, so in-between weights render exactly.
const atkinson = Atkinson_Hyperlegible_Next({
  variable: "--font-atkinson",
  subsets: ["latin"],
})

// The owner's terminal font, licensed for web use and subset to Latin (27 KB per face instead of 2.2 MB). As in their
// Ghostty config, SemiBold is the regular weight.
const comicCode = localFont({
  variable: "--font-comic-code",
  src: [
    { path: "./fonts/ComicCode-SemiBold.woff2", weight: "400", style: "normal" },
    { path: "./fonts/ComicCode-Bold.woff2", weight: "700", style: "normal" },
  ],
  adjustFontFallback: false,
})

export const metadata: Metadata = {
  title: `${PRODUCT_NAME} - Your Figma properties, as code`,
  description: SITE_DESCRIPTION,
}

// The browser's toolbar in the page background; Theme darkens it on the dark theme, which doesn't follow the system
// setting while it's being tried out.
export const viewport: Viewport = {
  themeColor: "rgb(255, 255, 255)",
}

export default (p: LayoutProps<"/">) => {
  const { children } = p

  return (
    // Theme sets data-theme on <html> before React hydrates; suppressHydrationWarning accepts the attribute.
    <html
      lang="en"
      className={`${inter.variable} ${atkinson.variable} ${comicCode.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <Theme />
      </head>
      {/* Outside a section the accent is plain text color, so selections there are a light gray. */}
      <body className="flex min-h-full flex-col bg-white font-sans text-body font-normal text-pretty text-black [--accent:var(--color-black)] selection:bg-(--accent)/10 dark:bg-black dark:text-white dark:[--accent:var(--color-white)]">
        {children}
        <SnappyScroll />
      </body>
    </html>
  )
}

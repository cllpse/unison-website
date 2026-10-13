import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import localFont from "next/font/local"
import SnappyScroll from "../components/SnappyScroll"
import { PRODUCT_NAME } from "../constants/site"
import "./globals.css"

// Inter for text, as on coolors.co.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

// Comic Code for code, the owner's terminal font (licensed for web use). The files are subset to Latin from the Nerd
// Font build, which is mostly icon glyphs, so each is about 27 KB instead of 2.2 MB. As in their Ghostty config, the
// SemiBold face is the regular weight and Bold is bold.
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
  description:
    "Components that speak Figma's own vocabulary. What a designer sets in the properties panel is literally what the developer writes, on web and native, and a plugin writes it for you.",
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "rgb(255, 255, 255)" },
    { media: "(prefers-color-scheme: dark)", color: "rgb(10, 10, 10)" },
  ],
}

export default (p: LayoutProps<"/">) => {
  const { children } = p

  return (
    <html lang="en" className={`${inter.variable} ${comicCode.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        {children}
        <SnappyScroll />
      </body>
    </html>
  )
}

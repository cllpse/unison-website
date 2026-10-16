import type { Metadata, Viewport } from "next"
import { Atkinson_Hyperlegible_Next, Inter } from "next/font/google"
import localFont from "next/font/local"
import ContainOverscroll from "../components/ContainOverscroll"
import { REPO_NAME, SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "../constants/site"
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

// What search engines and link previews read. Relative URLs resolve against the site's address (metadataBase), base
// path included. The social card is built by the opengraph-image.png route.
const CARD = {
  url: "opengraph-image.png",
  width: 1200,
  height: 630,
  alt: "Figma properties, as code.",
  type: "image/png",
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  applicationName: REPO_NAME,
  authors: [{ name: "cllpse", url: "https://github.com/cllpse" }],
  creator: "cllpse",
  keywords: [
    "Figma",
    "design system",
    "design tokens",
    "component library",
    "React",
    "React Native",
    "TypeScript",
    "Tailwind CSS",
    "coding agents",
    "design to code",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: REPO_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_US",
    images: [CARD],
  },
  twitter: { card: "summary_large_image", title: SITE_TITLE, description: SITE_DESCRIPTION, images: [CARD] },
  robots: { index: true, follow: true },
}

// The browser's toolbar in the page background, which follows the browser's color scheme.
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "rgb(255, 255, 255)" },
    { media: "(prefers-color-scheme: dark)", color: "rgb(10, 10, 10)" },
  ],
}

export default (p: LayoutProps<"/">) => {
  const { children } = p

  return (
    // In-page jumps scroll smoothly at the browser's own pace, and jump straight there for reduced motion.
    <html
      lang="en"
      className={`${inter.variable} ${atkinson.variable} ${comicCode.variable} h-full scroll-smooth antialiased motion-reduce:scroll-auto`}
    >
      {/* Outside a section the accent is plain text color, so selections there are a light gray. */}
      <body className="flex min-h-full flex-col bg-white font-sans text-body font-normal text-pretty text-black [--accent:var(--color-black)] selection:bg-(--accent)/10 dark:bg-black dark:text-white dark:[--accent:var(--color-white)]">
        {children}
        <ContainOverscroll />
      </body>
    </html>
  )
}

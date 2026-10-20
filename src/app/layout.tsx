import type { Metadata, Viewport } from "next"
import { Inter, Martian_Mono } from "next/font/google"
import ContainOverscroll from "../components/ContainOverscroll"
import { REPO_NAME, SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "../constants/site"
import "./globals.css"

// Everything but code: the Google Font closest to the reference's Graphik, measured glyph by glyph against it, in shape,
// proportions and spacing. Weights are the reference's own, as its stylesheet declares them.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

// Code: the reference's own code font (its code boxes, as under "Quick Start" on the reference), set light (300)
// as the reference sets it. Variable, so in-between weights render exactly.
const martianMono = Martian_Mono({
  variable: "--font-martian-mono",
  subsets: ["latin"],
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
    "Unison",
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
      className={`${inter.variable} ${martianMono.variable} h-full scroll-smooth antialiased motion-reduce:scroll-auto`}
    >
      {/* Outside a section the accent is the ink, so selections there are a light slate. */}
      <body className="flex min-h-full flex-col bg-white font-sans text-pretty text-ink [--accent:var(--color-ink)] selection:bg-(--accent)/10 dark:bg-black">
        {children}
        <ContainOverscroll />
      </body>
    </html>
  )
}

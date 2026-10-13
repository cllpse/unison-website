import type { Metadata, Viewport } from "next"
import { Google_Sans_Code, Inter } from "next/font/google"
import { PRODUCT_NAME } from "../constants/site"
import "./globals.css"

// The same pair coolors.co uses: Inter for text, Google Sans Code for code.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

const googleSansCode = Google_Sans_Code({
  variable: "--font-google-sans-code",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: `${PRODUCT_NAME} – Your Figma properties, as code`,
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
    <html lang="en" className={`${inter.variable} ${googleSansCode.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  )
}

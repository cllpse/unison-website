import type { MetadataRoute } from "next"
import { PRODUCT_NAME, REPO_NAME, SITE_DESCRIPTION } from "../constants/site"

// Built once at build time, which the static export (bun run bake) requires.
export const dynamic = "force-static"

/**
 * The web app manifest, for "Add to Home Screen" on Android and installs: the icons in `public`, drawn from the 32px
 * mark at twice its pixel density on white (launchers would put black on black). The maskable one keeps the mark inside
 * the safe zone that adaptive icons crop to. Tabs use `icon.svg` and `favicon.ico`, iOS uses `apple-icon.png`.
 */
export default (): MetadataRoute.Manifest => {
  return {
    name: REPO_NAME,
    short_name: PRODUCT_NAME,
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "browser",
    background_color: "#fff",
    theme_color: "#fff",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  }
}

import type { MetadataRoute } from "next"
import { SITE_URL } from "../constants/site"

// Built once at build time, which the static export (bun run bake) requires.
export const dynamic = "force-static"

/**
 * The sitemap: the one page. The site lives under a path (cllp.se/figma/), and robots.txt only counts at a domain's
 * root, so there's no robots.txt here; submit this sitemap in Search Console, or list it in the root robots.txt.
 */
export default (): MetadataRoute.Sitemap => {
  return [{ url: SITE_URL, lastModified: new Date(), changeFrequency: "monthly", priority: 1 }]
}

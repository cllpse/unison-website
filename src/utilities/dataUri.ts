import { readFileSync } from "node:fs"
import { extname, join } from "node:path"

const MIME_TYPES: Record<string, string> = { ".webp": "image/webp", ".png": "image/png", ".gif": "image/gif" }

/**
 * A file from the project as a data URI, read at build time, so a small image ships inside the page instead of beside
 * it.
 *
 * @example
 * dataUri("src/assets/author.webp") // => "data:image/webp;base64,UklGR..."
 */
export const dataUri = (path: string) =>
  `data:${MIME_TYPES[extname(path)] ?? "application/octet-stream"};base64,${readFileSync(join(process.cwd(), path)).toString("base64")}`

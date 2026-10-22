import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { AUTHOR_COMPANY_URL, AUTHOR_GITHUB_URL, AUTHOR_LINKEDIN_URL, AUTHOR_NAME } from "../constants/site"
import { dataUri } from "../utilities/dataUri"
import GitHubMark from "./GitHubMark"

/**
 * eject.io's mask (src/assets/eject-mask.svg), read at build time and inlined, its black fill swapped for the text color
 * and sized by its container, as wide as the other marks (1em), so it sits with them and follows the theme.
 */
const ejectMark = async () =>
  (await readFile(join(process.cwd(), "src/assets/eject-mask.svg"), "utf8"))
    .replace("<svg ", '<svg role="img" class="block h-auto w-full" ')
    .replace(">", `><title>Personal website</title>`)
    .replace('fill="#000"', 'fill="currentColor"')

/** LinkedIn's mark (Simple Icons, CC0), in the text color. */
const LinkedInMark = (p: { title: string; className?: string }) => {
  const { title, className } = p

  return (
    <svg viewBox="0 0 24 24" role="img" className={`fill-current ${className ?? ""}`}>
      <title>{title}</title>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

/**
 * The page's sign-off, set plain on the canvas below the last card and centered on it: the author's photo in a circle on
 * the left, as tall as the reaction GIF in the proof section (a third of 220px), and beside it who made the site, set
 * like the sections' "For ..." labels (large, bold, the default line height), with links to their profiles below,
 * shown as the marks alone, at the size of that text.
 */
export default async () => {
  return (
    <footer className="mt-large flex items-center justify-center gap-medium lg:mt-x-large">
      {/* biome-ignore lint/performance/noImgElement: a 4KB data URI in a static export, nothing for next/image to do */}
      <img
        src={dataUri("src/assets/author.webp")}
        alt={AUTHOR_NAME}
        width={147}
        height={147}
        className="size-[calc(220px/3)] shrink-0 rounded-full"
      />
      <div className="flex flex-col items-start gap-1">
        <p className="text-large font-bold leading-default">by {AUTHOR_NAME}</p>
        <p className="flex items-center gap-small text-large leading-default text-ink">
          <a href={AUTHOR_GITHUB_URL} target="_blank" rel="noopener">
            <GitHubMark title={`${AUTHOR_NAME} on GitHub`} className="block size-[1em]" />
          </a>
          {AUTHOR_LINKEDIN_URL ? (
            <a href={AUTHOR_LINKEDIN_URL} target="_blank" rel="noopener">
              <LinkedInMark title={`${AUTHOR_NAME} on LinkedIn`} className="block size-[1em]" />
            </a>
          ) : null}
          <a
            href={AUTHOR_COMPANY_URL}
            target="_blank"
            rel="noopener"
            className="block w-[1em]"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: our own SVG, read at build time
            dangerouslySetInnerHTML={{ __html: await ejectMark() }}
          />
        </p>
      </div>
    </footer>
  )
}

import { REPO_NAME, REPO_URL } from "../constants/site"
import GitHubMark from "./GitHubMark"
import Nav from "./Nav"

export default () => {
  return (
    // A plain white bar (black on the dark theme), as the reference tops its pages: solid, with no fade or blur, so the
    // canvas starts cleanly below it. Once the page scrolls, the cards' old shadow fades in under it on the site's
    // usual 116ms ease-out (Nav marks it data-scrolled), lifting it off the content passing below. Its spacing is
    // the reference's nav: 3 base sizes tall, inset at the sides as the canvas's content is, so it begins and
    // ends where the section cards do. On phones, where the nav wraps below the site name, it sits a quarter base size
    // under it.
    <header className="sticky top-0 z-10 bg-white px-small transition-shadow duration-116 ease-out data-scrolled:shadow-card lg:px-x-large motion-reduce:transition-none dark:bg-black">
      <div className="mx-auto flex min-h-x-large max-w-page flex-wrap content-center items-center justify-between gap-x-medium gap-y-[calc(var(--spacing-small)/2)] py-small lg:gap-y-small">
        <p className="flex items-center gap-2 text-small font-bold leading-default [&_a]:font-bold">
          <a href="#top" className="no-underline">
            {REPO_NAME}
          </a>
          {/* GitHub's mark, sized to the text and in the text color. */}
          <a href={REPO_URL} className="text-ink">
            <GitHubMark title={`${REPO_NAME} on GitHub`} className="size-[1em]" />
          </a>
        </p>
        <Nav />
      </div>
    </header>
  )
}

import { REPO_NAME, REPO_URL } from "../constants/site"
import GitHubMark from "./GitHubMark"
import Nav from "./Nav"

export default () => {
  return (
    // A plain white bar (black on the dark theme), as the reference tops its pages: solid, with no fade or blur, so the
    // canvas starts cleanly below it. Once the page scrolls, the cards' old shadow fades in under it on the site's
    // usual 116ms ease-out (Nav marks it data-scrolled), lifting it off the content passing below; not over the open
    // menu. Its spacing is the reference's nav: 3 base sizes tall, inset at the sides as the canvas's content is.
    <header className="sticky top-0 z-10 bg-white px-medium transition-shadow duration-116 ease-out data-scrolled:shadow-card lg:px-x-large motion-reduce:transition-none dark:bg-black [.menu-open_&]:shadow-none">
      <div className="mx-auto flex min-h-x-large max-w-page flex-wrap content-center items-center justify-between gap-x-medium gap-y-small py-small">
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

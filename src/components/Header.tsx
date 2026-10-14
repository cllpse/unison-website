import { REPO_NAME, REPO_URL } from "../constants/site"
import GitHubMark from "./GitHubMark"
import Nav from "./Nav"

export default () => {
  return (
    // The bottom --scrim-fade is the scrim's fade: it hangs over the content (negative margin) and lets clicks through.
    // Behind the content, a backdrop blur sits under a 70% layer of the scrim color. Both are masked with the scrim, so
    // they ease out together, and once a section is under the header (data-rules, set by Nav) both leave gaps for its
    // side rules, so those run up to the top. Fine grain on top gives a sandblasted-glass look.
    <header className="pointer-events-none sticky top-0 z-10 -mb-(--scrim-fade) scrim px-4 pb-(--scrim-fade) font-extrabold tracking-tight before:absolute before:inset-0 before:-z-10 before:backdrop-blur-lg before:mask-intersect before:[mask-image:var(--scrim-gradient)] data-rules:before:[mask-image:var(--scrim-gradient),var(--rule-holes)] after:absolute after:inset-0 after:-z-10 after:bg-(--scrim) after:opacity-70 after:mask-intersect after:[mask-image:var(--scrim-gradient)] data-rules:after:[mask-image:var(--scrim-gradient),var(--rule-holes)]">
      {/* The grain gets its own layer above the scrim, without the rule gaps, which would show as grain-free lines: the
          scrim color, masked to grain and faded with the scrim. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-5 bg-(--scrim) mask-intersect [mask-image:var(--scrim-grain),var(--scrim-gradient)]"
      />
      {/* Phones only: a 24px edge at the very top, fading from transparent up to solid, so content vanishes at the
          screen edge. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-5 h-6 bg-linear-to-t from-transparent to-(--scrim) in-data-rules:mask-(--rule-holes) sm:hidden"
      />
      <div className="pointer-events-auto mx-auto flex max-w-page flex-wrap items-baseline justify-between gap-x-6 gap-y-2 px-6 py-4 max-sm:px-3">
        <p className="flex items-center gap-2 text-xl">
          <a href="#top" className="no-underline">
            {REPO_NAME}
          </a>
          {/* GitHub's mark, sized to the text and in the text color. */}
          <a href={REPO_URL} className="text-black dark:text-white">
            <GitHubMark title={`${REPO_NAME} on GitHub`} className="size-[1em]" />
          </a>
        </p>
        <Nav />
      </div>
    </header>
  )
}

import { REPO_NAME, REPO_URL } from "../constants/site"
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
        <p className="flex items-center gap-2">
          <a href="#top" className="no-underline">
            {REPO_NAME}
          </a>
          {/* GitHub's mark (Octicons, MIT), sized to the text and in the text color. */}
          <a href={REPO_URL} className="text-black dark:text-white">
            <svg viewBox="0 0 16 16" role="img" className="size-[1em] fill-current">
              <title>{`${REPO_NAME} on GitHub`}</title>
              <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" />
            </svg>
          </a>
        </p>
        <Nav />
      </div>
    </header>
  )
}

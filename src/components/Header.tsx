import { NAV_LINKS, REPO_NAME, SECTION_ACCENTS } from "../constants/site"
import { ACCENT_CLASSES } from "./Section"

export default () => {
  return (
    <header className="mx-auto flex w-full max-w-3xl flex-wrap items-baseline justify-between gap-x-6 gap-y-2 px-4 pt-6 sm:px-6">
      <a href="#top" className="text-body font-extrabold tracking-tight">
        {REPO_NAME}
      </a>
      <nav>
        <ul className="flex flex-wrap gap-x-5 gap-y-1 text-body">
          {NAV_LINKS.map((link) => (
            <li key={link.id} className={ACCENT_CLASSES[SECTION_ACCENTS[link.id]]}>
              {/* Each link takes the accent of the section it points at. */}
              <a href={`#${link.id}`} className="text-(--accent-text) underline-offset-4 hover:underline">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

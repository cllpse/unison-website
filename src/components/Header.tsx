import { NAV_LINKS } from "../constants/site"
import Logo from "./Logo"

export default () => {
  return (
    <header className="sticky top-0 z-20 rule-b bg-white/80 backdrop-blur-md dark:bg-gray-950/80">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <a href="#top" aria-label="Home">
          <Logo />
        </a>
        <nav className="flex items-center gap-6 text-sm">
          <ul className="hidden items-center gap-6 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-gray-600 transition hover:text-gray-950 dark:text-gray-400 dark:hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#get-started"
            className="rounded-full bg-gray-950 px-3.5 py-1.5 text-sm font-medium text-white transition hover:bg-gray-800 dark:bg-white dark:text-gray-950 dark:hover:bg-gray-200"
          >
            Get started
          </a>
        </nav>
      </div>
    </header>
  )
}

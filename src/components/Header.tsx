import { NAV_LINKS, PRODUCT_NAME } from "../constants/site"

export default () => {
  return (
    <header className="mx-auto flex w-full max-w-3xl flex-wrap items-baseline justify-between gap-x-6 gap-y-2 px-4 pt-6 sm:px-6">
      <a href="#top" className="font-semibold tracking-tight">
        {PRODUCT_NAME}
      </a>
      <nav>
        <ul className="flex flex-wrap gap-x-5 gap-y-1 text-sm">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-black/70 hover:text-bittersweet dark:text-white/70 dark:hover:text-bittersweet"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

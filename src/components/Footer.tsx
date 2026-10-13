import { NAV_LINKS, PRODUCT_NAME } from "../constants/site"
import Logo from "./Logo"

export default () => {
  return (
    <footer className="rule-t">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 rule-x px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <Logo />
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600 dark:text-gray-400">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="hover:text-gray-950 dark:hover:text-white">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} {PRODUCT_NAME}
        </p>
      </div>
    </footer>
  )
}

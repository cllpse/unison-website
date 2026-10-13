import { PRODUCT_NAME } from "../constants/site"

export default () => {
  return (
    <footer className="mx-auto w-full max-w-3xl px-4 py-10 text-fine text-black dark:text-white sm:px-6">
      © {new Date().getFullYear()} {PRODUCT_NAME}
    </footer>
  )
}

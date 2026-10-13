import { PRODUCT_NAME } from "../constants/site"
import LogoMark from "./LogoMark"

export default () => (
  <span className="flex items-center gap-2 font-semibold tracking-tight">
    <LogoMark />
    {PRODUCT_NAME}
  </span>
)

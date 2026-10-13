import { tokenize } from "../utilities/tokenize"

export type Highlight = { code: string }

export default (p: Highlight) =>
  tokenize(p.code).map((token, index) =>
    token.className ? (
      // biome-ignore lint/suspicious/noArrayIndexKey: tokens are positional and never reorder
      <span key={index} className={token.className}>
        {token.text}
      </span>
    ) : (
      token.text
    ),
  )

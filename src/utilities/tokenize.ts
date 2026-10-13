export type Token = { text: string; className?: string }

const TAG = "text-accent-500"
const ATTRIBUTE = "text-sky-300"
const STRING = "text-emerald-300"
const PUNCTUATION = "text-gray-500"
const KEYWORD = "text-brand-400"
const COMMENT = "text-gray-500 italic"

const KEYWORDS = new Set(["import", "from", "export", "default", "function", "return", "const"])

/**
 * Splits a JSX/TS snippet into tokens with Tailwind color classes.
 *
 * It only needs to understand the snippets on this site, so it trades completeness for zero dependencies; a bare `<`
 * that doesn't start a tag (as in `a < b`) stays plain text.
 *
 * @example
 * tokenize("<Frame gap-4 />")
 * // → [{ text: "<", … }, { text: "Frame", … }, { text: " " }, { text: "gap-4", … }, { text: " " }, { text: "/>", … }]
 */
export const tokenize = (source: string): Token[] => {
  const tokens: Token[] = []
  let inTag = false
  let i = 0

  const push = (text: string, className?: string) => {
    tokens.push({ text, className })
    i += text.length
  }

  while (i < source.length) {
    const rest = source.slice(i)

    const comment = rest.match(/^\/\/[^\n]*/)
    if (comment) {
      push(comment[0], COMMENT)
      continue
    }

    const tagOpen = rest.match(/^<(\/?)([A-Za-z][\w.]*)?/)
    if (!inTag && tagOpen && (tagOpen[1] || tagOpen[2] || rest.startsWith("<>"))) {
      push(`<${tagOpen[1]}`, PUNCTUATION)
      if (tagOpen[2]) push(tagOpen[2], TAG)
      inTag = true
      continue
    }

    if (inTag) {
      const close = rest.match(/^\/?>/)
      if (close) {
        push(close[0], PUNCTUATION)
        inTag = false
        continue
      }

      const attribute = rest.match(/^[A-Za-z][\w-]*/)
      if (attribute) {
        push(attribute[0], ATTRIBUTE)
        continue
      }
    }

    const string = rest.match(/^"[^"\n]*"/)
    if (string) {
      push(string[0], STRING)
      continue
    }

    const word = rest.match(/^[A-Za-z_$][\w$]*/)
    if (word) {
      push(word[0], KEYWORDS.has(word[0]) ? KEYWORD : undefined)
      continue
    }

    push(rest[0], "={}()".includes(rest[0]) ? PUNCTUATION : undefined)
  }

  return tokens
}

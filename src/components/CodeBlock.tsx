import { highlight } from "../utilities/highlight"

export type CodeBlock = {
  code: string
  caption?: string
  lang?: "tsx" | "diff"
}

export default async (p: CodeBlock) => {
  const { code, caption, lang } = p
  const html = await highlight(code, lang)

  return (
    <figure className="mt-6 min-w-0">
      {caption ? (
        <figcaption className="mb-2 font-mono text-label text-black dark:text-white">{caption}</figcaption>
      ) : null}
      {/* Code scrolls inside its own box so long lines never widen the page on a phone. */}
      <div
        className="[&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:p-4 [&_pre]:font-mono [&_pre]:text-label [&_pre]:font-normal [&_pre]:[-webkit-overflow-scrolling:touch]"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Shiki output, built from our own constant snippets
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </figure>
  )
}

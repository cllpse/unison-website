import { highlight, type Theme } from "../utilities/highlight"

export type CodeBlock = {
  code: string
  caption?: string
  lang?: "tsx" | "diff"
  /** Grayscale by default; "colorful" for a block that should stand out. */
  theme?: Theme
}

export default async (p: CodeBlock) => {
  const { code, caption, lang, theme } = p
  const html = await highlight(code, lang, theme)

  return (
    <figure className="mt-6 min-w-0">
      {caption ? (
        <figcaption className="mb-2 font-mono text-label text-muted text-thin-white dark:text-thin-black">
          {caption}
        </figcaption>
      ) : null}
      {/* Code scrolls inside its own box so long lines never widen the page on a phone. Italic runs (text between
          tags and comments) are lighter in color, so they skip the thinning stroke to keep their full weight. */}
      <div
        className="[&_pre]:overflow-x-auto [&_pre]:rounded-3xl [&_pre]:border [&_pre]:border-gray-edge [&_pre]:outline-none [&_pre]:[corner-shape:squircle] [&_pre]:p-4 [&_pre]:font-mono [&_pre]:text-code [&_pre]:font-normal [&_pre]:text-thin-gray [&_pre_span[style*=italic]]:[-webkit-text-stroke:0] [&_pre]:[-webkit-overflow-scrolling:touch]"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Shiki output, built from our own constant snippets
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </figure>
  )
}

import type { ReactNode } from "react"
import CodeBlock, { type CodeBlock as CodeBlockProps } from "./CodeBlock"

export type Point = {
  title: string
  /** An id for the point, so a link can pick it out (the TL;DR card's do). */
  id?: string
  /** The text: one paragraph, or several as an array. */
  body: ReactNode | ReactNode[]
  code?: CodeBlockProps[]
  /** The column it goes in, to place it by hand; otherwise points alternate, first left, second right. */
  column?: "left" | "right"
}

export type Points = { points: Point[] }

/**
 * A section's points: h4 groups with their code samples in two columns that each flow on their own, so a tall point
 * (one with code, say) only pushes down the points below it, not the one beside it. Points alternate between the
 * columns, first left, second right, as they would in a grid, unless a point names its `column`.
 *
 * `Section` makes the wrapping div a grid, which shows the two lists side by side once there's room for two 24rem
 * columns and their gap (2 base sizes, at most about 4rem where it matters). Below 52rem the lists dissolve (display:
 * contents), so their points join the grid directly and fall back into reading order through `order`; just above the
 * two-column width that still reads right, row by row.
 */
export default (p: Points) => {
  const { points } = p
  const columnOf = (point: Point, index: number) => point.column ?? (index % 2 === 0 ? "left" : "right")
  const columns = [
    points.filter((point, index) => columnOf(point, index) === "left"),
    points.filter((point, index) => columnOf(point, index) === "right"),
  ]

  return (
    <div className="@container">
      {columns.map((column) => (
        <ul key={column[0]?.title} className="flex flex-col gap-y-medium lg:gap-y-neutral @max-[52rem]:contents">
          {column.map((point) => (
            <li key={point.title} id={point.id} style={{ order: points.indexOf(point) }}>
              <h4>{point.title}</h4>
              {(Array.isArray(point.body) ? point.body : [point.body]).map((paragraph, index) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: fixed copy, never reordered
                <p key={index}>{paragraph}</p>
              ))}
              {point.code?.map((block) => (
                <CodeBlock key={block.code} {...block} />
              ))}
            </li>
          ))}
        </ul>
      ))}
    </div>
  )
}

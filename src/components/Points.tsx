import type { ReactNode } from "react"
import CodeBlock, { type CodeBlock as CodeBlockProps } from "./CodeBlock"

export type Point = { title: string; body: ReactNode; code?: CodeBlockProps[] }

export type Points = { points: Point[] }

/** A section's points: a list of h4 groups with their code samples, which `Section` lays out in two columns. */
export default (p: Points) => {
  const { points } = p

  return (
    <ul>
      {points.map((point) => (
        <li key={point.title}>
          <h4>{point.title}</h4>
          <p>{point.body}</p>
          {point.code?.map((block) => (
            <CodeBlock key={block.code} {...block} />
          ))}
        </li>
      ))}
    </ul>
  )
}

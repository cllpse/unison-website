import Highlight from "./Highlight"

export type Snippet = { code: string }

export default (p: Snippet) => (
  <pre className="overflow-x-auto rounded-lg bg-gray-950 p-4 font-mono text-[12px]/5 text-gray-100 ring-1 ring-white/10 dark:bg-black/40">
    <code>
      <Highlight code={p.code} />
    </code>
  </pre>
)

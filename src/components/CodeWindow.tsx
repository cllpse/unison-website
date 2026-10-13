import Highlight from "./Highlight"

export type CodeWindow = {
  code: string
  filename?: string
  className?: string
}

export default (p: CodeWindow) => {
  const { code, filename, className = "" } = p

  return (
    <div
      className={`overflow-hidden rounded-xl bg-gray-950 shadow-xl ring-1 ring-white/10 dark:bg-gray-900/70 ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="size-2.5 rounded-full bg-white/15" />
        {filename ? <span className="ml-2 font-mono text-xs text-gray-400">{filename}</span> : null}
      </div>
      <pre className="overflow-x-auto p-5 font-mono text-[13px]/6 text-gray-100">
        <code>
          <Highlight code={code} />
        </code>
      </pre>
    </div>
  )
}

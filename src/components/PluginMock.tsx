import Highlight from "./Highlight"

const OUTPUT = `<Frame flow-vertical gap-4 padding-6 corner-radius-4 fill-white effect-shadow-small width-fill>
  <Frame flow-horizontal gap-2 alignment-left width-fill>
    <Text typography-header-small-wrap fill-text-800>Invoices</Text>
  </Frame>
  <Text typography-body-wrap fill-neutral-600>
    Three invoices are due this week.
  </Text>
</Frame>`

const ISSUES = [
  {
    rule: "Padding not bound to a variable",
    layer: "Card / Header",
    value: "22px",
  },
  {
    rule: "Text without a text style",
    layer: "Card / Title",
    value: "Inter 17",
  },
  { rule: "Unknown color", layer: "Badge", value: "#9325FF" },
]

export default () => {
  return (
    <div className="grid gap-px overflow-hidden rounded-2xl bg-gray-950/10 shadow-xl ring-1 ring-gray-950/10 lg:grid-cols-[1fr_22rem] dark:bg-white/10 dark:ring-white/10">
      <div className="min-w-0 bg-gray-950 dark:bg-gray-900">
        <div className="flex items-center gap-4 border-b border-white/10 px-4 font-mono text-xs">
          <span className="border-b-2 border-brand-500 py-3 text-white">Code</span>
          <span className="py-3 text-gray-500">Lint · 3</span>
          <span className="ml-auto flex items-center gap-1.5 text-gray-500">
            <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />
            Live
          </span>
        </div>
        <pre className="overflow-x-auto p-5 font-mono text-[12.5px]/6 text-gray-100">
          <code>
            <Highlight code={OUTPUT} />
          </code>
        </pre>
      </div>
      <div className="bg-white dark:bg-gray-950">
        <div className="flex items-center justify-between border-b border-gray-950/5 px-4 py-3 text-xs dark:border-white/10">
          <span className="font-semibold">Lint</span>
          <span className="rounded-full bg-red-50 px-2 py-0.5 font-mono text-[10px] text-red-700 dark:bg-red-500/10 dark:text-red-300">
            3 issues
          </span>
        </div>
        <ul className="divide-y divide-gray-950/5 dark:divide-white/10">
          {ISSUES.map((issue) => (
            <li key={issue.rule} className="flex items-start gap-3 px-4 py-3.5">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-red-500" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{issue.rule}</p>
                <p className="mt-0.5 font-mono text-[11px] text-gray-500">
                  {issue.layer} · {issue.value}
                </p>
              </div>
              <span className="font-mono text-[11px] text-brand-700 dark:text-brand-400">Select →</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

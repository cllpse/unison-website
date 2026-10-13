import type { ReactNode } from "react";
import { Highlight } from "./Code";

function Snippet({ code }: { code: string }) {
  return (
    <pre className="overflow-x-auto rounded-lg bg-gray-950 p-4 font-mono text-[12px]/5 text-gray-100 ring-1 ring-white/10 dark:bg-black/40">
      <code>
        <Highlight code={code} />
      </code>
    </pre>
  );
}

function Card({
  index,
  title,
  children,
  visual,
  className = "",
}: {
  index: string;
  title: string;
  children: ReactNode;
  visual?: ReactNode;
  className?: string;
}) {
  return (
    <article
      className={`flex flex-col gap-6 bg-white p-6 sm:p-8 dark:bg-gray-950 ${className}`}
    >
      <div>
        <p className="font-mono text-xs text-gray-400">{index}</p>
        <h3 className="mt-2 text-lg font-semibold tracking-tight">{title}</h3>
        <p className="mt-2 text-sm/6 text-pretty text-gray-600 dark:text-gray-400">
          {children}
        </p>
      </div>
      {visual ? <div className="mt-auto">{visual}</div> : null}
    </article>
  );
}

function TokenError() {
  return (
    <div className="overflow-hidden rounded-lg bg-gray-950 font-mono text-[12px]/5 text-gray-100 ring-1 ring-white/10 dark:bg-black/40">
      <pre className="overflow-x-auto p-4">
        <code>
          <Highlight code="<Frame flow-vertical " />
          <span className="text-sky-300 underline decoration-red-400 decoration-wavy underline-offset-4">
            gap-9
          </span>
          <Highlight code=" fill-primary-100 />" />
        </code>
      </pre>
      <p className="border-t border-white/10 bg-red-500/10 px-4 py-2.5 text-[11px]/5 text-red-300">
        Property &apos;gap-9&apos; does not exist on type
        &apos;IntrinsicAttributes &amp; Frame&apos;.
      </p>
    </div>
  );
}

function Platforms() {
  return (
    <div className="grid grid-cols-3 gap-2 text-center font-mono text-[11px]">
      {["Web", "iOS", "Android"].map((platform) => (
        <div
          key={platform}
          className="rounded-lg bg-gray-950/[0.03] p-3 ring-1 ring-gray-950/5 dark:bg-white/5 dark:ring-white/10"
        >
          <div className="mx-auto flex h-14 w-full max-w-20 flex-col justify-center gap-1.5 rounded-md bg-brand-100 p-2 dark:bg-brand-900/40">
            <span className="h-1.5 w-3/4 rounded-full bg-brand-700" />
            <span className="h-1.5 w-1/2 rounded-full bg-brand-400" />
          </div>
          <p className="mt-2 text-gray-500">{platform}</p>
        </div>
      ))}
    </div>
  );
}

function Primitives() {
  return (
    <ul className="flex flex-wrap gap-2 font-mono text-xs">
      {["Frame", "Text", "Vector"].map((name) => (
        <li
          key={name}
          className="rounded-full bg-brand-700 px-3 py-1 text-white"
        >
          {name}
        </li>
      ))}
      {[
        "Button",
        "InputText",
        "InputToggle",
        "PopOver",
        "Tooltip",
        "Table",
      ].map((name) => (
        <li
          key={name}
          className="rounded-full px-3 py-1 text-gray-600 ring-1 ring-gray-950/10 dark:text-gray-400 dark:ring-white/15"
        >
          {name}
        </li>
      ))}
    </ul>
  );
}

function AutoLayout() {
  const rows = [
    { label: "width-hug", width: "w-24" },
    { label: "width-fill", width: "w-full" },
  ];
  return (
    <div className="grid gap-2 rounded-lg bg-gray-950/[0.03] p-3 font-mono text-[11px] ring-1 ring-gray-950/5 dark:bg-white/5 dark:ring-white/10">
      {rows.map((row) => (
        <div
          key={row.label}
          className={`${row.width} rounded-md bg-sky-brand-100 px-3 py-2 text-sky-brand-700 ring-1 ring-sky-brand-300 dark:bg-sky-brand-700/15 dark:ring-sky-brand-700/40`}
        >
          {row.label}
        </div>
      ))}
    </div>
  );
}

export function Features() {
  return (
    <div className="grid gap-px bg-gray-950/5 md:grid-cols-2 lg:grid-cols-3 dark:bg-white/10">
      <Card
        index="01"
        title="Code that reads like the properties panel"
        visual={
          <Snippet
            code={`<Text typography-body-wrap fill-text-800>\n  Hello\n</Text>`}
          />
        }
      >
        Frame and Text take boolean props named after Figma settings. A designer
        can read the JSX and recognize their own design; a developer never has
        to decode a spec.
      </Card>
      <Card
        index="02"
        title="Tokens enforced by the type system"
        visual={<TokenError />}
      >
        Props are generated from your token tables for spacing, color and
        typography. An off-system value is a TypeScript error, not a code-review
        comment.
      </Card>
      <Card
        index="03"
        title="One API for web, iOS and Android"
        visual={<Platforms />}
      >
        Each component is one base implementation with thin web and native
        shells. The same props produce the same layout everywhere.
      </Card>
      <Card
        index="04"
        title="Auto layout semantics, not approximations"
        visual={<AutoLayout />}
      >
        Flow, alignment and hug or fill sizing behave the way Figma means them,
        including alignment that follows the flow direction. It behaves like the
        canvas, not "close enough" flexbox.
      </Card>
      <Card
        index="05"
        title="Interaction and motion, same language"
        visual={
          <Snippet
            code={`<Frame\n  fill-hover-primary-100\n  animation-duration-jog\n  animation-easing-elastic\n/>`}
          />
        }
      >
        Hover fills and strokes, durations, easing and opacity use the same
        boolean style, so states and motion are tokens too.
      </Card>
      <Card
        index="06"
        title="Small, readable surface area"
        visual={<Primitives />}
      >
        A deliberately small set of primitives composes into everything else,
        alongside ready-made inputs, buttons, popovers, tooltips and a data
        table. Nothing hidden behind a theme object.
      </Card>
    </div>
  );
}

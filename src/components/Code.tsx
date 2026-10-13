import type { ReactNode } from "react";

type Token = { text: string; className?: string };

const TAG = "text-accent-500";
const ATTR = "text-sky-300";
const STRING = "text-emerald-300";
const PUNCT = "text-gray-500";
const KEYWORD = "text-brand-400";
const COMMENT = "text-gray-500 italic";

const KEYWORDS = new Set([
  "import",
  "from",
  "export",
  "default",
  "function",
  "return",
  "const",
]);

/**
 * A tiny JSX/TS highlighter. It only needs to understand the snippets on this site,
 * so it trades completeness for zero dependencies and server-only rendering.
 */
export function tokenize(source: string): Token[] {
  const tokens: Token[] = [];
  let inTag = false;
  let i = 0;

  const push = (text: string, className?: string) =>
    tokens.push({ text, className });

  while (i < source.length) {
    const rest = source.slice(i);

    const comment = rest.match(/^\/\/[^\n]*/);
    if (comment) {
      push(comment[0], COMMENT);
      i += comment[0].length;
      continue;
    }

    const tagOpen = rest.match(/^<\/?([A-Za-z][\w.]*)?/);
    if (
      !inTag &&
      tagOpen &&
      tagOpen[0].length > 0 &&
      (tagOpen[1] || rest.startsWith("</") || rest.startsWith("<>"))
    ) {
      push(tagOpen[0].startsWith("</") ? "</" : "<", PUNCT);
      if (tagOpen[1]) push(tagOpen[1], TAG);
      i += tagOpen[0].length;
      inTag = true;
      continue;
    }

    if (inTag) {
      const close = rest.match(/^\/?>/);
      if (close) {
        push(close[0], PUNCT);
        i += close[0].length;
        inTag = false;
        continue;
      }
      const attr = rest.match(/^[A-Za-z][\w-]*/);
      if (attr) {
        push(attr[0], ATTR);
        i += attr[0].length;
        continue;
      }
    }

    const string = rest.match(/^"[^"\n]*"/);
    if (string) {
      push(string[0], STRING);
      i += string[0].length;
      continue;
    }

    const word = rest.match(/^[A-Za-z_$][\w$]*/);
    if (word) {
      push(word[0], KEYWORDS.has(word[0]) ? KEYWORD : undefined);
      i += word[0].length;
      continue;
    }

    if ("={}()".includes(rest[0])) {
      push(rest[0], PUNCT);
      i += 1;
      continue;
    }

    push(rest[0]);
    i += 1;
  }

  return tokens;
}

export function Highlight({ code }: { code: string }): ReactNode {
  return tokenize(code).map((token, index) =>
    token.className ? (
      // biome-ignore lint/suspicious/noArrayIndexKey: tokens are positional and never reorder
      <span key={index} className={token.className}>
        {token.text}
      </span>
    ) : (
      token.text
    ),
  );
}

export function CodeWindow({
  code,
  filename,
  className = "",
}: {
  code: string;
  filename?: string;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-xl bg-gray-950 shadow-xl ring-1 ring-white/10 dark:bg-gray-900/70 ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="size-2.5 rounded-full bg-white/15" />
        {filename ? (
          <span className="ml-2 font-mono text-xs text-gray-400">
            {filename}
          </span>
        ) : null}
      </div>
      <pre className="overflow-x-auto p-5 font-mono text-[13px]/6 text-gray-100">
        <code>
          <Highlight code={code} />
        </code>
      </pre>
    </div>
  );
}

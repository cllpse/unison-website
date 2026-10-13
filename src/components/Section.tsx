import type { ReactNode } from "react";

/** A full-width band framed by hairlines, with a mono eyebrow, as on tailwindcss.com. */
export function Section({
  id,
  eyebrow,
  title,
  lead,
  children,
}: {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-14 rule-t">
      <div className="mx-auto max-w-7xl rule-x">
        {eyebrow || title || lead ? (
          <div className="rule-b px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
            {eyebrow ? (
              <p className="font-mono text-xs font-medium tracking-widest text-brand-700 uppercase dark:text-brand-400">
                {eyebrow}
              </p>
            ) : null}
            {title ? (
              <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
                {title}
              </h2>
            ) : null}
            {lead ? (
              <p className="mt-5 max-w-2xl text-base/7 text-pretty text-gray-600 sm:text-lg/8 dark:text-gray-400">
                {lead}
              </p>
            ) : null}
          </div>
        ) : null}
        {children}
      </div>
    </section>
  );
}

export function Gap() {
  return <div aria-hidden="true" className="bg-stripes h-10 rule-t sm:h-16" />;
}

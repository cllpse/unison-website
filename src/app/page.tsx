import { CodeWindow } from "@/components/Code";
import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PluginMock } from "@/components/PluginMock";
import { PropertiesPlayground } from "@/components/PropertiesPlayground";
import { Gap, Section } from "@/components/Section";
import { PRODUCT_NAME } from "@/lib/site";

const BEFORE = `// Card.tsx, translated by eye from the spec
<div
  style={{
    display: "flex",
    gap: 15,              // was it 16?
    padding: "22px 24px", // close enough
    borderRadius: 14,
    background: "#F7F0FF", // not quite primary-100
  }}
>`;

const AFTER = `// Card.tsx, written by the plugin
<Frame
  flow-horizontal
  gap-4
  padding-6
  corner-radius-4
  fill-primary-100
>`;

const PLUGIN_POINTS = [
  {
    title: "Select a frame, get React",
    body: "The plugin emits ready-to-paste components using Frame and Text, and updates live as the design changes. It works in Design and Dev Mode.",
  },
  {
    title: "Figma noise, collapsed",
    body: "Groups become frames, empty wrappers are dropped and instances resolve to their main component. Tag a layer EXCLUDE_FROM_OUTPUT to keep it out of the code.",
  },
  {
    title: "A linter for design files",
    body: "Padding, gap, radius or size not bound to a variable, text without a text style, unknown colors and unsupported layout modes are flagged, each linked to its layer.",
  },
];

const AUDIENCES = [
  {
    title: "Product teams",
    body: "Your designers work in Figma variables and you want the code to stay faithful to them, sprint after sprint.",
  },
  {
    title: "Cross-platform teams",
    body: "You ship the same UI on web and React Native and want one component API and one mental model for both.",
  },
  {
    title: "Design-system owners",
    body: "You want token compliance enforced by the compiler and the plugin, not by reviewers squinting at hex codes.",
  },
];

const STEPS = [
  {
    title: "Install the plugin",
    body: "Run it in Design or Dev Mode on any file that uses variables and text styles.",
  },
  {
    title: "Select a frame",
    body: "Fix anything the linter flags, so the design is on-system before handoff.",
  },
  {
    title: "Paste the code",
    body: "Drop the generated Frame and Text tree into your web or React Native app.",
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <main id="top" className="flex-1 overflow-x-clip">
        {/* Hero */}
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 -z-10 h-[36rem] bg-[radial-gradient(60%_60%_at_50%_0%,var(--color-brand-100),transparent)] dark:bg-[radial-gradient(60%_60%_at_50%_0%,color-mix(in_oklab,var(--color-brand-900)_40%,transparent),transparent)]"
          />
          <div className="mx-auto max-w-7xl rule-x px-4 pt-16 pb-12 sm:px-6 sm:pt-24 lg:px-8">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 font-mono text-xs text-gray-600 ring-1 ring-gray-950/10 dark:bg-white/5 dark:text-gray-300 dark:ring-white/15">
              <span className="size-1.5 rounded-full bg-accent-700" />
              Frame · Text · Vector for React and React Native
            </p>
            <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-tighter text-balance sm:text-7xl">
              Your Figma properties,{" "}
              <span className="bg-linear-to-r from-brand-700 to-accent-700 bg-clip-text text-transparent">
                as code.
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg/8 text-pretty text-gray-600 dark:text-gray-400">
              Components that speak Figma&apos;s own vocabulary. What a designer
              sets in the properties panel is literally what the developer
              writes, on web and native, and a plugin writes it for you.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#get-started"
                className="rounded-full bg-gray-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800 dark:bg-white dark:text-gray-950 dark:hover:bg-gray-200"
              >
                Get started
              </a>
              <a
                href="#problem"
                className="rounded-full px-5 py-2.5 text-sm font-semibold text-gray-950 ring-1 ring-gray-950/10 transition hover:bg-gray-950/5 dark:text-white dark:ring-white/15 dark:hover:bg-white/5"
              >
                Why {PRODUCT_NAME}?
              </a>
            </div>
          </div>
          <div className="rule-t">
            <div className="mx-auto max-w-7xl rule-x px-4 py-10 sm:px-6 lg:px-8">
              <p className="mb-4 font-mono text-xs text-gray-500">
                Try it: change a property, the code follows.
              </p>
              <PropertiesPlayground />
            </div>
          </div>
        </div>

        <Gap />

        <Section
          id="problem"
          eyebrow="The problem"
          title="Every design-to-code handoff loses something."
          lead={
            <>
              Designers think in auto layout, variables and text styles.
              Developers translate that by eye into CSS, Tailwind or StyleSheet
              objects, and the two drift apart with every sprint. Spacing gets
              eyeballed, colors get hard-coded, and &ldquo;the button looks
              different on iOS&rdquo; becomes a ticket.{" "}
              <strong className="font-semibold text-gray-950 dark:text-white">
                {PRODUCT_NAME} removes the translation step.
              </strong>
            </>
          }
        >
          <div className="grid gap-px bg-gray-950/5 lg:grid-cols-2 dark:bg-white/10">
            <div className="bg-white p-4 sm:p-8 dark:bg-gray-950">
              <p className="mb-3 font-mono text-xs text-gray-500">
                Before · translated by hand
              </p>
              <CodeWindow code={BEFORE} filename="Card.tsx" />
            </div>
            <div className="bg-white p-4 sm:p-8 dark:bg-gray-950">
              <p className="mb-3 font-mono text-xs text-brand-700 dark:text-brand-400">
                After · one vocabulary
              </p>
              <CodeWindow code={AFTER} filename="Card.tsx" />
            </div>
          </div>
        </Section>

        <Gap />

        <Section
          id="features"
          eyebrow="Features"
          title="One vocabulary from canvas to web and native."
          lead="A small set of components whose props are the settings in Figma's properties panel, typed against your design tokens."
        >
          <Features />
        </Section>

        <Gap />

        <Section
          id="plugin"
          eyebrow="Figma plugin"
          title="The plugin writes the code. And keeps the file honest."
          lead="Select a frame and get ready-to-paste components. Anything that can't become clean code is flagged before it reaches a developer."
        >
          <div className="grid gap-px bg-gray-950/5 md:grid-cols-3 dark:bg-white/10">
            {PLUGIN_POINTS.map((point) => (
              <div
                key={point.title}
                className="bg-white p-6 sm:p-8 dark:bg-gray-950"
              >
                <h3 className="font-semibold tracking-tight">{point.title}</h3>
                <p className="mt-2 text-sm/6 text-gray-600 dark:text-gray-400">
                  {point.body}
                </p>
              </div>
            ))}
          </div>
          <div className="bg-grid rule-t px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
            <PluginMock />
          </div>
        </Section>

        <Gap />

        <Section
          eyebrow="Who it's for"
          title="Built for teams that ship what they design."
        >
          <div className="grid gap-px bg-gray-950/5 md:grid-cols-3 dark:bg-white/10">
            {AUDIENCES.map((audience) => (
              <div
                key={audience.title}
                className="bg-white p-6 sm:p-8 dark:bg-gray-950"
              >
                <h3 className="font-semibold tracking-tight">
                  {audience.title}
                </h3>
                <p className="mt-2 text-sm/6 text-gray-600 dark:text-gray-400">
                  {audience.body}
                </p>
              </div>
            ))}
          </div>
        </Section>

        <Gap />

        <Section
          id="get-started"
          eyebrow="Get started"
          title="From canvas to component in three steps."
        >
          <ol className="grid gap-px bg-gray-950/5 md:grid-cols-3 dark:bg-white/10">
            {STEPS.map((step, index) => (
              <li
                key={step.title}
                className="bg-white p-6 sm:p-8 dark:bg-gray-950"
              >
                <span className="grid size-8 place-items-center rounded-full bg-brand-100 font-mono text-sm font-semibold text-brand-800 dark:bg-brand-900/50 dark:text-brand-300">
                  {index + 1}
                </span>
                <h3 className="mt-4 font-semibold tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm/6 text-gray-600 dark:text-gray-400">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </Section>
      </main>
      <Footer />
    </>
  );
}

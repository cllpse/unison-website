import CodeBlock from "../components/CodeBlock"
import Footer from "../components/Footer"
import Header from "../components/Header"
import Section from "../components/Section"
import { PRODUCT_NAME } from "../constants/site"

const EXAMPLE = `<Frame
  flow-horizontal
  gap-4
  padding-6
  alignment-center
  corner-radius-4
  fill-primary-100
  width-fill
>
  <Frame width-12 height-12 corner-radius-2 fill-primary-700 />
  <Frame width-12 height-16 corner-radius-2 fill-primary-700 />
  <Frame width-12 height-12 corner-radius-2 fill-primary-700 />
</Frame>`

const BEFORE = `// Card.tsx, translated by eye from the spec
// Close to the spec, but are these the designer's tokens?
<div
  className="
    flex
    gap-4
    px-6
    py-5
    rounded-xl
    bg-purple-50
  "
>`

const AFTER = `// Card.tsx, written by the plugin
<Frame
  flow-horizontal
  gap-4
  padding-6
  corner-radius-4
  fill-primary-100
>`

const PLUGIN_OUTPUT = `<Frame flow-vertical gap-4 padding-6 corner-radius-4 fill-white effect-shadow-small width-fill>
  <Frame flow-horizontal gap-2 alignment-left width-fill>
    <Text typography-header-small-wrap fill-text-800>Invoices</Text>
  </Frame>
  <Text typography-body-wrap fill-neutral-600>
    Three invoices are due this week.
  </Text>
</Frame>`

const FEATURES = [
  {
    title: "Code that reads like the properties panel",
    body: "Frame and Text take boolean props named after Figma settings. A designer can read the JSX and recognize their own design; a developer never has to decode a spec.",
    code: `<Text typography-body-wrap fill-text-800>\n  Hello\n</Text>`,
  },
  {
    title: "Tokens enforced by the type system",
    body: "Props are generated from your token tables for spacing, color and typography. An off-system value is a TypeScript error, not a code-review comment.",
    code: `<Frame flow-vertical gap-9 fill-primary-100 />\n// Property 'gap-9' does not exist on type 'IntrinsicAttributes & Frame'.`,
  },
  {
    title: "One API for web, iOS and Android",
    body: "Each component is one base implementation with thin web and native shells. The same props produce the same layout everywhere.",
  },
  {
    title: "Auto layout semantics, not approximations",
    body: 'Flow, alignment and hug or fill sizing behave the way Figma means them, including alignment that follows the flow direction. It behaves like the canvas, not "close enough" flexbox.',
  },
  {
    title: "Interaction and motion, same language",
    body: "Hover fills and strokes, durations, easing and opacity use the same boolean style, so states and motion are tokens too.",
    code: `<Frame\n  fill-hover-primary-100\n  animation-duration-jog\n  animation-easing-elastic\n/>`,
  },
  {
    title: "Small, readable surface area",
    body: "A deliberately small set of primitives (Frame, Text and Vector) composes into everything else, alongside ready-made inputs, buttons, popovers, tooltips and a data table. Nothing hidden behind a theme object.",
  },
]

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
]

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
]

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
]

const BODY = "mt-4 text-base/7 text-pretty text-black/70 dark:text-white/70"

export default () => {
  return (
    <>
      <Header />
      <main id="top" className="mx-auto w-full max-w-3xl flex-1 px-4 pt-12 sm:px-6 sm:pt-20">
        <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
          Your Figma properties, as code.
        </h1>
        <p className={`${BODY} sm:text-lg/8`}>
          Components that speak Figma&apos;s own vocabulary. What a designer sets in the properties panel is literally
          what the developer writes, on web and native, and a plugin writes it for you.
        </p>
        <CodeBlock code={EXAMPLE} caption="Card.tsx" />

        <Section id="problem" title="Every design-to-code handoff loses something.">
          <p className={BODY}>
            Designers think in auto layout, variables and text styles. Developers translate that by eye into CSS,
            Tailwind or StyleSheet objects, and the two drift apart with every sprint. Spacing gets eyeballed, colors
            get hard-coded, and &ldquo;the button looks different on iOS&rdquo; becomes a ticket.{" "}
            <strong className="font-semibold text-black dark:text-white">
              {PRODUCT_NAME} removes the translation step.
            </strong>
          </p>
          <CodeBlock code={BEFORE} caption="Before · translated by hand" />
          <CodeBlock code={AFTER} caption="After · one vocabulary" />
        </Section>

        <Section id="features" title="One vocabulary from canvas to web and native.">
          <p className={BODY}>
            A small set of components whose props are the settings in Figma&apos;s properties panel, typed against your
            design tokens.
          </p>
          {FEATURES.map((feature) => (
            <div key={feature.title} className="mt-10">
              <h3 className="text-lg font-semibold tracking-tight">{feature.title}</h3>
              <p className={BODY}>{feature.body}</p>
              {feature.code ? <CodeBlock code={feature.code} /> : null}
            </div>
          ))}
        </Section>

        <Section id="plugin" title="The plugin writes the code. And keeps the file honest.">
          <p className={BODY}>
            Select a frame and get ready-to-paste components. Anything that can&apos;t become clean code is flagged
            before it reaches a developer.
          </p>
          {PLUGIN_POINTS.map((point) => (
            <div key={point.title} className="mt-10">
              <h3 className="text-lg font-semibold tracking-tight">{point.title}</h3>
              <p className={BODY}>{point.body}</p>
            </div>
          ))}
          <CodeBlock code={PLUGIN_OUTPUT} caption="Plugin output" />
        </Section>

        <Section title="Built for teams that ship what they design.">
          {AUDIENCES.map((audience) => (
            <div key={audience.title} className="mt-8">
              <h3 className="text-lg font-semibold tracking-tight">{audience.title}</h3>
              <p className={BODY}>{audience.body}</p>
            </div>
          ))}
        </Section>

        <Section id="get-started" title="From canvas to component in three steps.">
          <ol className="list-decimal pl-5">
            {STEPS.map((step) => (
              <li key={step.title} className="mt-8 marker:font-semibold">
                <h3 className="text-lg font-semibold tracking-tight">{step.title}</h3>
                <p className={BODY}>{step.body}</p>
              </li>
            ))}
          </ol>
        </Section>
      </main>
      <Footer />
    </>
  )
}

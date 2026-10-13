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

const PORT_BEFORE = `// Card.tsx, React Native, styled by hand
<View style={{ flexDirection: "row", gap: 16, padding: 24, borderRadius: 16 }}>`

const PORT_AFTER = `// Card.tsx, ported by an agent; now renders on web, iOS and Android
<Frame flow-horizontal gap-4 padding-6 corner-radius-4>`

const UPDATE_DIFF = `  <Frame
    flow-horizontal
-   gap-4
+   gap-6
    padding-6
-   fill-primary-100
+   fill-secondary-100
    onPress={openInvoice}
  >`

const ORBIT_URL = "https://polar.sh/blog/orbit-llm-safe-design-system"

const BODY = "mt-4 text-body text-pretty text-black dark:text-white"

export default () => {
  return (
    <>
      <Header />
      <main id="top" className="mx-auto w-full max-w-3xl flex-1 px-4 pt-12 sm:px-6 sm:pt-20">
        <h1 className="text-display-sm text-balance sm:text-display">Your Figma properties, as code.</h1>
        <p className="mt-4 text-lead-sm text-pretty text-subtle sm:text-lead dark:text-subtle-inverse">
          Components that speak Figma&apos;s own vocabulary. What a designer sets in the properties panel is literally
          what the developer writes, on web and native, and a plugin writes it for you.
        </p>
        <CodeBlock code={EXAMPLE} caption="Card.tsx" />

        <Section accent="amethyst" id="problem" title="Every design-to-code handoff loses something.">
          <p className={BODY}>
            Designers think in auto layout, variables and text styles. Developers translate that by eye into CSS,
            Tailwind or StyleSheet objects, and the two drift apart with every sprint. Spacing gets eyeballed, colors
            get hard-coded, and &ldquo;the button looks different on iOS&rdquo; becomes a ticket.{" "}
            <strong className="font-semibold">{PRODUCT_NAME} removes the translation step.</strong>
          </p>
          <CodeBlock code={BEFORE} caption="Before · translated by hand" />
          <CodeBlock code={AFTER} caption="After · one vocabulary" />
        </Section>

        <Section accent="magenta" id="features" title="One vocabulary from canvas to web and native.">
          <p className={BODY}>
            A small set of components whose props are the settings in Figma&apos;s properties panel, typed against your
            design tokens.
          </p>
          {FEATURES.map((feature) => (
            <div key={feature.title} className="mt-10">
              <h3 className="text-subheading text-(--accent)">{feature.title}</h3>
              <p className={BODY}>{feature.body}</p>
              {feature.code ? <CodeBlock code={feature.code} /> : null}
            </div>
          ))}
        </Section>

        <Section accent="minion-yellow" id="plugin" title="The plugin writes the code. And keeps the file honest.">
          <p className={BODY}>
            Select a frame and get ready-to-paste components. Anything that can&apos;t become clean code is flagged
            before it reaches a developer.
          </p>
          {PLUGIN_POINTS.map((point) => (
            <div key={point.title} className="mt-10">
              <h3 className="text-subheading text-(--accent)">{point.title}</h3>
              <p className={BODY}>{point.body}</p>
            </div>
          ))}
          <CodeBlock code={PLUGIN_OUTPUT} caption="Plugin output" />
        </Section>

        <Section accent="capri" id="agents" title="Made for coding agents.">
          <p className={BODY}>
            The same properties that make the code readable for people make it predictable for agents. Ask one to port a
            component or apply a design change, and the result stays on-system and easy to review.
          </p>
          <div className="mt-10">
            <h3 className="text-subheading text-(--accent)">A vocabulary agents can&apos;t get creative with</h3>
            <p className={BODY}>
              Every prop is a Figma setting and every value is a design token, so there is exactly one way to write a
              layout. An agent doesn&apos;t invent margins or reach for a hex code; if it guesses a value that
              isn&apos;t in your tokens, the type checker stops it before you review anything.
            </p>
          </div>

          <div className="mt-10">
            <h3 className="text-subheading text-(--accent)">The same bet as Polar&apos;s Orbit</h3>
            <p className={BODY}>
              Polar wrote about{" "}
              <a href={ORBIT_URL} className="underline underline-offset-4 hover:decoration-2">
                building an LLM-safe design system
              </a>
              : models write fluent Tailwind with no idea which spacing or gray your team actually chose, so the UI
              drifts one plausible value at a time. Their answer is a single typed primitive whose props only accept
              design tokens, so off-system choices can&apos;t be expressed. {PRODUCT_NAME} makes the same bet, with one
              difference: the vocabulary isn&apos;t invented by a design-system team. The props are the settings in
              Figma&apos;s properties panel and the values are your Figma variables, so the designer, the developer and
              the agent all read and write the same words, and the plugin writes them first.
            </p>
          </div>

          <div className="mt-10">
            <h3 className="text-subheading text-(--accent)">Port once, run everywhere</h3>
            <p className={BODY}>
              Porting is a lookup, not a judgment call: each style maps to the one prop that means the same thing in
              Figma. Once a component is written with Frame and Text it is portable by construction, because the same
              props render on web and React Native; the bundler picks the platform shell, and the component code
              doesn&apos;t change.
            </p>
            <CodeBlock code={PORT_BEFORE} caption="Before · one platform" />
            <CodeBlock code={PORT_AFTER} caption="After · every platform" />
          </div>

          <div className="mt-10">
            <h3 className="text-subheading text-(--accent)">Updates without rewrites</h3>
            <p className={BODY}>
              When the design changes, an agent edits existing components instead of regenerating them. Layout and
              styling live in one prop per setting, so a change in Figma becomes a change of a few lines, while your
              state, handlers and data stay exactly as they were. Each line in the diff names the setting that changed,
              so a designer can review it too.
            </p>
            <CodeBlock code={UPDATE_DIFF} lang="diff" caption="Gap 16 → 24, fill primary → secondary" />
          </div>
        </Section>

        <Section accent="aquamarine" title="Built for teams that ship what they design.">
          {AUDIENCES.map((audience) => (
            <div key={audience.title} className="mt-8">
              <h3 className="text-subheading text-(--accent)">{audience.title}</h3>
              <p className={BODY}>{audience.body}</p>
            </div>
          ))}
        </Section>

        <Section accent="amethyst" id="get-started" title="From canvas to component in three steps.">
          <ol className="list-decimal pl-5">
            {STEPS.map((step) => (
              <li key={step.title} className="mt-8 marker:font-extrabold">
                <h3 className="text-subheading text-(--accent)">{step.title}</h3>
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

import CodeBlock from "../components/CodeBlock"
import Disclaimer from "../components/Disclaimer"
import Header from "../components/Header"
import Points, { type Point } from "../components/Points"
import Section, { HEADING, PITCH } from "../components/Section"
import ShapesPreview from "../components/ShapesPreview"
import { PRODUCT_NAME, REPO_URL } from "../constants/site"

const EXAMPLE = `<Frame
  alignment-left
  flow-horizontal
  gap-8
  height-hug
  width-hug
>
    <Frame
      alignment-center
      fill-primary-50
      flow-vertical
      height-28
      stroke-primary-400
      width-28
    >
        <Text
          fill-primary-800
          typography-align-left
        >
            square
        </Text>
    </Frame>
    <Frame
      alignment-center
      corner-radius-5
      fill-secondary-50
      flow-vertical
      height-20
      stroke-secondary-400
      width-20
    >
        <Text
          fill-secondary-800
          typography-align-left
        >
            squircle
        </Text>
    </Frame>
    <Frame
      alignment-center
      corner-radius-full
      fill-tertiary-50
      flow-vertical
      stroke-tertiary-400
    >
        <Text
          fill-tertiary-800
          typography-align-left
        >
            circle
        </Text>
    </Frame>
</Frame>`

const BEFORE = `/**
 * @file Card.tsx, as an agent writes it from the spec
 * @todo Plausible values, but are these the designer's tokens?
 */
<div
  className="
    bg-purple-50
    flex
    gap-4
    px-6
    py-5
    rounded-xl
  "
>`

const AFTER = `/**
 * @file Card.tsx, in Figma's vocabulary
 * @satisfies Your design tokens
 */
<Frame
  corner-radius-3
  fill-primary-50
  flow-horizontal
  gap-4
  padding-horizontal-6
  padding-vertical-5
>`

const STEPS = [
  { title: "Install the plugin", body: "Run it in Design or Dev Mode." },
  { title: "Select a frame", body: "Fix anything the linter flags." },
  { title: "Paste the code", body: "Into your web or React Native app, or hand it to your agent." },
]

const UPDATE_DIFF = `  <Frame
    alignment-center
+   corner-radius-5
-   fill-primary-50
+   fill-secondary-50
    flow-vertical
    height-28
  >`

const FINE_PRINT: Point[] = [
  {
    title: "Designers give a little",
    body: "You design with a subset of Figma: the primitives and features that translate faithfully into code. Some tools stay on the shelf, so that everything you draw ships exactly as drawn.",
  },
  {
    title: "Developers give a little",
    body: "You stop hand-writing CSS, and with it some of the fine-tuning you might enjoy. The layout comes from the design; your craft goes into logic, state and the interactions that make it feel right.",
  },
  {
    title: "Everyone gets a lot",
    body: "Design and code stay aligned, agents stay on brand, and features ship faster, from one source of truth to every screen. Fewer misunderstandings, less handoff ping-pong, more time for the work that matters.",
  },
  {
    title: "Give it a shot",
    body: (
      <>
        Keep an open mind and try it on a real project. Missing something? It's open source, so you can shape it:{" "}
        <a href={REPO_URL}>contributions are welcome</a>.
      </>
    ),
  },
]

const ORBIT_URL = "https://polar.sh/blog/orbit-llm-safe-design-system"
const PAYPAL_URL = "https://developer.paypal.com/community/blog/stopgivingaimoredocumentation"

// Ends the section that introduces React Native support, while it's unstable.
const REACT_NATIVE_DISCLAIMER = (
  <Disclaimer>
    React Native support is still in the oven, so it's a little underbaked for now. Watch the{" "}
    <a href={REPO_URL}>GitHub repository</a> to know when it's done.
  </Disclaimer>
)

const EVERYONE: Point[] = [
  {
    title: "Figma is the source of truth",
    body: "No Storybook, second catalog or spec docs drifting out of date and costing time to maintain. Components, variants, states and tokens live in Figma and the code comes from it: one place to look, one place to update.",
  },
  {
    title: "Phone apps and web apps, one codebase",
    body: "Built on React Native, so the same components run on iOS, Android and the web, and your design looks and behaves the same on every one of them.",
  },
  {
    title: "Less back-and-forth",
    body: "Designers are usually the only ones who know the unwritten rules of the design system inside out. With guardrails in Figma and in code, those rules become explicit and enforced, resulting in fewer misunderstandings and far less handoff ping-pong.",
  },
  {
    title: "Time back, your call",
    body: "Ready-to-use component code saves hours. Reinvest them in exploring, feedback rounds and polish, all in Figma where everyone can chime in, or simply ship sooner, with less overhead.",
  },
]

const DESIGNERS: Point[] = [
  {
    title: "Tokens are fixed, but primitives are free",
    body: "Colors, fonts and sizes are locked as design tokens; everything else is up to your imagination. There's no rigid component library to wait on or work around: every design is a mix of just a few primitives, endlessly malleable, morphing into anything from a single button to a whole screen.",
  },
  {
    title: "Behavior is built in",
    body: "Auto-layout behavior carries into code, so one design adapts to every screen size: no unique design per resolution, and fewer design smells to catch.",
  },
  {
    title: "Guidance as you go",
    body: "The plugin flags what can't reasonably be built, and how to fix it, in real time. Each issue takes you straight to the offending layer, so there's no searching around, and nothing impossible leaves the file.",
  },
  {
    title: "Primitives become the component",
    body: "Select a frame and the plugin writes the code, tidying up groups, empty wrappers and instances on the way.",
  },
  {
    title: "Your file, your workflow",
    body: "Keep working the way you do: annotate a layer to exclude it from the output, so notes, guides, placeholders and whatever else you want stay in Figma without leaking into the code.",
  },
]

const DEVELOPERS: Point[] = [
  {
    title: "Few pieces, nothing missing",
    body: "A handful of core components cover everything, with clear APIs. Need something new? Write it by hand, no waiting on anyone. Think building blocks: snap them together into inputs, buttons, popovers, tooltips and tables.",
  },
  {
    title: "Reads like the properties panel",
    body: "The JSX says what Figma's properties panel says, in plain words anyone can read, not cryptic shorthands: no decoding a spec, no eyeballing the design into code.",
  },
  {
    title: "Red squiggles & code completion",
    body: "Values that aren't in the design system give you an error in your editor as you type, and every design token shows up in code completion.",
    code: [
      {
        code: `<Text
  fill-primary
  typography-align-left
  typography-body-small-nowrap
  typography-decoration-underline
>
  Computer says no.
</Text>`,
        error: "fill-primary",
      },
    ],
  },
  {
    title: "Easy to review",
    body: "JSX properties name Figma properties, so a design update reads like the design itself, and what changed is clear at a glance.",
    code: [{ code: UPDATE_DIFF, lang: "diff", caption: "Square to squircle, primary to secondary" }],
  },
  {
    title: "An escape hatch, when you need it",
    body: "className is still there for the rare thing the design system doesn't cover. Reaching for it is a deliberate choice, and it stands out in review.",
  },
]

const AGENTS: Point[] = [
  {
    title: "No room to improvise",
    body: "If an agent guesses a value that isn't a token, TypeScript stops it before it ever gets to review.",
  },
  {
    title: "Constraints over instructions",
    body: (
      <>
        The approach is shifting: agents need the design system in a <a href={ORBIT_URL}>form they can't misread</a>,
        not <a href={PAYPAL_URL}>more instructions</a>.
      </>
    ),
  },
  {
    title: "From tweaks to redesigns",
    body: "A tweak is a lookup: every style maps to one prop. A redesign can reshuffle a whole composition, but the component tree mirrors the Figma layers one to one, which makes it straightforward for an agent, with state, handlers and data left in place.",
  },
  {
    title: "Agent work that's easy to review",
    body: "The agent writes in the design's own vocabulary, Figma settings and tokens, so checking its work means checking the design, not deciphering CSS.",
  },
]

export default () => {
  return (
    <>
      <Header />
      <main id="top" className="flex-1 scroll-mt-(--header-height) px-4">
        <div className="mx-auto max-w-page px-6 pt-16 pb-14 max-sm:px-3">
          <h1 className={`${HEADING} sm:max-w-none sm:text-display`}>
            {/* The break after the comma is for wider screens; on phones the title wraps on its own. The explicit
                space keeps "properties, as" apart when the break is hidden. */}
            Your Figma properties, <br className="max-sm:hidden" />
            as code.
          </h1>
          <h2 className={`${PITCH} text-[1.625rem]`}>
            Your design becomes the spec: designers get guardrails, developers get types, your agent can't drift, and
            one codebase powers your app and your website.
          </h2>
          {/* The code and what it renders, side by side where there's room, like the section grids. The preview sits on
              the code's surface, full width at its own aspect ratio, centered in a box as tall as the code. The code
              stops lower than other blocks (38% of the screen, at least 304px), keeping the hero compact. */}
          <div className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(min(100%,24rem),1fr))] gap-x-10 gap-y-8 [&>figure]:mt-0 [&_pre]:max-h-[max(38svh,19rem)]!">
            <CodeBlock code={EXAMPLE} caption="Shapes.tsx" />
            <figure className="flex min-w-0 flex-col">
              <figcaption className="mb-2 px-1 font-mono text-code text-muted text-thin-white dark:text-thin-black">
                On screen
              </figcaption>
              <div className="flex flex-1 items-center justify-center rounded-2xl border border-gray-edge bg-gray p-8 [corner-shape:squircle]">
                <ShapesPreview />
              </div>
            </figure>
          </div>
        </div>

        <Section
          id="everyone"
          audience="Everyone"
          title="One source of truth, from Figma to every screen."
          pitch="Designers, developers and agents share one vocabulary, straight from Figma."
        >
          <Points points={EVERYONE} />
          {REACT_NATIVE_DISCLAIMER}
        </Section>

        <Section
          id="designers"
          audience="Designers"
          title="Design freely. It ships exactly the way you laid it out."
          pitch="Anything you build in Figma, the code mirrors faithfully, property for property."
        >
          <Points points={DESIGNERS} />
        </Section>

        <Section
          id="developers"
          audience="Developers"
          title="Your editor says no before your reviewer has to."
          pitch="Generated from the design and typed against design tokens: no more pixel-pushing."
        >
          <Points points={DEVELOPERS} />
        </Section>

        <Section
          id="agents"
          audience="Agents"
          title="Your coding agent knows your design system."
          pitch={`${PRODUCT_NAME} gives your agent a vocabulary in which only your design system can be written.`}
        >
          <p>
            Without it, AI writes plausible CSS at best: a gap here, a color there. Each one slips through review, and
            the design drifts a little further. Prompt rules get buried as the context fills up, then summarized away; a
            vocabulary doesn't need remembering.
          </p>
          <div>
            <CodeBlock code={BEFORE} caption="An agent's best guess" />
            <CodeBlock code={AFTER} caption="One vocabulary" />
          </div>
          <Points points={AGENTS} />
        </Section>

        <Section
          id="get-started"
          audience="Starters"
          title="From canvas to components in three steps."
          pitch="Designers grab the plugin, developers install the library, and your design does the rest."
        >
          <ol className="list-decimal pl-5 marker:font-extrabold">
            {STEPS.map((step) => (
              <li key={step.title}>
                <h4>{step.title}</h4>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </Section>

        <Section
          id="fine-print"
          title={
            <>
              The <sub>fine</sub> print.
            </>
          }
          pitch="Nothing worth having comes without trade-offs, but these are worth making."
        >
          <Points points={FINE_PRINT} />
        </Section>
      </main>
    </>
  )
}

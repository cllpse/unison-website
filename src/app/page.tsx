import CodeBlock from "../components/CodeBlock"
import Disclaimer from "../components/Disclaimer"
import Header from "../components/Header"
import Points, { type Point } from "../components/Points"
import Section, { HEADING, PITCH } from "../components/Section"
import { PRODUCT_NAME, REPO_URL } from "../constants/site"

const EXAMPLE = `<Frame
  flow-vertical
  gap-4
  padding-6
  corner-radius-4
  fill-white
  effect-shadow-small
  width-fill
>
  <Text typography-header-small-wrap fill-text-800>
    Invoices
  </Text>
  <Text typography-body-wrap fill-neutral-600>
    Three invoices are due this week.
  </Text>
  <Frame
    flow-horizontal
    padding-vertical-2
    padding-horizontal-4
    alignment-center
    corner-radius-full
    fill-primary-700
    fill-hover-primary-800
    onPress={openInvoices}
  >
    <Text typography-label-nowrap fill-white>
      Review invoices
    </Text>
  </Frame>
</Frame>`

const BEFORE = `// Card.tsx, as an agent writes it from the spec
// Plausible values, but are these the designer's tokens?
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

const AFTER = `// Card.tsx, in Figma's vocabulary; only your tokens compile
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

const STEPS = [
  { title: "Install the plugin", body: "Run it in Design or Dev Mode." },
  { title: "Select a frame", body: "Fix anything the linter flags." },
  { title: "Paste the code", body: "Into your web or React Native app, or hand it to your agent." },
]

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

// Ends every section that mentions React Native, while its support is unstable.
const REACT_NATIVE_DISCLAIMER = (
  <Disclaimer label="Heads up">
    React Native support is unstable for now, so expect rough edges. Watch the <a href={REPO_URL}>GitHub repository</a>{" "}
    to stay in the loop.
  </Disclaimer>
)

const EVERYONE: Point[] = [
  {
    title: "Figma is the source of truth",
    body: "No Storybook, no second component catalog and no spec docs drifting out of date. Components, variants, states and tokens live in the Figma file and the code is generated from it, so there's one place to look and one place to update when the design moves.",
  },
  {
    title: "Phone apps & web apps, one codebase",
    body: "Built on React Native, so the same components run on iOS, Android and the web, and your design looks and behaves the same on every one of them.",
  },
  {
    title: "Less back-and-forth",
    body: "Designers are usually the only ones who know the unwritten rules of the design system inside out. With guardrails in Figma and in code, those rules become explicit and enforced, resulting in far less handoff ping-pong and fewer misunderstandings.",
  },
  {
    title: "More time in design land",
    body: "Generating ready-to-use component code frees up time for design, feedback rounds and polish, all in Figma, where everyone can chime in, instead of in pull requests and half-built features only a few people ever look at.",
  },
]

const DESIGNERS: Point[] = [
  {
    title: "Tokens fixed, Figma primitives free",
    body: "Colors, fonts and sizes are locked as design tokens; everything else is fair game. There's no rigid component library to wait on or work around: every design is a mix of just a few primitives, endlessly malleable, morphing into anything from a single button to a whole screen.",
  },
  {
    title: "Guidance & errors as you go",
    body: "The plugin flags what can't reasonably be built and how to fix it. Each issue takes you straight to the offending layer, so there's no searching around, and nothing impossible leaves the file.",
  },
  {
    title: "Primitives become the component",
    body: "Select a frame and the plugin writes the code, tidying up groups, empty wrappers and instances on the way.",
    code: [{ code: PLUGIN_OUTPUT, caption: "Plugin output" }],
  },
  {
    title: "Behavior built in",
    body: "Auto-layout behavior carries into code, so one design adapts to every screen size: no unique design per resolution, and fewer design smells to catch.",
  },
]

const DEVELOPERS: Point[] = [
  {
    title: "Red squiggles, not review comments",
    body: "Values that aren't in the design system give you an error in your editor as you type, and every design token shows up in code completion.",
    code: [
      {
        code: `<Frame flow-vertical gap-9 fill-primary-100 />`,
        error: "gap-9",
      },
    ],
  },
  {
    title: "Reads like the properties panel",
    body: "The JSX says what Figma's properties panel says, so you never decode a spec.",
    code: [{ code: `<Text typography-body-wrap fill-text-800>\n  Hello\n</Text>` }],
  },
  {
    title: "Easy to review",
    body: "JSX properties name Figma properties, so a design update reads like the design itself, and what changed is clear at a glance.",
    code: [{ code: UPDATE_DIFF, lang: "diff", caption: "Gap 16 to 24, fill primary to secondary" }],
  },
  {
    title: "Few pieces, nothing missing",
    body: "A handful of core components cover everything; your own inputs, buttons, popovers, tooltips and tables are built from them.",
  },
]

const AGENTS: Point[] = [
  {
    title: "No room to improvise",
    body: "If an agent guesses a value that isn't a token, TypeScript stops it before anyone reviews it.",
  },
  {
    title: "Output reads like the design",
    body: "Every prop is a Figma setting and every value a token, so you review the design, not the CSS.",
  },
  {
    title: "Ports & redesigns, handled",
    body: "Porting is a lookup: every style maps to exactly one prop. Design changes go deeper, sometimes reshuffling a whole composition, but the component tree mirrors the Figma layers one to one, so an agent can line the new frame up against the existing code and restructure it, keeping your state, handlers and data where they are.",
  },
  {
    title: "The same bet as Polar's Orbit",
    body: (
      <>
        Polar built an <a href={ORBIT_URL}>LLM-safe design system</a> on the same idea: props that only accept tokens.
        Ours uses Figma's own vocabulary, so your designers can read it too.
      </>
    ),
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
          <h2 className={PITCH}>
            Your Figma file becomes the spec: designers get guardrails, developers get types, your agent can't drift,
            and one codebase powers your app and your website.
          </h2>
          <CodeBlock code={EXAMPLE} caption="Card.tsx" />
        </div>

        <Section
          id="everyone"
          audience="Everyone"
          title="One source of truth, from Figma to every screen."
          pitch="Designers, developers and agents share one vocabulary, straight from the Figma file."
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
          title="Your editor catches it before review does."
          pitch="Typed against your tokens and generated from the design, so you write logic, not layout."
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
            Without it, AI writes plausible CSS at best: a gap here, a purple-50 there. This can slip through review,
            and the product drifts. Prompt rules only help until the model forgets them; a vocabulary doesn't need
            remembering.
          </p>
          <div>
            <CodeBlock code={BEFORE} caption="Before: an agent's best guess" />
            <CodeBlock code={AFTER} caption="After: one vocabulary" />
          </div>
          <Points points={AGENTS} />
        </Section>

        <Section
          id="get-started"
          audience="Starters"
          title="From canvas to component in three steps."
          pitch="All you need is a Figma file that uses variables and text styles."
        >
          <ol className="list-decimal pl-5 marker:font-extrabold">
            {STEPS.map((step) => (
              <li key={step.title}>
                <h4>{step.title}</h4>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
          {REACT_NATIVE_DISCLAIMER}
        </Section>
      </main>
    </>
  )
}

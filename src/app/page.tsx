import CodeBlock from "../components/CodeBlock"
import Disclaimer from "../components/Disclaimer"
import Header from "../components/Header"
import Points, { type Point } from "../components/Points"
import Section, { HEADING, PITCH } from "../components/Section"
import ShapesPreview from "../components/ShapesPreview"
import { PLUGIN_URL, REPO_URL } from "../constants/site"

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
    <Text fill-primary-700 typography-align-left>
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
    <Text fill-secondary-700 typography-align-left>
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
    <Text fill-tertiary-700 typography-align-left>
      circle
    </Text>
  </Frame>
</Frame>`

const BEFORE = `/**
 * @file Card.tsx, as an agent writes it from the spec
 * @todo Plausible values, but are these valid design tokens?
 */

<div className="
  bg-purple-50
  flex
  gap-4
  px-6
  py-5
  rounded-xl
">`

const AFTER = `/**
 * @file Card.tsx, in Figma's vocabulary
 * @satisfies Design tokens, fully
 */

<Frame
  corner-radius-3
  fill-primary-50
  flow-horizontal
  gap-4
  padding-horizontal-6
  padding-vertical-5
>`

const STARTING_POINTS: Point[] = [
  {
    title: "Designers",
    body: (
      <>
        Install the{" "}
        <a href={PLUGIN_URL} target="_blank" rel="noreferrer">
          Figma plugin
        </a>
        , from the Figma Community.
      </>
    ),
  },
  {
    title: "Developers",
    body: (
      <>
        Clone the{" "}
        <a href={REPO_URL} target="_blank" rel="noreferrer">
          library on GitHub
        </a>
        , open source and ready to use.
      </>
    ),
  },
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
    body: "Designers work with a subset of Figma: the primitives and features that translate faithfully into code. Some tools stay on the shelf, so that everything drawn ships exactly as drawn.",
  },
  {
    title: "Developers give a little",
    body: "Developers stop hand-writing CSS, and with it some of the fine-tuning they might enjoy. The layout comes from the design; the craft goes into logic, state and the interactions that make it feel right.",
  },
  {
    title: "Everyone gets a lot",
    body: "Design and code stay aligned, agents stay on brand, and features ship faster, from one source of truth to every screen. Fewer misunderstandings, less handoff ping-pong, more time for the work that matters.",
  },
  {
    title: "Worth a try",
    body: (
      <>
        It's best judged on a real project, with an open mind. Anything missing? It's open source and open to change:{" "}
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
    React Native support is still in the oven, so it's a little underbaked for now. The{" "}
    <a href={REPO_URL}>GitHub repository</a> will say when it's done.
  </Disclaimer>
)

const EVERYONE: Point[] = [
  {
    title: "Figma is the source of truth",
    body: "No Storybook, second catalog or handoff documentation drifting out of date and costing time to maintain. Components, variants, states and tokens live in Figma, and the code is generated from there: one place to look, one place to update.",
  },
  {
    title: "Less back-and-forth",
    body: [
      "Only designers know the design system inside out. But guardrails in Figma and in code make its rules explicit and enforced: fewer misunderstandings, far less handoff ping-pong.",
      "Agents follow the same rules, which makes reviewing their work quicker and easier.",
    ],
  },
  {
    title: "Phone apps and web apps, one codebase",
    body: "Built on React Native: one set of components runs on iOS, Android and the web, and looks and behaves the same everywhere.",
  },
  {
    title: "Time back, spent wisely",
    column: "left",
    body: [
      "Ready-to-use component code saves hours of implementation. Spend more time exploring, on feedback rounds and on polish, all in Figma where everyone can chime in.",
      "…or simply ship sooner, with fewer hoops to jump through.",
    ],
  },
]

const DESIGNERS: Point[] = [
  {
    title: "Tokens are fixed, but primitives are free",
    body: (
      <>
        Colors, fonts and sizes are locked as design tokens; everything else is your call. There is no rigid component
        library to wait on or work around: every design is a mix of just{" "}
        <abbr title="Frame, Text and Vector">a few primitives</abbr>, shaped into anything from a single button to a
        whole screen.
      </>
    ),
  },
  {
    title: "Behavior is built in",
    body: "Auto-layout behavior carries into code, so one design adapts to every screen size: no more mockups for each resolution your app supports, and fewer design smells to catch.",
  },
  {
    title: "Guidance as you go",
    body: "The plugin flags what can't reasonably be built, and how to fix it, in real time. Each issue takes you straight to the offending layer, so there's no searching around.",
  },
  {
    title: "Your file, your workflow",
    body: "Keep working the way you do: annotate a layer to exclude it from the output, so notes, guides, placeholders and whatever else you want stay in Figma without leaking into the code.",
  },
  {
    title: "Primitives become the component",
    body: "Select a frame and the plugin writes the code, tidying up groups, empty wrappers and instances on the way.",
  },
]

const DEVELOPERS: Point[] = [
  {
    title: "Few pieces, endless combinations",
    body: [
      "A handful of primitives cover nearly everything, with clear APIs. Need something new? Build it yourself from the same pieces, no waiting on anyone.",
      <>
        …think LEGO<sup>®</sup> bricks: snap them together into buttons, cards, tabs and lists.
      </>,
    ],
  },
  {
    title: "Red squiggles and code completion",
    body: "Values that aren't in the design system give you an error in your editor as you type, and every design token shows up in code completion.",
    code: [
      {
        code: `<Text fill-primary typography-body-small-nowrap>
  Computer says no.
</Text>`,
        error: "fill-primary",
      },
    ],
  },
  {
    title: "Easy to review",
    body: "A design update is a diff of Figma properties, so what changed is clear at a glance.",
    code: [{ code: UPDATE_DIFF, lang: "diff", caption: "Square to squircle, primary to secondary" }],
  },
  {
    title: "Reads like the properties panel",
    body: "The JSX says what Figma's properties panel says, in plain words anyone can read, not cryptic shorthands: no decoding a spec, no eyeballing the design into code.",
  },
  {
    title: "An escape hatch, when you need it",
    column: "right",
    body: (
      <>
        {/* Set like a code block in miniature: its font, thinning, surface and corners, with no border, scaled to sit
            in the line without changing its height, and in the code's property blue, since className is a property. */}
        <span className="code-colors rounded-sm bg-[rgb(0_0_0/4%)] px-1 dark:bg-gray font-mono text-[0.85em] text-(--code-property) text-thin-gray">
          className
        </span>{" "}
        is still there for the rare thing the design system doesn't cover. Reaching for it is a deliberate choice, and
        it stands out in review.
      </>
    ),
  },
]

const AGENTS: Point[] = [
  {
    title: "Constraints over instructions",
    body: (
      <>
        Agents need the design system in a <a href={ORBIT_URL}>form they can't misread</a>, not{" "}
        <a href={PAYPAL_URL}>more instructions</a>. If an agent guesses a value that isn't a token, TypeScript stops it
        before it ever gets to review.
      </>
    ),
  },
  {
    title: "From tweaks to redesigns",
    body: "A tweak is a lookup: every style maps to one prop. A redesign can reshuffle a whole composition, but the component tree mirrors the Figma layers, so an agent can rework the layout and leave state, handlers and data in place.",
  },
  {
    title: "Agent work that's easy to review",
    body: "The agent writes in Figma properties and tokens, so checking its work means checking the design, not deciphering CSS.",
  },
]

export default () => {
  return (
    <>
      <Header />
      <main id="top" className="flex-1 scroll-mt-(--header-height) px-4">
        <div className="mx-auto max-w-page px-6 pt-16 pb-14 max-sm:px-3">
          {/* On phones a touch over heading size (48px against 46), behind a breakpoint so it wins over the size
              HEADING sets. */}
          <h1
            className={`${HEADING} max-sm:text-[length:calc(var(--text-heading)*1.05)] sm:max-w-none sm:text-display`}
          >
            {/* The break after the comma is for wider screens; on phones the title wraps on its own. The explicit
                space keeps "properties, as" apart when the break is hidden. */}
            Figma properties, <br className="max-sm:hidden" />
            as code.
          </h1>
          {/* Sized to the title: on phones 0.66 of it (about 32px), as the section pitches are of their headings; on
              wider screens half the 70px title. Its width is the pitches' 700px measure. */}
          <h2
            className={`${PITCH} text-[length:calc(var(--text-heading)*1.05*0.66)] sm:text-[length:calc(var(--text-display)/2)]`}
          >
            The design becomes the spec: designers get guardrails, developers get types, agents stay in bounds, and one
            codebase powers apps and websites alike.
          </h2>
          {/* The code and what it renders, side by side where there's room, like the section grids. The preview sits
              right on the page, full width at its own aspect ratio, centered in a box as tall as the code. The code
              stops lower than other blocks (38% of the screen, at least 304px), keeping the hero compact. */}
          <div className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(min(100%,24rem),1fr))] gap-x-10 gap-y-8 [&>figure]:mt-0 [&_pre]:max-h-[max(38svh,19rem)]!">
            <CodeBlock code={EXAMPLE} wide pattern />
            <figure className="flex min-w-0 flex-col">
              <div className="flex flex-1 items-center justify-center">
                <ShapesPreview />
              </div>
            </figure>
          </div>
        </div>

        <Section
          id="everyone"
          audience="Everyone"
          title="One source of truth runs from Figma to every screen."
          pitch="Designers, developers and agents share one vocabulary: Figma's."
        >
          <Points points={EVERYONE} />
          {REACT_NATIVE_DISCLAIMER}
        </Section>

        <Section
          id="designers"
          audience="Designers"
          title="Design freely. It ships exactly the way you composed it."
          pitch="Anything you build in Figma, the code mirrors faithfully, property for property."
        >
          <Points points={DESIGNERS} />
        </Section>

        <Section
          id="developers"
          audience="Developers"
          title="Your editor says no before a reviewer has to."
          pitch="Generated from the design and typed against design tokens: no more pixel-pushing."
        >
          <Points points={DEVELOPERS} />
        </Section>

        <Section
          id="agents"
          audience="Agents"
          title="Your coding agent knows your design system."
          pitch="The library gives your agent a vocabulary in which only your design system can be written."
        >
          <p>
            Without it, AI writes plausible CSS at best: a gap here, a color there. Each one has a chance to slip
            through review and pull the design a little further off course. Prompt rules get buried as the context fills
            up, then summarized away, but a vocabulary doesn't need remembering.
          </p>
          <div>
            <CodeBlock code={BEFORE} caption="An agent's best guess" wide />
            <CodeBlock code={AFTER} caption="One vocabulary" wide />
          </div>
          <Points points={AGENTS} />
        </Section>

        <Section
          id="get-started"
          audience="Starters"
          title={
            <>
              {/* The heading's text is transparent, painted by its gradient, so the strikethrough needs a color of
                  its own. */}
              Pick your side, meet in the <s className="decoration-(--accent)">middle</s> magic.
            </>
          }
          pitch="Designers grab the plugin, developers clone the library, and the design does the rest."
        >
          <Points points={STARTING_POINTS} />
        </Section>

        <Section
          id="fine-print"
          title={
            <>
              {/* Tailwind's base styles lower a <sub> with position: relative, and Safari leaves positioned children
                  out of the heading's gradient text (background-clip: text), so "fine" came out invisible. Lowering
                  it with vertical-align instead keeps it in the same text, painted by the gradient. */}
              The <sub className="static align-[-0.25em]">fine</sub> print.
            </>
          }
          pitch="Every approach has trade-offs, and these are worth making."
        >
          <Points points={FINE_PRINT} />
        </Section>
      </main>
    </>
  )
}

import AgentsLabel from "../components/AgentsLabel"
import CodeBlock from "../components/CodeBlock"
import Disclaimer from "../components/Disclaimer"
import Header from "../components/Header"
import PluginWindow from "../components/PluginWindow"
import Points, { type Point } from "../components/Points"
import Section, { HEADING, PITCH } from "../components/Section"
import ShapesPreview from "../components/ShapesPreview"
import {
  LIBRARY_URL,
  PACKAGE_URL,
  PLUGIN_URL,
  REPO_NAME,
  REPO_URL,
  SITE_DESCRIPTION,
  SITE_URL,
} from "../constants/site"

const EXAMPLE = `<Frame
  autolayout-horizontal
  alignment-left
  width-hug
  height-hug
  gap-8
>
  <Frame
    autolayout-vertical
    alignment-bottom-right
    width-28
    height-28
    padding-2
    fill-neutral-50
    stroke-neutral-300
  >
    <Text typography-sm fill-neutral-900>
      shape
    </Text>
  </Frame>

  <Frame
    autolayout-vertical
    alignment-center
    width-20
    height-20
    corner-radius-2xl
    fill-violet-50
    stroke-violet-300
  >
    <Text typography-base fill-violet-600>
      reshape
    </Text>
  </Frame>

  <Frame
    autolayout-vertical
    alignment-center
    padding-2
    corner-radius-full
    fill-fuchsia-50
    stroke-fuchsia-300
  >
    <Vector width-6 height-6 fill-fuchsia-400>
      <Path d="M3 6h1v-2h2v-1h12v1h2v2 {…}" />
    </Vector>
  </Frame>
</Frame>`

const BEFORE = `/**
 * @file Card.tsx, as an agent writes it from the spec
 * @todo Plausible values, but are these
 *       valid design tokens?
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
  autolayout-horizontal
  padding-horizontal-6
  padding-vertical-5
  gap-4
  corner-radius-xl
  fill-violet-50
>`

const STARTING_POINTS: Point[] = [
  {
    title: "Designers",
    body: (
      <>
        Install the <a href={PLUGIN_URL}>Figma plugin</a>, from the Figma Community.
      </>
    ),
  },
  {
    title: "Developers",
    body: (
      <>
        Install the <a href={PACKAGE_URL}>npm package</a>, or clone the <a href={LIBRARY_URL}>library on GitHub</a>,
        open source and ready to use.
      </>
    ),
  },
]

const UPDATE_DIFF = `  <Frame
    autolayout-vertical
    alignment-center
    height-28
+   corner-radius-2xl
-   fill-violet-50
+   fill-fuchsia-50
  >`

const FINE_PRINT: Point[] = [
  {
    title: "Designers give a little",
    body: "Designers work with a subset of Figma: the primitives and features that translate faithfully into code. Some tools stay on the shelf, so that everything drawn ships exactly as drawn.",
  },
  {
    title: "Developers give a little",
    body: "Developers stop hand-writing styles, and with it some of the fine-tuning they might enjoy. The layout comes from the design; the craft goes into logic, state and the interactions that make it feel right.",
  },
  {
    title: "And the team gets a lot",
    body: "Design and code stay aligned, agents stay on brand, and features ship faster, together. Fewer misunderstandings, less handoff ping-pong, more time for the work that matters.",
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

// Ends the starters section: where the plugin, the library and the playgrounds come together.
const TOOLKIT_DISCLAIMER = (
  <Disclaimer>
    Want the whole toolkit in one place? The <a href={REPO_URL}>Unison repository</a> brings the plugin, the library and
    both playgrounds together.
  </Disclaimer>
)

// Ends the section that introduces React Native support, while it's unstable.
const REACT_NATIVE_DISCLAIMER = (
  <Disclaimer>
    React Native support is still experimental. Watch the <a href={REPO_URL}>GitHub repository</a> for updates.
  </Disclaimer>
)

const TEAM: Point[] = [
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
      "Ready-to-use component code saves hours of implementation. Spend more time exploring, on feedback rounds and on polish, all in Figma where the whole team can chime in.",
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
        code: `<Text typography-smol fill-neutral-900>
  Computer says no.
</Text>`,
        error: "typography-smol",
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
    body: "The JSX says what Figma's properties panel says, in plain words anyone on the team can read, not cryptic shorthands: no decoding a spec, no eyeballing the design into code.",
  },
  {
    title: "An escape hatch, when you need it",
    column: "right",
    body: (
      <>
        {/* In the code's font and weight, with no surface, scaled to sit in the line without changing its height, and in
            the code's property blue, since className is a property. */}
        <span className="code-colors font-mono text-[84.375%] font-light [--tracking:normal] text-(--code-property)">
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
    body: "The agent writes in Figma properties and tokens, so checking its work means checking the design, not deciphering Tailwind or worse.",
  },
]

/**
 * Structured data for search engines (schema.org JSON-LD): the library as source code, with its repository. Written
 * into the page as a script that only describes; bake.ts keeps it when it drops the rest.
 */
const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  name: REPO_NAME,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  codeRepository: REPO_URL,
  programmingLanguage: ["TypeScript", "React"],
  runtimePlatform: ["Web", "iOS", "Android"],
  author: { "@type": "Person", name: "cllpse", url: "https://github.com/cllpse" },
}

export default () => {
  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: our own constant, with "<" escaped so it can't close the tag
        dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA).replace(/</g, "\\u003c") }}
      />
      <Header />
      {/* The canvas: the page's content on a faint tint, edge to edge below the header, as the reference sets its pages.
          The sections sit on it as cards. The content is inset half a base size at the sides, 2 above the hero and
          below the last card; from 64em, the reference's 3 at the sides, above and below. Below 64em the hero's title
          and subtitle are inset by the cards' padding too, so they line up with the sections' content; its pictures
          keep to the page's own inset. */}
      <main
        id="top"
        className="flex-1 scroll-mt-(--header-height) bg-canvas px-small pb-large lg:px-x-large lg:pb-x-large"
      >
        <div className="mx-auto max-w-page pt-large lg:pt-x-large">
          <h1 className={`${HEADING} max-lg:px-medium`}>Figma properties, as code.</h1>
          <h2 className={`${PITCH} max-lg:px-medium`}>
            The design becomes the spec: designers get guardrails, developers get types, agents stay in bounds, and one
            codebase powers apps and websites alike.
          </h2>
          {/* The plugin's window with the code, and what the code renders, side by side where there's room, like the
              section grids, right on the canvas. Both span their column at their own aspect ratios, the preview
              centered beside the window. */}
          <div className="mt-neutral grid grid-cols-[repeat(auto-fit,minmax(min(100%,24rem),1fr))] items-center gap-x-large gap-y-medium lg:gap-y-neutral">
            <PluginWindow code={EXAMPLE} />
            <div className="min-w-0">
              <ShapesPreview />
            </div>
          </div>
        </div>

        <Section
          id="team"
          audience="The Team"
          title="One source of truth runs from Figma to every screen."
          pitch="The whole team shares one vocabulary: Figma's, from designers to developers to agents."
        >
          <Points points={TEAM} />
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
          audience={<AgentsLabel />}
          title="Your coding agent knows your design system."
          pitch="The library gives your agent a vocabulary in which only your design system can be written."
        >
          <p>
            Without it, AI writes plausible CSS at best: a gap here, a color there. Each one has a chance to slip
            through review and pull the design a little further off course. Prompt rules get buried as the context fills
            up, then summarized away, but a vocabulary doesn't need remembering.
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
          title={
            <>
              Pick your side, meet in the <s>middle</s> mutual.
            </>
          }
          pitch="Designers grab the plugin, developers clone the library, and the design does the rest."
        >
          <Points points={STARTING_POINTS} />
          {TOOLKIT_DISCLAIMER}
        </Section>

        <Section
          id="fine-print"
          title={
            <>
              The <sub>fine</sub> print.
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

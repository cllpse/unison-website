import AgentsLabel from "../components/AgentsLabel"
import CodeBlock from "../components/CodeBlock"
import Disclaimer from "../components/Disclaimer"
import Header from "../components/Header"
import PluginWindow from "../components/PluginWindow"
import Points, { type Point } from "../components/Points"
import ProofLink from "../components/ProofLink"
import Section, { HEADING, PITCH } from "../components/Section"
import ShapesPreview from "../components/ShapesPreview"
import {
  EXPO_PLAYGROUND_URL,
  LIBRARY_URL,
  PACKAGE_URL,
  PLUGIN_URL,
  REPO_NAME,
  REPO_URL,
  SITE_DESCRIPTION,
  SITE_URL,
  WEB_PLAYGROUND_URL,
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
    <Text
      typography-sm
      fill-neutral-900
    >
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
    <Text
      typography-base
      fill-violet-600
    >
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
    <Vector
      width-6
      height-6
      fill-fuchsia-400
    >
      <Path d="M3 6h1v-2h2v-1h12v1h…" />
    </Vector>
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
        Install the <a href={PLUGIN_URL}>Figma plugin</a> from the Figma Community.
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
  {
    title: "Try it first",
    body: (
      <>
        Take it for a spin before installing anything: the <a href={WEB_PLAYGROUND_URL}>web playground</a> and the{" "}
        <a href={EXPO_PLAYGROUND_URL}>Expo playground</a> show the library running in a browser and on a phone.
      </>
    ),
  },
]

const MOTION_SAMPLE = `<Frame
  fill-blue-500
  transition-colors
  transition-duration-200
  transition-easing-out
/>

<Frame
  width-8
  height-8
  corner-radius-sm
  fill-violet-600
  tailwind-animate-spin
/>`

// The one prompt the proof pages were built from, as it was sent (the Google address shortened to its query).
const PROOF_PROMPT = `Try one-shotting a few websites using ONLY the component library. Implement these as stand-alone pages in the web playground. Implement images and videos as blank frames with a background color. The URLs are: https://ui.shadcn.com/, https://www.reddit.com/r/artificial/, and https://www.google.com/search?q=Puppies`

// The one commit in the web playground that added the three pages, exactly as the agent wrote them.
const PROOF_COMMIT_URL =
  "https://github.com/cllpse/unison-playground-web/commit/adbcbfe0aacc3490880102c0a8c85df7650c8b02"

// The rebuilt pages, baked from the web playground and published next to this page in one-shot/ (scripts/deploy.ts).
const SHADCN_PAGE_URL = "one-shot/shadcn/"
const REDDIT_PAGE_URL = "one-shot/reddit/"
const GOOGLE_PAGE_URL = "one-shot/google/"

// The pages they were built from, which keep changing, so they'll drift apart from the one-shots over time.
const SHADCN_ORIGINAL_URL = "https://ui.shadcn.com/"
const REDDIT_ORIGINAL_URL = "https://www.reddit.com/r/artificial/"
const GOOGLE_ORIGINAL_URL = "https://www.google.com/search?q=Puppies"

const PROOF_PAGES: Point[] = [
  {
    title: "shadcn/ui",
    body: (
      <>
        The homepage of the component library everyone knows, rebuilt in Frames and Text. See{" "}
        <a href={SHADCN_PAGE_URL}>the one-shot</a> and <a href={SHADCN_ORIGINAL_URL}>the original</a>.
      </>
    ),
  },
  {
    title: "r/artificial",
    body: (
      <>
        A busy Reddit feed, with its posts, votes and sidebar. See <a href={REDDIT_PAGE_URL}>the one-shot</a> and{" "}
        <a href={REDDIT_ORIGINAL_URL}>the original</a>.
      </>
    ),
  },
  {
    title: "Google, for Puppies",
    body: (
      <>
        A search results page, images and all. See <a href={GOOGLE_PAGE_URL}>the one-shot</a> and{" "}
        <a href={GOOGLE_ORIGINAL_URL}>the original</a>.
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

const UNIWIND_URL = "https://uniwind.dev"
const NATIVEWIND_URL = "https://www.nativewind.dev"
const ORBIT_URL = "https://polar.sh/blog/orbit-llm-safe-design-system"
const PAYPAL_URL = "https://developer.paypal.com/community/blog/stopgivingaimoredocumentation"

// Ends the starters section: where the plugin, the library and the playgrounds come together.
const TOOLKIT_DISCLAIMER = (
  <Disclaimer>
    Want the whole toolkit in one place? The <a href={REPO_URL}>Unison repository</a> brings the plugin, the library and
    both playgrounds together.
  </Disclaimer>
)

// Ends the developers section: where to see the library wired up.
const PLAYGROUNDS_DISCLAIMER = (
  <Disclaimer>
    Setting it up? The <a href={WEB_PLAYGROUND_URL}>web playground</a> and the{" "}
    <a href={EXPO_PLAYGROUND_URL}>Expo playground</a> are reference implementations for websites and for apps.
  </Disclaimer>
)

// Ends the proof section: what the agent added beyond the prompt, as the transcript and the pages show.
const EXTRAS_DISCLAIMER = (
  <Disclaimer>
    {/* A reaction GIF above the text, at a third of its 220px size, clipped 1px in on every side so its own edge
        pixels don't show, with the proof badges' rounded corners (ProofLink.tsx) and tilted twice as far as they are;
        it holds still on its first frame for anyone who prefers reduced motion. */}
    <picture className="mx-auto mb-small block w-fit">
      <source srcSet="mindblown-still.png" media="(prefers-reduced-motion: reduce)" />
      <img
        src="mindblown.gif"
        alt="Tim and Eric, mind blown"
        width={220}
        height={220}
        loading="lazy"
        className="block size-[calc(220px/3)] -rotate-[1.5deg] [clip-path:inset(1px_round_var(--radius-sm))]"
      />
    </picture>
    Nobody asked for them, but the agent added hover states and animations to all three pages on its own. Each page also
    has a dark mode, which came for free: the library's colors come in light and dark.
  </Disclaimer>
)

// Ends the first section while Unison is in beta.
const BETA_DISCLAIMER = (
  <Disclaimer>
    Unison is still in beta, so you may run into the occasional error. Have you found one, or do you want to help shape
    it? <a href={REPO_URL}>Get involved on GitHub</a>.
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
    title: "One set of tokens, both sides",
    body: "The same tokens feed Figma and code alike: the plugin imports the design tokens as variables, text styles and shadow styles, and the components are generated from them, along with the motion tokens for easings, durations and animations.",
  },
  {
    title: "Phone apps and web apps, one codebase",
    column: "left",
    body: "Built on React Native: one set of components runs on iOS, Android and the web, and looks and behaves the same everywhere.",
  },
  {
    title: "Motion, from one source",
    column: "left",
    body: "Easings, durations and animations live in one motion tokens file next to the design tokens, so every hover and transition moves at the same pace across the product.",
  },
  {
    title: "Time back, spent wisely",
    column: "right",
    body: [
      "Ready-to-use component code saves hours of implementation. Spend more time exploring, on feedback rounds and on polish, all in Figma where the whole team can chime in.",
      "…or simply ship sooner, with fewer hoops to jump through.",
    ],
  },
]

const DESIGNERS: Point[] = [
  {
    title: "Tokens are fixed, but primitives are free",
    column: "left",
    body: (
      <>
        Colors, fonts and sizes are locked as design tokens; everything else is your call. There is no rigid component
        library to wait on or work around: every design is a mix of just{" "}
        <abbr title="Frame, Text and Vector">a few primitives</abbr>, shaped into anything from a single button to{" "}
        <ProofLink>a whole page</ProofLink>.
      </>
    ),
  },
  {
    title: "Guidance as you go",
    column: "right",
    body: "The plugin flags what can't reasonably be built, and how to fix it, in real time. Each issue takes you straight to the offending layer, so there's no searching around.",
  },
  {
    title: "Primitives become the component",
    column: "right",
    body: "Select a frame and the plugin writes the code, tidying up groups, empty wrappers and instances on the way.",
  },
  {
    title: "Light and dark, from one design",
    column: "right",
    body: "Colors come from Figma's Light and Dark variable modes, so the dark theme ships with no extra work.",
  },
  {
    title: "Behavior is built in",
    column: "left",
    body: "Auto-layout behavior carries into code, so one design adapts to every screen size: no more mockups for each resolution your app supports, and fewer design smells to catch.",
  },
  {
    title: "Your file, your workflow",
    column: "right",
    body: "Keep working the way you do: annotate a layer to exclude it from the output, so notes, guides, placeholders and whatever else you want stay in Figma without leaking into the code.",
  },
  {
    title: "Motion by name",
    column: "left",
    body: [
      "Motion is a capability of the components, not something to wire up in Figma, so there are no prototype connections to keep in sync with the code.",
      "Speeds and easings are a short list of named tokens, set in one file just like the design tokens, so changing how things move is a single edit. A spec that says 200ms, ease out means exactly one thing in code, and on the web it respects reduced-motion settings.",
    ],
  },
]

const DEVELOPERS: Point[] = [
  {
    title: "Red squiggles and code completion",
    column: "left",
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
    title: "Typed motion on every platform",
    column: "right",
    body: [
      "Transitions, easings and animations are flags too, typed against the motion tokens. On the web they're Tailwind classes that honor reduced motion.",
      "On iOS and Android you're free to choose: NativeWind, or Uniwind with one import that runs them through Reanimated, so animations don't require Uniwind Pro.",
    ],
    code: [{ code: MOTION_SAMPLE, caption: "A color that eases, and a spinner" }],
  },
  {
    title: "Reads like the properties panel",
    column: "right",
    body: "The JSX says what Figma's properties panel says, in plain words anyone on the team can read, not cryptic shorthands: no decoding a spec, no eyeballing the design into code.",
  },
  {
    title: "Few pieces, endless combinations",
    column: "right",
    body: [
      "A handful of primitives cover nearly everything, with clear APIs. Need something new? Build it yourself from the same pieces, no waiting on anyone.",
      <>
        …think LEGO<sup>®</sup> bricks: snap them together into buttons, cards, tabs and lists, or{" "}
        <ProofLink tilt="clockwise">whole pages</ProofLink>.
      </>,
    ],
  },
  {
    title: "Easy to review",
    column: "left",
    body: "A design update is a diff of Figma properties, so what changed is clear at a glance.",
    code: [{ code: UPDATE_DIFF, lang: "diff", caption: "Square to squircle, primary to secondary" }],
  },
  {
    title: "Plain Tailwind, web and native",
    column: "left",
    body: (
      <>
        Components emit plain Tailwind classes, never inline styles. On the web they fit right into an existing Tailwind
        setup; on iOS and Android, <a href={UNIWIND_URL}>Uniwind</a> or <a href={NATIVEWIND_URL}>NativeWind</a> turns
        the same classes into native styles, so one styling setup covers every platform.
      </>
    ),
  },
  {
    title: "Straight from Dev Mode",
    column: "left",
    body: "The plugin runs in Dev Mode too, so developers can select a frame and copy its code without edit access to the file.",
  },
  {
    title: "Token changes, caught everywhere",
    column: "left",
    body: "Rename or remove a design token and every place still using it becomes a type error, so nothing drifts out of sync unnoticed.",
  },
  {
    title: "An escape hatch, when you need it",
    column: "right",
    body: (
      <>
        {/* In the code's font and weight, on the code blocks' surface (the shade at 3% inside a 1px line, square),
            scaled to sit in the line, and in the code's property blue, since className is a property. Padding and line
            on an inline element don't change the line's height. */}
        <span className="code-colors border border-black/7.5 bg-shade/3 px-[0.3em] py-[0.1em] font-mono text-[84.375%] font-light [--tracking:normal] text-(--code-property) dark:border-black/45">
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
      {/* The canvas: the page's content on a faint tint, edge to edge below the header.
          The sections sit on it as cards. The content is inset half a base size at the sides, 2 above the hero and
          below the last card, and the hero a sixth of a base size further at the sides; from 64em, 3 at
          the sides, above and below. The hero's title and subtitle are 25% larger than the sections'
          (the heading and pitch sizes times 1.25), and
          the spacing between them and down to the pictures grows with them; their line heights, letter spacing and
          trims are relative already. */}
      <main
        id="top"
        className="flex-1 scroll-mt-(--header-height) bg-canvas px-small pb-large lg:px-x-large lg:pb-x-large"
      >
        <div className="mx-auto max-w-page pt-large max-lg:px-[calc(var(--spacing-medium)/6)] lg:pt-x-large">
          <h1
            className={`${HEADING} text-[length:calc(var(--text-xxx-large)*1.25)]! lg:text-[length:calc(var(--text-xxxx-large)*1.25)]!`}
          >
            Figma properties, as code.
          </h1>
          <h2
            className={`${PITCH} mt-[calc(var(--font-size)*1.25-0.29em)]! text-[length:calc(var(--text-x-large)*1.25)]!`}
          >
            The design becomes the spec: designers get guardrails, developers get types, agents stay in bounds, and one
            codebase powers apps and websites alike.
          </h2>
          {/* The plugin's window with the code, and what the code renders, side by side where there's room, like the
              section grids, right on the canvas. Both span their column at their own aspect ratios, the preview
              centered beside the window. Stacked on phones, they're as far apart as the cards are. */}
          <div className="mt-[calc(var(--spacing-neutral)*1.25)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,24rem),1fr))] items-center gap-x-large gap-y-large lg:gap-y-neutral">
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
          {BETA_DISCLAIMER}
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
          {PLAYGROUNDS_DISCLAIMER}
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
            up, then summarized away, but a vocabulary doesn't need remembering. See what{" "}
            <ProofLink>one short prompt builds</ProofLink>.
          </p>
          <div>
            <CodeBlock code={BEFORE} caption="An agent's best guess" />
            <CodeBlock code={AFTER} caption="One vocabulary" />
          </div>
          <Points points={AGENTS} />
        </Section>

        <Section
          id="proof"
          audience="Skeptics"
          title="Proof over promises."
          pitch="One short prompt and three familiar pages, built by an agent with nothing but the library."
        >
          <p>
            The promise: the components hold up however the code gets written. The proof: no Figma, no plugin, just an
            agent writing straight against the library, from this prompt alone:
          </p>
          <CodeBlock code={PROOF_PROMPT} lang="text" wrap />
          <p>
            Given to Claude Opus 5.5 at medium effort, it built all three pages in about 13 minutes, in{" "}
            <a href="one-shot-session.txt">a single session</a>, with the types and lint passing. Everything it wrote is
            in <a href={PROOF_COMMIT_URL}>one commit</a>.
          </p>
          <Points points={PROOF_PAGES} />
          {EXTRAS_DISCLAIMER}
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
              The <sub>fine</sub> <sub>print.</sub>
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

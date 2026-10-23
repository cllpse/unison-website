import { Fragment, type ReactNode } from "react"
import AgentsLabel from "../components/AgentsLabel"
import CodeBlock from "../components/CodeBlock"
import CodePopover from "../components/CodePopover"
import Disclaimer from "../components/Disclaimer"
import Footer from "../components/Footer"
import Header from "../components/Header"
import PluginWindow from "../components/PluginWindow"
import Points, { type Point } from "../components/Points"
import ProofLink from "../components/ProofLink"
import Section, { HEADING, PITCH } from "../components/Section"
import ShapesPreview from "../components/ShapesPreview"
import TldrCard from "../components/TldrCard"
import { ONE_SHOT_PAGES, ONE_SHOTS, type OneShotPage } from "../constants/oneShots"
import {
  EXPO_PLAYGROUND_URL,
  LIBRARY_URL,
  PACKAGE_URL,
  PLUGIN_URL,
  REPO_NAME,
  REPO_URL,
  SECTION_ACCENTS,
  SITE_DESCRIPTION,
  SITE_URL,
  WEB_PLAYGROUND_URL,
} from "../constants/site"
import { dataUri } from "../utilities/dataUri"

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
      path="M3 6h1v-2h2v-1h12v…"
      viewBox="0 0 32 32"
    />
  </Frame>
</Frame>`

const BEFORE = `/**
 * @file Card.tsx, as an agent writes it from the spec
 * @todo Plausible values, but are these valid design tokens?
 */

<div className="
  flex
  px-6.5
  py-5
  gap-4.5
  rounded-2.5xl
  bg-violent-50
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
        Install the{" "}
        <a href={PLUGIN_URL} target="_blank" rel="noopener">
          Figma plugin
        </a>{" "}
        from the Figma Community.
      </>
    ),
  },
  {
    title: "Developers",
    body: (
      <>
        Install the{" "}
        <a href={PACKAGE_URL} target="_blank" rel="noopener">
          npm package
        </a>
        , or clone the{" "}
        <a href={LIBRARY_URL} target="_blank" rel="noopener">
          library on GitHub
        </a>
        . It's open source.
      </>
    ),
  },
  {
    title: "Try it first",
    body: (
      <>
        Take it for a spin before installing anything: the{" "}
        <a href={WEB_PLAYGROUND_URL} target="_blank" rel="noopener">
          web playground
        </a>{" "}
        and the{" "}
        <a href={EXPO_PLAYGROUND_URL} target="_blank" rel="noopener">
          Expo playground
        </a>{" "}
        show the library running in a browser and on a phone.
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
  animate-spin
/>`

// The one prompt the proof pages were built from, as it was sent (the Google address shortened to its query).
const PROOF_PROMPT = `Try one-shotting a few websites using ONLY the component library. Implement these as stand-alone pages in the web playground. Implement images and videos as blank frames with a background color. The URLs are: https://ui.shadcn.com/, https://www.reddit.com/r/artificial/, and https://www.google.com/search?q=Puppies`

// The pages they were built from, which keep changing, so they'll drift apart from the one-shots over time.
const ORIGINAL_URLS: Record<OneShotPage, string> = {
  shadcn: "https://ui.shadcn.com/",
  reddit: "https://www.reddit.com/r/artificial/",
  google: "https://www.google.com/search?q=Puppies",
}

const PAGE_TITLES: Record<OneShotPage, string> = {
  shadcn: "shadcn/ui",
  reddit: "r/artificial",
  google: "Google",
}

/** "A, B and C", joining a list's items, each a node. */
const joinAnd = (items: ReactNode[]) =>
  items.map((item, index) => (
    // biome-ignore lint/suspicious/noArrayIndexKey: the list is fixed and never reordered.
    <Fragment key={index}>
      {index === 0 ? "" : index === items.length - 1 ? " and " : ", "}
      {item}
    </Fragment>
  ))

/** Links to the three pages, as "shadcn/ui, r/artificial and Google", each at `url(page)`. */
const pageLinks = (url: (page: OneShotPage) => string) =>
  joinAnd(
    ONE_SHOT_PAGES.map((page) => (
      <a key={page} href={url(page)} target="_blank" rel="noopener">
        {PAGE_TITLES[page]}
      </a>
    )),
  )

/**
 * One point per model given the prompt (constants/oneShots.ts), all alike: how it ran and its three pages, plus the
 * session and commit where there are any.
 */
const PROOF_RUNS: Point[] = ONE_SHOTS.map((oneShot) => ({
  title: oneShot.model,
  body: (
    <>
      {oneShot.reasoning ? `At ${oneShot.reasoning} in ${oneShot.harness}` : `In ${oneShot.harness}`}:{" "}
      {pageLinks((page) => `${oneShot.path}${page}/`)}.
      {oneShot.session && oneShot.commit && (
        <>
          {" "}
          See{" "}
          <a href={oneShot.session} target="_blank" rel="noopener">
            the session
          </a>{" "}
          and{" "}
          <a href={oneShot.commit} target="_blank" rel="noopener">
            the commit
          </a>
          .
        </>
      )}
    </>
  ),
}))

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
    title: "1. Designers give a little",
    body: "Designers work with a subset of Figma: the primitives and features that translate faithfully into code. Some tools stay on the shelf, so that everything drawn ships exactly as drawn.",
  },
  {
    title: "2. Developers give a little",
    body: "Developers stop hand-writing styles, and with it some of the fine-tuning they might enjoy. The layout comes from the design; the craft goes into logic, state and the interactions that make it feel right.",
  },
  {
    title: "3. The team gets a lot",
    body: "Design and code stay aligned, agents stay on brand, and features ship together, sooner. The hours saved go to the work that matters.",
  },
  {
    title: "Worth a try",
    body: (
      <>
        It's best judged on a real project, with an open mind. Anything missing? It's open source and open to change:{" "}
        <a href={REPO_URL} target="_blank" rel="noopener">
          contributions are welcome
        </a>
        .
      </>
    ),
  },
]

const UNIWIND_URL = "https://uniwind.dev"
const NATIVEWIND_URL = "https://www.nativewind.dev"
// Designers on the shift toward taste, linked from the Designers intro in this order: Jenny Wen's Hatch keynote "Don't
// Trust the Process" (Berlin, September 2025), Loredana Crisan on the Figma blog (June 2026) and Jenny Wen on Lenny's
// Podcast (March 2026).
const WEN_TALK_URL = "https://www.youtube.com/watch?v=4u94juYwLLM"
const CRISAN_TASTE_URL = "https://www.figma.com/blog/you-never-stop-cultivating-taste/"
const WEN_PODCAST_URL = "https://www.lennysnewsletter.com/p/the-design-process-is-dead"
const ORBIT_URL = "https://polar.sh/blog/orbit-llm-safe-design-system"
const PAYPAL_URL = "https://developer.paypal.com/community/blog/stopgivingaimoredocumentation"

// Ends the starters section: where the plugin, the library and the playgrounds come together.
const TOOLKIT_DISCLAIMER = (
  <Disclaimer>
    Want the whole toolkit in one place? The{" "}
    <a href={REPO_URL} target="_blank" rel="noopener">
      Unison repository
    </a>{" "}
    brings the plugin, the library and both playgrounds together.
  </Disclaimer>
)

// Ends the developers section: where to see the library wired up.
// The web playground's test page, baked and published next to this page in playground/ (scripts/deploy.ts).
const PLAYGROUND_TEST_PAGE_URL = "playground/"

const PLAYGROUNDS_DISCLAIMER = (
  <Disclaimer>
    Setting it up? The{" "}
    <a href={WEB_PLAYGROUND_URL} target="_blank" rel="noopener">
      web playground
    </a>{" "}
    and the{" "}
    <a href={EXPO_PLAYGROUND_URL} target="_blank" rel="noopener">
      Expo playground
    </a>{" "}
    are reference implementations for websites and for apps, and both include{" "}
    <a href={PLAYGROUND_TEST_PAGE_URL} target="_blank" rel="noopener">
      test pages
    </a>{" "}
    that exercise the whole component library.
  </Disclaimer>
)

// Ends the proof section: what the agent added beyond the prompt, as the transcript and the pages show.
const EXTRAS_DISCLAIMER = (
  <Disclaimer>
    {/* A reaction GIF above the text, at a third of its 220px size, clipped 1px in on every side so its own edge
        pixels don't show, with the proof badges' rounded corners (ProofLink.tsx) and tilted twice as far as they are;
        it holds still on its first frame for anyone who prefers reduced motion. Both are inlined: the GIF as an
        animated WebP at one and a half times its shown size (src/assets/mindblown.webp, about 83KB), and its first
        frame. */}
    <picture className="mx-auto mb-small block w-fit">
      <source srcSet={dataUri("src/assets/mindblown-still.webp")} media="(prefers-reduced-motion: reduce)" />
      <img
        src={dataUri("src/assets/mindblown.webp")}
        alt="Tim and Eric, mind blown"
        width={220}
        height={220}
        className="block size-[calc(220px/3)] -rotate-[1.5deg] [clip-path:inset(1px_round_var(--radius-sm))]"
      />
    </picture>
    <p>
      No run asked for hover states, animations or a dark mode. Hover states and animations are flags like any other, so
      agents added them on their own, and since the library's colors come in light and dark, every page here has a dark
      mode.
    </p>
    <p>
      <i className="text-[color-mix(in_oklab,var(--color-ink),var(--color-black))] dark:text-[color-mix(in_oklab,var(--color-ink),#fff)]">
        And that's agents working alone, so it's the floor, not the ceiling. When a real designer composes in Figma and
        Unison carries their work into code, the results are in another league.
      </i>
    </p>
  </Disclaimer>
)

// Ends the first section while Unison is in beta.
const BETA_DISCLAIMER = (
  <Disclaimer>
    Unison is still in beta, so you may run into the occasional error. Found one, or want to help shape it?{" "}
    <a href={REPO_URL} target="_blank" rel="noopener">
      Get involved on GitHub
    </a>
    .
  </Disclaimer>
)

const TEAM: Point[] = [
  {
    title: "Figma is the source of truth",
    body: "No Storybook, second catalog or handoff doc to keep in sync. Layouts, styles and tokens live in Figma, and the code is generated from there: one place to look, one place to update.",
  },
  {
    title: "Less back-and-forth",
    body: [
      "Designers know the design system inside out; nobody else has to. Guardrails in Figma and in code make its rules explicit and enforced: fewer misunderstandings, far less handoff ping-pong.",
      "Agents follow the same rules, which makes their work quicker to review.",
    ],
  },
  {
    title: "One set of tokens, both sides",
    id: "tokens",
    body: [
      "One tokens file feeds both sides: the plugin imports it into Figma as variables, text styles and shadow styles, and the components are generated from it. Motion has a file of its own beside it, for easings, durations and animations.",
      "Change a token once and both sides follow, so design and code never disagree on a color, a size or a speed.",
    ],
  },
  {
    title: "Phone apps and web apps, one codebase",
    column: "left",
    body: "Built on React Native: one set of components runs on iOS, Android and the web, and looks and behaves the same everywhere.",
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
        Colors, spacing, radii, type sizes and shadows are locked as design tokens; everything else is your call. There
        is no rigid component library to wait on or work around: every design is a mix of just a few primitives, shaped
        into anything from a single button to <ProofLink>a whole page</ProofLink>
      </>
    ),
  },
  {
    title: "Guidance as you go",
    column: "right",
    body: "The plugin flags what won't translate, and what the code does instead, as you work. Each issue selects the layer in question, so there's no hunting for it.",
  },
  {
    title: "Primitives become the component",
    column: "right",
    body: "Select a frame and the plugin writes the code, dropping empty wrappers and instance shells on the way.",
  },
  {
    title: "Light and dark, from one design",
    column: "right",
    body: "Colors come from Figma's Light and Dark variable modes, so the dark theme comes along for free.",
  },
  {
    title: "Behavior is built in",
    column: "left",
    body: "Auto layout carries into code, so one design adapts to every screen size: no more mockups for each resolution your app supports.",
  },
  {
    title: "Your file, your workflow",
    column: "right",
    body: (
      <>
        Keep working the way you do: annotate a layer <i className="text-muted">EXCLUDE_FROM_OUTPUT</i> and it stays out
        of the code, so notes, guides, placeholders and whatever else you want stay in Figma.
      </>
    ),
  },
  {
    title: "Motion by name",
    column: "left",
    body: [
      "Motion is a capability of the components, not something to wire up in Figma, so there are no prototype connections to keep in sync with the code.",
      "Speeds and easings are a short list of named tokens in one file, like the design tokens, so changing how things move is a single edit. A spec that says 200ms, ease out means exactly one thing in code, and on the web it respects reduced-motion settings.",
    ],
  },
]

const DEVELOPERS: Point[] = [
  {
    title: "Red squiggles and code completion",
    id: "code-completion",
    column: "left",
    body: "Values that aren't in the design system are an error in your editor as you type, and every design token shows up in code completion. Rename or remove a token and every place still using it turns red too, so nothing drifts out of sync unnoticed.",
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
    id: "properties-panel",
    column: "left",
    body: "The JSX says what Figma's properties panel says, in plain words anyone on the team can read: no decoding a spec, no eyeballing the design into code. A design update is a diff of those properties, so what changed is clear at a glance.",
    code: [{ code: UPDATE_DIFF, lang: "diff", caption: "Square to rounded, violet to fuchsia" }],
  },
  {
    title: "Few pieces, endless combinations",
    column: "right",
    body: [
      <>
        A handful of primitives cover nearly everything, with clear APIs. Like LEGO bricks: snap them together into
        buttons, cards, tabs and lists, or <ProofLink tilt="clockwise">whole pages</ProofLink>
      </>,
      "Need something new? Build it from the same pieces.",
    ],
  },
  {
    title: "Plain Tailwind, web and native",
    column: "left",
    body: (
      <>
        Components emit plain Tailwind classes, never inline styles. On the web they fit right into an existing Tailwind
        setup; on iOS and Android,{" "}
        <a href={UNIWIND_URL} target="_blank" rel="noopener">
          Uniwind
        </a>{" "}
        or{" "}
        <a href={NATIVEWIND_URL} target="_blank" rel="noopener">
          NativeWind
        </a>{" "}
        turns the same classes into native styles, so one styling setup covers every platform.
      </>
    ),
  },
  {
    title: "Straight from Dev Mode",
    column: "left",
    body: "The plugin runs in Dev Mode too, so developers can select a frame and copy its code without edit access to the file.",
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
    id: "constraints",
    body: (
      <>
        Agents need the design system in a{" "}
        <a href={ORBIT_URL} target="_blank" rel="noopener">
          form they can't misread
        </a>
        , not{" "}
        <a href={PAYPAL_URL} target="_blank" rel="noopener">
          more instructions
        </a>
        . If an agent guesses a value that isn't a token, TypeScript stops it before it ever gets to review.
      </>
    ),
  },
  {
    title: "From tweaks to redesigns",
    body: "A tweak is a lookup: every style maps to one prop. A redesign can reshuffle a whole composition, but the component tree mirrors the Figma layers, so an agent can rework the layout and leave state, handlers and data in place.",
  },
  {
    title: "Review the design, not the styles",
    body: "The agent writes in Figma properties and tokens, so checking its work means checking the design, not deciphering Tailwind, or worse: raw CSS.",
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
            codebase powers apps and websites alike.{" "}
            {/* A button that opens the TL;DR card below, styled as the header's "starters" link, at its size and
                weight, in the starters' blue, but with a plain 2px line under it that fades on hover, like the other
                links' lines, a quarter as far below the text as theirs. It's a block a line of the pitch tall (the pitch's size times
                its line height) at the top of the line, so it's centered on the sentence's lines rather than sitting on
                their baseline, and set off by half a space more (the pitch's space is about 0.28 of its size). */}
            <button
              type="button"
              popoverTarget="tldr"
              className={`${SECTION_ACCENTS["get-started"]} inline-block cursor-pointer align-top text-small leading-[calc(var(--text-x-large)*1.25*1.3)] ml-[calc(var(--text-x-large)*1.25*0.28/2)] font-bold text-(--accent) underline decoration-solid decoration-2 decoration-(--accent) underline-offset-[calc((0.12em_-_1px)/4)] [text-underline-position:from-font] transition-[text-decoration-color] duration-116 ease-out hover:decoration-transparent motion-reduce:transition-none`}
            >
              TL;DR
            </button>
          </h2>
          {/* What TL;DR opens: the whole page in three paragraphs, on a floating card in the starters' blue, its
              heading in the blue too. Its links lead to the sections that say more, picking out the
              part that does (data-part) and collapsing the card
              to the top on the way (TldrCard). */}
          <Section id="get-started" popover="tldr" title={<span className="text-(--accent)">TL;DR</span>}>
            <p>
              AI makes one-off UI cheap, so designers no longer need to negotiate every idea into a shared component.
              Their focus shifts from keeping a catalog to{" "}
              <a href="#designers" data-part="taste">
                exercising taste
              </a>
              : composing freely in Figma, with only design tokens locked.
            </p>
            <p>
              Unison makes that safe. Its Figma plugin turns a design into code, property for property. Same design,
              same code, every time. The code is written against a component library that{" "}
              <a href="#developers" data-part="properties-panel">
                speaks Figma's language
              </a>
              : a few primitives, Frame, Text and Vector, with properties named after the panel's own, like auto layout,
              hug and fill.
            </p>
            <p>
              Developers get{" "}
              <a href="#developers" data-part="code-completion">
                typed components
              </a>{" "}
              that accept only those tokens, so their editor flags anything outside the design system before a reviewer
              has to. Agents get{" "}
              <a href="#agents" data-part="constraints">
                the same vocabulary
              </a>
              , one that can only express the design system, so what they write stays in bounds.
            </p>
            <p>
              One codebase runs on iOS, Android and the web.{" "}
              <a href="#team" data-part="tokens">
                One tokens file
              </a>{" "}
              feeds both Figma and the code, so change a color once and both sides follow.
            </p>
          </Section>
          <TldrCard id="tldr" />
          {/* The hero sample, whole, for phones (PluginWindow opens it). */}
          <CodePopover id="hero-code" code={EXAMPLE} />
          {/* The plugin's window with the code, and what the code renders, side by side where there's room, like the
              section grids, right on the canvas. Both span their column at their own aspect ratios, the preview
              centered beside the window. Stacked on phones, they're as far apart as the cards are, with the preview
              first, so the page opens on what the code draws. */}
          <div className="mt-[calc(var(--spacing-neutral)*1.25)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,24rem),1fr))] items-center gap-x-large gap-y-large lg:gap-y-neutral">
            <PluginWindow code={EXAMPLE} codePopover="hero-code" />
            <div className="min-w-0 max-md:order-first">
              <ShapesPreview />
            </div>
          </div>
        </div>

        <Section
          id="team"
          audience="the team"
          title="One source of truth runs from Figma to every screen."
          pitch="The whole team shares one vocabulary: Figma's, from designers to developers to agents."
        >
          <Points points={TEAM} />
          {BETA_DISCLAIMER}
        </Section>

        <Section
          id="designers"
          audience="designers"
          title="Design freely. It ships exactly the way you composed it."
          pitch="Build within the tokens, and the code mirrors the design property for property."
        >
          <p>
            Freely, because the tokens are the only thing locked. Components still have their place, but for reuse, not
            as the way a design gets expressed, so there's no need to get tied down in ever more explicit ones.
          </p>
          <p id="taste">
            With AI making one-off UI cheap, a designer's job moves{" "}
            <a href={WEN_TALK_URL} target="_blank" rel="noopener">
              past the old process
            </a>{" "}
            and toward{" "}
            <a href={CRISAN_TASTE_URL} target="_blank" rel="noopener">
              taste
            </a>
            . A drop-down for a single use case can simply be made:{" "}
            <a href={WEN_PODCAST_URL} target="_blank" rel="noopener">
              no aligning with other designers
            </a>{" "}
            to squeeze it into a shared component, and no waiting on developers to update one. The designer's taste is
            what keeps the design coherent; reuse is a bonus.
          </p>
          <p>
            And with Unison, that's a call made with confidence. Left to AI alone, a design drifts a little with every
            prompt; Unison's output is deterministic, so the same design always produces the same code.
          </p>
          <Points points={DESIGNERS} />
        </Section>

        <Section
          id="developers"
          audience="developers"
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
            Without one, an agent writes plausible CSS at best: a gap here, a color there. Each one has a chance to slip
            through review and pull the design a little further off course. Prompt rules get buried as the context fills
            up, then summarized away, but a vocabulary doesn't need remembering. See what{" "}
            <ProofLink>one short prompt builds</ProofLink>
          </p>
          <div>
            <CodeBlock code={BEFORE} caption="An agent's best guess" />
            <CodeBlock code={AFTER} caption="One vocabulary" />
          </div>
          <Points points={AGENTS} />
        </Section>

        <Section
          id="proof"
          audience="skeptics"
          title="Proof over promises."
          pitch="One short prompt and three familiar pages, built by an agent with nothing but the library."
        >
          <p>
            The promise: the components hold up however the code gets written.{" "}
            <i className="text-[color-mix(in_oklab,var(--color-ink),var(--color-black))] dark:text-[color-mix(in_oklab,var(--color-ink),#fff)]">
              The proof, in the hardest case:
            </i>{" "}
            no Figma, no plugin, no designer, just an agent writing straight against the library, from this prompt
            alone:
          </p>
          <CodeBlock code={PROOF_PROMPT} lang="text" wrap />
          <p>Each model built all three pages from it. Compare them with {pageLinks((page) => ORIGINAL_URLS[page])}.</p>
          <Points points={PROOF_RUNS} />
          {EXTRAS_DISCLAIMER}
        </Section>

        <Section
          id="get-started"
          audience="starters"
          title={
            <>
              Pick your side, meet in the <s>middle</s> mutual.
            </>
          }
          pitch="Designers grab the plugin, developers install the library, and the design does the rest."
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

        <Footer />
      </main>
    </>
  )
}

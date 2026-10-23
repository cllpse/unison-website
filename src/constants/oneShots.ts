/** The three pages every one-shot rebuilds, each published as a folder of that name under the model's path. */
export const ONE_SHOT_PAGES = ["shadcn", "reddit", "google"] as const

export type OneShotPage = (typeof ONE_SHOT_PAGES)[number]

export type OneShot = {
  /** The agent harness the model ran in. */
  harness: string
  /** The model's name as the page shows it, and its id as the harness names it. */
  model: string
  modelId: string
  /**
   * How hard it was told to think, in the harness's own terms ("medium effort", "high thinking"); left out for models
   * that don't think.
   */
  reasoning?: string
  /** Where its pages are published, relative to the landing page, with a trailing slash. */
  path: string
  /**
   * The folder in this repository holding its pages, already baked (a static export served from /unison/<path>),
   * when they were built outside the web playground; left out for the playground's own pages, which the deploy bakes.
   */
  baked?: string
  /** The session that built the pages, as text published next to the landing page. */
  session?: string
  /** The commit that added the pages, exactly as the agent wrote them. */
  commit?: string
}

/**
 * Every model given the proof prompt, the first being the one the proof section leads with. Adding a model is one more
 * entry here, with its pages baked into one-shot/<model>/ (scripts/deploy.ts publishes them).
 */
export const ONE_SHOTS: OneShot[] = [
  {
    harness: "Claude Code",
    model: "Claude Opus 5.5",
    modelId: "claude-opus-5-5",
    reasoning: "medium effort",
    path: "one-shot/",
    session: "one-shot-session.txt",
    commit: "https://github.com/cllpse/unison-playground-web/commit/adbcbfe0aacc3490880102c0a8c85df7650c8b02",
  },
  {
    harness: "pi",
    model: "GPT-5.5",
    modelId: "openai/gpt-5.5",
    reasoning: "high thinking",
    path: "one-shot/gpt-5.5/",
    baked: "one-shot/gpt-5.5",
  },
  {
    harness: "pi",
    model: "Kimi K2.7 Code",
    modelId: "moonshotai/kimi-k2.7-code",
    reasoning: "high thinking",
    path: "one-shot/kimi-k2.7-code/",
    baked: "one-shot/kimi-k2.7-code",
  },
]

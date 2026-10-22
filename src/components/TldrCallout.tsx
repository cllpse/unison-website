/**
 * A "tl;dr" at the end of a section's paragraph, lowercase so it reads as part of the text, opening the TL;DR card
 * (TldrCard) as the hero's does: styled as the links there are (semibold, the cards' thinner, higher underline fading
 * on hover, globals.css and Section.tsx), but in the starters' blue. A few sit across the page, where a reader might
 * want the short version.
 */
export default () => (
  <button
    type="button"
    popoverTarget="tldr"
    className="cursor-pointer font-semibold text-(--color-blue) underline decoration-solid decoration-(--color-blue) decoration-[length:0.095em] underline-offset-[-0.09em] [text-underline-position:from-font] transition-[text-decoration-color] duration-116 ease-out hover:decoration-transparent motion-reduce:transition-none"
  >
    tl;dr
  </button>
)

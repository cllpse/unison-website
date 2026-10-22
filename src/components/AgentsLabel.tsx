export type AgentsLabel = {
  /** Tips the "s" only while its link shows the frame, hovered or current, as the nav's link does. */
  withFrame?: boolean
}

/**
 * "agents" as the nav and the Agents section's label show it. Both draw it in a square frame (underline-square-frame)
 * whose right edge cuts through the "s", so the "s" tips out of it, a little clockwise, pivoting on its bottom-left
 * corner. In the nav the frame comes and goes, so the "s" tips with it, on the frame's 58ms ease-out (half the site's
 * usual 116ms, a quick snap); the link is the group/link it listens to.
 */
export default (p: AgentsLabel) => {
  const { withFrame } = p
  const tip = withFrame
    ? "transition-[rotate] duration-58 ease-out group-hover/link:rotate-[12deg] group-aria-[current=location]/link:rotate-[12deg] motion-reduce:transition-none"
    : "rotate-[12deg]"

  return (
    <>
      agent<span className={`inline-block origin-bottom-left ${tip}`}>s</span>
    </>
  )
}

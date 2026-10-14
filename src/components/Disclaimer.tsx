import type { ReactNode } from "react"

export type Disclaimer = { children: ReactNode }

/** A small boxed caveat, centered at the end of a section, on the code blocks' surface, set like a paragraph. */
export default (p: Disclaimer) => {
  const { children } = p

  return (
    <aside className="mx-auto mt-12 w-fit rounded-2xl border border-gray-edge bg-gray px-4 py-3 font-paragraph [corner-shape:squircle]">
      <p>
        {/* Oven mitts, for handling with care (Solar icon set by 480 Design, linear, CC BY 4.0): in the text color and
            in line with it, sized and set like the nav's eyes. The stroke is thickened from 1.5 to 1.8 to match the
            eyes' (0.075em: 1.5 of their 20-unit width; 1.8 of this 24). The first path fills the cuff, traced from the
            cuff line and the outline around the wrist. */}
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="mr-2 inline-block size-[1em] fill-none stroke-current align-[-0.125em]"
        >
          <path
            d="M4.02 10.954L13.297 20.026C11.952 21.342 11.279 22 10.443 22C9.606 22 8.933 21.341 7.588 20.027L4.019 16.537C2.673 15.221 2 14.563 2 13.745C2 13.209 2.29 12.741 2.87 12.111C3.46 11.469 3.756 11.147 3.89 10.81Z"
            className="fill-current stroke-none"
          />
          <path
            strokeWidth="1.8"
            strokeLinecap="round"
            d="M10.334 4.78C9.914 3.151 8.668 1.977 7.214 2c-1.773.027-3.182 1.817-3.148 4l-.032 3.34c-.007.757-.01 1.135-.144 1.47c-.134.337-.43.659-1.02 1.301c-.58.63-.87 1.098-.87 1.634c0 .818.673 1.476 2.019 2.792l3.569 3.49C8.933 21.341 9.606 22 10.443 22c.836 0 1.509-.658 2.855-1.974l6.78-6.63a6.314 6.314 0 0 0 0-9.072c-2.562-2.505-6.716-2.505-9.278 0l-.466.455Zm0 0l-.962.94"
          />
          <path strokeWidth="1.8" d="M13.297 20.026L4.02 10.954" />
        </svg>
        {children}
      </p>
    </aside>
  )
}

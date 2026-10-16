/**
 * What the hero's Shapes.tsx sample renders: a square labeled "shape" in its bottom-right corner (8px of padding at the
 * side, 6px below), a squircle labeled "reshape" in its middle, and a circle holding the site's favicon (a 24px Vector,
 * 60% of the circle: the 32px favicon's pixel outline in whole numbers, a path the sample shortens with {...}, scaled
 * into place by a transform), in a row. Sized as the sample says, each shape clearly smaller than the last: 112 and
 * 80px across (28 and 20 units), and the circle 40px from its 24px Vector and 8px of padding (2 units) all round, 32px
 * apart (gap 8), on one centered row. Exported from Figma and inlined, with the labels as live text in the page's
 * Inter, placed where Figma puts their text boxes ("shape" at 12px medium, below the sample's small label style, the
 * library's smallest at 14px, so it reads smaller than "reshape"; "reshape" in the label style, 15px medium on a 25px
 * line), each shape in the same steps of its own 50-900 scale (fill 50, outline 400, label or favicon 700): the square
 * neutral, the squircle purple, the circle pink. The scales flip on the dark theme, so the drawing follows the theme
 * with no second version.
 * It spans its container's width at its own aspect ratio. On phones the outlines are a fixed 1.5px instead of scaling
 * with the drawing (which takes them under 1px there); the drawing doesn't clip them where they reach its edges.
 */
const OUTLINE = "max-sm:[stroke-width:1.5] max-sm:[vector-effect:non-scaling-stroke]"

export default () => {
  return (
    <svg viewBox="0 0 296 112" fill="none" role="img" className="h-auto w-full max-sm:overflow-visible">
      <title>
        A square labeled shape, a squircle labeled reshape and a circle holding the site's pixel logo, in a row
      </title>
      <path d="M111.5 0.5V111.5H0.5V0.5H111.5Z" className="fill-neutral-50" />
      <path d="M111.5 0.5V111.5H0.5V0.5H111.5Z" className={`stroke-neutral-400 ${OUTLINE}`} />
      <text x="104" y="103.1" textAnchor="end" fontSize="12" fontWeight="500" className="fill-neutral-700">
        shape
      </text>
      <path
        d="M176 16.5H192C197.609 16.5 201.786 16.5001 205.096 16.7705C208.399 17.0405 210.796 17.5771 212.853 18.625C216.522 20.4945 219.505 23.4783 221.375 27.1475C222.423 29.2042 222.96 31.6006 223.229 34.9043C223.5 38.2143 223.5 42.3912 223.5 48V64C223.5 69.6088 223.5 73.7857 223.229 77.0957C222.96 80.3994 222.423 82.7958 221.375 84.8525C219.505 88.5217 216.522 91.5055 212.853 93.375C210.796 94.4229 208.399 94.9595 205.096 95.2295C201.786 95.4999 197.609 95.5 192 95.5H176C170.391 95.5 166.214 95.4999 162.904 95.2295C159.601 94.9595 157.204 94.4229 155.147 93.375C151.478 91.5055 148.495 88.5217 146.625 84.8525C145.577 82.7958 145.04 80.3994 144.771 77.0957C144.5 73.7857 144.5 69.6088 144.5 64V48C144.5 42.3912 144.5 38.2143 144.771 34.9043C145.04 31.6006 145.577 29.2042 146.625 27.1475C148.495 23.4783 151.478 20.4945 155.147 18.625C157.204 17.5771 159.601 17.0405 162.904 16.7705C166.214 16.5001 170.391 16.5 176 16.5Z"
        className="fill-amethyst-50"
      />
      <path
        d="M176 16.5H192C197.609 16.5 201.786 16.5001 205.096 16.7705C208.399 17.0405 210.796 17.5771 212.853 18.625C216.522 20.4945 219.505 23.4783 221.375 27.1475C222.423 29.2042 222.96 31.6006 223.229 34.9043C223.5 38.2143 223.5 42.3912 223.5 48V64C223.5 69.6088 223.5 73.7857 223.229 77.0957C222.96 80.3994 222.423 82.7958 221.375 84.8525C219.505 88.5217 216.522 91.5055 212.853 93.375C210.796 94.4229 208.399 94.9595 205.096 95.2295C201.786 95.4999 197.609 95.5 192 95.5H176C170.391 95.5 166.214 95.4999 162.904 95.2295C159.601 94.9595 157.204 94.4229 155.147 93.375C151.478 91.5055 148.495 88.5217 146.625 84.8525C145.577 82.7958 145.04 80.3994 144.771 77.0957C144.5 73.7857 144.5 69.6088 144.5 64V48C144.5 42.3912 144.5 38.2143 144.771 34.9043C145.04 31.6006 145.577 29.2042 146.625 27.1475C148.495 23.4783 151.478 20.4945 155.147 18.625C157.204 17.5771 159.601 17.0405 162.904 16.7705C166.214 16.5001 170.391 16.5 176 16.5Z"
        className={`stroke-amethyst-400 ${OUTLINE}`}
      />
      <text x="184" y="61.5" textAnchor="middle" fontSize="15" fontWeight="500" className="fill-amethyst-700">
        reshape
      </text>
      <path
        d="M276 36.5C286.77 36.5 295.5 45.23 295.5 56C295.5 66.77 286.77 75.5 276 75.5C265.23 75.5 256.5 66.77 256.5 56C256.5 45.23 265.23 36.5 276 36.5Z"
        className="fill-magenta-50"
      />
      <path
        d="M276 36.5C286.77 36.5 295.5 45.23 295.5 56C295.5 66.77 286.77 75.5 276 75.5C265.23 75.5 256.5 66.77 256.5 56C256.5 45.23 265.23 36.5 276 36.5Z"
        className={`stroke-magenta-400 ${OUTLINE}`}
      />
      <path
        d="M3 6h1v-2h2v-1h12v1h2v2h1v5h2v2h2v2h2v2h2v2h-2v2h2v2h-2v2h2v2h-2v2h-2v-2h2v-2h-2v2h-2v2h-2v-2h2v-2h2v-2h2v-2h-2v2h-2v2h-2v2h-2v2h-2v-2h2v-2h2v-2h2v-2h2v-2h2v-2h-2v2h-2v2h-2v2h-2v2h-2v2h-2v2h-2v-2h2v-2h2v-2h2v-2h2v-2h2v-2h2v-2h-2v2h-2v2h-1v1h-1v1h-2v2h-2v2h-2v2h-2v-2h2v-2h2v-2h-2v2h-2v-2h-5v-1h-2v-2h-1zM21 13v2h2v-2zM25 11h2v2h2v2h-2v-2h-2z"
        transform="translate(264 44) scale(0.75)"
        className="fill-magenta-700"
      />
    </svg>
  )
}

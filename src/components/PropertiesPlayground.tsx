"use client";

import { useState } from "react";
import { Highlight } from "./Code";

type Flow = "horizontal" | "vertical";
type Vertical = "top" | "center" | "bottom";
type Horizontal = "left" | "center" | "right";

// Values below are real tokens from the library's UNITS and COLORS tables.
const GAPS = [
  { token: "2", px: 8 },
  { token: "4", px: 16 },
  { token: "6", px: 24 },
  { token: "8", px: 32 },
] as const;

const PADDINGS = [
  { token: "4", px: 16 },
  { token: "6", px: 24 },
  { token: "8", px: 32 },
] as const;

const RADII = [
  { token: "2", px: 8 },
  { token: "4", px: 16 },
  { token: "6", px: 24 },
] as const;

const FILLS = [
  { token: "primary", surface: "#F6EFFF", child: "#9225FF" },
  { token: "secondary", surface: "#FDF1FB", child: "#E93BCC" },
  { token: "tertiary", surface: "#F0F8FE", child: "#39A4EB" },
] as const;

const VERTICALS: Vertical[] = ["top", "center", "bottom"];
const HORIZONTALS: Horizontal[] = ["left", "center", "right"];

const CSS_ALIGN = {
  top: "flex-start",
  left: "flex-start",
  center: "center",
  bottom: "flex-end",
  right: "flex-end",
};

function alignmentProp(v: Vertical, h: Horizontal) {
  if (v === "center")
    return h === "center" ? "alignment-center" : `alignment-${h}`;
  return `alignment-${v}-${h}`;
}

function Segmented<T extends string>({
  label,
  value,
  options,
  onChange,
  render = (option) => option,
}: {
  label: string;
  value: T;
  options: readonly T[];
  onChange: (value: T) => void;
  render?: (option: T) => string;
}) {
  return (
    <fieldset className="grid gap-1.5">
      <legend className="mb-1.5 text-[11px] font-medium text-gray-500 dark:text-gray-400">
        {label}
      </legend>
      <div className="flex rounded-md bg-gray-100 p-0.5 dark:bg-white/5">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={option === value}
            onClick={() => onChange(option)}
            className="flex-1 rounded-[5px] px-2 py-1 font-mono text-[11px] text-gray-600 transition aria-pressed:bg-white aria-pressed:text-gray-950 aria-pressed:shadow-sm dark:text-gray-400 dark:aria-pressed:bg-white/15 dark:aria-pressed:text-white"
          >
            {render(option)}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export function PropertiesPlayground() {
  const [flow, setFlow] = useState<Flow>("horizontal");
  const [gap, setGap] = useState<(typeof GAPS)[number]["token"]>("4");
  const [padding, setPadding] =
    useState<(typeof PADDINGS)[number]["token"]>("6");
  const [radius, setRadius] = useState<(typeof RADII)[number]["token"]>("4");
  const [fill, setFill] = useState<(typeof FILLS)[number]["token"]>("primary");
  const [vertical, setVertical] = useState<Vertical>("center");
  const [horizontal, setHorizontal] = useState<Horizontal>("center");

  const gapPx = GAPS.find((g) => g.token === gap)?.px ?? 16;
  const paddingPx = PADDINGS.find((p) => p.token === padding)?.px ?? 24;
  const radiusPx = RADII.find((r) => r.token === radius)?.px ?? 16;
  const fillColors = FILLS.find((f) => f.token === fill) ?? FILLS[0];

  // Figma alignment follows the flow: the main axis takes the alignment along the flow.
  const isHorizontal = flow === "horizontal";
  const justifyContent = CSS_ALIGN[isHorizontal ? horizontal : vertical];
  const alignItems = CSS_ALIGN[isHorizontal ? vertical : horizontal];

  const code = `<Frame
  flow-${flow}
  gap-${gap}
  padding-${padding}
  ${alignmentProp(vertical, horizontal)}
  corner-radius-${radius}
  fill-${fill}-100
  width-fill
  height-fill
>
  <Frame width-12 height-12 corner-radius-2 fill-${fill}-700 />
  <Frame width-12 height-16 corner-radius-2 fill-${fill}-700 />
  <Frame width-12 height-12 corner-radius-2 fill-${fill}-700 />
</Frame>`;

  return (
    <div className="grid overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-gray-950/10 lg:grid-cols-[15rem_1fr] dark:bg-gray-900 dark:ring-white/10">
      {/* Properties panel */}
      <div className="grid content-start gap-4 border-b border-gray-950/5 p-4 lg:border-r lg:border-b-0 dark:border-white/10">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold">Auto layout</span>
          <span className="font-mono text-[10px] text-gray-400">Frame</span>
        </div>

        <Segmented
          label="Direction"
          value={flow}
          options={["horizontal", "vertical"] as const}
          onChange={setFlow}
          render={(o) => (o === "horizontal" ? "→ row" : "↓ column")}
        />

        <div className="grid grid-cols-[auto_1fr] items-start gap-4">
          <fieldset>
            <legend className="mb-1.5 text-[11px] font-medium text-gray-500 dark:text-gray-400">
              Alignment
            </legend>
            <div className="grid grid-cols-3 gap-0.5 rounded-md bg-gray-100 p-1 dark:bg-white/5">
              {VERTICALS.flatMap((v) =>
                HORIZONTALS.map((h) => {
                  const active = v === vertical && h === horizontal;
                  return (
                    <button
                      key={`${v}-${h}`}
                      type="button"
                      aria-label={alignmentProp(v, h)}
                      aria-pressed={active}
                      onClick={() => {
                        setVertical(v);
                        setHorizontal(h);
                      }}
                      className="grid size-6 place-items-center rounded-sm transition hover:bg-white/80 aria-pressed:bg-white dark:hover:bg-white/10 dark:aria-pressed:bg-white/15"
                    >
                      <span
                        className={`rounded-full transition-all ${active ? "h-1 w-3 bg-brand-700" : "size-1 bg-gray-400"}`}
                      />
                    </button>
                  );
                }),
              )}
            </div>
          </fieldset>
          <Segmented
            label="Gap"
            value={gap}
            options={GAPS.map((g) => g.token)}
            onChange={setGap}
            render={(o) => `${GAPS.find((g) => g.token === o)?.px}`}
          />
        </div>

        <Segmented
          label="Padding"
          value={padding}
          options={PADDINGS.map((p) => p.token)}
          onChange={setPadding}
          render={(o) => `${PADDINGS.find((p) => p.token === o)?.px}`}
        />
        <Segmented
          label="Corner radius"
          value={radius}
          options={RADII.map((r) => r.token)}
          onChange={setRadius}
          render={(o) => `${RADII.find((r) => r.token === o)?.px}`}
        />

        <fieldset>
          <legend className="mb-1.5 text-[11px] font-medium text-gray-500 dark:text-gray-400">
            Fill
          </legend>
          <div className="flex gap-2">
            {FILLS.map((f) => (
              <button
                key={f.token}
                type="button"
                aria-label={`fill-${f.token}-100`}
                aria-pressed={f.token === fill}
                onClick={() => setFill(f.token)}
                className="size-6 rounded-md ring-1 ring-gray-950/10 ring-offset-2 transition aria-pressed:ring-2 aria-pressed:ring-brand-700 dark:ring-white/20 dark:ring-offset-gray-900"
                style={{ background: f.child }}
              />
            ))}
          </div>
        </fieldset>
      </div>

      {/* Canvas + code */}
      <div className="grid min-w-0 grid-rows-[auto_1fr]">
        <div className="bg-grid relative h-64 p-6 sm:h-72">
          <span className="absolute top-2 left-3 font-mono text-[10px] text-brand-700 dark:text-brand-400">
            Card · {isHorizontal ? "Horizontal" : "Vertical"}
          </span>
          <div
            className="flex size-full outline-1 outline-brand-700/60 outline-dashed transition-all duration-300"
            style={{
              flexDirection: isHorizontal ? "row" : "column",
              gap: gapPx,
              padding: paddingPx,
              justifyContent,
              alignItems,
              borderRadius: radiusPx,
              background: fillColors.surface,
            }}
          >
            {[48, 64, 48].map((h, i) => (
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: static children
                key={i}
                className="shrink-0 rounded-lg transition-colors duration-300"
                style={{ width: 48, height: h, background: fillColors.child }}
              />
            ))}
          </div>
        </div>
        <pre className="overflow-x-auto bg-gray-950 p-5 font-mono text-[12.5px]/6 text-gray-100 dark:bg-black/40">
          <code>
            <Highlight code={code} />
          </code>
        </pre>
      </div>
    </div>
  );
}

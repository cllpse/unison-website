import { PRODUCT_NAME } from "@/lib/site";

export function LogoMark({ className = "size-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <rect
        x="4.5"
        y="4.5"
        width="15"
        height="15"
        rx="3"
        className="stroke-brand-700"
        strokeWidth="1.5"
      />
      <rect
        x="8"
        y="8"
        width="3.5"
        height="8"
        rx="1"
        className="fill-brand-700"
      />
      <rect
        x="12.5"
        y="8"
        width="3.5"
        height="5"
        rx="1"
        className="fill-accent-700"
      />
      <circle
        cx="4.5"
        cy="4.5"
        r="1.5"
        className="fill-white stroke-brand-700 dark:fill-gray-950"
      />
      <circle
        cx="19.5"
        cy="4.5"
        r="1.5"
        className="fill-white stroke-brand-700 dark:fill-gray-950"
      />
      <circle
        cx="4.5"
        cy="19.5"
        r="1.5"
        className="fill-white stroke-brand-700 dark:fill-gray-950"
      />
      <circle
        cx="19.5"
        cy="19.5"
        r="1.5"
        className="fill-white stroke-brand-700 dark:fill-gray-950"
      />
    </svg>
  );
}

export function Logo() {
  return (
    <span className="flex items-center gap-2 font-semibold tracking-tight">
      <LogoMark />
      {PRODUCT_NAME}
    </span>
  );
}

import type { ButtonHTMLAttributes } from "react";

export type DictionaryCellColor = "blue" | "sky" | "yellow";

type DictionaryCellProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  color?: DictionaryCellColor;
};

const colorClasses: Record<DictionaryCellColor, string> = {
  blue: "border-[#3f9ed8] shadow-[0_7px_0_#3f9ed8] text-navy-1",
  sky: "border-[#72bce5] shadow-[0_7px_0_#72bce5] text-navy-1",
  yellow: "border-[#f6c45f] shadow-[0_7px_0_#f6c45f] text-navy-1",
};

const accentClasses: Record<DictionaryCellColor, string> = {
  blue: "bg-[#3f9ed8]",
  sky: "bg-[#72bce5]",
  yellow: "bg-[#f6c45f]",
};

export function DictionaryCell({
  label,
  color = "blue",
  className = "",
  ...props
}: DictionaryCellProps) {
  return (
    <button
      type="button"
      className={`flex min-h-20 w-full flex-col items-center justify-center rounded-2xl border-2 bg-white px-2 py-3 text-center text-title font-bold transition-transform hover:-translate-y-0.5 active:translate-y-1 active:shadow-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean ${colorClasses[color]} ${className}`}
      {...props}
    >
      <span className={`mb-2 h-2 w-8 rounded-full ${accentClasses[color]}`} />
      <span className="leading-tight">{label}</span>
    </button>
  );
}

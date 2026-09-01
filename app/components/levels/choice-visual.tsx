import type { ChoiceVisual as ChoiceVisualData } from "~/models/level";

export function ChoiceVisual({ visual }: { visual: ChoiceVisualData }) {
  if (visual.kind === "image") {
    return <img src={visual.src} alt={visual.alt} className="size-full object-contain" />;
  }

  return (
    <span className="text-[clamp(4rem,14vw,6.5rem)] leading-none" role="img" aria-label={visual.alt}>
      {visual.value}
    </span>
  );
}

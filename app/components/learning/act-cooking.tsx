import { useFetcher } from "react-router";

import type { ActCookingConfig, LessonNodeData } from "~/models/learning";

type ActCookingProps = {
  config: ActCookingConfig;
  lessons: LessonNodeData[];
  cooked: boolean;
};

export function ActCooking({ config, lessons, cooked }: ActCookingProps) {
  const fetcher = useFetcher();
  const collectedItems = new Set(
    lessons.flatMap((lesson) =>
      lesson.reward?.collected ? [lesson.reward.name] : [],
    ),
  );
  const canCook = config.requiredItems.every((item) => collectedItems.has(item));
  const isCooking = fetcher.state !== "idle";

  if (cooked) {
    return (
      <div className="mx-5 mb-5 flex flex-col items-center rounded-3xl bg-orange-3/35 px-5 py-5">
        <img
          src={config.resultImage}
          alt={config.resultAlt}
          className="h-36 w-full object-contain"
        />
        <p className="mt-2 text-title text-orange-1">Masakan selesai!</p>
      </div>
    );
  }

  if (!canCook) return null;

  return (
    <fetcher.Form method="post" className="mx-5 mb-5">
      <input type="hidden" name="_intent" value="cook" />
      <button
        type="submit"
        disabled={isCooking}
        className="welcoming-button disabled:cursor-wait disabled:opacity-60"
      >
        {isCooking ? "Memasak..." : "Masak"}
      </button>
    </fetcher.Form>
  );
}

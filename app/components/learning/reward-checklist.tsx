import type { LessonNodeData } from "~/models/learning";

export function RewardChecklist({ lessons }: { lessons: LessonNodeData[] }) {
  const rewards = lessons.flatMap((lesson) => lesson.reward ? [lesson.reward] : []);

  if (rewards.length === 0) return null;

  return (
    <section className="mx-5 mb-3 rounded-3xl border-2 border-gray-2 bg-white px-5 py-4" aria-labelledby="reward-checklist-title">
      <h2 id="reward-checklist-title" className="text-title text-navy-1">Bahan Makanan</h2>
      <div className="mt-3 flex items-center justify-around gap-4">
        {rewards.map((reward) => (
          <div key={reward.name} className="flex items-center gap-2" aria-label={`${reward.alt}: ${reward.collected ? 1 : 0} dari 1`}>
            <img src={reward.image} alt="" className="size-14 object-contain" />
            <span className={`text-title ${reward.collected ? "text-green-1" : "text-gray-1"}`}>
              {reward.collected ? 1 : 0}/1
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

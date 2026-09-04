import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router";

import type { ActCookingConfig, ActPrize, LessonNodeConfig, UserItems } from "~/models/learning";

import { CookingCelebration } from "./cooking-celebration";
import { IngredientDropAnimation } from "./ingredient-drop-animation";

type KitchenPageProps = {
  cooking: ActCookingConfig;
  prize: ActPrize;
  lessons: LessonNodeConfig[];
  items: UserItems;
};

export function KitchenPage({ cooking, prize, lessons, items }: KitchenPageProps) {
  const navigate = useNavigate();
  const [animationRun, setAnimationRun] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showAnimatedIngredients, setShowAnimatedIngredients] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const collectedItems = new Set(items);
  const ingredients = cooking.requiredItems.map((name) => {
    const reward = lessons.find((lesson) => lesson.reward?.name === name)?.reward;
    return { name, reward, collected: collectedItems.has(name) };
  });
  const canCook = ingredients.every((ingredient) => ingredient.collected);
  const animatedIngredients = ingredients.flatMap((ingredient) =>
    ingredient.collected && ingredient.reward
      ? [{ name: ingredient.name, image: ingredient.reward.image, alt: ingredient.reward.alt }]
      : [],
  );

  const startCookingAnimation = () => {
    if (!canCook || isAnimating) return;
    setAnimationRun((current) => current + 1);
    setIsAnimating(true);
    setShowAnimatedIngredients(true);
  };

  return (
    <main className="flex flex-1 flex-col bg-background px-5 pb-[calc(2rem+env(safe-area-inset-bottom))]">
      <header className="relative flex items-center justify-center py-3">
        <Link
          to="/level"
          aria-label="Kembali ke halaman level"
          className="absolute left-0 grid size-12 place-items-center text-ocean transition active:scale-95"
        >
          <ArrowLeft className="size-10 stroke-[4]" />
        </Link>
        <h1 className="font-bubblelemon text-heading text-yellow-2">{cooking.title}</h1>
      </header>

      <section className="isolate relative mx-auto mt-7 w-full max-w-md overflow-visible" aria-label="Dapur dan bahan makanan">
        {showAnimatedIngredients && (
          <IngredientDropAnimation
            ingredients={animatedIngredients}
            runId={animationRun}
            config={cooking.ingredientAnimation}
            onComplete={() => {
              setIsAnimating(false);
              setShowCelebration(true);
            }}
          />
        )}
        <img src={cooking.kitchenImage} alt={cooking.kitchenImageAlt} className="relative z-0 w-full object-contain" />

        <div className="absolute bottom-[9%] left-[11%] right-[11%] top-[61%] grid grid-cols-2 content-center gap-x-5 gap-y-2 overflow-y-auto rounded-2xl px-3 py-2 bg-white/90 backdrop-blur-[2px] outline-biru outline-4 ">
          {ingredients.map(({ name, reward, collected }) => (
            <div key={name} className="flex min-w-0 items-center justify-center gap-2">
              {reward ? (
                <img src={reward.image} alt={reward.alt} className={`size-16 object-contain ${collected ? "" : "grayscale opacity-45"}`} />
              ) : (
                <span className="size-16 rounded-2xl bg-gray-3" aria-hidden="true" />
              )}
              <span className={`shrink-0 text-title ${collected ? "text-orange-2" : "text-gray-1"}`}>
                {collected ? 1 : 0}/1
              </span>
            </div>
          ))}
        </div>
      </section>

      <button
        type="button"
        disabled={!canCook || isAnimating}
        onClick={startCookingAnimation}
        className="mx-auto mt-8 min-h-16 w-full max-w-64 rounded-3xl bg-gray-2 px-6 text-button text-neutral-500 transition enabled:bg-green-2 enabled:text-white enabled:shadow-[0_7px_0_#7ac70c] enabled:active:translate-y-1 enabled:active:shadow-[0_3px_0_#7ac70c] disabled:cursor-not-allowed"
      >
        {isAnimating ? "Memasak..." : "Masak"}
      </button>

      {showCelebration && (
        <CookingCelebration
          prize={prize}
          onContinue={() => navigate("/level")}
        />
      )}
    </main>
  );
}

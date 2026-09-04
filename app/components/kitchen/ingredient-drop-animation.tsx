import { motion, useReducedMotion } from "motion/react";

import type { ActCookingConfig } from "~/models/learning";

export type AnimatedIngredient = {
  name: string;
  image: string;
  alt: string;
};

type IngredientDropAnimationProps = {
  ingredients: AnimatedIngredient[];
  runId: number;
  config: ActCookingConfig["ingredientAnimation"];
  onComplete: () => void;
};

export function IngredientDropAnimation({
  ingredients,
  runId,
  config,
  onComplete,
}: IngredientDropAnimationProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      key={runId}
      className="pointer-events-none absolute inset-0 z-[60] overflow-visible"
      aria-hidden="true"
    >
      {ingredients.map((ingredient, index) => {
        const startsFromLeft = index % 2 === 0;
        const isLast = index === ingredients.length - 1;

        return (
          <motion.img
            key={`${runId}-${ingredient.name}`}
            src={ingredient.image}
            alt=""
            className="absolute object-contain drop-shadow-xl"
            style={{
              left: `${config.targetXPercent}%`,
              top: `${config.targetYPercent}%`,
              width: config.ingredientSizePx,
              height: config.ingredientSizePx,
              marginLeft: -config.ingredientSizePx / 2,
              marginTop: -config.ingredientSizePx / 2,
            }}
            initial={
              reduceMotion
                ? { opacity: 1, x: 0, y: 0, rotate: 0, scale: 0.55 }
                : {
                    x: startsFromLeft
                      ? -config.entryDistancePx
                      : config.entryDistancePx,
                    y: config.entryYOffsetPx - (index % 3) * 18,
                    rotate: startsFromLeft ? -22 : 22,
                    scale: 0.8,
                    opacity: 1,
                  }
            }
            animate={{
              x: 0,
              y: 0,
              rotate: 0,
              scale: 1.5,
              opacity: 1,
            }}
            transition={
              reduceMotion
                ? { duration: 0.8, delay: index * config.staggerSeconds }
                : {
                    type: "spring",
                    stiffness: 105,
                    damping: 13,
                    mass: 0.7,
                    delay: index * config.staggerSeconds,
                  }
            }
            onAnimationComplete={isLast ? onComplete : undefined}
          />
        );
      })}
    </div>
  );
}

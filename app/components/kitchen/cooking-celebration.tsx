import { motion, useReducedMotion } from "motion/react";

import type { ActPrize } from "~/models/learning";

type CookingCelebrationProps = {
  prize: ActPrize;
  onContinue: () => void;
};

export function CookingCelebration({ prize, onContinue }: CookingCelebrationProps) {
  const reduceMotion = useReducedMotion();
  const reveal = (delay: number) => ({
    initial: reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.15 },
    animate: { opacity: 1, scale: 1 },
    transition: reduceMotion
      ? { duration: 0.25, delay: 0 }
      : { type: "spring" as const, stiffness: 125, damping: 14, delay },
  });

  return (
    <motion.section
      role="dialog"
      aria-modal="true"
      aria-labelledby="cooking-prize-title"
      className="fixed inset-y-0 left-1/2 z-[100] flex w-full max-w-[480px] -translate-x-1/2 flex-col items-center overflow-hidden bg-ocean px-5 pb-[calc(2rem+env(safe-area-inset-bottom))] pt-[calc(1.5rem+env(safe-area-inset-top))]"
      initial={reduceMotion ? { opacity: 0 } : { y: "-100%" }}
      animate={reduceMotion ? { opacity: 1 } : { y: 0 }}
      transition={{ duration: reduceMotion ? 0.15 : 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="pointer-events-none absolute inset-0 grid -translate-y-[5vh] place-items-center ">
        <motion.img
          src="/quest/sprites/star.png"
          alt=""
          className="absolute h-[108vh] w-auto max-w-none object-contain rotate-[37deg] translate-y-[2vh]"
          {...reveal(0.45)}
        />

        <div className="pointer-events-none absolute inset-0 grid place-items-center">
          <motion.div {...reveal(0.78)}>
            <motion.img
              src="/quest/sprites/yellow_star.png"
              alt=""
              className="w-[min(105vw,31rem)] max-w-none"
              animate={reduceMotion ? undefined : { rotate: 360 }}
              transition={{ duration: 14, repeat: Infinity, ease: "linear", delay: 1.12 }}
            />
          </motion.div>
        </div>

        <div className="pointer-events-none absolute inset-0 z-10 grid place-items-center">
          <motion.img
            src="/quest/sprites/panci.png"
            alt="Panci"
            className="w-[min(100vw,29rem)] max-w-none object-contain"
            {...reveal(1.08)}
          />
        </div>

        <div className="pointer-events-none absolute inset-0 z-20 grid place-items-center">
          <motion.div {...reveal(1.38)}>
            <motion.img
              src="/quest/sprites/red_star.png"
              alt=""
              className="w-[min(68vw,19rem)] max-w-none object-contain"
              animate={reduceMotion ? undefined : { rotate: -360 }}
              transition={{ duration: 9, repeat: Infinity, ease: "linear", delay: 1.72 }}
            />
          </motion.div>
        </div>

        <div className="absolute inset-0 z-30 grid place-items-center">
          <motion.img
            src={prize.image}
            alt={prize.alt}
            className="w-[min(58vw,16rem)] max-w-none object-contain drop-shadow-xl"
            {...reveal(1.7)}
          />
        </div>
      </div>

      <motion.div className="absolute inset-x-5 bottom-[calc(8rem+env(safe-area-inset-bottom))] z-40 text-center" {...reveal(1.98)}>
        <h2
          id="cooking-prize-title"
          className="rounded-[2rem] border-4 border-blue-3 bg-white px-4 py-5 text-heading text-yellow-1 shadow-lg"
        >
          {prize.title}
        </h2>
        <button
          type="button"
          onClick={onContinue}
          className="mt-8 min-h-16 rounded-3xl border-4 border-blue-3 bg-white px-12 text-title text-biru-2 shadow-[0_8px_0_#76bce9] transition active:translate-y-1 active:shadow-[0_4px_0_#76bce9]"
        >
          Continue!
        </button>
      </motion.div>
    </motion.section>
  );
}

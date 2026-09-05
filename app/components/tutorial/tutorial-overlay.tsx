import { ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import type { TutorialStep } from "~/data/tutorial/level-tutorial";

type TutorialOverlayProps = {
  steps: TutorialStep[];
  onComplete: () => void;
};

type TargetRect = {
  top: number;
  left: number;
  width: number;
  height: number;
};

export function TutorialOverlay({ steps, onComplete }: TutorialOverlayProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [targetRect, setTargetRect] = useState<TargetRect | null>(null);
  const [viewportHeight, setViewportHeight] = useState(800);
  const activeStep = steps[activeIndex];

  const measureTarget = useCallback(() => {
    if (!activeStep) return;

    const target = document.querySelector<HTMLElement>(
      `[data-tutorial-target="${activeStep.target}"]`,
    );

    if (!target) {
      setTargetRect(null);
      return;
    }

    const rect = target.getBoundingClientRect();
    const padding = activeStep.spotlightPadding ?? 6;

    setTargetRect({
      top: rect.top - padding,
      left: rect.left - padding,
      width: rect.width + padding * 2,
      height: rect.height + padding * 2,
    });
  }, [activeStep]);

  useEffect(() => {
    if (!activeStep) return;

    setViewportHeight(window.innerHeight);

    const target = document.querySelector<HTMLElement>(
      `[data-tutorial-target="${activeStep.target}"]`,
    );

    target?.scrollIntoView({ behavior: "smooth", block: "center" });
    const frame = requestAnimationFrame(measureTarget);
    const settleTimer = window.setTimeout(measureTarget, 350);
    const resizeObserver = new ResizeObserver(measureTarget);

    if (target) resizeObserver.observe(target);
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
      measureTarget();
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", measureTarget, true);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(settleTimer);
      resizeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", measureTarget, true);
    };
  }, [activeStep, measureTarget]);

  if (!activeStep) return null;

  const tooltipTop = targetRect
    ? activeStep.placement === "above"
      ? Math.max(16, targetRect.top - 190)
      : Math.min(viewportHeight - 210, targetRect.top + targetRect.height + 18)
    : 96;

  const continueTutorial = () => {
    if (activeIndex === steps.length - 1) {
      onComplete();
      return;
    }

    setActiveIndex((index) => index + 1);
  };

  return (
    <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true" aria-label="Tutorial SignTide">
      {targetRect ? (
        <div
          className="pointer-events-none fixed rounded-2xl ring-4 ring-white transition-all duration-300"
          style={{
            top: targetRect.top,
            left: targetRect.left,
            width: targetRect.width,
            height: targetRect.height,
            boxShadow: "0 0 0 9999px rgb(14 36 71 / 0.72)",
          }}
          aria-hidden="true"
        />
      ) : (
        <div className="fixed inset-0 bg-navy-1/70" aria-hidden="true" />
      )}

      <section
        className="fixed left-1/2 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-3xl bg-white p-5 text-navy-1 shadow-2xl transition-[top] duration-300"
        style={{ top: tooltipTop }}
      >
        <button
          type="button"
          onClick={onComplete}
          className="absolute right-4 top-4 rounded-full p-1 text-gray-1 transition hover:bg-gray-3 hover:text-navy-1 focus-visible:outline-2 focus-visible:outline-ocean"
          aria-label="Lewati tutorial"
        >
          <X className="size-6" aria-hidden="true" />
        </button>

        <p className="text-caption font-bold uppercase tracking-wider text-ocean">
          Langkah {activeIndex + 1} dari {steps.length}
        </p>
        <h2 className="mt-2 pr-9 text-title">{activeStep.title}</h2>
        <p className="mt-2 text-body text-navy-2">{activeStep.description}</p>

        <button
          type="button"
          onClick={continueTutorial}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-ocean px-5 py-3 text-button text-white transition active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean"
        >
          <span>{activeIndex === steps.length - 1 ? "Mulai Belajar" : "Lanjutkan"}</span>
          <ChevronRight className="size-5" aria-hidden="true" />
        </button>
      </section>
    </div>
  );
}

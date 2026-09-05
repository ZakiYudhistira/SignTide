import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigation, useSubmit } from "react-router";

import { ONBOARDING_CONTENT } from "~/data/onboarding/onboarding-content";

type OnboardingPageProps = {
  imageUrls: Record<string, string>;
};

const PRELOAD_IMAGE_COUNT = 3;

export function OnboardingPage({ imageUrls }: OnboardingPageProps) {
  const submit = useSubmit();
  const navigation = useNavigation();
  const reduceMotion = useReducedMotion();
  const preloadedImages = useRef(new Map<string, HTMLImageElement>());
  const [activeIndex, setActiveIndex] = useState(0);
  const activeContent = ONBOARDING_CONTENT[activeIndex];
  const isLastContent = activeIndex === ONBOARDING_CONTENT.length - 1;
  const isFinishing = navigation.state !== "idle";

  useEffect(() => {
    const upcomingImages = ONBOARDING_CONTENT
      .slice(activeIndex)
      .filter((content) => content.type === "image")
      .slice(0, PRELOAD_IMAGE_COUNT);

    upcomingImages.forEach((content, index) => {
      const imageUrl = imageUrls[content.id];

      if (!imageUrl || preloadedImages.current.has(imageUrl)) return;

      const image = new Image();
      image.decoding = "async";
      image.fetchPriority = index === 0 ? "high" : "auto";
      image.onerror = () => preloadedImages.current.delete(imageUrl);
      image.src = imageUrl;
      preloadedImages.current.set(imageUrl, image);

      if (image.decode) {
        void image.decode().catch(() => undefined);
      }
    });
  }, [activeIndex, imageUrls]);

  useEffect(() => () => {
    preloadedImages.current.clear();
  }, []);

  const continueOnboarding = () => {
    if (isLastContent) {
      void submit(
        { _intent: "finish-onboarding" },
        { method: "post", action: "/onboarding" },
      );
      return;
    }

    setActiveIndex((current) => current + 1);
  };

  if (!activeContent) return null;

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-background">
      <main className="relative min-h-0 flex-1 overflow-hidden">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={activeContent.id}
            initial={reduceMotion ? { opacity: 0 } : { x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { x: "-100%", opacity: 0 }}
            transition={reduceMotion
              ? { duration: 0.15 }
              : { duration: 0.42, ease: [0.22, 1, 0.36, 1] }
            }
            className="absolute inset-0"
            aria-live="polite"
          >
            {activeContent.type === "image" ? (
              <div className="flex h-full items-center justify-center px-8 py-8">
                <img
                  src={imageUrls[activeContent.id]}
                  alt={activeContent.alt}
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  className="max-h-full w-full rounded-sm object-contain"
                />
              </div>
            ) : (
              <activeContent.Component />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <div className="shrink-0 px-6 pb-[calc(2.5rem+env(safe-area-inset-bottom))] pt-6">
        <button
          type="button"
          onClick={continueOnboarding}
          disabled={isFinishing}
          className="mx-auto flex min-h-14 items-center justify-center gap-2 px-6 text-title text-blue-3 transition active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ocean"
        >
          <span>{isFinishing ? "Menyimpan..." : "Lanjutkan"}</span>
          <ChevronRight className="size-8 stroke-[3]" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

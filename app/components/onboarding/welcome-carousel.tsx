import { useState, type TouchEvent } from "react";
import { useNavigate } from "react-router";

import { OnboardingPagination } from "./onboarding-pagination";
import { OnboardingSlide } from "./onboarding-slide";
import { onboardingSlides } from "./onboarding-slides";

const swipeThreshold = 48;

export function WelcomeCarousel() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const selectSlide = (index: number) => {
    setActiveIndex(Math.max(0, Math.min(index, onboardingSlides.length - 1)));
  };

  const advanceSlide = () => {
    if (activeIndex === onboardingSlides.length - 1) {
      navigate("/login");
      return;
    }

    setActiveIndex((currentIndex) => (currentIndex + 1) % onboardingSlides.length);
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    setTouchStartX(event.touches[0]?.clientX ?? null);
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartX === null) return;

    const touchEndX = event.changedTouches[0]?.clientX ?? touchStartX;
    const horizontalDistance = touchEndX - touchStartX;

    if (horizontalDistance <= -swipeThreshold) {
      selectSlide(activeIndex + 1);
    }

    if (horizontalDistance >= swipeThreshold) {
      selectSlide(activeIndex - 1);
    }

    setTouchStartX(null);
  };

  return (
    <section className="flex min-h-0 flex-1 flex-col" aria-label="Welcome to SignTide">
      <div className="flex min-h-0 flex-1 flex-col">
        <div
          className="min-h-0 flex-1 overflow-hidden"
          role="region"
          aria-roledescription="carousel"
          aria-label="Onboarding slides"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "ArrowRight") selectSlide(activeIndex + 1);
            if (event.key === "ArrowLeft") selectSlide(activeIndex - 1);
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex h-full transition-transform duration-300 ease-out motion-reduce:transition-none"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {onboardingSlides.map((slide) => (
              <OnboardingSlide key={slide.id} slide={slide} />
            ))}
          </div>
        </div>

        <div className="shrink-0 pt-4 pb-8">
          <OnboardingPagination
            activeIndex={activeIndex}
            slideCount={onboardingSlides.length}
            onSelect={selectSlide}
          />
        </div>
      </div>

      <div className="shrink-0 px-6 pb-8">
        <button
          className="welcoming-button"
          type="button"
          onClick={advanceSlide}
        >
          {activeIndex === onboardingSlides.length - 1 ? "Continue" : "Next"}
        </button>
      </div>
    </section>
  );
}

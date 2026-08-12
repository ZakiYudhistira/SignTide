import type { OnboardingSlide as OnboardingSlideData } from "./onboarding-slides";

type OnboardingSlideProps = {
  slide: OnboardingSlideData;
};

export function OnboardingSlide({ slide }: OnboardingSlideProps) {
  return (
    <article className="flex h-full w-full shrink-0 flex-col items-center px-6 text-center">
      <div className="flex min-h-0 flex-1 items-center justify-center py-4">
        <img
          className="max-h-[min(42dvh,22rem)] w-full max-w-[22rem] object-contain"
          src={slide.illustration.src}
          alt={slide.illustration.alt}
        />
      </div>

      <div className="flex min-h-52 w-full flex-col items-center">
        <h1
          className={`text-heading text-ocean ${
            slide.main ? "font-bubblelemon" : "font-sans"
          }`}
        >
          {slide.title}
        </h1>
        <p className="mt-4 max-w-sm text-body-large text-biru-2">{slide.description}</p>
      </div>
    </article>
  );
}

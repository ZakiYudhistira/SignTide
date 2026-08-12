type OnboardingPaginationProps = {
  activeIndex: number;
  slideCount: number;
  onSelect: (index: number) => void;
};

export function OnboardingPagination({
  activeIndex,
  slideCount,
  onSelect,
}: OnboardingPaginationProps) {
  return (
    <div className="flex items-center justify-center gap-2" aria-label="Onboarding progress">
      {Array.from({ length: slideCount }, (_, index) => {
        const isActive = index === activeIndex;

        return (
          <button
            key={index}
            className={`h-2.5 rounded-full transition-[width,background-color] duration-300 ease-out motion-reduce:transition-none ${
              isActive ? "w-10 bg-orange-2" : "w-14 bg-gray-2"
            }`}
            type="button"
            aria-label={`Go to slide ${index + 1}`}
            aria-current={isActive ? "step" : undefined}
            onClick={() => onSelect(index)}
          />
        );
      })}
    </div>
  );
}

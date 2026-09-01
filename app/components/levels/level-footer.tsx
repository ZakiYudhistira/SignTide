type LevelFooterProps = {
  canContinue: boolean;
  isLastProblem: boolean;
  isSubmitting: boolean;
  onSkip: () => void;
  onContinue: () => void;
};

export function LevelFooter({
  canContinue,
  isLastProblem,
  isSubmitting,
  onSkip,
  onContinue,
}: LevelFooterProps) {
  return (
    <footer className="absolute inset-x-0 bottom-0 border-t-4 border-gray-2 bg-background px-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] pt-5">
      <div className="flex w-full flex-col gap-3">
        {!isLastProblem && (
          <button
            type="button"
            onClick={onSkip}
            className="h-15 rounded-3xl border-4 border-gray-1 bg-white text-button text-neutral-500 transition hover:border-neutral-400"
          >
            Lewati
          </button>
        )}
        {isLastProblem ? (
          <button
            key="finish"
            type="submit"
            disabled={!canContinue || isSubmitting}
            className="h-15 rounded-3xl bg-gray-2 text-button text-neutral-500 transition enabled:bg-green-1 enabled:text-white enabled:hover:bg-green-2 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Memeriksa..." : "Selesai"}
          </button>
        ) : (
          <button
            key="continue"
            type="button"
            disabled={!canContinue}
            onClick={(event) => {
              event.preventDefault();
              onContinue();
            }}
            className="h-15 rounded-3xl bg-gray-2 text-button text-neutral-500 transition enabled:bg-green-1 enabled:text-white enabled:hover:bg-green-2 disabled:cursor-not-allowed"
          >
            Lanjutkan
          </button>
        )}
      </div>
    </footer>
  );
}

type LevelFooterProps = {
  canCheck: boolean;
  isChecking: boolean;
  onCheck: () => void;
};

export function LevelFooter({ canCheck, isChecking, onCheck }: LevelFooterProps) {
  return (
    <footer className="absolute inset-x-0 bottom-0 border-t-4 border-gray-2 bg-background px-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] pt-5">
      <button
        type="button"
        disabled={!canCheck || isChecking}
        onClick={onCheck}
        className="h-16 w-full rounded-3xl bg-gray-2 text-button text-neutral-500 transition enabled:bg-green-2 enabled:text-white enabled:shadow-[0_6px_0_#7ac70c] enabled:active:translate-y-1 enabled:active:shadow-[0_2px_0_#7ac70c] disabled:cursor-not-allowed"
      >
        {isChecking ? "Memeriksa..." : "Periksa"}
      </button>
    </footer>
  );
}

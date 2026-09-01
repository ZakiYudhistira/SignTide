import { Heart, X } from "lucide-react";

type LevelHeaderProps = {
  progress: number;
  lives: number;
  onExit: () => void;
};

export function LevelHeader({ progress, lives, onExit }: LevelHeaderProps) {
  return (
    <header className="flex items-center gap-3 px-5 pb-6 pt-7">
      <button
        type="button"
        aria-label="Keluar dari level"
        onClick={onExit}
        className="shrink-0 text-gray-1 transition-colors hover:text-navy-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ocean"
      >
        <X className="size-10 stroke-[4]" />
      </button>

      <div
        className="h-5 flex-1 overflow-hidden rounded-full bg-gray-3"
        aria-label="Kemajuan level"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress)}
      >
        <div className="h-full rounded-full bg-green-1 transition-[width] duration-300" style={{ width: `${progress}%` }} />
      </div>

      <div className="flex items-center gap-1.5 text-red-2" aria-label={`${lives} nyawa`}>
        <Heart className="size-7 fill-current" />
        <span className="text-2xl font-bold">{lives}</span>
      </div>
    </header>
  );
}

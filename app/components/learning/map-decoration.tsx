import { mapPosition, MAP_WIDTH } from "~/lib/learning/map-position";
import type { MapDecorationData } from "~/models/learning";

type MapDecorationProps = {
  decoration: MapDecorationData;
};

export function MapDecoration({ decoration }: MapDecorationProps) {
  return (
    <img
      className="pointer-events-none absolute h-auto -translate-x-1/2 -translate-y-1/2 object-contain"
      style={{
        width: `${(decoration.width / MAP_WIDTH) * 100}%`,
        zIndex: decoration.zIndex ?? 1,
        ...mapPosition(decoration.x, decoration.y),
      }}
      src={decoration.image}
      alt={decoration.alt}
    />
  );
}

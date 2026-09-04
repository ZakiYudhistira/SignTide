import { mapPosition } from "~/lib/learning/map-position";
import type { ActMapConfig, MapDecorationData } from "~/models/learning";

type MapDecorationProps = {
  decoration: MapDecorationData;
  map: ActMapConfig;
};

export function MapDecoration({ decoration, map }: MapDecorationProps) {
  return (
    <img
      className="pointer-events-none absolute h-auto -translate-x-1/2 -translate-y-1/2 object-contain"
      style={{
        width: `${(decoration.width / map.width) * 100}%`,
        zIndex: decoration.zIndex ?? 1,
        ...mapPosition(decoration.x, decoration.y, map),
      }}
      src={decoration.image}
      alt={decoration.alt}
    />
  );
}

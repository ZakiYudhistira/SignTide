export function mapPosition(
  x: number,
  y: number,
  map: { width: number; height: number },
) {
  return {
    left: `${(x / map.width) * 100}%`,
    top: `${(y / map.height) * 100}%`,
  };
}

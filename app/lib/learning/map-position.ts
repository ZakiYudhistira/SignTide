export const MAP_WIDTH = 390;
export const MAP_HEIGHT = 1050;

export function mapPosition(x: number, y: number) {
  return {
    left: `${(x / MAP_WIDTH) * 100}%`,
    top: `${(y / MAP_HEIGHT) * 100}%`,
  };
}

const SLOWDOWN = 1.5;

export enum WalkingDirection {
  Down = 0,
  DownRight = 1,
  Right = 2,
  UpRight = 3,
  Up = 4,
  UpLeft = 5,
  Left = 6,
  DownLeft,
}

// Taken from AnimData.xml
export type WanderingAnimation = {
  frameWidth: number;
  frameHeight: number;
  durations: number[]; // ticks
};

export const getWanderingSprite = (pokemonId: number) => {
  return `assets/sprites/walking/${pokemonId}.png`;
};

export const getWalkCycleMs = (animation: WanderingAnimation) => {
  const sumTicks = animation.durations.reduce((acc, duration) => acc + duration, 0);
  const milliseconds = sumTicks * (1000 / 60); // Convert ticks to milliseconds (assuming 60 ticks per second)

  return milliseconds * SLOWDOWN;
};

export const getDirectionFromVector = (dx: number, dy: number): WalkingDirection => {
  const theta = Math.atan2(dy, dx);
  const translatedTheta = Math.PI / 2 - theta;
  const directionIndex = Math.round(translatedTheta / (Math.PI / 4));
  return (directionIndex + 8) % 8;
};

export const pickTarget = (
  bounds: { x: number; y: number; width: number; height: number },
  margin: number,
  from: { x: number; y: number } = { x: 0, y: 0 },
  maxLeg: number = 100,
): { x: number; y: number } => {
  // First, we pick a random point within the bounds, by taking the margin into account. This ensures that the wanderer doesn't walk outside of the bounds.
  const minX = Math.max(bounds.x + margin, from.x - maxLeg);
  const maxX = Math.min(bounds.x + bounds.width - margin, from.x + maxLeg);
  const randomX = Math.random() * (maxX - minX) + minX;

  const minY = Math.max(bounds.y + margin, from.y - maxLeg);
  const maxY = Math.min(bounds.y + bounds.height - margin, from.y + maxLeg);
  const randomY = Math.random() * (maxY - minY) + minY;

  return {
    x: randomX,
    y: randomY,
  };
};

export const animatedSprites: Record<number, WanderingAnimation> = {
  1: {
    durations: [4, 4, 4, 4, 4, 4],
    frameHeight: 40,
    frameWidth: 40,
  },
};

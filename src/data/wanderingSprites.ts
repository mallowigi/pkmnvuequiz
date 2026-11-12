const SLOWDOWN = 1.5;
const MIN_LEG_MS = 500;

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

type Rectangle = { x: number; y: number; width: number; height: number };
type Point = { x: number; y: number };

const randomBetween = (min: number, max: number) => Math.random() * (max - min) + min;

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

export const pickTarget = (bounds: Rectangle, margin: number, from: Point, maxLeg: number): Point => {
  const left = bounds.x + Math.min(margin, bounds.width / 2);
  const right = bounds.x + bounds.width - Math.min(margin, bounds.width / 2);
  const top = bounds.y + Math.min(margin, bounds.height / 2);
  const bottom = bounds.y + bounds.height - Math.min(margin, bounds.height / 2);

  const origin = {
    x: clamp(from.x, left, right),
    y: clamp(from.y, top, bottom),
  };

  return {
    x: randomBetween(Math.max(left, origin.x - maxLeg), Math.min(right, origin.x + maxLeg)),
    y: randomBetween(Math.max(top, origin.y - maxLeg), Math.min(bottom, origin.y + maxLeg)),
  };
};

export const getLegDurationMs = (distance: number, speed: number) => {
  return Math.max((distance / (speed || 30)) * 1000, MIN_LEG_MS);
};

export const animatedSprites: Record<number, WanderingAnimation> = {
  1: {
    durations: [4, 4, 4, 4, 4, 4],
    frameHeight: 40,
    frameWidth: 40,
  },
};

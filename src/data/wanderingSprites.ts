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

export const animatedSprites: Record<number, WanderingAnimation> = {
  1: {
    durations: [4, 4, 4, 4, 4, 4],
    frameHeight: 40,
    frameWidth: 40,
  },
};

export enum WalkingDirection {
  Down,
  DownLeft,
  Left,
  UpLeft,
  Up,
  UpRight,
  Right,
  DownRight,
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

export const animatedSprites: Record<number, WanderingAnimation> = {
  1: {
    durations: [
      4.4,
      4,
      4,
      4,
      4,
    ],
    frameHeight: 40,
    frameWidth: 40,
  },
};

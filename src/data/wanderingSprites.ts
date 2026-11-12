import { type WanderingAnimation } from '@/types.ts';

/**
 * Walk animation data per national dex number, filled by `loadAnimatedSprites`.
 * Generated from each species' AnimData.xml; the sheet is `assets/sprites/walking/<dexNum>.png`.
 */
export const animatedSprites: Record<number, WanderingAnimation> = {};

let loading: Promise<void> | null = null;

/** Loads the animation data once, keeping the large JSON out of the initial bundle. */
export const loadAnimatedSprites = (): Promise<void> => {
  loading ??= import('@/data/wanderingSprites.json').then((module) => {
    Object.assign(animatedSprites, module.default);
  });
  return loading;
};

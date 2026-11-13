import { type WanderingAnimation } from '@/types.ts';

/**
 * Walk animation data per Pokémon id (see pokemon.json), filled by `loadAnimatedSprites`.
 * Generated from each form's AnimData.xml; the sheet is `assets/sprites/walking/<id>.png`,
 * with an optional `<id>-shiny.png` when `shiny` is set.
 */
export const animatedSprites: Record<string, WanderingAnimation> = {};

const SHINY_SUFFIX = '-shiny';

/** A sprite key is a Pokémon id, suffixed with `-shiny` to use the shiny sheet. */
export const toSpriteKey = (id: string, shiny: boolean): string => {
  return shiny && animatedSprites[id]?.shiny ? `${id}${SHINY_SUFFIX}` : id;
};

export const getAnimation = (spriteKey: string): WanderingAnimation | undefined => {
  return animatedSprites[spriteKey.replace(SHINY_SUFFIX, '')];
};

let loading: Promise<void> | null = null;

/** Loads the animation data once, keeping the large JSON out of the initial bundle. */
export const loadAnimatedSprites = (): Promise<void> => {
  loading ??= import('@/data/wanderingSprites.json').then((module) => {
    Object.assign(animatedSprites, module.default);
  });
  return loading;
};

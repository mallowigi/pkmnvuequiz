import type { ChallengeMode, Gen, RegionBox, Type } from '@/types.ts';

// Named move families exclusive to AttackDex's `movetype` game mode.
export type MoveType = 'zmove' | 'max' | 'gmax';

// `variable` covers Max/G-Max moves whose category is inherited from
// whichever base move triggered them rather than being fixed by the move
// itself (see catalog import notes for details).
export type DamageCategory = 'physical' | 'special' | 'status' | 'variable';

// Mirrors the reused `gen`/`types`/`movetype` game modes. Standard selections
// reuse the shared gen/type stores; `movetype` always covers every Special
// family at once, the same way the Pokemon `special` mode has no sub-picker.
export type AttackDexGame = { kind: 'gen'; gens: Gen[] } | { kind: 'types'; types: Type[] } | { kind: 'movetype' };

export type AttackDexSessionOptions = {
  challengeMode: ChallengeMode;
  selection: AttackDexGame;
};

export type MoveVariant = {
  accuracy: number | null;
  apiId: number | null;
  category: DamageCategory;
  description: string | null;
  effect: string | null;
  name: string;
  power: number | null;
  pp: number | null;
  type: Type;
};

export type MovePlacement =
  | {
      box?: RegionBox;
      gen: Gen;
      scope: 'standard';
    }
  | {
      moveType: MoveType;
      scope: 'special';
    };

export type AttackDexMove = {
  aliases: string[];
  id: string;
  name: string;
  placement: MovePlacement;
  variants: MoveVariant[];
};

export type MoveStatus = {
  isFound: boolean;
  isMissed: boolean;
  isShadowed: boolean;
  lastFoundAt: number | null;
  lastShadowedAt: number | null;
};

export type AttackDexProgress = {
  moves: Record<string, MoveStatus>;
  lastFoundMoveId: string | null;
};

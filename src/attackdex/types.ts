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

// Catalog entries are flat (no nested `placement`/`variants` objects) since
// the game only needs the fields below to run a quiz; richer per-language
// text (description/effect) is fetched live from PokeAPI on demand instead
// of being cached here (see `AttackInfo`/live-fetch notes in #72).
export type AttackDexMove =
  | {
      accuracy: number | null;
      box?: RegionBox;
      category: DamageCategory;
      gen: Gen;
      id: string;
      name: string;
      power: number | null;
      pp: number | null;
      scope: 'standard';
      type: Type;
    }
  | {
      accuracy: number | null;
      category: DamageCategory;
      id: string;
      moveType: MoveType;
      name: string;
      power: number | null;
      pp: number | null;
      scope: 'special';
      type: Type;
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

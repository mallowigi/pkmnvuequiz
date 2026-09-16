import type { ChallengeMode, Gen, RegionBox, Type } from '@/types.ts';

export type MoveType = 'zmove' | 'max' | 'gmax';

export type DamageCategory = 'physical' | 'special' | 'status' | 'variable';

export type DamageCategoryInfo = {
  id: DamageCategory;
  name: string;
};

export type AttackDexGame =
  | {
      kind: 'gen';
      gens: Gen[];
    }
  | {
      kind: 'types';
      types: Type[];
    }
  | {
      kind: 'movetype';
    };

export type AttackDexSessionOptions = {
  challengeMode: ChallengeMode;
  selection: AttackDexGame;
};

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

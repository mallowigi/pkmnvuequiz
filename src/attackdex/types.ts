import type { ChallengeMode, Gen, RegionBox, Translations, Type } from '@/types.ts';

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

export type Attack =
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
      gen: Gen;
      id: string;
      moveType: MoveType;
      name: string;
      power: number | null;
      pp: number | null;
      scope: 'special';
      type: Type;
    };

export type AttackStatus = {
  isFound: boolean;
  isMissed: boolean;
  isShadowed: boolean;
  lastFoundAt: number | null;
  lastShadowedAt: number | null;
};

export type AttackDexData = {
  error: unknown;
  isLoaded: boolean;
  attacks: Attack[] | null;
  translations: Record<string, Translations> | null;
};

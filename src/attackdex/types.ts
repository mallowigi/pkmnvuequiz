import type { ChallengeMode, Gen, Type } from '@/types.ts';

export type AttackDexScope = 'standard' | 'special';

export type AttackDexGameMode = 'gen' | 'types' | 'special';

export type MoveType = 'zmove' | 'max' | 'gmax';

export type DamageCategory = 'physical' | 'special' | 'status';

export type AttackDexStandardGame =
  | {
      kind: 'gen';
      scope: 'standard';
      gens: Gen[];
    }
  | {
      kind: 'types';
      scope: 'standard';
      types: Type[];
    };

export type AttackDexSpecialGame = {
  kind: 'special';
  scope: 'special';
  moveTypes: MoveType[];
};

export type AttackDexGame = AttackDexStandardGame | AttackDexSpecialGame;

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

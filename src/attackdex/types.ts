import type { ChallengeMode, Gen, Type } from '@/types.ts';

/**
 * The catalog boundary is intentionally separate from the Pokemon game mode.
 * Standard moves are grouped by source generation; Special moves are grouped
 * by their move family.
 */
export type AttackDexScope = 'standard' | 'special';

export type AttackDexSelectionKind = 'generation' | 'type' | 'family';

export type AttackDexSpecialFamily = 'zmove' | 'max' | 'gmax';

export type MoveDamageCategory = 'physical' | 'special' | 'status';

export type AttackDexPlaystyle = 'normal';

export type AttackDexStandardSelection =
  | {
      kind: 'generation';
      scope: 'standard';
      generations: Gen[];
    }
  | {
      kind: 'type';
      scope: 'standard';
      types: Type[];
    };

export type AttackDexSpecialSelection = {
  families: AttackDexSpecialFamily[];
  kind: 'family';
  scope: 'special';
};

export type AttackDexSelection = AttackDexStandardSelection | AttackDexSpecialSelection;

export type AttackDexSessionOptions = {
  challengeMode: ChallengeMode;
  playstyle: AttackDexPlaystyle;
  selection: AttackDexSelection;
};

/**
 * A named move can have multiple source records while remaining one guessable
 * entry. For example, same-name Physical and Special records stay available
 * as variants in the details view.
 */
export type AttackDexMoveVariant = {
  accuracy: number | null;
  apiId: number | null;
  category: MoveDamageCategory;
  description: string | null;
  effect: string | null;
  name: string;
  power: number | null;
  pp: number | null;
  type: Type;
};

export type AttackDexMovePlacement =
  | {
      generation: Gen;
      scope: 'standard';
    }
  | {
      family: AttackDexSpecialFamily;
      scope: 'special';
    };

export type AttackDexMove = {
  aliases: string[];
  id: string;
  name: string;
  placement: AttackDexMovePlacement;
  variants: AttackDexMoveVariant[];
};

export type AttackDexMoveStatus = {
  isFound: boolean;
  isMissed: boolean;
  isShadowed: boolean;
  lastFoundAt: number | null;
  lastShadowedAt: number | null;
};

export type AttackDexProgress = {
  moves: Record<string, AttackDexMoveStatus>;
  lastFoundMoveId: string | null;
};

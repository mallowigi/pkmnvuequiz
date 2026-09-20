import type { DexEntry } from '@/composables/useCurrentDex.ts';
import type { AttackStatus, PokemonStatus, RegionBox, SpecialType, Type, GameMode } from '@/types.ts';

export type DexId = 'pokemon' | 'attack';

export type DexCapabilities = {
  readonly hasOrder: boolean;
  readonly hasShiny: boolean;
  readonly hasCries: boolean;
  readonly hasSpriteCycle: boolean;
  readonly hasMultiplayer: boolean;
  readonly hasLeaderboards: boolean;
};

export type SummaryTextParams = {
  numFound: number;
  elapsed: string;
};

export type ShareTextParams = SummaryTextParams & {
  regionOrType: string;
  score: number;
  url: string;
};

export type ShuffleBoxes = {
  box: RegionBox | null;
  specialBox: SpecialType | null;
  megaBox: RegionBox | null;
};

export type DexStrategy<T = DexEntry> = {
  readonly id: DexId;
  readonly capabilities: DexCapabilities;
  readonly getEntityType: () => string; // e.g., "Pokémon" or "Attack"
  readonly getSummaryText: (params: SummaryTextParams) => string; // What we display in EndOverlay
  readonly getShareText: (params: ShareTextParams) => string; // What we display in ShareOverlay
  readonly getNumFound: () => number;
  readonly getNumShadows: () => number;
  readonly getRemaining: () => Set<string>;
  readonly getMissed: () => Set<T>;
  readonly showRemaining: () => void;
  readonly showRemainingShadows: () => void;
  readonly reset: () => void;
  readonly getRandomRemaining: () => T | null;
  readonly addFound: (entries: T[]) => void;
  readonly find: (input: string) => T[] | undefined;
  readonly findClosest: (input: string) => string | null;
  readonly getStatus: (entry: T) => PokemonStatus | AttackStatus;
  readonly isInCurrentGameMode: (entries: T[]) => boolean;
  readonly isAlreadyFound: (entries: T[]) => boolean;
  readonly isPartOfAnotherEntry: (value: string) => boolean;
  readonly prefillRemaining: () => void;
  readonly addRandomShadow: () => void;
  readonly getCurrentGameModeEntries: () => Map<string, T[]>;
  readonly recordGameEnd: () => void;
  readonly recordGiveUp: () => void;
  readonly getShuffleType: (entry: T) => Type;
  readonly getShuffleBoxes: (entry: T) => ShuffleBoxes;
  readonly getNextCheatName: () => string;
  readonly activateNextCry: () => void;
  readonly isWrongOrder: (entries: T[]) => boolean;
  readonly getEntryTypes: (entries: T[]) => Set<Type | null | undefined>;
  readonly getShuffleBoxViolation: (
    entries: T[],
    gameMode: GameMode | null | undefined,
  ) => RegionBox | SpecialType | null;
  readonly playFoundSound: (entry: T) => void;
};

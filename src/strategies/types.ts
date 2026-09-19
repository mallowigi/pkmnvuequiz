import type { DexEntry } from '@/composables/useCurrentDex.ts';

export type DexId = 'pokemon' | 'attack';

export type DexCapabilities = {
  readonly hasOrder: boolean;
  readonly hasShiny: boolean;
  readonly hasCries: boolean;
  readonly hasSpriteCycle: boolean;
  readonly hasMultiplayer: boolean;
  readonly hasLeaderboards: boolean;
};

export type DexStrategy<T = DexEntry> = {
  readonly id: DexId;
  readonly capabilities: DexCapabilities;
  readonly getEntityType: () => string; // e.g., "Pokémon" or "Attack"
  readonly getSummaryText: () => string; // What we display in EndOverlay
  readonly getShareText: () => string; // What we display in ShareOverlay
};

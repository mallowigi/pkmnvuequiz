import type { DexEntry } from '@/composables/useCurrentDex.ts';
import { i18n } from '@/main.ts';
import { useAttacks } from '@/stores/useAttacks.ts';
import type { DexStrategy, DexId, SummaryTextParams, ShareTextParams } from '@/strategies/types.ts';
import type { Attack } from '@/types.ts';

export const useAttackDexStrategy = (): DexStrategy => {
  const attacks = useAttacks();

  const id: DexId = 'attack';

  const capabilities = {
    hasCries: false,
    hasLeaderboards: false,
    hasMultiplayer: false,
    hasOrder: false,
    hasShiny: false,
    hasSpriteCycle: false,
  };

  const getEntityType = () => i18n.global.t('attack');

  const getSummaryText = (params: SummaryTextParams) => i18n.global.t('endOverlay.summaryAttack', params);

  const getShareText = (params: ShareTextParams) => i18n.global.t('endOverlay.shareTextAttack', params);

  const getNumFound = () => attacks.numFound;

  const getNumShadows = () => attacks.numShadows;

  const getRemaining = () => attacks.remaining;

  const getMissed = () => attacks.missed;

  const showRemaining = () => attacks.showRemaining();

  const showRemainingShadows = () => attacks.showRemainingShadows();

  const reset = () => attacks.resetAttacksState();

  const getRandomRemaining = (): Attack | null => attacks.getRandomRemainingAttack();

  const addFound = (entries: DexEntry[]) => attacks.addFound(entries as Attack[]);

  const find = (input: string): Attack[] | undefined => attacks.findAttack(input);

  const findClosest = (input: string): string | null => attacks.findClosestAttack(input);

  const getStatus = (entry: DexEntry) => attacks.getStatus(entry as Attack);

  const isInCurrentGameMode = (entries: DexEntry[]) => attacks.isAttackInCurrentGameMode(entries as Attack[]);

  const isAlreadyFound = (entries: DexEntry[]) => attacks.isAlreadyFound(entries as Attack[]);

  const isPartOfAnotherEntry = (value: string) => attacks.isInRemaining(value);

  const prefillRemaining = () => attacks.prefillRemaining();

  const addRandomShadow = () => attacks.addRandomShadow();

  const getCurrentGameModeEntries = (): Map<string, Attack[]> => attacks.getCurrentGameModeAttacks();

  return {
    addFound,
    addRandomShadow,
    capabilities,
    find,
    findClosest,
    getCurrentGameModeEntries,
    getEntityType,
    getMissed,
    getNumFound,
    getNumShadows,
    getRandomRemaining,
    getRemaining,
    getShareText,
    getStatus,
    getSummaryText,
    id,
    isAlreadyFound,
    isInCurrentGameMode,
    isPartOfAnotherEntry,
    prefillRemaining,
    reset,
    showRemaining,
    showRemainingShadows,
  };
};

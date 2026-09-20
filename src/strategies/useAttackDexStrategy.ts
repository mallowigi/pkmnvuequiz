import type { DexEntry } from '@/composables/useCurrentDex.ts';
import { usePlaySounds } from '@/composables/usePlaySounds.ts';
import { i18n } from '@/main.ts';
import { useAttacks } from '@/stores/useAttacks.ts';
import { useCurrentBox } from '@/stores/useCurrentBox.ts';
import { useMessages } from '@/stores/useMessages.ts';
import { useProfile } from '@/stores/useProfile.ts';
import type { DexStrategy, DexId, SummaryTextParams, ShareTextParams, ShuffleBoxes } from '@/strategies/types.ts';
import type { Attack, RegionBox, SpecialType, Type } from '@/types.ts';

export const useAttackDexStrategy = (): DexStrategy => {
  const attacks = useAttacks();
  const { incrementAttackDexWins } = useProfile();
  const { showUserMessage } = useMessages();
  const { playClick } = usePlaySounds();
  const { currentBoxState } = useCurrentBox();

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

  const recordGameEnd = () => {
    void incrementAttackDexWins();
  };

  const recordGiveUp = () => {
    /* no-op */
  };

  const getShuffleType = (entry: DexEntry): Type => (entry as Attack).type;

  const getShuffleBoxes = (entry: DexEntry): ShuffleBoxes => ({
    box: (entry as Attack).box ?? null,
    megaBox: null,
    specialBox: null,
  });

  const getNextCheatName = (): string => attacks.getRandomRemainingAttack()?.name ?? '???';

  // Attacks have no cry, so mirror the existing disabled-helper feedback.
  const activateNextCry = () => {
    showUserMessage(i18n.global.t('criesHelperDisabled'));
  };

  // Attacks have no order concept.
  const isWrongOrder = () => false;

  const getEntryTypes = (entries: DexEntry[]): Set<Type | null | undefined> => {
    const foundAttacks = entries as Attack[];
    return new Set(foundAttacks.map((a) => a.type));
  };

  const getShuffleBoxViolation = (entries: DexEntry[]): RegionBox | null => {
    const foundAttacks = entries as Attack[];
    const currentBox = currentBoxState.currentBox;
    const boxes = new Set(foundAttacks.map((a) => a.box));

    if (currentBox && !boxes.has(currentBox)) return currentBox;

    return null;
  };

  const playFoundSound = () => playClick();

  const getBoxEntries = (boxId: RegionBox | SpecialType): Attack[] => {
    const attacksByName = attacks.getCurrentGameModeBoxAttacks(boxId as RegionBox);
    return Array.from(attacksByName.values()).map((moves) => moves[0]);
  };

  const isBoxComplete = (boxId: RegionBox | SpecialType): boolean => {
    const boxAttacks = getBoxEntries(boxId);
    return boxAttacks.length > 0 && boxAttacks.every((attack) => attacks.getStatus(attack).isFound);
  };

  return {
    activateNextCry,
    addFound,
    addRandomShadow,
    capabilities,
    find,
    findClosest,
    getBoxEntries,
    getCurrentGameModeEntries,
    getEntityType,
    getEntryTypes,
    getMissed,
    getNextCheatName,
    getNumFound,
    getNumShadows,
    getRandomRemaining,
    getRemaining,
    getShareText,
    getShuffleBoxViolation,
    getShuffleBoxes,
    getShuffleType,
    getStatus,
    getSummaryText,
    id,
    isAlreadyFound,
    isBoxComplete,
    isInCurrentGameMode,
    isPartOfAnotherEntry,
    isWrongOrder,
    playFoundSound,
    prefillRemaining,
    recordGameEnd,
    recordGiveUp,
    reset,
    showRemaining,
    showRemainingShadows,
  };
};

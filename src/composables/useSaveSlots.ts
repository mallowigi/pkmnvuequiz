import { useTranslations } from '@/composables/useTranslations.ts';
import type { SaveData } from '@/types.ts';

export const MAX_SAVE_SLOTS = 5;

export type SaveSlotRef = { id: string };

export type RelativeTimeParts =
  | { unit: 'justNow' }
  | { unit: 'minutesAgo' | 'hoursAgo' | 'daysAgo'; count: number }
  | { unit: 'date'; date: Date };

/** Cloud save slot helpers: pruning selection, mode/relative-time/elapsed-time formatting. */
export const useSaveSlots = () => {
  const { getGenTranslation, getGameModeTranslation, getTypeTranslation } = useTranslations();

  /**
   * Given save-slot refs already ordered most-recent-first (e.g. by `updatedAt` desc), returns the ones beyond the slot
   * cap that should be pruned.
   */
  const getOldSlots = <T extends SaveSlotRef>(slots: T[], maxSlots: number = MAX_SAVE_SLOTS): T[] => {
    return slots.slice(maxSlots);
  };

  /** Builds a short human-readable summary of a save slot's game selection (e.g. "Kanto, Johto"). */
  const getSaveSlotSummary = (save: Pick<SaveData, 'gameMode' | 'gens' | 'types'>): string => {
    switch (save.gameMode) {
      case 'gen': {
        const label = (save.gens ?? []).map((gen) => getGenTranslation(gen)).join(', ');
        return label || getGameModeTranslation('gen');
      }
      case 'types': {
        const label = (save.types ?? []).map((type) => getTypeTranslation(type)).join(', ');
        return label || getGameModeTranslation('types');
      }
      default:
        return getGameModeTranslation(save.gameMode);
    }
  };

  /** Buckets a past timestamp into a relative-time description ("just now", "N hours ago", etc). */
  const getRelativeTimeParts = (fromMs: number, nowMs: number = Date.now()): RelativeTimeParts => {
    const diffMs = Math.max(0, nowMs - fromMs);
    const diffMinutes = Math.floor(diffMs / 60_000);

    if (diffMinutes < 1) return { unit: 'justNow' };
    if (diffMinutes < 60) return { count: diffMinutes, unit: 'minutesAgo' };

    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return { count: diffHours, unit: 'hoursAgo' };

    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) return { count: diffDays, unit: 'daysAgo' };

    return { date: new Date(fromMs), unit: 'date' };
  };

  return {
    getOldSlots,
    getRelativeTimeParts,
    getSaveSlotSummary,
  };
};

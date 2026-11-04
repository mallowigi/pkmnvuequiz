import { useProfile } from '@/stores/useProfile.ts';
import type { Profile } from '@/types';

export function useBufferedTotalStats() {
  const { profileState, saveUserProfile } = useProfile();

  let batchedScore = 0;
  let batchedPlayTime = 0;

  const FLUSH_INTERVAL = 30000; // 30 seconds
  let flushTimer: ReturnType<typeof setInterval> | null = null;

  const startFlushTimer = () => {
    if (flushTimer) return;

    flushTimer = setInterval(() => {
      flushTotalStats();
    }, FLUSH_INTERVAL);
  };

  const stopFlushTimer = () => {
    if (flushTimer) {
      clearInterval(flushTimer);
      flushTimer = null;
    }
  };

  const flushTotalStats = () => {
    if (batchedScore === 0 && batchedPlayTime === 0) return;

    profileState.totalScore += batchedScore;
    profileState.totalPlayTime += batchedPlayTime;

    const stats: Partial<Profile> = {};

    if (batchedScore !== 0) {
      stats.totalScore = profileState.totalScore;
    }

    if (batchedPlayTime !== 0) {
      stats.totalPlayTime = profileState.totalPlayTime;
    }

    batchedScore = 0;
    batchedPlayTime = 0;
    void saveUserProfile(stats);
  };

  const addToTotalScore = (score: number) => {
    batchedScore += score;
    startFlushTimer();
  };

  const addToTotalPlayTime = (seconds: number) => {
    batchedPlayTime += seconds;
    startFlushTimer();
  };

  return {
    addToTotalPlayTime,
    addToTotalScore,
    flushTotalStats,
    stopFlushTimer,
  };
}

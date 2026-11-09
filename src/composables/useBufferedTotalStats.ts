import { useGlobalStats } from '@/stores/useGlobalStats.ts';

export function useBufferedTotalStats() {
  const { addToTotals } = useGlobalStats();

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
    addToTotals(batchedScore, batchedPlayTime);

    batchedScore = 0;
    batchedPlayTime = 0;
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

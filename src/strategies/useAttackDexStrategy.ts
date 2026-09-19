import { i18n } from '@/main.ts';
import type { DexStrategy, DexId } from '@/strategies/types.ts';

export const useAttackDexStrategy = (): DexStrategy => {
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

  const getSummaryText = () => i18n.global.t('endOverlay.summaryAttack');

  const getShareText = () => i18n.global.t('endOverlay.shareTextAttack');

  return {
    capabilities,
    getEntityType,
    getShareText,
    getSummaryText,
    id,
  };
};

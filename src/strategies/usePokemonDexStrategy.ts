import { i18n } from '@/main.ts';
import type { DexStrategy, DexId } from '@/strategies/types.ts';

export const usePokemonDexStrategy = (): DexStrategy => {
  const id: DexId = 'pokemon';

  const capabilities = {
    hasCries: true,
    hasLeaderboards: true,
    hasMultiplayer: true,
    hasOrder: true,
    hasShiny: true,
    hasSpriteCycle: true,
  };

  const getEntityType = () => i18n.global.t('pokemon');

  const getSummaryText = () => i18n.global.t('endOverlay.summary');

  const getShareText = () => i18n.global.t('endOverlay.shareText');

  return {
    capabilities,
    getEntityType,
    getShareText,
    getSummaryText,
    id,
  };
};

import { acceptHMRUpdate, defineStore } from 'pinia';
import { MoveClient, type Move } from 'pokenode-ts';
import { reactive, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import type { Attack, AttackDetails } from '@/types.ts';
import { getMoveArtworkUrl } from '@/utils/utils.ts';

interface AttackDetailsState {
  currentAttack: AttackDetails | null;
  detailsMap: Map<string, AttackDetails>;
  error: string | null;
  isOpen: boolean;
  loading: boolean;
}

export const useAttackDetails = defineStore('attackDetails', () => {
  const { locale } = useI18n();
  const attackDetailsState = reactive<AttackDetailsState>({
    currentAttack: null,
    detailsMap: new Map<string, AttackDetails>(),
    error: null,
    isOpen: false,
    loading: false,
  });

  const api = new MoveClient();

  // Flavor/effect text is fetched per-locale, so a language switch invalidates the cache.
  watch(locale, () => {
    attackDetailsState.detailsMap.clear();
  });

  const closeDetails = () => {
    attackDetailsState.isOpen = false;
  };

  /** Clears any pending/displayed selection, used when the quiz session changes. */
  const resetAttackDetails = () => {
    attackDetailsState.isOpen = false;
    attackDetailsState.currentAttack = null;
    attackDetailsState.error = null;
    attackDetailsState.loading = false;
  };

  const getLanguageCode = (lang: string) => {
    switch (lang) {
      case 'jp':
        return 'ja';
      case 'zh':
        return 'zh-Hant';
      case 'cn':
        return 'zh-Hans';
      case 'pt':
        return 'pt-BR';
      default:
        return lang;
    }
  };

  const fetchInLanguage = <T extends { language: { name: string } }>(list: T[]): T | undefined => {
    const lang = getLanguageCode(locale.value);
    return list.find((entry) => entry.language.name === lang) ?? list.find((entry) => entry.language.name === 'en');
  };

  const fetchDescription = (moveData: Move): string => {
    const flavorEntry = fetchInLanguage(moveData.flavor_text_entries);
    return flavorEntry ? flavorEntry.flavor_text.replace(/\f|\n/g, ' ') : '';
  };

  const fetchEffect = (moveData: Move): string => {
    const effectEntry = fetchInLanguage(moveData.effect_entries);
    if (!effectEntry) return '';

    // Interpolate {effect_chance} the same way PokeAPI consumers are expected to.
    return effectEntry.effect.replace(/\$effect_chance/g, String(moveData.effect_chance ?? ''));
  };

  const fetchAttack = async (attack: Attack): Promise<AttackDetails> => {
    const articleTitle = `${attack.name.replace(/[\s-]/g, '_')}_(move)`;
    const moveData = await api.getMoveByName(attack.id);

    const details: AttackDetails = {
      ...attack,
      artwork: getMoveArtworkUrl(articleTitle),
      description: fetchDescription(moveData),
      effect: fetchEffect(moveData),
    };

    attackDetailsState.detailsMap.set(attack.id, details);
    return details;
  };

  const displayAttackDetails = async (attack: Attack) => {
    const cached = attackDetailsState.detailsMap.get(attack.id);

    attackDetailsState.error = null;
    attackDetailsState.currentAttack = null;
    attackDetailsState.isOpen = true;

    if (cached) {
      attackDetailsState.currentAttack = cached;
      return;
    }

    try {
      attackDetailsState.loading = true;
      attackDetailsState.currentAttack = await fetchAttack(attack);
    } catch (e) {
      attackDetailsState.error = `Failed to fetch details for move: ${attack.name}. Error: ${e instanceof Error ? e.message : String(e)}`;
    } finally {
      attackDetailsState.loading = false;
    }
  };

  return {
    attackDetailsState,
    closeDetails,
    displayAttackDetails,
    resetAttackDetails,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAttackDetails, import.meta.hot));
}

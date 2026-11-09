import { useI18n } from 'vue-i18n';

import { useTranslations } from '@/composables/useTranslations.ts';
import { useGlobalStats } from '@/stores/useGlobalStats.ts';
import type { Type } from '@/types.ts';
import { createAchievement } from '@/utils/utils.ts';

export function usePokemonCatcher(type: Type) {
  const { statsState } = useGlobalStats();
  const { getTypeTranslation } = useTranslations();
  const { t } = useI18n({
    messages: {
      cn: {
        bronzeTitle: '属性新手',
        description: '找到 {n} 只{type}属性宝可梦。',
        goldTitle: '属性专家',
        lastDescription: '找到了 10000 只{type}属性宝可梦。',
        lastTitle: '属性大师',
        platinumTitle: '属性达人',
        silverTitle: '属性学徒',
      },
      de: {
        bronzeTitle: 'Typ-Anfänger',
        description: 'Finde {n} {type}-Pokémon.',
        goldTitle: 'Typ-Spezialist',
        lastDescription: '10000 {type}-Pokémon gefunden.',
        lastTitle: 'Typ-Meister',
        platinumTitle: 'Typ-Experte',
        silverTitle: 'Typ-Lehrling',
      },
      en: {
        bronzeTitle: 'Type Novice',
        description: 'Find {n} {type} Pokémon.',
        goldTitle: 'Type Specialist',
        lastDescription: 'Found 10000 {type} Pokémon.',
        lastTitle: 'Type Master',
        platinumTitle: 'Type Expert',
        silverTitle: 'Type Apprentice',
      },
      es: {
        bronzeTitle: 'Novato de tipo',
        description: 'Encuentra {n} Pokémon {type}.',
        goldTitle: 'Especialista de tipo',
        lastDescription: 'Encontró 10000 Pokémon {type}.',
        lastTitle: 'Maestro de tipo',
        platinumTitle: 'Experto de tipo',
        silverTitle: 'Aprendiz de tipo',
      },
      fr: {
        bronzeTitle: 'Novice de type',
        description: 'Trouvez {n} Pokémon {type}.',
        goldTitle: 'Spécialiste de type',
        lastDescription: 'Trouvé 10000 Pokémon {type}.',
        lastTitle: 'Maître de type',
        platinumTitle: 'Expert de type',
        silverTitle: 'Apprenti de type',
      },
      it: {
        bronzeTitle: 'Novizio di tipo',
        description: 'Trova {n} Pokémon {type}.',
        goldTitle: 'Specialista di tipo',
        lastDescription: 'Trovato 10000 Pokémon {type}.',
        lastTitle: 'Maestro di tipo',
        platinumTitle: 'Esperto di tipo',
        silverTitle: 'Apprendista di tipo',
      },
      jp: {
        bronzeTitle: 'タイプ初心者',
        description: '{n}匹の{type}タイプポケモンを見つける。',
        goldTitle: 'タイプスペシャリスト',
        lastDescription: '10000匹の{type}タイプポケモンを見つけた。',
        lastTitle: 'タイプマスター',
        platinumTitle: 'タイプエキスパート',
        silverTitle: 'タイプ見習い',
      },
      ko: {
        bronzeTitle: '타입 초보자',
        description: '{n}마리의 {type} 타입 포켓몬을 찾으세요.',
        goldTitle: '타입 전문가',
        lastDescription: '10000마리의 {type} 타입 포켓몬을 찾았습니다.',
        lastTitle: '타입 마스터',
        platinumTitle: '타입 달인',
        silverTitle: '타입 견습생',
      },
      pt: {
        bronzeTitle: 'Novato de tipo',
        description: 'Encontre {n} Pokémon {type}.',
        goldTitle: 'Especialista de tipo',
        lastDescription: 'Encontrou 10000 Pokémon {type}.',
        lastTitle: 'Mestre de tipo',
        platinumTitle: 'Especialista em tipo',
        silverTitle: 'Aprendiz de tipo',
      },
      ru: {
        bronzeTitle: 'Новичок типа',
        description: 'Найдите {n} Покемонов типа {type}.',
        goldTitle: 'Специалист типа',
        lastDescription: 'Найдено 10000 Покемонов типа {type}.',
        lastTitle: 'Мастер типа',
        platinumTitle: 'Эксперт типа',
        silverTitle: 'Ученик типа',
      },
      zh: {
        bronzeTitle: '屬性新手',
        description: '找到 {n} 隻{type}屬性寶可夢。',
        goldTitle: '屬性專家',
        lastDescription: '找到了 10000 隻{type}屬性寶可夢。',
        lastTitle: '屬性大師',
        platinumTitle: '屬性達人',
        silverTitle: '屬性學徒',
      },
    },
    useScope: 'isolated',
  });

  return createAchievement({
    category: 'pokemon',
    getValue: () => statsState.typeFound[type],
    id: `pokemonCatcher_${type}`,
    get lastDescription() {
      return t('lastDescription', { type: getTypeTranslation(type) });
    },
    get lastTitle() {
      return t('lastTitle');
    },
    priority: 5,
    thresholds: [
      {
        get description() {
          return t('description', { n: 500, type: getTypeTranslation(type) });
        },
        get nextTitle() {
          return t('bronzeTitle');
        },
        rank: 'bronze',
        val: 500,
      },
      {
        get description() {
          return t('description', { n: 1000, type: getTypeTranslation(type) });
        },
        get nextTitle() {
          return t('silverTitle');
        },
        rank: 'silver',
        val: 1000,
      },
      {
        get description() {
          return t('description', { n: 2000, type: getTypeTranslation(type) });
        },
        get nextTitle() {
          return t('goldTitle');
        },
        rank: 'gold',
        val: 2000,
      },
      {
        get description() {
          return t('description', { n: 10000, type: getTypeTranslation(type) });
        },
        get nextTitle() {
          return t('platinumTitle');
        },
        rank: 'platinum',
        val: 10000,
      },
    ],
  });
}

import { useI18n } from 'vue-i18n';

import { useTranslations } from '@/composables/useTranslations.ts';
import { useGlobalStats } from '@/stores/useGlobalStats.ts';
import type { SpecialType } from '@/types.ts';
import { createAchievement } from '@/utils/utils.ts';

export function useSpecialCatcher(specialType: SpecialType) {
  const { getSpecialTypeTranslation } = useTranslations();
  const { t } = useI18n({
    messages: {
      cn: {
        bronzeTitle: '{name}新手',
        description: '找到 {n} 只{name}宝可梦。',
        goldTitle: '{name}专家',
        lastDescription: '找到了 10000 只{name}宝可梦。',
        lastTitle: '{name}大师',
        platinumTitle: '{name}达人',
        silverTitle: '{name}学徒',
      },
      de: {
        bronzeTitle: '{name}-Anfänger',
        description: 'Finde {n} {name}-Pokémon.',
        goldTitle: '{name}-Spezialist',
        lastDescription: '10000 {name}-Pokémon gefunden.',
        lastTitle: '{name}-Meister',
        platinumTitle: '{name}-Experte',
        silverTitle: '{name}-Lehrling',
      },
      en: {
        bronzeTitle: '{name} Novice',
        description: 'Find {n} {name} Pokémon.',
        goldTitle: '{name} Specialist',
        lastDescription: 'Found 10000 {name} Pokémon.',
        lastTitle: '{name} Master',
        platinumTitle: '{name} Expert',
        silverTitle: '{name} Apprentice',
      },
      es: {
        bronzeTitle: 'Novato {name}',
        description: 'Encuentra {n} Pokémon {name}.',
        goldTitle: 'Especialista {name}',
        lastDescription: 'Encontró 10000 Pokémon {name}.',
        lastTitle: 'Maestro {name}',
        platinumTitle: 'Experto {name}',
        silverTitle: 'Aprendiz {name}',
      },
      fr: {
        bronzeTitle: 'Novice {name}',
        description: 'Trouvez {n} Pokémon {name}.',
        goldTitle: 'Spécialiste {name}',
        lastDescription: 'Trouvé 10000 Pokémon {name}.',
        lastTitle: 'Maître {name}',
        platinumTitle: 'Expert {name}',
        silverTitle: 'Apprenti {name}',
      },
      it: {
        bronzeTitle: 'Novizio {name}',
        description: 'Trova {n} Pokémon {name}.',
        goldTitle: 'Specialista {name}',
        lastDescription: 'Trovato 10000 Pokémon {name}.',
        lastTitle: 'Maestro {name}',
        platinumTitle: 'Esperto {name}',
        silverTitle: 'Apprendista {name}',
      },
      jp: {
        bronzeTitle: '{name}初心者',
        description: '{name}のポケモンを{n}匹見つける。',
        goldTitle: '{name}スペシャリスト',
        lastDescription: '{name}のポケモンを10000匹見つけた。',
        lastTitle: '{name}マスター',
        platinumTitle: '{name}エキスパート',
        silverTitle: '{name}見習い',
      },
      ko: {
        bronzeTitle: '{name} 초보자',
        description: '{name} 포켓몬을 {n}마리 찾으세요.',
        goldTitle: '{name} 전문가',
        lastDescription: '{name} 포켓몬을 10000마리 찾았습니다.',
        lastTitle: '{name} 마스터',
        platinumTitle: '{name} 달인',
        silverTitle: '{name} 견습생',
      },
      pt: {
        bronzeTitle: 'Novato {name}',
        description: 'Encontre {n} Pokémon {name}.',
        goldTitle: 'Especialista {name}',
        lastDescription: 'Encontrou 10000 Pokémon {name}.',
        lastTitle: 'Mestre {name}',
        platinumTitle: 'Especialista {name}',
        silverTitle: 'Aprendiz {name}',
      },
      ru: {
        bronzeTitle: 'Новичок ({name})',
        description: 'Найдите {n} Покемонов ({name}).',
        goldTitle: 'Специалист ({name})',
        lastDescription: 'Найдено 10000 Покемонов ({name}).',
        lastTitle: 'Мастер ({name})',
        platinumTitle: 'Эксперт ({name})',
        silverTitle: 'Ученик ({name})',
      },
      zh: {
        bronzeTitle: '{name}新手',
        description: '找到 {n} 隻{name}寶可夢。',
        goldTitle: '{name}專家',
        lastDescription: '找到了 10000 隻{name}寶可夢。',
        lastTitle: '{name}大師',
        platinumTitle: '{name}達人',
        silverTitle: '{name}學徒',
      },
    },
    useScope: 'isolated',
  });

  return createAchievement({
    category: 'pokemon',
    getValue: () => {
      const { statsState } = useGlobalStats();
      return statsState.specialFound[specialType];
    },
    id: `specialCatcher_${specialType}`,
    get lastDescription() {
      return t('lastDescription', { name: getSpecialTypeTranslation(specialType) });
    },
    get lastTitle() {
      return t('lastTitle', { name: getSpecialTypeTranslation(specialType) });
    },
    priority: 5,
    thresholds: [
      {
        get description() {
          return t('description', { n: 500, name: getSpecialTypeTranslation(specialType) });
        },
        get nextTitle() {
          return t('bronzeTitle', { name: getSpecialTypeTranslation(specialType) });
        },
        rank: 'bronze',
        val: 500,
      },
      {
        get description() {
          return t('description', { n: 1000, name: getSpecialTypeTranslation(specialType) });
        },
        get nextTitle() {
          return t('silverTitle', { name: getSpecialTypeTranslation(specialType) });
        },
        rank: 'silver',
        val: 1000,
      },
      {
        get description() {
          return t('description', { n: 2000, name: getSpecialTypeTranslation(specialType) });
        },
        get nextTitle() {
          return t('goldTitle', { name: getSpecialTypeTranslation(specialType) });
        },
        rank: 'gold',
        val: 2000,
      },
      {
        get description() {
          return t('description', { n: 10000, name: getSpecialTypeTranslation(specialType) });
        },
        get nextTitle() {
          return t('platinumTitle', { name: getSpecialTypeTranslation(specialType) });
        },
        rank: 'platinum',
        val: 10000,
      },
    ],
  });
}

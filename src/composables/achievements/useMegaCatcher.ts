import { useI18n } from 'vue-i18n';

import { useGlobalStats } from '@/stores/useGlobalStats.ts';
import type { MegaType } from '@/types.ts';
import { createAchievement } from '@/utils/utils.ts';

export function useMegaCatcher(megaType: MegaType) {
  const label = megaType === 'mega' ? 'Mega' : 'G-Max';
  const { t } = useI18n({
    messages: {
      cn: {
        bronzeTitle: `${label}新手`,
        description: `找到 {n} 只${label}宝可梦。`,
        goldTitle: `${label}专家`,
        lastDescription: `找到了 10000 只${label}宝可梦。`,
        lastTitle: `${label}大师`,
        platinumTitle: `${label}达人`,
        silverTitle: `${label}学徒`,
      },
      de: {
        bronzeTitle: `${label}-Anfänger`,
        description: `Finde {n} ${label}-Pokémon.`,
        goldTitle: `${label}-Spezialist`,
        lastDescription: `10000 ${label}-Pokémon gefunden.`,
        lastTitle: `${label}-Meister`,
        platinumTitle: `${label}-Experte`,
        silverTitle: `${label}-Lehrling`,
      },
      en: {
        bronzeTitle: `${label} Novice`,
        description: `Find {n} ${label} Pokémon.`,
        goldTitle: `${label} Specialist`,
        lastDescription: `Found 10000 ${label} Pokémon.`,
        lastTitle: `${label} Master`,
        platinumTitle: `${label} Expert`,
        silverTitle: `${label} Apprentice`,
      },
      es: {
        bronzeTitle: `Novato ${label}`,
        description: `Encuentra {n} Pokémon ${label}.`,
        goldTitle: `Especialista ${label}`,
        lastDescription: `Encontró 10000 Pokémon ${label}.`,
        lastTitle: `Maestro ${label}`,
        platinumTitle: `Experto ${label}`,
        silverTitle: `Aprendiz ${label}`,
      },
      fr: {
        bronzeTitle: `Novice ${label}`,
        description: `Trouvez {n} Pokémon ${label}.`,
        goldTitle: `Spécialiste ${label}`,
        lastDescription: `Trouvé 10000 Pokémon ${label}.`,
        lastTitle: `Maître ${label}`,
        platinumTitle: `Expert ${label}`,
        silverTitle: `Apprenti ${label}`,
      },
      it: {
        bronzeTitle: `Novizio ${label}`,
        description: `Trova {n} Pokémon ${label}.`,
        goldTitle: `Specialista ${label}`,
        lastDescription: `Trovato 10000 Pokémon ${label}.`,
        lastTitle: `Maestro ${label}`,
        platinumTitle: `Esperto ${label}`,
        silverTitle: `Apprendista ${label}`,
      },
      jp: {
        bronzeTitle: `${label}初心者`,
        description: `{n}匹の${label}ポケモンを見つける。`,
        goldTitle: `${label}スペシャリスト`,
        lastDescription: `10000匹の${label}ポケモンを見つけた。`,
        lastTitle: `${label}マスター`,
        platinumTitle: `${label}エキスパート`,
        silverTitle: `${label}見習い`,
      },
      ko: {
        bronzeTitle: `${label} 초보자`,
        description: `{n}마리의 ${label} 포켓몬을 찾으세요.`,
        goldTitle: `${label} 전문가`,
        lastDescription: `10000마리의 ${label} 포켓몬을 찾았습니다.`,
        lastTitle: `${label} 마스터`,
        platinumTitle: `${label} 달인`,
        silverTitle: `${label} 견습생`,
      },
      pt: {
        bronzeTitle: `Novato ${label}`,
        description: `Encontre {n} Pokémon ${label}.`,
        goldTitle: `Especialista ${label}`,
        lastDescription: `Encontrou 10000 Pokémon ${label}.`,
        lastTitle: `Mestre ${label}`,
        platinumTitle: `Especialista ${label}`,
        silverTitle: `Aprendiz ${label}`,
      },
      ru: {
        bronzeTitle: `Новичок ${label}`,
        description: `Найдите {n} ${label} Покемонов.`,
        goldTitle: `Специалист ${label}`,
        lastDescription: `Найдено 10000 ${label} Покемонов.`,
        lastTitle: `Мастер ${label}`,
        platinumTitle: `Эксперт ${label}`,
        silverTitle: `Ученик ${label}`,
      },
      zh: {
        bronzeTitle: `${label}新手`,
        description: `找到 {n} 隻${label}寶可夢。`,
        goldTitle: `${label}專家`,
        lastDescription: `找到了 10000 隻${label}寶可夢。`,
        lastTitle: `${label}大師`,
        platinumTitle: `${label}達人`,
        silverTitle: `${label}學徒`,
      },
    },
    useScope: 'isolated',
  });

  return createAchievement({
    category: 'pokemon',
    getValue: () => {
      const { statsState } = useGlobalStats();
      return statsState.megaFound[megaType];
    },
    id: `megaCatcher_${megaType}`,
    get lastDescription() {
      return t('lastDescription');
    },
    get lastTitle() {
      return t('lastTitle');
    },
    priority: 5,
    thresholds: [
      {
        get description() {
          return t('description', { n: 500 });
        },
        get nextTitle() {
          return t('bronzeTitle');
        },
        rank: 'bronze',
        val: 500,
      },
      {
        get description() {
          return t('description', { n: 1000 });
        },
        get nextTitle() {
          return t('silverTitle');
        },
        rank: 'silver',
        val: 1000,
      },
      {
        get description() {
          return t('description', { n: 2000 });
        },
        get nextTitle() {
          return t('goldTitle');
        },
        rank: 'gold',
        val: 2000,
      },
      {
        get description() {
          return t('description', { n: 10000 });
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

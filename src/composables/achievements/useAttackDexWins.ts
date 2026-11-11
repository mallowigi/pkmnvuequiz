import { useI18n } from 'vue-i18n';

import { useGlobalStats } from '@/stores/useGlobalStats.ts';
import { createAchievement } from '@/utils/utils.ts';

export const useAttackDexWins = () => {
  const { t } = useI18n({
    messages: {
      cn: {
        bronzeTitle: '招式新手',
        description: '完成 {n} 次 AttackDex。',
        goldTitle: '招式专家',
        lastDescription: '完成了 50 次 AttackDex。',
        lastTitle: 'Smogon 之神',
        platinumTitle: 'Smogon 之神',
        silverTitle: '招式达人',
      },
      de: {
        bronzeTitle: 'Attacken-Anfänger',
        description: 'Schließe den AttackDex {n} Mal ab.',
        goldTitle: 'Attacken-Experte',
        lastDescription: 'Den AttackDex 50 Mal abgeschlossen.',
        lastTitle: 'Smogon-Gott',
        platinumTitle: 'Smogon-Gott',
        silverTitle: 'Attacken-Spezialist',
      },
      en: {
        bronzeTitle: 'Attack Novice',
        description: 'Complete the AttackDex {n} times.',
        goldTitle: 'Move Expert',
        lastDescription: 'Completed the AttackDex 50 times.',
        lastTitle: 'Smogon God',
        platinumTitle: 'Smogon God',
        silverTitle: 'Move Specialist',
      },
      es: {
        bronzeTitle: 'Novato de movimientos',
        description: 'Completa el AttackDex {n} veces.',
        goldTitle: 'Experto en movimientos',
        lastDescription: 'Completó el AttackDex 50 veces.',
        lastTitle: 'Dios de Smogon',
        platinumTitle: 'Dios de Smogon',
        silverTitle: 'Especialista en movimientos',
      },
      fr: {
        bronzeTitle: 'Apprenti des attaques',
        description: "Complétez l'AttackDex {n} fois.",
        goldTitle: 'Expert des attaques',
        lastDescription: "Complété l'AttackDex 50 fois.",
        lastTitle: 'Divinité de Smogon',
        platinumTitle: 'Divinité de Smogon',
        silverTitle: 'Spécialiste des attaques',
      },
      it: {
        bronzeTitle: 'Principiante delle mosse',
        description: "Completa l'AttackDex {n} volte.",
        goldTitle: 'Esperto delle mosse',
        lastDescription: "Completato l'AttackDex 50 volte.",
        lastTitle: 'Divinità di Smogon',
        platinumTitle: 'Divinità di Smogon',
        silverTitle: 'Specialista delle mosse',
      },
      jp: {
        bronzeTitle: 'わざ初心者',
        description: 'AttackDexを {n} 回コンプリートする。',
        goldTitle: 'わざの達人',
        lastDescription: 'AttackDexを 50 回コンプリートした。',
        lastTitle: 'Smogonの神',
        platinumTitle: 'Smogonの神',
        silverTitle: 'わざ上級者',
      },
      ko: {
        bronzeTitle: '기술 초보',
        description: 'AttackDex를 {n}번 완성하세요.',
        goldTitle: '기술 전문가',
        lastDescription: 'AttackDex를 50번 완성했습니다.',
        lastTitle: 'Smogon의 신',
        platinumTitle: 'Smogon의 신',
        silverTitle: '기술 숙련자',
      },
      pt: {
        bronzeTitle: 'Novato em golpes',
        description: 'Complete o AttackDex {n} vezes.',
        goldTitle: 'Mestre dos golpes',
        lastDescription: 'Completou o AttackDex 50 vezes.',
        lastTitle: 'Deus do Smogon',
        platinumTitle: 'Deus do Smogon',
        silverTitle: 'Especialista em golpes',
      },
      ru: {
        bronzeTitle: 'Новичок в приёмах',
        description: 'Завершите AttackDex {n} раз.',
        goldTitle: 'Эксперт по приёмам',
        lastDescription: 'AttackDex завершён 50 раз.',
        lastTitle: 'Бог Smogon',
        platinumTitle: 'Бог Smogon',
        silverTitle: 'Специалист по приёмам',
      },
      zh: {
        bronzeTitle: '招式新手',
        description: '完成 {n} 次 AttackDex。',
        goldTitle: '招式專家',
        lastDescription: '完成了 50 次 AttackDex。',
        lastTitle: 'Smogon 之神',
        platinumTitle: 'Smogon 之神',
        silverTitle: '招式達人',
      },
    },
    useScope: 'isolated',
  });

  return createAchievement({
    category: 'total',
    getValue: () => {
      const { statsState } = useGlobalStats();
      return statsState.attackDexWins;
    },
    id: 'attackDexWins',
    get lastDescription() {
      return t('lastDescription');
    },
    get lastTitle() {
      return t('lastTitle');
    },
    priority: 20,
    thresholds: [
      {
        get description() {
          return t('description', { n: 1 });
        },
        get nextTitle() {
          return t('bronzeTitle');
        },
        rank: 'bronze',
        val: 1,
      },
      {
        get description() {
          return t('description', { n: 10 });
        },
        get nextTitle() {
          return t('silverTitle');
        },
        rank: 'silver',
        val: 10,
      },
      {
        get description() {
          return t('description', { n: 20 });
        },
        get nextTitle() {
          return t('goldTitle');
        },
        rank: 'gold',
        val: 20,
      },
      {
        get description() {
          return t('description', { n: 50 });
        },
        get nextTitle() {
          return t('platinumTitle');
        },
        rank: 'platinum',
        val: 50,
      },
    ],
  });
};

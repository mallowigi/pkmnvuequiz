import { useI18n } from 'vue-i18n';

import { useProfile } from '@/stores/useProfile.ts';
import { createAchievement } from '@/utils/utils.ts';

export const useNumWins = () => {
  const { getTotalWins } = useProfile();
  const { t } = useI18n({
    messages: {
      cn: {
        bronzeTitle: '熟练者',
        description: '累计赢得 {n} 场比赛。',
        goldTitle: '专家',
        lastDescription: '赢得了超过 500 场比赛。',
        lastTitle: '教授',
        platinumTitle: '大师',
        silverTitle: '行家',
      },
      de: {
        bronzeTitle: 'Geübt',
        description: 'Gewinne insgesamt {n} Spiele.',
        goldTitle: 'Experte',
        lastDescription: 'Mehr als 500 Spiele gewonnen.',
        lastTitle: 'Professor',
        platinumTitle: 'Meister',
        silverTitle: 'Kenner',
      },
      en: {
        bronzeTitle: 'Skilled',
        description: 'Win a total of {n} games.',
        goldTitle: 'Expert',
        lastDescription: 'Won more than 500 games.',
        lastTitle: 'Professor',
        platinumTitle: 'Master',
        silverTitle: 'Aficionado',
      },
      es: {
        bronzeTitle: 'Hábil',
        description: 'Gana un total de {n} partidas.',
        goldTitle: 'Experto',
        lastDescription: 'Más de 500 partidas ganadas.',
        lastTitle: 'Profesor',
        platinumTitle: 'Maestro',
        silverTitle: 'Aficionado',
      },
      fr: {
        bronzeTitle: 'Habile',
        description: 'Remportez un total de {n} parties.',
        goldTitle: 'Expert',
        lastDescription: 'Plus de 500 parties remportées.',
        lastTitle: 'Professeur',
        platinumTitle: 'Maître',
        silverTitle: 'Connaisseur',
      },
      it: {
        bronzeTitle: 'Abile',
        description: 'Vinci un totale di {n} partite.',
        goldTitle: 'Esperto',
        lastDescription: 'Più di 500 partite vinte.',
        lastTitle: 'Professore',
        platinumTitle: 'Maestro',
        silverTitle: 'Appassionato',
      },
      jp: {
        bronzeTitle: '熟練者',
        description: '合計{n}回勝利する。',
        goldTitle: 'エキスパート',
        lastDescription: '500回以上勝利。',
        lastTitle: '博士',
        platinumTitle: 'マスター',
        silverTitle: '愛好家',
      },
      ko: {
        bronzeTitle: '숙련자',
        description: '총 {n}번 승리하세요.',
        goldTitle: '전문가',
        lastDescription: '500번 넘게 승리.',
        lastTitle: '박사',
        platinumTitle: '마스터',
        silverTitle: '애호가',
      },
      pt: {
        bronzeTitle: 'Habilidoso',
        description: 'Ganhe um total de {n} partidas.',
        goldTitle: 'Especialista',
        lastDescription: 'Mais de 500 partidas ganhas.',
        lastTitle: 'Professor',
        platinumTitle: 'Mestre',
        silverTitle: 'Aficionado',
      },
      ru: {
        bronzeTitle: 'Умелый',
        description: 'Выиграйте всего {n} игр.',
        goldTitle: 'Эксперт',
        lastDescription: 'Выиграно более 500 игр.',
        lastTitle: 'Профессор',
        platinumTitle: 'Мастер',
        silverTitle: 'Знаток',
      },
      zh: {
        bronzeTitle: '熟練者',
        description: '累計贏得 {n} 場比賽。',
        goldTitle: '專家',
        lastDescription: '贏得了超過 500 場比賽。',
        lastTitle: '教授',
        platinumTitle: '大師',
        silverTitle: '行家',
      },
    },
    useScope: 'isolated',
  });

  return createAchievement({
    category: 'total',
    getValue: getTotalWins,
    id: 'numWins',
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
          return t('description', { n: 10 });
        },
        get nextTitle() {
          return t('bronzeTitle');
        },
        rank: 'bronze',
        val: 10,
      },
      {
        get description() {
          return t('description', { n: 50 });
        },
        get nextTitle() {
          return t('silverTitle');
        },
        rank: 'silver',
        val: 50,
      },
      {
        get description() {
          return t('description', { n: 100 });
        },
        get nextTitle() {
          return t('goldTitle');
        },
        rank: 'gold',
        val: 100,
      },
      {
        get description() {
          return t('description', { n: 500 });
        },
        get nextTitle() {
          return t('platinumTitle');
        },
        rank: 'platinum',
        val: 500,
      },
    ],
  });
};

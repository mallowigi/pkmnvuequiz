import { useI18n } from 'vue-i18n';

import { useProfile } from '@/stores/useProfile.ts';
import { createAchievement } from '@/utils/utils.ts';

export const useNoShadowsWins = () => {
  const { getNoShadowWins } = useProfile();
  const { t } = useI18n({
    messages: {
      cn: {
        bronzeTitle: '观察者',
        description: '不使用阴影助手赢得 {n} 场比赛。',
        goldTitle: '锐眼',
        lastDescription: '不使用阴影助手赢得了超过 500 场比赛。',
        lastTitle: '大师猜测者',
        platinumTitle: '大师',
        silverTitle: '行家',
      },
      de: {
        bronzeTitle: 'Beobachter',
        description: 'Gewinne {n} Spiele ohne Schatten-Hilfe.',
        goldTitle: 'Scharfblick',
        lastDescription: 'Mehr als 500 Spiele ohne Schatten-Hilfe gewonnen.',
        lastTitle: 'Master-Rater',
        platinumTitle: 'Meister',
        silverTitle: 'Kenner',
      },
      en: {
        bronzeTitle: 'Observer',
        description: 'Win {n} games without using the shadow helper.',
        goldTitle: 'Sharp Eye',
        lastDescription: 'Won more than 500 games without using the shadow helper.',
        lastTitle: 'Master Guesser',
        platinumTitle: 'Master',
        silverTitle: 'Aficionado',
      },
      es: {
        bronzeTitle: 'Observador',
        description: 'Gana {n} partidas sin usar la ayuda de sombra.',
        goldTitle: 'Ojo agudo',
        lastDescription: 'Más de 500 partidas ganadas sin usar la ayuda de sombra.',
        lastTitle: 'Adivino maestro',
        platinumTitle: 'Maestro',
        silverTitle: 'Aficionado',
      },
      fr: {
        bronzeTitle: 'Observateur',
        description: "Remportez {n} parties sans utiliser l'aide ombre.",
        goldTitle: 'Œil perçant',
        lastDescription: "Plus de 500 parties remportées sans utiliser l'aide ombre.",
        lastTitle: 'Devineur maître',
        platinumTitle: 'Maître',
        silverTitle: 'Connaisseur',
      },
      it: {
        bronzeTitle: 'Osservatore',
        description: "Vinci {n} partite senza usare l'aiuto ombra.",
        goldTitle: 'Occhio vivace',
        lastDescription: "Più di 500 partite vinte senza usare l'aiuto ombra.",
        lastTitle: 'Indovino maestro',
        platinumTitle: 'Maestro',
        silverTitle: 'Appassionato',
      },
      jp: {
        bronzeTitle: '観察者',
        description: 'シャドウヘルパーを使わずに{n}回勝利する。',
        goldTitle: '鋭眼',
        lastDescription: 'シャドウヘルパーを使わずに500回以上勝利。',
        lastTitle: 'マスターゲッサー',
        platinumTitle: 'マスター',
        silverTitle: '愛好家',
      },
      ko: {
        bronzeTitle: '관찰자',
        description: '섀도우 헬퍼를 사용하지 않고 {n}번 승리하세요.',
        goldTitle: '날카로운 눈',
        lastDescription: '섀도우 헬퍼를 사용하지 않고 500번 넘게 승리.',
        lastTitle: '마스터 추측가',
        platinumTitle: '마스터',
        silverTitle: '애호가',
      },
      pt: {
        bronzeTitle: 'Observador',
        description: 'Ganhe {n} partidas sem usar a ajuda de sombra.',
        goldTitle: 'Olho aguçado',
        lastDescription: 'Mais de 500 partidas ganhas sem usar a ajuda de sombra.',
        lastTitle: 'Adivinho mestre',
        platinumTitle: 'Mestre',
        silverTitle: 'Aficionado',
      },
      ru: {
        bronzeTitle: 'Наблюдатель',
        description: 'Выиграйте {n} игр без помощника теней.',
        goldTitle: 'Острый глаз',
        lastDescription: 'Выиграно более 500 игр без помощника теней.',
        lastTitle: 'Мастер-угадчик',
        platinumTitle: 'Мастер',
        silverTitle: 'Знаток',
      },
      zh: {
        bronzeTitle: '觀察者',
        description: '不使用陰影助手贏得 {n} 場比賽。',
        goldTitle: '銳眼',
        lastDescription: '不使用陰影助手贏得了超過 500 場比賽。',
        lastTitle: '大師猜測者',
        platinumTitle: '大師',
        silverTitle: '行家',
      },
    },
    useScope: 'isolated',
  });

  return createAchievement({
    category: 'total',
    getValue: getNoShadowWins,
    id: 'noShadowsWins',
    get lastDescription() {
      return t('lastDescription');
    },
    get lastTitle() {
      return t('lastTitle');
    },
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

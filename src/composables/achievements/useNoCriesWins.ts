import { useI18n } from 'vue-i18n';

import { useProfile } from '@/stores/useProfile.ts';
import { createAchievement } from '@/utils/utils.ts';

export const useNoCriesWins = () => {
  const { getNoCriesWins } = useProfile();
  const { t } = useI18n({
    messages: {
      cn: {
        bronzeTitle: '独立者',
        description: '不使用阴影助手和叫声助手完成 {n} 场比赛。',
        goldTitle: '完美主义者',
        lastDescription: '不使用阴影助手和叫声助手完成了超过 500 场比赛。',
        lastTitle: '完美猜测者',
        platinumTitle: '完美',
        silverTitle: '自律者',
      },
      de: {
        bronzeTitle: 'Unabhängiger',
        description: 'Gewinne {n} Spiele ohne Schatten- und Rufe-Hilfe.',
        goldTitle: 'Perfektionist',
        lastDescription: 'Mehr als 500 Spiele ohne Schatten- und Rufe-Hilfe gewonnen.',
        lastTitle: 'Perfekter Rater',
        platinumTitle: 'Perfekt',
        silverTitle: 'Diszipliniert',
      },
      en: {
        bronzeTitle: 'Independent',
        description: 'Win {n} games without using the shadow helper or cries helper.',
        goldTitle: 'Perfectionist',
        lastDescription: 'Won more than 500 games without using the shadow helper or cries helper.',
        lastTitle: 'Perfect Guesser',
        platinumTitle: 'Perfect',
        silverTitle: 'Self-reliant',
      },
      es: {
        bronzeTitle: 'Independiente',
        description: 'Gana {n} partidas sin usar la ayuda de sombra o de gritos.',
        goldTitle: 'Perfeccionista',
        lastDescription: 'Más de 500 partidas ganadas sin usar la ayuda de sombra o de gritos.',
        lastTitle: 'Adivino perfecto',
        platinumTitle: 'Perfecto',
        silverTitle: 'Autónomo',
      },
      fr: {
        bronzeTitle: 'Indépendant',
        description: "Remportez {n} parties sans utiliser l'aide ombre ou cris.",
        goldTitle: 'Perfectionniste',
        lastDescription: "Plus de 500 parties remportées sans utiliser l'aide ombre ou cris.",
        lastTitle: 'Devineur parfait',
        platinumTitle: 'Parfait',
        silverTitle: 'Autonome',
      },
      it: {
        bronzeTitle: 'Indipendente',
        description: "Vinci {n} partite senza usare l'aiuto ombra o urla.",
        goldTitle: 'Perfezionista',
        lastDescription: "Più di 500 partite vinte senza usare l'aiuto ombra o urla.",
        lastTitle: 'Indovino perfetto',
        platinumTitle: 'Perfetto',
        silverTitle: 'Autonomo',
      },
      jp: {
        bronzeTitle: '独立者',
        description: 'シャドウヘルパーと鳴き声ヘルパーを使わずに{n}回勝利する。',
        goldTitle: '完璧主義者',
        lastDescription: 'シャドウヘルパーと鳴き声ヘルパーを使わずに500回以上勝利。',
        lastTitle: 'パーフェクト_guesser',
        platinumTitle: '完璧',
        silverTitle: '自立者',
      },
      ko: {
        bronzeTitle: '독립자',
        description: '섀도우 헬퍼와 울음소리 헬퍼를 사용하지 않고 {n}번 승리하세요.',
        goldTitle: '완벽주의자',
        lastDescription: '섀도우 헬퍼와 울음소리 헬퍼를 사용하지 않고 500번 넘게 승리.',
        lastTitle: '퍼펙트 추측가',
        platinumTitle: '완벽',
        silverTitle: '자립자',
      },
      pt: {
        bronzeTitle: 'Independente',
        description: 'Ganhe {n} partidas sem usar a ajuda de sombra ou gritos.',
        goldTitle: 'Perfeccionista',
        lastDescription: 'Mais de 500 partidas ganhas sem usar a ajuda de sombra ou gritos.',
        lastTitle: 'Adivinho perfeito',
        platinumTitle: 'Perfeito',
        silverTitle: 'Autônomo',
      },
      ru: {
        bronzeTitle: 'Независимый',
        description: 'Выиграйте {n} игр без помощи теней и криков.',
        goldTitle: 'Перфекционист',
        lastDescription: 'Выиграно более 500 игр без помощи теней и криков.',
        lastTitle: 'Идеальный угадчик',
        platinumTitle: 'Идеал',
        silverTitle: 'Самостоятельный',
      },
      zh: {
        bronzeTitle: '獨立者',
        description: '不使用陰影助手和叫聲助手完成 {n} 場比賽。',
        goldTitle: '完美主義者',
        lastDescription: '不使用陰影助手和叫聲助手完成了超過 500 場比賽。',
        lastTitle: '完美猜測者',
        platinumTitle: '完美',
        silverTitle: '自律者',
      },
    },
    useScope: 'isolated',
  });

  return createAchievement({
    category: 'total',
    getValue: getNoCriesWins,
    id: 'perfectGuesser',
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

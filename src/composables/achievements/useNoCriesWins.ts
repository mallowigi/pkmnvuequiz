import { useI18n } from 'vue-i18n';

import { useProfile } from '@/stores/useProfile.ts';
import { createAchievement } from '@/utils/utils.ts';

export const useNoCriesWins = () => {
  const { getNoCriesWins } = useProfile();
  const { t } = useI18n({
    messages: {
      cn: {
        bronzeTitle: '安静的猜测者',
        description: '不使用阴影助手和叫声助手赢得 {n} 场比赛。',
        goldTitle: '无声侦探',
        lastDescription: '不使用阴影助手和叫声助手赢得了超过 500 场比赛。',
        lastTitle: '沉默传奇',
        platinumTitle: '沉默大师',
        silverTitle: '沉默的猜测者',
      },
      de: {
        bronzeTitle: 'Leiser Rater',
        description: 'Gewinne {n} Spiele ohne Schatten- und Ruf-Hilfe.',
        goldTitle: 'Lautloser Detektiv',
        lastDescription: 'Mehr als 500 Spiele ohne Schatten- und Ruf-Hilfe gewonnen.',
        lastTitle: 'Stille Legende',
        platinumTitle: 'Meister der Stille',
        silverTitle: 'Stiller Rater',
      },
      en: {
        bronzeTitle: 'Quiet Guesser',
        description: 'Win {n} games without using the shadow helper or cries helper.',
        goldTitle: 'Soundless Sleuth',
        lastDescription: 'Won more than 500 games without using the shadow helper or cries helper.',
        lastTitle: 'Silent Legend',
        platinumTitle: 'Master of Silence',
        silverTitle: 'Silent Guesser',
      },
      es: {
        bronzeTitle: 'Aprendiz discreto',
        description: 'Gana {n} partidas sin usar la ayuda de sombra o de gritos.',
        goldTitle: 'Detective sigiloso',
        lastDescription: 'Más de 500 partidas ganadas sin usar la ayuda de sombra o de gritos.',
        lastTitle: 'El silencio en persona',
        platinumTitle: 'Maestro del silencio',
        silverTitle: 'Observador silencioso',
      },
      fr: {
        bronzeTitle: 'Apprenti discret',
        description: "Remportez {n} parties sans utiliser l'aide ombre ou cris.",
        goldTitle: 'Détective furtif',
        lastDescription: "Plus de 500 parties remportées sans utiliser l'aide ombre ou cris.",
        lastTitle: 'Le silence incarné',
        platinumTitle: 'Maître du silence',
        silverTitle: 'Observateur silencieux',
      },
      it: {
        bronzeTitle: 'Apprendista discreto',
        description: "Vinci {n} partite senza usare l'aiuto ombra o urla.",
        goldTitle: 'Detective furtivo',
        lastDescription: "Più di 500 partite vinte senza usare l'aiuto ombra o urla.",
        lastTitle: 'Il silenzio in persona',
        platinumTitle: 'Maestro del silenzio',
        silverTitle: 'Osservatore silenzioso',
      },
      jp: {
        bronzeTitle: '静かな推測者',
        description: 'シャドウヘルパーと鳴き声ヘルパーを使わずに{n}回勝利する。',
        goldTitle: '無音の探偵',
        lastDescription: 'シャドウヘルパーと鳴き声ヘルパーを使わずに500回以上勝利。',
        lastTitle: '沈黙の伝説',
        platinumTitle: '沈黙の達人',
        silverTitle: '沈黙の推測者',
      },
      ko: {
        bronzeTitle: '조용한 추측가',
        description: '섀도우 헬퍼와 울음소리 헬퍼를 사용하지 않고 {n}번 승리하세요.',
        goldTitle: '소리 없는 탐정',
        lastDescription: '섀도우 헬퍼와 울음소리 헬퍼를 사용하지 않고 500번 넘게 승리.',
        lastTitle: '침묵의 전설',
        platinumTitle: '침묵의 달인',
        silverTitle: '침묵의 추측가',
      },
      pt: {
        bronzeTitle: 'Adivinho discreto',
        description: 'Ganhe {n} partidas sem usar a ajuda de sombra ou gritos.',
        goldTitle: 'Detetive sem som',
        lastDescription: 'Mais de 500 partidas ganhas sem usar a ajuda de sombra ou gritos.',
        lastTitle: 'Lenda silenciosa',
        platinumTitle: 'Mestre do silêncio',
        silverTitle: 'Adivinho silencioso',
      },
      ru: {
        bronzeTitle: 'Тихий угадыватель',
        description: 'Выиграйте {n} игр без помощников теней и криков.',
        goldTitle: 'Бесшумный сыщик',
        lastDescription: 'Выиграно более 500 игр без помощников теней и криков.',
        lastTitle: 'Легенда тишины',
        platinumTitle: 'Мастер тишины',
        silverTitle: 'Молчаливый угадыватель',
      },
      zh: {
        bronzeTitle: '安靜的猜測者',
        description: '不使用陰影助手和叫聲助手贏得 {n} 場比賽。',
        goldTitle: '無聲偵探',
        lastDescription: '不使用陰影助手和叫聲助手贏得了超過 500 場比賽。',
        lastTitle: '沉默傳奇',
        platinumTitle: '沉默大師',
        silverTitle: '沉默的猜測者',
      },
    },
    useScope: 'isolated',
  });

  return createAchievement({
    category: 'total',
    getValue: getNoCriesWins,
    id: 'noCriesWins',
    get lastDescription() {
      return t('lastDescription');
    },
    get lastTitle() {
      return t('lastTitle');
    },
    priority: 10,
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

import { useI18n } from 'vue-i18n';

import { useProfile } from '@/stores/useProfile.ts';
import { createAchievement } from '@/utils/utils.ts';

export const useNoShadowsWins = () => {
  const { getNoShadowWins } = useProfile();
  const { t } = useI18n({
    messages: {
      cn: {
        bronzeTitle: '好奇的头脑',
        description: '不使用阴影助手赢得 {n} 场比赛。',
        goldTitle: '宝可梦档案管理员',
        lastDescription: '不使用阴影助手赢得了超过 500 场比赛。',
        lastTitle: '活体宝可梦图鉴',
        platinumTitle: '行走的百科全书',
        silverTitle: '记忆敏锐',
      },
      de: {
        bronzeTitle: 'Neugieriger Geist',
        description: 'Gewinne {n} Spiele ohne Schatten-Hilfe.',
        goldTitle: 'Pokémon-Archivar',
        lastDescription: 'Mehr als 500 Spiele ohne Schatten-Hilfe gewonnen.',
        lastTitle: 'Lebender Pokédex',
        platinumTitle: 'Wandelnde Enzyklopädie',
        silverTitle: 'Starkes Gedächtnis',
      },
      en: {
        bronzeTitle: 'Curious Mind',
        description: 'Win {n} games without using the shadow helper.',
        goldTitle: 'Pokémon Archivist',
        lastDescription: 'Won more than 500 games without using the shadow helper.',
        lastTitle: 'Living Pokédex',
        platinumTitle: 'Walking Encyclopedia',
        silverTitle: 'Keen Memory',
      },
      es: {
        bronzeTitle: 'Mente curiosa',
        description: 'Gana {n} partidas sin usar la ayuda de sombra.',
        goldTitle: 'Archivista Pokémon',
        lastDescription: 'Más de 500 partidas ganadas sin usar la ayuda de sombra.',
        lastTitle: 'Pokédex viviente',
        platinumTitle: 'Enciclopedia andante',
        silverTitle: 'Memoria prodigiosa',
      },
      fr: {
        bronzeTitle: 'Esprit curieux',
        description: "Remportez {n} parties sans utiliser l'aide ombre.",
        goldTitle: 'Archiviste Pokémon',
        lastDescription: "Plus de 500 parties remportées sans utiliser l'aide ombre.",
        lastTitle: 'Pokédex vivant',
        platinumTitle: 'Encyclopédie ambulante',
        silverTitle: 'Mémoire affûtée',
      },
      it: {
        bronzeTitle: 'Mente curiosa',
        description: "Vinci {n} partite senza usare l'aiuto ombra.",
        goldTitle: 'Archivista Pokémon',
        lastDescription: "Più di 500 partite vinte senza usare l'aiuto ombra.",
        lastTitle: 'Pokédex vivente',
        platinumTitle: 'Enciclopedia ambulante',
        silverTitle: 'Memoria prodigiosa',
      },
      jp: {
        bronzeTitle: '好奇心旺盛',
        description: 'シャドウヘルパーを使わずに{n}回勝利する。',
        goldTitle: 'ポケモンの記録係',
        lastDescription: 'シャドウヘルパーを使わずに500回以上勝利。',
        lastTitle: '生きるポケモン図鑑',
        platinumTitle: '歩く百科事典',
        silverTitle: '抜群の記憶力',
      },
      ko: {
        bronzeTitle: '호기심 많은 사람',
        description: '섀도우 헬퍼를 사용하지 않고 {n}번 승리하세요.',
        goldTitle: '포켓몬 기록관',
        lastDescription: '섀도우 헬퍼를 사용하지 않고 500번 넘게 승리.',
        lastTitle: '살아 있는 포켓몬 도감',
        platinumTitle: '걸어 다니는 백과사전',
        silverTitle: '뛰어난 기억력',
      },
      pt: {
        bronzeTitle: 'Mente curiosa',
        description: 'Ganhe {n} partidas sem usar a ajuda de sombra.',
        goldTitle: 'Arquivista Pokémon',
        lastDescription: 'Mais de 500 partidas ganhas sem usar a ajuda de sombra.',
        lastTitle: 'Pokédex viva',
        platinumTitle: 'Enciclopédia ambulante',
        silverTitle: 'Memória afiada',
      },
      ru: {
        bronzeTitle: 'Любознательный ум',
        description: 'Выиграйте {n} игр без помощника теней.',
        goldTitle: 'Архивариус покемонов',
        lastDescription: 'Выиграно более 500 игр без помощника теней.',
        lastTitle: 'Живой Покедекс',
        platinumTitle: 'Ходячая энциклопедия',
        silverTitle: 'Отличная память',
      },
      zh: {
        bronzeTitle: '好奇的頭腦',
        description: '不使用陰影助手贏得 {n} 場比賽。',
        goldTitle: '寶可夢檔案管理員',
        lastDescription: '不使用陰影助手贏得了超過 500 場比賽。',
        lastTitle: '活體寶可夢圖鑑',
        platinumTitle: '行走的百科全書',
        silverTitle: '記憶敏銳',
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

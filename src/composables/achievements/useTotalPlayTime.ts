import { useI18n } from 'vue-i18n';

import { useProfile } from '@/stores/useProfile.ts';
import { createAchievement } from '@/utils/utils.ts';

// Thresholds in seconds: 10h=36000s, 20h=72000s, 40h=144000s, 80h=288000s
const HOURS_TO_SECONDS = 3600;

export const useTotalPlayTime = () => {
  const { getTotalPlayTime } = useProfile();
  const { t } = useI18n({
    messages: {
      cn: {
        bronzeTitle: '新手',
        description: '累计游戏时间达到 {n} 小时。',
        goldTitle: '忠实玩家',
        lastDescription: '累计游戏时间达到了 80 小时。',
        lastTitle: '势不可挡',
        platinumTitle: '老手',
        silverTitle: '常客',
      },
      de: {
        bronzeTitle: 'Neuling',
        description: 'Spiele insgesamt {n} Stunden.',
        goldTitle: 'Engagierter Spieler',
        lastDescription: 'Insgesamt 80 Stunden gespielt.',
        lastTitle: 'Unaufhaltsam',
        platinumTitle: 'Veteran',
        silverTitle: 'Stammgast',
      },
      en: {
        bronzeTitle: 'Newcomer',
        description: 'Play for a total of {n} hours.',
        goldTitle: 'Dedicated Player',
        lastDescription: 'Played for a total of 80 hours.',
        lastTitle: 'Unstoppable',
        platinumTitle: 'Veteran',
        silverTitle: 'Regular',
      },
      es: {
        bronzeTitle: 'Novato',
        description: 'Juega un total de {n} horas.',
        goldTitle: 'Jugador dedicado',
        lastDescription: 'Jugó un total de 80 horas.',
        lastTitle: 'Imparable',
        platinumTitle: 'Veterano',
        silverTitle: 'Asiduo',
      },
      fr: {
        bronzeTitle: 'Débutant',
        description: 'Jouez un total de {n} heures.',
        goldTitle: 'Joueur dévoué',
        lastDescription: 'Joué un total de 80 heures.',
        lastTitle: 'Inarrêtable',
        platinumTitle: 'Vétéran',
        silverTitle: 'Habitué',
      },
      it: {
        bronzeTitle: 'Principiante',
        description: 'Gioca per un totale di {n} ore.',
        goldTitle: 'Giocatore assiduo',
        lastDescription: 'Giocato per un totale di 80 ore.',
        lastTitle: 'Inarrestabile',
        platinumTitle: 'Veterano',
        silverTitle: 'Assiduo',
      },
      jp: {
        bronzeTitle: '新人',
        description: '合計{n}時間プレイする。',
        goldTitle: '熱心なプレイヤー',
        lastDescription: '合計80時間プレイした。',
        lastTitle: '止まらぬ者',
        platinumTitle: 'ベテラン',
        silverTitle: '常連',
      },
      ko: {
        bronzeTitle: '신참',
        description: '총 {n}시간 동안 플레이하세요.',
        goldTitle: '열정적인 플레이어',
        lastDescription: '총 80시간 동안 플레이했습니다.',
        lastTitle: '멈출 수 없는 자',
        platinumTitle: '베테랑',
        silverTitle: '단골',
      },
      pt: {
        bronzeTitle: 'Novato',
        description: 'Jogue um total de {n} horas.',
        goldTitle: 'Jogador dedicado',
        lastDescription: 'Jogou um total de 80 horas.',
        lastTitle: 'Imparável',
        platinumTitle: 'Veterano',
        silverTitle: 'Assíduo',
      },
      ru: {
        bronzeTitle: 'Новичок',
        description: 'Играйте в общей сложности {n} часов.',
        goldTitle: 'Преданный игрок',
        lastDescription: 'Сыграно в общей сложности 80 часов.',
        lastTitle: 'Неудержимый',
        platinumTitle: 'Ветеран',
        silverTitle: 'Постоянный игрок',
      },
      zh: {
        bronzeTitle: '新手',
        description: '累計遊戲時間達到 {n} 小時。',
        goldTitle: '忠實玩家',
        lastDescription: '累計遊戲時間達到了 80 小時。',
        lastTitle: '勢不可擋',
        platinumTitle: '資深玩家',
        silverTitle: '常客',
      },
    },
    useScope: 'isolated',
  });

  return createAchievement({
    category: 'total',
    getValue: getTotalPlayTime,
    id: 'totalPlayTime',
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
        val: 10 * HOURS_TO_SECONDS,
      },
      {
        get description() {
          return t('description', { n: 20 });
        },
        get nextTitle() {
          return t('silverTitle');
        },
        rank: 'silver',
        val: 20 * HOURS_TO_SECONDS,
      },
      {
        get description() {
          return t('description', { n: 40 });
        },
        get nextTitle() {
          return t('goldTitle');
        },
        rank: 'gold',
        val: 40 * HOURS_TO_SECONDS,
      },
      {
        get description() {
          return t('description', { n: 80 });
        },
        get nextTitle() {
          return t('platinumTitle');
        },
        rank: 'platinum',
        val: 80 * HOURS_TO_SECONDS,
      },
    ],
  });
};

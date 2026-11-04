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
        bronzeTitle: '玩家',
        description: '累计游戏时间达到 {n} 小时。',
        goldTitle: '老玩家',
        lastDescription: '累计游戏时间达到了 80 小时。',
        lastTitle: '时间大师',
        platinumTitle: '传奇',
        silverTitle: '常客',
      },
      de: {
        bronzeTitle: 'Spieler',
        description: 'Spiele insgesamt {n} Stunden.',
        goldTitle: 'Veteran',
        lastDescription: 'Insgesamt 80 Stunden gespielt.',
        lastTitle: 'Zeit-Meister',
        platinumTitle: 'Legende',
        silverTitle: 'Stammgast',
      },
      en: {
        bronzeTitle: 'Player',
        description: 'Play for a total of {n} hours.',
        goldTitle: 'Veteran',
        lastDescription: 'Played for a total of 80 hours.',
        lastTitle: 'Time Master',
        platinumTitle: 'Legend',
        silverTitle: 'Regular',
      },
      es: {
        bronzeTitle: 'Jugador',
        description: 'Juega un total de {n} horas.',
        goldTitle: 'Veterano',
        lastDescription: 'Jugó un total de 80 horas.',
        lastTitle: 'Maestro del tiempo',
        platinumTitle: 'Leyenda',
        silverTitle: 'Asiduo',
      },
      fr: {
        bronzeTitle: 'Joueur',
        description: 'Jouez un total de {n} heures.',
        goldTitle: 'Vétéran',
        lastDescription: 'Joué un total de 80 heures.',
        lastTitle: 'Maître du temps',
        platinumTitle: 'Légende',
        silverTitle: 'Habitué',
      },
      it: {
        bronzeTitle: 'Giocatore',
        description: 'Gioca per un totale di {n} ore.',
        goldTitle: 'Veterano',
        lastDescription: 'Giocato per un totale di 80 ore.',
        lastTitle: 'Maestro del tempo',
        platinumTitle: 'Leggenda',
        silverTitle: 'Assiduo',
      },
      jp: {
        bronzeTitle: 'プレイヤー',
        description: '合計{n}時間プレイする。',
        goldTitle: 'ベテラン',
        lastDescription: '合計80時間プレイした。',
        lastTitle: 'タイムマスター',
        platinumTitle: '伝説',
        silverTitle: '常連',
      },
      ko: {
        bronzeTitle: '플레이어',
        description: '총 {n}시간 동안 플레이하세요.',
        goldTitle: '베테랑',
        lastDescription: '총 80시간 동안 플레이했습니다.',
        lastTitle: '타임 마스터',
        platinumTitle: '전설',
        silverTitle: '단골',
      },
      pt: {
        bronzeTitle: 'Jogador',
        description: 'Jogue um total de {n} horas.',
        goldTitle: 'Veterano',
        lastDescription: 'Jogou um total de 80 horas.',
        lastTitle: 'Mestre do tempo',
        platinumTitle: 'Lenda',
        silverTitle: 'Assíduo',
      },
      ru: {
        bronzeTitle: 'Игрок',
        description: 'Играйте в общей сложности {n} часов.',
        goldTitle: 'Ветеран',
        lastDescription: 'Сыграно в общей сложности 80 часов.',
        lastTitle: 'Мастер времени',
        platinumTitle: 'Легенда',
        silverTitle: 'Постоянный',
      },
      zh: {
        bronzeTitle: '玩家',
        description: '累計遊戲時間達到 {n} 小時。',
        goldTitle: '老玩家',
        lastDescription: '累計遊戲時間達到了 80 小時。',
        lastTitle: '時間大師',
        platinumTitle: '傳奇',
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

import { useI18n } from 'vue-i18n';

import { useTimer } from '@/stores/useTimer.ts';
import { createAchievement } from '@/utils/utils.ts';

export const useTimerElapsed = () => {
  const { timerState } = useTimer();
  const { t } = useI18n({
    messages: {
      cn: {
        bronzeTitle: '呆呆兽',
        description: '在一场比赛中玩了 {n} 小时。',
        goldTitle: '蜗牛速度',
        lastDescription: '在一场比赛中玩了 10 小时。',
        lastTitle: '还在加载……',
        platinumTitle: '冰川速度',
        silverTitle: '慢慢来',
      },
      de: {
        bronzeTitle: 'Flegmon',
        description: 'Spiele {n} Stunden in einem Spiel.',
        goldTitle: 'Schneckentempo',
        lastDescription: '10 Stunden in einem Spiel gespielt.',
        lastTitle: 'Lädt noch…',
        platinumTitle: 'Gletschertempo',
        silverTitle: 'Lässt sich Zeit',
      },
      en: {
        bronzeTitle: 'Slowpoke',
        description: 'Play for {n} hours in a single game.',
        goldTitle: 'Snail’s Pace',
        lastDescription: 'Played for 10 hours in a single game.',
        lastTitle: 'Still Loading…',
        platinumTitle: 'Glacial Pace',
        silverTitle: 'Taking Your Time',
      },
      es: {
        bronzeTitle: 'Slowpoke',
        description: 'Juega durante {n} horas en una sola partida.',
        goldTitle: 'A paso de caracol',
        lastDescription: 'Jugó durante 10 horas en una sola partida.',
        lastTitle: 'Sigue cargando…',
        platinumTitle: 'A ritmo glacial',
        silverTitle: 'A su ritmo',
      },
      fr: {
        bronzeTitle: 'Ramoloss',
        description: 'Jouez pendant {n} heures en une seule partie.',
        goldTitle: 'Au pas de l’escargot',
        lastDescription: 'Joué pendant 10 heures en une seule partie.',
        lastTitle: 'Chargement en cours…',
        platinumTitle: 'Au rythme d’un glacier',
        silverTitle: 'À son rythme',
      },
      it: {
        bronzeTitle: 'Slowpoke',
        description: 'Gioca per {n} ore in una singola partita.',
        goldTitle: 'A passo di lumaca',
        lastDescription: 'Giocato per 10 ore in una singola partita.',
        lastTitle: 'Ancora in caricamento…',
        platinumTitle: 'A ritmo glaciale',
        silverTitle: 'Con calma',
      },
      jp: {
        bronzeTitle: 'ヤドン',
        description: '1つのゲームで{n}時間プレイする。',
        goldTitle: 'カタツムリの歩み',
        lastDescription: '1つのゲームで10時間プレイした。',
        lastTitle: 'まだ読み込み中…',
        platinumTitle: '氷河のようなペース',
        silverTitle: 'マイペース',
      },
      ko: {
        bronzeTitle: '야돈',
        description: '한 게임에서 {n}시간 플레이하세요.',
        goldTitle: '달팽이 걸음',
        lastDescription: '한 게임에서 10시간 플레이했습니다.',
        lastTitle: '아직 로딩 중…',
        platinumTitle: '빙하처럼 느린',
        silverTitle: '느긋한 페이스',
      },
      pt: {
        bronzeTitle: 'Slowpoke',
        description: 'Jogue por {n} horas em uma única partida.',
        goldTitle: 'A passo de caracol',
        lastDescription: 'Jogou por 10 horas em uma única partida.',
        lastTitle: 'Ainda carregando…',
        platinumTitle: 'Ritmo glacial',
        silverTitle: 'No seu tempo',
      },
      ru: {
        bronzeTitle: 'Слоупок',
        description: 'Играйте {n} часов в одной игре.',
        goldTitle: 'Улиточным шагом',
        lastDescription: 'Сыграно 10 часов в одной игре.',
        lastTitle: 'Всё ещё загружается…',
        platinumTitle: 'Ледниковый темп',
        silverTitle: 'Не спешит',
      },
      zh: {
        bronzeTitle: '呆呆獸',
        description: '在一場比賽中玩了 {n} 小時。',
        goldTitle: '蝸牛速度',
        lastDescription: '在一場比賽中玩了 10 小時。',
        lastTitle: '還在載入……',
        platinumTitle: '冰川速度',
        silverTitle: '慢慢來',
      },
    },
    useScope: 'isolated',
  });

  // Timer elapsed is in seconds; thresholds in hours: 4h=14400s, 6h=21600s, 8h=28800s, 10h=36000s
  return createAchievement({
    category: 'game',
    getValue: () => timerState.elapsed,
    id: 'timerElapsed',
    get lastDescription() {
      return t('lastDescription');
    },
    get lastTitle() {
      return t('lastTitle');
    },
    thresholds: [
      {
        get description() {
          return t('description', { n: 4 });
        },
        get nextTitle() {
          return t('bronzeTitle');
        },
        rank: 'bronze',
        val: 14400, // 4 hours
      },
      {
        get description() {
          return t('description', { n: 6 });
        },
        get nextTitle() {
          return t('silverTitle');
        },
        rank: 'silver',
        val: 21600, // 6 hours
      },
      {
        get description() {
          return t('description', { n: 8 });
        },
        get nextTitle() {
          return t('goldTitle');
        },
        rank: 'gold',
        val: 28800, // 8 hours
      },
      {
        get description() {
          return t('description', { n: 10 });
        },
        get nextTitle() {
          return t('platinumTitle');
        },
        rank: 'platinum',
        val: 36000, // 10 hours
      },
    ],
  });
};

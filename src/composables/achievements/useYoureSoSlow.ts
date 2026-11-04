import { useI18n } from 'vue-i18n';

import { useTimer } from '@/stores/useTimer.ts';
import { createAchievement } from '@/utils/utils.ts';

export const useYoureSoSlow = () => {
  const { timerState } = useTimer();
  const { t } = useI18n({
    messages: {
      cn: {
        bronzeTitle: '慢慢来',
        description: '在一场比赛中玩了 {n} 小时。',
        goldTitle: '马拉松选手',
        lastDescription: '在一场比赛中玩了 10 小时。',
        lastTitle: '你太慢了',
        platinumTitle: '永恒',
        silverTitle: '持久',
      },
      de: {
        bronzeTitle: 'Langsam',
        description: 'Spiele {n} Stunden in einem Spiel.',
        goldTitle: 'Marathonläufer',
        lastDescription: '10 Stunden in einem Spiel gespielt.',
        lastTitle: 'Du bist so langsam',
        platinumTitle: 'Ewigkeit',
        silverTitle: 'Ausdauernd',
      },
      en: {
        bronzeTitle: 'Slowpoke',
        description: 'Play for {n} hours in a single game.',
        goldTitle: 'Marathon Runner',
        lastDescription: 'Played for 10 hours in a single game.',
        lastTitle: "You're so slow",
        platinumTitle: 'Eternal',
        silverTitle: 'Enduring',
      },
      es: {
        bronzeTitle: 'Lento',
        description: 'Juega durante {n} horas en una sola partida.',
        goldTitle: 'Maratoniano',
        lastDescription: 'Jugó durante 10 horas en una sola partida.',
        lastTitle: 'Eres muy lento',
        platinumTitle: 'Eterno',
        silverTitle: 'Resistente',
      },
      fr: {
        bronzeTitle: 'Lambin',
        description: 'Jouez pendant {n} heures en une seule partie.',
        goldTitle: 'Marathonien',
        lastDescription: 'Joué pendant 10 heures en une seule partie.',
        lastTitle: 'Tu es si lent',
        platinumTitle: 'Éternel',
        silverTitle: 'Endurant',
      },
      it: {
        bronzeTitle: 'Lento',
        description: 'Gioca per {n} ore in una singola partita.',
        goldTitle: 'Maratoneta',
        lastDescription: 'Giocato per 10 ore in una singola partita.',
        lastTitle: 'Sei così lento',
        platinumTitle: 'Eterno',
        silverTitle: 'Resistente',
      },
      jp: {
        bronzeTitle: 'のろま',
        description: '1つのゲームで{n}時間プレイする。',
        goldTitle: 'マラソンランナー',
        lastDescription: '1つのゲームで10時間プレイした。',
        lastTitle: '遅すぎる',
        platinumTitle: '永遠',
        silverTitle: '持久',
      },
      ko: {
        bronzeTitle: '느림보',
        description: '한 게임에서 {n}시간 플레이하세요.',
        goldTitle: '마라톤 러너',
        lastDescription: '한 게임에서 10시간 플레이했습니다.',
        lastTitle: '너 너무 느려',
        platinumTitle: '영원한',
        silverTitle: '인내하는',
      },
      pt: {
        bronzeTitle: 'Lento',
        description: 'Jogue por {n} horas em uma única partida.',
        goldTitle: 'Maratonista',
        lastDescription: 'Jogou por 10 horas em uma única partida.',
        lastTitle: 'Você é muito lento',
        platinumTitle: 'Eterno',
        silverTitle: 'Resistente',
      },
      ru: {
        bronzeTitle: 'Тугодум',
        description: 'Играйте {n} часов в одной игре.',
        goldTitle: 'Марафонец',
        lastDescription: 'Сыграно 10 часов в одной игре.',
        lastTitle: 'Ты так медленный',
        platinumTitle: 'Вечный',
        silverTitle: 'Выносливый',
      },
      zh: {
        bronzeTitle: '慢慢來',
        description: '在一場比賽中玩了 {n} 小時。',
        goldTitle: '馬拉松選手',
        lastDescription: '在一場比賽中玩了 10 小時。',
        lastTitle: '你太慢了',
        platinumTitle: '永恆',
        silverTitle: '持久',
      },
    },
    useScope: 'isolated',
  });

  // Timer elapsed is in seconds; thresholds in hours: 4h=14400s, 6h=21600s, 8h=28800s, 10h=36000s
  return createAchievement({
    category: 'timer',
    getValue: () => timerState.elapsed,
    id: 'youreSoSlow',
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

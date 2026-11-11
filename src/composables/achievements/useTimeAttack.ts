import { useI18n } from 'vue-i18n';

import { useGlobalStats } from '@/stores/useGlobalStats.ts';
import { createAchievement } from '@/utils/utils.ts';

export const useTimeAttack = () => {
  const { t } = useI18n({
    messages: {
      cn: {
        bronzeTitle: '滴答作响',
        description: '玩 {n} 场限时游戏。',
        goldTitle: '速度恶魔',
        lastDescription: '玩了 50 场限时游戏。',
        lastTitle: '限时挑战大师',
        platinumTitle: '与时间赛跑',
        silverTitle: '快速思考',
      },
      de: {
        bronzeTitle: 'Tickende Uhr',
        description: 'Spiele {n} Spiele mit Zeitlimit.',
        goldTitle: 'Tempo-Teufel',
        lastDescription: '50 Spiele mit Zeitlimit gespielt.',
        lastTitle: 'Zeitangriff-Meister',
        platinumTitle: 'Wettlauf gegen die Zeit',
        silverTitle: 'Schnelldenker',
      },
      en: {
        bronzeTitle: 'Ticking Clock',
        description: 'Play {n} games with a time limit.',
        goldTitle: 'Speed Demon',
        lastDescription: 'Played 50 games with a time limit.',
        lastTitle: 'Time Attack Master',
        platinumTitle: 'Race Against Time',
        silverTitle: 'Quick Thinker',
      },
      es: {
        bronzeTitle: 'Reloj en marcha',
        description: 'Juega {n} partidas con límite de tiempo.',
        goldTitle: 'Demonio veloz',
        lastDescription: 'Jugó 50 partidas con límite de tiempo.',
        lastTitle: 'Maestro contrarreloj',
        platinumTitle: 'Carrera contra el tiempo',
        silverTitle: 'Pensador rápido',
      },
      fr: {
        bronzeTitle: 'Tic-tac',
        description: 'Jouez {n} parties avec une limite de temps.',
        goldTitle: 'Démon de vitesse',
        lastDescription: 'Joué 50 parties avec une limite de temps.',
        lastTitle: 'Maître du contre-la-montre',
        platinumTitle: 'Course contre la montre',
        silverTitle: 'Esprit vif',
      },
      it: {
        bronzeTitle: 'Orologio che corre',
        description: 'Gioca {n} partite con limite di tempo.',
        goldTitle: 'Demone della velocità',
        lastDescription: 'Giocato 50 partite con limite di tempo.',
        lastTitle: 'Maestro a tempo',
        platinumTitle: 'Corsa contro il tempo',
        silverTitle: 'Pensatore rapido',
      },
      jp: {
        bronzeTitle: '時計の音',
        description: '制限時間付きのゲームを {n} 回プレイする。',
        goldTitle: 'スピードの鬼',
        lastDescription: '制限時間付きのゲームを 50 回プレイした。',
        lastTitle: 'タイムアタックマスター',
        platinumTitle: '時間との戦い',
        silverTitle: '素早い思考',
      },
      ko: {
        bronzeTitle: '째깍째깍',
        description: '제한 시간이 있는 게임을 {n}번 플레이하세요.',
        goldTitle: '스피드 악마',
        lastDescription: '제한 시간이 있는 게임을 50번 플레이했습니다.',
        lastTitle: '타임 어택 마스터',
        platinumTitle: '시간과의 싸움',
        silverTitle: '빠른 사고',
      },
      pt: {
        bronzeTitle: 'Relógio correndo',
        description: 'Jogue {n} partidas com limite de tempo.',
        goldTitle: 'Demônio da velocidade',
        lastDescription: 'Jogou 50 partidas com limite de tempo.',
        lastTitle: 'Mestre contra o relógio',
        platinumTitle: 'Corrida contra o tempo',
        silverTitle: 'Pensador rápido',
      },
      ru: {
        bronzeTitle: 'Тикающие часы',
        description: 'Сыграйте {n} партий с ограничением по времени.',
        goldTitle: 'Демон скорости',
        lastDescription: 'Сыграно 50 партий с ограничением по времени.',
        lastTitle: 'Мастер на время',
        platinumTitle: 'Гонка со временем',
        silverTitle: 'Быстрый ум',
      },
      zh: {
        bronzeTitle: '滴答作響',
        description: '玩 {n} 場限時遊戲。',
        goldTitle: '速度惡魔',
        lastDescription: '玩了 50 場限時遊戲。',
        lastTitle: '限時挑戰大師',
        platinumTitle: '與時間賽跑',
        silverTitle: '快速思考',
      },
    },
    useScope: 'isolated',
  });

  return createAchievement({
    category: 'misc',
    getValue: () => {
      const { statsState } = useGlobalStats();
      return statsState.timeAttackPlays;
    },
    id: 'timeAttack',
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
          return t('description', { n: 5 });
        },
        get nextTitle() {
          return t('bronzeTitle');
        },
        rank: 'bronze',
        val: 5,
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

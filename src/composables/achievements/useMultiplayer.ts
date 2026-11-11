import { useI18n } from 'vue-i18n';

import { useGlobalStats } from '@/stores/useGlobalStats.ts';
import { createAchievement } from '@/utils/utils.ts';

export const useMultiplayer = () => {
  const { t } = useI18n({
    messages: {
      cn: {
        bronzeTitle: '团队玩家',
        description: '玩 {n} 场多人游戏。',
        goldTitle: '小队队长',
        lastDescription: '玩了 50 场多人游戏。',
        lastTitle: '多人游戏大师',
        platinumTitle: '社交达人',
        silverTitle: '队伍成员',
      },
      de: {
        bronzeTitle: 'Teamplayer',
        description: 'Spiele {n} Mehrspielerpartien.',
        goldTitle: 'Truppführer',
        lastDescription: '50 Mehrspielerpartien gespielt.',
        lastTitle: 'Mehrspieler-Meister',
        platinumTitle: 'Gesellschaftsmensch',
        silverTitle: 'Gruppenmitglied',
      },
      en: {
        bronzeTitle: 'Team Player',
        description: 'Play {n} multiplayer games.',
        goldTitle: 'Squad Leader',
        lastDescription: 'Played 50 multiplayer games.',
        lastTitle: 'Multiplayer Master',
        platinumTitle: 'Social Butterfly',
        silverTitle: 'Party Member',
      },
      es: {
        bronzeTitle: 'Jugador de equipo',
        description: 'Juega {n} partidas multijugador.',
        goldTitle: 'Líder de escuadrón',
        lastDescription: 'Jugó 50 partidas multijugador.',
        lastTitle: 'Maestro multijugador',
        platinumTitle: 'Alma social',
        silverTitle: 'Miembro del grupo',
      },
      fr: {
        bronzeTitle: "Esprit d'équipe",
        description: 'Jouez {n} parties multijoueur.',
        goldTitle: "Chef d'escouade",
        lastDescription: 'Joué 50 parties multijoueur.',
        lastTitle: 'Maître du multijoueur',
        platinumTitle: 'Papillon social',
        silverTitle: 'Membre du groupe',
      },
      it: {
        bronzeTitle: 'Giocatore di squadra',
        description: 'Gioca {n} partite multigiocatore.',
        goldTitle: 'Capo squadra',
        lastDescription: 'Giocato 50 partite multigiocatore.',
        lastTitle: 'Maestro multigiocatore',
        platinumTitle: 'Anima sociale',
        silverTitle: 'Membro del gruppo',
      },
      jp: {
        bronzeTitle: 'チームプレイヤー',
        description: 'マルチプレイのゲームを {n} 回プレイする。',
        goldTitle: '分隊リーダー',
        lastDescription: 'マルチプレイのゲームを 50 回プレイした。',
        lastTitle: 'マルチプレイマスター',
        platinumTitle: '社交家',
        silverTitle: 'パーティメンバー',
      },
      ko: {
        bronzeTitle: '팀 플레이어',
        description: '멀티플레이어 게임을 {n}번 플레이하세요.',
        goldTitle: '분대장',
        lastDescription: '멀티플레이어 게임을 50번 플레이했습니다.',
        lastTitle: '멀티플레이어 마스터',
        platinumTitle: '인싸',
        silverTitle: '파티원',
      },
      pt: {
        bronzeTitle: 'Jogador de equipe',
        description: 'Jogue {n} partidas multijogador.',
        goldTitle: 'Líder de esquadrão',
        lastDescription: 'Jogou 50 partidas multijogador.',
        lastTitle: 'Mestre multijogador',
        platinumTitle: 'Borboleta social',
        silverTitle: 'Membro do grupo',
      },
      ru: {
        bronzeTitle: 'Командный игрок',
        description: 'Сыграйте {n} многопользовательских партий.',
        goldTitle: 'Командир отряда',
        lastDescription: 'Сыграно 50 многопользовательских партий.',
        lastTitle: 'Мастер мультиплеера',
        platinumTitle: 'Душа компании',
        silverTitle: 'Участник группы',
      },
      zh: {
        bronzeTitle: '團隊玩家',
        description: '玩 {n} 場多人遊戲。',
        goldTitle: '小隊隊長',
        lastDescription: '玩了 50 場多人遊戲。',
        lastTitle: '多人遊戲大師',
        platinumTitle: '社交達人',
        silverTitle: '隊伍成員',
      },
    },
    useScope: 'isolated',
  });

  return createAchievement({
    category: 'misc',
    getValue: () => {
      const { statsState } = useGlobalStats();
      return statsState.multiplayerPlays;
    },
    id: 'multiplayer',
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

import { useI18n } from 'vue-i18n';

import { useProfile } from '@/stores/useProfile.ts';
import { createAchievement } from '@/utils/utils.ts';

export const useMegaWins = () => {
  const { getMegaWins } = useProfile();
  const { t } = useI18n({
    messages: {
      cn: {
        bronzeTitle: '实验室学徒',
        description: '完成 {n} 场Mega模式游戏。',
        goldTitle: '进化研究员',
        lastDescription: '完成了超过 500 场Mega模式游戏。',
        lastTitle: '进化设计师',
        platinumTitle: '进化先驱',
        silverTitle: '好奇的实验者',
      },
      de: {
        bronzeTitle: 'Laborlehrling',
        description: 'Schließe {n} Mega-Spiele ab.',
        goldTitle: 'Evolutionsforscher',
        lastDescription: 'Mehr als 500 Mega-Spiele abgeschlossen.',
        lastTitle: 'Evolutionsarchitekt',
        platinumTitle: 'Evolutionspionier',
        silverTitle: 'Neugieriger Experimentator',
      },
      en: {
        bronzeTitle: 'Lab Apprentice',
        description: 'Finish {n} Mega mode games.',
        goldTitle: 'Evolution Researcher',
        lastDescription: 'Finished more than 500 Mega mode games.',
        lastTitle: 'Evolution Architect',
        platinumTitle: 'Evolution Pioneer',
        silverTitle: 'Curious Experimenter',
      },
      es: {
        bronzeTitle: 'Aprendiz',
        description: 'Completa {n} partidas de modo Mega.',
        goldTitle: 'Evo-Investigador',
        lastDescription: 'Más de 500 partidas de modo Mega completadas.',
        lastTitle: 'Evo-Arquitecto',
        platinumTitle: 'Evo-Pionero',
        silverTitle: 'Experimentador',
      },
      fr: {
        bronzeTitle: 'Apprenti',
        description: 'Terminez {n} parties en mode Mega.',
        goldTitle: 'Évo-Chercheur',
        lastDescription: 'Plus de 500 parties en mode Mega terminées.',
        lastTitle: 'Évo-Architecte',
        platinumTitle: 'Évo-Pionnier',
        silverTitle: 'Expérimentateur',
      },
      it: {
        bronzeTitle: 'Apprendista',
        description: 'Completa {n} partite in modalità Mega.',
        goldTitle: 'Evo-Ricercatore',
        lastDescription: 'Più di 500 partite in modalità Mega completate.',
        lastTitle: 'Evo-Architetto',
        platinumTitle: 'Evo-Pioniere',
        silverTitle: 'Sperimentatore',
      },
      jp: {
        bronzeTitle: '研究所の見習い',
        description: 'メガモードを{n}回クリア。',
        goldTitle: '進化研究者',
        lastDescription: 'メガモードを500回以上クリア。',
        lastTitle: '進化の設計者',
        platinumTitle: '進化の先駆者',
        silverTitle: '好奇心旺盛な実験者',
      },
      ko: {
        bronzeTitle: '연구소 견습생',
        description: '메가 모드 게임을 {n}회 완료하세요.',
        goldTitle: '진화 연구원',
        lastDescription: '메가 모드 게임을 500회 이상 완료.',
        lastTitle: '진화 설계자',
        platinumTitle: '진화 개척자',
        silverTitle: '호기심 많은 실험가',
      },
      pt: {
        bronzeTitle: 'Aprendiz',
        description: 'Complete {n} partidas no modo Mega.',
        goldTitle: 'Evo-Pesquisador',
        lastDescription: 'Mais de 500 partidas no modo Mega completadas.',
        lastTitle: 'Evo-Arquiteto',
        platinumTitle: 'Evo-Pioneiro',
        silverTitle: 'Experimentador',
      },
      ru: {
        bronzeTitle: 'Лаборант-стажёр',
        description: 'Завершите {n} игр в режиме мега.',
        goldTitle: 'Исследователь эволюции',
        lastDescription: 'Завершено более 500 игр в режиме мега.',
        lastTitle: 'Архитектор эволюции',
        platinumTitle: 'Первопроходец эволюции',
        silverTitle: 'Любознательный экспериментатор',
      },
      zh: {
        bronzeTitle: '實驗室學徒',
        description: '完成 {n} 場Mega模式遊戲。',
        goldTitle: '進化研究員',
        lastDescription: '完成了超過 500 場Mega模式遊戲。',
        lastTitle: '進化設計師',
        platinumTitle: '進化先驅',
        silverTitle: '好奇的實驗者',
      },
    },
    useScope: 'isolated',
  });

  return createAchievement({
    category: 'total',
    getValue: getMegaWins,
    id: 'megaWins',
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

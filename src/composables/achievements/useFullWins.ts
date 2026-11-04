import { useI18n } from 'vue-i18n';

import { useProfile } from '@/stores/useProfile.ts';
import { createAchievement } from '@/utils/utils.ts';

export const useFullWins = () => {
  const { getFullWins } = useProfile();
  const { t } = useI18n({
    messages: {
      cn: {
        bronzeTitle: '宝可梦学者',
        description: '完成 {n} 场完整模式游戏。',
        goldTitle: '宝可梦专家',
        lastDescription: '完成了超过 500 场完整模式游戏。',
        lastTitle: '宝可梦教授',
        platinumTitle: '宝可梦大师',
        silverTitle: '宝可梦爱好者',
      },
      de: {
        bronzeTitle: 'Pokémon-Forscher',
        description: 'Schließe {n} Voll-Spiele ab.',
        goldTitle: 'Pokémon-Experte',
        lastDescription: 'Mehr als 500 Voll-Spiele abgeschlossen.',
        lastTitle: 'Pokémon-Professor',
        platinumTitle: 'Pokémon-Meister',
        silverTitle: 'Pokémon-Fan',
      },
      en: {
        bronzeTitle: 'Pokémon Scholar',
        description: 'Finish {n} full mode games.',
        goldTitle: 'Pokémon Expert',
        lastDescription: 'Finished more than 500 full mode games.',
        lastTitle: 'Pokémon Professor',
        platinumTitle: 'Pokémon Master',
        silverTitle: 'Pokémon Aficionado',
      },
      es: {
        bronzeTitle: 'Erudito Pokémon',
        description: 'Completa {n} partidas de modo completo.',
        goldTitle: 'Experto Pokémon',
        lastDescription: 'Más de 500 partidas de modo completo completadas.',
        lastTitle: 'Profesor Pokémon',
        platinumTitle: 'Maestro Pokémon',
        silverTitle: 'Aficionado Pokémon',
      },
      fr: {
        bronzeTitle: 'Érudit Pokémon',
        description: 'Terminez {n} parties en mode complet.',
        goldTitle: 'Expert Pokémon',
        lastDescription: 'Plus de 500 parties en mode complet terminées.',
        lastTitle: 'Professeur Pokémon',
        platinumTitle: 'Maître Pokémon',
        silverTitle: 'Connaisseur Pokémon',
      },
      it: {
        bronzeTitle: 'Studioso Pokémon',
        description: 'Completa {n} partite in modalità completa.',
        goldTitle: 'Esperto Pokémon',
        lastDescription: 'Più di 500 partite in modalità completa completate.',
        lastTitle: 'Professore Pokémon',
        platinumTitle: 'Maestro Pokémon',
        silverTitle: 'Appassionato Pokémon',
      },
      jp: {
        bronzeTitle: 'ポケモン学者',
        description: 'フルモードを{n}回クリア。',
        goldTitle: 'ポケモンエキスパート',
        lastDescription: 'フルモードを500回以上クリア。',
        lastTitle: 'ポケモン博士',
        platinumTitle: 'ポケモンマスター',
        silverTitle: 'ポケモン愛好家',
      },
      ko: {
        bronzeTitle: '포켓몬 학자',
        description: '풀 모드 게임을 {n}회 완료하세요.',
        goldTitle: '포켓몬 전문가',
        lastDescription: '풀 모드 게임을 500회 이상 완료.',
        lastTitle: '포켓몬 박사',
        platinumTitle: '포켓몬 마스터',
        silverTitle: '포켓몬 애호가',
      },
      pt: {
        bronzeTitle: 'Erudito Pokémon',
        description: 'Complete {n} partidas no modo completo.',
        goldTitle: 'Especialista Pokémon',
        lastDescription: 'Mais de 500 partidas no modo completo completadas.',
        lastTitle: 'Professor Pokémon',
        platinumTitle: 'Mestre Pokémon',
        silverTitle: 'Aficionado Pokémon',
      },
      ru: {
        bronzeTitle: 'Ученый покемонов',
        description: 'Завершите {n} игр в полном режиме.',
        goldTitle: 'Эксперт покемонов',
        lastDescription: 'Завершено более 500 игр в полном режиме.',
        lastTitle: 'Профессор покемонов',
        platinumTitle: 'Мастер покемонов',
        silverTitle: 'Знаток покемонов',
      },
      zh: {
        bronzeTitle: '寶可夢學者',
        description: '完成 {n} 場完整模式遊戲。',
        goldTitle: '寶可夢專家',
        lastDescription: '完成了超過 500 場完整模式遊戲。',
        lastTitle: '寶可夢教授',
        platinumTitle: '寶可夢大師',
        silverTitle: '寶可夢愛好者',
      },
    },
    useScope: 'isolated',
  });

  return createAchievement({
    category: 'game',
    getValue: getFullWins,
    id: 'godOfPokemon',
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

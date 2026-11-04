import { useI18n } from 'vue-i18n';

import { useProfile } from '@/stores/useProfile.ts';
import { createAchievement } from '@/utils/utils.ts';

export const useDexOrderWins = () => {
  const { getOrderWins } = useProfile();
  const { t } = useI18n({
    messages: {
      cn: {
        bronzeTitle: '顺序爱好者',
        description: '完成 {n} 场顺序模式游戏。',
        goldTitle: '顺序专家',
        lastDescription: '完成了超过 500 场顺序模式游戏。',
        lastTitle: '顺序狂热者',
        platinumTitle: '顺序大师',
        silverTitle: '顺序学者',
      },
      de: {
        bronzeTitle: 'Reihenfolge-Enthusiast',
        description: 'Schließe {n} Reihenfolge-Spiele ab.',
        goldTitle: 'Reihenfolge-Experte',
        lastDescription: 'Mehr als 500 Reihenfolge-Spiele abgeschlossen.',
        lastTitle: 'Reihenfolge-Fanatiker',
        platinumTitle: 'Reihenfolge-Meister',
        silverTitle: 'Reihenfolge-Forscher',
      },
      en: {
        bronzeTitle: 'Order Enthusiast',
        description: 'Finish {n} dex order mode games.',
        goldTitle: 'Order Expert',
        lastDescription: 'Finished more than 500 dex order mode games.',
        lastTitle: 'Order Fanatic',
        platinumTitle: 'Order Master',
        silverTitle: 'Order Scholar',
      },
      es: {
        bronzeTitle: 'Entusiasta del orden',
        description: 'Completa {n} partidas de modo orden.',
        goldTitle: 'Experto del orden',
        lastDescription: 'Más de 500 partidas de modo orden completadas.',
        lastTitle: 'Fanático del orden',
        platinumTitle: 'Maestro del orden',
        silverTitle: 'Erudito del orden',
      },
      fr: {
        bronzeTitle: "Passionné de l'ordre",
        description: 'Terminez {n} parties en mode ordre.',
        goldTitle: "Expert de l'ordre",
        lastDescription: 'Plus de 500 parties en mode ordre terminées.',
        lastTitle: "Fanatique de l'ordre",
        platinumTitle: "Maître de l'ordre",
        silverTitle: "Érudit de l'ordre",
      },
      it: {
        bronzeTitle: "Appassionato dell'ordine",
        description: 'Completa {n} partite in modalità ordine.',
        goldTitle: "Esperto dell'ordine",
        lastDescription: 'Più di 500 partite in modalità ordine completate.',
        lastTitle: "Fanatico dell'ordine",
        platinumTitle: "Maestro dell'ordine",
        silverTitle: "Studioso dell'ordine",
      },
      jp: {
        bronzeTitle: '順番愛好家',
        description: '順番モードを{n}回クリア。',
        goldTitle: '順番エキスパート',
        lastDescription: '順番モードを500回以上クリア。',
        lastTitle: '順番熱狂者',
        platinumTitle: '順番マスター',
        silverTitle: '順番学者',
      },
      ko: {
        bronzeTitle: '순서 애호가',
        description: '순서 모드 게임을 {n}회 완료하세요.',
        goldTitle: '순서 전문가',
        lastDescription: '순서 모드 게임을 500회 이상 완료.',
        lastTitle: '순서 열성 팬',
        platinumTitle: '순서 마스터',
        silverTitle: '순서 학자',
      },
      pt: {
        bronzeTitle: 'Entusiasta da ordem',
        description: 'Complete {n} partidas no modo ordem.',
        goldTitle: 'Especialista da ordem',
        lastDescription: 'Mais de 500 partidas no modo ordem completadas.',
        lastTitle: 'Fanático da ordem',
        platinumTitle: 'Mestre da ordem',
        silverTitle: 'Erudito da ordem',
      },
      ru: {
        bronzeTitle: 'Энтузиаст порядка',
        description: 'Завершите {n} игр в режиме порядка.',
        goldTitle: 'Эксперт порядка',
        lastDescription: 'Завершено более 500 игр в режиме порядка.',
        lastTitle: 'Фанатик порядка',
        platinumTitle: 'Мастер порядка',
        silverTitle: 'Ученый порядка',
      },
      zh: {
        bronzeTitle: '順序愛好者',
        description: '完成 {n} 場順序模式遊戲。',
        goldTitle: '順序專家',
        lastDescription: '完成了超過 500 場順序模式遊戲。',
        lastTitle: '順序狂熱者',
        platinumTitle: '順序大師',
        silverTitle: '順序學者',
      },
    },
    useScope: 'isolated',
  });

  return createAchievement({
    category: 'total',
    getValue: getOrderWins,
    id: 'dexOrder',
    get lastDescription() {
      return t('lastDescription');
    },
    get lastTitle() {
      return t('lastTitle');
    },
    priority: 20,
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

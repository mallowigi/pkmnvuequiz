// Global spelling counter achievement
import { useI18n } from 'vue-i18n';

import { useGlobalStats } from '@/stores/useGlobalStats.ts';
import { createAchievement } from '@/utils/utils.ts';

export const useGlobalSpelling = () => {
  const { statsState } = useGlobalStats();
  const { t } = useI18n({
    messages: {
      cn: {
        bronzeTitle: '拼写检查器',
        description: '总共使用 {n} 次拼写提示。',
        goldTitle: '语法纳粹',
        lastDescription: '总共使用了 1000 次拼写提示。',
        lastTitle: '阅读障碍者',
        platinumTitle: '校对员',
        silverTitle: '拼写比赛',
      },
      de: {
        bronzeTitle: 'Rechtschreibprüfer',
        description: 'Verwende insgesamt {n} Mal den Rechtschreibhinweis.',
        goldTitle: 'Grammatik-Nazi',
        lastDescription: 'Insgesamt 1000 Mal den Rechtschreibhinweis verwendet.',
        lastTitle: 'Dyslektiker',
        platinumTitle: 'Lektor',
        silverTitle: 'Rechtschreibwettbewerb',
      },
      en: {
        bronzeTitle: 'Spell Checker',
        description: 'Use spelling hint {n} times total.',
        goldTitle: 'Grammar Nazi',
        lastDescription: 'Used spelling hint 1000 times total.',
        lastTitle: 'Dyslexic',
        platinumTitle: 'Proofreader',
        silverTitle: 'Spelling Bee',
      },
      es: {
        bronzeTitle: 'Corrector ortográfico',
        description: 'Usa la pista ortográfica {n} veces en total.',
        goldTitle: 'Nazi gramatical',
        lastDescription: 'Usó la pista ortográfica 1000 veces en total.',
        lastTitle: 'Disléxico',
        platinumTitle: 'Corrector de pruebas',
        silverTitle: 'Concurso ortográfico',
      },
      fr: {
        bronzeTitle: 'Correcteur orthographique',
        description: 'Utilisez l\'indice orthographique {n} fois au total.',
        goldTitle: 'Nazi grammatical',
        lastDescription: 'Utilisé l\'indice orthographique 1000 fois au total.',
        lastTitle: 'Dyslexique',
        platinumTitle: 'Correcteur',
        silverTitle: 'Concours d\'orthographe',
      },
      it: {
        bronzeTitle: 'Controllo ortografico',
        description: 'Usa il suggerimento ortografico {n} volte in totale.',
        goldTitle: 'Nazi grammaticale',
        lastDescription: 'Usato il suggerimento ortografico 1000 volte in totale.',
        lastTitle: 'Dislessico',
        platinumTitle: 'Correttore di bozze',
        silverTitle: 'Concorso di ortografia',
      },
      jp: {
        bronzeTitle: 'スペルチェッカー',
        description: '合計{n}回スペルヒントを使用する。',
        goldTitle: '文法ナチ',
        lastDescription: '合計1000回スペルヒントを使用した。',
        lastTitle: 'ディスレクシア',
        platinumTitle: '校正者',
        silverTitle: 'スペリングビー',
      },
      ko: {
        bronzeTitle: '맞춤법 검사기',
        description: '총 {n}번 철자 힌트를 사용하세요.',
        goldTitle: '문법 나치',
        lastDescription: '총 1000번 철자 힌트를 사용했습니다.',
        lastTitle: '독서 장애자',
        platinumTitle: '교정자',
        silverTitle: '철자 대회',
      },
      pt: {
        bronzeTitle: 'Verificador ortográfico',
        description: 'Use a dica ortográfica {n} vezes no total.',
        goldTitle: 'Nazi gramatical',
        lastDescription: 'Usou a dica ortográfica 1000 vezes no total.',
        lastTitle: 'Disléxico',
        platinumTitle: 'Revisor',
        silverTitle: 'Concurso de ortografia',
      },
      ru: {
        bronzeTitle: 'Проверка орфографии',
        description: 'Используйте подсказку по орфографии {n} раз всего.',
        goldTitle: 'Грамматический нацист',
        lastDescription: 'Использовано подсказку по орфографии 1000 раз всего.',
        lastTitle: 'Дислексик',
        platinumTitle: 'Корректор',
        silverTitle: 'Орфографическая олимпиада',
      },
      zh: {
        bronzeTitle: '拼寫檢查器',
        description: '總共使用 {n} 次拼寫提示。',
        goldTitle: '語法納粹',
        lastDescription: '總共使用了 1000 次拼寫提示。',
        lastTitle: '閱讀障礙者',
        platinumTitle: '校對員',
        silverTitle: '拼寫比賽',
      },
    },
  });

  return createAchievement({
    category: 'counters',
    getValue: () => statsState.totalInvokedSpelling,
    id: 'globalSpelling',
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
          return t('description', { n: 100 });
        },
        get nextTitle() {
          return t('bronzeTitle');
        },
        rank: 'bronze',
        val: 100,
      },
      {
        get description() {
          return t('description', { n: 200 });
        },
        get nextTitle() {
          return t('silverTitle');
        },
        rank: 'silver',
        val: 200,
      },
      {
        get description() {
          return t('description', { n: 500 });
        },
        get nextTitle() {
          return t('goldTitle');
        },
        rank: 'gold',
        val: 500,
      },
      {
        get description() {
          return t('description', { n: 1000 });
        },
        get nextTitle() {
          return t('platinumTitle');
        },
        rank: 'platinum',
        val: 1000,
      },
    ],
  });
};

// Global spelling counter achievement
import { useI18n } from 'vue-i18n';

import { useGlobalStats } from '@/stores/useGlobalStats.ts';
import { createAchievement } from '@/utils/utils.ts';

export const useGlobalSpelling = () => {
  const { t } = useI18n({
    messages: {
      cn: {
        bronzeTitle: '拼写检查器',
        description: '总共使用 {n} 次拼写提示。',
        goldTitle: '语法达人',
        lastDescription: '总共使用了 1000 次拼写提示。',
        lastTitle: '拼写大师',
        platinumTitle: '校对员',
        silverTitle: '拼写比赛',
      },
      de: {
        bronzeTitle: 'Rechtschreibprüfer',
        description: 'Verwende insgesamt {n} Mal den Rechtschreibhinweis.',
        goldTitle: 'Grammatik-Ass',
        lastDescription: 'Insgesamt 1000 Mal den Rechtschreibhinweis verwendet.',
        lastTitle: 'Rechtschreibmeister',
        platinumTitle: 'Lektor',
        silverTitle: 'Rechtschreibwettbewerb',
      },
      en: {
        bronzeTitle: 'Spell Checker',
        description: 'Use spelling hint {n} times total.',
        goldTitle: 'Grammar Ace',
        lastDescription: 'Used spelling hint 1000 times total.',
        lastTitle: 'Spelling Master',
        platinumTitle: 'Proofreader',
        silverTitle: 'Spelling Bee',
      },
      es: {
        bronzeTitle: 'Corrector ortográfico',
        description: 'Usa la pista ortográfica {n} veces en total.',
        goldTitle: 'As de la gramática',
        lastDescription: 'Usó la pista ortográfica 1000 veces en total.',
        lastTitle: 'Maestro de la ortografía',
        platinumTitle: 'Corrector de pruebas',
        silverTitle: 'Concurso ortográfico',
      },
      fr: {
        bronzeTitle: 'Correcteur orthographique',
        description: "Utilisez l'indice orthographique {n} fois au total.",
        goldTitle: 'As de la grammaire',
        lastDescription: "Utilisé l'indice orthographique 1000 fois au total.",
        lastTitle: "Maître de l'orthographe",
        platinumTitle: 'Correcteur',
        silverTitle: "Concours d'orthographe",
      },
      it: {
        bronzeTitle: 'Controllo ortografico',
        description: 'Usa il suggerimento ortografico {n} volte in totale.',
        goldTitle: 'Asso della grammatica',
        lastDescription: 'Usato il suggerimento ortografico 1000 volte in totale.',
        lastTitle: "Maestro dell'ortografia",
        platinumTitle: 'Correttore di bozze',
        silverTitle: 'Concorso di ortografia',
      },
      jp: {
        bronzeTitle: 'スペルチェッカー',
        description: '合計{n}回スペルヒントを使用する。',
        goldTitle: '文法マスター',
        lastDescription: '合計1000回スペルヒントを使用した。',
        lastTitle: 'スペルマスター',
        platinumTitle: '校正者',
        silverTitle: 'スペリングビー',
      },
      ko: {
        bronzeTitle: '맞춤법 검사기',
        description: '총 {n}번 철자 힌트를 사용하세요.',
        goldTitle: '맞춤법 달인',
        lastDescription: '총 1000번 철자 힌트를 사용했습니다.',
        lastTitle: '철자 마스터',
        platinumTitle: '교정자',
        silverTitle: '철자 대회',
      },
      pt: {
        bronzeTitle: 'Verificador ortográfico',
        description: 'Use a dica ortográfica {n} vezes no total.',
        goldTitle: 'Ás da gramática',
        lastDescription: 'Usou a dica ortográfica 1000 vezes no total.',
        lastTitle: 'Mestre da ortografia',
        platinumTitle: 'Revisor',
        silverTitle: 'Concurso de ortografia',
      },
      ru: {
        bronzeTitle: 'Проверка орфографии',
        description: 'Используйте подсказку по правописанию {n} раз.',
        goldTitle: 'Знаток грамматики',
        lastDescription: 'Использовано 1000 подсказок по правописанию.',
        lastTitle: 'Мастер правописания',
        platinumTitle: 'Корректор',
        silverTitle: 'Орфографическая олимпиада',
      },
      zh: {
        bronzeTitle: '拼寫檢查器',
        description: '總共使用 {n} 次拼寫提示。',
        goldTitle: '語法達人',
        lastDescription: '總共使用了 1000 次拼寫提示。',
        lastTitle: '拼寫大師',
        platinumTitle: '校對員',
        silverTitle: '拼寫比賽',
      },
    },
    useScope: 'isolated',
  });

  return createAchievement({
    category: 'counters',
    getValue: () => {
      const { statsState } = useGlobalStats();
      return statsState.totalInvokedSpelling;
    },
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

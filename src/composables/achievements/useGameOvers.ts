// Global game overs counter achievement
import { useI18n } from 'vue-i18n';

import { useGlobalStats } from '@/stores/useGlobalStats.ts';
import { createAchievement } from '@/utils/utils.ts';

export const useGameOvers = () => {
  const { statsState } = useGlobalStats();
  const { t } = useI18n({
    messages: {
      cn: {
        bronzeTitle: '新手',
        description: '放弃或显示所有阴影 {n} 次。',
        goldTitle: '放弃者',
        lastDescription: '放弃了 500 次或显示了所有阴影。',
        lastTitle: '头脑空空',
        platinumTitle: '简单人',
        silverTitle: '初学者',
      },
      de: {
        bronzeTitle: 'Anfänger',
        description: 'Gib {n} Mal auf oder zeige alle Schatten.',
        goldTitle: 'Aufgeber',
        lastDescription: '500 Mal aufgegeben oder alle Schatten gezeigt.',
        lastTitle: 'Leerer Kopf',
        platinumTitle: 'Einfaltspinsel',
        silverTitle: 'Einsteiger',
      },
      en: {
        bronzeTitle: 'Novice',
        description: 'Give up or reveal all shadows {n} times.',
        goldTitle: 'Quitter',
        lastDescription: 'Gave up or revealed all shadows 500 times.',
        lastTitle: 'Empty Head',
        platinumTitle: 'Simpleton',
        silverTitle: 'Beginner',
      },
      es: {
        bronzeTitle: 'Novato',
        description: 'Ríndete o revela todas las sombras {n} veces.',
        goldTitle: 'Renunciante',
        lastDescription: 'Se rindió o reveló todas las sombras 500 veces.',
        lastTitle: 'Cabeza vacía',
        platinumTitle: 'Simple',
        silverTitle: 'Principiante',
      },
      fr: {
        bronzeTitle: 'Novice',
        description: 'Abandonnez ou révélez toutes les ombres {n} fois.',
        goldTitle: 'Abandonneur',
        lastDescription: 'Abandonné ou révélé toutes les ombres 500 fois.',
        lastTitle: 'Tête vide',
        platinumTitle: 'Simplet',
        silverTitle: 'Débutant',
      },
      it: {
        bronzeTitle: 'Novizio',
        description: 'Arrenditi o rivela tutte le ombre {n} volte.',
        goldTitle: 'Arrenditore',
        lastDescription: 'Arreso o rivelato tutte le ombre 500 volte.',
        lastTitle: 'Testa vuota',
        platinumTitle: 'Sempliciotto',
        silverTitle: 'Principiante',
      },
      jp: {
        bronzeTitle: '初心者',
        description: '{n}回諦めるか全てのシャドウを公開する。',
        goldTitle: '諦め屋',
        lastDescription: '500回諦めたか全てのシャドウを公開した。',
        lastTitle: '頭の中空空',
        platinumTitle: '単純人',
        silverTitle: '初級者',
      },
      ko: {
        bronzeTitle: '초보자',
        description: '{n}번 포기하거나 모든 섀도우를 공개하세요.',
        goldTitle: '포기꾼',
        lastDescription: '500번 포기하거나 모든 섀도우를 공개했습니다.',
        lastTitle: '빈 머리',
        platinumTitle: '간단한 사람',
        silverTitle: '입문자',
      },
      pt: {
        bronzeTitle: 'Novato',
        description: 'Desista ou revele todas as sombras {n} vezes.',
        goldTitle: 'Desistente',
        lastDescription: 'Desistiu ou revelou todas as sombras 500 vezes.',
        lastTitle: 'Cabeça vazia',
        platinumTitle: 'Simples',
        silverTitle: 'Iniciante',
      },
      ru: {
        bronzeTitle: 'Новичок',
        description: 'Сдавайтесь или раскрывайте все тени {n} раз.',
        goldTitle: 'Сдающийся',
        lastDescription: 'Сдался или раскрыл все тени 500 раз.',
        lastTitle: 'Пустая голова',
        platinumTitle: 'Простак',
        silverTitle: 'Начинающий',
      },
      zh: {
        bronzeTitle: '新手',
        description: '放棄或顯示所有陰影 {n} 次。',
        goldTitle: '放棄者',
        lastDescription: '放棄了 500 次或顯示了所有陰影。',
        lastTitle: '頭空空',
        platinumTitle: '簡單人',
        silverTitle: '初學者',
      },
    },
  });

  return createAchievement({
    category: 'counters',
    getValue: () => statsState.totalGameOvers,
    id: 'gameOvers',
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
          return t('description', { n: 50 });
        },
        get nextTitle() {
          return t('bronzeTitle');
        },
        rank: 'bronze',
        val: 50,
      },
      {
        get description() {
          return t('description', { n: 100 });
        },
        get nextTitle() {
          return t('silverTitle');
        },
        rank: 'silver',
        val: 100,
      },
      {
        get description() {
          return t('description', { n: 200 });
        },
        get nextTitle() {
          return t('goldTitle');
        },
        rank: 'gold',
        val: 200,
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

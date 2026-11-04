import { useI18n } from 'vue-i18n';

import { useProfile } from '@/stores/useProfile.ts';
import { createAchievement } from '@/utils/utils.ts';

export const useShinyCollector = () => {
  const { getShinyCount } = useProfile();
  const { t } = useI18n({
    messages: {
      cn: {
        bronzeTitle: '闪光收藏家',
        description: '收集 {n} 只闪光。',
        goldTitle: '闪光大师',
        lastDescription: '收集了超过 1025 只闪光。',
        lastTitle: '闪光教授',
        platinumTitle: '闪光专家',
        silverTitle: '闪光爱好者',
      },
      de: {
        bronzeTitle: 'Shiny-Sammler',
        description: 'Sammle insgesamt {n} Shiny-Pokémon.',
        goldTitle: 'Shiny-Meister',
        lastDescription: 'Mehr als 1025 Shiny-Pokémon gesammelt.',
        lastTitle: 'Shiny-Professor',
        platinumTitle: 'Shiny-Experte',
        silverTitle: 'Shiny-Fan',
      },
      en: {
        bronzeTitle: 'Shiny Collector',
        description: 'Collect a total of {n} shinies.',
        goldTitle: 'Shiny Master',
        lastDescription: 'Collected more than 1025 shinies.',
        lastTitle: 'Shiny Professor',
        platinumTitle: 'Shiny Expert',
        silverTitle: 'Shiny Aficionado',
      },
      es: {
        bronzeTitle: 'Coleccionista shiny',
        description: 'Colecciona un total de {n} shinies.',
        goldTitle: 'Maestro shiny',
        lastDescription: 'Más de 1025 shinies coleccionados.',
        lastTitle: 'Profesor shiny',
        platinumTitle: 'Experto shiny',
        silverTitle: 'Aficionado shiny',
      },
      fr: {
        bronzeTitle: 'Collectionneur shiny',
        description: 'Collectez un total de {n} shinies.',
        goldTitle: 'Maître shiny',
        lastDescription: 'Plus de 1025 shinies collectés.',
        lastTitle: 'Professeur shiny',
        platinumTitle: 'Expert shiny',
        silverTitle: 'Connaisseur shiny',
      },
      it: {
        bronzeTitle: 'Collezionista shiny',
        description: 'Raccogli un totale di {n} shinies.',
        goldTitle: 'Maestro shiny',
        lastDescription: 'Più di 1025 shinies raccolti.',
        lastTitle: 'Professore shiny',
        platinumTitle: 'Esperto shiny',
        silverTitle: 'Appassionato shiny',
      },
      jp: {
        bronzeTitle: 'ひかるコレクター',
        description: '合計{n}体のひかるポケモンを収集。',
        goldTitle: 'ひかるマスター',
        lastDescription: '1025体以上のひかるポケモンを収集。',
        lastTitle: 'ひかる博士',
        platinumTitle: 'ひかるエキスパート',
        silverTitle: 'ひかる愛好家',
      },
      ko: {
        bronzeTitle: '빛나는 수집가',
        description: '총 {n}마리의 빛나는 포켓몬을 수집하세요.',
        goldTitle: '빛나는 마스터',
        lastDescription: '1025마 이상의 빛나는 포켓몬을 수집.',
        lastTitle: '빛나는 박사',
        platinumTitle: '빛나는 전문가',
        silverTitle: '빛나는 애호가',
      },
      pt: {
        bronzeTitle: 'Colecionador shiny',
        description: 'Colete um total de {n} shinies.',
        goldTitle: 'Mestre shiny',
        lastDescription: 'Mais de 1025 shinies coletados.',
        lastTitle: 'Professor shiny',
        platinumTitle: 'Especialista shiny',
        silverTitle: 'Aficionado shiny',
      },
      ru: {
        bronzeTitle: 'Коллекционер шайни',
        description: 'Соберите всего {n} шайни.',
        goldTitle: 'Мастер шайни',
        lastDescription: 'Собрано более 1025 шайни.',
        lastTitle: 'Профессор шайни',
        platinumTitle: 'Эксперт шайни',
        silverTitle: 'Знаток шайни',
      },
      zh: {
        bronzeTitle: '閃光收藏家',
        description: '收集 {n} 隻閃光。',
        goldTitle: '閃光大師',
        lastDescription: '收集了超過 1025 隻閃光。',
        lastTitle: '閃光教授',
        platinumTitle: '閃光專家',
        silverTitle: '閃光愛好者',
      },
    },
    useScope: 'isolated',
  });

  return createAchievement({
    category: 'misc',
    getValue: getShinyCount,
    id: 'shinyCollector',
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
          return t('description', { n: 1025 });
        },
        get nextTitle() {
          return t('platinumTitle');
        },
        rank: 'platinum',
        val: 1025,
      },
    ],
  });
};

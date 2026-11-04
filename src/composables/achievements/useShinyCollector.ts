import { useI18n } from 'vue-i18n';

import { useProfile } from '@/stores/useProfile.ts';
import { createAchievement } from '@/utils/utils.ts';

export const useShinyCollector = () => {
  const { getShinyCount } = useProfile();
  const { t } = useI18n({
    messages: {
      cn: {
        bronzeTitle: '闪光寻觅者',
        description: '收集 {n} 只闪光。',
        goldTitle: '闪光猎人',
        lastDescription: '收集了超过 1025 只闪光。',
        lastTitle: '闪光传奇',
        platinumTitle: '闪光大师',
        silverTitle: '闪光侦察员',
      },
      de: {
        bronzeTitle: 'Funkel-Sucher',
        description: 'Sammle insgesamt {n} Shiny-Pokémon.',
        goldTitle: 'Shiny-Jäger',
        lastDescription: 'Mehr als 1025 Shiny-Pokémon gesammelt.',
        lastTitle: 'Shiny-Legende',
        platinumTitle: 'Shiny-Meister',
        silverTitle: 'Shiny-Späher',
      },
      en: {
        bronzeTitle: 'Sparkle Seeker',
        description: 'Collect a total of {n} shinies.',
        goldTitle: 'Shiny Hunter',
        lastDescription: 'Collected more than 1025 shinies.',
        lastTitle: 'Shiny Legend',
        platinumTitle: 'Shiny Master',
        silverTitle: 'Shiny Scout',
      },
      es: {
        bronzeTitle: 'Buscador de destellos',
        description: 'Colecciona un total de {n} shinies.',
        goldTitle: 'Cazador shiny',
        lastDescription: 'Más de 1025 shinies coleccionados.',
        lastTitle: 'Leyenda shiny',
        platinumTitle: 'Maestro shiny',
        silverTitle: 'Explorador shiny',
      },
      fr: {
        bronzeTitle: "Chercheur d'étincelles",
        description: 'Collectionnez un total de {n} Pokémon chromatiques.',
        goldTitle: 'Chasseur Chroma',
        lastDescription: 'Plus de 1025 Pokémon chromatiques collectionnés.',
        lastTitle: 'Légende Chroma',
        platinumTitle: 'Maître Chroma',
        silverTitle: 'Éclaireur Chroma',
      },
      it: {
        bronzeTitle: 'Cercatore di scintille',
        description: 'Raccogli un totale di {n} shinies.',
        goldTitle: 'Cacciatore shiny',
        lastDescription: 'Più di 1025 shinies raccolti.',
        lastTitle: 'Leggenda shiny',
        platinumTitle: 'Maestro shiny',
        silverTitle: 'Esploratore shiny',
      },
      jp: {
        bronzeTitle: 'きらめき探求者',
        description: '合計{n}体のひかるポケモンを収集。',
        goldTitle: '色違いハンター',
        lastDescription: '1025体以上のひかるポケモンを収集。',
        lastTitle: '色違いレジェンド',
        platinumTitle: '色違いマスター',
        silverTitle: '色違いスカウト',
      },
      ko: {
        bronzeTitle: '반짝임 탐색가',
        description: '총 {n}마리의 빛나는 포켓몬을 수집하세요.',
        goldTitle: '이로치 사냥꾼',
        lastDescription: '1025마 이상의 빛나는 포켓몬을 수집.',
        lastTitle: '이로치 전설',
        platinumTitle: '이로치 마스터',
        silverTitle: '이로치 정찰병',
      },
      pt: {
        bronzeTitle: 'Buscador de brilhos',
        description: 'Colete um total de {n} shinies.',
        goldTitle: 'Caçador shiny',
        lastDescription: 'Mais de 1025 shinies coletados.',
        lastTitle: 'Lenda shiny',
        platinumTitle: 'Mestre shiny',
        silverTitle: 'Explorador shiny',
      },
      ru: {
        bronzeTitle: 'Искатель блеска',
        description: 'Соберите всего {n} шайни.',
        goldTitle: 'Охотник за шайни',
        lastDescription: 'Собрано более 1025 шайни.',
        lastTitle: 'Легенда шайни',
        platinumTitle: 'Мастер шайни',
        silverTitle: 'Следопыт шайни',
      },
      zh: {
        bronzeTitle: '閃光尋覓者',
        description: '收集 {n} 隻閃光。',
        goldTitle: '閃光獵人',
        lastDescription: '收集了超過 1025 隻閃光。',
        lastTitle: '閃光傳奇',
        platinumTitle: '閃光大師',
        silverTitle: '閃光偵察員',
      },
    },
    useScope: 'isolated',
  });

  return createAchievement({
    category: 'total',
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

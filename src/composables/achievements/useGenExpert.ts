import { useI18n } from 'vue-i18n';

import { useTranslations } from '@/composables/useTranslations.ts';
import { useProfile } from '@/stores/useProfile.ts';
import type { Gen } from '@/types.ts';
import { createAchievement } from '@/utils/utils.ts';

export function useGenExpert(gen: Gen) {
  const { getGenWins } = useProfile();
  const { getGenTranslation } = useTranslations();
  const name = getGenTranslation(gen);

  const { t } = useI18n({
    messages: {
      cn: {
        bronzeTitle: `{name}爱好者`,
        description: `完成 {n} 场{name}模式游戏。`,
        goldTitle: `{name}专家`,
        lastDescription: `完成了超过 500 场{name}模式游戏。`,
        lastTitle: `{name}狂热者`,
        platinumTitle: `{name}大师`,
        silverTitle: `{name}学者`,
      },
      de: {
        bronzeTitle: `{name}-Enthusiast`,
        description: `Schließe {n} {name}-Spiele ab.`,
        goldTitle: `{name}-Experte`,
        lastDescription: `Mehr als 500 {name}-Spiele abgeschlossen.`,
        lastTitle: `{name}-Fanatiker`,
        platinumTitle: `{name}-Meister`,
        silverTitle: `{name}-Forscher`,
      },
      en: {
        bronzeTitle: `{name} Enthusiast`,
        description: `Finish {n} {name} mode games.`,
        goldTitle: `{name} Expert`,
        lastDescription: `Finished more than 500 {name} mode games.`,
        lastTitle: `{name} Fanatic`,
        platinumTitle: `{name} Master`,
        silverTitle: `{name} Scholar`,
      },
      es: {
        bronzeTitle: `Entusiasta {name}`,
        description: `Completa {n} partidas de modo {name}.`,
        goldTitle: `Experto {name}`,
        lastDescription: `Más de 500 partidas de modo {name} completadas.`,
        lastTitle: `Fanático {name}`,
        platinumTitle: `Maestro {name}`,
        silverTitle: `Erudito {name}`,
      },
      fr: {
        bronzeTitle: `Passionné de {name}`,
        description: `Terminez {n} parties en mode {name}.`,
        goldTitle: `Expert {name}`,
        lastDescription: `Plus de 500 parties en mode {name} terminées.`,
        lastTitle: `Fanatique de {name}`,
        platinumTitle: `Maître {name}`,
        silverTitle: `Érudit de {name}`,
      },
      it: {
        bronzeTitle: `Appassionato di {name}`,
        description: `Completa {n} partite in modalità {name}.`,
        goldTitle: `Esperto {name}`,
        lastDescription: `Più di 500 partite in modalità {name} completate.`,
        lastTitle: `Fanatico di {name}`,
        platinumTitle: `Maestro {name}`,
        silverTitle: `Studioso di {name}`,
      },
      jp: {
        bronzeTitle: `{name}愛好家`,
        description: `{name}モードを{n}回クリア。`,
        goldTitle: `{name}エキスパート`,
        lastDescription: `{name}モードを500回以上クリア。`,
        lastTitle: `{name}熱狂者`,
        platinumTitle: `{name}マスター`,
        silverTitle: `{name}学者`,
      },
      ko: {
        bronzeTitle: `{name} 애호가`,
        description: `{name} 모드 게임을 {n}회 완료하세요.`,
        goldTitle: `{name} 전문가`,
        lastDescription: `{name} 모드 게임을 500회 이상 완료.`,
        lastTitle: `{name} 열성 팬`,
        platinumTitle: `{name} 마스터`,
        silverTitle: `{name} 학자`,
      },
      pt: {
        bronzeTitle: `Entusiasta {name}`,
        description: `Complete {n} partidas no modo {name}.`,
        goldTitle: `Especialista {name}`,
        lastDescription: `Mais de 500 partidas no modo {name} completadas.`,
        lastTitle: `Fanático {name}`,
        platinumTitle: `Mestre {name}`,
        silverTitle: `Erudito {name}`,
      },
      ru: {
        bronzeTitle: `Энтузиаст {name}`,
        description: `Завершите {n} игр в режиме {name}.`,
        goldTitle: `Эксперт {name}`,
        lastDescription: `Завершено более 500 игр в режиме {name}.`,
        lastTitle: `Фанатик {name}`,
        platinumTitle: `Мастер {name}`,
        silverTitle: `Ученый {name}`,
      },
      zh: {
        bronzeTitle: `{name}愛好者`,
        description: `完成 {n} 場{name}模式遊戲。`,
        goldTitle: `{name}專家`,
        lastDescription: `完成了超過 500 場{name}模式遊戲。`,
        lastTitle: `{name}狂熱者`,
        platinumTitle: `{name}大師`,
        silverTitle: `{name}學者`,
      },
    },
    useScope: 'isolated',
  });

  return createAchievement({
    category: 'total',
    getValue: () => getGenWins(gen),
    id: `genExpert_${gen}`,
    get lastDescription() {
      return t('lastDescription', { name });
    },
    get lastTitle() {
      return t('lastTitle', { name });
    },
    thresholds: [
      {
        get description() {
          return t('description', { n: 10, name });
        },
        get nextTitle() {
          return t('bronzeTitle', { name });
        },
        rank: 'bronze',
        val: 10,
      },
      {
        get description() {
          return t('description', { n: 50, name });
        },
        get nextTitle() {
          return t('silverTitle', { name });
        },
        rank: 'silver',
        val: 50,
      },
      {
        get description() {
          return t('description', { n: 100, name });
        },
        get nextTitle() {
          return t('goldTitle', { name });
        },
        rank: 'gold',
        val: 100,
      },
      {
        get description() {
          return t('description', { n: 500, name });
        },
        get nextTitle() {
          return t('platinumTitle', { name });
        },
        rank: 'platinum',
        val: 500,
      },
    ],
  });
}

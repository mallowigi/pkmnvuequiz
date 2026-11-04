import { useI18n } from 'vue-i18n';

import { useTranslations } from '@/composables/useTranslations.ts';
import { useProfile } from '@/stores/useProfile.ts';
import type { Type } from '@/types.ts';
import { createAchievement } from '@/utils/utils.ts';

export function useTypeExpert(type: Type) {
  const { getTypeWins } = useProfile();
  const { getTypeTranslation } = useTranslations();
  const name = getTypeTranslation(type);

  const { t } = useI18n({
    messages: {
      cn: {
        bronzeTitle: `{name}爱好者`,
        description: `完成 {n} 场{name}属性模式游戏。`,
        goldTitle: `{name}专家`,
        lastDescription: `完成了超过 500 场{name}属性模式游戏。`,
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
        description: `Finish {n} {name} type games.`,
        goldTitle: `{name} Expert`,
        lastDescription: `Finished more than 500 {name} type games.`,
        lastTitle: `{name} Fanatic`,
        platinumTitle: `{name} Master`,
        silverTitle: `{name} Scholar`,
      },
      es: {
        bronzeTitle: `Entusiasta {name}`,
        description: `Completa {n} partidas de tipo {name}.`,
        goldTitle: `Experto {name}`,
        lastDescription: `Más de 500 partidas de tipo {name} completadas.`,
        lastTitle: `Fanático {name}`,
        platinumTitle: `Maestro {name}`,
        silverTitle: `Erudito {name}`,
      },
      fr: {
        bronzeTitle: `Passionné {name}`,
        description: `Terminez {n} parties de type {name}.`,
        goldTitle: `Expert {name}`,
        lastDescription: `Plus 500 parties type {name} terminées.`,
        lastTitle: `Fanatique {name}`,
        platinumTitle: `Maître {name}`,
        silverTitle: `Érudit {name}`,
      },
      it: {
        bronzeTitle: `Appassionato {name}`,
        description: `Completa {n} partite di tipo {name}.`,
        goldTitle: `Esperto {name}`,
        lastDescription: `Più di 500 partite di tipo {name} completate.`,
        lastTitle: `Fanatico {name}`,
        platinumTitle: `Maestro {name}`,
        silverTitle: `Studioso {name}`,
      },
      jp: {
        bronzeTitle: `{name}愛好家`,
        description: `{name}タイプモードを{n}回クリア。`,
        goldTitle: `{name}エキスパート`,
        lastDescription: `{name}タイプモードを500回以上クリア。`,
        lastTitle: `{name}熱狂者`,
        platinumTitle: `{name}マスター`,
        silverTitle: `{name}学者`,
      },
      ko: {
        bronzeTitle: `{name} 애호가`,
        description: `{name} 타입 게임을 {n}회 완료하세요.`,
        goldTitle: `{name} 전문가`,
        lastDescription: `{name} 타입 게임을 500회 이상 완료.`,
        lastTitle: `{name} 열성 팬`,
        platinumTitle: `{name} 마스터`,
        silverTitle: `{name} 학자`,
      },
      pt: {
        bronzeTitle: `Entusiasta {name}`,
        description: `Complete {n} partidas do tipo {name}.`,
        goldTitle: `Especialista {name}`,
        lastDescription: `Mais de 500 partidas do tipo {name} completadas.`,
        lastTitle: `Fanático {name}`,
        platinumTitle: `Mestre {name}`,
        silverTitle: `Erudito {name}`,
      },
      ru: {
        bronzeTitle: `Энтузиаст {name}`,
        description: `Завершите {n} игр типа {name}.`,
        goldTitle: `Эксперт {name}`,
        lastDescription: `Завершено более 500 игр типа {name}.`,
        lastTitle: `Фанатик {name}`,
        platinumTitle: `Мастер {name}`,
        silverTitle: `Ученый {name}`,
      },
      zh: {
        bronzeTitle: `{name}愛好者`,
        description: `完成 {n} 場{name}屬性模式遊戲。`,
        goldTitle: `{name}專家`,
        lastDescription: `完成了超過 500 場{name}屬性模式遊戲。`,
        lastTitle: `{name}狂熱者`,
        platinumTitle: `{name}大師`,
        silverTitle: `{name}學者`,
      },
    },
    useScope: 'isolated',
  });

  return createAchievement({
    category: 'game',
    getValue: () => getTypeWins(type),
    id: `typeExpert_${type}`,
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

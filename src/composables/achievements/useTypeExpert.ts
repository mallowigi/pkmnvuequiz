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
        bronzeTitle: `{name}学者`,
        description: `完成 {n} 场{name}属性模式游戏。`,
        goldTitle: `{name}专家`,
        lastDescription: `完成了超过 500 场{name}属性模式游戏。`,
        lastTitle: `{name}教授`,
        platinumTitle: `{name}大师`,
        silverTitle: `{name}爱好者`,
      },
      de: {
        bronzeTitle: `{name}-Forscher`,
        description: `Schließe {n} {name}-Spiele ab.`,
        goldTitle: `{name}-Experte`,
        lastDescription: `Mehr als 500 {name}-Spiele abgeschlossen.`,
        lastTitle: `{name}-Professor`,
        platinumTitle: `{name}-Meister`,
        silverTitle: `{name}-Fan`,
      },
      en: {
        bronzeTitle: `{name} Scholar`,
        description: `Finish {n} {name} type games.`,
        goldTitle: `{name} Expert`,
        lastDescription: `Finished more than 500 {name} type games.`,
        lastTitle: `{name} Professor`,
        platinumTitle: `{name} Master`,
        silverTitle: `{name} Aficionado`,
      },
      es: {
        bronzeTitle: `Erudito {name}`,
        description: `Completa {n} partidas de tipo {name}.`,
        goldTitle: `Experto {name}`,
        lastDescription: `Más de 500 partidas de tipo {name} completadas.`,
        lastTitle: `Profesor {name}`,
        platinumTitle: `Maestro {name}`,
        silverTitle: `Aficionado {name}`,
      },
      fr: {
        bronzeTitle: `Érudit {name}`,
        description: `Terminez {n} parties de type {name}.`,
        goldTitle: `Expert {name}`,
        lastDescription: `Plus 500 parties type {name} terminées.`,
        lastTitle: `Professeur {name}`,
        platinumTitle: `Maître {name}`,
        silverTitle: `Connaisseur {name}`,
      },
      it: {
        bronzeTitle: `Studioso {name}`,
        description: `Completa {n} partite di tipo {name}.`,
        goldTitle: `Esperto {name}`,
        lastDescription: `Più di 500 partite di tipo {name} completate.`,
        lastTitle: `Professore {name}`,
        platinumTitle: `Maestro {name}`,
        silverTitle: `Appassionato {name}`,
      },
      jp: {
        bronzeTitle: `{name}学者`,
        description: `{name}タイプモードを{n}回クリア。`,
        goldTitle: `{name}エキスパート`,
        lastDescription: `{name}タイプモードを500回以上クリア。`,
        lastTitle: `{name}博士`,
        platinumTitle: `{name}マスター`,
        silverTitle: `{name}愛好家`,
      },
      ko: {
        bronzeTitle: `{name} 학자`,
        description: `{name} 타입 게임을 {n}회 완료하세요.`,
        goldTitle: `{name} 전문가`,
        lastDescription: `{name} 타입 게임을 500회 이상 완료.`,
        lastTitle: `{name} 박사`,
        platinumTitle: `{name} 마스터`,
        silverTitle: `{name} 애호가`,
      },
      pt: {
        bronzeTitle: `Erudito {name}`,
        description: `Complete {n} partidas do tipo {name}.`,
        goldTitle: `Especialista {name}`,
        lastDescription: `Mais de 500 partidas do tipo {name} completadas.`,
        lastTitle: `Professor {name}`,
        platinumTitle: `Mestre {name}`,
        silverTitle: `Aficionado {name}`,
      },
      ru: {
        bronzeTitle: `Ученый {name}`,
        description: `Завершите {n} игр типа {name}.`,
        goldTitle: `Эксперт {name}`,
        lastDescription: `Завершено более 500 игр типа {name}.`,
        lastTitle: `Профессор {name}`,
        platinumTitle: `Мастер {name}`,
        silverTitle: `Знаток {name}`,
      },
      zh: {
        bronzeTitle: `{name}學者`,
        description: `完成 {n} 場{name}屬性模式遊戲。`,
        goldTitle: `{name}專家`,
        lastDescription: `完成了超過 500 場{name}屬性模式遊戲。`,
        lastTitle: `{name}教授`,
        platinumTitle: `{name}大師`,
        silverTitle: `{name}愛好者`,
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

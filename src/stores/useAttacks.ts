import { defineStore, acceptHMRUpdate } from 'pinia';
import { reactive } from 'vue';

import { getGenForBox } from '@/composables/useBoxes.ts';
import { useAttackStore } from '@/stores/useAttackStore.ts';
import type { Attack, AttackStatus, DamageCategory, Gen, Language, MoveType, RegionBox, Type } from '@/types.ts';
import { normalizeName, upsert } from '@/utils/utils.ts';

type AttackMaps = {
  all: Map<string, Array<Attack>>;
  allSpecial: Map<string, Array<Attack>>;
  boxes: Record<RegionBox, Map<string, Array<Attack>>>;
  categories: Record<DamageCategory, Map<string, Array<Attack>>>;
  gens: Record<Gen, Map<string, Array<Attack>>>;
  languages: Record<Language, Map<string, Array<Attack>>>;
  moveTypes: Record<MoveType, Map<string, Array<Attack>>>;
  types: Record<Type, Map<string, Array<Attack>>>;
};

const newMap = () => new Map<string, Array<Attack>>();

const attackMaps: AttackMaps = {
  all: newMap(),
  allSpecial: newMap(),
  boxes: {
    alola: newMap(),
    alolaz: newMap(),
    areazero: newMap(),
    galar: newMap(),
    galargmax: newMap(),
    galarmax: newMap(),
    gmax: newMap(),
    hisui: newMap(),
    hoenn: newMap(),
    hoennmega: newMap(),
    hyperspace: newMap(),
    johto: newMap(),
    kalos: newMap(),
    kalosmega: newMap(),
    kanto: newMap(),
    lumiose: newMap(),
    paldea: newMap(),
    pokemongo: newMap(),
    sinnoh: newMap(),
    unova: newMap(),
  },
  categories: {
    physical: newMap(),
    special: newMap(),
    status: newMap(),
    variable: newMap(),
  },
  gens: {
    gen1: newMap(),
    gen2: newMap(),
    gen3: newMap(),
    gen4: newMap(),
    gen5: newMap(),
    gen6: newMap(),
    gen7: newMap(),
    gen8: newMap(),
    gen9: newMap(),
  },
  languages: {
    cn: newMap(),
    de: newMap(),
    en: newMap(),
    fr: newMap(),
    ja: newMap(),
    ko: newMap(),
    zh: newMap(),
  },
  moveTypes: {
    gmax: newMap(),
    max: newMap(),
    zmove: newMap(),
  },
  types: {
    bug: newMap(),
    dark: newMap(),
    dragon: newMap(),
    electric: newMap(),
    fairy: newMap(),
    fighting: newMap(),
    fire: newMap(),
    flying: newMap(),
    ghost: newMap(),
    grass: newMap(),
    ground: newMap(),
    ice: newMap(),
    normal: newMap(),
    poison: newMap(),
    psychic: newMap(),
    rock: newMap(),
    steel: newMap(),
    water: newMap(),
  },
};

type AttackProgressState = {
  currentAttack: Attack | null;
  lastAttack: Attack | null;
  lastIndex: number | null;
  attackStatuses: Map<string, AttackStatus>;
};

export const useAttacks = defineStore('attacks', () => {
  const attacksState = reactive<AttackProgressState>({
    attackStatuses: new Map<string, AttackStatus>(),
    currentAttack: null,
    lastAttack: null,
    lastIndex: null,
  });

  const initializeAttackMaps = () => {
    const { data } = useAttackStore();
    if (attackMaps.all.size > 0) return;

    if (!data || !data.isLoaded || !data.attacks || !data.translations) {
      throw new Error('Attack data or translations not loaded');
    }

    data.attacks.forEach((attack) => {
      const attackKey = normalizeName(attack.name);
      if (!attackKey) return;

      upsert(attackMaps.all, attackKey, attack);

      if (!attacksState.attackStatuses.has(attackKey)) {
        attacksState.attackStatuses.set(attackKey, {
          isFound: false,
          isMissed: false,
          isShadowed: false,
          lastFoundAt: null,
          lastShadowedAt: null,
        });
      }

      if (attack.scope === 'special') {
        upsert(attackMaps.allSpecial, attackKey, attack);
        upsert(attackMaps.moveTypes[attack.moveType], attackKey, attack);
      }

      if (attack.box) {
        upsert(attackMaps.boxes[attack.box], attackKey, attack);
      }

      const gen = getGenForBox(attack.box);
      if (gen) {
        upsert(attackMaps.gens[gen], attackKey, attack);
      }

      upsert(attackMaps.types[attack.type], attackKey, attack);
      upsert(attackMaps.categories[attack.category], attackKey, attack);

      for (const lang in attackMaps.languages) {
        const translations = data.translations![attack.id];
        const translation = translations?.[lang as Language];
        if (translation) {
          const translationKey = normalizeName(translation);
          if (translationKey) {
            upsert(attackMaps.languages[lang as Language], translationKey, attack);
          }
        }
      }
    });
  };

  return {
    attacksState,
    initializeAttackMaps,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAttacks, import.meta.hot));
}

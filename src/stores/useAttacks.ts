import { defineStore, acceptHMRUpdate } from 'pinia';
import { reactive } from 'vue';

import type { Attack, AttackStatus, DamageCategory, Gen, Language, MoveType, RegionBox, Type } from '@/types.ts';

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
    areazero: newMap(),
    galar: newMap(),
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

  return {
    attacksState,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAttacks, import.meta.hot));
}

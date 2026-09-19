// noinspection JSUnfilteredForInLoop

import { useVibrate } from '@vueuse/core';
import { closest } from 'fastest-levenshtein';
import { defineStore, acceptHMRUpdate } from 'pinia';
import { reactive, computed } from 'vue';

import { getGenForBox } from '@/composables/useBoxes.ts';
import { useAttackStore } from '@/stores/useAttackStore.ts';
import { useBonus } from '@/stores/useBonus.ts';
import { useCurrentBox } from '@/stores/useCurrentBox.ts';
import { useCurrentGen } from '@/stores/useCurrentGen.ts';
import { useCurrentType } from '@/stores/useCurrentType.ts';
import { useGameFlow } from '@/stores/useGameFlow.ts';
import { useSettings } from '@/stores/useSettings.ts';
import { useState } from '@/stores/useState.ts';
import { useTimer } from '@/stores/useTimer.ts';
import { useTouches } from '@/stores/useTouches.ts';
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

const defaultStatus = (): AttackStatus => ({
  isFound: false,
  isMissed: false,
  isShadowed: false,
  lastFoundAt: null,
  lastShadowedAt: null,
});

export const useAttacks = defineStore('attacks', () => {
  const attacksState = reactive<AttackProgressState>({
    attackStatuses: new Map<string, AttackStatus>(),
    currentAttack: null,
    lastAttack: null,
    lastIndex: null,
  });

  const { state, hideShadows } = useState();
  const { getCurrentGens } = useCurrentGen();
  const { getShuffledType, getCurrentTypes } = useCurrentType();
  const { currentBoxState } = useCurrentBox();
  const { settingsState } = useSettings();
  const { startTimer } = useTimer();
  const { summonedShadow } = useTouches();
  const { vibrate } = useVibrate();
  const { addScore } = useBonus();

  const numFound = computed(() => {
    const currentGameModeAttacks = getCurrentGameModeAttacks();
    return currentGameModeAttacks.size - remaining.value.size;
  });

  const numShadows = computed(() => {
    const currentGameModeAttacks = getCurrentGameModeAttacks();
    return currentGameModeAttacks.size - remainingShadow.value.size;
  });

  const remaining = computed(() => {
    const currentGameModeAttacks = getCurrentGameModeAttacks();
    const result = new Set<string>();

    for (const [name] of currentGameModeAttacks) {
      const status = attacksState.attackStatuses.get(name);
      if (status && !status.isFound) {
        result.add(name);
      }
    }
    return result;
  });

  const remainingShadow = computed(() => {
    const currentGameModeAttacks = getCurrentGameModeAttacks();
    const result = new Set<string>();

    for (const [name] of currentGameModeAttacks) {
      const status = attacksState.attackStatuses.get(name);
      if (status && !status.isShadowed) {
        result.add(name);
      }
    }
    return result;
  });

  const missed = computed(() => {
    const currentGameModeAttacks = getCurrentGameModeAttacks();
    const result = new Set<Attack>();

    for (const [name, attacks] of currentGameModeAttacks) {
      const status = attacksState.attackStatuses.get(name);
      if (status && status.isMissed) {
        result.add(attacks[0]);
      }
    }
    return result;
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
        attacksState.attackStatuses.set(attackKey, defaultStatus());
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

  const addFound = (attacks: Attack[]) => {
    const { endGame } = useGameFlow();

    attacks.forEach((attack) => {
      const normalizedAttack = normalizeName(attack.name);
      const status = attacksState.attackStatuses.get(normalizedAttack);

      if (status && !status.isFound) {
        addScore(status.isShadowed);
        status.isFound = true;
        status.lastFoundAt = Date.now();
        vibrate(300);

        startTimer();
      }
    });

    setLastAttack(attacks[0]);

    if (remaining.value.size === 0) {
      endGame();
    }
  };

  const addShadow = (attack: string) => {
    const normalizedAttack = normalizeName(attack);
    const status = attacksState.attackStatuses.get(normalizedAttack);
    if (status) {
      status.isShadowed = true;
      status.lastShadowedAt = Date.now();
      startTimer();
      summonedShadow();
    }
  };

  const setLastAttack = (attack: Attack) => {
    attacksState.lastAttack = attack;
  };

  const addRandomShadow = () => {
    const nextShadowAttack = getRandomAttack();

    if (nextShadowAttack) {
      addShadow(nextShadowAttack.name);
    }
  };

  const getRandomAttack = () => {
    let remainingArray = Array.from(remaining.value);
    const currentType = getShuffledType();

    if (state.withTypeShuffle && currentType) {
      const typeAttacks = attackMaps.types[currentType.id as Type];
      if (typeAttacks) {
        remainingArray = remainingArray.filter((attack) => typeAttacks.has(attack));
      }
    }

    if (state.withBoxShuffle && currentBoxState.currentBox) {
      const boxAttacks = attackMaps.boxes[currentBoxState.currentBox];
      if (boxAttacks) {
        remainingArray = remainingArray.filter((attack) => boxAttacks.has(attack));
      }
    }

    if (remainingArray.length === 0) return;

    let nextAttack = null;
    let maxIterations = 100;
    let iterationCount = 0;

    while (!nextAttack && iterationCount < maxIterations) {
      const randomIndex = Math.floor(Math.random() * remainingArray.length);
      const randomAttack = remainingArray[randomIndex];

      const status = attacksState.attackStatuses.get(randomAttack);
      if (status?.isShadowed) {
        iterationCount++;
        continue;
      }

      nextAttack = randomAttack;
      return attackMaps.all.get(nextAttack)?.[0];
    }
  };

  const showRemainingShadows = () => {
    for (const attackStatus of attacksState.attackStatuses.values()) {
      if (!attackStatus.isShadowed) {
        attackStatus.isShadowed = true;
        attackStatus.lastShadowedAt = Date.now();
      }
    }
  };

  const showRemaining = () => {
    for (const attackStatus of attacksState.attackStatuses.values()) {
      if (!attackStatus.isFound) {
        attackStatus.isMissed = true;
        attackStatus.isFound = true;
        attackStatus.lastFoundAt = Date.now();
      }
    }
  };

  const prefillRemaining = () => {
    const remainingArray = Array.from(remaining.value);
    if (remainingArray.length <= 1) return;

    for (let i = 0; i < remainingArray.length - 1; i++) {
      const attackKey = remainingArray[i];
      const status = attacksState.attackStatuses.get(attackKey);
      if (status) {
        status.isFound = true;
        status.lastFoundAt = Date.now();
      }
    }

    const lastPrefilledKey = remainingArray[remainingArray.length - 2];
    const lastPrefilled = getCurrentGameModeAttacks().get(lastPrefilledKey);
    if (lastPrefilled) {
      setLastAttack(lastPrefilled[0]);
    }
  };

  const resetAttacksState = () => {
    attacksState.lastAttack = null;
    attacksState.attackStatuses.forEach((status) => {
      status.isFound = false;
      status.lastFoundAt = null;
      status.isShadowed = false;
      status.lastShadowedAt = null;
      status.isMissed = false;
    });

    hideShadows();
  };

  const getGenAttacks = (boxId: RegionBox): Map<string, Attack[]> => {
    return attackMaps.boxes[boxId] ?? new Map();
  };

  const getCurrentGenAttacks = (): Map<string, Attack[]> => {
    const currentGens = getCurrentGens();
    const currentGenBoxes = currentGens?.map((gen) => gen?.boxes ?? []).flat() ?? [];
    const result = new Map<string, Attack[]>();

    for (const boxId of currentGenBoxes) {
      const box = attackMaps.boxes[boxId];
      if (box) {
        for (const [key, attacks] of box) {
          result.set(key, attacks);
        }
      }
    }

    return result;
  };

  const getTypedBoxAttacks = (types: Type[], boxId: RegionBox): Map<string, Attack[]> => {
    const boxAttacks = attackMaps.boxes[boxId];
    if (!boxAttacks) return new Map();

    const result = new Map<string, Attack[]>();

    for (const [key, attacks] of boxAttacks) {
      const filtered = attacks.filter((attack) => types.includes(attack.type));
      if (filtered.length > 0) {
        result.set(key, filtered);
      }
    }

    return result;
  };

  const getCurrentGameModeBoxAttacks = (boxId: RegionBox): Map<string, Attack[]> => {
    const gameMode = state.gameMode;
    switch (gameMode) {
      case 'gen':
        return getGenAttacks(boxId);
      case 'types': {
        const types = getCurrentTypes();
        if (!types || types.length === 0) {
          return getGenAttacks(boxId);
        }

        const typeIds = types.map((type) => type.id as Type);
        if (typeIds.length === 0) {
          return getGenAttacks(boxId);
        }

        return getTypedBoxAttacks(typeIds, boxId);
      }
      case 'full':
      case 'movetype':
        return getGenAttacks(boxId);
      default:
        return new Map();
    }
  };

  const getTypeAttacks = (typeId: Type): Map<string, Attack[]> => {
    return attackMaps.types[typeId] ?? new Map();
  };

  const getCurrentTypeAttacks = (): Map<string, Attack[]> => {
    const currentTypes = getCurrentTypes();
    if (!currentTypes) return new Map();

    return currentTypes
      .map((type) => getTypeAttacks(type.id as Type))
      .reduce((acc, map) => {
        for (const [key, attacks] of map) {
          if (!acc.has(key)) {
            acc.set(key, []);
          }
          acc.get(key)?.push(...attacks);
        }
        return acc;
      }, new Map<string, Attack[]>());
  };

  const getCategoryAttacks = (categoryId: DamageCategory): Map<string, Attack[]> => {
    return attackMaps.categories[categoryId] ?? new Map();
  };

  const getMoveTypeAttacks = (moveType?: MoveType): Map<string, Attack[]> => {
    if (moveType) {
      return attackMaps.moveTypes[moveType] ?? new Map();
    }
    return attackMaps.allSpecial ?? new Map();
  };

  const getAllAttacks = (): Map<string, Attack[]> => {
    return attackMaps.all;
  };

  const getCurrentGameModeAttacks = (): Map<string, Attack[]> => {
    const gameMode = state.gameMode;
    switch (gameMode) {
      case 'gen':
        return getCurrentGenAttacks();
      case 'types':
        return getCurrentTypeAttacks();
      case 'movetype':
        return getMoveTypeAttacks();
      case 'full':
        return getAllAttacks();
      default:
        return new Map();
    }
  };

  const isAttackInCurrentGameMode = (attacks: Attack[]) => {
    return attacks.some((attack: Attack) => {
      const gameMode = state.gameMode;
      switch (gameMode) {
        case 'gen': {
          const currentGens = getCurrentGens();
          return currentGens ? currentGens.some((gen) => gen?.boxes.includes(attack.box)) : false;
        }
        case 'types': {
          const currentTypes = getCurrentTypes();
          if (!currentTypes || currentTypes.length === 0) return false;

          return currentTypes.some((currentType) => currentType.id === attack.type);
        }
        case 'movetype':
          return attack.scope === 'special';
        case 'full':
          return true;
        default:
          return false;
      }
    });
  };

  const getStatus = (attack: Attack): AttackStatus => {
    return attacksState.attackStatuses.get(normalizeName(attack.name)) ?? defaultStatus();
  };

  const isAlreadyFound = (attacks: Attack[]) => {
    return attacks.every((attack) => getStatus(attack).isFound);
  };

  const isInRemaining = (attackName: string) => {
    const attackKey = normalizeName(attackName);

    for (const lang of settingsState.languages) {
      const languageMap = attackMaps.languages[lang];
      if (!languageMap) continue;

      for (const [translatedKey, attacks] of languageMap) {
        if (translatedKey.startsWith(attackKey) && translatedKey !== attackKey) {
          if (attacks.some((attack) => remaining.value.has(normalizeName(attack.name)))) {
            return true;
          }
        }
      }
    }

    return false;
  };

  const findAttack = (input: string) => {
    const attackKey = normalizeName(input);

    for (const lang of settingsState.languages) {
      const foundAttack = attackMaps.languages[lang]?.get(attackKey);
      if (foundAttack) {
        return foundAttack;
      }
    }

    if (!settingsState.languages.has('en')) {
      const englishAttack = attackMaps.languages.en.get(attackKey);
      if (englishAttack) {
        return englishAttack;
      }
    }
  };

  const getLastAttack = () => {
    return attacksState.lastAttack;
  };

  const getRandomRemainingAttack = () => {
    const remainingArray = Array.from(remaining.value);
    if (remainingArray.length === 0) return null;
    const currentGameModeAttacks = getCurrentGameModeAttacks();

    const randomIndex = Math.floor(Math.random() * remainingArray.length);
    const randomAttackKey = remainingArray[randomIndex];
    const randomAttack = currentGameModeAttacks.get(randomAttackKey);
    return randomAttack ? randomAttack[0] : null;
  };

  const setRandomCurrentAttack = () => {
    attacksState.currentAttack = getRandomRemainingAttack();
  };

  const findClosestAttack = (input: string): string | null => {
    const attackKey = normalizeName(input);
    const names = Array.from(getCurrentGameModeAttacks().values()).map((attacks) => normalizeName(attacks[0].name));

    return closest(attackKey, names);
  };

  return {
    addFound,
    addRandomShadow,
    addShadow,
    attacksState,
    findAttack,
    findClosestAttack,
    getAllAttacks,
    getCategoryAttacks,
    getCurrentGameModeAttacks,
    getCurrentGameModeBoxAttacks,
    getCurrentGenAttacks,
    getCurrentTypeAttacks,
    getGenAttacks,
    getLastAttack,
    getMoveTypeAttacks,
    getRandomAttack,
    getRandomRemainingAttack,
    getStatus,
    getTypeAttacks,
    initializeAttackMaps,
    isAlreadyFound,
    isAttackInCurrentGameMode,
    isInRemaining,
    missed,
    numFound,
    numShadows,
    prefillRemaining,
    remaining,
    remainingShadow,
    resetAttacksState,
    setLastAttack,
    setRandomCurrentAttack,
    showRemaining,
    showRemainingShadows,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAttacks, import.meta.hot));
}

import { ref } from 'vue';

import { useQuiz } from '@/composables/useQuiz.ts';
import { useCurrentGen } from '@/stores/useCurrentGen.ts';
import { useCurrentType } from '@/stores/useCurrentType.ts';
import { useGameFlow } from '@/stores/useGameFlow.ts';
import { useLanguages } from '@/stores/useLanguages.ts';
import { useMessages } from '@/stores/useMessages.ts';
import { usePokemons } from '@/stores/usePokemons.ts';
import { useState } from '@/stores/useState.ts';
import { useTimer } from '@/stores/useTimer.ts';
import type { SaveData, PokemonProgress } from '@/types.ts';
import { normalizeName } from '@/utils/utils.ts';

const ready = ref(false);
const LOCAL_STORAGE_KEY = 'pkmn_quiz_saved_state';

export const useSavedData = () => {
  const { showUserMessage } = useMessages();

  const setReady = () => {
    ready.value = true;
  };

  const hasSavedState = () => {
    const savedStateStr = sessionStorage.getItem(LOCAL_STORAGE_KEY);
    if (!savedStateStr) {
      return false;
    }

    try {
      const savedState = JSON.parse(savedStateStr);
      return savedState && savedState.version === 1;
    } catch (error) {
      console.error('Failed to parse autosave data.', error);
      return false;
    }
  };

  const getSavedState = (): SaveData => {
    const { state } = useState();
    const { currentGenState } = useCurrentGen();
    const { currentTypeState } = useCurrentType();
    const { pokemonState } = usePokemons();
    const { timerState } = useTimer();
    const { languagesState } = useLanguages();
    const { flowState } = useGameFlow();

    const pokemonFound: PokemonProgress['pokemonFound'] = [];
    const pokemonShadowed: PokemonProgress['pokemonShadowed'] = [];
    const shinyPokemon: PokemonProgress['shinyPokemon'] = [];

    pokemonState.pokemonStatuses.forEach((status, name) => {
      if (status.isFound) {
        pokemonFound.push({ id: name, lastFoundAt: status.lastFoundAt });
      }
      if (status.isShadowed) {
        pokemonShadowed.push({ id: name, lastShadowedAt: status.lastShadowedAt });
      }
      if (status.isShiny) {
        shinyPokemon.push({ id: name });
      }
    });

    return {
      ...state,
      currentType: currentTypeState.currentType,
      gameSelectionState: flowState.gameSelectionState,
      gen: currentGenState.gen,
      languages: Array.from(languagesState.languages),
      pokemonProgress: {
        pokemonFound,
        pokemonShadowed,
        shinyPokemon,
      },
      timer: {
        ...timerState,
        savedAt: Date.now(),
      },
      version: 1,
    };
  };

  const saveState = () => {
    const savedState = getSavedState();
    // Simulate a download by creating a blob and a temporary link
    const blob = new Blob([JSON.stringify(savedState)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;

    const [date, time] = new Date().toISOString().split('T');
    const formatDate = date.replace(/-/g, '_');
    const formatTime = time.replace(/:/g, '_').split('.')[0];
    link.download = `pkmn_quiz_state_${formatDate}_${formatTime}.json`;
    document.body.appendChild(link);

    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const autoSave = () => {
    // Prevent autosaving until app is ready
    if (!ready.value) return;

    const { flowState } = useGameFlow();
    if (flowState.isEnded || flowState.isGivenUp) {
      removeAutoSave();
      return;
    }

    const savedState = getSavedState();
    sessionStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(savedState));
  };

  const removeAutoSave = () => {
    sessionStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  const applyState = (loadedState: SaveData) => {
    const { setState } = useState();
    const { setCurrentGen } = useCurrentGen();
    const { setCurrentType } = useCurrentType();
    const { resetFlowState, setFlowState } = useGameFlow();
    const { pokemonState, resetPokemonState, findPokemon } = usePokemons();
    const { resetTimer, setTimerState } = useTimer();
    const { setLanguages, resetLanguages } = useLanguages();
    const { setTitle } = useQuiz();

    const {
      currentType,
      languages,
      pokemonProgress,
      timer,
      gameSelectionState,
      version: _version,
      ...statePayload
    } = loadedState as Partial<SaveData>;

    const { pokemonFound, pokemonShadowed, shinyPokemon } = pokemonProgress ?? {};
    const { isLimited, minutes, startTime, elapsed } = timer ?? {};

    // Languages
    resetLanguages();
    setLanguages(languages ?? []);

    // Type
    setCurrentType(currentType ?? null);

    // Gen
    setCurrentGen(statePayload.gen ?? null);

    // Pokemon progress
    resetPokemonState();

    pokemonFound?.forEach((entry) => {
      const { id: name, lastFoundAt } = entry;

      const found = findPokemon(name);
      const nameToFound = found && found.length > 0 ? normalizeName(found[0].baseName) : name;
      const status = pokemonState.pokemonStatuses.get(nameToFound);

      if (status) {
        status.isFound = true;
        status.lastFoundAt = lastFoundAt;
      } else {
        pokemonState.pokemonStatuses.set(nameToFound, {
          isFound: true,
          isMissed: false,
          isShadowed: false,
          isShiny: false,
          lastFoundAt,
          lastShadowedAt: null,
        });
      }
    });

    pokemonShadowed?.forEach((entry) => {
      const { id: name, lastShadowedAt } = entry;

      const found = findPokemon(name);
      const nameToShadow = found && found.length > 0 ? normalizeName(found[0].baseName) : name;
      const status = pokemonState.pokemonStatuses.get(nameToShadow);

      if (status) {
        status.isShadowed = true;
        status.lastShadowedAt = lastShadowedAt;
      } else {
        pokemonState.pokemonStatuses.set(nameToShadow, {
          isFound: false,
          isMissed: false,
          isShadowed: true,
          isShiny: false,
          lastFoundAt: null,
          lastShadowedAt,
        });
      }
    });

    shinyPokemon?.forEach((entry) => {
      const { id: name } = entry;

      const found = findPokemon(name);
      const nameToShiny = found && found.length > 0 ? normalizeName(found[0].baseName) : name;
      const status = pokemonState.pokemonStatuses.get(nameToShiny);

      if (status) {
        status.isShiny = true;
      } else {
        pokemonState.pokemonStatuses.set(nameToShiny, {
          isFound: false,
          isMissed: false,
          isShadowed: false,
          isShiny: true,
          lastFoundAt: null,
          lastShadowedAt: null,
        });
      }
    });

    // Timer
    resetTimer();
    setTimerState({
      elapsed: elapsed ?? 0,
      isLimited: isLimited ?? false,
      minutes: minutes ?? 35,
      startTime: startTime ?? null,
    });

    // Game flow
    resetFlowState();

    setFlowState({
      gameSelectionState: gameSelectionState,
      isStarted: true,
    });

    // State
    setState({
      gameMode: statePayload.gameMode ?? null,
      isDark: statePayload.isDark ?? false,
      mode: statePayload.mode ?? 'normal',
      usedAutoPause: statePayload.usedAutoPause ?? false,
      usedDisplayShadows: statePayload.usedDisplayShadows ?? false,
      usedShadowHelper: statePayload.usedShadowHelper ?? false,
      usedSpelling: statePayload.usedSpelling ?? false,
      usedTypeShuffle: statePayload.usedTypeShuffle ?? false,
      withCycleSprites: statePayload.withCycleSprites ?? true,
      withShadowHelper: statePayload.withShadowHelper ?? false,
      withShadows: statePayload.withShadows ?? false,
      withShinies: statePayload.withShinies ?? false,
      withSound: statePayload.withSound ?? true,
      withSpelling: statePayload.withSpelling ?? false,
      withTypeShuffle: statePayload.withTypeShuffle ?? false,
    });

    showUserMessage('Successfully loaded quiz!');
    setTitle();
  };

  const loadState = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const files = Array.from(target.files || []);
    if (files.length === 0) {
      return;
    }

    const file = files[0];
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      try {
        const result = e.target?.result as string;
        const loadedState = JSON.parse(result);
        if (loadedState.version !== 1) {
          console.error('Unsupported save version.');
          showUserMessage('Unsupported save version.');
          return;
        }

        // Parse and validate loaded state
        applyState(loadedState);
      } catch (error) {
        console.error('Failed to load state: Invalid file format.', error);
        showUserMessage('Failed to load quiz: Invalid file format.');
      }
    };
    reader.readAsText(file);
  };

  const loadAutoSave = () => {
    const savedStateStr = sessionStorage.getItem(LOCAL_STORAGE_KEY);
    if (!savedStateStr) {
      return;
    }

    try {
      const savedState = JSON.parse(savedStateStr);
      if (savedState.version !== 1) {
        console.error('Unsupported save version in autosave.');
        return;
      }

      applyState(savedState);
    } catch (error) {
      console.error('Failed to load autosave: Invalid data.', error);
      showUserMessage('Failed to load autosave: Invalid data.');
    }
  };

  return {
    autoSave,
    hasSavedState,
    loadAutoSave,
    loadState,
    removeAutoSave,
    saveState,
    setReady,
  };
};

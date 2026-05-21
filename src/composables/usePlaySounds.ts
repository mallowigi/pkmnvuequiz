import { useSound } from '@vueuse/sound';
import { ref } from 'vue';

import { useState } from '@/stores/useState.ts';
import type { PokemonInfo } from '@/types.ts';

export const usePlaySounds = () => {
  const { state } = useState();
  const soundFile = ref();

  const { play } = useSound(soundFile, { interrupt: true, volume: 0.5 });

  const playFanfare = () => {
    if (!state.withSound) return;

    soundFile.value = 'assets/sounds/finish.mp3';
    setTimeout(() => {
      play();
    }, 50);
  };

  const playFailSound = () => {
    if (!state.withSound) return;

    soundFile.value = 'assets/sounds/wrong.mp3';
    setTimeout(() => {
      play();
    }, 50);
  };

  const playPokemonCry = (pokemonId: number) => {
    if (!state.withSound) return;

    soundFile.value = `assets/sounds/latest/${pokemonId}.ogg`;
    setTimeout(() => {
      play();
    }, 50);
  };

  const playShiny = (pokemon: PokemonInfo) => {
    if (!state.withSound) return;

    switch (true) {
      case ['kanto', 'johto'].includes(pokemon.box):
        soundFile.value = 'assets/sounds/gbshiny.mp3';
        break;
      case ['hoenn', 'sinnoh', 'unova'].includes(pokemon.box):
        soundFile.value = 'assets/sounds/gbashiny.mp3';
        break;
      case ['kalos', 'kalosmega', 'hoennmega', 'alola', 'pokemongo'].includes(pokemon.box):
        soundFile.value = 'assets/sounds/dsshiny.mp3';
        break;
      default:
        soundFile.value = 'assets/sounds/shiny.mp3';
    }

    setTimeout(() => {
      play();
    }, 50);
  };

  return {
    playFailSound,
    playFanfare,
    playPokemonCry,
    playShiny,
  };
};

import { useSound } from '@vueuse/sound';
import { ref } from 'vue';

import { useState } from '@/stores/useState.ts';

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

  return {
    playFailSound,
    playFanfare,
    playPokemonCry,
  };
};

import { useSpeechRecognition } from '@vueuse/core';
import { ref } from 'vue';

import { useCurrentDex } from '@/composables/useCurrentDex.ts';

const lastQuery = ref<string | null>(null);

export const useVoice = () => {
  const { getCurrentGameModeEntries, findClosest } = useCurrentDex();

  const { isSupported, isListening, start, stop, recognition } = useSpeechRecognition({
    continuous: true,
    interimResults: true,
  });

  const toggleVoice = () => {
    if (isListening.value) {
      stop();
    } else {
      start();
    }
  };

  const stopVoice = () => {
    stop();
  };

  const startVoice = () => {
    start();
  };

  if (isSupported.value) {
    // @ts-expect-error missing types
    const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;

    if (SpeechGrammarList) {
      const speechRecognitionList = new SpeechGrammarList();
      const allPokemon = Object.values(getCurrentGameModeEntries()).map((pokemon) => pokemon.name);
      const grammar = `#JSGF V1.0; grammar pokemon; public <pokemon> = ${allPokemon.join(' | ')} ;`;
      speechRecognitionList.addFromString(grammar, 1);
      recognition!.grammars = speechRecognitionList;
    }

    recognition!.onresult = (event: SpeechRecognitionEvent) => {
      const lastResultIndex = event.results.length - 1;
      const lastResult = event.results[lastResultIndex];
      const transcript = lastResult[0].transcript;

      if (lastResult.isFinal) {
        const closestPokemon = findClosest(transcript.trim()) ?? '';
        lastQuery.value = closestPokemon;
      }
    };
  }

  return {
    isListening,
    isSupported,
    lastQuery,
    startVoice,
    stopVoice,
    toggleVoice,
  };
};

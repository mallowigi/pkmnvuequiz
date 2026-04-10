import { reactive, readonly } from 'vue';

const state = reactive({
  pokemons: null,
  namings: null,
  spriteCycles: null,
  translations: null,
  encodings: null,
  isLoaded: false,
  error: null,
});

export async function loadPokemons() {
  const module = await import('@/data/pokemon.json');
  state.pokemons = module.default;
}

export async function loadNamings() {
  const module = await import('@/data/namings.json');
  state.namings = module.default;
}

export async function loadSpriteCycles() {
  const module = await import('@/data/spriteCycles.json');
  state.spriteCycles = module.default;
}

export async function loadTranslations() {
  const module = await import('@/data/translations.json');
  state.translations = module.default;
}

export async function loadEncodings() {
  const module = await import('@/data/encoded.json');
  state.encodings = module.default;
}

export async function setLoaded() {
  state.isLoaded = true;
}

export async function setError(error) {
  state.error = error;
}

export const usePkmnData = () => {
  return {
    pkmnData: readonly(state),
    loadPokemons,
    loadNamings,
    loadSpriteCycles,
    loadTranslations,
    loadEncodings,
    setLoaded,
  };
};
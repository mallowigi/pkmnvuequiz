import { reactive, readonly } from 'vue';

const state = reactive({
  pokemons: null,
  namings: null,
  spriteCycles: null,
  translations: null,
  sprites: null,
  isLoaded: false,
  error: null,
});

export async function loadPokemons() {
  const module = await import('@/data/pokemon.json');
  state.pokemons = module.default;
}

export async function loadNamings() {
  const module = await import('@/data/namings.json');
  state.namings = module.default.namings;
}

export async function loadSpriteCycles() {
  const module = await import('@/data/spriteCycles.json');
  state.spriteCycles = module.default.sprite_cycles;
}

export async function loadTranslations() {
  const module = await import('@/data/translations.json');
  state.translations = module.default.translations;
}

export async function loadSprites() {
  const module = await import('@/data/sprites.json');
  state.sprites = module.default.encoded_images;
}

export async function setLoaded() {
  state.isLoaded = true;
}

export async function setError(error) {
  state.error = error;
}

export const usePkmnData = () => {
  return {
    state: readonly(state),
    loadPokemons,
    loadNamings,
    loadSpriteCycles,
    loadTranslations,
    loadEncodings: loadSprites,
    setLoaded,
  };
};
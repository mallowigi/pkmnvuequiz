import { reactive, readonly } from 'vue';

const data = reactive({
  error: null,
  isLoaded: false,
  namings: null,
  pokemon: null,
  spriteCycles: null,
  sprites: null,
  translations: null,
});

export async function loadPokemons() {
  const module = await import('@/data/pokemon.json');
  data.pokemon = module.default.pokemon;
}

export async function loadNamings() {
  const module = await import('@/data/namings.json');
  data.namings = module.default.namings;
}

export async function loadSpriteCycles() {
  const module = await import('@/data/spriteCycles.json');
  data.spriteCycles = module.default.sprite_cycles;
}

export async function loadTranslations() {
  const module = await import('@/data/translations.json');
  data.translations = module.default.translations;
}

export async function loadSprites() {
  const module = await import('@/data/sprites.json');
  data.sprites = module.default.encoded_images;
}

export async function setLoaded() {
  data.isLoaded = true;
}

export async function setError(error) {
  data.error = error;
}

export const usePkmnData = () => {
  return {
    data: readonly(data),
    loadNamings,
    loadPokemons,
    loadSpriteCycles,
    loadSprites,
    loadTranslations,
    setError,
    setLoaded,
  };
};

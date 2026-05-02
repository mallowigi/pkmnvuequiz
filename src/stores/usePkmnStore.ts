import { reactive, readonly } from 'vue';

import type { PkmnData, PokemonInfo, Translations } from '@/types';

const data: PkmnData = reactive({
  error: null,
  isLoaded: false,
  namings: null,
  pokemon: null,
  shinies: null,
  silhouettes: null,
  spriteCycles: null,
  sprites: null,
  suffixNamings: null,
  translations: null,
});

export async function loadPokemons() {
  const module = await import('@/data/pokemon.json');
  data.pokemon = module.default.pokemon as PokemonInfo[];
}

export async function loadNamings() {
  const module = await import('@/data/namings.json');
  data.namings = module.default.namings;
  data.suffixNamings = module.default.suffix_namings;
}

export async function loadSpriteCycles() {
  const module = await import('@/data/spriteCycles.json');
  data.spriteCycles = module.default.sprite_cycles;
}

export async function loadTranslations() {
  const module = await import('@/data/translations.json');
  data.translations = module.default.translations as Record<string, Translations>;
}

export async function loadSprites() {
  const module = await import('@/data/sprites.json');
  data.sprites = module.default.sprite as Record<string, string>;
}

export async function loadShinies() {
  const module = await import('@/data/shinies.json');
  data.shinies = module.default.shiny as Record<string, string>;
}

export async function loadSilhouettes() {
  const module = await import('@/data/silhouettes.json');
  data.silhouettes = module.default.silhouette as Record<string, string>;
}

export async function setLoaded() {
  data.isLoaded = true;
}

export async function setError(error: any) {
  data.error = error;
}

export const usePkmnData = () => {
  return {
    data: readonly(data),
    loadNamings,
    loadPokemons,
    loadShinies,
    loadSilhouettes,
    loadSpriteCycles,
    loadSprites,
    loadTranslations,
    setError,
    setLoaded,
  };
};

import type { DocumentData } from 'firebase/firestore';
import { type User } from 'firebase/auth';

export type Dialog =
  | 'changeName'
  | 'chaos'
  | 'giveup'
  | 'leaderboards'
  | 'normal'
  | 'order'
  | 'login'
  | 'reset'
  | 'settings'
  | 'shadows'
  | 'switchQuiz'
  | 'timer';

export type GameMode = 'full' | 'gen' | 'special' | 'types';

export type GameModeInfo = {
  id: GameMode;
  name: string;
};

export type Mode = 'chaos' | 'normal' | 'order';

export type ModeInfo = {
  id: Mode;
  name: string;
};

export type RegionBox =
  | 'alola'
  | 'areazero'
  | 'galar'
  | 'gmax'
  | 'hisui'
  | 'hoenn'
  | 'hoennmega'
  | 'hyperspace'
  | 'johto'
  | 'kalos'
  | 'kalosmega'
  | 'kanto'
  | 'lumiose'
  | 'paldea'
  | 'pokemongo'
  | 'sinnoh'
  | 'unova';

export type RegionBoxInfo = {
  id: RegionBox;
  name: string;
};

export type Type =
  | 'bug'
  | 'dark'
  | 'dragon'
  | 'electric'
  | 'fairy'
  | 'fighting'
  | 'fire'
  | 'flying'
  | 'ghost'
  | 'grass'
  | 'ground'
  | 'ice'
  | 'normal'
  | 'poison'
  | 'psychic'
  | 'rock'
  | 'steel'
  | 'water';

export type TypeInfo = {
  bgColor: string;
  buttonColor: string;
  darkBgColor: string;
  fgColor: string;
  icon: string;
  id: Type;
  index: number;
  inlineColor: string;
  lightBgColor: string;
  lightFgColor: string;
  name: string;
  symbol: string;
};

export type SpecialType = 'no' | 'sublegendary' | 'legendary' | 'mythical' | 'ultrabeast' | 'paradox';

export type SpecialTypeInfo = Omit<TypeInfo, 'id'> & {
  id: SpecialType;
};

export type Gen = 'gen1' | 'gen2' | 'gen3' | 'gen4' | 'gen5' | 'gen6' | 'gen7' | 'gen8' | 'gen9';

export type GenerationInfo = {
  boxes: RegionBox[];
  id: Gen;
  name: string;
  sprites: string[];
};

export type Language = 'cn' | 'de' | 'en' | 'fr' | 'ja' | 'ko' | 'zh';

export type LanguageInfo = {
  id: Language;
  index: number;
  name: string;
  symbol: string;
};

export type PokemonInfo = {
  baseName: string;
  box: RegionBox;
  dexNum: number;
  id: string;
  primaryType: Type;
  secondaryType: Type | null;
  specialType: SpecialType;
  sprites?: string[];
};

export type UserData = {
  user: User | null;
};

export type State = {
  gameMode: GameMode | null;
  isDark: boolean;
  mode: Mode;

  usedAutoPause: boolean;
  usedShadowHelper: boolean;
  usedSpelling: boolean;
  usedTypeShuffle: boolean;
  usedDisplayShadows: boolean;

  withShadows: boolean;
  withTypeShuffle: boolean;
  withCriesShuffle: boolean;
};

export type Settings = {
  name: string | null;
  avatar: string | null;
  autoPause: boolean;
  withCycleSprites: boolean;
  withShadowHelper: boolean;
  withShinies: boolean;
  withSound: boolean;
  withSpelling: boolean;
  languages: Set<Language>;
};

export type PokemonStatus = {
  isFound: boolean;
  isShadowed: boolean;
  isShiny: boolean;
  isMissed: boolean;
  lastFoundAt: number | null;
  lastShadowedAt: number | null;
};

export type PokemonProgressState = {
  lastIndex: number | null;
  lastPokemon: PokemonInfo | null;
  currentPokemon: PokemonInfo | null;
  pokemonStatuses: Map<string, PokemonStatus>;
};

export type TimerState = {
  elapsed: number;
  isLimited: boolean;
  minutes: number;
  savedAt: number | null;
  startTime: number | null;
};

export type GameSelectionState = 'new' | 'gen' | 'types' | null;

export type GameFlowState = {
  gameSelectionState: GameSelectionState;
  isEnded: boolean;
  isGivenUp: boolean;
  isPaused: boolean;
  isSettingsOpen: boolean;
  isStarted: boolean;
  lastInput: string | null;
};

export type Translations = {
  cn: string;
  de: string;
  en: string;
  es: string;
  fr: string;
  it: string;
  ja: string;
  ko: string;
  zh: string;
};

export type PkmnData = {
  error: unknown;
  isLoaded: boolean;
  namings: Record<string, string> | null;
  pokemon: PokemonInfo[] | null;
  shinies: Record<string, string> | null;
  silhouettes: Record<string, string> | null;
  spriteCycles: Record<string, string[]> | null;
  sprites: Record<string, string> | null;
  suffixNamings: Record<string, string> | null;
  translations: Record<string, Translations> | null;
};

export type PokemonProgress = {
  pokemonFound: {
    id: string;
    lastFoundAt: number | null;
  }[];
  pokemonShadowed: {
    id: string;
    lastShadowedAt: number | null;
  }[];
  shinyPokemon: {
    id: string;
  }[];
};

export type SaveData = {
  currentType: Type | null;
  gameMode: GameMode | null;
  gameSelectionState: GameSelectionState | null;
  gen: Gen | null;
  isDark: boolean;
  languages: Language[];
  mode: Mode;
  name: string | null;
  avatar: string | null;
  pokemonProgress: PokemonProgress;
  timer: TimerState;
  version: number;

  usedAutoPause: boolean;
  usedShadowHelper: boolean;
  usedSpelling: boolean;
  usedTypeShuffle: boolean;
  usedDisplayShadows: boolean;

  withCycleSprites: boolean;
  withShadowHelper: boolean;
  withShadows: boolean;
  withShinies: boolean;
  withSound: boolean;
  withSpelling: boolean;
  withTypeShuffle: boolean;
  withCriesShuffle: boolean;
};

export type MessageType = 'success' | 'error' | 'info' | 'warning';

export type Message = {
  id: number;
  text: string;
  type: MessageType;
};

export interface UserRecord extends DocumentData {
  gameMode: GameMode;
  id?: string;
  avatar?: string | null;
  gen?: Gen | null;
  mode: Mode;
  name: string;
  hasGivenUp: boolean;
  numShadows: number;
  time: number;
  type?: Type | null;
  usedAutoPause: boolean;
  usedDisplayShadows: boolean;
  usedShadowHelper: boolean;
  usedSpelling: boolean;
  usedTypeShuffle: boolean;
}

export const availableLanguages = ['en', 'cn', 'de', 'es', 'fr', 'it', 'jp', 'ko', 'pt', 'ru', 'zh'];

export type Dialog = 'chaos' | 'order' | 'normal' | 'shadows' | 'switchQuiz' | 'timer' | 'giveup' | 'reset';

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
  id: Gen;
  boxes: RegionBox[];
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
  id: string;
  baseName: string;
  dexNum: number;
  primaryType: Type;
  secondaryType: Type | null;
  box: RegionBox;
  specialType: SpecialType;
};

export type State = {
  gameMode: GameMode | null;
  isDark: boolean;
  mode: Mode;
  withCycleSprites: boolean;
  withShadowHelper: boolean;
  withShadows: boolean;
  withShinies: boolean;
  withSound: boolean;
  withSpelling: boolean;
  withTypeShuffle: boolean;
};

export type LanguagesState = {
  languages: Set<Language>;
};

export type PokemonStatus = {
  isFound: boolean;
  isShadowed: boolean;
};

export type PokemonProgressState = {
  pokemonStatuses: Map<string, PokemonStatus>;
  lastPokemon: string | null;
};

export type TimerState = {
  minutes: number;
  isLimited: boolean;
  savedAt: number | null;
  startTime: number | null;
};

export type GameSelectionState = 'gen' | 'types' | null;

export type GameFlowState = {
  isEnded: boolean;
  isPaused: boolean;
  isStarted: boolean;
  gameSelectionState: GameSelectionState;
};

export type Translations = {
  en: string;
  fr: string;
  de: string;
  es: string;
  it: string;
  ko: string;
  ja: string;
  zh: string;
  cn: string;
};

export type PkmnData = {
  error: unknown;
  isLoaded: boolean;
  namings: Record<string, string> | null;
  suffixNamings: Record<string, string> | null;
  pokemon: PokemonInfo[] | null;
  spriteCycles: Record<string, string[]> | null;
  sprites: Record<string, string> | null;
  shinies: Record<string, string> | null;
  silhouettes: Record<string, string> | null;
  translations: Record<string, Translations> | null;
};

export type SaveData = {
  gameMode: GameMode | null;
  gen: Gen | null;
  isDark: boolean;
  mode: Mode;

  languages: Language[];

  withCycleSprites: boolean;
  withShadowHelper: boolean;
  withShadows: boolean;
  withShinies: boolean;
  withSound: boolean;
  withSpelling: boolean;
  withTypeShuffle: boolean;

  currentType: Type | null;

  timer: TimerState;

  pokemonProgress: {
    pokemonFound: string[];
    pokemonShadowed: string[];
  };
  version: number;
};

export type MessageType = 'success' | 'error' | 'info' | 'warning';

export type Message = {
  id: number;
  text: string;
  type: MessageType;
};

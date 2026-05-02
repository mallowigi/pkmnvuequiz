export type Dialog = 'chaos' | 'order' | 'normal' | 'shadows' | 'switchQuiz' | 'timer' | 'giveup' | 'reset';

export type GameMode = 'full' | 'gen' | 'special' | 'type';

export type GameModeInfo = {
  id: GameMode;
  name: string;
};

export type Mode = 'chaos' | 'normal' | 'order';

export interface ModeInfo {
  id: Mode;
  name: string;
}

export type Region =
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

export interface RegionInfo {
  id: Region;
  name: string;
}

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

export interface TypeInfo {
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
}

export type SpecialTypeInfo = Omit<TypeInfo, 'id'> & {
  id: 'special';
};

export type Gen = 'gen1' | 'gen2' | 'gen3' | 'gen4' | 'gen5' | 'gen6' | 'gen7' | 'gen8' | 'gen9';

export interface GenerationInfo {
  id: Gen;
  boxes: Region[];
  name: string;
  sprites: string[];
}

export type Language = 'cn' | 'de' | 'en' | 'fr' | 'ja' | 'ko' | 'zh';

export interface LanguageInfo {
  id: Language;
  name: string;
  symbol: string;
}

export interface PokemonInfo {
  id: string;
  baseName: string;
  primaryType: Type;
  secondaryType: Type | null;
  box: string;
  specialType: string;
}

export interface State {
  currentType: Type | null;
  gameMode: GameMode | null;
  gen: Gen | null;
  isDark: boolean;
  isEnded: boolean;
  isPaused: boolean;
  isStarted: boolean;
  languages: Set<Language>;
  mode: Mode;
  numFound: number;
  numShadows: number;
  showCredits: boolean;
  timer: {
    elapsed: number;
    endTime: number | null;
    savedAt: number | null;
    startTime: number | null;
  };
  withCycleSprites: boolean;
  withShadowHelper: boolean;
  withShadows: boolean;
  withShinies: boolean;
  withSound: boolean;
  withSpelling: boolean;
  withTypeShuffle: boolean;
}

export interface PkmnData {
  error: any;
  isLoaded: boolean;
  namings: Record<string, string> | null;
  pokemon: PokemonInfo[] | null;
  spriteCycles: Record<string, string[]> | null;
  sprites: {
    sprite: Record<string, string>;
    shiny: Record<string, string>;
    silhouette: Record<string, string>;
  } | null;
  translations: Record<Language, Record<string, string>> | null;
}

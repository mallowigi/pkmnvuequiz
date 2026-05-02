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

export interface Region {
  id: string;
  name: string;
}

export interface Type {
  bgColor: string;
  buttonColor: string;
  darkBgColor: string;
  fgColor: string;
  icon: string;
  id: string;
  index: number;
  inlineColor: string;
  lightBgColor: string;
  lightFgColor: string;
  name: string;
  symbol: string;
}

export type Gen = 'gen1' | 'gen2' | 'gen3' | 'gen4' | 'gen5' | 'gen6' | 'gen7' | 'gen8' | 'gen9';

export interface GenerationInfo {
  id: Gen;
  boxes: string[];
  name: string;
  sprites: string[];
}

export type Language = 'cn' | 'de' | 'en' | 'fr' | 'ja' | 'ko' | 'zh';

export interface LanguageInfo {
  id: Language;
  name: string;
  symbol: string;
}

export interface Pokemon {
  id: string;
  baseName: string;
  primaryType: string;
  secondaryType: string | null;
  box: string;
  specialType: string;
}

export interface State {
  currentType: string | null;
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
  pokemon: Pokemon[] | null;
  spriteCycles: Record<string, string[]> | null;
  sprites: {
    sprite: Record<string, string>;
    shiny: Record<string, string>;
    silhouette: Record<string, string>;
  } | null;
  translations: Record<string, Record<string, string>> | null;
}

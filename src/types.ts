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

export interface Gen {
  boxes: string[];
  name: string;
  sprites: string[];
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
  gameMode: string | null;
  gen: string | null;
  isDark: boolean;
  isEnded: boolean;
  isPaused: boolean;
  isStarted: boolean;
  languages: Set<string>;
  mode: string;
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

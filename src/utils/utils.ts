import type { Achievement, AchievementConfig } from '@/types.ts';

export const normalizeName = (str: string) => {
  if (!str) return str;
  return str
    .toLowerCase()
    .replace(/[éèêëẽ]/gu, 'e')
    .replace(/[áàâäã]/gu, 'a')
    .replace(/[ôòóöœõ]/gu, 'o')
    .replace(/[ùúûüũ]/gu, 'u')
    .replace(/[ìíîïĩ]/gu, 'i')
    .replace(/[ñń]/gu, 'n')
    .replace(/[ýÿ]/gu, 'y')
    .replace(/[ßš]/gu, 's')
    .replace(/[çč]/gu, 'c')
    .replace(/[^\p{L}\p{N}]/gu, '');
};

export const capitalize = (str: string) => {
  if (!str) return str;
  const words = str.split(/[\s_-]+/);
  return words
    .map((word) => {
      const [first, ...rest] = word;
      return first.toUpperCase() + rest.join('').toLowerCase();
    })
    .join(' ');
};

export const slugify = (str: string) => {
  if (!str) return str;
  const words = str.split(/[\s_-]+/);
  return words
    .map((word) => {
      const [first, ...rest] = word;
      return first.toUpperCase() + rest.join('').toLowerCase();
    })
    .join('_');
};

export const blankifyName = (str: string) => {
  if (!str) return str;
  return str
    .split(' ')
    .map((word) => {
      const [first, ...rest] = word;
      return first.toUpperCase() + rest.map(() => '_').join('');
    })
    .join(' ');
};

export const upsert = <T>(map: Map<string, T[]>, key: string, value: T) => {
  if (!map.has(key)) {
    map.set(key, []);
  }
  map.get(key)?.push(value);
};

export const scrollToTop = () => {
  const target = document.querySelector<HTMLElement>('.main.touch-layout .game-content') ?? window;
  target.scrollTo({ behavior: 'smooth', top: 0 });
};

export const glitchify = (str: string) => {
  const glitchChars = ['̷', '̸', '̴', '̵', '̶', '̷', '̸', '̹', '̺', '̻', '̀', '́', '͂', '̓', '̈́', 'ͅ'];
  return str
    .split('')
    .map((char) => {
      if (Math.random() < 0.2) {
        return char + glitchChars[Math.floor(Math.random() * glitchChars.length)];
      }
      return char;
    })
    .join('');
};

export const abilityUrl = (abilityName: string) => {
  const formattedName = abilityName.replace(/[\s-]/g, '_');
  return `https://bulbapedia.bulbagarden.net/wiki/${formattedName}_(Ability)`;
};

export const pokemonUrl = (pokemonName: string) => {
  const formattedName = slugify(pokemonName);
  return `https://bulbapedia.bulbagarden.net/wiki/${formattedName}_(Pokémon)`;
};

export const moveUrl = (moveName: string) => {
  const formattedName = slugify(moveName);
  return `https://bulbapedia.bulbagarden.net/wiki/${formattedName}_(move)`;
};

export const getMoveArtworkUrl = (articleTitle: string): string => {
  const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
  if (!projectId) return '';

  const params = new URLSearchParams({ title: articleTitle });
  return `https://us-central1-${projectId}.cloudfunctions.net/moveArtwork?${params}`;
};

export const formatElapsedTime = (totalSeconds: number): string => {
  const total = Math.max(0, Math.floor(totalSeconds));
  const hours = String(Math.floor(total / 3600));
  const minutes = String(Math.floor((total % 3600) / 60));
  const seconds = String(total % 60);

  return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
};

export const createAchievement = (achievement: AchievementConfig): Achievement => {
  const { id, category, getValue, thresholds, lastTitle, lastDescription } = achievement;
  const count = Object.entries(thresholds).length;

  return {
    category,
    conditions: thresholds.map((threshold, i) => ({
      isSatisfied: () => getValue() >= threshold.val,
      tier: count - i,
    })),
    get description() {
      const found = thresholds.find((threshold) => getValue() < threshold.val);
      return found ? found.description : lastDescription;
    },
    getTierInfo: (tier: number) => {
      const threshold = thresholds[count - tier];
      return (
        threshold && {
          description: threshold.description,
          name: threshold.nextTitle,
        }
      );
    },
    id,
    get name() {
      const found = thresholds.find((threshold) => getValue() < threshold.val);
      return found ? found.nextTitle : lastTitle;
    },
    get nextStep() {
      const found = thresholds.find((threshold) => getValue() < threshold.val);
      return found ? found.val : undefined;
    },
    priority: achievement.priority ?? 0,
    get progress() {
      return getValue();
    },
  };
};

export const randomBetween = (min: number, max: number) => Math.random() * (max - min) + min;

export const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

export const sample = <T>(array: T[]): T | undefined => {
  if (array.length === 0) return undefined;
  const index = Math.floor(Math.random() * array.length);
  return array[index];
};

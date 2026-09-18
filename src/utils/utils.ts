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

export const upsert = <T>(map: Map<string, T[]>, key: string, value: T) => {
  if (!map.has(key)) {
    map.set(key, []);
  }
  map.get(key)?.push(value);
};

export const scrollToTop = () => {
  window.scrollTo({ behavior: 'smooth', top: 0 });
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
  const formattedName = pokemonName.replace(/[\s-]/g, '_');
  return `https://bulbapedia.bulbagarden.net/wiki/${formattedName}_(Pokémon)`;
};

export const moveUrl = (moveName: string) => {
  const formattedName = moveName.replace(/[\s-]/g, '_');
  return `https://bulbapedia.bulbagarden.net/wiki/${formattedName}_(move)`;
};

/**
 * Fetches the representative page image for a Bulbapedia article via the MediaWiki API,
 * so we don't have to guess the article's image filename convention ourselves.
 * Returns an empty string when no image is available or the request fails.
 */
export const fetchBulbapediaArtwork = async (articleTitle: string): Promise<string> => {
  try {
    const params = new URLSearchParams({
      action: 'query',
      format: 'json',
      origin: '*',
      pithumbsize: '500',
      prop: 'pageimages',
      titles: articleTitle,
    });
    const response = await fetch(`https://bulbapedia.bulbagarden.net/w/api.php?${params}`);
    if (!response.ok) return '';

    const data = await response.json();
    const pages = Object.values(data?.query?.pages ?? {}) as { thumbnail?: { source?: string } }[];
    return pages[0]?.thumbnail?.source ?? '';
  } catch {
    return '';
  }
};

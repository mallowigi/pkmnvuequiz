export const normalizeName = (str: string) => {
  if (!str) return str;
  return str.toLowerCase().replace(/[^\p{L}\p{N}]/gu, '');
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

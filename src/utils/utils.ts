export const normalizeName = (str: string) => {
  if (!str) return str;
  return str.toLowerCase().replace(/[^\p{L}\p{N}]/gu, '');
};

export const capitalize = (str: string) => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
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

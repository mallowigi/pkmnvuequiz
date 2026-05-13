export const normalizeName = (str: string) => {
  if (!str) return str;
  return str.toLowerCase().replace(/[^a-z0-9]/g, '');
};

export const capitalize = (str: string) => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

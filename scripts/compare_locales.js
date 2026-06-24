import fs from 'fs';
import path from 'path';

const localesDir = 'src/locales';
const enPath = path.join(localesDir, 'en.json');
const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));

const files = fs.readdirSync(localesDir).filter(file => file.endsWith('.json') && file !== 'en.json');

const getKeys = (obj, prefix = '') => {
  return Object.keys(obj).reduce((res, el) => {
    if (Array.isArray(obj[el])) {
      return res;
    } else if (typeof obj[el] === 'object' && obj[el] !== null) {
      return [...res, ...getKeys(obj[el], prefix + el + '.')];
    }
    return [...res, prefix + el];
  }, []);
};

const enKeys = getKeys(en);

files.forEach(file => {
  const filePath = path.join(localesDir, file);
  const locale = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const localeKeys = getKeys(locale);
  const missing = enKeys.filter(key => !localeKeys.includes(key));
  if (missing.length > 0) {
    console.log(`Missing in ${file}:`, missing);
  }
});

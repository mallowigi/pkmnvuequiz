import fs from 'fs';
import path from 'path';

const localesDir = 'src/locales';
const files = fs.readdirSync(localesDir).filter(file => file.endsWith('.json'));

const getKeys = (obj, prefix = '') => {
  let keys = [];
  for (const key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      keys = keys.concat(getKeys(obj[key], prefix + key + '.'));
    } else {
      keys.push(prefix + key);
    }
  }
  return keys;
};

files.forEach(file => {
  const filePath = path.join(localesDir, file);
  const locale = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const keys = getKeys(locale);
  console.log(`${file}: ${keys.length} keys`);
});

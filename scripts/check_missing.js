import fs from 'fs';
import path from 'path';

const localesDir = 'src/locales';
const en = JSON.parse(fs.readFileSync(path.join(localesDir, 'en.json'), 'utf8'));
const files = fs.readdirSync(localesDir).filter(file => file.endsWith('.json') && file !== 'en.json');

function getKeys(obj) {
  const keys = [];
  const walk = (o, p = '') => {
    for (const k in o) {
      const full = p ? `${p}.${k}` : k;
      if (typeof o[k] === 'object' && o[k] !== null && !Array.isArray(o[k])) {
        walk(o[k], full);
      } else {
        keys.push(full);
      }
    }
  };
  walk(obj);
  return keys;
}

const enKeys = getKeys(en);
console.log(`English has ${enKeys.length} leaf keys.`);

files.forEach(file => {
  const locale = JSON.parse(fs.readFileSync(path.join(localesDir, file), 'utf8'));
  const localeKeys = getKeys(locale);
  const missing = enKeys.filter(k => !localeKeys.includes(k));
  const extra = localeKeys.filter(k => !enKeys.includes(k));
  console.log(`${file}: ${localeKeys.length} keys. Missing: ${missing.length}, Extra: ${extra.length}`);
  if (missing.length > 0) {
    console.log(`  Missing: ${missing.join(', ')}`);
  }
  if (extra.length > 0) {
    console.log(`  Extra: ${extra.join(', ')}`);
  }
});

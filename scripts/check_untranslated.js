import fs from 'fs';
import path from 'path';

const localesDir = 'src/locales';
const en = JSON.parse(fs.readFileSync(path.join(localesDir, 'en.json'), 'utf8'));

const files = fs.readdirSync(localesDir).filter(file => file.endsWith('.json') && file !== 'en.json');

function getLeafNodes(obj, prefix = '') {
  let nodes = {};
  for (const key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      Object.assign(nodes, getLeafNodes(obj[key], fullKey));
    } else {
      nodes[fullKey] = obj[key];
    }
  }
  return nodes;
}

const enNodes = getLeafNodes(en);

files.forEach(file => {
  const locale = JSON.parse(fs.readFileSync(path.join(localesDir, file), 'utf8'));
  const localeNodes = getLeafNodes(locale);
  let untranslated = [];

  for (const key in enNodes) {
    if (localeNodes[key] === enNodes[key] && enNodes[key].length > 3) {
       // Strings with length <= 3 might be symbols or codes like "X", "min", "zh"
       untranslated.push(key);
    }
  }

  if (untranslated.length > 0) {
    console.log(`Potential untranslated in ${file}:`, untranslated);
  }
});

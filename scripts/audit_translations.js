import fs from 'fs';
import path from 'path';

const localesDir = 'src/locales';
const en = JSON.parse(fs.readFileSync(path.join(localesDir, 'en.json'), 'utf8'));

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
const files = fs.readdirSync(localesDir).filter(file => file.endsWith('.json') && file !== 'en.json');

files.forEach(file => {
  const locale = JSON.parse(fs.readFileSync(path.join(localesDir, file), 'utf8'));
  const localeNodes = getLeafNodes(locale);
  const toUpdate = [];

  for (const key in enNodes) {
    const enVal = enNodes[key];
    const locVal = localeNodes[key];

    if (!locVal) {
      toUpdate.push({ key, reason: 'MISSING', enVal });
      continue;
    }

    // Check for "Mega" in English but not in Locale
    if (enVal.toLowerCase().includes('mega') && !locVal.toLowerCase().includes('mega')) {
      // Special case: "Mega" might be translated to something else, but in this app it seems to be "Mega" or "Méga" or "超級" etc.
      // But let's check if the English one has "Special or Mega" while the local one only has "Special"
      if (enVal.toLowerCase().includes('special or mega') && !locVal.toLowerCase().includes('mega')) {
         toUpdate.push({ key, reason: 'OUTDATED (Mega)', enVal, locVal });
      }
    }
  }

  if (toUpdate.length > 0) {
    console.log(`\nFile ${file} updates:`);
    toUpdate.forEach(u => console.log(`- ${u.key} [${u.reason}]: "${u.locVal || ''}" should be based on "${u.enVal}"`));
  }
});

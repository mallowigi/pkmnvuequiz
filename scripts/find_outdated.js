import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const localesDir = 'src/locales';
const enCurrent = JSON.parse(fs.readFileSync(path.join(localesDir, 'en.json'), 'utf8'));
const enOld = JSON.parse(execSync('git show HEAD~1:src/locales/en.json', { encoding: 'utf8' }));

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

const enCurrentNodes = getLeafNodes(enCurrent);
const enOldNodes = getLeafNodes(enOld);

const changedKeys = [];
for (const key in enCurrentNodes) {
  if (enCurrentNodes[key] !== enOldNodes[key]) {
    changedKeys.push({
      key,
      old: enOldNodes[key],
      new: enCurrentNodes[key]
    });
  }
}

console.log('Changed/New keys in en.json:');
changedKeys.forEach(ck => console.log(`- ${ck.key}: "${ck.old}" -> "${ck.new}"`));

const files = fs.readdirSync(localesDir).filter(file => file.endsWith('.json') && file !== 'en.json');

files.forEach(file => {
  const locale = JSON.parse(fs.readFileSync(path.join(localesDir, file), 'utf8'));
  const localeNodes = getLeafNodes(locale);
  const toUpdate = [];

  changedKeys.forEach(ck => {
    // If it's a new key, it might already be there (I saw this in git diff)
    // If it's an updated key, it might still have the old translation.
    // We can't easily know if the translation is "old", but we can see if it mentions "Mega" if the new English one does.
    if (ck.new.includes('Mega') && !ck.old?.includes('Mega')) {
       if (localeNodes[ck.key] && !localeNodes[ck.key].toLowerCase().includes('mega')) {
         toUpdate.push(ck.key);
       }
    }
    // Also check if it's completely missing (though check_missing said none are)
    if (!localeNodes[ck.key]) {
      toUpdate.push(ck.key + " (MISSING)");
    }
  });

  if (toUpdate.length > 0) {
    console.log(`\nFile ${file} needs updates for:`, toUpdate);
  }
});

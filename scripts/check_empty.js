import fs from 'fs';
import path from 'path';

const localesDir = 'src/locales';
const files = fs.readdirSync(localesDir).filter(file => file.endsWith('.json'));

files.forEach(file => {
  const content = fs.readFileSync(path.join(localesDir, file), 'utf8');
  const locale = JSON.parse(content);
  
  const check = (obj, path = '') => {
    for (const key in obj) {
      const currentPath = path ? `${path}.${key}` : key;
      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
        check(obj[key], currentPath);
      } else if (obj[key] === "" || obj[key] === null) {
        console.log(`Empty/Null in ${file}: ${currentPath}`);
      }
    }
  };
  
  check(locale);
});

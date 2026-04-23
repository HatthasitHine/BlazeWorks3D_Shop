import fs from 'fs';
import path from 'path';

const searchStr = "'http://localhost:3001";
const replaceStr = "`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}`";

const searchStr2 = "`http://localhost:3001";
const replaceStr2 = "`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}`";

const searchStr3 = "\"http://localhost:3001";
const replaceStr3 = "`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}`";

const walk = (dir) => {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(filePath));
    } else if (filePath.endsWith('.jsx') || filePath.endsWith('.js')) {
      results.push(filePath);
    }
  });
  return results;
};

const files = walk('d:/Work/Test React/my-app/src');
let changedCount = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  
  // Replace direct string matches
  content = content.replace(/'http:\/\/localhost:3001/g, "(import.meta.env.VITE_API_URL || 'http://localhost:3001') + '");
  content = content.replace(/"http:\/\/localhost:3001/g, "(import.meta.env.VITE_API_URL || 'http://localhost:3001') + \"");
  
  // Replace template literals
  content = content.replace(/`http:\/\/localhost:3001/g, "`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}");

  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
    changedCount++;
  }
});

console.log(`Done! Updated ${changedCount} files.`);

const fs = require('fs');
const path = require('path');

const traverseDir = (dir, callback) => {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(file => {
    let fullPath = path.join(dir, file);
    if (fs.lstatSync(fullPath).isDirectory()) {
       traverseDir(fullPath, callback);
    } else {
       callback(fullPath);
    }
  });
};

const processFile = (filePath) => {
  if (!filePath.endsWith('.jsx') && !filePath.endsWith('.js')) return;
  if (filePath.includes('App.js')) return;

  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Replace ternary: isDark ? "A" : "B" -> "A"
  content = content.replace(/isDark\s*\?\s*"([^"]*)"\s*:\s*"([^"]*)"/g, '"$1"');
  content = content.replace(/isDark\s*\?\s*'([^']*)'\s*:\s*'([^']*)'/g, "'$1'");
  
  // Replace ternary with template literals like isDark ? `A` : `B` -> `A`
  content = content.replace(/isDark\s*\?\s*`([^`]*)`\s*:\s*`([^`]*)`/g, '`$1`');

  // Replace boolean toggles like: isDark ? true : false -> true
  content = content.replace(/isDark\s*\?\s*true\s*:\s*false/g, 'true');
  content = content.replace(/isDark\s*\?\s*false\s*:\s*true/g, 'false');

  // Remove conditional isDark rendering where isDark && -> just the element
  content = content.replace(/isDark\s*&&\s*/g, '');
  content = content.replace(/!\s*isDark\s*&&\s*(?:<[^>]+>[^<]*<\/[^>]+>|\w+)/g, '');

  content = content.replace(/className=\{"([^"]+)"\}/g, 'className="$1"');
  content = content.replace(/className=\{'([^']+)'\}/g, "className='$1'");

  // Remove isDark from prop destructuring
  content = content.replace(/,\s*isDark(?!:)/g, '');
  content = content.replace(/{\s*isDark\s*,\s*/g, '{ ');
  content = content.replace(/{\s*isDark\s*}/g, '{}');
  content = content.replace(/isDark={isDark}/g, '');
  content = content.replace(/\bisDark\b/g, 'true'); // For any remaining isDark usages, like in a template literal ${isDark ? ... : ...}
  
  // Remove toggleTheme from prop destructuring
  content = content.replace(/,\s*toggleTheme/g, '');
  content = content.replace(/{\s*toggleTheme\s*,\s*/g, '{ ');
  content = content.replace(/{\s*toggleTheme\s*}/g, '{}');
  content = content.replace(/toggleTheme={toggleTheme}/g, '');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Modified:', filePath);
  }
};

traverseDir(path.join(__dirname, 'src/pages'), processFile);
traverseDir(path.join(__dirname, 'src/components'), processFile);

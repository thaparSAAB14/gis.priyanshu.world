const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
  });
}

walk('c:/Users/ps103/Downloads/portfolio/src', function(filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.css') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Background mappings: Dark Mode (#0a0a0f -> Purple Shadow #091f36)
    content = content.replace(/#0a0a0f/g, '#091f36');
    // Dark Cards (#141420 & #1c1c2e -> Blue Popsicle #0f2862)
    content = content.replace(/#141420/g, '#0f2862');
    content = content.replace(/#1c1c2e/g, '#0f2862');
    
    // Emerald replacements to Redline (#9e363a)
    content = content.replace(/(bg|text|border|from|via|to|shadow|fill|stroke)-emerald-\d00/g, '$1-[#9e363a]');
    
    // Teal / Indigo to Blue Popsicle (#0f2862)
    content = content.replace(/(bg|text|border|from|via|to|shadow|fill|stroke)-teal-\d00/g, '$1-[#0f2862]');
    content = content.replace(/(bg|text|border|from|via|to|shadow|fill|stroke)-indigo-\d00/g, '$1-[#0f2862]');
    
    // Amber to Grey Blue Leaf (#4f5f76)
    content = content.replace(/(bg|text|border|from|via|to|shadow|fill|stroke)-amber-\d00/g, '$1-[#4f5f76]');

    // Neutral text mappings
    content = content.replace(/text-neutral-900/g, 'text-[#091f36]');
    content = content.replace(/text-neutral-800/g, 'text-[#091f36]');
    content = content.replace(/text-neutral-700/g, 'text-[#0f2862]');
    content = content.replace(/text-neutral-600/g, 'text-[#4f5f76]');
    content = content.replace(/text-neutral-500/g, 'text-[#4f5f76]');
    content = content.replace(/text-neutral-400/g, 'text-[#4f5f76]');
    
    // Border mappings
    content = content.replace(/border-neutral-300/g, 'border-[#4f5f76]/30');
    content = content.replace(/border-neutral-200/g, 'border-[#4f5f76]/20');
    content = content.replace(/border-\[\#2a2a3e\]/g, 'border-[#4f5f76]/40');
    
    // RGBA hardcoded custom mappings
    if (filePath.includes('layout.tsx')) {
      // Grid pattern logic: Grey Blue Leaf
      content = content.replace(/rgba\(16,\s*185,\s*129/g, 'rgba(79, 95, 118');
    } else {
      // Radial tracker gradients: Redline
      content = content.replace(/rgba\(16,\s*185,\s*129/g, 'rgba(158, 54, 58');
    }

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Updated:', filePath);
    }
  }
});

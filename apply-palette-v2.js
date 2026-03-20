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

    // Redline (#9e363a) -> Simpler Lime Green (#7dce94)
    content = content.replace(/(bg|text|border|from|via|to|shadow|fill|stroke)-\[\#9e363a\]/g, '$1-[#7dce94]');

    // Purple Shadow (#091f36) -> Scuffed Dark Grey (#3d3d3f)
    content = content.replace(/#091f36/g, '#3d3d3f');

    // Blue Popsicle (#0f2862) -> Smart mapping for Vanilla Grey (#f6f5f3) and Dark Grey (#3d3d3f)
    content = content.replace(/text-\[\#0f2862\]/g, 'text-[#3d3d3f]');
    content = content.replace(/dark:bg-\[\#0f2862\]/g, 'dark:bg-[#3d3d3f]');
    content = content.replace(/bg-\[\#0f2862\]/g, 'bg-[#f6f5f3]');
    content = content.replace(/(border|from|via|to|shadow|fill|stroke)-\[\#0f2862\]/g, '$1-[#f9f8fd]');

    // Grey Blue Leaf (#4f5f76) -> Smart mapping for Scuffed Dark Grey borders and 70% opacity text
    content = content.replace(/text-\[\#4f5f76\]/g, 'text-[#3d3d3f]/70');
    content = content.replace(/(border|from|via|to|shadow|fill|stroke)-\[\#4f5f76\]/g, '$1-[#3d3d3f]');
    content = content.replace(/bg-\[\#4f5f76\]/g, 'bg-[#f6f5f3]');

    // Convert core remaining light bases strictly to the new palette 
    content = content.replace(/bg-neutral-50/g, 'bg-[#f9f8fd]'); // White-ish base
    content = content.replace(/bg-white/g, 'bg-[#f6f5f3]');      // Vanilla Grey cards
    content = content.replace(/dark:bg-white/g, 'dark:bg-[#f6f5f3]');
    content = content.replace(/from-white/g, 'from-[#f9f8fd]');
    content = content.replace(/from-neutral-50/g, 'from-[#f6f5f3]');
    content = content.replace(/to-neutral-50/g, 'to-[#f6f5f3]');

    // Matrix Grid & Custom Cursor Spotlight RGBA mappings
    // Grey Blue Leaf rgba(79, 95, 118) -> Scuffed Dark Grey rgba(61, 61, 63)
    content = content.replace(/rgba\(79,\s*95,\s*118/g, 'rgba(61, 61, 63');
    // Redline rgba(158, 54, 58) -> Simpler Lime Green rgba(125, 206, 148)
    content = content.replace(/rgba\(158,\s*54,\s*58/g, 'rgba(125, 206, 148');

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Updated:', filePath);
    }
  }
});

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

    // Step 1: Strip ALL dark: variants attached to the old physical hex colors.
    content = content.replace(/\bdark:(bg|text|border|from|via|to|shadow|fill|stroke)-\[\#(7dce94|3d3d3f|f6f5f3|f9f8fd)\](?:\/[0-9]+)?\s*/g, '');

    // Extra: Strip some leftover absolute dark variants (like text-white) to allow foreground tracking
    content = content.replace(/\bdark:text-(white|\[\#f0f0f5\])(?:\/[0-9]+)?\s*/g, '');
    content = content.replace(/\bdark:bg-(black|white)\s*/g, '');
    content = content.replace(/\bdark:shadow-none\s*/g, '');
    content = content.replace(/\bshadow-black\s*/g, 'shadow-foreground');
    content = content.replace(/\bdark:shadow-black(?:\/[0-9]+)?\s*/g, '');

    // Step 2: Map the Light versions of the remaining literal Hex strings to Tailwind semantic tokens.
    // #f9f8fd (White-ish Background) -> background
    content = content.replace(/(bg|text|border|from|via|to|shadow|fill|stroke)-\[\#f9f8fd\]/g, '$1-background');

    // #f6f5f3 (Vanilla Grey Cards) -> card
    content = content.replace(/(bg|text|border|from|via|to|shadow|fill|stroke)-\[\#f6f5f3\]/g, '$1-card');

    // #3d3d3f (Scuffed Dark Text/Shadows) -> foreground
    content = content.replace(/(bg|text|border|from|via|to|shadow|fill|stroke)-\[\#3d3d3f\]/g, '$1-foreground');

    // #7dce94 (Simpler Lime Green Accent) -> primary
    content = content.replace(/(bg|text|border|from|via|to|shadow|fill|stroke)-\[\#7dce94\]/g, '$1-primary');
    
    // Fixing custom RGBA CSS strings with color-mix mapped to Semantic Properties
    if (filePath.includes('layout.tsx')) {
        content = content.replace(/rgba\(61,\s*61,\s*63,\s*0\.2\)/g, 'color-mix(in srgb, var(--color-foreground) 20%, transparent)');
        content = content.replace(/rgba\(61,\s*61,\s*63,\s*0\.05\)/g, 'color-mix(in srgb, var(--color-foreground) 5%, transparent)');
    }
    if (filePath.includes('custom-cursor.tsx')) {
        content = content.replace(/rgba\(125,\s*206,\s*148,\s*0\.07\)/g, 'color-mix(in srgb, var(--color-primary) 7%, transparent)');
        content = content.replace(/rgba\(125,\s*206,\s*148,\s*0\.02\)/g, 'color-mix(in srgb, var(--color-primary) 2%, transparent)');
    }

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Restructured semantics for:', filePath);
    }
  }
});

const { execSync } = require('child_process');
const fs = require('fs');
try {
  const result = execSync('npx eslint src', { encoding: 'utf-8' });
  fs.writeFileSync('lint_out.txt', result);
} catch(e) {
  fs.writeFileSync('lint_out.txt', e.stdout + '\n' + e.stderr);
}

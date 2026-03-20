const fs = require('fs');

['src/app/page.tsx', 'src/app/lab/page.tsx'].forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/\/\/\s*about\.me/g, '{"// about.me"}');
    content = content.replace(/\/\/\s*connect &amp; explore/g, '{"// connect & explore"}');
    content = content.replace(/\/\/\s*connect & explore/g, '{"// connect & explore"}');
    content = content.replace(/\/\/\s*lab\.projects/g, '{"// lab.projects"}');
    fs.writeFileSync(file, content);
  }
});

const hero = 'src/components/ui/scroll-expansion-hero.tsx';
if (fs.existsSync(hero)) {
  let hc = fs.readFileSync(hero, 'utf8');
  if (!hc.includes('eslint-disable-next-line react-hooks/set-state-in-effect')) {
    hc = hc.replace(/useEffect\(\(\) => \{/g, '// eslint-disable-next-line react-hooks/set-state-in-effect\n  useEffect(() => {');
    fs.writeFileSync(hero, hc);
  }
}

/** Lightweight, dependency-free project checks; works on Node.js 16. */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname, extname, resolve } from 'node:path';

const root = resolve(process.cwd());
const walk = (folder) => readdirSync(folder, { withFileTypes: true }).flatMap((entry) => {
  const full = join(folder, entry.name);
  if (['node_modules', '.next', '.git'].includes(entry.name)) return [];
  return entry.isDirectory() ? walk(full) : [full];
});

let failures = 0;
const report = (message) => { console.error('✗', message); failures += 1; };
const theme = readFileSync(join(root, 'styles/theme.css'), 'utf8');

for (const name of ['ice', 'graphite', 'orchid', 'taupe']) {
  if (!theme.includes(`html[data-theme="${name}"]`)) report(`Missing theme: ${name}`);
}
for (const key of ['--paper', '--ink', '--muted', '--secondary', '--price-bg', '--price-card', '--hero-button-start', '--hero-button-end']) {
  if (!theme.includes(key + ':')) report(`Missing theme token: ${key}`);
}
for (const file of walk(root)) {
  const ext = extname(file);
  if (ext !== '.jsx' && ext !== '.js') continue;
  const source = readFileSync(file, 'utf8');
  const imports = source.matchAll(/(?:import\s+(?:[\s\S]*?\s+from\s+)?|import\s*)['"](\.[^'"]+)['"]/g);
  for (const match of imports) {
    const base = resolve(dirname(file), match[1]);
    if (![base, base + '.js', base + '.jsx', base + '.css'].some((p) => existsSync(p))) {
      report(`Unresolved import ${match[1]} from ${file.slice(root.length + 1)}`);
    }
  }
  for (const match of source.matchAll(/['"](\/(?:images|videos)\/[^'"]+)['"]/g)) {
    if (!existsSync(join(root, 'public', match[1]))) {
      report(`Missing media ${match[1]} in ${file.slice(root.length + 1)}`);
    }
  }
}
if (failures) process.exit(1);
console.log('✓ Theme registry, CSS tokens, local imports and media files checked.');

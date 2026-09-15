import {readdirSync} from 'node:fs';
import {dirname, join, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';

export function discoverProjectTests(root) {
  const directory = join(root, 'test');
  return readdirSync(directory, {withFileTypes: true})
    .filter(entry => entry.isFile() && entry.name.endsWith('.test.mjs'))
    .map(entry => join(directory, entry.name)).sort();
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
  const files = discoverProjectTests(root);
  if (!files.length) throw new Error('No project tests found. Refusing recursive discovery.');
  const result = spawnSync(process.execPath, ['--test', ...files], {cwd: root, stdio: 'inherit'});
  if (result.error) throw result.error;
  process.exitCode = result.status ?? 1;
}

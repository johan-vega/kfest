import { readdirSync, readFileSync, statSync, unlinkSync } from 'node:fs';
import { dirname, extname, isAbsolute, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const publicRoot = join(root, 'public');
const imagePattern = /\.(png|jpe?g|webp|svg|gif|ico|avif)$/i;
const sourceExtensions = new Set(['.ts', '.html', '.css', '.scss', '.sass', '.less', '.json', '.svg']);
const posix = path => path.split(sep).join('/');

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : entry.isFile() ? [path] : [];
  });
}

const images = walk(publicRoot).filter(path => imagePattern.test(path));
const sources = walk(join(root, 'src')).filter(path => sourceExtensions.has(extname(path)))
  .map(path => ({ path, text: readFileSync(path, 'utf8') }));
// SVG files may themselves reference another local image.
sources.push(...images.filter(path => extname(path) === '.svg')
  .map(path => ({ path, text: readFileSync(path, 'utf8') })));
const allSource = sources.map(source => source.text).join('\n');

// Preserve complete directories used by concatenated template paths, e.g.
// 'images/carta/' + currentCatalogPage + '.png'. Do not mistake these for unused files.
const dynamicPrefixes = [...allSource.matchAll(/["'`](images\/[^"'`]*\/)["'`]\s*\+/g)]
  .map(match => match[1]);

const unused = images.filter(path => {
  const assetPath = posix(relative(publicRoot, path));
  return !sources.some(source => source.path !== path && source.text.includes(assetPath)) &&
    !dynamicPrefixes.some(prefix => assetPath.startsWith(prefix));
}).map(path => ({ path: posix(relative(root, path)), bytes: statSync(path).size }));

const knownPaths = new Set(images.map(path => posix(relative(publicRoot, path))));
const literalReferences = [...allSource.matchAll(/\bimages\/[^"'`\s<>]+?\.(?:png|jpe?g|webp|svg|gif|ico|avif)\b/gi)]
  .map(match => match[0]);
const missing = [...new Set(literalReferences)].filter(path => !knownPaths.has(path));

// Validate the actual dynamic catalog page list as well as preserving its directory.
const app = sources.find(source => source.path === join(root, 'src', 'app', 'app.ts'))?.text ?? '';
const pageList = app.match(/readonly catalogPageList:\s*number\[\]\s*=\s*\[([\d,\s]+)\]/)?.[1];
if (pageList) {
  for (const page of pageList.split(',').map(Number)) {
    const path = `images/carta/${page}.png`;
    if (!knownPaths.has(path)) missing.push(path);
  }
}

const shouldDelete = process.argv.includes('--delete');
if (shouldDelete && missing.length) throw new Error('Fix missing references before deleting assets');
if (shouldDelete) {
  // Validate the entire deletion set before changing any file. Only individual files
  // strictly inside this checkout's public directory can be removed.
  for (const image of unused) {
    const target = resolve(root, image.path);
    const withinPublic = relative(publicRoot, target);
    if (!withinPublic || withinPublic.startsWith('..') || isAbsolute(withinPublic)) {
      throw new Error(`Refusing to delete outside public: ${image.path}`);
    }
  }
  for (const image of unused) unlinkSync(resolve(root, image.path));
}

console.log(JSON.stringify({
  action: shouldDelete ? 'deleted' : 'audit',
  totalImages: images.length,
  unusedCount: unused.length,
  unusedBytes: unused.reduce((total, image) => total + image.bytes, 0),
  dynamicPrefixes: [...new Set(dynamicPrefixes)], missing, unused
}, null, 2));
if (missing.length || (process.argv.includes('--check') && unused.length)) process.exitCode = 1;

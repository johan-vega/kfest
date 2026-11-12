// Local preview only. Cloudflare serves the generated files; this is never deployed as a backend.
import { createServer } from 'node:http';
import { createReadStream, existsSync, readFileSync, statSync } from 'node:fs';
import { dirname, extname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../dist/kfest-web/browser');
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml', '.pdf': 'application/pdf', '.woff2': 'font/woff2' };
if (!existsSync(resolve(root, 'index.html'))) throw new Error('Ejecuta npm run build antes de npm run preview.');
const headerRules = [];
let rule;
for (const line of readFileSync(resolve(root, '_headers'), 'utf8').split(/\r?\n/)) {
  if (!line.trim() || line.trim().startsWith('#')) continue;
  if (!line.startsWith(' ')) {
    rule = { pattern: new RegExp('^' + line.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*') + '$'), headers: {} };
    headerRules.push(rule);
  } else {
    const colon = line.indexOf(':');
    if (rule && colon > 0) rule.headers[line.slice(0, colon).trim()] = line.slice(colon + 1).trim();
  }
}
const port = Number(process.env.PORT || 4301);
createServer((request, response) => {
  const path = new URL(request.url, 'http://localhost').pathname;
  let file;
  try { file = resolve(root, '.' + decodeURIComponent(path)); }
  catch { response.writeHead(400).end(); return; }
  if (relative(root, file).startsWith('..')) { response.writeHead(403).end(); return; }
  if (existsSync(file) && statSync(file).isDirectory()) file = resolve(file, 'index.html');
  const found = existsSync(file) && statSync(file).isFile() && !['/_headers', '/_redirects'].includes(path);
  if (!found) file = resolve(root, '404.html');
  response.statusCode = found ? 200 : 404;
  response.setHeader('Content-Type', types[extname(file)] || 'application/octet-stream');
  response.setHeader('Cache-Control', 'no-store'); // Always show the latest local build.
  for (const item of headerRules) {
    if (item.pattern.test(path)) {
      for (const [name, value] of Object.entries(item.headers)) {
        if (name.toLowerCase() !== 'cache-control') response.setHeader(name, value);
      }
    }
  }
  if (request.method === 'HEAD') response.end();
  else createReadStream(file).pipe(response);
}).listen(port, '127.0.0.1', () => console.log(`Vista estática: http://127.0.0.1:${port}`));

import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, extname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync, brotliCompressSync } from 'node:zlib';
import { JSDOM } from 'jsdom';
import { resolveSeoContext, SITE } from './seo-config.mjs';
import { imageDimensions } from './image-metadata.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
function filesIn(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry =>
    entry.isDirectory() ? filesIn(join(directory, entry.name)) : [join(directory, entry.name)]);
}

export function verifyStaticBuild(output = join(root, 'dist/kfest-web/browser'), context = resolveSeoContext()) {
  const html = readFileSync(join(output, 'index.html'), 'utf8');
  const dom = new JSDOM(html); // Parsing only; no scripts, browser state or remote resources run.
  const document = dom.window.document;
  const exactlyOne = selector => {
    const elements = document.querySelectorAll(selector);
    assert.equal(elements.length, 1, `Se esperaba una etiqueta: ${selector}`);
    return elements[0];
  };
  assert.equal(document.documentElement.lang, 'es');
  assert.equal(exactlyOne('title').textContent, SITE.title);
  assert.equal(exactlyOne('meta[name="description"]').getAttribute('content'), SITE.description);
  exactlyOne('meta[name="viewport"]');
  exactlyOne('link[rel="icon"]');
  exactlyOne('meta[property="og:title"]');
  exactlyOne('meta[property="og:description"]');
  exactlyOne('meta[name="twitter:card"]');
  exactlyOne('h1');
  assert.ok(document.querySelector('app-root')?.textContent.includes('Barista'));
  assert.ok(document.querySelector('app-root')?.hasAttribute('ngh'), 'Falta el marcado de hidratación Angular');
  assert.ok(!document.querySelector('#quiz'), 'No restaurar el módulo retirado');
  assert.ok(!document.querySelector('link[rel="alternate"][hreflang]'), 'No hay rutas separadas por idioma');
  for (const id of ['inicio', 'instagram', 'tiktok', 'carta', 'calculadora', 'utilkfest', 'contacto']) {
    assert.ok(document.getElementById(id), `Falta la sección ${id}`);
  }
  const canonical = document.querySelector('link[rel="canonical"]');
  assert.equal(document.querySelectorAll('link[rel="canonical"]').length, context.siteUrl ? 1 : 0);
  if (context.siteUrl) {
    assert.equal(canonical.getAttribute('href'), context.siteUrl);
    assert.equal(exactlyOne('meta[property="og:url"]').getAttribute('content'), context.siteUrl);
    assert.equal(exactlyOne('meta[property="og:image"]').getAttribute('content'), new URL(SITE.socialImage, context.siteUrl).href);
    exactlyOne('meta[name="twitter:image"]');
  } else {
    assert.equal(document.querySelectorAll('meta[property="og:url"], meta[property="og:image"], meta[name="twitter:image"]').length, 0);
  }
  const noindex = [...document.querySelectorAll('meta[name="robots"]')].some(meta => /noindex/i.test(meta.content));
  assert.equal(noindex, context.preview, 'Noindex solo corresponde a previews');
  assert.ok(document.querySelectorAll('meta[name="google-site-verification"]').length <= 1);
  if (context.verification) assert.equal(exactlyOne('meta[name="google-site-verification"]').content, context.verification);
  const business = JSON.parse(exactlyOne('script[type="application/ld+json"]').textContent);
  assert.equal(business['@type'], 'CafeOrCoffeeShop');
  assert.equal(business.name, SITE.name);
  assert.equal(business.url ?? null, context.siteUrl);
  assert.equal(business.email, SITE.email);
  assert.deepEqual(business.address, SITE.address);
  assert.equal(business.openingHours, SITE.openingHours);
  for (const property of ['aggregateRating', 'review', 'geo']) assert.ok(!(property in business));

  const localPath = (value, base = output) => {
    if (!value || /^(?:https?:|data:|blob:|mailto:|tel:|#|\/\/)/i.test(value)) return null;
    const pathname = decodeURIComponent(value.split(/[?#]/)[0]);
    const file = resolve(pathname.startsWith('/') ? output : base, pathname.replace(/^\//, ''));
    assert.ok(!relative(output, file).startsWith('..'), `Recurso fuera del sitio: ${value}`);
    assert.ok(existsSync(file), `Recurso inexistente: ${value}`);
    return file;
  };
  for (const element of document.querySelectorAll('img[src], script[src], link[rel="stylesheet"], link[rel="icon"]')) {
    const file = localPath(element.getAttribute('src') || element.getAttribute('href'));
    if (element.tagName === 'IMG') {
      assert.ok(element.hasAttribute('alt'), 'Imagen sin ALT');
      assert.ok(element.getAttribute('alt')?.trim() || element.getAttribute('aria-hidden') === 'true', 'ALT vacío sin intención decorativa');
      if (file) {
        const size = imageDimensions(readFileSync(file), extname(file));
        if (size) {
          assert.ok(Number(element.getAttribute('width')) > 0 && Number(element.getAttribute('height')) > 0, 'Faltan dimensiones de imagen');
        }
      }
    }
  }
  for (const link of document.querySelectorAll('a[href]')) {
    const href = link.getAttribute('href');
    if (href?.startsWith('#') && href.length > 1) assert.ok(document.getElementById(href.slice(1)), `Ancla rota: ${href}`);
    else localPath(href);
    if (link.target === '_blank') assert.ok(link.rel.includes('noopener'), 'Enlace externo sin noopener');
  }
  const files = filesIn(output);
  assert.ok(files.length < 20000, 'Límite de archivos del plan Free');
  for (const file of files) {
    assert.ok(statSync(file).size <= 25 * 1024 * 1024, `Recurso mayor de 25 MiB: ${file}`);
    if (extname(file) === '.css') {
      for (const match of readFileSync(file, 'utf8').matchAll(/url\(\s*["']?([^\s"')]+)["']?\s*\)/g)) localPath(match[1], dirname(file));
    }
  }
  assert.ok(!existsSync(join(output, '_worker.js')), 'Pages debe ser estático, sin Worker');
  assert.ok(!existsSync(join(output, '../server/server.mjs')), 'No debe requerirse un servidor de producción');
  for (const path of ['404.html', '_headers', 'robots.txt', 'carta_kfest.pdf', SITE.logo, SITE.socialImage]) {
    assert.ok(existsSync(join(output, path)), `Falta ${path}`);
  }
  const robots = readFileSync(join(output, 'robots.txt'), 'utf8');
  assert.ok(robots.includes('Allow: /') && !robots.includes('Disallow: /'));
  const headers = readFileSync(join(output, '_headers'), 'utf8');
  assert.equal(headers.includes('X-Robots-Tag: noindex'), context.preview);
  if (context.siteUrl && !context.preview) {
    const sitemap = readFileSync(join(output, 'sitemap.xml'), 'utf8');
    const xml = new JSDOM(sitemap, { contentType: 'application/xml' });
    assert.equal(xml.window.document.querySelectorAll('url').length, 1);
    assert.equal(xml.window.document.querySelector('loc').textContent, context.siteUrl);
    assert.ok(!sitemap.includes('<lastmod>') && !sitemap.includes('#'));
    assert.ok(robots.includes(`Sitemap: ${context.siteUrl}sitemap.xml`));
    xml.window.close();
  } else {
    assert.ok(!existsSync(join(output, 'sitemap.xml')));
    assert.ok(!robots.includes('Sitemap:'));
  }
  // Google HTML ownership files must survive the build byte for byte.
  for (const path of readdirSync(join(root, 'public')).filter(name => /^google.*\.html$/.test(name))) {
    assert.ok(readFileSync(join(root, 'public', path)).equals(readFileSync(join(output, path))), `Verificación de Google alterada: ${path}`);
  }
  const jsCss = files.filter(file => ['.js', '.css'].includes(extname(file)));
  const payload = Buffer.concat(jsCss.map(file => readFileSync(file)));
  console.log(JSON.stringify({
    staticChecks: 'passed', publicFiles: files.length,
    jsCssBytes: payload.length, gzipEstimateBytes: gzipSync(payload).length,
    brotliEstimateBytes: brotliCompressSync(payload).length,
    htmlHasUsefulContent: true, hydration: true,
    largestAssetBytes: Math.max(...files.map(file => statSync(file).size)),
    canonicalConfigured: !!context.siteUrl, preview: context.preview
  }, null, 2));
  dom.window.close();
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  if (existsSync(join(root, '.env.local'))) process.loadEnvFile(join(root, '.env.local'));
  verifyStaticBuild();
}

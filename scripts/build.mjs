import { existsSync, readFileSync, writeFileSync, unlinkSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { dirname, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { resolveSeoContext, renderSeo, sitemapXml, robotsTxt, pagesHeaders, SITE } from './seo-config.mjs';
import { imageDimensions } from './image-metadata.mjs';
import { verifyStaticBuild } from './verify-static-build.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
if (existsSync(join(root, '.env.local'))) process.loadEnvFile(join(root, '.env.local'));
const context = resolveSeoContext(); // Fail ambiguous deployment settings before doing the build.
const cli = join(root, 'node_modules/@angular/cli/bin/ng.js');
const build = spawnSync(process.execPath, [cli, 'build', ...process.argv.slice(2)], {
  cwd: root, env: process.env, stdio: 'inherit', windowsHide: true
});
if (build.error) throw build.error;
if (build.status !== 0) process.exit(build.status ?? 1);

const output = join(root, 'dist/kfest-web/browser');
const indexPath = join(output, 'index.html');
if (!existsSync(indexPath)) throw new Error('No existe dist/kfest-web/browser/index.html. Revisa outputPath.');
const socialImage = join(output, SITE.socialImage);
let html = renderSeo(readFileSync(indexPath, 'utf8'), context,
  imageDimensions(readFileSync(socialImage), extname(socialImage)));
// Add intrinsic dimensions to existing prerendered images without changing the photo,
// layout CSS, lazy-loading behaviour or Angular hydration comment markers.
html = html.replace(/<img\b[^>]*>/gi, tag => {
  const src = tag.match(/\bsrc="([^"]+)"/)?.[1];
  if (!src?.startsWith('images/')) return tag;
  const path = join(output, src);
  if (!existsSync(path)) return tag; // The verifier reports missing assets with context.
  const dimensions = imageDimensions(readFileSync(path), extname(path));
  if (!dimensions) return tag;
  let attributes = '';
  if (!/\bwidth=/.test(tag)) attributes += ` width="${dimensions.width}"`;
  if (!/\bheight=/.test(tag)) attributes += ` height="${dimensions.height}"`;
  return tag.replace(/\s*\/?\s*>$/, `${attributes}>`);
});
writeFileSync(indexPath, html);
writeFileSync(join(output, 'robots.txt'), robotsTxt(context));
writeFileSync(join(output, '_headers'), pagesHeaders(readFileSync(join(root, 'public/_headers'), 'utf8'), context));
const sitemap = sitemapXml(context);
if (sitemap) writeFileSync(join(output, 'sitemap.xml'), sitemap);
else if (existsSync(join(output, 'sitemap.xml'))) unlinkSync(join(output, 'sitemap.xml'));

verifyStaticBuild(output, context);
console.log(`\nPages: ${output}\nEntorno: ${context.preview ? 'preview (noindex)' : 'producción/local'}`);
console.log(context.siteUrl ? `Canonical: ${context.siteUrl}` : 'SITE_URL pendiente: se omiten canonical, imagen social absoluta y sitemap; no se publican URLs ficticias.');

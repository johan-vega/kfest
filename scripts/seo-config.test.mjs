import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { JSDOM } from 'jsdom';
import { publicOrigin, resolveSeoContext, renderSeo, structuredData, sitemapXml, robotsTxt, pagesHeaders } from './seo-config.mjs';
import { imageDimensions } from './image-metadata.mjs';

// These origins are isolated test fixtures, never defaults or published configuration.
const origin = 'https://seo-unit-fixture.pages.dev/';
const cloudflare = { CF_PAGES: '1', PRODUCTION_BRANCH: 'andre', CF_PAGES_BRANCH: 'andre',
  CF_PAGES_URL: 'https://a1b2c3d4.seo-unit-fixture.pages.dev' };
const html = '<!doctype html><html lang="es"><head><title>Kfest</title></head><body><app-root>Texto prerenderizado<!--ngh--></app-root></body></html>';

test('normalizes a real-shaped HTTPS origin and rejects local, placeholder and preview URLs', () => {
  assert.equal(publicOrigin(origin.slice(0, -1)), origin);
  for (const value of ['http://localhost:4200', 'https://localhost/', 'https://127.0.0.1/',
    'https://example.com', 'https://demo.example.org/', 'https://kfest.test/',
    `${origin}en`, `${origin}?preview=1`, `${origin}#carta`,
    'https://user:password@seo-unit-fixture.pages.dev/', cloudflare.CF_PAGES_URL]) {
    assert.throws(() => publicOrigin(value), undefined, value);
  }
});

test('leaves URL-dependent SEO absent when no production URL is known', () => {
  const context = resolveSeoContext({});
  assert.equal(context.siteUrl, null);
  const dom = new JSDOM(renderSeo(html, context));
  assert.equal(dom.window.document.querySelector('link[rel="canonical"]'), null);
  assert.equal(dom.window.document.querySelector('meta[property="og:image"]'), null);
  assert.equal(dom.window.document.querySelector('meta[name="robots"]'), null);
  assert.equal(sitemapXml(context), null);
  assert.ok(!robotsTxt(context).includes('Sitemap:'));
  assert.equal(structuredData(context).url, undefined);
  dom.window.close();
});

test('derives the stable Pages origin only from an explicitly identified production branch', () => {
  assert.equal(resolveSeoContext(cloudflare).siteUrl, origin);
  assert.equal(resolveSeoContext({ ...cloudflare, CF_PAGES_URL: origin }).siteUrl, origin);
  assert.equal(resolveSeoContext({ ...cloudflare, CF_PAGES_BRANCH: 'feature' }).siteUrl, null);
  assert.throws(() => resolveSeoContext({ ...cloudflare, PRODUCTION_BRANCH: '' }));
  assert.throws(() => resolveSeoContext({ ...cloudflare, CF_PAGES_BRANCH: '' }));
});

test('explicit production canonical remains stable across preview deployments', () => {
  const context = resolveSeoContext({ ...cloudflare, SITE_URL: origin, CF_PAGES_BRANCH: 'feature' });
  assert.equal(context.siteUrl, origin);
  assert.equal(context.preview, true);
  const dom = new JSDOM(renderSeo(html, context));
  assert.equal(dom.window.document.querySelector('link[rel="canonical"]').href, origin);
  assert.equal(dom.window.document.querySelector('meta[name="robots"]').content, 'noindex, follow');
  assert.equal(sitemapXml(context), null);
  assert.ok(pagesHeaders('/*\r\n  Referrer-Policy: strict-origin-when-cross-origin\r\n', context).includes('X-Robots-Tag: noindex'));
  dom.window.close();
});

test('production remains indexable and the sitemap has exactly the home URL without invented dates', () => {
  const context = resolveSeoContext({ SITE_URL: origin });
  const document = new JSDOM(renderSeo(html, context)).window.document;
  assert.equal(document.querySelector('meta[name="robots"]'), null);
  const xml = new JSDOM(sitemapXml(context), { contentType: 'application/xml' });
  assert.equal(xml.window.document.querySelectorAll('url').length, 1);
  assert.equal(xml.window.document.querySelector('loc').textContent, origin);
  assert.ok(!sitemapXml(context).includes('lastmod'));
  assert.ok(!sitemapXml(context).includes('#'));
  assert.ok(robotsTxt(context).includes(`Sitemap: ${origin}sitemap.xml`));
  assert.ok(!pagesHeaders('/*\n', context).includes('noindex'));
  xml.window.close();
});

test('SEO rendering is idempotent, keeps body markers and never adds fake language routes', () => {
  const context = resolveSeoContext({ SITE_URL: origin });
  const once = renderSeo(html, context);
  const twice = renderSeo(once, context);
  const document = new JSDOM(twice).window.document;
  assert.equal(document.querySelectorAll('link[rel="canonical"]').length, 1);
  assert.equal(document.querySelectorAll('script[type="application/ld+json"]').length, 1);
  assert.equal(document.querySelector('link[hreflang]'), null);
  assert.ok(twice.includes('<!--ngh-->'));
  assert.ok(twice.includes('Texto prerenderizado'));
});

test('accepts an exact Google token, omits it otherwise and detects duplicate tags', () => {
  const context = resolveSeoContext({ GOOGLE_SITE_VERIFICATION: 'unit-test-only-token' });
  const document = new JSDOM(renderSeo(html, context)).window.document;
  assert.equal(document.querySelector('meta[name="google-site-verification"]').content, 'unit-test-only-token');
  assert.throws(() => resolveSeoContext({ GOOGLE_SITE_VERIFICATION: '<meta name="google-site-verification">' }));
  assert.throws(() => renderSeo(html.replace('</head>', '<meta name="google-site-verification" content="other"></head>'), context));
  assert.throws(() => renderSeo(html.replace('</head>', `<link rel="canonical" href="${origin}"></head>`), context));
});

test('JSON-LD uses public facts and absolute URLs without invented business details', () => {
  const context = resolveSeoContext({ SITE_URL: origin });
  const data = structuredData(context);
  assert.equal(data['@type'], 'CafeOrCoffeeShop');
  assert.equal(data.telephone, '+51918422677');
  assert.equal(data.hasMenu, `${origin}carta_kfest.pdf`);
  assert.equal(data.email, 'fundostateresitaperu@gmail.com');
  assert.deepEqual(data.address, {
    '@type': 'PostalAddress', streetAddress: 'Jr. Pancho Fierro 3547',
    addressLocality: 'Los Olivos', addressRegion: 'Lima', addressCountry: 'PE'
  });
  assert.equal(data.openingHours, 'Mo-Sa 07:30-20:00');
  for (const field of ['aggregateRating', 'review', 'geo']) assert.equal(data[field], undefined);
  assert.equal(JSON.parse(JSON.stringify(data)).name, 'Kfest');
});

test('reads the existing social image dimensions and rejects HEIC disguised as PNG', () => {
  const hero = readFileSync(new URL('../public/images/New-Hero.jpg', import.meta.url));
  assert.deepEqual(imageDimensions(hero, '.jpg'), { width: 1500, height: 844 });
  const soap = readFileSync(new URL('../public/images/jabon_cafe.png', import.meta.url));
  assert.deepEqual(imageDimensions(soap, '.png'), { width: 900, height: 1200 });
  assert.throws(() => imageDimensions(Buffer.from('ftypheic-not-a-png-file-contents'), '.png'));
});

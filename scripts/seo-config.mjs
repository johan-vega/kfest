import { isIP } from 'node:net';

export const SITE = {
  name: 'Kfest',
  title: 'Kfest | Café de Especialidad Peruano',
  description: 'Descubre Kfest, café de especialidad del Fundo Santa Teresita en Chanchamayo, Perú. Conoce nuestros cafés, métodos de preparación y carta.',
  logo: 'images/logo_marron.png',
  socialImage: 'images/New-Hero.jpg',
  socialImageAlt: 'Doña Teresa Chávez, Kfest · Café de Especialidad',
  // Public number already used by WhatsApp in the local application.
  telephone: '+51918422677',
  // Footer contact details explicitly confirmed by the owner.
  email: 'fundostateresitaperu@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Jr. Pancho Fierro 3547',
    addressLocality: 'Los Olivos',
    addressRegion: 'Lima',
    addressCountry: 'PE'
  },
  openingHours: 'Mo-Sa 07:30-20:00',
  sameAs: [
    'https://www.facebook.com/CafeKfest',
    'https://www.instagram.com/kfest.peru/',
    'https://www.tiktok.com/@kfest.peru',
    'https://www.youtube.com/@kfest-cafedeespecialidad325/videos'
  ]
};

export function publicOrigin(value, allowDeploymentHost = false) {
  const url = new URL(value);
  const host = url.hostname.toLowerCase();
  if (url.protocol !== 'https:' || url.username || url.password || url.port ||
      url.pathname !== '/' || url.search || url.hash || !host.includes('.') || isIP(host) ||
      /(^|\.)(localhost|example\.(com|org|net))$/.test(host) ||
      /\.(test|invalid|example|localhost|local)$/.test(host)) {
    throw new Error('SITE_URL debe ser el origen HTTPS público real, sin ruta, puerto, consulta ni fragmento.');
  }
  if (host.endsWith('.pages.dev') && host.split('.').length !== 3 && !allowDeploymentHost) {
    throw new Error('SITE_URL debe usar el dominio estable del proyecto, nunca una URL de preview/deployment de Pages.');
  }
  return url.origin + '/';
}

export function resolveSeoContext(env = process.env) {
  const cloudflare = env.CF_PAGES === '1';
  const productionBranch = env.PRODUCTION_BRANCH?.trim();
  if (cloudflare && (!productionBranch || !env.CF_PAGES_BRANCH?.trim())) {
    throw new Error('Configura PRODUCTION_BRANCH en Pages para distinguir producción de previews; CF_PAGES_BRANCH debe estar disponible.');
  }
  const preview = cloudflare && env.CF_PAGES_BRANCH !== productionBranch;
  let siteUrl = env.SITE_URL?.trim() ? publicOrigin(env.SITE_URL.trim()) : null;
  if (!siteUrl && cloudflare && !preview && env.CF_PAGES_URL) {
    const deployment = new URL(publicOrigin(env.CF_PAGES_URL, true));
    const labels = deployment.hostname.split('.');
    if (!deployment.hostname.endsWith('.pages.dev') || ![3, 4].includes(labels.length)) {
      throw new Error('CF_PAGES_URL no identifica un proyecto Pages válido. Configura SITE_URL explícitamente.');
    }
    // CF_PAGES_URL may be an immutable deployment URL even on production builds.
    // Only a verified production branch may derive the stable project origin.
    siteUrl = publicOrigin(`https://${labels.slice(-3).join('.')}/`);
  }
  const verification = env.GOOGLE_SITE_VERIFICATION?.trim() || null;
  if (verification && !/^[A-Za-z0-9_-]{1,256}$/.test(verification)) {
    throw new Error('GOOGLE_SITE_VERIFICATION debe contener solo el token exacto, no la etiqueta HTML completa.');
  }
  return { siteUrl, preview, verification };
}

const escape = value => String(value).replace(/[&<>"']/g, c => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[c]));

export function structuredData(context) {
  const data = {
    '@context': 'https://schema.org', '@type': 'CafeOrCoffeeShop',
    name: SITE.name, description: SITE.description,
    telephone: SITE.telephone, email: SITE.email,
    address: { ...SITE.address }, openingHours: SITE.openingHours,
    sameAs: SITE.sameAs
  };
  if (context.siteUrl) Object.assign(data, {
    '@id': `${context.siteUrl}#cafe`, url: context.siteUrl,
    logo: new URL(SITE.logo, context.siteUrl).href,
    image: new URL(SITE.socialImage, context.siteUrl).href,
    hasMenu: new URL('carta_kfest.pdf', context.siteUrl).href
  });
  // No inferred ratings, certifications or coordinates; contact details are confirmed.
  return data;
}

export function renderSeo(html, context, socialImageSize = null) {
  let result = html.replace(/\n?<!-- kfest-seo:start -->[\s\S]*?<!-- kfest-seo:end -->\n?/g, '\n');
  if (/<link\b[^>]*rel=["']canonical["']/i.test(result)) throw new Error('Canonical duplicada: utiliza SITE_URL, no otra etiqueta manual.');
  const tags = [];
  if (context.siteUrl) {
    const url = escape(context.siteUrl);
    const image = escape(new URL(SITE.socialImage, context.siteUrl).href);
    tags.push(`<link rel="canonical" href="${url}">`,
      `<meta property="og:url" content="${url}">`,
      `<meta property="og:image" content="${image}">`,
      '<meta property="og:image:type" content="image/jpeg">',
      `<meta property="og:image:alt" content="${escape(SITE.socialImageAlt)}">`,
      `<meta name="twitter:image" content="${image}">`,
      `<meta name="twitter:image:alt" content="${escape(SITE.socialImageAlt)}">`);
    if (socialImageSize) tags.push(
      `<meta property="og:image:width" content="${socialImageSize.width}">`,
      `<meta property="og:image:height" content="${socialImageSize.height}">`);
  }
  if (context.preview) tags.push('<meta name="robots" content="noindex, follow">');
  if (context.verification) {
    if (/name=["']google-site-verification["']/i.test(result)) throw new Error('Verificación duplicada: usa el token por variable o la etiqueta manual, no ambos.');
    tags.push(`<meta name="google-site-verification" content="${escape(context.verification)}">`);
  }
  const json = JSON.stringify(structuredData(context)).replace(/</g, '\\u003c');
  tags.push(`<script type="application/ld+json" id="kfest-business">${json}</script>`);
  if (!result.includes('</head>')) throw new Error('HTML sin head: build incompleto.');
  return result.replace('</head>', `<!-- kfest-seo:start -->\n${tags.join('\n')}\n<!-- kfest-seo:end -->\n</head>`);
}

export function sitemapXml(context) {
  if (!context.siteUrl || context.preview) return null;
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${escape(context.siteUrl)}</loc></url></urlset>\n`;
}

export function robotsTxt(context) {
  return 'User-agent: *\nAllow: /\n' +
    (context.siteUrl && !context.preview ? `\nSitemap: ${new URL('sitemap.xml', context.siteUrl).href}\n` : '');
}

export function pagesHeaders(source, context) {
  source = source.replace(/\r\n/g, '\n');
  return context.preview ? source.replace('/*\n', '/*\n  X-Robots-Tag: noindex\n') : source;
}

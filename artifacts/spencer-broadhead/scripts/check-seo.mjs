import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { canonicalUrl, siteUrl, socialImage, pages } from '../seo.mjs';

const output = new URL('../dist/public/', import.meta.url);
const robots = await readFile(new URL('robots.txt', output), 'utf8');
const sitemap = await readFile(new URL('sitemap.xml', output), 'utf8');
assert.ok(robots.includes(`Sitemap: ${canonicalUrl}sitemap.xml`));
assert.ok(!/noindex/i.test(robots));
const documents = new Map();
const titles = new Set();
const descriptions = new Set();

for (const page of pages) {
  const filename = page.path === '/' ? 'index.html' : `${page.path.slice(1)}.html`;
  const html = await readFile(new URL(filename, output), 'utf8');
  documents.set(page.path, html);
  const url = `${siteUrl}${page.path}`;
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1, `One h1 on ${page.path}`);
  assert.match(html, /<main\b[^>]*>[\s\S]+<\/main>/, `Real pre-rendered content on ${page.path}`);
  assert.match(html, /lang="en-GB"/);
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1];
  assert.ok(title && !titles.has(title), `Unique title on ${page.path}`);
  assert.ok(description && !descriptions.has(description), `Unique description on ${page.path}`);
  titles.add(title);
  descriptions.add(description);
  assert.ok(html.includes(`rel="canonical" href="${url}"`), `Canonical on ${page.path}`);
  assert.ok(html.includes(`property="og:url" content="${url}"`));
  assert.ok(html.includes(`property="og:image" content="${socialImage}"`));
  assert.ok(sitemap.includes(`<loc>${url}</loc>`));
  assert.ok(!/noindex/i.test(html), `Indexable ${page.path}`);
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    .map(match => JSON.parse(match[1]));
  const business = schemas.find(schema => schema['@type'] === 'AutoRepair');
  assert.equal(business?.telephone, '+441924373675');
  assert.equal(business?.address.postalCode, 'WF1 1DR');
  if (page.path !== '/') assert.ok(schemas.some(schema => schema['@type'] === 'BreadcrumbList'));
  for (const [tag] of html.matchAll(/<img\b[^>]*>/g)) {
    for (const attr of ['alt', 'width', 'height']) assert.match(tag, new RegExp(`\\b${attr}="`));
  }
}

for (const [pathname, html] of documents) {
  for (const [, href] of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)) {
    if (/^(https?:|mailto:|tel:)/.test(href)) continue;
    const target = new URL(href.replace(/&amp;/g, '&'), `${siteUrl}${pathname}`);
    const route = target.pathname.replace(/\/+$/, '') || '/';
    if (route.startsWith('/images/')) {
      const asset = await stat(new URL(`.${route}`, output));
      assert.ok(asset.isFile() && asset.size > 0, `${pathname} links to a real image: ${href}`);
      continue;
    }
    const destination = documents.get(route);
    assert.ok(destination, `${pathname} links to a generated page: ${href}`);
    if (target.hash) {
      assert.ok(destination.includes(`id="${decodeURIComponent(target.hash.slice(1))}"`),
        `${pathname} links to a real anchor: ${href}`);
    }
  }
}
const notFound = await readFile(new URL('404.html', output), 'utf8');
assert.match(notFound, /name="robots" content="noindex, follow"/);
assert.equal((notFound.match(/<h1\b/g) ?? []).length, 1);
assert.ok(!sitemap.includes('/404'));
console.info(`SEO checks passed for ${pages.length} distinct pages: static content, unique metadata, schema, sitemap, images and all internal links.`);

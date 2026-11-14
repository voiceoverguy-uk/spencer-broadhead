import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { canonicalUrl, socialImage } from '../seo.mjs';

const output = new URL('../dist/public/', import.meta.url);
const html = await readFile(new URL('index.html', output), 'utf8');
const robots = await readFile(new URL('robots.txt', output), 'utf8');
const sitemap = await readFile(new URL('sitemap.xml', output), 'utf8');

assert.equal((html.match(/<h1\b/g) ?? []).length, 1, 'One main heading');
assert.match(html, /<main>[\s\S]+MOT[\s\S]+George Street[\s\S]+<\/main>/, 'Real content is pre-rendered');
assert.match(html, /lang="en-GB"/);
assert.match(html, /<title>[^<]*Wakefield[^<]*<\/title>/);
assert.match(html, /<meta name="description" content="[^"]+"/);
assert.ok(html.includes(`rel="canonical" href="${canonicalUrl}"`));
assert.ok(html.includes(`property="og:image" content="${socialImage}"`));
assert.ok(robots.includes(`Sitemap: ${canonicalUrl}sitemap.xml`));
assert.ok(sitemap.includes(`<loc>${canonicalUrl}</loc>`));
assert.ok(!/noindex/i.test(html + robots), 'Production page is indexable');

const schemaText = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];
assert.ok(schemaText, 'Static structured data');
const schema = JSON.parse(schemaText);
assert.equal(schema['@type'], 'AutoRepair');
assert.equal(schema.address.postalCode, 'WF1 1DR');
assert.equal(schema.telephone, '+441924373675');
assert.equal(schema.url, canonicalUrl);

const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]));
for (const [, anchor] of html.matchAll(/href="#([^"]+)"/g)) {
  assert.ok(ids.has(anchor), `Anchor #${anchor} exists`);
}
for (const [tag] of html.matchAll(/<img\b[^>]*>/g)) {
  assert.match(tag, /\balt=/, 'Every image has alternative text or is marked decorative');
  assert.match(tag, /\bwidth="/, 'Image has width');
  assert.match(tag, /\bheight="/, 'Image has height');
}
console.info('SEO checks passed: pre-rendered content, headings, metadata, local schema, sitemap, robots, images and anchors.');

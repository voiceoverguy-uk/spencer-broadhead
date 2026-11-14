import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';
import react from '@vitejs/plugin-react';
import { canonicalUrl } from '../seo.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
// Only compile React for rendering: no development overlays or listening server.
const server = await createServer({
  configFile: false,
  root,
  base: '/',
  appType: 'custom',
  plugins: [react()],
  resolve: { alias: { '@': path.join(root, 'src') }, dedupe: ['react', 'react-dom'] },
  server: { middlewareMode: true, watch: null },
});

try {
  const { render } = await server.ssrLoadModule('/src/entry-server.tsx');
  const markup = render();
  const htmlPath = path.join(root, 'dist/public/index.html');
  const html = await readFile(htmlPath, 'utf8');
  const mount = '<div id="root"></div>';
  if (!html.includes(mount) || !markup.includes('<main>')) {
    throw new Error('Cannot pre-render the garage page: missing mount or page content.');
  }
  await writeFile(htmlPath, html.replace(mount, () => `<div id="root">${markup}</div>`));
  await writeFile(path.join(root, 'dist/public/sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${canonicalUrl}</loc></url></urlset>\n`);
  await writeFile(path.join(root, 'dist/public/robots.txt'),
    `User-agent: *\nAllow: /\nSitemap: ${canonicalUrl}sitemap.xml\n`);
  console.info('Pre-rendered homepage, sitemap and robots.txt for Vercel.');
} finally {
  await server.close();
}

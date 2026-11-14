import path from 'path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

import runtimeErrorOverlay from '@replit/vite-plugin-runtime-error-modal';
// @ts-ignore Plain JS shares SEO configuration with the static HTML generator.
import { canonicalUrl, description, garageSchema, socialImage, title } from './seo.mjs';

// Static production builds (including Vercel) do not need a listening port.
const isBuild = process.argv.includes('build');
const port = Number(process.env.PORT ?? (isBuild ? 5173 : 0));

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${port}"`);
}

const basePath = process.env.BASE_PATH ?? (isBuild ? '/' : undefined);

if (!basePath) {
  throw new Error(
    'BASE_PATH environment variable is required but was not provided.',
  );
}

export default defineConfig({
  base: basePath,
  plugins: [
    {
      name: 'garage-seo',
      transformIndexHtml() {
        return [
          { tag: 'title', children: title, injectTo: 'head' },
          { tag: 'meta', attrs: { name: 'description', content: description }, injectTo: 'head' },
          { tag: 'link', attrs: { rel: 'canonical', href: canonicalUrl }, injectTo: 'head' },
          ...[
            ['og:title', title], ['og:description', description],
            ['og:url', canonicalUrl], ['og:image', socialImage],
            ['og:image:alt', 'Spencer & Broadhead garage on George Street, Wakefield'],
            ['og:site_name', 'Spencer & Broadhead'],
          ].map(([property, content]) => ({ tag: 'meta', attrs: { property, content }, injectTo: 'head' as const })),
          ...[
            ['twitter:title', title], ['twitter:description', description], ['twitter:image', socialImage],
          ].map(([name, content]) => ({ tag: 'meta', attrs: { name, content }, injectTo: 'head' as const })),
          { tag: 'script', attrs: { type: 'application/ld+json' }, children: JSON.stringify(garageSchema).replace(/</g, '\\u003c'), injectTo: 'head' },
        ];
      },
    },
    react(),
    tailwindcss(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== 'production' &&
    process.env.REPL_ID !== undefined
      ? [
          await import('@replit/vite-plugin-cartographer').then((m) =>
            m.cartographer({
              root: path.resolve(import.meta.dirname, '..'),
            }),
          ),
          await import('@replit/vite-plugin-dev-banner').then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
      '@assets': path.resolve(
        import.meta.dirname,
        '..',
        '..',
        'attached_assets',
      ),
    },
    dedupe: ['react', 'react-dom'],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, 'dist/public'),
    emptyOutDir: true,
  },
  server: {
    // Keep the development preview out of search results.
    headers: { 'X-Robots-Tag': 'noindex, nofollow' },
    port,
    strictPort: true,
    host: '0.0.0.0',
    allowedHosts: true,
    fs: {
      strict: true,
    },
  },
  preview: {
    port,
    host: '0.0.0.0',
    allowedHosts: true,
  },
});

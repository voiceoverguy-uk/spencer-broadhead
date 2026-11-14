import path from 'path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

import runtimeErrorOverlay from '@replit/vite-plugin-runtime-error-modal';
// @ts-ignore Plain JS shares SEO configuration with the static HTML generator.
import { withPageSeo } from './seo.mjs';

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
      transformIndexHtml(html, context) {
        let pathname = (context.originalUrl ?? '/').split('?')[0];
        const prefix = basePath.replace(/\/$/, '');
        if (prefix && pathname.startsWith(`${prefix}/`)) pathname = pathname.slice(prefix.length);
        return withPageSeo(html, pathname);
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

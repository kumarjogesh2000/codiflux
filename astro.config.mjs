// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
  // Production URL — required for sitemap generation and canonical URLs
  site: 'https://codiflux.dev',

  integrations: [
    react(),
    sitemap(),
  ],

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        // @/ → src/ — mirrors the tsconfig.json path alias
        '@': path.resolve(__dirname, './src'),
      },
    },
  },
});
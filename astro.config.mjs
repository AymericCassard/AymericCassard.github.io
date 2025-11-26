// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://aymericcassard.github.io/',
  // Only use base path in production (GitHub Pages)
  base: process.env.NODE_ENV === 'production' ? '/AymericCassard.github.io' : '/',
  integrations: [sitemap()],
  markdown: {
    shikiConfig: {
      theme: 'css-variables',
      langs: [],
      wrap: true,
    },
  },
});

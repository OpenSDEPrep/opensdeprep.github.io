// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  // Update to your final domain. For a GitHub *project* page
  // (e.g. opensdeprep.github.io/prep) also set `base: '/prep'`.
  site: 'https://opensdeprep.github.io',
  // base: '/prep',
  integrations: [mdx()],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: false,
    },
  },
});

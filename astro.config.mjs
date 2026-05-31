// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  // Served at the org root (repo is named opensdeprep.github.io), so base is '/'.
  // Internal links still go through href() in src/lib/url.ts, so switching to a
  // sub-path (project page) later only needs `base` set here.
  site: 'https://opensdeprep.github.io',
  integrations: [mdx()],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: false,
    },
  },
});

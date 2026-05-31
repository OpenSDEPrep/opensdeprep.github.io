// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  // Published at https://opensdeprep.github.io/site/ (project page), so the app
  // is served under the `/site` base. Internal links go through href() in
  // src/lib/url.ts. To move to a custom domain / root, set base: '/' (or remove)
  // and update `site` — the helper handles both.
  site: 'https://opensdeprep.github.io',
  base: '/site',
  integrations: [mdx()],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: false,
    },
  },
});

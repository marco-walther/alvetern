// @ts-check
import { defineConfig } from 'astro/config';

// Static output (default) builds to ./dist — exactly what Cloudflare Pages serves.
// When you attach a custom domain in Cloudflare, set `site` to that URL so
// canonical links and sitemaps use it.
export default defineConfig({
  site: 'https://alvetern.com',
  output: 'static',
});

import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://swiftandai.com', // <--- IMPORTANTE: Tu dominio aquí
  integrations: [sitemap()],
});
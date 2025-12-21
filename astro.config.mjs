import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  // Usamos la integración oficial de Astro para Tailwind
  integrations: [tailwind()],
});
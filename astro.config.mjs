import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  // Integra Tailwind para el diseño
  integrations: [tailwind()],
  // Configura el renderizado de Markdown
  markdown: {
    shikiConfig: {
      // El tema 'github-dark' es el que más se parece a Xcode oscuro
      theme: 'github-dark',
      // Forzamos la carga de Swift para que reconozca la sintaxis
      langs: ['swift', 'bash', 'json'],
    },
  },
});
# CLAUDE.md

## Project Overview
Blog técnico personal sobre Swift, iOS y AI Systems Engineering.
Astro + TypeScript + Tailwind CSS. Deploy en Cloudflare Pages.
NO es una app — es un blog estático generado.

## Stack
- Framework: Astro
- Estilos: Tailwind CSS
- Contenido: MDX en src/pages/blog/
- Imágenes: /public/images/posts/
- Deploy: Cloudflare Pages (git push = deploy automático)

## Estructura clave
- src/pages/index.astro — home
- src/pages/about.astro — sobre mí
- src/pages/blog/ — artículos en markdown
- src/layouts/PostLayout.astro — layout de cada artículo
- src/components/ — componentes reutilizables

## Comandos
npm run dev       # desarrollo local
npm run build     # build de producción
npm run preview   # preview del build

## Reglas
- No modificar artículos existentes en src/pages/blog/
- No cambiar el frontmatter de los posts
- Mantener dark mode como identidad principal
- No añadir dependencias sin preguntar

## Current Focus
Rediseño completo de la home — ver brief en conversación activa.
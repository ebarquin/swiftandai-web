---
layout: ../../layouts/PostLayout.astro
title: "Las 5 APIs que Apple debería presentar para que los desarrolladores iOS adopten la IA de verdad"
date: "2026-06-07"
description: "Antes de la WWDC 2026, estas son las cinco APIs que me gustaría ver anunciadas para facilitar el desarrollo de aplicaciones inteligentes en el ecosistema Apple."
image: /images/posts/wwdc-2026-5-apis-ia-apple.png
imageAlt: Imagen conceptual de WWDC26 con cinco APIs de IA para desarrolladores iOS
tags: ["WWDC", "Apple Intelligence", "iOS", "Swift", "IA"]
---

La WWDC está a la vuelta de la esquina.

Como desarrolladores, es inevitable hacer quinielas sobre qué anunciará Apple. Este año, sin embargo, hay un tema que eclipsa a todos los demás: la Inteligencia Artificial.

Apple Intelligence supuso el primer paso serio de Apple en esta nueva etapa. Sin embargo, desde la perspectiva de un desarrollador que trabaja con IA, todavía faltan varias piezas fundamentales para construir aplicaciones realmente inteligentes de forma sencilla.

No hablo de modelos más grandes.

No hablo de benchmarks.

Hablo de herramientas.

Si pudiera elegir cinco anuncios para esta WWDC, estas serían las APIs que me gustaría ver sobre el escenario.

## 1. Una API de Embeddings

Si tuviera que elegir una única API, probablemente sería esta.

Los embeddings son la base de muchas de las aplicaciones modernas de IA:

- Búsqueda semántica.
- Sistemas RAG.
- Recomendadores.
- Clasificación de contenido.
- Memoria conversacional.

Actualmente podemos generar embeddings mediante servicios externos o integrando modelos propios con Core ML, pero ninguna de las opciones resulta especialmente cómoda.

Me gustaría ver algo tan sencillo como:

```swift
let embedding = try await Embedding.generate(for: text)
```

Apple podría encargarse de toda la complejidad mientras los desarrolladores nos centramos en construir productos.

Una API de este tipo abriría la puerta a aplicaciones mucho más inteligentes sin depender constantemente de servicios externos.

## 2. Un Vector Store nativo

Los embeddings por sí solos tienen una utilidad limitada.

Una vez generados, necesitamos almacenarlos y consultarlos eficientemente.

Actualmente, quien quiere implementar búsqueda semántica o memoria persistente suele terminar integrando soluciones externas o construyendo una capa propia.

Apple ya resolvió problemas similares en el pasado:

- Core Data para almacenamiento estructurado.
- CloudKit para sincronización.
- SwiftData para simplificar la persistencia.

¿Por qué no hacer algo parecido con los vectores?

Un Vector Store integrado permitiría desarrollar sistemas RAG locales, asistentes con memoria y búsquedas inteligentes con mucha menos complejidad.

## 3. Acceso real a modelos locales desde Swift

Apple ha insistido mucho en privacidad, procesamiento local y ejecución en dispositivo.

Estoy completamente de acuerdo con esa dirección.

Pero para que los desarrolladores podamos aprovecharla, necesitamos acceso a los modelos.

No quiero únicamente funcionalidades cerradas proporcionadas por Apple.

Quiero poder construir mis propias experiencias.

Idealmente, algo tan simple como:

```swift
let response = try await model.generate(prompt)
```

Detrás podrían existir múltiples modelos optimizados por Apple.

La complejidad de la inferencia debería quedar oculta.

Los desarrolladores simplemente necesitaríamos una interfaz consistente.

Esto reduciría latencia, costes de infraestructura y dependencia de proveedores externos.

## 4. Un framework de agentes y Tool Calling

La industria está evolucionando rápidamente hacia los agentes.

OpenAI, Anthropic y otros proveedores están apostando por sistemas capaces de utilizar herramientas y ejecutar acciones.

Sin embargo, en el ecosistema Apple todavía no existe una solución estándar para este problema.

Me gustaría ver un framework que permitiera exponer capacidades de una aplicación a un modelo de IA de forma segura.

Por ejemplo:

- Crear tareas.
- Programar eventos.
- Guardar información.
- Ejecutar acciones dentro de una aplicación.

El modelo decidiría cuándo utilizar una herramienta y el sistema operativo seguiría manteniendo el control sobre permisos y seguridad.

Si Apple resuelve correctamente este problema, podríamos estar ante una de las APIs más importantes de la década.

## 5. Herramientas de evaluación para aplicaciones de IA

Probablemente esta sea la petición menos llamativa.

Y también una de las más importantes.

Cuando desarrollamos software tradicional disponemos de herramientas maduras para analizar rendimiento, memoria o consumo energético.

Pero cuando trabajamos con IA seguimos dependiendo en gran medida de pruebas manuales.

Necesitamos responder preguntas como:

- ¿Ha mejorado realmente el sistema?
- ¿Ha empeorado después de un cambio?
- ¿Qué prompts funcionan mejor?
- ¿Qué porcentaje de respuestas son incorrectas?

Apple tiene herramientas extraordinarias como Xcode e Instruments.

Sería fantástico disponer de capacidades específicas para evaluar aplicaciones basadas en IA.

Porque aquello que no se puede medir, no se puede mejorar.

## Más importante que los modelos

Cuando hablamos de IA es fácil obsesionarse con los modelos.

Cada semana aparece uno nuevo.

Más grande.

Más rápido.

Más inteligente.

Pero la historia del desarrollo de software demuestra que el éxito de una plataforma no depende únicamente de la tecnología que existe detrás.

Depende de las herramientas que pone en manos de los desarrolladores.

SwiftUI cambió la forma de construir interfaces.

Core Data simplificó la persistencia.

Combine facilitó la programación reactiva.

Si Apple quiere que Apple Intelligence tenga un impacto similar, necesita proporcionar APIs que permitan construir productos reales.

No espero que Apple anuncie exactamente estas cinco soluciones.

Pero sí espero que la conversación evolucione desde “qué modelo tenemos” hacia “qué podemos construir con él”.

Porque el futuro de la IA en el ecosistema Apple dependerá menos de los modelos y más de las herramientas que tengamos para utilizarlos.

---

> Actualización pendiente: tras la WWDC 2026 revisaré este artículo para analizar cuántas de estas APIs han llegado realmente a la plataforma y qué impacto pueden tener para los desarrolladores iOS.

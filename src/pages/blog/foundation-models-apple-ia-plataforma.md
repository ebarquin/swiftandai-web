---
layout: ../../layouts/PostLayout.astro
title: "Foundation Models: Apple acaba de convertir la IA en una plataforma"
date: "2026-06-09"
description: "Esta mañana publiqué una lista con cinco APIs que me gustaría ver en la WWDC 2026. Tras ver la State of the Union, mi conclusión es muy distinta: Apple no ha presentado algunas APIs. Ha presentado una plataforma."
image: /images/posts/foundation-models-apple-ia-plataforma.jpg
imageAlt: Imagen conceptual de Foundation Models como plataforma de IA para desarrolladores Apple
tags: ["WWDC26", "Apple Intelligence", "Foundation Models", "Swift", "iOS", "IA"]
---

Esta mañana publiqué un artículo titulado:

Las 5 APIs que Apple debería presentar para que los desarrolladores iOS adopten la IA de verdad.

En él planteaba cinco capacidades que, desde mi punto de vista, faltaban en el ecosistema Apple para facilitar la creación de aplicaciones basadas en Inteligencia Artificial:

- Una API de embeddings.
- Un sistema de almacenamiento vectorial.
- Acceso sencillo a modelos locales.
- Un framework de agentes y herramientas.
- Capacidades de evaluación para aplicaciones de IA.

Horas después llegó la WWDC 2026.

Y tras ver la State of the Union, mi sensación es que Apple no ha presentado algunas de esas APIs.

Ha presentado algo mucho más ambicioso.

Ha presentado una plataforma.

## El error de centrarse únicamente en el modelo

Durante los últimos años la conversación sobre IA ha estado dominada por los modelos.

GPT.

Claude.

Gemini.

Llama.

Cada nueva generación se mide por benchmarks, tamaño, velocidad o capacidad de razonamiento.

Sin embargo, para los desarrolladores la pregunta importante rara vez es:

¿Cuál es el modelo más potente?

La pregunta real suele ser:

¿Qué puedo construir con él?

Y ahí es donde Foundation Models me parece especialmente interesante.

Porque Apple no ha dedicado su esfuerzo únicamente a exponer un modelo.

Ha construido una capa completa de infraestructura para desarrollar aplicaciones basadas en IA.

## Foundation Models: la API que más esperaba

Si había una petición que consideraba fundamental era el acceso sencillo a modelos desde Swift.

Durante años, trabajar con IA dentro de una aplicación Apple ha implicado depender de servicios externos, SDKs de terceros o modelos propios integrados mediante Core ML.

Foundation Models cambia esa situación.

Por primera vez, Apple ofrece una forma nativa de interactuar con modelos de IA directamente desde el ecosistema Apple.

Y lo más interesante es que no se trata únicamente de ejecución local.

## Local Models y Server Models

Uno de los anuncios que más me ha llamado la atención es la arquitectura híbrida propuesta por Apple.

Por un lado encontramos los modelos locales ejecutados directamente en el dispositivo.

Por otro, los nuevos Server Models ejecutados sobre Private Cloud Compute.

La clave aquí no es únicamente la potencia.

Es la abstracción.

Como desarrolladores, cada vez parece menos importante dónde se ejecuta el modelo y más importante qué experiencia podemos construir.

Apple parece estar apostando por un enfoque donde la plataforma decide cuándo utilizar recursos locales y cuándo escalar a la nube manteniendo una experiencia coherente para el desarrollador.

## Más allá del texto: Multimodal Prompts

Otro de los anuncios destacados ha sido el soporte para prompts multimodales.

Las aplicaciones reales rara vez trabajan únicamente con texto.

Trabajan con imágenes.

Documentos.

Capturas de pantalla.

Facturas.

Fotografías.

Planos.

Permitir que los modelos comprendan directamente este tipo de información visual abre la puerta a una nueva generación de aplicaciones.

Y hacerlo integrado dentro de la plataforma resulta especialmente interesante.

## Dynamic Profiles y Context Management

Si hay algo que todos los desarrolladores que trabajan con LLMs terminan descubriendo es que el contexto lo es todo.

Los modelos no son útiles únicamente por su capacidad de generar texto.

Son útiles cuando entienden quién es el usuario y qué está ocurriendo.

Por eso me ha resultado especialmente interesante ver conceptos como:

- Dynamic Profiles
- Context Management

Apple parece estar proporcionando mecanismos para gestionar contexto, historial y personalización sin obligar a cada desarrollador a reinventar estas piezas desde cero.

## App Intents, Custom Skills y Agent Orchestration

Aquí es donde Foundation Models empieza a parecerse menos a un modelo y más a una plataforma de agentes.

Una de mis predicciones para esta WWDC era la necesidad de un framework de herramientas o tool calling.

Apple no ha utilizado exactamente esa terminología.

Pero cuando observamos elementos como:

- App Intents
- Custom Skills
- Tool Calling
- Agent Orchestration

resulta difícil no pensar en los mismos conceptos.

La combinación de modelos con App Intents puede convertirse en una forma extremadamente potente de conectar lenguaje natural con acciones reales dentro de una aplicación.

Y eso es precisamente lo que hace interesantes a los agentes.

No que hablen.

Sino que actúen.

## Core Spotlight RAG Tool

Quizá una de las referencias que más me sorprendió fue la aparición de Core Spotlight RAG Tool.

Si algo ha demostrado el auge de los sistemas RAG es que los modelos son mucho más útiles cuando pueden recuperar información relevante.

Hasta ahora, implementar recuperación semántica suele implicar una combinación de embeddings, almacenamiento vectorial y mecanismos de búsqueda.

Apple parece estar explorando una aproximación integrada dentro de su ecosistema.

Todavía queda mucho por analizar, pero es uno de los anuncios que más curiosidad me genera.

## Framework Evaluations

Probablemente esta era la predicción que menos esperaba acertar.

Y sin embargo, ahí estaba.

Durante demasiado tiempo el desarrollo de aplicaciones basadas en IA se ha apoyado en pruebas manuales y evaluaciones subjetivas.

Las herramientas de evaluación son fundamentales para responder preguntas como:

- ¿Ha mejorado realmente el sistema?
- ¿Ha empeorado tras un cambio?
- ¿Qué prompt funciona mejor?
- ¿Qué modelo ofrece mejores resultados?

Ver que Apple está prestando atención a este problema me parece una excelente noticia para quienes construimos productos reales y no simples demostraciones.

## Python SDK y herramientas para desarrolladores

Otro detalle que me llamó la atención fue la presencia de un SDK para Python y herramientas de línea de comandos.

Puede parecer algo menor.

No lo es.

Es una señal clara de que Apple quiere que Foundation Models forme parte de flujos de trabajo reales:

- Automatización.
- Evaluación.
- Experimentación.
- Integración en pipelines.

Es exactamente el tipo de detalle que diferencia una funcionalidad de una plataforma.

## Comparando las predicciones con la realidad

Si comparo mis expectativas de esta mañana con lo anunciado durante la State of the Union, el resultado es interesante:

| Predicción | Resultado |
| --- | --- |
| API de Embeddings | Pendiente |
| Vector Store | Parcialmente cubierto por Core Spotlight RAG |
| Acceso a modelos locales | Completado |
| Framework de agentes y herramientas | Completado |
| Evaluación de aplicaciones IA | Completado |

Pero sinceramente, esa tabla ya no me parece lo más importante.

## Lo que más me ha sorprendido

Antes de la WWDC esperaba varias APIs aisladas.

Después de la State of the Union, la sensación es completamente distinta.

Foundation Models no parece un simple wrapper alrededor de un modelo.

Parece una colección de piezas diseñadas para funcionar juntas:

- Modelos locales.
- Modelos cloud.
- Contexto.
- Perfiles.
- Herramientas.
- Agentes.
- Recuperación.
- Evaluación.
- SDKs.
- Automatización.

Y eso cambia por completo la conversación.

## Conclusión

Cuando escribí mi lista de deseos para la WWDC 2026 esperaba algunas mejoras concretas para trabajar con IA dentro del ecosistema Apple.

Lo que he visto durante la State of the Union es bastante más ambicioso.

Apple no parece estar intentando competir únicamente en la carrera por el modelo más potente.

Está intentando construir una plataforma completa para desarrollar aplicaciones inteligentes.

Todavía queda mucho por explorar y seguramente harán falta meses para entender todas las implicaciones de Foundation Models.

Pero si mi impresión inicial es correcta, esta podría acabar siendo una de las novedades más importantes para desarrolladores Apple de los últimos años.

Y eso, para mí, resulta mucho más interesante que cualquier benchmark.
